import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { enviarMensagemParaIA } from "../../services/openrouter";
import { atualizarXP } from "../../services/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const MATERIAS = [
  "Matemática", "Física", "Química", "Biologia",
  "História", "Geografia", "Filosofia", "Sociologia",
  "Português", "Literatura", "Inglês", "Informática",
];

const MATERIA_TO_GROUP = {
  "Matemática":  "group_matematica",
  "Física":      "group_ciencias_natureza",
  "Química":     "group_ciencias_natureza",
  "Biologia":    "group_ciencias_natureza",
  "História":    "group_ciencias_humanas",
  "Geografia":   "group_ciencias_humanas",
  "Filosofia":   "group_ciencias_humanas",
  "Sociologia":  "group_ciencias_humanas",
  "Português":   "group_linguagens",
  "Literatura":  "group_linguagens",
  "Inglês":      "group_linguagens",
  "Informática": "group_informatica",
};

const FALLBACK_PERGUNTAS = [
  { pergunta: "Quanto é 7 × 8?", alternativas: ["54", "56", "58", "64"], correta: 1 },
  { pergunta: "Qual é a fórmula da água?", alternativas: ["CO2", "H2O", "O2", "NaCl"], correta: 1 },
  { pergunta: "Quem escreveu Dom Casmurro?", alternativas: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Carlos Drummond"], correta: 1 },
  { pergunta: "Em que ano o Brasil foi descoberto?", alternativas: ["1492", "1498", "1500", "1502"], correta: 2 },
  { pergunta: "Qual é o maior planeta do sistema solar?", alternativas: ["Saturno", "Netuno", "Terra", "Júpiter"], correta: 3 },
];

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function parseQuiz(raw) {
  try {
    const match = raw?.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    if (
      !Array.isArray(parsed.perguntas) ||
      parsed.perguntas.length !== 5 ||
      !parsed.perguntas.every(p =>
        p.pergunta &&
        Array.isArray(p.alternativas) &&
        p.alternativas.length === 4 &&
        Number.isInteger(p.correta) &&
        p.correta >= 0 && p.correta <= 3
      )
    ) return null;

    return {
      materia: parsed.materia || "Geral",
      perguntas: parsed.perguntas.map(p => ({
        pergunta: String(p.pergunta),
        alternativas: p.alternativas.map(String),
        correta: p.correta,
      })),
    };
  } catch {
    return null;
  }
}

export function useQuizDiario() {
  const { firebaseUser, refreshUsuario } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [jaJogouHoje, setJaJogouHoje] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [xpGanho, setXpGanho] = useState(0);
  const [acertos, setAcertos] = useState(0);

  const perguntaAtual = quiz?.perguntas?.[perguntaIndex];
  const totalPerguntas = 5;

  useEffect(() => {
    inicializar();
  }, []);

  async function inicializar() {
    setCarregando(true);
    if (firebaseUser) {
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      if (snap.exists() && snap.data().lastDailyQuizDate === getTodayKey()) {
        setJaJogouHoje(true);
        setCarregando(false);
        return;
      }
    }
    await gerarQuiz();
    setCarregando(false);
  }

  async function gerarQuiz() {
    const materia = MATERIAS[Math.floor(Math.random() * MATERIAS.length)];
    const prompt = `
      Gere 5 perguntas de múltipla escolha de nível ensino médio sobre ${materia}.
      Retorne SOMENTE um JSON válido no formato:
      {
        "materia": "${materia}",
        "perguntas": [
          {
            "pergunta": "texto da pergunta",
            "alternativas": ["opcao A", "opcao B", "opcao C", "opcao D"],
            "correta": 0
          }
        ]
      }
      Regras:
      - Exatamente 5 perguntas.
      - Exatamente 4 alternativas por pergunta.
      - Apenas uma correta por pergunta.
      - "correta" é índice de 0 a 3.
      - Sem markdown.
    `;
    try {
      const resposta = await enviarMensagemParaIA(prompt);
      const parsed = parseQuiz(resposta);
      setQuiz(parsed || { materia, perguntas: FALLBACK_PERGUNTAS });
    } catch {
      setQuiz({ materia: "Geral", perguntas: FALLBACK_PERGUNTAS });
    }
    setPerguntaIndex(0);
    setRespostas([]);
    setFinalizado(false);
    setXpGanho(0);
    setAcertos(0);
  }

  async function responder(index) {
    if (respostas[perguntaIndex] !== undefined || jaJogouHoje || finalizado) return;

    const novasRespostas = [...respostas];
    novasRespostas[perguntaIndex] = index;
    setRespostas(novasRespostas);

    // Se não é a última pergunta, avança após 1.5s
    if (perguntaIndex < totalPerguntas - 1) {
      setTimeout(() => setPerguntaIndex(prev => prev + 1), 1500);
      return;
    }

    // Última pergunta — calcula resultado
    const totalAcertos = novasRespostas.filter(
      (resp, i) => resp === quiz.perguntas[i].correta
    ).length;

    const xp = Math.round((totalAcertos / totalPerguntas) * 20);
    setAcertos(totalAcertos);
    setXpGanho(xp);
    setFinalizado(true);

    if (!firebaseUser) return;
    try {
      const groupId = MATERIA_TO_GROUP[quiz.materia] || null;
      if (xp > 0) {
        const { novoXP, novoLevel } = await atualizarXP(firebaseUser.uid, xp, groupId);
        refreshUsuario({ xp: novoXP, level: novoLevel });
      }
      await updateDoc(doc(db, "users", firebaseUser.uid), {
        lastDailyQuizDate: getTodayKey(),
      });
      setJaJogouHoje(true);
    } catch (error) {
      console.error("Erro ao salvar quiz diário:", error);
    }
  }

  function getOptionColor(index) {
    if (respostas[perguntaIndex] === undefined) return "#4c2d6f";
    if (index === perguntaAtual?.correta) return "#2f9e44";
    if (index === respostas[perguntaIndex]) return "#c92a2a";
    return "#4c2d6f";
  }

  return {
    quiz,
    perguntaAtual,
    perguntaIndex,
    totalPerguntas,
    respostas,
    carregando,
    jaJogouHoje,
    finalizado,
    xpGanho,
    acertos,
    responder,
    getOptionColor,
  };
}
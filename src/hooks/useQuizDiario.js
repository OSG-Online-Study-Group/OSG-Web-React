import { useCallback, useEffect, useState } from "react";
import { atualizarXP, buscarUsuario, registrarQuizDiario } from "../services/firestore";
import { enviarMensagemParaIA } from "../services/openrouter";
import { useAuth } from "./useAuth";

const MATERIAS = [
  "Matemática", "Física", "Química", "Biologia", "História", "Geografia",
  "Filosofia", "Sociologia", "Português", "Literatura", "Inglês", "Informática",
];
const MATERIA_TO_GROUP = {
  Matemática: "group_matematica",
  Física: "group_ciencias_natureza",
  Química: "group_ciencias_natureza",
  Biologia: "group_ciencias_natureza",
  História: "group_ciencias_humanas",
  Geografia: "group_ciencias_humanas",
  Filosofia: "group_ciencias_humanas",
  Sociologia: "group_ciencias_humanas",
  Português: "group_linguagens",
  Literatura: "group_linguagens",
  Inglês: "group_linguagens",
  Informática: "group_informatica",
};
const FALLBACK = [
  { pergunta: "Quanto é 7 x 8?", alternativas: ["54", "56", "58", "64"], correta: 1 },
  { pergunta: "Qual é a fórmula da água?", alternativas: ["CO2", "H2O", "O2", "NaCl"], correta: 1 },
  { pergunta: "Quem escreveu Dom Casmurro?", alternativas: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Drummond"], correta: 1 },
  { pergunta: "Em que ano os portugueses chegaram ao Brasil?", alternativas: ["1492", "1498", "1500", "1550"], correta: 2 },
  { pergunta: "Qual é o maior planeta do Sistema Solar?", alternativas: ["Saturno", "Netuno", "Terra", "Júpiter"], correta: 3 },
];

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function parseQuiz(raw, materia) {
  try {
    const match = raw?.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : null;
    if (
      !Array.isArray(parsed?.perguntas) ||
      parsed.perguntas.length !== 5 ||
      parsed.perguntas.some(
        (question) =>
          !question.pergunta ||
          question.alternativas?.length !== 4 ||
          !Number.isInteger(question.correta),
      )
    ) return null;
    return { materia: parsed.materia || materia, perguntas: parsed.perguntas };
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

  const gerarQuiz = useCallback(async () => {
    const materia = MATERIAS[Math.floor(Math.random() * MATERIAS.length)];
    try {
      const raw = await enviarMensagemParaIA(`
        Gere 5 perguntas de múltipla escolha de ensino médio sobre ${materia}.
        Retorne somente JSON: {"materia":"${materia}","perguntas":[{"pergunta":"texto","alternativas":["A","B","C","D"],"correta":0}]}.
      `);
      setQuiz(parseQuiz(raw, materia) || { materia, perguntas: FALLBACK });
    } catch {
      setQuiz({ materia, perguntas: FALLBACK });
    }
  }, []);

  useEffect(() => {
    let active = true;
    async function load() {
      setCarregando(true);
      if (firebaseUser) {
        const user = await buscarUsuario(firebaseUser.uid);
        if (user?.lastDailyQuizDate === todayKey()) {
          if (active) {
            setJaJogouHoje(true);
            setCarregando(false);
          }
          return;
        }
      }
      await gerarQuiz();
      if (active) setCarregando(false);
    }
    load().catch(() => setCarregando(false));
    return () => {
      active = false;
    };
  }, [firebaseUser, gerarQuiz]);

  async function responder(index) {
    if (respostas[perguntaIndex] !== undefined || jaJogouHoje || finalizado) return;
    const answers = [...respostas];
    answers[perguntaIndex] = index;
    setRespostas(answers);
    if (perguntaIndex < 4) {
      setTimeout(() => setPerguntaIndex((current) => current + 1), 1000);
      return;
    }
    const correct = answers.filter((answer, position) => answer === quiz.perguntas[position].correta).length;
    const xp = Math.round((correct / 5) * 20);
    setAcertos(correct);
    setXpGanho(xp);
    setFinalizado(true);
    if (!firebaseUser) return;
    if (xp > 0) {
      const result = await atualizarXP(firebaseUser.uid, xp, MATERIA_TO_GROUP[quiz.materia] || null);
      refreshUsuario({ xp: result.novoXP, level: result.novoLevel });
    }
    await registrarQuizDiario(firebaseUser.uid, todayKey());
    setJaJogouHoje(true);
  }

  return {
    quiz,
    perguntaAtual: quiz?.perguntas?.[perguntaIndex],
    perguntaIndex,
    totalPerguntas: 5,
    respostas,
    carregando,
    jaJogouHoje,
    finalizado,
    xpGanho,
    acertos,
    responder,
  };
}

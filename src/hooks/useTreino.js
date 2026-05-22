import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { enviarMensagemParaIA } from "../../services/openrouter";
import { atualizarXP } from "../../services/firestore";

const XP_POR_ACERTO = 10;

const CATEGORIAS = {
  matematica: {
    label: "Matemática",
    materias: "Matemática (Álgebra, Geometria ou Trigonometria)",
    contexto: "matemático",
  },
  ciencias_natureza: {
    label: "Ciências da Natureza",
    materias: "Física, Química ou Biologia",
    contexto: "científico",
  },
  ciencias_humanas: {
    label: "Ciências Humanas",
    materias: "História, Geografia, Filosofia ou Sociologia",
    contexto: "histórico/social",
  },
  linguagens: {
    label: "Linguagens",
    materias: "Português, Literatura ou Inglês",
    contexto: "linguístico e literário",
  },
  informatica: {
    label: "Informática",
    materias: "Lógica, Programação ou Redes",
    contexto: "tecnologia e computação",
  },
};

const FALLBACK = {
  pergunta: "Qual é o resultado de 2 + 2?",
  alternativas: ["3", "4", "5", "6"],
  correta: 1,
};

function parseResposta(raw) {
  try {
    const match = raw?.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    if (
      !parsed.pergunta ||
      !Array.isArray(parsed.alternativas) ||
      parsed.alternativas.length !== 4 ||
      !Number.isInteger(parsed.correta) ||
      parsed.correta < 0 || parsed.correta > 3
    ) return null;
    return {
      pergunta: String(parsed.pergunta),
      alternativas: parsed.alternativas.map(String),
      correta: parsed.correta,
    };
  } catch {
    return null;
  }
}

export function useTreino(categoria) {
  const { firebaseUser, usuario, refreshUsuario } = useAuth();
  const config = CATEGORIAS[categoria] || CATEGORIAS.ciencias_humanas;
  const groupId = `group_${categoria}`;

  const [pergunta, setPergunta] = useState(null);
  const [respondido, setRespondido] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [xpTotal, setXpTotal] = useState(0);

  useEffect(() => {
    gerarPergunta();
  }, []);

  async function gerarPergunta() {
    setCarregando(true);
    setRespondido(false);
    setSelectedIndex(null);

    const prompt = `
      Gere uma pergunta de múltipla escolha sobre ${config.materias}.
      Retorne SOMENTE um JSON válido no formato:
      {
        "pergunta": "texto da pergunta",
        "alternativas": ["opcao A", "opcao B", "opcao C", "opcao D"],
        "correta": 0
      }
      Regras:
      - Exatamente 4 alternativas.
      - Apenas uma correta.
      - "correta" é índice de 0 a 3.
      - Sem markdown.
    `;

    try {
      const resposta = await enviarMensagemParaIA(prompt);
      const parsed = parseResposta(resposta);
      setPergunta(parsed || FALLBACK);
    } catch {
      setPergunta(FALLBACK);
    }
    setCarregando(false);
  }

  async function responder(index) {
    if (respondido || carregando) return;

    setSelectedIndex(index);
    setRespondido(true);

    const acertou = index === pergunta.correta;

    if (acertou && firebaseUser) {
      try {
        const { novoXP, novoLevel } = await atualizarXP(
          firebaseUser.uid, XP_POR_ACERTO, groupId
        );
        setXpTotal((prev) => prev + XP_POR_ACERTO);
        refreshUsuario({ xp: novoXP, level: novoLevel });
      } catch (err) {
        console.error("Erro ao salvar XP:", err);
      }
    }

    // Próxima pergunta após 2s
    setTimeout(() => gerarPergunta(), 2000);
  }

  function getOptionColor(index) {
    if (selectedIndex === null) return "#4c2d6f";
    if (index === pergunta?.correta) return "#2f9e44";
    if (index === selectedIndex) return "#c92a2a";
    return "#4c2d6f";
  }

  return {
    pergunta,
    carregando,
    respondido,
    selectedIndex,
    xpTotal,
    config,
    responder,
    getOptionColor,
    proximaPergunta: gerarPergunta,
  };
}
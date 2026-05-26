import { useCallback, useEffect, useState } from "react";
import { atualizarXP } from "../services/firestore";
import { enviarMensagemParaIA } from "../services/openrouter";
import { useAuth } from "./useAuth";

const XP_POR_ACERTO = 10;
export const CATEGORIAS = {
  matematica: { label: "Matemática", content: "Matemática, Álgebra ou Geometria" },
  ciencias_natureza: { label: "Ciências da Natureza", content: "Física, Química ou Biologia" },
  ciencias_humanas: { label: "Ciências Humanas", content: "História, Geografia, Filosofia ou Sociologia" },
  linguagens: { label: "Linguagens", content: "Português, Literatura ou Inglês" },
  informatica: { label: "Informática", content: "Lógica, Programação ou Redes" },
};
const FALLBACK = { pergunta: "Qual é o resultado de 2 + 2?", alternativas: ["3", "4", "5", "6"], correta: 1 };

function parseQuestion(raw) {
  try {
    const match = raw?.match(/\{[\s\S]*\}/);
    const question = match ? JSON.parse(match[0]) : null;
    return question?.pergunta && question.alternativas?.length === 4 && Number.isInteger(question.correta)
      ? question
      : null;
  } catch {
    return null;
  }
}

export function useTreino(categoria) {
  const { firebaseUser, refreshUsuario } = useAuth();
  const categoryKey = CATEGORIAS[categoria] ? categoria : "ciencias_humanas";
  const config = CATEGORIAS[categoryKey];
  const [pergunta, setPergunta] = useState(null);
  const [respondido, setRespondido] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [xpTotal, setXpTotal] = useState(0);

  const gerarPergunta = useCallback(async () => {
    setCarregando(true);
    setRespondido(false);
    setSelectedIndex(null);
    try {
      const raw = await enviarMensagemParaIA(`
        Gere uma pergunta de múltipla escolha sobre ${config.content}.
        Retorne somente JSON: {"pergunta":"texto","alternativas":["A","B","C","D"],"correta":0}.
      `);
      setPergunta(parseQuestion(raw) || FALLBACK);
    } catch {
      setPergunta(FALLBACK);
    } finally {
      setCarregando(false);
    }
  }, [config.content]);

  useEffect(() => {
    gerarPergunta();
  }, [gerarPergunta]);

  async function responder(index) {
    if (respondido || carregando) return;
    setSelectedIndex(index);
    setRespondido(true);
    if (index === pergunta.correta && firebaseUser) {
      const result = await atualizarXP(firebaseUser.uid, XP_POR_ACERTO, `group_${categoryKey}`);
      setXpTotal((total) => total + XP_POR_ACERTO);
      refreshUsuario({ xp: result.novoXP, level: result.novoLevel });
    }
    setTimeout(gerarPergunta, 1600);
  }

  return { pergunta, carregando, respondido, selectedIndex, xpTotal, config, responder };
}

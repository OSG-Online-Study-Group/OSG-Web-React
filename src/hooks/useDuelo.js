import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarUsuarios,
  criarDuelo,
  ouvirDuelo,
  ouvirDuelosPendentes,
  responderDesafio,
  salvarRespostaDuelo,
  verificarDuelosExpirados,
} from "../services/firestore";
import { isE2EMockMode } from "../test/e2eMocks";
import { useAuth } from "./useAuth";

export function useDuelosPendentes() {
  const { firebaseUser } = useAuth();
  const [pendentes, setPendentes] = useState([]);

  useEffect(() => {
    if (isE2EMockMode) return undefined;
    if (!firebaseUser) return undefined;
    verificarDuelosExpirados(firebaseUser.uid).catch(() => {});
    return ouvirDuelosPendentes(firebaseUser.uid, setPendentes, () => setPendentes([]));
  }, [firebaseUser]);

  return { pendentes, total: pendentes.length };
}

export function useConviteDuelo() {
  const { firebaseUser, usuario } = useAuth();
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [aguardando, setAguardando] = useState("");
  const [dueloId, setDueloId] = useState(null);

  useEffect(() => {
    if (!dueloId) return undefined;
    return ouvirDuelo(dueloId, (duelo) => {
      if (duelo?.status === "ativo") navigate(`/duelo/${dueloId}`, { replace: true });
      if (duelo?.status === "recusado" || duelo?.status === "cancelado") {
        setErro("O desafio foi recusado ou expirou.");
        setAguardando("");
        setDueloId(null);
      }
    });
  }, [dueloId, navigate]);

  useEffect(() => {
    if (busca.trim().length < 2) {
      setUsuarios([]);
      return undefined;
    }
    const timeout = setTimeout(async () => {
      setCarregando(true);
      try {
        const users = await buscarUsuarios(busca);
        setUsuarios(users.filter((user) => user.uid !== firebaseUser?.uid));
      } catch {
        setErro("Não foi possível pesquisar usuários.");
      } finally {
        setCarregando(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [busca, firebaseUser]);

  async function desafiar(user) {
    setEnviando(true);
    setErro("");
    try {
      const id = await criarDuelo(firebaseUser.uid, usuario.name, user.uid, user.name);
      setDueloId(id);
      setAguardando(`Aguardando ${user.name} aceitar o duelo...`);
    } catch (error) {
      setErro(error.message);
    } finally {
      setEnviando(false);
    }
  }

  return {
    busca, setBusca, usuarios, carregando, enviando, erro, aguardando, dueloId, desafiar,
  };
}

export function useDueloAmigo(dueloId) {
  const { firebaseUser } = useAuth();
  const [duelo, setDuelo] = useState(null);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [finalizado, setFinalizado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!dueloId) return undefined;
    return ouvirDuelo(dueloId, (data) => {
      setDuelo(data);
      setCarregando(false);
    });
  }, [dueloId]);

  async function responder(index) {
    if (respostas[perguntaIndex] !== undefined) return;
    const answers = [...respostas];
    answers[perguntaIndex] = index;
    setRespostas(answers);
    if (perguntaIndex < (duelo?.perguntas?.length || 5) - 1) {
      setTimeout(() => setPerguntaIndex((position) => position + 1), 1000);
      return;
    }
    setFinalizado(true);
    await salvarRespostaDuelo(dueloId, firebaseUser.uid, answers);
  }

  return {
    duelo,
    perguntaAtual: duelo?.perguntas?.[perguntaIndex],
    perguntaIndex,
    totalPerguntas: duelo?.perguntas?.length || 5,
    respostas,
    finalizado,
    carregando,
    responder,
  };
}

export async function responderConvite(dueloId, aceitar) {
  await responderDesafio(dueloId, aceitar);
}

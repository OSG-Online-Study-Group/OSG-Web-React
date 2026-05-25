import { useState, useEffect, useRef } from "react";
import { useAuth } from "./useAuth";
import {
  criarDuelo, responderDesafio, salvarRespostaDuelo,
  ouvirDuelosPendentes, ouvirDuelo, buscarUsuarios,
  verificarDuelosExpirados,
} from "../../services/firestore";

// ── Hook para duelos pendentes ──
export function useDuelosPendentes() {
  const { firebaseUser } = useAuth();
  const [pendentes, setPendentes] = useState([]);

  useEffect(() => {
    if (!firebaseUser) return;
    verificarDuelosExpirados(firebaseUser.uid);
    const unsub = ouvirDuelosPendentes(firebaseUser.uid, setPendentes);
    return () => unsub();
  }, [firebaseUser]);

  return { pendentes, total: pendentes.length };
}

// ── Hook para criar duelo ──
export function useConviteDuelo(navigation) {
  const { firebaseUser, usuario } = useAuth();
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [dueloIdCriado, setDueloIdCriado] = useState(null);

  // Escuta o duelo criado — redireciona quando aceito
  useEffect(() => {
    if (!dueloIdCriado) return;

    const unsub = ouvirDuelo(dueloIdCriado, (duelo) => {
      if (duelo.status === "ativo") {
        unsub();
        navigation.replace("DueloAmigo", { dueloId: dueloIdCriado });
      }
      if (duelo.status === "recusado" || duelo.status === "cancelado") {
        unsub();
        setSucesso("");
        setErro("O desafio foi recusado.");
        setDueloIdCriado(null);
      }
    });

    return () => unsub();
  }, [dueloIdCriado]);

  // Busca em tempo real enquanto digita
  useEffect(() => {
    if (!busca.trim() || busca.length < 2) {
      setUsuarios([]);
      return;
    }
    const timeout = setTimeout(() => pesquisar(), 400); // debounce 400ms
    return () => clearTimeout(timeout);
  }, [busca]);

  async function pesquisar() {
    setCarregando(true);
    setErro("");
    try {
      const resultado = await buscarUsuarios(busca);
      setUsuarios(resultado.filter((u) => u.uid !== firebaseUser.uid));
    } catch {
      setErro("Erro ao buscar usuários.");
    }
    setCarregando(false);
  }

  async function desafiar(desafiado) {
    setEnviando(true);
    setErro("");
    setSucesso("");
    try {
      const id = await criarDuelo(
        firebaseUser.uid,
        usuario.name,
        desafiado.uid,
        desafiado.name,
      );
      setDueloIdCriado(id);
      setSucesso(`Aguardando ${desafiado.name} aceitar...`);
      setUsuarios([]);
      setBusca("");
    } catch (err) {
      setErro(err.message);
    }
    setEnviando(false);
  }

  return {
    busca, setBusca,
    usuarios, carregando,
    enviando, erro, sucesso,
    dueloIdCriado,
    desafiar,
  };
}

// ── Hook para responder duelo ──
export function useDueloAmigo(dueloId) {
  const { firebaseUser } = useAuth();
  const [duelo, setDuelo] = useState(null);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [finalizado, setFinalizado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!dueloId) return;
    const unsub = ouvirDuelo(dueloId, (dados) => {
      setDuelo(dados);
      setCarregando(false);
    });
    return () => unsub();
  }, [dueloId]);

  const perguntaAtual = duelo?.perguntas?.[perguntaIndex];
  const totalPerguntas = duelo?.perguntas?.length || 5;

  async function responder(index) {
    if (respostas[perguntaIndex] !== undefined) return;

    const novasRespostas = [...respostas];
    novasRespostas[perguntaIndex] = index;
    setRespostas(novasRespostas);

    if (perguntaIndex < totalPerguntas - 1) {
      setTimeout(() => setPerguntaIndex((prev) => prev + 1), 1500);
      return;
    }

    setFinalizado(true);
    await salvarRespostaDuelo(dueloId, firebaseUser.uid, novasRespostas);
  }

  function getOptionColor(index) {
    if (respostas[perguntaIndex] === undefined) return "#4c2d6f";
    if (index === perguntaAtual?.correta) return "#2f9e44";
    if (index === respostas[perguntaIndex]) return "#c92a2a";
    return "#4c2d6f";
  }

  return {
    duelo, perguntaAtual, perguntaIndex,
    totalPerguntas, respostas, finalizado,
    carregando, responder, getOptionColor,
  };
}
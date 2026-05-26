import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { buscarUsuario } from "../services/firestore";
import { useAuth } from "./useAuth";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const SALA_ID = "duelo-aleatorio";

export function useDueloAleatorio() {
  const { firebaseUser } = useAuth();
  const socket = useRef(null);
  const [pergunta, setPergunta] = useState(null);
  const [tempo, setTempo] = useState(0);
  const [selecionada, setSelecionada] = useState(null);
  const [correta, setCorreta] = useState(null);
  const [pontuacao, setPontuacao] = useState({});
  const [nomes, setNomes] = useState({});
  const [fim, setFim] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!firebaseUser || !SOCKET_URL) return undefined;
    const connection = io(SOCKET_URL, { transports: ["websocket"] });
    socket.current = connection;
    connection.on("connect", async () => {
      const token = await firebaseUser.getIdToken();
      connection.emit("entrarDuelo", { token, salaId: SALA_ID });
    });
    connection.on("connect_error", () => setErro("Não foi possível conectar ao duelo."));
    connection.on("novaPergunta", ({ pergunta: question, tempo: time }) => {
      setPergunta(question);
      setTempo(time);
      setSelecionada(null);
      setCorreta(null);
    });
    connection.on("resultadoResposta", ({ correta: answer, pontuacao: score }) => {
      setCorreta(answer);
      setPontuacao(score);
    });
    connection.on("fimDeJogo", async ({ pontuacao: score }) => {
      setFim(true);
      setPontuacao(score);
      const entries = await Promise.all(
        Object.keys(score).map(async (uid) => [uid, (await buscarUsuario(uid))?.name || "Desconhecido"]),
      );
      setNomes(Object.fromEntries(entries));
    });
    return () => {
      connection.disconnect();
      socket.current = null;
    };
  }, [firebaseUser]);

  useEffect(() => {
    if (tempo <= 0) return undefined;
    const interval = setInterval(() => setTempo((time) => Math.max(0, time - 1)), 1000);
    return () => clearInterval(interval);
  }, [tempo]);

  function responder(index) {
    if (!socket.current || selecionada !== null) return;
    setSelecionada(index);
    socket.current.emit("resposta", { salaId: SALA_ID, respostaIndex: index });
  }

  return {
    pergunta,
    tempo,
    selecionada,
    correta,
    pontuacao,
    nomes,
    fim,
    erro: SOCKET_URL ? erro : "Configure VITE_SOCKET_URL para jogar.",
    responder,
  };
}

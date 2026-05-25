import React, { useEffect, useState } from "react";
import "./duelo-aleatorio.css";

import { io } from "socket.io-client";
import { auth, db } from "../../../services/firebase";

import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function DueloAleatorio() {
  const [socket, setSocket] = useState(null);

  const [pergunta, setPergunta] = useState(null);
  const [tempo, setTempo] = useState(0);

  const [selecionada, setSelecionada] = useState(null);
  const [correta, setCorreta] = useState(null);

  const [pontuacao, setPontuacao] = useState({});
  const [nomes, setNomes] = useState({});

  const [fim, setFim] = useState(false);
  const [tempoVoltar, setTempoVoltar] = useState(5);

  const navigate = useNavigate();

  const salaId = "duelo-aleatorio";

  useEffect(() => {
    const s = io("https://osg-duelo.onrender.com");

    setSocket(s);

    s.on("connect", async () => {
      const user = auth.currentUser;

      if (!user) return;

      const token = await user.getIdToken();

      s.emit("entrarDuelo", {
        token,
        salaId,
      });
    });

    s.on("novaPergunta", ({ pergunta, tempo }) => {
      setPergunta(pergunta);
      setTempo(tempo);

      setSelecionada(null);
      setCorreta(null);
    });

    s.on("resultadoResposta", ({ correta, pontuacao }) => {
      setCorreta(correta);
      setPontuacao(pontuacao);
    });

    s.on("fimDeJogo", async ({ pontuacao }) => {
      setFim(true);

      setPontuacao(pontuacao);

      await carregarNomes(pontuacao);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  // ⏱ TIMER PERGUNTA
  useEffect(() => {
    if (tempo <= 0) return;

    const interval = setInterval(() => {
      setTempo((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [tempo]);

  // 🔥 VOLTAR MENU
  useEffect(() => {
    if (!fim) return;

    const interval = setInterval(() => {
      setTempoVoltar((t) => t - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fim]);

  async function carregarNomes(pontuacao) {
    const novosNomes = {};

    for (const uid of Object.keys(pontuacao)) {
      const ref = doc(db, "users", uid);

      const snap = await getDoc(ref);

      novosNomes[uid] = snap.exists()
        ? snap.data().name
        : "Desconhecido";
    }

    setNomes(novosNomes);
  }

  function responder(index) {
    if (!socket || selecionada !== null) return;

    setSelecionada(index);

    socket.emit("resposta", {
      salaId,
      respostaIndex: index,
    });
  }

  // 🔄 LOADING
  if (!pergunta && !fim) {
    return (
      <div className="duelo-loading">
        <div className="loader"></div>

        <p>
          Procurando adversário...
        </p>
      </div>
    );
  }

  // 🏁 FIM
  if (fim) {
    return (
      <div className="duelo-fim">
        <h1>
          🏁 Fim de jogo
        </h1>

        {Object.entries(pontuacao).map(([uid, pontos]) => (
          <p key={uid} className="score">
            {nomes[uid] || "Carregando..."}: {pontos}
          </p>
        ))}

        <span>
          Voltando ao menu em {tempoVoltar}s...
        </span>
      </div>
    );
  }

  // 🎯 JOGO
  return (
    <div className="duelo-container">

      <div className="duelo-header">

        <div className="badge-materia">
          {pergunta?.materia?.toUpperCase()}
        </div>

        <div className="timer">
          ⏱ {tempo}s
        </div>

      </div>

      <div className="duelo-content">

        <h2 className="pergunta">
          {pergunta?.pergunta}
        </h2>

        <div className="alternativas">

          {pergunta?.alternativas.map((alt, index) => {
            let classe = "";

            if (
              selecionada !== null &&
              correta === null &&
              index === selecionada
            ) {
              classe = "selected";
            }

            if (correta !== null) {
              if (index === correta) {
                classe = "correct";
              } else if (index === selecionada) {
                classe = "wrong";
              }
            }

            return (
              <button
                key={index}
                className={`alternativa ${classe}`}
                onClick={() => responder(index)}
                disabled={selecionada !== null}
              >
                {alt}
              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
}
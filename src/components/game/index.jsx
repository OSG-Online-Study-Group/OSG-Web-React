import React from "react";
import "./game.css";
import { useNavigate } from "react-router-dom";

export function Game() {
  const navigate = useNavigate();
  return (
    <div className="modo-container">

      {/* HEADER */}
      <header className="modo-header">
        <span className="voltar"></span>
        <h1>Escolha o Modo que deseja jogar</h1>
      </header>

      {/* OPÇÕES */}
      <div className="modo-opcoes">

        <button className="modo-card" onClick={() => navigate("")}>
          <span className="icon"></span>
          <span>💡 Quiz diário</span>
        </button>

        <button className="modo-card destaque" onClick={() => navigate("")}>
          <span className="icon"></span>
          <span>⚔️ Duelo Aleatório</span>
        </button>

        <button className="modo-card" onClick={() => navigate("/ConviteDuelo")}>
          <span className="icon"></span>
          <span>👥 Duelo com Amigos</span>
        </button>

        <button className="modo-card" onClick={() => navigate("/Treino")}>
          <span className="icon"></span>
          <span>📋 Treino</span>
        </button>

      </div>

    </div>
  );
}
import React from "react";
import "./game.css";
import { useNavigate } from "react-router-dom";

export function Game() {
  const navigate = useNavigate();

  return (
    <div className="modo-container">
      <header className="modo-header">
        <button className="voltar-btn" onClick={() => navigate(-1)}>❮</button>
        <h1>Escolha o Modo</h1>
      </header>

      <main className="modo-opcoes">
        <button className="modo-card" onClick={() => navigate("/quiz-diario")}>
          <span>💡 Quiz diário</span>
        </button>
        <button className="modo-card" onClick={() => navigate("/duelo-aleatorio")}>
          <span>⚔️ Duelo Aleatório</span>
        </button>
        <button className="modo-card" onClick={() => navigate("/ConviteDuelo")}>
          <span>👥 Duelo com Amigos</span>
        </button>
        <button className="modo-card" onClick={() => navigate("/Treino")}>
          <span>📋 Treino</span>
        </button>
      </main>
    </div>
  );
}
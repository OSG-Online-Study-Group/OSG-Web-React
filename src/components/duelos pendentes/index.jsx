import React from "react";
import "./duelos_pendentes.css";
import { useNavigate } from "react-router-dom";

export function DuelosPendentes() {
  const navigate = useNavigate();
  const convites = [
    { id: 1, nome: "Marcos Silva", materia: "Matemática" },
    { id: 2, nome: "Ana Julia", materia: "Ciências" },
  ];

  return (
    <div className="duelo-container">
      <header className="duelo-header">
        <button className="voltar-btn" onClick={() => navigate(-1)}>❮</button>
        <h1>Duelos Pendentes</h1>
      </header>

      <main className="duelo-lista">
        {convites.map((c) => (
          <div key={c.id} className="duelo-card">
            <div className="duelo-info">
              <p className="duelo-nome">{c.nome}</p>
              <p className="duelo-materia">{c.materia}</p>
            </div>
            <div className="duelo-acoes">
              <button className="btn-aceitar" title="Aceitar">✔</button>
              <button className="btn-recusar" title="Recusar">✖</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
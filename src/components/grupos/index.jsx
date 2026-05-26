import React from "react";
import "./grupos.css";
import { useNavigate } from "react-router-dom";

export function Grupos() {
  const navigate = useNavigate();
  const listaGrupos = [
    { nome: "Matemática", icone: "📐", path: "/matematica" },
    { nome: "Ciências da Natureza", icone: "🧪", path: "/ciencias" },
    { nome: "Linguagens", icone: "📚", path: "/linguagens" },
    { nome: "Ciências Humanas", icone: "🌍", path: "/humanas" },
    { nome: "Informática", icone: "💻", path: "/informatica" },
  ];

  return (
    <div className="grupos-container">
      <header className="grupos-header">
        <button className="voltar-btn" onClick={() => navigate(-1)}>❮ Voltar</button>
        <h1>Seus Grupos</h1>
      </header>

      <main className="grupos-lista">
        {listaGrupos.map((grupo, idx) => (
          <button key={idx} className="grupo-card" onClick={() => navigate(grupo.path)} onClick={() => navigate("/Chat")}>
            <span className="grupo-icone">{grupo.icone}</span>
            <span className="grupo-nome">{grupo.nome}</span>
          </button>
        ))}
      </main>
    </div>
  );
}
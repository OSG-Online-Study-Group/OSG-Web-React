import React from "react";
import "./grupos.css";
import { useNavigate } from "react-router-dom";

export function Grupos() {
  const navigate = useNavigate();

  const listaGrupos = [
    { nome: "Matemática",          icone: "📐", path: "/chat/matematica"  },
    { nome: "Ciências da Natureza", icone: "🧪", path: "/chat/ciencias"   },
    { nome: "Linguagens",           icone: "📚", path: "/chat/linguagens" },
    { nome: "Ciências Humanas",     icone: "🌍", path: "/chat/humanas"    },
    { nome: "Informática",          icone: "💻", path: "/chat/informatica"},
  ];

  return (
    <div className="grupos-container">
      <header className="grupos-header">
        <button className="voltar-btn" onClick={() => navigate(-1)}>❮ Voltar</button>
        <h1>Seus Grupos</h1>
      </header>

      <main className="grupos-lista">
        {listaGrupos.map((grupo, idx) => (
          <button
            key={idx}
            className="grupo-card"
            /* ✅ Um único onClick: navega para o path do grupo
               e passa o nome/ícone via state para o Chat usar */
            onClick={() =>
              navigate(grupo.path, {
                state: { nomeGrupo: grupo.nome, iconeGrupo: grupo.icone },
              })
            }
          >
            <span className="grupo-icone">{grupo.icone}</span>
            <span className="grupo-nome">{grupo.nome}</span>
          </button>
        ))}
      </main>
    </div>
  );
}

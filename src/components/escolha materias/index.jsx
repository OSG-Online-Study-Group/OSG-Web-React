import React, { useState } from "react";
import "./escolha_materias.css";
import { useNavigate } from "react-router-dom";

export function EscolhaMaterias() {
  const navigate = useNavigate();

  // Estado das matérias selecionadas
  const [selecionadas, setSelecionadas] = useState([]);

  // Lista das matérias
  const materias = [
    "Matemática",
    "Ciências da Natureza",
    "Linguagens",
    "Ciências Humanas",
    "Informática",
  ];

  // Selecionar / remover matéria
  function toggleMateria(materia) {
    if (selecionadas.includes(materia)) {
      setSelecionadas(
        selecionadas.filter((item) => item !== materia)
      );
    } else {
      setSelecionadas([...selecionadas, materia]);
    }
  }

  // Confirmar
  function confirmar() {
    console.log("Selecionadas:", selecionadas);

    // exemplo de navegação
    navigate("");
  }

  return (
    <div className="tema-container">

      {/* HEADER */}
      <div className="tema-header">
        <h1>Escolha suas Matérias</h1>

        <h2>
          Selecione os grupos que deseja participar.
          Você pode estar em mais de um!
        </h2>
      </div>

      {/* OPÇÕES */}
      <div className="tema-opcoes">

        {materias.map((materia) => (
          <div
            key={materia}
            className={`tema-card humanas ${
              selecionadas.includes(materia)
                ? "selecionado"
                : ""
            }`}
            onClick={() => toggleMateria(materia)}
          >
            <span>{materia}</span>
          </div>
        ))}

        {/* BOTÃO */}
        <div
          className="tema-card exatas confirmar"
          onClick={() => navigate("/Home")}
        >
          <span>Confirmar e Entrar</span>
        </div>

      </div>
    </div>
  );
}
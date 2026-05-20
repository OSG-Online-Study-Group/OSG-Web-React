import React from "react";
import "./treino.css";
import { useNavigate } from "react-router-dom";

export function Treino() {
  const navigate = useNavigate();

  const materias = [
    "Matemática",
    "Ciências da Natureza",
    "Linguagens",
    "Ciências Humanas",
    "Informática",
  ];

  function confirmarMateria(materia) {
    console.log("Matéria escolhida:", materia);
  }

  return (
    <div className="tema-container">

      {/* HEADER */}
      <div className="tema-header">
        <h1>Escolha uma Matéria</h1>
      </div>

      {/* OPÇÕES */}
      <div className="tema-opcoes">

        {materias.map((materia) => (
          <div
            key={materia}
            className="tema-card humanas"
            onClick={() => confirmarMateria(materia)}
          >
            <span>{materia}</span>
          </div>
        ))}

      </div>
    </div>
  );
}
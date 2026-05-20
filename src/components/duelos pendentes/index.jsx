import React from "react";
import "./duelos_pendentes.css";
import { useNavigate } from "react-router-dom";

export function DuelosPendentes() {
  const navigate = useNavigate();
  return (
      <div className="modo-container">

      {/* HEADER */}
      <header className="modo-header">
        <span className="voltar"></span>
        <h1>Duelos Pendentes</h1>
      </header>

      </div>
  );
}
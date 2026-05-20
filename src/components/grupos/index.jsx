import React from "react";
import "./grupos.css";
import { useNavigate } from "react-router-dom";

export function Grupos() {
  const navigate = useNavigate();
    return(
        <div className="modo-container">
        <header className="modo-header">
        <span className="voltar">← Voltar</span>
        <h1>Seus Grupos</h1>
      </header>
        </div>
    );
}
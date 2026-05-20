import React from "react";
import "./convite_duelo.css";
import { useNavigate } from "react-router-dom";

export function ConviteDuelo() {
  const navigate = useNavigate()

  return (
    <div className="modo-container">

      <header className="modo-header">
        <h1>Duelo Amigos</h1>
        <input type="text" placeholder="Buscar usuário pelo nome..."/>
      </header>

    </div>
  );
}

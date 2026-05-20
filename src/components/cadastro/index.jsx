import React from "react";
import { useNavigate } from "react-router-dom";
import "./cadastro.css";
import Logo from "../../assets/image/logo_OSG.png";

export function Cadastro() {
  const navigate = useNavigate();
  return (
    <div className="cadastro-container">
      <div className="cadastro-card">

        <div className="cadastro-left">
          <img src={Logo} alt="Online Study Group" />
          <h2>Faça seu Cadastro</h2>
        </div>

        <div className="cadastro-right">
          <input
            type="text"
            placeholder="Nome Completo"
          />

          <input
            type="text"
            placeholder="E-mail ou telefone"
          />

          <input
            type="password"
            placeholder="Senha"
          />

          <input
            type="password"
            placeholder="Confirmar senha"
          />

          <button className="btn-enviar" onClick={() => navigate("/Login")}>
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
}

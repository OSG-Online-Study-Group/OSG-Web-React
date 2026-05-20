import React from "react";
import { useNavigate } from "react-router-dom";
import "./abertura.css";
import Logo from "../../assets/image/logo_OSG.png";

export const Abertura = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">

        <h1 className="welcome-title">Seja Bem-Vindo</h1>

        <div className="logo-wrapper">
          <img src={Logo} alt="Online Study Group" />
          <span className="logo-text">ONLINE STUDY GROUP</span>
        </div>

        <p className="welcome-subtitle">Você deseja:</p>

        <button
          className="btn primary"
          onClick={() => navigate("/Login")}
        >
          Fazer Login
        </button>

        <span className="divider">Ou</span>

        <button
          className="btn secondary"
          onClick={() => navigate("/Cadastro")}
        >
          Cadastrar-se
        </button>

      </div>
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Logo from "../../assets/image/logo_OSG.png";

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-left">
          <img src={Logo} alt="Online Study Group" />
          <h2>Faça login!</h2>
        </div>

        <div className="login-right">
          <input
            type="text"
            placeholder="Gmail ou telefone"
          />

          <input
            type="password"
            placeholder="Senha"
          />

          <span className="forgot-password">
            Esqueceu sua senha?
          </span>

          <span
            className="register-link"
            onClick={() => navigate("/Cadastro")}
          >
            Não tem conta? Cadastre-se
          </span>

          <button className="btn-entrar" onClick={() => navigate("/EscolhaMaterias")}>
            Entrar
          </button>
        </div>

      </div>
    </div>
  );
}

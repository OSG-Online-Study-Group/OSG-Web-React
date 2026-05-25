import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";

import Logo from "../../assets/image/logo_OSG.png";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    if (!email || !senha) {
      return alert("Preencha todos os campos.");
    }

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      navigate("/Home");

    } catch (error) {

      alert(error.message);
    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-left">

          <img
            src={Logo}
            alt="OSG"
          />

          <h2>
            Online Study Group:
            Aprenda, Pratique e Conquiste!
          </h2>

        </div>

        <form
          className="login-right"
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />

          <span
            className="register-link"
            onClick={() => navigate("/Cadastro")}
          >
            Não tem conta? Cadastre-se
          </span>

          <button
            type="submit"
            className="btn-entrar"
          >
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}
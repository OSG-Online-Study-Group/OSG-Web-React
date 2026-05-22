import { useState } from "react";
import "./cadastro.css";

import { useNavigate } from "react-router-dom";

import { auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { salvarUsuario } from "../../../services/firestore";

import Logo from "../../assets/image/logo_OSG.png";

export default function Cadastro() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function handleCadastro(e) {

    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      return alert("Preencha todos os campos.");
    }

    if (senha !== confirmarSenha) {
      return alert("As senhas não coincidem.");
    }

    if (senha.length < 6) {
      return alert("A senha deve ter pelo menos 6 caracteres.");
    }

    try {

      const credencial =
        await createUserWithEmailAndPassword(
          auth,
          email,
          senha
        );

      await salvarUsuario(
        credencial.user.uid,
        nome,
        email
      );

      alert("Cadastro realizado com sucesso!");

      navigate("/EscolhaMaterias");

    } catch (error) {

      alert(error.message);
    }
  }

  return (
    <div className="cadastro-container">

      <div className="cadastro-card">

        <div className="cadastro-left">

          <img
            src={Logo}
            alt="Online Study Group"
          />

          <h2>
            Online Study Group
          </h2>

        </div>

        <form
          className="cadastro-right"
          onSubmit={handleCadastro}
        >

          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) =>
              setConfirmarSenha(e.target.value)
            }
          />

          <button
            type="submit"
            className="btn-enviar"
          >
            Cadastrar
          </button>

        </form>

      </div>

    </div>
  );
}
import React from "react";
import "./grupo_economia.css";
import Logo from "../../assets/image/economia.png";
import Libras from "../../assets/image/libras.png";
import User1 from "../../assets/image/logo_OSG.png";
import User2 from "../../assets/image/logo_OSG.png";
import User3 from "../../assets/image/logo_OSG.png";
import { useNavigate } from "react-router-dom";

export function GrupoEconomia() {
  const navigate = useNavigate()
  return (
    <div className="grupo-container">

      {/* HEADER */}
      <header className="grupo-header">
        <div className="header-left">
          <span className="menu" onClick={() => navigate("/Sidebar")}>☰ Online study group</span>
          <span className="title"></span>
        </div>

        <div className="header-center">
          <span className="home" onClick={() => navigate("/Home")}>🏠Home</span>
          <input type="text" placeholder="Pesquisar" />
        </div>

        <div className="header-right">
          <span className="profile" onClick={() => navigate("/Profile")}>👤</span>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="grupo-content">

        {/* MENSAGENS */}
        <div className="chat-area">

          <div className="message left">
            <span className="bubble"></span>
          </div>

          <div className="message left">
            <span className="bubble"></span>
          </div>

          <div className="message left">
            <span className="bubble"></span>
          </div>

          <div className="message right">
            <span className="bubble right"></span>
          </div>

          <div className="message right">
            <span className="bubble right"></span>
          </div>

        </div>

        {/* SIDEBAR */}
        <aside className="grupo-sidebar">
          <img src={Logo} alt="Grupo" className="grupo-icon" />
          <span className="mail">✉️</span>

          <div className="users">
            <img src={User1} alt="" />
            <img src={User2} alt="" />
            <img src={User3} alt="" />
          </div>
        </aside>
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <button className="add">＋</button>
        <input type="text" placeholder="Digite aqui!" />
        <button className="send">➤</button>
      </div>

    </div>
  );
}

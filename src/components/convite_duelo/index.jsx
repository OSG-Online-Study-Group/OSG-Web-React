import React, { useState } from "react";
import "./convite_duelo.css";
import { useNavigate } from "react-router-dom";
import AvatarImg from "../../assets/image/avatar.png";

// Dados mockados — substitua pelos dados reais do backend
const convitesPendentes = [
  { id: 1, nome: "Luigi Delas",   materia: "Matemática",       avatar: AvatarImg },
  { id: 2, nome: "McLovin",       materia: "Ciências Humanas", avatar: AvatarImg },
  { id: 3, nome: "João Silva",    materia: "Linguagens",       avatar: AvatarImg },
];

const usuariosSugeridos = [
  { id: 4, nome: "Pedro Costa",   xp: "1.200 XP", avatar: AvatarImg },
  { id: 5, nome: "Ana Beatriz",   xp: "980 XP",   avatar: AvatarImg },
  { id: 6, nome: "Carlos Mendes", xp: "750 XP",   avatar: AvatarImg },
  { id: 7, nome: "Fernanda Lima", xp: "620 XP",   avatar: AvatarImg },
];

export function ConviteDuelo() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [convites, setConvites] = useState(convitesPendentes);
  const [enviados, setEnviados] = useState([]);

  const handleAceitar = (id) => {
    setConvites((prev) => prev.filter((c) => c.id !== id));
    navigate("/Duelo"); // redireciona para o duelo
  };

  const handleRecusar = (id) => {
    setConvites((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDesafiar = (id) => {
    setEnviados((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const usuariosFiltrados = usuariosSugeridos.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="duelo-page">

      {/* HEADER */}
      <header className="duelo-header">
        <button className="duelo-back" onClick={() => navigate(-1)}>←</button>
        <div className="duelo-header-center">
          <h1>Duelo Amigos</h1>
          <p>Desafie amigos e suba no ranking</p>
        </div>
        <div className="duelo-header-spacer" />
      </header>

      <div className="duelo-container">

        {/* CONVITES PENDENTES */}
        {convites.length > 0 && (
          <section className="duelo-section">
            <div className="section-title">
              <span className="section-dot" />
              <h2>Convites Pendentes</h2>
              <span className="section-badge">{convites.length}</span>
            </div>

            <div className="convites-list">
              {convites.map((c) => (
                <div className="convite-card" key={c.id}>
                  <img src={c.avatar} alt={c.nome} className="convite-avatar" />
                  <div className="convite-info">
                    <span className="convite-nome">{c.nome}</span>
                    <span className="convite-materia">⚔️ {c.materia}</span>
                  </div>
                  <div className="convite-acoes">
                    <button
                      className="btn-aceitar"
                      onClick={() => handleAceitar(c.id)}
                    >
                      ✓
                    </button>
                    <button
                      className="btn-recusar"
                      onClick={() => handleRecusar(c.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BUSCAR USUÁRIO */}
        <section className="duelo-section">
          <div className="section-title">
            <span className="section-dot" />
            <h2>Desafiar Usuário</h2>
          </div>

          <div className="busca-wrapper">
            <span className="busca-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar usuário pelo nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="duelo-input"
            />
          </div>

          <div className="usuarios-list">
            {usuariosFiltrados.length === 0 ? (
              <p className="sem-resultado">Nenhum usuário encontrado.</p>
            ) : (
              usuariosFiltrados.map((u) => (
                <div className="usuario-card" key={u.id}>
                  <img src={u.avatar} alt={u.nome} className="usuario-avatar" />
                  <div className="usuario-info">
                    <span className="usuario-nome">{u.nome}</span>
                    <span className="usuario-xp">{u.xp}</span>
                  </div>
                  <button
                    className={`btn-desafiar ${enviados.includes(u.id) ? "enviado" : ""}`}
                    onClick={() => handleDesafiar(u.id)}
                  >
                    {enviados.includes(u.id) ? "✓ Enviado" : "⚔️ Desafiar"}
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
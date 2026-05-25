import React from "react";
import "./home.css";

import { useNavigate } from "react-router-dom";


import Cover from "../../assets/image/cover.png";

import { useAuth } from "../../hooks/useAuth";

import AvatarImg from "../../assets/image/avatar.png";

export function Home() {

  const navigate = useNavigate();

  const { usuario } = useAuth();

  console.log(usuario);

  // Ícones
  const iconHome =
    "https://cdn-icons-png.flaticon.com/512/1946/1946488.png";

  const iconGame =
    "https://cdn-icons-png.flaticon.com/512/13/13973.png";

  const iconTrophy =
    "https://cdn-icons-png.flaticon.com/512/3112/3112946.png";

  const iconGroups =
    "https://cdn-icons-png.flaticon.com/512/166/166258.png";

  const iconProfile =
    "https://cdn-icons-png.flaticon.com/512/1077/1077063.png";

  const iconSearch =
    "https://cdn-icons-png.flaticon.com/512/54/54481.png";

  // Melhor matéria
  const melhorMateria =
    usuario?.xpPorGrupo
      ? Object.entries(usuario.xpPorGrupo)
        .sort((a, b) => b[1] - a[1])[0]?.[0]
        ?.replace("group_", "")
        ?.replaceAll("_", " ")
        ?.toUpperCase()
      : "-";

  return (
    <div className="app-layout">

      {/* MENU LATERAL */}
      <aside className="sidebar">

        <h1 className="sidebar-logo">
          OSG
        </h1>

        <nav className="sidebar-nav">

          <div
            className="nav-item"
            onClick={() => navigate("/Home")}
          >
            <img
              src={iconHome}
              alt="Home"
              className="nav-icon"
            />

            <span>Home</span>
          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/Game")}
          >
            <img
              src={iconGame}
              alt="Game"
              className="nav-icon"
            />

            <span>Game</span>
          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/Ranking")}
          >
            <img
              src={iconTrophy}
              alt="Ranking"
              className="nav-icon"
            />

            <span>Ranking</span>
          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/Grupos")}
          >
            <img
              src={iconGroups}
              alt="Grupos"
              className="nav-icon"
            />

            <span>Grupos</span>
          </div>

          <div
            className="nav-item"
            onClick={() => navigate("/Profile")}
          >
            <img
              src={iconProfile}
              alt="Perfil"
              className="nav-icon"
            />

            <span>Perfil</span>
          </div>

        </nav>

      </aside>

      {/* MAIN */}
      <main className="main-area">

        {/* TOPBAR */}
        <header className="topbar">

          <div className="search-box">

            <img
              src={iconSearch}
              alt="Pesquisar"
              className="search-icon"
            />

            <input
              type="text"
              placeholder="Pesquisar"
            />

          </div>

        </header>

        {/* CONTEÚDO */}
        <div className="content-scroll">

          {/* BANNER */}
          <section className="welcome-banner">

            <div className="glow left"></div>

            <div className="banner-content">

              <h2>
                BOAS VINDAS À OSG
              </h2>

              <h4>
                Online Study Group
              </h4>

              <p>
                Sua Comunidade de Estudos a distância
              </p>

            </div>

            <div className="glow right"></div>

          </section>

          {/* TITULO */}
          <div className="divider-title">

            <div className="dot pink"></div>

            <h3>
              Suas Estatísticas
            </h3>

            <div className="dot blue"></div>

          </div>

          {/* CARD */}
          <section className="statistics-card">

            {/* CAPA */}
            <div
              className="card-cover"
              style={{
                backgroundImage: `url(${Cover})`
              }}
            ></div>

            {/* PERFIL */}
            <div className="profile-center-info">

              <div className="avatar-wrapper">

                <img
                  src={usuario?.photo ? usuario.photo : AvatarImg}
                  alt="Perfil"
                />

              </div>

              <h2 className="user-name-title">

                {usuario?.name || "Usuário"}

              </h2>

            </div>

            {/* ESTATÍSTICAS */}
            <div className="stats-grid">

              <div className="stat-box">

                <p>XP</p>

                <h2>
                  {usuario?.xp || 0}
                </h2>

              </div>

              <div className="stat-box">

                <p>Level</p>

                <h2>
                  {usuario?.level || 1}
                </h2>

              </div>

              <div className="stat-box highlight">

                <p>Matéria Top</p>

                <h2>
                  {melhorMateria || "-"}
                </h2>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}
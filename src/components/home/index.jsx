import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import AvatarImg from "../../assets/image/avatar.png"
import Cover from "../../assets/image/cover.png"

export function Home() {
  const navigate = useNavigate();

  // URLs das imagens (Ícones)
  const iconHome = "https://cdn-icons-png.flaticon.com/512/1946/1946488.png";
  const iconGame = "https://cdn-icons-png.flaticon.com/512/13/13973.png";
  const iconTrophy = "https://cdn-icons-png.flaticon.com/512/3112/3112946.png";
  const iconGroups = "https://cdn-icons-png.flaticon.com/512/166/166258.png";
  const iconProfile = "https://cdn-icons-png.flaticon.com/512/1077/1077063.png";
  const iconSearch = "https://cdn-icons-png.flaticon.com/512/54/54481.png";
  const iconArrowDown = "https://cdn-icons-png.flaticon.com/512/2985/2985150.png";
  
  // URLs de Imagens (Conteúdo)
  const bannerIllustration = "https://via.placeholder.com/250x80/transparent/ffffff?text=Ilustracao+Comunidade";
  const casinoBgCover = "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80";
  const luigiProfileImg = "https://images.unsplash.com/photo-1615672968435-02f831fb6c18?auto=format&fit=crop&w=150&q=80";

  return (
    <div className="app-layout">
      
      {/* MENU LATERAL FIXO */}
      <aside className="sidebar">
        <h1 className="sidebar-logo">OSG</h1>
        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => navigate("/Home")}>
            <img src={iconHome} alt="Home" className="nav-icon" /> 
            <span>Home</span>
          </div>
          <div className="nav-item" onClick={() => navigate("/Game")}>
            <img src={iconGame} alt="Game" className="nav-icon" /> 
            <span>Game</span>
          </div>
          <div className="nav-item active" onClick={() => navigate("/Ranking")}>
            <img src={iconTrophy} alt="Ranking" className="nav-icon" /> 
            <span>Ranking</span>
          </div>
          <div className="nav-item" onClick={() => navigate("/Grupos")}>
            <img src={iconGroups} alt="Grupos" className="nav-icon" /> 
            <span>Grupos</span>
          </div>
          <div className="nav-item" onClick={() => navigate("/Profile")}>
            <img src={iconProfile} alt="Perfil" className="nav-icon" /> 
            <span>Perfil</span>
          </div>
        </nav>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="main-area">
        
        {/* CABEÇALHO SUPERIOR */}
        <header className="topbar">
          <div className="search-box">
            <img src={iconSearch} alt="Pesquisar" className="search-icon" />
            <input type="text" placeholder="Pesquisar" />
          </div>
          
          <div className="user-controls" onClick={() => navigate("/DuelosPendentes")}>
            <img src={iconGame} alt="Game" className="topbar-game-icon" />
            <div className="profile-dropdown">
            </div>
          </div>
        </header>

        {/* CONTEÚDO ROLÁVEL */}
        <div className="content-scroll">
          
          {/* BANNER */}
          <section className="welcome-banner">
            <div className="glow left"></div>
            <div className="banner-content">
              <h2>BOAS VINDAS Á OSG</h2>
              <h4>Online Study Group</h4>
              <p>Sua Comunidade de Estudos a distância</p>
              
            </div>
            <div className="glow right"></div>
          </section>

          {/* DIVISOR */}
          <div className="divider-title">
            <div className="dot pink"></div>
            <h3>Suas Estatísticas</h3>
            <div className="dot blue"></div>
          </div>

          {/* SESSÃO DE ESTATÍSTICAS */}
          <section className="statistics-card">
            {/* Capa */}
            <div 
              className="card-cover" 
              style={{ backgroundImage: `url(${Cover})` }}
            ></div>
            
            {/* Informações do Perfil */}
            <div className="profile-center-info">
              <div className="avatar-wrapper">
                <img src={AvatarImg} alt="Perfil" />
              </div>
              <h2 className="user-name-title">Matuconhas</h2>
            </div>

            {/* Cards Inferiores */}
            <div className="stats-grid">
              <div className="stat-box">
                <p>Vitórias</p>
                <h2>9</h2>
              </div>
              <div className="stat-box">
                <p>Ranking</p>
                <h2>2º</h2>
              </div>
              <div className="stat-box highlight">
                <p>Matéria Top</p>
                <h2>CIÊNCIAS<br/>HUMANAS</h2>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
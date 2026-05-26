import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import UserImg from "../../assets/image/user.png";
import Banner from "../../assets/image/cover.png";

const badges = [
  { id: 1, emoji: "🟡", label: "Ouro" },
  { id: 2, emoji: "💎", label: "Diamante" },
  { id: 3, emoji: "💵", label: "Rico" },
  { id: 4, emoji: "🟡", label: "Ouro II" },
  { id: 5, emoji: "💎", label: "Diamante II" },
];

const menuItems = [
  { icon: "💬", label: "Mensagem", action: "mensagem" },
  { icon: "✏️", label: "Editar Perfil", action: "editar" },
  { icon: "⚙️", label: "Configurações", action: "config" },
];

export default function Profile() {
  const navigate = useNavigate();
  const [showDevMessage, setShowDevMessage] = useState(false);

  const handleMenu = (action) => {
    switch (action) {
      case "mensagem":
        setShowDevMessage(true);
        setTimeout(() => setShowDevMessage(false), 3500); // Oculta após 3.5 segundos
        break;

      case "editar":
        navigate("/EditarPerfil");
        break;

      case "config":
        navigate("/Configuracoes");
        break;

      default:
        break;
    }
  };

  const handleLogout = () => {
    // limpe tokens/contexto aqui se necessário
    navigate("/Login");
  };

  return (
    <div className="profile-page">
      {/* Coluna central */}
      <div className="profile-column">
        {/* Banner */}
        <div className="profile-banner">
          <img src={Banner} alt="banner" className="banner-img" />

          <button
            className="profile-back"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
        </div>

        {/* Avatar sobreposto */}
        <div className="profile-avatar-wrap">
          <img
            src={UserImg}
            alt="avatar"
            className="profile-avatar"
          />
        </div>

        {/* Nome */}
        <div className="profile-info">
          <h1 className="profile-name">Luigi Delas</h1>

          {/* XP bar */}
          <div className="xp-bar">
            <span>1472 XP — Expert</span>
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">8</span>
              <span className="stat-label">Grupos</span>
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <span className="stat-value">1472</span>
              <span className="stat-label">XP</span>
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <span className="stat-value">5</span>
              <span className="stat-label">Expert</span>
            </div>
          </div>

          {/* Conquistas */}
          <div className="conquistas-section">
            <h2 className="conquistas-title">Conquistas</h2>

            <div className="badges-row">
              {badges.map((b) => (
                <div
                  className="badge-item"
                  key={b.id}
                  title={b.label}
                >
                  <span className="badge-emoji">{b.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apoie os Devs */}
          <div
            className="apoie-card"
            onClick={() => navigate("/Doacao")}
          >
            <div className="apoie-text">
              <strong>Apoie os Devs</strong>
              <span>Pague um café e ajude o app a crescer</span>
            </div>

            <span className="apoie-heart">♥</span>
          </div>

          {/* Menu */}
          <div className="profile-menu">
            {menuItems.map((item) => (
              <button
                key={item.action}
                className="menu-item"
                onClick={() => handleMenu(item.action)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                <span className="menu-arrow">›</span>
              </button>
            ))}

            {/* Divisor */}
            <div className="menu-divider" />

            {/* Logout */}
            <button
              className="menu-item logout-item"
              onClick={handleLogout}
            >
              <span className="menu-icon">🚪</span>
              <span className="menu-label">Sair da conta</span>
              <span className="menu-arrow">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tela Roxa Temporária */}
      {showDevMessage && (
        <div className="dev-message-overlay">
          <p>Os devs Ainda estão trabalhando nisso,<br />
           aguarde a season 2 da OSG</p>
        </div>
      )}
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import "./ranking.css";

export default function Ranking() {
  const navigate = useNavigate();

  const ranking = [
    { materia: "Matemática", pontos: "12.500 PTS", icon: "🧠", top: true },
    { materia: "Ciências Humanas", pontos: "10.500 PTS", icon: "🧬" },
    { materia: "Linguagens", pontos: "9.300 PTS", icon: "💡" },
    { materia: "Ciências da Natureza", pontos: "7.500 PTS", icon: "🔍" },
    { materia: "Informática", pontos: "6.240 PTS", icon: "💻" },
  ];

  return (
    <div className="ranking-page">
      <div className="ranking-container">

        {/* Header */}
     <header className="modo-header">
  <button className="back-btn" onClick={() => navigate("/Home")}>
    ← Voltar
  </button>
  <h1>Ranking de Matérias</h1>
  <div className="header-spacer" />  {/* ← espelho do botão */}
</header> 

        {/* Toggle button */}
        <div className="toggle-wrapper">
          <button className="toggle-btn" onClick={() => navigate("/RankingUser")}>
            <span className="toggle-icon">🔄</span>
            Ranking de Usuário
          </button>
        </div>

        {/* Ranking list */}
        <div className="ranking-list">
          {ranking.map((item, index) => (
            <div
              className={`ranking-item ${item.top ? "top-item" : ""}`}
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Position badge */}
              <div className="position-badge">
                {item.top ? "👑" : `#${index + 1}`}
              </div>

              {/* Icon */}
              <div className="icon-box">{item.icon}</div>

              {/* Bar */}
              <div
                className="ranking-bar"
                onClick={() => navigate("/RankingUser")}
              >
                <div className="bar-content">
                  <span className="materia">{item.materia}</span>
                  <span className="pts">{item.pontos}</span>
                </div>
                <div className="bar-arrow">›</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
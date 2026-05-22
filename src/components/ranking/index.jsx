import { useNavigate } from "react-router-dom";
import "./ranking.css";

export default function Ranking() {
  const navigate = useNavigate()
  const ranking = [
    { materia: "Matemática", pontos: "12.500 PTS", icon: "🧠", top: true },
    { materia: "Ciências Humanas", pontos: "10.500 PTS", icon: "🧬" },
    { materia: "Linguagens", pontos: "9.300 PTS", icon: "💡" },
    { materia: "Ciências da Natureza", pontos: "7.500 PTS", icon: "🔍" },
    { materia: "Informática", pontos: "6.240 PTS", icon: "💻" },
  ];

  return (
    <div className="ranking-page">

      {/* Navbar */}
      <header className="modo-header">
        <span className="voltar"></span>
        <h1>Ranking de Matérias</h1>
      </header>

      <button onClick={() => navigate("/RankingUser")}>
        🔄 Ranking de Usuário
      </button>

      {/* Title */}
      <h2 className="ranking-title"></h2>

      {/* Ranking list */}
      <div className="ranking-list">
        {ranking.map((item, index) => (
          <div className="ranking-item" key={index}>

            {item.top && <div className="crown">👑</div>}

            <div className="icon-box">{item.icon}</div>

            <div className="ranking-bar">
              <div className="text">
                <span className="materia" onClick={() => navigate("/RankingUser")}>{item.materia}</span>
                <span className="pts">{item.pontos}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
import "./rankingUser.css";
import User from "../../assets/image/user.png";
import { useNavigate } from "react-router-dom";

export default function RankingUser() {
  const navigate = useNavigate();

  const top3 = [
    { name: "McLovin", pts: "10.500 PTS", img: User, pos: 2 },
    { name: "McLovin", pts: "12.500 PTS", img: User, pos: 1 },
    { name: "McLovin", pts: "9.300 PTS",  img: User, pos: 3 },
  ];

  const users = [
    { name: "McLovin", pts: "7.500 PTS", img: User },
    { name: "McLovin", pts: "6.240 PTS", img: User },
    { name: "McLovin", pts: "5.800 PTS", img: User },
    { name: "McLovin", pts: "4.200 PTS", img: User },
    { name: "McLovin", pts: "3.100 PTS", img: User },
  ];

  return (
    <div className="rankingUser-page">

      {/* Header */}
      <header className="rankingUser-header">
        <button className="back-btn" onClick={() => navigate("/Ranking")}>
          ← Voltar
        </button>
        <h1>Ranking de Usuários</h1>
        <div className="header-spacer" />
      </header>

      <div className="rankingUser-container">

        {/* Podium Card */}
        <section className="rankingUser-card">
          <span className="materia-label">🏆 Matemática</span>

          <div className="top3">
            {top3.map((user) => (
              <div
                key={user.pos}
                className={`top-user ${user.pos === 1 ? "first" : "small"}`}
                style={{ animationDelay: `${user.pos * 0.1}s` }}
              >
                {user.pos === 1 && <div className="crown">👑</div>}
                <div className="avatar-wrapper">
                  <img src={user.img} alt={user.name} />
                  <div className="pos-badge">#{user.pos}</div>
                </div>
                <span className="top-name">{user.name}</span>
                <small className="top-pts">{user.pts}</small>
              </div>
            ))}
          </div>
        </section>

        {/* Ranking List */}
        <section className="rankingUser-list">
          {users.map((user, index) => (
            <div
              className="rankingUser-item"
              key={index}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span className="item-pos">#{index + 4}</span>
              <img src={user.img} alt={user.name} />
              <span className="name">{user.name}</span>
              <span className="points">{user.pts}</span>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
import "./rankingUser.css";
import User from "../../assets/image/user.png"
import { useNavigate } from "react-router-dom";

export default function RankingUser() {
  const navigate = useNavigate()
  const users = [
    { name: "McLovin", pts: "6.240 PTS", img: User },
    { name: "McLovin", pts: "6.240 PTS", img: User },
    { name: "McLovin", pts: "6.240 PTS", img: User },
    { name: "McLovin", pts: "6.240 PTS", img: User },
    { name: "McLovin", pts: "6.240 PTS", img: User },
  ];

  return (
    <div className="rankingUser-page">

      {/* Ranking Card */}
      <section className="rankingUser-card">

        <h2>Ranking de Usuário</h2>
        <span className="materia">Matemática</span>

        {/* Top 3 */}
        <div className="top3">

          <div className="top-user small">
            <img src={User} alt="" />
            <span>McLovin</span>
            <small>6.240 PTS</small>
          </div>

          <div className="top-user first">
            <div className="crown">👑</div>
            <img src={User} alt="" />
            <span>McLovin</span>
            <small>6.240 PTS</small>
          </div>

          <div className="top-user small">
            <img src={User} alt="" />
            <span>McLovin</span>
            <small>6.240 PTS</small>
          </div>

        </div>

      </section>

      {/* Ranking List */}
      <section className="rankingUser-list">
        {users.map((user, index) => (
          <div className="rankingUser-item" key={index}>
            <img src={user.img} alt="" />

            <span className="name">{user.name}</span>

            <span className="points">{user.pts}</span>
          </div>
        ))}
      </section>

    </div>
  );
}
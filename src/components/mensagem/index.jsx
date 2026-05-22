import "./chat.css";

const friends = [
  { name: "Makauli", img: "https://i.pravatar.cc/40?img=1" },
  { name: "Caiox", img: "https://i.pravatar.cc/40?img=2" },
  { name: "Natalie", img: "https://i.pravatar.cc/40?img=3" },
  { name: "McLove", img: "https://i.pravatar.cc/40?img=4" },
  { name: "Mc Pozinho", img: "https://i.pravatar.cc/40?img=5" },
  { name: "Reboco", img: "https://i.pravatar.cc/40?img=6" },
];

export default function Mensagem() {
  return (
    <div className="chat-container">

      <div className="friends-sidebar">

        <div className="back-button">↩</div>

        {friends.map((friend, index) => (
          <div className="friend" key={index}>
            <img src={friend.img} alt={friend.name} />
            <span>{friend.name}</span>
          </div>
        ))}

        <div className="hand-icon"></div>

      </div>

      <div className="chat-area">
        <div className="chat-placeholder">
          <div className="chat-icon">💬</div>
          <h2>Converse com algum amigo</h2>
        </div>
      </div>

    </div>
  );
}
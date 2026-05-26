import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import { useNavigate, useLocation } from "react-router-dom";

const CURRENT_USER = {
  id: 1,
  name: "Você",
};

const OTHER_USER = {
  id: 2,
  name: "Rivaldo",
};

const initialMessages = [
  {
    id: 1,
    user: OTHER_USER,
    text: "Bora jogar um duelo? 😈",
    time: "14:20",
    type: "text",
  },
  {
    id: 2,
    user: CURRENT_USER,
    text: "Pode vir! Tô pronto 💪",
    time: "14:21",
    type: "text",
  },
];

function getNow() {
  const now = new Date();
  return now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export default function Chat() {
  const navigate = useNavigate();
  // ✅ Lê o nome e ícone do grupo passados pela tela de Grupos
  const location = useLocation();
  const nomeGrupo  = location.state?.nomeGrupo  ?? "Grupo";
  const iconeGrupo = location.state?.iconeGrupo ?? "💬";

  const [messages, setMessages]       = useState(initialMessages);
  const [input, setInput]             = useState("");
  const [attachPreview, setAttachPreview] = useState(null);
  const [attachType, setAttachType]   = useState(null);
  const [attachName, setAttachName]   = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const fileInputRef  = useRef(null);
  const imageInputRef = useRef(null);
  const bottomRef     = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim() && !attachPreview) return;

    const newMsg = {
      id: Date.now(),
      user: CURRENT_USER,
      text: input.trim(),
      time: getNow(),
      type: attachPreview ? attachType : "text",
      attachment: attachPreview || null,
      attachName: attachName || null,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setAttachPreview(null);
    setAttachType(null);
    setAttachName("");
    setShowAttachMenu(false);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAttachPreview(ev.target.result);
      setAttachType("image");
      setAttachName(file.name);
    };
    reader.readAsDataURL(file);
    setShowAttachMenu(false);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAttachPreview("file");
    setAttachType("file");
    setAttachName(file.name);
    setShowAttachMenu(false);
  }

  function cancelAttach() {
    setAttachPreview(null);
    setAttachType(null);
    setAttachName("");
  }

  return (
    <div className="chat-container">
      {/* ── Header ── */}
      <header className="chat-header">
        <button className="voltar-btn" onClick={() => navigate(-1)}>❮</button>
        <div className="chat-header-info">
          {/* ✅ Exibe o ícone + nome do grupo vindo do estado de navegação */}
          <span className="chat-header-icone">{iconeGrupo}</span>
          <div>
            <span className="chat-header-name">{nomeGrupo}</span>
            <span className="chat-header-status">online</span>
          </div>
        </div>
      </header>

      {/* ── Mensagens ── */}
      <main className="chat-messages">
        {messages.map((msg) => {
          const isMe = msg.user.id === CURRENT_USER.id;
          return (
            <div key={msg.id} className={`chat-msg-row ${isMe ? "me" : "other"}`}>
              {/* ✅ Sem avatar — apenas o wrapper da bolha */}
              <div className="chat-bubble-wrap">
                {/* Nome visível apenas para mensagens de outros usuários */}
                {!isMe && (
                  <span className="chat-username">{msg.user.name}</span>
                )}
                <div className={`chat-bubble ${isMe ? "bubble-me" : "bubble-other"}`}>
                  {msg.type === "image" && msg.attachment && (
                    <img
                      src={msg.attachment}
                      alt="imagem"
                      className="chat-img-preview"
                    />
                  )}
                  {msg.type === "file" && (
                    <div className="chat-file">
                      <span className="chat-file-icon">📎</span>
                      <span className="chat-file-name">{msg.attachName}</span>
                    </div>
                  )}
                  {msg.text && <p className="chat-text">{msg.text}</p>}
                  <span className="chat-time">{msg.time}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </main>

      {/* ── Barra de preview de anexo ── */}
      {attachPreview && (
        <div className="attach-preview-bar">
          {attachType === "image" ? (
            <img src={attachPreview} alt="preview" className="attach-thumb" />
          ) : (
            <span className="attach-file-preview">📎 {attachName}</span>
          )}
          <button className="attach-cancel" onClick={cancelAttach}>✕</button>
        </div>
      )}

      {/* ── Input ── */}
      <footer className="chat-footer">
        <div className="attach-wrapper">
          <button
            className="attach-btn"
            onClick={() => setShowAttachMenu((v) => !v)}
            title="Anexar"
          >
            ＋
          </button>
          {showAttachMenu && (
            <div className="attach-menu">
              <button onClick={() => imageInputRef.current.click()}>
                🖼️ Imagem
              </button>
              <button onClick={() => fileInputRef.current.click()}>
                📄 Arquivo
              </button>
            </div>
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <textarea
          className="chat-input"
          placeholder="Digite uma mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
        />

        <button
          className={`send-btn ${input.trim() || attachPreview ? "active" : ""}`}
          onClick={handleSend}
        >
          ➤
        </button>
      </footer>
    </div>
  );
}

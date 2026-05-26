import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import { useNavigate } from "react-router-dom";

const CURRENT_USER = {
  id: 1,
  name: "Você",
  avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=voce&backgroundColor=6d28d9",
};

const OTHER_USER = {
  id: 2,
  name: "Rival",
  avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=rival&backgroundColor=c026d3",
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
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [attachPreview, setAttachPreview] = useState(null);
  const [attachType, setAttachType] = useState(null);
  const [attachName, setAttachName] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const bottomRef = useRef(null);

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
      {/* Header */}
      <header className="chat-header">
        <button className="voltar-btn" onClick={() => navigate(-1)}>❮</button>
        <div className="chat-header-info">
          <img
            src={OTHER_USER.avatar}
            alt={OTHER_USER.name}
            className="chat-header-avatar"
          />
          <div>
            <span className="chat-header-name">Grupo</span>
            <span className="chat-header-status"></span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="chat-messages">
        {messages.map((msg) => {
          const isMe = msg.user.id === CURRENT_USER.id;
          return (
            <div key={msg.id} className={`chat-msg-row ${isMe ? "me" : "other"}`}>
              {!isMe && (
                <img src={msg.user.avatar} alt={msg.user.name} className="chat-avatar" />
              )}
              <div className="chat-bubble-wrap">
                {!isMe && <span className="chat-username">{msg.user.name}</span>}
                <div className={`chat-bubble ${isMe ? "bubble-me" : "bubble-other"}`}>
                  {msg.type === "image" && msg.attachment && (
                    <img src={msg.attachment} alt="imagem" className="chat-img-preview" />
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
              {isMe && (
                <img src={msg.user.avatar} alt={msg.user.name} className="chat-avatar" />
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </main>

      {/* Attach preview bar */}
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

      {/* Input */}
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

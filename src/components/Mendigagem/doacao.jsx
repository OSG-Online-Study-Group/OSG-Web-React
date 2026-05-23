import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./doacao.css";
import Logo from "../../assets/image/logo_OSG.png"; // ajuste o caminho se necessário

const PIX_KEY = "seu-email@exemplo.com"; // ← troque pela chave pix real
const BUYMEACOFFEE_URL = "https://buymeacoffee.com/seu-usuario"; // ← troque pela URL real

// QR Code gerado via API pública (substitua pela imagem real se preferir)
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(PIX_KEY)}&bgcolor=1a0630&color=d63acd&qzone=2`;

export default function Doacao() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null); // null | "qr" | "pix" | "coffee"
  const [copied, setCopied] = useState(false);

  const toggle = (card) => {
    if (card === "coffee") {
      window.open(BUYMEACOFFEE_URL, "_blank");
      return;
    }
    setOpen((prev) => (prev === card ? null : card));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="doacao-page">

      {/* Botão voltar quase invisível */}
      <button className="doacao-back" onClick={() => navigate(-1)}>
        ← voltar
      </button>

      {/* Logo */}
      <div className="doacao-logo-wrapper">
        <img src={Logo} alt="OSG Logo" className="doacao-logo" />
      </div>

      {/* Hero text */}
      <section className="doacao-hero">
        <h1>Apoie o projeto <span>✦</span></h1>
        <p>
          Cada contribuição ajuda a manter o OSG vivo e gratuito para todos.
          Escolha como quer apoiar a gente!
        </p>
      </section>

      {/* Cards */}
      <div className="doacao-cards">

        {/* Card QR Code */}
        <div
          className={`doacao-card ${open === "qr" ? "active" : ""}`}
          onClick={() => toggle("qr")}
        >
          <div className="card-face">
            <div className="card-icon qr-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none" />
                <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none" />
                <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none" />
                <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 17v3" />
              </svg>
            </div>
            <span className="card-label">Pix<br />QR Code</span>
          </div>

          <div className={`card-expand ${open === "qr" ? "open" : ""}`}>
            <img src={QR_URL} alt="QR Code Pix" className="qr-img" />
            <p className="expand-hint">Aponte a câmera para pagar</p>
          </div>
        </div>

        {/* Card Copia e Cola */}
        <div
          className={`doacao-card ${open === "pix" ? "active" : ""}`}
          onClick={() => toggle("pix")}
        >
          <div className="card-face">
            <div className="card-icon pix-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1" />
                <rect x="8" y="3" width="12" height="13" rx="2" />
                <path d="M11 9h6M11 13h4" />
              </svg>
            </div>
            <span className="card-label">Pix<br />Copia e Cola</span>
          </div>

          <div className={`card-expand ${open === "pix" ? "open" : ""}`}>
            <div className="pix-key-box">
              <span className="pix-key-text">{PIX_KEY}</span>
            </div>
            <button
              className={`copy-btn ${copied ? "copied" : ""}`}
              onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            >
              {copied ? "✓ Copiado!" : "Copiar chave"}
            </button>
          </div>
        </div>

        {/* Card Buy Me a Coffee */}
        <div
          className="doacao-card coffee-card"
          onClick={() => toggle("coffee")}
        >
          <div className="card-face">
            <div className="card-icon coffee-icon">
              ☕
            </div>
            <span className="card-label">Buy Me<br />a Coffee</span>
          </div>
          <div className="coffee-arrow">↗</div>
        </div>

      </div>

      {/* Mensagem */}
      <section className="doacao-msg-section">
        <label className="msg-label">Deixe uma mensagem para os devs 💜</label>
        <textarea
          className="doacao-textarea"
          placeholder="Escreva algo aqui..."
          rows={4}
        />
        <button className="msg-send-btn">Enviar mensagem</button>
      </section>

      {/* Rodapé suave */}
      <p className="doacao-footer">Feito com 💜 pelo time OSG</p>

    </div>
  );
}
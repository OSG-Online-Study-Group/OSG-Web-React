import React, { useState, useRef } from "react";
import "./editar_perfil.css";
import { useNavigate } from "react-router-dom";

import DEFAULT_AVATAR from "../../assets/image/avatar.png";

const BANNER_COLORS = [
  { id: "salmon",  hex: "#F87171" },
  { id: "purple",  hex: "#7C3AED" },
  { id: "teal",    hex: "#2DD4BF" },
  { id: "rose",    hex: "#FB7185" },
];

export default function EditarPerfil() {
  const navigate = useNavigate();

  const [nome, setNome]               = useState("Luigi Delas");
  const [avatar, setAvatar]           = useState(DEFAULT_AVATAR);
  const [bannerImg, setBannerImg]     = useState(null);
  const [bannerColor, setBannerColor] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  /* ── Avatar ── */
  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleVoltarPadrao() {
    setAvatar(DEFAULT_AVATAR);
  }

  /* ── Banner ── */
  function handleBannerChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setBannerImg(ev.target.result);
      setBannerColor(null);
      setSelectedColor(null);
    };
    reader.readAsDataURL(file);
  }

  function handleRemoverBanner() {
    setBannerImg(null);
    setBannerColor(null);
    setSelectedColor(null);
  }

  function handleSelectColor(color) {
    setSelectedColor(color.id);
    setBannerColor(color.hex);
    setBannerImg(null);
  }

  /* ── Salvar ── */
  function handleSalvar() {
    // Aqui você integraria com seu contexto/API de usuário
    console.log("Salvo:", { nome, avatar });
    navigate(-1);
  }

  /* ── Banner style ── */
  const bannerStyle = bannerImg
    ? { backgroundImage: `url(${bannerImg})`, backgroundSize: "cover", backgroundPosition: "center" }
    : bannerColor
    ? { background: bannerColor }
    : {};

  return (
    <div className="ep-container">

      {/* ── Banner clicável ── */}
      <div
        className="ep-banner"
        style={bannerStyle}
        onClick={() => bannerInputRef.current.click()}
        title="Clique para mudar o banner"
      >
        {!bannerImg && !bannerColor && (
          <div className="ep-banner-placeholder">
            <span className="ep-banner-icon">🖼️</span>
            <span className="ep-banner-hint">Toque para adicionar banner</span>
          </div>
        )}
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleBannerChange}
        />
      </div>

      {/* ── Avatar sobreposto ao banner ── */}
      <div className="ep-avatar-wrap">
        <img src={avatar} alt="avatar" className="ep-avatar" />
        <button
          className="ep-avatar-edit-btn"
          onClick={() => avatarInputRef.current.click()}
          title="Mudar foto"
        >
          ✏️
        </button>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
      </div>

      {/* ── Corpo do formulário ── */}
      <div className="ep-body">

        {/* Botões de ação do avatar/banner */}
        <div className="ep-actions">
          <button className="ep-action-btn" onClick={() => avatarInputRef.current.click()}>
            Mudar Foto
          </button>
          <button className="ep-action-btn" onClick={handleVoltarPadrao}>
            Voltar foto padrão
          </button>
          <button className="ep-action-btn" onClick={handleRemoverBanner}>
            Remover plano de fundo
          </button>
        </div>

        {/* Paleta de cores do banner */}
        <div className="ep-colors">
          {BANNER_COLORS.map((color) => (
            <button
              key={color.id}
              className={`ep-color-dot ${selectedColor === color.id ? "active" : ""}`}
              style={{ background: color.hex }}
              onClick={() => handleSelectColor(color)}
              title={color.id}
            />
          ))}
        </div>

        {/* Campo nome */}
        <label className="ep-label">Nome</label>
        <input
          className="ep-input"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          maxLength={40}
        />

        {/* Botões finais */}
        <div className="ep-footer-btns">
          <button className="ep-btn ep-btn-cancel" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button className="ep-btn ep-btn-save" onClick={handleSalvar}>
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
}

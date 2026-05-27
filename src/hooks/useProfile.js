import { useEffect, useState } from "react";
import { uploadImagem } from "../services/cloudinary";
import { atualizarPerfil } from "../services/firestore";
import { useAuth } from "./useAuth";

export function useProfile() {
  const { usuario, firebaseUser, refreshUsuario } = useAuth();
  const [foto, setFoto] = useState(null);
  const [theme, setTheme] = useState(null);
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setFoto(usuario?.photo || null);
    setTheme(usuario?.theme || null);
    setNome(usuario?.name || "");
  }, [usuario]);

  async function escolherFoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      setFoto(await uploadImagem(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function salvar() {
    if (!firebaseUser || !nome.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = { photo: foto, theme: theme || null, name: nome.trim() };
      await atualizarPerfil(firebaseUser.uid, data);
      refreshUsuario(data);
      setMessage("Perfil atualizado com sucesso.");
    } catch {
      setError("Não foi possível salvar seu perfil.");
    } finally {
      setLoading(false);
    }
  }

  return {
    foto,
    theme,
    nome,
    setTheme,
    setNome,
    escolherFoto,
    salvar,
    removerFoto: () => setFoto(null),
    loading,
    message,
    error,
  };
}

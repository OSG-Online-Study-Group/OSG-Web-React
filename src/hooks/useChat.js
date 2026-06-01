import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { enviarMensagem, ouvirMensagens, deletarMensagem } from "../services/chat";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export function useChat(groupId) {
  const { firebaseUser, usuario } = useAuth();

  const [mensagens, setMensagens] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!groupId) return;
    return ouvirMensagens(
      groupId,
      (messages) => {
        setMensagens(messages);
        setCarregando(false);
      },
      () => {
        setErro("Não foi possível carregar as mensagens.");
        setCarregando(false);
      },
    );
  }, [groupId]);

  useEffect(() => {
    if (!firebaseUser) return;
    async function verificarAdmin() {
      const snap = await getDoc(doc(db, "admins", firebaseUser.uid));
      setIsAdmin(snap.exists() && snap.data()?.admin === true);
    }
    verificarAdmin().catch(() => setIsAdmin(false));
  }, [firebaseUser]);

  async function handleSend() {
    if (!newMessage.trim() || !firebaseUser) return;
    try {
      await enviarMensagem(
        groupId,
        firebaseUser.uid,
        usuario?.name || "Usuário",
        newMessage,
        usuario?.photo || null,
      );
      setNewMessage("");
    } catch {
      setErro("Não foi possível enviar a mensagem.");
    }
  }

  async function handleDelete(messageId) {
    try {
      await deletarMensagem(groupId, messageId);
    } catch {
      setErro("Você não tem permissão para remover esta mensagem.");
    }
  }

  return {
    messages: mensagens,
    newMessage,
    setNewMessage,
    handleSend,
    handleDelete,
    user: firebaseUser,
    isAdmin,
    carregando,
    erro,
  };
}

import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { enviarMensagem, ouvirMensagens, deletarMensagem } from "../services/chat";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { buscarUsuario } from "../../services/firestore";

export function useChat(groupId) {
  const { firebaseUser, usuario } = useAuth();

  const [mensagens, setMensagens] = useState([]);
  const [usuariosMap, setUsuariosMap] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!groupId) return;

    const unsub = ouvirMensagens(groupId, async (msgs) => {
      setMensagens(msgs);
      setCarregando(false);

      // 🔥 pegar IDs únicos
      const ids = [...new Set(msgs.map((m) => m.senderId))];

      const novosUsuarios = {};

      for (let id of ids) {
        if (!usuariosMap[id]) {
          const userData = await buscarUsuario(id);
          if (userData) {
            novosUsuarios[id] = userData;
          }
        }
      }

      if (Object.keys(novosUsuarios).length > 0) {
        setUsuariosMap((prev) => ({
          ...prev,
          ...novosUsuarios,
        }));
      }
    });

    return () => unsub();
  }, [groupId]);

  useEffect(() => {
    if (!firebaseUser) return;
    async function verificarAdmin() {
      const snap = await getDoc(doc(db, "admins", firebaseUser.uid));
      setIsAdmin(snap.exists());
    }
    verificarAdmin();
  }, [firebaseUser]);

  async function handleSend() {
    if (!newMessage.trim() || !firebaseUser) return;

    await enviarMensagem(
      groupId,
      firebaseUser.uid,
      usuario?.name || "Usuário",
      newMessage,
      usuario?.photo || null
    );

    setNewMessage("");
  }

  async function handleDelete(messageId) {
    await deletarMensagem(groupId, messageId);
  }

  return {
    messages: mensagens,
    usuariosMap,
    newMessage,
    setNewMessage,
    handleSend,
    handleDelete,
    user: firebaseUser,
    isAdmin,
    carregando,
  };
}
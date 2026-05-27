import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function enviarMensagem(groupId, uid, senderName, text, senderPhoto = null) {
  const value = text.trim();
  if (!groupId || !uid || !value) return;
  await addDoc(collection(db, "groups", groupId, "messages"), {
    text: value,
    senderId: uid,
    senderName: senderName || "Usuario",
    senderPhoto,
    createdAt: serverTimestamp(),
    deleted: false,
  });
}

export function ouvirMensagens(groupId, callback, onError) {
  const messagesQuery = query(
    collection(db, "groups", groupId, "messages"),
    orderBy("createdAt", "asc"),
  );
  return onSnapshot(
    messagesQuery,
    (snapshot) => callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))),
    onError,
  );
}

export async function deletarMensagem(groupId, messageId) {
  await updateDoc(doc(db, "groups", groupId, "messages", messageId), {
    deleted: true,
  });
}

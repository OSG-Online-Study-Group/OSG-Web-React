import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export async function enviarMensagem(
  groupId,
  uid,
  senderName,
  text,
  senderPhoto = null
) {
  if (!groupId || !uid || !text.trim()) return;

  await addDoc(collection(db, "groups", groupId, "messages"), {
    text: text.trim(),
    senderId: uid,
    senderName: senderName || "Usuário",
    senderPhoto,
    createdAt: serverTimestamp(),
    deleted: false,
  });
}

export function ouvirMensagens(groupId, callback) {
  const q = query(
    collection(db, "groups", groupId, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    const msgs = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }));
    callback(msgs);
  });
}

export async function deletarMensagem(groupId, messageId) {
  await updateDoc(doc(db, "groups", groupId, "messages", messageId), {
    deleted: true,
  });
}
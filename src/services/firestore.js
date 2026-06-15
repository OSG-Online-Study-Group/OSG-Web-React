import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { enviarMensagemParaIA } from "./openrouter";
import { MULTIPLE_CHOICE_RULES, parseQuizMultiplaEscolha } from "./aiQuestionParser";

export function calcularLevel(xp) {
  if (xp >= 2500) return 7;
  if (xp >= 1500) return 6;
  if (xp >= 1000) return 5;
  if (xp >= 600) return 4;
  if (xp >= 300) return 3;
  if (xp >= 100) return 2;
  return 1;
}

export function getTituloLevel(level) {
  return {
    1: "Iniciante",
    2: "Estudante",
    3: "Dedicado",
    4: "Avançado",
    5: "Expert",
    6: "Mestre",
    7: "Lendário",
  }[level] || "Iniciante";
}

export async function salvarUsuario(uid, nome, email) {
  await setDoc(doc(db, "users", uid), {
    name: nome,
    email,
    xp: 0,
    level: 1,
    photo: null,
    theme: null,
    groupIds: [],
    xpPorGrupo: {},
    lastDailyQuizDate: null,
    createdAt: serverTimestamp(),
  });
}

export async function buscarUsuario(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? { uid, ...snapshot.data() } : null;
}

export async function atualizarXP(uid, xpGanho, groupId = null) {
  const reference = doc(db, "users", uid);
  const snapshot = await getDoc(reference);
  const novoXP = (snapshot.data()?.xp || 0) + xpGanho;
  const novoLevel = calcularLevel(novoXP);
  const fields = { xp: increment(xpGanho), level: novoLevel };
  if (groupId) fields[`xpPorGrupo.${groupId}`] = increment(xpGanho);
  await updateDoc(reference, fields);
  return { novoXP, novoLevel };
}

export async function atualizarPerfil(uid, data) {
  await updateDoc(doc(db, "users", uid), data);
}

export async function registrarQuizDiario(uid, dateKey) {
  await updateDoc(doc(db, "users", uid), { lastDailyQuizDate: dateKey });
}

export async function entrarNosGrupos(uid, groupIds) {
  if (!groupIds.length) return;
  await updateDoc(doc(db, "users", uid), { groupIds: arrayUnion(...groupIds) });
  await Promise.all(
    groupIds.map((groupId) =>
      updateDoc(doc(db, "groups", groupId), { members: arrayUnion(uid) }),
    ),
  );
}

export async function buscarGruposDoUsuario(uid) {
  const user = await buscarUsuario(uid);
  const groupIds = user?.groupIds || [];
  const groups = await Promise.all(groupIds.map((groupId) => getDoc(doc(db, "groups", groupId))));
  return groups.filter((group) => group.exists()).map((group) => ({ id: group.id, ...group.data() }));
}

export async function buscarGrupo(groupId) {
  const snapshot = await getDoc(doc(db, "groups", groupId));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export function ouvirRankingGeral(callback, onError) {
  const rankingQuery = query(collection(db, "users"), orderBy("xp", "desc"), limit(50));
  return onSnapshot(
    rankingQuery,
    (snapshot) => callback(snapshot.docs.map((item) => ({ uid: item.id, ...item.data() }))),
    onError,
  );
}

export function ouvirUsuarios(callback, onError) {
  return onSnapshot(
    collection(db, "users"),
    (snapshot) => callback(snapshot.docs.map((item) => ({ uid: item.id, ...item.data() }))),
    onError,
  );
}

async function gerarPerguntasDuelo() {
  const topics = ["Matematica", "Fisica", "Quimica", "Biologia", "Historia", "Portugues"];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const response = await enviarMensagemParaIA(`
    Gere 5 perguntas de multipla escolha de ensino medio sobre ${topic}.
    Retorne somente JSON: {"perguntas":[{"pergunta":"texto","alternativas":["A","B","C","D"],"correta":0}]}.
    Cada alternativa precisa trazer conteúdo real e completo, sem usar apenas letras, números soltos ou rótulos como "A)".
    A interface já exibe as letras das alternativas, então não repita isso no texto da IA.
    ${MULTIPLE_CHOICE_RULES}
  `);
  return parseQuizMultiplaEscolha(response)?.perguntas || null;
}

export async function criarDuelo(desafianteId, desafianteNome, desafiadoId, desafiadoNome) {
  const pendingQuery = query(
    collection(db, "duelos"),
    where("desafianteId", "==", desafianteId),
    where("status", "==", "pendente"),
  );
  const pending = await getDocs(pendingQuery);
  if (pending.size >= 3) throw new Error("Voce ja tem 3 duelos pendentes.");

  const perguntas = await gerarPerguntasDuelo();
  if (!perguntas) throw new Error("Nao foi possivel gerar perguntas.");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const reference = await addDoc(collection(db, "duelos"), {
    desafianteId,
    desafianteNome,
    desafiadoId,
    desafiadoNome,
    status: "pendente",
    perguntas,
    respostas: { [desafianteId]: [], [desafiadoId]: [] },
    pontosDesafiante: null,
    pontosDesafiado: null,
    vencedorId: null,
    criadoEm: serverTimestamp(),
    expiraEm: expiresAt,
  });
  return reference.id;
}

export async function responderDesafio(dueloId, aceitar) {
  await updateDoc(doc(db, "duelos", dueloId), { status: aceitar ? "ativo" : "recusado" });
}

export async function salvarRespostaDuelo(dueloId, uid, respostas) {
  const reference = doc(db, "duelos", dueloId);
  const snapshot = await getDoc(reference);
  if (!snapshot.exists()) throw new Error("Duelo nao encontrado.");
  const duelo = snapshot.data();
  const pontos = respostas.filter((answer, index) => answer === duelo.perguntas[index].correta).length;
  const isChallenger = uid === duelo.desafianteId;
  await updateDoc(reference, {
    [`respostas.${uid}`]: respostas,
    [isChallenger ? "pontosDesafiante" : "pontosDesafiado"]: pontos,
  });
  const latest = (await getDoc(reference)).data();
  if (latest.pontosDesafiante === null || latest.pontosDesafiado === null) return;
  const vencedorId =
    latest.pontosDesafiante === latest.pontosDesafiado
      ? "empate"
      : latest.pontosDesafiante > latest.pontosDesafiado
        ? duelo.desafianteId
        : duelo.desafiadoId;
  await updateDoc(reference, { status: "finalizado", vencedorId });
  if (vencedorId === "empate") {
    await Promise.all([atualizarXP(duelo.desafianteId, 10), atualizarXP(duelo.desafiadoId, 10)]);
  } else {
    await atualizarXP(vencedorId, 25);
  }
}

export async function verificarDuelosExpirados(uid) {
  const pendingQuery = query(
    collection(db, "duelos"),
    where("desafiadoId", "==", uid),
    where("status", "==", "pendente"),
  );
  const snapshot = await getDocs(pendingQuery);
  const now = new Date().toISOString();
  await Promise.all(
    snapshot.docs
      .filter((item) => item.data().expiraEm < now)
      .map((item) => updateDoc(doc(db, "duelos", item.id), { status: "cancelado" })),
  );
}

export function ouvirDuelosPendentes(uid, callback, onError) {
  const pendingQuery = query(
    collection(db, "duelos"),
    where("desafiadoId", "==", uid),
    where("status", "==", "pendente"),
  );
  return onSnapshot(
    pendingQuery,
    (snapshot) => callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))),
    onError,
  );
}

export function ouvirDuelo(dueloId, callback, onError) {
  return onSnapshot(
    doc(db, "duelos", dueloId),
    (snapshot) => callback(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null),
    onError,
  );
}

export async function buscarUsuarios(searchTerm) {
  const snapshot = await getDocs(collection(db, "users"));
  const value = searchTerm.trim().toLowerCase();
  return snapshot.docs
    .map((item) => ({ uid: item.id, ...item.data() }))
    .filter((user) => user.name?.toLowerCase().includes(value));
}

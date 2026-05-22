import {
  doc, setDoc, getDoc, updateDoc,
  collection, query, where, getDocs,
  arrayUnion, increment, orderBy, serverTimestamp, 
  onSnapshot, addDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { enviarMensagemParaIA } from "./openrouter";

// ─── Level ───────────────────────────────────────────
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
  const titulos = {
    1: "Iniciante",
    2: "Estudante",
    3: "Dedicado",
    4: "Avançado",
    5: "Expert",
    6: "Mestre",
    7: "Lendário",
  };
  return titulos[level] || "Iniciante";
}

// ─── USUÁRIOS ──────────────────────────────────────────────

// Cria documento do usuário após cadastro
export async function salvarUsuario(uid, nome, email) {
  await setDoc(doc(db, "users", uid), {
    name: nome,
    email: email,


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

// Busca dados completos do usuário
export async function buscarUsuario(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}

// Incrementa XP e recalcula nível
export async function atualizarXP(uid, xpGanho, groupId = null) {
  const ref = doc(db, "users", uid);

  // Busca XP atual para calcular novo level
  const snap = await getDoc(ref);
  const xpAtual = snap.data()?.xp || 0;
  const novoXP = xpAtual + xpGanho;
  const novoLevel = calcularLevel(novoXP);

  const update = {
    xp: increment(xpGanho),
    level: novoLevel,
  };

  if (groupId) {
    update[`xpPorGrupo.${groupId}`] = increment(xpGanho);
  }

  await updateDoc(ref, update);

  return { novoXP, novoLevel };
}

// ─── PERFIL ──────────────────────────────────────────────

export async function atualizarPerfil(uid, dados) {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, dados);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error;
  }
}

// ─── GRUPOS ────────────────────────────────────────────────

// Adiciona usuário aos grupos selecionados no cadastro
// groupIds[] → lista de IDs dos grupos escolhidos
export async function entrarNosGrupos(uid, groupIds) {
  if (!groupIds || groupIds.length === 0) return;

  // usuário
  await updateDoc(doc(db, "users", uid), {
    groupIds: arrayUnion(...groupIds),
  });

  // grupos
  const promises = groupIds.map(async (groupId) => {
    const ref = doc(db, "groups", groupId);

    await updateDoc(ref, {
      members: arrayUnion(uid),
    });
  });

  await Promise.all(promises);
}

// Busca os grupos em que o usuário está
export async function buscarGruposDoUsuario(uid) {
  const userSnap = await getDoc(doc(db, "users", uid));
  if (!userSnap.exists()) return [];

  const groupIds = userSnap.data().groupIds || [];
  if (groupIds.length === 0) return [];

  // Busca cada grupo pelo id
  const promises = groupIds.map((id) => getDoc(doc(db, "groups", id)));
  const snaps = await Promise.all(promises);

  return snaps
    .filter((s) => s.exists())
    .map((s) => ({ id: s.id, ...s.data() }));
}

// Busca membros de um grupo ordenados por XP
export async function buscarMembrosDoGrupo(groupId) {
  const q = query(
    collection(db, "users"),
    where("groupIds", "array-contains", groupId),
    orderBy("xp", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
}

// ─── DUELOS ──────────────────────────────────────────

async function gerarPerguntasDuelo() {
  const materias = [
    "Matemática", "Física", "Química", "Biologia",
    "História", "Geografia", "Português", "Informática",
  ];
  const materia = materias[Math.floor(Math.random() * materias.length)];

  const prompt = `
    Gere 5 perguntas de múltipla escolha de nível ensino médio sobre ${materia}.
    Retorne SOMENTE um JSON válido no formato:
    {
      "perguntas": [
        {
          "pergunta": "texto",
          "alternativas": ["A", "B", "C", "D"],
          "correta": 0
        }
      ]
    }
    Regras:
    - Exatamente 5 perguntas.
    - Exatamente 4 alternativas por pergunta.
    - "correta" é índice 0 a 3.
    - Sem markdown.
  `;

  try {
    const resposta = await enviarMensagemParaIA(prompt);
    const match = resposta?.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    if (!Array.isArray(parsed.perguntas) || parsed.perguntas.length !== 5) return null;
    return parsed.perguntas;
  } catch {
    return null;
  }
}

export async function criarDuelo(desafianteId, desafianteNome, desafiadoId, desafiadoNome) {
  // Verifica limite de 3 duelos pendentes
  const q = query(
    collection(db, "duelos"),
    where("desafianteId", "==", desafianteId),
    where("status", "==", "pendente")
  );
  const snap = await getDocs(q);
  if (snap.size >= 3) {
    throw new Error("Você já tem 3 duelos pendentes. Aguarde uma resposta.");
  }

  const perguntas = await gerarPerguntasDuelo();
  if (!perguntas) throw new Error("Erro ao gerar perguntas. Tente novamente.");

  const agora = new Date();
  const expiraEm = new Date(agora.getTime() + 24 * 60 * 60 * 1000);

  const ref = await addDoc(collection(db, "duelos"), {
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
    expiraEm: expiraEm.toISOString(),
  });

  return ref.id;
}

export async function responderDesafio(dueloId, aceitar) {
  const status = aceitar ? "ativo" : "recusado";
  await updateDoc(doc(db, "duelos", dueloId), { status });
}

export async function salvarRespostaDuelo(dueloId, userId, respostas) {
  const dueloSnap = await getDoc(doc(db, "duelos", dueloId));
  if (!dueloSnap.exists()) throw new Error("Duelo não encontrado.");

  const duelo = dueloSnap.data();
  const { desafianteId, desafiadoId, perguntas } = duelo;

  // Calcula pontos do jogador atual
  const pontos = respostas.filter(
    (resp, i) => resp === perguntas[i].correta
  ).length;

  const isDesafiante = userId === desafianteId;
  const campoRespostas = `respostas.${userId}`;
  const campoPontos = isDesafiante ? "pontosDesafiante" : "pontosDesafiado";

  await updateDoc(doc(db, "duelos", dueloId), {
    [campoRespostas]: respostas,
    [campoPontos]: pontos,
  });

  // Verifica se ambos responderam para finalizar
  const novoSnap = await getDoc(doc(db, "duelos", dueloId));
  const novo = novoSnap.data();

  const ambosResponderam =
    novo.pontosDesafiante !== null && novo.pontosDesafiado !== null;

  if (ambosResponderam) {
    const vencedorId =
      novo.pontosDesafiante > novo.pontosDesafiado ? desafianteId :
      novo.pontosDesafiado > novo.pontosDesafiante ? desafiadoId :
      "empate";

    await updateDoc(doc(db, "duelos", dueloId), {
      status: "finalizado",
      vencedorId,
    });

    // Distribui XP
    if (vencedorId === "empate") {
      await atualizarXP(desafianteId, 10);
      await atualizarXP(desafiadoId, 10);
    } else {
      await atualizarXP(vencedorId, 25);
    }
  }
}

export async function verificarDuelosExpirados(uid) {
  const agora = new Date().toISOString();
  const q = query(
    collection(db, "duelos"),
    where("desafiadoId", "==", uid),
    where("status", "==", "pendente")
  );
  const snap = await getDocs(q);
  const promises = snap.docs
    .filter((d) => d.data().expiraEm < agora)
    .map((d) => updateDoc(doc(db, "duelos", d.id), { status: "cancelado" }));
  await Promise.all(promises);
}

export function ouvirDuelosPendentes(uid, callback) {
  const q = query(
    collection(db, "duelos"),
    where("desafiadoId", "==", uid),
    where("status", "==", "pendente")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function ouvirDuelo(dueloId, callback) {
  return onSnapshot(doc(db, "duelos", dueloId), (snap) => {
    if (snap.exists()) callback({ id: snap.id, ...snap.data() });
  });
}

export async function buscarUsuarios(termoBusca) {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs
    .map((d) => ({ uid: d.id, ...d.data() }))
    .filter((u) =>
      u.name?.toLowerCase().includes(termoBusca.toLowerCase())
    );
}


export const isE2EMockMode = import.meta.env.VITE_E2E_MOCKS === "true";

export const E2E_USER = {
  uid: "e2e-user",
  name: "Ana Teste",
  email: "ana.teste@osg.dev",
  xp: 720,
  level: 4,
  photo: null,
  theme: null,
  groupIds: ["group_matematica", "group_linguagens"],
  xpPorGrupo: {
    group_matematica: 480,
    group_linguagens: 240,
  },
  duelosVencidos: 3,
  lastDailyQuizDate: null,
};

export const E2E_FIREBASE_USER = {
  uid: E2E_USER.uid,
  email: E2E_USER.email,
};

export const E2E_RANKING = [
  {
    uid: "leader-user",
    name: "Bruno Ranking",
    xp: 980,
    level: 4,
    xpPorGrupo: {
      group_matematica: 600,
    },
  },
  E2E_USER,
  {
    uid: "third-user",
    name: "Carla Estudos",
    xp: 420,
    level: 3,
    xpPorGrupo: {
      group_linguagens: 420,
    },
  },
];

export const E2E_DAILY_QUIZ = {
  materia: "Matemática",
  perguntas: [
    {
      pergunta: "Quanto é 2 + 2?",
      alternativas: ["3", "4", "5", "6"],
      correta: 1,
    },
    {
      pergunta: "Quanto é 5 x 3?",
      alternativas: ["10", "12", "15", "20"],
      correta: 2,
    },
    {
      pergunta: "Qual número é par?",
      alternativas: ["7", "9", "11", "12"],
      correta: 3,
    },
    {
      pergunta: "Quanto é 9 - 4?",
      alternativas: ["3", "4", "5", "6"],
      correta: 2,
    },
    {
      pergunta: "Quanto é 10 / 2?",
      alternativas: ["2", "4", "5", "8"],
      correta: 2,
    },
  ],
};

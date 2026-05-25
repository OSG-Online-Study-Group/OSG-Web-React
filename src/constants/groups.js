export const GROUPS = [
  {
    id: "group_matematica",
    name: "Matemática",
    subject: "matematica",
  },
  {
    id: "group_ciencias_natureza",
    name: "Ciências da Natureza",
    subject: "ciencias_natureza",
  },
  {
    id: "group_linguagens",
    name: "Linguagens",
    subject: "linguagens",
  },
  {
    id: "group_ciencias_humanas",
    name: "Ciências Humanas",
    subject: "ciencias_humanas",
  },
  {
    id: "group_informatica",
    name: "Informática",
    subject: "informatica",
  },
];

export const GROUP_BY_ID = Object.fromEntries(GROUPS.map((g) => [g.id, g]));
export const SUBJECT_TO_GROUP_ID = Object.fromEntries(GROUPS.map((g) => [g.subject, g.id]));
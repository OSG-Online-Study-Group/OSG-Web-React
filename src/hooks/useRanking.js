import { useEffect, useMemo, useState } from "react";
import { GROUPS } from "../constants/groups";
import { ouvirRankingGeral, ouvirUsuarios } from "../services/firestore";

export function useRankingGeral() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(
    () =>
      ouvirRankingGeral(
        (users) => {
          setUsuarios(users);
          setCarregando(false);
        },
        () => {
          setErro("Não foi possível carregar o ranking.");
          setCarregando(false);
        },
      ),
    [],
  );

  return { usuarios, carregando, erro };
}

export function useRankingTodosGrupos() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(
    () =>
      ouvirUsuarios(
        (users) => {
          setUsuarios(users);
          setCarregando(false);
        },
        () => setCarregando(false),
      ),
    [],
  );

  const grupos = useMemo(
    () =>
      GROUPS.map((group) => ({
        ...group,
        totalXP: usuarios.reduce((total, user) => total + (user.xpPorGrupo?.[group.id] || 0), 0),
      })).sort((first, second) => second.totalXP - first.totalXP),
    [usuarios],
  );

  return { grupos, carregando };
}

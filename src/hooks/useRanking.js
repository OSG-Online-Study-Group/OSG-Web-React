import { useEffect, useMemo, useState } from "react";
import { GROUPS } from "../constants/groups";
import { ouvirRankingGeral, ouvirUsuarios } from "../services/firestore";
import { E2E_RANKING, isE2EMockMode } from "../test/e2eMocks";

export function useRankingGeral() {
  const [usuarios, setUsuarios] = useState(isE2EMockMode ? E2E_RANKING : []);
  const [carregando, setCarregando] = useState(!isE2EMockMode);
  const [erro, setErro] = useState("");

  useEffect(
    () => {
      if (isE2EMockMode) return undefined;

      return ouvirRankingGeral(
        (users) => {
          setUsuarios(users);
          setCarregando(false);
        },
        () => {
          setErro("Não foi possível carregar o ranking.");
          setCarregando(false);
        },
      );
    },
    [],
  );

  return { usuarios, carregando, erro };
}

export function useRankingTodosGrupos() {
  const [usuarios, setUsuarios] = useState(isE2EMockMode ? E2E_RANKING : []);
  const [carregando, setCarregando] = useState(!isE2EMockMode);

  useEffect(
    () => {
      if (isE2EMockMode) return undefined;

      return ouvirUsuarios(
        (users) => {
          setUsuarios(users);
          setCarregando(false);
        },
        () => setCarregando(false),
      );
    },
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

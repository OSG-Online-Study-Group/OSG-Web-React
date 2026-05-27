import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { useRankingGeral } from "./useRanking";

export function useMenuStats() {
  const { usuario } = useAuth();
  const { usuarios, carregando } = useRankingGeral();

  const melhorMateria = useMemo(() => {
    const first = Object.entries(usuario?.xpPorGrupo || {}).sort((a, b) => b[1] - a[1])[0]?.[0];
    return first ? first.replace("group_", "").replaceAll("_", " ").toUpperCase() : "-";
  }, [usuario]);

  const position = usuarios.findIndex((item) => item.uid === usuario?.uid);

  return {
    usuario,
    loading: carregando,
    vitorias: usuario?.duelosVencidos || 0,
    melhorMateria,
    posicao: position >= 0 ? position + 1 : null,
  };
}

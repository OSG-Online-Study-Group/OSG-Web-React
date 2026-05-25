import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRankingGeral } from "./useRanking";
import { useAuth } from "./useAuth";

function formatarMateria(key) {
  return key.replace("group_", "").replaceAll("_", " ").toUpperCase();
}

export function useMenuStats() {
  const { usuario } = useAuth();
  const { usuarios } = useRankingGeral();
  const [loading, setLoading] = useState(true);
  const [vitorias, setVitorias] = useState(0);
  const [melhorMateria, setMelhorMateria] = useState("-");
  const [posicao, setPosicao] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (!usuarios?.length) return;
    const user = getAuth().currentUser;
    if (!user) return;
    const index = usuarios.findIndex((u) => u.id === user.uid);
    if (index !== -1) setPosicao(index + 1);
  }, [usuarios]);

  async function carregarDados() {
    try {
      const user = getAuth().currentUser;
      if (!user) return;

      const snap = await getDoc(doc(getFirestore(), "users", user.uid));
      if (!snap.exists()) return;

      const data = snap.data();
      setVitorias(data.duelosVencidos || 0);

      const xpPorGrupo = data.xpPorGrupo || {};
      const melhor = Object.entries(xpPorGrupo)
        .sort((a, b) => b[1] - a[1])[0]?.[0];

      if (melhor) setMelhorMateria(formatarMateria(melhor));
    } catch (err) {
      console.error("Erro ao carregar stats:", err);
    } finally {
      setLoading(false);
    }
  }

  return { usuario, loading, vitorias, melhorMateria, posicao };
}
import { useEffect, useState } from "react";
import { buscarGrupo, buscarGruposDoUsuario } from "../services/firestore";
import { useAuth } from "./useAuth";

export function useGroups() {
  const { firebaseUser, usuario } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!firebaseUser) return;
    buscarGruposDoUsuario(firebaseUser.uid)
      .then(setGroups)
      .catch(() => setError("Não foi possível carregar seus grupos."))
      .finally(() => setLoading(false));
  }, [firebaseUser, usuario?.groupIds]);

  return { groups, loading, error };
}

export function useGroup(groupId) {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (!groupId) return;
    buscarGrupo(groupId).then(setGroup).catch(() => setGroup(null));
  }, [groupId]);

  return group;
}

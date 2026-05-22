import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./escolha_materias.css";

import { GROUPS } from "../../constants/groups";
import { entrarNosGrupos } from "../../../services/firestore";
import { useAuth } from "../../hooks/useAuth";

export default function SelecionarMaterias() {
  const navigate = useNavigate();

  const { firebaseUser, refreshUsuario, usuario } = useAuth();

  const [selecionados, setSelecionados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function toggleGrupo(groupId) {
    setSelecionados((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );

    setErro("");
  }

  async function handleConfirmar() {
    if (selecionados.length === 0) {
      setErro("Selecione pelo menos uma matéria.");
      return;
    }

    setCarregando(true);

    try {
      const gruposFinal = [
        ...new Set([
          ...(usuario?.groupIds || []),
          ...selecionados
        ])
      ];

      refreshUsuario({
        groupIds: gruposFinal
      });

      await entrarNosGrupos(
        firebaseUser.uid,
        selecionados
      );

      navigate("/grupos");

    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar.");

    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="materias-container">

      <h1>Escolha suas Matérias</h1>

      <p className="subtitle">
        Selecione os grupos que deseja participar.
        <br />
        Você pode estar em mais de um!
      </p>

      <div className="grupos-lista">

        {GROUPS.map((grupo) => {
          const selected = selecionados.includes(grupo.id);

          return (
            <div
              key={grupo.id}
              className={`grupo-card ${selected ? "selected" : ""}`}
              onClick={() => toggleGrupo(grupo.id)}
            >

              <span className="grupo-emoji">
                {grupo.emoji}
              </span>

              <span className="grupo-nome">
                {grupo.name}
              </span>

              {selected && (
                <span className="check-icon">
                  ✓
                </span>
              )}

            </div>
          );
        })}

      </div>

      {erro && (
        <p className="erro">
          {erro}
        </p>
      )}

      <button
        className="confirmar-btn"
        onClick={handleConfirmar}
        disabled={carregando}
      >
        {carregando
          ? "Carregando..."
          : "Confirmar e Entrar →"}
      </button>

    </div>
  );
}
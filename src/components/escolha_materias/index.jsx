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
    setSelecionados((prev) => {
      if (prev.includes(groupId)) {
        return prev.filter((id) => id !== groupId);
      }

      return [...prev, groupId];
    });

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
          ...selecionados,
        ]),
      ];

      refreshUsuario({
        groupIds: gruposFinal,
      });

      await entrarNosGrupos(
        firebaseUser.uid,
        selecionados
      );

      navigate("/home");

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
          const selecionado =
            selecionados.includes(grupo.id);

          return (
            <button
              key={grupo.id}
              type="button"
              onClick={() => toggleGrupo(grupo.id)}
              className={`grupo-card ${
                selecionado ? "ativo" : ""
              }`}
            >
              <span className="grupo-nome">
                {grupo.name}
              </span>

              {selecionado && (
                <span className="check-icon">
                  ✓
                </span>
              )}
            </button>
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
          : "Confirmar"}
      </button>

    </div>
  );
}
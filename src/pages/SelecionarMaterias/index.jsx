import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GROUPS } from "../../constants/groups";
import { useAuth } from "../../hooks/useAuth";
import { entrarNosGrupos } from "../../services/firestore";
import { Button, Card, Grid, Message, Muted, Page, Title } from "../../styles/ui";

const Group = styled(Card)`
  border-color: ${({ $selected }) => ($selected ? "#b84ef2" : "#5b2a86")};
  cursor: pointer;
  h2 { font-size: 1.05rem; margin: 0 0 4px; }
`;
const Confirm = styled(Button)`margin-top: 24px;`;

export default function SelecionarMaterias() {
  const { firebaseUser, refreshUsuario } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggle(id) {
    setSelected((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  async function confirm() {
    if (!selected.length) return setError("Selecione pelo menos uma matéria.");
    setLoading(true);
    try {
      await entrarNosGrupos(firebaseUser.uid, selected);
      refreshUsuario({ groupIds: selected });
      navigate("/menu", { replace: true });
    } catch {
      setError("Não foi possível entrar nos grupos. Confirme se eles existem no Firebase.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page>
      <Title>Escolha suas matérias</Title>
      <Muted>Você poderá conversar e pontuar nos grupos selecionados.</Muted>
      <Grid>
        {GROUPS.map((group) => (
          <Group key={group.id} $selected={selected.includes(group.id)} onClick={() => toggle(group.id)}>
            <h2>{group.name}</h2>
            <Muted>{selected.includes(group.id) ? "Selecionado" : "Selecionar"}</Muted>
          </Group>
        ))}
      </Grid>
      <Confirm disabled={loading} onClick={confirm}>{loading ? "Salvando..." : "Confirmar e entrar"}</Confirm>
      {error && <Message $error>{error}</Message>}
    </Page>
  );
}

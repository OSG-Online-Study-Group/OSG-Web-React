import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { GROUPS } from "../../constants/groups";
import { useAuth } from "../../hooks/useAuth";
import { entrarNosGrupos } from "../../services/firestore";

import {
  Button,
  Card,
  Grid,
  Message,
  Muted,
  Page,
  Title,
} from "../../styles/ui";

const Header = styled.div`
  margin-bottom: 34px;
`;

const GroupsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
`;

const Group = styled(Card)`
  position: relative;

  overflow: hidden;

  cursor: pointer;

  min-height: 210px;

  padding: 26px;

  border-radius: 28px;

  background: ${({ $selected }) =>
    $selected
      ? "linear-gradient(145deg, #4a1d74 0%, #2b0b47 100%)"
      : "linear-gradient(145deg, #31104d 0%, #22063b 100%)"};

  border: 1px solid
    ${({ $selected }) =>
      $selected
        ? "rgba(212, 146, 251, 0.55)"
        : "rgba(196, 68, 224, 0.16)"};

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;

  &:hover {
    transform: translateY(-6px);

    border-color: rgba(212, 146, 251, 0.45);

    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.35);
  }

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    background:
      radial-gradient(
        circle at top right,
        rgba(214, 58, 205, 0.14),
        transparent 40%
      );

    pointer-events: none;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
`;

const Icon = styled.div`
  width: 66px;
  height: 66px;

  border-radius: 22px;

  background: linear-gradient(135deg, #7c3aed, #c644e0);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;

  box-shadow: 0 10px 24px rgba(198, 68, 224, 0.35);
`;

const Status = styled.div`
  padding: 8px 14px;

  border-radius: 999px;

  background: ${({ $selected }) =>
    $selected
      ? "rgba(212, 146, 251, 0.14)"
      : "rgba(255,255,255,0.06)"};

  border: 1px solid rgba(196, 68, 224, 0.22);

  color: ${({ $selected }) =>
    $selected ? "#ffffff" : "#d492fb"};

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 0.4px;
`;

const Name = styled.h2`
  color: white;

  font-size: 1.3rem;
  font-weight: 800;

  margin-bottom: 12px;
`;

const Description = styled(Muted)`
  color: #cdb8e9;

  line-height: 1.6;
`;

const Footer = styled.div`
  margin-top: auto;

  padding-top: 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectText = styled.span`
  color: white;

  font-size: 0.96rem;
  font-weight: 700;
`;

const Arrow = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background: rgba(255,255,255,0.08);

  border: 1px solid rgba(196, 68, 224, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  color: #d492fb;

  font-size: 22px;

  transition: transform 0.2s ease;

  ${Group}:hover & {
    transform: translateX(4px);
  }
`;

const Confirm = styled(Button)`
  width: 100%;
  max-width: 420px;

  height: 58px;

  margin: 36px auto 0;

  border-radius: 18px;

  font-size: 1rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(135deg, #7c3aed, #c644e0);

  box-shadow: 0 14px 30px rgba(198, 68, 224, 0.35);

  transition: 0.22s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ICONS = {
  matematica: "🧠",
  matemática: "🧠",

  humanas: "📚",
  historia: "📚",
  história: "📚",
  geografia: "📚",
  filosofia: "📚",
  sociologia: "📚",

  linguagens: "🗣️",
  portugues: "🗣️",
  português: "🗣️",
  ingles: "🗣️",
  inglês: "🗣️",
  literatura: "🗣️",

  natureza: "🔬",
  ciencias: "🔬",
  ciências: "🔬",
  biologia: "🔬",
  quimica: "🔬",
  química: "🔬",
  fisica: "🔬",
  física: "🔬",

  informatica: "💻",
  informática: "💻",
  programação: "💻",
  programacao: "💻",
};

function getIcon(name = "") {
  const text = name.toLowerCase();

  const found = Object.entries(ICONS).find(([key]) =>
    text.includes(key),
  );

  return found ? found[1] : "👥";
}

export default function SelecionarMaterias() {
  const { firebaseUser, refreshUsuario } = useAuth();

  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggle(id) {
    setSelected((items) =>
      items.includes(id)
        ? items.filter((item) => item !== id)
        : [...items, id],
    );
  }

  async function confirm() {
    if (!selected.length) {
      return setError(
        "Selecione pelo menos uma matéria.",
      );
    }

    setLoading(true);

    try {
      await entrarNosGrupos(firebaseUser.uid, selected);

      refreshUsuario({
        groupIds: selected,
      });

      navigate("/menu", { replace: true });
    } catch {
      setError(
        "Não foi possível entrar nos grupos. Confirme se eles existem no Firebase.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page>
      <Header>
        <Title>Escolha suas matérias</Title>

        <Muted>
          Selecione os grupos que deseja participar para
          acessar os chats e ganhar XP.
        </Muted>
      </Header>

      <GroupsGrid>
        {GROUPS.map((group) => {
          const isSelected = selected.includes(group.id);

          return (
            <Group
              key={group.id}
              $selected={isSelected}
              onClick={() => toggle(group.id)}
            >
              <Top>
                <Icon>{getIcon(group.name)}</Icon>

                <Status $selected={isSelected}>
                  {isSelected
                    ? "SELECIONADO"
                    : "DISPONÍVEL"}
                </Status>
              </Top>

              <div>
                <Name>{group.name}</Name>

                <Description>
                  {isSelected
                    ? "Você entrará neste grupo ao confirmar."
                    : "Clique para participar deste grupo."}
                </Description>
              </div>

              <Footer>
                <SelectText>
                  {isSelected
                    ? "Selecionado"
                    : "Selecionar"}
                </SelectText>

                <Arrow>
                  {isSelected ? "✓" : "›"}
                </Arrow>
              </Footer>
            </Group>
          );
        })}
      </GroupsGrid>

      <Confirm
        disabled={loading}
        onClick={confirm}
      >
        {loading
          ? "Salvando..."
          : "Confirmar e entrar"}
      </Confirm>

      {error && <Message $error>{error}</Message>}
    </Page>
  );
}
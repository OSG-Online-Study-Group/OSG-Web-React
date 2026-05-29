import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGroups } from "../../hooks/useGroups";
import {
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
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 24px;
`;

const GroupCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding: 28px;
  min-height: 220px;
  border-radius: 28px;

  background: linear-gradient(
    145deg,
    rgba(49, 16, 77, 0.98),
    rgba(26, 6, 45, 0.98)
  );

  border: 1px solid rgba(196, 68, 224, 0.16);

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(212, 146, 251, 0.45);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
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

const GroupLink = styled(Link)`
  height: 100%;

  display: flex;
  flex-direction: column;

  text-decoration: none;

  position: relative;
  z-index: 2;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
`;

const Icon = styled.div`
  width: 68px;
  height: 68px;

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

  background: rgba(255, 255, 255, 0.06);

  border: 1px solid rgba(196, 68, 224, 0.22);

  color: #d492fb;

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 0.5px;
`;

const Name = styled.h2`
  color: white;

  font-size: 1.45rem;
  font-weight: 800;

  line-height: 1.2;

  margin-bottom: 12px;
`;

const Subject = styled(Muted)`
  color: #ccb7e8;

  font-size: 0.96rem;
  line-height: 1.6;
`;

const Footer = styled.div`
  margin-top: auto;

  padding-top: 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OpenText = styled.span`
  color: white;

  font-size: 0.96rem;
  font-weight: 700;
`;

const Arrow = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.08);

  border: 1px solid rgba(196, 68, 224, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  color: #d492fb;

  font-size: 22px;

  transition: transform 0.2s ease;

  ${GroupCard}:hover & {
    transform: translateX(4px);
  }
`;

const Empty = styled(Card)`
  text-align: center;

  padding: 60px 30px;

  border-radius: 28px;

  background: linear-gradient(
    145deg,
    rgba(49, 16, 77, 0.98),
    rgba(26, 6, 45, 0.98)
  );

  border: 1px solid rgba(196, 68, 224, 0.16);
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

function getIcon(subject = "", name = "") {
  const text = `${subject} ${name}`.toLowerCase();

  const found = Object.entries(ICONS).find(([key]) =>
    text.includes(key),
  );

  return found ? found[1] : "👥";
}

export default function Grupos() {
  const { groups, loading, error } = useGroups();

  return (
    <Page>
      <Header>
        <Title>Grupos de estudo</Title>

        <Muted>
          Entre nos chats das matérias selecionadas e acompanhe
          discussões, dúvidas e desafios em tempo real.
        </Muted>
      </Header>

      {error && <Message $error>{error}</Message>}

      {loading ? (
        <Muted>Carregando grupos...</Muted>
      ) : (
        <GroupsGrid>
          {groups.map((group) => (
            <GroupCard key={group.id}>
              <GroupLink to={`/grupo/${group.id}`}>
                <Top>
                  <Icon>
                    {getIcon(group.subject, group.name)}
                  </Icon>

                  <Status>ATIVO</Status>
                </Top>

                <div>
                  <Name>{group.name}</Name>

                  <Subject>
                    {group.subject || "Grupo de estudo"}
                  </Subject>
                </div>

                <Footer>
                  <OpenText>Abrir conversa</OpenText>

                  <Arrow>›</Arrow>
                </Footer>
              </GroupLink>
            </GroupCard>
          ))}

          {!groups.length && (
            <Empty>
              <Title>Nenhum grupo encontrado</Title>

              <Muted>
                Você ainda não participa de nenhum grupo de
                estudo.
              </Muted>
            </Empty>
          )}
        </GroupsGrid>
      )}
    </Page>
  );
}
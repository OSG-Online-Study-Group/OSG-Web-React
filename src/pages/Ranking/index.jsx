import { useState } from "react";
import styled from "styled-components";
import { useRankingGeral, useRankingTodosGrupos } from "../../hooks/useRanking";
import { Button, Card, Message, Muted, Page, SecondaryButton, Title } from "../../styles/ui";

const Toggle = styled.div`display: flex; gap: 10px; margin: 20px 0;`;
const List = styled(Card)`max-width: 760px; padding: 0;`;
const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid #51286c;
  display: flex;
  gap: 15px;
  padding: 16px 20px;
  &:last-child { border: 0; }
  strong:first-child { color: #d492fb; width: 38px; }
  span { flex: 1; }
`;

export default function Ranking() {
  const [groupsMode, setGroupsMode] = useState(false);
  const general = useRankingGeral();
  const groups = useRankingTodosGrupos();
  const data = groupsMode ? groups.grupos : general.usuarios;
  const loading = groupsMode ? groups.carregando : general.carregando;
  return (
    <Page>
      <Title>Ranking</Title>
      <Muted>Atualização em tempo real pelo Firestore.</Muted>
      <Toggle>
        {groupsMode ? <SecondaryButton onClick={() => setGroupsMode(false)}>Pessoas</SecondaryButton> : <Button>Pessoas</Button>}
        {groupsMode ? <Button>Grupos</Button> : <SecondaryButton onClick={() => setGroupsMode(true)}>Grupos</SecondaryButton>}
      </Toggle>
      {general.erro && <Message $error>{general.erro}</Message>}
      <List>
        {loading ? <Row>Carregando...</Row> : data.map((item, index) => (
          <Row key={item.uid || item.id}>
            <strong>{index + 1}º</strong>
            <span>{item.name}</span>
            <strong>{groupsMode ? item.totalXP : item.xp || 0} XP</strong>
          </Row>
        ))}
      </List>
    </Page>
  );
}

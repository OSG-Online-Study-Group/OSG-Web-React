import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGroups } from "../../hooks/useGroups";
import { Card, Grid, Message, Muted, Page, Title } from "../../styles/ui";

const GroupLink = styled(Link)`
  display: block;
  h2 { font-size: 1.15rem; margin: 0 0 8px; }
`;

export default function Grupos() {
  const { groups, loading, error } = useGroups();
  return (
    <Page>
      <Title>Grupos de estudo</Title>
      <Muted>Participe dos chats das matérias escolhidas no cadastro.</Muted>
      {error && <Message $error>{error}</Message>}
      {loading ? <Muted>Carregando grupos...</Muted> : (
        <Grid>
          {groups.map((group) => (
            <Card key={group.id}>
              <GroupLink to={`/grupo/${group.id}`}>
                <h2>{group.name}</h2>
                <Muted>{group.subject || "Grupo de estudo"}</Muted>
                Abrir conversa
              </GroupLink>
            </Card>
          ))}
          {!groups.length && <Card>Nenhum grupo encontrado.</Card>}
        </Grid>
      )}
    </Page>
  );
}

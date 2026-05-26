import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { responderConvite, useDuelosPendentes } from "../../hooks/useDuelo";
import { Button, Card, Muted, Page, SecondaryButton, Title } from "../../styles/ui";

const List = styled.div`display: grid; gap: 14px; max-width: 760px;`;
const Actions = styled.div`display: flex; gap: 10px; margin-top: 12px;`;

export default function DuelosPendentes() {
  const navigate = useNavigate();
  const { pendentes } = useDuelosPendentes();
  async function respond(id, accepted) {
    await responderConvite(id, accepted);
    if (accepted) navigate(`/duelo/${id}`);
  }
  return (
    <Page>
      <Title>Duelos pendentes</Title>
      <Muted>Convites recebidos expiram após 24 horas.</Muted>
      <List>
        {!pendentes.length && <Card>Nenhum desafio aguardando resposta.</Card>}
        {pendentes.map((duel) => (
          <Card key={duel.id}>
            <strong>{duel.desafianteNome} desafiou você.</strong>
            <Muted>Expira em {new Date(duel.expiraEm).toLocaleString("pt-BR")}</Muted>
            <Actions>
              <Button onClick={() => respond(duel.id, true)}>Aceitar</Button>
              <SecondaryButton onClick={() => respond(duel.id, false)}>Recusar</SecondaryButton>
            </Actions>
          </Card>
        ))}
      </List>
    </Page>
  );
}

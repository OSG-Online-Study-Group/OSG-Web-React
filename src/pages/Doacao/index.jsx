import styled from "styled-components";
import { Card, Muted, Page, Title } from "../../styles/ui";

const Support = styled(Card)`max-width: 650px;`;

export default function Doacao() {
  return (
    <Page>
      <Title>Apoie os desenvolvedores</Title>
      <Muted>Esta tela foi preservada na versão web sem criar dados adicionais.</Muted>
      <Support>
        <h2>Ajude a OSG a continuar crescendo</h2>
        <p>Obrigado por estudar conosco e apoiar a comunidade.</p>
      </Support>
    </Page>
  );
}

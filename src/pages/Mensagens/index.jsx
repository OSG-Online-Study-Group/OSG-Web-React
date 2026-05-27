import { Link } from "react-router-dom";
import { Card, Muted, Page, Title } from "../../styles/ui";

export default function Mensagens() {
  return (
    <Page>
      <Title>Mensagens</Title>
      <Muted>As conversas disponíveis são os chats dos seus grupos de estudo.</Muted>
      <Card>
        Não há mensagens privadas nesta versão. <Link to="/grupos">Abrir grupos</Link>
      </Card>
    </Page>
  );
}

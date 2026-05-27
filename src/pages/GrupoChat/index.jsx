import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { useGroup } from "../../hooks/useGroups";
import { Button, Card, Message, Muted, Page, Title } from "../../styles/ui";

const Chat = styled(Card)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 155px);
  min-height: 430px;
`;
const Messages = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding: 16px 0;
`;
const Row = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: ${({ $mine }) => ($mine ? "row-reverse" : "row")};
  gap: 8px;
`;
const Avatar = styled.div`
  align-items: center;
  background: #713ca0;
  border-radius: 50%;
  display: flex;
  flex: 0 0 34px;
  font-size: .76rem;
  font-weight: 700;
  height: 34px;
  justify-content: center;
  overflow: hidden;
  width: 34px;
  img { height: 100%; object-fit: cover; width: 100%; }
`;
const Bubble = styled.div`
  background: ${({ $mine }) => ($mine ? "#713ca0" : "#29163c")};
  border-radius: 15px;
  max-width: min(78%, 580px);
  padding: 10px 13px;
  small { color: #ccb5e7; display: block; margin-bottom: 4px; }
  time { color: #c1a5dc; display: block; font-size: .72rem; margin-top: 5px; text-align: right; }
`;
const Form = styled.form`
  display: flex;
  gap: 10px;
  textarea {
    background: #29163c;
    border: 1px solid #5b2a86;
    border-radius: 12px;
    color: white;
    flex: 1;
    min-height: 48px;
    padding: 13px;
    resize: none;
  }
`;
const Delete = styled.button`
  background: transparent;
  border: 0;
  color: #ffb3b3;
  font-size: .75rem;
  margin-left: 8px;
`;

function formatTime(timestamp) {
  const date = timestamp?.toDate?.();
  return date ? date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "";
}

function initials(name = "") {
  return name.split(" ").slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase();
}

export default function GrupoChat() {
  const { groupId } = useParams();
  const { usuario } = useAuth();
  const authorized = usuario?.groupIds?.includes(groupId);
  const group = useGroup(groupId);
  const { messages, newMessage, setNewMessage, handleSend, handleDelete, user, isAdmin, carregando, erro } = useChat(
    authorized ? groupId : null,
  );
  if (!authorized) {
    return (
      <Page>
        <Title>Grupo indisponível</Title>
        <Card>Você precisa participar deste grupo para acessar a conversa.</Card>
      </Page>
    );
  }
  return (
    <Page>
      <Title>{group?.name || "Conversa do grupo"}</Title>
      <Muted>Mensagens aparecem em tempo real no aplicativo e na web.</Muted>
      <Chat>
        <Messages>
          {carregando && <Muted>Carregando mensagens...</Muted>}
          {messages.map((message) => (
            <Row key={message.id} $mine={message.senderId === user?.uid}>
              {!message.deleted && (
                <Avatar>
                  {message.senderPhoto ? <img src={message.senderPhoto} alt="" /> : initials(message.senderName)}
                </Avatar>
              )}
              <Bubble $mine={message.senderId === user?.uid}>
                {!message.deleted && message.senderId !== user?.uid && <small>{message.senderName}</small>}
                {message.deleted ? <em>[mensagem deletada]</em> : message.text}
                {!message.deleted && (
                  <time>
                    {formatTime(message.createdAt)}
                    {isAdmin && <Delete onClick={() => handleDelete(message.id)}>remover</Delete>}
                  </time>
                )}
              </Bubble>
            </Row>
          ))}
        </Messages>
        {erro && <Message $error>{erro}</Message>}
        <Form onSubmit={(event) => { event.preventDefault(); handleSend(); }}>
          <textarea
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <Button type="submit">Enviar</Button>
        </Form>
      </Chat>
    </Page>
  );
}

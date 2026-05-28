import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { useGroup } from "../../hooks/useGroups";

import {
  Button,
  Card,
  Message,
  Muted,
  Page,
  Title,
} from "../../styles/ui";

const Header = styled.div`
  margin-bottom: 28px;
`;

const ChatWrapper = styled(Card)`
  height: calc(100vh - 180px);
  min-height: 560px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  border-radius: 32px;
  background: linear-gradient(180deg, #31104d 0%, #22063b 100%);
  border: 1px solid rgba(196, 68, 224, 0.16);
`;

const ChatTop = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const GroupIcon = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 22px;

  background: linear-gradient(135deg, #7c3aed, #c644e0);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;

  box-shadow: 0 10px 26px rgba(198, 68, 224, 0.35);
`;

const GroupTexts = styled.div`
  h2 {
    color: white;
    font-size: 1.4rem;
    margin-bottom: 5px;
  }
`;

const OnlineBadge = styled.div`
  padding: 8px 14px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 68, 224, 0.24);

  color: #d492fb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 18px;

  padding: 28px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;

  flex-direction: ${({ $mine }) =>
    $mine ? "row-reverse" : "row"};
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;

  flex-shrink: 0;

  overflow: hidden;

  background: linear-gradient(135deg, #7c3aed, #c644e0);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.8rem;
  font-weight: 700;
  color: white;

  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.28);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $mine }) =>
    $mine ? "flex-end" : "flex-start"};
`;

const Sender = styled.small`
  color: #d7c2f0;
  margin-bottom: 6px;
  padding: 0 4px;
  font-size: 0.76rem;
  font-weight: 700;
`;

const Bubble = styled.div`
  max-width: min(78%, 620px);

  padding: 14px 16px;
  border-radius: 22px;

  background: ${({ $mine }) =>
    $mine
      ? "linear-gradient(135deg, #7c3aed, #c644e0)"
      : "#29163c"};

  color: white;

  border: 1px solid
    ${({ $mine }) =>
      $mine
        ? "rgba(255,255,255,0.08)"
        : "rgba(196, 68, 224, 0.12)"};

  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);

  line-height: 1.5;
  word-break: break-word;
`;

const BubbleFooter = styled.div`
  margin-top: 7px;

  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;

  color: #ceb3ea;
  font-size: 0.72rem;
`;

const Delete = styled.button`
  background: transparent;
  border: none;

  color: #ffb3b3;
  cursor: pointer;

  font-size: 0.72rem;
  font-weight: 700;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const FormArea = styled.div`
  padding: 22px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  background: rgba(0, 0, 0, 0.08);
`;

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 14px;
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 58px;
  max-height: 140px;

  resize: none;

  border-radius: 20px;
  border: 1px solid rgba(196, 68, 224, 0.2);

  background: #29163c;
  color: white;

  padding: 16px 18px;

  outline: none;

  font-size: 0.95rem;
  line-height: 1.5;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #c644e0;
    box-shadow: 0 0 0 4px rgba(198, 68, 224, 0.12);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }
`;

const Empty = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #cdb8e9;
  text-align: center;
`;

function formatTime(timestamp) {
  const date = timestamp?.toDate?.();

  return date
    ? date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
}

function initials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export default function GrupoChat() {
  const { groupId } = useParams();

  const messagesEndRef = useRef(null);

  const { usuario } = useAuth();

  const authorized =
    usuario?.groupIds?.includes(groupId);

  const group = useGroup(groupId);

  const {
    messages,
    newMessage,
    setNewMessage,
    handleSend,
    handleDelete,
    user,
    isAdmin,
    carregando,
    erro,
  } = useChat(authorized ? groupId : null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!authorized) {
    return (
      <Page>
        <Title>Grupo indisponível</Title>

        <Card>
          Você precisa participar deste grupo
          para acessar a conversa.
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <Title>
          {group?.name || "Conversa do grupo"}
        </Title>

        <Muted>
          Conversas sincronizadas em tempo real
          entre web e aplicativo.
        </Muted>
      </Header>

      <ChatWrapper>
        <ChatTop>
          <GroupInfo>
            <GroupIcon>💬</GroupIcon>

            <GroupTexts>
              <h2>
                {group?.name || "Grupo"}
              </h2>

              <Muted>
                Chat da comunidade
              </Muted>
            </GroupTexts>
          </GroupInfo>

          <OnlineBadge>ONLINE</OnlineBadge>
        </ChatTop>

        <Messages>
          {carregando && (
            <Muted>
              Carregando mensagens...
            </Muted>
          )}

          {!carregando &&
            !messages.length && (
              <Empty>
                Nenhuma mensagem ainda.
              </Empty>
            )}

          {messages.map((message) => {
            const mine =
              message.senderId === user?.uid;

            return (
              <Row
                key={message.id}
                $mine={mine}
              >
                {!message.deleted && (
                  <Avatar>
                    {message.senderPhoto ? (
                      <img
                        src={message.senderPhoto}
                        alt=""
                      />
                    ) : (
                      initials(message.senderName)
                    )}
                  </Avatar>
                )}

                <BubbleWrapper $mine={mine}>
                  {!message.deleted &&
                    !mine && (
                      <Sender>
                        {message.senderName}
                      </Sender>
                    )}

                  <Bubble $mine={mine}>
                    {message.deleted ? (
                      <em>
                        [mensagem deletada]
                      </em>
                    ) : (
                      <>
                        {message.text}

                        <BubbleFooter>
                          <span>
                            {formatTime(
                              message.createdAt
                            )}
                          </span>

                          {isAdmin && (
                            <Delete
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  message.id
                                )
                              }
                            >
                              remover
                            </Delete>
                          )}
                        </BubbleFooter>
                      </>
                    )}
                  </Bubble>
                </BubbleWrapper>
              </Row>
            );
          })}

          <div ref={messagesEndRef} />
        </Messages>

        <FormArea>
          {erro && (
            <Message $error>
              {erro}
            </Message>
          )}

          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <InputWrapper>
              <Textarea
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(event) =>
                  setNewMessage(
                    event.target.value
                  )
                }
              />
            </InputWrapper>

            <Button type="submit">
              Enviar
            </Button>
          </Form>
        </FormArea>
      </ChatWrapper>
    </Page>
  );
}
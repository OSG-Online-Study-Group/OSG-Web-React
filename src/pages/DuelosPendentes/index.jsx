import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  responderConvite,
  useDuelosPendentes,
} from "../../hooks/useDuelo";

import {
  Button,
  Card,
  Muted,
  Page,
  SecondaryButton,
  Title,
} from "../../styles/ui";

/* ANIMAÇÕES */
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(196, 68, 224, 0.2);
  }
  50% {
    box-shadow: 0 0 28px rgba(196, 68, 224, 0.45);
  }
  100% {
    box-shadow: 0 0 0 rgba(196, 68, 224, 0.2);
  }
`;

/* HEADER */
const Header = styled.div`
  margin-bottom: 30px;
`;

const Subtitle = styled(Muted)`
  margin-top: 10px;
  font-size: 1rem;
  color: #c9b2e6;
  line-height: 1.6;
`;

/* LISTA */
const List = styled.div`
  display: grid;
  gap: 20px;
  max-width: 820px;
`;

/* CARD */
const DuelCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding: 26px;
  border-radius: 28px;
  background: linear-gradient(180deg, #34104f, #22063b);
  border: 1px solid rgba(196, 68, 224, 0.14);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32);
  transition: 0.25s ease;
  animation: ${fadeUp} 0.35s ease both;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(196, 68, 224, 0.35);
    animation: ${glow} 2s infinite;
  }

  &::before {
    content: "";
    position: absolute;
    top: -70px;
    right: -70px;
    width: 200px;
    height: 200px;
    background: radial-gradient(
      circle,
      rgba(196, 68, 224, 0.16),
      transparent 70%
    );
  }
`;

/* CONTEÚDO */
const DuelContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  position: relative;
  z-index: 2;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

/* INFO */
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Avatar = styled.div`
  width: 78px;
  height: 78px;
  min-width: 78px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b2cf5, #d84dff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  font-weight: 800;
  box-shadow: 0 10px 28px rgba(196, 68, 224, 0.35);
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  strong {
    color: white;
    font-size: 1.15rem;
    line-height: 1.4;
  }
`;

const ExpireBadge = styled.div`
  width: fit-content;
  padding: 8px 14px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.07);
  color: #d7bfff;
  font-size: 0.82rem;
  font-weight: 700;
`;

/* AÇÕES */
const Actions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

const AcceptButton = styled(Button)`
  min-width: 140px;
  height: 52px;
  border-radius: 18px;
  background: linear-gradient(135deg, #8b2cf5, #d84dff);
  font-weight: 700;
  box-shadow: 0 10px 28px rgba(196, 68, 224, 0.3);
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }

  @media (max-width: 720px) {
    flex: 1;
  }
`;

const DeclineButton = styled(SecondaryButton)`
  min-width: 140px;
  height: 52px;
  border-radius: 18px;
  font-weight: 700;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 720px) {
    flex: 1;
  }
`;

/* EMPTY */
const EmptyCard = styled(Card)`
  max-width: 820px;
  padding: 44px;
  border-radius: 30px;
  text-align: center;
  background: linear-gradient(180deg, #2d1048, #22063b);
  border: 1px solid rgba(196, 68, 224, 0.12);

  h2 {
    margin-bottom: 12px;
    color: white;
  }

  p {
    color: #cbb2e8;
    line-height: 1.7;
  }
`;

function initials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export default function DuelosPendentes() {
  const navigate = useNavigate();

  const { pendentes } = useDuelosPendentes();

  async function respond(id, accepted) {
    await responderConvite(id, accepted);

    if (accepted) {
      navigate(`/duelo/${id}`);
    }
  }

  return (
    <Page>

      <Header>
        <Title>Duelos Pendentes</Title>

        <Subtitle>
          Convites recebidos expiram após 24 horas.
          Aceite rapidamente para não perder o desafio.
        </Subtitle>
      </Header>

      <List>

        {!pendentes.length && (
          <EmptyCard>
            <h2>Nenhum duelo pendente 🎮</h2>

            <p>
              Você não possui desafios aguardando resposta
              no momento.
            </p>
          </EmptyCard>
        )}

        {pendentes.map((duel, index) => (
          <DuelCard
            key={duel.id}
            style={{
              animationDelay: `${index * 0.08}s`,
            }}
          >
            <DuelContent>

              <UserInfo>

                <Avatar>
                  {initials(duel.desafianteNome)}
                </Avatar>

                <TextInfo>

                  <strong>
                    {duel.desafianteNome} desafiou você
                    para um duelo.
                  </strong>

                  <ExpireBadge>
                    ⏳ Expira em{" "}
                    {new Date(duel.expiraEm).toLocaleString("pt-BR")}
                  </ExpireBadge>

                </TextInfo>

              </UserInfo>

              <Actions>

                <AcceptButton
                  onClick={() => respond(duel.id, true)}
                >
                  Aceitar
                </AcceptButton>

                <DeclineButton
                  onClick={() => respond(duel.id, false)}
                >
                  Recusar
                </DeclineButton>

              </Actions>

            </DuelContent>
          </DuelCard>
        ))}

      </List>

    </Page>
  );
}
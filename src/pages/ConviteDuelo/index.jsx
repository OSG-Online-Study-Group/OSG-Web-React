import styled, { keyframes } from "styled-components";
import { useConviteDuelo } from "../../hooks/useDuelo";
import {
  Button,
  Card,
  Input,
  Message,
  Muted,
  Page,
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
    box-shadow: 0 0 0 rgba(196, 68, 224, 0.25);
  }
  50% {
    box-shadow: 0 0 24px rgba(196, 68, 224, 0.45);
  }
  100% {
    box-shadow: 0 0 0 rgba(196, 68, 224, 0.25);
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

/* SEARCH */
const SearchWrapper = styled.div`
  max-width: 760px;
  position: relative;
  margin-bottom: 28px;
`;

const SearchInput = styled(Input)`
  width: 100%;
  padding-left: 56px;
  height: 58px;
  border-radius: 20px;
  background: #2a0f42;
  border: 1px solid rgba(196, 68, 224, 0.2);
  font-size: 1rem;
  transition: 0.2s ease;

  &:focus {
    border-color: #c444e0;
    box-shadow: 0 0 18px rgba(196, 68, 224, 0.22);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  opacity: 0.7;
`;

/* RESULTADOS */
const Results = styled.div`
  display: grid;
  gap: 18px;
  max-width: 760px;
`;

/* CARD DO USUÁRIO */
const User = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 22px;
  border-radius: 26px;
  background: linear-gradient(180deg, #34104f, #22063b);
  border: 1px solid rgba(196, 68, 224, 0.14);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
  transition: 0.25s ease;
  animation: ${fadeUp} 0.35s ease both;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(196, 68, 224, 0.35);
    animation: ${glow} 2s infinite;
  }

  &::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 180px;
    height: 180px;
    background: radial-gradient(
      circle,
      rgba(196, 68, 224, 0.15),
      transparent 70%
    );
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

/* INFO */
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  z-index: 2;
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  min-width: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b2cf5, #d84dff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  box-shadow: 0 10px 28px rgba(196, 68, 224, 0.35);
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  strong {
    color: white;
    font-size: 1.15rem;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Stat = styled.div`
  padding: 7px 14px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.06);
  color: #d8bfff;
  font-size: 0.82rem;
  font-weight: 700;
`;

/* BOTÃO */
const ChallengeButton = styled(Button)`
  min-width: 160px;
  height: 52px;
  border-radius: 18px;
  font-size: 0.95rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8b2cf5, #d84dff);
  box-shadow: 0 10px 28px rgba(196, 68, 224, 0.3);
  transition: 0.2s ease;
  position: relative;
  z-index: 2;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

/* CARD DE AGUARDO */
const WaitingCard = styled(Card)`
  max-width: 760px;
  padding: 38px;
  border-radius: 30px;
  background: linear-gradient(180deg, #34104f, #22063b);
  border: 1px solid rgba(196, 68, 224, 0.15);
  text-align: center;
  animation: ${fadeUp} 0.35s ease;

  h2 {
    margin-bottom: 14px;
    color: white;
    font-size: 1.7rem;
  }

  p {
    color: #d6c0f0;
    line-height: 1.7;
    margin-bottom: 14px;
  }
`;

/* EMPTY */
const EmptyState = styled(Card)`
  max-width: 760px;
  padding: 40px;
  border-radius: 28px;
  text-align: center;
  background: linear-gradient(180deg, #2d1048, #22063b);

  h3 {
    margin-bottom: 10px;
    color: white;
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

export default function ConviteDuelo() {
  const {
    busca,
    setBusca,
    usuarios,
    carregando,
    enviando,
    erro,
    aguardando,
    dueloId,
    desafiar,
  } = useConviteDuelo();

  return (
    <Page>

      <Header>
        <Title>Duelo de Amigos</Title>

        <Subtitle>
          Busque outro estudante e envie um desafio de
          cinco perguntas para competir por XP.
        </Subtitle>
      </Header>

      {dueloId ? (
        <WaitingCard>
          <h2>Convite enviado 🚀</h2>

          <p>{aguardando}</p>

          <Muted>
            A página abrirá automaticamente quando
            o outro jogador aceitar o duelo.
          </Muted>
        </WaitingCard>
      ) : (
        <>
          <SearchWrapper>
            <SearchIcon>🔍</SearchIcon>

            <SearchInput
              placeholder="Buscar usuário pelo nome..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </SearchWrapper>

          <Results>

            {carregando && (
              <Muted>Pesquisando estudantes...</Muted>
            )}

            {!carregando && !usuarios.length && busca && (
              <EmptyState>
                <h3>Nenhum usuário encontrado</h3>

                <Muted>
                  Tente pesquisar utilizando outro nome.
                </Muted>
              </EmptyState>
            )}

            {usuarios.map((user, index) => (
              <User
                key={user.uid}
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                <UserInfo>

                  <Avatar>
                    {initials(user.name)}
                  </Avatar>

                  <UserDetails>

                    <strong>
                      {user.name}
                    </strong>

                    <Stats>
                      <Stat>
                        ⭐ Nível {user.level || 1}
                      </Stat>

                      <Stat>
                        ⚡ {user.xp || 0} XP
                      </Stat>
                    </Stats>

                  </UserDetails>

                </UserInfo>

                <ChallengeButton
                  disabled={enviando}
                  onClick={() => desafiar(user)}
                >
                  {enviando
                    ? "Enviando..."
                    : "Desafiar"}
                </ChallengeButton>

              </User>
            ))}

          </Results>
        </>
      )}

      {erro && (
        <Message $error>
          {erro}
        </Message>
      )}

    </Page>
  );
}
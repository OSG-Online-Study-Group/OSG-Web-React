import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { useDueloAleatorio } from "../../hooks/useDueloAleatorio";

import {
  Card,
  Message,
  Muted,
  Page,
  Title,
} from "../../styles/ui";

/* ───────────────── Animations ───────────────── */

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

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(212, 146, 251, 0.45);
  }

  70% {
    box-shadow: 0 0 0 16px rgba(212, 146, 251, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(212, 146, 251, 0);
  }
`;

/* ───────────────── Containers ───────────────── */

const Wrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const StyledTitle = styled(Title)`
  width: 100%;
  text-align: center;
`;

const TopInfo = styled.div`
  width: 100%;

  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(255, 255, 255, 0.06);

  border-radius: 24px;

  padding: 20px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  backdrop-filter: blur(10px);

  animation: ${fadeUp} 0.35s ease;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Subject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 {
    font-size: 1.25rem;
    color: #ffffff;
    font-weight: 800;
  }

  span {
    color: #d6b7ff;
    font-size: 0.92rem;
    font-weight: 600;
  }
`;

const Timer = styled.div`
  min-width: 84px;
  height: 84px;

  border-radius: 50%;

  background: ${({ danger }) =>
    danger
      ? "linear-gradient(135deg, #ff4d6d, #ff0033)"
      : "linear-gradient(135deg, #7a2bca, #c03dff)"};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;
  font-weight: 800;

  color: white;

  animation: ${pulse} 1.6s infinite;

  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);

  transition: 0.2s ease;
`;

const QuestionCard = styled(Card)`
  width: 100%;

  padding: 34px 30px;

  border-radius: 28px;

  background:
    radial-gradient(circle at top right, rgba(212,146,251,.12), transparent 30%),
    linear-gradient(180deg, #32174f, #241038);

  border: 1px solid rgba(255,255,255,.06);

  animation: ${fadeUp} 0.4s ease;

  h2 {
    color: white;
    font-size: clamp(1.3rem, 3vw, 2rem);
    line-height: 1.5;
    font-weight: 800;
  }

  @media (max-width: 600px) {
    padding: 26px 22px;
  }
`;

const Options = styled.div`
  width: 100%;

  display: grid;
  gap: 14px;
`;

const Option = styled.button`
  width: 100%;

  border: 1px solid
    ${({ $state }) =>
      $state === "correct"
        ? "rgba(93,255,151,.4)"
        : $state === "wrong"
        ? "rgba(255,110,110,.35)"
        : $state === "selected"
        ? "rgba(212,146,251,.45)"
        : "rgba(255,255,255,.06)"};

  background:
    ${({ $state }) =>
      $state === "correct"
        ? "linear-gradient(135deg, #1f9d57, #38d976)"
        : $state === "wrong"
        ? "linear-gradient(135deg, #c92a2a, #ff5c5c)"
        : $state === "selected"
        ? "linear-gradient(135deg, #713ca0, #b44cff)"
        : "linear-gradient(135deg, #40205d, #2d163f)"};

  border-radius: 22px;

  color: white;

  padding: 20px 22px;

  text-align: left;

  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 18px;

  transition: 0.18s ease;

  animation: ${fadeUp} 0.35s ease both;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }

  &:disabled {
    cursor: default;
  }
`;

const Letter = styled.div`
  width: 42px;
  height: 42px;

  min-width: 42px;

  border-radius: 14px;

  background: rgba(255,255,255,.12);

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 800;
  font-size: 1rem;
`;

const OptionText = styled.span`
  flex: 1;

  font-size: 1rem;
  line-height: 1.5;
  font-weight: 600;

  word-break: break-word;
`;

const ScoreBoard = styled(Card)`
  width: 100%;
  max-width: 760px;

  margin: 0 auto;

  border-radius: 28px;

  padding: 30px;

  background:
    radial-gradient(circle at top right, rgba(212,146,251,.15), transparent 30%),
    linear-gradient(180deg, #34184f, #241038);

  border: 1px solid rgba(255,255,255,.06);

  display: flex;
  flex-direction: column;
  gap: 18px;

  animation: ${fadeUp} 0.4s ease;

  h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 10px;
  }
`;

const Player = styled.div`
  width: 100%;

  background: rgba(255,255,255,.05);

  border-radius: 18px;

  padding: 16px 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid rgba(255,255,255,.05);

  strong {
    font-size: 1rem;
  }

  span {
    color: #d492fb;
    font-weight: 800;
  }
`;

const ReturnMessage = styled(Muted)`
  text-align: center;
  margin-top: 8px;
  font-size: 0.95rem;
`;

/* ───────────────── Component ───────────────── */

export default function DueloAleatorio() {
  const navigate = useNavigate();

  const {
    pergunta,
    tempo,
    selecionada,
    correta,
    pontuacao,
    nomes,
    fim,
    erro,
    responder,
  } = useDueloAleatorio();

  const [returnTime, setReturnTime] = useState(5);

  useEffect(() => {
    if (!fim) return undefined;

    const interval = setInterval(() => {
      setReturnTime((time) => Math.max(time - 1, 0));
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/menu");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fim, navigate]);

  function state(index) {
    if (correta !== null && index === correta) {
      return "correct";
    }

    if (correta !== null && index === selecionada) {
      return "wrong";
    }

    if (index === selecionada) {
      return "selected";
    }

    return "";
  }

  if (erro) {
    return (
      <Page>
        <Wrapper>
          <StyledTitle>
            Duelo Aleatório
          </StyledTitle>

          <Message $error>
            {erro}
          </Message>
        </Wrapper>
      </Page>
    );
  }

  if (fim) {
    return (
      <Page>
        <Wrapper>
          <StyledTitle>
            Fim de jogo
          </StyledTitle>

          <ScoreBoard>
            <h2>🏆 Resultado Final</h2>

            {Object.entries(pontuacao).map(([uid, score]) => (
              <Player key={uid}>
                <strong>
                  {nomes[uid] || "Carregando..."}
                </strong>

                <span>
                  {score} pts
                </span>
              </Player>
            ))}

            <ReturnMessage>
              Voltando ao menu em {returnTime}s...
            </ReturnMessage>
          </ScoreBoard>
        </Wrapper>
      </Page>
    );
  }

  if (!pergunta) {
    return (
      <Page>
        <Wrapper>
          <StyledTitle>
            Duelo Aleatório
          </StyledTitle>

          <Card
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              borderRadius: "24px",
              textAlign: "center",
              padding: "40px 24px",
            }}
          >
            <h2
              style={{
                marginBottom: "12px",
                color: "#fff",
              }}
            >
              Procurando adversário...
            </h2>

            <Muted>
              Aguarde enquanto conectamos você a outro jogador.
            </Muted>
          </Card>
        </Wrapper>
      </Page>
    );
  }

  return (
    <Page>
      <Wrapper>
        <StyledTitle>
          Duelo Aleatório
        </StyledTitle>

        <TopInfo>
          <Subject>
            <h3>{pergunta.materia}</h3>

            <span>
              Responda antes que o tempo acabe
            </span>
          </Subject>

          <Timer danger={tempo <= 5}>
            {tempo}s
          </Timer>
        </TopInfo>

        <QuestionCard>
          <h2>{pergunta.pergunta}</h2>
        </QuestionCard>

        <Options>
          {pergunta.alternativas.map((option, index) => (
            <Option
              key={option}
              $state={state(index)}
              disabled={selecionada !== null}
              onClick={() => responder(index)}
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <Letter>
                {String.fromCharCode(65 + index)}
              </Letter>

              <OptionText>
                {option}
              </OptionText>
            </Option>
          ))}
        </Options>
      </Wrapper>
    </Page>
  );
}
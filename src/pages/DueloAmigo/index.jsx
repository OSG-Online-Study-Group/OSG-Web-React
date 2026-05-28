import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useDueloAmigo } from "../../hooks/useDuelo";
import {
  Button,
  Card,
  Muted,
  Page,
  Title,
} from "../../styles/ui";

const Wrapper = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
`;

const DuelHeader = styled(Card)`
  background: linear-gradient(135deg, #4b1772 0%, #7a2cd4 55%, #c63dff 100%);
  border: none;
  border-radius: 28px;
  overflow: hidden;
  padding: 30px;
  position: relative;
  margin-bottom: 26px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top right,
        rgba(255,255,255,0.18),
        transparent 40%);
    pointer-events: none;
  }
`;

const DuelTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const OpponentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 {
    color: white;
    font-size: clamp(1.7rem, 4vw, 2.4rem);
    margin: 0;
    font-weight: 800;
  }

  span {
    color: rgba(255,255,255,0.82);
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

const ScoreBoard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const ScoreCard = styled.div`
  min-width: 110px;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  text-align: center;
  border: 1px solid rgba(255,255,255,0.18);

  small {
    display: block;
    color: rgba(255,255,255,0.72);
    margin-bottom: 6px;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  strong {
    color: white;
    font-size: 1.6rem;
    font-weight: 800;
  }
`;

const Versus = styled.div`
  color: rgba(255,255,255,0.65);
  font-weight: 800;
  font-size: 1rem;
`;

const ProgressWrapper = styled.div`
  margin-top: 28px;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 12px;
  flex-wrap: wrap;

  span {
    color: white;
    font-weight: 700;
  }

  small {
    color: rgba(255,255,255,0.72);
    font-size: 0.82rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255,255,255,0.14);
`;

const ProgressFill = styled.div`
  width: ${({ $value }) => $value}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #00e5ff 0%, #ffffff 100%);
  transition: width 0.3s ease;
`;

const QuestionCard = styled(Card)`
  margin-bottom: 24px;
  padding: 30px;
  border-radius: 26px;
  background: linear-gradient(180deg, #31144e 0%, #26103d 100%);
  border: 1px solid rgba(212, 146, 251, 0.18);

  h2 {
    color: white;
    line-height: 1.6;
    font-size: clamp(1.15rem, 3vw, 1.6rem);
    margin: 0;
  }
`;

const Options = styled.div`
  display: grid;
  gap: 16px;
`;

const Option = styled.button`
  width: 100%;
  border: none;
  border-radius: 22px;
  padding: 18px 22px;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    background 0.16s ease;

  display: flex;
  align-items: center;
  gap: 18px;

  background:
    ${({ $state }) =>
      $state === "correct"
        ? "linear-gradient(135deg, #2dbd69 0%, #1d8f4c 100%)"
        : $state === "wrong"
        ? "linear-gradient(135deg, #e14b4b 0%, #b92525 100%)"
        : "linear-gradient(135deg, #4d2372 0%, #6d2cb0 100%)"};

  box-shadow:
    ${({ $state }) =>
      $state === "correct"
        ? "0 10px 28px rgba(45,189,105,0.28)"
        : $state === "wrong"
        ? "0 10px 28px rgba(225,75,75,0.28)"
        : "0 10px 28px rgba(121,55,199,0.25)"};

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
  background: rgba(255,255,255,0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1rem;
`;

const OptionText = styled.span`
  color: white;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 600;
`;

const ResultCard = styled(Card)`
  max-width: 650px;
  margin: 0 auto;
  padding: 40px 30px;
  border-radius: 28px;
  text-align: center;
  background: linear-gradient(180deg, #33124f 0%, #220d38 100%);

  h2 {
    color: white;
    font-size: clamp(1.9rem, 5vw, 2.6rem);
    margin-bottom: 20px;
  }
`;

const FinalScore = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  margin: 28px 0;
`;

const FinalScoreBox = styled.div`
  min-width: 150px;
  padding: 22px;
  border-radius: 22px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);

  span {
    display: block;
    color: #cdb5f5;
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  strong {
    color: white;
    font-size: 2rem;
    font-weight: 800;
  }
`;

const Reward = styled.div`
  margin-top: 18px;
  font-size: 1.1rem;
  color: #d492fb;
  font-weight: 700;
`;

const WaitingCard = styled(Card)`
  text-align: center;
  padding: 40px 28px;
  max-width: 620px;
  margin: 0 auto;

  h2 {
    color: white;
    margin-bottom: 12px;
  }
`;

export default function DueloAmigo() {
  const { dueloId } = useParams();
  const { firebaseUser } = useAuth();

  const {
    duelo,
    perguntaAtual,
    perguntaIndex,
    totalPerguntas,
    respostas,
    finalizado,
    carregando,
    responder,
  } = useDueloAmigo(dueloId);

  if (carregando) {
    return (
      <Page>
        <Muted>Carregando duelo...</Muted>
      </Page>
    );
  }

  if (!duelo) {
    return (
      <Page>
        <Card>Duelo não encontrado.</Card>
      </Page>
    );
  }

  const challenger = duelo.desafianteId === firebaseUser.uid;

  const opponent = challenger
    ? duelo.desafiadoNome
    : duelo.desafianteNome;

  const myPoints = challenger
    ? duelo.pontosDesafiante
    : duelo.pontosDesafiado;

  const opponentPoints = challenger
    ? duelo.pontosDesafiado
    : duelo.pontosDesafiante;

  function state(index) {
    if (respostas[perguntaIndex] === undefined) return "";

    if (index === perguntaAtual?.correta) return "correct";

    if (index === respostas[perguntaIndex]) return "wrong";

    return "";
  }

  if (duelo.status === "pendente") {
    return (
      <Page>
        <Title>Duelo aguardando aceite</Title>

        <WaitingCard>
          <h2>Esperando confirmação</h2>

          <Muted>
            O desafio foi enviado e precisa ser aceito antes do início da partida.
          </Muted>
        </WaitingCard>
      </Page>
    );
  }

  if (
    duelo.status === "recusado" ||
    duelo.status === "cancelado"
  ) {
    return (
      <Page>
        <Title>Duelo encerrado</Title>

        <WaitingCard>
          <h2>Partida indisponível</h2>

          <Muted>
            Este desafio foi recusado ou expirou antes de começar.
          </Muted>
        </WaitingCard>
      </Page>
    );
  }

  if (duelo.status === "finalizado") {
    const draw = duelo.vencedorId === "empate";
    const win = duelo.vencedorId === firebaseUser.uid;

    return (
      <Page>
        <Wrapper>
          <ResultCard>
            <h2>
              {draw
                ? "Empate!"
                : win
                ? "Você venceu!"
                : "Você perdeu"}
            </h2>

            <Muted>
              Resultado final do duelo contra {opponent}.
            </Muted>

            <FinalScore>
              <FinalScoreBox>
                <span>Você</span>
                <strong>{myPoints}/5</strong>
              </FinalScoreBox>

              <FinalScoreBox>
                <span>{opponent}</span>
                <strong>{opponentPoints}/5</strong>
              </FinalScoreBox>
            </FinalScore>

            <Reward>
              {draw
                ? "+10 XP"
                : win
                ? "+25 XP"
                : "+0 XP"}
            </Reward>

            <Button
              as={Link}
              to="/menu"
              style={{ marginTop: "28px" }}
            >
              Voltar ao início
            </Button>
          </ResultCard>
        </Wrapper>
      </Page>
    );
  }

  if (finalizado) {
    return (
      <Page>
        <Wrapper>
          <WaitingCard>
            <h2>Respostas enviadas</h2>

            <Muted>
              Aguardando {opponent} finalizar o duelo...
            </Muted>
          </WaitingCard>
        </Wrapper>
      </Page>
    );
  }

  return (
    <Page>
      <Wrapper>

        <DuelHeader>

          <DuelTop>

            <OpponentInfo>
              <h2>Duelo contra {opponent}</h2>
              <span>Modo competitivo em tempo real</span>
            </OpponentInfo>

            <ScoreBoard>

              <ScoreCard>
                <small>Você</small>
                <strong>{myPoints}</strong>
              </ScoreCard>

              <Versus>VS</Versus>

              <ScoreCard>
                <small>{opponent}</small>
                <strong>{opponentPoints}</strong>
              </ScoreCard>

            </ScoreBoard>

          </DuelTop>

          <ProgressWrapper>

            <ProgressInfo>
              <span>
                Pergunta {perguntaIndex + 1} de {totalPerguntas}
              </span>

              <small>
                {Math.round(
                  ((perguntaIndex + 1) / totalPerguntas) * 100
                )}% concluído
              </small>
            </ProgressInfo>

            <ProgressBar>
              <ProgressFill
                $value={
                  ((perguntaIndex + 1) / totalPerguntas) * 100
                }
              />
            </ProgressBar>

          </ProgressWrapper>

        </DuelHeader>

        <QuestionCard>
          <h2>{perguntaAtual?.pergunta}</h2>
        </QuestionCard>

        <Options>

          {perguntaAtual?.alternativas.map((option, index) => (
            <Option
              key={option}
              $state={state(index)}
              onClick={() => responder(index)}
              disabled={respostas[perguntaIndex] !== undefined}
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
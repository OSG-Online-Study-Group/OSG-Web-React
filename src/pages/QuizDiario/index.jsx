import styled, { keyframes } from "styled-components";
import { useQuizDiario } from "../../hooks/useQuizDiario";
import {
  Card,
  Muted,
  Page,
  Title,
} from "../../styles/ui";

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

const QuizWrapper = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const HeaderCard = styled(Card)`
  padding: 22px 24px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(198, 68, 224, 0.18), transparent 35%),
    linear-gradient(135deg, #2d1048 0%, #180326 100%);
  border: 1px solid rgba(196, 68, 224, 0.18);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  animation: ${fadeUp} 0.45s ease;
`;

const QuizInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: #fff;
    margin: 0;
    font-weight: 800;
  }

  span {
    color: #d7b6ff;
    font-size: 0.96rem;
    font-weight: 500;
  }
`;

const ProgressWrapper = styled.div`
  min-width: 220px;
`;

const ProgressTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span {
    color: #d7b6ff;
    font-size: 0.86rem;
    font-weight: 700;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
`;

const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #d946ef);
  transition: width 0.35s ease;
`;

const QuestionCard = styled(Card)`
  padding: 34px 30px;
  border-radius: 30px;
  background:
    radial-gradient(circle at top left, rgba(139, 92, 246, 0.16), transparent 35%),
    linear-gradient(180deg, #2a0f45 0%, #1a062c 100%);
  border: 1px solid rgba(196, 68, 224, 0.16);

  animation: ${fadeUp} 0.45s ease;

  h2 {
    color: white;
    font-size: clamp(1.3rem, 2vw, 2rem);
    line-height: 1.6;
    font-weight: 700;
  }
`;

const Options = styled.div`
  display: grid;
  gap: 16px;
`;

const Option = styled.button`
  width: 100%;
  border: none;
  border-radius: 24px;
  padding: 20px 22px;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 18px;

  transition:
    transform 0.18s ease,
    filter 0.2s ease,
    border-color 0.2s ease,
    background 0.25s ease;

  animation: ${fadeUp} 0.4s ease both;

  background:
    ${({ $state }) =>
      $state === "correct"
        ? "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
        : $state === "wrong"
        ? "linear-gradient(135deg, #991b1b 0%, #ef4444 100%)"
        : "linear-gradient(135deg, #4c1d74 0%, #2a0d45 100%)"};

  border: 1.5px solid
    ${({ $state }) =>
      $state === "correct"
        ? "#4ade80"
        : $state === "wrong"
        ? "#f87171"
        : "rgba(196, 68, 224, 0.28)"};

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
  }

  &:disabled {
    cursor: default;
  }
`;

const Letter = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;

  border-radius: 16px;

  background: rgba(255, 255, 255, 0.12);

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: 800;
  font-size: 1rem;
`;

const OptionContent = styled.div`
  flex: 1;
  min-width: 0;

  p {
    color: white;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 600;

    word-break: break-word;
  }
`;

const ResultCard = styled(Card)`
  max-width: 760px;
  margin: 0 auto;

  padding: 38px 32px;
  border-radius: 30px;

  background:
    radial-gradient(circle at top, rgba(217, 70, 239, 0.2), transparent 40%),
    linear-gradient(180deg, #2b1047 0%, #180326 100%);

  border: 1px solid rgba(196, 68, 224, 0.18);

  text-align: center;

  animation: ${fadeUp} 0.45s ease;

  h2 {
    font-size: 2rem;
    margin-bottom: 24px;
    color: white;
  }
`;

const ResultText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: 12px;

  color: #f3e8ff;
  font-size: 1.15rem;
  font-weight: 500;

  margin-bottom: 24px;

  text-align: center;
`;

const ResultBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 120px;

  padding: 12px 22px;
  border-radius: 999px;

  background: linear-gradient(135deg, #7c3aed, #d946ef);

  color: white;
  font-size: 1.05rem;
  font-weight: 800;

  box-shadow: 0 8px 24px rgba(198, 68, 224, 0.35);
`;

const ResultXP = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 14px 28px;
  border-radius: 999px;

  background: linear-gradient(135deg, #7c3aed, #d946ef);

  color: white;
  font-size: 1.08rem;
  font-weight: 800;

  box-shadow: 0 8px 24px rgba(198, 68, 224, 0.35);
`;

const EmptyCard = styled(Card)`
  max-width: 760px;
  margin: 0 auto;
  padding: 28px;

  border-radius: 24px;

  background: linear-gradient(180deg, #2a0f45 0%, #180326 100%);
  border: 1px solid rgba(196, 68, 224, 0.18);

  text-align: center;

  color: #f3e8ff;
`;

export default function QuizDiario() {
  const {
    quiz,
    perguntaAtual,
    perguntaIndex,
    respostas,
    carregando,
    jaJogouHoje,
    finalizado,
    xpGanho,
    acertos,
    responder,
  } = useQuizDiario();

  function optionState(index) {
    if (respostas[perguntaIndex] === undefined) return "";

    if (index === perguntaAtual?.correta) {
      return "correct";
    }

    if (index === respostas[perguntaIndex]) {
      return "wrong";
    }

    return "";
  }

  const progress = ((perguntaIndex + 1) / 5) * 100;

  return (
    <Page>
      <QuizWrapper>

        <div>
          <Title>Quiz Diário</Title>

          <Muted>
            Responda 5 perguntas e acumule XP diariamente.
          </Muted>
        </div>

        {carregando ? (
          <EmptyCard>
            <Muted>Preparando seu quiz...</Muted>
          </EmptyCard>
        ) : jaJogouHoje && !finalizado ? (
          <EmptyCard>
            Você já respondeu o quiz de hoje. Volte amanhã.
          </EmptyCard>
        ) : finalizado ? (
          <ResultCard>
            <h2>Quiz concluído</h2>

            <ResultText>
              <span>Você acertou</span>

              <ResultBadge>
                {acertos} de 5
              </ResultBadge>

              <span>perguntas.</span>
            </ResultText>

            <ResultXP>
              {xpGanho > 0
                ? `+${xpGanho} XP conquistado`
                : "Nenhum XP desta vez"}
            </ResultXP>
          </ResultCard>
        ) : (
          <>
            <HeaderCard>
              <QuizInfo>
                <h2>{quiz?.materia}</h2>

                <span>
                  Pergunta {perguntaIndex + 1} de 5
                </span>
              </QuizInfo>

              <ProgressWrapper>
                <ProgressTop>
                  <span>Progresso</span>
                  <span>{Math.round(progress)}%</span>
                </ProgressTop>

                <ProgressBar>
                  <ProgressFill $progress={progress} />
                </ProgressBar>
              </ProgressWrapper>
            </HeaderCard>

            <QuestionCard>
              <h2>{perguntaAtual?.pergunta}</h2>
            </QuestionCard>

            <Options>
              {perguntaAtual?.alternativas.map((option, index) => (
                <Option
                  key={option}
                  $state={optionState(index)}
                  onClick={() => responder(index)}
                  disabled={respostas[perguntaIndex] !== undefined}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  <Letter>
                    {String.fromCharCode(65 + index)}
                  </Letter>

                  <OptionContent>
                    <p>{option}</p>
                  </OptionContent>
                </Option>
              ))}
            </Options>
          </>
        )}
      </QuizWrapper>
    </Page>
  );
}
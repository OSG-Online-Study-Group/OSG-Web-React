import styled from "styled-components";
import { useQuizDiario } from "../../hooks/useQuizDiario";
import { Card, Muted, Page, Title } from "../../styles/ui";

const Question = styled(Card)`margin: 20px 0 14px; max-width: 760px;`;
const Options = styled.div`display: grid; gap: 11px; max-width: 760px;`;
const Option = styled.button`
  background: ${({ $state }) => ($state === "correct" ? "#2f9e44" : $state === "wrong" ? "#c92a2a" : "#3f235a")};
  border: 1px solid #5b2a86;
  border-radius: 13px;
  color: white;
  padding: 15px;
  text-align: left;
`;

export default function QuizDiario() {
  const {
    quiz, perguntaAtual, perguntaIndex, respostas, carregando, jaJogouHoje, finalizado, xpGanho, acertos, responder,
  } = useQuizDiario();
  function optionState(index) {
    if (respostas[perguntaIndex] === undefined) return "";
    if (index === perguntaAtual?.correta) return "correct";
    if (index === respostas[perguntaIndex]) return "wrong";
    return "";
  }
  return (
    <Page>
      <Title>Quiz Diário</Title>
      <Muted>Disponível uma vez por dia na web ou no mobile.</Muted>
      {carregando ? <Muted>Preparando seu quiz...</Muted> : jaJogouHoje && !finalizado ? (
        <Card>Você já respondeu o quiz de hoje. Volte amanhã!</Card>
      ) : finalizado ? (
        <Card>
          <Title>Quiz concluído!</Title>
          <p>{acertos} de 5 acertos.</p>
          <strong>{xpGanho > 0 ? `+${xpGanho} XP` : "Nenhum XP desta vez."}</strong>
        </Card>
      ) : (
        <>
          <Muted>{quiz?.materia} · Pergunta {perguntaIndex + 1} de 5</Muted>
          <Question><h2>{perguntaAtual?.pergunta}</h2></Question>
          <Options>
            {perguntaAtual?.alternativas.map((option, index) => (
              <Option key={option} $state={optionState(index)} onClick={() => responder(index)}>
                {String.fromCharCode(65 + index)}. {option}
              </Option>
            ))}
          </Options>
        </>
      )}
    </Page>
  );
}

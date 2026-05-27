import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useTreino } from "../../hooks/useTreino";
import { Card, Muted, Page, Title } from "../../styles/ui";

const Question = styled(Card)`margin: 22px 0 16px; max-width: 760px;`;
const Options = styled.div`display: grid; gap: 11px; max-width: 760px;`;
const Option = styled.button`
  background: ${({ $state }) => ($state === "correct" ? "#2f9e44" : $state === "wrong" ? "#c92a2a" : "#3f235a")};
  border: 1px solid #5b2a86;
  border-radius: 13px;
  color: white;
  padding: 15px;
  text-align: left;
`;

export default function Treino() {
  const { categoria } = useParams();
  const { pergunta, carregando, respondido, selectedIndex, xpTotal, config, responder } = useTreino(categoria);
  function state(index) {
    if (!respondido) return "";
    if (index === pergunta?.correta) return "correct";
    if (index === selectedIndex) return "wrong";
    return "";
  }
  return (
    <Page>
      <Title>Treino: {config.label}</Title>
      <Muted>{xpTotal ? `+${xpTotal} XP ganhos nesta sessão.` : "Acerte para ganhar XP."}</Muted>
      {carregando ? <Muted>Gerando pergunta...</Muted> : (
        <>
          <Question><h2>{pergunta?.pergunta}</h2></Question>
          <Options>
            {pergunta?.alternativas.map((option, index) => (
              <Option key={option} $state={state(index)} onClick={() => responder(index)} disabled={respondido}>
                {String.fromCharCode(65 + index)}. {option}
              </Option>
            ))}
          </Options>
          {respondido && <Muted>Próxima pergunta em instantes...</Muted>}
        </>
      )}
    </Page>
  );
}

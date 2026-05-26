import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDueloAleatorio } from "../../hooks/useDueloAleatorio";
import { Card, Message, Muted, Page, Title } from "../../styles/ui";

const Options = styled.div`display: grid; gap: 11px; max-width: 760px; margin-top: 16px;`;
const Option = styled.button`
  background: ${({ $state }) => ($state === "correct" ? "#2f9e44" : $state === "wrong" ? "#c92a2a" : $state === "selected" ? "#713ca0" : "#3f235a")};
  border: 1px solid #5b2a86;
  border-radius: 13px;
  color: white;
  padding: 15px;
  text-align: left;
`;

export default function DueloAleatorio() {
  const navigate = useNavigate();
  const { pergunta, tempo, selecionada, correta, pontuacao, nomes, fim, erro, responder } = useDueloAleatorio();
  const [returnTime, setReturnTime] = useState(5);

  useEffect(() => {
    if (!fim) return undefined;
    const interval = setInterval(() => setReturnTime((time) => Math.max(time - 1, 0)), 1000);
    const timeout = setTimeout(() => navigate("/menu"), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fim, navigate]);

  function state(index) {
    if (correta !== null && index === correta) return "correct";
    if (correta !== null && index === selecionada) return "wrong";
    if (index === selecionada) return "selected";
    return "";
  }

  if (erro) return <Page><Title>Duelo Aleatório</Title><Message $error>{erro}</Message></Page>;
  if (fim) {
    return (
      <Page>
        <Title>Fim de jogo</Title>
        <Card>
          {Object.entries(pontuacao).map(([uid, score]) => <p key={uid}>{nomes[uid] || "Carregando..."}: {score}</p>)}
          <Muted>Voltando ao início em {returnTime}s...</Muted>
        </Card>
      </Page>
    );
  }
  if (!pergunta) return <Page><Title>Duelo Aleatório</Title><Card>Procurando adversário...</Card></Page>;
  return (
    <Page>
      <Title>Duelo Aleatório</Title>
      <Muted>{pergunta.materia} · {tempo}s restantes</Muted>
      <Card><h2>{pergunta.pergunta}</h2></Card>
      <Options>
        {pergunta.alternativas.map((option, index) => (
          <Option key={option} $state={state(index)} disabled={selecionada !== null} onClick={() => responder(index)}>
            {String.fromCharCode(65 + index)}. {option}
          </Option>
        ))}
      </Options>
    </Page>
  );
}

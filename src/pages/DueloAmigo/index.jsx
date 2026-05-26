import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useDueloAmigo } from "../../hooks/useDuelo";
import { Button, Card, Muted, Page, Title } from "../../styles/ui";

const Options = styled.div`display: grid; gap: 11px; max-width: 760px; margin-top: 16px;`;
const Option = styled.button`
  background: ${({ $state }) => ($state === "correct" ? "#2f9e44" : $state === "wrong" ? "#c92a2a" : "#3f235a")};
  border: 1px solid #5b2a86;
  border-radius: 13px;
  color: white;
  padding: 15px;
  text-align: left;
`;

export default function DueloAmigo() {
  const { dueloId } = useParams();
  const { firebaseUser } = useAuth();
  const { duelo, perguntaAtual, perguntaIndex, totalPerguntas, respostas, finalizado, carregando, responder } = useDueloAmigo(dueloId);
  if (carregando) return <Page><Muted>Carregando duelo...</Muted></Page>;
  if (!duelo) return <Page><Card>Duelo não encontrado.</Card></Page>;
  const challenger = duelo.desafianteId === firebaseUser.uid;
  const opponent = challenger ? duelo.desafiadoNome : duelo.desafianteNome;
  const myPoints = challenger ? duelo.pontosDesafiante : duelo.pontosDesafiado;
  const opponentPoints = challenger ? duelo.pontosDesafiado : duelo.pontosDesafiante;
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
        <Card>O desafio precisa ser aceito antes de começar.</Card>
      </Page>
    );
  }
  if (duelo.status === "recusado" || duelo.status === "cancelado") {
    return (
      <Page>
        <Title>Duelo encerrado</Title>
        <Card>Este desafio foi recusado ou expirou.</Card>
      </Page>
    );
  }
  if (duelo.status === "finalizado") {
    const draw = duelo.vencedorId === "empate";
    const win = duelo.vencedorId === firebaseUser.uid;
    return (
      <Page>
        <Title>{draw ? "Empate!" : win ? "Você venceu!" : "Você perdeu."}</Title>
        <Card>
          <p>Você: {myPoints}/5</p>
          <p>{opponent}: {opponentPoints}/5</p>
          <strong>{draw ? "+10 XP" : win ? "+25 XP" : "+0 XP"}</strong>
        </Card>
        <Button as={Link} to="/menu">Voltar ao início</Button>
      </Page>
    );
  }
  if (finalizado) {
    return <Page><Title>Respostas enviadas</Title><Card>Aguardando {opponent} finalizar o duelo...</Card></Page>;
  }
  return (
    <Page>
      <Title>Duelo contra {opponent}</Title>
      <Muted>Pergunta {perguntaIndex + 1} de {totalPerguntas}</Muted>
      <Card><h2>{perguntaAtual?.pergunta}</h2></Card>
      <Options>
        {perguntaAtual?.alternativas.map((option, index) => (
          <Option key={option} $state={state(index)} onClick={() => responder(index)} disabled={respostas[perguntaIndex] !== undefined}>
            {String.fromCharCode(65 + index)}. {option}
          </Option>
        ))}
      </Options>
    </Page>
  );
}

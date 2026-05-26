import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Grid, Muted, Page, Title } from "../../styles/ui";

const Mode = styled(Link)`
  display: block;
  h2 { color: #fff; margin: 0 0 8px; }
  span { color: #d492fb; font-weight: 700; }
`;

export default function Game() {
  const modes = [
    { path: "/quiz-diario", name: "Quiz Diário", text: "Cinco perguntas por dia com XP compartilhado." },
    { path: "/filtro-treino", name: "Modo Treino", text: "Pratique livremente por matéria." },
    { path: "/convite-duelo", name: "Duelo Amigos", text: "Desafie alguém em um quiz assíncrono." },
    { path: "/duelo-aleatorio", name: "Duelo Aleatório", text: "Partida ao vivo via Socket.io." },
    { path: "/duelos-pendentes", name: "Convites Pendentes", text: "Aceite ou recuse novos desafios." },
  ];
  return (
    <Page>
      <Title>Modos de jogo</Title>
      <Muted>Ganhe XP e acompanhe sua colocação no ranking.</Muted>
      <Grid>
        {modes.map((mode) => (
          <Card key={mode.path}>
            <Mode to={mode.path}>
              <h2>{mode.name}</h2>
              <Muted>{mode.text}</Muted>
              <span>Abrir</span>
            </Mode>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}

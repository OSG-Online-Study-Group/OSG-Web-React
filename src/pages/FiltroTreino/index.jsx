import { Link } from "react-router-dom";
import styled from "styled-components";
import { CATEGORIAS } from "../../hooks/useTreino";
import { Card, Grid, Muted, Page, Title } from "../../styles/ui";

const Choice = styled(Link)`display: block; h2 { margin: 0 0 8px; font-size: 1.15rem; }`;

export default function FiltroTreino() {
  return (
    <Page>
      <Title>Escolha uma matéria</Title>
      <Muted>No modo treino, cada acerto concede 10 XP.</Muted>
      <Grid>
        {Object.entries(CATEGORIAS).map(([key, category]) => (
          <Card key={key}>
            <Choice to={`/treino/${key}`}>
              <h2>{category.label}</h2>
              <Muted>{category.content}</Muted>
              Iniciar treino
            </Choice>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}

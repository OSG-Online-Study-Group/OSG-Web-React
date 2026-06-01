import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CATEGORIAS } from "../../hooks/useTreino";
import { Card, Grid, Muted, Page, Title } from "../../styles/ui";

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
    box-shadow: 0 0 28px rgba(196, 68, 224, 0.45);
  }
  100% {
    box-shadow: 0 0 0 rgba(196, 68, 224, 0.25);
  }
`;

/* CONTAINER */
const Wrapper = styled.div`
  width: 100%;
`;

/* HEADER */
const Header = styled.div`
  margin-bottom: 34px;
`;

const Subtitle = styled(Muted)`
  margin-top: 10px;
  font-size: 1rem;
  color: #c9b2e6;
`;

/* GRID */
const TrainingGrid = styled(Grid)`
  gap: 24px;
`;

/* CARD */
const TrainingCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  border-radius: 28px;
  background: linear-gradient(180deg, #34104f, #22063b);
  border: 1px solid rgba(196, 68, 224, 0.14);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
  transition: 0.25s ease;
  animation: ${fadeUp} 0.35s ease both;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(196, 68, 224, 0.4);
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
      rgba(196, 68, 224, 0.18),
      transparent 70%
    );
  }
`;

/* LINK */
const Choice = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px;
  text-decoration: none;
  color: white;
  min-height: 240px;
  position: relative;
  z-index: 2;
`;

/* ÍCONE */
const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8c2df5, #d84dff);
  font-size: 2rem;
  box-shadow: 0 10px 28px rgba(196, 68, 224, 0.4);
`;

/* TÍTULO */
const CategoryTitle = styled.h2`
  margin: 0;
  font-size: 1.45rem;
  font-weight: 800;
  color: white;
`;

/* TEXTO */
const CategoryText = styled.p`
  color: #cdb8e6;
  font-size: 0.98rem;
  line-height: 1.7;
  flex: 1;
`;

/* BOTÃO */
const StartButton = styled.div`
  width: fit-content;
  padding: 12px 22px;
  border-radius: 40px;
  background: linear-gradient(135deg, #8c2df5, #d84dff);
  color: white;
  font-size: 0.92rem;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(196, 68, 224, 0.35);
  transition: 0.2s ease;

  ${TrainingCard}:hover & {
    transform: translateX(4px);
  }
`;

/* ÍCONES POR MATÉRIA */
const icons = {
  matematica: "🧮",
  linguagens: "📚",
  humanas: "🌎",
  natureza: "🧪",
  informatica: "💻",
};

export default function FiltroTreino() {
  return (
    <Page>
      <Wrapper>

        <Header>
          <Title>Escolha uma matéria</Title>

          <Subtitle>
            No modo treino, cada resposta correta concede XP.
            Escolha uma categoria e pratique ilimitadamente.
          </Subtitle>
        </Header>

        <TrainingGrid>
          {Object.entries(CATEGORIAS).map(([key, category], index) => (
            <TrainingCard
              key={key}
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <Choice to={`/treino/${key}`}>

                <IconWrapper>
                  {icons[key] || "🎯"}
                </IconWrapper>

                <div>
                  <CategoryTitle>
                    {category.label}
                  </CategoryTitle>
                </div>

                <CategoryText>
                  {category.content}
                </CategoryText>

                <StartButton>
                  Iniciar treino →
                </StartButton>

              </Choice>
            </TrainingCard>
          ))}
        </TrainingGrid>

      </Wrapper>
    </Page>
  );
}
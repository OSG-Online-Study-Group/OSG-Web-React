import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Card,
  Grid,
  Muted,
  Page,
  Title,
} from "../../styles/ui";

const Header = styled.div`
  margin-bottom: 35px;
`;

const ModesGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const GameCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding: 28px;
  min-height: 230px;
  border-radius: 28px;
  background: linear-gradient(145deg, #31104d 0%, #22063b 100%);
  border: 1px solid rgba(196, 68, 224, 0.18);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(196, 68, 224, 0.45);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at top right,
        rgba(214, 58, 205, 0.18),
        transparent 45%
      );
    pointer-events: none;
  }
`;

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  position: relative;
  z-index: 2;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const Icon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: linear-gradient(135deg, #7c3aed, #c644e0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 8px 24px rgba(198, 68, 224, 0.35);
`;

const Badge = styled.div`
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 68, 224, 0.25);
  color: #d492fb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
`;

const Name = styled.h2`
  color: white;
  font-size: 1.45rem;
  font-weight: 800;
  margin-bottom: 12px;
  line-height: 1.2;
`;

const Description = styled(Muted)`
  font-size: 0.97rem;
  line-height: 1.6;
  color: #cdb8e9;
  margin-bottom: auto;
`;

const Footer = styled.div`
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Open = styled.span`
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
`;

const Arrow = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(196, 68, 224, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d492fb;
  font-size: 20px;
  transition: transform 0.2s ease;

  ${GameCard}:hover & {
    transform: translateX(4px);
  }
`;

export default function Game() {
  const modes = [
    {
      path: "/quiz-diario",
      name: "Quiz Diário",
      text: "Cinco perguntas por dia com XP compartilhado.",
      icon: "🧠",
      tag: "DIÁRIO",
    },
    {
      path: "/filtro-treino",
      name: "Modo Treino",
      text: "Pratique livremente por matéria.",
      icon: "🎯",
      tag: "TREINO",
    },
    {
      path: "/convite-duelo",
      name: "Duelo Amigos",
      text: "Desafie alguém em um quiz assíncrono.",
      icon: "⚔️",
      tag: "PVP",
    },
    {
      path: "/duelo-aleatorio",
      name: "Duelo Aleatório",
      text: "Partida ao vivo via Socket.io.",
      icon: "🔥",
      tag: "ONLINE",
    },
    {
      path: "/duelos-pendentes",
      name: "Convites Pendentes",
      text: "Aceite ou recuse novos desafios.",
      icon: "📩",
      tag: "SOCIAL",
    },
  ];

  return (
    <Page>
      <Header>
        <Title>Modos de jogo</Title>
        <Muted>
          Ganhe XP, dispute posições e evolua no ranking da OSG.
        </Muted>
      </Header>

      <ModesGrid>
        {modes.map((mode) => (
          <GameCard key={mode.path}>
            <StyledLink to={mode.path}>
              <Top>
                <Icon>{mode.icon}</Icon>
                <Badge>{mode.tag}</Badge>
              </Top>

              <div>
                <Name>{mode.name}</Name>
                <Description>{mode.text}</Description>
              </div>

              <Footer>
                <Open>Abrir modo</Open>
                <Arrow>›</Arrow>
              </Footer>
            </StyledLink>
          </GameCard>
        ))}
      </ModesGrid>
    </Page>
  );
}
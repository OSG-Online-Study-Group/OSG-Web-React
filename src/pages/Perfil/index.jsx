import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AvatarImage from "../../assets/image/avatar.png";
import CoverImage from "../../assets/image/cover.png";

import LevelProgress from "../../components/LevelProgress";
import { useAuth } from "../../hooks/useAuth";

import {
  Button,
  Card,
  Grid,
  Muted,
  Page,
  SecondaryButton,
  Title,
} from "../../styles/ui";

const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const HeroCard = styled(Card)`
  overflow: hidden;
  padding: 0;
  border-radius: 28px;
  background: rgba(24, 9, 38, 0.96);
  border: 1px solid rgba(196, 68, 224, 0.12);
  backdrop-filter: blur(12px);
`;

const Cover = styled.div`
  position: relative;
  height: 240px;
  background: ${({ $theme }) =>
    $theme
      ? `linear-gradient(125deg, ${$theme[0]}, ${$theme[1]})`
      : `url(${CoverImage}) center/cover`};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1),
      rgba(14, 5, 22, 0.75)
    );
  }

  @media (max-width: 700px) {
    height: 200px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 18px;
  left: 18px;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  z-index: 10;
  cursor: pointer;

  background: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 0.8);

  font-size: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(6px);

  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.55);
    color: white;
  }
`;

const Content = styled.div`
  padding: 0 28px 32px;

  @media (max-width: 700px) {
    padding: 0 18px 24px;
  }
`;

const AvatarWrapper = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;

  margin-top: -65px;
  position: relative;
  z-index: 5;

  border: 4px solid #8f35d6;

  background: #1d0a2e;

  box-shadow:
    0 0 0 5px rgba(143, 53, 214, 0.16),
    0 10px 28px rgba(0, 0, 0, 0.45);

  @media (max-width: 700px) {
    width: 110px;
    height: 110px;
    margin-top: -55px;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserBlock = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const UserName = styled(Title)`
  margin: 0;
  font-size: 34px;

  @media (max-width: 700px) {
    font-size: 28px;
  }
`;

const StatsGrid = styled(Grid)`
  margin-top: 26px;
  gap: 18px;

  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  min-height: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  border-radius: 22px;

  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(196, 68, 224, 0.12);

  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(196, 68, 224, 0.3);
  }

  strong {
    font-size: 28px;
    margin-bottom: 8px;
  }
`;

const Section = styled.div`
  margin-top: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #d178ff;

  margin-bottom: 16px;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const Badge = styled.div`
  width: 64px;
  height: 64px;

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;

  background: rgba(255, 255, 255, 0.05);

  border: 1px solid rgba(196, 68, 224, 0.18);

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(214, 58, 205, 0.45);

    box-shadow: 0 8px 24px rgba(196, 68, 224, 0.24);
  }
`;

const SupportCard = styled.div`
  margin-top: 32px;

  width: 100%;

  border-radius: 22px;

  padding: 22px;

  background: linear-gradient(
    135deg,
    #7b22d4,
    #b030d8
  );

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  transition: 0.2s;

  box-shadow: 0 8px 28px rgba(123, 34, 212, 0.35);

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
  }

  @media (max-width: 600px) {
    gap: 14px;
  }
`;

const SupportText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 17px;
  }

  span {
    font-size: 13px;
    opacity: 0.85;
  }
`;

const SupportHeart = styled.span`
  font-size: 26px;
`;

const Actions = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 32px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default function Perfil() {
  const navigate = useNavigate();

  const { usuario, logout } = useAuth();

  const theme =
    Array.isArray(usuario?.theme) &&
    usuario.theme.length >= 2
      ? usuario.theme
      : null;

  const badges = [
    "🏆",
    "💎",
    "⚡",
    "🔥",
    "🎯",
  ];

  async function leave() {
    await logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <Page>
      <ProfileWrapper>
        <div>
          <Title>
            Seu perfil
          </Title>

          <Muted>
            As alterações ficam disponíveis
            também no aplicativo mobile.
          </Muted>
        </div>

        <HeroCard>
          <Cover $theme={theme}>
            <BackButton
              onClick={() => navigate(-1)}
            >
              ←
            </BackButton>
          </Cover>

          <Content>
            <AvatarWrapper>
              <Avatar
                src={
                  usuario?.photo ||
                  AvatarImage
                }
                alt="Avatar"
              />
            </AvatarWrapper>

            <UserBlock>
              <UserName>
                {usuario?.name ||
                  "Usuário"}
              </UserName>

              <LevelProgress
                xp={usuario?.xp || 0}
                level={usuario?.level || 1}
              />
            </UserBlock>

            <StatsGrid>
              <StatCard>
                <strong>
                  {usuario?.groupIds
                    ?.length || 0}
                </strong>

                <Muted>
                  Grupos
                </Muted>
              </StatCard>

              <StatCard>
                <strong>
                  {usuario?.xp || 0}
                </strong>

                <Muted>XP</Muted>
              </StatCard>

              <StatCard>
                <strong>
                  {usuario?.level || 1}
                </strong>

                <Muted>
                  Nível
                </Muted>
              </StatCard>
            </StatsGrid>

            <Section>
              <SectionTitle>
                Conquistas
              </SectionTitle>

              <BadgeRow>
                {badges.map(
                  (badge, index) => (
                    <Badge key={index}>
                      {badge}
                    </Badge>
                  )
                )}
              </BadgeRow>
            </Section>

            <SupportCard
              onClick={() =>
                navigate("/doacao")
              }
            >
              <SupportText>
                <strong>
                  Apoie os Devs
                </strong>

                <span>
                  Pague um café e ajude
                  o app a crescer
                </span>
              </SupportText>

              <SupportHeart>
                ♥
              </SupportHeart>
            </SupportCard>

            <Actions>
              <Button
                as={Link}
                to="/editar-perfil"
              >
                Editar perfil
              </Button>

              <SecondaryButton
                onClick={leave}
              >
                Sair
              </SecondaryButton>
            </Actions>
          </Content>
        </HeroCard>
      </ProfileWrapper>
    </Page>
  );
}

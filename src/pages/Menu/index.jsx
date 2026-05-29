import styled from "styled-components";

import AvatarImage from "../../assets/image/avatar.png";
import CoverImage from "../../assets/image/cover.png";

import LevelProgress from "../../components/LevelProgress";
import { useMenuStats } from "../../hooks/useMenuStats";

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(
    ellipse at top,
    #32104f 0%,
    #1b0630 45%,
    #0d0218 100%
  );
  color: white;
`;

/* ───────────────── Scroll ───────────────── */

const ContentScroll = styled.div`
  min-height: 100vh;

  padding: 34px;

  @media (max-width: 700px) {
    padding: 20px;
  }
`;

/* ───────────────── Hero Banner ───────────────── */

const Banner = styled.section`
  width: 100%;
  min-height: 270px;

  border-radius: 34px;

  background:
    radial-gradient(circle at top right, rgba(255,255,255,.14), transparent 30%),
    linear-gradient(135deg, #1d5fff, #7928ff 55%, #e940ff);

  position: relative;
  overflow: hidden;

  margin-bottom: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
`;

const Glow = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  filter: blur(60px);

  &.left {
    left: -40px;
    bottom: -30px;
    background: rgba(255, 62, 255, 0.5);
  }

  &.right {
    right: -50px;
    top: -40px;
    background: rgba(0, 255, 255, 0.45);
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px;

  h2 {
    font-size: clamp(34px, 6vw, 62px);
    font-weight: 900;
    margin-bottom: 14px;
  }

  h4 {
    font-size: clamp(18px, 2vw, 24px);
    color: #efe5ff;
    margin-bottom: 12px;
    font-weight: 600;
  }

  p {
    font-size: clamp(14px, 2vw, 18px);
    color: rgba(255, 255, 255, 0.88);
  }
`;

/* ───────────────── Section Header ───────────────── */

const DividerTitle = styled.div`
  width: 100%;
  min-height: 68px;

  border-radius: 22px;

  background: rgba(255, 255, 255, 0.05);

  border: 1px solid rgba(255, 255, 255, 0.06);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  margin-bottom: 34px;

  h3 {
    font-size: clamp(22px, 3vw, 30px);
    color: #e9d4ff;
    font-weight: 800;
  }
`;

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;

  &.pink {
    background: #ff4dff;
    box-shadow: 0 0 14px #ff4dff;
  }

  &.blue {
    background: #00ffff;
    box-shadow: 0 0 14px #00ffff;
  }
`;

/* ───────────────── Stats Card ───────────────── */

const StatisticsCard = styled.section`
  width: 100%;
  max-width: 1250px;

  margin: auto;

  border-radius: 34px;
  overflow: hidden;

  background: linear-gradient(
    180deg,
    rgba(63, 26, 99, 0.96),
    rgba(35, 11, 58, 0.96)
  );

  border: 1px solid rgba(255, 255, 255, 0.06);

  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.38);
`;

const CardCover = styled.div`
  width: 100%;
  height: 320px;

  background:
    linear-gradient(rgba(0,0,0,.15), rgba(0,0,0,.45)),
    url(${CoverImage}) center/cover;

  @media (max-width: 700px) {
    height: 220px;
  }
`;

const ProfileCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: -90px;

  padding: 0 24px 10px;
`;

const AvatarWrapper = styled.div`
  width: 175px;
  height: 175px;

  border-radius: 50%;

  padding: 6px;

  background: linear-gradient(135deg, #d44cff, #00e5ff);

  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);

  margin-bottom: 22px;

  img {
    width: 100%;
    height: 100%;

    border-radius: 50%;
    object-fit: cover;

    border: 5px solid #22063b;
    background: #22063b;
  }

  @media (max-width: 700px) {
    width: 130px;
    height: 130px;
  }
`;

const UserName = styled.h2`
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 900;

  text-align: center;

  margin-bottom: 10px;
`;

const UserLevel = styled.p`
  color: #d8c8f5;
  font-size: 17px;
  margin-bottom: 20px;
`;

const ProgressWrapper = styled.div`
  width: min(100%, 560px);
  margin-bottom: 44px;
`;

const StatsGrid = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 24px;

  padding: 0 34px 42px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 700px) {
    padding: 0 20px 30px;
  }
`;

const StatBox = styled.div`
  min-height: 190px;

  border-radius: 28px;

  background:
    linear-gradient(rgba(64, 26, 98, 0.92), rgba(64, 26, 98, 0.92)),
    linear-gradient(135deg, #00e1ff, #d54dff);

  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: 2px solid transparent;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  transition: 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35);
  }

  p {
    font-size: 16px;
    color: #d9cbf2;
    margin-bottom: 14px;
    font-weight: 600;
  }

  h2 {
    font-size: ${({ highlight }) =>
      highlight ? "26px" : "48px"};

    font-weight: 900;
    line-height: 1.2;

    color: white;

    word-break: break-word;
    padding: 0 12px;
  }
`;

export default function Menu() {
  const {
    usuario,
    loading,
    vitorias,
    melhorMateria,
    posicao,
  } = useMenuStats();

  return (
    <Page>
      <ContentScroll>
        <Banner>
          <Glow className="left" />

          <BannerContent>
            <h2>
              Olá, {usuario?.name || "Estudante"}
            </h2>

            <h4>Online Study Group</h4>

            <p>
              Continue evoluindo no ranking e acumulando XP.
            </p>
          </BannerContent>

          <Glow className="right" />
        </Banner>

        <DividerTitle>
          <Dot className="pink" />

          <h3>Suas Estatísticas</h3>

          <Dot className="blue" />
        </DividerTitle>

        <StatisticsCard>
          <CardCover />

          <ProfileCenter>
            <AvatarWrapper>
              <img
                src={usuario?.photo || AvatarImage}
                alt="Foto de perfil"
              />
            </AvatarWrapper>

            <UserName>
              {usuario?.name || "Usuário"}
            </UserName>

            <UserLevel>
              {usuario?.xp || 0} XP • Nível{" "}
              {usuario?.level || 1}
            </UserLevel>

            <ProgressWrapper>
              <LevelProgress
                compact
                xp={usuario?.xp || 0}
                level={usuario?.level || 1}
              />
            </ProgressWrapper>
          </ProfileCenter>

          <StatsGrid>
            <StatBox>
              <p>Vitórias</p>
              <h2>{vitorias}</h2>
            </StatBox>

            <StatBox>
              <p>Ranking</p>

              <h2>
                {loading
                  ? "..."
                  : posicao
                  ? `${posicao}º`
                  : "-"}
              </h2>
            </StatBox>

            <StatBox highlight>
              <p>Matéria Top</p>

              <h2>{melhorMateria}</h2>
            </StatBox>
          </StatsGrid>
        </StatisticsCard>
      </ContentScroll>
    </Page>
  );
}

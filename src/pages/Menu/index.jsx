import { Link } from "react-router-dom";
import styled from "styled-components";

import AvatarImage from "../../assets/image/avatar.png";
import CoverImage from "../../assets/image/cover.png";

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
  display: flex;
  overflow: hidden;
  color: white;
`;

/* ───────────────── Sidebar ───────────────── */

const Sidebar = styled.aside`
  width: 260px;
  min-width: 260px;
  height: 100vh;
  background: rgba(31, 8, 51, 0.95);
  backdrop-filter: blur(14px);
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  display: flex;
  flex-direction: column;
  padding: 28px 18px;

  @media (max-width: 900px) {
    width: 92px;
    min-width: 92px;
    padding: 22px 12px;
  }
`;

const SidebarLogo = styled.h1`
  font-size: 42px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 55px;

  background: linear-gradient(135deg, #ffffff, #cf78ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  letter-spacing: 2px;

  @media (max-width: 900px) {
    font-size: 28px;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const NavItem = styled(Link)`
  width: 100%;
  min-height: 58px;

  display: flex;
  align-items: center;
  gap: 16px;

  padding: 0 18px;

  border-radius: 18px;

  text-decoration: none;
  color: #f3e9ff;

  transition: 0.22s ease;

  background: ${({ active }) =>
    active
      ? "linear-gradient(135deg, rgba(186,85,255,.28), rgba(117,39,196,.22))"
      : "transparent"};

  border: 1px solid
    ${({ active }) =>
      active ? "rgba(212,146,251,.5)" : "transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
  }

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  span {
    font-weight: 600;
    font-size: 15px;

    @media (max-width: 900px) {
      display: none;
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
    padding: 0;
  }
`;

/* ───────────────── Main ───────────────── */

const MainArea = styled.main`
  flex: 1;
  margin-left: 260px;

  display: flex;
  flex-direction: column;

  min-height: 100vh;

  @media (max-width: 900px) {
    margin-left: 92px;
  }
`;

/* ───────────────── Topbar ───────────────── */

const Topbar = styled.header`
  width: 100%;
  min-height: 92px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 34px;

  background: rgba(38, 12, 60, 0.72);
  backdrop-filter: blur(16px);

  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  position: sticky;
  top: 0;
  z-index: 50;

  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    padding: 18px;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  max-width: 520px;
  height: 48px;

  position: relative;

  input {
    width: 100%;
    height: 100%;

    border-radius: 50px;
    border: 1px solid rgba(212, 146, 251, 0.25);

    background: rgba(255, 255, 255, 0.06);

    padding-left: 48px;

    color: white;
    font-size: 15px;

    outline: none;

    transition: 0.2s ease;
  }

  input:focus {
    border-color: #d492fb;
    box-shadow: 0 0 0 4px rgba(212, 146, 251, 0.1);
  }

  input::placeholder {
    color: #baa3d9;
  }

  img {
    width: 18px;

    position: absolute;
    top: 50%;
    left: 18px;

    transform: translateY(-50%);
    filter: brightness(0) invert(1);
    opacity: 0.8;
  }

  @media (max-width: 700px) {
    max-width: 100%;
  }
`;

const ControllerButton = styled(Link)`
  width: 48px;
  height: 48px;

  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(135deg, #7327c4, #c03dff);

  border: 1px solid rgba(255, 255, 255, 0.08);

  transition: 0.2s ease;

  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px) scale(1.04);
    filter: brightness(1.1);
    box-shadow: 0 10px 24px rgba(192, 61, 255, 0.35);
  }

  img {
    width: 22px;
    height: 22px;
    filter: brightness(0) invert(1);
  }
`;

/* ───────────────── Scroll ───────────────── */

const ContentScroll = styled.div`
  flex: 1;
  overflow-y: auto;

  padding: 34px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #5f2b88;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

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

  const iconHome =
    "https://cdn-icons-png.flaticon.com/512/1946/1946488.png";

  const iconGame =
    "https://cdn-icons-png.flaticon.com/512/13/13973.png";

  const iconTrophy =
    "https://cdn-icons-png.flaticon.com/512/3112/3112946.png";

  const iconGroups =
    "https://cdn-icons-png.flaticon.com/512/166/166258.png";

  const iconProfile =
    "https://cdn-icons-png.flaticon.com/512/1077/1077063.png";

  const iconSearch =
    "https://cdn-icons-png.flaticon.com/512/54/54481.png";

  const iconController =
    "https://cdn-icons-png.flaticon.com/512/686/686589.png";

  return (
    <Page>
      <Sidebar>
        <SidebarLogo>OSG</SidebarLogo>

        <SidebarNav>
          <NavItem to="/menu" active="true">
            <img src={iconHome} alt="Home" />
            <span>Home</span>
          </NavItem>

          <NavItem to="/game">
            <img src={iconGame} alt="Game" />
            <span>Game</span>
          </NavItem>

          <NavItem to="/ranking">
            <img src={iconTrophy} alt="Ranking" />
            <span>Ranking</span>
          </NavItem>

          <NavItem to="/grupos">
            <img src={iconGroups} alt="Grupos" />
            <span>Grupos</span>
          </NavItem>

          <NavItem to="/perfil">
            <img src={iconProfile} alt="Perfil" />
            <span>Perfil</span>
          </NavItem>
        </SidebarNav>
      </Sidebar>

      <MainArea>
        <Topbar>
          <SearchBox>
            <img src={iconSearch} alt="Pesquisar" />

            <input
              type="text"
              placeholder="Pesquisar conteúdos, matérias ou usuários..."
            />
          </SearchBox>

          <ControllerButton to="/game">
            <img src={iconController} alt="Game" />
          </ControllerButton>
        </Topbar>

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
      </MainArea>
    </Page>
  );
}

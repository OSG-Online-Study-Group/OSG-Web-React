
import { Link } from "react-router-dom";
import styled from "styled-components";

import AvatarImage from "../../assets/image/avatar.png";
import CoverImage from "../../assets/image/cover.png";

import { useMenuStats } from "../../hooks/useMenuStats";

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: #160428;
  overflow: hidden;
  color: white;
  font-family: "Segoe UI", sans-serif;
`;

const Sidebar = styled.aside`
  width: 250px;
  min-width: 250px;
  height: 100vh;
  background: #2a003c;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  @media (max-width: 900px) {
    width: 95px;
    min-width: 95px;
  }
`;

const SidebarLogo = styled.h1`
  font-size: 42px;
  font-weight: bold;
  color: #d178ff;
  margin-bottom: 50px;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 26px;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NavItem = styled.div`
  width: 85%;
  height: 58px;
  margin-left: 10px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 22px;
  gap: 18px;
  cursor: pointer;
  transition: 0.3s;
  color: #e4d9ff;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  span {
    @media (max-width: 900px) {
      display: none;
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
    padding: 0;
  }
`;

const MainArea = styled.main`
  flex: 1;
  margin-left: 250px;
  height: 100vh;
  background: #22063b;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 900px) {
    margin-left: 95px;
  }
`;

const Topbar = styled.header`
  width: 100%;
  min-height: 90px;
  background: #34104f;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    padding: 20px;
  }
`;

const SearchBox = styled.div`
  width: 500px;
  height: 44px;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    border: 1px solid #5c2d88;
    background: #3b175d;
    padding-left: 45px;
    color: white;
    outline: none;
    font-size: 15px;
  }

  input::placeholder {
    color: #b7a4d6;
  }

  img {
    width: 16px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    filter: invert(1);
  }

  @media (max-width: 900px) {
    width: 230px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ControllerButton = styled(Link)`
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(196, 68, 224, 0.35);
  border-radius: 14px;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: rgba(196, 68, 224, 0.2);
    border-color: #c444e0;
    transform: translateY(-1px);
  }

  img {
    width: 22px;
    height: 22px;
    filter: brightness(0) invert(1);
  }
`;

const ContentScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 35px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #22063b;
  }

  &::-webkit-scrollbar-thumb {
    background: #5c2d88;
    border-radius: 20px;
  }

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Banner = styled.section`
  width: 100%;
  min-height: 250px;
  border-radius: 28px;
  background: linear-gradient(90deg, #113e9f, #5b1de0);
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerContent = styled.div`
  text-align: center;
  z-index: 2;

  h2 {
    font-size: 58px;
    margin-bottom: 15px;
  }

  h4 {
    font-size: 24px;
    color: #d8c9ff;
    margin-bottom: 15px;
  }

  p {
    font-size: 20px;
  }

  @media (max-width: 1200px) {
    h2 {
      font-size: 42px;
    }
  }

  @media (max-width: 900px) {
    h2 {
      font-size: 32px;
    }
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 26px;
    }

    h4 {
      font-size: 18px;
    }

    p {
      font-size: 15px;
    }
  }
`;

const Glow = styled.div`
  position: absolute;
  width: 10px;
  height: 60px;
  border-radius: 30px;
  top: 50%;
  transform: translateY(-50%);

  &.left {
    left: 20px;
    background: #ff3eff;
    box-shadow: 0 0 20px #ff3eff;
  }

  &.right {
    right: 20px;
    background: #00ffff;
    box-shadow: 0 0 20px #00ffff;
  }
`;

const DividerTitle = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 18px;
  background: #31104d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  margin-bottom: 35px;

  h3 {
    font-size: 28px;
    color: #c36cff;
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  &.pink {
    background: #ff4dff;
    box-shadow: 0 0 12px #ff4dff;
  }

  &.blue {
    background: #00ffff;
    box-shadow: 0 0 12px #00ffff;
  }
`;

const StatisticsCard = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  border-radius: 30px;
  overflow: hidden;
  background: linear-gradient(180deg, #3a1760, #291046);
  padding-bottom: 45px;
`;

const CardCover = styled.div`
  width: 100%;
  height: 320px;
  background: url(${CoverImage}) center/cover;

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const ProfileCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -90px;
  padding: 0 30px;
`;

const AvatarWrapper = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: #22063b;
  padding: 6px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`;

const UserName = styled.h2`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const UserLevel = styled.p`
  font-size: 18px;
  color: #d4c8f5;
  margin-bottom: 45px;
`;

const StatsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  padding: 0 40px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`;

const StatBox = styled.div`
  min-height: 180px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px solid transparent;

  background-image:
    linear-gradient(#442164, #442164),
    linear-gradient(135deg, #00e1ff, #d54dff);

  background-origin: border-box;
  background-clip: padding-box, border-box;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

  p {
    font-size: 18px;
    color: #d9cfff;
    margin-bottom: 15px;
  }

  h2 {
    font-size: ${({ highlight }) => (highlight ? "24px" : "42px")};
    line-height: 1.4;
  }
`;

export default function Menu() {
  const { usuario, loading, vitorias, melhorMateria, posicao } =
    useMenuStats();

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
          <NavItem>
            <img src={iconHome} alt="Home" />
            <span>Home</span>
          </NavItem>

          <NavItem>
            <img src={iconGame} alt="Game" />
            <span>Game</span>
          </NavItem>

          <NavItem>
            <img src={iconTrophy} alt="Ranking" />
            <span>Ranking</span>
          </NavItem>

          <NavItem>
            <img src={iconGroups} alt="Grupos" />
            <span>Grupos</span>
          </NavItem>

          <NavItem>
            <img src={iconProfile} alt="Perfil" />
            <span>Perfil</span>
          </NavItem>
        </SidebarNav>
      </Sidebar>

      <MainArea>
        <Topbar>
          <SearchBox>
            <img src={iconSearch} alt="Pesquisar" />
            <input type="text" placeholder="Pesquisar" />
          </SearchBox>

          <ControllerButton to="/game">
            <img src={iconController} alt="Controller" />
          </ControllerButton>
        </Topbar>

        <ContentScroll>
          <Banner>
            <Glow className="left" />

            <BannerContent>
              <h2>
                Olá, {usuario?.name || "Estudante"}!
              </h2>

              <h4>Online Study Group</h4>

              <p>Pronto para avançar hoje?</p>
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

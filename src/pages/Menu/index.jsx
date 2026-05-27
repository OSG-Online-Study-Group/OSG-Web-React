import { Link } from "react-router-dom";
import styled from "styled-components";
import AvatarImage from "../../assets/image/avatar.png";
import CoverImage from "../../assets/image/cover.png";
import { useMenuStats } from "../../hooks/useMenuStats";
import { Card, Grid, Muted, Page, Title } from "../../styles/ui";

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Banner = styled.div`
  background: linear-gradient(90deg, rgba(35,17,51,.35), rgba(35,17,51,.8)), url(${CoverImage}) center/cover;
  border-radius: 22px;
  margin-bottom: 28px;
  min-height: 170px;
  padding: 34px;
`;
const Profile = styled(Card)`
  background: ${({ $theme }) =>
    $theme ? `linear-gradient(135deg, ${$theme[0]}, ${$theme[1]})` : "#3a1f54"};
  margin-bottom: 20px;
`;
const Identity = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  margin-bottom: 22px;
  img { border-radius: 50%; height: 70px; object-fit: cover; width: 70px; }
  h2 { margin: 0 0 4px; }
`;
const Stat = styled(Card)`
  background: rgba(20, 9, 33, 0.35);
  text-align: center;
  strong { display: block; font-size: 1.45rem; margin-top: 6px; }
`;
const Action = styled(Link)`
  color: #d492fb;
  font-weight: 700;
`;

export default function Menu() {
  const { usuario, loading, vitorias, melhorMateria, posicao } = useMenuStats();
  const theme = Array.isArray(usuario?.theme) && usuario.theme.length >= 2 ? usuario.theme : null;
  return (
    <Page>
      <Header>
        <div>
          <Title>Olá, {usuario?.name || "estudante"}!</Title>
          <Muted>Pronto para avançar hoje?</Muted>
        </div>
        <Action to="/game">Jogar agora</Action>
      </Header>
      <Banner>
        <Title>Online Study Group</Title>
        <Muted>Aprenda, pratique e dispute em tempo real.</Muted>
      </Banner>
      <Profile $theme={theme}>
        <Identity>
          <img src={usuario?.photo || AvatarImage} alt="Foto de perfil" />
          <div>
            <h2>{usuario?.name || "Usuário"}</h2>
            <Muted>{usuario?.xp || 0} XP · Nível {usuario?.level || 1}</Muted>
          </div>
        </Identity>
        <Grid>
          <Stat><span>Vitórias</span><strong>{vitorias}</strong></Stat>
          <Stat><span>Ranking</span><strong>{loading ? "..." : posicao ? `${posicao}º` : "-"}</strong></Stat>
          <Stat><span>Matéria top</span><strong>{melhorMateria}</strong></Stat>
        </Grid>
      </Profile>
    </Page>
  );
}

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AvatarImage from "../../assets/image/avatar.png";
import CoverImage from "../../assets/image/cover.png";
import { useAuth } from "../../hooks/useAuth";
import { getTituloLevel } from "../../services/firestore";
import { Button, Card, Grid, Muted, Page, SecondaryButton, Title } from "../../styles/ui";

const Cover = styled.div`
  background: ${({ $theme }) =>
    $theme ? `linear-gradient(125deg, ${$theme[0]}, ${$theme[1]})` : `url(${CoverImage}) center/cover`};
  border-radius: 20px 20px 0 0;
  height: 180px;
`;
const ProfileCard = styled(Card)`padding: 0 0 24px; overflow: hidden;`;
const Avatar = styled.img`
  border: 4px solid #3a1f54;
  border-radius: 50%;
  height: 112px;
  margin: -56px auto 12px;
  object-fit: cover;
  position: relative;
  width: 112px;
`;
const Center = styled.div`text-align: center; padding: 0 22px;`;
const Actions = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 22px;`;

export default function Perfil() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const theme = Array.isArray(usuario?.theme) && usuario.theme.length >= 2 ? usuario.theme : null;
  async function leave() {
    await logout();
    navigate("/login", { replace: true });
  }
  return (
    <Page>
      <Title>Seu perfil</Title>
      <Muted>As alterações ficam disponíveis também no aplicativo mobile.</Muted>
      <ProfileCard>
        <Cover $theme={theme} />
        <Center>
          <Avatar src={usuario?.photo || AvatarImage} alt="Avatar" />
          <Title>{usuario?.name || "Usuário"}</Title>
          <Muted>{usuario?.xp || 0} XP · {getTituloLevel(usuario?.level || 1)}</Muted>
          <Grid>
            <Card><strong>{usuario?.groupIds?.length || 0}</strong><Muted>Grupos</Muted></Card>
            <Card><strong>{usuario?.xp || 0}</strong><Muted>XP</Muted></Card>
            <Card><strong>{usuario?.level || 1}</strong><Muted>Nível</Muted></Card>
          </Grid>
          <Actions>
            <Button as={Link} to="/editar-perfil">Editar perfil</Button>
            <SecondaryButton onClick={leave}>Sair</SecondaryButton>
          </Actions>
        </Center>
      </ProfileCard>
    </Page>
  );
}

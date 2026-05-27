import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../../assets/image/logo_OSG.png";
import { Button } from "../../styles/ui";

const Hero = styled.main`
  align-items: center;
  background: radial-gradient(circle at 75% 20%, #592073, #160c22 52%);
  color: #fff;
  display: grid;
  gap: clamp(30px, 7vw, 80px);
  grid-template-columns: repeat(2, minmax(280px, 500px));
  justify-content: center;
  min-height: 100vh;
  padding: 36px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;
const Copy = styled.div`
  h1 { font-size: clamp(2.3rem, 6vw, 4rem); line-height: 1.05; margin: 0 0 18px; }
  p { color: #ccb5e7; font-size: 1.08rem; margin: 0 0 30px; }
`;
const Actions = styled.div`
  display: flex;
  gap: 14px;
  @media (max-width: 680px) { justify-content: center; }
`;
const Outline = styled(Button)`
  background: transparent;
  border: 1px solid #b84ef2;
`;
const Logo = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 390px;
  width: 100%;
`;

export default function Landing() {
  return (
    <Hero>
      <Copy>
        <h1>Estude em grupo. Evolua jogando.</h1>
        <p>Online Study Group conecta estudo, chats, quizzes, rankings e duelos em tempo real.</p>
        <Actions>
          <Button as={Link} to="/cadastro">Criar conta</Button>
          <Outline as={Link} to="/login">Entrar</Outline>
        </Actions>
      </Copy>
      <Logo src={LogoImage} alt="OSG - Online Study Group" />
    </Hero>
  );
}

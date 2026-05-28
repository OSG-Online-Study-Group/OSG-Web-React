import styled from "styled-components";
import AvatarImage from "../../assets/image/avatar.png";
import CoverImage from "../../assets/image/cover.png";

import { THEMES } from "../../constants/themes";
import { useProfile } from "../../hooks/useProfile";

import {
  Button,
  Input,
  Message,
  Muted,
  Page,
  SecondaryButton,
  Title,
} from "../../styles/ui";

const Container = styled(Page)`
  padding: 0;
  overflow-x: hidden;
  background:
    radial-gradient(circle at top, #34104f 0%, #1b0b2e 55%, #12031f 100%);
`;

const EditorWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
`;

const Banner = styled.div`
  width: 100%;
  height: 260px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.25s;

  background: ${({ $theme }) =>
    $theme
      ? `linear-gradient(135deg, ${$theme[0]}, ${$theme[1]})`
      : `url(${CoverImage}) center/cover`};

  &:hover {
    filter: brightness(1.08);
  }

  @media (max-width: 700px) {
    height: 220px;
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.4)
    );
`;

const BannerHint = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  pointer-events: none;

  span {
    opacity: 0.75;
    font-size: 15px;
    color: #f3e8ff;
  }
`;

const BannerIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;

  backdrop-filter: blur(8px);
`;

const HiddenInput = styled.input`
  display: none;
`;

const AvatarSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -70px;
  position: relative;
  z-index: 5;
`;

const AvatarWrapper = styled.div`
  width: 140px;
  height: 140px;
  position: relative;

  @media (max-width: 600px) {
    width: 115px;
    height: 115px;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;

  border: 4px solid #c444e0;
  background: #2d1846;

  box-shadow:
    0 0 0 6px rgba(196, 68, 224, 0.15),
    0 12px 32px rgba(0, 0, 0, 0.45);
`;

const AvatarButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;

  width: 38px;
  height: 38px;

  border-radius: 50%;
  border: 2px solid #1b0b2e;

  background: linear-gradient(135deg, #7c3aed, #c444e0);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  color: white;
  font-size: 15px;

  transition: 0.2s;

  &:hover {
    transform: scale(1.08);
    filter: brightness(1.08);
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 760px;

  margin: 0 auto;
  padding: 34px 28px 60px;

  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 600px) {
    padding: 26px 20px 50px;
  }
`;

const Header = styled.div`
  text-align: center;

  h1 {
    font-size: 36px;
    margin-bottom: 8px;
    color: white;
  }

  p {
    color: #cdb8eb;
    line-height: 1.6;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 28px;
    }
  }
`;

const ActionsGrid = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled.button`
  min-height: 90px;

  border-radius: 22px;
  border: 1.5px solid rgba(196, 68, 224, 0.2);

  background:
    linear-gradient(145deg, #3b175d, #2a0c46);

  padding: 18px;

  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(214, 58, 205, 0.5);

    box-shadow:
      0 10px 30px rgba(196, 68, 224, 0.2);
  }

  span {
    font-size: 13px;
    color: #d9cfff;
  }
`;

const ActionIcon = styled.div`
  font-size: 28px;
`;

const Section = styled.div`
  width: 100%;

  background:
    linear-gradient(145deg, #32114f, #250a3f);

  border-radius: 28px;

  border: 1px solid rgba(196, 68, 224, 0.16);

  padding: 28px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.25);

  @media (max-width: 600px) {
    padding: 22px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  color: #d178ff;
`;

const ThemeGrid = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
`;

const ThemeButton = styled.button`
  width: 58px;
  height: 58px;

  border-radius: 50%;

  border: ${({ $active }) =>
    $active
      ? "3px solid white"
      : "3px solid transparent"};

  background:
    linear-gradient(
      135deg,
      ${({ $colors }) => $colors[0]},
      ${({ $colors }) => $colors[1]}
    );

  cursor: pointer;

  transition: 0.22s;

  box-shadow:
    ${({ $active }) =>
      $active
        ? "0 0 0 4px rgba(196, 68, 224, 0.4)"
        : "none"};

  &:hover {
    transform: scale(1.08);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledInput = styled(Input)`
  height: 56px;
  border-radius: 16px;
  border: 1.5px solid #4b2672;

  background: rgba(0, 0, 0, 0.18);

  color: white;

  &:focus {
    border-color: #c444e0;
  }
`;

const FooterButtons = styled.div`
  width: 100%;

  display: flex;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledSecondaryButton = styled(SecondaryButton)`
  flex: 1;
  height: 56px;
  border-radius: 50px;
`;

const StyledButton = styled(Button)`
  flex: 1;
  height: 56px;
  border-radius: 50px;
`;

export default function EditarPerfil() {
  const {
    foto,
    theme,
    nome,
    setTheme,
    setNome,
    escolherFoto,
    salvar,
    removerFoto,
    loading,
    message,
    error,
  } = useProfile();

  return (
    <Container>
      <EditorWrapper>

        <Banner $theme={theme}>
          <BannerOverlay />

          <BannerHint>
            <BannerIcon>🖼️</BannerIcon>

            <span>Seu tema personalizado</span>
          </BannerHint>
        </Banner>

        <AvatarSection>
          <AvatarWrapper>
            <Avatar
              src={foto || AvatarImage}
              alt="Foto de perfil"
            />

            <AvatarButton
              type="button"
              onClick={() =>
                document.getElementById("profile-photo-input")?.click()
              }
            >
              ✏️
            </AvatarButton>

            <HiddenInput
              id="profile-photo-input"
              type="file"
              accept="image/*"
              onChange={escolherFoto}
            />
          </AvatarWrapper>
        </AvatarSection>

        <Content>

          <Header>
            <Title>Editar perfil</Title>

            <Muted>
              Escolha sua foto, personalize o tema e atualize
              suas informações mantendo a identidade da OSG.
            </Muted>
          </Header>

          <ActionsGrid>

            <ActionCard
              type="button"
              onClick={() =>
                document.getElementById("profile-photo-input")?.click()
              }
            >
              <ActionIcon>📸</ActionIcon>
              <span>Escolher foto</span>
            </ActionCard>

            <ActionCard
              type="button"
              onClick={removerFoto}
            >
              <ActionIcon>🗑️</ActionIcon>
              <span>Remover foto</span>
            </ActionCard>

            <ActionCard
              type="button"
              onClick={() => setTheme(null)}
            >
              <ActionIcon>🎨</ActionIcon>
              <span>Sem tema</span>
            </ActionCard>

          </ActionsGrid>

          <Section>

            <SectionTitle>Personalização</SectionTitle>

            <FormGroup>
              <Muted>Nome</Muted>

              <StyledInput
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
                placeholder="Digite seu nome"
                maxLength={40}
              />
            </FormGroup>

            <FormGroup>
              <Muted>Tema do cartão</Muted>

              <ThemeGrid>
                {Object.values(THEMES).map((colors) => (
                  <ThemeButton
                    key={colors.join("-")}
                    type="button"
                    $colors={colors}
                    $active={
                      JSON.stringify(colors) ===
                      JSON.stringify(theme)
                    }
                    onClick={() => setTheme(colors)}
                    aria-label="Escolher tema"
                  />
                ))}
              </ThemeGrid>
            </FormGroup>

          </Section>

          <FooterButtons>

            <StyledSecondaryButton
              type="button"
              onClick={() => window.history.back()}
            >
              Cancelar
            </StyledSecondaryButton>

            <StyledButton
              disabled={loading}
              onClick={salvar}
            >
              {loading
                ? "Salvando..."
                : "Salvar alterações"}
            </StyledButton>

          </FooterButtons>

          {message && (
            <Message>
              {message}
            </Message>
          )}

          {error && (
            <Message $error>
              {error}
            </Message>
          )}

        </Content>
      </EditorWrapper>
    </Container>
  );
}
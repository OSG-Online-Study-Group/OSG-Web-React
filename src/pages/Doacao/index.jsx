import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "../../assets/image/logo_OSG.png";

import {
  Button,
  Card,
  Muted,
  Page,
  Title,
} from "../../styles/ui";

const PIX_KEY = "seu-email@exemplo.com";

const BUYMEACOFFEE_URL =
  "https://buymeacoffee.com/seu-usuario";

const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
  PIX_KEY
)}&bgcolor=1a0630&color=d63acd&qzone=2`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const BackButton = styled.button`
  width: fit-content;

  background: none;
  border: none;

  color: rgba(255, 255, 255, 0.22);

  font-size: 13px;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.55);
  }
`;

const HeroSection = styled(Card)`
  position: relative;

  overflow: hidden;

  padding: 34px;

  border-radius: 30px;

  background: linear-gradient(
    135deg,
    #5c1a9e 0%,
    #8b1fc8 100%
  );

  box-shadow: 0 12px 40px rgba(140, 30, 200, 0.25);

  &::before {
    content: "";

    position: absolute;

    top: -40px;
    right: -40px;

    width: 160px;
    height: 160px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 700px) {
    padding: 26px 22px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  h1 {
    font-size: 38px;
    line-height: 1.1;
  }

  p {
    max-width: 620px;

    font-size: 15px;
    line-height: 1.7;

    opacity: 0.88;
  }

  span {
    color: #ff8ce9;
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 30px;
    }
  }
`;

const LogoWrapper = styled.div`
  width: 110px;
  height: 110px;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.08);

  border: 1px solid rgba(255, 255, 255, 0.12);

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 0 30px rgba(255, 255, 255, 0.08);

  flex-shrink: 0;
`;

const LogoImage = styled.img`
  width: 78px;
  height: 78px;
  object-fit: contain;
`;

const CardsGrid = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const DonateCard = styled(Card)`
  padding: 24px 20px;

  border-radius: 24px;

  background: linear-gradient(
    145deg,
    #34115f,
    #240942
  );

  border: 1px solid
    ${({ $active }) =>
      $active
        ? "rgba(214, 58, 205, 0.55)"
        : "rgba(196, 68, 224, 0.16)"};

  transition: 0.25s;

  cursor: pointer;

  overflow: hidden;

  &:hover {
    transform: translateY(-2px);

    border-color: rgba(214, 58, 205, 0.45);

    box-shadow: 0 10px 32px
      rgba(196, 68, 224, 0.18);
  }
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  gap: 14px;
`;

const CardIcon = styled.div`
  width: 58px;
  height: 58px;

  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;

  background: ${({ $variant }) =>
    $variant === "coffee"
      ? "#f5a623"
      : $variant === "pix"
      ? "rgba(100, 80, 255, 0.18)"
      : "rgba(214, 58, 205, 0.16)"};

  color: ${({ $variant }) =>
    $variant === "coffee"
      ? "#1c0a2c"
      : $variant === "pix"
      ? "#b39cff"
      : "#f178ea"};

  svg {
    width: 30px;
    height: 30px;
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  line-height: 1.4;
`;

const ExpandArea = styled.div`
  max-height: ${({ $open }) =>
    $open ? "320px" : "0"};

  opacity: ${({ $open }) =>
    $open ? "1" : "0"};

  overflow: hidden;

  transition:
    max-height 0.35s ease,
    opacity 0.3s ease,
    margin-top 0.3s ease;

  margin-top: ${({ $open }) =>
    $open ? "18px" : "0"};
`;

const QRImage = styled.img`
  width: 180px;
  height: 180px;

  border-radius: 18px;

  border: 2px solid
    rgba(214, 58, 205, 0.35);

  display: block;

  margin: 0 auto 14px;

  box-shadow: 0 0 24px
    rgba(196, 68, 224, 0.15);
`;

const Hint = styled.p`
  text-align: center;

  font-size: 13px;

  opacity: 0.55;
`;

const PixBox = styled.div`
  width: 100%;

  background: rgba(0, 0, 0, 0.24);

  border: 1px solid
    rgba(196, 68, 224, 0.22);

  border-radius: 14px;

  padding: 14px;

  text-align: center;

  margin-bottom: 16px;

  word-break: break-all;

  font-size: 13px;

  line-height: 1.5;
`;

const CopyButton = styled(Button)`
  width: 100%;
`;

const MessageCard = styled(Card)`
  padding: 26px;

  border-radius: 28px;

  background: linear-gradient(
    145deg,
    #34115f,
    #240942
  );

  border: 1px solid
    rgba(196, 68, 224, 0.16);

  display: flex;
  flex-direction: column;

  gap: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 130px;

  resize: none;

  border: 1px solid
    rgba(196, 68, 224, 0.18);

  border-radius: 18px;

  padding: 18px;

  background: rgba(0, 0, 0, 0.22);

  color: white;

  font-size: 14px;

  outline: none;

  transition: 0.2s;

  &:focus {
    border-color: rgba(
      214,
      58,
      205,
      0.45
    );
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.24);
  }
`;

const Footer = styled.p`
  text-align: center;

  font-size: 12px;

  opacity: 0.28;
`;

export default function Doacao() {
  const navigate = useNavigate();

  const [open, setOpen] =
    useState(null);

  const [copied, setCopied] =
    useState(false);

  function toggle(card) {
    if (card === "coffee") {
      window.open(
        BUYMEACOFFEE_URL,
        "_blank"
      );

      return;
    }

    setOpen((prev) =>
      prev === card ? null : card
    );
  }

  function handleCopy(e) {
    e.stopPropagation();

    navigator.clipboard.writeText(
      PIX_KEY
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Page>
      <Wrapper>
        <BackButton
          onClick={() => navigate("/perfil")}
        >
          ← voltar
        </BackButton>

        <HeroSection>
          <HeroContent>
            <HeroText>
              <Title>
                Apoie o projeto{" "}
                <span>✦</span>
              </Title>

              <Muted
                style={{
                  color:
                    "rgba(255,255,255,0.82)",
                  fontSize: "15px",
                  lineHeight: "1.7",
                }}
              >
                Cada contribuição ajuda a
                manter o OSG vivo e
                gratuito para todos.
                Escolha como deseja apoiar
                o desenvolvimento da
                plataforma.
              </Muted>
            </HeroText>

            <LogoWrapper>
              <LogoImage
                src={Logo}
                alt="OSG Logo"
              />
            </LogoWrapper>
          </HeroContent>
        </HeroSection>

        <CardsGrid>
          <DonateCard
            $active={open === "qr"}
            onClick={() =>
              toggle("qr")
            }
          >
            <CardTop>
              <CardIcon $variant="qr">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                  />

                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                  />

                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                  />

                  <rect
                    x="5"
                    y="5"
                    width="3"
                    height="3"
                    fill="currentColor"
                    stroke="none"
                  />

                  <rect
                    x="16"
                    y="5"
                    width="3"
                    height="3"
                    fill="currentColor"
                    stroke="none"
                  />

                  <rect
                    x="5"
                    y="16"
                    width="3"
                    height="3"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </CardIcon>

              <CardTitle>
                Pix QR Code
              </CardTitle>
            </CardTop>

            <ExpandArea
              $open={open === "qr"}
            >
              <QRImage
                src={QR_URL}
                alt="QR Code Pix"
              />

              <Hint>
                Aponte a câmera para
                realizar o pagamento
              </Hint>
            </ExpandArea>
          </DonateCard>

          <DonateCard
            $active={open === "pix"}
            onClick={() =>
              toggle("pix")
            }
          >
            <CardTop>
              <CardIcon $variant="pix">
                📋
              </CardIcon>

              <CardTitle>
                Pix Copia e Cola
              </CardTitle>
            </CardTop>

            <ExpandArea
              $open={open === "pix"}
            >
              <PixBox>
                {PIX_KEY}
              </PixBox>

              <CopyButton
                onClick={handleCopy}
              >
                {copied
                  ? "✓ Copiado!"
                  : "Copiar chave"}
              </CopyButton>
            </ExpandArea>
          </DonateCard>

          <DonateCard
            onClick={() =>
              toggle("coffee")
            }
          >
            <CardTop>
              <CardIcon $variant="coffee">
                ☕
              </CardIcon>

              <CardTitle>
                Buy Me a Coffee
              </CardTitle>
            </CardTop>
          </DonateCard>
        </CardsGrid>

        <MessageCard>
          <SectionTitle>
            Deixe uma mensagem para os
            devs 💜
          </SectionTitle>

          <TextArea
            placeholder="Escreva algo aqui..."
          />

          <div
            style={{
              display: "flex",
              justifyContent:
                "flex-end",
            }}
          >
            <Button>
              Enviar mensagem
            </Button>
          </div>
        </MessageCard>

        <Footer>
          Feito com 💜 pelo time OSG
        </Footer>
      </Wrapper>
    </Page>
  );
}

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;

  color: #d178ff;
`;
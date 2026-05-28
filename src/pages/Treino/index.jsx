import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useTreino } from "../../hooks/useTreino";
import { Card, Muted, Page, Title } from "../../styles/ui";

/* ANIMAÇÕES */
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(196, 68, 224, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(196, 68, 224, 0.5);
  }
  100% {
    box-shadow: 0 0 0 rgba(196, 68, 224, 0.3);
  }
`;

/* HEADER INFO */
const TopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const XPBadge = styled.div`
  background: linear-gradient(135deg, #8b2cf5, #d84dff);
  color: white;
  padding: 10px 20px;
  border-radius: 40px;
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(180, 50, 210, 0.35);
`;

/* CARD DA QUESTÃO */
const Question = styled(Card)`
  max-width: 820px;
  margin: 24px auto 20px;
  padding: 38px;
  border-radius: 30px;
  background: linear-gradient(180deg, #3a1760, #22063b);
  border: 1px solid rgba(196, 68, 224, 0.18);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  animation: ${fadeUp} 0.35s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -80px;
    right: -60px;
    width: 220px;
    height: 220px;
    background: radial-gradient(
      circle,
      rgba(196, 68, 224, 0.2),
      transparent 70%
    );
  }

  h2 {
    position: relative;
    z-index: 2;
    color: white;
    font-size: clamp(1.5rem, 2vw, 2rem);
    line-height: 1.5;
    font-weight: 700;
  }
`;

/* GRID DE ALTERNATIVAS */
const Options = styled.div`
  max-width: 820px;
  margin: auto;
  display: grid;
  gap: 18px;
`;

/* BOTÃO */
const Option = styled.button`
  width: 100%;
  padding: 20px 22px;
  border-radius: 22px;
  border: 2px solid transparent;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  text-align: left;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  transition: 0.25s ease;
  animation: ${fadeUp} 0.35s ease both;

  background: ${({ $state }) =>
    $state === "correct"
      ? "linear-gradient(135deg, #1f9d55, #38d67a)"
      : $state === "wrong"
      ? "linear-gradient(135deg, #b42323, #ff4f4f)"
      : "linear-gradient(135deg, #4a1d75, #34104f)"};

  border-color: ${({ $state }) =>
    $state === "correct"
      ? "#4dff9a"
      : $state === "wrong"
      ? "#ff7d7d"
      : "rgba(196, 68, 224, 0.2)"};

  box-shadow: ${({ $state }) =>
    $state === "correct"
      ? "0 0 24px rgba(77, 255, 154, 0.35)"
      : $state === "wrong"
      ? "0 0 24px rgba(255, 77, 77, 0.3)"
      : "0 8px 22px rgba(0, 0, 0, 0.28)"};

  &:hover {
    transform: ${({ disabled }) =>
      disabled ? "none" : "translateY(-3px)"};

    filter: ${({ disabled }) =>
      disabled ? "none" : "brightness(1.08)"};

    border-color: ${({ disabled }) =>
      disabled ? "" : "#c444e0"};
  }

  &:disabled {
    opacity: 0.96;
  }
`;

const OptionLetter = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-right: 14px;
  background: rgba(255, 255, 255, 0.14);
  font-size: 0.95rem;
  font-weight: 800;
`;

const LoadingCard = styled(Card)`
  max-width: 820px;
  margin: 30px auto;
  padding: 45px;
  text-align: center;
  border-radius: 28px;
  background: linear-gradient(180deg, #32104f, #22063b);
  animation: ${pulse} 2s infinite;
`;

const NextText = styled.div`
  margin-top: 22px;
  text-align: center;
  color: #cfa6ff;
  font-size: 0.95rem;
  font-weight: 600;
  animation: ${fadeUp} 0.3s ease;
`;

export default function Treino() {
  const { categoria } = useParams();

  const {
    pergunta,
    carregando,
    respondido,
    selectedIndex,
    xpTotal,
    config,
    responder,
  } = useTreino(categoria);

  function state(index) {
    if (!respondido) return "";

    if (index === pergunta?.correta) return "correct";

    if (index === selectedIndex) return "wrong";

    return "";
  }

  return (
    <Page>
      <Title>Modo Treino</Title>

      <TopInfo>
        <Muted>
          {config?.label || "Categoria"} • Responda perguntas ilimitadas
        </Muted>

        <XPBadge>
          {xpTotal > 0
            ? `+${xpTotal} XP nesta sessão`
            : "0 XP acumulado"}
        </XPBadge>
      </TopInfo>

      {carregando ? (
        <LoadingCard>
          <h2 style={{ marginBottom: "12px", color: "#fff" }}>
            Gerando pergunta...
          </h2>

          <Muted>
            Aguarde enquanto preparamos um novo desafio.
          </Muted>
        </LoadingCard>
      ) : (
        <>
          <Question>
            <h2>{pergunta?.pergunta}</h2>
          </Question>

          <Options>
            {pergunta?.alternativas.map((option, index) => (
              <Option
                key={option}
                $state={state(index)}
                onClick={() => responder(index)}
                disabled={respondido}
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                <OptionLetter>
                  {String.fromCharCode(65 + index)}
                </OptionLetter>

                {option}
              </Option>
            ))}
          </Options>

          {respondido && (
            <NextText>
              Próxima pergunta sendo preparada...
            </NextText>
          )}
        </>
      )}
    </Page>
  );
}
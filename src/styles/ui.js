import styled from "styled-components";
import { COLORS } from "../constants/colors";

export const Page = styled.div`
  min-height: 100vh;
  padding: clamp(18px, 4vw, 38px);
  background: linear-gradient(150deg, ${COLORS.background}, #150b21);
`;

export const Title = styled.h1`
  margin: 0 0 8px;
  font-size: clamp(1.45rem, 4vw, 2rem);
`;

export const Muted = styled.p`
  margin: 0 0 18px;
  color: ${COLORS.textMuted};
`;

export const Card = styled.section`
  background: ${COLORS.card};
  border: 1px solid ${COLORS.border};
  border-radius: 18px;
  padding: clamp(16px, 3vw, 24px);
`;

export const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

export const Button = styled.button`
  border: 0;
  border-radius: 12px;
  padding: 12px 18px;
  background: ${COLORS.primary};
  color: ${COLORS.text};
  font-weight: 700;
  transition: background 0.18s ease, opacity 0.18s ease;

  &:hover:not(:disabled) {
    background: #cc74f8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const SecondaryButton = styled(Button)`
  background: ${COLORS.secondary};

  &:hover:not(:disabled) {
    background: ${COLORS.primaryDark};
  }
`;

export const DangerButton = styled(Button)`
  background: ${COLORS.error};
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  background: ${COLORS.secondary};
  color: ${COLORS.text};
  padding: 12px 14px;

  &::placeholder {
    color: ${COLORS.textMuted};
  }

  &:focus {
    outline: 2px solid ${COLORS.primary};
  }
`;

export const Message = styled.p`
  color: ${({ $error }) => ($error ? "#ff9b9b" : "#8de7a5")};
  margin: 12px 0 0;
`;

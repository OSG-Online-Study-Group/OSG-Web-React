import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const Screen = styled.div`
  align-items: center;
  background: #2c173c;
  color: #a086cc;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  min-height: 100vh;
`;
const Spinner = styled.div`
  animation: ${spin} 0.85s linear infinite;
  border: 3px solid #5b2a86;
  border-top-color: #b84ef2;
  border-radius: 50%;
  height: 42px;
  width: 42px;
`;

export default function LoadingSpinner() {
  return (
    <Screen>
      <Spinner />
      <span>Carregando...</span>
    </Screen>
  );
}

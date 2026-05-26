import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../services/firebase";
import { Button, Card, Input, Message, Muted, Page, Title } from "../../styles/ui";

const Container = styled(Page)`
  align-items: center;
  display: flex;
  justify-content: center;
`;
const Form = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 440px;
  width: 100%;
`;
const Register = styled.p`
  color: #a086cc;
  margin: 8px 0 0;
  a { color: #d492fb; }
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/menu", { replace: true });
    } catch {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <Title>Entrar na OSG</Title>
        <Muted>Continue seus estudos usando a mesma conta do aplicativo.</Muted>
        <Input type="email" required placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input type="password" required placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
        {error && <Message $error>{error}</Message>}
        <Register>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></Register>
      </Form>
    </Container>
  );
}

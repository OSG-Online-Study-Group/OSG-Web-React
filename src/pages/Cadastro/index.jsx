import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../services/firebase";
import { salvarUsuario } from "../../services/firestore";
import { Button, Card, Input, Message, Muted, Page, Title } from "../../styles/ui";

const Container = styled(Page)`align-items: center; display: flex; justify-content: center;`;
const Form = styled(Card)`display: flex; flex-direction: column; gap: 14px; max-width: 460px; width: 100%;`;

export default function Cadastro() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key) {
    return (event) => setValues((current) => ({ ...current, [key]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (values.password !== values.confirm) return setError("As senhas não coincidem.");
    if (values.password.length < 6) return setError("A senha precisa ter pelo menos 6 caracteres.");
    setLoading(true);
    setError("");
    try {
      const credential = await createUserWithEmailAndPassword(auth, values.email.trim(), values.password);
      await salvarUsuario(credential.user.uid, values.name.trim(), values.email.trim());
      navigate("/selecionar-materias", { replace: true });
    } catch {
      setError("Não foi possível criar a conta. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form as="form" onSubmit={submit}>
        <Title>Criar conta</Title>
        <Muted>Seu perfil será compartilhado com a versão mobile.</Muted>
        <Input required placeholder="Nome completo" value={values.name} onChange={update("name")} />
        <Input required type="email" placeholder="E-mail" value={values.email} onChange={update("email")} />
        <Input required type="password" placeholder="Senha" value={values.password} onChange={update("password")} />
        <Input required type="password" placeholder="Confirmar senha" value={values.confirm} onChange={update("confirm")} />
        <Button disabled={loading}>{loading ? "Criando..." : "Cadastrar"}</Button>
        {error && <Message $error>{error}</Message>}
        <Muted>Já tem conta? <Link to="/login">Entrar</Link></Muted>
      </Form>
    </Container>
  );
}

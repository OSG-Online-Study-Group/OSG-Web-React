import styled from "styled-components";
import { useConviteDuelo } from "../../hooks/useDuelo";
import { Button, Card, Input, Message, Muted, Page, Title } from "../../styles/ui";

const Results = styled.div`display: grid; gap: 12px; margin-top: 18px; max-width: 700px;`;
const User = styled(Card)`align-items: center; display: flex; gap: 12px; justify-content: space-between;`;

export default function ConviteDuelo() {
  const { busca, setBusca, usuarios, carregando, enviando, erro, aguardando, dueloId, desafiar } = useConviteDuelo();
  return (
    <Page>
      <Title>Duelo Amigos</Title>
      <Muted>Busque um estudante e envie um desafio de cinco perguntas.</Muted>
      {dueloId ? (
        <Card><p>{aguardando}</p><Muted>A página abrirá o duelo quando ele for aceito.</Muted></Card>
      ) : (
        <>
          <Input placeholder="Buscar usuário pelo nome..." value={busca} onChange={(event) => setBusca(event.target.value)} />
          <Results>
            {carregando && <Muted>Pesquisando...</Muted>}
            {usuarios.map((user) => (
              <User key={user.uid}>
                <div><strong>{user.name}</strong><Muted>Nível {user.level || 1} · {user.xp || 0} XP</Muted></div>
                <Button disabled={enviando} onClick={() => desafiar(user)}>Desafiar</Button>
              </User>
            ))}
          </Results>
        </>
      )}
      {erro && <Message $error>{erro}</Message>}
    </Page>
  );
}

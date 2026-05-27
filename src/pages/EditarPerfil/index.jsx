import styled from "styled-components";
import AvatarImage from "../../assets/image/avatar.png";
import { THEMES } from "../../constants/themes";
import { useProfile } from "../../hooks/useProfile";
import { Button, Card, Input, Message, Muted, Page, SecondaryButton, Title } from "../../styles/ui";

const Editor = styled(Card)`display: grid; gap: 20px; max-width: 620px;`;
const Photo = styled.img`border-radius: 50%; height: 112px; object-fit: cover; width: 112px;`;
const File = styled.label`
  background: #3f235a;
  border-radius: 12px;
  cursor: pointer;
  display: inline-block;
  padding: 11px 16px;
  input { display: none; }
`;
const Choices = styled.div`display: flex; gap: 10px; flex-wrap: wrap;`;
const Theme = styled.button`
  background: linear-gradient(120deg, ${({ $colors }) => `${$colors[0]}, ${$colors[1]}`});
  border: ${({ $active }) => ($active ? "3px solid white" : "0")};
  border-radius: 50%;
  height: 46px;
  width: 46px;
`;
const Buttons = styled.div`display: flex; gap: 10px; flex-wrap: wrap;`;

export default function EditarPerfil() {
  const {
    foto, theme, nome, setTheme, setNome, escolherFoto, salvar, removerFoto, loading, message, error,
  } = useProfile();
  return (
    <Page>
      <Title>Editar perfil</Title>
      <Muted>Escolha uma foto, nome e tema para seu cartão.</Muted>
      <Editor>
        <Photo src={foto || AvatarImage} alt="Prévia da foto" />
        <Buttons>
          <File>
            Escolher foto
            <input type="file" accept="image/*" onChange={escolherFoto} />
          </File>
          <SecondaryButton type="button" onClick={removerFoto}>Remover foto</SecondaryButton>
        </Buttons>
        <label>
          <Muted>Nome</Muted>
          <Input value={nome} onChange={(event) => setNome(event.target.value)} />
        </label>
        <div>
          <Muted>Tema</Muted>
          <Choices>
            {Object.values(THEMES).map((colors) => (
              <Theme
                key={colors.join("-")}
                type="button"
                $colors={colors}
                $active={JSON.stringify(colors) === JSON.stringify(theme)}
                onClick={() => setTheme(colors)}
                aria-label="Escolher tema"
              />
            ))}
            <SecondaryButton type="button" onClick={() => setTheme(null)}>Sem tema</SecondaryButton>
          </Choices>
        </div>
        <Button disabled={loading} onClick={salvar}>{loading ? "Salvando..." : "Salvar alterações"}</Button>
        {message && <Message>{message}</Message>}
        {error && <Message $error>{error}</Message>}
      </Editor>
    </Page>
  );
}

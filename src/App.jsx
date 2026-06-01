import AppRouter from "./routes/AppRouter";
import { GlobalStyle } from "./styles/GlobalStyle";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
}

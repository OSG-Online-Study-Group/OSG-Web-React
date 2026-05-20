import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Abertura } from "./components/abertura";
import { Cadastro } from "./components/cadastro";
import { ConviteDuelo } from "./components/convite duelo";
import { EscolhaMaterias } from "./components/escolha materias";
import { Game } from "./components/game";
import { GrupoEconomia } from "./components/grupo economia";
import { GrupoQuimica } from "./components/grupo quimica";
import { Home } from "./components/home";
import { Login } from "./components/login";
import { Treino } from "./components/treino";
import Profile from "./components/profile";
import Mensagem from "./components/mensagem";
import Ranking from "./components/ranking";
import RankingUser from "./components/rankingUser";
import { DuelosPendentes } from "./components/duelos pendentes";
import { Grupos } from "./components/grupos";

export default function App() {
  return (
    <div className="container-app">

      {/* ADICIONE APENAS O BASENAME */}
      <Router basename="/OSG-Web-React">

        <Routes>
          <Route path="/" element={<Abertura />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/EscolhaMaterias" element={<EscolhaMaterias />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/DuelosPendentes" element={<DuelosPendentes />} />
          <Route path="/Grupos" element={<Grupos />} />
          <Route path="/GrupoQuimica" element={<GrupoQuimica />} />
          <Route path="/GrupoEconomia" element={<GrupoEconomia />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/ConviteDuelo" element={<ConviteDuelo />} />
          <Route path="/Treino" element={<Treino />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Mensagem" element={<Mensagem />} />
          <Route path="/Ranking" element={<Ranking />} />
          <Route path="/RankingUser" element={<RankingUser />} />
        </Routes>

      </Router>
    </div>
  );
}
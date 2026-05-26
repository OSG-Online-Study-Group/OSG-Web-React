import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Abertura } from "./components/abertura";
import Cadastro from "./components/cadastro";
import { ConviteDuelo } from "./components/convite_duelo";
import EscolhaMaterias from "./components/escolha_materias";
import { Game } from "./components/game";
import { GrupoEconomia } from "./components/grupo_economia";
import { GrupoQuimica } from "./components/grupo_quimica";
import { Home } from "./components/home";
import Login from "./components/login";
import { Treino } from "./components/treino";
import Profile from "./components/profile";
import Mensagem from "./components/mensagem";
import Ranking from "./components/ranking";
import RankingUser from "./components/rankingUser";
import { DuelosPendentes } from "./components/duelos_pendentes";
import Doacao from "./components/Mendigagem/doacao";
import {Grupos} from "./components/grupos";
import Chat from "./components/chat/chat";

export default function App() {
  return (
    <div className="container-app">

      <Router basename="/OSG-Web-React">

        <Routes>

          {/* Tela inicial */}
          <Route path="/" element={<Abertura />} />

          {/* Login e cadastro */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />

          {/* Escolha de matérias */}
          <Route
            path="/EscolhaMaterias"
            element={<EscolhaMaterias />}
          />

          {/* Home */}
          <Route path="/Home" element={<Home />} />

             {/* grupos */}
          <Route path="/Grupos" element={<Grupos />} />

          {/* Duelos */}
          <Route
            path="/DuelosPendentes"
            element={<DuelosPendentes />}
          />

          <Route
            path="/ConviteDuelo"
            element={<ConviteDuelo />}
          />

          {/* Grupos */}
          <Route
            path="/GrupoQuimica"
            element={<GrupoQuimica />}
          />

          <Route
            path="/GrupoEconomia"
            element={<GrupoEconomia />}
          />

          {/* Game */}
          <Route path="/Game" element={<Game />} />

          {/* Treino */}
          <Route path="/Treino" element={<Treino />} />

          {/* Perfil */}
          <Route path="/Profile" element={<Profile />} />

          {/* Mensagens */}
          <Route path="/Mensagem" element={<Mensagem />} />

          {/* Ranking */}
          <Route path="/Ranking" element={<Ranking />} />

          <Route
            path="/RankingUser"
            element={<RankingUser />}
          />

          <Route path="/Doacao" element={<Doacao />} />

          <Route path="/Chat" element={<Chat />} />
        
        </Routes>

      </Router>

    </div>
  );
}
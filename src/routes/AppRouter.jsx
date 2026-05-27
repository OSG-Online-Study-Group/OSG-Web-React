import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { GuestRoute, PrivateRoute, SelectionRoute } from "../components/RouteGuards";

const Cadastro = lazy(() => import("../pages/Cadastro"));
const ConviteDuelo = lazy(() => import("../pages/ConviteDuelo"));
const Doacao = lazy(() => import("../pages/Doacao"));
const DueloAleatorio = lazy(() => import("../pages/DueloAleatorio"));
const DueloAmigo = lazy(() => import("../pages/DueloAmigo"));
const DuelosPendentes = lazy(() => import("../pages/DuelosPendentes"));
const EditarPerfil = lazy(() => import("../pages/EditarPerfil"));
const FiltroTreino = lazy(() => import("../pages/FiltroTreino"));
const Game = lazy(() => import("../pages/Game"));
const GrupoChat = lazy(() => import("../pages/GrupoChat"));
const Grupos = lazy(() => import("../pages/Grupos"));
const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/Login"));
const Mensagens = lazy(() => import("../pages/Mensagens"));
const Menu = lazy(() => import("../pages/Menu"));
const Perfil = lazy(() => import("../pages/Perfil"));
const QuizDiario = lazy(() => import("../pages/QuizDiario"));
const Ranking = lazy(() => import("../pages/Ranking"));
const SelecionarMaterias = lazy(() => import("../pages/SelecionarMaterias"));
const Treino = lazy(() => import("../pages/Treino"));

export default function AppRouter() {
  return (
    <BrowserRouter basename="/OSG-Web-React">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Route>
          <Route element={<SelectionRoute />}>
            <Route path="/selecionar-materias" element={<SelecionarMaterias />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/menu" element={<Menu />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/editar-perfil" element={<EditarPerfil />} />
              <Route path="/grupos" element={<Grupos />} />
              <Route path="/grupo/:groupId" element={<GrupoChat />} />
              <Route path="/game" element={<Game />} />
              <Route path="/filtro-treino" element={<FiltroTreino />} />
              <Route path="/treino/:categoria" element={<Treino />} />
              <Route path="/quiz-diario" element={<QuizDiario />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/convite-duelo" element={<ConviteDuelo />} />
              <Route path="/duelo/:dueloId" element={<DueloAmigo />} />
              <Route path="/duelos-pendentes" element={<DuelosPendentes />} />
              <Route path="/duelo-aleatorio" element={<DueloAleatorio />} />
              <Route path="/mensagens" element={<Mensagens />} />
              <Route path="/doacao" element={<Doacao />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

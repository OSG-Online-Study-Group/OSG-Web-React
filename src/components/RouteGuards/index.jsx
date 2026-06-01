import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";

export function PrivateRoute() {
  const { firebaseUser, usuario, carregando } = useAuth();
  if (carregando) return <LoadingSpinner />;
  if (!firebaseUser) return <Navigate to="/login" replace />;
  if (!usuario?.groupIds?.length) return <Navigate to="/selecionar-materias" replace />;
  return <Outlet />;
}

export function SelectionRoute() {
  const { firebaseUser, usuario, carregando } = useAuth();
  if (carregando) return <LoadingSpinner />;
  if (!firebaseUser) return <Navigate to="/login" replace />;
  if (usuario?.groupIds?.length) return <Navigate to="/menu" replace />;
  return <Outlet />;
}

export function GuestRoute() {
  const { firebaseUser, usuario, carregando } = useAuth();
  if (carregando) return <LoadingSpinner />;
  if (firebaseUser && usuario?.groupIds?.length) return <Navigate to="/menu" replace />;
  if (firebaseUser) return <Navigate to="/selecionar-materias" replace />;
  return <Outlet />;
}

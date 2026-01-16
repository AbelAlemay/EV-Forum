import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../Components/Loading/loading";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

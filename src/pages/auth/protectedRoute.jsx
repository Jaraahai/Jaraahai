import { Navigate } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";

export function ProtectedRoute({ element }) {
  const { user } = useAuthState();

  if (user) {
    return element;
  } else {
    return <Navigate to="/auth" />;
  }
}

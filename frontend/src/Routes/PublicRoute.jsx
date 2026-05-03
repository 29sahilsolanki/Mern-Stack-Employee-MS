import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AdminContext";

export default function PublicRoute({ children }) {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/employee-dashboard" replace />;
  }

  return children;
}

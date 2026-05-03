import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AdminContext";

export default function EmployeeRoute({ children }) {
  const { token, role } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }
  return children;
}

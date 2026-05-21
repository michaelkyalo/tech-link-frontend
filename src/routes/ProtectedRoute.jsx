import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../features/auth/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#6b7280" }}>
      ⏳ Loading…
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
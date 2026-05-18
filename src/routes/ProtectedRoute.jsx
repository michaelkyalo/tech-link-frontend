import { Navigate } from "react-router-dom";
import { getFromStorage } from "../utils/storage";

const ProtectedRoute = ({ children, role }) => {
  const user = getFromStorage("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
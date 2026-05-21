import { Navigate } from "react-router-dom";
import useAuth from "../features/auth/useAuth";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RoleBasedRoute;
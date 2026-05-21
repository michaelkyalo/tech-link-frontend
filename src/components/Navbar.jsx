import { Link } from "react-router-dom";
import useAuth from "../features/auth/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">AgriLink</Link>
      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/chat">Chat</Link>
        {user?.role === "farmer" && <Link to="/farmer">Farmer Dashboard</Link>}
        {user?.role === "buyer" && <Link to="/buyer">Buyer Dashboard</Link>}
        {user ? (
          <>
            <span className="font-semibold">{user.name}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
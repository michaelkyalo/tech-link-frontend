import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import FarmerDashboard from "../pages/farmer/FarmerDashboard";
import Products from "../pages/buyer/Products";
import Cart from "../pages/buyer/Cart";
import Orders from "../pages/buyer/Orders";
import ChatPage from "../pages/chat/ChatPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Buyer Protected */}
      <Route
        path="/buyer"
        element={
          <ProtectedRoute role="buyer">
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute role="buyer">
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute role="buyer">
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute role="buyer">
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* Farmer Protected */}
      <Route
        path="/farmer"
        element={
          <ProtectedRoute role="farmer">
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Chat (both roles) */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import BuyerDashboard from "../features/buyer/BuyerDashboard";
import FarmerDashboard from "../features/farmer/FarmerDashboard";
import Products from "../features/buyer/Products";
import Cart from "../features/buyer/Cart";
import Orders from "../features/buyer/Orders";
import ChatPage from "../features/chat/chatPage";
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
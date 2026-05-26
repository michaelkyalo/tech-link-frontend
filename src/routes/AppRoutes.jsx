import { Routes, Route } from "react-router-dom";
import Home from "../Home";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

import BuyerDashboard from "../features/buyer/BuyerDashboard";
import Products from "../features/buyer/Products";
import ProductDetails from "../features/buyer/ProductsDetails";
import Cart from "../features/buyer/Cart";
import Checkout from "../features/buyer/Checkout";
import Payment from "../features/buyer/Payment";
import Orders from "../features/buyer/Orders";

import FarmerDashboard from "../features/farmer/FarmerDashboard";
import AddProduct from "../features/farmer/AddProduct";
import ViewProducts from "../features/farmer/ViewProducts";

import ChatPage from "../features/chat/chatPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Buyer */}
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
      path="/products/:id"
      element={
        <ProtectedRoute role="buyer">
          <ProductDetails />
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
      path="/checkout"
      element={
        <ProtectedRoute role="buyer">
          <Checkout />
        </ProtectedRoute>
      }
    />

    <Route
      path="/payment"
      element={
        <ProtectedRoute role="buyer">
          <Payment />
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

    {/* Farmer */}
    <Route
      path="/farmer"
      element={
        <ProtectedRoute role="farmer">
          <FarmerDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/farmer/add-product"
      element={
        <ProtectedRoute role="farmer">
          <AddProduct />
        </ProtectedRoute>
      }
    />

    <Route
      path="/farmer/view-products"
      element={
        <ProtectedRoute role="farmer">
          <ViewProducts />
        </ProtectedRoute>
      }
    />

    <Route
      path="/farmer/orders"
      element={
        <ProtectedRoute role="farmer">
          <Orders />
        </ProtectedRoute>
      }
    />

    {/* Chat */}
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

export default AppRoutes;
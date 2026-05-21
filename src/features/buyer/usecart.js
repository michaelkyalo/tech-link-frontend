import { useContext } from "react";
// ✅ new
import { CartContext } from "./CartContext";

const useCart = () => useContext(CartContext);

export default useCart;
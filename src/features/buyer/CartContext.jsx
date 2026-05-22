import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  const addToCart = (product) => {
    const exists = cartItems.find(
      (item) =>
        item.product_id === product.product_id
    );

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.product_id === product.product_id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (product_id) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          item.product_id !== product_id
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkoutSelected = (selectedIds) => {
    const itemsToOrder = cartItems.filter((item) =>
      selectedIds.includes(item.product_id)
    );

    if (!itemsToOrder.length) return;

    const newOrder = {
      id: Date.now(),
      items: itemsToOrder,
      total: itemsToOrder.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      ),
      totalItems: itemsToOrder.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      ),
      status: "Processing",
      createdAt: new Date().toLocaleString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !selectedIds.includes(item.product_id)
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        clearCart,
        checkoutSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
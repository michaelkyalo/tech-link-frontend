import useCart from "../../hooks/useCart";
import { formatCurrency } from "../../utils/helpers";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Shopping Cart
      </h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border p-4 mb-3 rounded"
        >
          <h2>{item.name}</h2>

          <p>
            {formatCurrency(item.price)}
          </p>

          <p>Qty: {item.quantity}</p>

          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-3 py-1 mt-2"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
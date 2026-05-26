import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "./usecart";
import { formatCurrency } from "../../utils/helpers";
import { createOrder } from "./orderservice";

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (!deliveryAddress.trim()) {
        alert("Please enter delivery address");
        setLoading(false);
        return;
      }

      const data = await createOrder({
        buyer_id: user.id,
        items: cartItems,
        total_amount: totalPrice,
        payment_method: paymentMethod,
        delivery_address: deliveryAddress,
      });

      // Backend returns { success: true, order: { id: ... } }
      const orderId = data?.order?.id;

      if (!orderId) {
        console.error("Unexpected order response:", data);
        alert("Order created but ID missing. Check console.");
        setLoading(false);
        return;
      }

      navigate("/payment", {
        state: {
          orderId,
          amount: totalPrice,
          paymentMethod,
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        error?.response?.data?.message || "Failed to create order"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-gray-500">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <h2 className="font-semibold">{item.product_name}</h2>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Total</h2>
          <p className="text-2xl font-bold text-green-700">
            {formatCurrency(totalPrice)}
          </p>
        </div>

        {/* Delivery Address */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter delivery address"
            rows={4}
            className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
          <div className="space-y-3">
            {[
              { value: "mpesa", label: "M-Pesa" },
              { value: "airtel", label: "Airtel Money" },
              { value: "card", label: "Debit / Credit Card" },
              { value: "cod", label: "Cash On Delivery" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer"
              >
                <input
                  type="radio"
                  value={value}
                  checked={paymentMethod === value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Creating Order..." : "Continue To Payment"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
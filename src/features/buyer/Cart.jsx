import { useState } from "react";
import useCart from "./usecart";
import { formatCurrency } from "../../utils/helpers";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    checkoutSelected,
  } = useCart();

  const [selectedItems, setSelectedItems] =
    useState([]);

  const toggleItem = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const selectedTotal = cartItems
    .filter((item) =>
      selectedItems.includes(item.product_id)
    )
    .reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Shopping Cart
        </h1>

        <p className="text-slate-500 mt-1">
          {cartItems.length} items in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-slate-500">
            Your cart is empty
          </h2>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {cartItems.map((item, index) => (
              <div
                key={item.product_id}
                className={`flex items-center justify-between p-5 ${
                  index !== cartItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(
                      item.product_id
                    )}
                    onChange={() =>
                      toggleItem(item.product_id)
                    }
                    className="w-5 h-5"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.product_name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="font-semibold text-green-600">
                    {formatCurrency(item.price)}
                  </span>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.product_id
                      )
                    }
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">
                Selected Total
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                {formatCurrency(selectedTotal)}
              </h2>
            </div>

            <button
              onClick={() =>
                checkoutSelected(selectedItems)
              }
              disabled={!selectedItems.length}
              className={`px-8 py-3 rounded-xl font-medium text-white transition ${
                selectedItems.length
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Checkout Selected
            </button>
          </div>
        </>
      )}
    </div>
  );
}
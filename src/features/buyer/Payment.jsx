// src/features/buyer/Payment.jsx

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initiatePayment } from "./paymentservice";
import { formatCurrency } from "../../utils/helpers";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    orderId,
    amount,
    paymentMethod: initialMethod,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] =
    useState(initialMethod || "mpesa");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [cardDetails, setCardDetails] =
    useState({
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
    });

  const [loading, setLoading] =
    useState(false);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">
            No Order Found
          </h2>

          <button
            onClick={() => navigate("/cart")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Return To Cart
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);

      const payload = {
        order_id: orderId,
        amount,
        payment_method: paymentMethod,
      };

      if (
        paymentMethod === "mpesa" ||
        paymentMethod === "airtel"
      ) {
        payload.phone_number = phoneNumber;
      }

      if (paymentMethod === "card") {
        payload.card = cardDetails;
      }

      const response =
        await initiatePayment(payload);

      alert(
        response?.message ||
          "Payment initiated successfully"
      );

      navigate("/orders");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Payment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">
          Complete Payment
        </h1>

        {/* Order Summary */}
        <div className="border rounded-lg p-4 mb-6">
          <p className="text-gray-600">
            Order ID
          </p>

          <p className="font-semibold">
            #{orderId}
          </p>

          <div className="mt-3">
            <p className="text-gray-600">
              Amount Due
            </p>

            <h2 className="text-3xl font-bold text-green-700">
              {formatCurrency(amount)}
            </h2>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          <h2 className="font-semibold text-lg">
            Payment Method
          </h2>

          <label className="flex items-center gap-3 border rounded-lg p-3">
            <input
              type="radio"
              value="mpesa"
              checked={
                paymentMethod === "mpesa"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />
            M-Pesa
          </label>

          <label className="flex items-center gap-3 border rounded-lg p-3">
            <input
              type="radio"
              value="airtel"
              checked={
                paymentMethod === "airtel"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />
            Airtel Money
          </label>

          <label className="flex items-center gap-3 border rounded-lg p-3">
            <input
              type="radio"
              value="card"
              checked={
                paymentMethod === "card"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />
            Debit / Credit Card
          </label>

          <label className="flex items-center gap-3 border rounded-lg p-3">
            <input
              type="radio"
              value="cod"
              checked={
                paymentMethod === "cod"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />
            Cash On Delivery
          </label>
        </div>

        {/* Mobile Money */}
        {(paymentMethod === "mpesa" ||
          paymentMethod === "airtel") && (
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(
                  e.target.value
                )
              }
              placeholder="254712345678"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        )}

        {/* Card Form */}
        {paymentMethod === "card" && (
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  cardNumber:
                    e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardDetails.cardHolder}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  cardHolder:
                    e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    expiry:
                      e.target.value,
                  })
                }
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="password"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    cvv: e.target.value,
                  })
                }
                className="border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        )}

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:bg-gray-400"
        >
          {loading
            ? "Processing..."
            : `Pay ${formatCurrency(
                amount
              )}`}
        </button>
      </div>
    </div>
  );
}
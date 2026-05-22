import useCart from "../buyer/usecart";
import { formatCurrency } from "../../utils/helpers";

export default function Orders() {
  const { orders } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-slate-500">
          No orders yet.
        </p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {order.createdAt}
                  </p>
                </div>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  {order.status}
                </span>
              </div>

              {order.items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between py-2"
                >
                  <span>
                    {item.product_name} ×{" "}
                    {item.quantity}
                  </span>

                  <span>
                    {formatCurrency(
                      item.price *
                        item.quantity
                    )}
                  </span>
                </div>
              ))}

              <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                <span>Total</span>

                <span className="text-green-600">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
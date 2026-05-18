import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderservice";
import OrderCard from "../../components/cards/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        My Orders
      </h1>

      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
};

export default Orders;
const OrderCard = ({ order }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="font-bold text-lg">
        Order #{order.id}
      </h2>

      <p>Status: {order.status}</p>

      <p>Total: KES {order.total_price}</p>
    </div>
  );
};

export default OrderCard;
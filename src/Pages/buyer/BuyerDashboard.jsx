import { Link } from "react-router-dom";

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          Buyer Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Welcome back! Explore fresh farm products.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">
            Total Orders
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-2">
            12
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">
            Cart Items
          </h2>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            5
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">
            Delivered Orders
          </h2>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            9
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/products"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Browse Products
          </Link>

          <Link
            to="/cart"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            View Cart
          </Link>

          <Link
            to="/orders"
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            My Orders
          </Link>

          <Link
            to="/chat"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Open Chat
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3">
          <li className="border-b pb-2">
              Added Tomatoes to cart
          </li>

          <li className="border-b pb-2">
              Order #102 delivered
          </li>

          <li className="border-b pb-2">
               Sent message to farmer
          </li>

          <li className="border-b pb-2">
                Payment completed successfully
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BuyerDashboard;
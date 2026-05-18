import { Link } from "react-router-dom";

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          Farmer Dashboard
        </h1>

        <Link
          to="/farmer/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Products
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-600">
            24
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Orders Received
          </h2>

          <p className="text-3xl font-bold mt-2 text-blue-600">
            18
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Revenue
          </h2>

          <p className="text-3xl font-bold mt-2 text-yellow-600">
            KES 45,000
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/farmer/add-product"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add New Product
          </Link>

          <Link
            to="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Products
          </Link>

          <Link
            to="/orders"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            View Orders
          </Link>

          <Link
            to="/chat"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Open Chat
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3">
          <li className="border-b pb-2">
             New order received for Maize
          </li>

          <li className="border-b pb-2">
             Product Carrots added successfully
          </li>

          <li className="border-b pb-2">
             New message from buyer
          </li>

          <li className="border-b pb-2">
             Delivery marked as completed
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FarmerDashboard;
// src/pages/Home.jsx

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to AgriLink 
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          A digital marketplace connecting farmers and buyers directly for fresh,
          affordable agricultural products.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/products"
            className="bg-white text-green-700 px-6 py-3 rounded font-semibold"
          >
            Browse Products
          </Link>

          <Link
            to="/register"
            className="border border-white px-6 py-3 rounded font-semibold"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2">
              Farmers
          </h2>

          <p>
            Sell your fresh produce directly to buyers without middlemen.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2">
              Buyers
          </h2>

          <p>
            Get fresh farm products at affordable prices directly from farmers.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2">
             Fast Delivery
          </h2>

          <p>
            Efficient delivery system ensures fresh products reach you quickly.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Trading Today
        </h2>

        <p className="mb-6">
          Join thousands of farmers and buyers already using AgriLink.
        </p>

        <Link
          to="/register"
          className="bg-green-700 text-white px-6 py-3 rounded font-semibold"
        >
          Create Account
        </Link>
      </section>
    </div>
  );
};

export default Home;
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f3f6f4] text-gray-900">
      {/* Hero Section */}
      <section className="bg-[#2F5D50] text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="uppercase tracking-[4px] text-sm text-green-200 mb-4">
            Fresh • Local • Trusted
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Welcome to AgriLink
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto text-green-50 leading-relaxed text-center">
            A modern agricultural marketplace connecting farmers and buyers
            directly for fresh, affordable, and high-quality farm products.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="bg-white text-[#2F5D50] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Browse Products
            </Link>

            <Link
              to="/register"
              className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#2F5D50] transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Farmers */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              
            </div>

            <h2 className="text-2xl font-bold mb-3 text-[#2F5D50]">
              Farmers
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Sell fresh produce directly to buyers without middlemen and grow
              your farming business sustainably.
            </p>
          </div>

          {/* Buyers */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 bg-[#EFE3D2] rounded-full flex items-center justify-center mx-auto mb-5">
              
            </div>

            <h2 className="text-2xl font-bold mb-3 text-[#2F5D50]">
              Buyers
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Access affordable farm-fresh products directly from trusted local
              farmers.
            </p>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              
            </div>

            <h2 className="text-2xl font-bold mb-3 text-[#2F5D50]">
              Fast Delivery
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Efficient delivery ensures products arrive fresh, quickly, and
              safely to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#EAF2ED] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-[#2F5D50]">
            Start Trading Today
          </h2>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Join thousands of farmers and buyers already building a smarter,
            more connected agricultural marketplace.
          </p>

          <Link
            to="/register"
            className="inline-block bg-[#2F5D50] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#23463C] transition"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
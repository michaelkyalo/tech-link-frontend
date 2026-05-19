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

          <h1 className="text-8xl md:text-4xl font-bold leading-tight mb-6">
            Welcome to AgriLink
          </h1>

          <p className="text-4xl md:text-2xl font-bold leading-tight mb-6">
               A modern agricultural marketplace connecting farmers and buyers
            directly for fresh, affordable, and high-quality farm products.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="border border-blue px-10 py-6 rounded-x4 font-semibold hover:bg-brown hover:text-coluo2F5D50] transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="border border-blue px-10 py-6 rounded-x4 font-semibold hover:bg-brown hover:text-coluo2F5D50] transition"
            >
              Register
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
      <section className="bg-[#EAF2ED] py-15 px-3">
        <div className="max-w-10xl mx-auto text-center">
          <h2 className="text-4xl md:text-3xl font-bold leading-tight mb-6 text-center text-[#2F5D50]">
            Start Trading Today
          </h2>

          <p className="text-gray-700 text-lg mb-10 leading-relaxed">
            Join thousands of farmers and buyers already building a smarter,
            more connected agricultural marketplace.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
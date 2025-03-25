import { Search, Package, Leaf, Recycle } from "lucide-react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-dark-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Sustainable Packaging Solutions for Your Business
              </h1>
              <p className="text-lg text-pastel-green">
                Connect with eco-friendly suppliers and make your business more
                sustainable. Find the perfect packaging solutions that align
                with your values.
              </p>
              <div className="flex space-x-4">
                <button
                  className="px-6 py-3 bg-primary-green rounded-lg hover:bg-opacity-90 transition"
                  onClick={() => navigate("/login")}
                >
                  Find Suppliers
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-3 border border-light-green rounded-lg hover:bg-primary-green transition"
                >
                  Register as Supplier
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://roozrang.com/wp-content/uploads/2023/03/What-is-sustainable-packaging-2-1024x640.jpg"
                alt="Sustainable Packaging"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
          Why Choose OnTym Solutions?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Search className="h-12 w-12 text-primary-green mb-4" />
            <h3 className="text-xl font-semibold text-dark-teal mb-2">
              Easy Supplier Discovery
            </h3>
            <p className="text-gray-600">
              Find nearby sustainable packaging suppliers with our intelligent
              search system.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Package className="h-12 w-12 text-primary-green mb-4" />
            <h3 className="text-xl font-semibold text-dark-teal mb-2">
              Diverse Product Range
            </h3>
            <p className="text-gray-600">
              Access a wide variety of eco-friendly packaging solutions for your
              specific needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Recycle className="h-12 w-12 text-primary-green mb-4" />
            <h3 className="text-xl font-semibold text-dark-teal mb-2">
              Sustainable Impact
            </h3>
            <p className="text-gray-600">
              Make a positive environmental impact by choosing eco-friendly
              packaging options.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-pastel-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Biodegradable", "Compostable", "Recyclable", "Zero Waste"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Leaf className="h-8 w-8 text-primary-green mb-4" />
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">
                    {category}
                  </h3>
                  <p className="text-gray-600">
                    Explore {category.toLowerCase()} packaging solutions
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make Your Business More Sustainable?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join OnTym Solutions today and connect with eco-conscious suppliers
            who share your values.
          </p>
          <button
            className="px-8 py-4 bg-dark-teal rounded-lg hover:bg-opacity-90 transition"
            onClick={() => navigate("/register")}
          >
            Get Started Now!
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

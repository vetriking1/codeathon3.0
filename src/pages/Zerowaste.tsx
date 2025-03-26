import {
  Leaf,
  Recycle,
  Globe,
  Package,
  Zap,
  CheckCircle,
  Award,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ZeroWastePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-dark-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Award className="h-12 w-12 text-pastel-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Zero Waste Packaging Solutions
          </h1>
          <p className="text-lg text-pastel-green max-w-3xl mx-auto">
            Discover how to eliminate packaging waste entirely through
            innovative design and circular systems.
          </p>
        </div>
      </section>

      {/* What is Zero Waste Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-dark-teal">
              The Zero Waste Philosophy
            </h2>
            <p className="text-gray-600">
              Zero waste packaging goes beyond recycling - it aims to completely
              eliminate waste by design. This approach prioritizes reusable,
              refillable, or completely compostable solutions that leave no
              trace.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Prevention First:</span>{" "}
                  Design systems that don't create waste in the first place
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Closed Loop:</span> All
                  materials are continually reused or safely returned to nature
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">System Change:</span> Requires
                  rethinking entire product delivery models
                </p>
              </div>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Zero waste products"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="bg-pastel-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            The 5 R's of Zero Waste Packaging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                letter: "Refuse",
                description: "Eliminate unnecessary packaging",
                icon: <Package className="h-8 w-8 text-primary-green" />,
              },
              {
                letter: "Reduce",
                description: "Minimize materials used",
                icon: <Leaf className="h-8 w-8 text-primary-green" />,
              },
              {
                letter: "Reuse",
                description: "Design for multiple lifecycles",
                icon: <RefreshCw className="h-8 w-8 text-primary-green" />,
              },
              {
                letter: "Rot",
                description: "Use compostable materials",
                icon: <Recycle className="h-8 w-8 text-primary-green" />,
              },
              {
                letter: "Recycle",
                description: "As last resort for remaining materials",
                icon: <Globe className="h-8 w-8 text-primary-green" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-dark-teal mb-2">
                  {item.letter}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Models Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
          Innovative Zero Waste Business Models
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Refill Systems",
              description:
                "Customers bring containers to refill products in-store or through delivery services",
              examples: [
                "Bulk grocery stores",
                "Cosmetic refill stations",
                "Home cleaning product refills",
              ],
            },
            {
              title: "Container Deposit Schemes",
              description:
                "Customers pay deposit for packaging that's refunded upon return",
              examples: [
                "Glass milk bottles",
                "Reusable shipping containers",
                "Takeout food containers",
              ],
            },
            {
              title: "Product-as-Service",
              description:
                "Companies retain ownership of packaging that's continually reused",
              examples: [
                "Luxury packaging leasing",
                "Subscription box systems",
                "Commercial packaging pools",
              ],
            },
          ].map((model, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-2">
                {model.title}
              </h3>
              <p className="text-gray-600 mb-4">{model.description}</p>
              <h4 className="font-medium text-dark-teal mb-2">Examples:</h4>
              <ul className="space-y-2">
                {model.examples.map((example, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary-green mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            Zero Waste Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1556910638-aae8e3a017bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Bulk store"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-dark-teal mb-2">
                Zero Waste Grocery Chain
              </h3>
              <p className="text-gray-600 mb-4">
                A European supermarket eliminated 90% of packaging waste by
                implementing store-wide bulk systems and reusable container
                programs.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-pastel-green text-dark-teal rounded-full text-xs">
                  Bulk Systems
                </span>
                <span className="px-2 py-1 bg-pastel-green text-dark-teal rounded-full text-xs">
                  Reusable Containers
                </span>
                <span className="px-2 py-1 bg-pastel-green text-dark-teal rounded-full text-xs">
                  Customer Engagement
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Cosmetic products"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-dark-teal mb-2">
                Beauty Brand Refill Revolution
              </h3>
              <p className="text-gray-600 mb-4">
                A cosmetics company reduced packaging waste by 80% through
                stylish, durable compacts with refill pods available through
                subscription.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-pastel-green text-dark-teal rounded-full text-xs">
                  Refill System
                </span>
                <span className="px-2 py-1 bg-pastel-green text-dark-teal rounded-full text-xs">
                  Premium Durables
                </span>
                <span className="px-2 py-1 bg-pastel-green text-dark-teal rounded-full text-xs">
                  Subscription Model
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-dark-teal mb-6">
                Transitioning to Zero Waste Packaging
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">
                    1. Audit Your Current Packaging
                  </h3>
                  <p className="text-gray-600">
                    Identify all packaging components and their waste impact
                    through lifecycle analysis.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">
                    2. Prioritize Elimination
                  </h3>
                  <p className="text-gray-600">
                    Determine what packaging can be completely removed rather
                    than just replaced.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">
                    3. Design New Systems
                  </h3>
                  <p className="text-gray-600">
                    Develop reusable, refillable, or compostable solutions
                    tailored to your product.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">
                    4. Educate Customers
                  </h3>
                  <p className="text-gray-600">
                    Create clear instructions and incentives for customer
                    participation in zero waste systems.
                  </p>
                </div>
                <button
                  className="mt-4 px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-opacity-90 transition"
                  onClick={() => navigate("/register")}
                >
                  Start Your Zero Waste Journey
                </button>
              </div>
            </div>
            <div className="bg-dark-teal flex items-center justify-center p-8">
              <div className="text-center text-white">
                <Award className="h-16 w-16 text-pastel-green mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  Zero Waste Certification
                </h3>
                <p className="mb-6">
                  Consider these certification programs for your packaging:
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-3 rounded-lg text-dark-teal">
                    <div className="font-semibold">TRUE Certification</div>
                    <div className="text-xs">For zero waste facilities</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-dark-teal">
                    <div className="font-semibold">UL ECVP</div>
                    <div className="text-xs">
                      Environmental Claims Validation
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-dark-teal">
                    <div className="font-semibold">Cradle to Cradle</div>
                    <div className="text-xs">Product certification</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join the Zero Waste Movement
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Connect with innovative suppliers specializing in zero waste
            packaging solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-8 py-4 bg-dark-teal rounded-lg hover:bg-opacity-90 transition"
              onClick={() => navigate("/register")}
            >
              Find Zero Waste Suppliers
            </button>
            {/* <button
              className="px-8 py-4 border border-white rounded-lg hover:bg-dark-teal transition"
              onClick={() => navigate("/zero-waste-webinar")}
            >
              Attend Free Webinar
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZeroWastePage;
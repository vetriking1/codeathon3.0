import { Leaf, Recycle, Globe, Package, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BiodegradablePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-dark-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-12 w-12 text-pastel-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            The Power of Biodegradable Packaging
          </h1>
          <p className="text-lg text-pastel-green max-w-3xl mx-auto">
            Discover how biodegradable materials are transforming packaging and
            helping businesses reduce their environmental footprint.
          </p>
        </div>
      </section>

      {/* What is Biodegradable Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-dark-teal">
              What Are Biodegradable Products?
            </h2>
            <p className="text-gray-600">
              Biodegradable products are materials that can be broken down
              naturally by microorganisms like bacteria and fungi into water,
              carbon dioxide, and biomass when exposed to the right
              environmental conditions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Natural decomposition:</span>{" "}
                  Breaks down without leaving toxic residues
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Timeframe:</span> Typically
                  decomposes within 1 year under proper conditions
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Materials:</span> Includes
                  plant-based plastics, paper, certain fabrics, and more
                </p>
              </div>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Biodegradable materials"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Common Uses Section */}
      <section className="bg-pastel-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            Common Uses of Biodegradable Packaging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Package className="h-10 w-10 text-primary-green mb-4" />,
                title: "Food Packaging",
                description:
                  "Containers, wraps, and utensils made from plant starches or cellulose",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary-green mb-4" />,
                title: "E-Commerce",
                description:
                  "Shipping materials, padded mailers, and void fill from mushroom or cornstarch materials",
              },
              {
                icon: <Globe className="h-10 w-10 text-primary-green mb-4" />,
                title: "Retail Packaging",
                description:
                  "Product boxes, bags, and protective packaging from recycled and biodegradable materials",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-dark-teal mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
          Environmental Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 flex items-center">
                <Recycle className="h-6 w-6 text-primary-green mr-3" />
                Reduced Landfill Waste
              </h3>
              <p className="text-gray-600">
                Biodegradable materials break down naturally, significantly
                reducing the amount of waste that ends up in landfills.
                Traditional plastics can take hundreds of years to decompose,
                while biodegradable alternatives typically decompose in months
                to a few years.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 flex items-center">
                <Leaf className="h-6 w-6 text-primary-green mr-3" />
                Lower Carbon Footprint
              </h3>
              <p className="text-gray-600">
                Most biodegradable materials are plant-based, meaning they
                absorb CO2 during growth. When they decompose, they release
                significantly less greenhouse gases compared to conventional
                plastics derived from fossil fuels.
              </p>
            </div>
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 flex items-center">
                <Globe className="h-6 w-6 text-primary-green mr-3" />
                Safer for Ecosystems
              </h3>
              <p className="text-gray-600">
                Unlike traditional plastics that break down into microplastics,
                biodegradable materials decompose into natural substances that
                don't harm wildlife or marine ecosystems. This helps protect
                animals from ingestion and entanglement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 flex items-center">
                <Zap className="h-6 w-6 text-primary-green mr-3" />
                Renewable Resources
              </h3>
              <p className="text-gray-600">
                Biodegradable packaging is typically made from renewable plant
                materials like corn, sugarcane, or bamboo, which can be regrown
                annually. This reduces dependence on finite petroleum resources
                used for conventional plastics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            Biodegradable vs. Traditional Plastics
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-pastel-green">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-dark-teal uppercase tracking-wider"
                  >
                    Factor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-dark-teal uppercase tracking-wider"
                  >
                    Biodegradable
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-dark-teal uppercase tracking-wider"
                  >
                    Traditional Plastic
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    factor: "Decomposition Time",
                    biodegradable: "3-6 months",
                    traditional: "100-500 years",
                  },
                  {
                    factor: "Source Materials",
                    biodegradable: "Plants (corn, sugarcane, etc.)",
                    traditional: "Petroleum",
                  },
                  {
                    factor: "CO2 Emissions",
                    biodegradable: "Neutral or negative",
                    traditional: "High",
                  },
                  {
                    factor: "End Products",
                    biodegradable: "Water, CO2, biomass",
                    traditional: "Microplastics, toxins",
                  },
                  {
                    factor: "Recyclability",
                    biodegradable: "Often compostable",
                    traditional: "Limited recycling rates",
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.factor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.biodegradable}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Switch to Biodegradable Packaging?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover our network of trusted biodegradable packaging suppliers
            and make the sustainable choice today.
          </p>
          <button
            className="px-8 py-4 bg-dark-teal rounded-lg hover:bg-opacity-90 transition"
            onClick={() => navigate("/register")}
          >
            Find Biodegradable Suppliers
          </button>
        </div>
      </section>
    </div>
  );
};

export default BiodegradablePage;
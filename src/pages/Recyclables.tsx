import {
  Recycle,
  Factory,
  Globe,
  BarChart2,
  CheckCircle,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecyclablePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-dark-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Recycle className="h-12 w-12 text-pastel-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            The Power of Recyclable Packaging
          </h1>
          <p className="text-lg text-pastel-green max-w-3xl mx-auto">
            Discover how proper recycling systems can transform waste into
            valuable resources for a circular economy.
          </p>
        </div>
      </section>

      {/* What is Recyclable Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-dark-teal">
              Understanding Recyclable Materials
            </h2>
            <p className="text-gray-600">
              Recyclable products are materials that can be collected,
              processed, and remanufactured into new products after their
              initial use. Effective recycling keeps materials in continuous
              use, reducing the need for virgin resources.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Material Recovery:</span>{" "}
                  Collected through curbside programs or drop-off centers
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Processing:</span> Sorted,
                  cleaned, and converted into raw materials
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Remanufacturing:</span>{" "}
                  Transformed into new products, completing the loop
                </p>
              </div>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1584977046805-d7d0c5cc6d3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Recycling facility with sorted materials"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Recycling Codes Section */}
      <section className="bg-pastel-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            Understanding Resin Identification Codes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {[
              {
                code: "1",
                material: "PET",
                examples: "Water bottles, food containers",
              },
              {
                code: "2",
                material: "HDPE",
                examples: "Milk jugs, shampoo bottles",
              },
              { code: "3", material: "PVC", examples: "Pipes, packaging" },
              {
                code: "4",
                material: "LDPE",
                examples: "Plastic bags, squeeze bottles",
              },
              {
                code: "5",
                material: "PP",
                examples: "Yogurt containers, straws",
              },
              {
                code: "6",
                material: "PS",
                examples: "Foam packaging, disposable cups",
              },
              {
                code: "7",
                material: "OTHER",
                examples: "Mixed plastics, bioplastics",
              },
            ].map((item) => (
              <div
                key={item.code}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-dark-teal text-white flex items-center justify-center text-xl font-bold">
                  {item.code}
                </div>
                <h3 className="font-semibold text-dark-teal">
                  {item.material}
                </h3>
                <p className="text-xs text-gray-600 mt-1">{item.examples}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-dark-teal">
            <p>
              Note: Check local recycling guidelines as acceptance varies by
              location
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
          Environmental and Economic Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Factory className="h-10 w-10 text-primary-green mb-4" />,
              title: "Resource Conservation",
              description:
                "Recycling reduces the need for virgin materials, preserving natural resources like timber, water, and minerals.",
            },
            {
              icon: <Zap className="h-10 w-10 text-primary-green mb-4" />,
              title: "Energy Savings",
              description:
                "Manufacturing from recycled materials typically uses less energy than production from raw materials.",
            },
            {
              icon: <Globe className="h-10 w-10 text-primary-green mb-4" />,
              title: "Emission Reduction",
              description:
                "Recycling processes generally produce fewer greenhouse gas emissions compared to virgin material production.",
            },
            {
              icon: <BarChart2 className="h-10 w-10 text-primary-green mb-4" />,
              title: "Economic Value",
              description:
                "Recycling creates jobs in collection, processing, and manufacturing industries.",
            },
            {
              icon: <Recycle className="h-10 w-10 text-primary-green mb-4" />,
              title: "Waste Diversion",
              description:
                "Keeps materials out of landfills and incinerators, extending landfill capacity.",
            },
            {
              icon: (
                <CheckCircle className="h-10 w-10 text-primary-green mb-4" />
              ),
              title: "Closed-Loop Systems",
              description:
                "Enables circular economy models where materials are continuously reused.",
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
      </section>

      {/* Best Practices Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-teal mb-6">
                Recycling Best Practices
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Clean and Empty Containers",
                    description:
                      "Rinse food containers to prevent contamination of recycling streams",
                  },
                  {
                    title: "No Plastic Bags",
                    description:
                      "Never bag recyclables - they tangle sorting equipment",
                  },
                  {
                    title: "Check Local Guidelines",
                    description:
                      "Recycling capabilities vary significantly by location",
                  },
                  {
                    title: "When in Doubt, Throw Out",
                    description:
                      "Contamination from non-recyclables can ruin entire batches",
                  },
                  {
                    title: "Flatten Cardboard",
                    description: "Saves space in collection bins and trucks",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-green rounded-full p-1 mr-4 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-teal">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 text-center">
                Common Recycling Mistakes
              </h3>
              <div className="space-y-4">
                {[
                  "Pizza boxes with grease stains",
                  "Plastic utensils and straws",
                  "Coffee cups with plastic lining",
                  "Broken glass and ceramics",
                  "Soiled paper products",
                  "Small items that fall through sorting screens",
                ].map((mistake, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-dark-teal rounded-full p-1 mr-4 mt-1">
                      <Recycle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-600">{mistake}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
          Recyclable Packaging Solutions for Businesses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Design for Recycling",
              description:
                "Create packaging using mono-materials and easily separable components",
              action: "Design Guidelines",
            },
            {
              title: "Standardized Materials",
              description:
                "Use commonly accepted recyclable materials in your packaging",
              action: "Material Database",
            },
            {
              title: "Clear Labeling",
              description:
                "Include recycling instructions and material identification",
              action: "Labeling Standards",
            },
          ].map((solution, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-dark-teal mb-2">
                {solution.title}
              </h3>
              <p className="text-gray-600 mb-4">{solution.description}</p>
              <button
                className="text-primary-green font-medium hover:underline"
                onClick={() =>
                  navigate(
                    `/resources/${solution.action
                      .toLowerCase()
                      .replace(" ", "-")}`
                  )
                }
              >
                {solution.action} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Improve Your Packaging Recyclability?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Connect with suppliers specializing in recyclable packaging
            solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-8 py-4 bg-dark-teal rounded-lg hover:bg-opacity-90 transition"
              onClick={() => navigate("/buyer")}
            >
              Find Recyclable Packaging Suppliers
            </button>
            {/* <button
              className="px-8 py-4 border border-white rounded-lg hover:bg-dark-teal transition"
              onClick={() => navigate("/recycling-assessment")}
            >
              Get Packaging Assessment
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecyclablePage;
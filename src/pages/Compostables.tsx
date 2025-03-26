import { Leaf, Recycle, Globe, Package, Zap, CheckCircle, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompostablePage = () => {
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
            Compostable Packaging: Nature's Perfect Cycle
          </h1>
          <p className="text-lg text-pastel-green max-w-3xl mx-auto">
            Discover how compostable materials complete the sustainability loop by returning nutrients back to the earth.
          </p>
        </div>
      </section>

      {/* What is Compostable Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-dark-teal">
              What Makes Packaging Compostable?
            </h2>
            <p className="text-gray-600">
              Compostable products are materials that can completely break down into natural elements in a compost environment, leaving no toxicity in the soil. Unlike regular biodegradables, compostables require specific conditions but provide valuable nutrients when properly processed.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Certified Standards:</span> Must meet ASTM D6400 or EN 13432 standards
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">Timeframe:</span> Breaks down within 90 days in commercial composting
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-green mr-4 mt-1 flex-shrink-0" />
                <p>
                  <span className="font-semibold">End Result:</span> Turns into nutrient-rich compost that benefits soil
                </p>
              </div>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Compostable materials turning to soil"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Types of Composting Section */}
      <section className="bg-pastel-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            Types of Composting Systems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass className="h-10 w-10 text-primary-green mb-4" />,
                title: "Home Composting",
                description: "Suitable for simpler compostable items like paper and certain bioplastics in backyard bins",
                items: ["Food scraps", "Yard waste", "Some certified home-compostable packaging"]
              },
              {
                icon: <Recycle className="h-10 w-10 text-primary-green mb-4" />,
                title: "Commercial Composting",
                description: "Industrial facilities that handle certified compostable packaging and food service items",
                items: ["PLA bioplastics", "Compostable serviceware", "Food-contaminated packaging"]
              },
              {
                icon: <Zap className="h-10 w-10 text-primary-green mb-4" />,
                title: "Anaerobic Digestion",
                description: "Breaks down materials without oxygen, capturing methane for energy production",
                items: ["Food waste", "Agricultural byproducts", "Some compostable plastics"]
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-dark-teal mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.items.map((listItem, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary-green mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{listItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Materials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
          Common Compostable Packaging Materials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "PLA (Polylactic Acid)",
              description: "Plant-based plastic from corn starch or sugarcane",
              uses: ["Clear cups and containers", "Window films", "Rigid packaging"]
            },
            {
              name: "Bagasse",
              description: "Sugarcane fiber byproduct",
              uses: ["Food containers", "Clamshells", "Tableware"]
            },
            {
              name: "Molded Fiber",
              description: "Recycled paper or plant fibers",
              uses: ["Egg cartons", "Protective packaging", "Food service items"]
            },
            {
              name: "PHA (Polyhydroxyalkanoates)",
              description: "Microbial fermented biopolymers",
              uses: ["Flexible films", "Coatings", "Marine-degradable items"]
            }
          ].map((material, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-2">
                {material.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {material.description}
              </p>
              <h4 className="font-medium text-dark-teal mb-2">Common Uses:</h4>
              <ul className="space-y-1">
                {material.uses.map((use, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-3 w-3 text-primary-green mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            The Circular Economy Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 flex items-center">
                <Leaf className="h-6 w-6 text-primary-green mr-3" />
                Waste Reduction
              </h3>
              <p className="text-gray-600">
                Compostable packaging eliminates waste by design - products are meant to become valuable compost rather than trash. This closes the loop in product lifecycles and reduces pressure on landfills.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 flex items-center">
                <Globe className="h-6 w-6 text-primary-green mr-3" />
                Soil Regeneration
              </h3>
              <p className="text-gray-600">
                Unlike conventional packaging that becomes pollution, compostables return nutrients to the soil. The resulting compost improves soil structure, water retention, and reduces need for chemical fertilizers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 flex items-center">
                <Package className="h-6 w-6 text-primary-green mr-3" />
                Food Service Solution
              </h3>
              <p className="text-gray-600">
                For food-contaminated packaging, composting is often the only practical recycling solution. Compostables allow food service operations to divert all waste from landfills through single-stream collection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-teal mb-4 flex items-center">
                <Zap className="h-6 w-6 text-primary-green mr-3" />
                Reduced Carbon Footprint
              </h3>
              <p className="text-gray-600">
                Compostable materials typically have lower lifecycle carbon emissions than conventional plastics. When composted properly, they avoid methane emissions from landfills and offset fossil fertilizer use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-dark-teal mb-6">
                Implementing Compostable Packaging
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">1. Right Material Selection</h3>
                  <p className="text-gray-600">
                    Choose materials appropriate for your product's needs and the composting infrastructure available to your customers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">2. Clear Labeling</h3>
                  <p className="text-gray-600">
                    Use certified compostable logos and clear disposal instructions to prevent contamination.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">3. Collection Systems</h3>
                  <p className="text-gray-600">
                    Partner with compost facilities or provide take-back programs to ensure proper end-of-life processing.
                  </p>
                </div>
                {/* <button
                  className="mt-4 px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-opacity-90 transition"
                  onClick={() => navigate("/about")}
                >
                  Get Implementation Guide
                </button> */}
              </div>
            </div>
            <div className="bg-pastel-green flex items-center justify-center p-8">
              <div className="text-center">
                <Recycle className="h-16 w-16 text-dark-teal mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-dark-teal mb-4">
                  Certification Matters
                </h3>
                <p className="text-dark-teal mb-6">
                  Look for these certifications to ensure your packaging is truly compostable:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-semibold">BPI</div>
                    <div className="text-xs">USA Standard</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-semibold">OK Compost</div>
                    <div className="text-xs">EU Standard</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-semibold">ABA</div>
                    <div className="text-xs">Australia</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-semibold">DIN CERTCO</div>
                    <div className="text-xs">Germany</div>
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
            Make the Transition to Compostable Packaging
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Connect with certified compostable packaging suppliers through our sustainable network.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-8 py-4 bg-dark-teal rounded-lg hover:bg-opacity-90 transition"
              onClick={() => navigate("/buyer")}
            >
              Find Compostable Suppliers
            </button>
            {/* <button
              className="px-8 py-4 border border-white rounded-lg hover:bg-dark-teal transition"
              onClick={() => navigate("/register")}
            >
              Get Personalized Advice
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompostablePage;
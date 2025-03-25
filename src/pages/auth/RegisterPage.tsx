import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

// Product list for dropdown options
const productList = [
  "Cardboard Boxes",
  "Aluminum Cans",
  "Plastic Containers",
  "Glass Bottles",
  "Paper Bags",
  "Wooden Crates",
  "Metal Drums",
  "Biodegradable Packaging",
  "Foam Packaging",
  "Shrink Wrap",
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "buyer" as "buyer" | "supplier",
    // Buyer specific fields
    industrySize: "small",
    productsExpected: [] as string[],
    description: "",
    location: "",
    // Supplier specific fields
    productsOffered: "small",
    typesOfProducts: [] as string[],
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const additionalInfo =
        formData.role === "buyer"
          ? {
              industrySize: formData.industrySize,
              productsExpected: formData.productsExpected,
              description: formData.description,
              location: formData.location,
            }
          : {
              productsOffered: formData.productsOffered,
              typesOfProducts: formData.typesOfProducts,
            };

      await register(
        formData.email,
        formData.password,
        formData.role,
        formData.name,
        additionalInfo
      );
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <Leaf className="h-12 w-12 text-primary-green" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-dark-teal">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join OnTym Solutions today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as "buyer" | "supplier",
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
              >
                <option value="buyer">Buyer</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>

            {/* Conditional form fields based on role */}
            {formData.role === "buyer" && (
              <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-700">Buyer Information</h3>

                <div>
                  <label
                    htmlFor="industrySize"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Size of Industry
                  </label>
                  <select
                    id="industrySize"
                    name="industrySize"
                    value={formData.industrySize}
                    onChange={(e) =>
                      setFormData({ ...formData, industrySize: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="productsExpected"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type of Products Expected
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {productList.map((product) => (
                      <div key={product} className="flex items-center">
                        <input
                          id={`product-${product}`}
                          name="productsExpected"
                          type="checkbox"
                          checked={formData.productsExpected.includes(product)}
                          onChange={(e) => {
                            const updatedProducts = e.target.checked
                              ? [...formData.productsExpected, product]
                              : formData.productsExpected.filter(
                                  (p) => p !== product
                                );
                            setFormData({
                              ...formData,
                              productsExpected: updatedProducts,
                            });
                          }}
                          className="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`product-${product}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {product}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Provide a description about your business and what you expect"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Where are you based"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  />
                </div>
              </div>
            )}

            {formData.role === "supplier" && (
              <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-700">
                  Supplier Information
                </h3>

                <div>
                  <label
                    htmlFor="productsOffered"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Products Offered For
                  </label>
                  <select
                    id="productsOffered"
                    name="productsOffered"
                    value={formData.productsOffered}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productsOffered: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  >
                    <option value="small">Small Scale Industries</option>
                    <option value="medium">Medium Scale Industries</option>
                    <option value="large">Large Scale Industries</option>
                    <option value="all">All Scales</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="typesOfProducts"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Types of Products Offered
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {productList.map((product) => (
                      <div key={product} className="flex items-center">
                        <input
                          id={`supplier-product-${product}`}
                          name="typesOfProducts"
                          type="checkbox"
                          checked={formData.typesOfProducts.includes(product)}
                          onChange={(e) => {
                            const updatedProducts = e.target.checked
                              ? [...formData.typesOfProducts, product]
                              : formData.typesOfProducts.filter(
                                  (p) => p !== product
                                );
                            setFormData({
                              ...formData,
                              typesOfProducts: updatedProducts,
                            });
                          }}
                          className="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`supplier-product-${product}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {product}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Where are you based"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
            >
              Create account
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-primary-green hover:text-opacity-90"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

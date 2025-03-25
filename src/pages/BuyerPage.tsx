import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";

interface Product {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
  quantity: number;
  seller: {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
  };
  createdAt: string;
}

const BuyerPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const user = useAuthStore((state) => state.user);

  const categories = [
    "all",
    "Raw Materials",
    "Packaging",
    "Equipment",
    "Supplies",
    "Other",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (!user || user.role !== "buyer") {
    return <div>Access denied. Only buyers can view this page.</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Available Products
          </h1>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Filter by Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-green focus:border-primary-green sm:text-sm rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-primary-green text-white px-3 py-1 rounded-bl-lg">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-2">
                  {/* <span className="text-2xl font-bold text-primary-green">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500">
                    Stock: {product.quantity}
                  </span> */}
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Seller Information
                  </h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Name:</span>{" "}
                      {product.seller.username}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span>{" "}
                      {product.seller.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span>{" "}
                      {product.seller.phoneNumber}
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 w-full bg-primary-green text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                  onClick={() => {
                    // Implement contact or purchase functionality
                    window.location.href = `mailto:${product.seller.email}?subject=Inquiry about ${product.name}`;
                  }}
                >
                  Contact Seller
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerPage;

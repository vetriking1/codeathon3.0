import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import {
  Leaf,
  Filter,
  Package,
  UserCircle,
  Mail,
  AlertCircle,
} from "lucide-react";

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
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-dark-teal mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Only buyers can view this page. Please log in with a buyer account.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-green mb-4"></div>
          <p className="text-dark-teal">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Leaf className="h-10 w-10 text-primary-green" />
            <h1 className="text-3xl font-bold text-dark-teal">Marketplace</h1>
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              <Filter className="h-5 w-5 mr-2 text-primary-green" />
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green rounded-md"
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
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4 flex items-center">
            <AlertCircle className="h-6 w-6 mr-3 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative h-56">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-primary-green text-white px-3 py-1 rounded-bl-lg text-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark-teal mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-dark-teal mb-3 flex items-center">
                      <UserCircle className="h-5 w-5 mr-2 text-primary-green" />
                      Seller Details
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 flex items-center">
                        <span className="font-medium mr-2">Name:</span>
                        {product.seller.username}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <span className="font-medium mr-2">Email:</span>
                        {product.seller.email}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <span className="font-medium mr-2">Phone:</span>
                        {product.seller.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full flex items-center justify-center bg-primary-green text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                    onClick={() => {
                      window.location.href = `mailto:${product.seller.email}?subject=Inquiry about ${product.name}`;
                    }}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Seller
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerPage;

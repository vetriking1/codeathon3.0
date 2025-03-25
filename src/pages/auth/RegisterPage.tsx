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

interface FormData {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: "buyer" | "supplier";
  sizeOfIndustry: string;
  productsExpected: string;
  productsOffered: string;
  description: string;
  location: string;
}

interface SubmitData
  extends Omit<FormData, "productsExpected" | "productsOffered"> {
  productsExpected: string[];
  productsOffered: string[];
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    role: "buyer",
    sizeOfIndustry: "",
    productsExpected: "",
    productsOffered: "",
    description: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register({
        ...formData,
        productsExpected: formData.productsExpected
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
        productsOffered: formData.productsOffered
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
      });
      if (formData.role === "buyer") {
        navigate("/buyer");
      } else {
        navigate("/seller");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
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
                onChange={handleChange}
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
                    htmlFor="sizeOfIndustry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Size of Industry
                  </label>
                  <input
                    id="sizeOfIndustry"
                    name="sizeOfIndustry"
                    type="text"
                    value={formData.sizeOfIndustry}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="productsExpected"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Products Expected (comma-separated)
                  </label>
                  <input
                    id="productsExpected"
                    name="productsExpected"
                    type="text"
                    value={formData.productsExpected}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
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
                    value={formData.location}
                    onChange={handleChange}
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
                    Products Offered (comma-separated)
                  </label>
                  <input
                    id="productsOffered"
                    name="productsOffered"
                    type="text"
                    value={formData.productsOffered}
                    onChange={handleChange}
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
                    value={formData.location}
                    onChange={handleChange}
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

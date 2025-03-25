import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowRight, ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

// Define categories for product selection
const categories: string[] = [
  "Recycled Paperboard Boxes",
  "Comestible Paper Cups",
  "Plant-based PLA Packaging",
  "Mushroom Packaging",
  "Kraft Paper Bags",
  "Biodegradable Food Containers",
  "Hemp-based Packaging",
  "Edible Packaging",
  "Glass Containers",
  "Beeswax Wraps",
  "Other",
];

// Define interfaces for form data and errors
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: "buyer" | "supplier";
  sizeOfIndustry: string;
  productsExpected: string[];
  productsOffered: string[];
  description: string;
  location: string;
}

interface FormErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "buyer",
    sizeOfIndustry: "",
    productsExpected: [],
    productsOffered: [],
    description: "",
    location: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  // Validation function with TypeScript typing
  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "username":
        return value.length < 3 ? "Username must be at least 3 characters" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email address" : "";
      case "password":
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[A-Z])/.test(value))
          return "Password must include an uppercase letter";
        if (!/(?=.*[a-z])/.test(value))
          return "Password must include a lowercase letter";
        if (!/(?=.*\d)/.test(value)) return "Password must include a number";
        if (!/(?=.*[!@#$%^&*])/.test(value))
          return "Password must include a special character";
        return "";
      case "confirmPassword":
        return value !== formData.password ? "Passwords do not match" : "";
      case "phoneNumber":
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return !phoneRegex.test(value) ? "Invalid phone number" : "";
      default:
        return "";
    }
  };

  // Handle input changes with TypeScript typing
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate specific fields
    const validationFields: (keyof FormData)[] = [
      "username",
      "email",
      "password",
      "confirmPassword",
      "phoneNumber",
    ];

    if (validationFields.includes(name as keyof FormData)) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Handle product selection
  const handleProductSelect = (
    product: string,
    type: "productsExpected" | "productsOffered"
  ) => {
    setFormData((prev) => {
      const currentProducts = prev[type];
      const updatedProducts = currentProducts.includes(product)
        ? currentProducts.filter((p) => p !== product)
        : [...currentProducts, product];

      return {
        ...prev,
        [type]: updatedProducts,
      };
    });
  };

  // Validate entire step
  const validateStep = (currentStep: number): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { ...errors };

    if (currentStep === 1) {
      const fieldsToValidate: (keyof FormData)[] = [
        "username",
        "email",
        "password",
        "confirmPassword",
        "phoneNumber",
      ];

      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formData[field]);
        newErrors[field] = error;
        if (error) isValid = false;
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });

    // Final validation
    const isValid = validateStep(1) && validateStep(2);

    if (!isValid) return;

    try {
      // Prepare data for registration
      const submitData = {
        ...formData,
        productsExpected:
          formData.role === "buyer" ? formData.productsExpected : [],
        productsOffered:
          formData.role === "supplier" ? formData.productsOffered : [],
        // Omit sensitive fields
        confirmPassword: undefined,
      };

      await register(submitData);

      // Navigate based on role
      if (formData.role === "buyer") {
        navigate("/buyer");
      } else {
        navigate("/seller");
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        email:
          err instanceof Error
            ? err.message
            : "An error occurred during registration",
      }));
    }
  };

  // Navigation methods
  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Render method for each step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-green focus:border-primary-green"
                } rounded-md shadow-sm focus:outline-none`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
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
                placeholder="example@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-green focus:border-primary-green"
                } rounded-md shadow-sm focus:outline-none`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                placeholder="Minimum 8 characters"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-green focus:border-primary-green"
                } rounded-md shadow-sm focus:outline-none`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Retype your password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-green focus:border-primary-green"
                } rounded-md shadow-sm focus:outline-none`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
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
                placeholder="98xxxxxxxx"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.phoneNumber
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-green focus:border-primary-green"
                } rounded-md shadow-sm focus:outline-none`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
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

            <div className="col-span-full flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-primary-green text-white px-4 py-2 rounded-md hover:bg-opacity-90"
              >
                Next <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {formData.role === "buyer" && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="sizeOfIndustry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Size of Requirement
                  </label>
                  <select
                    id="sizeOfIndustry"
                    name="sizeOfIndustry"
                    value={formData.sizeOfIndustry}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  >
                    <option value="small">Small Scale</option>
                    <option value="medium">Medium Scale</option>
                    <option value="large">Large Scale</option>
                  </select>
                </div>

                <div>
                  <h3 className="block text-sm font-medium text-gray-700 mb-2">
                    Products Expected
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          handleProductSelect(category, "productsExpected")
                        }
                        className={`px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                          formData.productsExpected.includes(category)
                            ? "bg-primary-green text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {formData.productsExpected.includes(category) && (
                          <Check className="inline-block w-4 h-4 mr-2" />
                        )}
                        {category}
                      </button>
                    ))}
                  </div>
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
                    placeholder="Write few words about your self and your requirements..."
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
                  />
                </div>
              </div>
            )}

            {formData.role === "supplier" && (
              <div className="space-y-4">
                <div>
                  <h3 className="block text-sm font-medium text-gray-700 mb-2">
                    Products Offered
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          handleProductSelect(category, "productsOffered")
                        }
                        className={`px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                          formData.productsOffered.includes(category)
                            ? "bg-primary-green text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {formData.productsOffered.includes(category) && (
                          <Check className="inline-block w-4 h-4 mr-2" />
                        )}
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
                placeholder="Where are you from?"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-green focus:border-primary-green"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 text-primary-green px-4 py-2 rounded-md hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" /> Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-primary-green text-white px-4 py-2 rounded-md hover:bg-opacity-90"
              >
                Review <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-dark-teal mb-4">
                Review Your Information
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Personal Details
                  </h3>
                  <p className="py-2">Username: {formData.username}</p>
                  <p className="py-2">Email: {formData.email}</p>
                  <p className="py-2">Phone: {formData.phoneNumber}</p>
                  <p className="py-2">Role: {formData.role}</p>
                </div>

                {formData.role === "buyer" && (
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Buyer Details
                    </h3>
                    <p className="py-2">
                      Industry Size: {formData.sizeOfIndustry}
                    </p>
                    <p className="py-2">
                      Products Expected: {formData.productsExpected.join(", ")}
                    </p>
                    <p className="py-2">Description: {formData.description}</p>
                  </div>
                )}

                {formData.role === "supplier" && (
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Supplier Details
                    </h3>
                    <p>
                      Products Offered: {formData.productsOffered.join(", ")}
                    </p>
                  </div>
                )}

                <div className="md:col-span-2">
                  <p>Location: {formData.location}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 text-primary-green px-4 py-2 rounded-md hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" /> Edit
              </button>
              <button
                type="submit"
                className="w-full max-w-xs flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
              >
                Create Account
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
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
          {renderStep()}
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

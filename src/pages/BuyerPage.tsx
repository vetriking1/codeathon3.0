import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { config } from "../config";
import {
  Leaf,
  Filter,
  Package,
  UserCircle,
  Mail,
  AlertCircle,
  Wind,
  MapPin,
  Info,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ChatBot from "../components/ChatBot";

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

interface AirQuality {
  aqi: number;
  components: {
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
  };
  location: string;
}

interface PackagingRecommendation {
  category: string;
  pollutants: string[];
  description: string;
  effectiveness: "high" | "medium" | "low";
}

interface GeminiRecommendation {
  recommendedProduct: string;
  reason: string;
  environmentalImpact: string;
}

const packagingData: Record<string, PackagingRecommendation> = {
  "Glass Packaging": {
    category: "Glass Packaging",
    pollutants: ["O3", "SO2"],
    description:
      "Highly resistant, but energy-intensive to produce. Best for long-term use.",
    effectiveness: "high",
  },
  "Aluminum Packaging": {
    category: "Aluminum Packaging",
    pollutants: ["O3", "NO2"],
    description:
      "Resistant to pollution but requires high energy to manufacture. Recyclable.",
    effectiveness: "high",
  },
  "Mushroom Packaging": {
    category: "Mushroom Packaging",
    pollutants: ["PM2.5", "NO2"],
    description:
      "Degrades faster in high pollution areas. Best for clean environments.",
    effectiveness: "medium",
  },
  "Recycled Paper with Bio-Coating": {
    category: "Recycled Paper with Bio-Coating",
    pollutants: ["SO2", "NO2", "PM10"],
    description:
      "Absorbs pollutants, but coatings (plant wax) improve durability.",
    effectiveness: "medium",
  },
  "Seaweed-Based Packaging": {
    category: "Seaweed-Based Packaging",
    pollutants: ["O3", "SO2"],
    description:
      "Can degrade faster in ozone-heavy environments but remains biodegradable.",
    effectiveness: "medium",
  },
  "Biodegradable PLA Films": {
    category: "Biodegradable PLA Films",
    pollutants: ["O3", "NO2"],
    description:
      "Ozone exposure reduces lifespan, but good for compostable packaging.",
    effectiveness: "low",
  },
  "Compostable PHA Plastics": {
    category: "Compostable PHA Plastics",
    pollutants: ["NO2", "PM10"],
    description:
      "More resistant than PLA but affected by NO2. Suitable for food packaging.",
    effectiveness: "medium",
  },
  "Cloth Bags with Natural Coatings": {
    category: "Cloth Bags with Natural Coatings",
    pollutants: ["PM2.5", "SO2"],
    description:
      "Fine particles and SO2 can weaken fibers. Coatings (e.g., beeswax) help.",
    effectiveness: "medium",
  },
  "Sugarcane Bagasse Containers": {
    category: "Sugarcane Bagasse Containers",
    pollutants: ["SO2", "NO2"],
    description:
      "Can absorb pollutants but remains compostable. Best for food service.",
    effectiveness: "medium",
  },
  "Recyclable Corrugated Cardboard": {
    category: "Recyclable Corrugated Cardboard",
    pollutants: ["PM10", "NO2"],
    description:
      "Pollutants weaken structure over time. Water-resistant coating recommended.",
    effectiveness: "low",
  },
};

const BuyerPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
  const [locationError, setLocationError] = useState("");
  const user = useAuthStore((state) => state.user);
  const [showChat, setShowChat] = useState(false);
  const [geminiRecommendation, setGeminiRecommendation] =
    useState<GeminiRecommendation | null>(null);
  const [userDescription, setUserDescription] = useState("");
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
  const [recommendationError, setRecommendationError] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [tempDescription, setTempDescription] = useState("");
  const [isUpdatingDescription, setIsUpdatingDescription] = useState(false);
  const [showAirQuality, setShowAirQuality] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const categories = [
    "all",
    "Glass Packaging",
    "Aluminum Packaging",
    "Mushroom Packaging",
    "Recycled Paper with Bio-Coating",
    "Seaweed-Based Packaging",
    "Biodegradable PLA Films",
    "Compostable PHA Plastics",
    "Cloth Bags with Natural Coatings",
    "Sugarcane Bagasse Containers",
    "Recyclable Corrugated Cardboard",
    "Other",
  ];

  const getAirQuality = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=799baf8abdc81da6e98902b9cab7a754`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch air quality data");
      }

      const data = await response.json();

      setAirQuality({
        aqi: data.list[0].main.aqi,
        components: data.list[0].components,
        location: `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`, // Optional: show coordinates instead
      });
    } catch (err) {
      setLocationError("Failed to fetch air quality data");
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getAirQuality(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            setLocationError("Unable to get your location");
          }
        );
      } else {
        setLocationError("Geolocation is not supported by your browser");
      }
    };

    getLocation();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user?.description) {
      setUserDescription(user.description);
      setTempDescription(user.description);
    }
  }, [user]);

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

  const getAQIDescription = (aqi: number) => {
    switch (aqi) {
      case 1:
        return { text: "Good", color: "text-green-600" };
      case 2:
        return { text: "Fair", color: "text-yellow-600" };
      case 3:
        return { text: "Moderate", color: "text-orange-600" };
      case 4:
        return { text: "Poor", color: "text-red-600" };
      case 5:
        return { text: "Very Poor", color: "text-purple-600" };
      default:
        return { text: "Unknown", color: "text-gray-600" };
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const getPackagingRecommendations = (airQualityData: AirQuality) => {
    // Define thresholds for different pollutants
    const thresholds = {
      o3: 60, // Ozone threshold
      no2: 40, // Nitrogen dioxide threshold
      pm10: 50, // PM10 threshold
      pm2_5: 25, // PM2.5 threshold
      so2: 40, // Sulfur dioxide threshold (not in OpenWeather API but included for completeness)
    };

    // Check which pollutants are high in the area
    const highPollutants: string[] = [];
    if (airQualityData.components.o3 > thresholds.o3) highPollutants.push("O3");
    if (airQualityData.components.no2 > thresholds.no2)
      highPollutants.push("NO2");
    if (airQualityData.components.pm10 > thresholds.pm10)
      highPollutants.push("PM10");
    if (airQualityData.components.pm2_5 > thresholds.pm2_5)
      highPollutants.push("PM2.5");

    // Filter packaging options that address the high pollutants
    return Object.values(packagingData)
      .filter((packaging) =>
        packaging.pollutants.some((pollutant) =>
          highPollutants.includes(pollutant)
        )
      )
      .sort((a, b) => {
        const effectivenessScore = { high: 3, medium: 2, low: 1 };
        return (
          effectivenessScore[b.effectiveness] -
          effectivenessScore[a.effectiveness]
        );
      });
  };

  const getGeminiRecommendation = async () => {
    if (!airQuality || !userDescription.trim()) {
      setRecommendationError(
        "Please provide a description and wait for air quality data"
      );
      return;
    }

    setIsLoadingRecommendation(true);
    setRecommendationError("");

    try {
      const response = await fetch("http://localhost:3000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: userDescription,
          airQuality,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data = await response.json();
      setGeminiRecommendation(data);
    } catch (err) {
      setRecommendationError("Failed to get personalized recommendation");
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  const updateUserDescription = async () => {
    if (!user?._id) return;

    setIsUpdatingDescription(true);
    try {
      const response = await fetch(
        `http://localhost:3000/auth/profile/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: tempDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update description");
      }

      setUserDescription(tempDescription);
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Error updating description:", error);
    } finally {
      setIsUpdatingDescription(false);
    }
  };

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
        {/* Air Quality Section - Collapsible */}
        <div className="mb-6">
          <button
            onClick={() => setShowAirQuality(!showAirQuality)}
            className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <Wind className="h-6 w-6 text-primary-green" />
              <h2 className="text-lg font-semibold text-dark-teal">
                Air Quality Information
              </h2>
            </div>
            {showAirQuality ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {showAirQuality && airQuality && (
            <div className="mt-2 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Wind className="h-8 w-8 text-primary-green" />
                  <div>
                    <h2 className="text-xl font-semibold text-dark-teal">
                      Air Quality Index
                    </h2>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <p className="text-sm text-gray-600">
                        {airQuality.location}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-2xl font-bold ${
                      getAQIDescription(airQuality.aqi).color
                    }`}
                  >
                    {getAQIDescription(airQuality.aqi).text}
                  </p>
                  <p className="text-sm text-gray-500">AQI: {airQuality.aqi}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">PM2.5</p>
                  <p className="text-lg font-semibold text-dark-teal">
                    {airQuality.components.pm2_5.toFixed(1)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">PM10</p>
                  <p className="text-lg font-semibold text-dark-teal">
                    {airQuality.components.pm10.toFixed(1)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">O₃</p>
                  <p className="text-lg font-semibold text-dark-teal">
                    {airQuality.components.o3.toFixed(1)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">NO₂</p>
                  <p className="text-lg font-semibold text-dark-teal">
                    {airQuality.components.no2.toFixed(1)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">CO</p>
                  <p className="text-lg font-semibold text-dark-teal">
                    {airQuality.components.co.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations Section - Collapsible */}
        <div className="mb-8">
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <Info className="h-6 w-6 text-primary-green" />
              <h2 className="text-lg font-semibold text-dark-teal">
                Packaging Recommendations
              </h2>
            </div>
            {showRecommendations ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {showRecommendations && airQuality && (
            <div className="mt-2 space-y-6">
              {/* Personalized AI Recommendations */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Info className="h-8 w-8 text-primary-green" />
                    <h2 className="text-xl font-semibold text-dark-teal">
                      Personalized AI Recommendations
                    </h2>
                  </div>
                  {!isEditingDescription && (
                    <button
                      onClick={() => setIsEditingDescription(true)}
                      className="text-primary-green hover:text-opacity-80 text-sm font-medium"
                    >
                      Edit Profile Description
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {isEditingDescription ? (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Your Profile Description
                        </label>
                        <textarea
                          id="description"
                          value={tempDescription}
                          onChange={(e) => setTempDescription(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green"
                          rows={4}
                          placeholder="Tell us about your packaging requirements, industry, and any specific concerns..."
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={updateUserDescription}
                          disabled={isUpdatingDescription}
                          className="flex-1 bg-primary-green text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
                        >
                          {isUpdatingDescription
                            ? "Updating..."
                            : "Save Description"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingDescription(false);
                            setTempDescription(userDescription);
                          }}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Your Profile Description
                      </h3>
                      <p className="text-gray-600">
                        {userDescription ||
                          "No description provided. Click 'Edit Profile Description' to add one."}
                      </p>
                    </div>
                  )}
                  {recommendationError && (
                    <div className="text-red-600 text-sm">
                      {recommendationError}
                    </div>
                  )}

                  <button
                    onClick={getGeminiRecommendation}
                    disabled={
                      isLoadingRecommendation || !userDescription.trim()
                    }
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-md text-white ${
                      isLoadingRecommendation || !userDescription.trim()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "px-6 py-3 bg-primary-green rounded-lg hover:bg-opacity-90 transition"
                    } transition-colors`}
                  >
                    {isLoadingRecommendation ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Getting Recommendation...
                      </>
                    ) : (
                      "Get Personalized Recommendation"
                    )}
                  </button>
                  {geminiRecommendation && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-dark-teal mb-2">
                        Recommended Product:{" "}
                        {geminiRecommendation.recommendedProduct}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Reason:</span>{" "}
                          {geminiRecommendation.reason}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">
                            Environmental Impact:
                          </span>{" "}
                          {geminiRecommendation.environmentalImpact}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Packaging Recommendations */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Info className="h-8 w-8 text-primary-green" />
                  <h2 className="text-xl font-semibold text-dark-teal">
                    Packaging Recommendations
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getPackagingRecommendations(airQuality).map(
                    (recommendation) => (
                      <div
                        key={recommendation.category}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-semibold text-dark-teal mb-2">
                          {recommendation.category}
                        </h3>
                        <div className="flex items-center mb-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              recommendation.effectiveness === "high"
                                ? "bg-green-100 text-green-800"
                                : recommendation.effectiveness === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {recommendation.effectiveness.toUpperCase()}{" "}
                            Effectiveness
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {recommendation.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {recommendation.pollutants.map((pollutant) => (
                            <span
                              key={pollutant}
                              className="bg-primary-green bg-opacity-10 text-primary-green px-2 py-1 rounded-full text-xs"
                            >
                              {pollutant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {locationError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-8 flex items-center">
            <AlertCircle className="h-6 w-6 mr-3 text-red-500" />
            <span>{locationError}</span>
          </div>
        )}

        {/* Marketplace Section */}
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

      {/* Add ChatBot */}
      {showChat && (
        <ChatBot categories={categories} onClose={() => setShowChat(false)} />
      )}

      {/* Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-4 right-4 bg-dark-teal text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default BuyerPage;

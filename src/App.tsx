import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SellerPage from "./pages/SellerPage";
import BuyerPage from "./pages/BuyerPage";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-beige flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/buyer"
              element={
                <ProtectedRoute>
                  <BuyerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller"
              element={
                <ProtectedRoute>
                  <SellerPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SellerPage from "./pages/SellerPage";
import BuyerPage from "./pages/BuyerPage";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/AboutUs";
import BlogPage from "./pages/Blog";
import BiodegradablePage from "./pages/Biodegradables";
import CompostablePage from "./pages/Compostables";
import RecyclablePage from "./pages/Recyclables";
import ZeroWastePage from "./pages/Zerowaste";

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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/biodegradables" element={<BiodegradablePage />} />
            <Route path="/compostables" element={<CompostablePage />} />
            <Route path="/recyclables" element={<RecyclablePage />} />
            <Route path="/zerowaste" element={<ZeroWastePage />} />
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

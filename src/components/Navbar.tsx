import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Search, UserCircle, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark-teal text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-light-green" />
            <span className="text-xl font-bold">OnTym Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search suppliers..."
                className="w-64 px-4 py-2 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-4 py-2 rounded-lg border border-light-green hover:bg-primary-green transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 rounded-lg bg-primary-green hover:bg-opacity-90 transition"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-light-green hover:bg-primary-green transition"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Login</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-green transition"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-dark-teal z-50 pb-4 px-4">
            {/* Mobile Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search suppliers..."
                className="w-full px-4 py-2 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Mobile Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-light-green hover:bg-primary-green transition text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-primary-green hover:bg-opacity-90 transition text-center"
                >
                  Register
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-light-green hover:bg-primary-green transition text-center flex items-center justify-center space-x-2"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

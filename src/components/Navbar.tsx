import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Search, UserCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="bg-dark-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-light-green" />
              <span className="text-xl font-bold">OnTym Solutions</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search suppliers..."
                className="w-64 px-4 py-2 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-light-green">{user?.name}</span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="px-4 py-2 rounded-lg border border-light-green hover:bg-primary-green transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 rounded-lg bg-primary-green hover:bg-opacity-90 transition"
                >
                  For Suppliers
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-light-green hover:bg-primary-green transition"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-light-green" />
              <span className="text-xl font-bold">OnTym Solutions</span>
            </div>
            <p className="mt-4 text-sm text-pastel-green">
              Connecting businesses with sustainable packaging solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-light-green transition">
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-light-green transition"
                >
                  For Suppliers
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-light-green transition"
                >
                  For Buyers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/biodegradables"
                  className="hover:text-light-green transition"
                >
                  Biodegradable
                </Link>
              </li>
              <li>
                <Link
                  to="/compostables"
                  className="hover:text-light-green transition"
                >
                  Compostables
                </Link>
              </li>
              <li>
                <Link
                  to="/recyclables"
                  className="hover:text-light-green transition"
                >
                  Recyclables
                </Link>
              </li>
              <li>
                <Link
                  to="/zerowaste"
                  className="hover:text-light-green transition"
                >
                  Zero Waste
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-light-green" />
                <a
                  href="mailto:contactontym@gmail.com"
                  className="hover:underline"
                >
                  contactontym@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-light-green" />
                <a href="tel:+91987654321" className="hover:underline">
                  +91 987654321
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-light-green" />
                <span>Chennai</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-green text-center">
          <p>
            &copy; {new Date().getFullYear()} OnTym Solutions. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

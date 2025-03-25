import { Leaf, Mail, Phone, MapPin } from "lucide-react";

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
                <a href="#" className="hover:text-light-green transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-green transition">
                  For Suppliers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-green transition">
                  For Buyers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-green transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-light-green transition">
                  Biodegradable
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-green transition">
                  Compostable
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-green transition">
                  Recyclable
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-green transition">
                  Zero Waste
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-light-green" />
                <span>contact@ontymsolutions.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-light-green" />
                <span>+91 987654321</span>
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

import { Leaf, Recycle, Users, Globe, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-dark-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Our Mission: Sustainable Packaging for All
              </h1>
              <p className="text-lg text-pastel-green">
                At OnTym Solutions, we're bridging the gap between businesses
                and eco-friendly packaging suppliers to create a more
                sustainable future.
              </p>
              <button
                className="px-6 py-3 bg-primary-green rounded-lg hover:bg-opacity-90 transition"
                onClick={() => navigate("/register")}
              >
                Join Our Movement
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Sustainable Team"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Our Team"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-dark-teal">Our Story</h2>
            <p className="text-gray-600">
              Founded in 2025, OnTym Solutions began with a simple idea: make
              sustainable packaging accessible to businesses of all sizes. Our
              team of environmental enthusiasts and tech experts came together
              to create a platform that simplifies the process of finding and
              connecting with eco-conscious suppliers.
            </p>
            <p className="text-gray-600">
              We recognized the growing need for businesses to adopt sustainable
              practices but saw the challenges they faced in finding reliable,
              high-quality packaging solutions. That's why we built a
              comprehensive marketplace dedicated exclusively to sustainable
              packaging at a hackathon in Prathyusha Engineering College.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-pastel-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Leaf className="h-12 w-12 text-primary-green mb-4" />
              <h3 className="text-xl font-semibold text-dark-teal mb-2">
                Sustainability First
              </h3>
              <p className="text-gray-600">
                Every decision we make is guided by our commitment to
                environmental responsibility and reducing packaging waste.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-primary-green mb-4" />
              <h3 className="text-xl font-semibold text-dark-teal mb-2">
                Community Focused
              </h3>
              <p className="text-gray-600">
                We believe in building strong relationships between businesses
                and suppliers to foster a community of sustainability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Globe className="h-12 w-12 text-primary-green mb-4" />
              <h3 className="text-xl font-semibold text-dark-teal mb-2">
                Global Impact
              </h3>
              <p className="text-gray-600">
                Our vision extends beyond borders - we aim to make sustainable
                packaging the norm worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-dark-teal mb-12">
          Meet The Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Vignesh M",
              role: "Founder & CEO",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Ashik Ahamed",
              role: "Head of Sustainability",
              img: "https://randomuser.me/api/portraits/men/44.jpg",
            },
            {
              name: "Vetri Selvan M",
              role: "Tech Lead",
              img: "https://randomuser.me/api/portraits/men/75.jpg",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-dark-teal">
                {member.name}
              </h3>
              <p className="text-primary-green mb-4">{member.role}</p>
              <p className="text-gray-600">
                {member.name.split(" ")[0]} is passionate about{" "}
                {member.role.includes("Sustainability")
                  ? "environmental conservation"
                  : member.role.includes("Tech")
                  ? "building sustainable tech solutions"
                  : "driving business innovation"}
                .
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-primary-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Impact</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Recycle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                  <p>
                    <span className="font-bold">500+</span> tons of plastic
                    waste prevented through our platform
                  </p>
                </div>
                <div className="flex items-start">
                  <Leaf className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                  <p>
                    <span className="font-bold">1,200+</span> sustainable
                    suppliers connected with businesses
                  </p>
                </div>
                <div className="flex items-start">
                  <Heart className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                  <p>
                    <span className="font-bold">10,000+</span> businesses making
                    the switch to eco-friendly packaging
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Sustainable Impact"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Be Part of the Change?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a business looking for sustainable packaging or a
            supplier with eco-friendly solutions, we'd love to have you join our
            community.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-8 py-4 bg-primary-green rounded-lg hover:bg-opacity-90 transition"
              onClick={() => navigate("/register")}
            >
              Join as Business
            </button>
            <button
              className="px-8 py-4 border border-light-green rounded-lg hover:bg-primary-green transition"
              onClick={() => navigate("/register")}
            >
              Join as Supplier
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

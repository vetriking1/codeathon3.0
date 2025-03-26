import { Calendar, Clock, User, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();

  // Sample blog data
  const featuredPost = {
    id: 1,
    title: "The Future of Sustainable Packaging: Trends to Watch in 2024",
    excerpt:
      "Discover the emerging trends that are shaping the future of eco-friendly packaging solutions and how your business can stay ahead.",
    date: "May 15, 2024",
    readTime: "5 min read",
    author: "Sarah Chen",
    category: "Industry Trends",
    image:
      "https://images.unsplash.com/photo-1605007493699-af65834f8a05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  };

  const blogPosts = [
    {
      id: 2,
      title: "How to Transition Your Business to Sustainable Packaging",
      excerpt:
        "A step-by-step guide to making the switch to eco-friendly packaging without disrupting your operations.",
      date: "April 28, 2024",
      readTime: "4 min read",
      author: "Marcus Lee",
      category: "Business Guide",
    },
    {
      id: 3,
      title:
        "The True Cost of Conventional Packaging vs. Sustainable Alternatives",
      excerpt:
        "Breaking down the long-term financial and environmental costs of different packaging options.",
      date: "April 10, 2024",
      readTime: "6 min read",
      author: "Alex Johnson",
      category: "Cost Analysis",
    },
    {
      id: 4,
      title: "Case Study: How Brand X Reduced Waste by 75% in 6 Months",
      excerpt:
        "Learn how one company dramatically improved their sustainability metrics through packaging changes.",
      date: "March 22, 2024",
      readTime: "7 min read",
      author: "Sarah Chen",
      category: "Success Stories",
    },
    {
      id: 5,
      title: "Understanding Biodegradable vs. Compostable Materials",
      excerpt:
        "The key differences between these sustainable options and when to use each one.",
      date: "March 15, 2024",
      readTime: "3 min read",
      author: "Marcus Lee",
      category: "Materials Guide",
    },
    {
      id: 6,
      title: "Government Regulations on Packaging: What You Need to Know",
      excerpt:
        "An overview of current and upcoming packaging regulations affecting businesses.",
      date: "February 28, 2024",
      readTime: "8 min read",
      author: "Alex Johnson",
      category: "Legal Updates",
    },
  ];

  const categories = [
    "All Topics",
    "Industry Trends",
    "Business Guide",
    "Materials Guide",
    "Success Stories",
    "Cost Analysis",
    "Legal Updates",
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-dark-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Sustainable Packaging Insights
          </h1>
          <p className="text-lg text-pastel-green max-w-3xl mx-auto">
            Stay informed with the latest trends, guides, and success stories in
            the world of eco-friendly packaging.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-dark-teal mb-8">
          Featured Post
        </h2>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-auto">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 space-y-4">
              <span className="inline-block px-3 py-1 bg-pastel-green text-dark-teal rounded-full text-sm font-medium">
                {featuredPost.category}
              </span>
              <h3 className="text-2xl font-bold text-dark-teal">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600">{featuredPost.excerpt}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {featuredPost.readTime}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {featuredPost.author}
                </div>
              </div>
              <button
                className="mt-4 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-opacity-90 transition"
                onClick={() => navigate(`/blog/${featuredPost.id}`)}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
              <h3 className="text-xl font-semibold text-dark-teal mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button className="w-full text-left px-3 py-2 hover:bg-pastel-green hover:text-dark-teal rounded transition flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="h-48 bg-gray-200">
                    {/* Placeholder for post image */}
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="inline-block px-2 py-1 bg-pastel-green text-dark-teal rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-dark-teal">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <button
                      className="mt-3 px-4 py-1.5 bg-primary-green text-white rounded-lg hover:bg-opacity-90 transition text-sm"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-pastel-green">
                  Previous
                </button>
                <button className="px-3 py-1 rounded bg-primary-green text-white">
                  1
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-pastel-green">
                  2
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-pastel-green">
                  3
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-pastel-green">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary-green text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="mb-6">
            Subscribe to our newsletter for regular updates on sustainable
            packaging trends and tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800"
            />
            <button className="px-6 py-3 bg-dark-teal rounded-lg hover:bg-opacity-90 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
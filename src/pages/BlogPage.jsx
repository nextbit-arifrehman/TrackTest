import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Search } from "lucide-react";
import Layout from "@/components/Layout";
import BlogPost from "./BlogPost"; // Import the new BlogPost component

const blogPosts = [
  {
    id: "1",
    title: "10 Tips for Creating an Outstanding Resume",
    excerpt: "Learn how to make your resume stand out to potential employers with these essential tips.",
    content: "Full content would go here...",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Sarah Johnson",
    date: "May 1, 2025",
    category: "Resume Tips",
    tags: ["resume", "job search", "career advice"]
  },
  {
    id: "2",
    title: "How to Ace Your Job Interview: Preparation Strategies",
    excerpt: "Prepare for success with these proven interview techniques and strategies.",
    content: "Full content would go here...",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: "Michael Chen",
    date: "April 28, 2025",
    category: "Interview Tips",
    tags: ["interview", "job search", "career growth"]
  },
  // More blog posts...
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    document.title = "Career Tips - JobTrack";

    let filtered = [...blogPosts];

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout title="Career Tips - JobTrack">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-brand-blue text-white">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Career Tips & Advice
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Insights and resources to help you advance your career and succeed in your job search
          </motion.p>
          
          <motion.div 
            className="max-w-lg mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              className="pl-10 py-6 rounded-full shadow-lg bg-white/90 backdrop-blur-sm text-gray-900 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>
      </section>
      
      {/* Blog Post List */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">
                  {selectedCategory ? selectedCategory : "Latest Articles"}
                </h2>
                
                {selectedCategory && (
                  <button 
                    className="btn btn-outline"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Show All Categories
                  </button>
                )}
              </div>
              
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center shadow-md">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found matching your criteria</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search terms or category filter</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}
                  >
                    View All Articles
                  </button>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={fadeInUp}
                    >
                      <BlogPost post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                            selectedCategory === category
                              ? "bg-brand-blue text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["career advice", "resume", "interview", "job search", "skills", "networking", "remote work"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="btn btn-sm btn-secondary"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl shadow-md p-6 mt-8 text-white">
                  <h3 className="text-lg font-semibold mb-2">Subscribe to Updates</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Get the latest career tips and advice delivered to your inbox
                  </p>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mb-3 p-4 rounded-md"
                  />
                  <button className="btn btn-secondary w-full">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl p-8 md:p-12 shadow-lg text-white text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Want More Career Tips?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Sign up for our newsletter to receive personalized job recommendations and 
              expert career advice directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 p-4 rounded-md"
              />
              <button className="btn btn-primary w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;

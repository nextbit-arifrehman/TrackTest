import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import Layout from "@/components/Layout";

const NotFoundPage = () => {
  return (
    <Layout title="Page Not Found - JobTrack">
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 font-bold text-[150px] md:text-[200px] leading-none"
            >
              404
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Page Not Found</h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="btn btn-primary">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
                <Link to="/companies" className="btn btn-outline">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Companies
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

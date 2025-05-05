
import { useState, useEffect, FormEvent } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, User, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

const UpdateProfilePage = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Update Profile - JobTrack";

    if (currentUser) {
      setFormData({
        name: currentUser.name,
        photoURL: currentUser.photoURL,
      });
    }
  }, [currentUser]);

  if (!currentUser) return <Navigate to="/login" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUserProfile(formData.name, formData.photoURL);
      toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Update Profile - JobTrack">
      <div className="min-h-[calc(100vh-16rem)] py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/profile"
              className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Profile
            </Link>

            <div className="card bg-white shadow-md">
              <div className="card-body">
                <h1 className="text-2xl font-bold mb-2">Update Profile</h1>
                <p className="text-gray-600 text-sm mb-6">Update your personal information</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="input input-bordered w-full pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="photoURL" className="label">
                      <span className="label-text">Profile Photo URL</span>
                    </label>
                    <div className="relative">
                      <Camera className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="photoURL"
                        id="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className="input input-bordered w-full pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a URL for your profile picture
                    </p>
                  </div>

                  {formData.photoURL && (
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img
                          src={formData.photoURL}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`btn btn-primary w-full ${isLoading ? "btn-disabled" : ""}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Update Information"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </Layout>
  );
};

export default UpdateProfilePage;

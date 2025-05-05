import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, Mail, User, LogOut } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    document.title = "My Profile - JobTrack";
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have been logged out.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout title="My Profile - JobTrack">
      <div className="min-h-[calc(100vh-16rem)] py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Picture and Update */}
              <div className="w-full md:w-1/3">
                <div className="card bg-white shadow-md">
                  <div className="card-body items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                    <p className="text-gray-500 mt-1">{currentUser.email}</p>

                    <Link to="/profile/update" className="w-full mt-4">
                      <button className="btn btn-outline w-full flex items-center justify-center">
                        <Edit className="w-4 h-4 mr-2" />
                        Update Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Profile Info + Summary */}
              <div className="w-full md:w-2/3 space-y-6">
                <div className="card bg-white shadow-md">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <User className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{currentUser.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <Mail className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{currentUser.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handleLogout}
                        className="btn btn-error w-full flex items-center justify-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>

                {/* Account Summary */}
                <div className="card bg-white shadow-md">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-4">Account Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h4 className="font-medium text-blue-800 mb-1">Job Applications</h4>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-md">
                        <h4 className="font-medium text-purple-800 mb-1">Saved Jobs</h4>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-md">
                        <h4 className="font-medium text-green-800 mb-1">Viewed Jobs</h4>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-md">
                        <h4 className="font-medium text-yellow-800 mb-1">Profile Views</h4>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </Layout>
  );
};

export default ProfilePage;

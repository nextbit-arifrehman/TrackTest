import { useState, FormEvent, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

const ForgotPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState(location.state?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password - JobTrack";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      // Error is handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToGmail = () => {
    window.open("https://mail.google.com", "_blank");
    navigate("/login");
  };

  return (
    <Layout title="Forgot Password - JobTrack">
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div 
          className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold">Reset Password</h2>
            <p className="mt-2 text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>
          
          {!isSubmitted ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`btn w-full bg-brand-blue hover:bg-brand-blue/90 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? "Sending reset link..." : "Reset Password"}
              </button>
              
              <div className="text-center">
                <Link 
                  to="/login"
                  className="text-sm text-brand-blue hover:underline inline-flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="bg-green-50 rounded-md p-4 border border-green-100">
                <p className="text-green-800">
                  Password reset email sent! Please check your inbox for instructions on how to reset your password.
                </p>
              </div>
              
              <button 
                onClick={handleRedirectToGmail}
                className="btn w-full bg-brand-blue hover:bg-brand-blue/90"
              >
                Open Gmail
              </button>
              
              <div className="text-center">
                <Link 
                  to="/login"
                  className="text-sm text-brand-blue hover:underline inline-flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;

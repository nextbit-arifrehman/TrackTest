import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ExternalLink, MapPin, X, Briefcase, DollarSign, MapPinned } from "lucide-react";
import { companies } from "@/data/companies";
import Layout from "@/components/Layout";

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundCompany = companies.find((c) => c.id === id);
    if (foundCompany) {
      setCompany(foundCompany);
      document.title = `${foundCompany.name} - JobTrack`;
    } else {
      navigate("/not-found");
    }
  }, [id, navigate]);

  const openJobModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (!company) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <p>Loading company details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${company.name} - JobTrack`}>
      {/* Company Header */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-lg flex items-center justify-center p-2"
            >
              <img 
                src={company.logo} 
                alt={company.name} 
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {company.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
                <div className="badge badge-secondary text-white bg-white/20 border-none">
                  {company.industry}
                </div>
                <div className="flex items-center text-white/80">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{company.location}</span>
                </div>
              </div>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm text-white border-white/30 hover:bg-white/10"
              >
                Visit Website
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Company Jobs */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Open Positions at {company.name}
            </h2>
            <p className="text-gray-600 mb-8">
              Browse through current job opportunities and find a role that matches your skills and career goals.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {company.jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPinned className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary" onClick={() => openJobModal(job)}>
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative shadow-lg">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold mb-2">{selectedJob.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{company.name} • {selectedJob.location}</p>

            <div className="mb-6 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Job Type & Compensation</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="badge badge-outline">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {selectedJob.jobType}
                  </div>
                  <div className="badge badge-outline">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {selectedJob.salary}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brand-blue mr-2 mt-1">✔️</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <img 
                  src={selectedJob.bannerImage}
                  alt={`${selectedJob.title} banner`}
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apply Now
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CompanyDetailsPage;

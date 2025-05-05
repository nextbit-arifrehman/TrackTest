import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { companies } from "@/data/companies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Search,
  Briefcase,
  DollarSign,
  MapPin,
  X,
  ExternalLink,
} from "lucide-react";
import Layout from "@/components/Layout";

const JobsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allJobs = companies.flatMap((company) =>
    company.jobs.map((job) => ({
      job,
      companyId: company.id,
      companyName: company.name,
      companyLogo: company.logo,
      companyWebsite: company.website,
    }))
  );

  const jobTypes = [...new Set(allJobs.map((item) => item.job.jobType))];
  const locations = [...new Set(allJobs.map((item) => item.job.location))];

  useEffect(() => {
    document.title = "JobTrack - Browse Jobs";

    let filtered = [...allJobs];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.job.title.toLowerCase().includes(lowerSearch) ||
          item.companyName.toLowerCase().includes(lowerSearch) ||
          item.job.description.toLowerCase().includes(lowerSearch)
      );
    }

    if (jobTypeFilter && jobTypeFilter !== "all") {
      filtered = filtered.filter((item) => item.job.jobType === jobTypeFilter);
    }

    if (locationFilter && locationFilter !== "all") {
      filtered = filtered.filter((item) => item.job.location === locationFilter);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, jobTypeFilter, locationFilter,allJobs]);

  const openJobModal = (jobItem) => {
    setSelectedJob(jobItem);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setJobTypeFilter("");
    setLocationFilter("");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Layout title="JobTrack - Browse Jobs">
      {/* Search and Filter Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-purple py-16 px-4">
        <div className="container mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Dream Job
          </motion.h1>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search job title or company..."
                  className="pl-10 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(searchTerm || jobTypeFilter || locationFilter) && (
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="bg-white/80 text-gray-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Jobs List Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
            </h2>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No jobs found matching your criteria
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button onClick={resetFilters}>View All Jobs</Button>
            </div>
          ) : (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredJobs.map((jobItem) => (
                <motion.div
                  key={jobItem.job.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={jobItem.companyLogo}
                          alt={jobItem.companyName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-1">
                        {jobItem.job.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{jobItem.companyName}</p>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{jobItem.job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span>{jobItem.job.jobType}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>{jobItem.job.salary}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {jobItem.job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {jobItem.job.requirements.slice(0, 3).map((req, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                          >
                            {req.split(" ").slice(0, 3).join(" ")}...
                          </span>
                        ))}
                        {jobItem.job.requirements.length > 3 && (
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                            +{jobItem.job.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <Button onClick={() => openJobModal(jobItem)}>View Details</Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/companies/${jobItem.companyId}`)}
                      >
                        Company Profile
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedJob.job.title}</DialogTitle>
              <DialogDescription className="flex items-center text-sm">
                <span className="font-medium text-foreground">
                  {selectedJob.companyName}
                </span>
                <span className="mx-2">•</span>
                <span>{selectedJob.job.location}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Job Type & Compensation</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-sm bg-gray-100 py-1 px-3 rounded-full">
                    <Briefcase className="w-4 h-4 mr-1 text-gray-600" />
                    <span>{selectedJob.job.jobType}</span>
                  </div>
                  <div className="flex items-center text-sm bg-gray-100 py-1 px-3 rounded-full">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-600" />
                    <span>{selectedJob.job.salary}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{selectedJob.job.description}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <ul className="space-y-2">
                  {selectedJob.job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-brand-blue/10 text-brand-blue rounded-full p-1 mr-2 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <img
                  src={selectedJob.job.bannerImage}
                  alt={`${selectedJob.job.title} banner`}
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>

            <DialogFooter className="flex sm:justify-between">
              <DialogClose asChild>
                <Button variant="outline" className="flex items-center">
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </DialogClose>
              <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
                <a
                  href={selectedJob.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Apply Now
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default JobsPage;


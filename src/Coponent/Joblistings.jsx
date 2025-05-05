import React, { useEffect, useState } from 'react';

const JobListing = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch the data from the public folder
    fetch('/data/companies.json')
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div key={company.id} className="border p-4 rounded shadow-md">
            <img
              src={company.logo}
              alt={company.name}
              className="w-32 h-32 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
            <p className="text-gray-500">{company.location}</p>
            <a
              href={company.website}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
            <div className="mt-4">
              <h3 className="font-semibold">Job Openings:</h3>
              {company.jobs.map((job) => (
                <div key={job.id} className="mt-2">
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-gray-600">{job.location}</p>
                  <p className="text-sm">{job.salary}</p>
                  <p className="text-sm">{job.jobType}</p>
                  <p className="mt-1 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;

import React from "react";

const JobRoutePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-4 flex items-center justify-between">
        <span className="text-xl font-bold">JobRoute</span>
        <select className="border p-1">
          <option>En</option>
          <option>Fr</option>
        </select>
      </header>

      <main className="rounded-md bg-white p-4 shadow-md">
        <h1 className="mb-4 text-2xl">Accountant in Alberta</h1>
        <button className="rounded border px-3 py-1">Search Again</button>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded border p-4">
            <h2 className="mb-2 text-xl">Overview</h2>
            <p className="truncate">Content about the overview...</p>
            <button className="mt-2 text-blue-500">Read More</button>
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-2 text-xl">Info</h2>
            <p>
              <strong>Salary:</strong> $168,000 - $290,000
            </p>
            <p>
              <strong>Degree:</strong> Bachelor degree
            </p>
            {/*to-get from api*/}
            <button className="mt-2 text-blue-500">Read More</button>
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-2 text-xl">Hard/Soft Skills</h2>
            <ul>
              <li>Financial Reporting</li>
              <li>Bookkeeping</li>
              {/*to-get from api*/}
            </ul>
            <button className="mt-2 text-blue-500">Read More</button>
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-2 text-xl">Education/Training</h2>
            <p>High School Education</p>
            <p>6 years - $48,000 per year</p>
            <button className="mt-2 text-blue-500">Read More</button>
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-2 text-xl">Licensing/Certification</h2>
            <p>
              <strong>Required licensing:</strong> Pass the NCLEX-RN exam
            </p>
            <p>2 months - $3,000</p>
            <button className="mt-2 text-blue-500">Read More</button>
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-2 text-xl">Job Search/Networking</h2>
            <ul>
              <li>Networking and Internships</li>
              <li>Job Applications and Interviews</li>
              {/*to-get from api*/}
            </ul>
            <button className="mt-2 text-blue-500">Read More</button>
          </div>
        </div>

        <button className="mx-auto mt-4 block rounded border px-3 py-1">
          Download PDF
        </button>
      </main>

      <footer className="mt-4 text-center">
        <p>&copy; 2023 JobRoute. All rights reserved</p>
        <div className="mt-2">
          <a href="#" className="mx-2">
            Terms & Policies
          </a>
          <a href="#" className="mx-2">
            Privacy Policy
          </a>
          <a href="#" className="mx-2">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default JobRoutePage;

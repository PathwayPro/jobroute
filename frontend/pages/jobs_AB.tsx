import React from 'react';

const JobRoutePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="mb-4 flex justify-between items-center">
                <span className="text-xl font-bold">JobRoute</span>
                <select className="border p-1">
                    <option>En</option>
                    <option>Fr</option>
                </select>
            </header>

            <main className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl mb-4">Accountant in Alberta</h1>
                <button className="border py-1 px-3 rounded">Search Again</button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    <div className="border p-4 rounded">
                        <h2 className="text-xl mb-2">Overview</h2>
                        <p className="truncate">Content about the overview...</p>
                        <button className="mt-2 text-blue-500">Read More</button>
                    </div>

                    <div className="border p-4 rounded">
                        <h2 className="text-xl mb-2">Info</h2>
                        <p><strong>Salary:</strong> $168,000 - $290,000</p>
                        <p><strong>Degree:</strong> Bachelor degree</p>
                        {/*to-get from api*/}
                        <button className="mt-2 text-blue-500">Read More</button>
                    </div>

                    <div className="border p-4 rounded">
                        <h2 className="text-xl mb-2">Hard/Soft Skills</h2>
                        <ul>
                            <li>Financial Reporting</li>
                            <li>Bookkeeping</li>
                            {/*to-get from api*/}
                        </ul>
                        <button className="mt-2 text-blue-500">Read More</button>
                    </div>

                    <div className="border p-4 rounded">
                        <h2 className="text-xl mb-2">Education/Training</h2>
                        <p>High School Education</p>
                        <p>6 years - $48,000 per year</p>
                        <button className="mt-2 text-blue-500">Read More</button>
                    </div>

                    <div className="border p-4 rounded">
                        <h2 className="text-xl mb-2">Licensing/Certification</h2>
                        <p><strong>Required licensing:</strong> Pass the NCLEX-RN exam</p>
                        <p>2 months - $3,000</p>
                        <button className="mt-2 text-blue-500">Read More</button>
                    </div>

                    <div className="border p-4 rounded">
                        <h2 className="text-xl mb-2">Job Search/Networking</h2>
                        <ul>
                            <li>Networking and Internships</li>
                            <li>Job Applications and Interviews</li>
                            {/*to-get from api*/}
                        </ul>
                        <button className="mt-2 text-blue-500">Read More</button>
                    </div>

                </div>

                <button className="border mt-4 py-1 px-3 rounded block mx-auto">Download PDF</button>
            </main>

            <footer className="mt-4 text-center">
                <p>&copy; 2023 JobRoute. All rights reserved</p>
                <div className="mt-2">
                    <a href="#" className="mx-2">Terms & Policies</a>
                    <a href="#" className="mx-2">Privacy Policy</a>
                    <a href="#" className="mx-2">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default JobRoutePage;
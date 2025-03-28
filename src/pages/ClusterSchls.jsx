import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'

const ClusterSchls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
  const printRef = useRef();

  const [schools, setSchools] = useState([
    { slno: 1, code: '6004', name: 'G. H. S. S Kumily', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 2, code: '6059', name: 'G. H. S. S Anakara', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 3, code: '30001', name: 'G. V. H. S. S Munnar', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 4, code: '30002', name: 'G. H. S. Sothuparai', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 5, code: '30003', name: 'G. H. S. S Vaguvurrai', dataEntered: 'Yes', confirmed: 'Yes' },
    { slno: 6, code: '30006', name: 'L. F. G. H. S. Munnar', dataEntered: 'Yes', confirmed: 'Yes' },
    { slno: 7, code: '30008', name: 'G. H. S. S Devikulam', dataEntered: 'Yes', confirmed: 'Yes' },
    { slno: 8, code: '30009', name: 'G. H. S. S Marayoor', dataEntered: 'Yes', confirmed: 'Yes' },
    { slno: 9, code: '30010', name: 'S. H. H. S. Kanthalloor', dataEntered: 'Yes', confirmed: 'No' },
  ]);
  const [filteredSchools, setFilteredSchools] = useState(schools);

  useEffect(() => {
    const initialSearchTerm = searchParams.get('code') || '';
    setSearchTerm(initialSearchTerm);
    filterSchools(initialSearchTerm);
  }, [searchParams, schools]);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearchParams(new URLSearchParams({ code: newSearchTerm }));
    filterSchools(newSearchTerm);
  };

  const filterSchools = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const results = schools.filter(school =>
      school.code.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredSchools(results);
  };

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = printRef.current.innerHTML;

    document.body.innerHTML = `
      <style type="text/css" media="print">
        @page {
          size: auto;
          margin: 0;
        }
        body {
          padding: 20px;
          font-family: sans-serif;
        }
        .print-table {
          width: 100%;
          border-collapse: collapse;
        }
        .print-table th, .print-table td {
          padding: 8px;
          text-align: left;
        }
        .print-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .print-title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: bold;
        }
        .print-title {
          display: block !important;
        }
        .no-print {
          display: none !important;
        }
      </style>
      ${printContents}
    `;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Cluster Schools
            </h2>
            <button 
              onClick={handlePrint}
              className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full"
            >
              Print
            </button>
          </div>
          <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
            <input
              type="text"
              placeholder="Search School Code..."
              className="w-full bg-transparent outline-none text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div ref={printRef}>
            <div className="print-title hidden">Cluster School List Report</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left  border-separate border-spacing-y-2 print-table">
                <thead>
                  <tr className="text-gray-700 ">
                    <th className="p-2 md:p-3">Sl No</th>
                    <th className="p-2 md:p-3">School Code</th>
                    <th className="p-2 md:p-3">School Name</th>
                    <th className="p-2 md:p-3">Data Entered</th>
                    <th className="p-2 md:p-3">Confirmed</th>
                    <th className="p-2 md:p-3 no-print">Status</th>
                    <th className="p-2 md:p-3 no-print">Reset</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((school) => (
                      <tr key={school.slno} className="hover:bg-gray-200 ">
                        <td className="p-2 md:p-3">{school.slno}</td>
                        <td className="p-2 md:p-3">{school.code}</td>
                        <td className="p-2 md:p-3">{school.name}</td>
                        <td className="p-2  md:p-3">{school.dataEntered}</td>
                        <td className="p-2 md:p-3">{school.confirmed}</td>
                        <td className="p-2 text-blue-500 md:p-3 no-print">
                          {school.confirmed === 'Yes' ? 'Published' : 'Pending'}
                        </td>
                        <td className="p-2 md:p-3 no-print">
                          <i className="text-blue-500 fa-solid fa-arrow-rotate-right"></i>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-gray-600">
                        No schools found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClusterSchls
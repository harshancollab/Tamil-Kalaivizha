import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { allClusterSchoolsAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js'

const ClusterSchls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'code');
  const printRef = useRef();

  // State for schools data
  const [schools, setSchools] = useState([
    { slno: 1, code: '6004', name: 'G. H. S. S Kumily', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 2, code: '6059', name: 'G. H. S. S Anakara', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 3, code: '30001', name: 'G. V. H. S. S Munnar', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 4, code: '30002', name: 'G. H. S. Sothuparai', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 5, code: '30003', name: 'G. H. S. S Vaguvurrai', dataEntered: 'Yes', confirmed: 'Yes' },
    { slno: 6, code: '30006', name: 'L. F. G. H. S. Munnar', dataEntered: 'Yes', confirmed: 'Yes' },
    { slno: 7, code: '30008', name: 'G. H. S. S Devikulam', dataEntered: 'Yes', confirmed: 'Yes' },
    { slno: 8, code: '30009', name: 'G. H. S. S Marayoor', dataEntered: 'Yes', confirmed: 'Yes' },
    { slno: 9, code: '30010', name: 'S. H. H. S. Kanthaloor', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 10, code: '3000', name: 'S. H. H. S. Kanthalloor', dataEntered: 'Yes', confirmed: 'No' },
    { slno: 11, code: '0010', name: 'S. H. H. S. anthalloor', dataEntered: 'Yes', confirmed: 'No' },
  ]);
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getAllClusterSchools();
  }, []);

  const getAllClusterSchools = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        setLoading(true);
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 10;
          if (progress <= 90) {
            setLoadingProgress(progress);
          } else {
            clearInterval(progressInterval);
          }
        }, 200);
        
        const result = await allClusterSchoolsAPI(reqHeader)
        clearInterval(progressInterval);
        setLoadingProgress(100);
        
        if (result.status === 200) {
          const apiSchools = result.data.map((school, index) => ({
            slno: index + 1,
            code: school.code || '',
            name: school.name || '',
            dataEntered: school.dataEntered ? 'Yes' : 'No',
            confirmed: school.confirmed ? 'Yes' : 'No'
          }));
          
          setSchools(apiSchools.length > 0 ? apiSchools : schools);
          setFilteredSchools(apiSchools.length > 0 ? apiSchools : schools);
        } else {
          setSchools(schools);
          setFilteredSchools(schools);
        }
        
        // Add a small delay to show 100% progress before hiding the loader
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error(err);
        setSchools(schools);
        setFilteredSchools(schools);
        setError("An error occurred while fetching schools. Using default data.");
        setLoading(false);
      }
    } else {
      setSchools(schools);
      setFilteredSchools(schools);
      setLoading(false);
    }
  };

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
    setCurrentPage(1); // Reset to first page when searching
  };

  const filterSchools = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const results = schools.filter(school =>
      school.code.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredSchools(results);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredSchools.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Dynamically adjust number of page buttons based on screen size
    const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;
    
    if (totalPages <= maxPageNumbersToShow) {
      // Show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited page numbers with dots
      if (currentPage <= 2) {
        // Near the start
        for (let i = 1; i <= 3; i++) {
          if (i <= totalPages) pageNumbers.push(i);
        }
        if (totalPages > 3) {
          pageNumbers.push('...');
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 1) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          if (i > 0) pageNumbers.push(i);
        }
      } else {
        // Middle
        pageNumbers.push(1);
        if (currentPage > 3) pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        if (currentPage < totalPages - 2) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // PDF generation function using html2pdf.js
  const generatePDF = () => {
    // Create a clone of the table for PDF generation
    const pdfContent = document.createElement('div');
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = "Cluster School List";
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(titleElement);

    // Create table clone
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Sl No', 'School Code', 'School Name', 'Data Entered', 'Confirmed'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.style.border = '1px solid #ddd';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f2f2f2';
      th.style.fontWeight = 'bold';
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    filteredSchools.forEach((school) => {
      const row = document.createElement('tr');
      
      // Add cells
      const cellData = [
        school.slno,
        school.code || "-",
        school.name || "-",
        school.dataEntered || "-",
        school.confirmed || "-"
      ];
      
      cellData.forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        td.style.textAlign = 'center';
        row.appendChild(td);
      });
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    pdfContent.appendChild(table);
    
    // PDF filename
    const fileName = `Cluster_Schools_List.pdf`;
    
    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save();
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex flex-col md:flex-row min-h-screen">
          <Dash />
          <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
            <div className="text-center w-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Loading schools data...</p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{loadingProgress}% complete</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Cluster School List 
            </h2>
            <button 
              onClick={generatePDF}
              className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full"
            >
              Print
            </button>
          </div>
          
          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
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
          
          <div ref={printRef} className="w-full">
            <div className="overflow-x-auto mt-4 -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full  border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      
                      <th className="p-2 md:p-3">School Code & Name</th>
                      <th className="p-2 md:p-3">Data Entered</th>
                      <th className="p-2 md:p-3">Confirmed</th>
                      {/* <th className="p-2 md:p-3">Status</th> */}
                      <th className="p-2 md:p-3">Reset</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm text-center">
                    {currentItems.length > 0 ? (
                      currentItems.map((school) => (
                        <tr key={school.slno} className="hover:bg-gray-200">
                          <td className="p-2 md:p-3">{school.slno}</td>
                          <td className="p-2 md:p-3">{school.code} - {school.name}</td>
                          <td className="p-2 md:p-3">{school.dataEntered}</td>
                          <td className="p-2 md:p-3">{school.confirmed}</td>
                          {/* <td className="p-2 text-blue-500 md:p-3">
                            {school.confirmed === 'Yes' ? 'Publish' : 'Unpublish'}
                          </td> */}
                          <td className="p-2 md:p-3">
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
              
              {/* Enhanced Responsive Pagination with icons */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                {/* Showing X of Y rows */}
                <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                  {filteredSchools.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredSchools.length)} of ${filteredSchools.length} rows` : '0 rows'}
                </div>
                
                {/* Pagination Controls */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                  {/* Previous Button with icon */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                  >
                    <i className="fa-solid fa-angle-right transform rotate-180"></i>
                    <span className="hidden sm:inline p-1">Previous</span>
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {renderPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => page !== '...' && handlePageChange(page)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${
                          currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
                        } ${page === '...' ? 'pointer-events-none' : ''}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  {/* Next Button with icon */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
                  >
                    <span className="hidden sm:inline p-1">Next</span>
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClusterSchls
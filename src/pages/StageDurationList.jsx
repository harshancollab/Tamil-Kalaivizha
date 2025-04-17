import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllStageDurationsAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js'

const StageDurationList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
  const printRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState("ALL Festival");
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const navigate = useNavigate();
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Festival mappings
  const festivalOptions = [
    { value: "ALL Festival", display: "ALL Festival" },
    { value: "UP", display: "UP Kalaivizha", range: { min: 300, max: 399 } },
    { value: "Lp", display: "LP Kalaivizha", range: { min: 400, max: 499 } },
    { value: "Hs", display: "HS Kalaivizha", range: { min: 500, max: 599 } },
    { value: "Hss", display: "HSS Kalaivizha", range: { min: 600, max: 699 } }
  ];
  
  const dummyData = [
    { 
      slno: 1, 
      code: '304', 
      name: 'Story Writing', 
      dataEntered: 'Yes', 
      confirmed: 'No', 
      time: '90 min', 
      participants: 2, 
      completionTime: '1 hour 30 min', 
      stage: 'Stage A', 
      date: '28/03/2025', 
      stageTime: '10:30 AM' 
    },
    { 
      slno: 2, 
      code: '402', 
      name: 'Group Song', 
      dataEntered: 'Yes', 
      confirmed: 'Yes', 
      time: '60 min', 
      participants: 4, 
      completionTime: '55 min', 
      stage: 'Stage B', 
      date: '28/03/2025', 
      stageTime: '11:00 AM' 
    },
    { 
      slno: 3, 
      code: '501', 
      name: 'Drawing', 
      dataEntered: 'Yes', 
      confirmed: 'No', 
      time: '120 min', 
      participants: 3, 
      completionTime: '1 hour 45 min', 
      stage: 'Stage C', 
      date: '29/03/2025', 
      stageTime: '09:00 AM' 
    },
    { 
      slno: 4, 
      code: '601', 
      name: 'Debate', 
      dataEntered: 'Yes', 
      confirmed: 'Yes', 
      time: '45 min', 
      participants: 1, 
      completionTime: '40 min', 
      stage: 'Stage A', 
      date: '29/03/2025', 
      stageTime: '02:15 PM' 
    },
    { 
      slno: 5, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno: 6, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno: 7, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno: 8, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno: 9, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno: 10, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno: 11, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno: 12, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno:13, 
      code: '302', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    }
  ];


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


  useEffect(() => {
    fetchStageDurations();
  }, []);

  const fetchStageDurations = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      
      let apiData = [];
      let useOnlyDummyData = false;
      
      try {
        if (token) {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          };
          
          const result = await getAllStageDurationsAPI(reqHeader);
          
          if (result.status === 200) {
            apiData = result.data.map((item, index) => ({
              slno: index + 1,
              code: item.itemCode,
              name: item.itemName,
              time: item.time,
              participants: item.participants,
              completionTime: item.completionTime,
              stage: item.stage || 'TBD',
              date: item.date || 'Pending',
              stageTime: item.timeSecond || 'TBD'
            }));
          }
        }
      } catch (apiError) {
        console.error("API call failed, using only dummy data:", apiError);
        useOnlyDummyData = true;
      }
      
      if (apiData.length > 0 && !useOnlyDummyData) {
        setSchools([...apiData, ...dummyData]);
      } else {
        setSchools(dummyData);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error in fetchStageDurations:", err);
      setError("Could not load data. Using sample data instead.");
      
      setSchools(dummyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialSearchTerm = searchParams.get('code') || '';
    setSearchTerm(initialSearchTerm);
    
    applyFilters(initialSearchTerm, selectedFestival);
  }, [searchParams, schools, selectedFestival]);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearchParams({ code: newSearchTerm, festival: selectedFestival });
    applyFilters(newSearchTerm, selectedFestival);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFestivalChange = (e) => {
    const festival = e.target.value;
    setSelectedFestival(festival);
    setSearchParams({ code: searchTerm, festival });
    applyFilters(searchTerm, festival);
    setCurrentPage(1); // Reset to first page when changing festival
  };

  const applyFilters = (term, festival) => {
    if (!schools.length) return;
    
    let festivalFiltered = [];
    
    if (festival !== "ALL Festival") {
      // Find the festival option with the matching value
      const festivalOption = festivalOptions.find(option => option.value === festival);
      
      if (festivalOption && festivalOption.range) {
        // Filter by festival code range
        festivalFiltered = schools.filter(item => {
          const itemCode = parseInt(item.code);
          return itemCode >= festivalOption.range.min && itemCode <= festivalOption.range.max;
        });
      } else {
        festivalFiltered = [...schools]; // No matching festival range found
      }
    } else {
      festivalFiltered = [...schools]; // "ALL Festival" selected
    }

    if (term) {
      const lowercasedTerm = term.toLowerCase();
      const results = festivalFiltered.filter(school =>
        school.code.toLowerCase().includes(lowercasedTerm) ||
        school.name.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredSchools(results);
    } else {
      setFilteredSchools(festivalFiltered);
    }

    setFilteredSchools(prevFiltered => 
      prevFiltered.map((item, index) => ({
        ...item,
        slno: index + 1
      }))
    );
  };

  const getPrintTitle = () => {
    const festival = festivalOptions.find(option => option.value === selectedFestival);
    if (festival) {
      if (festival.value === "ALL Festival") {
        return "ALL Festival - Stage Duration List";
      } else {
        return `${festival.display.split(" ")[0]} Festival - Stage Duration List`;
      }
    }
    return "Festival - Stage Duration List";
  };

  const handlePrint = () => {
    // Create a new div for PDF content
    const pdfContent = document.createElement('div');
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = getPrintTitle();
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
    
    const headers = [
      'Sl No', 
      'Item Code', 
      'Item Name', 
      'Time', 
      'Participants', 
      'Completion Time', 
      'Stage', 
      'Date', 
      'Time'
    ];
    
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
    
    filteredSchools.forEach((school, index) => {
      const row = document.createElement('tr');
      
      // Add cells
      const cellData = [
        index + 1,
        school.code || "-",
        school.name || "-",
        school.time || "-",
        school.participants || "-",
        school.completionTime || "-",
        school.stage || "-",
        school.date || "-",
        school.stageTime || "-"
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
    const fileName = `${selectedFestival.replace(/ /g, '_')}_Stage_Duration_List.pdf`;
    
    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // Use landscape for wider tables
    };
    
    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchParams(new URLSearchParams({ festival: selectedFestival }));
    applyFilters('', selectedFestival);
    setCurrentPage(1); // Reset to first page when clearing search
  };

  // Helper function to get display name for a festival value
  const getFestivalDisplayName = (value) => {
    const festival = festivalOptions.find(option => option.value === value);
    return festival ? festival.display : value;
  };

  const handleAddClick = () => {
    navigate('/stage-duration');
  };
  
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-wide">
              Stage Duration List
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button onClick={handleAddClick} className="text-blue-500 border border-blue-500 py-2 px-6 rounded-full flex items-center">
                Add Stage Duration
              </button>
              <div className="relative w-full sm:w-40 md:w-48">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                  aria-label="Select Festival"
                >
                  {festivalOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.display}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <button 
                onClick={handlePrint}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-6 md:px-8 py-2 rounded-full text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Print Stage Duration List"
              >
                Print
              </button>
            </div>
          </div>
          
          {/* Search bar with clear button */}
          <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
            <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
              <input
                type="text"
                placeholder="Search Item Code or Name..."
                className="w-full bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search by item code or name"
              />
              <div className="text-gray-500">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
           
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-4">
              <p className="flex items-center">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                {error}
              </p>
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto rounded-lg bg-white">
                <div ref={printRef} className="min-w-full">
                  <table className="min-w-full text-center">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 z-10">Sl No</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item Code</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item Name</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Time</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Participants</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Completion Time</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Stage</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Date</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((school, index) => (
                          <tr key={school.slno} className="hover:bg-gray-50 b text-gray-700">
                            <td className="p-2 md:p-3 text-xs md:text-sm bg-white z-10">{indexOfFirstItem + index + 1}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.code}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.name}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm">{school.time}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm">{school.participants}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.completionTime}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm">{school.stage}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.date}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm">{school.stageTime}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="p-6 text-center text-gray-600">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <i className="fa-solid fa-search text-2xl text-gray-400"></i>
                              <p>No items found for {getFestivalDisplayName(selectedFestival)}</p>
                              {searchTerm && (
                                <button
                                  onClick={clearSearch}
                                  className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                                >
                                  Clear search
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
          )}
        </div>
      </div>
    </>
  );
};

export default StageDurationList;
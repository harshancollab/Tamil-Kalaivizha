import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

// import { getAllFestivalParticipantsAPI } from '../services/allAPI'; 

const FestivalWisepat = () => {
  // Dummy data for development and fallback
  const dummyData = [
    { regNo: "301", name: "Arun Kumar", gender: "Boy", class: "5", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "301" },
    { regNo: "002", name: "Priya Nair", gender: "girl", class: "4", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "304" },
    { regNo: "401", name: "Rahul Menon", gender: "Boy", class: "3", schoolCode: "002", schoolName: "St. Mary's LP School Kochi", itemCode: "401" },
    { regNo: "50", name: "Dev Prakash", gender: "Boy", class: "7", schoolCode: "003", schoolName: "Model HS Kozhikode", itemCode: "503" },
    { regNo: "0101", name: "Meera Suresh", gender: "girl", class: "11", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "601" },
    { regNo: "601", name: "Nithin Rajan", gender: "Boy", class: "12", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "606" },
    { regNo: "3001", name: "Kavya Mohan", gender: "girl", class: "5", schoolCode: "005", schoolName: "Govt. UP School Kollam", itemCode: "302" },
    { regNo: "401", name: "Sajeev Thomas", gender: "Boy", class: "2", schoolCode: "006", schoolName: "Little Flower LP School Alappuzha", itemCode: "402" },
    { regNo: "601", name: "Lakshmi Pillai", gender: "girl", class: "11", schoolCode: "010", schoolName: "Don Bosco HSS Idukki", itemCode: "602" },
    { regNo: "305", name: "Vijay Menon", gender: "Boy", class: "6", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "305" },
    { regNo: "306", name: "Shreya Nair", gender: "girl", class: "4", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "306" },
    { regNo: "403", name: "Kiran Joseph", gender: "Boy", class: "3", schoolCode: "002", schoolName: "St. Mary's LP School Kochi", itemCode: "403" },
    { regNo: "502", name: "Divya Raj", gender: "girl", class: "8", schoolCode: "003", schoolName: "Model HS Kozhikode", itemCode: "502" },
    { regNo: "504", name: "Arjun Prakash", gender: "Boy", class: "7", schoolCode: "003", schoolName: "Model HS Kozhikode", itemCode: "504" }
  ];

  const [Alllist, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const printRef = useRef();
  
  // Get parameters from URL or use defaults
  const selectedFestival = searchParams.get('festival') || "All Festival";
  const searchTerm = searchParams.get('search') || '';
  const searchField = searchParams.get('field') || 'gender';
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  console.log(Alllist);

  useEffect(() => {
    getAllitemise();
  }, []);

  // Filter the list based on item code ranges according to selected festival
  useEffect(() => {
    if (Alllist.length > 0) {
      const filtered = selectedFestival === "All Festival" 
        ? Alllist 
        : Alllist.filter(item => {
            // Check if itemCode exists and is a valid value
            if (!item.itemCode) return false;
            
            // Convert to integer if it's a string with possible spaces
            const itemCode = parseInt(item.itemCode.trim());
            
            // Skip items with invalid codes
            if (isNaN(itemCode)) return false;
            
            // Filter based on item code ranges that match the festival type
            if (selectedFestival === "UP Kalaivizha") {
              return itemCode >= 300 && itemCode < 400;
            } else if (selectedFestival === "LP Kalaivizha") {
              return itemCode >= 400 && itemCode < 500;
            } else if (selectedFestival === "HS Kalaivizha") {
              return itemCode >= 500 && itemCode < 600;
            } else if (selectedFestival === "HSS Kalaivizha") {
              return itemCode >= 600 && itemCode < 700;
            }
            return true;
          });
      
      // Apply search filter if search term exists
      const searchFiltered = searchTerm.trim() === '' 
        ? filtered 
        : filtered.filter(item => {
            const fieldValue = item[searchField]?.toString()?.toLowerCase() || '';
            return fieldValue.includes(searchTerm.toLowerCase());
          });
      
      setFilteredList(searchFiltered);
      // Reset to first page when changing filters
      setCurrentPage(1);
    }
  }, [Alllist, selectedFestival, searchTerm, searchField]);

  const getAllitemise = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        // Replace with your actual API call when available
        // const result = await getAllFestivalParticipantsAPI(reqHeader);
        // if (result?.status === 200) {
        //   setList(result.data);
        // } else {
        //   setList(dummyData);
        // }
        
        // Using dummy data for now
        setList(dummyData);
      } catch (err) {
        console.log(err);
        // Use dummy data if API throws an error
        setList(dummyData);
      }
    } else {
      // Use dummy data if no token is available
      setList(dummyData);
    }
  };

  const handleFestivalChange = (e) => {
    // Update URL when festival changes
    updateSearchParams('festival', e.target.value);
    // Reset to first page when changing festival
    setCurrentPage(1);
  };
  
  const handleSearchChange = (e) => {
    // Update URL when search term changes
    updateSearchParams('search', e.target.value);
    // Reset to first page when searching
    setCurrentPage(1);
  };
  
  
  
  // Helper function to update search params
  const updateSearchParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === '' || value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

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

  // Generate the appropriate title based on the selected festival
  const getPrintTitle = () => {
    switch(selectedFestival) {
      case "UP Kalaivizha":
        return "UP Tamil Kalaivizha - List of Participants";
      case "LP Kalaivizha":
        return "LP Tamil Kalaivizha - List of Participants";
      case "HS Kalaivizha":
        return "HS Tamil Kalaivizha - List of Participants";
      case "HSS Kalaivizha":
        return "HSS Tamil Kalaivizha - List of Participants";
      default:
        return "ALL Festivals - List of Participants";
    }
  };

  // PDF generation using html2pdf which has better browser compatibility
  const generatePDF = () => {
    // Create a clone of the table for PDF generation
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
    
    const headers = ['Sl No', 'Reg No', 'Name', 'Gender', 'Class', 'School Code', 'School Name'];
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
    
    // Use the full filtered list for PDF, not just current page
    filteredList.forEach((item, index) => {
      const row = document.createElement('tr');
      
      // Add cells
      const cellData = [
        index + 1,
        item.regNo || "-",
        item.name || "-",
        item.gender || "-",
        item.class || "-",
        item.schoolCode || "-",
        item.schoolName || "-"
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
    const fileName = `${selectedFestival.replace(/ /g, '_')}_Participants_List.pdf`;
    
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

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participants List (Festival Wise)
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                >
                  <option value="All Festival">All Festival</option>
                  <option value="UP Kalaivizha">UP Kalaivizha</option>
                  <option value="LP Kalaivizha">LP Kalaivizha</option>
                  <option value="HS Kalaivizha">HS Kalaivizha</option>
                  <option value="HSS Kalaivizha">HSS Kalaivizha</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <button
                onClick={generatePDF}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
              >
                Print
              </button>
            </div>
          </div>
          
          {/* Search Section with Field Selector */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
              <input
                type="text"
                placeholder={`Search by ${searchField === 'gender' ? 'Gender' : searchField === 'name' ? 'Name' : 'School Name'}...`}
                className="w-full bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="text-gray-500 hover:text-gray-700">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            
      
          </div>
          
          <div ref={printRef} className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0 ">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                  <thead className="text-xs sm:text-sm">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      <th className="p-2 md:p-3">Reg No</th>
                      <th className="p-2 md:p-3">Name</th>
                      <th className="p-2 md:p-3">Gender</th>
                      <th className="p-2 md:p-3">Class</th>
                      <th className="p-2 md:p-3">School code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {currentItems && currentItems.length > 0 ? (
                      currentItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{indexOfFirstItem + index + 1}</td>
                          <td className="p-2 md:p-3">{item.regNo || "-"}</td>
                          <td className="p-2 md:p-3">{item.name || "-"}</td>
                          <td className="p-2 md:p-3">{item.gender || "-"}</td>
                          <td className="p-2 md:p-3">{item.class || "-"}</td>
                          <td className="p-2 md:p-3">{item.schoolCode || "-"}</td>
                          <td className="p-2 md:p-3">{item.schoolName || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-100">
                        <td colSpan="7" className="p-2 md:p-3">No participants found with the selected criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Pagination Controls */}
          {filteredList.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
              {/* Showing X of Y rows */}
              <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                {`${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredList.length)} of ${filteredList.length} rows`}
              </div>
              
              {/* Pagination Buttons */}
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
          )}
        </div>
      </div>
    </>
  )
}

export default FestivalWisepat
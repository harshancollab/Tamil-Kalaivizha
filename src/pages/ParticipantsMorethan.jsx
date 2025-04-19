import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const ParticipantsMorethan = () => {
  const [participants, setParticipants] = useState([])
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Get params from URL, with defaults if not present
  const selectedItems = searchParams.get('items') || "ALL";
  const selectedFestival = searchParams.get('festival') || "ALL Festival";
  const schoolCodeSearch = searchParams.get('schoolCode') || "";

  // Dummy data with item codes matching festival categories
  const dummyParticipants = [
    {
      slno:1,
      regNo: "UP001",
      name: "Amal Kumar",
      gender: "Male",
      class: "5",
      schoolCode: "40075",
      schoolName: "G. M. R. S. Peermedu",
      itemCode: "301",
      itemCount: 3
    },
    {
      slno:2,
      regNo: "UP002",
      name: "Meera Nair",
      gender: "Female",
      class: "4",
      schoolCode: "30075",
      schoolName: "G. M. R. S. Peermedu",
      itemCode: "302",
      itemCount: 2
    },
    {
      slno:3,
      regNo: "LP001",
      name: "Rohit Menon",
      gender: "Male",
      class: "7",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "401",
      itemCount: 4
    },
    {
      slno:4,
      regNo: "LP002",
      name: "Anjali Raj",
      gender: "Female",
      class: "6",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5
    },
    {
      slno:5,
      regNo: "LP002",
      name: "Anjali Raj",
      gender: "Female",
      class: "6",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5
    },
    {
      slno:6,
      regNo: "LP002",
      name: "Anjali Raj",
      gender: "Female",
      class: "6",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5
    },
    {
      slno:7,
      regNo: "LP002",
      name: "Anjali Raj",
      gender: "Female",
      class: "6",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5
    },
    {
      slno:8,
      regNo: "LP002",
      name: "Anjali Raj",
      gender: "Female",
      class: "6",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5
    },
    {
      slno:9,
      regNo: "HS001",
      name: "Vishnu Prasad",
      gender: "Male",
      class: "9",
      schoolCode: "30043",
      schoolName: "G. H. S. S. Anakara",
      itemCode: "501",
      itemCount: 1
    },
    {
      slno:10,
      regNo: "HS002",
      name: "Lakshmi Suresh",
      gender: "Female",
      class: "8",
      schoolCode: "30043",
      schoolName: "G. H. S. S. Anakara",
      itemCode: "502",
      itemCount: 3
    },
    {
      slno:11,
      regNo: "HSS001",
      name: "Arun Thomas",
      gender: "Male",
      class: "11",
      schoolCode: "30083",
      schoolName: "G. H. S. Udumbhancola",
      itemCode: "601",
      itemCount: 2
    },
    {
      slno:12,
      regNo: "HSS002",
      name: "Divya Mohan",
      gender: "Female",
      class: "12",
      schoolCode: "30083",
      schoolName: "G. H. S. Udumbhancola",
      itemCode: "605",
      itemCount: 4
    }
  ];

  useEffect(() => {
    getAllParticipants();
    // Set the search term from URL parameters when component loads
    if (schoolCodeSearch) {
      setSearchTerm(schoolCodeSearch);
    }
  }, [schoolCodeSearch]);
  
  const getAllParticipants = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await (reqHeader);
        if (result?.status === 200) {
          setParticipants(result.data);
        } else {
          // Fall back to dummy data if API call fails
          setParticipants(dummyParticipants);
        }
      } catch (err) {
        console.log(err);
        // Fall back to dummy data if API call fails
        setParticipants(dummyParticipants);
      }
    } else {
      // Use dummy data when no token is available
      setParticipants(dummyParticipants);
    }
  };

  const handleItemsChange = (e) => {
    // Reset pagination when filters change
    setCurrentPage(1);
    // Update URL when items selection changes
    setSearchParams({ 
      items: e.target.value,
      festival: selectedFestival,
      schoolCode: searchTerm
    });
  };

  const handleFestivalChange = (e) => {
    // Reset pagination when filters change
    setCurrentPage(1);
    // Update URL when festival changes
    setSearchParams({ 
      items: selectedItems,
      festival: e.target.value,
      schoolCode: searchTerm
    });
  };
  
  // Handle search input change - update URL immediately as user types
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Reset to first page
    setCurrentPage(1);
    // Update URL params
    setSearchParams({
      items: selectedItems,
      festival: selectedFestival,
      schoolCode: newSearchTerm
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  
  // Filter the list based on selected criteria
  const filteredParticipants = participants.filter(participant => {
    // Filter by number of items
    let passesItemFilter = true;
    if (selectedItems !== "ALL") {
      const itemCount = participant.itemCount || 0;
      passesItemFilter = itemCount > parseInt(selectedItems);
    }
    
    // Filter by festival using the item code ranges
    let passesFestivalFilter = true;
    if (selectedFestival !== "ALL Festival") {
      const itemCode = parseInt(participant.itemCode || "0");
      
      switch (selectedFestival) {
        case "UP":
          passesFestivalFilter = itemCode >= 300 && itemCode < 400;
          break;
        case "Lp":
          passesFestivalFilter = itemCode >= 400 && itemCode < 500;
          break;
        case "Hs":
          passesFestivalFilter = itemCode >= 500 && itemCode < 600;
          break;
        case "Hss":
          passesFestivalFilter = itemCode >= 600 && itemCode < 700;
          break;
        default:
          passesFestivalFilter = true;
      }
    }
    
    // Filter by school code
    let passesSchoolCodeFilter = true;
    if (searchTerm && searchTerm.trim() !== '') {
      passesSchoolCodeFilter = participant.schoolCode && 
        participant.schoolCode.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    return passesItemFilter && passesFestivalFilter && passesSchoolCodeFilter;
  }).map((participant, index) => ({
    ...participant,
    slNo: index + 1
  }));
  
  // Current items with pagination
  const currentItems = filteredParticipants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);

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

  // Generate appropriate title based on selections
  const getPrintTitle = () => {
    let festivalText;
    switch(selectedFestival) {
      case "UP":
        festivalText = "UP Kalaivizha";
        break;
      case "Lp":
        festivalText = "LP Kalaivizha";
        break;
      case "Hs":
        festivalText = "HS Kalaivizha";
        break;
      case "Hss":
        festivalText = "HSS Kalaivizha";
        break;
      default:
        festivalText = "ALL Festival";
    }
    
    const itemsText = selectedItems === "ALL" ? 
      "" : ` - More Than ${selectedItems} Items`;
    
    const schoolCodeText = searchTerm ? ` - School Code: ${searchTerm}` : '';
    
    return `Participants List ${festivalText}${itemsText}${schoolCodeText} Report`;
  };

  // New PDF generation function using html2pdf
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
    
    filteredParticipants.forEach((participant) => {
      const row = document.createElement('tr');
      
      // Add cells
      const cellData = [
        participant.slNo,
        participant.regNo || "-",
        participant.name || "-",
        participant.gender || "-",
        participant.class || "-",
        participant.schoolCode || "-",
        participant.schoolName || "-"
      ];
      
      cellData.forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        td.style.textAlign = 'left';
        row.appendChild(td);
      });
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    pdfContent.appendChild(table);
    
    // PDF filename
    let festivalName = selectedFestival === "ALL Festival" ? "All_Festivals" : selectedFestival;
    const itemsText = selectedItems === "ALL" ? "All_Items" : `More_Than_${selectedItems}_Items`;
    const schoolCodePart = searchTerm ? `_SchoolCode_${searchTerm}` : '';
    const fileName = `Participants_${festivalName}_${itemsText}${schoolCodePart}.pdf`;
    
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

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header section with title and controls */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participants List more than one item
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleItemsChange}
                  value={selectedItems}
                >
                  <option value="ALL">Select no of item</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                >
                  <option value="ALL Festival">ALL Festival</option>
                  <option value="UP">UP Kalaivizha</option>
                  <option value="Lp">LP Kalaivizha</option>
                  <option value="Hs">HS Kalaivizha</option>
                  <option value="Hss">HSS Kalaivizha</option>
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
          
          {/* Simple search input that updates as user types */}
          <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
            <input
              type="text"
              placeholder="Search School Code..."
              className="w-full bg-transparent outline-none text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="text-gray-500">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
          
          <div ref={printRef} className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0 ">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                  <thead className="text-xs sm:text-sm">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      <th className="p-2 md:p-3">Reg No</th>
                      <th className="p-2 md:p-3">No of Items</th>
                      <th className="p-2 md:p-3">Name</th>
                     
                     
                      <th className="p-2 md:p-3">School code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {currentItems.length > 0 ? (
                      currentItems.map((participant, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{participant.slNo}</td>
                          <td className="p-2 md:p-3">{participant.regNo || "-"}</td>
                          <td className="p-2 md:p-3">{participant.itemCount || "-"}</td>
                          <td className="p-2 md:p-3">{participant.name || "-"}</td>
                        
                       
                          <td className="p-2 md:p-3">{participant.schoolCode || "-"}</td>
                          <td className="p-2 md:p-3">{participant.schoolName || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-3 text-center text-gray-500">
                          {searchTerm ? (
                            `No records found for School Code: "${searchTerm}"`
                          ) : (
                            `No records found for ${selectedFestival === "ALL Festival" ? "All Festivals" : selectedFestival} 
                            ${selectedItems !== "ALL" ? ` with more than ${selectedItems} items` : ""}`
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {filteredParticipants.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                  {/* Showing X of Y rows */}
                  <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                    {filteredParticipants.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredParticipants.length)} of ${filteredParticipants.length} rows` : '0 rows'}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParticipantsMorethan
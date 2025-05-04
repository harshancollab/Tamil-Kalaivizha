import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const SParticipateMorethan = () => {
  const [participants, setParticipants] = useState([])
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('schoolCode') || '');
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // State for tooltip hover
  const [showTooltip, setShowTooltip] = useState(null);
  
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
      itemCount: 3,
      district: "Idukki",
      subDistrict: "Munnar",
      items: ["301-Story Telling", "302-Mono Act", "303-Fancy Dress"]
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
      itemCount: 2,
      district: "Idukki",
      subDistrict: "Adimali",
      items: ["302-Mono Act", "304-Music"]
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
      itemCount: 4,
      district: "Palakkad",
      subDistrict: "Chittur",
      items: ["401-Group Dance", "402-Solo Dance", "405-Painting", "408-Essay"]
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
      itemCount: 5,
      district: "Palakkad",
      subDistrict: "Pattambi",
      items: ["403-Singing", "405-Painting", "407-Poetry", "410-Quiz", "412-Speech"]
    },
    {
      slno:5,
      regNo: "LP003",
      name: "Ravi Kumar",
      gender: "Male",
      class: "5",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5,
      district: "Ernakulam",
      subDistrict: "",
      items: ["401-Group Dance", "403-Singing", "405-Painting", "406-Drawing", "409-Story Writing"]
    },
    {
      slno:6,
      regNo: "LP004",
      name: "Sneha Mathew",
      gender: "Female",
      class: "7",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5,
      district: "Kozhikode",
      subDistrict: "vatakara",
      items: ["402-Solo Dance", "404-Classical Music", "407-Poetry", "410-Quiz", "412-Speech"]
    },
    {
      slno:7,
      regNo: "LP005",
      name: "Anoop Thomas",
      gender: "Male",
      class: "6",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5,
      district: "Wayanad",
      subDistrict: "",
      items: ["403-Singing", "406-Drawing", "408-Essay", "411-Debate", "412-Speech"]
    },
    {
      slno:8,
      regNo: "LP006",
      name: "Lakshmi S",
      gender: "Female",
      class: "7",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5,
      district: "Idukki",
      subDistrict: "Kattappana",
      items: ["401-Group Dance", "404-Classical Music", "407-Poetry", "409-Story Writing", "412-Speech"]
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
      itemCount: 3,
      items: ["501-Elocution", "503-Classical Dance", "507-Science Quiz"]
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
      itemCount: 3,
      items: ["502-Debate", "504-Folk Dance", "506-Art"]
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
      itemCount: 4,
      district: "Palakkad",
      subDistrict: "Mannarkkad",
      items: ["601-Speech", "603-Drama", "605-Poetry", "607-Essay Writing"]
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
      itemCount: 4,
      district: "Idukki",
      subDistrict: "Nedumkandam",
      items: ["602-Debate", "604-Classical Dance", "606-Western Dance", "608-Quiz"]
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

  // Helper function to update URL params while keeping existing params
  const updateUrlParams = (newParams) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...newParams };

    // Remove empty params
    Object.keys(updatedParams).forEach(key => {
      if (updatedParams[key] === '') {
        delete updatedParams[key];
      }
    });

    setSearchParams(updatedParams);
  };

  const handleItemsChange = (e) => {
    // Reset pagination when filters change
    setCurrentPage(1);
    // Update URL when items selection changes
    updateUrlParams({ 
      items: e.target.value
    });
  };

  const handleFestivalChange = (e) => {
    // Reset pagination when filters change
    setCurrentPage(1);
    // Update URL when festival changes
    updateUrlParams({ 
      festival: e.target.value
    });
  };
  
  // Handle search input change - update URL immediately as user types
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Reset to first page
    setCurrentPage(1);
    // Update URL params
    if (newSearchTerm.trim() !== '') {
      updateUrlParams({
        schoolCode: newSearchTerm
      });
    } else {
      // Remove search param if empty
      const currentParams = Object.fromEntries(searchParams.entries());
      delete currentParams.schoolCode;
      setSearchParams(currentParams);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      // Apply search filter
    }
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
        case "UP Kalaivizha":
          passesFestivalFilter = itemCode >= 300 && itemCode < 400;
          break;
        case "LP Kalaivizha":
          passesFestivalFilter = itemCode >= 400 && itemCode < 500;
          break;
        case "HS Kalaivizha":
          passesFestivalFilter = itemCode >= 500 && itemCode < 600;
          break;
        case "HSS Kalaivizha":
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
      case "UP Kalaivizha":
        festivalText = "UP Kalaivizha";
        break;
      case "LP Kalaivizha":
        festivalText = "LP Kalaivizha";
        break;
      case "HS Kalaivizha":
        festivalText = "HS Kalaivizha";
        break;
      case "HSS Kalaivizha":
        festivalText = "HSS Kalaivizha";
        break;
      default:
        festivalText = "ALL Festival";
    }
    
    const itemsText = selectedItems === "ALL" ? 
      "" : ` - More Than ${selectedItems} Items`;
    
    const schoolCodeText = searchTerm ? ` - School Code: ${searchTerm}` : '';
    
    return `Participants List more than one item ${festivalText}${itemsText}${schoolCodeText} Report`;
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
    
    const headers = ['Sl No', 'Reg No', 'Name', 'Gender', 'Class', 'School Code', 'School Name', 'Sub District','District', 'Items'];
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
        participant.schoolName || "-",
        participant.subDistrict || "-",
        participant.district || "-",
        (participant.items && participant.items.length > 0) ? participant.items.join(", ") : "-"
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
    let festivalName = selectedFestival === "ALL Festival" ? "All_Festivals" : selectedFestival.replace(/ /g, '_');
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-wide">
              Participants List more than one item
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    {/* Items Dropdown with Floating Label */}
                    <div className="relative w-full sm:w-auto">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                  id="items-select"
                  onChange={handleItemsChange}
                  value={selectedItems}
                >
                  <option value="ALL">All Items</option>
                  <option value="2"> 2</option>
                  <option value="3"> 3</option>
                  <option value="4"> 4</option>
                </select>
                <label
                  htmlFor="items-select"
                  className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:text-blue-800 left-4"
                >
                  No of Items
                </label>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              {/* Festival Dropdown with Floating Label */}
              <div className="relative w-full sm:w-auto">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                  id="festival-select"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                >
                  <option value="ALL Festival">ALL Festival</option>
                  <option value="UP Kalaivizha">UP Kalaivizha</option>
                  <option value="LP Kalaivizha">LP Kalaivizha</option>
                  <option value="HS Kalaivizha">HS Kalaivizha</option>
                  <option value="HSS Kalaivizha">HSS Kalaivizha</option>
                </select>
                <label
                  htmlFor="festival-select"
                  className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                >
                  Festival
                </label>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              
        
              
              {/* Print Button */}
              <button
                onClick={generatePDF}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-10 sm:px-6 md:px-10 py-2 rounded-full text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Print Participants List"
              >
                Print
              </button>
            </div>
          </div>
          
          {/* Search input with hover effects */}
          <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
            <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
              <input
                type="text"
                placeholder="Search School Code..."
                className="w-full bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
              />
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleSearch}
              >
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
                      <th className="p-2 md:p-3">No of Items</th>
                      <th className="p-2 md:p-3">Name</th>
                      <th className="p-2 md:p-3">School code & Name</th>
                      <th className="p-2 md:p-3"> subDistrict</th>
                      <th className="p-2 md:p-3"> District</th>


                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {currentItems.length > 0 ? (
                      currentItems.map((participant, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{participant.slNo}</td>
                          <td className="p-2 md:p-3">{participant.regNo || "-"}</td>
                          <td className="p-2 md:p-3 relative">
                            <span 
                              className="cursor-pointer px-2 py-1 rounded no-print"
                              onMouseEnter={() => setShowTooltip(participant.slNo)}
                              onMouseLeave={() => setShowTooltip(null)}
                            >
                              {participant.itemCount || "-"}
                              {showTooltip === participant.slNo && participant.items && participant.items.length > 0 && (
                                <div className="absolute z-10 bg-gray-200 text-black text-xs rounded py-2 px-3 -mt-32 left-1/2 transform -translate-x-1/2 w-48 shadow-lg">
                                  <ul className="text-left space-y-1">
                                    {participant.items.map((item, idx) => (
                                      <li key={idx} className="last:border-b-0 pb-1 last:pb-0">
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </span>
                            <span className="hidden print-only">
                              {participant.itemCount || "-"}
                            </span>
                          </td>
                          <td className="p-2 md:p-3">{participant.name || "-"}</td>
                          <td className="p-2 md:p-3">{participant.schoolCode || "-"}-{participant.schoolName || "-"}</td>
                          <td className="p-2 md:p-3">{participant.subDistrict}</td>
                          <td className="p-2 md:p-3">{participant.district}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-6 text-center text-gray-500">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <i className="fa-solid fa-clipboard-list text-2xl text-gray-400"></i>
                            <p>
                              {searchTerm ? 
                                `No records found for School Code: "${searchTerm}"` : 
                                `No records found for ${selectedFestival === "ALL Festival" ? "All Festivals" : selectedFestival} 
                                ${selectedItems !== "ALL" ? ` with more than ${selectedItems} items` : ""}`
                              }
                            </p>
                          </div>
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

export default SParticipateMorethan
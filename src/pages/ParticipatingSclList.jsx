// import React, { useEffect, useState, useRef } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { getAllPartcipteSclListAPI } from '../services/allAPI';
// import { useSearchParams } from 'react-router-dom';

// const ParticipatingSclList = () => {
//   // Dummy data for development and fallback
//   const dummyData = [
//     { itemCodeName: "301", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram" },
//     { itemCodeName: "304", schoolCode: "002", schoolName: "St. Mary's LP School Kochi" },
//     { itemCodeName: "401", schoolCode: "003", schoolName: "Model HS Kozhikode" },
//     { itemCodeName: "501", schoolCode: "S004", schoolName: "Sacred Heart HSS Thrissur" },
//     { itemCodeName: "503", schoolCode: "005", schoolName: "Govt. UP School Kollam" },
//     { itemCodeName: "601", schoolCode: "006", schoolName: "Little Flower LP School Alappuzha" },
//     { itemCodeName: "606", schoolCode: "007", schoolName: "St. Joseph's HS Kannur" },
//     { itemCodeName: "302", schoolCode: "008", schoolName: "Loyola HSS Palakkad" },
//     { itemCodeName: "402", schoolCode: "009", schoolName: "Sree Narayana UP School Malappuram" },
//     { itemCodeName: "602", schoolCode: "010", schoolName: "Don Bosco HSS Idukki" }
//   ];

//   const [Alllist, setList] = useState([]);
//   const printRef = useRef();
//   const [searchParams, setSearchParams] = useSearchParams();
  
//   // Get festival from URL query params, default to "All Festival" if not present
//   const selectedFestival = searchParams.get('festival') || "All Festival";
  
//   console.log(Alllist);

//   useEffect(() => {
//     getAllitemise();
//   }, []);

//   const getAllitemise = async () => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       const reqHeader = {
//         Authorization: `Bearer ${token}`,
//       };
//       try {
//         const result = await getAllPartcipteSclListAPI(reqHeader);
//         if (result?.status === 200) {
//           setList(result.data);
//         } else {
//           // Use dummy data if API fails
//           setList(dummyData);
//         }
//       } catch (err) {
//         console.log(err);
//         // Use dummy data if API throws an error
//         setList(dummyData);
//       }
//     } else {
//       // Use dummy data if no token is available
//       setList(dummyData);
//     }
//   };

//   const handleFestivalChange = (e) => {
//     // Update URL when festival changes
//     setSearchParams({ festival: e.target.value });
//   };

//   // Generate the appropriate title based on the selected festival
//   const getPrintTitle = () => {
//     switch(selectedFestival) {
//       case "UP Kalaivizha":
//         return "UP Tamil Kalaivizha - List of Participating Schools";
//       case "LP Kalaivizha":
//         return "LP Tamil Kalaivizha - List of Participating Schools";
//       case "HS Kalaivizha":
//         return "HS Tamil Kalaivizha - List of Participating Schools";
//       case "HSS Kalaivizha":
//         return "HSS Tamil Kalaivizha - List of Participating Schools";
//       default:
//         return "ALL Festival - List of Participating Schools";
//     }
//   };

//   const handlePrint = () => {
//     const originalContents = document.body.innerHTML;
//     const printContents = printRef.current.innerHTML;

//     document.body.innerHTML = `
//       <style type="text/css" media="print">
//         @page {
//           size: auto;
//           margin: 0;
//         }
//         body {
//           padding: 20px;
//           font-family: sans-serif;
//         }
//         .print-table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//        .print-table th, .print-table td {
//           border: 1px solid #ddd;
//           padding: 8px;
//           text-align: center;
//         }
//         .print-table th {
//           background-color: #f2f2f2;
//           font-weight: bold;
//         }
//         .print-title {
//           text-align: center;
//           margin-bottom: 20px;
//           font-size: 18px;
//           font-weight: bold;
//           display: block !important;
//         }
//         .no-print {
//           display: none !important;
//         }
//       </style>
//       ${printContents}
//     `;
//     window.print();
//     document.body.innerHTML = originalContents;
//     window.location.reload();
//   };

//   // Filter the list based on selected festival using itemCodeName range
//   const filteredList = selectedFestival === "All Festival" 
//     ? Alllist 
//     : Alllist.filter(item => {
//         // Check if itemCodeName exists and is a valid value
//         if (!item.itemCodeName) return false;
        
//         // Convert to integer if it's a string with possible spaces
//         const itemCode = parseInt(item.itemCodeName.trim());
        
//         // Skip items with invalid codes
//         if (isNaN(itemCode)) return false;
        
//         // Filter based on item code ranges that match the festival type
//         if (selectedFestival === "UP Kalaivizha") {
//           return itemCode >= 300 && itemCode < 400;
//         } else if (selectedFestival === "LP Kalaivizha") {
//           return itemCode >= 400 && itemCode < 500;
//         } else if (selectedFestival === "HS Kalaivizha") {
//           return itemCode >= 500 && itemCode < 600;
//         } else if (selectedFestival === "HSS Kalaivizha") {
//           return itemCode >= 600 && itemCode < 700;
//         }
//         return true;
//       });

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col md:flex-row min-h-screen">
//         <Dash />
//         <div className="flex-1 p-4 md:p-6 lg:p-8">
//           {/* Header section with title and controls */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//             <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//               Participating Schools List
//             </h2>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//               <div className="relative w-full sm:w-40">
//                 <select
//                   className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                   onChange={handleFestivalChange}
//                   value={selectedFestival}
//                 >
//                   <option value="All Festival">All Festival</option>
//                   <option value="UP Kalaivizha">UP Kalaivizha</option>
//                   <option value="LP Kalaivizha">LP Kalaivizha</option>
//                   <option value="HS Kalaivizha">HS Kalaivizha</option>
//                   <option value="HSS Kalaivizha">HSS Kalaivizha</option>
//                 </select>
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                   <i className="fa-solid fa-chevron-down"></i>
//                 </div>
//               </div>
//               <button
//                 onClick={handlePrint}
//                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//               >
//                 Print
//               </button>
//             </div>
//           </div>
//           <div ref={printRef} className="w-full">
//             <div className="print-title hidden">{getPrintTitle()}</div>
//             <div className="overflow-x-auto -mx-4 sm:mx-0 ">
//               <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                 <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                   <thead className="text-xs sm:text-sm">
//                     <tr className="text-gray-700 ">
//                       <th className="p-2 md:p-3">Sl No</th>
                   
//                       <th className="p-2 md:p-3">School Code</th>
//                       <th className="p-2 md:p-3">School Name</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-xs sm:text-sm">
//                     {filteredList && filteredList.length > 0 ? (
//                       filteredList.map((item, index) => (
//                         <tr key={index} className="hover:bg-gray-100">
//                           <td className="p-2 md:p-3">{index + 1}</td>
                       
//                           <td className="p-2 md:p-3">{item.schoolCode || "-"}</td>
//                           <td className="p-2 md:p-3">{item.schoolName || "-"}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr className="hover:bg-gray-100">
//                         <td colSpan="4" className="p-2 md:p-3">No schools found for this festival.</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ParticipatingSclList

import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllPartcipteSclListAPI } from '../services/allAPI';
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const ParticipatingSclList = () => {
  // Dummy data for development and fallback
  const dummyData = [
    { itemCodeName: "301", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram" },
    { itemCodeName: "304", schoolCode: "002", schoolName: "St. Mary's LP School Kochi" },
    { itemCodeName: "401", schoolCode: "003", schoolName: "Model HS Kozhikode" },
    { itemCodeName: "501", schoolCode: "S004", schoolName: "Sacred Heart HSS Thrissur" },
    { itemCodeName: "503", schoolCode: "005", schoolName: "Govt. UP School Kollam" },
    { itemCodeName: "601", schoolCode: "006", schoolName: "Little Flower LP School Alappuzha" },
    { itemCodeName: "606", schoolCode: "007", schoolName: "St. Joseph's HS Kannur" },
    { itemCodeName: "302", schoolCode: "008", schoolName: "Loyola HSS Palakkad" },
    { itemCodeName: "402", schoolCode: "009", schoolName: "Sree Narayana UP School Malappuram" },
    { itemCodeName: "602", schoolCode: "010", schoolName: "Don Bosco HSS Idukki" }
  ];

  const [Alllist, setList] = useState([]);
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Get festival from URL query params, default to "All Festival" if not present
  const selectedFestival = searchParams.get('festival') || "All Festival";
  
  console.log(Alllist);

  useEffect(() => {
    getAllitemise();
  }, []);

  const getAllitemise = async () => {
    setLoading(true);
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getAllPartcipteSclListAPI(reqHeader);
        if (result?.status === 200) {
          setList(result.data);
        } else {
          // Use dummy data if API fails
          setList(dummyData);
        }
      } catch (err) {
        console.log(err);
        // Use dummy data if API throws an error
        setList(dummyData);
      } finally {
        setLoading(false);
      }
    } else {
      // Use dummy data if no token is available
      setList(dummyData);
      setLoading(false);
    }
  };

  const handleFestivalChange = (e) => {
    // Update URL when festival changes
    setSearchParams({ festival: e.target.value });
    setCurrentPage(1); // Reset to first page when changing festival
  };

  // Handle search
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1); // Reset to first page when clearing search
  };

  // Filter the list based on selected festival using itemCodeName range
  const filteredByFestival = selectedFestival === "All Festival" 
    ? Alllist 
    : Alllist.filter(item => {
        // Check if itemCodeName exists and is a valid value
        if (!item.itemCodeName) return false;
        
        // Convert to integer if it's a string with possible spaces
        const itemCode = parseInt(item.itemCodeName.trim());
        
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

  // Further filter based on search term
  const filteredList = searchTerm.trim() === '' 
    ? filteredByFestival 
    : filteredByFestival.filter(school => {
        const lowercasedTerm = searchTerm.toLowerCase();
        return (
          (school.schoolCode?.toLowerCase().includes(lowercasedTerm)) ||
          (school.schoolName?.toLowerCase().includes(lowercasedTerm))
        );
      });

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
        return "UP Tamil Kalaivizha - List of Participating Schools";
      case "LP Kalaivizha":
        return "LP Tamil Kalaivizha - List of Participating Schools";
      case "HS Kalaivizha":
        return "HS Tamil Kalaivizha - List of Participating Schools";
      case "HSS Kalaivizha":
        return "HSS Tamil Kalaivizha - List of Participating Schools";
      default:
        return "ALL Festival - List of Participating Schools";
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
    
    const headers = ['Sl No', 'School Code', 'School Name'];
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
    
    filteredList.forEach((item, index) => {
      const row = document.createElement('tr');
      
      // Add cells
      const cellData = [
        index + 1,
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
    const fileName = `${selectedFestival.replace(/ /g, '_')}_Schools_List.pdf`;
    
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
          {/* Header section with title and controls */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participating Schools List
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

          {/* Search bar with clear button */}
          <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
            <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
              <input
                type="text"
                placeholder="Search by code or name..."
                className="w-full bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search by school code or name"
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
          ) : (
            <div ref={printRef} className="w-full">
              <div className="overflow-x-auto -mx-4 sm:mx-0 ">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                    <thead className="text-xs sm:text-sm">
                      <tr className="text-gray-700 ">
                        <th className="p-2 md:p-3">Sl No</th>
                        <th className="p-2 md:p-3">School Code & Name</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm">
                      {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-100">
                            <td className="p-2 md:p-3">{indexOfFirstItem + index + 1}</td>
                            <td className="p-2 md:p-3">{item.schoolCode || "-"}-{item.schoolName || "-"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr className="hover:bg-gray-100">
                          <td colSpan="3" className="p-6 text-center text-gray-600">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <i className="fa-solid fa-search text-2xl text-gray-400"></i>
                              <p>No schools found for this festival.</p>
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
              </div>

              {/* Pagination Controls */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                {/* Showing X of Y rows */}
                <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                  {filteredList.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredList.length)} of ${filteredList.length} rows` : '0 rows'}
                </div>
                
                {/* Pagination Buttons */}
                {filteredList.length > 0 && (
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
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ParticipatingSclList
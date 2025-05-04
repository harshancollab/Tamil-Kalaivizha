// import React, { useEffect, useState, useRef } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { getAllElgibleSclListAPI } from '../services/allAPI'

// const EligibleSclList = () => {
//   const [Alllist, setList] = useState([]);
//   const printRef = useRef();
  
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
//         const result = await getAllElgibleSclListAPI(reqHeader);
//         if (result?.status === 200) {
//           setList(result.data);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
  
//   const handlePrint = () => {
//     const originalContents = document.body.innerHTML;
//     const printContents = printRef.current.innerHTML;

//     document.body.innerHTML = `
//       <style type="text/css">
//         @page {
//           size: auto;
//           margin: 10mm;
//         }
//         body {
//           padding: 10px;
//           font-family: sans-serif;
//         }
//         .print-table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         .print-table th, .print-table td {
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
        
//         /* Mobile-specific styles */
//         @media only screen and (max-width: 600px) {
//           body {
//             padding: 5px;
//           }
//           .print-table th, .print-table td {
//             padding: 4px;
//             font-size: 12px;
//           }
//           .print-title {
//             font-size: 16px;
//           }
//         }
//       </style>
//       <div class="print-title">List Of Eligible Schools</div>
//       ${printContents}
//     `;
    
//     // Short delay to ensure styles are applied
//     setTimeout(() => {
//       window.print();
      
//       // Restore original content
//       document.body.innerHTML = originalContents;
//       window.location.reload();
//     }, 300);
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col md:flex-row min-h-screen">
//         <Dash />
//         <div className="flex-1 p-4 md:p-6 lg:p-8">
//           {/* Header section with title and controls */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//             <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//               Eligible Schools List
//             </h2>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//               <button
//                 onClick={handlePrint}
//                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//               >
//                 Print
//               </button>
//             </div>
//           </div>
//           <div ref={printRef} className="w-full">
//             <div className="overflow-x-auto -mx-4 sm:mx-0 ">
//               <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                 <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                   <thead className="text-xs sm:text-sm">
//                     <tr className="text-gray-700">
//                       <th className="p-2 md:p-3">Sl No</th>
//                       <th className="p-2 md:p-3">School Code</th>
//                       <th className="p-2 md:p-3">School Name</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-xs sm:text-sm">
//                     {Alllist && Alllist.length > 0 ? (
//                       Alllist.map((item, index) => (
//                         <tr key={index} className="hover:bg-gray-100">
//                           <td className="p-2 md:p-3">{index + 1}</td>
//                           <td className="p-2 md:p-3">{item.schoolCode || "-"}</td>
//                           <td className="p-2 md:p-3">{item.schoolName || "-"}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr className="hover:bg-gray-100">
//                         <td className="p-2 md:p-3">1</td>
//                         <td className="p-2 md:p-3">9</td>
//                         <td className="p-2 md:p-3"> School Name</td>
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

// export default EligibleSclList

import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllElgibleSclListAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js'

const EligibleSclList = () => {
  const [Alllist, setList] = useState([]);
  const printRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredList, setFilteredList] = useState([]);
  
  // Dummy data for testing
  const dummyData = [
    { schoolCode: '1001', schoolName: 'St. Mary\'s Higher Secondary School' },
    { schoolCode: '1002', schoolName: 'Government High School, Eastfort' },
    { schoolCode: '1003', schoolName: 'Christ Nagar International School' },
    { schoolCode: '1004', schoolName: 'Kendriya Vidyalaya, Pattom' },
    { schoolCode: '1005', schoolName: 'Holy Angels Convent School' },
    { schoolCode: '1006', schoolName: 'Loyola School, Sreekariyam' },
    { schoolCode: '1007', schoolName: 'Carmel Girls High School' },
    { schoolCode: '1008', schoolName: 'Model School, Thiruvananthapuram' },
    { schoolCode: '1009', schoolName: 'St. Joseph\'s Higher Secondary School' },
    { schoolCode: '1010', schoolName: 'Adarsh Vidya Kendra' },
    { schoolCode: '1011', schoolName: 'Trivandrum International School' },
    { schoolCode: '1012', schoolName: 'Saraswathi Vidyalaya' },
    { schoolCode: '1013', schoolName: 'Chinmaya Vidyalaya, Vazhuthacaud' },
    { schoolCode: '1014', schoolName: 'Bharatiya Vidya Bhavan\'s School' },
    { schoolCode: '1015', schoolName: 'St. Thomas Residential School' },
    { schoolCode: '1016', schoolName: 'Arya Central School' },
    { schoolCode: '1017', schoolName: 'MGM Model School' },
    { schoolCode: '1018', schoolName: 'Mar Ivanios Vidya Nagar' },
    { schoolCode: '1019', schoolName: 'Auxilium Convent School' },
    { schoolCode: '1020', schoolName: 'Choice School, Thiruvalla' },
    { schoolCode: '1021', schoolName: 'St. George\'s HSS, Kothamangalam' },
    { schoolCode: '1022', schoolName: 'Devamatha CMI Public School' },
    { schoolCode: '1023', schoolName: 'Rajagiri Public School' },
    { schoolCode: '1024', schoolName: 'Vidyodaya School, Thevakkal' },
    { schoolCode: '1025', schoolName: 'Assisi Vidyaniketan Public School' },
    { schoolCode: '1026', schoolName: 'Toc H Public School' },
    { schoolCode: '1027', schoolName: 'Global Public School' },
    { schoolCode: '1028', schoolName: 'Nava Nirman Public School' },
    { schoolCode: '1029', schoolName: 'Nirmala Bhavan Higher Secondary School' },
    { schoolCode: '1030', schoolName: 'Sacred Heart CMI Public School' }
  ];
  
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
        const result = await getAllElgibleSclListAPI(reqHeader);
        if (result?.status === 200) {
          setList(result.data);
          setFilteredList(result.data);
        }
      } catch (err) {
        console.log(err);
        // Use dummy data if API fails
        setList(dummyData);
        setFilteredList(dummyData);
      } finally {
        setLoading(false);
      }
    } else {
      // Use dummy data if no token
      setList(dummyData);
      setFilteredList(dummyData);
      setLoading(false);
    }
  };

  // Handle search
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    applySearch(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const applySearch = (term) => {
    if (!term.trim()) {
      setFilteredList(Alllist);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const results = Alllist.filter(school =>
        school.schoolCode?.toLowerCase().includes(lowercasedTerm) ||
        school.schoolName?.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredList(results);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredList(Alllist);
    setCurrentPage(1); // Reset to first page when clearing search
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
  
  // New PDF generation using html2pdf
  const generatePDF = () => {
    // Create a clone of the table for PDF generation
    const pdfContent = document.createElement('div');
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = "List Of Eligible Schools";
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
    
    // Use filtered list data or fallback to sample data if empty
    const dataToUse = filteredList && filteredList.length > 0 ? filteredList : [{ schoolCode: '9', schoolName: 'School Name' }];
    
    dataToUse.forEach((item, index) => {
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
    const fileName = 'Eligible_Schools_List.pdf';
    
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
              Eligible Schools List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
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
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                    <thead className="text-xs sm:text-sm">
                      <tr className="text-gray-700">
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
                              <p>No schools found</p>
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

export default EligibleSclList
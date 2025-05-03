// import React, { useEffect, useState, useRef } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { deleteresultentryAPI, getAllResultentryListAPI } from '../services/allAPI';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';

// const AllResultEntry = () => {
//     const [showRegNo, setShowRegNo] = useState(false);
//     const [Allresultentry, setResultentry] = useState([]);
//     const navigate = useNavigate();
//     const printRef = useRef();
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
//     const [showConfirmButton, setShowConfirmButton] = useState(true);
//     const [resultsConfirmed, setResultsConfirmed] = useState(false);

//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const absenteeRegNos = [
//         "001", "002", "003", "004",
//         "005",
//         // "009", "010", "011", "012"
//     ];

//     useEffect(() => {
//         // Initialize search code from URL params when component mounts
//         const codeParam = searchParams.get('code');
//         if (codeParam) {
//             setSearchCode(codeParam);
//         }
//         // getAllresultentry();
//     }, [searchParams]);

//     const getAllresultentry = async () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             const reqHeader = {
//                 "Authorization": `Bearer ${token}`
//             }
//             try {
//                 const result = await getAllResultentryListAPI(reqHeader)
//                 if (result.status === 200) {
//                     setResultentry(result.data)
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }

//     const handleConfirmResults = () => {
//         setShowConfirmButton(false);
//         setResultsConfirmed(true);
//     };

//     const handleEditRedirect = (resultEntry) => {
//         navigate(`/edit-resultentry/${resultEntry.slNo}`, {
//             state: { resultEntry }
//         });
//     };

//     const handleDeleteClick = async (id) => {
//         const token = sessionStorage.getItem("token")
//         if (token) {
//             const reqHeader = {
//                 "Authorization": `Bearer ${token}`
//             }
//             try {
//                 await deleteresultentryAPI(id, reqHeader)
//                 getAllresultentry()
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }

//     const generatePDF = () => {
//         // Create a new div element for PDF content
//         const pdfContent = document.createElement('div');

//         // Add title
//         const titleElement = document.createElement('h2');
//         titleElement.textContent = "Result Entry";
//         titleElement.style.textAlign = 'center';
//         titleElement.style.margin = '20px 0';
//         titleElement.style.fontWeight = 'bold';
//         pdfContent.appendChild(titleElement);

//         // Create table
//         const table = document.createElement('table');
//         table.style.width = '100%';
//         table.style.borderCollapse = 'collapse';
//         table.style.marginBottom = '20px';

//         // Create table header
//         const thead = document.createElement('thead');
//         const headerRow = document.createElement('tr');

//         const headers = ['Sl No', 'Reg No', 'Code', 'Mark 1', 'Mark 2', 'Mark 3', 'Total', 'Mark %', 'Rank', 'Grade', 'Point'];
//         headers.forEach(headerText => {
//             const th = document.createElement('th');
//             th.textContent = headerText;
//             th.style.border = '1px solid #ddd';
//             th.style.padding = '8px';
//             th.style.backgroundColor = '#f2f2f2';
//             th.style.fontWeight = 'bold';
//             headerRow.appendChild(th);
//         });

//         thead.appendChild(headerRow);
//         table.appendChild(thead);

//         // Create table body
//         const tbody = document.createElement('tbody');

//         // Use filtered data for PDF
//         const filteredData = filteredResultData();
        
//         filteredData.forEach((result, index) => {
//             const row = document.createElement('tr');

//             // Add cells
//             const cellData = [
//                 index + 1, // Adjust serial number
//                 result.regNo,
//                 result.code,
//                 result.mark1,
//                 result.mark2,
//                 result.mark3,
//                 result.total,
//                 result.markPercentage,
//                 result.rank,
//                 result.grade,
//                 result.point
//             ];

//             cellData.forEach(text => {
//                 const td = document.createElement('td');
//                 td.textContent = text;
//                 td.style.border = '1px solid #ddd';
//                 td.style.padding = '8px';
//                 td.style.textAlign = 'center';
//                 row.appendChild(td);
//             });

//             tbody.appendChild(row);
//         });

//         table.appendChild(tbody);
//         pdfContent.appendChild(table);

//         // Add absentee information
//         const absenteeSection = document.createElement('div');
//         absenteeSection.style.marginTop = '20px';

//         const absenteeInfo = document.createElement('p');
//         absenteeInfo.innerHTML = `<strong>Absentee Reg No:</strong> ${absenteeRegNos.join(', ')}`;
//         absenteeSection.appendChild(absenteeInfo);

//         const absenteeCount = document.createElement('p');
//         absenteeCount.innerHTML = `<strong>No of Absentees:</strong> ${absenteeRegNos.length}`;
//         absenteeSection.appendChild(absenteeCount);

//         const withheldCount = document.createElement('p');
//         withheldCount.innerHTML = '<strong>No of Withheld Participants:</strong> 3';
//         absenteeSection.appendChild(withheldCount);

//         const appealCount = document.createElement('p');
//         appealCount.innerHTML = '<strong>No of Appeal Entry:</strong> 8';
//         absenteeSection.appendChild(appealCount);

//         pdfContent.appendChild(absenteeSection);

//         // PDF filename
//         const fileName = 'Result_Entry.pdf';

//         // PDF options
//         const options = {
//             margin: 10,
//             filename: fileName,
//             image: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { scale: 2, useCORS: true },
//             jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//         };

//         // Generate and download PDF
//         html2pdf().from(pdfContent).set(options).save();
//     };

//     // Dummy data
//     const resultData = [
//         { slNo: 1, regNo: "123", code: "301", mark1: 85, mark2: 78, mark3: 92, total: 255, markPercentage: 85, rank: 2, grade: "A", point: 9.5 },
//         { slNo: 2, regNo: "456", code: "203", mark1: 90, mark2: 88, mark3: 95, total: 273, markPercentage: 91, rank: 1, grade: "A+", point: 10.0 },
//         { slNo: 3, regNo: "89", code: "345", mark1: 75, mark2: 82, mark3: 88, total: 245, markPercentage: 82, rank: 3, grade: "A-", point: 9.0 },
//         { slNo: 4, regNo: "34", code: "567", mark1: 68, mark2: 72, mark3: 76, total: 216, markPercentage: 72, rank: 7, grade: "B+", point: 8.0 },
//         { slNo: 5, regNo: "67", code: "234", mark1: 92, mark2: 80, mark3: 88, total: 260, markPercentage: 87, rank: 4, grade: "A", point: 9.5 },
//         { slNo: 6, regNo: "890", code: "123", mark1: 78, mark2: 75, mark3: 82, total: 235, markPercentage: 78, rank: 5, grade: "B+", point: 8.5 },
//         { slNo: 7, regNo: "45", code: "456", mark1: 65, mark2: 70, mark3: 68, total: 203, markPercentage: 68, rank: 8, grade: "B", point: 7.5 },
//         { slNo: 8, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 },
//         { slNo: 9, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 },
//         { slNo: 10, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 },
//         { slNo: 11, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 },
//         { slNo: 12, regNo: "712", code: "432", mark1: 75, mark2: 73, mark3: 84, total: 232, markPercentage: 77, rank: 5, grade: "B+", point: 8.0 },
//         { slNo: 13, regNo: "546", code: "312", mark1: 83, mark2: 81, mark3: 90, total: 254, markPercentage: 85, rank: 2, grade: "A", point: 9.5 },
//         { slNo: 14, regNo: "321", code: "654", mark1: 77, mark2: 75, mark3: 79, total: 231, markPercentage: 77, rank: 5, grade: "B+", point: 8.0 },
//         { slNo: 15, regNo: "987", code: "789", mark1: 65, mark2: 68, mark3: 72, total: 205, markPercentage: 68, rank: 8, grade: "B", point: 7.5 },
//     ];

//     // Filter results based on search code
//     const filteredResultData = () => {
//         if (!searchCode) {
//             return resultData;
//         }
//         return resultData.filter(result => 
//             result.code.toLowerCase().includes(searchCode.toLowerCase())
//         );
//     };

//     // Reset pagination when search changes
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchCode]);

//     // Pagination logic
//     const filteredData = filteredResultData();
//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber > 0 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         // Dynamically adjust number of page buttons based on screen size
//         const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

//         if (totalPages <= maxPageNumbersToShow) {
//             // Show all page numbers
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             // Show limited page numbers with dots
//             if (currentPage <= 2) {
//                 // Near the start
//                 for (let i = 1; i <= 3; i++) {
//                     if (i <= totalPages) pageNumbers.push(i);
//                 }
//                 if (totalPages > 3) {
//                     pageNumbers.push('...');
//                     pageNumbers.push(totalPages);
//                 }
//             } else if (currentPage >= totalPages - 1) {
//                 // Near the end
//                 pageNumbers.push(1);
//                 pageNumbers.push('...');
//                 for (let i = totalPages - 2; i <= totalPages; i++) {
//                     if (i > 0) pageNumbers.push(i);
//                 }
//             } else {
//                 // Middle
//                 pageNumbers.push(1);
//                 if (currentPage > 3) pageNumbers.push('...');
//                 pageNumbers.push(currentPage - 1);
//                 pageNumbers.push(currentPage);
//                 pageNumbers.push(currentPage + 1);
//                 if (currentPage < totalPages - 2) pageNumbers.push('...');
//                 pageNumbers.push(totalPages);
//             }
//         }

//         return pageNumbers;
//     };

//     const chunkRegNos = (arr, size) => {
//         const chunkedArr = [];
//         for (let i = 0; i < arr.length; i += size) {
//             chunkedArr.push(arr.slice(i, i + size));
//         }
//         return chunkedArr;
//     };

//     const chunkedRegNos = chunkRegNos(absenteeRegNos, 4);

//     const handleAddClick = () => {
//         navigate('/result-entry');
//     };

//     // Handle search input changes
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchCode(value);
        
//         // Update URL parameter
//         if (value) {
//             setSearchParams({ code: value });
//         } else {
//             setSearchParams({});
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//                         <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//                             Result Entry
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             <div className="flex items-center gap-2 w-full sm:w-auto">
//                                 <label className="text-blue-900 whitespace-nowrap min-w-max">Item Code</label>
//                                 <input
//                                     type="text"
//                                     className="rounded-full border border-blue-700 px-2 py-2 flex-grow"
//                                     placeholder="Search by item code..."
//                                     value={searchCode}
//                                     onChange={handleSearchChange}
//                                 />
//                             </div>

//                             <button onClick={handleAddClick} className="text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] border border-blue-500 py-2 px-6 rounded-full flex items-center w-full sm:w-auto">
//                                 Add Result entry
//                             </button>

//                             <button
//                                 onClick={generatePDF}
//                                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//                             >
//                                 Print
//                             </button>
//                         </div>
//                     </div>
                    
//                     {/* Absentee Info Section - Only shown when results are confirmed */}
//                     {resultsConfirmed && (
//                         <div className="flex items-center justify-center mb-4">
//                             <div className="">
//                                 <div className="relative inline-block">
//                                     <p
//                                         className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] cursor-pointer inline'
//                                         onMouseEnter={() => setShowRegNo(true)}
//                                         onMouseLeave={() => setShowRegNo(false)}
//                                     >
//                                         Absentee Reg No...
//                                     </p>
//                                     {showRegNo && (
//                                         <div className="absolute top-full left-0 mt-1 p-2 bg-white shadow-lg rounded-md z-10 text-gray-800 min-w-max">
//                                             {chunkedRegNos.map((chunk, i) => (
//                                                 <div key={i} className="mb-1 last:mb-0">
//                                                     {chunk.join(', ')}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] inline ml-4'>No of Withheld Participants :<span> 3</span></p>
//                                 <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] inline ml-4'>No of Absentees :<span> {absenteeRegNos.length}</span></p>
//                             </div>
//                         </div>
//                     )}
                    
//                     <div className="w-full">
//                         <div ref={printRef} className="overflow-x-auto -mx-4 sm:mx-0">
//                             <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                 <div className="shadow overflow-hidden sm:rounded-lg">
//                                     <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                         <thead className="bg-gray-50">
//                                             <tr className="text-gray-700">
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 1</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 2</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 3</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Total</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark %</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Rank</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Edit</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Delete</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((result, index) => (
//                                                     <tr key={result.slNo} className="hover:bg-gray-100">
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.mark1}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.mark2}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.mark3}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.total}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.markPercentage}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.rank}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 className="text-blue-500 hover:text-blue-700 focus:outline-none"
//                                                                 onClick={() => handleEditRedirect(result)}
//                                                             >
//                                                                 <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button onClick={() => handleDeleteClick(result.slNo)} className="text-red-600 hover:text-red-800 focus:outline-none">
//                                                                 <i className="fa-solid fa-trash cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="13" className="p-4 text-center text-gray-500">
//                                                         No results found for "{searchCode}"
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                     <div className="flex justify-end gap-4">
//                                         {/* Show Confirm Results button only when not confirmed */}
//                                         {showConfirmButton && (
//                                             <button 
//                                                 onClick={handleConfirmResults}
//                                                 className="text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] border border-blue-500 py-2 px-6 rounded-full flex items-center w-full sm:w-auto"
//                                             >
//                                                 Confirm Results
//                                             </button>
//                                         )}
//                                         <button
//                                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//                                         >
//                                             Print Confidential Report
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                         {/* Showing X of Y rows */}
//                         <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                             {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
//                         </div>

//                         {/* Pagination Controls */}
//                         <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                             {/* Previous Button with icon */}
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                             >
//                                 <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                                 <span className="hidden sm:inline p-1">Previous</span>
//                             </button>

//                             {/* Page Numbers */}
//                             <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                                 {renderPageNumbers().map((page, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => page !== '...' && handlePageChange(page)}
//                                         className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
//                                             } ${page === '...' ? 'pointer-events-none' : ''}`}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Next Button with icon */}
//                             <button
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === totalPages || totalPages === 0}
//                                 className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
//                             >
//                                 <span className="hidden sm:inline p-1">Next</span>
//                                 <i className="fa-solid fa-angle-right"></i>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AllResultEntry



import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { deleteresultentryAPI, getAllResultentryListAPI } from '../services/allAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const AllResultEntry = () => {
    const [showRegNo, setShowRegNo] = useState(false);
    const [Allresultentry, setResultentry] = useState([]);
    const navigate = useNavigate();
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
    const [showConfirmButton, setShowConfirmButton] = useState(true);
    const [resultsConfirmed, setResultsConfirmed] = useState(false);
    const [itemName, setItemName] = useState(''); // State for item name
    const [showItemPrompt, setShowItemPrompt] = useState(true); // Show prompt by default

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const absenteeRegNos = [
        "001", "002", "003", "004",
        "005",
        // "009", "010", "011", "012"
    ];

    useEffect(() => {
        // Initialize search code from URL params when component mounts
        const codeParam = searchParams.get('code');
        if (codeParam) {
            setSearchCode(codeParam);
            setShowItemPrompt(false); // Hide prompt when code is present
            // Find and set item name based on URL param
            const foundItem = resultData.find(result => 
                result.code.toLowerCase().includes(codeParam.toLowerCase())
            );
            setItemName(foundItem ? foundItem.itemname : '');
        } else {
            setItemName(''); // Clear item name if no search code
            setShowItemPrompt(true); // Show prompt when no code
        }
        // getAllresultentry();
    }, [searchParams]);

    const getAllresultentry = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllResultentryListAPI(reqHeader)
                if (result.status === 200) {
                    setResultentry(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleConfirmResults = () => {
        setShowConfirmButton(false);
        setResultsConfirmed(true);
    };

    const handleEditRedirect = (resultEntry) => {
        navigate(`/edit-resultentry/${resultEntry.slNo}`, {
            state: { resultEntry }
        });
    };

    const handleDeleteClick = async (id) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                await deleteresultentryAPI(id, reqHeader)
                getAllresultentry()
            } catch (err) {
                console.log(err);
            }
        }
    }

    const generatePDF = () => {
        // Create a new div element for PDF content
        const pdfContent = document.createElement('div');

        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = "Result Entry";
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);

        // Create table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '20px';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Sl No', 'Reg No', 'Code', 'Mark 1', 'Mark 2', 'Mark 3', 'Total', 'Mark %', 'Rank', 'Grade', 'Point'];
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

        // Use filtered data for PDF
        const filteredData = filteredResultData();

        filteredData.forEach((result, index) => {
            const row = document.createElement('tr');

            // Add cells
            const cellData = [
                index + 1, // Adjust serial number
                result.regNo,
                result.code,
                result.mark1,
                result.mark2,
                result.mark3,
                result.total,
                result.markPercentage,
                result.rank,
                result.grade,
                result.point
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

        // Add absentee information
        const absenteeSection = document.createElement('div');
        absenteeSection.style.marginTop = '20px';

        const absenteeInfo = document.createElement('p');
        absenteeInfo.innerHTML = `<strong>Absentee Reg No:</strong> ${absenteeRegNos.join(', ')}`;
        absenteeSection.appendChild(absenteeInfo);

        const absenteeCount = document.createElement('p');
        absenteeCount.innerHTML = `<strong>No of Absentees:</strong> ${absenteeRegNos.length}`;
        absenteeSection.appendChild(absenteeCount);

        const withheldCount = document.createElement('p');
        withheldCount.innerHTML = '<strong>No of Withheld Participants:</strong> 3';
        absenteeSection.appendChild(withheldCount);

        const appealCount = document.createElement('p');
        appealCount.innerHTML = '<strong>No of Appeal Entry:</strong> 8';
        absenteeSection.appendChild(appealCount);

        pdfContent.appendChild(absenteeSection);

        // PDF filename
        const fileName = 'Result_Entry.pdf';

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

    // Dummy data
    const resultData = [
        { slNo: 1, regNo: "123", code: "301", mark1: 85, mark2: 78, mark3: 92, total: 255, markPercentage: 85, rank: 2, grade: "A", point: 9.5, itemname: "stroy writing" },
        { slNo: 2, regNo: "456", code: "203", mark1: 90, mark2: 88, mark3: 95, total: 273, markPercentage: 91, rank: 1, grade: "A+", point: 10.0, itemname: "Essay writing" },
        { slNo: 3, regNo: "89", code: "345", mark1: 75, mark2: 82, mark3: 88, total: 245, markPercentage: 82, rank: 3, grade: "A-", point: 9.0, itemname: "Drama" },
        { slNo: 4, regNo: "34", code: "567", mark1: 68, mark2: 72, mark3: 76, total: 216, markPercentage: 72, rank: 7, grade: "B+", point: 8.0, itemname: "stroy writing" },
        { slNo: 5, regNo: "67", code: "234", mark1: 92, mark2: 80, mark3: 88, total: 260, markPercentage: 87, rank: 4, grade: "A", point: 9.5, itemname: "stroy writing" },
        { slNo: 6, regNo: "890", code: "123", mark1: 78, mark2: 75, mark3: 82, total: 235, markPercentage: 78, rank: 5, grade: "B+", point: 8.5, itemname: "stroy writing" },
        { slNo: 7, regNo: "45", code: "456", mark1: 65, mark2: 70, mark3: 68, total: 203, markPercentage: 68, rank: 8, grade: "B", point: 7.5, itemname: "stroy" },
        { slNo: 8, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemname: "stroy writing" },
        { slNo: 9, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemname: "Poetry" },
        { slNo: 10, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemname: "Drama" },
        { slNo: 11, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemname: "Essay writing" },
        { slNo: 12, regNo: "712", code: "432", mark1: 75, mark2: 73, mark3: 84, total: 232, markPercentage: 77, rank: 5, grade: "B+", point: 8.0, itemname: "Poetry" },
        { slNo: 13, regNo: "546", code: "312", mark1: 83, mark2: 81, mark3: 90, total: 254, markPercentage: 85, rank: 2, grade: "A", point: 9.5, itemname: "Poetry" },
        { slNo: 14, regNo: "321", code: "654", mark1: 77, mark2: 75, mark3: 79, total: 231, markPercentage: 77, rank: 5, grade: "B+", point: 8.0, itemname: "Essay writing" },
        { slNo: 15, regNo: "987", code: "789", mark1: 65, mark2: 68, mark3: 72, total: 205, markPercentage: 68, rank: 8, grade: "B", point: 7.5, itemname: "Drama" },
    ];

    // Filter results based on search code
    const filteredResultData = () => {
        if (!searchCode) {
            return resultData;
        }
        return resultData.filter(result =>
            result.code.toLowerCase().includes(searchCode.toLowerCase())
        );
    };

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchCode]);

    // Pagination logic
    const filteredData = filteredResultData();
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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

    const chunkRegNos = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };

    const chunkedRegNos = chunkRegNos(absenteeRegNos, 4);

    const handleAddClick = () => {
        navigate('/result-entry');
    };

    // Handle search input changes
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchCode(value);

        // Update UI state based on search value
        if (value) {
            setShowItemPrompt(false); // Hide prompt when there's a search term
            
            // Update URL parameter
            setSearchParams({ code: value });
            
            // Find and set item name
            const foundItem = resultData.find(result => 
                result.code.toLowerCase().includes(value.toLowerCase())
            );
            setItemName(foundItem ? foundItem.itemname : '');
        } else {
            setShowItemPrompt(true); // Show prompt when search is cleared
            setSearchParams({});
            setItemName(''); // Clear item name when search is empty
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Result Entry
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="flex flex-col w-full sm:w-auto relative">
                                <div className="flex items-center gap-2 mb-3">
                                    <label className="text-blue-900 whitespace-nowrap min-w-max">Item Code</label>
                                    <input
                                        type="text"
                                        className="rounded-full border border-blue-700 px-2 py-2 flex-grow"
                                        placeholder="Search by item code..."
                                        value={searchCode}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                
                                {/* Item name display - only show when there's an item name */}
                                {itemName && (
                                    <div className="absolute mt-10 text-sm text-blue-600 mt-1 ml-12 sm:ml-16">
                                        {itemName}
                                    </div>
                                )}
                            </div>

                            <button onClick={handleAddClick} className="text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] border border-blue-500 py-2 px-6 rounded-full flex items-center w-full sm:w-auto mb-3 ">
                                Add Result entry
                            </button>

                            <button
                                onClick={generatePDF}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto mb-3"
                            >
                                Print
                            </button>
                        </div>
                    </div>
                    
                    {/* Absentee Info Section - Only shown when results are confirmed */}
                    {resultsConfirmed && (
                        <div className="flex items-center justify-center mb-4 mt-5">
                            <div className="">
                                <div className="relative inline-block">
                                    <p
                                        className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] cursor-pointer inline'
                                        onMouseEnter={() => setShowRegNo(true)}
                                        onMouseLeave={() => setShowRegNo(false)}
                                    >
                                        Absentee Reg No...
                                    </p>
                                    {showRegNo && (
                                        <div className="absolute top-full left-0 mt-1 p-2 bg-white shadow-lg rounded-md z-10 text-gray-800 min-w-max">
                                            {chunkedRegNos.map((chunk, i) => (
                                                <div key={i} className="mb-1 last:mb-0">
                                                    {chunk.join(', ')}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] inline ml-4'>No of Withheld Participants :<span> 3</span></p>
                                <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] inline ml-4'>No of Absentees :<span> {absenteeRegNos.length}</span></p>
                            </div>
                        </div>
                    )}

                    <div className="w-full">
                        <div ref={printRef} className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div className="shadow overflow-hidden sm:rounded-lg">
                                    {/* Show prompt message when no item code is entered */}
                                    {showItemPrompt ? (
                                        <div className="flex flex-col items-center justify-center p-8 mt-10 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="text-5xl text-blue-400 mb-4">
                                                <i className="fa-solid fa-search"></i>
                                            </div>
                                            <h3 className="text-xl font-semibold text-blue-700 mb-2">Please Enter an Item Code</h3>
                                            <p className="text-blue-600 text-center max-w-md">
                                                Enter an item code in the search field above to view the corresponding results.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                                <thead className="bg-gray-50">
                                                    <tr className="text-gray-700">
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 1</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 2</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 3</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Total</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark %</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Rank</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Edit</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                    {currentItems.length > 0 ? (
                                                        currentItems.map((result, index) => (
                                                            <tr key={result.slNo} className="hover:bg-gray-100">
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark1}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark2}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark3}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.total}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.markPercentage}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.rank}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">
                                                                    <button
                                                                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                                        onClick={() => handleEditRedirect(result)}
                                                                    >
                                                                        <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                                                                    </button>
                                                                </td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">
                                                                    <button onClick={() => handleDeleteClick(result.slNo)} className="text-red-600 hover:text-red-800 focus:outline-none">
                                                                        <i className="fa-solid fa-trash cursor-pointer"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="13" className="p-4 text-center text-gray-500">
                                                                {searchCode ? `No results found for "${searchCode}"` : "No results to display"}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            
                                            <div className="flex justify-end gap-4">
                                                {/* Show Confirm Results button only when not confirmed */}
                                                {showConfirmButton && (
                                                    <button
                                                        onClick={handleConfirmResults}
                                                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] border border-blue-500 py-2 px-6 rounded-full flex items-center w-full sm:w-auto"
                                                    >
                                                        Confirm Results
                                                    </button>
                                                )}
                                                <button
                                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                                                >
                                                    Print Confidential Report
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination Controls - Only show when results are displayed */}
                    {!showItemPrompt && (
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                            {/* Showing X of Y rows */}
                            <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                                {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                                {/* Previous Button with icon */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || totalPages === 0}
                                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                                >
                                    <i className="fa-solid fa-angle-right transform rotate-180"></i>
                                    <span className="hidden sm:inline p-1">Previous</span>
                                </button>

                                {/* Page Numbers */}
                                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                                    {totalPages > 0 && renderPageNumbers().map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => page !== '...' && handlePageChange(page)}
                                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
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

export default AllResultEntry
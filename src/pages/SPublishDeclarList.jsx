// import React, { useEffect, useRef, useState } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { useSearchParams } from 'react-router-dom'
// import { getAllPublishentryListAPI } from '../services/allAPI'
// import html2pdf from 'html2pdf.js'
// import StatusFest from '../components/StatusFest'
// import SStatusFest from '../components/SStatusFest'

// const SPublishDeclarList = () => {
//     const printRef = useRef();
//     const [searchParams, setSearchParams] = useSearchParams();
//     const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
//     const selectedResultType = searchParams.get('resultType') || "Declared Result";
//     const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
//     const [filteredData, setFilteredData] = useState([]);
//     const [filteredResultData, setFilteredResultData] = useState([]);
//     const [noResults, setNoResults] = useState(false);
//     const [allResultEntry, setResultEntry] = useState([]);
//     // Animation state
//     const [dropdownAnimation, setDropdownAnimation] = useState(false);
    
//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         getAllresultentry();
//     }, []);

//     // Add animation effect when dropdown changes
//     useEffect(() => {
//         setDropdownAnimation(true);
//         const timer = setTimeout(() => {
//             setDropdownAnimation(false);
//         }, 500); // Duration of animation
        
//         return () => clearTimeout(timer);
//     }, [selectedFestival, selectedResultType]);

//     const getAllresultentry = async () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             const reqHeader = {
//                 "Authorization": `Bearer ${token}`
//             }
//             try {
//                 const result = await getAllPublishentryListAPI(reqHeader)
//                 if (result.status === 200) {
//                     setResultEntry(result.data)
//                 }
//             } catch (err) {
//                 console.log(err);
//                 // Set dummy data if API fails
//                 setResultEntry(resultData);
//             }
//         } else {
//             // Set dummy data if no token
//             setResultEntry(resultData);
//         }
//     }

//     // Dummy data for the result list
//     const resultData = [
//         {
//             slNo: 1,
//             itemCodeName: "301 - Story Writing",
//             itemCode: "301",
//             regNo: "1001",
//             codeNo: "SN-101",
//             name: "Rahul Kumar",
//             noOfParticipate: 1,
//             schoolName: "St. Mary's High School",
//             schoolCode: "SMHS-01",
//             sub:"ottaplam",
//             dis:"Palakkad",
//             grade: "A",
//             point: 9.5
//         },
     
//     ];

//     // Filter result data based on selected festival
//     useEffect(() => {
//         filterResultDataByFestival();
//     }, [selectedFestival, allResultEntry]);

//     const filterResultDataByFestival = () => {
//         let dataToFilter = allResultEntry.length > 0 ? allResultEntry : resultData;
        
//         let filtered;
//         switch (selectedFestival) {
//             case "UP Kalaivizha":
//                 filtered = dataToFilter.filter(item => {
//                     const itemCode = parseInt(item.itemCode);
//                     return itemCode >= 300 && itemCode < 400;
//                 });
//                 break;
//             case "Lp Kalaivizha":
//                 filtered = dataToFilter.filter(item => {
//                     const itemCode = parseInt(item.itemCode);
//                     return itemCode >= 400 && itemCode < 500;
//                 });
//                 break;
//             case "Hs Kalaivizha":
//                 filtered = dataToFilter.filter(item => {
//                     const itemCode = parseInt(item.itemCode);
//                     return itemCode >= 500 && itemCode < 600;
//                 });
//                 break;
//             case "Hss Kalaivizha":
//                 filtered = dataToFilter.filter(item => {
//                     const itemCode = parseInt(item.itemCode);
//                     return itemCode >= 600 && itemCode < 700;
//                 });
//                 break;
//             case "All Festival":
//             case "Status View":
//             default:
//                 filtered = [...dataToFilter];
//         }

//         // Add sequential numbering to filtered results
//         filtered = filtered.map((item, index) => ({
//             ...item,
//             slNo: index + 1
//         }));

//         setFilteredResultData(filtered);
        
//         // Generate school points from the filtered data
//         const schoolPointsData = getSchoolPointsData(filtered);
//         setFilteredData(schoolPointsData);
        
//         // Update search results if search term exists
//         if (searchTerm.trim()) {
//             filterSchools(searchTerm, schoolPointsData);
//         }
        
//         // Reset pagination to first page
//         setCurrentPage(1);
//     };

//     function getSchoolPointsData(data = []) {
//         const dataToUse = data.length > 0 ? data : 
//             (filteredResultData.length > 0 ? filteredResultData : resultData);
        
//         const schoolMap = {};

//         dataToUse.forEach(item => {
//             if (!schoolMap[item.schoolName]) {
//                 schoolMap[item.schoolName] = {
//                     slNo: Object.keys(schoolMap).length + 1,
//                     schoolCode: item.schoolCode,
//                     schoolName: item.schoolName,
//                     point: item.point
//                 };
//             } else {
//                 schoolMap[item.schoolName].point += item.point;
//             }
//         });

//         return Object.values(schoolMap).sort((a, b) => b.point - a.point);
//     };
    
//     useEffect(() => {
//         const initialSearchTerm = searchParams.get('code') || '';
//         setSearchTerm(initialSearchTerm);
        
//         // Apply filter only if there's a search term
//         if (initialSearchTerm) {
//             filterSchools(initialSearchTerm);
//         }
//     }, [searchParams, selectedResultType]);
    
//     // Also ensure that when festival changes, we reset the filtered data
//     useEffect(() => {
//         filterResultDataByFestival();
//         // Reset search when festival changes
//         if (searchTerm) {
//             filterSchools(searchTerm);
//         }
//     }, [selectedFestival, allResultEntry]);

//     const handleSearchChange = (event) => {
//         const newSearchTerm = event.target.value;
//         setSearchTerm(newSearchTerm);
//         setSearchParams(prev => {
//             const newParams = new URLSearchParams(prev);
//             newParams.set('code', newSearchTerm);
//             return newParams;
//         });
//         filterSchools(newSearchTerm);
//         setCurrentPage(1); // Reset to first page on search
//     };

//     const filterSchools = (term, schoolData = null) => {
//         // If searching in School Points view
//         if (selectedResultType === "School Points") {
//             const dataToFilter = schoolData || (filteredData.length > 0 ? filteredData : getSchoolPointsData());
//             const lowercasedTerm = term.toLowerCase();
            
//             if (!term.trim()) {
//                 setFilteredData(dataToFilter);
//                 setNoResults(false);
//                 updateTotalPages(dataToFilter.length);
//                 return;
//             }
            
//             const results = dataToFilter.filter(school =>
//                 school.schoolCode.toLowerCase().includes(lowercasedTerm) ||
//                 school.schoolName.toLowerCase().includes(lowercasedTerm)
//             );
            
//             setFilteredData(results);
//             setNoResults(results.length === 0);
//             updateTotalPages(results.length);
//         } 
//         // If searching in Declared Result view
//         else if (selectedResultType === "Declared Result") {
//             const dataToFilter = filteredResultData.length > 0 ? filteredResultData : resultData;
//             const lowercasedTerm = term.toLowerCase();
            
//             if (!term.trim()) {
//                 setFilteredResultData(dataToFilter);
//                 setNoResults(false);
//                 updateTotalPages(dataToFilter.length);
//                 return;
//             }
            
//             const results = dataToFilter.filter(result =>
//                 result.itemCode.toLowerCase().includes(lowercasedTerm) ||
//                 result.itemCodeName.toLowerCase().includes(lowercasedTerm) ||
//                 result.name.toLowerCase().includes(lowercasedTerm) ||
//                 result.schoolName.toLowerCase().includes(lowercasedTerm)
//             );
            
//             setFilteredResultData(results);
//             setNoResults(results.length === 0);
//             updateTotalPages(results.length);
//         }
//     };
    
//     // Update total pages when data changes
//     const updateTotalPages = (itemCount) => {
//         setTotalPages(Math.ceil(itemCount / itemsPerPage));
//     };

//     // Update total pages when filtered data changes
//     useEffect(() => {
//         if (selectedResultType === 'School Points') {
//             updateTotalPages(filteredData.length);
//         } else {
//             updateTotalPages(filteredResultData.length);
//         }
//     }, [filteredData, filteredResultData, itemsPerPage, selectedResultType]);
    
//     const getPageHeading = () => {
//         switch (selectedResultType) {
//             case "School Points":
//                 return "Publish Result School Points List";
//             case "All Result":
//                 return "Publish All Results List";
//             case "Status of Festival":
//                 return "Festival Status Overview";
//             case "Declared Result":
//             default:
//                 return "Publish Declared Result List";
//         }
//     };

//     const getPrintTitle = () => {
//         let festivalName = "";
//         switch (selectedFestival) {
//             case "UP Kalaivizha":
//                 festivalName = "UP Tamil Kalaivizha";
//                 break;
//             case "Lp Kalaivizha":
//                 festivalName = "LP Tamil Kalaivizha";
//                 break;
//             case "Hs Kalaivizha":
//                 festivalName = "HS Tamil Kalaivizha";
//                 break;
//             case "Hss Kalaivizha":
//                 festivalName = "HSS Tamil Kalaivizha";
//                 break;
//             case "Status View":
//                 festivalName = "Tamil Kalaivizha Status";
//                 break;
//             default:
//                 festivalName = "Tamil Kalaivizha";
//         }

//         return `${festivalName} - ${selectedResultType}`;
//     };

//     const handleFestivalChange = (e) => {
//         const newFestival = e.target.value;
        
//         // Update the festival in the search params
//         setSearchParams(prev => {
//             const newParams = new URLSearchParams(prev);
//             newParams.set('festival', newFestival);
            
//             // If switching to Status View and the current result type isn't All Result or Status of Festival,
//             // set the result type to All Result
//             if (newFestival === "Status View" && 
//                 selectedResultType !== "All Result" && 
//                 selectedResultType !== "Status of Festival") {
//                 newParams.set('resultType', "All Result");
//             }
            
//             return newParams;
//         });
//     };

//     const handleResultTypeChange = (e) => {
//         setSearchParams(prev => {
//             const newParams = new URLSearchParams(prev);
//             newParams.set('resultType', e.target.value);
//             return newParams;
//         });
//         // Reset to first page when changing result type
//         setCurrentPage(1);
//     };

//     // Handle page change
//     const handlePageChange = (pageNumber) => {
//         if (pageNumber < 1 || pageNumber > totalPages) return;
//         setCurrentPage(pageNumber);
//     };

//     // Calculate page numbers to show
//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPagesDisplayed = 5;
        
//         if (totalPages <= maxPagesDisplayed) {
//             // Show all pages if total pages are less than or equal to max display
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             // Always show first page
//             pageNumbers.push(1);
            
//             // Calculate start and end page numbers
//             let startPage, endPage;
            
//             if (currentPage <= 3) {
//                 // If current page is near the beginning
//                 startPage = 2;
//                 endPage = 4;
//                 pageNumbers.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
//                 pageNumbers.push('...');
//             } else if (currentPage >= totalPages - 2) {
//                 // If current page is near the end
//                 pageNumbers.push('...');
//                 startPage = totalPages - 3;
//                 endPage = totalPages - 1;
//                 pageNumbers.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
//             } else {
//                 // If current page is in the middle
//                 pageNumbers.push('...');
//                 pageNumbers.push(currentPage - 1);
//                 pageNumbers.push(currentPage);
//                 pageNumbers.push(currentPage + 1);
//                 pageNumbers.push('...');
//             }
            
//             // Always show last page
//             pageNumbers.push(totalPages);
//         }
        
//         return pageNumbers;
//     };

//     // Get paginated data
//     const getPaginatedData = () => {
//         const indexOfLastItem = currentPage * itemsPerPage;
//         const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        
//         if (selectedResultType === 'School Points') {
//             return filteredData.slice(indexOfFirstItem, indexOfLastItem);
//         } else {
//             return filteredResultData.slice(indexOfFirstItem, indexOfLastItem);
//         }
//     };

//     // PDF generation function using html2pdf
//     const generatePDF = () => {
//         // Create a clone of the table for PDF generation
//         const pdfContent = document.createElement('div');
        
//         // Add title
//         const titleElement = document.createElement('h2');
//         titleElement.textContent = getPrintTitle();
//         titleElement.style.textAlign = 'center';
//         titleElement.style.margin = '20px 0';
//         titleElement.style.fontWeight = 'bold';
//         pdfContent.appendChild(titleElement);

//         // Handle Status View case
//         if (selectedFestival === "Status View" && selectedResultType === "Status of Festival") {
//             // Get content from the printRef
//             if (printRef.current) {
//                 const statusContent = printRef.current.cloneNode(true);
//                 pdfContent.appendChild(statusContent);
//             } else {
//                 // Fallback message if no content is available
//                 const noContentMsg = document.createElement('p');
//                 noContentMsg.textContent = "No status content available for printing";
//                 noContentMsg.style.textAlign = 'center';
//                 pdfContent.appendChild(noContentMsg);
//             }
//         } else {
//             // Create table clone
//             const table = document.createElement('table');
//             table.style.width = '100%';
//             table.style.borderCollapse = 'collapse';
//             table.style.marginTop = '20px';
            
//             // Create table header
//             const thead = document.createElement('thead');
//             const headerRow = document.createElement('tr');
            
//             let headers = [];
            
//             // Set the appropriate headers based on the selected result type
//             if (selectedResultType === "School Points") {
//                 headers = ['Sl No', 'School Code', 'School Name','Sub District','District', 'Point'];
//             } else {
//                 headers = [
//                     'Sl No', 'Item Code & Item Name', 'Reg No', 'Code No', 'Name', 
//                     'No of participate', 'School name','Sub District','District', 'Grade', 'Point'
//                 ];
//             }
            
//             headers.forEach(headerText => {
//                 const th = document.createElement('th');
//                 th.textContent = headerText;
//                 th.style.border = '1px solid #ddd';
//                 th.style.padding = '8px';
//                 th.style.backgroundColor = '#f2f2f2';
//                 th.style.fontWeight = 'bold';
//                 headerRow.appendChild(th);
//             });
            
//             thead.appendChild(headerRow);
//             table.appendChild(thead);
            
//             // Create table body
//             const tbody = document.createElement('tbody');
            
//             if (selectedResultType === "School Points") {
//                 filteredData.forEach((school, index) => {
//                     const row = document.createElement('tr');
                    
//                     // Add cells
//                     const cellData = [
//                         index + 1,
//                         school.schoolCode || "-",
//                         school.schoolName || "-",
//                         result.sub || "-",
//                         result.dis || "-",
//                         school.point.toFixed(1) || "-"
//                     ];
                    
//                     cellData.forEach(text => {
//                         const td = document.createElement('td');
//                         td.textContent = text;
//                         td.style.border = '1px solid #ddd';
//                         td.style.padding = '8px';
//                         td.style.textAlign = 'center';
//                         row.appendChild(td);
//                     });
                    
//                     tbody.appendChild(row);
//                 });
//             } else {
//                 const displayData = filteredResultData.length > 0 ? filteredResultData : resultData;
                
//                 displayData.forEach((result, index) => {
//                     const row = document.createElement('tr');
                    
//                     // Add cells
//                     const cellData = [
//                         index + 1,
//                         result.itemCodeName || "-",
//                         result.regNo || "-",
//                         result.codeNo || "-",
//                         result.name || "-",
//                         result.noOfParticipate || "-",
//                         result.schoolName || "-",
//                         result.sub || "-",
//                         result.dis || "-",
//                         result.grade || "-",
//                         result.point || "-"
//                     ];
                    
//                     cellData.forEach(text => {
//                         const td = document.createElement('td');
//                         td.textContent = text;
//                         td.style.border = '1px solid #ddd';
//                         td.style.padding = '8px';
//                         td.style.textAlign = 'center';
//                         row.appendChild(td);
//                     });
                    
//                     tbody.appendChild(row);
//                 });
//             }
            
//             table.appendChild(tbody);
//             pdfContent.appendChild(table);
//         }
        
//         // PDF filename
//         const fileName = `${selectedFestival.replace(/ /g, '_')}_${selectedResultType.replace(/ /g, '_')}.pdf`;
        
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

//     // Initialize data at component mount
//     useEffect(() => {
//         if (allResultEntry.length === 0) {
//             setResultEntry(resultData);
//         }
//     }, []);

//     // Get current data slice for pagination
//     const paginatedData = getPaginatedData();
    
//     // Calculate index of first and last items on current page for display
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
//     // Total number of items currently displayed
//     const currentDataLength = selectedResultType === 'School Points' 
//         ? filteredData.length 
//         : filteredResultData.length;

//     // Check if Status View is selected in the festival dropdown
//     const isStatusViewSelected = selectedFestival === "Status View";

//     // Check if Status of Festival is selected in the result type dropdown
//     const isStatusOfFestivalSelected = selectedResultType === "Status of Festival";

//     // CSS classes for animation
//     const dropdownAnimationClass = dropdownAnimation 
//     ? "transition-all transform duration-200 ease-in-out opacity-0" 
//     : "transition-all transform duration-200 ease-in-out opacity-100";
  
//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//                         <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//                             {getPageHeading()}
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             {/* Only show the All Result & Status of Festival dropdown when Status View is selected */}
//                             {isStatusViewSelected && (
//                                 <div className={`relative w-full sm:w-40 ${dropdownAnimationClass}`}>
//                                     <select
//                                         className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                         onChange={handleResultTypeChange}
//                                         value={selectedResultType}
//                                     >
//                                         <option value="All Result">All Result</option>
//                                         <option value="Status of Festival">Status of Festival</option>
//                                     </select>
//                                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                         <i className="fa-solid fa-chevron-down"></i>
//                                     </div>
//                                 </div>
//                             )}
                            
//                             {/* Only show the Declared Result & School Points dropdown when Status View is NOT selected */}
//                             {!isStatusViewSelected && (
//                                 <div className={`relative w-full sm:w-40 `}>
//                                     <select
//                                         className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                         onChange={handleResultTypeChange}
//                                         value={selectedResultType}
//                                     >
//                                         <option value="Declared Result">Declared Result</option>
//                                         <option value="School Points">School Points</option>
//                                     </select>
//                                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                         <i className="fa-solid fa-chevron-down"></i>
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="relative w-full sm:w-40">
//                                 <select
//                                     className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                     onChange={handleFestivalChange}
//                                     value={selectedFestival}
//                                 >
//                                     <option value="UP Kalaivizha">UP Kalaivizha</option>
//                                     <option value="Lp Kalaivizha">Lp Kalaivizha</option>
//                                     <option value="Hs Kalaivizha">Hs Kalaivizha</option>
//                                     <option value="Hss Kalaivizha">Hss Kalaivizha</option>
//                                     <option value="All Festival">All Festival</option>
//                                     <option value="Status View">Status View</option>
//                                 </select>
//                                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                     <i className="fa-solid fa-chevron-down"></i>
//                                 </div>
//                             </div>
                            
//                             <button
//                                 onClick={generatePDF}
//                                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//                             >
//                                 Print
//                             </button>
//                         </div>
//                     </div>

//                     {(selectedResultType === "School Points" || selectedResultType === "Declared Result" || selectedResultType === "All Result") && !isStatusOfFestivalSelected && (
//                         <div className={`relative flex mb-5 w-full sm:w-64 md:w-80 `}>
//                             <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
//                                 <input 
//                                     value={searchTerm}
//                                     onChange={handleSearchChange}
//                                     type="text"
//                                     placeholder={
//                                         selectedResultType === "School Points" 
//                                             ? "Search School Code or Name..." 
//                                             : "Search Item, Code or Name..."
//                                     }
//                                     className="w-full bg-transparent outline-none text-sm"
//                                     aria-label={
//                                         selectedResultType === "School Points" 
//                                             ? "Search by school code or name" 
//                                             : "Search by item code, name, or school"
//                                     }
//                                 />
//                                 <div className="text-gray-500">
//                                     <i className="fa-solid fa-magnifying-glass"></i>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Render StatusFest component when Status of Festival is selected */}
//                     {isStatusOfFestivalSelected ? (
//                         <div ref={printRef} >
//                             <SStatusFest festival={selectedFestival} />
//                         </div>
//                     ) : (
//                         <div ref={printRef} className={`w-full `}>
//                             <div className="overflow-x-auto -mx-4 sm:mx-0">
//                                 <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                     <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
//                                         {selectedResultType === "School Points" ? (
//                                             <>
//                                                 <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                                     <thead className="bg-gray-50">
//                                                         <tr className="text-gray-700">
//                                                             <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                             <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
//                                                             <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
//                                                             <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>
//                                                             <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">District</th>
//                                                             <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                                         {paginatedData.length > 0 ? (
//                                                             paginatedData.map((school, index) => (
//                                                                 <tr key={index} className="hover:bg-gray-100">
//                                                                     <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
//                                                                     <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolCode}</td>
//                                                                     <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolName}</td>
//                                                                     <td className="p-2 md:p-3 whitespace-nowrap">{school.sub}</td>
//                                                                     <td className="p-2 md:p-3 whitespace-nowrap">{school.dis}</td>
//                                                                     <td className="p-2 md:p-3 whitespace-nowrap">{school.point.toFixed(1)}</td>
//                                                                 </tr>
//                                                             ))
//                                                         ) : (
//                                                             <tr>
//                                                                 <td colSpan="4" className="p-3 text-center text-gray-500">
//                                                                     No records found for {selectedFestival}
//                                                                 </td>
//                                                             </tr>
//                                                         )}
//                                                     </tbody>
//                                                 </table>
//                                                 {noResults && (
//                                                     <div className="text-center py-8 bg-gray-50">
//                                                         <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
//                                                         <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
//                                                     </div>
//                                                 )}
//                                             </>
//                                         ) : (
//                                             <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                                 <thead className="bg-gray-50">
//                                                     <tr className="text-gray-700">
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code No</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of partcipate</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School name</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">District</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                                     {paginatedData.length > 0 ? (
//                                                         paginatedData.map((result, index) => (
//                                                             <tr key={result.slNo} className="hover:bg-gray-100">
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCodeName}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.codeNo}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.name}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.noOfParticipate}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.schoolName}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.sub}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.dis}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
//                                                             </tr>
//                                                         ))
//                                                     ) : (
//                                                         <tr>
//                                                             <td colSpan="9" className="p-3 text-center text-gray-500">
//                                                                 No records found for {selectedFestival}
//                                                             </td>
//                                                         </tr>
//                                                     )}
//                                                 </tbody>
//                                             </table>
//                                         )}
//                                          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                   {/* Showing X of Y rows */}
//                   <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                     {paginatedData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, paginatedData.length)} of ${paginatedData.length} rows` : '0 rows'}
//                   </div>
                  
//                   {/* Pagination Controls */}
//                   <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                     {/* Previous Button with icon */}
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                     >
//                       <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                       <span className="hidden sm:inline p-1">Previous</span>
//                     </button>
                    
//                     {/* Page Numbers */}
//                     <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                       {renderPageNumbers().map((page, index) => (
//                         <button
//                           key={index}
//                           onClick={() => page !== '...' && handlePageChange(page)}
//                           className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${
//                             currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
//                           } ${page === '...' ? 'pointer-events-none' : ''}`}
//                         >
//                           {page}
//                         </button>
//                       ))}
//                     </div>
                    
//                     {/* Next Button with icon */}
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages || totalPages === 0}
//                       className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
//                     >
//                       <span className="hidden sm:inline p-1">Next</span>
//                       <i className="fa-solid fa-angle-right"></i>
//                     </button>
//                   </div>
//                 </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     )
// }


// export default SPublishDeclarList

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import DeclaredResult from '../components/DeclaredResult';
import html2pdf from 'html2pdf.js';
import SDeclared from '../components/SDeclared';

const SPublishDeclarList = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const printRef = useRef(null);

    // State to track the selected result type
    const [resultType, setResultType] = useState(searchParams.get('resultType') || 'Declared Result');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFestival, setSelectedFestival] = useState(searchParams.get('festival') || 'UP Tamil Kalaivizha');
    const [showResultTypeDropdown, setShowResultTypeDropdown] = useState(true);
    const [showAllResultDropdown, setShowAllResultDropdown] = useState(false);
    const [allResultType, setAllResultType] = useState('All Result');
    const [festivalStatus, setFestivalStatus] = useState([
        { festival: 'UP Tamil Kalaivizha', totalItems: 11, completedItems: 10, notCompletedItems: 1, itemCodeRange: [300, 400] },
        { festival: 'Lp Tamil Kalaivizha', totalItems: 15, completedItems: 12, notCompletedItems: 3, itemCodeRange: [401, 500] },
        { festival: 'Hs Tamil Kalaivizha', totalItems: 20, completedItems: 18, notCompletedItems: 2, itemCodeRange: [501, 600] },
        { festival: 'Hss Tamil Kalaivizha', totalItems: 25, completedItems: 22, notCompletedItems: 3, itemCodeRange: [601, Infinity] },
    ]);

    // Dummy data for School Points
    const [allSchoolPointsData, setAllSchoolPointsData] = useState([
        { slNo: 1, schoolCode: 'SCH001', schoolName: 'Example School 1', subDistrict: 'District A', district: "Thiruvananthapuram", points: 85, Itemcode: 302 },
        { slNo: 2, schoolCode: 'SCH002', schoolName: 'Another School', subDistrict: 'District B', district: "Palakkad", points: 92, Itemcode: 456 },
        { slNo: 3, schoolCode: 'SCH003', schoolName: 'Test School 3', subDistrict: 'District C', district: "Kozhikode", points: 78, Itemcode: 325 },
        { slNo: 4, schoolCode: 'SCH004', schoolName: 'Sample Academy', subDistrict: 'District A', district: "Kannur", points: 90, Itemcode: 510 },
        { slNo: 5, schoolCode: 'SCH005', schoolName: 'Central School', subDistrict: 'District D',district: "Idukki", points: 83, Itemcode: 612 },
        { slNo: 6, schoolCode: 'SCH006', schoolName: 'Public School', subDistrict: 'District B',district: "Idukki", points: 88, Itemcode: 350 },
        { slNo: 7, schoolCode: 'SCH007', schoolName: 'Modern School', subDistrict: 'District C',district: "Idukki", points: 95, Itemcode: 475 },
        { slNo: 8, schoolCode: 'SCH008', schoolName: 'Global Academy', subDistrict: 'District E',district: "Ernakulam", points: 82, Itemcode: 530 },
        { slNo: 9, schoolCode: 'SCH009', schoolName: 'Eastern High', subDistrict: 'District A',district: "Ernakulam", points: 91, Itemcode: 622 },
        { slNo: 10, schoolCode: 'SCH010', schoolName: 'Western High', subDistrict: 'District D',  district: "Malappuram", points: 86, Itemcode: 380 },
        { slNo: 11, schoolCode: 'SCH011', schoolName: 'Northern School', subDistrict: 'District B',  district: "Malappuram", points: 79, Itemcode: 490 },
    ]);
    const [schoolPointsData, setSchoolPointsData] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    // Function to filter school points data based on the selected festival
    useEffect(() => {
        if (selectedFestival === 'UP Tamil Kalaivizha') {
            setSchoolPointsData(allSchoolPointsData.filter(item => item.Itemcode >= 300 && item.Itemcode <= 400));
        } else if (selectedFestival === 'Lp Tamil Kalaivizha') {
            setSchoolPointsData(allSchoolPointsData.filter(item => item.Itemcode >= 401 && item.Itemcode <= 500));
        } else if (selectedFestival === 'Hs Tamil Kalaivizha') {
            setSchoolPointsData(allSchoolPointsData.filter(item => item.Itemcode >= 501 && item.Itemcode <= 600));
        } else if (selectedFestival === 'Hss Tamil Kalaivizha') {
            setSchoolPointsData(allSchoolPointsData.filter(item => item.Itemcode >= 601));
        } else if (selectedFestival === 'ALL Festivel') {
            setSchoolPointsData(allSchoolPointsData);
        } else {
            setSchoolPointsData([]);
        }
    }, [selectedFestival, allSchoolPointsData]);

    // Function to update URL parameters
    const updateUrl = (newParams) => {
        const currentParams = new URLSearchParams(searchParams);
        for (const key in newParams) {
            if (newParams.hasOwnProperty(key)) {
                if (newParams[key]) {
                    currentParams.set(key, newParams[key]);
                } else {
                    currentParams.delete(key);
                }
            }
        }
        navigate(`?${currentParams.toString()}`, { replace: true });
    };

    // Handle result type change
    const handleResultTypeChange = (e) => {
        const newResultType = e.target.value;
        setResultType(newResultType);
        updateUrl({ resultType: newResultType });
        setCurrentPage(1); // Reset to first page when changing result type
    };

    // Handle all result type change
    const handleAllResultTypeChange = (e) => {
        setAllResultType(e.target.value);
        setCurrentPage(1); // Reset to first page when changing result type
    };

    // Effect to toggle dropdowns based on festival selection
    useEffect(() => {
        if (selectedFestival === 'Status View') {
            const fadeOut = setTimeout(() => {
                setShowResultTypeDropdown(false);
                const fadeIn = setTimeout(() => {
                    setShowAllResultDropdown(true);
                }, 300);
                return () => clearTimeout(fadeIn);
            }, 300);
            return () => clearTimeout(fadeOut);
        } else {
            const fadeOut = setTimeout(() => {
                setShowAllResultDropdown(false);
                const fadeIn = setTimeout(() => {
                    setShowResultTypeDropdown(true);
                }, 300);
                return () => clearTimeout(fadeIn);
            }, 300);
            return () => clearTimeout(fadeOut);
        }
    }, [selectedFestival]);

    // Handle festival selection change
    const handleFestivalChange = (e) => {
        const newFestival = e.target.value;
        setSelectedFestival(newFestival);
        setSearchTerm(''); // Clear search term when festival changes
        updateUrl({ festival: newFestival });
        setCurrentPage(1); // Reset to first page when changing festival
    };

    // Get formatted current date
    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePrint = () => {
        // Create a new document for proper PDF layout
        const printWindow = document.createElement('div');
        printWindow.style.width = '100%';
        printWindow.style.padding = '20px';
        printWindow.style.fontFamily = 'Arial, sans-serif';

        // Add proper header with logo and title
        const headerSection = document.createElement('div');
        headerSection.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #003566; padding-bottom: 10px;">
            <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 4px; color: #003566;">Tamil Kalaivizha Results System</h1>
            <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">${resultType} - ${selectedFestival}</h2>
            <p style="font-size: 12px; color: #555; margin-bottom: 0;">Generated on: ${getCurrentDate()}</p>
            ${searchTerm ? `<p style="font-size: 11px; font-style: italic; margin-bottom: 0;">Filtered by: "${searchTerm}"</p>` : ''}
        </div>
    `;

        printWindow.appendChild(headerSection);

        // Create the content section based on view type
        const contentSection = document.createElement('div');
        contentSection.style.width = '100%';

        // Create appropriate table based on current view
        if (selectedFestival === 'Status View') {
            // Create a table for festival status
            const table = createStatusTable(festivalStatus);
            contentSection.appendChild(table);
        }
        else if (resultType === 'School Points') {
            // Create table for School Points
            const table = createSchoolPointsTable(filteredSchoolPointsData);
            contentSection.appendChild(table);
        }
        else {
            // Create table for Declared Results
            const table = createDeclaredResultTable(filteredResults || []); // Use the filteredResults from DeclaredResult component
            contentSection.appendChild(table);
        }

        printWindow.appendChild(contentSection);

        // Add footer with page number placeholder and copyright
        const footerSection = document.createElement('div');
        footerSection.innerHTML = `
       
    `;

        printWindow.appendChild(footerSection);

        // Create a descriptive filename
        let filename = `${selectedFestival}-${resultType.replace(' ', '-')}`;
        if (searchTerm) {
            const sanitizedSearch = searchTerm.substring(0, 15).replace(/[^a-z0-9]/gi, '-');
            filename += `-${sanitizedSearch}`;
        }
        filename += `.pdf`;

        // Configure PDF options for better output
        const pdfOptions = {
            margin: [15, 10, 15, 10], // top, right, bottom, left margins in mm
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                letterRendering: true,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break-before',
                after: '.page-break-after'
            }
        };

        // Generate the PDF with pagination
        html2pdf()
            .from(printWindow)
            .set(pdfOptions)
            .toPdf()
            .get('pdf')
            .then((pdf) => {
                // Add page numbers
                const totalPages = pdf.internal.getNumberOfPages();
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    pdf.setFontSize(8);
                    pdf.setTextColor(100);
                    pdf.text(`${i} of ${totalPages}`, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 7, {
                        align: 'center'
                    });
                }
            })
            .save();
    };

    // Helper function to create a status table
    const createStatusTable = (festivalStatus) => {
        const table = document.createElement('table');
        setTableStyles(table);

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Festival', 'Total Items', 'Items Completed', 'Items Not Completed'];
        const widths = ['40%', '20%', '20%', '20%'];

        headers.forEach((headerText, index) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            setHeaderCellStyles(th);
            th.style.width = widths[index];
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        festivalStatus.forEach((status, index) => {
            const row = document.createElement('tr');
            row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

            // Create cells for each column
            const columns = [
                status.festival,
                status.totalItems,
                status.completedItems,
                status.notCompletedItems
            ];

            columns.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                setDataCellStyles(td);
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        return table;
    };

    // Helper function to create a school points table
    const createSchoolPointsTable = (schoolPointsData) => {
        const table = document.createElement('table');
        setTableStyles(table);

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Sl No', 'School Code', 'School Name', 'Sub District', 'Points'];
        const widths = ['7%', '15%', '43%', '20%', '15%'];

        headers.forEach((headerText, index) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            setHeaderCellStyles(th);
            th.style.width = widths[index];
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        schoolPointsData.forEach((school, index) => {
            const row = document.createElement('tr');
            row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

            // Create cells for each column
            const columns = [
                school.slNo,
                school.schoolCode,
                school.schoolName,
                school.subDistrict,
                school.points
            ];

            columns.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                setDataCellStyles(td);
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        return table;
    };

    // Helper function to create a declared result table
    const createDeclaredResultTable = (declaredResults) => {
        const table = document.createElement('table');
        setTableStyles(table);

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Sl No', 'Item Code & Name', 'Reg No', 'Code No', 'Name', 'Class', 'School Name', 'Sub District', 'Grade', 'Point'];
        const widths = ['5%', '15%', '8%', '8%', '12%', '5%', '20%', '12%', '5%', '10%'];

        headers.forEach((headerText, index) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            setHeaderCellStyles(th);
            th.style.width = widths[index];
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        if (declaredResults.length > 0) {
            declaredResults.forEach((result, index) => {
                const row = document.createElement('tr');
                row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

                // Create cells for each column
                const columns = [
                    index + 1,
                    `${result.itemCode} - ${result.itemName}`,
                    result.regNo,
                    result.codeNo,
                    result.name,
                    result.className,
                    result.schoolName,
                    result.subDistrict,
                    result.grade,
                    result.point
                ];

                columns.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    setDataCellStyles(td);
                    row.appendChild(td);
                });

                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.setAttribute('colspan', '10');
            cell.textContent = 'No results found';
            cell.style.padding = '10px';
            cell.style.textAlign = 'center';
            row.appendChild(cell);
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        return table;
    };

    // Helper function for setting consistent table styles
    const setTableStyles = (table) => {
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.fontSize = '10px';
        table.style.border = '1px solid #ddd';
        table.style.marginBottom = '15px';
    };

    // Helper function for setting header cell styles
    const setHeaderCellStyles = (cell) => {
        cell.style.padding = '6px';
        cell.style.backgroundColor = '#f0f7ff';
        cell.style.color = '#003566';
        cell.style.border = '1px solid #ccc';
        cell.style.fontWeight = 'bold';
        cell.style.textAlign = 'center';
    };

    // Helper function for setting data cell styles
    const setDataCellStyles = (cell) => {
        cell.style.padding = '4px';
        cell.style.border = '1px solid #ddd';
        cell.style.textAlign = 'center';
    }; 
    
    const getHeading = () => {
        if (selectedFestival === 'Status View') {
            return 'Publish Declared Result List';
        }
        if (resultType === 'School Points') {
            return 'Publish Result School Points List';
        }
        return 'Publish Declared Result List';
    };

    const handleStatusClick = (type, festivalName) => {
        navigate(`/festival-statu?festival=${festivalName}&status=${type}`);
    };
    
    // Filter school points data based on search term
    const filteredSchoolPointsData = schoolPointsData.filter(school => {
        const searchLower = searchTerm.toLowerCase();
        return (
            school.schoolName.toLowerCase().includes(searchLower) ||
            school.schoolCode.toLowerCase().includes(searchLower) ||
            school.subDistrict.toLowerCase().includes(searchLower)
        );
    });

    {/* Pagination logic */}
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentSchoolItems = filteredSchoolPointsData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredSchoolPointsData.length / rowsPerPage);

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

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-xl font-bold leading-none tracking-tight">
                            {getHeading()}
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            {/* All Result dropdown */}
                            {showAllResultDropdown && (
                                <div className={`relative w-full sm:w-40 transition-all duration-300 opacity-100 scale-100`}>
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                        id="all-result-type-select"
                                        value={allResultType}
                                        onChange={handleAllResultTypeChange}
                                    >
                                        <option value="All Result">All Result</option>
                                        <option value="Status of Festival">Status of Festival</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Declared Result dropdown */}
                            {showResultTypeDropdown && (
                                <div className={`relative w-full sm:w-40 transition-all duration-300 opacity-100 scale-100`}>
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                        value={resultType}
                                        onChange={handleResultTypeChange}
                                    >
                                        <option value="Declared Result">Declared Result</option>
                                        <option value="School Points">School Points</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="festival-select"
                                    value={selectedFestival}
                                    onChange={handleFestivalChange}
                                >
                                    <option value="UP Tamil Kalaivizha">UP Tamil Kalaivizha</option>
                                    <option value="Lp Tamil Kalaivizha">Lp Tamil Kalaivizha</option>
                                    <option value="Hs Tamil Kalaivizha">Hs Tamil Kalaivizha</option>
                                    <option value="Hss Tamil Kalaivizha">Hss Tamil Kalaivizha</option>
                                    <option value="ALL Festivel">ALL Festivel</option>
                                    <option value="Status View">Status View</option>
                                </select>
                                <label
                                    htmlFor="festival-select"
                                    className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                                >
                                    Festival
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <button
                                onClick={handlePrint}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                            >
                                Print
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    {selectedFestival !== 'Status View' && (
                        <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
                            <input
                                type="text"
                                placeholder="Search school Name or code..."
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page when searching
                                }}
                            />
                            <div className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* The content to be printed - only filtered results will be printed */}
                    <div className="w-full mt-4" id="content-to-print" ref={printRef}>
                        {/* These headers are hidden in the UI but will appear in the PDF */}
                        <div className="print-only-headers hidden">
                            <h1 className="text-center text-xl font-bold">Tamil Kalaivizha Results</h1>
                            <h2 className="text-center text-lg font-bold">{selectedFestival}</h2>
                            <p className="text-center">{resultType}</p>
                            <p className="text-center text-sm">Date: {getCurrentDate()}</p>
                            {searchTerm && <p className="text-center text-sm">Filter: "{searchTerm}"</p>}
                        </div>

                        {selectedFestival !== 'Status View' ? (
                            resultType === 'Declared Result' ? (
                                <SDeclared
                                    searchTerm={searchTerm}
                                    selectedFestival={selectedFestival}
                                    printRef={printRef}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rowsPerPage={rowsPerPage}
                                />
                            ) : (

                                <div className="overflow-x-auto -mx-4 sm:mx-0">
                                    <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                        <div className=" overflow-hidden border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                                <thead className="bg-gray-50">
                                                    <tr className="text-gray-700">
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code & Name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm"> District</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                    {filteredSchoolPointsData.map((school, index) => (
                                                        <tr key={index} className="hover:bg-gray-100">
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.slNo}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolCode}-{school.schoolName}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.subDistrict}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.district}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.points}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                     
                                        </div>
                                               
                                        {/* Pagination */}
                                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                                            {/* Showing X of Y rows */}
                                            <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                                                {filteredSchoolPointsData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredSchoolPointsData.length)} of ${filteredSchoolPointsData.length} rows` : '0 rows'}
                                            </div>
                                            
                                            {/* Pagination Controls */}
                                            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                                                {/* Previous Button with icon */}
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        
                                   
                                
                            )
                        ) : (
                            <div className="mt-4 p-4 bg-white rounded-lg ">
                                {/* <h3 className="text-lg font-medium text-gray-900">Festival Status View</h3> */}
                                <p className="mt-2 text-gray-600">
                                    {allResultType === 'All Result' ?
                                        <div className="w-full">
                                            <SDeclared
                                                searchTerm={searchTerm}
                                                selectedFestival={'ALL Festivel'}
                                                printRef={printRef}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                                rowsPerPage={rowsPerPage}
                                            />
                                        </div> :
                                        <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                            <thead className="bg-gray-50">
                                                <tr className="text-gray-700">
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Item Total</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Items Completed</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Items Not Completed</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white  text-xs sm:text-sm">
                                                {festivalStatus.map((status) => (
                                                    <tr key={status.festival} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap text-blue-500 cursor-pointer" onClick={() => handleStatusClick('total', status.festival)}>
                                                            {status.festival} ({status.totalItems})
                                                        </td>


                                                        <td className="p-2 md:p-3 whitespace-nowrap text-blue-500 cursor-pointer" onClick={() => handleStatusClick('completed', status.festival)}>
                                                            {status.completedItems}
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap text-blue-500 cursor-pointer" onClick={() => handleStatusClick('not-completed', status.festival)}>
                                                            {status.notCompletedItems}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        
                                    }
                                </p>
                              

                            </div>
                            
                        )}
                    </div>
                    
                </div>
            
            </div>
            


        </>
    );
};

export default SPublishDeclarList;
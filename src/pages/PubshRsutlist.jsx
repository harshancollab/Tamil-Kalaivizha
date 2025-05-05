// import React, { useEffect, useRef, useState } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { useSearchParams } from 'react-router-dom'
// import { getAllPublishentryListAPI } from '../services/allAPI'
// import html2pdf from 'html2pdf.js'
// import StatusFest from '../components/StatusFest'

// const PublishResultList = () => {
//     const printRef = useRef();
//     const [searchParams, setSearchParams] = useSearchParams();
//     const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
//     const selectedResultType = searchParams.get('resultType') || "Declared Result";
//     const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
//     const [filteredData, setFilteredData] = useState([]);
//     const [filteredResultData, setFilteredResultData] = useState([]);
//     const [noResults, setNoResults] = useState(false);
//     const [allResultEntry, setResultEntry] = useState([]);

//     useEffect(() => {
//         // getAllresultentry();
//     }, []);

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
//             grade: "A",
//             point: 9.5
//         },
//         {
//             slNo: 2,
//             itemCodeName: "302 - Essay Writing",
//             itemCode: "302",
//             regNo: "1002",
//             codeNo: "SN-102",
//             name: "Priya Singh",
//             noOfParticipate: 1,
//             schoolName: "Modern Public School",
//             schoolCode: "MPS-02",
//             grade: "A+",
//             point: 10.0
//         },
//         {
//             slNo: 3,
//             itemCodeName: "303 - Elocution",
//             itemCode: "303",
//             regNo: "1003",
//             codeNo: "SN-103",
//             name: "Ahmed Khan",
//             noOfParticipate: 1,
//             schoolName: "Delhi Public School",
//             schoolCode: "DPS-03",
//             grade: "A-",
//             point: 9.0
//         },
//         {
//             slNo: 4,
//             itemCodeName: "401 - Group Dance",
//             itemCode: "401",
//             regNo: "1004",
//             codeNo: "GR-104",
//             name: "Dance Team A",
//             noOfParticipate: 8,
//             schoolName: "Kendriya Vidyalaya",
//             schoolCode: "KV-04",
//             grade: "B+",
//             point: 8.0
//         },
//         {
//             slNo: 5,
//             itemCodeName: "402 - Music",
//             itemCode: "402",
//             regNo: "1005",
//             codeNo: "SN-105",
//             name: "Meera Patel",
//             noOfParticipate: 1,
//             schoolName: "St. Xavier's School",
//             schoolCode: "SXS-05",
//             grade: "A",
//             point: 9.5
//         },
//         {
//             slNo: 6,
//             itemCodeName: "501 - Quiz",
//             itemCode: "501",
//             regNo: "1006",
//             codeNo: "GR-106",
//             name: "Quiz Team B",
//             noOfParticipate: 3,
//             schoolName: "DAV Public School",
//             schoolCode: "DAV-06",
//             grade: "B+",
//             point: 8.5
//         },
//         {
//             slNo: 7,
//             itemCodeName: "502 - Painting",
//             itemCode: "502",
//             regNo: "007",
//             codeNo: "SN-107",
//             name: "Sofia Thomas",
//             noOfParticipate: 1,
//             schoolName: "Army Public School",
//             schoolCode: "APS-07",
//             grade: "B",
//             point: 7.5
//         },
//         {
//             slNo: 8,
//             itemCodeName: "601 - Drama",
//             itemCode: "601",
//             regNo: "1008",
//             codeNo: "GR-108",
//             name: "Drama Team C",
//             noOfParticipate: 6,
//             schoolName: "Ryan International School",
//             schoolCode: "RIS-08",
//             grade: "B+",
//             point: 8.0
//         }
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
//         filterSchools(initialSearchTerm);
//     }, [searchParams]);

//     // Check if we need to update result type when festival changes
//     useEffect(() => {
//         // If Status View is selected and result type is All Result, keep it
//         // Otherwise if Status View is selected and result type is not All Result or Status of Festival,
//         // set it to Declared Result
//         if (selectedFestival === "Status View") {
//             if (selectedResultType !== "All Result" && selectedResultType !== "Status of Festival") {
//                 setSearchParams(prev => {
//                     const newParams = new URLSearchParams(prev);
//                     newParams.set('resultType', "Declared Result");
//                     return newParams;
//                 });
//             }
//         }
//     }, [selectedFestival]);

//     const handleSearchChange = (event) => {
//         const newSearchTerm = event.target.value;
//         setSearchTerm(newSearchTerm);
//         setSearchParams(prev => {
//             const newParams = new URLSearchParams(prev);
//             newParams.set('code', newSearchTerm);
//             return newParams;
//         });
//         filterSchools(newSearchTerm);
//     };

//     const filterSchools = (term, schoolData = null) => {
//         const dataToFilter = schoolData || filteredData.length > 0 ? filteredData : getSchoolPointsData();
//         const lowercasedTerm = term.toLowerCase();
        
//         if (!term.trim()) {
//             setFilteredData(dataToFilter);
//             setNoResults(false);
//             return;
//         }
        
//         const results = dataToFilter.filter(school =>
//             school.schoolCode.toLowerCase().includes(lowercasedTerm) ||
//             school.schoolName.toLowerCase().includes(lowercasedTerm)
//         );
        
//         setFilteredData(results);
//         setNoResults(results.length === 0);
//     };

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
//             // set the result type to Declared Result
//             if (newFestival === "Status View" && 
//                 selectedResultType !== "All Result" && 
//                 selectedResultType !== "Status of Festival") {
//                 newParams.set('resultType', "Declared Result");
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
//     };

//     // New PDF generation function using html2pdf
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

//         // Create table clone
//         const table = document.createElement('table');
//         table.style.width = '100%';
//         table.style.borderCollapse = 'collapse';
//         table.style.marginTop = '20px';
        
//         // Create table header
//         const thead = document.createElement('thead');
//         const headerRow = document.createElement('tr');
        
//         let headers = [];
        
//         // Set the appropriate headers based on the selected result type
//         if (selectedResultType === "School Points") {
//             headers = ['Sl No', 'School Code', 'School Name', 'Point'];
//         } else {
//             headers = [
//                 'Sl No', 'Item Code & Item Name', 'Reg No', 'Code No', 'Name', 
//                 'No of participate', 'School name', 'Grade', 'Point'
//             ];
//         }
        
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
        
//         if (selectedResultType === "School Points") {
//             filteredData.forEach((school, index) => {
//                 const row = document.createElement('tr');
                
//                 // Add cells
//                 const cellData = [
//                     index + 1,
//                     school.schoolCode || "-",
//                     school.schoolName || "-",
//                     school.point.toFixed(1) || "-"
//                 ];
                
//                 cellData.forEach(text => {
//                     const td = document.createElement('td');
//                     td.textContent = text;
//                     td.style.border = '1px solid #ddd';
//                     td.style.padding = '8px';
//                     td.style.textAlign = 'center';
//                     row.appendChild(td);
//                 });
                
//                 tbody.appendChild(row);
//             });
//         } else {
//             const displayData = filteredResultData.length > 0 ? filteredResultData : resultData;
            
//             displayData.forEach((result, index) => {
//                 const row = document.createElement('tr');
                
//                 // Add cells
//                 const cellData = [
//                     index + 1,
//                     result.itemCodeName || "-",
//                     result.regNo || "-",
//                     result.codeNo || "-",
//                     result.name || "-",
//                     result.noOfParticipate || "-",
//                     result.schoolName || "-",
//                     result.grade || "-",
//                     result.point || "-"
//                 ];
                
//                 cellData.forEach(text => {
//                     const td = document.createElement('td');
//                     td.textContent = text;
//                     td.style.border = '1px solid #ddd';
//                     td.style.padding = '8px';
//                     td.style.textAlign = 'center';
//                     row.appendChild(td);
//                 });
                
//                 tbody.appendChild(row);
//             });
//         }
        
//         table.appendChild(tbody);
//         pdfContent.appendChild(table);
        
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

//     // Determine what data to display
//     const displayResultData = filteredResultData.length > 0 ? filteredResultData : resultData;

//     // Check if Status View is selected in the festival dropdown
//     const isStatusViewSelected = selectedFestival === "Status View";

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
//                                 <div className="relative w-full sm:w-40">
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
//                                 <div className="relative w-full sm:w-40">
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

//                     {selectedResultType === "School Points" && (
//                         <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
//                             <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
//                                 <input 
//                                     value={searchTerm}
//                                     onChange={handleSearchChange}
//                                     type="text"
//                                     placeholder="Search School Code or Name..."
//                                     className="w-full bg-transparent outline-none text-sm"
//                                     aria-label="Search by school code or name"
//                                 />
//                                 <div className="text-gray-500">
//                                     <i className="fa-solid fa-magnifying-glass"></i>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     <div ref={printRef} className="w-full">
//                         <div className="overflow-x-auto -mx-4 sm:mx-0">
//                             <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                 <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
//                                     {selectedResultType === "School Points" ? (
//                                         <>
//                                             <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                                 <thead className="bg-gray-50">
//                                                     <tr className="text-gray-700">
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
//                                                         <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                                     {filteredData.length > 0 ? (
//                                                         filteredData.map((school, index) => (
//                                                             <tr key={index} className="hover:bg-gray-100">
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{index + 1}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolCode}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolName}</td>
//                                                                 <td className="p-2 md:p-3 whitespace-nowrap">{school.point.toFixed(1)}</td>
//                                                             </tr>
//                                                         ))
//                                                     ) : (
//                                                         <tr>
//                                                             <td colSpan="4" className="p-3 text-center text-gray-500">
//                                                                 No records found for {selectedFestival}
//                                                             </td>
//                                                         </tr>
//                                                     )}
//                                                 </tbody>
//                                             </table>
//                                             {noResults && (
//                                                 <div className="text-center py-8 bg-gray-50">
//                                                     <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
//                                                     <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
//                                                 </div>
//                                             )}
//                                         </>
//                                     ) : (
//                                         <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                             <thead className="bg-gray-50">
//                                                 <tr className="text-gray-700">
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code No</th>
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name</th>
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of partcipate</th>
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School name</th>
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
//                                                     <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                                 {displayResultData.length > 0 ? (
//                                                     displayResultData.map((result) => (
//                                                         <tr key={result.slNo} className="hover:bg-gray-100">
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCodeName}</td>
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.codeNo}</td>
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.name}</td>
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.noOfParticipate}</td>
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.schoolName}</td>
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
//                                                             <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="9" className="p-3 text-center text-gray-500">
//                                                             No records found for {selectedFestival}
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </table>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default PublishResultList
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { getAllPublishentryListAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js'
import StatusFest from '../components/StatusFest'

const PublishResultList = () => {
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const selectedResultType = searchParams.get('resultType') || "Declared Result";
    const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
    const [filteredData, setFilteredData] = useState([]);
    const [filteredResultData, setFilteredResultData] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [allResultEntry, setResultEntry] = useState([]);
    // Animation state
    const [dropdownAnimation, setDropdownAnimation] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getAllresultentry();
    }, []);

    // Add animation effect when dropdown changes
    useEffect(() => {
        setDropdownAnimation(true);
        const timer = setTimeout(() => {
            setDropdownAnimation(false);
        }, 500); // Duration of animation
        
        return () => clearTimeout(timer);
    }, [selectedFestival, selectedResultType]);

    const getAllresultentry = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllPublishentryListAPI(reqHeader)
                if (result.status === 200) {
                    setResultEntry(result.data)
                }
            } catch (err) {
                console.log(err);
                // Set dummy data if API fails
                setResultEntry(resultData);
            }
        } else {
            // Set dummy data if no token
            setResultEntry(resultData);
        }
    }

    // Dummy data for the result list
    const resultData = [
        {
            slNo: 1,
            itemCodeName: "301 - Story Writing",
            itemCode: "301",
            regNo: "1001",
            codeNo: "SN-101",
            name: "Rahul Kumar",
            noOfParticipate: 1,
            schoolName: "St. Mary's High School",
            schoolCode: "SMHS-01",
            grade: "A",
            point: 9.5
        },
     
    ];

    // Filter result data based on selected festival
    useEffect(() => {
        filterResultDataByFestival();
    }, [selectedFestival, allResultEntry]);

    const filterResultDataByFestival = () => {
        let dataToFilter = allResultEntry.length > 0 ? allResultEntry : resultData;
        
        let filtered;
        switch (selectedFestival) {
            case "UP Kalaivizha":
                filtered = dataToFilter.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 300 && itemCode < 400;
                });
                break;
            case "Lp Kalaivizha":
                filtered = dataToFilter.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 400 && itemCode < 500;
                });
                break;
            case "Hs Kalaivizha":
                filtered = dataToFilter.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 500 && itemCode < 600;
                });
                break;
            case "Hss Kalaivizha":
                filtered = dataToFilter.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 600 && itemCode < 700;
                });
                break;
            case "All Festival":
            case "Status View":
            default:
                filtered = [...dataToFilter];
        }

        // Add sequential numbering to filtered results
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredResultData(filtered);
        
        // Generate school points from the filtered data
        const schoolPointsData = getSchoolPointsData(filtered);
        setFilteredData(schoolPointsData);
        
        // Update search results if search term exists
        if (searchTerm.trim()) {
            filterSchools(searchTerm, schoolPointsData);
        }
        
        // Reset pagination to first page
        setCurrentPage(1);
    };

    function getSchoolPointsData(data = []) {
        const dataToUse = data.length > 0 ? data : 
            (filteredResultData.length > 0 ? filteredResultData : resultData);
        
        const schoolMap = {};

        dataToUse.forEach(item => {
            if (!schoolMap[item.schoolName]) {
                schoolMap[item.schoolName] = {
                    slNo: Object.keys(schoolMap).length + 1,
                    schoolCode: item.schoolCode,
                    schoolName: item.schoolName,
                    point: item.point
                };
            } else {
                schoolMap[item.schoolName].point += item.point;
            }
        });

        return Object.values(schoolMap).sort((a, b) => b.point - a.point);
    };
    
    useEffect(() => {
        const initialSearchTerm = searchParams.get('code') || '';
        setSearchTerm(initialSearchTerm);
        
        // Apply filter only if there's a search term
        if (initialSearchTerm) {
            filterSchools(initialSearchTerm);
        }
    }, [searchParams, selectedResultType]);
    
    // Also ensure that when festival changes, we reset the filtered data
    useEffect(() => {
        filterResultDataByFestival();
        // Reset search when festival changes
        if (searchTerm) {
            filterSchools(searchTerm);
        }
    }, [selectedFestival, allResultEntry]);

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('code', newSearchTerm);
            return newParams;
        });
        filterSchools(newSearchTerm);
        setCurrentPage(1); // Reset to first page on search
    };

    const filterSchools = (term, schoolData = null) => {
        // If searching in School Points view
        if (selectedResultType === "School Points") {
            const dataToFilter = schoolData || (filteredData.length > 0 ? filteredData : getSchoolPointsData());
            const lowercasedTerm = term.toLowerCase();
            
            if (!term.trim()) {
                setFilteredData(dataToFilter);
                setNoResults(false);
                updateTotalPages(dataToFilter.length);
                return;
            }
            
            const results = dataToFilter.filter(school =>
                school.schoolCode.toLowerCase().includes(lowercasedTerm) ||
                school.schoolName.toLowerCase().includes(lowercasedTerm)
            );
            
            setFilteredData(results);
            setNoResults(results.length === 0);
            updateTotalPages(results.length);
        } 
        // If searching in Declared Result view
        else if (selectedResultType === "Declared Result") {
            const dataToFilter = filteredResultData.length > 0 ? filteredResultData : resultData;
            const lowercasedTerm = term.toLowerCase();
            
            if (!term.trim()) {
                setFilteredResultData(dataToFilter);
                setNoResults(false);
                updateTotalPages(dataToFilter.length);
                return;
            }
            
            const results = dataToFilter.filter(result =>
                result.itemCode.toLowerCase().includes(lowercasedTerm) ||
                result.itemCodeName.toLowerCase().includes(lowercasedTerm) ||
                result.name.toLowerCase().includes(lowercasedTerm) ||
                result.schoolName.toLowerCase().includes(lowercasedTerm)
            );
            
            setFilteredResultData(results);
            setNoResults(results.length === 0);
            updateTotalPages(results.length);
        }
    };
    
    // Update total pages when data changes
    const updateTotalPages = (itemCount) => {
        setTotalPages(Math.ceil(itemCount / itemsPerPage));
    };

    // Update total pages when filtered data changes
    useEffect(() => {
        if (selectedResultType === 'School Points') {
            updateTotalPages(filteredData.length);
        } else {
            updateTotalPages(filteredResultData.length);
        }
    }, [filteredData, filteredResultData, itemsPerPage, selectedResultType]);
    
    const getPageHeading = () => {
        switch (selectedResultType) {
            case "School Points":
                return "Publish Result School Points List";
            case "All Result":
                return "Publish All Results List";
            case "Status of Festival":
                return "Festival Status Overview";
            case "Declared Result":
            default:
                return "Publish Declared Result List";
        }
    };

    const getPrintTitle = () => {
        let festivalName = "";
        switch (selectedFestival) {
            case "UP Kalaivizha":
                festivalName = "UP Tamil Kalaivizha";
                break;
            case "Lp Kalaivizha":
                festivalName = "LP Tamil Kalaivizha";
                break;
            case "Hs Kalaivizha":
                festivalName = "HS Tamil Kalaivizha";
                break;
            case "Hss Kalaivizha":
                festivalName = "HSS Tamil Kalaivizha";
                break;
            case "Status View":
                festivalName = "Tamil Kalaivizha Status";
                break;
            default:
                festivalName = "Tamil Kalaivizha";
        }

        return `${festivalName} - ${selectedResultType}`;
    };

    const handleFestivalChange = (e) => {
        const newFestival = e.target.value;
        
        // Update the festival in the search params
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('festival', newFestival);
            
            // If switching to Status View and the current result type isn't All Result or Status of Festival,
            // set the result type to All Result
            if (newFestival === "Status View" && 
                selectedResultType !== "All Result" && 
                selectedResultType !== "Status of Festival") {
                newParams.set('resultType', "All Result");
            }
            
            return newParams;
        });
    };

    const handleResultTypeChange = (e) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('resultType', e.target.value);
            return newParams;
        });
        // Reset to first page when changing result type
        setCurrentPage(1);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // Calculate page numbers to show
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesDisplayed = 5;
        
        if (totalPages <= maxPagesDisplayed) {
            // Show all pages if total pages are less than or equal to max display
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);
            
            // Calculate start and end page numbers
            let startPage, endPage;
            
            if (currentPage <= 3) {
                // If current page is near the beginning
                startPage = 2;
                endPage = 4;
                pageNumbers.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
                pageNumbers.push('...');
            } else if (currentPage >= totalPages - 2) {
                // If current page is near the end
                pageNumbers.push('...');
                startPage = totalPages - 3;
                endPage = totalPages - 1;
                pageNumbers.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
            } else {
                // If current page is in the middle
                pageNumbers.push('...');
                pageNumbers.push(currentPage - 1);
                pageNumbers.push(currentPage);
                pageNumbers.push(currentPage + 1);
                pageNumbers.push('...');
            }
            
            // Always show last page
            pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    };

    // Get paginated data
    const getPaginatedData = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        
        if (selectedResultType === 'School Points') {
            return filteredData.slice(indexOfFirstItem, indexOfLastItem);
        } else {
            return filteredResultData.slice(indexOfFirstItem, indexOfLastItem);
        }
    };

    // PDF generation function using html2pdf
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

        // Handle Status View case
        if (selectedFestival === "Status View" && selectedResultType === "Status of Festival") {
            // Get content from the printRef
            if (printRef.current) {
                const statusContent = printRef.current.cloneNode(true);
                pdfContent.appendChild(statusContent);
            } else {
                // Fallback message if no content is available
                const noContentMsg = document.createElement('p');
                noContentMsg.textContent = "No status content available for printing";
                noContentMsg.style.textAlign = 'center';
                pdfContent.appendChild(noContentMsg);
            }
        } else {
            // Create table clone
            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.style.marginTop = '20px';
            
            // Create table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            let headers = [];
            
            // Set the appropriate headers based on the selected result type
            if (selectedResultType === "School Points") {
                headers = ['Sl No', 'School Code', 'School Name', 'Point'];
            } else {
                headers = [
                    'Sl No', 'Item Code & Item Name', 'Reg No', 'Code No', 'Name', 
                    'No of participate', 'School name', 'Grade', 'Point'
                ];
            }
            
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
            
            if (selectedResultType === "School Points") {
                filteredData.forEach((school, index) => {
                    const row = document.createElement('tr');
                    
                    // Add cells
                    const cellData = [
                        index + 1,
                        school.schoolCode || "-",
                        school.schoolName || "-",
                        school.point.toFixed(1) || "-"
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
            } else {
                const displayData = filteredResultData.length > 0 ? filteredResultData : resultData;
                
                displayData.forEach((result, index) => {
                    const row = document.createElement('tr');
                    
                    // Add cells
                    const cellData = [
                        index + 1,
                        result.itemCodeName || "-",
                        result.regNo || "-",
                        result.codeNo || "-",
                        result.name || "-",
                        result.noOfParticipate || "-",
                        result.schoolName || "-",
                        result.grade || "-",
                        result.point || "-"
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
            }
            
            table.appendChild(tbody);
            pdfContent.appendChild(table);
        }
        
        // PDF filename
        const fileName = `${selectedFestival.replace(/ /g, '_')}_${selectedResultType.replace(/ /g, '_')}.pdf`;
        
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

    // Initialize data at component mount
    useEffect(() => {
        if (allResultEntry.length === 0) {
            setResultEntry(resultData);
        }
    }, []);

    // Get current data slice for pagination
    const paginatedData = getPaginatedData();
    
    // Calculate index of first and last items on current page for display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    // Total number of items currently displayed
    const currentDataLength = selectedResultType === 'School Points' 
        ? filteredData.length 
        : filteredResultData.length;

    // Check if Status View is selected in the festival dropdown
    const isStatusViewSelected = selectedFestival === "Status View";

    // Check if Status of Festival is selected in the result type dropdown
    const isStatusOfFestivalSelected = selectedResultType === "Status of Festival";

    // CSS classes for animation
    const dropdownAnimationClass = dropdownAnimation 
    ? "transition-all transform duration-200 ease-in-out opacity-0" 
    : "transition-all transform duration-200 ease-in-out opacity-100";
  
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            {getPageHeading()}
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            {/* Only show the All Result & Status of Festival dropdown when Status View is selected */}
                            {isStatusViewSelected && (
                                <div className={`relative w-full sm:w-40 ${dropdownAnimationClass}`}>
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                        onChange={handleResultTypeChange}
                                        value={selectedResultType}
                                    >
                                        <option value="All Result">All Result</option>
                                        <option value="Status of Festival">Status of Festival</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>
                            )}
                            
                            {/* Only show the Declared Result & School Points dropdown when Status View is NOT selected */}
                            {!isStatusViewSelected && (
                                <div className={`relative w-full sm:w-40 `}>
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                        onChange={handleResultTypeChange}
                                        value={selectedResultType}
                                    >
                                        <option value="Declared Result">Declared Result</option>
                                        <option value="School Points">School Points</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>
                            )}

                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    <option value="UP Kalaivizha">UP Kalaivizha</option>
                                    <option value="Lp Kalaivizha">Lp Kalaivizha</option>
                                    <option value="Hs Kalaivizha">Hs Kalaivizha</option>
                                    <option value="Hss Kalaivizha">Hss Kalaivizha</option>
                                    <option value="All Festival">All Festival</option>
                                    <option value="Status View">Status View</option>
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

                    {(selectedResultType === "School Points" || selectedResultType === "Declared Result" || selectedResultType === "All Result") && !isStatusOfFestivalSelected && (
                        <div className={`relative flex mb-5 w-full sm:w-64 md:w-80 `}>
                            <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                                <input 
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    type="text"
                                    placeholder={
                                        selectedResultType === "School Points" 
                                            ? "Search School Code or Name..." 
                                            : "Search Item, Code or Name..."
                                    }
                                    className="w-full bg-transparent outline-none text-sm"
                                    aria-label={
                                        selectedResultType === "School Points" 
                                            ? "Search by school code or name" 
                                            : "Search by item code, name, or school"
                                    }
                                />
                                <div className="text-gray-500">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Render StatusFest component when Status of Festival is selected */}
                    {isStatusOfFestivalSelected ? (
                        <div ref={printRef} >
                            <StatusFest festival={selectedFestival} />
                        </div>
                    ) : (
                        <div ref={printRef} className={`w-full `}>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                    <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                        {selectedResultType === "School Points" ? (
                                            <>
                                                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                                    <thead className="bg-gray-50">
                                                        <tr className="text-gray-700">
                                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code & Name</th>
                                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                        {paginatedData.length > 0 ? (
                                                            paginatedData.map((school, index) => (
                                                                <tr key={index} className="hover:bg-gray-100">
                                                                    <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                                    <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolCode}-{school.schoolName}</td>
                                                                    <td className="p-2 md:p-3 whitespace-nowrap">{school.point.toFixed(1)}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="4" className="p-3 text-center text-gray-500">
                                                                    No records found for {selectedFestival}
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                                {noResults && (
                                                    <div className="text-center py-8 bg-gray-50">
                                                        <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
                                                        <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                                <thead className="bg-gray-50">
                                                    <tr className="text-gray-700">
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of partcipate</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School code & name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                    {paginatedData.length > 0 ? (
                                                        paginatedData.map((result, index) => (
                                                            <tr key={result.slNo} className="hover:bg-gray-100">
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCodeName}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.codeNo}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.name}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.noOfParticipate}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">6002-{result.schoolName}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="9" className="p-3 text-center text-gray-500">
                                                                No records found for {selectedFestival}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        )}
                                         <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                  {/* Showing X of Y rows */}
                  <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                    {paginatedData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, paginatedData.length)} of ${paginatedData.length} rows` : '0 rows'}
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
                    )}
                </div>
            </div>
        </>
    )
}
export default PublishResultList




// import React, { useEffect, useRef, useState } from 'react';
// import Header from '../components/Header';
// import Dash from '../components/Dash';
// import html2pdf from 'html2pdf.js';

// export default function TamilKalaivizhaDashboard() {
//   const printRef = useRef();
//   const [selectedFestival, setSelectedFestival] = useState("UP Kalaivizha");
//   const [selectedResultType, setSelectedResultType] = useState("Declared Result");
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   const [filteredResultData, setFilteredResultData] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedColumn, setSelectedColumn] = useState(null); 
//    // Pagination state
//    const [currentPage, setCurrentPage] = useState(1);
//    const [rowsPerPage, setRowsPerPage] = useState(10);
//    const [dropdownAnimation, setDropdownAnimation] = useState(false);

  
//   // Original result data
//   const declaredResults = [
//     { id: 1, itemCode: '301', itemName: 'Story Writing', itemCodeName: '301 - Story Writing', regNo: 2, codeNo: 953, name: 'V Vijayalakshmi', class: 7, schoolName: 'G. H. S. S Kumily', schoolCode: '30038', grade: 'A', point: 5, noOfParticipate: 1 },
//   ];

//   // School points data
//   const schoolPoints = [
//     { id: 1, code: '30038', schoolName: 'G. H. S. S Anakara', schoolCode: '30038', point: 42 },
//   ];

//   const festivalStatus = [
//     { category: 'UP TAMILKALAIVIZHA (11)', total: 11, completed: 10, notCompleted: 1 },
//     { category: 'HS TAMILKALAIVIZHA (12)', total: 12, completed: 12, notCompleted: 0 },
//     { category: 'HSS TAMILKALAIVIZHA (14)', total: 14, completed: 14, notCompleted: 0 },
//   ];

//   // Detailed festival items data
//   const detailedItems = [
//     { Item: "Folk Dance", StageNo: 1, Cluster: "A", Participants: 8, ItemType: "Group", MaximumTime: "10 min", DateOfItem: "2025-04-15" },
//     { Item: "Classical Music", StageNo: 2, Cluster: "B", Participants: 1, ItemType: "Solo", MaximumTime: "5 min", DateOfItem: "2025-04-15" },
//     { Item: "Speech", StageNo: 1, Cluster: "A", Participants: 1, ItemType: "Solo", MaximumTime: "7 min", DateOfItem: "2025-04-16" }
//   ];
  
//   const completedItems = [
//     { ItemCode: "301", ItemName: "Story Writing" },
//     { ItemCode: "302", ItemName: "Essay Writing" },
//     { ItemCode: "305", ItemName: "Poetry Writing" },
//     { ItemCode: "307", ItemName: "Painting" }
//   ];
  
//   const notCompletedItems = [
//     { Item: "Debate", StageNo: 3, Cluster: "B", Participants: 6, ItemType: "Group", MaximumTime: "15 min", DateOfItem: "2025-04-22" },
//     { Item: "Quiz", StageNo: 2, Cluster: "A", Participants: 3, ItemType: "Group", MaximumTime: "30 min", DateOfItem: "2025-04-25" },
//     { Item: "Solo Song", StageNo: 1, Cluster: "C", Participants: 1, ItemType: "Solo", MaximumTime: "5 min", DateOfItem: "2025-04-26" }
//   ];

//   // Filter result data based on selected festival
//   useEffect(() => {
//     filterResultDataByFestival();
//   }, [selectedFestival]);

//   const filterResultDataByFestival = () => {
//     let filtered;
//     switch (selectedFestival) {
//       case "UP Kalaivizha":
//         filtered = declaredResults.filter(item => {
//           const itemCode = parseInt(item.itemCode);
//           return itemCode >= 300 && itemCode < 400;
//         });
//         break;
//       case "Lp Kalaivizha":
//         filtered = declaredResults.filter(item => {
//           const itemCode = parseInt(item.itemCode);
//           return itemCode >= 400 && itemCode < 500;
//         });
//         break;
//       case "Hs Kalaivizha":
//         filtered = declaredResults.filter(item => {
//           const itemCode = parseInt(item.itemCode);
//           return itemCode >= 500 && itemCode < 600;
//         });
//         break;
//       case "Hss Kalaivizha":
//         filtered = declaredResults.filter(item => {
//           const itemCode = parseInt(item.itemCode);
//           return itemCode >= 600 && itemCode < 700;
//         });
//         break;
//       case "All Festival":
//       case "Status View":
//       default:
//         filtered = [...declaredResults];
//     }

//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    
//     // Get current items based on result type
//     const currentItems = selectedResultType === "School Points" 
//       ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
//       : filteredResultData.slice(indexOfFirstItem, indexOfLastItem);
    
//     const totalPages = Math.ceil(
//       selectedResultType === "School Points" 
//         ? filteredData.length / rowsPerPage 
//         : filteredResultData.length / rowsPerPage
//     );
  
//     const handlePageChange = (pageNumber) => {
//       if (pageNumber > 0 && pageNumber <= totalPages) {
//         setCurrentPage(pageNumber);
//       }
//     };
  
//     const renderPageNumbers = () => {
//       const pageNumbers = [];
//       // Dynamically adjust number of page buttons based on screen size
//       const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;
      
//       if (totalPages <= maxPageNumbersToShow) {
//         // Show all page numbers
//         for (let i = 1; i <= totalPages; i++) {
//           pageNumbers.push(i);
//         }
//       } else {
//         // Show limited page numbers with dots
//         if (currentPage <= 2) {
//           // Near the start
//           for (let i = 1; i <= 3; i++) {
//             if (i <= totalPages) pageNumbers.push(i);
//           }
//           if (totalPages > 3) {
//             pageNumbers.push('...');
//             pageNumbers.push(totalPages);
//           }
//         } else if (currentPage >= totalPages - 1) {
//           // Near the end
//           pageNumbers.push(1);
//           pageNumbers.push('...');
//           for (let i = totalPages - 2; i <= totalPages; i++) {
//             if (i > 0) pageNumbers.push(i);
//           }
//         } else {
//           // Middle
//           pageNumbers.push(1);
//           if (currentPage > 3) pageNumbers.push('...');
//           pageNumbers.push(currentPage - 1);
//           pageNumbers.push(currentPage);
//           pageNumbers.push(currentPage + 1);
//           if (currentPage < totalPages - 2) pageNumbers.push('...');
//           pageNumbers.push(totalPages);
//         }
//       }
      
//       return pageNumbers;
//     };

//     // Add sequential numbering to filtered results
//     filtered = filtered.map((item, index) => ({
//       ...item,
//       slNo: index + 1
//     }));

//     setFilteredResultData(filtered);
    
//     // Generate school points from the filtered data
//     const schoolPointsData = getSchoolPointsData(filtered);
//     setFilteredData(schoolPointsData);
    
//     // Update search results if search term exists
//     if (searchTerm.trim()) {
//       filterSchools(searchTerm, schoolPointsData);
//     }
//   };

//   function getSchoolPointsData(data = []) {
//     const dataToUse = data.length > 0 ? data : 
//       (filteredResultData.length > 0 ? filteredResultData : declaredResults);
    
//     const schoolMap = {};

//     dataToUse.forEach(item => {
//       if (!schoolMap[item.schoolName]) {
//         schoolMap[item.schoolName] = {
//           slNo: Object.keys(schoolMap).length + 1,
//           schoolCode: item.schoolCode,
//           schoolName: item.schoolName,
//           point: item.point
//         };
//       } else {
//         schoolMap[item.schoolName].point += item.point;
//       }
//     });

//     return Object.values(schoolMap).sort((a, b) => b.point - a.point);
//   }

//   const handleSearchChange = (event) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//     filterSchools(newSearchTerm);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   const filterSchools = (term, schoolData = null) => {
//     // If searching in School Points view
//     if (selectedResultType === "School Points") {
//       const dataToFilter = schoolData || (filteredData.length > 0 ? filteredData : getSchoolPointsData());
//       const lowercasedTerm = term.toLowerCase();
      
//       if (!term.trim()) {
//         setFilteredData(dataToFilter);
//         setNoResults(false);
//         return;
//       }
      
//       const results = dataToFilter.filter(school =>
//         school.schoolCode.toLowerCase().includes(lowercasedTerm) ||
//         school.schoolName.toLowerCase().includes(lowercasedTerm)
//       );
      
//       setFilteredData(results);
//       setNoResults(results.length === 0);
//     } 
//     // If searching in Declared Result view
//     else if (selectedResultType === "Declared Result") {
//       const dataToFilter = filteredResultData.length > 0 ? filteredResultData : declaredResults;
//       const lowercasedTerm = term.toLowerCase();
      
//       if (!term.trim()) {
//         setFilteredResultData(dataToFilter);
//         setNoResults(false);
//         return;
//       }
      
//       const results = dataToFilter.filter(result =>
//         result.itemCode.toLowerCase().includes(lowercasedTerm) ||
//         result.itemName.toLowerCase().includes(lowercasedTerm) ||
//         result.name.toLowerCase().includes(lowercasedTerm) ||
//         result.schoolName.toLowerCase().includes(lowercasedTerm)
//       );
      
//       setFilteredResultData(results);
//       setNoResults(results.length === 0);
//     }
//   };

  
//     // Pagination logic
   

//   const getPageHeading = () => {
//     switch (selectedResultType) {
//       case "School Points":
//         return "Publish Result School Points List";
//       case "All Result":
//         return "Publish All Results List";
//       case "Status of Festival":
//         return "Festival Status Overview";
//       case "Declared Result":
//       default:
//         return "Publish Declared Result List";
//     }
//   };

//   const getPrintTitle = () => {
//     let festivalName = "";
//     switch (selectedFestival) {
//       case "UP Kalaivizha":
//         festivalName = "UP Tamil Kalaivizha";
//         break;
//       case "Lp Kalaivizha":
//         festivalName = "LP Tamil Kalaivizha";
//         break;
//       case "Hs Kalaivizha":
//         festivalName = "HS Tamil Kalaivizha";
//         break;
//       case "Hss Kalaivizha":
//         festivalName = "HSS Tamil Kalaivizha";
//         break;
//       case "Status View":
//         festivalName = "Tamil Kalaivizha Status";
//         break;
//       default:
//         festivalName = "Tamil Kalaivizha";
//     }

//     return `${festivalName} - ${selectedResultType}`;
//   };

//   const handleFestivalChange = (e) => {
//     const newFestival = e.target.value;
//     setSelectedFestival(newFestival);
//     setSelectedCategory(null);
//     setSelectedColumn(null);
//     setCurrentPage(1); // Reset to first page when changing festival
//   };
//   const handleResultTypeChange = (e) => {
//     setSelectedResultType(e.target.value);
//     setSelectedCategory(null);
//     setSelectedColumn(null);
//     setCurrentPage(1); // Reset to first page when changing result type
//   };

//   // PDF generation function using html2pdf
//   const generatePDF = () => {
//     // Create a clone of the table for PDF generation
//     const pdfContent = document.createElement('div');
    
//     // Add title
//     const titleElement = document.createElement('h2');
//     titleElement.textContent = getPrintTitle();
//     titleElement.style.textAlign = 'center';
//     titleElement.style.margin = '20px 0';
//     titleElement.style.fontWeight = 'bold';
//     pdfContent.appendChild(titleElement);

//     // Handle Status View case
//     if (selectedFestival === "Status View" && selectedResultType === "Status of Festival") {
//       // Get content from the printRef
//       if (printRef.current) {
//         const statusContent = printRef.current.cloneNode(true);
//         pdfContent.appendChild(statusContent);
//       } else {
//         // Fallback message if no content is available
//         const noContentMsg = document.createElement('p');
//         noContentMsg.textContent = "No status content available for printing";
//         noContentMsg.style.textAlign = 'center';
//         pdfContent.appendChild(noContentMsg);
//       }
//     } else {
//       // Create table clone
//       const table = document.createElement('table');
//       table.style.width = '100%';
//       table.style.borderCollapse = 'collapse';
//       table.style.marginTop = '20px';
      
//       // Create table header
//       const thead = document.createElement('thead');
//       const headerRow = document.createElement('tr');
      
//       let headers = [];
      
//       // Set the appropriate headers based on the selected result type
//       if (selectedResultType === "School Points") {
//         headers = ['Sl No', 'School Code', 'School Name', 'Point'];
//       } else {
//         headers = [
//           'Sl No', 'Item Code & Item Name', 'Reg No', 'Code No', 'Name', 
//           'No of participate', 'School name', 'Grade', 'Point'
//         ];
//       }
      
//       headers.forEach(headerText => {
//         const th = document.createElement('th');
//         th.textContent = headerText;
//         th.style.border = '1px solid #ddd';
//         th.style.padding = '8px';
//         th.style.backgroundColor = '#f2f2f2';
//         th.style.fontWeight = 'bold';
//         headerRow.appendChild(th);
//       });
      
//       thead.appendChild(headerRow);
//       table.appendChild(thead);
      
//       // Create table body
//       const tbody = document.createElement('tbody');
      
//       if (selectedResultType === "School Points") {
//         filteredData.forEach((school, index) => {
//           const row = document.createElement('tr');
          
//           // Add cells
//           const cellData = [
//             index + 1,
//             school.schoolCode || "-",
//             school.schoolName || "-",
//             school.point.toFixed(1) || "-"
//           ];
          
//           cellData.forEach(text => {
//             const td = document.createElement('td');
//             td.textContent = text;
//             td.style.border = '1px solid #ddd';
//             td.style.padding = '8px';
//             td.style.textAlign = 'center';
//             row.appendChild(td);
//           });
          
//           tbody.appendChild(row);
//         });
//       } else {
//         const displayData = filteredResultData.length > 0 ? filteredResultData : declaredResults;
        
//         displayData.forEach((result, index) => {
//           const row = document.createElement('tr');
          
//           // Add cells
//           const cellData = [
//             index + 1,
//             result.itemCodeName || `${result.itemCode} - ${result.itemName}` || "-",
//             result.regNo || "-",
//             result.codeNo || "-",
//             result.name || "-",
//             result.noOfParticipate || "-",
//             result.schoolName || "-",
//             result.grade || "-",
//             result.point || "-"
//           ];
          
//           cellData.forEach(text => {
//             const td = document.createElement('td');
//             td.textContent = text;
//             td.style.border = '1px solid #ddd';
//             td.style.padding = '8px';
//             td.style.textAlign = 'center';
//             row.appendChild(td);
//           });
          
//           tbody.appendChild(row);
//         });
//       }
      
//       table.appendChild(tbody);
//       pdfContent.appendChild(table);
//     }
    
//     // PDF filename
//     const fileName = `${selectedFestival.replace(/ /g, '_')}_${selectedResultType.replace(/ /g, '_')}.pdf`;
    
//     // PDF options
//     const options = {
//       margin: 10,
//       filename: fileName,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//     };
    
//     // Generate and download PDF
//     html2pdf().from(pdfContent).set(options).save();
//   };

//   // Determine what data to display based on selectedResultType
//   const displayResultData = filteredResultData.length > 0 ? filteredResultData : declaredResults;

//   // Check if Status View is selected in the festival dropdown
//   const isStatusViewSelected = selectedFestival === "Status View";

//   // Check if Status of Festival is selected in the result type dropdown
//   const isStatusOfFestivalSelected = selectedResultType === "Status of Festival";
  
//   // Back button handler
//   const handleBackButton = () => {
//     setSelectedCategory(null);
//     setSelectedColumn(null);
//   };

//   // Function to handle column click
//   const handleColumnClick = (columnIndex, item) => {
//     setSelectedCategory(item.category);
//     setSelectedColumn(columnIndex);
//   };

//   // Returns the title based on which column was clicked
//   const getDetailTitle = () => {
//     if (selectedColumn === 0) {
//       return " All Festival List";
//     } else if (selectedColumn === 1) {
//       return "Finished Festival Item List";
//     } else if (selectedColumn === 2) {
//       return "Unfinished Festival Item List";
//     }
//     return "";
//   };

//   // Status View component with column-specific functionality
//   const StatusView = () => {
//     return (
//       <div className="rounded-md p-4">
//         {!selectedCategory ? (
//           <div className="overflow-x-auto">
//             <table className="w-full shadow-md rounded-lg overflow-hidden">
//               <thead className="">
//                 <tr className="text-left">
//                   <th className="px-4 py-3 text-center">Festival Item Total</th>
//                   <th className="px-4 py-3 text-center">Items Completed</th>
//                   <th className="px-4 py-3 text-center">Items Not Completed</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {festivalStatus.map((item, index) => (
//                   <tr key={index} className="">
//                     <td 
//                       className="px-4 py-3 text-center text-blue-500 hover:bg-gray-50 cursor-pointer"
//                       onClick={() => handleColumnClick(0, item)}
//                     >
//                       {item.category}
//                     </td>
//                     <td 
//                       className="px-4 py-3 text-center  text-blue-500 hover:bg-gray-50 cursor-pointer"
//                       onClick={() => handleColumnClick(1, item)}
//                     >
//                       {item.completed}
//                     </td>
//                     <td 
//                       className="px-4 py-3 text-center  text-blue-500 hover:bg-gray-50 cursor-pointer"
//                       onClick={() => handleColumnClick(2, item)}
//                     >
//                       {item.notCompleted}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold ">
//                {getDetailTitle()}
//               </h3>
//               <button 
//                 onClick={handleBackButton}
//                 className="px-4 py-2  text-gray-700 rounded-md flex items-center"
//               >
//                 <span className="mr-1">←</span> Back to Overview
//               </button>
//             </div>
            
//             {/* Only show Festival Items table when first column is clicked */}
//             {selectedColumn === 0 && (
//               <div className="overflow-x-auto">
//                 <table className="w-full shadow-sm rounded-lg overflow-hidden">
//                   <thead className="text-left">
//                     <tr>
//                       <th className="px-3 py-2 text-sm">Item</th>
//                       <th className="px-3 py-2 text-sm">Stage No</th>
//                       <th className="px-3 py-2 text-sm">Cluster</th>
//                       <th className="px-3 py-2 text-sm">Participants</th>
//                       <th className="px-3 py-2 text-sm">Item Type</th>
//                       <th className="px-3 py-2 text-sm">Maximum Time</th>
//                       <th className="px-3 py-2 text-sm">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {detailedItems.map((item, index) => (
//                       <tr key={index} className="hover:bg-gray-50 ">
//                         <td className="px-3 py-2 text-sm">{item.Item}</td>
//                         <td className="px-3 py-2 text-sm ">{item.StageNo}</td>
//                         <td className="px-3 py-2 text-sm ">{item.Cluster}</td>
//                         <td className="px-3 py-2 text-sm  ">{item.Participants}</td>
//                         <td className="px-3 py-2 text-sm">{item.ItemType}</td>
//                         <td className="px-3 py-2 text-sm">{item.MaximumTime}</td>
//                         <td className="px-3 py-2 text-sm">{item.DateOfItem}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
            
//             {/* Only show Completed Items table when second column is clicked */}
//             {selectedColumn === 1 && (
//               <div className="overflow-x-auto">
//                 <table className="w-full shadow-sm rounded-lg overflow-hidden">
//                   <thead className="text-left">
//                     <tr>
//                       <th className="px-4 py-2 text-sm ">Item Code</th>
                     
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {completedItems.map((item, index) => (
//                       <tr key={index} className="hover:bg-gray-200">
//                         <td className="px-4 py-2 text-sm ">{item.ItemCode}-{item.ItemName}</td>
                        
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
            
//             {/* Only show Not Completed Items table when third column is clicked */}
//             {selectedColumn === 2 && (
//               <div className="overflow-x-auto">
//                 <table className="w-full shadow-sm rounded-lg overflow-hidden">
//                   <thead className="text-center">
//                     <tr>
//                       <th className="px-3 py-2 text-sm">Item</th>
//                       <th className="px-3 py-2 text-sm">Stage No</th>
//                       <th className="px-3 py-2 text-sm">Cluster</th>
//                       <th className="px-3 py-2 text-sm">Participants</th>
//                       <th className="px-3 py-2 text-sm">Item Type</th>
//                       <th className="px-3 py-2 text-sm">Maximum Time</th>
//                       <th className="px-3 py-2 text-sm">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {notCompletedItems.length > 0 ? (
//                       notCompletedItems.map((item, index) => (
//                         <tr key={index} className="hover:bg-gray-100 text-center">
//                           <td className="px-3 py-2 text-sm">{item.Item}</td>
//                           <td className="px-3 py-2 text-sm ">{item.StageNo}</td>
//                           <td className="px-3 py-2 text-sm ">{item.Cluster}</td>
//                           <td className="px-3 py-2 text-sm ">{item.Participants}</td>
//                           <td className="px-3 py-2 text-sm">{item.ItemType}</td>
//                           <td className="px-3 py-2 text-sm">{item.MaximumTime}</td>
//                           <td className="px-3 py-2 text-sm">{item.DateOfItem}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="px-3 py-4 text-center text-gray-500">
//                           All items are completed!
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };
//   const dropdownAnimationClass = dropdownAnimation 
//           ? "transition-all transform duration-500 ease-in-out opacity-0" 
//           : "transition-all transform duration-500 ease-in-out opacity-100";
//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <Header />

//       <div className="flex flex-1 overflow-hidden">
//         <Dash />

//         {/* Main Content */}
//         <main className="flex-1 overflow-auto">
//           <div className="p-6">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//               <h2 className="text-xl font-bold">
//                 {getPageHeading()}
//               </h2>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                 {/* Only show the All Result & Status of Festival dropdown when Status View is selected */}
//                 {isStatusViewSelected && (
//                   <div className="relative w-full sm:w-40">
//                     <select 
//                       className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                       onChange={handleResultTypeChange}
//                       value={selectedResultType}
//                     >
//                       <option value="All Result">All Result</option>
//                       <option value="Status of Festival">Status of Festival</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                       <i className="fa-solid fa-chevron-down"></i>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Only show the Declared Result & School Points dropdown when Status View is NOT selected */}
//                 {!isStatusViewSelected && (
//                   <div className="relative w-full sm:w-40">
//                     <select
//                       className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                       onChange={handleResultTypeChange}
//                       value={selectedResultType}
//                     >
//                       <option value="Declared Result">Declared Result</option>
//                       <option value="School Points">School Points</option>
//                     </select>
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                       <i className="fa-solid fa-chevron-down"></i>
//                     </div>
//                   </div>
//                 )}

//                 <div className="relative w-full sm:w-40">
//                   <select
//                     className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                     onChange={handleFestivalChange}
//                     value={selectedFestival}
//                   >
//                     <option value="UP Kalaivizha">UP Kalaivizha</option>
//                     <option value="Lp Kalaivizha">Lp Kalaivizha</option>
//                     <option value="Hs Kalaivizha">Hs Kalaivizha</option>
//                     <option value="Hss Kalaivizha">Hss Kalaivizha</option>
//                     <option value="All Festival">All Festival</option>
//                     <option value="Status View">Status View</option>
//                   </select>
//                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                     <i className="fa-solid fa-chevron-down"></i>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={generatePDF}
//                   className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white py-2 px-6 rounded-full w-full sm:w-auto hover:bg-blue-800"
//                 >
//                   Print
//                 </button>
//               </div>
//             </div>

//             {(selectedResultType === "School Points" || selectedResultType === "Declared Result" || selectedResultType === "All Result") && !isStatusOfFestivalSelected && (
//               <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
//                 <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
//                   <input 
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     type="text"
//                     placeholder={
//                       selectedResultType === "School Points" 
//                         ? "Search School Code or Name..." 
//                         : "Search Item, Code or Name..."
//                     }
//                     className="w-full bg-transparent outline-none text-sm"
//                     aria-label={
//                       selectedResultType === "School Points" 
//                         ? "Search by school code or name" 
//                         : "Search by item code, name, or school"
//                     }
//                   />
//                   <div className="text-gray-500">
//                     <i className="fa-solid fa-magnifying-glass"></i>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Content based on selected view */}
//             <div ref={printRef} className="w-full">
//               {/* Render StatusFest component when Status of Festival is selected */}
//               {isStatusOfFestivalSelected ? (
//                 <StatusView />
//               ) : (
//                 <div className="overflow-x-auto -mx-4 sm:mx-0">
//                   <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                     <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
//                       {selectedResultType === "School Points" ? (
//                         <>
//                           <table className="min-w-full text-center print-table">
//                             <thead className="bg-gray-50">
//                               <tr className="text-gray-700">
//                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
//                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
//                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
//                               </tr>
//                             </thead>
//                             <tbody className="bg-white text-xs sm:text-sm">
//                               {filteredData.length > 0 ? (
//                                 filteredData.map((school, index) => (
//                                   <tr key={index} className="hover:bg-gray-100">
//                                     <td className="p-2 md:p-3 whitespace-nowrap">{index + 1}</td>
//                                     <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolCode}</td>
//                                     <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolName}</td>
//                                     <td className="p-2 md:p-3 whitespace-nowrap">{typeof school.point === 'number' ? school.point.toFixed(1) : school.point}</td>
//                                   </tr>
//                                 ))
//                               ) : (
//                                 <tr>
//                                   <td colSpan="4" className="p-3 text-center text-gray-500">
//                                     No records found for {selectedFestival}
//                                   </td>
//                                 </tr>
//                               )}
//                             </tbody>
//                           </table>
//                           {noResults && (
//                             <div className="text-center py-8 bg-gray-50">
//                               <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
//                               <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
//                             </div>
//                           )}
//                         </>
//                       ) : (
//                         <table className="min-w-full text-center  print-table">
//                           <thead className="bg-gray-50">
//                             <tr className="text-gray-700">
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code No</th>
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name</th>
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of participate</th>
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School name</th>
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
//                               <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white  text-xs sm:text-sm">
//                             {displayResultData.length > 0 ? (
//                               displayResultData.map((result, index) => (
//                                 <tr key={result.id || index} className="hover:bg-gray-100">
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo || index + 1}</td>
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCodeName || `${result.itemCode} - ${result.itemName}`}</td>
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.codeNo}</td>
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.name}</td>
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.noOfParticipate || 1}</td>
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.schoolName}</td>
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
//                                   <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="9" className="p-3 text-center text-gray-500">
//                                   No records found for {selectedFestival}
//                                 </td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       )}
                      
//                     </div>
             
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }  
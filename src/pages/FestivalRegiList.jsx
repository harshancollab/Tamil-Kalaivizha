

// // IT Admin  Festival REG List
// import React, { useState, useRef, useEffect } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { deleteFestivelAPI, getAllFestivelAPI, } from '../services/allAPI';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import Alert from '../components/Alert';


// const FestivalRegiList = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
//     const [resultentry, setResultentry] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();
//     const printRef = useRef();

//   const [alert, setAlert] = useState({
//     show: false,
//     message: '',
//     type: 'success'
//   });

//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     useEffect(() => {
//         const codeParam = searchParams.get('code');
//         if (codeParam) setSearchCode(codeParam);
//     }, [searchParams]);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchCode]);


//     useEffect(() => {
//         getAllresultentry();
//     }, []);

//     const getAllresultentry = async () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await getAllFestivelAPI(reqHeader)
//                 if (result.status === 200) {
//                     setResultentry(result.data.festivel)
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }

//     console.log("Fetched Festival Data:", resultentry);


//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, []);
//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const handleEditRedirect = (festival) => {
//         navigate(`/EditFestival/${festival._id}`, { // Use _id for navigation
//             state: { festival }
//         });
//     };

//     const handleDeleteClick = async (id) => {
//         const token = sessionStorage.getItem("token")
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await deleteFestivelAPI(id, reqHeader)
//                 if (result.status === 200) {
//                     showAlert("conform Festival  delect")
//                     getAllresultentry();
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }
//   const showAlert = (message, type = 'success') => {
//     // First hide any existing alert to prevent stacking
//     setAlert({
//       show: false,
//       message: '',
//       type: 'success'
//     });

//     // Use timeout to ensure state updates properly before showing new alert
//     setTimeout(() => {
//       setAlert({
//         show: true,
//         message,
//         type
//       });

//       // Auto hide after 3 seconds
//       setTimeout(() => {
//         hideAlert();
//       }, 3000);
//     }, 100);
//   };

//   const hideAlert = () => {
//     setAlert(prev => ({
//       ...prev,
//       show: false
//     }));
//   };




//     const filteredData = searchCode
//         ? resultentry.filter(festival =>
//             festival.festivel_name.toLowerCase().includes(searchCode.toLowerCase())
//         )
//         : resultentry;


//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber > 0 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };


//     const updateURLParams = (params) => {
//         const newParams = new URLSearchParams(searchParams);

//         Object.entries(params).forEach(([key, value]) => {
//             if (value) {
//                 newParams.set(key, value);
//             } else {
//                 newParams.delete(key);
//             }
//         });

//         setSearchParams(newParams);
//     };


//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchCode(value);
//         updateURLParams({ code: value });
//     };

//     const handleAddClick = () => {
//         navigate('/AddFestival');
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];

//         const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

//         if (totalPages <= maxPageNumbersToShow) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             if (currentPage <= 2) {
//                 for (let i = 1; i <= 3; i++) {
//                     if (i <= totalPages) pageNumbers.push(i);
//                 }
//                 if (totalPages > 3) {
//                     pageNumbers.push('...');
//                     pageNumbers.push(totalPages);
//                 }
//             } else if (currentPage >= totalPages - 1) {
//                 pageNumbers.push(1);
//                 pageNumbers.push('...');
//                 for (let i = totalPages - 2; i <= totalPages; i++) {
//                     if (i > 0) pageNumbers.push(i);
//                 }
//             } else {
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

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                  {alert.show && (
//                 <Alert
//                   message={alert.message}
//                   type={alert.type}
//                   onClose={hideAlert}
//                 />
//               )}
//                 <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//                         <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//                             Festival List
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             <div className="flex gap-2 w-full sm:w-auto">
//                                 <button
//                                     onClick={handleAddClick}
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
//                                 >
//                                     Add Festival
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="relative flex mb-5 w-full sm:w-32 md:w-60">
//                         <div className="relative flex-grow flex items-center h-10  border border-blue-800 rounded-full px-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search here"
//                                 className="w-full bg-transparent outline-none text-sm"
//                                 value={searchCode}
//                                 onChange={handleSearchChange}
//                             />
//                             <button className="text-gray-500 hover:text-gray-700">
//                                 <i className="fa-solid fa-magnifying-glass"></i>
//                             </button>
//                         </div>
//                     </div>

//                     <div className="w-full">
//                         <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
//                             <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                 <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
//                                     <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                         <thead className="bg-gray-50">
//                                             <tr className="text-gray-700">
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Name</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">From Class</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">To Class</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Edit</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Delete</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((festival, index) => (
//                                                     <tr key={festival._id} className="hover:bg-gray-100">
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.festivel_name}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.from_class}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.to_class}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 className="text-blue-500 hover:text-blue-700 focus:outline-none"
//                                                                 onClick={() => handleEditRedirect(festival)}
//                                                             >
//                                                                 <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 onClick={() => handleDeleteClick(festival._id)}
//                                                                 className="text-red-600 hover:text-red-800 focus:outline-none"
//                                                             >
//                                                                 <i className="fa-solid fa-trash cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="6" className="p-4 text-center text-gray-500">
//                                                         No festivals found {searchCode ? `for "${searchCode}"` : ''}
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                         <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                             {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
//                         </div>
//                         <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                             >
//                                 <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                                 <span className="hidden sm:inline p-1">Previous</span>
//                             </button>
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

// export default FestivalRegiList



// // IT Admin  Festival REG List
// import React, { useState, useRef, useEffect } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { deleteFestivelAPI, getAllFestivelAPI, } from '../services/allAPI';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import Alert from '../components/Alert';

// const FestivalRegiList = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
//     const [allFestivals, setAllFestivals] = useState([]); // To hold all fetched festivals
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();
//     const printRef = useRef();

//     const [alert, setAlert] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     useEffect(() => {
//         const codeParam = searchParams.get('code');
//         if (codeParam) setSearchCode(codeParam);
//     }, [searchParams]);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchCode]);

//     useEffect(() => {
//         getAllresultentry();
//     }, []);

//     const getAllresultentry = async () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await getAllFestivelAPI(reqHeader)
//                 if (result.status === 200) {
//                     setAllFestivals(result.data.festivel); // Store all festivals
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }

//     console.log("Fetched Festival Data:", allFestivals);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, []);

//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const handleEditRedirect = (festival) => {
//         navigate(`/EditFestival/${festival._id}`, {
//             state: { festival }
//         });
//     };

//     const handleDeleteClick = async (id) => {
//         const token = sessionStorage.getItem("token")
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await deleteFestivelAPI(id, reqHeader)
//                 if (result.status === 200) {
//                     showAlert("Festival deleted successfully");
//                     getAllresultentry();
//                 }
//             } catch (err) {
//                 console.log(err);
//                 showAlert("Failed to delete festival", 'error');
//             }
//         }
//     }

//     const showAlert = (message, type = 'success') => {
//         setAlert({
//             show: false,
//             message: '',
//             type: 'success'
//         });

//         setTimeout(() => {
//             setAlert({
//                 show: true,
//                 message,
//                 type
//             });

//             setTimeout(() => {
//                 hideAlert();
//             }, 3000);
//         }, 100);
//     };

//     const hideAlert = () => {
//         setAlert(prev => ({
//             ...prev,
//             show: false
//         }));
//     };

//     const filteredData = searchCode
//         ? allFestivals.filter(festival =>
//             festival.festivel_name.toLowerCase().includes(searchCode.toLowerCase())
//         )
//         : allFestivals;

//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber > 0 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     const updateURLParams = (params) => {
//         const newParams = new URLSearchParams(searchParams);

//         Object.entries(params).forEach(([key, value]) => {
//             if (value) {
//                 newParams.set(key, value);
//             } else {
//                 newParams.delete(key);
//             }
//         });

//         setSearchParams(newParams);
//     };

//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchCode(value);
//         updateURLParams({ code: value });
//     };

//     const handleAddClick = () => {
//         navigate('/AddFestival');
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

//         if (totalPages <= maxPageNumbersToShow) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             if (currentPage <= 2) {
//                 for (let i = 1; i <= 3; i++) {
//                     if (i <= totalPages) pageNumbers.push(i);
//                 }
//                 if (totalPages > 3) {
//                     pageNumbers.push('...');
//                     pageNumbers.push(totalPages);
//                 }
//             } else if (currentPage >= totalPages - 1) {
//                 pageNumbers.push(1);
//                 pageNumbers.push('...');
//                 for (let i = totalPages - 2; i <= totalPages; i++) {
//                     if (i > 0) pageNumbers.push(i);
//                 }
//             } else {
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

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 {alert.show && (
//                     <Alert
//                         message={alert.message}
//                         type={alert.type}
//                         onClose={hideAlert}
//                     />
//                 )}
//                 <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//                         <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//                             Festival List
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             <div className="flex gap-2 w-full sm:w-auto">
//                                 <button
//                                     onClick={handleAddClick}
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
//                                 >
//                                     Add Festival
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="relative flex mb-5 w-full sm:w-32 md:w-60">
//                         <div className="relative flex-grow flex items-center h-10  border border-blue-800 rounded-full px-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search here"
//                                 className="w-full bg-transparent outline-none text-sm"
//                                 value={searchCode}
//                                 onChange={handleSearchChange}
//                             />
//                             <button className="text-gray-500 hover:text-gray-700">
//                                 <i className="fa-solid fa-magnifying-glass"></i>
//                             </button>
//                         </div>
//                     </div>

//                     <div className="w-full">
//                         <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
//                             <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                 <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
//                                     <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                         <thead className="bg-gray-50">
//                                             <tr className="text-gray-700">
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Name</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">From Class</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">To Class</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Edit</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Delete</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((festival, index) => (
//                                                     <tr key={festival._id} className="hover:bg-gray-100">
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.festivel_name}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.from_class}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.to_class}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 className="text-blue-500 hover:text-blue-700 focus:outline-none"
//                                                                 onClick={() => handleEditRedirect(festival)}
//                                                             >
//                                                                 <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 onClick={() => handleDeleteClick(festival._id)}
//                                                                 className="text-red-600 hover:text-red-800 focus:outline-none"
//                                                             >
//                                                                 <i className="fa-solid fa-trash cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="6" className="p-4 text-center text-gray-500">
//                                                         No festivals found {searchCode ? `for "${searchCode}"` : ''}
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                         <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                             {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
//                         </div>
//                         <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                             >
//                                 <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                                 <span className="hidden sm:inline p-1">Previous</span>
//                             </button>
//                             <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                                 {renderPageNumbers().map((page, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => page !== '...' && handlePageChange(page)}
//                                         className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'} ${page === '...' ? 'pointer-events-none' : ''}`}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
//                             </div>
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

// export default FestivalRegiList



// IT Admin  Festival REG List
// import React, { useState, useRef, useEffect, useCallback } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { deleteFestivelAPI, getAllFestivelAPI, } from '../services/allAPI';
// import {  useNavigate, useSearchParams } from 'react-router-dom';
// import Alert from '../components/Alert';

// const FestivalRegiList = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
//     const [allFestivals, setAllFestivals] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Add state for delete confirmation
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [festivalToDelete, setFestivalToDelete] = useState(null);
//     const navigate = useNavigate();
//     const printRef = useRef();

//     const [alert, setAlert] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     useEffect(() => {
//         const codeParam = searchParams.get('code');
//         if (codeParam) setSearchCode(codeParam);
//     }, [searchParams]);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchCode]);

//     useEffect(() => {

//         getAllresultentry();
//     }, []);

//     const getAllresultentry = async () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await getAllFestivelAPI(currentPage, rowsPerPage, reqHeader)
//                 if (result.status === 200) {
//                     setAllFestivals(result.data.festivel);
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }

//     console.log("Fetched Festival Data:", allFestivals);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, []);

//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const handleEditRedirect = (festival) => {
//         navigate(`/EditFestival/${festival._id}`, {
//             state: { festival }
//         });
//     };

//     // Modified to show confirmation dialog instead of deleting immediately
//     const handleDeleteClick = (festival) => {
//         setFestivalToDelete(festival);
//         setShowDeleteConfirm(true);
//     };

//     // Actual delete function after confirmation
//     const confirmDelete = async () => {
//         if (!festivalToDelete) return;

//         const token = sessionStorage.getItem("token")
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await deleteFestivelAPI(festivalToDelete._id, reqHeader)
//                 if (result.status === 200) {
//                     showAlert("Festival deleted successfully");
//                     getAllresultentry();
//                 }
//             } catch (err) {
//                 console.log(err);
//                 showAlert("Failed to delete festival", 'error');
//             } finally {
//                 // Close the dialog and reset the festival to delete
//                 setShowDeleteConfirm(false);
//                 setFestivalToDelete(null);
//             }
//         }
//     };

//     // Cancel delete
//     const cancelDelete = () => {
//         setShowDeleteConfirm(false);
//         setFestivalToDelete(null);
//     };

//     const showAlert = (message, type = 'success') => {
//         setAlert({
//             show: false,
//             message: '',
//             type: 'success'
//         });

//         setTimeout(() => {
//             setAlert({
//                 show: true,
//                 message,
//                 type
//             });

//             setTimeout(() => {
//                 hideAlert();
//             }, 3000);
//         }, 100);
//     };

//     const hideAlert = () => {
//         setAlert(prev => ({
//             ...prev,
//             show: false
//         }));
//     };

//     const filteredData = searchCode
//         ? allFestivals.filter(festival =>
//             festival.festivel_name.toLowerCase().includes(searchCode.toLowerCase())
//         )
//         : allFestivals;

//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             // setCurrentPage(pageNumber);
//             updateURLParams({ page: value });
//         }
//     };

//     // const updateURLParams = (params) => {
//     //     const newParams = new URLSearchParams(searchParams);

//     //     Object.entries(params).forEach(([key, value]) => {
//     //         if (value) {
//     //             newParams.set(key, value);
//     //         } else {
//     //             newParams.delete(key);
//     //         }
//     //     });

//     //     setSearchParams(newParams);
//     // };

//     // useEffect(() => {

//     //     const allParams = Object.fromEntries([...searchParams.entries()]);
//     //     console.log(Object.entries(allParams));

//     // }, [])



//     const updateURLParams = useCallback((params) => {
//         const newParams = new URLSearchParams(searchParams.toString());

//         Object.entries(params).forEach(([key, value]) => {
//             if (value) {
//                 newParams.set(key, value);
//             } else {
//                 newParams.delete(key);
//             }
//         });

//         setSearchParams(newParams);
//     }, [searchParams]);

//     // Get all search params on mount
//     // useEffect(() => {

//     // }, [searchParams]);

//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchCode(value);
//         updateURLParams({ search: value });

//     };

//     const handleAddClick = () => {
//         navigate('/AddFestival');
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

//         if (totalPages <= maxPageNumbersToShow) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             if (currentPage <= 2) {
//                 for (let i = 1; i <= 3; i++) {
//                     if (i <= totalPages) pageNumbers.push(i);
//                 }
//                 if (totalPages > 3) {
//                     pageNumbers.push('...');
//                     pageNumbers.push(totalPages);
//                 }
//             } else if (currentPage >= totalPages - 1) {
//                 pageNumbers.push(1);
//                 pageNumbers.push('...');
//                 for (let i = totalPages - 2; i <= totalPages; i++) {
//                     if (i > 0) pageNumbers.push(i);
//                 }
//             } else {
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

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 {alert.show && (
//                     <Alert
//                         message={alert.message}
//                         type={alert.type}
//                         onClose={hideAlert}
//                     />
//                 )}
//                 <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//                         <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//                             Festival List
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             <div className="flex gap-2 w-full sm:w-auto">
//                                 <button
//                                     onClick={handleAddClick}
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
//                                 >
//                                     Add Festival
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="relative flex mb-5 w-full sm:w-32 md:w-60">
//                         <div className="relative flex-grow flex items-center h-10  border border-blue-800 rounded-full px-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search here"
//                                 className="w-full bg-transparent outline-none text-sm"
//                                 value={searchCode}
//                                 onChange={handleSearchChange}
//                             />
//                             <button className="text-gray-500 hover:text-gray-700">
//                                 <i className="fa-solid fa-magnifying-glass"></i>
//                             </button>
//                         </div>
//                     </div>

//                     <div className="w-full">
//                         <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
//                             <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                 <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
//                                     <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                         <thead className="bg-gray-50">
//                                             <tr className="text-gray-700">
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Name</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Edit</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Delete</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((festival, index) => (
//                                                     <tr key={festival._id} className="hover:bg-gray-100">
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.festivel_name}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 className="text-blue-500 hover:text-blue-700 focus:outline-none"
//                                                                 onClick={() => handleEditRedirect(festival)}
//                                                             >
//                                                                 <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 onClick={() => handleDeleteClick(festival)}
//                                                                 className="text-red-600 hover:text-red-800 focus:outline-none"
//                                                             >
//                                                                 <i className="fa-solid fa-trash cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="6" className="p-4 text-center text-gray-500">
//                                                         No festivals found {searchCode ? `for "${searchCode}"` : ''}
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                         <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                             {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
//                         </div>
//                         <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                             >
//                                 <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                                 <span className="hidden sm:inline p-1">Previous</span>
//                             </button>
//                             <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                                 {renderPageNumbers().map((page, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => page !== '...' && handlePageChange(page)}
//                                         className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'} ${page === '...' ? 'pointer-events-none' : ''}`}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
//                             </div>
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

//             {/* Delete Confirmation Modal */}
//             {showDeleteConfirm && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
//                         <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
//                         <p className="mb-6">
//                             Are you sure you want to delete festival "{festivalToDelete?.festivel_name}"?
//                             This action cannot be undone.
//                         </p>
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 onClick={cancelDelete}
//                                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={confirmDelete}
//                                 className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default FestivalRegiList


// import React, { useState, useRef, useEffect, useCallback } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { deleteFestivelAPI, getAllFestivelAPI, } from '../services/allAPI';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import Alert from '../components/Alert';

// const FestivalRegiList = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [searchCode, setSearchCode] = useState(searchParams.get('search') || '');
//     const [allFestivals, setAllFestivals] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Add state for delete confirmation
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [festivalToDelete, setFestivalToDelete] = useState(null);
//     const navigate = useNavigate();
//     const printRef = useRef();

//     const [alert, setAlert] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     // Get page and rows from URL params or use defaults
//     const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
//     const [rowsPerPage, setRowsPerPage] = useState(parseInt(searchParams.get('rows') || '10'));

//     // Update URL parameters function
//     const updateURLParams = useCallback((params) => {
//         const newParams = new URLSearchParams(searchParams.toString());

//         Object.entries(params).forEach(([key, value]) => {
//             if (value) {
//                 newParams.set(key, value);
//             } else {
//                 newParams.delete(key);
//             }
//         });

//         setSearchParams(newParams);
//     }, [searchParams, setSearchParams]);

   
//     useEffect(() => {
//         const page = searchParams.get('page');
//         const rows = searchParams.get('rows');
//         const search = searchParams.get('search');

//         if (page) setCurrentPage(parseInt(page));
//         if (rows) setRowsPerPage(parseInt(rows));
//         if (search !== null) setSearchCode(search);
//     }, [searchParams]);

 
//     useEffect(() => {
//         if (searchCode !== searchParams.get('search')) {
//             updateURLParams({ search: searchCode, page: '1' });
//         }
//     }, [searchCode, searchParams, updateURLParams]);

//     useEffect(() => {
//         getAllresultentry();
//     }, [currentPage, rowsPerPage]);

//     const getAllresultentry = async () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await getAllFestivelAPI(currentPage, rowsPerPage, reqHeader)
//                 if (result.status === 200) {
//                     setAllFestivals(result.data.festivel);
//                 }
//             } catch (err) {
//                 console.log(err);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     }

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, []);

//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const handleEditRedirect = (festival) => {
//         navigate(`/EditFestival/${festival._id}`, {
//             state: { festival }
//         });
//     };

//     // Modified to show confirmation dialog instead of deleting immediately
//     const handleDeleteClick = (festival) => {
//         setFestivalToDelete(festival);
//         setShowDeleteConfirm(true);
//     };

//     // Actual delete function after confirmation
//     const confirmDelete = async () => {
//         if (!festivalToDelete) return;

//         const token = sessionStorage.getItem("token")
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await deleteFestivelAPI(festivalToDelete._id, reqHeader)
//                 if (result.status === 200) {
//                     showAlert("Festival deleted successfully");
//                     getAllresultentry();
//                 }
//             } catch (err) {
//                 console.log(err);
//                 showAlert("Failed to delete festival", 'error');
//             } finally {
//                 // Close the dialog and reset the festival to delete
//                 setShowDeleteConfirm(false);
//                 setFestivalToDelete(null);
//             }
//         }
//     };

//     // Cancel delete
//     const cancelDelete = () => {
//         setShowDeleteConfirm(false);
//         setFestivalToDelete(null);
//     };

//     const showAlert = (message, type = 'success') => {
//         setAlert({
//             show: false,
//             message: '',
//             type: 'success'
//         });

//         setTimeout(() => {
//             setAlert({
//                 show: true,
//                 message,
//                 type
//             });

//             setTimeout(() => {
//                 hideAlert();
//             }, 3000);
//         }, 100);
//     };

//     const hideAlert = () => {
//         setAlert(prev => ({
//             ...prev,
//             show: false
//         }));
//     };

//     const filteredData = searchCode
//         ? allFestivals.filter(festival =>
//             festival.festivel_name.toLowerCase().includes(searchCode.toLowerCase())
//         )
//         : allFestivals;

//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//     // Fixed handlePageChange function
//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             updateURLParams({ page: pageNumber.toString() });
//         }
//     };

//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchCode(value);
//     };

//     const handleAddClick = () => {
//         navigate('/AddFestival');
//     };

//     // Handle rows per page change
//     const handleRowsPerPageChange = (e) => {
//         const value = e.target.value;
//         setRowsPerPage(parseInt(value));
//         updateURLParams({ rows: value, page: '1' });
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

//         if (totalPages <= maxPageNumbersToShow) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             if (currentPage <= 2) {
//                 for (let i = 1; i <= 3; i++) {
//                     if (i <= totalPages) pageNumbers.push(i);
//                 }
//                 if (totalPages > 3) {
//                     pageNumbers.push('...');
//                     pageNumbers.push(totalPages);
//                 }
//             } else if (currentPage >= totalPages - 1) {
//                 pageNumbers.push(1);
//                 pageNumbers.push('...');
//                 for (let i = totalPages - 2; i <= totalPages; i++) {
//                     if (i > 0) pageNumbers.push(i);
//                 }
//             } else {
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

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 {alert.show && (
//                     <Alert
//                         message={alert.message}
//                         type={alert.type}
//                         onClose={hideAlert}
//                     />
//                 )}
//                 <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//                         <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//                             Festival List
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             <div className="flex gap-2 w-full sm:w-auto">
//                                 <button
//                                     onClick={handleAddClick}
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
//                                 >
//                                     Add Festival
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-4 mb-5">
//                         <div className="relative flex w-full sm:w-60">
//                             <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Search here"
//                                     className="w-full bg-transparent outline-none text-sm"
//                                     value={searchCode}
//                                     onChange={handleSearchChange}
//                                 />
//                                 <button className="text-gray-500 hover:text-gray-700">
//                                     <i className="fa-solid fa-magnifying-glass"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="w-full">
//                         <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
//                             <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                 <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
//                                     <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                         <thead className="bg-gray-50">
//                                             <tr className="text-gray-700">
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Name</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Edit</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Delete</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((festival, index) => (
//                                                     <tr key={festival._id} className="hover:bg-gray-100">
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.festivel_name}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 className="text-blue-500 hover:text-blue-700 focus:outline-none"
//                                                                 onClick={() => handleEditRedirect(festival)}
//                                                             >
//                                                                 <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 onClick={() => handleDeleteClick(festival)}
//                                                                 className="text-red-600 hover:text-red-800 focus:outline-none"
//                                                             >
//                                                                 <i className="fa-solid fa-trash cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="6" className="p-4 text-center text-gray-500">
//                                                         No festivals found {searchCode ? `for "${searchCode}"` : ''}
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                         <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                             {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
//                         </div>
//                         <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                             >
//                                 <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                                 <span className="hidden sm:inline p-1">Previous</span>
//                             </button>
//                             <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                                 {renderPageNumbers().map((page, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => page !== '...' && handlePageChange(page)}
//                                         className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'} ${page === '...' ? 'pointer-events-none' : ''}`}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
//                             </div>
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

//             {/* Delete Confirmation Modal */}
//             {showDeleteConfirm && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
//                         <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
//                         <p className="mb-6">
//                             Are you sure you want to delete festival "{festivalToDelete?.festivel_name}"?
//                             This action cannot be undone.
//                         </p>
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 onClick={cancelDelete}
//                                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={confirmDelete}
//                                 className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default FestivalRegiList

// import React, { useState, useRef, useEffect, useCallback } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { deleteFestivelAPI, getAllFestivelAPI, } from '../services/allAPI';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import Alert from '../components/Alert';

// const FestivalRegiList = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [searchCode, setSearchCode] = useState(searchParams.get('search') || '');
//     const [allFestivals, setAllFestivals] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Add state for delete confirmation
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [festivalToDelete, setFestivalToDelete] = useState(null);
//     const navigate = useNavigate();
//     const printRef = useRef();

//     const [alert, setAlert] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     // Get page and rows from URL params or use defaults
//     const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
//     const [rowsPerPage, setRowsPerPage] = useState(parseInt(searchParams.get('rows') || '10'));

//     // Update URL parameters function
//     const updateURLParams = useCallback((params) => {
//         const newParams = new URLSearchParams(searchParams.toString());

//         Object.entries(params).forEach(([key, value]) => {
//             if (value) {
//                 newParams.set(key, value);
//             } else {
//                 newParams.delete(key);
//             }
//         });

//         setSearchParams(newParams);
//     }, [searchParams, setSearchParams]);

   
//     useEffect(() => {
//         const page = searchParams.get('page');
//         const rows = searchParams.get('rows');
//         const search = searchParams.get('search');

//         if (page) setCurrentPage(parseInt(page));
//         if (rows) setRowsPerPage(parseInt(rows));
//         if (search !== null) setSearchCode(search);
//     }, [searchParams]);

 
//     useEffect(() => {
//         if (searchCode !== searchParams.get('search')) {
//             updateURLParams({ search: searchCode, page: '1' });
//         }
//     }, [searchCode, searchParams, updateURLParams]);

//     useEffect(() => {
//         getAllresultentry();
//     }, [currentPage, rowsPerPage, searchParams.get('search')]);

//     const getAllresultentry = async () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
               
//                 const result = await getAllFestivelAPI(currentPage, rowsPerPage, reqHeader)
//                 if (result.status === 200) {
//                     setAllFestivals(result.data.festivel);
//                 }
//             } catch (err) {
//                 console.log(err);
//             } 
//         }
//     }

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, []);

//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const handleEditRedirect = (festival) => {
//         navigate(`/EditFestival/${festival._id}`, {
//             state: { festival }
//         });
//     };

//     // Modified to show confirmation dialog instead of deleting immediately
//     const handleDeleteClick = (festival) => {
//         setFestivalToDelete(festival);
//         setShowDeleteConfirm(true);
//     };

//     // Actual delete function after confirmation
//     const confirmDelete = async () => {
//         if (!festivalToDelete) return;

//         const token = sessionStorage.getItem("token")
//         if (token) {
//             const reqHeader = {
//                 "Authorization": token
//             }
//             try {
//                 const result = await deleteFestivelAPI(festivalToDelete._id, reqHeader)
//                 if (result.status === 200) {
//                     showAlert("Festival deleted successfully");
//                     getAllresultentry();
//                 }
//             } catch (err) {
//                 console.log(err);
//                 showAlert("Failed to delete festival", 'error');
//             } finally {
//                 // Close the dialog and reset the festival to delete
//                 setShowDeleteConfirm(false);
//                 setFestivalToDelete(null);
//             }
//         }
//     };

//     // Cancel delete
//     const cancelDelete = () => {
//         setShowDeleteConfirm(false);
//         setFestivalToDelete(null);
//     };

//     const showAlert = (message, type = 'success') => {
//         setAlert({
//             show: false,
//             message: '',
//             type: 'success'
//         });

//         setTimeout(() => {
//             setAlert({
//                 show: true,
//                 message,
//                 type
//             });

//             setTimeout(() => {
//                 hideAlert();
//             }, 3000);
//         }, 100);
//     };

//     const hideAlert = () => {
//         setAlert(prev => ({
//             ...prev,
//             show: false
//         }));
//     };

//     const filteredData = searchCode
//         ? allFestivals.filter(festival =>
//             festival.festivel_name.toLowerCase().includes(searchCode.toLowerCase())
//         )
//         : allFestivals;

//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//     // Fixed handlePageChange function
//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {

//             updateURLParams({ page: pageNumber.toString() });
//         }
//     };

//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchCode(value);
//     };

//     const handleAddClick = () => {
//         navigate('/AddFestival');
//     };

//     // Handle rows per page change
//     const handleRowsPerPageChange = (e) => {
//         const value = e.target.value;
//         setRowsPerPage(parseInt(value));
//         updateURLParams({ rows: value, page: '1' });
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

//         if (totalPages <= maxPageNumbersToShow) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             if (currentPage <= 2) {
//                 for (let i = 1; i <= 3; i++) {
//                     if (i <= totalPages) pageNumbers.push(i);
//                 }
//                 if (totalPages > 3) {
//                     pageNumbers.push('...');
//                     pageNumbers.push(totalPages);
//                 }
//             } else if (currentPage >= totalPages - 1) {
//                 pageNumbers.push(1);
//                 pageNumbers.push('...');
//                 for (let i = totalPages - 2; i <= totalPages; i++) {
//                     if (i > 0) pageNumbers.push(i);
//                 }
//             } else {
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

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 {alert.show && (
//                     <Alert
//                         message={alert.message}
//                         type={alert.type}
//                         onClose={hideAlert}
//                     />
//                 )}
//                 <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//                         <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//                             Festival List
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             <div className="flex gap-2 w-full sm:w-auto">
//                                 <button
//                                     onClick={handleAddClick}
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
//                                 >
//                                     Add Festival
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-4 mb-5">
//                         <div className="relative flex w-full sm:w-60">
//                             <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Search here"
//                                     className="w-full bg-transparent outline-none text-sm"
//                                     value={searchCode}
//                                     onChange={handleSearchChange}
//                                 />
//                                 <button className="text-gray-500 hover:text-gray-700">
//                                     <i className="fa-solid fa-magnifying-glass"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="w-full">
//                         <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
//                             <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                 <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
//                                     <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                         <thead className="bg-gray-50">
//                                             <tr className="text-gray-700">
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Name</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Edit</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Delete</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                             {currentItems.length > 0 ? (
//                                                 currentItems.map((festival, index) => (
//                                                     <tr key={festival._id} className="hover:bg-gray-100">
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">{festival.festivel_name}</td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 className="text-blue-500 hover:text-blue-700 focus:outline-none"
//                                                                 onClick={() => handleEditRedirect(festival)}
//                                                             >
//                                                                 <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                         <td className="p-2 md:p-3 whitespace-nowrap">
//                                                             <button
//                                                                 onClick={() => handleDeleteClick(festival)}
//                                                                 className="text-red-600 hover:text-red-800 focus:outline-none"
//                                                             >
//                                                                 <i className="fa-solid fa-trash cursor-pointer"></i>
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="6" className="p-4 text-center text-gray-500">
//                                                         No festivals found {searchCode ? `for "${searchCode}"` : ''}
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pagination Controls */}
//                     <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                         <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                             {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
//                         </div>
//                         <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                             <button
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                             >
//                                 <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                                 <span className="hidden sm:inline p-1">Previous</span>
//                             </button>
//                             <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                                 {renderPageNumbers().map((page, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => page !== '...' && handlePageChange(page)}
//                                         className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'} ${page === '...' ? 'pointer-events-none' : ''}`}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
//                             </div>
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

//             {/* Delete Confirmation Modal */}
//             {showDeleteConfirm && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
//                         <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
//                         <p className="mb-6">
//                             Are you sure you want to delete festival "{festivalToDelete?.festivel_name}"?
//                             This action cannot be undone.
//                         </p>
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 onClick={cancelDelete}
//                                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={confirmDelete}
//                                 className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default FestivalRegiList


import React, { useState, useRef, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { deleteFestivelAPI, getAllFestivelAPI, } from '../services/allAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';

const FestivalRegiList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchCode, setSearchCode] = useState(searchParams.get('search') || '');
    const [allFestivals, setAllFestivals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add state for delete confirmation
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [festivalToDelete, setFestivalToDelete] = useState(null);
    const navigate = useNavigate();
    const printRef = useRef();

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    // Get page and rows from URL params or use defaults
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
    const [rowsPerPage, setRowsPerPage] = useState(parseInt(searchParams.get('rows') || '10'));

    // Update URL parameters function
    const updateURLParams = useCallback((params) => {
        const newParams = new URLSearchParams(searchParams.toString());

        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });

        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

   
    useEffect(() => {
        const page = searchParams.get('page');
        const rows = searchParams.get('rows');
        const search = searchParams.get('search');

        if (page) setCurrentPage(parseInt(page));
        if (rows) setRowsPerPage(parseInt(rows));
        if (search !== null) setSearchCode(search);
    }, [searchParams]);

 
    useEffect(() => {
        if (searchCode !== searchParams.get('search')) {
            updateURLParams({ search: searchCode, page: '1' });
        }
    }, [searchCode, searchParams, updateURLParams]);

    useEffect(() => {
        getAllresultentry();
    }, [currentPage, rowsPerPage, searchParams.get('search')]);

    const getAllresultentry = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": token
            }
            try {
               
                const result = await getAllFestivelAPI(currentPage, rowsPerPage, reqHeader)
                if (result.status === 200) {
                    setAllFestivals(result.data.festivel);
                }
            } catch (err) {
                console.log(err);
            } 
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-gray-600">Loading...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const handleEditRedirect = (festival) => {
        navigate(`/EditFestival/${festival._id}`, {
            state: { festival }
        });
    };

    // Modified to show confirmation dialog instead of deleting immediately
    const handleDeleteClick = (festival) => {
        setFestivalToDelete(festival);
        setShowDeleteConfirm(true);
    };

    // Actual delete function after confirmation
    const confirmDelete = async () => {
        if (!festivalToDelete) return;

        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": token
            }
            try {
                const result = await deleteFestivelAPI(festivalToDelete._id, reqHeader)
                if (result.status === 200) {
                    showAlert("Festival deleted successfully");
                    getAllresultentry();
                }
            } catch (err) {
                console.log(err);
                showAlert("Failed to delete festival", 'error');
            } finally {
                // Close the dialog and reset the festival to delete
                setShowDeleteConfirm(false);
                setFestivalToDelete(null);
            }
        }
    };

    // Cancel delete
    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setFestivalToDelete(null);
    };

    const showAlert = (message, type = 'success') => {
        setAlert({
            show: false,
            message: '',
            type: 'success'
        });

        setTimeout(() => {
            setAlert({
                show: true,
                message,
                type
            });

            setTimeout(() => {
                hideAlert();
            }, 3000);
        }, 100);
    };

    const hideAlert = () => {
        setAlert(prev => ({
            ...prev,
            show: false
        }));
    };

    const filteredData = searchCode
        ? allFestivals.filter(festival =>
            festival.festivel_name.toLowerCase().includes(searchCode.toLowerCase())
        )
        : allFestivals;

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Fixed handlePageChange function
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            // Update the state directly
            setCurrentPage(pageNumber);
            // Also update URL params
            updateURLParams({ page: pageNumber.toString() });
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchCode(value);
    };

    const handleAddClick = () => {
        navigate('/AddFestival');
    };

    // Handle rows per page change
    const handleRowsPerPageChange = (e) => {
        const value = e.target.value;
        setRowsPerPage(parseInt(value));
        updateURLParams({ rows: value, page: '1' });
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                for (let i = 1; i <= 3; i++) {
                    if (i <= totalPages) pageNumbers.push(i);
                }
                if (totalPages > 3) {
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
                }
            } else if (currentPage >= totalPages - 1) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    if (i > 0) pageNumbers.push(i);
                }
            } else {
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
                {alert.show && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={hideAlert}
                    />
                )}
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Festival List
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={handleAddClick}
                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
                                >
                                    Add Festival
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-5">
                        <div className="relative flex w-full sm:w-60">
                            <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    className="w-full bg-transparent outline-none text-sm"
                                    value={searchCode}
                                    onChange={handleSearchChange}
                                />
                                <button className="text-gray-500 hover:text-gray-700">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Edit</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems.length > 0 ? (
                                                currentItems.map((festival, index) => (
                                                    <tr key={festival._id} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{festival.festivel_name}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                                            <button
                                                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                                onClick={() => handleEditRedirect(festival)}
                                                            >
                                                                <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                                                            </button>
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                                            <button
                                                                onClick={() => handleDeleteClick(festival)}
                                                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                                            >
                                                                <i className="fa-solid fa-trash cursor-pointer"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="p-4 text-center text-gray-500">
                                                        No festivals found {searchCode ? `for "${searchCode}"` : ''}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                            >
                                <i className="fa-solid fa-angle-right transform rotate-180"></i>
                                <span className="hidden sm:inline p-1">Previous</span>
                            </button>
                            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                                {renderPageNumbers().map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => page !== '...' && handlePageChange(page)}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'} ${page === '...' ? 'pointer-events-none' : ''}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
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

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p className="mb-6">
                            Are you sure you want to delete festival "{festivalToDelete?.festivel_name}"?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FestivalRegiList
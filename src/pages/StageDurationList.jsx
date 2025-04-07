// import React, { useState, useEffect, useRef } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { useSearchParams } from 'react-router-dom'
// import { getAllStageDurationsAPI } from '../services/allAPI'

// const StageDurationList = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
//   const printRef = useRef();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedFestival, setSelectedFestival] = useState("ALL Festival");

//   const [schools, setSchools] = useState([]);
//   const [filteredSchools, setFilteredSchools] = useState([]);

  
//   const dummyData = [
//     { 
//       slno: 1, 
//       code: '6004', 
//       name: 'G. H. S. S Kumily', 
//       dataEntered: 'Yes', 
//       confirmed: 'No', 
//       time: '90 min', 
//       participants: 2, 
//       completionTime: '1 hour 30 min', 
//       stage: 'Stage A', 
//       date: '28/03/2025', 
//       stageTime: '10:30 AM' 
//     },
//     { 
//       slno: 2, 
//       code: '6005', 
//       name: 'St. Mary\'s High School', 
//       dataEntered: 'Yes', 
//       confirmed: 'Yes', 
//       time: '60 min', 
//       participants: 4, 
//       completionTime: '55 min', 
//       stage: 'Stage B', 
//       date: '28/03/2025', 
//       stageTime: '11:00 AM' 
//     },
//     { 
//       slno: 3, 
//       code: '6008', 
//       name: 'G. H. S. S Thekkady', 
//       dataEntered: 'Yes', 
//       confirmed: 'No', 
//       time: '120 min', 
//       participants: 3, 
//       completionTime: '1 hour 45 min', 
//       stage: 'Stage C', 
//       date: '29/03/2025', 
//       stageTime: '09:00 AM' 
//     },
//     { 
//       slno: 4, 
//       code: '6012', 
//       name: 'Mount Carmel School', 
//       dataEntered: 'Yes', 
//       confirmed: 'Yes', 
//       time: '45 min', 
//       participants: 1, 
//       completionTime: '40 min', 
//       stage: 'Stage A', 
//       date: '29/03/2025', 
//       stageTime: '02:15 PM' 
//     },
//     { 
//       slno: 5, 
//       code: '6015', 
//       name: 'Govt. Model School', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     }
//   ];

//   useEffect(() => {
//     fetchStageDurations();
//   }, []);

//   const fetchStageDurations = async () => {
//     try {
//       setLoading(true);
//       const token = sessionStorage.getItem("token");
      
 
//       let apiData = [];
//       let useOnlyDummyData = false;
      
//       try {
//         if (token) {
//           const reqHeader = {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//           };
          
//           const result = await getAllStageDurationsAPI(reqHeader);
          
//           if (result.status === 200) {
//             apiData = result.data.map((item, index) => ({
//               slno: index + 1,
//               code: item.itemCode,
//               name: item.itemName,
//               time: item.time,
//               participants: item.participants,
//               completionTime: item.completionTime,
//               stage: item.stage || 'TBD',
//               date: item.date || 'Pending',
//               stageTime: item.timeSecond || 'TBD'
//             }));
//           }
//         }
//       } catch (apiError) {
//         console.error("API call failed, using only dummy data:", apiError);
//         useOnlyDummyData = true;
//       }
      
//       // Set state based on API response or fall back to dummy data
//       if (apiData.length > 0 && !useOnlyDummyData) {
//         // Combine API data with dummy data (for testing/development)
//         setSchools([...dummyData, ...apiData]);
//         console.log("Using combined data (API + dummy)");
//       } else {
//         // Use only dummy data
//         setSchools(dummyData);
//         console.log("Using only dummy data");
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error("Error in fetchStageDurations:", err);
//       setError("Could not load data. Using sample data instead.");
      
//       // If there's any error, still show the dummy data
//       setSchools(dummyData);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initialSearchTerm = searchParams.get('code') || '';
//     setSearchTerm(initialSearchTerm);
//     filterSchools(initialSearchTerm);
//   }, [searchParams, schools]);

//   const handleSearchChange = (event) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//     setSearchParams(new URLSearchParams({ code: newSearchTerm }));
//     filterSchools(newSearchTerm);
//   };

//   const handleFestivalChange = (e) => {
//     setSelectedFestival(e.target.value);
//   };

//   const filterSchools = (term) => {
//     const lowercasedTerm = term.toLowerCase();
//     const results = schools.filter(school =>
//       school.code.toLowerCase().includes(lowercasedTerm) ||
//       school.name.toLowerCase().includes(lowercasedTerm)
//     );
//     setFilteredSchools(results);
//   };

//   // Generate the appropriate title based on the selected festival
//   const getPrintTitle = () => {
//     switch(selectedFestival) {
//       case "UP":
//         return "UP Festival - Stage Duration List";
//       case "Lp":
//         return "LP Festival - Stage Duration List";
//       case "Hs":
//         return "HS Festival - Stage Duration List";
//       case "Hss":
//         return "HSS Festival - Stage Duration List";
//       default:
//         return "ALL Festival - Stage Duration List";
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
//       </style>
//       ${printContents}
//     `;
//     window.print();
//     document.body.innerHTML = originalContents;
//     window.location.reload();
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
//               Stage Duration List
//             </h2>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//               <div className="relative w-full sm:w-40">
//                 <select
//                   className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                   onChange={handleFestivalChange}
//                   value={selectedFestival}
//                 >
//                   <option value="ALL Festival">ALL Festival</option>
//                   <option value="UP">UP</option>
//                   <option value="Lp">Lp</option>
//                   <option value="Hs">Hs</option>
//                   <option value="Hss">Hss</option>
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
          
//           {/* Search bar - full width on mobile */}
//           <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4 mb-4">
//             <input
//               type="text"
//               placeholder="Search School Code or Name..."
//               className="w-full bg-transparent outline-none text-sm"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <button className="text-gray-500 hover:text-gray-700">
//               <i className="fa-solid fa-magnifying-glass"></i>
//             </button>
//           </div>
          
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-gray-600">Loading data...</p>
//             </div>
//           ) : error ? (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-red-500">{error}</p>
//             </div>
//           ) : (
//             <div ref={printRef} className="w-full">
//               <div className="print-title hidden">{getPrintTitle()}</div>
//               <div className="overflow-x-auto -mx-4 sm:mx-0">
//                 <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                   <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                     <thead className="text-xs sm:text-sm">
//                       <tr className="text-gray-700">
//                         <th className="p-2 md:p-3">Sl No</th>
//                         <th className="p-2 md:p-3">Item Code</th>
//                         <th className="p-2 md:p-3">Item Name</th>
//                         <th className="p-2 md:p-3">Time</th>
//                         <th className="p-2 md:p-3">No of Participants</th>
//                         <th className="p-2 md:p-3">Completion Time</th>
//                         <th className="p-2 md:p-3">Stage</th>
//                         <th className="p-2 md:p-3">Date</th>
//                         <th className="p-2 md:p-3">Time</th>
//                       </tr>
//                     </thead>
//                     <tbody className="text-xs sm:text-sm">
//                       {filteredSchools.length > 0 ? (
//                         filteredSchools.map((school) => (
//                           <tr key={school.slno} className="hover:bg-gray-100">
//                             <td className="p-2 md:p-3">{school.slno}</td>
//                             <td className="p-2 md:p-3">{school.code}</td>
//                             <td className="p-2 md:p-3">{school.name}</td>
//                             <td className="p-2 md:p-3">{school.time}</td>
//                             <td className="p-2 md:p-3">{school.participants}</td>
//                             <td className="p-2 md:p-3">{school.completionTime}</td>
//                             <td className="p-2 md:p-3">{school.stage}</td>
//                             <td className="p-2 md:p-3">{school.date}</td>
//                             <td className="p-2 md:p-3">{school.stageTime}</td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="9" className="p-4 text-center text-gray-600">
//                             No items found matching your search criteria.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default StageDurationList


import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { getAllStageDurationsAPI } from '../services/allAPI'

const StageDurationList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
  const printRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState("ALL Festival");
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  
  const dummyData = [
    { 
      slno: 1, 
      code: '6004', 
      name: 'G. H. S. S Kumily', 
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
      code: '6005', 
      name: 'St. Mary\'s High School', 
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
      code: '6008', 
      name: 'G. H. S. S Thekkady', 
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
      code: '6012', 
      name: 'Mount Carmel School', 
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
      code: '6015', 
      name: 'Govt. Model School', 
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
      
      // Set state based on API response or fall back to dummy data
      if (apiData.length > 0 && !useOnlyDummyData) {
        setSchools([...apiData, ...dummyData]);
      } else {
        setSchools(dummyData);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error in fetchStageDurations:", err);
      setError("Could not load data. Using sample data instead.");
      
      // If there's any error, still show the dummy data
      setSchools(dummyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialSearchTerm = searchParams.get('code') || '';
    setSearchTerm(initialSearchTerm);
    filterSchools(initialSearchTerm);
  }, [searchParams, schools]);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearchParams(new URLSearchParams({ code: newSearchTerm }));
    filterSchools(newSearchTerm);
  };

  const handleFestivalChange = (e) => {
    setSelectedFestival(e.target.value);
  };

  const filterSchools = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const results = schools.filter(school =>
      school.code.toLowerCase().includes(lowercasedTerm) ||
      school.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredSchools(results);
  };

  // Generate the appropriate title based on the selected festival
  const getPrintTitle = () => {
    switch(selectedFestival) {
      case "UP":
        return "UP Festival - Stage Duration List";
      case "Lp":
        return "LP Festival - Stage Duration List";
      case "Hs":
        return "HS Festival - Stage Duration List";
      case "Hss":
        return "HSS Festival - Stage Duration List";
      default:
        return "ALL Festival - Stage Duration List";
    }
  };

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = printRef.current.innerHTML;

    document.body.innerHTML = `
      <style type="text/css" media="print">
        @page {
          size: auto;
          margin: 0;
        }
        body {
          padding: 20px;
          font-family: sans-serif;
        }
        .print-table {
          width: 100%;
          border-collapse: collapse;
        }
        .print-table th, .print-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        .print-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .print-title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: bold;
          display: block !important;
        }
        .no-print {
          display: none !important;
        }
      </style>
      <div class="print-title">${getPrintTitle()}</div>
      ${printContents}
    `;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Function to truncate text if it's too long for mobile screens
  const truncateText = (text, maxLength = 20) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchTerm('');
    setSearchParams(new URLSearchParams({}));
    filterSchools('');
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-hidden">
          {/* Header section with title and controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-wide">
              Stage Duration List
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-40 md:w-48">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                  aria-label="Select Festival"
                >
                  <option value="ALL Festival">ALL Festival</option>
                  <option value="UP">UP</option>
                  <option value="Lp">Lp</option>
                  <option value="Hs">Hs</option>
                  <option value="Hss">Hss</option>
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
                placeholder="Search School Code or Name..."
                className="w-full bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search by school code or name"
              />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-gray-700 mr-1"
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              )}
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
              <div className="overflow-x-auto  rounded-lg bg-white">
                <div ref={printRef} className="min-w-full">
                  <table className="min-w-full  text-center">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700  bg-gray-50 z-10">Sl No</th>
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
                      {filteredSchools.length > 0 ? (
                        filteredSchools.map((school) => (
                          <tr key={school.slno} className="hover:bg-gray-50 b text-gray-700">
                            <td className="p-2 md:p-3 text-xs md:text-sm  bg-white z-10">{school.slno}</td>
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
                              <p>No items found matching your search criteria.</p>
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
              
              {/* Show a hint for mobile users */}
              <div className="md:hidden text-xs text-gray-500 italic mt-2 text-center">
                Swipe left/right to view all columns
              </div>
              
              {/* Results count */}
            
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StageDurationList;
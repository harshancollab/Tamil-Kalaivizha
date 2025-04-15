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
  
  // Get festival from URL query params, default to "All Festival" if not present
  const selectedFestival = searchParams.get('festival') || "All Festival";
  
  console.log(Alllist);

  useEffect(() => {
    getAllitemise();
  }, []);

  const getAllitemise = async () => {
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
      }
    } else {
      // Use dummy data if no token is available
      setList(dummyData);
    }
  };

  const handleFestivalChange = (e) => {
    // Update URL when festival changes
    setSearchParams({ festival: e.target.value });
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

  // Improved mobile-friendly print function
  const handlePrint = () => {
    // Create a new iframe element
    const printIframe = document.createElement('iframe');
    
    // Set attributes to make it invisible
    printIframe.style.position = 'absolute';
    printIframe.style.width = '0px';
    printIframe.style.height = '0px';
    printIframe.style.border = '0';
    
    // Append iframe to the body
    document.body.appendChild(printIframe);
    
    // Get reference to iframe document
    const iframeDoc = printIframe.contentWindow.document;
    
    // Write print content to iframe document
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${getPrintTitle()}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <style>
            @media print {
              @page {
                size: auto;
                margin: 10mm;
              }
              
              body {
                font-family: Arial, sans-serif;
                padding: 0;
                margin: 0;
              }
              
              .print-container {
                width: 100%;
                padding: 10px;
              }
              
              .print-title {
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 15px;
              }
              
              .print-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
              }
              
              .print-table th, .print-table td {
                border: 1px solid #000;
                padding: 5px;
                text-align: center;
              }
              
              .print-table th {
                background-color: #f2f2f2;
                font-weight: bold;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="print-title">${getPrintTitle()}</div>
            <table class="print-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>School Code</th>
                  <th>School Name</th>
                </tr>
              </thead>
              <tbody>
                ${filteredList && filteredList.length > 0 ? 
                  filteredList.map((item, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${item.schoolCode || "-"}</td>
                      <td>${item.schoolName || "-"}</td>
                    </tr>
                  `).join('') : 
                  `<tr><td colspan="3">No schools found for this festival.</td></tr>`
                }
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);
    
    iframeDoc.close();
    
    // Wait for iframe content to load before printing
    printIframe.onload = function() {
      try {
        // Focus and print
        printIframe.contentWindow.focus();
        printIframe.contentWindow.print();
        
        // Remove iframe after printing (delayed to ensure print dialog appears)
        setTimeout(() => {
          document.body.removeChild(printIframe);
        }, 500);
      } catch (error) {
        console.error('Print error:', error);
        document.body.removeChild(printIframe);
        
        // Fallback to window.print() if iframe method fails
        window.print();
      }
    };
  };

  // Filter the list based on selected festival using itemCodeName range
  const filteredList = selectedFestival === "All Festival" 
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
                onClick={handlePrint}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
              >
                Print
              </button>
            </div>
          </div>
          <div ref={printRef} className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2">
                  <thead className="text-xs sm:text-sm">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      <th className="p-2 md:p-3">School Code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {filteredList && filteredList.length > 0 ? (
                      filteredList.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{index + 1}</td>
                          <td className="p-2 md:p-3">{item.schoolCode || "-"}</td>
                          <td className="p-2 md:p-3">{item.schoolName || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-100">
                        <td colSpan="3" className="p-2 md:p-3">No schools found for this festival.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParticipatingSclList
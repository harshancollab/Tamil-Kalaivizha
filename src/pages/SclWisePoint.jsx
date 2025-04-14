// import React, { useEffect, useState, useRef } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { useSearchParams } from 'react-router-dom';
// import { getAllsclwisepoitAPI } from '../services/allAPI';

// const SclWisePoint = () => {

//     const [Allitemresult, setItemresult] = useState([]);
//     const printRef = useRef();
//     const [searchParams, setSearchParams] = useSearchParams();


//     const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";

//     useEffect(() => {
//         //getAllItemResult();
//     }, []);

//     const getAllItemResult = async () => {
//         const token = sessionStorage.getItem("token");
//         if (token) {
//             const reqHeader = {
//                 "Authorization": `Bearer ${token}`
//             }
//             try {
//                 const result = await getAllsclwisepoitAPI(reqHeader)
//                 if (result.status === 200) {
//                     setItemresult(result.data)
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }

//     const resultData = [
//         { slNo: 1, regNo: "3016", code: "GHSS Kozhikode", mark1: 5, mark2: 8, mark3: 2, total: "67", markPercentage: 85, rank: 2, grade: "A", point: 9.5 },
//         { slNo: 2, regNo: "3015", code: "MES HSS", mark1: 9, mark2: 8, mark3: 5, total: "66", markPercentage: 91, rank: 1, grade: "A+", point: 10.0 },
//         { slNo: 3, regNo: "3016", code: "G. H. S. S Anakara", mark1: 7, mark2: 2, mark3: 8, total: "45", markPercentage: 82, rank: 3, grade: "A-", point: 9.0 },
//         { slNo: 4, regNo: "3445", code: "G. H. S. S Kumily", mark1: 8, mark2: 2, mark3: 7, total: "43", markPercentage: 72, rank: 7, grade: "B+", point: 8.0 },
//         { slNo: 5, regNo: "675", code: "G. H. S. S. Vaguvurrai", mark1: 2, mark2: 0, mark3: 8, total: "45", markPercentage: 87, rank: 4, grade: "A", point: 9.5 },
//         { slNo: 6, regNo: "8905", code: "123", mark1: 8, mark2: 7, mark3: 8, total: "33", markPercentage: 78, rank: 5, grade: "B+", point: 8.5 },
//         { slNo: 7, regNo: "4589", code: "456", mark1: 5, mark2: 0, mark3: 8, total: 203, markPercentage: 68, rank: 8, grade: "B", point: 7.5 },
//         { slNo: 8, regNo: "6787", code: "976", mark1: 0, mark2: 6, mark3: 0, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 }
//     ];


//     const getPrintTitle = () => {
//         switch (selectedFestival) {
//             case "UP Kalaivizha":
//                 return "UP Tamil Kalaivizha - School Wise Point Report";
//             case "Lp Kalaivizha":
//                 return "LP Tamil Kalaivizha - School Wise Point Report";
//             case "Hs Kalaivizha":
//                 return "HS Tamil Kalaivizha - School Wise Point Report";
//             case "Hss Kalaivizha":
//                 return "HSS Tamil Kalaivizha - School Wise Point Report";
//             default:
//                 return "Item Result List";
//         }
//     };

//     const handleFestivalChange = (e) => {

//         setSearchParams({ festival: e.target.value });
//     };

//     const handlePrint = () => {
//         const originalContents = document.body.innerHTML;
//         const printContents = printRef.current.innerHTML;

//         document.body.innerHTML = `
//             <style type="text/css" media="print">
//                 @page {
//                     size: auto;
//                     margin: 0;
//                 }
//                 body {
//                     padding: 20px;
//                     font-family: sans-serif;
//                 }
//                 .print-table {
//                     width: 100%;
//                     border-collapse: collapse;
//                 }
//                 .print-table th, .print-table td {
//                     border: 1px solid #ddd;
//                     padding: 8px;
//                     text-align: center;
//                 }
//                 .print-table th {
//                     background-color: #f2f2f2;
//                     font-weight: bold;
//                 }
//                 .print-title {
//                     text-align: center;
//                     margin-bottom: 20px;
//                     font-size: 18px;
//                     font-weight: bold;
//                     display: block !important;
//                 }
//                 .no-print {
//                     display: none !important;
//                 }
//             </style>
//             ${printContents}
//         `;
//         window.print();
//         document.body.innerHTML = originalContents;
//         window.location.reload();
//     };


//     const filteredData = resultData;
//     return (






//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//                         <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//                         School Wise Point List
//                         </h2>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             <div className="relative w-full sm:w-40">
//                                 <select
//                                     className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                     onChange={handleFestivalChange}
//                                     value={selectedFestival}
//                                 >
//                                     <option value="All Festival">All Festival</option>
//                                     <option value="UP Kalaivizha">UP Kalaivizha</option>
//                                     <option value="Lp Kalaivizha">Lp Kalaivizha</option>
//                                     <option value="Hs Kalaivizha">Hs Kalaivizha</option>
//                                     <option value="Hss Kalaivizha">Hss Kalaivizha</option>
//                                 </select>
//                                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                     <i className="fa-solid fa-chevron-down"></i>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={handlePrint}
//                                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//                             >
//                                 Print
//                             </button>
//                         </div>
//                     </div>

//                     <div ref={printRef} className="w-full">
//                         <div className="print-title hidden">{getPrintTitle()}</div>
//                         <div className="overflow-x-auto -mx-4 sm:mx-0">
//                             <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                                 <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
//                                     <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                                         <thead className="bg-gray-50">
//                                             <tr className="text-gray-700">
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade A</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade B</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade C</th>
//                                                 <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
                                              
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
//                                             {filteredData.map((result) => (
//                                                 <tr key={result.slNo} className="hover:bg-gray-100">
//                                                     <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
//                                                     <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
//                                                     <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
//                                                     <td className="p-2 md:p-3 whitespace-nowrap">{result.mark1}</td>
//                                                     <td className="p-2 md:p-3 whitespace-nowrap">{result.mark2}</td>
//                                                     <td className="p-2 md:p-3 whitespace-nowrap">{result.mark3}</td>
//                                                     <td className="p-2 md:p-3 whitespace-nowrap">{result.total}</td>
                                                    
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SclWisePoint

import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import { getAllsclwisepoitAPI } from '../services/allAPI';

const SclWisePoint = () => {
    const [allResultData, setAllResultData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const printRef = useRef();
    const iframeRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [printReady, setPrintReady] = useState(false);

    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";

    // Dummy data with festival-related information (using itemCode to determine festival)
    const dummyResultData = [
        { slNo: 1, regNo: "3016", code: "GHSS Kozhikode", mark1: 5, mark2: 8, mark3: 2, total: "67", markPercentage: 85, rank: 2, grade: "A", point: 9.5, itemCode: "301" },
        { slNo: 2, regNo: "3015", code: "MES HSS", mark1: 9, mark2: 8, mark3: 5, total: "66", markPercentage: 91, rank: 1, grade: "A+", point: 10.0, itemCode: "302" },
        { slNo: 3, regNo: "3016", code: "G. H. S. S Anakara", mark1: 7, mark2: 2, mark3: 8, total: "45", markPercentage: 82, rank: 3, grade: "A-", point: 9.0, itemCode: "303" },
        { slNo: 4, regNo: "3445", code: "G. H. S. S Kumily", mark1: 8, mark2: 2, mark3: 7, total: "43", markPercentage: 72, rank: 7, grade: "B+", point: 8.0, itemCode: "401" },
        { slNo: 5, regNo: "675", code: "G. H. S. S. Vaguvurrai", mark1: 2, mark2: 0, mark3: 8, total: "45", markPercentage: 87, rank: 4, grade: "A", point: 9.5, itemCode: "402" },
        { slNo: 6, regNo: "8905", code: "St. Mary's School", mark1: 8, mark2: 7, mark3: 8, total: "33", markPercentage: 78, rank: 5, grade: "B+", point: 8.5, itemCode: "501" },
        { slNo: 7, regNo: "4589", code: "DAV Public School", mark1: 5, mark2: 0, mark3: 8, total: "55", markPercentage: 68, rank: 8, grade: "B", point: 7.5, itemCode: "502" },
        { slNo: 8, regNo: "6787", code: "Kendriya Vidyalaya", mark1: 0, mark2: 6, mark3: 0, total: "26", markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemCode: "601" }
    ];

    useEffect(() => {
        getAllResultData();
    }, []);

    useEffect(() => {
        filterDataByFestival();
    }, [selectedFestival, allResultData]);

    // Effect to handle printing after iframe is loaded
    useEffect(() => {
        if (printReady && iframeRef.current) {
            try {
                iframeRef.current.contentWindow.print();
                setPrintReady(false);
            } catch (error) {
                console.error("Printing failed:", error);
                setPrintReady(false);
            }
        }
    }, [printReady]);

    const getAllResultData = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllsclwisepoitAPI(reqHeader)
                if (result.status === 200) {
                    setAllResultData(result.data);
                }
            } catch (err) {
                console.log(err);
                setAllResultData(dummyResultData);
            }
        } else {
            setAllResultData(dummyResultData);
        }
    }

    const filterDataByFestival = () => {
        if (!allResultData.length) return;

        let filtered;
        switch (selectedFestival) {
            case "UP Kalaivizha":
                filtered = allResultData.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 300 && itemCode < 400;
                });
                break;
            case "LP Kalaivizha":
                filtered = allResultData.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 400 && itemCode < 500;
                });
                break;
            case "HS Kalaivizha":
                filtered = allResultData.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 500 && itemCode < 600;
                });
                break;
            case "HSS Kalaivizha":
                filtered = allResultData.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 600 && itemCode < 700;
                });
                break;
            case "All Festival":
                filtered = [...allResultData];
                break;
            default:
                filtered = [...allResultData];
        }

        // Add sequential numbering to filtered results
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredData(filtered);
    }

    const getPrintTitle = () => {
        switch (selectedFestival) {
            case "UP Kalaivizha":
                return "UP Tamil Kalaivizha - School Wise Point Report";
            case "LP Kalaivizha":
                return "LP Tamil Kalaivizha - School Wise Point Report";
            case "HS Kalaivizha":
                return "HS Tamil Kalaivizha - School Wise Point Report";
            case "HSS Kalaivizha":
                return "HSS Tamil Kalaivizha - School Wise Point Report";
            case "All Festival":
                return "All Festival Tamil Kalaivizha - School Wise Point Report";
            default:
                return "School Wise Point Report";
        }
    };

    const handleFestivalChange = (e) => {
        setSearchParams({ festival: e.target.value });
    };
    const handlePrint = () => {
        // Get table content and title
        const tableData = printRef.current.innerHTML;
        const title = getPrintTitle();
        
        // Create a hidden iframe for printing (works better on mobile)
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '-9999px';
        iframe.style.left = '-9999px';
        iframe.style.width = '0';
        iframe.style.height = '0';
        document.body.appendChild(iframe);
        
        // Write content to the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @media print {
                body {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                  background-color: white !important;
                }
                
                @page {
                  margin: 1cm;
                  size: portrait;
                }
              }
              
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 15px;
                background-color: white;
              }
              
              .print-header {
                text-align: center;
                margin-bottom: 20px;
                font-size: 18px;
                font-weight: bold;
                display: block !important;
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                page-break-inside: auto;
              }
              
              tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }
              
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
              }
              
              th {
                background-color: #f2f2f2 !important;
                font-weight: bold;
              }
              
              tr:nth-child(even) {
                background-color: #f9f9f9 !important;
              }
              
              /* Mobile responsive adjustments */
              @media screen and (max-width: 600px) {
                table {
                  font-size: 12px;
                }
                
                th, td {
                  padding: 5px;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-header">${title}</div>
            ${tableData}
          </body>
          </html>
        `);
        iframeDoc.close();
        
        // Try to use the iframe's print function directly
        try {
          // Wait a bit for content to fully render
          setTimeout(() => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            
            // Remove the iframe after printing
            setTimeout(() => {
              document.body.removeChild(iframe);
            }, 1000);
          }, 500);
        } catch (err) {
          console.error('Print failed:', err);
          alert('Printing failed. Please try again.');
          document.body.removeChild(iframe);
        }
      };

    // Initialize filtered data at component mount
    useEffect(() => {
        if (allResultData.length === 0 && dummyResultData.length > 0) {
            setAllResultData(dummyResultData);
        }
    }, []);

    // Determine what data to display
    const displayData = filteredData.length > 0 ? filteredData : 
        (allResultData.length > 0 ? allResultData : dummyResultData);

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                        School Wise Point List
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

                    <div className="w-full">
                        <div ref={printRef}>
                            <table className="min-w-full text-center border-separate border-spacing-y-2">
                                <thead className="bg-gray-50">
                                    <tr className="text-gray-700">
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade A</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade B</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade C</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                    {displayData.length > 0 ? (
                                        displayData.map((result) => (
                                            <tr key={result.slNo} className="hover:bg-gray-100">
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark1}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark2}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark3}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.total}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="p-3 text-center text-gray-500">
                                                No records found for {selectedFestival}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SclWisePoint
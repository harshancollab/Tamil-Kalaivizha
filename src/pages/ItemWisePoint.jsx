import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllItemwisepointAPI } from '../services/allAPI';

const ItemWisePoint = () => {
  const [schoolCode, setSchoolCode] = useState('');
  const [selectedFestival, setSelectedFestival] = useState('All Festival');
  const [Allitemwiswpoint, setItemwiswpoint] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    getAllItemwiswpoint();
  }, []);

  useEffect(() => {
    filterItemsByFestival(selectedFestival);
  }, [selectedFestival, Allitemwiswpoint]);

  const getAllItemwiswpoint = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllItemwisepointAPI(reqHeader)
        if (result.status === 200) {
          setItemwiswpoint(result.data)
        }
      } catch (err) {
        console.log(err);
        setItemwiswpoint(resultData);
      }
    } else {
      setItemwiswpoint(resultData);
    }
  }

  const filterItemsByFestival = (festival) => {
    if (!Allitemwiswpoint.length) return;
    
    let filtered;
    switch (festival) {
      case "UP Kalaivizha":
        filtered = Allitemwiswpoint.filter(item => {
          // Extracting the item code number from "301 - Story Writing" format
          const itemCodeStr = item.itemCode.split(' ')[0];
          const itemCode = parseInt(itemCodeStr);
          return itemCode >= 300 && itemCode < 400;
        });
        break;
      case "LP Kalaivizha":
        filtered = Allitemwiswpoint.filter(item => {
          const itemCodeStr = item.itemCode.split(' ')[0];
          const itemCode = parseInt(itemCodeStr);
          return itemCode >= 400 && itemCode < 500;
        });
        break;
      case "HS Kalaivizha":
        filtered = Allitemwiswpoint.filter(item => {
          const itemCodeStr = item.itemCode.split(' ')[0];
          const itemCode = parseInt(itemCodeStr);
          return itemCode >= 500 && itemCode < 600;
        });
        break;
      case "HSS Kalaivizha":
        filtered = Allitemwiswpoint.filter(item => {
          const itemCodeStr = item.itemCode.split(' ')[0];
          const itemCode = parseInt(itemCodeStr);
          return itemCode >= 600 && itemCode < 700;
        });
        break;
      case "All Festival":
        filtered = [...Allitemwiswpoint];
        break;
      default:
        filtered = [...Allitemwiswpoint];
    }
    
    // Add sequential numbering to filtered results
    filtered = filtered.map((item, index) => ({
      ...item,
      slNo: index + 1
    }));
    
    // Further filter by school code if provided
    if (schoolCode.trim() !== '') {
      filtered = filtered.filter(item => 
        item.school.toLowerCase().includes(schoolCode.toLowerCase())
      );
    }
    
    setFilteredItems(filtered);
  }

  const resultData = [
    { slNo: 1, itemCode: "301 - Story Writing", school: "GHSS Kozhikode", studentName: "Rahul K", grade: "A", point: 9.5, totalPoint: 9.5 },
    { slNo: 2, itemCode: "302 - Essay Writing", school: "St. Joseph HSS", studentName: "Anjali S", grade: "A", point: 10.0, totalPoint: 10.0 },
    { slNo: 3, itemCode: "401 - LP Story Writing", school: "MES HSS", studentName: "Arun P", grade: "A", point: 9.0, totalPoint: 9.0 },
    { slNo: 4, itemCode: "402 - LP Essay Writing", school: "Govt HSS", studentName: "Meera T", grade: "B", point: 8.0, totalPoint: 8.0 },
    { slNo: 5, itemCode: "403 - LP Poem Recitation", school: "Sacred Heart HSS", studentName: "Vishnu M", grade: "A", point: 9.5, totalPoint: 9.5 },
    { slNo: 6, itemCode: "504 - HS Elocution", school: "Kendriya Vidyalaya", studentName: "Sameera N", grade: "B", point: 8.5, totalPoint: 8.5 },
    { slNo: 7, itemCode: "605 - HSS Group Song", school: "Christ HSS", studentName: "Team A", grade: "B", point: 7.5, totalPoint: 7.5 },
    { slNo: 8, itemCode: "606 - HSS Folk Dance", school: "St. Mary's HSS", studentName: "Dance Group", grade: "B", point: 8.0, totalPoint: 8.0 }
  ];

  const handleSchoolCodeChange = (e) => {
    setSchoolCode(e.target.value);
    // Trigger filtering whenever school code changes
    setTimeout(() => {
      filterItemsByFestival(selectedFestival);
    }, 100);
  };

  const handleFestivalChange = (e) => {
    setSelectedFestival(e.target.value);
  };

  const getPrintTitle = () => {
    switch (selectedFestival) {
      case "UP Kalaivizha":
        return "UP Tamil Kalaivizha - Item Wise Point List";
      case "LP Kalaivizha":
        return "LP Tamil Kalaivizha - Item Wise Point List";
      case "HS Kalaivizha":
        return "HS Tamil Kalaivizha - Item Wise Point List";
      case "HSS Kalaivizha":
        return "HSS Tamil Kalaivizha - Item Wise Point List";
      case "All Festival":
        return "All Festival Tamil Kalaivizha - Item Wise Point List";
      default:
        return "Item Wise Point List";
    }
  };

  // const handlePrint = () => {
  //   const printContent = document.getElementById('item-wise-point-table');
    
  //   const printWindow = window.open('', '_blank');
  //   printWindow.document.open();
    
  //   printWindow.document.write(`
  //     <html>
  //     <head>
  //       <title>${getPrintTitle()}</title>
  //       <style>
  //         body { font-family: Arial, sans-serif; }
  //         table { width: 100%; border-collapse: collapse; }
  //         th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
  //         th { background-color: #f2f2f2; }
  //         h2 { text-align: center; margin-bottom: 20px; }
  //         @media print {
  //           @page { size: landscape; }
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <h2>${getPrintTitle()}</h2>
  //       ${printContent.innerHTML}
  //     </body>
  //     </html>
  //   `);
    
  //   printWindow.document.close();
    
  //   // Remove date/time from the print dialog
  //   setTimeout(() => {
  //     printWindow.print();
  //     printWindow.close();
  //   }, 250);
  // };
  
  // Initialize filtered data at component mount
  
  
  
  const handlePrint = () => {
    const printContent = document.getElementById('item-wise-point-table');
    const pageTitle = `${getPrintTitle()}`;
    
    // Create a hidden iframe for mobile-compatible printing
    const iframe = document.createElement('iframe');
    iframe.name = 'printIframe';
    iframe.id = 'printIframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Write the content to the iframe with improved mobile compatibility
    iframe.contentDocument.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${pageTitle}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Reset styles */
                * {
                    box-sizing: border-box;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                
                /* Base styles */
                html, body {
                    margin: 0;
                    padding: 0;
                    background-color: #ffffff !important;
                    font-family: Arial, sans-serif;
                    width: 100%;
                }
                
                /* Header styling */
                .print-header {
                    text-align: center;
                    padding: 10px;
                    margin-bottom: 15px;
                    border-bottom: 2px solid #003566;
                    background-color: #ffffff !important;
                }
                
                .print-header h1 {
                    margin: 0;
                    color: #003566 !important;
                    font-size: 18px;
                }
                
                .print-header p {
                    margin: 5px 0 0;
                    font-size: 14px;
                    color: #333333 !important;
                }
                
                /* Table styling */
                table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #ffffff !important;
                    margin-bottom: 20px;
                }
                
                th, td {
                    border: 1px solid #000000;
                    padding: 6px;
                    text-align: center;
                    font-size: 11px;
                    color: #000000 !important;
                }
                
                th {
                    background-color: #f2f2f2 !important;
                    font-weight: bold;
                }
                
                /* Print-specific rules */
                @media print {
                    @page {
                        size: landscape;
                        margin: 0.5cm;
                    }
                    
                    html, body {
                        background-color: #ffffff !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .print-header, table, th, td {
                        page-break-inside: avoid;
                    }
                    
                    th {
                        background-color: #f2f2f2 !important;
                    }
                }
            </style>
        </head>
        <body>
            <!-- Custom header -->
            <div class="print-header">
                <h1>${getPrintTitle()}</h1>
               
                
            </div>
            
            <!-- Table content -->
            <div style="overflow-x: auto; background-color: #ffffff !important;">
                ${printContent.innerHTML}
            </div>
            
            <script>
                // Force background color and other print settings
                function preparePrint() {
                    // Set explicit background color on all elements
                    const allElements = document.querySelectorAll('*');
                    allElements.forEach(el => {
                        if (el.tagName === 'TH') {
                            el.style.backgroundColor = '#f2f2f2';
                        } else {
                            el.style.backgroundColor = '#ffffff';
                        }
                    });
                    
                    // Force print background colors
                    document.body.style.webkitPrintColorAdjust = 'exact';
                    document.body.style.colorAdjust = 'exact';
                    document.body.style.printColorAdjust = 'exact';
                    
                    // Additional fixes for mobile printing
                    const tableContainer = document.querySelector('table');
                    if (tableContainer) {
                        tableContainer.style.width = '100%';
                        tableContainer.style.backgroundColor = '#ffffff';
                        
                        const rows = tableContainer.querySelectorAll('tr');
                        rows.forEach(row => {
                            row.style.backgroundColor = '#ffffff';
                        });
                    }
                }
                
                // Run preparation and print
                window.onload = function() {
                    preparePrint();
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            </script>
        </body>
        </html>
    `);
    
    iframe.contentDocument.close();
    
    // Print with timeout to ensure content is loaded
    setTimeout(() => {
        try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            
            // Cleanup iframe after printing
            setTimeout(() => {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
            }, 3000);
        } catch (error) {
            console.error('Print error:', error);
            alert('Printing failed. Please try again.');
            
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
        }
    }, 1000);
};
  
  
  
  useEffect(() => {
    if (Allitemwiswpoint.length === 0 && resultData.length > 0) {
      setItemwiswpoint(resultData);
      filterItemsByFestival(selectedFestival);
    }
  }, []);

  // Determine what data to display
  const displayData = filteredItems.length > 0 ? filteredItems : 
                     (Allitemwiswpoint.length > 0 ? Allitemwiswpoint : resultData);

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Item Wise Point List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-blue-700 whitespace-nowrap min-w-max">School Code</label>
                <input
                  type="text"
                  className="rounded-full border border-blue-700 px-2 py-2 flex-grow"
                  placeholder="Enter School Code..."
                  value={schoolCode}
                  onChange={handleSchoolCodeChange}
                />
              </div>

              <button
                className={`border-blue-800 border text-blue-900 py-2 px-4 rounded-full min-w-max whitespace-nowrap ${schoolCode.trim() !== '' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                disabled={schoolCode.trim() !== ''}
                onClick={() => {
                  setSchoolCode('');
                  setTimeout(() => {
                    filterItemsByFestival(selectedFestival);
                  }, 100);
                }}
              >
                All School
              </button>

              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                  aria-label="Select Festival"
                >
                  <option value="All Festival">All Festival</option>
                  <option value="UP Kalaivizha">UP Kalaivizha</option>
                  <option value="LP Kalaivizha">LP Kalaivizha</option>
                  <option value="HS Kalaivizha">HS Kalaivizha</option>
                  <option value="HSS Kalaivizha">HSS Kalaivizha</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <button
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                onClick={handlePrint}
                aria-label="Print report"
              >
                Print
              </button>
            </div>
          </div>

          <div className="w-full mt-6">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                  <div id="item-wise-point-table" className="overflow-x-scroll md:overflow-hidden">
                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                      <thead className="bg-gray-50">
                        <tr className="text-gray-700">
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Student Name</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Total Point</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                        {displayData.length > 0 ? (
                          displayData.map((result) => (
                            <tr key={result.slNo} className="hover:bg-gray-100">
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCode}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.school}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.studentName}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.totalPoint}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="p-4 text-center">
                              No items found for {selectedFestival}
                              {schoolCode.trim() !== '' ? ` with school code "${schoolCode}"` : ''}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemWisePoint
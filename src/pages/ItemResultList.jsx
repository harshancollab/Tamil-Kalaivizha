import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { getAllitemtentryListAPI } from '../services/allAPI'

const ItemResultList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [Allitemresult, setItemresult] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const printRef = useRef();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Get festival from URL query params, default to "ALL Festival" if not present
    const [selectedFestival, setSelectedFestival] = useState(searchParams.get('festival') || "ALL Festival");

    // Sample data for demonstration
    const resultData = [
        { slNo: 1, regNo: "301 - Story Writing", code: "301", itemName: "Story Writing", itemType: "Single", studentsCount: 5, resultEntered: 3, resultNotEntered: 2, confirmed: "Yes", status: "Completed" },
        { slNo: 2, regNo: "305 - Recitation", code: "305", itemName: "Recitation", itemType: "Single", studentsCount: 8, resultEntered: 8, resultNotEntered: 0, confirmed: "Yes", status: "Completed" },
        { slNo: 3, regNo: "410 - Group Song", code: "410", itemName: "Group Song", itemType: "Group", studentsCount: 12, resultEntered: 10, resultNotEntered: 2, confirmed: "No", status: "In Progress" },
        { slNo: 4, regNo: "415 - Folk Dance", code: "415", itemName: "Folk Dance", itemType: "Group", studentsCount: 15, resultEntered: 15, resultNotEntered: 0, confirmed: "Yes", status: "Completed" },
        { slNo: 5, regNo: "502 - Essay Writing", code: "502", itemName: "Essay Writing", itemType: "Single", studentsCount: 10, resultEntered: 8, resultNotEntered: 2, confirmed: "No", status: "In Progress" },
        { slNo: 6, regNo: "507 - Debate", code: "507", itemName: "Debate", itemType: "Single", studentsCount: 6, resultEntered: 6, resultNotEntered: 0, confirmed: "Yes", status: "Completed" },
        { slNo: 7, regNo: "608 - Quiz", code: "608", itemName: "Quiz", itemType: "Group", studentsCount: 9, resultEntered: 0, resultNotEntered: 9, confirmed: "No", status: "Not Started" },
        { slNo: 8, regNo: "612 - Elocution", code: "612", itemName: "Elocution", itemType: "Single", studentsCount: 7, resultEntered: 5, resultNotEntered: 2, confirmed: "No", status: "In Progress" }
    ];

    useEffect(() => {
        getAllItemResult();
    }, []);

    const getAllItemResult = async () => {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        
        try {
            let data = [];
            
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                
                try {
                    const result = await getAllitemtentryListAPI(reqHeader);
                    if (result.status === 200) {
                        data = result.data.map((item, index) => ({
                            slNo: index + 1,
                            regNo: `${item.code} - ${item.itemName}`,
                            code: item.code,
                            itemName: item.itemName,
                            itemType: item.itemType || 'Single',
                            studentsCount: item.studentsCount || 0,
                            resultEntered: item.resultEntered || 0,
                            resultNotEntered: item.resultNotEntered || 0,
                            confirmed: item.confirmed || 'No',
                            status: item.status || 'Not Started'
                        }));
                    }
                } catch (apiErr) {
                    console.error("API call failed, using only dummy data:", apiErr);
                    data = resultData;
                }
            } else {
                data = resultData;
            }
            
            setItemresult(data);
            setError(null);
        } catch (err) {
            console.error("Error in getAllItemResult:", err);
            setError("Could not load data. Using sample data instead.");
            setItemresult(resultData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Apply festival filtering when the list or selected festival changes
        applyFestivalFilter(selectedFestival);
    }, [Allitemresult, selectedFestival]);

    const applyFestivalFilter = (festival) => {
        if (!Allitemresult.length) return;

        let filtered = [];
        
        if (festival !== "ALL Festival") {
            switch (festival) {
                case "UP Kalaivizha":
                    filtered = Allitemresult.filter(item => {
                        const itemCode = parseInt(item.code);
                        return itemCode >= 300 && itemCode < 400;
                    });
                    break;
                case "Lp Kalaivizha":
                    filtered = Allitemresult.filter(item => {
                        const itemCode = parseInt(item.code);
                        return itemCode >= 400 && itemCode < 500;
                    });
                    break;
                case "Hs Kalaivizha":
                    filtered = Allitemresult.filter(item => {
                        const itemCode = parseInt(item.code);
                        return itemCode >= 500 && itemCode < 600;
                    });
                    break;
                case "Hss Kalaivizha":
                    filtered = Allitemresult.filter(item => {
                        const itemCode = parseInt(item.code);
                        return itemCode >= 600 && itemCode < 700;
                    });
                    break;
                default:
                    filtered = [...Allitemresult];
            }
        } else {
            filtered = [...Allitemresult];
        }

        // Update the serial numbers after filtering
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredResults(filtered);
    };

    const getPrintTitle = () => {
        switch (selectedFestival) {
            case "UP Kalaivizha":
                return "UP Tamil Kalaivizha - Item Result List";
            case "Lp Kalaivizha":
                return "LP Tamil Kalaivizha - Item Result List";
            case "Hs Kalaivizha":
                return "HS Tamil Kalaivizha - Item Result List";
            case "Hss Kalaivizha":
                return "HSS Tamil Kalaivizha - Item Result List";
            default:
                return "ALL Festival - Item Result List";
        }
    };

    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        setSelectedFestival(festival);
        // Update URL when festival changes
        setSearchParams({ festival });
        applyFestivalFilter(festival);
    };

    const handlePrint = () => {
        // Get the table content using ref
        const printContent = printRef.current;
        if (!printContent) {
            console.error("Print content not found");
            return;
        }
        
        const pageTitle = getPrintTitle();
        
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
                    
                    /* Hide reset column when printing */
                    .no-print {
                        display: none;
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
                    <h1>${pageTitle}</h1>
                    <p>Date: ${new Date().toLocaleDateString()}</p>
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
                        
                        // Hide the reset button column
                        const resetCells = document.querySelectorAll('.no-print');
                        resetCells.forEach(cell => {
                            cell.style.display = 'none';
                        });
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

    const handleReset = (itemCode) => {
        // Implement reset functionality here
        console.log(`Reset item with code: ${itemCode}`);
        // You would typically make an API call here to reset the item
        // and then refresh the data
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
                            Item Result List
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
                                    <option value="UP Kalaivizha">UP Kalaivizha</option>
                                    <option value="Lp Kalaivizha">Lp Kalaivizha</option>
                                    <option value="Hs Kalaivizha">Hs Kalaivizha</option>
                                    <option value="Hss Kalaivizha">Hss Kalaivizha</option>
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            <button
                                onClick={handlePrint}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-6 md:px-8 py-2 rounded-full text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                aria-label="Print Item Result List"
                            >
                                 Print
                            </button>
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
                        <div ref={printRef} className="overflow-x-auto rounded-lg bg-white">
                            <table id="printTable" className="min-w-full text-center">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 z-10">Sl No</th>
                                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item Code & Name</th>
                                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item Type</th>
                                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">No of Students</th>
                                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Result Entered</th>
                                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Result Not Entered</th>
                                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Confirmed</th>
                                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 no-print">Reset</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResults && filteredResults.length > 0 ? (
                                        filteredResults.map((result) => (
                                            <tr key={result.slNo} className="hover:bg-gray-50 b text-gray-700">
                                                <td className="p-2 md:p-3 text-xs md:text-sm bg-white z-10">{result.slNo}</td>
                                                <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{result.regNo}</td>
                                                <td className="p-2 md:p-3 text-xs md:text-sm">{result.itemType}</td>
                                                <td className="p-2 md:p-3 text-xs md:text-sm">{result.studentsCount}</td>
                                                <td className="p-2 md:p-3 text-xs md:text-sm">{result.resultEntered}</td>
                                                <td className="p-2 md:p-3 text-xs md:text-sm">{result.resultNotEntered}</td>
                                                <td className="p-2 md:p-3 text-xs md:text-sm">{result.confirmed}</td>
                                                <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap no-print">
                                                    <button 
                                                        onClick={() => handleReset(result.code)}
                                                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                        aria-label={`Reset results for ${result.itemName}`}
                                                    >
                                                        <i className="fa-solid fa-arrow-rotate-right"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="p-6 text-center text-gray-600">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <i className="fa-solid fa-clipboard-list text-2xl text-gray-400"></i>
                                                    <p>No results found for {selectedFestival === "ALL Festival" ? "any festival" : selectedFestival}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ItemResultList
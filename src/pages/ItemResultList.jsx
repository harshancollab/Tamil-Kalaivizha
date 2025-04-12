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
        const printContents = printRef.current.innerHTML;
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <html>
            <head>
                <title>${getPrintTitle()}</title>
                <style type="text/css">
                    @page {
                        size: landscape;
                        margin: 0.5cm;
                    }
                    body {
                        padding: 20px;
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    table th, table td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: center;
                    }
                    table th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    .print-title {
                        text-align: center;
                        margin-bottom: 20px;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .no-print {
                        display: none !important;
                    }
                </style>
            </head>
            <body>
                <div class="print-title">${getPrintTitle()}</div>
                ${printContents}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
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
                            <table className="min-w-full text-center">
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
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllConfidentialAPI } from '../services/allAPI';
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const DConfidentialResult = () => {
    const printRef = useRef();
    const [selectedItem, setSelectedItem] = useState(null);
    const [Allitemresult, setItemresult] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedFestival = searchParams.get('festival') || "All Festival";
    
    // Festival options array for the dropdown
    const festivalOptions = [
        { value: "All Festival", display: "All Festival" },
        { value: "UP Kalaivizha", display: "UP Kalaivizha" },
        { value: "LP Kalaivizha", display: "LP Kalaivizha" },
        { value: "HS Kalaivizha", display: "HS Kalaivizha" },
        { value: "HSS Kalaivizha", display: "HSS Kalaivizha" }
    ];
    
    // Search functionality
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    // Loading states
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [error, setError] = useState(null);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Mock data for testing
    const resultData = [
        { slNo: 1, regNo: "366 - Story Writing", code: "Single", mark1: 5, mark2: 8, mark3: 2, total: 15, markPercentage: 85, rank: 2, grade: "A", point: 9.5 },
        { slNo: 2, regNo: "303 - Essay Writing", code: "Single", mark1: 9, mark2: 8, mark3: 5, total: 22, markPercentage: 91, rank: 1, grade: "A+", point: 10.0 },
        { slNo: 3, regNo: "307 -  MONO ACT", code: "Single", mark1: 7, mark2: 2, mark3: 8, total: 17, markPercentage: 82, rank: 3, grade: "A-", point: 9.0 },
        { slNo: 4, regNo: "466 - Group Dance", code: "Group", mark1: 8, mark2: 2, mark3: 7, total: 17, markPercentage: 72, rank: 7, grade: "B+", point: 8.0 },
        { slNo: 5, regNo: "630 - Story Writing7", code: "234", mark1: 2, mark2: 0, mark3: 8, total: 10, markPercentage: 87, rank: 4, grade: "A", point: 9.5 },
        { slNo: 6, regNo: "556 - Pencil Drawing", code: "Single", mark1: 8, mark2: 7, mark3: 8, total: 23, markPercentage: 78, rank: 5, grade: "B+", point: 8.5 },
        { slNo: 7, regNo: "453 - Group Song", code: "Group", mark1: 5, mark2: 0, mark3: 8, total: 13, markPercentage: 68, rank: 8, grade: "B", point: 7.5 },
        { slNo: 8, regNo: "578 - Essay Writing", code: "Single", mark1: 0, mark2: 6, mark3: 0, total: 6, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 },
        { slNo: 9, regNo: "578 - Essay Writing", code: "Single", mark1: 0, mark2: 6, mark3: 0, total: 6, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 },
        { slNo: 10, regNo: "578 - Essay Writing", code: "Single", mark1: 0, mark2: 6, mark3: 0, total: 6, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 },
        { slNo: 11, regNo: "578 - Essay Writing", code: "Single", mark1: 0, mark2: 6, mark3: 0, total: 6, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 }
    ];

    const detailResultsData = {
        "366 - Story Writing": [
            { slNo: 1, regNo: 2, codeNo: 912, name: "Dhanushyaa", school: "30043 - Govt U. P. S. Vandiperiyar", mark1: 80, mark2: 80, mark3: 82, total: 242, markPercentage: 80.67, rank: 1, grade: "A", point: 5 },
            { slNo: 2, regNo: 11, codeNo: 915, name: "Mukila M", school: "30038 - G. H. S. Anakara", mark1: 76, mark2: 70, mark3: 71, total: 217, markPercentage: 72.33, rank: 2, grade: "B", point: 3 }
        ],
        "303 - Essay Writing": [
            { slNo: 1, regNo: 2, codeNo: 912, name: "Dhanushyaa", school: "30043 - Govt U. P. S. Vandiperiyar", mark1: 80, mark2: 80, mark3: 82, total: 242, markPercentage: 80.67, rank: 1, grade: "A", point: 5 },
            { slNo: 2, regNo: 11, codeNo: 915, name: "Mukila M", school: "30038 - G. H. S. Anakara", mark1: 76, mark2: 70, mark3: 71, total: 217, markPercentage: 72.33, rank: 2, grade: "B", point: 3 }
        ],
        "556 - Pencil Drawing": [
            { slNo: 1, regNo: 5, codeNo: 745, name: "Rahul S", school: "50087 - G. H. S. Kottayam", mark1: 85, mark2: 75, mark3: 80, total: 240, markPercentage: 80.00, rank: 1, grade: "A", point: 5 },
            { slNo: 2, regNo: 8, codeNo: 747, name: "Anjali P", school: "50092 - G. H. S. Kollam", mark1: 70, mark2: 68, mark3: 72, total: 210, markPercentage: 70.00, rank: 2, grade: "B", point: 3 }
        ],
        "578 - Essay Writing": [
            { slNo: 1, regNo: 4, codeNo: 822, name: "Meera K", school: "50076 - G. H. S. Thrissur", mark1: 78, mark2: 76, mark3: 75, total: 229, markPercentage: 76.33, rank: 1, grade: "B+", point: 4 },
            { slNo: 2, regNo: 7, codeNo: 825, name: "Anand S", school: "50079 - G. H. S. Palakkad", mark1: 72, mark2: 70, mark3: 68, total: 210, markPercentage: 70.00, rank: 2, grade: "B", point: 3 }
        ]
    };

    useEffect(() => {
        getAllConfidentialResult();
    }, []);

    useEffect(() => {
        filterResultsByFestival(selectedFestival);
    }, [selectedFestival, Allitemresult, searchTerm]);

    const getAllConfidentialResult = async () => {
        const token = sessionStorage.getItem("token");
        setLoading(true);
        
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress <= 90) {
                setLoadingProgress(progress);
            } else {
                clearInterval(progressInterval);
            }
        }, 200);
        
        try {
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                try {
                    const result = await getAllConfidentialAPI(reqHeader);
                    clearInterval(progressInterval);
                    setLoadingProgress(100);
                    
                    if (result.status === 200) {
                        setItemresult(result.data);
                    } else {
                        // Fallback to demo data if API returns error status
                        setItemresult(resultData);
                    }
                } catch (err) {
                    console.log("API Error:", err);
                    setItemresult(resultData);
                    setError("An error occurred while fetching results. Using default data.");
                    clearInterval(progressInterval);
                }
            } else {
                // No token, use demo data
                setItemresult(resultData);
                clearInterval(progressInterval);
                setLoadingProgress(100);
            }
        } catch (err) {
            console.error("Error in getAllConfidentialResult:", err);
            setItemresult(resultData);
            setError("An error occurred. Using default data.");
            clearInterval(progressInterval);
        } finally {
            // Always ensure loading state is finished
            setLoadingProgress(100);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const filterResultsByFestival = (festival) => {
        if (!Allitemresult || !Allitemresult.length) return;
        
        let filtered;
        switch (festival) {
            case "UP Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    // Extract item code (handle both number and string formats)
                    const itemCodeStr = String(item.regNo).split(' ')[0];
                    const itemCode = parseInt(itemCodeStr);
                    return itemCode >= 300 && itemCode < 400;
                });
                break;
            case "LP Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCodeStr = String(item.regNo).split(' ')[0];
                    const itemCode = parseInt(itemCodeStr);
                    return itemCode >= 400 && itemCode < 500;
                });
                break;
            case "HS Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCodeStr = String(item.regNo).split(' ')[0];
                    const itemCode = parseInt(itemCodeStr);
                    return itemCode >= 500 && itemCode < 600;
                });
                break;
            case "HSS Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCodeStr = String(item.regNo).split(' ')[0];
                    const itemCode = parseInt(itemCodeStr);
                    return itemCode >= 600 && itemCode < 700;
                });
                break;
            case "All Festival":
                filtered = [...Allitemresult];
                break;
            default:
                filtered = [...Allitemresult];
        }
        
        // Apply search term filter if present
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(item => 
                String(item.regNo).toLowerCase().includes(lowercasedTerm) ||
                String(item.code).toLowerCase().includes(lowercasedTerm)
            );
        }
        
        // Update the index after filtering
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));
        
        setFilteredResults(filtered);
        
        // Reset to first page when filter changes
        setCurrentPage(1);
    };
    
    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        setSearchParams({ festival: selectedFestival, query: newSearchTerm });
        // Filtering will be applied by the useEffect
    };

    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        setSearchParams({ festival, query: searchTerm });
    };

    const getPrintTitle = () => {
        if (selectedItem) {
            return `${selectedFestival} - ${selectedItem} Result`;
        }
        return `${selectedFestival} - Confidential Result`;
    };

    const generatePDF = () => {
        try {
            // Create a new div for PDF content
            const pdfContent = document.createElement('div');
            
            // Add title
            const titleElement = document.createElement('h2');
            titleElement.textContent = getPrintTitle();
            titleElement.style.textAlign = 'center';
            titleElement.style.margin = '20px 0';
            titleElement.style.fontWeight = 'bold';
            pdfContent.appendChild(titleElement);
            
            // Add event info
            const eventInfo = document.createElement('div');
            eventInfo.textContent = 'Stage 8 on 07 Dec 2023';
            eventInfo.style.textAlign = 'right';
            eventInfo.style.marginBottom = '10px';
            eventInfo.style.fontSize = '14px';
            pdfContent.appendChild(eventInfo);
            
            // Create table
            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.style.marginTop = '20px';
            
            // Create table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            let headers;
            
            if (selectedItem && detailResultsData[selectedItem]) {
                // For item details view
                headers = [
                    'Sl No', 'Reg No', 'Code No', 'Name', 'School', 
                    'Mark 1', 'Mark 2', 'Mark 3', 'Total', 'Mark %',
                    'Rank', 'Grade', 'Point'
                ];
            } else {
                // For main list view
                headers = ['Sl No', 'Item Code & Item Name', 'Item Type'];
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
            
            if (selectedItem && detailResultsData[selectedItem]) {
                // For item details view
                detailResultsData[selectedItem].forEach(result => {
                    const row = document.createElement('tr');
                    
                    const cellData = [
                        result.slNo,
                        result.regNo,
                        result.codeNo,
                        result.name,
                        result.school,
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
            } else {
                // For main list view
                const dataToUse = filteredResults.length > 0 ? filteredResults : 
                            (Allitemresult.length > 0 ? Allitemresult : resultData);
                            
                dataToUse.forEach(result => {
                    const row = document.createElement('tr');
                    
                    const cellData = [
                        result.slNo,
                        result.regNo,
                        result.code
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
            
            // Add absentee info - only if this is an item detail view
            if (selectedItem && detailResultsData[selectedItem]) {
                const absenteeInfo = document.createElement('div');
                absenteeInfo.style.marginTop = '20px';
                absenteeInfo.style.fontSize = '14px';
                absenteeInfo.style.textAlign = 'left';
                
                const absenteeLines = [
                    'Absentee Reg No.: 117, 212, 300',
                    'No of Absentees: 2',
                    'No of Withheld Participants: 0',
                    'No of Appeal Entry: 0'
                ];
                
                absenteeLines.forEach(line => {
                    const p = document.createElement('p');
                    p.textContent = line;
                    p.style.margin = '5px 0';
                    absenteeInfo.appendChild(p);
                });
                
                pdfContent.appendChild(absenteeInfo);
            }
            
            // PDF filename
            const fileName = selectedItem ? 
                `${selectedFestival}_${selectedItem.replace(/ /g, '_')}_Result.pdf` : 
                `${selectedFestival}_Confidential_Result.pdf`;
            
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
        } catch (error) {
            console.error("Error generating PDF:", error);
            setError("Failed to generate PDF. Please try again later.");
        }
    };
    // Handle item click to show detail view
    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
        setTimeout(() => {
            generatePDF();
        }, 300);
    };
    
    // Initialize filtered data at component mount
    useEffect(() => {
        if (Allitemresult.length === 0 && resultData.length > 0) {
            setItemresult(resultData);
        }
    }, []);
    
    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredResults.length > 0 ? 
                        filteredResults.slice(indexOfFirstItem, indexOfLastItem) : 
                        (Allitemresult.length > 0 ? Allitemresult.slice(indexOfFirstItem, indexOfLastItem) : resultData.slice(indexOfFirstItem, indexOfLastItem));
    const totalPages = Math.ceil((filteredResults.length > 0 ? filteredResults.length : 
                                (Allitemresult.length > 0 ? Allitemresult.length : resultData.length)) / rowsPerPage);
    
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
    
  
    if (loading) {
        return (
            <>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                        <div className="text-center w-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 mb-2">Loading results data...</p>
                            
                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                                    style={{ width: `${loadingProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500">{loadingProgress}% complete</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Confidential Result
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                        <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="festival-select"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    {festivalOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.display}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="festival-select"
                                    className="absolute text-xs text-blue-800 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-blue-800 left-3"
                                >
                                    Festival
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            {/* <button
                                onClick={generatePDF}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                            >
                                Print
                            </button> */}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Search box */}
                    <div className="relative flex mt-2 mb-4 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
                        <input
                            type="text"
                            placeholder="Search Item Code..."
                            className="w-full bg-transparent outline-none text-sm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="text-gray-500 hover:text-gray-700">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                            <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                <table className="min-w-full text-center border-separate border-spacing-y-2">
                                    <thead className="bg-gray-50">
                                        <tr className="text-gray-700">
                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                        {filteredResults.length > 0 ? (
                                            currentItems.map((result) => (
                                                <tr key={result.slNo} className="hover:bg-gray-100">
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                    <td 
                                                        className="p-2 md:p-3 text-blue-500 whitespace-nowrap cursor-pointer hover:underline"
                                                        onClick={() => handleItemClick(result.regNo)}
                                                    >
                                                        {result.regNo}
                                                    </td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="p-4 text-center text-gray-600">
                                                    No items found matching your search criteria.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Pagination Controls - Only show when we have results */}
                    {filteredResults.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                            {/* Showing X of Y rows */}
                            <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                                {`${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredResults.length)} of ${filteredResults.length} rows`}
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
                    )}
                </div>
            </div>
        </>
    );
};






export default DConfidentialResult
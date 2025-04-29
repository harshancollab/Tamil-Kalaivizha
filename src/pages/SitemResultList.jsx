
import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAllitemtentryListAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js';

const SitemResultList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate(); // Add navigate hook
    const [Allitemresult, setItemresult] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const printRef = useRef();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");

    // Get festival from URL query params, default to "ALL Festival" if not present
    const [selectedFestival, setSelectedFestival] = useState(searchParams.get('festival') || "ALL Festival");
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Sample data for demonstration
    const resultData = [
        { slNo: 1, regNo: "301 - Story Writing", code: "301", itemName: "Story Writing", itemType: "Single", studentsCount: 5, resultEntered: 3, resultNotEntered: 2, confirmed: "Yes", status: "Completed" },
        { slNo: 2, regNo: "305 - Recitation", code: "305", itemName: "Recitation", itemType: "Single", studentsCount: 8, resultEntered: 8, resultNotEntered: 0, confirmed: "Yes", status: "Completed" },
        { slNo: 3, regNo: "410 - Group Song", code: "410", itemName: "Group Song", itemType: "Group", studentsCount: 12, resultEntered: 10, resultNotEntered: 2, confirmed: "No", status: "In Progress" },
        { slNo: 4, regNo: "415 - Folk Dance", code: "415", itemName: "Folk Dance", itemType: "Group", studentsCount: 15, resultEntered: 15, resultNotEntered: 0, confirmed: "Yes", status: "Completed" },
        { slNo: 5, regNo: "502 - Essay Writing", code: "502", itemName: "Essay Writing", itemType: "Single", studentsCount: 10, resultEntered: 8, resultNotEntered: 2, confirmed: "No", status: "In Progress" },
        { slNo: 6, regNo: "507 - Debate", code: "507", itemName: "Debate", itemType: "Single", studentsCount: 6, resultEntered: 6, resultNotEntered: 0, confirmed: "Yes", status: "Completed" },
        { slNo: 7, regNo: "608 - Quiz", code: "608", itemName: "Quiz", itemType: "Group", studentsCount: 9, resultEntered: 0, resultNotEntered: 9, confirmed: "No", status: "Not Started" },
        { slNo: 8, regNo: "612 - Elocution", code: "612", itemName: "Elocution", itemType: "Single", studentsCount: 7, resultEntered: 5, resultNotEntered: 2, confirmed: "No", status: "In Progress" },
        { slNo: 9, regNo: "315 - Poetry Writing", code: "315", itemName: "Poetry Writing", itemType: "Single", studentsCount: 6, resultEntered: 4, resultNotEntered: 2, confirmed: "No", status: "In Progress" },
        { slNo: 10, regNo: "320 - Mono Act", code: "320", itemName: "Mono Act", itemType: "Single", studentsCount: 7, resultEntered: 7, resultNotEntered: 0, confirmed: "Yes", status: "Completed" },
        { slNo: 11, regNo: "510 - Light Music", code: "510", itemName: "Light Music", itemType: "Single", studentsCount: 9, resultEntered: 5, resultNotEntered: 4, confirmed: "No", status: "In Progress" },
        { slNo: 12, regNo: "620 - Classical Dance", code: "620", itemName: "Classical Dance", itemType: "Single", studentsCount: 8, resultEntered: 8, resultNotEntered: 0, confirmed: "Yes", status: "Completed" }
    ];

    useEffect(() => {
        getAllItemResult();
    }, []);

    useEffect(() => {
        // Apply initial search from URL if present
        if (searchParams.get('search')) {
            setSearchTerm(searchParams.get('search'));
        }
    }, [searchParams]);

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
        // Apply festival filtering and search when the list, selected festival, or search term changes
        applyFilters(selectedFestival, searchTerm);
    }, [Allitemresult, selectedFestival, searchTerm]);

    // Add handler for item code click
    const handleItemCodeClick = (code) => {
        // Navigate to AllResultEntry page with code query parameter
        navigate(`/SResultentryList?code=${code}`);
    };

    const applyFilters = (festival, search) => {
        if (!Allitemresult.length) return;

        let filtered = [...Allitemresult];

        // First apply festival filter
        if (festival !== "ALL Festival") {
            switch (festival) {
                case "UP Kalaivizha":
                    filtered = filtered.filter(item => {
                        const itemCode = parseInt(item.code);
                        return itemCode >= 300 && itemCode < 400;
                    });
                    break;
                case "Lp Kalaivizha":
                    filtered = filtered.filter(item => {
                        const itemCode = parseInt(item.code);
                        return itemCode >= 400 && itemCode < 500;
                    });
                    break;
                case "Hs Kalaivizha":
                    filtered = filtered.filter(item => {
                        const itemCode = parseInt(item.code);
                        return itemCode >= 500 && itemCode < 600;
                    });
                    break;
                case "Hss Kalaivizha":
                    filtered = filtered.filter(item => {
                        const itemCode = parseInt(item.code);
                        return itemCode >= 600 && itemCode < 700;
                    });
                    break;
            }
        }

        // Then apply search filter if search term exists
        if (search && search.trim() !== '') {
            const searchLower = search.toLowerCase().trim();
            filtered = filtered.filter(item => 
                item.code.toLowerCase().includes(searchLower) || 
                item.itemName.toLowerCase().includes(searchLower) ||
                item.regNo.toLowerCase().includes(searchLower)
            );
        }

        // Update the serial numbers after filtering
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredResults(filtered);
        // Reset to first page when filters change
        setCurrentPage(1);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

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

    const getPrintTitle = () => {
        let title = selectedFestival === "ALL Festival" ? "ALL Festival" : selectedFestival;
        title += " - Item Result Report";
        if (searchTerm) {
            title += ` (Search: ${searchTerm})`;
        }
        return title;
    };

    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        setSelectedFestival(festival);
        
        // Update URL when festival changes
        const newParams = { festival };
        if (searchTerm) {
            newParams.search = searchTerm;
        }
        setSearchParams(newParams);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Update URL with search parameter
        const newParams = { festival: selectedFestival };
        if (value.trim() !== '') {
            newParams.search = value;
        }
        setSearchParams(newParams);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            applyFilters(selectedFestival, searchTerm);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchParams({ festival: selectedFestival });
        applyFilters(selectedFestival, '');
    };

    const generatePDF = () => {
        // Create a new div for PDF content
        const pdfContent = document.createElement('div');

        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = getPrintTitle();
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);

        // Add date
        const dateElement = document.createElement('p');
        dateElement.style.textAlign = 'center';
        dateElement.style.margin = '10px 0 20px';
        pdfContent.appendChild(dateElement);

        // Create table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Sl No', 'Item Code & Name', 'Item Type', 'No of Students', 'Result Entered', 'Result Not Entered', 'Confirmed'];
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

        if (filteredResults && filteredResults.length > 0) {
            filteredResults.forEach((result) => {
                const row = document.createElement('tr');

                // Add cells
                const cellData = [
                    result.slNo,
                    result.regNo,
                    result.itemType,
                    result.studentsCount,
                    result.resultEntered,
                    result.resultNotEntered,
                    result.confirmed
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
            const row = document.createElement('tr');
            const td = document.createElement('td');
            td.textContent = `No results found`;
            if (searchTerm) {
                td.textContent += ` for search "${searchTerm}"`;
            }
            if (selectedFestival !== "ALL Festival") {
                td.textContent += ` in ${selectedFestival}`;
            }
            td.colSpan = "7";
            td.style.textAlign = 'center';
            td.style.padding = '20px';
            row.appendChild(td);
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        pdfContent.appendChild(table);

        // PDF filename
        let fileName = `${selectedFestival.replace(/ /g, '_')}`;
        if (searchTerm) {
            fileName += `_Search_${searchTerm.replace(/ /g, '_')}`;
        }
        fileName += '_Item_Results.pdf';

        // PDF options - setting to landscape for better fit of the wide table
        const options = {
            margin: 10,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        // Generate and download PDF
        html2pdf().from(pdfContent).set(options).save();
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
                                onClick={generatePDF}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-6 md:px-8 py-2 rounded-full text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                aria-label="Print Item Result List"
                            >
                                Print
                            </button>
                        </div>
                    </div>
                    <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
                        <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                            <input
                                type="text"
                                placeholder="Search by Item Code..."
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearch}
                            />
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={handleSearch}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="ml-2 text-blue-500 hover:text-blue-700 text-sm flex items-center"
                            >
                                Clear
                            </button>
                        )}
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
                                            <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Status</th>
                                            <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 no-print">Reset</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems && currentItems.length > 0 ? (
                                            currentItems.map((result, index) => (
                                                <tr key={result.slNo} className="hover:bg-gray-50 b text-gray-700">
                                                    <td className="p-2 md:p-3 text-xs md:text-sm bg-white z-10">{indexOfFirstItem + index + 1}</td>
                                                    <td 
                                                        className="p-2 md:p-3 text-xs md:text-sm text-blue-600 whitespace-nowrap cursor-pointer hover:text-blue-800 hover:underline"
                                                        onClick={() => handleItemCodeClick(result.code)}
                                                    >
                                                        {result.regNo}
                                                    </td>
                                                    <td className="p-2 md:p-3 text-xs md:text-sm">{result.itemType}</td>
                                                    <td className="p-2 md:p-3 text-xs md:text-sm">{result.studentsCount}</td>
                                                    <td className="p-2 md:p-3 text-xs md:text-sm">{result.resultEntered}</td>
                                                    <td className="p-2 md:p-3 text-xs md:text-sm">{result.resultNotEntered}</td>
                                                    <td className="p-2 md:p-3 text-xs md:text-sm">{result.confirmed}</td>
                                                    <td className="p-2 text-blue-500 md:p-3">
                                                        {result.confirmed === 'Yes' ? 'Publish' : 'Unpublish'}
                                                    </td>
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
                                                <td colSpan="9" className="p-6 text-center text-gray-600">
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        <i className="fa-solid fa-clipboard-list text-2xl text-gray-400"></i>
                                                        <p>
                                                            {searchTerm ? 
                                                                `No results found for "${searchTerm}"` : 
                                                                `No results found for ${selectedFestival === "ALL Festival" ? "any festival" : selectedFestival}`
                                                            }
                                                        </p>
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
                            
                            {/* Pagination Section */}
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
                    )}
                </div>
            </div>
        </>
    )
}

export default SitemResultList
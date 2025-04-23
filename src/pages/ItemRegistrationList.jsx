import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllResultentryListAPI } from '../services/allAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const ItemRegistrationList = () => {
    const [showRegNo, setShowRegNo] = useState(false);
    const [Allresultentry, setResultentry] = useState([]);
    const navigate = useNavigate();
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [showConfirmButton, setShowConfirmButton] = useState(true);
    const [resultsConfirmed, setResultsConfirmed] = useState(false);

    // Festival state
    const [selectedFestival, setSelectedFestival] = useState(searchParams.get('festival') || '');

    // Festival options
    const festivalOptions = [
        'UP Tamilkalaivizha',
        'LP Tamilkalaivizha',
        'HS Tamilkalaivizha',
        'HSS Tamilkalaivizha',
        'All Festival'
    ];

    // Define code ranges for each festival (but don't display in UI)
    const festivalCodeRanges = {
        'UP Tamilkalaivizha': { min: 300, max: 399 },
        'LP Tamilkalaivizha': { min: 400, max: 499 },
        'HS Tamilkalaivizha': { min: 500, max: 599 },
        'HSS Tamilkalaivizha': { min: 700, max: 999 }
    };

    // District and SubDistrict states - keeping for backward compatibility
    const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || '');
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(searchParams.get('subDistrict') || '');
    const [availableSubDistricts, setAvailableSubDistricts] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    // Initialize search parameters from URL
    useEffect(() => {
        const searchParam = searchParams.get('search');
        const festivalParam = searchParams.get('festival');

        if (searchParam) setSearchTerm(searchParam);
        if (festivalParam) setSelectedFestival(festivalParam);

        // getAllresultentry();
    }, [searchParams]);

    // Add print styles
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @media print {
                body * {
                    visibility: hidden;
                }
                #print-container, #print-container * {
                    visibility: visible;
                }
                #print-container {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
                .no-print {
                    display: none !important;
                }
                table.print-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table.print-table th, table.print-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                table.print-table th {
                    background-color: #f2f2f2 !important;
                    color: black !important;
                    font-weight: bold;
                }
                .print-header {
                    text-align: center;
                    margin: 20px 0;
                    font-size: 24px;
                    font-weight: bold;
                }
                .print-summary {
                    margin: 15px 0;
                    padding: 10px;
                }
                .print-filters {
                    text-align: center;
                    margin: 10px 0;
                    font-style: italic;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const getAllresultentry = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllResultentryListAPI(reqHeader)
                if (result.status === 200) {
                    setResultentry(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    // Improved generatePDF function
    const generatePDF = () => {
        // Create a clone of the table for PDF generation
        const pdfContent = document.createElement('div');

        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = "Items Registration List";
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);

        // Add filter information if any
        if (searchTerm || selectedFestival !== '') {
            const filterInfo = document.createElement('div');
            filterInfo.style.margin = '10px 0';
            filterInfo.style.textAlign = 'center';
            filterInfo.style.fontStyle = 'italic';

            let filterText = 'Filtered by: ';
            if (searchTerm) filterText += `Search: ${searchTerm} `;
            if (selectedFestival && selectedFestival !== 'Select') {
                filterText += `Festival: ${selectedFestival} `;
            }

            filterInfo.textContent = filterText;
            pdfContent.appendChild(filterInfo);
        }

        // Create table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';

        // Create header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = [
            'Sl No', 'Item Code & Name', 'Item Type', 'No of Students', 'Result Entered', 'Result Not Entered'
        ];

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.style.border = '1px solid #ddd';
            th.style.padding = '8px';
            th.style.backgroundColor = '#f2f2f2';
            th.style.fontWeight = 'bold';
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body with filtered data
        const tbody = document.createElement('tbody');
        filteredData.forEach((item, index) => {
            const row = document.createElement('tr');

            // Create cells
            const cellData = [
                indexOfFirstItem + index + 1,
                `${item.code} - ${item.item}`,
                item.itemType || 'N/A',
                item.noOfStudents || 'N/A',
                item.resultEntered || 'N/A',
                item.resultNotEntered || 'N/A'
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

        table.appendChild(tbody);
        pdfContent.appendChild(table);

        // Add summary information
        const summaryDiv = document.createElement('div');
        summaryDiv.style.marginTop = '15px';
        summaryDiv.style.padding = '10px';

        summaryDiv.innerHTML = `
            <p><strong>Total Items:</strong> ${filteredData.length}</p>
            <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString()}</p>
        `;

        pdfContent.appendChild(summaryDiv);

        // PDF options
        const options = {
            margin: 10,
            filename: 'Items_Registration_List.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        // Generate and download PDF
        html2pdf().from(pdfContent).set(options).save();
    };

    // Enhanced dummy data with item types and name
    const resultData = [
        { slNo: 1, regNo: "1233", code: "301", item: "Story writing", itemType: "Group", noOfStudents: 45, resultEntered: 40, resultNotEntered: 5, festival: "UP Tamilkalaivizha" },
        { slNo: 2, regNo: "4563", code: "203", item: "Story telling", itemType: "Single", noOfStudents: 30, resultEntered: 28, resultNotEntered: 2, festival: "LP Tamilkalaivizha" },
        { slNo: 3, regNo: "8933", code: "345", item: "Elocution", itemType: "Single", noOfStudents: 25, resultEntered: 22, resultNotEntered: 3, festival: "HS Tamilkalaivizha" },
        { slNo: 4, regNo: "3433", code: "567", item: "Essay writing", itemType: "Single", noOfStudents: 50, resultEntered: 45, resultNotEntered: 5, festival: "HSS Tamilkalaivizha" },
        { slNo: 5, regNo: "6733", code: "234", item: "Group dance", itemType: "Single", noOfStudents: 40, resultEntered: 40, resultNotEntered: 0, festival: "UP Tamilkalaivizha" },
        { slNo: 6, regNo: "8903", code: "423", item: "Solo dance", itemType: "Single", noOfStudents: 35, resultEntered: 30, resultNotEntered: 5, festival: "LP Tamilkalaivizha" },
        { slNo: 7, regNo: "453", code: "526", item: "Group song", itemType: "Group", noOfStudents: 60, resultEntered: 60, resultNotEntered: 0, festival: "HS Tamilkalaivizha" },
        { slNo: 8, regNo: "6783", code: "776", item: "Solo song", itemType: "Group", noOfStudents: 55, resultEntered: 50, resultNotEntered: 5, festival: "HSS Tamilkalaivizha" },
        { slNo: 9, regNo: "6783", code: "312", item: "Painting", itemType: "Group", noOfStudents: 45, resultEntered: 40, resultNotEntered: 5, festival: "UP Tamilkalaivizha" },
        { slNo: 10, regNo: "6783", code: "414", item: "Drama", itemType: "Group", noOfStudents: 30, resultEntered: 30, resultNotEntered: 0, festival: "LP Tamilkalaivizha" },
        { slNo: 11, regNo: "6783", code: "515", item: "Mono act", itemType: "Single", noOfStudents: 25, resultEntered: 20, resultNotEntered: 5, festival: "HS Tamilkalaivizha" },
        { slNo: 12, regNo: "7123", code: "732", item: "Recitation", itemType: "Single", noOfStudents: 40, resultEntered: 35, resultNotEntered: 5, festival: "HSS Tamilkalaivizha" },
        { slNo: 13, regNo: "5463", code: "362", item: "Quiz", itemType: "Group", noOfStudents: 60, resultEntered: 60, resultNotEntered: 0, festival: "UP Tamilkalaivizha" },
        { slNo: 14, regNo: "3213", code: "454", item: "Debate", itemType: "Single", noOfStudents: 30, resultEntered: 28, resultNotEntered: 2, festival: "LP Tamilkalaivizha" },
        { slNo: 15, regNo: "9873", code: "589", item: "Instrumental music", itemType: "Single", noOfStudents: 25, resultEntered: 20, resultNotEntered: 5, festival: "HS Tamilkalaivizha" },
    ];

    // Function to check if a code falls within a festival's range
    const codeInFestivalRange = (code, festival) => {
        if (!festival || festival === 'All Festival' || festival === 'Select') return true;
        
        const codeNum = parseInt(code);
        const range = festivalCodeRanges[festival];
        
        if (!range) return true; // No range defined for this festival
        
        return codeNum >= range.min && codeNum <= range.max;
    };

    // Filter results based on search term (both code and item name)
    const filteredResultData = () => {
        if (!searchTerm) {
            return resultData;
        }
        const searchTermLower = searchTerm.toLowerCase();
        return resultData.filter(result =>
            result.code.toLowerCase().includes(searchTermLower) ||
            result.item.toLowerCase().includes(searchTermLower)
        );
    };

    // Filter by festival (now using code ranges instead of festival property)
    const filteredByFestival = () => {
        let filtered = filteredResultData();

        if (selectedFestival && selectedFestival !== 'Select') {
            filtered = filtered.filter(result => codeInFestivalRange(result.code, selectedFestival));
        }

        return filtered;
    };

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedFestival]);

    // Pagination logic
    const filteredData = filteredByFestival();
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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

    const handleAddClick = () => {
        navigate('/AddItem');
    };

    // Function to update URL params
    const updateURLParams = (params) => {
        const newParams = new URLSearchParams(searchParams);

        // Update or remove each parameter
        Object.entries(params).forEach(([key, value]) => {
            if (value && value !== 'Select') {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });

        setSearchParams(newParams);
    };

    // Handle search input changes
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Update URL parameter
        updateURLParams({ search: value });
    };

    // Handle festival change
    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        setSelectedFestival(festival);

        // Update URL parameter
        updateURLParams({ festival: festival });
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Items List
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto">

                            </div>
                           
                            {/* Festival Dropdown with Floating Label - Without showing code ranges */}
                            <div className="relative w-full sm:w-48">
                                <select
                                    id="floating_festival"
                                    className="block px-2 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-full border border-blue-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    <option value="">Select</option>
                                    {festivalOptions.map((festival, index) => (
                                        <option key={index} value={festival}>
                                            {festival}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="floating_festival"
                                    className={`absolute left-5 text-sm text-blue-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 ${selectedFestival ? 'scale-75 -translate-y-4 top-2' : ''}`}
                                >
                                   Select Festival
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>

                            <button onClick={handleAddClick} className="text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] border border-blue-500 py-2 px-6 rounded-full flex items-center w-full sm:w-auto">
                                Add Items
                            </button>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={generatePDF}
                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
                                >
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
                        <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                            <input
                                type="text"
                                placeholder="Search by Item Code or Name..."
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        {/* Add id="print-container" for CSS print handling */}
                        <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of Students</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Result Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Result Not Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Confirmed</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Reset</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems.length > 0 ? (
                                                currentItems.map((result, index) => (
                                                    <tr key={result.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td className="p-2 md:p-3 text-blue-600 cursor-pointer whitespace-nowrap">{result.code}-{result.item}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.itemType}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.noOfStudents}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.resultEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.resultNotEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                                            <span className="px-2 py-1 text-xs ">
                                                                {result.resultEntered === result.noOfStudents ? "Yes" : "No"}
                                                            </span>
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                                            <button className="text-blue-600 focus:outline-none">
                                                                <i className="fa-solid fa-rotate-right"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="p-4 text-center text-gray-500">
                                                        No results found {searchTerm ? `for "${searchTerm}"` : ''}
                                                        {selectedFestival && selectedFestival !== 'Select' && selectedFestival !== 'All Festival' ? 
                                                        ` in ${selectedFestival}` : ''}
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
                        {/* Showing X of Y rows */}
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
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
                                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
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
        </>
    )
}

export default ItemRegistrationList
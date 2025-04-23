import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const SubDistrictList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);
  
    const [subDistricts, setSubDistricts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const printRef = useRef();
    
    // Get district name from location state and store it in ref to preserve it
    const districtName = location.state?.districtName || 'District';
    const districtId = location.state?.districtData?.id;
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Initialize search parameters from URL
    useEffect(() => {
        const searchParam = searchParams.get('search');
        if (searchParam !== null) {
            setSearchTerm(searchParam);
        }
    }, [searchParams]);

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Load dummy data on component mount
    useEffect(() => {
        // This would be replaced with your API call to get sub-districts based on district ID
        setSubDistricts(generateSubDistrictsForDistrict(districtId));
    }, [districtId]);

    // Generate sub-districts based on district ID
    const generateSubDistrictsForDistrict = (districtId) => {
        // If no district ID, return empty array
        if (!districtId) return [];
        
        // Create different sub-districts based on the district
        const subDistrictMap = {
            1: [ // Thiruvananthapuram
                { id: 101, name: "Neyyattinkara", totalSchools: 28, dataEntered: 25, dataNotEntered: 3, confirmed: 22, notConfirmed: 6 },
                { id: 102, name: "Kattakada", totalSchools: 24, dataEntered: 20, dataNotEntered: 4, confirmed: 18, notConfirmed: 6 },
                { id: 103, name: "Nedumangad", totalSchools: 30, dataEntered: 26, dataNotEntered: 4, confirmed: 22, notConfirmed: 8 },
                { id: 104, name: "Chirayinkeezhu", totalSchools: 22, dataEntered: 18, dataNotEntered: 4, confirmed: 15, notConfirmed: 7 },
                { id: 105, name: "Varkala", totalSchools: 16, dataEntered: 9, dataNotEntered: 7, confirmed: 8, notConfirmed: 8 }
            ],
            2: [ // Kollam
                { id: 201, name: "Karunagappally", totalSchools: 19, dataEntered: 17, dataNotEntered: 2, confirmed: 15, notConfirmed: 4 },
                { id: 202, name: "Kottarakkara", totalSchools: 22, dataEntered: 20, dataNotEntered: 2, confirmed: 18, notConfirmed: 4 },
                { id: 203, name: "Punalur", totalSchools: 18, dataEntered: 16, dataNotEntered: 2, confirmed: 14, notConfirmed: 4 },
                { id: 204, name: "Chavara", totalSchools: 20, dataEntered: 19, dataNotEntered: 1, confirmed: 16, notConfirmed: 4 },
                { id: 205, name: "Kollam", totalSchools: 16, dataEntered: 15, dataNotEntered: 1, confirmed: 13, notConfirmed: 3 }
            ],
            3: [ // Pathanamthitta
                { id: 301, name: "Ranni", totalSchools: 15, dataEntered: 13, dataNotEntered: 2, confirmed: 12, notConfirmed: 3 },
                { id: 302, name: "Kozhencherry", totalSchools: 16, dataEntered: 15, dataNotEntered: 1, confirmed: 14, notConfirmed: 2 },
                { id: 303, name: "Mallappally", totalSchools: 14, dataEntered: 13, dataNotEntered: 1, confirmed: 12, notConfirmed: 2 },
                { id: 304, name: "Adoor", totalSchools: 17, dataEntered: 15, dataNotEntered: 2, confirmed: 14, notConfirmed: 3 },
                { id: 305, name: "Thiruvalla", totalSchools: 13, dataEntered: 12, dataNotEntered: 1, confirmed: 13, notConfirmed: 0 }
            ],
            // Default for other districts if specific data not provided
            default: [
                { id: 901, name: "Sub-District 1", totalSchools: 25, dataEntered: 20, dataNotEntered: 5, confirmed: 18, notConfirmed: 7 },
                { id: 902, name: "Sub-District 2", totalSchools: 22, dataEntered: 18, dataNotEntered: 4, confirmed: 16, notConfirmed: 6 },
                { id: 903, name: "Sub-District 3", totalSchools: 18, dataEntered: 15, dataNotEntered: 3, confirmed: 14, notConfirmed: 4 },
                { id: 904, name: "Sub-District 4", totalSchools: 20, dataEntered: 16, dataNotEntered: 4, confirmed: 15, notConfirmed: 5 },
                { id: 905, name: "Sub-District 5", totalSchools: 15, dataEntered: 12, dataNotEntered: 3, confirmed: 11, notConfirmed: 4 }
            ]
        };
        
        // Return sub-districts for the given district ID or default if not found
        return subDistrictMap[districtId] || subDistrictMap['default'];
    };
    
    // Improved filter function with case-insensitive search and proper string handling
    const filteredData = subDistricts.filter(subDistrict => {
        if (!searchTerm) return true; // Show all if no search term
        
        const term = searchTerm.toLowerCase().trim();
        
        return (
            (subDistrict.name && subDistrict.name.toLowerCase().includes(term)) ||
            (subDistrict.id && subDistrict.id.toString().includes(term)) ||
            (subDistrict.totalSchools && subDistrict.totalSchools.toString().includes(term))
        );
    });

    // Pagination logic - use filtered data
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Replace handlePrint with generatePDF function
    const generatePDF = () => {
        // Create a clone of the table for PDF generation
        const pdfContent = document.createElement('div');
        
        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = `${districtName} - Sub District List Report`;
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);
        
        // Create table clone
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Sl No', 'Sub District Name', 'Total Schools', 'Data Entered', 'Data Not Entered', 'Confirmed', 'Not Confirmed'];
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
        
        if (filteredData.length > 0) {
            filteredData.forEach((subDistrict, index) => {
                const row = document.createElement('tr');
                
                // Add cells
                const cellData = [
                    index + 1,
                    subDistrict.name || "-",
                    subDistrict.totalSchools || "-",
                    subDistrict.dataEntered || "-",
                    subDistrict.dataNotEntered || "-",
                    subDistrict.confirmed || "-",
                    subDistrict.notConfirmed || "-"
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
            // No data row for PDF
            const noDataRow = document.createElement('tr');
            const noDataCell = document.createElement('td');
            noDataCell.colSpan = 7;
            noDataCell.textContent = `No sub-districts found ${searchTerm ? `for "${searchTerm}"` : ''}`;
            noDataCell.style.border = '1px solid #ddd';
            noDataCell.style.padding = '12px';
            noDataCell.style.textAlign = 'center';
            noDataRow.appendChild(noDataCell);
            tbody.appendChild(noDataRow);
        }
        
        table.appendChild(tbody);
        pdfContent.appendChild(table);
        
        // Add search filter information if applied
        if (searchTerm) {
            const filterInfo = document.createElement('p');
            filterInfo.textContent = `Filtered by: "${searchTerm}" - ${filteredData.length} results`;
            filterInfo.style.marginTop = '20px';
            filterInfo.style.fontStyle = 'italic';
            pdfContent.appendChild(filterInfo);
        }
        
        // PDF filename
        const fileName = `${districtName}_Sub_District_List_Report${searchTerm ? '_Filtered' : ''}.pdf`;
        
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
    };

    const handleSubDistrictClick = (subDistrict) => {
        navigate(`/school-list/${subDistrict.id}`, {
            state: { 
                districtName: districtName,
                subDistrictName: subDistrict.name, 
                subDistrictData: subDistrict 
            }
        });
    };

    const handleAddClick = () => {
        navigate('/AddSubDistrict', {
            state: { districtName: districtName, districtId: districtId }
        });
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Function to update URL params - properly handles search parameter
    const updateURLParams = (params) => {
        const newParams = new URLSearchParams(searchParams);
        
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });
        
        setSearchParams(newParams);
    };

    // Improved search functionality with debounce
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Update URL immediately as user types
        updateURLParams({ search: value });
    };

    // Clear search function
    const clearSearch = () => {
        setSearchTerm('');
        
        // Remove search parameter from URL
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('search');
        setSearchParams(newParams);
        
        // Focus on search input after clearing
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    // Handle search on Enter key press or Escape to clear
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            clearSearch();
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

    // Function to safely highlight search terms
    const highlightSearchTerm = (text, term) => {
        if (!term || !text) return text;
        
        try {
            const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark class="bg-yellow-200 rounded px-1">$1</mark>');
        } catch (e) {
            return text;
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <div className="flex items-center">
                            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                                <span className="">{districtName}</span> - Sub District List
                            </h2>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={handleAddClick}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400 border border-blue-500 font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
                                >
                                 Add Sub District
                                </button>
                            </div>
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
                    
                    {/* Improved Search Bar */}
                    <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
                        <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4 bg-white">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search sub-district"
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                            />
                            {searchTerm && (
                                <button 
                                    onClick={clearSearch}
                                    className="text-gray-500 hover:text-gray-700 mr-2"
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            )}
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    
                    {/* Search result summary - shows when search is active */}
                    {searchTerm && (
                        <div className="text-sm text-gray-600 mb-4">
                            Found {filteredData.length} sub-district{filteredData.length !== 1 ? 's' : ''} matching "{searchTerm}"
                            <button 
                                onClick={clearSearch}
                                className="ml-2 text-blue-500 hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                    
                    <div className="w-full">
                        <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Total Schools</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Data Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Data Not Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Confirmed</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Not Confirm</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems.length > 0 ? (
                                                currentItems.map((subDistrict, index) => (
                                                    <tr key={subDistrict.id} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td 
                                                            className="p-2 md:p-3 text-blue-500 whitespace-nowrap cursor-pointer hover:underline"
                                                            onClick={() => handleSubDistrictClick(subDistrict)}
                                                        >
                                                            {searchTerm ? (
                                                                // Highlight search term in name (safely)
                                                                <span dangerouslySetInnerHTML={{
                                                                    __html: highlightSearchTerm(subDistrict.name, searchTerm)
                                                                }} />
                                                            ) : (
                                                                subDistrict.name
                                                            )}
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{subDistrict.totalSchools}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{subDistrict.dataEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{subDistrict.dataNotEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{subDistrict.confirmed}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{subDistrict.notConfirmed}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="p-4 text-center text-gray-500">
                                                        No sub-districts found {searchTerm ? `for "${searchTerm}"` : ''}
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

                        {/* Pagination Controls - only show if data exists */}
                        {filteredData.length > 0 && (
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
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubDistrictList


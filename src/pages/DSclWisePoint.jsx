import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import { getAllsclwisepoitAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const DSclWisePoint = () => {
    const [allResultData, setAllResultData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const selectedSubDistrict = searchParams.get('subDistrict') || "Select Sub District";
    const searchQuery = searchParams.get('search') || '';

    // Available sub-districts (same as in DClusterSclList)
    const subDistricts = [
        'Select Sub District',
        'Munnar',
        'Adimali',
        'Kattappana',
        'Nedumkandam',
        'Devikulam',
        'Chittur',
        'Pattambi'
    ];

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Dummy data with festival-related information (using itemCode to determine festival)
    // Adding subDistrict to the dummy data
    const dummyResultData = [
        { slNo: 1, regNo: "3016", code: "GHSS Kozhikode", mark1: 5, mark2: 8, mark3: 2, total: "67", markPercentage: 85, rank: 2, grade: "A", point: 9.5, itemCode: "301", subDistrict: "Kattappana" },
        { slNo: 2, regNo: "3015", code: "MES HSS", mark1: 9, mark2: 8, mark3: 5, total: "66", markPercentage: 91, rank: 1, grade: "A+", point: 10.0, itemCode: "302", subDistrict: "Munnar" },
        { slNo: 3, regNo: "3016", code: "G. H. S. S Anakara", mark1: 7, mark2: 2, mark3: 8, total: "45", markPercentage: 82, rank: 3, grade: "A-", point: 9.0, itemCode: "303", subDistrict: "Chittur" },
        { slNo: 4, regNo: "3445", code: "G. H. S. S Kumily", mark1: 8, mark2: 2, mark3: 7, total: "43", markPercentage: 72, rank: 7, grade: "B+", point: 8.0, itemCode: "401", subDistrict: "Kattappana" },
        { slNo: 5, regNo: "675", code: "G. H. S. S. Vaguvurrai", mark1: 2, mark2: 0, mark3: 8, total: "45", markPercentage: 87, rank: 4, grade: "A", point: 9.5, itemCode: "402", subDistrict: "Munnar" },
        { slNo: 6, regNo: "8905", code: "St. Mary's School", mark1: 8, mark2: 7, mark3: 8, total: "33", markPercentage: 78, rank: 5, grade: "B+", point: 8.5, itemCode: "501", subDistrict: "Devikulam" },
        { slNo: 7, regNo: "4589", code: "DAV Public School", mark1: 5, mark2: 0, mark3: 8, total: "55", markPercentage: 68, rank: 8, grade: "B", point: 7.5, itemCode: "502", subDistrict: "Nedumkandam" },
        { slNo: 8, regNo: "6787", code: "Kendriya Vidyalaya", mark1: 0, mark2: 6, mark3: 0, total: "26", markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemCode: "601", subDistrict: "Pattambi" },
        { slNo: 9, regNo: "6787", code: "Kendriya Vidyalaya", mark1: 0, mark2: 6, mark3: 0, total: "26", markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemCode: "601", subDistrict: "Adimali" },
        { slNo: 10, regNo: "6787", code: "Kendriya Vidyalaya", mark1: 0, mark2: 6, mark3: 0, total: "26", markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemCode: "601", subDistrict: "Pattambi" },
        { slNo: 11, regNo: "6787", code: "Kendriya Vidyalaya", mark1: 0, mark2: 6, mark3: 0, total: "26", markPercentage: 75, rank: 6, grade: "B+", point: 8.0, itemCode: "601", subDistrict: "Chittur" }
    ];

    useEffect(() => {
        getAllResultData();
        
        // Initialize search text from URL on component mount
        if (searchQuery) {
            setSearchText(searchQuery);
        }
    }, []);

    // Filter data whenever selectedFestival, selectedSubDistrict or allResultData changes
    useEffect(() => {
        if (allResultData.length > 0) {
            filterData();
        }
    }, [selectedFestival, selectedSubDistrict, allResultData]);

    // React to searchText changes directly without updating URL
    useEffect(() => {
        if (allResultData.length > 0) {
            filterData();
        }
    }, [searchText]);

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

    const filterData = () => {
        // Safety check for data
        if (!allResultData || allResultData.length === 0) {
            setFilteredData([]);
            return;
        }

        // First filter by festival
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

        // Then filter by subDistrict
        if (selectedSubDistrict !== 'Select Sub District') {
            filtered = filtered.filter(item => item.subDistrict === selectedSubDistrict);
        }

        // Finally filter by search text (not searchQuery from URL)
        if (searchText && searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase().trim();
            filtered = filtered.filter(item => 
                (item.regNo && item.regNo.toLowerCase().includes(searchLower)) || 
                (item.code && item.code.toLowerCase().includes(searchLower))
            );
        }

        // Add sequential numbering to filtered results
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));
        
        setFilteredData(filtered);
        // Reset to first page when filters change
        setCurrentPage(1);
    }

    const getPrintTitle = () => {
        let festivalPart;
        switch (selectedFestival) {
            case "UP Kalaivizha":
                festivalPart = "UP Tamil Kalaivizha";
                break;
            case "LP Kalaivizha":
                festivalPart = "LP Tamil Kalaivizha";
                break;
            case "HS Kalaivizha":
                festivalPart = "HS Tamil Kalaivizha";
                break;
            case "HSS Kalaivizha":
                festivalPart = "HSS Tamil Kalaivizha";
                break;
            case "All Festival":
                festivalPart = "All Festival Tamil Kalaivizha";
                break;
            default:
                festivalPart = selectedFestival;
        }
        
        const subDistrictPart = selectedSubDistrict === "Select Sub District" ? "All Sub Districts" : selectedSubDistrict;
        return `${festivalPart} - ${subDistrictPart} - School Wise Point Report`;
    };

    const handleFestivalChange = (e) => {
        const newFestival = e.target.value;
        
        // Update URL parameters while preserving subDistrict
        const newParams = new URLSearchParams();
        newParams.set('festival', newFestival);
        if (selectedSubDistrict !== 'Select Sub District') {
            newParams.set('subDistrict', selectedSubDistrict);
        }
        setSearchParams(newParams);
        
        // Reset search text when changing festival
        setSearchText('');
    };

    const handleSubDistrictChange = (e) => {
        const newSubDistrict = e.target.value;
        
        // Update URL parameters while preserving festival
        const newParams = new URLSearchParams();
        newParams.set('festival', selectedFestival);
        if (newSubDistrict !== 'Select Sub District') {
            newParams.set('subDistrict', newSubDistrict);
        }
        setSearchParams(newParams);
    };

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
        // The useEffect will handle filtering as the user types
    };

    const clearSearch = () => {
        setSearchText('');
        // The useEffect will handle filtering
    };

    // New print function using html2pdf (similar to ParticipatingSclList)
    const generatePDF = () => {
        // Create a clone of the table for PDF generation
        const pdfContent = document.createElement('div');
        
        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = getPrintTitle();
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
        
        const headers = ['Sl No', 'School Code', 'School Name', "Sub District",'Grade A', 'Grade B', 'Grade C', 'Points'];
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
        
        // Use filtered data for PDF
        const displayData = filteredData.length > 0 ? filteredData : [];
        
        displayData.forEach((item, index) => {
            const row = document.createElement('tr');
            
            // Add cells
            const cellData = [
                item.slNo || index + 1,
                item.regNo || "-",
                item.code || "-",
                item.subDistrict || "-",
                item.mark1 || "-",
                item.mark2 || "-",
                item.mark3 || "-",
                item.total || "-"
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
        
        // PDF filename with festival and subDistrict
        const festivalPart = selectedFestival.replace(/ /g, '_');
        const subDistrictPart = selectedSubDistrict === "Select Sub District" ? "All_SubDistricts" : selectedSubDistrict.replace(/ /g, '_');
        const fileName = `${festivalPart}_${subDistrictPart}_School_Wise_Points.pdf`;
        
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

    // Initialize filtered data at component mount
    useEffect(() => {
        if (allResultData.length === 0 && dummyResultData.length > 0) {
            setAllResultData(dummyResultData);
        }
    }, []);

    // Pagination logic
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
                            {/* Festival Select */}
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
                                onClick={generatePDF}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                            >
                                Print
                            </button>
                        </div>
                    </div>
                    <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
                        <input
                            type="text"
                            placeholder="Search School Code..."
                            className="w-full bg-transparent outline-none text-sm"
                            value={searchText}
                            onChange={handleSearchInputChange}
                        />
                        <div className="text-gray-500">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <div ref={printRef}>
                            <table className="min-w-full text-center border-separate border-spacing-y-2">
                                <thead className="bg-gray-50">
                                    <tr className="text-gray-700">
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>

                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade A</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade B</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade C</th>
                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                    {currentItems && currentItems.length > 0 ? (
                                        currentItems.map((result, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.subDistrict}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark1}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark2}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.mark3}</td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.total}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="p-3 text-center text-gray-500">
                                                {searchText 
                                                    ? `No schools found matching "${searchText}" in ${selectedFestival}${selectedSubDistrict !== 'Select Sub District' ? ` for ${selectedSubDistrict}` : ''}` 
                                                    : `No records found for ${selectedFestival}${selectedSubDistrict !== 'Select Sub District' ? ` in ${selectedSubDistrict}` : ''}`}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination section */}
                        {currentItems && currentItems.length > 0 && (
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
            </div>
        </>
    )
}

export default DSclWisePoint
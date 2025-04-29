import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllCertificateitemwiseAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const SCertificateItemwise = () => {
    const [Allitemresult, setItemresult] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const searchQuery = searchParams.get('search') || '';
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getAllItemResult();
        
        // Initialize search text from URL on component mount
        if (searchQuery) {
            setSearchText(searchQuery);
        }
    }, []);

    useEffect(() => {
        if (Allitemresult.length > 0) {
            filterItems();
        }
    }, [selectedFestival, Allitemresult, searchText]);

    const getAllItemResult = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllCertificateitemwiseAPI(reqHeader)
                if (result.status === 200) {
                    setItemresult(result.data)
                }
            } catch (err) {
                console.log(err);
                setItemresult(certificateItemData);
            }
        } else {
            setItemresult(certificateItemData);
        }
    }

    const filterItems = () => {
        if (!Allitemresult.length) return;
        
        // First filter by festival
        let filtered;
        switch (selectedFestival) {
            case "UP Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 300 && itemCode < 400;
                });
                break;
            case "LP Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 400 && itemCode < 500;
                });
                break;
            case "HS Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 500 && itemCode < 600;
                });
                break;
            case "HSS Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 600 && itemCode < 700;
                });
                break;
            case "All Festival":
                filtered = [...Allitemresult];
                break;
            default:
                filtered = [...Allitemresult];
        }
        
        // Then filter by search text
        if (searchText && searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase().trim();
            filtered = filtered.filter(item => 
                (item.itemCode && item.itemCode.toLowerCase().includes(searchLower)) || 
                (item.itemName && item.itemName.toLowerCase().includes(searchLower))
            );
        }
        
        // Add sequential numbering to filtered results
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));
        
        setFilteredItems(filtered);
        // Reset to first page when filters change
        setCurrentPage(1);
    }

    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        setSearchParams({ festival });
        
        // Reset search text when changing festival
        setSearchText('');
    };

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
        // The useEffect will handle filtering as the user types
    };

    const clearSearch = () => {
        setSearchText('');
        // The useEffect will handle filtering
    };

    const handleItemClick = (itemCode, itemName) => {
        navigate(`/ScertificateParticipate?itemCode=${itemCode}&itemName=${itemName}&festival=${selectedFestival}`);
    };

    const handlePrint = () => {
        // Create a clone of the table for PDF generation
        const pdfContent = document.createElement('div');
        
        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = `${selectedFestival} - Certificate Item Wise Report`;
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);
        
        // Add date
        const dateElement = document.createElement('p');
        dateElement.style.textAlign = 'center';
        dateElement.style.margin = '10px 0 20px';
        pdfContent.appendChild(dateElement);

        // Create table clone
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = [
            'Sl No', 
            'Printed', 
            'Item Code & Item Name', 
            'Item Type', 
            'No of Students', 
            'Participation', 
            'Non-Participant', 
            'Grade A', 
            'Grade B', 
            'Grade C'
        ];
        
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
        
        currentItems.forEach((item) => {
            const row = document.createElement('tr');
            
            // Add cells
            const cellData = [
                item.slNo,
                item.printed,
                `${item.itemCode} - ${item.itemName}`,
                item.itemType,
                item.totalStudents,
                item.participation,
                item.nonParticipant,
                item.gradeA,
                item.gradeB,
                item.gradeC
            ];
            
            cellData.forEach((text) => {
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
        
        // PDF filename
        const fileName = `${selectedFestival.replace(/ /g, '_')}_Certificate_Item_Wise.pdf`;
        
        // PDF options with landscape orientation for wider table
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

    const certificateItemData = [
        { 
            slNo: 1, 
            printed: "Yes", 
            itemCode: "301", 
            itemName: "Story Writing", 
            itemType: "Single", 
            totalStudents: 24, 
            participation: 22, 
            nonParticipant: 2, 
            gradeA: 10, 
            gradeB: 8, 
            gradeC: 4 
        },
        { 
            slNo: 2, 
            printed: "Yes", 
            itemCode: "302", 
            itemName: "Essay Writing", 
            itemType: "Single", 
            totalStudents: 18, 
            participation: 16, 
            nonParticipant: 2, 
            gradeA: 7, 
            gradeB: 5, 
            gradeC: 4 
        },
        { 
            slNo: 3, 
            printed: "No", 
            itemCode: "303", 
            itemName: "Poetry Writing", 
            itemType: "Single", 
            totalStudents: 15, 
            participation: 15, 
            nonParticipant: 0, 
            gradeA: 8, 
            gradeB: 5, 
            gradeC: 2 
        },
        { 
            slNo: 4, 
            printed: "Yes", 
            itemCode: "401", 
            itemName: "Group Dance", 
            itemType: "Group", 
            totalStudents: 32, 
            participation: 30, 
            nonParticipant: 2, 
            gradeA: 15, 
            gradeB: 12, 
            gradeC: 3 
        },
        { 
            slNo: 5, 
            printed: "No", 
            itemCode: "402", 
            itemName: "Group Song", 
            itemType: "Group", 
            totalStudents: 28, 
            participation: 25, 
            nonParticipant: 3, 
            gradeA: 18, 
            gradeB: 5, 
            gradeC: 2 
        },
        { 
            slNo: 6, 
            printed: "Yes", 
            itemCode: "501", 
            itemName: "Drawing", 
            itemType: "Single", 
            totalStudents: 20, 
            participation: 18, 
            nonParticipant: 2, 
            gradeA: 9, 
            gradeB: 7, 
            gradeC: 2 
        },
        { 
            slNo: 7, 
            printed: "No", 
            itemCode: "601", 
            itemName: "Debate", 
            itemType: "Single", 
            totalStudents: 12, 
            participation: 10, 
            nonParticipant: 2, 
            gradeA: 6, 
            gradeB: 3, 
            gradeC: 1 
        },
        { 
            slNo: 8, 
            printed: "Yes", 
            itemCode: "602", 
            itemName: "Elocution", 
            itemType: "Single", 
            totalStudents: 15, 
            participation: 14, 
            nonParticipant: 1, 
            gradeA: 7, 
            gradeB: 5, 
            gradeC: 2 
        },
        { 
            slNo: 9, 
            printed: "No", 
            itemCode: "304", 
            itemName: "Quiz Competition", 
            itemType: "Group", 
            totalStudents: 30, 
            participation: 30, 
            nonParticipant: 0, 
            gradeA: 12, 
            gradeB: 10, 
            gradeC: 8 
        },
        { 
            slNo: 10, 
            printed: "Yes", 
            itemCode: "403", 
            itemName: "Speech", 
            itemType: "Single", 
            totalStudents: 20, 
            participation: 18, 
            nonParticipant: 2, 
            gradeA: 10, 
            gradeB: 6, 
            gradeC: 2 
        },
        { 
            slNo: 11, 
            printed: "No", 
            itemCode: "502", 
            itemName: "Western Dance", 
            itemType: "Group", 
            totalStudents: 25, 
            participation: 22, 
            nonParticipant: 3, 
            gradeA: 15, 
            gradeB: 5, 
            gradeC: 2 
        }
    ];

    // Initialize filtered data at component mount
    useEffect(() => {
        if (Allitemresult.length === 0 && certificateItemData.length > 0) {
            setItemresult(certificateItemData);
        }
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

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
                            Certificate Item Wise
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    <option value="UP Kalaivizha">UP Kalaivizha</option>
                                    <option value="LP Kalaivizha">LP Kalaivizha</option>
                                    <option value="HS Kalaivizha">HS Kalaivizha</option>
                                    <option value="HSS Kalaivizha">HSS Kalaivizha</option>
                                    <option value="All Festival">All Festival</option>
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

                    {/* Search Box */}
                    <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
                        <input
                            type="text"
                            placeholder="Search Item Code..."
                            className="w-full bg-transparent outline-none text-sm"
                            value={searchText}
                            onChange={handleSearchInputChange}
                        />
                        <div className="text-gray-500">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div id="certificate-table-container" className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Printed</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of Students</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Participation</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Non-Participant</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade A</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade B</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade C</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems && currentItems.length > 0 ? (
                                                currentItems.map((item) => (
                                                    <tr key={item.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.slNo}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.printed}</td>
                                                        <td 
                                                            className="p-2 md:p-3 text-blue-500 whitespace-nowrap cursor-pointer hover:underline hover:font-medium"
                                                            onClick={() => handleItemClick(item.itemCode, item.itemName)}
                                                        >
                                                            {item.itemCode} - {item.itemName}
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.itemType}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.totalStudents}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.participation}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.nonParticipant}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.gradeA}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.gradeB}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.gradeC}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="10" className="p-3 text-center text-gray-500">
                                                        {searchText 
                                                            ? `No items found matching "${searchText}" in ${selectedFestival}` 
                                                            : `No records found for ${selectedFestival}`}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        {/* Pagination section */}
                        {filteredItems && filteredItems.length > 0 && (
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                                {/* Showing X of Y rows */}
                                <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                                    {filteredItems.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredItems.length)} of ${filteredItems.length} rows` : '0 rows'}
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



export default SCertificateItemwise
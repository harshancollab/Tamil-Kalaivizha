

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAllCertificateSclwiseAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js'

const SCertificatesclwise = () => {
    const [allItemResult, setAllItemResult] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const searchQuery = searchParams.get('search') || "";
    const navigate = useNavigate();
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getAllItemResult();
    }, []);

    useEffect(() => {
        filterDataByFestivalAndSearch();
    }, [selectedFestival, searchQuery, allItemResult]);

    const getAllItemResult = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllCertificateSclwiseAPI(reqHeader)
                if (result.status === 200) {
                    setAllItemResult(result.data)
                }
            } catch (err) {
                console.log(err);
                setAllItemResult(certificateItemData);
            }
        } else {
            setAllItemResult(certificateItemData);
        }
    }

    const filterDataByFestivalAndSearch = () => {
        if (!allItemResult.length) return;

        // First filter by festival
        let filtered;
        switch (selectedFestival) {
            case "UP Kalaivizha":
                filtered = allItemResult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 300 && itemCode < 400;
                });
                break;
            case "LP Kalaivizha":
                filtered = allItemResult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 400 && itemCode < 500;
                });
                break;
            case "HS Kalaivizha":
                filtered = allItemResult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 500 && itemCode < 600;
                });
                break;
            case "HSS Kalaivizha":
                filtered = allItemResult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 600 && itemCode < 700;
                });
                break;
            case "All Festival":
                filtered = [...allItemResult];
                break;
            default:
                filtered = [...allItemResult];
        }

        // Then filter by search query if it exists
        if (searchQuery.trim() !== '') {
            filtered = filtered.filter(item => 
                item.printed.toLowerCase().includes(searchQuery.toLowerCase())
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

    const handleFestivalChange = (e) => {
        // Preserve search parameter when changing festival
        setSearchParams({ 
            festival: e.target.value,
            search: searchQuery
        });
    };

    const handleSearchChange = (e) => {
        // Update search parameter in URL while preserving festival selection
        setSearchParams({ 
            festival: selectedFestival,
            search: e.target.value
        });
    };

    const handleSchoolClick = (schoolName) => {
        // Extract just the school name part after the code
        const schoolNameOnly = schoolName.split(' - ')[1];
        navigate(`/SCertificateDetails?school=${encodeURIComponent(schoolNameOnly)}`);
    };

    // Get the appropriate title based on the selected festival
    const getPrintTitle = () => {
        switch (selectedFestival) {
            case "UP Kalaivizha":
                return "UP Kalaivizha - Certificate School Wise Report";
            case "LP Kalaivizha":
                return "LP Kalaivizha - Certificate School Wise Report";
            case "HS Kalaivizha":
                return "HS Kalaivizha - Certificate School Wise Report";
            case "HSS Kalaivizha":
                return "HSS Kalaivizha - Certificate School Wise Report";
            default:
                return "All Festival - Certificate School Wise Report";
        }
    };

    // Updated printing function using html2pdf
    const handlePrint = () => {
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
        
        const headers = ['Sl No', 'School','Sub District','District', 'No of Students', 'Participation', 'Non-Participant'];
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
        
        const displayData = filteredData.length > 0 ? filteredData : 
            (allItemResult.length > 0 ? allItemResult : certificateItemData);
            
        displayData.forEach((item, index) => {
            const row = document.createElement('tr');
            
            // Add cells
            const cellData = [
                item.slNo,
                item.printed,
                item.subDistrict,
                item.district,
                item.totalStudents,
                item.participation,
                item.nonParticipant
            ];
            
            cellData.forEach((text, cellIndex) => {
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
        
        // Add search criteria to the filename if present
        const searchSuffix = searchQuery ? `_search_${searchQuery.replace(/[^a-z0-9]/gi, '_')}` : '';
        const fileName = `${selectedFestival.replace(/ /g, '_')}${searchSuffix}_Certificate_School_Wise.pdf`;
        
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

    const certificateItemData = [
        {
            slNo: 1,
            printed: "30075 - G. M. R. S. Peermedu",
            itemCode: "301",
            itemName: "Story Writing",
            itemType: "Single",
            totalStudents: 24,
            participation: 22,
            nonParticipant: 2,
            gradeA: 10,
            gradeB: 8,
            gradeC: 4,
             district: "Kozhikode", subDistrict: "vatakara"
        },
        {
            slNo: 2,
            printed: "30081 - G. H. S. Vanchivayal",
            itemCode: "302",
            itemName: "Essay Writing",
            itemType: "Single",
            totalStudents: 18,
            participation: 16,
            nonParticipant: 2,
            gradeA: 7,
            gradeB: 5,
            gradeC: 4,
            district: "Ernakulam", subDistrict: "vypin" 
        },
        {
            slNo: 3,
            printed: "30043 - G. H. S. S. Anakara",
            itemCode: "303",
            itemName: "Poetry Writing",
            itemType: "Single",
            totalStudents: 15,
            participation: 15,
            nonParticipant: 0,
            gradeA: 8,
            gradeB: 5,
            gradeC: 2,
            district: "Palakkad", subDistrict: "Mannarkkad"
        },
        {
            slNo: 4,
            printed: "30083 - G. H. S.Udumbhancola",
            itemCode: "401",
            itemName: "Group Dance",
            itemType: "Group",
            totalStudents: 32,
            participation: 30,
            nonParticipant: 2,
            gradeA: 15,
            gradeB: 12,
            gradeC: 3,
            district: "Palakkad", subDistrict: "Chittur"
        },
        {
            slNo: 5,
            printed: "30443 - G. H. S. Chemmannu",
            itemCode: "402",
            itemName: "Group Song",
            itemType: "Group",
            totalStudents: 28,
            participation: 25,
            nonParticipant: 3,
            gradeA: 18,
            gradeB: 5,
            gradeC: 2,
            district: "Palakkad", subDistrict: "Ottapalam"
        },
        {
            slNo: 6,
            printed: "30443 - G. H. S. Chemmannu",
            itemCode: "601",
            itemName: "Drawing",
            itemType: "Single",
            totalStudents: 20,
            participation: 18,
            nonParticipant: 2,
            gradeA: 9,
            gradeB: 7,
            gradeC: 2,
            district: "Palakkad", subDistrict: "Kottayi"
        },
        {
            slNo: 7,
            printed: "30443 - G. H. S. Chemmannu",
            itemCode: "501",
            itemName: "Drawing",
            itemType: "Single",
            totalStudents: 20,
            participation: 18,
            nonParticipant: 2,
            gradeA: 9,
            gradeB: 7,
            gradeC: 2,
           district: "Idukki", subDistrict: "Munnar"
        },
        {
            slNo: 8,
            printed: "30075 - G. M. R. S. Peermedu",
            itemCode: "304",
            itemName: "Story Telling",
            itemType: "Single",
            totalStudents: 15,
            participation: 14,
            nonParticipant: 1,
            gradeA: 6,
            gradeB: 5,
            gradeC: 3,
            district: "Idukki", subDistrict: "Munnar"
        },
        {
            slNo: 9,
            printed: "30077 - G. H. S. Kallar",
            itemCode: "305",
            itemName: "Recitation",
            itemType: "Single",
            totalStudents: 22,
            participation: 20,
            nonParticipant: 2,
            gradeA: 10,
            gradeB: 7,
            gradeC: 3,
            district: "Idukki", subDistrict: "Munnar"
        },
        {
            slNo: 10,
            printed: "30079 - St. Mary's H.S. Kumily",
            itemCode: "306",
            itemName: "Drawing",
            itemType: "Single",
            totalStudents: 18,
            participation: 17,
            nonParticipant: 1,
            gradeA: 8,
            gradeB: 6,
            gradeC: 3,
            district: "Idukki", subDistrict: "Munnar"
        },
        {
            slNo: 11,
            printed: "30082 - St. Joseph's H.S. Kumily",
            itemCode: "307",
            itemName: "Painting",
            itemType: "Single",
            totalStudents: 25,
            participation: 23,
            nonParticipant: 2,
            gradeA: 12,
            gradeB: 8,
            gradeC: 3,
            district: "Idukki", subDistrict: "Munnar"
        }
    ];

    // Initialize filtered data at component mount
    useEffect(() => {
        if (allItemResult.length === 0 && certificateItemData.length > 0) {
            setAllItemResult(certificateItemData);
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

    // Determine what data to display
    const displayData = currentItems.length > 0 ? currentItems : [];

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Certificate School Wise
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
                    {/* Search Box */}
                    <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
                        <input
                            type="text"
                            placeholder="Search school name..."
                            className="w-full bg-transparent outline-none text-sm"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className="text-gray-500">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div id="certificate-table-container" className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">District</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of Students</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Participation</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Non-Participant</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {displayData.length > 0 ? (
                                                displayData.map((item) => (
                                                    <tr key={item.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.slNo}</td>
                                                        <td 
                                                            className="p-2 md:p-3 text-blue-500 whitespace-nowrap cursor-pointer hover:underline"
                                                            onClick={() => handleSchoolClick(item.printed)}
                                                        >
                                                            {item.printed}
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.subDistrict}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.district}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.totalStudents}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.participation}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.nonParticipant}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="p-3 text-center text-gray-500">
                                                        {searchQuery ? 
                                                            `No schools found matching "${searchQuery}" in ${selectedFestival}` : 
                                                            `No records found for ${selectedFestival}`
                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        {/* Pagination section */}
                        {filteredData.length > 0 && (
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

export default SCertificatesclwise



import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllResultentryListAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js'; // Add this import for html2pdf

const DistrictList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
    const [districts, setDistricts] = useState([]);
    const navigate = useNavigate();
    const printRef = useRef();
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Initialize search parameters from URL
    useEffect(() => {
        const codeParam = searchParams.get('code');
        if (codeParam) setSearchCode(codeParam);
    }, [searchParams]);

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchCode]);

    // Load dummy data on component mount
    useEffect(() => {
        // This would be replaced with your API call
        setDistricts(dummyDistrictData);
    }, []);

    // Dummy district data with relevant statistics
    const dummyDistrictData = [
        { id: 1, name: "Thiruvananthapuram", totalSchools: 120, dataEntered: 98, dataNotEntered: 22, confirmed: 85, notConfirmed: 35 },
        { id: 2, name: "Kollam", totalSchools: 95, dataEntered: 87, dataNotEntered: 8, confirmed: 76, notConfirmed: 19 },
        { id: 3, name: "Pathanamthitta", totalSchools: 75, dataEntered: 68, dataNotEntered: 7, confirmed: 65, notConfirmed: 10 },
        { id: 4, name: "Alappuzha", totalSchools: 90, dataEntered: 82, dataNotEntered: 8, confirmed: 75, notConfirmed: 15 },
        { id: 5, name: "Kottayam", totalSchools: 88, dataEntered: 79, dataNotEntered: 9, confirmed: 70, notConfirmed: 18 },
        { id: 6, name: "Idukki", totalSchools: 65, dataEntered: 48, dataNotEntered: 17, confirmed: 40, notConfirmed: 25 },
        { id: 7, name: "Ernakulam", totalSchools: 110, dataEntered: 95, dataNotEntered: 15, confirmed: 87, notConfirmed: 23 },
        { id: 8, name: "Thrissur", totalSchools: 105, dataEntered: 92, dataNotEntered: 13, confirmed: 85, notConfirmed: 20 },
        { id: 9, name: "Palakkad", totalSchools: 95, dataEntered: 80, dataNotEntered: 15, confirmed: 72, notConfirmed: 23 },
        { id: 10, name: "Malappuram", totalSchools: 115, dataEntered: 95, dataNotEntered: 20, confirmed: 85, notConfirmed: 30 },
        { id: 11, name: "Kozhikode", totalSchools: 100, dataEntered: 88, dataNotEntered: 12, confirmed: 80, notConfirmed: 20 },
        { id: 12, name: "Wayanad", totalSchools: 60, dataEntered: 48, dataNotEntered: 12, confirmed: 42, notConfirmed: 18 },
        { id: 13, name: "Kannur", totalSchools: 90, dataEntered: 82, dataNotEntered: 8, confirmed: 75, notConfirmed: 15 },
        { id: 14, name: "Kasaragod", totalSchools: 70, dataEntered: 58, dataNotEntered: 12, confirmed: 50, notConfirmed: 20 }
    ];

    // Fetch data on component mount and when dependencies change
    useEffect(() => {
        getAllresultentry();
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
                    setDistricts(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    // Replace the handlePrint function with generatePDF
    const generatePDF = () => {
        // Create a clone of the table for PDF generation
        const pdfContent = document.createElement('div');
        
        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = "District List Report";
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
        
        const headers = ['Sl No', 'District Name', 'Total Schools', 'Data Entered', 'Data Not Entered', 'Confirmed', 'Not Confirmed'];
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
        
        filteredData.forEach((district, index) => {
            const row = document.createElement('tr');
            
            // Add cells
            const cellData = [
                indexOfFirstItem + index + 1,
                district.name || "-",
                district.totalSchools || "-",
                district.dataEntered || "-",
                district.dataNotEntered || "-",
                district.confirmed || "-",
                district.notConfirmed || "-"
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
        
        // PDF filename
        const fileName = `District_List_Report.pdf`;
        
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

    const handleDistrictClick = (district) => {
        // Updated to navigate to the SubDistrictList page instead
        navigate(`/SubDistrictlist/${district.id}`, {
            state: { 
                districtName: district.name, 
                districtData: district 
            }
        });
    };

    const handleAddClick = () => {
        navigate('/AddDistrict');
    };

    // Filter results based on search code
    const filteredData = searchCode 
        ? districts.filter(district => 
            district.name.toLowerCase().includes(searchCode.toLowerCase())
          )
        : districts;

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

    // Function to update URL params
    const updateURLParams = (params) => {
        const newParams = new URLSearchParams(searchParams);
        
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
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
        setSearchCode(value);
        
        // Update URL parameter
        updateURLParams({ code: value });
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
                        District List
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={handleAddClick}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400 border border-blue-500 font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
                                >
                                 Add District
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
                    <div className="relative flex mb-5 w-full sm:w-32 md:w-60">
                        <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                            <input
                                type="text"
                                placeholder="Search district name"
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchCode}
                                onChange={handleSearchChange}
                            />
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="w-full">
                        <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">District Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Total Schools</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Data Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Data Not Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Confirmed</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Not Confirm</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems.length > 0 ? (
                                                currentItems.map((district, index) => (
                                                    <tr key={district.id} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td 
                                                            className="p-2 md:p-3 text-blue-500 whitespace-nowrap cursor-pointer hover:underline"
                                                            onClick={() => handleDistrictClick(district)}
                                                        >
                                                            {district.name}
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{district.totalSchools}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{district.dataEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{district.dataNotEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{district.confirmed}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{district.notConfirmed}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="p-4 text-center text-gray-500">
                                                        No districts found {searchCode ? `for "${searchCode}"` : ''}
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
                </div>
            </div>
        </>
    )
}

export default DistrictList
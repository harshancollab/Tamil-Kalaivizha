import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useNavigate, useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const SclDisSub = () => {
    const [showRegNo, setShowRegNo] = useState(false);
    const navigate = useNavigate();
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
    // Add this near the top of the component with other state variables
    const [subDistrictName, setSubDistrictName] = useState('');

    // District and SubDistrict states
    const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || '');
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(searchParams.get('subDistrict') || '');
    const [availableSubDistricts, setAvailableSubDistricts] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const allDistricts = [
        'Select',
        'Idukki',
        'Ernakulam',
        'Palakkad',
        'Kozhikode',
        'Wayanad',
        'Thrissur',
    ];

    const districtToSubDistrict = {
        'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
        'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
        'Ernakulam': [],
        'Kozhikode': ['vatakara'],
        'Wayanad': [],
        'Thrissur': []
    };


    // Add this to your existing useEffect that reads URL parameters
    useEffect(() => {
        const codeParam = searchParams.get('code');
        const districtParam = searchParams.get('district');
        const subDistrictParam = searchParams.get('subDistrict');
        const subDistrictNameParam = searchParams.get('subDistrictName');

        if (codeParam) setSearchCode(codeParam);
        if (districtParam) setSelectedDistrict(districtParam);
        if (subDistrictParam) setSelectedSubDistrict(subDistrictParam);
        if (subDistrictNameParam) setSubDistrictName(subDistrictNameParam);
    }, [searchParams]);

    // Update available subdistricts when district changes
    useEffect(() => {
        if (selectedDistrict && selectedDistrict !== 'Select') {
            setAvailableSubDistricts(districtToSubDistrict[selectedDistrict] || []);

            // Only reset subdistrict if it's not already set from URL
            if (!searchParams.get('subDistrict')) {
                setSelectedSubDistrict('');
            }
        } else {
            setAvailableSubDistricts([]);
            setSelectedSubDistrict('');
        }
    }, [selectedDistrict, searchParams]);

    // Initialize search parameters from URL
    useEffect(() => {
        const codeParam = searchParams.get('code');
        const districtParam = searchParams.get('district');
        const subDistrictParam = searchParams.get('subDistrict');

        if (codeParam) setSearchCode(codeParam);
        if (districtParam) setSelectedDistrict(districtParam);
        if (subDistrictParam) setSelectedSubDistrict(subDistrictParam);
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

    // Improved generatePDF function
    const generatePDF = () => {
        // Create a clone of the table for PDF generation
        const pdfContent = document.createElement('div');

        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = "School Registration List";
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);

        // Add filter information if any
        if (searchCode || selectedDistrict !== '' || selectedSubDistrict !== '') {
            const filterInfo = document.createElement('div');
            filterInfo.style.margin = '10px 0';
            filterInfo.style.textAlign = 'center';
            filterInfo.style.fontStyle = 'italic';

            let filterText = 'Filtered by: ';
            if (searchCode) filterText += `Code: ${searchCode} `;
            if (selectedDistrict && selectedDistrict !== 'Select') filterText += `District: ${selectedDistrict} `;
            if (selectedSubDistrict) filterText += `Sub-District: ${selectedSubDistrict} `;

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
            'Sl No', 'School Code', 'School Name', 'School Type', 'District', 'Sub District'
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
        filteredData.forEach((school, index) => {
            const row = document.createElement('tr');

            // Create cells
            const cellData = [
                indexOfFirstItem + index + 1,
                school.code,
                `School ${school.code}`,
                'High School',
                school.district || '-',
                school.subDistrict || '-'
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
            <p><strong>Total Schools:</strong> ${filteredData.length}</p>
            <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString()}</p>
        `;

        pdfContent.appendChild(summaryDiv);

        // PDF options
        const options = {
            margin: 10,
            filename: 'School_Registration_List.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        // Generate and download PDF
        html2pdf().from(pdfContent).set(options).save();
    };

    // Dummy data
    const resultData = [
        { slNo: 1, regNo: "1233", code: "301", district: "Idukki", subDistrict: "Munnar" },
        { slNo: 2, regNo: "4563", code: "203", district: "Palakkad", subDistrict: "Chittur" },
        { slNo: 3, regNo: "8933", code: "345", district: "Kozhikode", subDistrict: "vatakara" },
        { slNo: 4, regNo: "3433", code: "567", district: "Kozhikode", subDistrict: "vatakara" },
        { slNo: 5, regNo: "6733", code: "234", district: "Idukki", subDistrict: "Munnar" },
        { slNo: 6, regNo: "8903", code: "123", district: "Idukki", subDistrict: "Kattappana" },
        { slNo: 7, regNo: "453", code: "456", district: "Palakkad", subDistrict: "Chittur", },
        { slNo: 8, regNo: "6783", code: "976", district: "Ernakulam", subDistrict: "Edapally" },
        { slNo: 9, regNo: "6783", code: "976", district: "Thrissur", subDistrict: "" },
        { slNo: 10, regNo: "6783", code: "976", district: "Wayanad", subDistrict: "" },
        { slNo: 11, regNo: "6783", code: "976", district: "Idukki", subDistrict: "Adimali" },
        { slNo: 12, regNo: "7123", code: "432", district: "Palakkad", subDistrict: "Ottapalam" },
        { slNo: 13, regNo: "5463", code: "312", district: "Kozhikode", subDistrict: "vatakara" },
        { slNo: 14, regNo: "3213", code: "654", district: "Idukki", subDistrict: "Kattappana" },
        { slNo: 15, regNo: "9873", code: "789", district: "Palakkad", subDistrict: "Chittur" },
    ];
    // Add this function to your SclDisSub component
   // In SclDisSub.js
const handleAddSchool = () => {
    // Create URLSearchParams to pass district and subDistrict to the next page
    const params = new URLSearchParams();

    // Add district parameter if it exists
    if (selectedDistrict && selectedDistrict !== 'Select') {
        params.set('district', selectedDistrict);
    }

    // Add subDistrict parameter if it exists
    if (selectedSubDistrict) {
        params.set('subDistrict', selectedSubDistrict);
        
        // Get the name of the selected subDistrict if needed for display
        const subDistrictName = selectedSubDistrict;
        if (subDistrictName) {
            params.set('subDistrictName', subDistrictName);
        }
    }

    // Navigate to AddScl with the parameters
    navigate({
        pathname: '/AddSclsub',
        search: params.toString()
    });
};

    // Filter results based on search code
    const filteredResultData = () => {
        if (!searchCode) {
            return resultData;
        }
        return resultData.filter(result =>
            result.code.toLowerCase().includes(searchCode.toLowerCase())
        );
    };

    // Filter by district and subdistrict
    const filteredByLocation = () => {
        let filtered = filteredResultData();

        if (selectedDistrict && selectedDistrict !== 'Select') {
            filtered = filtered.filter(result => result.district === selectedDistrict);
        }

        if (selectedSubDistrict && selectedSubDistrict !== 'Select') {
            filtered = filtered.filter(result => result.subDistrict === selectedSubDistrict);
        }

        return filtered;
    };

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchCode, selectedDistrict, selectedSubDistrict]);

    // Pagination logic
    const filteredData = filteredByLocation();
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
        setSearchCode(value);

        // Update URL parameter
        updateURLParams({ code: value });
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            <span>{subDistrictName}</span> - Schools List 34
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <button
                                onClick={handleAddSchool}
                                className={`text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] border border-blue-500 py-2 px-6 rounded-full flex items-center w-full sm:w-auto `}
                            >
                                Add School
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
                                placeholder="Search by School Code..."
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchCode}
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
                        <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Data Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Confirmed</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reset</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems.length > 0 ? (
                                                currentItems.map((result, index) => (
                                                    <tr key={result.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">School {result.code}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap"> no</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">Yes</td>
                                                        <td className="p-2 md:p-3 text-blue-500 whitespace-nowrap"><i class="fa-solid fa-rotate-right"></i></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="p-4 text-center text-gray-500">
                                                        No results found {searchCode ? `for "${searchCode}"` : ''}
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

export default SclDisSub
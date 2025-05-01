import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import DeclaredResult from '../components/DeclaredResult';
import html2pdf from 'html2pdf.js';

const DPubl = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const printRef = useRef(null);

    // State to track the selected result type
    const [resultType, setResultType] = useState(searchParams.get('resultType') || 'Declared Result');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFestival, setSelectedFestival] = useState(searchParams.get('festival') || 'UP Tamil Kalaivizha');
    const [showResultTypeDropdown, setShowResultTypeDropdown] = useState(true);
    const [showAllResultDropdown, setShowAllResultDropdown] = useState(false);
    const [allResultType, setAllResultType] = useState('All Result');
    const [festivalStatus, setFestivalStatus] = useState([
        { festival: 'UP Tamil Kalaivizha', totalItems: 11, completedItems: 10, notCompletedItems: 1, itemCodeRange: [300, 400] },
        { festival: 'Lp Tamil Kalaivizha', totalItems: 15, completedItems: 12, notCompletedItems: 3, itemCodeRange: [401, 500] },
        { festival: 'Hs Tamil Kalaivizha', totalItems: 20, completedItems: 18, notCompletedItems: 2, itemCodeRange: [501, 600] },
        { festival: 'Hss Tamil Kalaivizha', totalItems: 25, completedItems: 22, notCompletedItems: 3, itemCodeRange: [601, Infinity] },
    ]);

    // Dummy data for School Points
    const [allSchoolPointsData, setAllSchoolPointsData] = useState([
        { slNo: 1, schoolCode: 'SCH001', schoolName: 'Example School 1', subDistrict: 'District A', points: 85, Itemcode: 302 },
        { slNo: 2, schoolCode: 'SCH002', schoolName: 'Another School', subDistrict: 'District B', points: 92, Itemcode: 456 },
        { slNo: 3, schoolCode: 'SCH003', schoolName: 'Test School 3', subDistrict: 'District C', points: 78, Itemcode: 325 },
        { slNo: 4, schoolCode: 'SCH004', schoolName: 'Sample Academy', subDistrict: 'District A', points: 90, Itemcode: 510 },
        { slNo: 5, schoolCode: 'SCH005', schoolName: 'Central School', subDistrict: 'District D', points: 83, Itemcode: 612 },
        { slNo: 6, schoolCode: 'SCH006', schoolName: 'Public School', subDistrict: 'District B', points: 88, Itemcode: 350 },
        { slNo: 7, schoolCode: 'SCH007', schoolName: 'Modern School', subDistrict: 'District C', points: 95, Itemcode: 475 },
        { slNo: 8, schoolCode: 'SCH008', schoolName: 'Global Academy', subDistrict: 'District E', points: 82, Itemcode: 530 },
        { slNo: 9, schoolCode: 'SCH009', schoolName: 'Eastern High', subDistrict: 'District A', points: 91, Itemcode: 622 },
        { slNo: 10, schoolCode: 'SCH010', schoolName: 'Western High', subDistrict: 'District D', points: 86, Itemcode: 380 },
        { slNo: 11, schoolCode: 'SCH011', schoolName: 'Northern School', subDistrict: 'District B', points: 79, Itemcode: 490 },
    ]);
    const [schoolPointsData, setSchoolPointsData] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Function to filter school points data based on the selected festival
    useEffect(() => {
        if (selectedFestival === 'UP Tamil Kalaivizha') {
            setSchoolPointsData(allSchoolPointsData.filter(item => item.Itemcode >= 300 && item.Itemcode <= 400));
        } else if (selectedFestival === 'Lp Tamil Kalaivizha') {
            setSchoolPointsData(allSchoolPointsData.filter(item => item.Itemcode >= 401 && item.Itemcode <= 500));
        } else if (selectedFestival === 'Hs Tamil Kalaivizha') {
            setSchoolPointsData(allSchoolPointsData.filter(item => item.Itemcode >= 501 && item.Itemcode <= 600));
        } else if (selectedFestival === 'Hss Tamil Kalaivizha') {
            setSchoolPointsData(allSchoolPointsData.filter(item => item.Itemcode >= 601));
        } else if (selectedFestival === 'ALL Festivel') {
            setSchoolPointsData(allSchoolPointsData);
        } else {
            setSchoolPointsData([]);
        }
    }, [selectedFestival, allSchoolPointsData]);

    // Function to update URL parameters
    const updateUrl = (newParams) => {
        const currentParams = new URLSearchParams(searchParams);
        for (const key in newParams) {
            if (newParams.hasOwnProperty(key)) {
                if (newParams[key]) {
                    currentParams.set(key, newParams[key]);
                } else {
                    currentParams.delete(key);
                }
            }
        }
        navigate(`?${currentParams.toString()}`, { replace: true });
    };

    // Handle result type change
    const handleResultTypeChange = (e) => {
        const newResultType = e.target.value;
        setResultType(newResultType);
        updateUrl({ resultType: newResultType });
        setCurrentPage(1); // Reset to first page when changing result type
    };

    // Handle all result type change
    const handleAllResultTypeChange = (e) => {
        setAllResultType(e.target.value);
        setCurrentPage(1); // Reset to first page when changing result type
    };

    // Effect to toggle dropdowns based on festival selection
    useEffect(() => {
        if (selectedFestival === 'Status View') {
            const fadeOut = setTimeout(() => {
                setShowResultTypeDropdown(false);
                const fadeIn = setTimeout(() => {
                    setShowAllResultDropdown(true);
                }, 300);
                return () => clearTimeout(fadeIn);
            }, 300);
            return () => clearTimeout(fadeOut);
        } else {
            const fadeOut = setTimeout(() => {
                setShowAllResultDropdown(false);
                const fadeIn = setTimeout(() => {
                    setShowResultTypeDropdown(true);
                }, 300);
                return () => clearTimeout(fadeIn);
            }, 300);
            return () => clearTimeout(fadeOut);
        }
    }, [selectedFestival]);

    // Handle festival selection change
    const handleFestivalChange = (e) => {
        const newFestival = e.target.value;
        setSelectedFestival(newFestival);
        setSearchTerm(''); // Clear search term when festival changes
        updateUrl({ festival: newFestival });
        setCurrentPage(1); // Reset to first page when changing festival
    };

    // Get formatted current date
    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePrint = () => {
        // Create a new document for proper PDF layout
        const printWindow = document.createElement('div');
        printWindow.style.width = '100%';
        printWindow.style.padding = '20px';
        printWindow.style.fontFamily = 'Arial, sans-serif';

        // Add proper header with logo and title
        const headerSection = document.createElement('div');
        headerSection.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #003566; padding-bottom: 10px;">
            <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 4px; color: #003566;">Tamil Kalaivizha Results System</h1>
            <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">${resultType} - ${selectedFestival}</h2>
            <p style="font-size: 12px; color: #555; margin-bottom: 0;">Generated on: ${getCurrentDate()}</p>
            ${searchTerm ? `<p style="font-size: 11px; font-style: italic; margin-bottom: 0;">Filtered by: "${searchTerm}"</p>` : ''}
        </div>
    `;

        printWindow.appendChild(headerSection);

        // Create the content section based on view type
        const contentSection = document.createElement('div');
        contentSection.style.width = '100%';

        // Create appropriate table based on current view
        if (selectedFestival === 'Status View') {
            // Create a table for festival status
            const table = createStatusTable(festivalStatus);
            contentSection.appendChild(table);
        }
        else if (resultType === 'School Points') {
            // Create table for School Points
            const table = createSchoolPointsTable(filteredSchoolPointsData);
            contentSection.appendChild(table);
        }
        else {
            // Create table for Declared Results
            const table = createDeclaredResultTable(filteredResults || []); // Use the filteredResults from DeclaredResult component
            contentSection.appendChild(table);
        }

        printWindow.appendChild(contentSection);

        // Add footer with page number placeholder and copyright
        const footerSection = document.createElement('div');
        footerSection.innerHTML = `
       
    `;

        printWindow.appendChild(footerSection);

        // Create a descriptive filename
        let filename = `${selectedFestival}-${resultType.replace(' ', '-')}`;
        if (searchTerm) {
            const sanitizedSearch = searchTerm.substring(0, 15).replace(/[^a-z0-9]/gi, '-');
            filename += `-${sanitizedSearch}`;
        }
        filename += `.pdf`;

        // Configure PDF options for better output
        const pdfOptions = {
            margin: [15, 10, 15, 10], // top, right, bottom, left margins in mm
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                letterRendering: true,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break-before',
                after: '.page-break-after'
            }
        };

        // Generate the PDF with pagination
        html2pdf()
            .from(printWindow)
            .set(pdfOptions)
            .toPdf()
            .get('pdf')
            .then((pdf) => {
                // Add page numbers
                const totalPages = pdf.internal.getNumberOfPages();
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    pdf.setFontSize(8);
                    pdf.setTextColor(100);
                    pdf.text(`${i} of ${totalPages}`, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 7, {
                        align: 'center'
                    });
                }
            })
            .save();
    };

    // Helper function to create a status table
    const createStatusTable = (festivalStatus) => {
        const table = document.createElement('table');
        setTableStyles(table);

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Festival', 'Total Items', 'Items Completed', 'Items Not Completed'];
        const widths = ['40%', '20%', '20%', '20%'];

        headers.forEach((headerText, index) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            setHeaderCellStyles(th);
            th.style.width = widths[index];
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        festivalStatus.forEach((status, index) => {
            const row = document.createElement('tr');
            row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

            // Create cells for each column
            const columns = [
                status.festival,
                status.totalItems,
                status.completedItems,
                status.notCompletedItems
            ];

            columns.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                setDataCellStyles(td);
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        return table;
    };

    // Helper function to create a school points table
    const createSchoolPointsTable = (schoolPointsData) => {
        const table = document.createElement('table');
        setTableStyles(table);

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Sl No', 'School Code', 'School Name', 'Sub District', 'Points'];
        const widths = ['7%', '15%', '43%', '20%', '15%'];

        headers.forEach((headerText, index) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            setHeaderCellStyles(th);
            th.style.width = widths[index];
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        schoolPointsData.forEach((school, index) => {
            const row = document.createElement('tr');
            row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

            // Create cells for each column
            const columns = [
                school.slNo,
                school.schoolCode,
                school.schoolName,
                school.subDistrict,
                school.points
            ];

            columns.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                setDataCellStyles(td);
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        return table;
    };

    // Helper function to create a declared result table
    const createDeclaredResultTable = (declaredResults) => {
        const table = document.createElement('table');
        setTableStyles(table);

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Sl No', 'Item Code & Name', 'Reg No', 'Code No', 'Name', 'Class', 'School Name', 'Sub District', 'Grade', 'Point'];
        const widths = ['5%', '15%', '8%', '8%', '12%', '5%', '20%', '12%', '5%', '10%'];

        headers.forEach((headerText, index) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            setHeaderCellStyles(th);
            th.style.width = widths[index];
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        if (declaredResults.length > 0) {
            declaredResults.forEach((result, index) => {
                const row = document.createElement('tr');
                row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';

                // Create cells for each column
                const columns = [
                    index + 1,
                    `${result.itemCode} - ${result.itemName}`,
                    result.regNo,
                    result.codeNo,
                    result.name,
                    result.className,
                    result.schoolName,
                    result.subDistrict,
                    result.grade,
                    result.point
                ];

                columns.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    setDataCellStyles(td);
                    row.appendChild(td);
                });

                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.setAttribute('colspan', '10');
            cell.textContent = 'No results found';
            cell.style.padding = '10px';
            cell.style.textAlign = 'center';
            row.appendChild(cell);
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        return table;
    };

    // Helper function for setting consistent table styles
    const setTableStyles = (table) => {
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.fontSize = '10px';
        table.style.border = '1px solid #ddd';
        table.style.marginBottom = '15px';
    };

    // Helper function for setting header cell styles
    const setHeaderCellStyles = (cell) => {
        cell.style.padding = '6px';
        cell.style.backgroundColor = '#f0f7ff';
        cell.style.color = '#003566';
        cell.style.border = '1px solid #ccc';
        cell.style.fontWeight = 'bold';
        cell.style.textAlign = 'center';
    };

    // Helper function for setting data cell styles
    const setDataCellStyles = (cell) => {
        cell.style.padding = '4px';
        cell.style.border = '1px solid #ddd';
        cell.style.textAlign = 'center';
    }; 
    
    const getHeading = () => {
        if (selectedFestival === 'Status View') {
            return 'Publish Declared Result List';
        }
        if (resultType === 'School Points') {
            return 'Publish Result School Points List';
        }
        return 'Publish Declared Result List';
    };

    const handleStatusClick = (type, festivalName) => {
        navigate(`/festival-status?festival=${festivalName}&status=${type}`);
    };
    
    // Filter school points data based on search term
    const filteredSchoolPointsData = schoolPointsData.filter(school => {
        const searchLower = searchTerm.toLowerCase();
        return (
            school.schoolName.toLowerCase().includes(searchLower) ||
            school.schoolCode.toLowerCase().includes(searchLower) ||
            school.subDistrict.toLowerCase().includes(searchLower)
        );
    });

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentSchoolItems = filteredSchoolPointsData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredSchoolPointsData.length / rowsPerPage);

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
                        <h2 className="text-xl font-bold leading-none tracking-tight">
                            {getHeading()}
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            {/* All Result dropdown */}
                            {showAllResultDropdown && (
                                <div className={`relative w-full sm:w-40 transition-all duration-300 opacity-100 scale-100`}>
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                        id="all-result-type-select"
                                        value={allResultType}
                                        onChange={handleAllResultTypeChange}
                                    >
                                        <option value="All Result">All Result</option>
                                        <option value="Status of Festival">Status of Festival</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Declared Result dropdown */}
                            {showResultTypeDropdown && (
                                <div className={`relative w-full sm:w-40 transition-all duration-300 opacity-100 scale-100`}>
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                        value={resultType}
                                        onChange={handleResultTypeChange}
                                    >
                                        <option value="Declared Result">Declared Result</option>
                                        <option value="School Points">School Points</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="festival-select"
                                    value={selectedFestival}
                                    onChange={handleFestivalChange}
                                >
                                    <option value="UP Tamil Kalaivizha">UP Tamil Kalaivizha</option>
                                    <option value="Lp Tamil Kalaivizha">Lp Tamil Kalaivizha</option>
                                    <option value="Hs Tamil Kalaivizha">Hs Tamil Kalaivizha</option>
                                    <option value="Hss Tamil Kalaivizha">Hss Tamil Kalaivizha</option>
                                    <option value="ALL Festivel">ALL Festivel</option>
                                    <option value="Status View">Status View</option>
                                </select>
                                <label
                                    htmlFor="festival-select"
                                    className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                                >
                                    Festival
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
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

                    {/* Search Bar */}
                    {selectedFestival !== 'Status View' && (
                        <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
                            <input
                                type="text"
                                placeholder="Search school Name or code..."
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page when searching
                                }}
                            />
                            <div className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* The content to be printed - only filtered results will be printed */}
                    <div className="w-full mt-4" id="content-to-print" ref={printRef}>
                        {/* These headers are hidden in the UI but will appear in the PDF */}
                        <div className="print-only-headers hidden">
                            <h1 className="text-center text-xl font-bold">Tamil Kalaivizha Results</h1>
                            <h2 className="text-center text-lg font-bold">{selectedFestival}</h2>
                            <p className="text-center">{resultType}</p>
                            <p className="text-center text-sm">Date: {getCurrentDate()}</p>
                            {searchTerm && <p className="text-center text-sm">Filter: "{searchTerm}"</p>}
                        </div>

                        {selectedFestival !== 'Status View' ? (
                            resultType === 'Declared Result' ? (
                                <DeclaredResult
                                    searchTerm={searchTerm}
                                    selectedFestival={selectedFestival}
                                    printRef={printRef}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rowsPerPage={rowsPerPage}
                                />
                            ) : (

                                <div className="overflow-x-auto -mx-4 sm:mx-0">
                                    <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                        <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                                <thead className="bg-gray-50">
                                                    <tr className="text-gray-700">
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                    {filteredSchoolPointsData.map((school, index) => (
                                                        <tr key={index} className="hover:bg-gray-100">
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.slNo}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolCode}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolName}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.subDistrict}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.points}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                     
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="mt-4 p-4 bg-white rounded-lg shadow">
                                {/* <h3 className="text-lg font-medium text-gray-900">Festival Status View</h3> */}
                                <p className="mt-2 text-gray-600">
                                    {allResultType === 'All Result' ?
                                        <div className="w-full">
                                            <DeclaredResult
                                                searchTerm={searchTerm}
                                                selectedFestival={'ALL Festivel'}
                                                printRef={printRef}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                                rowsPerPage={rowsPerPage}
                                            />
                                        </div> :
                                        <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                            <thead className="bg-gray-50">
                                                <tr className="text-gray-700">
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Festival Item Total</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Items Completed</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Items Not Completed</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                {festivalStatus.map((status) => (
                                                    <tr key={status.festival} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap text-blue-500 cursor-pointer" onClick={() => handleStatusClick('total', status.festival)}>
                                                            {status.festival} ({status.totalItems})
                                                        </td>


                                                        <td className="p-2 md:p-3 whitespace-nowrap text-blue-500 cursor-pointer" onClick={() => handleStatusClick('completed', status.festival)}>
                                                            {status.completedItems}
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap text-blue-500 cursor-pointer" onClick={() => handleStatusClick('not-completed', status.festival)}>
                                                            {status.notCompletedItems}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        
                                    }
                                </p>
                              

                            </div>
                        )}
                    </div>
                </div>
            
            </div>
            


        </>
    );
};

export default DPubl;
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllHigherlvlcompAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const ShigherLevel = () => {
    const [Allitemresult, setItemresult] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [festivalOptions, setFestivalOptions] = useState(["All Festival"]);
    const [dataLoaded, setDataLoaded] = useState(false);
    
    // Festival selection state
    const selectedFestival = searchParams.get('festival') || "All Festival";
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Festival mapping with codes and names
    const festivalMapping = {
        "UP Kalaivizha": { min: 300, max: 399 },
        "LP Kalaivizha": { min: 400, max: 499 },
        "HS Kalaivizha": { min: 500, max: 599 },
        "HSS Kalaivizha": { min: 600, max: 899 },
    };

    useEffect(() => {
        getAllItemResult();
        
        // Initialize search text from URL on component mount
        const searchQuery = searchParams.get('search') || '';
        if (searchQuery) {
            setSearchText(searchQuery);
        }
    }, []);

    useEffect(() => {
        if (dataLoaded) {
            // Generate festival options from the actual data
            generateFestivalOptions();
            filterItemsByFestival();
        }
    }, [selectedFestival, dataLoaded]);

    // React to searchText changes directly
    useEffect(() => {
        if (dataLoaded) {
            filterItemsByFestival();
        }
    }, [searchText]);

    // Generate festival options based on data
    const generateFestivalOptions = () => {
        const festivals = new Set();

        // Add "All Festival" option by default
        festivals.add("All Festival");

        // Add festivals based on item codes in the data
        Allitemresult.forEach(item => {
            const itemCode = parseInt(item.itemCode);

            Object.entries(festivalMapping).forEach(([festival, range]) => {
                if (itemCode >= range.min && itemCode <= range.max) {
                    festivals.add(festival);
                }
            });
        });

        setFestivalOptions(Array.from(festivals));
    };

    const getAllItemResult = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllHigherlvlcompAPI(reqHeader)
                if (result.status === 200) {
                    setItemresult(result.data);
                    setDataLoaded(true);
                }
            } catch (err) {
                console.log(err);
                setItemresult(resultData);
                setDataLoaded(true);
            }
        } else {
            setItemresult(resultData);
            setDataLoaded(true);
        }
    }

    const filterItemsByFestival = () => {
        if (!Allitemresult.length) return;

        // First filter by festival
        let filtered;
        if (selectedFestival === "All Festival") {
            filtered = [...Allitemresult];
        } else {
            const range = festivalMapping[selectedFestival];
            filtered = Allitemresult.filter(item => {
                const itemCode = parseInt(item.itemCode);
                return itemCode >= range.min && itemCode <= range.max;
            });
        }

        // Filter by search text
        if (searchText && searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase().trim();
            filtered = filtered.filter(item => 
                (item.participantName && item.participantName.toLowerCase().includes(searchLower))
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

    const resultData = [
        {
            slNo: 1,
            itemCode: "301",
            itemName: "Story Writing",
            participantName: "Arun Kumar",
            class: "10th A",
            schoolName: "St. Joseph's High School",
            subDistrict:"Adimali",
            district:"Idukki",
        },
        {
            slNo: 2,
            itemCode: "302",
            itemName: "Poem Recitation",
            participantName: "Meena Sharma",
            class: "9th B",
            subDistrict:"Kattappana",
            district:"Idukki",
            schoolName: "Holy Cross School"
        },
        {  
            slNo: 3,
            itemCode: "002",
            itemName: "LP Essay Writing",
            participantName: "Rajesh Singh",
            class: "5th C",
            subDistrict:"Kattappana",
            district:"Idukki",
            schoolName: "Kendriya Vidyalaya"
        },
        {
            slNo: 4,
            itemCode: "402",
            itemName: "LP Tamil Elocution",
            participantName: "Priya Raman",
            class: "4th A",
            subDistrict:"Kattappana",
            district:"Idukki",
            schoolName: "Government Higher Secondary School"
        },
        {
            slNo: 5,
            itemCode: "051",
            itemName: "HS Group Singing",
            participantName: "Tamil Music Team",
            class: "Various",
            subDistrict:"Kattappana",
            district:"Idukki",
            schoolName: "Modern Public School"
        },
        {
            slNo: 6,
            itemCode: "502",
            itemName: "HS Mono Acting",
            participantName: "Karthik Narayanan",
            class: "10th D",
            subDistrict:"Kattappana",
            district:"Idukki",
            schoolName: "DAV Public School"
        },
        {
            slNo: 7,
            itemCode: "671",
            itemName: "HSS Kolam Competition",
            participantName: "Lakshmi Sundaram",
            class: "12th A",
            subDistrict:"Mannarkkad",
            district:"Palakkad",
            schoolName: "St. Mary's School"
        },
        {
            slNo: 8,
            itemCode: "601",
            itemName: "HSS Folk Dance",
            participantName: "Cultural Team",
            class: "Various",
            subDistrict:"Chittur",
            district:"Palakkad",
            schoolName: "Vidya Mandir"
        },
        {
            slNo: 9,
            itemCode: "601",
            itemName: "HSS Kolam Competition",
            participantName: "Lakshmi Sundaram",
            class: "12th A",
            subDistrict:"vatakara",
            district:"Kozhikode",
            schoolName: "St. Mary's School"
        },
        {
            slNo: 10,
            itemCode: "601",
            itemName: "HSS Kolam Competition",
            participantName: "Lakshmi Sundaram",
            class: "12th A",
            subDistrict:"Nedumkandam",
            district:"Idukki",
            schoolName: "St. Mary's School"
        },
        {
            slNo: 11,
            itemCode: "601",
            itemName: "HSS Kolam Competition",
            participantName: "Lakshmi Sundaram",
            class: "12th A",
            schoolName: "St. Mary's School"
        },
        {
            slNo: 12,
            itemCode: "601",
            itemName: "HSS Kolam Competition",
            participantName: "Lakshmi Sundaram",
            class: "12th A",
            schoolName: "St. Mary's School"
        },
    ];

    const getPrintTitle = () => {
        return `${selectedFestival === "All Festival" ? "All Festival" : selectedFestival} - Higher Level Competition`;
    };

    // Helper function to update URL parameters
    const updateUrlParams = (newParams) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        const updatedParams = { ...currentParams, ...newParams };

        // Remove empty values
        Object.keys(updatedParams).forEach(key => {
            if (updatedParams[key] === '') {
                delete updatedParams[key];
            }
        });

        setSearchParams(updatedParams);
    };

    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        updateUrlParams({ festival });
        // Reset search text when changing festival
        setSearchText('');
    };

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };

    // Updated handlePrint function using html2pdf.js
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
        
        const headers = ['Sl No', 'Item Code & Item Name', 'Name of Participant', 'Class', 'School Name', 'Sub District', 'District'];
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
        
        const displayData = filteredItems.length > 0 ? filteredItems : [];
            
        if (displayData.length > 0) {
            displayData.forEach((item) => {
                const row = document.createElement('tr');
                
                // Add cells
                const cellData = [
                    item.slNo,
                    `${item.itemCode} - ${item.itemName}`,
                    item.participantName,
                    item.class,
                    item.schoolName,
                    item.subDistrict || "-",
                    item.district || "-"
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
            // Add a "No results" row for empty data
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.textContent = 'No participants found for the selected criteria.';
            emptyCell.style.border = '1px solid #ddd';
            emptyCell.style.padding = '10px';
            emptyCell.style.textAlign = 'center';
            emptyCell.colSpan = 7;
            
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
        }
        
        table.appendChild(tbody);
        pdfContent.appendChild(table);
        
        // PDF filename
        const fileName = `${selectedFestival.replace(/ /g, '_')}_Higher_Level_Competition.pdf`;
        
        // PDF options
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

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;
        
        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                for (let i = 1; i <= 3; i++) {
                    if (i <= totalPages) pageNumbers.push(i);
                }
                if (totalPages > 3) {
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
                }
            } else if (currentPage >= totalPages - 1) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    if (i > 0) pageNumbers.push(i);
                }
            } else {
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
                            Higher Level Competition
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4"> 
                            {/* Festival Select with floating label */}
                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="festival-select"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    {festivalOptions.map((festival) => (
                                        <option key={festival} value={festival}>
                                            {festival}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="festival-select"
                                    className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                                >
                                    Festival
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
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
                    {/* Search Bar */}
                    <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
                        <input
                            type="text"
                            placeholder="Search Participant Name..."
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
                                <div id="higher-level-table-container" className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name of Participant</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Class</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code & Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">District</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {dataLoaded && currentItems.length > 0 ? (
                                                currentItems.map((result) => (
                                                    <tr key={result.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCode} - {result.itemName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.participantName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.class}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">3001-{result.schoolName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.subDistrict}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.district}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="p-4 text-center text-gray-500">
                                                        {!dataLoaded ? "Loading..." : "No participants found. Please try a different search."}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination section */}
                    {dataLoaded && currentItems.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                            {/* Showing X of Y rows */}
                            <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                                {totalItems > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, totalItems)} of ${totalItems} rows` : '0 rows'}
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
    )
}

export default ShigherLevel
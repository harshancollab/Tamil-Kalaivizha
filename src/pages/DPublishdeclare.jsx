import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { getAllPublishentryListAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js'
import StatusFest from '../components/StatusFest'

const DPublishdeclare = () => {
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const selectedResultType = searchParams.get('resultType') || "Declared Result";
    const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
    const [filteredData, setFilteredData] = useState([]);
    const [filteredResultData, setFilteredResultData] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [allResultEntry, setResultEntry] = useState([]);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState('Select Sub District');
    // Animation state
    const [dropdownAnimation, setDropdownAnimation] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getAllresultentry();
    }, []);

    // Add animation effect when dropdown changes
    useEffect(() => {
        setDropdownAnimation(true);
        const timer = setTimeout(() => {
            setDropdownAnimation(false);
        }, 500); // Duration of animation

        return () => clearTimeout(timer);
    }, [selectedFestival, selectedResultType]);

    const getAllresultentry = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllPublishentryListAPI(reqHeader)
                if (result.status === 200) {
                    setResultEntry(result.data)
                }
            } catch (err) {
                console.log(err);
                // Set dummy data if API fails
                setResultEntry(resultData);
            }
        } else {
            // Set dummy data if no token
            setResultEntry(resultData);
        }
    }


    // Dummy data for the result list
    const resultData = [
        {
            slNo: 1,
            itemCodeName: "301 - Story Writing",
            itemCode: "301",
            regNo: "1001",
            codeNo: "SN-101",
            name: "Rahul Kumar",
            noOfParticipate: 1,
            schoolName: "St. Mary's High School",
           sub:"ottaplam",
            schoolCode: "SMHS-01",
            grade: "A",
            point: 9.5
        },

    ];

    // Filter result data based on selected festival
    useEffect(() => {
        filterResultDataByFestival();
    }, [selectedFestival, allResultEntry]);

    const filterResultDataByFestival = () => {
        let dataToFilter = allResultEntry.length > 0 ? allResultEntry : resultData;

        let filtered;
        switch (selectedFestival) {
            case "UP Kalaivizha":
                filtered = dataToFilter.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 300 && itemCode < 400;
                });
                break;
            case "Lp Kalaivizha":
                filtered = dataToFilter.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 400 && itemCode < 500;
                });
                break;
            case "Hs Kalaivizha":
                filtered = dataToFilter.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 500 && itemCode < 600;
                });
                break;
            case "Hss Kalaivizha":
                filtered = dataToFilter.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 600 && itemCode < 700;
                });
                break;
            case "All Festival":
            case "Status View":
            default:
                filtered = [...dataToFilter];
        }

        // Add sequential numbering to filtered results
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredResultData(filtered);

        // Generate school points from the filtered data
        const schoolPointsData = getSchoolPointsData(filtered);
        setFilteredData(schoolPointsData);

        // Update search results if search term exists
        if (searchTerm.trim()) {
            filterSchools(searchTerm, schoolPointsData);
        }

        // Reset pagination to first page
        setCurrentPage(1);
    };

    function getSchoolPointsData(data = []) {
        const dataToUse = data.length > 0 ? data : 
            (filteredResultData.length > 0 ? filteredResultData : resultData);

        const schoolMap = {};

        dataToUse.forEach(item => {
            if (!schoolMap[item.schoolName]) {
                schoolMap[item.schoolName] = {
                    slNo: Object.keys(schoolMap).length + 1,
                    schoolCode: item.schoolCode,
                    schoolName: item.schoolName,
                    sub:item.sub,
                    point: item.point
                };
            } else {
                schoolMap[item.schoolName].point += item.point;
            }
        });

        return Object.values(schoolMap).sort((a, b) => b.point - a.point);
    };

    useEffect(() => {
        const initialSearchTerm = searchParams.get('code') || '';
        setSearchTerm(initialSearchTerm);

        // Apply filter only if there's a search term
        if (initialSearchTerm) {
            filterSchools(initialSearchTerm);
        }
    }, [searchParams, selectedResultType]);

    // Also ensure that when festival changes, we reset the filtered data
    useEffect(() => {
        filterResultDataByFestival();
        // Reset search when festival changes
        if (searchTerm) {
            filterSchools(searchTerm);
        }
    }, [selectedFestival, allResultEntry]);

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('code', newSearchTerm);
            return newParams;
        });
        filterSchools(newSearchTerm);
        setCurrentPage(1); // Reset to first page on search
    };

    const filterSchools = (term, schoolData = null) => {
        // If searching in School Points view
        if (selectedResultType === "School Points") {
            const dataToFilter = schoolData || (filteredData.length > 0 ? filteredData : getSchoolPointsData());
            const lowercasedTerm = term.toLowerCase();

            if (!term.trim()) {
                setFilteredData(dataToFilter);
                setNoResults(false);
                updateTotalPages(dataToFilter.length);
                return;
            }

            const results = dataToFilter.filter(school =>
                school.schoolCode.toLowerCase().includes(lowercasedTerm) ||
                school.schoolName.toLowerCase().includes(lowercasedTerm)
            );

            setFilteredData(results);
            setNoResults(results.length === 0);
            updateTotalPages(results.length);
        } 
        // If searching in Declared Result view
        else if (selectedResultType === "Declared Result") {
            const dataToFilter = filteredResultData.length > 0 ? filteredResultData : resultData;
            const lowercasedTerm = term.toLowerCase();

            if (!term.trim()) {
                setFilteredResultData(dataToFilter);
                setNoResults(false);
                updateTotalPages(dataToFilter.length);
                return;
            }

            const results = dataToFilter.filter(result =>
                result.itemCode.toLowerCase().includes(lowercasedTerm) ||
                result.itemCodeName.toLowerCase().includes(lowercasedTerm) ||
                result.name.toLowerCase().includes(lowercasedTerm) ||
                result.schoolName.toLowerCase().includes(lowercasedTerm)
            );

            setFilteredResultData(results);
            setNoResults(results.length === 0);
            updateTotalPages(results.length);
        }
    };

    // Update total pages when data changes
    const updateTotalPages = (itemCount) => {
        setTotalPages(Math.ceil(itemCount / itemsPerPage));
    };

    // Update total pages when filtered data changes
    useEffect(() => {
        if (selectedResultType === 'School Points') {
            updateTotalPages(filteredData.length);
        } else {
            updateTotalPages(filteredResultData.length);
        }
    }, [filteredData, filteredResultData, itemsPerPage, selectedResultType]);

    const getPageHeading = () => {
        switch (selectedResultType) {
            case "School Points":
                return "Publish Result School Points List";
            case "All Result":
                return "Publish All Results List";
            case "Status of Festival":
                return "Festival Status Overview";
            case "Declared Result":
            default:
                return "Publish Declared Result List";
        }
    };

    const getPrintTitle = () => {
        let festivalName = "";
        switch (selectedFestival) {
            case "UP Kalaivizha":
                festivalName = "UP Tamil Kalaivizha";
                break;
            case "Lp Kalaivizha":
                festivalName = "LP Tamil Kalaivizha";
                break;
            case "Hs Kalaivizha":
                festivalName = "HS Tamil Kalaivizha";
                break;
            case "Hss Kalaivizha":
                festivalName = "HSS Tamil Kalaivizha";
                break;
            case "Status View":
                festivalName = "Tamil Kalaivizha Status";
                break;
            default:
                festivalName = "Tamil Kalaivizha";
        }

        return `${festivalName} - ${selectedResultType}`;
    };

    const handleFestivalChange = (e) => {
        const newFestival = e.target.value;

        // Update the festival in the search params
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('festival', newFestival);

            // If switching to Status View and the current result type isn't All Result or Status of Festival,
            // set the result type to All Result
            if (newFestival === "Status View" && 
                selectedResultType !== "All Result" && 
                selectedResultType !== "Status of Festival") {
                newParams.set('resultType', "All Result");
            }

            return newParams;
        });
    };

    const handleResultTypeChange = (e) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('resultType', e.target.value);
            return newParams;
        });
        // Reset to first page when changing result type
        setCurrentPage(1);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // Calculate page numbers to show
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesDisplayed = 5;

        if (totalPages <= maxPagesDisplayed) {
            // Show all pages if total pages are less than or equal to max display
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            // Calculate start and end page numbers
            let startPage, endPage;

            if (currentPage <= 3) {
                // If current page is near the beginning
                startPage = 2;
                endPage = 4;
                pageNumbers.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
                pageNumbers.push('...');
            } else if (currentPage >= totalPages - 2) {
                // If current page is near the end
                pageNumbers.push('...');
                startPage = totalPages - 3;
                endPage = totalPages - 1;
                pageNumbers.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
            } else {
                // If current page is in the middle
                pageNumbers.push('...');
                pageNumbers.push(currentPage - 1);
                pageNumbers.push(currentPage);
                pageNumbers.push(currentPage + 1);
                pageNumbers.push('...');
            }

            // Always show last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    // Get paginated data
    const getPaginatedData = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        if (selectedResultType === 'School Points') {
            return filteredData.slice(indexOfFirstItem, indexOfLastItem);
        } else {
            return filteredResultData.slice(indexOfFirstItem, indexOfLastItem);
        }
    };

    // PDF generation function using html2pdf
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

        // Handle Status View case
        if (selectedFestival === "Status View" && selectedResultType === "Status of Festival") {
            // Get content from the printRef
            if (printRef.current) {
                const statusContent = printRef.current.cloneNode(true);
                pdfContent.appendChild(statusContent);
            } else {
                // Fallback message if no content is available
                const noContentMsg = document.createElement('p');
                noContentMsg.textContent = "No status content available for printing";
                noContentMsg.style.textAlign = 'center';
                pdfContent.appendChild(noContentMsg);
            }
        } else {
            // Create table clone
            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.style.marginTop = '20px';

            // Create table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            let headers = [];

            // Set the appropriate headers based on the selected result type
            if (selectedResultType === "School Points") {
                headers = ['Sl No', 'School Code', 'School Name', 'Point'];
            } else {
                headers = [
                    'Sl No', 'Item Code & Item Name', 'Reg No', 'Code No', 'Name', 
                    'No of participate', 'School name', 'Grade', 'Point'
                ];
            }

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

            if (selectedResultType === "School Points") {
                filteredData.forEach((school, index) => {
                    const row = document.createElement('tr');

                    // Add cells
                    const cellData = [
                        index + 1,
                        school.schoolCode || "-",
                        school.schoolName || "-",
                        school.point.toFixed(1) || "-"
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
                const displayData = filteredResultData.length > 0 ? filteredResultData : resultData;

                displayData.forEach((result, index) => {
                    const row = document.createElement('tr');

                    // Add cells
                    const cellData = [
                        index + 1,
                        result.itemCodeName || "-",
                        result.regNo || "-",
                        result.codeNo || "-",
                        result.name || "-",
                        result.noOfParticipate || "-",
                        result.schoolName || "-",
                        result.grade || "-",
                        result.point || "-"
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
            }

            table.appendChild(tbody);
            pdfContent.appendChild(table);
        }

        // PDF filename
        const fileName = `${selectedFestival.replace(/ /g, '_')}_${selectedResultType.replace(/ /g, '_')}.pdf`;

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

    // Initialize data at component mount
    useEffect(() => {
        if (allResultEntry.length === 0) {
            setResultEntry(resultData);
        }
    }, []);

    // Get current data slice for pagination
    const paginatedData = getPaginatedData();

    // Calculate index of first and last items on current page for display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Total number of items currently displayed
    const currentDataLength = selectedResultType === 'School Points' 
        ? filteredData.length 
        : filteredResultData.length;

    // Check if Status View is selected in the festival dropdown
    const isStatusViewSelected = selectedFestival === "Status View";

    // Check if Status of Festival is selected in the result type dropdown
    const isStatusOfFestivalSelected = selectedResultType === "Status of Festival";

    // CSS classes for animation
    const dropdownAnimationClass = dropdownAnimation 
    ? "transition-all transform duration-200 ease-in-out opacity-0" 
    : "transition-all transform duration-200 ease-in-out opacity-100";

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            {getPageHeading()}
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            {/* Only show the All Result & Status of Festival dropdown when Status View is selected */}
                            {isStatusViewSelected && (
                                <div className={`relative w-full sm:w-40 ${dropdownAnimationClass}`}>
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                        onChange={handleResultTypeChange}
                                        value={selectedResultType}
                                    >
                                        <option value="All Result">All Result</option>
                                        <option value="Status of Festival">Status of Festival</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>
                            )}

                            {/* Only show the Declared Result & School Points dropdown when Status View is NOT selected */}
                            {!isStatusViewSelected && (
                                <div className={`relative w-full sm:w-40 `}>
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                        onChange={handleResultTypeChange}
                                        value={selectedResultType}
                                    >
                                        <option value="Declared Result">Declared Result</option>
                                        <option value="School Points">School Points</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>
                            )}

                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    <option value="UP Kalaivizha">UP Kalaivizha</option>
                                    <option value="Lp Kalaivizha">Lp Kalaivizha</option>
                                    <option value="Hs Kalaivizha">Hs Kalaivizha</option>
                                    <option value="Hss Kalaivizha">Hss Kalaivizha</option>
                                    <option value="All Festival">All Festival</option>
                                    <option value="Status View">Status View</option>
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

                    {(selectedResultType === "School Points" || selectedResultType === "Declared Result" || selectedResultType === "All Result") && !isStatusOfFestivalSelected && (
                        <div className={`relative flex mb-5 w-full sm:w-64 md:w-80 `}>
                            <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                                <input 
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    type="text"
                                    placeholder={
                                        selectedResultType === "School Points" 
                                            ? "Search School Code or Name..." 
                                            : "Search Item, Code or Name..."
                                    }
                                    className="w-full bg-transparent outline-none text-sm"
                                    aria-label={
                                        selectedResultType === "School Points" 
                                            ? "Search by school code or name" 
                                            : "Search by item code, name, or school"
                                    }
                                />
                                <div className="text-gray-500">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Render StatusFest component when Status of Festival is selected */}
                    {isStatusOfFestivalSelected ? (
                        <div ref={printRef} >
                            <StatusFest festival={selectedFestival} />
                        </div>
                    ) : (
                        <div ref={printRef} className={`w-full `}>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                    <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                        {selectedResultType === "School Points" ? (
                                            <>
                                                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                                    <thead className="bg-gray-50">
                                                        <tr className="text-gray-700">
                                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code & Name</th>
                                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub district</th>
                                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                        {paginatedData.length > 0 ? (
                                                            paginatedData.map((school, index) => (
                                                                <tr key={index} className="hover:bg-gray-100">
                                                                    <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                                    <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolCode}-{school.schoolName}</td>
                                                                    <td className="p-2 md:p-3 whitespace-nowrap">{school.sub}</td>
                                                                    <td className="p-2 md:p-3 whitespace-nowrap">{school.point.toFixed(1)}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="4" className="p-3 text-center text-gray-500">
                                                                    No records found for {selectedFestival}
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                                {noResults && (
                                                    <div className="text-center py-8 bg-gray-50">
                                                        <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
                                                        <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                                <thead className="bg-gray-50">
                                                    <tr className="text-gray-700">
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of partcipate</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Sub district</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                    {paginatedData.length > 0 ? (
                                                        paginatedData.map((result, index) => (
                                                            <tr key={result.slNo} className="hover:bg-gray-100">
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCodeName}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.codeNo}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.name}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.noOfParticipate}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.schoolName}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.sub}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="9" className="p-3 text-center text-gray-500">
                                                                No records found for {selectedFestival}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        )}
                                         <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                  {/* Showing X of Y rows */}
                  <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                    {paginatedData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, paginatedData.length)} of ${paginatedData.length} rows` : '0 rows'}
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
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default DPublishdeclare

// import React, { useState, useEffect, useRef } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { getAllStageDurationsAPI } from '../services/allAPI'
// import html2pdf from 'html2pdf.js'

// const DPublishdeclare = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
//   const printRef = useRef();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedFestival, setSelectedFestival] = useState("ALL Festival");
//   const [schools, setSchools] = useState([]);
//   const [filteredSchools, setFilteredSchools] = useState([]);
//   const navigate = useNavigate();
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   // Festival mappings
//   const festivalOptions = [
//     { value: "ALL Festival", display: "ALL Festival" },
//     { value: "UP", display: "UP Kalaivizha", range: { min: 300, max: 399 } },
//     { value: "Lp", display: "LP Kalaivizha", range: { min: 400, max: 499 } },
//     { value: "Hs", display: "HS Kalaivizha", range: { min: 500, max: 599 } },
//     { value: "Hss", display: "HSS Kalaivizha", range: { min: 600, max: 699 } }
//   ];
  
//   // Same dummy data as before
//   const dummyData = [
//     { 
//       slno: 1, 
//       code: '304', 
//       name: 'Story Writing', 
//       dataEntered: 'Yes', 
//       confirmed: 'No', 
//       time: '90 min', 
//       participants: 2, 
//       completionTime: '1 hour 30 min', 
//       stage: 'Stage A', 
//       date: '28/03/2025', 
//       stageTime: '10:30 AM' 
//     },
//     // ... rest of dummy data
//     { 
//       slno: 2, 
//       code: '402', 
//       name: 'Group Song', 
//       dataEntered: 'Yes', 
//       confirmed: 'Yes', 
//       time: '60 min', 
//       participants: 4, 
//       completionTime: '55 min', 
//       stage: 'Stage B', 
//       date: '28/03/2025', 
//       stageTime: '11:00 AM' 
//     },
//     { 
//       slno: 3, 
//       code: '501', 
//       name: 'Drawing', 
//       dataEntered: 'Yes', 
//       confirmed: 'No', 
//       time: '120 min', 
//       participants: 3, 
//       completionTime: '1 hour 45 min', 
//       stage: 'Stage C', 
//       date: '29/03/2025', 
//       stageTime: '09:00 AM' 
//     },
//     { 
//       slno: 4, 
//       code: '601', 
//       name: 'Debate', 
//       dataEntered: 'Yes', 
//       confirmed: 'Yes', 
//       time: '45 min', 
//       participants: 1, 
//       completionTime: '40 min', 
//       stage: 'Stage A', 
//       date: '29/03/2025', 
//       stageTime: '02:15 PM' 
//     },
//     { 
//       slno: 5, 
//       code: '602', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     },
//     { 
//       slno: 6, 
//       code: '602', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     },
//     { 
//       slno: 7, 
//       code: '602', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     },
//     { 
//       slno: 8, 
//       code: '602', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     },
//     { 
//       slno: 9, 
//       code: '602', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     },
//     { 
//       slno: 10, 
//       code: '602', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     },
//     { 
//       slno: 11, 
//       code: '602', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     },
//     { 
//       slno: 12, 
//       code: '602', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     },
//     { 
//       slno:13, 
//       code: '302', 
//       name: 'Essay Writing', 
//       dataEntered: 'No', 
//       confirmed: 'No', 
//       time: '75 min', 
//       participants: 5, 
//       completionTime: '1 hour 10 min', 
//       stage: 'Stage B', 
//       date: '30/03/2025', 
//       stageTime: '10:00 AM' 
//     }
//   ];


//  // Pagination logic
//  const indexOfLastItem = currentPage * rowsPerPage;
//  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//  const currentItems = filteredSchools.slice(indexOfFirstItem, indexOfLastItem);
//  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage);

//  const handlePageChange = (pageNumber) => {
//      if (pageNumber > 0 && pageNumber <= totalPages) {
//          setCurrentPage(pageNumber);
//      }
//  };

//  const renderPageNumbers = () => {
//      const pageNumbers = [];
//      // Dynamically adjust number of page buttons based on screen size
//      const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;
     
//      if (totalPages <= maxPageNumbersToShow) {
//          // Show all page numbers
//          for (let i = 1; i <= totalPages; i++) {
//              pageNumbers.push(i);
//          }
//      } else {
//          // Show limited page numbers with dots
//          if (currentPage <= 2) {
//              // Near the start
//              for (let i = 1; i <= 3; i++) {
//                  if (i <= totalPages) pageNumbers.push(i);
//              }
//              if (totalPages > 3) {
//                  pageNumbers.push('...');
//                  pageNumbers.push(totalPages);
//              }
//          } else if (currentPage >= totalPages - 1) {
//              // Near the end
//              pageNumbers.push(1);
//              pageNumbers.push('...');
//              for (let i = totalPages - 2; i <= totalPages; i++) {
//                  if (i > 0) pageNumbers.push(i);
//              }
//          } else {
//              // Middle
//              pageNumbers.push(1);
//              if (currentPage > 3) pageNumbers.push('...');
//              pageNumbers.push(currentPage - 1);
//              pageNumbers.push(currentPage);
//              pageNumbers.push(currentPage + 1);
//              if (currentPage < totalPages - 2) pageNumbers.push('...');
//              pageNumbers.push(totalPages);
//          }
//      }
     
//      return pageNumbers;
//  };


//   useEffect(() => {
//     fetchStageDurations();
//   }, []);

//   const fetchStageDurations = async () => {
//     try {
//       setLoading(true);
//       const token = sessionStorage.getItem("token");
      
//       let apiData = [];
//       let useOnlyDummyData = false;
      
//       try {
//         if (token) {
//           const reqHeader = {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//           };
          
//           const result = await getAllStageDurationsAPI(reqHeader);
          
//           if (result.status === 200) {
//             apiData = result.data.map((item, index) => ({
//               slno: index + 1,
//               code: item.itemCode,
//               name: item.itemName,
//               time: item.time,
//               participants: item.participants,
//               completionTime: item.completionTime,
//               stage: item.stage || 'TBD',
//               date: item.date || 'Pending',
//               stageTime: item.timeSecond || 'TBD'
//             }));
//           }
//         }
//       } catch (apiError) {
//         console.error("API call failed, using only dummy data:", apiError);
//         useOnlyDummyData = true;
//       }
      
//       if (apiData.length > 0 && !useOnlyDummyData) {
//         setSchools([...apiData, ...dummyData]);
//       } else {
//         setSchools(dummyData);
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error("Error in fetchStageDurations:", err);
//       setError("Could not load data. Using sample data instead.");
      
//       setSchools(dummyData);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initialSearchTerm = searchParams.get('code') || '';
//     setSearchTerm(initialSearchTerm);
    
//     applyFilters(initialSearchTerm, selectedFestival);
//   }, [searchParams, schools, selectedFestival]);

//   const handleSearchChange = (event) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//     setSearchParams({ code: newSearchTerm, festival: selectedFestival });
//     applyFilters(newSearchTerm, selectedFestival);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   const handleFestivalChange = (e) => {
//     const festival = e.target.value;
//     setSelectedFestival(festival);
//     setSearchParams({ code: searchTerm, festival });
//     applyFilters(searchTerm, festival);
//     setCurrentPage(1); // Reset to first page when changing festival
//   };

//   const applyFilters = (term, festival) => {
//     if (!schools.length) return;
    
//     let festivalFiltered = [];
    
//     if (festival !== "ALL Festival") {
//       // Find the festival option with the matching value
//       const festivalOption = festivalOptions.find(option => option.value === festival);
      
//       if (festivalOption && festivalOption.range) {
//         // Filter by festival code range
//         festivalFiltered = schools.filter(item => {
//           const itemCode = parseInt(item.code);
//           return itemCode >= festivalOption.range.min && itemCode <= festivalOption.range.max;
//         });
//       } else {
//         festivalFiltered = [...schools]; // No matching festival range found
//       }
//     } else {
//       festivalFiltered = [...schools]; // "ALL Festival" selected
//     }

//     if (term) {
//       const lowercasedTerm = term.toLowerCase();
//       const results = festivalFiltered.filter(school =>
//         school.code.toLowerCase().includes(lowercasedTerm) ||
//         school.name.toLowerCase().includes(lowercasedTerm)
//       );
//       setFilteredSchools(results);
//     } else {
//       setFilteredSchools(festivalFiltered);
//     }

//     setFilteredSchools(prevFiltered => 
//       prevFiltered.map((item, index) => ({
//         ...item,
//         slno: index + 1
//       }))
//     );
//   };

//   const getPrintTitle = () => {
//     const festival = festivalOptions.find(option => option.value === selectedFestival);
//     if (festival) {
//       if (festival.value === "ALL Festival") {
//         return "ALL Festival - Stage Duration List Report";
//       } else {
//         return `${festival.display.split(" ")[0]} - Stage Duration List Report`;
//       }
//     }
//     return " Stage Duration List Report";
//   };

//   const handlePrint = () => {
//     // Create a new div for PDF content
//     const pdfContent = document.createElement('div');
    
//     // Add title
//     const titleElement = document.createElement('h2');
//     titleElement.textContent = getPrintTitle();
//     titleElement.style.textAlign = 'center';
//     titleElement.style.margin = '20px 0';
//     titleElement.style.fontWeight = 'bold';
//     pdfContent.appendChild(titleElement);

//     // Create table clone
//     const table = document.createElement('table');
//     table.style.width = '100%';
//     table.style.borderCollapse = 'collapse';
//     table.style.marginTop = '20px';
    
//     // Create table header
//     const thead = document.createElement('thead');
//     const headerRow = document.createElement('tr');
    
//     const headers = [
//       'Sl No', 
//       'Item Code', 
//       'Item Name', 
//       'Time', 
//       'Participants', 
//       'Completion Time', 
//       'Stage', 
//       'Date', 
//       'Time'
//     ];
    
//     headers.forEach(headerText => {
//       const th = document.createElement('th');
//       th.textContent = headerText;
//       th.style.border = '1px solid #ddd';
//       th.style.padding = '8px';
//       th.style.backgroundColor = '#f2f2f2';
//       th.style.fontWeight = 'bold';
//       headerRow.appendChild(th);
//     });
    
//     thead.appendChild(headerRow);
//     table.appendChild(thead);
    
//     // Create table body
//     const tbody = document.createElement('tbody');
    
//     filteredSchools.forEach((school, index) => {
//       const row = document.createElement('tr');
      
//       // Add cells
//       const cellData = [
//         index + 1,
//         school.code || "-",
//         school.name || "-",
//         school.time || "-",
//         school.participants || "-",
//         school.completionTime || "-",
//         school.stage || "-",
//         school.date || "-",
//         school.stageTime || "-"
//       ];
      
//       cellData.forEach(text => {
//         const td = document.createElement('td');
//         td.textContent = text;
//         td.style.border = '1px solid #ddd';
//         td.style.padding = '8px';
//         td.style.textAlign = 'center';
//         row.appendChild(td);
//       });
      
//       tbody.appendChild(row);
//     });
    
//     table.appendChild(tbody);
//     pdfContent.appendChild(table);
    
//     // PDF filename
//     const fileName = `${selectedFestival.replace(/ /g, '_')}_Stage_Duration_List.pdf`;
    
//     // PDF options
//     const options = {
//       margin: 10,
//       filename: fileName,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // Use landscape for wider tables
//     };
    
//     // Generate and download PDF
//     html2pdf().from(pdfContent).set(options).save();
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     setSearchParams(new URLSearchParams({ festival: selectedFestival }));
//     applyFilters('', selectedFestival);
//     setCurrentPage(1); // Reset to first page when clearing search
//   };

//   // Helper function to get display name for a festival value
//   const getFestivalDisplayName = (value) => {
//     const festival = festivalOptions.find(option => option.value === value);
//     return festival ? festival.display : value;
//   };

//   const handleAddClick = () => {
//     navigate('/DAddStagedurat');
//   };
  
//   return (
//     <>
//       <Header />
//       <div className="flex flex-col md:flex-row min-h-screen">
//         <Dash />
//         <div className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-hidden">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//             <h2 className="text-lg md:text-xl font-semibold tracking-wide">
//               Stage Duration List
//             </h2>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
//               <button onClick={handleAddClick} className="text-blue-500 border border-blue-500 py-2 px-6 rounded-full flex items-center">
//                 Add Stage Duration
//               </button>
              
//               {/* UPDATED: Festival filter with floating label */}
//               <div className="relative w-full sm:w-auto">
//                 <select
//                   className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
//                   id="festival-select"
//                   onChange={handleFestivalChange}
//                   value={selectedFestival}
//                 >
//                   {festivalOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.display}
//                     </option>
//                   ))}
//                 </select>
//                 <label
//                   htmlFor="festival-select"
//                   className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
//                 >
//                   Festival
//                 </label>
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
//                   <i className="fa-solid fa-chevron-down"></i>
//                 </div>
//               </div>
              
//               <button 
//                 onClick={handlePrint}
//                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-6 md:px-8 py-2 rounded-full text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 aria-label="Print Stage Duration List"
//               >
//                 Print
//               </button>
//             </div>
//           </div>
          
//           {/* Search bar with clear button */}
//           <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
//             <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
//               <input
//                 type="text"
//                 placeholder="Search Item Code or Name..."
//                 className="w-full bg-transparent outline-none text-sm"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 aria-label="Search by item code or name"
//               />
//               <div className="text-gray-500">
//                 <i className="fa-solid fa-magnifying-glass"></i>
//               </div>
//             </div>
//             {searchTerm && (
//               <button
//                 onClick={clearSearch}
//                 className="ml-2 text-blue-600 hover:text-blue-800"
//                 aria-label="Clear search"
//               >
//                 <i className="fa-solid fa-xmark"></i>
//               </button>
//             )}
//           </div>
          
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-4">
//               <p className="flex items-center">
//                 <i className="fa-solid fa-triangle-exclamation mr-2"></i>
//                 {error}
//               </p>
//             </div>
//           ) : (
//             <div>
//               <div className="overflow-x-auto rounded-lg bg-white">
//                 <div ref={printRef} className="min-w-full">
//                   <table className="min-w-full text-center">
//                     <thead>
//                       <tr className="bg-gray-50">
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 z-10">Sl No</th>
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item Code</th>
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item Name&Item Name</th>
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700"> Time</th>
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Participants</th>
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Completion Time</th>
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Stage</th>
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Date</th>
//                         <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Start Time</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentItems.length > 0 ? (
//                         currentItems.map((school, index) => (
//                           <tr key={school.slno} className="hover:bg-gray-50 b text-gray-700">
//                             <td className="p-2 md:p-3 text-xs md:text-sm bg-white z-10">{indexOfFirstItem + index + 1}</td>
//                             <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.code}</td>
//                             <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.name}</td>
//                             <td className="p-2 md:p-3 text-xs md:text-sm">{school.time}</td>
//                             <td className="p-2 md:p-3 text-xs md:text-sm">{school.participants}</td>
//                             <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.completionTime}</td>
//                             <td className="p-2 md:p-3 text-xs md:text-sm">{school.stage}</td>
//                             <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.date}</td>
//                             <td className="p-2 md:p-3 text-xs md:text-sm">{school.stageTime}</td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="9" className="p-6 text-center text-gray-600">
//                             <div className="flex flex-col items-center justify-center gap-2">
//                               <i className="fa-solid fa-search text-2xl text-gray-400"></i>
//                               <p>No items found for {getFestivalDisplayName(selectedFestival)}</p>
//                               {searchTerm && (
//                                 <button
//                                   onClick={clearSearch}
//                                   className="text-blue-500 hover:text-blue-700 text-sm mt-1"
//                                 >
//                                   Clear search
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                   {/* Showing X of Y rows */}
//                   <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                     {filteredSchools.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredSchools.length)} of ${filteredSchools.length} rows` : '0 rows'}
//                   </div>
                  
//                   {/* Pagination Controls */}
//                   <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                     {/* Previous Button with icon */}
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                     >
//                       <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                       <span className="hidden sm:inline p-1">Previous</span>
//                     </button>
                    
//                     {/* Page Numbers */}
//                     <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                       {renderPageNumbers().map((page, index) => (
//                         <button
//                           key={index}
//                           onClick={() => page !== '...' && handlePageChange(page)}
//                           className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${
//                             currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
//                           } ${page === '...' ? 'pointer-events-none' : ''}`}
//                         >
//                           {page}
//                         </button>
//                       ))}
//                     </div>
                    
//                     {/* Next Button with icon */}
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages || totalPages === 0}
//                       className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
//                     >
//                       <span className="hidden sm:inline p-1">Next</span>
//                       <i className="fa-solid fa-angle-right"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DPublishdeclare


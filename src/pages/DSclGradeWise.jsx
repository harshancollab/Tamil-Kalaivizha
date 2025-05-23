import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useSearchParams } from 'react-router-dom';
import { getAllsclGradewiseAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const DSclGradeWise = () => {
    const [allResultData, setAllResultData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

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

    // Initialize values from session storage if available, otherwise use URL params or defaults
    const getInitialFestival = () => {
        const sessionFestival = sessionStorage.getItem("selectedFestival");
        const urlFestival = searchParams.get('festival');
        return sessionFestival || urlFestival || "UP Kalaivizha";
    };

    const getInitialGrade = () => {
        const sessionGrade = sessionStorage.getItem("selectedGrade");
        const urlGrade = searchParams.get('grade');
        return sessionGrade || urlGrade || "All Grade";
    };

    const getInitialSubDistrict = () => {
        const sessionSubDistrict = sessionStorage.getItem("selectedSubDistrict");
        const urlSubDistrict = searchParams.get('subDistrict');
        return sessionSubDistrict || urlSubDistrict || "Select Sub District";
    };

    const selectedFestival = getInitialFestival();
    const selectedGrade = getInitialGrade();
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(getInitialSubDistrict());
    const searchQuery = searchParams.get('search') || '';

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Update URL params based on initial values
    useEffect(() => {
        const newParams = new URLSearchParams();
        newParams.set('festival', selectedFestival);
        newParams.set('grade', selectedGrade);
        if (selectedSubDistrict !== 'Select Sub District') {
            newParams.set('subDistrict', selectedSubDistrict);
        }
        setSearchParams(newParams);
        
        // Initialize search text from URL on component mount
        if (searchQuery) {
            setSearchText(searchQuery);
        }
    }, []);

    // Dummy data with item codes and sub-districts to help with filtering
    const dummyResultData = [
        { slNo: 1, participantName: "John Doe", schoolName: "Central High", item: "Story Writing", itemCode: "301", category: "Single", points: 9.5, grade: "B", subDistrict: "Munnar" },
        { slNo: 2, participantName: "Jane Smith", schoolName: "Springfield Elementary", item: "Story Writing", itemCode: "302", category: "Single", points: 10.0, grade: "A", subDistrict: "Adimali" },
        { slNo: 3, participantName: "Alex Johnson", schoolName: "Oak Ridge School", item: "Story Writing", itemCode: "303", category: "Single", points: 9.0, grade: "A", subDistrict: "Kattappana" },
        { slNo: 4, participantName: "Sara Williams", schoolName: "Liberty Middle School", item: "Group Song", itemCode: "401", category: "Group", points: 8.0, grade: "B", subDistrict: "Nedumkandam" },
        { slNo: 5, participantName: "Michael Brown", schoolName: "Riverdale Academy", item: "Painting", itemCode: "402", category: "Single", points: 5, grade: "C", subDistrict: "Devikulam" },
        { slNo: 6, participantName: "Emily Davis", schoolName: "Westview High", item: "Classical Dance", itemCode: "501", category: "Single", points: 8.5, grade: "B", subDistrict: "Chittur" },
        { slNo: 7, participantName: "David Wilson", schoolName: "Pinewood Elementary", item: "Recitation", itemCode: "502", category: "Single", points: 7.5, grade: "B", subDistrict: "Pattambi" },
        { slNo: 8, participantName: "Sophie Miller", schoolName: "Greenwood School", item: "Folk Dance", itemCode: "601", category: "Group", points: 8.0, grade: "C", subDistrict: "Munnar" },
        { slNo: 9, participantName: "Robert Taylor", schoolName: "Greenwood School", item: "Folk Dance", itemCode: "601", category: "Group", points: 8.0, grade: "C", subDistrict: "Adimali" },
        { slNo: 10, participantName: "Emma Johnson", schoolName: "Central High", item: "Essay Writing", itemCode: "302", category: "Single", points: 7.2, grade: "B", subDistrict: "Kattappana" },
        { slNo: 11, participantName: "Noah Garcia", schoolName: "Riverdale Academy", item: "Poetry", itemCode: "303", category: "Single", points: 8.8, grade: "C", subDistrict: "Nedumkandam" },
        { slNo: 12, participantName: "Olivia Martinez", schoolName: "Springfield Elementary", item: "Debate", itemCode: "401", category: "Group", points: 7.9, grade: "B", subDistrict: "Devikulam" },
        { slNo: 13, participantName: "Liam Rodriguez", schoolName: "Oak Ridge School", item: "Solo Music", itemCode: "502", category: "Single", points: 8.7, grade: "B", subDistrict: "Chittur" },
        { slNo: 14, participantName: "Ava Lopez", schoolName: "Westview High", item: "Drama", itemCode: "601", category: "Group", points: 7.5, grade: "C", subDistrict: "Pattambi" }
    ];

    useEffect(() => {
        getAllResultData();
    }, []);

    useEffect(() => {
        filterDataByFestivalGradeSubDistrictAndSearch();

        // Save selections to session storage whenever they change
        sessionStorage.setItem("selectedFestival", selectedFestival);
        sessionStorage.setItem("selectedGrade", selectedGrade);
        sessionStorage.setItem("selectedSubDistrict", selectedSubDistrict);
    }, [selectedFestival, selectedGrade, selectedSubDistrict, searchText, allResultData]);

    const getAllResultData = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                setLoading(true);
                // Simulate loading progress
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += 10;
                    if (progress <= 90) {
                        setLoadingProgress(progress);
                    } else {
                        clearInterval(progressInterval);
                    }
                }, 200);
                
                const result = await getAllsclGradewiseAPI(reqHeader)
                clearInterval(progressInterval);
                setLoadingProgress(100);
                
                if (result.status === 200) {
                    setAllResultData(result.data);
                }
                
                // Add a small delay to show 100% progress before hiding the loader
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            } catch (err) {
                console.log(err);
                setAllResultData(dummyResultData);
                setLoading(false);
            }
        } else {
            setAllResultData(dummyResultData);
            setLoading(false);
        }
    }

    const filterDataByFestivalGradeSubDistrictAndSearch = () => {
        if (!allResultData.length) return;

        // Step 1: Filter by festival (based on item code ranges)
        let festivalFiltered;
        switch (selectedFestival) {
            case "UP Kalaivizha":
                festivalFiltered = allResultData.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 300 && itemCode < 400;
                });
                break;
            case "LP Kalaivizha":
                festivalFiltered = allResultData.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 400 && itemCode < 500;
                });
                break;
            case "HS Kalaivizha":
                festivalFiltered = allResultData.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 500 && itemCode < 600;
                });
                break;
            case "HSS Kalaivizha":
                festivalFiltered = allResultData.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 600 && itemCode < 700;
                });
                break;
            case "All Festival":
                festivalFiltered = [...allResultData];
                break;
            default:
                festivalFiltered = [...allResultData];
        }

        // Step 2: Filter by grade
        let gradeFiltered;
        if (selectedGrade === "All Grade") {
            gradeFiltered = festivalFiltered;
        } else {
            gradeFiltered = festivalFiltered.filter(item => {
                const grade = item.grade ? item.grade.toUpperCase() : "";
                
                if (selectedGrade === "Grade A") {
                    return ["A", "A+", "A-"].includes(grade);
                } else if (selectedGrade === "Grade B") {
                    return ["B", "B+", "B-"].includes(grade);
                } else if (selectedGrade === "Grade C") {
                    return ["C", "C+", "C-"].includes(grade);
                }
                return false; // Default case if none match
            });
        }

        // Step 3: Filter by sub-district
        let subDistrictFiltered;
        if (selectedSubDistrict === "Select Sub District") {
            subDistrictFiltered = gradeFiltered;
        } else {
            subDistrictFiltered = gradeFiltered.filter(item => 
                item.subDistrict === selectedSubDistrict
            );
        }

        // Step 4: Filter by search text
        let searchFiltered = subDistrictFiltered;
        if (searchText && searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase().trim();
            searchFiltered = subDistrictFiltered.filter(item => 
                (item.participantName && item.participantName.toLowerCase().includes(searchLower)) || 
                (item.schoolName && item.schoolName.toLowerCase().includes(searchLower))
            );
        }

        // Step 5: Add sequential numbering
        const numberedResults = searchFiltered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredData(numberedResults);
        // Reset to first page when filters change
        setCurrentPage(1);
    }

    const getPrintTitle = () => {
        let festivalTitle;
        switch (selectedFestival) {
            case "UP Kalaivizha": festivalTitle = "UP Tamil Kalaivizha"; break;
            case "LP Kalaivizha": festivalTitle = "LP Tamil Kalaivizha"; break;
            case "HS Kalaivizha": festivalTitle = "HS Tamil Kalaivizha"; break;
            case "HSS Kalaivizha": festivalTitle = "HSS Tamil Kalaivizha"; break;
            case "All Festival": festivalTitle = "All Festival Tamil Kalaivizha"; break;
            default: festivalTitle = "Tamil Kalaivizha"; break;
        }

        const subDistrictPart = selectedSubDistrict === "Select Sub District" ? "" : ` - ${selectedSubDistrict}`;
        return `${festivalTitle} - ${selectedGrade}${subDistrictPart} - School Wise Report`;
    };

    const handleFestivalChange = (e) => {
        const newFestival = e.target.value;
        const newParams = new URLSearchParams();
        newParams.set('festival', newFestival);
        newParams.set('grade', selectedGrade);
        if (selectedSubDistrict !== 'Select Sub District') {
            newParams.set('subDistrict', selectedSubDistrict);
        }
        setSearchParams(newParams);

        // Update session storage
        sessionStorage.setItem("selectedFestival", newFestival);
    };

    const handleGradeChange = (e) => {
        const newGrade = e.target.value;
        const newParams = new URLSearchParams();
        newParams.set('festival', selectedFestival);
        newParams.set('grade', newGrade);
        if (selectedSubDistrict !== 'Select Sub District') {
            newParams.set('subDistrict', selectedSubDistrict);
        }
        setSearchParams(newParams);

        // Update session storage
        sessionStorage.setItem("selectedGrade", newGrade);
    };

    const handleSubDistrictChange = (e) => {
        const newSubDistrict = e.target.value;
        setSelectedSubDistrict(newSubDistrict);
        
        const newParams = new URLSearchParams();
        newParams.set('festival', selectedFestival);
        newParams.set('grade', selectedGrade);
        if (newSubDistrict !== 'Select Sub District') {
            newParams.set('subDistrict', newSubDistrict);
        }
        setSearchParams(newParams);
        
        // Update session storage
        sessionStorage.setItem("selectedSubDistrict", newSubDistrict);
    };

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
        // The useEffect will handle filtering as the user types
    };

    const clearSearch = () => {
        setSearchText('');
        // The useEffect will handle filtering
    };

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
        
        const headers = ['Sl No', 'Name of Participants', 'School Name','Sub District',  'Item', 'Points', 'Grade'];
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
        
        // Use all filtered data for PDF rather than just current page
        filteredData.forEach((item, index) => {
          const row = document.createElement('tr');
          
          // Add cells
          const cellData = [
            item.slNo,
            item.participantName || "-",
            item.schoolName || "-",
            item.subDistrict || "-",
        
            item.item || "-",
            item.points || "-",
            item.grade || "-"
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
        const fileName = `${selectedFestival.replace(/ /g, '_')}_${selectedGrade.replace(/ /g, '_')}${selectedSubDistrict !== 'Select Sub District' ? '_' + selectedSubDistrict.replace(/ /g, '_') : ''}_Report.pdf`;
        
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

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                        <div className="text-center w-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 mb-2">Loading results data...</p>
                            
                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                                    style={{ width: `${loadingProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500">{loadingProgress}% complete</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-xl font-bold leading-none">
                            School Grade Wise List
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                           
                            {/* Grade Select with floating label */}
                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="grade-select"
                                    onChange={handleGradeChange}
                                    value={selectedGrade}
                                >
                                    <option value="All Grade">All Grade</option>
                                    <option value="Grade A">Grade A</option>
                                    <option value="Grade B">Grade B</option>
                                    <option value="Grade C">Grade C</option>
                                </select>
                                <label
                                    htmlFor="grade-select"
                                    className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                                >
                                    Grade
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>

                            {/* Festival Select with floating label */}
                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="festival-select"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    <option value="All Festival">All Festival</option>
                                    <option value="UP Kalaivizha">UP Kalaivizha</option>
                                    <option value="LP Kalaivizha">LP Kalaivizha</option>
                                    <option value="HS Kalaivizha">HS Kalaivizha</option>
                                    <option value="HSS Kalaivizha">HSS Kalaivizha</option>
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

                    {/* Search input with icon */}
                    <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
                        <input
                            type="text"
                            placeholder="Search participant or school..."
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
                                <div id="school-grade-table-container" ref={printRef} className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name of Participants</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code & Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>

                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems && currentItems.length > 0 ? (
                                                currentItems.map((result) => (
                                                    <tr key={result.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.participantName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCode}-{result.schoolName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.subDistrict}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.item}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.points}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="p-3 text-center text-gray-500">
                                                        {searchText 
                                                            ? `No records found matching "${searchText}" in ${selectedFestival} with ${selectedGrade} in ${selectedSubDistrict !== 'Select Sub District' ? selectedSubDistrict : 'any Sub District'}` 
                                                            : `No records found for ${selectedFestival} with ${selectedGrade} in ${selectedSubDistrict !== 'Select Sub District' ? selectedSubDistrict : 'any Sub District'}`}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination controls */}
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
        </>
    );
};

export default DSclGradeWise
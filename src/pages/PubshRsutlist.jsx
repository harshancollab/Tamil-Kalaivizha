import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { getAllPublishentryListAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js'

const PublishResultList = () => {
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const selectedResultType = searchParams.get('resultType') || "Declared Result";
    const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
    const [filteredData, setFilteredData] = useState([]);
    const [filteredResultData, setFilteredResultData] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [allResultEntry, setResultEntry] = useState([]);

    useEffect(() => {
        // getAllresultentry();
    }, []);

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
            schoolCode: "SMHS-01",
            grade: "A",
            point: 9.5
        },
        {
            slNo: 2,
            itemCodeName: "302 - Essay Writing",
            itemCode: "302",
            regNo: "1002",
            codeNo: "SN-102",
            name: "Priya Singh",
            noOfParticipate: 1,
            schoolName: "Modern Public School",
            schoolCode: "MPS-02",
            grade: "A+",
            point: 10.0
        },
        {
            slNo: 3,
            itemCodeName: "303 - Elocution",
            itemCode: "303",
            regNo: "1003",
            codeNo: "SN-103",
            name: "Ahmed Khan",
            noOfParticipate: 1,
            schoolName: "Delhi Public School",
            schoolCode: "DPS-03",
            grade: "A-",
            point: 9.0
        },
        {
            slNo: 4,
            itemCodeName: "401 - Group Dance",
            itemCode: "401",
            regNo: "1004",
            codeNo: "GR-104",
            name: "Dance Team A",
            noOfParticipate: 8,
            schoolName: "Kendriya Vidyalaya",
            schoolCode: "KV-04",
            grade: "B+",
            point: 8.0
        },
        {
            slNo: 5,
            itemCodeName: "402 - Music",
            itemCode: "402",
            regNo: "1005",
            codeNo: "SN-105",
            name: "Meera Patel",
            noOfParticipate: 1,
            schoolName: "St. Xavier's School",
            schoolCode: "SXS-05",
            grade: "A",
            point: 9.5
        },
        {
            slNo: 6,
            itemCodeName: "501 - Quiz",
            itemCode: "501",
            regNo: "1006",
            codeNo: "GR-106",
            name: "Quiz Team B",
            noOfParticipate: 3,
            schoolName: "DAV Public School",
            schoolCode: "DAV-06",
            grade: "B+",
            point: 8.5
        },
        {
            slNo: 7,
            itemCodeName: "502 - Painting",
            itemCode: "502",
            regNo: "007",
            codeNo: "SN-107",
            name: "Sofia Thomas",
            noOfParticipate: 1,
            schoolName: "Army Public School",
            schoolCode: "APS-07",
            grade: "B",
            point: 7.5
        },
        {
            slNo: 8,
            itemCodeName: "601 - Drama",
            itemCode: "601",
            regNo: "1008",
            codeNo: "GR-108",
            name: "Drama Team C",
            noOfParticipate: 6,
            schoolName: "Ryan International School",
            schoolCode: "RIS-08",
            grade: "B+",
            point: 8.0
        }
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
        filterSchools(initialSearchTerm);
    }, [searchParams]);

    // Check if we need to update result type when festival changes
    useEffect(() => {
        // If Status View is selected and result type is All Result, keep it
        // Otherwise if Status View is selected and result type is not All Result or Status of Festival,
        // set it to Declared Result
        if (selectedFestival === "Status View") {
            if (selectedResultType !== "All Result" && selectedResultType !== "Status of Festival") {
                setSearchParams(prev => {
                    const newParams = new URLSearchParams(prev);
                    newParams.set('resultType', "Declared Result");
                    return newParams;
                });
            }
        }
    }, [selectedFestival]);

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('code', newSearchTerm);
            return newParams;
        });
        filterSchools(newSearchTerm);
    };

    const filterSchools = (term, schoolData = null) => {
        const dataToFilter = schoolData || filteredData.length > 0 ? filteredData : getSchoolPointsData();
        const lowercasedTerm = term.toLowerCase();
        
        if (!term.trim()) {
            setFilteredData(dataToFilter);
            setNoResults(false);
            return;
        }
        
        const results = dataToFilter.filter(school =>
            school.schoolCode.toLowerCase().includes(lowercasedTerm) ||
            school.schoolName.toLowerCase().includes(lowercasedTerm)
        );
        
        setFilteredData(results);
        setNoResults(results.length === 0);
    };

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
            // set the result type to Declared Result
            if (newFestival === "Status View" && 
                selectedResultType !== "All Result" && 
                selectedResultType !== "Status of Festival") {
                newParams.set('resultType', "Declared Result");
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
    };

    // New PDF generation function using html2pdf
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

    // Determine what data to display
    const displayResultData = filteredResultData.length > 0 ? filteredResultData : resultData;

    // Check if Status View is selected in the festival dropdown
    const isStatusViewSelected = selectedFestival === "Status View";

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
                                <div className="relative w-full sm:w-40">
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
                                <div className="relative w-full sm:w-40">
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

                    {selectedResultType === "School Points" && (
                        <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
                            <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                                <input 
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    type="text"
                                    placeholder="Search School Code or Name..."
                                    className="w-full bg-transparent outline-none text-sm"
                                    aria-label="Search by school code or name"
                                />
                                <div className="text-gray-500">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={printRef} className="w-full">
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    {selectedResultType === "School Points" ? (
                                        <>
                                            <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                                <thead className="bg-gray-50">
                                                    <tr className="text-gray-700">
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                                        <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                    {filteredData.length > 0 ? (
                                                        filteredData.map((school, index) => (
                                                            <tr key={index} className="hover:bg-gray-100">
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{index + 1}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolCode}</td>
                                                                <td className="p-2 md:p-3 whitespace-nowrap">{school.schoolName}</td>
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
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                {displayResultData.length > 0 ? (
                                                    displayResultData.map((result) => (
                                                        <tr key={result.slNo} className="hover:bg-gray-100">
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCodeName}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{result.codeNo}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{result.name}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{result.noOfParticipate}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{result.schoolName}</td>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublishResultList
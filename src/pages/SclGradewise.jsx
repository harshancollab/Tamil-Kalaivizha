import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useSearchParams } from 'react-router-dom';
import { getAllsclGradewiseAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const SclGradewise = () => {
    const [allResultData, setAllResultData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize values from session storage if available, otherwise use URL params or defaults
    const getInitialFestival = () => {
        const sessionFestival = sessionStorage.getItem("selectedFestival");
        const urlFestival = searchParams.get('festival');
        return sessionFestival || urlFestival || "UP Kalaivizha";
    };

    const getInitialGrade = () => {
        const sessionGrade = sessionStorage.getItem("selectedGrade");
        const urlGrade = searchParams.get('grade');
        return sessionGrade || urlGrade || "Grade A";
    };

    const selectedFestival = getInitialFestival();
    const selectedGrade = getInitialGrade();

    // Update URL params based on initial values
    useEffect(() => {
        setSearchParams({
            festival: selectedFestival,
            grade: selectedGrade
        });
    }, []);

    // Dummy data with item codes to help with filtering
    const dummyResultData = [
        { slNo: 1, participantName: "John Doe", schoolName: "Central High", item: "Story Writing", itemCode: "301", category: "Single", points: 9.5, grade: "A" },
        { slNo: 2, participantName: "Jane Smith", schoolName: "Springfield Elementary", item: "Story Writing", itemCode: "302", category: "Single", points: 10.0, grade: "A" },
        { slNo: 3, participantName: "Alex Johnson", schoolName: "Oak Ridge School", item: "Story Writing", itemCode: "303", category: "Single", points: 9.0, grade: "A" },
        { slNo: 4, participantName: "Sara Williams", schoolName: "Liberty Middle School", item: "Group Song", itemCode: "401", category: "Group", points: 8.0, grade: "B" },
        { slNo: 5, participantName: "Michael Brown", schoolName: "Riverdale Academy", item: "Painting", itemCode: "402", category: "Single", points: 9.5, grade: "A" },
        { slNo: 6, participantName: "Emily Davis", schoolName: "Westview High", item: "Classical Dance", itemCode: "501", category: "Single", points: 8.5, grade: "B" },
        { slNo: 7, participantName: "David Wilson", schoolName: "Pinewood Elementary", item: "Recitation", itemCode: "502", category: "Single", points: 7.5, grade: "B" },
        { slNo: 8, participantName: "Sophie Miller", schoolName: "Greenwood School", item: "Folk Dance", itemCode: "601", category: "Group", points: 8.0, grade: "C" }
    ];

    useEffect(() => {
        getAllResultData();
    }, []);

    useEffect(() => {
        filterDataByFestivalAndGrade();

        // Save selections to session storage whenever they change
        sessionStorage.setItem("selectedFestival", selectedFestival);
        sessionStorage.setItem("selectedGrade", selectedGrade);
    }, [selectedFestival, selectedGrade, allResultData]);

    const getAllResultData = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllsclGradewiseAPI(reqHeader)
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

    const filterDataByFestivalAndGrade = () => {
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
                if (selectedGrade === "Grade A") return ["A", "A+", "A-"].includes(item.grade);
                if (selectedGrade === "Grade B") return ["B", "B+", "B-"].includes(item.grade);
                if (selectedGrade === "Grade C") return ["C", "C+", "C-"].includes(item.grade);
                return true;
            });
        }

        // Step 3: Add sequential numbering
        const numberedResults = gradeFiltered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredData(numberedResults);
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

        return `${festivalTitle} - ${selectedGrade} - School Wise Report`;
    };

    const handleFestivalChange = (e) => {
        const newFestival = e.target.value;
        setSearchParams({
            festival: newFestival,
            grade: selectedGrade
        });

        // Update session storage
        sessionStorage.setItem("selectedFestival", newFestival);
    };

    const handleGradeChange = (e) => {
        const newGrade = e.target.value;
        setSearchParams({
            festival: selectedFestival,
            grade: newGrade
        });

        // Update session storage
        sessionStorage.setItem("selectedGrade", newGrade);
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
        
        const headers = ['Sl No', 'Name of Participants', 'School Name', 'Item', 'Points', 'Grade'];
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
        
        // Use displayData to populate the PDF
        displayData.forEach((item, index) => {
          const row = document.createElement('tr');
          
          // Add cells
          const cellData = [
            item.slNo,
            item.participantName || "-",
            item.schoolName || "-",
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
        const fileName = `${selectedFestival.replace(/ /g, '_')}_${selectedGrade.replace(/ /g, '_')}_Report.pdf`;
        
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

    // Determine what data to display
    const displayData = filteredData.length > 0 ? filteredData :
        (allResultData.length > 0 ? allResultData : dummyResultData);

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
                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                    onChange={handleGradeChange}
                                    value={selectedGrade}
                                >
                                    <option value="All Grade">All Grade</option>
                                    <option value="Grade A">Grade A</option>
                                    <option value="Grade B">Grade B</option>
                                    <option value="Grade C">Grade C</option>

                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
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

                    <div className="w-full">
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div id="school-grade-table-container" className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name of Participants</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {displayData.length > 0 ? (
                                                displayData.map((result) => (
                                                    <tr key={result.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.participantName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.schoolName}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.item}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.points}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="p-3 text-center text-gray-500">
                                                        No records found for {selectedFestival} with {selectedGrade}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SclGradewise;
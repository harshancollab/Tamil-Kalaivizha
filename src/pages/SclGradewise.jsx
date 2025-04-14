import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useSearchParams } from 'react-router-dom';
import { getAllsclGradewiseAPI } from '../services/allAPI';

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

    // const handlePrint = () => {
    //     const printContent = document.getElementById('school-grade-table-container');

    //     const printWindow = window.open('', '_blank');
    //     printWindow.document.open();

    //     printWindow.document.write(`
    //         <html>
    //         <head>
    //             <title>${getPrintTitle()}</title>
    //             <style>
    //                 body { font-family: Arial, sans-serif; }
    //                 table { width: 100%; border-collapse: collapse; }
    //                 th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
    //                 th { background-color: #f2f2f2; }
    //                 h2 { text-align: center; margin-bottom: 20px; }
    //                 @media print {
    //                     @page { size: landscape; }
    //                 }
    //             </style>
    //         </head>
    //         <body>
    //             <h2>${getPrintTitle()}</h2>
    //             ${printContent.innerHTML}
    //         </body>
    //         </html>
    //     `);

    //     printWindow.document.close();

    //     // Remove date/time from the print dialog
    //     setTimeout(() => {
    //         printWindow.print();
    //         printWindow.close();
    //     }, 250);
    // };

    // Initialize filtered data at component mount
    
   



    const handlePrint = () => {
        const printContent = document.getElementById('school-grade-table-container');
        const pageTitle = `${selectedFestival} - School ${selectedGrade} Grade Wise Report`;
        
        // Create a new window for printing that works reliably across devices
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Please allow popups for this website to enable printing.");
            return;
        }
        
        // Write mobile-friendly content to the print window
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${pageTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    /* Reset and base styles */
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                    
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #ffffff;
                        padding: 10px;
                        width: 100%;
                    }
                    
                    /* Print header */
                    .print-header {
                        text-align: center;
                        padding: 10px 0;
                        margin-bottom: 15px;
                        border-bottom: 2px solid #003566;
                    }
                    
                    .print-header h1 {
                        font-size: 16px;
                        color: #003566;
                        margin-bottom: 5px;
                    }
                    
                    .print-header p {
                        font-size: 14px;
                        color: #333;
                    }
                    
                    /* Table styles optimized for mobile */
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                        font-size: 12px;
                    }
                    
                    th, td {
                        border: 1px solid #000;
                        padding: 5px 3px;
                        text-align: center;
                    }
                    
                    th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    
                    /* Print-specific styles */
                    @media print {
                        @page {
                            size: landscape;
                            margin: 0.5cm;
                        }
                        
                        body {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        th {
                            background-color: #f2f2f2 !important;
                        }
                        
                        .print-header, table {
                            page-break-inside: avoid;
                        }
                        
                        /* Ensure text is readable on small screens */
                        table {
                            font-size: 10px;
                        }
                    }
                    
                    /* Small screen optimizations */
                    @media screen and (max-width: 600px) {
                        table {
                            font-size: 10px;
                        }
                        
                        th, td {
                            padding: 3px 2px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1>School ${selectedGrade} Wise Report</h1>
                    <p>${selectedFestival}</p>
                    <p>Date: ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="table-container">
                    ${printContent.innerHTML}
                </div>
                
                <script>
                    // Function to prepare and trigger print
                    function preparePrint() {
                        // Ensure table headers have background
                        const headers = document.querySelectorAll('th');
                        headers.forEach(header => {
                            header.style.backgroundColor = '#f2f2f2';
                        });
                        
                        // Auto-print after content is fully loaded
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                // Don't close the window automatically on mobile
                                // as this can cause issues on some devices
                            }, 500);
                        };
                    }
                    
                    // Run preparation
                    preparePrint();
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
    
        // Optional: Add a message to guide users on mobile
        setTimeout(() => {
            alert("If the print dialog doesn't appear automatically, please use your browser's menu to print the page.");
        }, 2000);
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
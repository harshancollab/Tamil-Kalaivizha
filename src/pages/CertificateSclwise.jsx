import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getAllCertificateSclwiseAPI } from '../services/allAPI'

const CertificateSclwise = () => {
    const [allItemResult, setAllItemResult] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const navigate = useNavigate();

    useEffect(() => {
        getAllItemResult();
    }, []);

    useEffect(() => {
        filterDataByFestival();
    }, [selectedFestival, allItemResult]);

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

    const filterDataByFestival = () => {
        if (!allItemResult.length) return;

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

        // Add sequential numbering to filtered results
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));

        setFilteredData(filtered);
    }

    const handleFestivalChange = (e) => {
        setSearchParams({ festival: e.target.value });
    };

    const handleSchoolClick = (schoolName) => {
        // Extract just the school name part after the code
        const schoolNameOnly = schoolName.split(' - ')[1];
        navigate(`/Add-certificate?school=${encodeURIComponent(schoolNameOnly)}`);
    };

  
    const handlePrint = () => {
        const printContent = document.getElementById('certificate-table-container');
        
        // Create a hidden iframe for mobile-compatible printing
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Get the heading text based on selected festival
        let headingText = "";
        switch (selectedFestival) {
            case "UP Kalaivizha":
                headingText = "UP Kalaivizha - Certificate School Wise Report";
                break;
            case "LP Kalaivizha":
                headingText = "LP Kalaivizha - Certificate School Wise Report";
                break;
            case "HS Kalaivizha":
                headingText = "HS Kalaivizha - Certificate School Wise Report";
                break;
            case "HSS Kalaivizha":
                headingText = "HSS Kalaivizha - Certificate School Wise Report";
                break;
            case "All Festival":
                headingText = "All Festival - Certificate School Wise Report";
                break;
            default:
                headingText = "Certificate School Wise Report";
        }
        
        // Extract table HTML
        let tableHtml = printContent.innerHTML;
        
        // Write the content to the iframe with appropriate mobile styling
        iframe.contentDocument.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${headingText}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
                <style>
                    @media print {
                        @page {
                            size: auto;  /* Auto is the initial value */
                            margin: 0mm; /* This affects the margin in the printer settings */
                        }
                        
                        html {
                            background-color: #FFFFFF;
                            margin: 0; /* This affects the margin on the HTML before sending to printer */
                        }
                        
                        body {
                            margin: 10mm 5mm; /* margin you want for the content */
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                    }
                    
                    body {
                        font-family: Arial, sans-serif;
                        background-color: white;
                        color: black;
                        font-size: 12px;
                    }
                    
                    .print-heading {
                        text-align: center;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 15px;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    
                    th, td {
                        border: 1px solid black;
                        padding: 5px;
                        text-align: center;
                    }
                    
                    th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    
                    /* Force backgrounds on all elements */
                    * {
                        background-color: white !important;
                        color: black !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    /* Mobile-specific adjustments */
                    @media only screen and (max-width: 600px) {
                        body {
                            font-size: 10px;
                        }
                        
                        .print-heading {
                            font-size: 14px;
                        }
                        
                        th, td {
                            padding: 3px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-container">
                    <div class="print-heading">${headingText}</div>
                    ${tableHtml}
                </div>
                <script>
                    // Force background colors through JavaScript after load
                    window.onload = function() {
                        const allElements = document.querySelectorAll('*');
                        allElements.forEach(el => {
                            el.style.backgroundColor = 'white';
                            el.style.color = 'black';
                        });
                        
                        // Auto-print after ensuring styles are applied
                        setTimeout(function() {
                            window.print();
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `);
        
        iframe.contentDocument.close();
        
        // Remove the iframe after printing dialog closes
        const printListener = () => {
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
            window.removeEventListener('afterprint', printListener);
        };
        
        window.addEventListener('afterprint', printListener);
        
        // If afterprint doesn't fire (some mobile browsers), 
        // clean up the iframe after a reasonable delay
        setTimeout(() => {
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
        }, 10000); // 10-second fallback cleanup
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
            gradeC: 4
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
            gradeC: 4
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
            gradeC: 2
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
            gradeC: 3
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
            gradeC: 2
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
            gradeC: 2
        },
        {
            slNo: 6,
            printed: "30443 - G. H. S. Chemmannu",
            itemCode: "501",
            itemName: "Drawing",
            itemType: "Single",
            totalStudents: 20,
            participation: 18,
            nonParticipant: 2,
            gradeA: 9,
            gradeB: 7,
            gradeC: 2
        }
    ];

    // Initialize filtered data at component mount
    useEffect(() => {
        if (allItemResult.length === 0 && certificateItemData.length > 0) {
            setAllItemResult(certificateItemData);
        }
    }, []);

    // Determine what data to display
    const displayData = filteredData.length > 0 ? filteredData : 
        (allItemResult.length > 0 ? allItemResult : certificateItemData);

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

                    <div className="w-full">
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div id="certificate-table-container" className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School</th>
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
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.totalStudents}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.participation}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.nonParticipant}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="p-3 text-center text-gray-500">
                                                        No records found for {selectedFestival}
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
    )
}

export default CertificateSclwise
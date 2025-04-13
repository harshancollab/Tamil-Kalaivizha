import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllCertificateitemwiseAPI } from '../services/allAPI';

const Certificateitmwise = () => {
    const [Allitemresult, setItemresult] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const navigate = useNavigate();

    useEffect(() => {
        getAllItemResult();
    }, []); 

    useEffect(() => {
        filterItemsByFestival(selectedFestival);
    }, [selectedFestival, Allitemresult]);

    const getAllItemResult = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllCertificateitemwiseAPI(reqHeader)
                if (result.status === 200) {
                    setItemresult(result.data)
                }
            } catch (err) {
                console.log(err);
                setItemresult(certificateItemData);
            }
        } else {
            setItemresult(certificateItemData);
        }
    }

    const filterItemsByFestival = (festival) => {
        if (!Allitemresult.length) return;
        
        let filtered;
        switch (festival) {
            case "UP Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 300 && itemCode < 400;
                });
                break;
            case "LP Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 400 && itemCode < 500;
                });
                break;
            case "HS Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 500 && itemCode < 600;
                });
                break;
            case "HSS Kalaivizha":
                filtered = Allitemresult.filter(item => {
                    const itemCode = parseInt(item.itemCode);
                    return itemCode >= 600 && itemCode < 700;
                });
                break;
            case "All Festival":
                filtered = [...Allitemresult];
                break;
            default:
                filtered = [...Allitemresult];
        }
        
       
        filtered = filtered.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));
        
        setFilteredItems(filtered);
    }

    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        setSearchParams({ festival });
        
    };

    const handleItemClick = (itemCode, itemName) => {
       
        navigate(`/CertificateParticipate?itemCode=${itemCode}&itemName=${itemName}&festival=${selectedFestival}`);
    };

    // const handlePrint = () => {
    //     const printContent = document.getElementById('certificate-table-container');
    //     const originalContents = document.body.innerHTML;
        
       
    //     const printWindow = window.open('', '_blank');
    //     printWindow.document.open();
        
    
    //     printWindow.document.write(`
    //         <html>
    //         <head>
    //             <title>${selectedFestival} - Certificate Item Wise Report</title>
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
    //             <h2>${selectedFestival} - Certificate Item Wise Report</h2>
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

    const handlePrint = () => {
        const printContent = document.getElementById('certificate-table-container');
        
        // Create a hidden iframe for mobile-compatible printing
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Write the content to the iframe
        iframe.contentDocument.write(`
            <html>
            <head>
                <title>${selectedFestival} - Certificate Item Wise Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 10px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; }
                    h2 { text-align: center; margin-bottom: 20px; }
                    @media print {
                        @page { size: landscape; }
                        body { width: 100%; }
                        table { page-break-inside: avoid; }
                    }
                    @media only screen and (max-width: 600px) {
                        table { font-size: 10px; }
                        th, td { padding: 4px; }
                    }
                </style>
            </head>
            <body>
                <h2>${selectedFestival} - Certificate Item Wise Report</h2>
                ${printContent.innerHTML}
            </body>
            </html>
        `);
        
        iframe.contentDocument.close();
        
        // Print the iframe after a short delay to ensure content is loaded
        setTimeout(() => {
            iframe.contentWindow.print();
            
            // Remove the iframe after printing
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 500);
        }, 500);
    };
    const certificateItemData = [
        { 
            slNo: 1, 
            printed: "Yes", 
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
            printed: "Yes", 
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
            printed: "No", 
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
            printed: "Yes", 
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
            printed: "No", 
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
            printed: "Yes", 
            itemCode: "501", 
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
            slNo: 7, 
            printed: "No", 
            itemCode: "601", 
            itemName: "Debate", 
            itemType: "Single", 
            totalStudents: 12, 
            participation: 10, 
            nonParticipant: 2, 
            gradeA: 6, 
            gradeB: 3, 
            gradeC: 1 
        }
    ];

    // Initialize filtered data at component mount
    useEffect(() => {
        if (Allitemresult.length === 0 && certificateItemData.length > 0) {
            filterItemsByFestival(selectedFestival);
        }
    }, []);

    // Determine what data to display
    const displayData = filteredItems.length > 0 ? filteredItems : 
                       (Allitemresult.length > 0 ? Allitemresult : certificateItemData);

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Certificate Item Wise
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="relative w-full sm:w-40">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    <option value="UP Kalaivizha">UP Kalaivizha</option>
                                    <option value="LP Kalaivizha">LP Kalaivizha</option>
                                    <option value="HS Kalaivizha">HS Kalaivizha</option>
                                    <option value="HSS Kalaivizha">HSS Kalaivizha</option>
                                    <option value="All Festival">All Festival</option>
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
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Printed</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of Students</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Participation</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Non-Participant</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade A</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade B</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade C</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {displayData.length > 0 ? (
                                                displayData.map((item) => (
                                                    <tr key={item.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.slNo}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.printed}</td>
                                                        <td 
                                                            className="p-2 md:p-3 text-blue-500 whitespace-nowrap cursor-pointer hover:underline hover:font-medium"
                                                            onClick={() => handleItemClick(item.itemCode, item.itemName)}
                                                        >
                                                            {item.itemCode} - {item.itemName}
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.itemType}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.totalStudents}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.participation}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.nonParticipant}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.gradeA}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.gradeB}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.gradeC}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="10" className="p-4 text-center">
                                                        No items found for {selectedFestival}
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

export default Certificateitmwise
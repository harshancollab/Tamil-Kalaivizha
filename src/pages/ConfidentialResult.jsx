import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllConfidentialAPI } from '../services/allAPI';


const ConfidentialResult = () => {
    const printRef = useRef();
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedFestival, setSelectedFestival] = useState("All Festival");
      const [Allitemresult, setItemresult] = useState([]);

console.log(Allitemresult);


useEffect(() => {
    getAllConfidentialResult();
  }, []);

    const getAllConfidentialResult = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllConfidentialAPI (reqHeader)
                if (result.status === 200) {
                    setItemresult(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }


    const resultData = [
        { slNo: 1, regNo: "366 - Story Writing", code: "Single", mark1: 5, mark2: 8, mark3: 2, total: 15, markPercentage: 85, rank: 2, grade: "A", point: 9.5 },
        { slNo: 2, regNo: "303 - Essay Writing", code: "Single", mark1: 9, mark2: 8, mark3: 5, total: 22, markPercentage: 91, rank: 1, grade: "A+", point: 10.0 },
        { slNo: 3, regNo: "307 -  MONO ACT", code: "Single", mark1: 7, mark2: 2, mark3: 8, total: 17, markPercentage: 82, rank: 3, grade: "A-", point: 9.0 },
        { slNo: 4, regNo: "366 - Story Writing", code: "Group", mark1: 8, mark2: 2, mark3: 7, total: 17, markPercentage: 72, rank: 7, grade: "B+", point: 8.0 },
        { slNo: 5, regNo: "630 - Story Writing7", code: "234", mark1: 2, mark2: 0, mark3: 8, total: 10, markPercentage: 87, rank: 4, grade: "A", point: 9.5 },
        { slNo: 6, regNo: "356 - Story Writing", code: "123", mark1: 8, mark2: 7, mark3: 8, total: 23, markPercentage: 78, rank: 5, grade: "B+", point: 8.5 },
        { slNo: 7, regNo: "453 - Story Writing", code: "456", mark1: 5, mark2: 0, mark3: 8, total: 13, markPercentage: 68, rank: 8, grade: "B", point: 7.5 },
        { slNo: 8, regNo: "678 - Story Writing", code: "976", mark1: 0, mark2: 6, mark3: 0, total: 6, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 }
    ];


    const detailResultsData = {
        "366 - Story Writing": [
            { slNo: 1, regNo: 2, codeNo: 912, name: "Dhanushyaa", school: "30043 - Govt U. P. S. Vandiperiyar", mark1: 80, mark2: 80, mark3: 82, total: 242, markPercentage: 80.67, rank: 1, grade: "A", point: 5 },
            { slNo: 2, regNo: 11, codeNo: 915, name: "Mukila M", school: "30038 - G. H. S. Anakara", mark1: 76, mark2: 70, mark3: 71, total: 217, markPercentage: 72.33, rank: 2, grade: "B", point: 3 }
        ],
        "303 - Essay Writing": [
            { slNo: 1, regNo: 2, codeNo: 912, name: "Dhanushyaa", school: "30043 - Govt U. P. S. Vandiperiyar", mark1: 80, mark2: 80, mark3: 82, total: 242, markPercentage: 80.67, rank: 1, grade: "A", point: 5 },
            { slNo: 2, regNo: 11, codeNo: 915, name: "Mukila M", school: "30038 - G. H. S. Anakara", mark1: 76, mark2: 70, mark3: 71, total: 217, markPercentage: 72.33, rank: 2, grade: "B", point: 3 }
        ],
    };

    const getPrintTitle = () => {
        return `${selectedFestival} - ${selectedItem} Result`;
    };

    const handleFestivalChange = (e) => {
        setSelectedFestival(e.target.value);
    };

    const handlePrint = () => {
        const originalContents = document.body.innerHTML;
        const printContents = printRef.current.innerHTML;
        
       
        const itemHeading = selectedItem || "";
    
        document.body.innerHTML = `
            <style type="text/css" media="print">
                @page {
                    size: auto;
                    margin: 0;
                }
                body {
                    padding: 20px;
                    font-family: sans-serif;
                }
                .print-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .print-table th, .print-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: center;
                }
                .print-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .print-title {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 18px;
                    font-weight: bold;
                    display: block !important;
                }
                .print-header {
                    text-align: right;
                    margin-bottom: 10px;
                    font-size: 14px;
                }
                .print-footer {
                    margin-top: 20px;
                    font-size: 12px;
                }
                .no-print {
                    display: none !important;
                }
                .absentee-info {
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: left;
                }
                .item-heading {
                    text-align: center;
                    margin-bottom: 15px;
                    font-size: 16px;
                    font-weight: bold;
                    display: block !important;
                }
            </style>
            <div class="print-title">${selectedFestival} - Result</div>
            <div class="item-heading">${itemHeading}</div>
            <div class="print-header">Stage 8 on 07 Dec 2023</div>
            ${printContents}
            <div class="absentee-info">
                <p>Absentee Reg No.: 117, 212, 300</p>
                <p>No of Absentees: 2</p>
                <p>No of Withheld Participants: 0</p>
                <p>No of Appeal Entry: 0</p>
            </div>
        `;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };
    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
        setTimeout(() => {
            handlePrint();
        }, 300);
    };

  
    const renderPrintTable = () => {
        if (selectedItem && detailResultsData[selectedItem]) {
          
            return (
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                    <thead className="bg-gray-50">
                        <tr className="text-gray-700">
                            <th className="p-2 md:p-3">Sl No</th>
                            <th className="p-2 md:p-3">Reg No</th>
                            <th className="p-2 md:p-3">Code No</th>
                            <th className="p-2 md:p-3">Name</th>
                            <th className="p-2 md:p-3">School</th>
                            <th className="p-2 md:p-3">Mark 1</th>
                            <th className="p-2 md:p-3">Mark 2</th>
                            <th className="p-2 md:p-3">Mark 3</th>
                            <th className="p-2 md:p-3">Total</th>
                            <th className="p-2 md:p-3">Mark %</th>
                            <th className="p-2 md:p-3">Rank</th>
                            <th className="p-2 md:p-3">Grade</th>
                            <th className="p-2 md:p-3">Point</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                        {detailResultsData[selectedItem].map((result) => (
                            <tr key={result.slNo} className="hover:bg-gray-100">
                                <td className="p-2 md:p-3">{result.slNo}</td>
                                <td className="p-2 md:p-3">{result.regNo}</td>
                                <td className="p-2 md:p-3">{result.codeNo}</td>
                                <td className="p-2 md:p-3">{result.name}</td>
                                <td className="p-2 md:p-3">{result.school}</td>
                                <td className="p-2 md:p-3">{result.mark1}</td>
                                <td className="p-2 md:p-3">{result.mark2}</td>
                                <td className="p-2 md:p-3">{result.mark3}</td>
                                <td className="p-2 md:p-3">{result.total}</td>
                                <td className="p-2 md:p-3">{result.markPercentage}</td>
                                <td className="p-2 md:p-3">{result.rank}</td>
                                <td className="p-2 md:p-3">{result.grade}</td>
                                <td className="p-2 md:p-3">{result.point}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
        
            return (
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                    <thead className="bg-gray-50">
                        <tr className="text-gray-700">
                            <th className="p-2 md:p-3">Sl No</th>
                            <th className="p-2 md:p-3">Item Code & Item Name</th>
                            <th className="p-2 md:p-3">Item Type</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                        {resultData.map((result) => (
                            <tr key={result.slNo} className="hover:bg-gray-100">
                                <td className="p-2 md:p-3">{result.slNo}</td>
                                <td className="p-2 md:p-3">{result.regNo}</td>
                                <td className="p-2 md:p-3">{result.code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Confidential Result
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
                                    <option value="Lp Kalaivizha">Lp Kalaivizha</option>
                                    <option value="Hs Kalaivizha">Hs Kalaivizha</option>
                                    <option value="Hss Kalaivizha">Hss Kalaivizha</option>
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                            <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                <table className="min-w-full text-center border-separate border-spacing-y-2">
                                    <thead className="bg-gray-50">
                                        <tr className="text-gray-700">
                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                            <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                        {resultData.map((result) => (
                                            <tr key={result.slNo} className="hover:bg-gray-100">
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                <td 
                                                    className="p-2 md:p-3 text-blue-500 whitespace-nowrap cursor-pointer hover:underline"
                                                    onClick={() => handleItemClick(result.regNo)}
                                                >
                                                    {result.regNo}
                                                </td>
                                                <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                
                    <div ref={printRef} className="hidden">
                        {renderPrintTable()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfidentialResult
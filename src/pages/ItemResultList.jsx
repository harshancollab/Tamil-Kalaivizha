import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { getAllitemtentryListAPI } from '../services/allAPI'

const ItemResultList = () => {
    const [Allitemresult, setItemresult] = useState([]);
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    
   
    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";

    useEffect(() => {
        //getAllItemResult();
    }, []);

    const getAllItemResult = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllitemtentryListAPI(reqHeader)
                if (result.status === 200) {
                    setItemresult(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const resultData = [
        { slNo: 1, regNo: "301 - Story Writing", code: "Single", mark1: 5, mark2: 8, mark3: 2, total: "yes", markPercentage: 85, rank: 2, grade: "A", point: 9.5 },
        { slNo: 2, regNo: "301 - Story Writing", code: "Single", mark1: 9, mark2: 8, mark3: 5, total: "yes", markPercentage: 91, rank: 1, grade: "A+", point: 10.0 },
        { slNo: 3, regNo: "301 - Story Writing", code: "Single", mark1: 7, mark2: 2, mark3: 8, total: "yes", markPercentage: 82, rank: 3, grade: "A-", point: 9.0 },
        { slNo: 4, regNo: "34", code: "Group", mark1: 8, mark2: 2, mark3: 7, total: "yes", markPercentage: 72, rank: 7, grade: "B+", point: 8.0 },
        { slNo: 5, regNo: "67", code: "234", mark1: 2, mark2: 0, mark3: 8, total: "yes", markPercentage: 87, rank: 4, grade: "A", point: 9.5 },
        { slNo: 6, regNo: "890", code: "123", mark1: 8, mark2: 7, mark3: 8, total: "yes", markPercentage: 78, rank: 5, grade: "B+", point: 8.5 },
        { slNo: 7, regNo: "45", code: "456", mark1: 5, mark2: 0, mark3: 8, total: 203, markPercentage: 68, rank: 8, grade: "B", point: 7.5 },
        { slNo: 8, regNo: "678", code: "976", mark1: 0, mark2: 6, mark3: 0, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 }
    ];


    const getPrintTitle = () => {
        switch (selectedFestival) {
            case "UP Kalaivizha":
                return "UP Tamil Kalaivizha - Item Result List";
            case "Lp Kalaivizha":
                return "LP Tamil Kalaivizha - Item Result List";
            case "Hs Kalaivizha":
                return "HS Tamil Kalaivizha - Item Result List";
            case "Hss Kalaivizha":
                return "HSS Tamil Kalaivizha - Item Result List";
            default:
                return "Item Result List";
        }
    };

    const handleFestivalChange = (e) => {
       
        setSearchParams({ festival: e.target.value });
    };

    const handlePrint = () => {
        const originalContents = document.body.innerHTML;
        const printContents = printRef.current.innerHTML;

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
                .no-print {
                    display: none !important;
                }
            </style>
            ${printContents}
        `;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

   
    const filteredData = resultData; 

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Item Result List
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
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

                    <div ref={printRef} className="w-full">
                        <div className="print-title hidden">{getPrintTitle()}</div>
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">No of Students</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Result Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Result Not Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Confirmed</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Reset</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {filteredData.map((result) => (
                                                <tr key={result.slNo} className="hover:bg-gray-100">
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.mark1}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.mark2}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.mark3}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.total}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap no-print">
                                                        <i className="text-blue-500 fa-solid fa-arrow-rotate-right"></i>
                                                    </td>
                                                </tr>
                                            ))}
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

export default ItemResultList
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllHigherlvlcompAPI } from '../services/allAPI';

const Higherlvlcomp = () => {
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
                const result = await getAllHigherlvlcompAPI(reqHeader)
                if (result.status === 200) {
                    setItemresult(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    // Updated dummy data that matches the table headers
    const resultData = [
        { 
            slNo: 1, 
            itemCode: "301", 
            itemName: "Story Writing", 
            participantName: "Arun Kumar", 
            class: "10th A", 
            schoolName: "St. Joseph's High School" 
        },
        { 
            slNo: 2, 
            itemCode: "302", 
            itemName: "Poem Recitation", 
            participantName: "Meena Sharma", 
            class: "9th B", 
            schoolName: "Holy Cross School" 
        },
        { 
            slNo: 3, 
            itemCode: "303", 
            itemName: "Essay Writing", 
            participantName: "Rajesh Singh", 
            class: "10th C", 
            schoolName: "Kendriya Vidyalaya" 
        },
        { 
            slNo: 4, 
            itemCode: "304", 
            itemName: "Tamil Elocution", 
            participantName: "Priya Raman", 
            class: "8th A", 
            schoolName: "Government Higher Secondary School" 
        },
        { 
            slNo: 5, 
            itemCode: "305", 
            itemName: "Group Singing", 
            participantName: "Tamil Music Team", 
            class: "Various", 
            schoolName: "Modern Public School" 
        },
        { 
            slNo: 6, 
            itemCode: "306", 
            itemName: "Mono Acting", 
            participantName: "Karthik Narayanan", 
            class: "10th D", 
            schoolName: "DAV Public School" 
        },
        { 
            slNo: 7, 
            itemCode: "307", 
            itemName: "Kolam Competition", 
            participantName: "Lakshmi Sundaram", 
            class: "9th A", 
            schoolName: "St. Mary's School" 
        },
        { 
            slNo: 8, 
            itemCode: "308", 
            itemName: "Folk Dance", 
            participantName: "Cultural Team", 
            class: "Various", 
            schoolName: "Vidya Mandir" 
        }
    ];


    const getPrintTitle = () => {
        switch (selectedFestival) {
            case "UP Kalaivizha":
                return "UP Tamil Kalaivizha -=Higher Level Competition";
            case "Lp Kalaivizha":
                return "LP Tamil Kalaivizha - Higher Level Competition";
            case "Hs Kalaivizha":
                return "HS Tamil Kalaivizha - Higher Level Competition";
            case "Hss Kalaivizha":
                return "HSS Tamil Kalaivizha - Higher Level Competition";
                case "All Festival":
                    return "All Festival Tamil Kalaivizha - Higher Level Competition";
            default:
                return "Higher Level Competition";
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
                        Higher Level Competition
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
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name of Participant</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Class</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {filteredData.map((result) => (
                                                <tr key={result.slNo} className="hover:bg-gray-100">
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCode} - {result.itemName}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.participantName}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.class}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.schoolName}</td>
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

export default Higherlvlcomp
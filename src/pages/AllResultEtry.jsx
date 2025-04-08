import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { deleteresultentryAPI, getAllResultentryListAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

const AllResultEntry = () => {
    const [showRegNo, setShowRegNo] = useState(false);
    const [Allresultentry, setResultentry] = useState([]);
    const navigate = useNavigate();
    const printRef = useRef();

    const absenteeRegNos = [
        "001", "002", "003", "004",
        "005",
        // "009", "010", "011", "012"
    ];

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
                const result = await getAllResultentryListAPI(reqHeader)
                if (result.status === 200) {
                    setResultentry(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleEditRedirect = (resultEntry) => {
        navigate(`/edit-resultentry/${resultEntry.slNo}`, { 
            state: { resultEntry } 
        });
    };

    const handleDeleteClick = async(id) => {
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try{
                await deleteresultentryAPI(id, reqHeader)
                getAllresultentry() 
            } catch(err){
                console.log(err);
            }
        }
    }

    
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
                .absentee-info {
                    margin-top: 20px;
                    margin-bottom: 10px;
                    display: block !important;
                }
                .no-print {
                    display: none !important;
                }
            </style>
            ${printContents}
            <div class="absentee-info">
                <p><strong>Absentee Reg No:</strong> ${absenteeRegNos.join(', ')}</p>
                <p><strong>No of Absentees:</strong> ${absenteeRegNos.length}</p>
                <p><strong>No of Withheld Participants:</strong> 3</p>
                <p><strong>No of Appeal Entry:</strong> 0</p>
            </div>
        `;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    // Dummy data
    const resultData = [
        { slNo: 1, regNo: "123", code: "301", mark1: 85, mark2: 78, mark3: 92, total: 255, markPercentage: 85, rank: 2, grade: "A", point: 9.5 },
        { slNo: 2, regNo: "456", code: "203", mark1: 90, mark2: 88, mark3: 95, total: 273, markPercentage: 91, rank: 1, grade: "A+", point: 10.0 },
        { slNo: 3, regNo: "89", code: "345", mark1: 75, mark2: 82, mark3: 88, total: 245, markPercentage: 82, rank: 3, grade: "A-", point: 9.0 },
        { slNo: 4, regNo: "34", code: "BIO", mark1: 68, mark2: 72, mark3: 76, total: 216, markPercentage: 72, rank: 7, grade: "B+", point: 8.0 },
        { slNo: 5, regNo: "67", code: "234", mark1: 92, mark2: 80, mark3: 88, total: 260, markPercentage: 87, rank: 4, grade: "A", point: 9.5 },
        { slNo: 6, regNo: "890", code: "123", mark1: 78, mark2: 75, mark3: 82, total: 235, markPercentage: 78, rank: 5, grade: "B+", point: 8.5 },
        { slNo: 7, regNo: "45", code: "456", mark1: 65, mark2: 70, mark3: 68, total: 203, markPercentage: 68, rank: 8, grade: "B", point: 7.5 },
        { slNo: 8, regNo: "678", code: "976", mark1: 70, mark2: 76, mark3: 80, total: 226, markPercentage: 75, rank: 6, grade: "B+", point: 8.0 }
    ];

    const chunkRegNos = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };

    const chunkedRegNos = chunkRegNos(absenteeRegNos, 4);

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Result Entry
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="relative">
                                <p
                                    className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] cursor-pointer'
                                    onMouseEnter={() => setShowRegNo(true)}
                                    onMouseLeave={() => setShowRegNo(false)}
                                >
                                    Absentee Reg No...
                                </p>
                                {showRegNo && (
                                    <div className="absolute top-full left-0 mt-1 p-2 bg-white shadow-lg rounded-md z-10 text-gray-800 min-w-max">
                                        {chunkedRegNos.map((chunk, i) => (
                                            <div key={i} className="mb-1 last:mb-0">
                                                {chunk.join(', ')}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4]'>No of Withheld Participants :<span> 3</span></p>
                            <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4]'>No of Absentees :<span> {absenteeRegNos.length}</span></p>
                            <button 
                                onClick={handlePrint}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                            >
                                Print
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        <div ref={printRef} className="overflow-x-auto -mx-4 sm:mx-0">
                            {/* This title will only show when printing */}
                            <div className="print-title hidden">Result Entry</div>
                            
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div className="shadow overflow-hidden  sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 1</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 2</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark 3</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Total</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Mark %</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Rank</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Edit</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {resultData.map((result) => (
                                                <tr key={result.slNo} className="hover:bg-gray-100">
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.mark1}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.mark2}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.mark3}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.total}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.markPercentage}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.rank}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap no-print">
                                                        <button 
                                                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                            onClick={() => handleEditRedirect(result)}
                                                        >
                                                            <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                                                        </button>
                                                    </td>
                                                    <td className="p-2 md:p-3 whitespace-nowrap no-print">
                                                        <button onClick={() => handleDeleteClick(result.slNo)} className="text-red-600 hover:text-red-800 focus:outline-none">
                                                            <i className="fa-solid fa-trash cursor-pointer"></i>
                                                        </button>
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

export default AllResultEntry
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useSearchParams } from 'react-router-dom';
import { getAllsclGradewiseAPI } from '../services/allAPI';

const SclGradewise = () => {
    const [resultData, setResultData] = useState([
        { slNo: 1, participantName: "John Doe", schoolName: "Central High", item: "Story Writing", category: "Single", points: 9.5, grade: "A" },
        { slNo: 2, participantName: "Jane Smith", schoolName: "Springfield Elementary", item: "Story Writing", category: "Single", points: 10.0, grade: "A+" },
        { slNo: 3, participantName: "Alex Johnson", schoolName: "Oak Ridge School", item: "Story Writing", category: "Single", points: 9.0, grade: "A-" },
        { slNo: 4, participantName: "Sara Williams", schoolName: "Liberty Middle School", item: "Group Song", category: "Group", points: 8.0, grade: "B+" },
        { slNo: 5, participantName: "Michael Brown", schoolName: "Riverdale Academy", item: "Painting", category: "Single", points: 9.5, grade: "A" },
        { slNo: 6, participantName: "Emily Davis", schoolName: "Westview High", item: "Classical Dance", category: "Single", points: 8.5, grade: "B+" },
        { slNo: 7, participantName: "David Wilson", schoolName: "Pinewood Elementary", item: "Recitation", category: "Single", points: 7.5, grade: "B" },
        { slNo: 8, participantName: "Sophie Miller", schoolName: "Greenwood School", item: "Folk Dance", category: "Group", points: 8.0, grade: "B+" }
    ]);

    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedFestival = searchParams.get('festival') || "UP Kalaivizha";
    const selectedGrade = searchParams.get('grade') || "Grade A";




 useEffect(() => {
        //getSclgradewiselist();
    }, []);

    const getSclgradewiselist = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllsclGradewiseAPI(reqHeader)
                if (result.status === 200) {
                    setResultData(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }




    const getPrintTitle = () => {
        let festivalTitle;
        switch (selectedFestival) {
            case "UP Kalaivizha": festivalTitle = "UP Tamil Kalaivizha"; break;
            case "Lp Kalaivizha": festivalTitle = "LP Tamil Kalaivizha"; break;
            case "Hs Kalaivizha": festivalTitle = "HS Tamil Kalaivizha"; break;
            case "Hss Kalaivizha": festivalTitle = "HSS Tamil Kalaivizha"; break;
            default: festivalTitle = "Tamil Kalaivizha"; break;
        }

        return `${festivalTitle} - ${selectedGrade} - School Wise Report`;
    };

    const handleFestivalChange = (e) => {
        setSearchParams({
            festival: e.target.value,
            grade: selectedGrade
        });
    };

    const handleGradeChange = (e) => {
        setSearchParams({
            festival: selectedFestival,
            grade: e.target.value
        });
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


    const filteredData = selectedGrade === "All Grade"
        ? resultData
        : resultData.filter(item => {
            if (selectedGrade === "Grade A") return ["A", "A+", "A-"].includes(item.grade);
            if (selectedGrade === "Grade B") return ["B", "B+", "B-"].includes(item.grade);
            if (selectedGrade === "Grade C") return ["C", "C+", "C-"].includes(item.grade);
            return true;
        });

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
                                    <option value="Grade A">Grade A</option>
                                    <option value="Grade B">Grade B</option>
                                    <option value="Grade C">Grade C</option>
                                    <option value="All Grade">All Grade</option>
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
                                    <option value="UP Kalaivizha">UP Kalaivizha</option>
                                    <option value="Lp Kalaivizha">LP Kalaivizha</option>
                                    <option value="Hs Kalaivizha">HS Kalaivizha</option>
                                    <option value="Hss Kalaivizha">HSS Kalaivizha</option>
                                    <option value="All Festival">All Festival</option>
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            <button
                                onClick={handlePrint}
                                className="bg-gradient-to-r from-blue-900 to-blue-400 text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
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
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name of Participants</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {filteredData.length > 0 ? (
                                                filteredData.map((result) => (
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
                                                        No records found for the selected criteria
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
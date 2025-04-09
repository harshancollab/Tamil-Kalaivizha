import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllItemwisepointAPI } from '../services/allAPI';

const ItemWisePoint = () => {
  const [schoolCode, setSchoolCode] = useState('');
  const [selectedFestival, setSelectedFestival] = useState('All Festival');
  const printRef = useRef();
  const [Allitemwiswpoint, setItemwiswpoint] = useState([]);


   useEffect(() => {
        getAllItemwiswpoint();
    }, []);

    const getAllItemwiswpoint = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllItemwisepointAPI(reqHeader)
                if (result.status === 200) {
                  setItemwiswpoint(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }


  const resultData = [
    { slNo: 1, itemCode: "301 - Story Writing", school: "GHSS Kozhikode", studentName: "Rahul K", grade: "A", point: 9.5, totalPoint: 9.5 },
    { slNo: 2, itemCode: "301 - Story Writing", school: "St. Joseph HSS", studentName: "Anjali S", grade: "A+", point: 10.0, totalPoint: 10.0 },
    { slNo: 3, itemCode: "301 - Story Writing", school: "MES HSS", studentName: "Arun P", grade: "A-", point: 9.0, totalPoint: 9.0 },
    { slNo: 4, itemCode: "302 - Essay Writing", school: "Govt HSS", studentName: "Meera T", grade: "B+", point: 8.0, totalPoint: 8.0 },
    { slNo: 5, itemCode: "303 - Poem Recitation", school: "Sacred Heart HSS", studentName: "Vishnu M", grade: "A", point: 9.5, totalPoint: 9.5 },
    { slNo: 6, itemCode: "304 - Elocution", school: "Kendriya Vidyalaya", studentName: "Sameera N", grade: "B+", point: 8.5, totalPoint: 8.5 },
    { slNo: 7, itemCode: "305 - Group Song", school: "Christ HSS", studentName: "Team A", grade: "B", point: 7.5, totalPoint: 7.5 },
    { slNo: 8, itemCode: "306 - Folk Dance", school: "St. Mary's HSS", studentName: "Dance Group", grade: "B+", point: 8.0, totalPoint: 8.0 }
  ];

  const handleSchoolCodeChange = (e) => {
    setSchoolCode(e.target.value);
  };

  const handleFestivalChange = (e) => {
    setSelectedFestival(e.target.value);
  };

  const getPrintTitle = () => {
    switch (selectedFestival) {
      case "UP Kalaivizha":
        return "UP Tamil Kalaivizha - Item Wise Point List";
      case "Lp Kalaivizha":
        return "LP Tamil Kalaivizha - Item Wise Point List";
      case "Hs Kalaivizha":
        return "HS Tamil Kalaivizha - Item Wise Point List";
      case "Hss Kalaivizha":
        return "HSS Tamil Kalaivizha - Item Wise Point List";
      default:
        return "Item Wise Point List";
    }
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

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Item Wise Point List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4 w-full sm:w-auto">
              <label className="text-blue-700 whitespace-nowrap">School Code</label>
              <input 
                type="text" 
                className="rounded-full border border-blue-700 px-2 py-2 w-full sm:w-auto"  
                placeholder="Enter School Code..."
                value={schoolCode}
                onChange={handleSchoolCodeChange}
              />
              <button
                className={`border-blue-800 border text-blue-900 py-2 px-6 rounded-full w-full sm:w-auto ${
                  schoolCode.trim() !== '' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={schoolCode.trim() !== ''}
              >
                All School
              </button>
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
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>

          <div ref={printRef} className="w-full mt-6">
            <div className="print-title hidden">{getPrintTitle()}</div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                  <div className="overflow-x-scroll md:overflow-hidden">
                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                      <thead className="bg-gray-50">
                        <tr className="text-gray-700">
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Student Name</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Total Point</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                        {resultData.map((result) => (
                          <tr key={result.slNo} className="hover:bg-gray-100">
                            <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                            <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCode}</td>
                            <td className="p-2 md:p-3 whitespace-nowrap">{result.school}</td>
                            <td className="p-2 md:p-3 whitespace-nowrap">{result.studentName}</td>
                            <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                            <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                            <td className="p-2 md:p-3 whitespace-nowrap">{result.totalPoint}</td>
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
      </div>
    </>
  )
}

export default ItemWisePoint
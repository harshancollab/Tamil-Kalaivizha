import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
// You'll need to create this API function in your services folder
// import { getAllStageReportAPI } from '../services/allAPI'

const StageReport = () => {
  const [stageList, setStageList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("ALL");
  const [selectedStage, setSelectedStage] = useState("ALL Stage");
  const printRef = useRef();
  
  useEffect(() => {
    getAllStageData();
  }, []);
  
  const getAllStageData = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await (reqHeader);
        if (result?.status === 200) {
          setStageList(result.data);
        }
      } catch (err) {
        console.log(err);
      }
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

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // You can add filtering logic here or in a useEffect
  };

  const handleStageChange = (e) => {
    setSelectedStage(e.target.value);
    // You can add filtering logic here or in a useEffect
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
            Stage List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
              <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  value={selectedDate}
                  onChange={handleDateChange}
                >
                  <option value="ALL">All Dates</option>
                  <option value="2025-04-01">April 1, 2025</option>
                  <option value="2025-04-02">April 2, 2025</option>
                  <option value="2025-04-03">April 3, 2025</option>
                  <option value="2025-04-04">April 4, 2025</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  value={selectedStage}
                  onChange={handleStageChange}
                >
                  <option value="ALL Stage">All Stage</option>
                  <option value="Stage 1">Stage 1</option>
                  <option value="Stage 2">Stage 2</option>
                  <option value="Stage 3">Stage 3</option>
                  <option value="Stage 4">Stage 4</option>
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
            <div className="print-title hidden">Stage List Report</div>
            <div className="overflow-x-auto -mx-4 sm:mx-0 ">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                  <thead className="text-xs sm:text-sm">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      <th className="p-2 md:p-3">Items</th>
                      <th className="p-2 md:p-3">Festival</th>
                      <th className="p-2 md:p-3">Participants Team</th>
                      <th className="p-2 md:p-3">Tentative Time</th>
                      <th className="p-2 md:p-3">Start Time</th>
                      <th className="p-2 md:p-3">Remark</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {stageList && stageList.length > 0 ? (
                      stageList.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{index + 1}</td>
                          <td className="p-2 md:p-3">{item.itemCode} - {item.itemName || "-"}</td>
                          <td className="p-2 md:p-3">{item.festival || "-"}</td>
                          <td className="p-2 md:p-3">{item.team || "-"}</td>
                          <td className="p-2 md:p-3">{item.tentativeTime || "-"}</td>
                          <td className="p-2 md:p-3">{item.startTime || "-"}</td>
                          <td className="p-2 md:p-3">{item.remark || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-100">
                        <td className="p-2 md:p-3">8</td>
                        <td className="p-2 md:p-3">307 - Villupattu</td>
                        <td className="p-2 md:p-3">nazme</td>
                        <td className="p-2 md:p-3">Boy</td>
                        <td className="p-2 md:p-3">9</td>
                        <td className="p-2 md:p-3">933</td>
                        <td className="p-2 md:p-3">school 1</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StageReport
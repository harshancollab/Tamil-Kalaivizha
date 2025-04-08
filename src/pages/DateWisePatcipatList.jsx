import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';

const DateWiseParticipantList = () => {
  const [Alllist, setList] = useState([]);
  const printRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get('date') || "ALL";
  
  useEffect(() => {
    getAllitemise();
  }, [[selectedDate]]);

  const getAllitemise = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        // Replace with your API call for date-wise data
        // const result = await getDateWiseParticipantsAPI(reqHeader);
        // if (result?.status === 200) {
        //   setList(result.data);
        // }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    
    // Update URL when date changes
    if (newDate === "ALL") {
      // Remove date parameter if "ALL" is selected
      setSearchParams({});
    } else {
      setSearchParams({ date: newDate });
    }
  };
  const getPrintTitle = () => {
    if (selectedDate === "ALL") {
      return "All Dates - Participants List";
    } else {
      const dateObj = new Date(selectedDate);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return `${formattedDate} - Participants List`;
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
        overflow: hidden !important; /* Hide all scrollbars */
      }
      ::-webkit-scrollbar {
        display: none !important; /* Hide webkit scrollbars */
      }
      html, body {
        overflow: visible !important; /* Ensure content is visible but scrollbars are hidden */
        height: auto !important; /* Allow content to expand to its natural height */
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
      .print-table td {
        border-bottom: none; /* Remove bottom border from td */
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
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header section with title and controls */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participants List (Date Wise) 
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleDateChange}
                  value={selectedDate}
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
            
            {/* Mobile view table with horizontal scrolling - Hide at exactly 768px and above */}
            <div className="md:hidden w-full">
              <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table whitespace-nowrap" style={{ minWidth: "800px" }}>
                  <thead className="text-xs">
                    {/* Category Headers */}
                    <tr>
                      <th rowSpan="2" className="p-2 align-bottom">Sl No</th>
                      <th rowSpan="2" className="p-2 align-bottom">School code</th>
                      <th rowSpan="2" className="p-2 align-bottom">School Name</th>
                      {/* UP Category */}
                      <th colSpan="2" className="p-2">
                        <div className="relative font-normal text-xs flex items-center justify-center w-full">
                          <div className="px-3 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                            UP
                          </div>
                        </div>
                      </th>
                      {/* LP Category */}
                      <th colSpan="2" className="p-2">
                        <div className="relative font-normal text-xs flex items-center justify-center w-full">
                          <div className="px-3 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                            LP
                          </div>
                        </div>
                      </th>
                      {/* HS Category */}
                      <th colSpan="2" className="p-2">
                        <div className="relative font-normal text-xs flex items-center justify-center w-full">
                          <div className="px-3 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                            HS
                          </div>
                        </div>
                      </th>
                      {/* HSS Category */}
                      <th colSpan="2" className="p-2">
                        <div className="relative font-normal text-xs flex items-center justify-center w-full">
                          <div className="px-3 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                            HSS
                          </div>
                        </div>
                      </th>
                      <th rowSpan="2" className="p-2 align-bottom">Total</th>
                    </tr>
                    <tr className="text-gray-700">
                      {/* UP Boys/Girls */}
                      <th className="p-2">Boys</th>
                      <th className="p-2">Girls</th>
                      {/* LP Boys/Girls */}
                      <th className="p-2">Boys</th>
                      <th className="p-2">Girls</th>
                      {/* HS Boys/Girls */}
                      <th className="p-2">Boys</th>
                      <th className="p-2">Girls</th>
                      {/* HSS Boys/Girls */}
                      <th className="p-2">Boys</th>
                      <th className="p-2">Girls</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {Alllist && Alllist.length > 0 ? (
                      Alllist.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{item.schoolCode || "-"}</td>
                          <td className="p-2 text-left">{item.schoolName || "-"}</td>
                          <td className="p-2">{item.upBoys || "0"}</td>
                          <td className="p-2">{item.upGirls || "0"}</td>
                          <td className="p-2">{item.lpBoys || "0"}</td>
                          <td className="p-2">{item.lpGirls || "0"}</td>
                          <td className="p-2">{item.hsBoys || "0"}</td>
                          <td className="p-2">{item.hsGirls || "0"}</td>
                          <td className="p-2">{item.hssBoys || "0"}</td>
                          <td className="p-2">{item.hssGirls || "0"}</td>
                          <td className="p-2">
                            {(parseInt(item.upBoys || 0) + 
                              parseInt(item.upGirls || 0) + 
                              parseInt(item.lpBoys || 0) + 
                              parseInt(item.lpGirls || 0) + 
                              parseInt(item.hsBoys || 0) + 
                              parseInt(item.hsGirls || 0) + 
                              parseInt(item.hssBoys || 0) + 
                              parseInt(item.hssGirls || 0))}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-100">
                        <td className="p-2">1</td>
                        <td className="p-2">933</td>
                        <td className="p-2 text-left">School 1</td>
                        <td className="p-2">8</td>
                        <td className="p-2">9</td>
                        <td className="p-2">6</td>
                        <td className="p-2">4</td>
                        <td className="p-2">5</td>
                        <td className="p-2">3</td>
                        <td className="p-2">7</td>
                        <td className="p-2">2</td>
                        <td className="p-2">44</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            
            </div>
            
            {/* Medium size specific view (exactly at 768px) */}
            <div className="hidden md:block lg:hidden overflow-x-auto">
              <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                <thead className="text-xs lg:text-sm">
                  {/* Category Headers */}
                  <tr>
                    <th rowSpan="2" className="p-2 lg:p-3 align-bottom">Sl No</th>
                    <th rowSpan="2" className="p-2 lg:p-3 align-bottom">School code</th>
                    <th rowSpan="2" className="p-2 lg:p-3 align-bottom">School Name</th>
                    {/* UP Category */}
                    <th colSpan="2" className="p-2 lg:p-3">
                      <div className="relative font-normal text-xs flex items-center justify-center w-full">
                        <div className="px-3 lg:px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                          UP
                        </div>
                      </div>
                    </th>
                    {/* LP Category */}
                    <th colSpan="2" className="p-2 lg:p-3">
                      <div className="relative font-normal text-xs flex items-center justify-center w-full">
                        <div className="px-3 lg:px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                          LP
                        </div>
                      </div>
                    </th>
                    {/* HS Category */}
                    <th colSpan="2" className="p-2 lg:p-3">
                      <div className="relative font-normal text-xs flex items-center justify-center w-full">
                        <div className="px-3 lg:px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                          HS
                        </div>
                      </div>
                    </th>
                    {/* HSS Category */}
                    <th colSpan="2" className="p-2 lg:p-3">
                      <div className="relative font-normal text-xs flex items-center justify-center w-full">
                        <div className="px-3 lg:px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                          HSS
                        </div>
                      </div>
                    </th>
                    <th rowSpan="2" className="p-2 lg:p-3 align-bottom">Total</th>
                  </tr>
                  <tr className="text-gray-700">
                    {/* UP Boys/Girls */}
                    <th className="p-2 lg:p-3">Boys</th>
                    <th className="p-2 lg:p-3">Girls</th>
                    {/* LP Boys/Girls */}
                    <th className="p-2 lg:p-3">Boys</th>
                    <th className="p-2 lg:p-3">Girls</th>
                    {/* HS Boys/Girls */}
                    <th className="p-2 lg:p-3">Boys</th>
                    <th className="p-2 lg:p-3">Girls</th>
                    {/* HSS Boys/Girls */}
                    <th className="p-2 lg:p-3">Boys</th>
                    <th className="p-2 lg:p-3">Girls</th>
                  </tr>
                </thead>
                <tbody className="text-xs lg:text-sm">
                  {Alllist && Alllist.length > 0 ? (
                    Alllist.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="p-2 lg:p-3">{index + 1}</td>
                        <td className="p-2 lg:p-3">{item.schoolCode || "-"}</td>
                        <td className="p-2 lg:p-3 text-left">{item.schoolName || "-"}</td>
                        <td className="p-2 lg:p-3">{item.upBoys || "0"}</td>
                        <td className="p-2 lg:p-3">{item.upGirls || "0"}</td>
                        <td className="p-2 lg:p-3">{item.lpBoys || "0"}</td>
                        <td className="p-2 lg:p-3">{item.lpGirls || "0"}</td>
                        <td className="p-2 lg:p-3">{item.hsBoys || "0"}</td>
                        <td className="p-2 lg:p-3">{item.hsGirls || "0"}</td>
                        <td className="p-2 lg:p-3">{item.hssBoys || "0"}</td>
                        <td className="p-2 lg:p-3">{item.hssGirls || "0"}</td>
                        <td className="p-2 lg:p-3">
                          {(parseInt(item.upBoys || 0) + 
                            parseInt(item.upGirls || 0) + 
                            parseInt(item.lpBoys || 0) + 
                            parseInt(item.lpGirls || 0) + 
                            parseInt(item.hsBoys || 0) + 
                            parseInt(item.hsGirls || 0) + 
                            parseInt(item.hssBoys || 0) + 
                            parseInt(item.hssGirls || 0))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-100">
                      <td className="p-2 lg:p-3">1</td>
                      <td className="p-2 lg:p-3">933</td>
                      <td className="p-2 lg:p-3 text-left">School 1</td>
                      <td className="p-2 lg:p-3">8</td>
                      <td className="p-2 lg:p-3">9</td>
                      <td className="p-2 lg:p-3">6</td>
                      <td className="p-2 lg:p-3">4</td>
                      <td className="p-2 lg:p-3">5</td>
                      <td className="p-2 lg:p-3">3</td>
                      <td className="p-2 lg:p-3">7</td>
                      <td className="p-2 lg:p-3">2</td>
                      <td className="p-2 lg:p-3">44</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Larger desktop view table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                <thead className="text-sm">
                  {/* Category Headers */}
                  <tr>
                    <th rowSpan="2" className="p-3 align-bottom">Sl No</th>
                    <th rowSpan="2" className="p-3 align-bottom">School code</th>
                    <th rowSpan="2" className="p-3 align-bottom">School Name</th>
                    {/* UP Category */}
                    <th colSpan="2" className="p-3">
                      <div className="relative font-normal text-sm flex items-center justify-center w-full">
                        <div className="px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                          UP
                        </div>
                      </div>
                    </th>
                    {/* LP Category */}
                    <th colSpan="2" className="p-3">
                      <div className="relative font-normal text-sm flex items-center justify-center w-full">
                        <div className="px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                          LP
                        </div>
                      </div>
                    </th>
                    {/* HS Category */}
                    <th colSpan="2" className="p-3">
                      <div className="relative font-normal text-sm flex items-center justify-center w-full">
                        <div className="px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                          HS
                        </div>
                      </div>
                    </th>
                    {/* HSS Category */}
                    <th colSpan="2" className="p-3">
                      <div className="relative font-normal text-sm flex items-center justify-center w-full">
                        <div className="px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                          HSS
                        </div>
                      </div>
                    </th>
                    <th rowSpan="2" className="p-3 align-bottom">Total</th>
                  </tr>
                  <tr className="text-gray-700">
                    {/* UP Boys/Girls */}
                    <th className="p-3">Boys</th>
                    <th className="p-3">Girls</th>
                    {/* LP Boys/Girls */}
                    <th className="p-3">Boys</th>
                    <th className="p-3">Girls</th>
                    {/* HS Boys/Girls */}
                    <th className="p-3">Boys</th>
                    <th className="p-3">Girls</th>
                    {/* HSS Boys/Girls */}
                    <th className="p-3">Boys</th>
                    <th className="p-3">Girls</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {Alllist && Alllist.length > 0 ? (
                    Alllist.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{item.schoolCode || "-"}</td>
                        <td className="p-3 text-left">{item.schoolName || "-"}</td>
                        <td className="p-3">{item.upBoys || "0"}</td>
                        <td className="p-3">{item.upGirls || "0"}</td>
                        <td className="p-3">{item.lpBoys || "0"}</td>
                        <td className="p-3">{item.lpGirls || "0"}</td>
                        <td className="p-3">{item.hsBoys || "0"}</td>
                        <td className="p-3">{item.hsGirls || "0"}</td>
                        <td className="p-3">{item.hssBoys || "0"}</td>
                        <td className="p-3">{item.hssGirls || "0"}</td>
                        <td className="p-3">
                          {(parseInt(item.upBoys || 0) + 
                            parseInt(item.upGirls || 0) + 
                            parseInt(item.lpBoys || 0) + 
                            parseInt(item.lpGirls || 0) + 
                            parseInt(item.hsBoys || 0) + 
                            parseInt(item.hsGirls || 0) + 
                            parseInt(item.hssBoys || 0) + 
                            parseInt(item.hssGirls || 0))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-100">
                      <td className="p-3">1</td>
                      <td className="p-3">933</td>
                      <td className="p-3 ">School 1</td>
                      <td className="p-3">8</td>
                      <td className="p-3">9</td>
                      <td className="p-3">6</td>
                      <td className="p-3">4</td>
                      <td className="p-3">5</td>
                      <td className="p-3">3</td>
                      <td className="p-3">7</td>
                      <td className="p-3">2</td>
                      <td className="p-3">44</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DateWiseParticipantList
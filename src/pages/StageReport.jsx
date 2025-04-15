import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import html2pdf from 'html2pdf.js';
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
        const result = await getAllStageReportAPI(reqHeader);
        if (result?.status === 200) {
          setStageList(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const generatePDF = () => {
    // Create a clone of the table for PDF generation
    const pdfContent = document.createElement('div');
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = "Stage List Report";
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(titleElement);

    // Add filter information
    const filterInfo = document.createElement('p');
    filterInfo.textContent = `Date: ${selectedDate === "ALL" ? "All Dates" : selectedDate} | Stage: ${selectedStage}`;
    filterInfo.style.textAlign = 'center';
    filterInfo.style.margin = '10px 0 20px';
    pdfContent.appendChild(filterInfo);

    // Create table clone
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Sl No', 'Items', 'Festival', 'Participants Team', 'Tentative Time', 'Start Time', 'Remark'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.style.border = '1px solid #ddd';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f2f2f2';
      th.style.fontWeight = 'bold';
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Check if we have data, if not use a placeholder row
    if (stageList && stageList.length > 0) {
      stageList.forEach((item, index) => {
        const row = document.createElement('tr');
        
        // Add cells
        const cellData = [
          index + 1,
          `${item.itemCode} - ${item.itemName || "-"}`,
          item.festival || "-",
          item.team || "-",
          item.tentativeTime || "-",
          item.startTime || "-",
          item.remark || "-"
        ];
        
        cellData.forEach(text => {
          const td = document.createElement('td');
          td.textContent = text;
          td.style.border = '1px solid #ddd';
          td.style.padding = '8px';
          td.style.textAlign = 'center';
          row.appendChild(td);
        });
        
        tbody.appendChild(row);
      });
    } else {
      // Placeholder row if no data
      const row = document.createElement('tr');
      const placeholderData = [
        "8",
        "307 - Villupattu",
        "nazme",
        "Boy",
        "9",
        "933",
        "school 1"
      ];
      
      placeholderData.forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        td.style.textAlign = 'center';
        row.appendChild(td);
      });
      
      tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    pdfContent.appendChild(table);
    
    // PDF filename
    const fileName = `Stage_List_Report_${selectedDate === "ALL" ? "All_Dates" : selectedDate}_${selectedStage.replace(/ /g, '_')}.pdf`;
    
    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // Using landscape for wider tables
    };
    
    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save();
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
                onClick={generatePDF}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
              >
                Print
              </button>
            </div>
          </div>
          <div ref={printRef} className="w-full">
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
import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import html2pdf from 'html2pdf.js';
import { useSearchParams } from 'react-router-dom';
// You'll need to create this API function in your services folder
// import { getAllStageReportAPI } from '../services/allAPI'

const DStageReport = () => {
  const [stageList, setStageList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const printRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get params from URL, with defaults if not present
  const selectedDate = searchParams.get('date') || "ALL";
  const selectedStage = searchParams.get('stage') || "ALL Stage";
  const searchFilter = searchParams.get('search') || "";

  // Dummy data
  const dummyData = [
    {
      itemCode: "301",
      itemName: "Classical Dance",
      festival: "UP Kalaivizha",
      team: "Girls",
      tentativeTime: "30 min",
      startTime: "10:45 AM",

    },
    {
      itemCode: "302",
      itemName: "Light Music",
      festival: "UP Kalaivizha",
      team: "Boys",
      tentativeTime: "10 min",
      startTime: "11:15 AM",

    },
    {
      itemCode: "303",
      itemName: "Folk Dance",
      festival: "UP Kalaivizha",
      team: "Mixed",
      tentativeTime: "10 min",
      startTime: "11:45 AM",

    },
    {
      itemCode: "304",
      itemName: "Group Song",
      festival: "UP Kalaivizha",
      team: "Girls",
      tentativeTime: "4 h ",
      startTime: "12:15 PM",

    },
    {
      itemCode: "401",
      itemName: "Elocution",
      festival: "LP Kalaivizha",
      team: "Individual",
      tentativeTime: "1 h 30 min ",
      startTime: "1:15 PM",
      remark: "Stage 4"
    },
    {
      itemCode: "402",
      itemName: "Recitation",
      festival: "LP Kalaivizha",
      team: "Individual",
      tentativeTime: "13 min",
      startTime: "1:45 PM",

    },
    {
      itemCode: "501",
      itemName: "Mono Act",
      festival: "HS Kalaivizha",
      team: "Individual",
      tentativeTime: "20 min",
      startTime: "2:15 PM",

    },
    {
      itemCode: "502",
      itemName: "Mimicry",
      festival: "HS Kalaivizha",
      team: "Individual",
      tentativeTime: "20 min",
      startTime: "2:45 PM",
      remark: "Stage 3"
    },
    {
      itemCode: "503",
      itemName: "Skit",
      festival: "HS Kalaivizha",
      team: "Mixed",
      tentativeTime: "32 min",
      startTime: "3:15 PM",
      remark: "Stage 2"
    },
    {
      itemCode: "601",
      itemName: "Drama",
      festival: "HSS Kalaivizha",
      team: "Mixed",
      tentativeTime: "30 min",
      startTime: "3:45 PM",
      remark: "Stage 1"
    },
    {
      itemCode: "602",
      itemName: "Oppana",
      festival: "HSS Kalaivizha",
      team: "Girls",
      tentativeTime: "48 min",
      startTime: "4:15 PM",
      remark: "Stage 4"
    },
    {
      itemCode: "603",
      itemName: "Thiruvathira",
      festival: "HSS Kalaivizha",
      team: "Girls",
      tentativeTime: "30 min",
      startTime: "4:45 PM",
      remark: "Stage 2"
    },
    {
      itemCode: "604",
      itemName: "Kolkali",
      festival: "HSS Kalaivizha",
      team: "Boys",
      tentativeTime: "5 h",
      startTime: "5:15 PM",
      remark: "Stage 3"
    },
    {
      itemCode: "605",
      itemName: "Margamkali",
      festival: "HSS Kalaivizha",
      team: "Girls",
      tentativeTime: "30 min",
      startTime: "5:45 PM",
      remark: "Stage 1"
    },
    {
      itemCode: "307",
      itemName: "Villupattu",
      festival: "UP Kalaivizha",
      team: "Boy",
      tentativeTime: "9",
      startTime: "9:33 AM",
      remark: "Stage 1"
    }
  ];

  useEffect(() => {
    getAllStageData();
    // Set search term from URL parameters when component loads
    if (searchFilter) {
      setSearchTerm(searchFilter);
    }
  }, [searchFilter]);

  const getAllStageData = async () => {
    setLoading(true);
    const token = sessionStorage.getItem('token');

    let apiData = [];
    let useOnlyDummyData = false;

    try {
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        try {
          // Uncomment when API is ready
          // const result = await getAllStageReportAPI(reqHeader);
          // if (result?.status === 200) {
          //   apiData = result.data;
          // }
          useOnlyDummyData = true; // Remove this when API is implemented
        } catch (apiError) {
          console.error("API call failed, using only dummy data:", apiError);
          useOnlyDummyData = true;
        }
      } else {
        useOnlyDummyData = true;
      }

      if (apiData.length > 0 && !useOnlyDummyData) {
        setStageList([...apiData, ...dummyData]);
      } else {
        setStageList(dummyData);
      }

      setError(null);
    } catch (err) {
      console.log(err);
      setError("Could not load data. Using sample data instead.");
      setStageList(dummyData);
    } finally {
      setLoading(false);
    }
  };

  // Handle date filter change
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    // Reset to first page
    setCurrentPage(1);
    // Update URL params
    setSearchParams({
      date: newDate,
      stage: selectedStage,
      search: searchTerm
    });
  };

  // Handle stage filter change
  const handleStageChange = (e) => {
    const newStage = e.target.value;
    // Reset to first page
    setCurrentPage(1);
    // Update URL params
    setSearchParams({
      date: selectedDate,
      stage: newStage,
      search: searchTerm
    });
  };

  // Apply all filters to get filtered data
  const filteredStageList = stageList.filter(item => {
    // Date filter (simulate date filtering based on AM/PM for demo)
    let passesDateFilter = true;
    if (selectedDate !== "ALL") {
      if (selectedDate.includes("April 1")) {
        passesDateFilter = item.startTime && item.startTime.includes("AM");
      } else if (selectedDate.includes("April 2")) {
        passesDateFilter = item.startTime && item.startTime.includes("PM");
      } else if (selectedDate.includes("April 3")) {
        passesDateFilter = item.tentativeTime && parseInt(item.tentativeTime) < 30;
      } else if (selectedDate.includes("April 4")) {
        passesDateFilter = item.tentativeTime && parseInt(item.tentativeTime) >= 30;
      }
    }

    // Stage filter
    let passesStageFilter = true;
    if (selectedStage !== "ALL Stage") {
      const stageNumber = selectedStage.replace("Stage ", "");
      passesStageFilter = item.remark && item.remark.includes(`Stage ${stageNumber}`);
    }

    return passesDateFilter && passesStageFilter;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredStageList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStageList.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Dynamically adjust number of page buttons based on screen size
    const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

    if (totalPages <= maxPageNumbersToShow) {
      // Show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited page numbers with dots
      if (currentPage <= 2) {
        // Near the start
        for (let i = 1; i <= 3; i++) {
          if (i <= totalPages) pageNumbers.push(i);
        }
        if (totalPages > 3) {
          pageNumbers.push('...');
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 1) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          if (i > 0) pageNumbers.push(i);
        }
      } else {
        // Middle
        pageNumbers.push(1);
        if (currentPage > 3) pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        if (currentPage < totalPages - 2) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
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
    if (searchTerm) {
      filterInfo.textContent += ` | Search: ${searchTerm}`;
    }
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

    // Use all filtered data for PDF, not just current page
    if (filteredStageList && filteredStageList.length > 0) {
      filteredStageList.forEach((item, index) => {
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
      const placeholderCell = document.createElement('td');
      placeholderCell.textContent = 'No data available';
      placeholderCell.style.border = '1px solid #ddd';
      placeholderCell.style.padding = '8px';
      placeholderCell.style.textAlign = 'center';
      placeholderCell.colSpan = 7;
      row.appendChild(placeholderCell);
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    pdfContent.appendChild(table);

    // PDF filename with filter parameters
    const datePart = selectedDate === "ALL" ? "All_Dates" : selectedDate.replace(/, /g, '_').replace(/ /g, '_');
    const stagePart = selectedStage.replace(/ /g, '_');
    const searchPart = searchTerm ? `_Search_${searchTerm.replace(/ /g, '_')}` : '';
    const fileName = `Stage_List_Report_${datePart}_${stagePart}${searchPart}.pdf`;

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

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Stage Report
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              {/* Date Filter - Updated with floating label */}
              <div className="relative w-full sm:w-auto">
                <select
                  id="date-select"
                  className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                  value={selectedDate}
                  onChange={handleDateChange}
                >
                  <option value="ALL">All Dates</option>
                  <option value="April 1, 2025">April 1, 2025</option>
                  <option value="April 2, 2025">April 2, 2025</option>
                  <option value="April 3, 2025">April 3, 2025</option>
                  <option value="April 4, 2025">April 4, 2025</option>
                </select>
                <label
                  htmlFor="date-select"
                  className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                >
                  Date
                </label>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              
              {/* Stage Filter - Updated with floating label */}
              <div className="relative w-full sm:w-auto">
                <select
                  id="stage-select"
                  className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                  value={selectedStage}
                  onChange={handleStageChange}
                >
                  <option value="ALL Stage">All Stage</option>
                  <option value="Stage 1">Stage 1</option>
                  <option value="Stage 2">Stage 2</option>
                  <option value="Stage 3">Stage 3</option>
                  <option value="Stage 4">Stage 4</option>
                </select>
                <label
                  htmlFor="stage-select"
                  className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                >
                  Stage
                </label>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
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

          <div>
            <div ref={printRef} className="w-full">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
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
                      {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-100">
                            <td className="p-2 md:p-3">{indexOfFirstItem + index + 1}</td>
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
                          <td colSpan="7" className="p-6 text-center text-gray-600">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <i className="fa-solid fa-search text-2xl text-gray-400"></i>
                              <p>No items found for selected filters</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination section */}
            {filteredStageList.length > rowsPerPage && (
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                {/* Showing X of Y rows */}
                <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                  {filteredStageList.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredStageList.length)} of ${filteredStageList.length} rows` : '0 rows'}
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                  {/* Previous Button with icon */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                  >
                    <i className="fa-solid fa-angle-right transform rotate-180"></i>
                    <span className="hidden sm:inline p-1">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {renderPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => page !== '...' && handlePageChange(page)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
                          } ${page === '...' ? 'pointer-events-none' : ''}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button with icon */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
                  >
                    <span className="hidden sm:inline p-1">Next</span>
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}


export default DStageReport
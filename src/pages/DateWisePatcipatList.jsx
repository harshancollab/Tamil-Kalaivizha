import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const DateWiseParticipantList = () => {
  // Create dummy data for demonstration
  const dummyData = {
    "ALL": [
      {
        schoolCode: "933",
        schoolName: "St. Mary's Higher Secondary School",
        upBoys: "12",
        upGirls: "15",
        lpBoys: "8",
        lpGirls: "10",
        hsBoys: "20",
        hsGirls: "18",
        hssBoys: "14",
        hssGirls: "16"
      },
      {
        schoolCode: "847",
        schoolName: "Government Model School",
        upBoys: "9",
        upGirls: "11",
        lpBoys: "7",
        lpGirls: "9",
        hsBoys: "14",
        hsGirls: "16",
        hssBoys: "10",
        hssGirls: "12"
      },
      {
        schoolCode: "562",
        schoolName: "Mount Carmel Public School",
        upBoys: "15",
        upGirls: "18",
        lpBoys: "11",
        lpGirls: "13",
        hsBoys: "22",
        hsGirls: "24",
        hssBoys: "18",
        hssGirls: "20"
      },
      {
        schoolCode: "425",
        schoolName: "Little Flower High School",
        upBoys: "7",
        upGirls: "9",
        lpBoys: "5",
        lpGirls: "8",
        hsBoys: "12",
        hsGirls: "15",
        hssBoys: "9",
        hssGirls: "11"
      },
      {
        schoolCode: "781",
        schoolName: "Central Academy",
        upBoys: "14",
        upGirls: "16",
        lpBoys: "10",
        lpGirls: "12",
        hsBoys: "18",
        hsGirls: "20",
        hssBoys: "15",
        hssGirls: "17"
      }
    ],
    "2025-04-01": [
      {
        schoolCode: "933",
        schoolName: "St. Mary's Higher Secondary School",
        upBoys: "4",
        upGirls: "5",
        lpBoys: "3",
        lpGirls: "4",
        hsBoys: "7",
        hsGirls: "6",
        hssBoys: "5",
        hssGirls: "4"
      },
      {
        schoolCode: "847",
        schoolName: "Government Model School",
        upBoys: "3",
        upGirls: "4",
        lpBoys: "2",
        lpGirls: "3",
        hsBoys: "5",
        hsGirls: "6",
        hssBoys: "4",
        hssGirls: "3"
      }
    ],
    "2025-04-02": [
      {
        schoolCode: "562",
        schoolName: "Mount Carmel Public School",
        upBoys: "5",
        upGirls: "6",
        lpBoys: "4",
        lpGirls: "5",
        hsBoys: "8",
        hsGirls: "7",
        hssBoys: "6",
        hssGirls: "5"
      },
      {
        schoolCode: "425",
        schoolName: "Little Flower High School",
        upBoys: "2",
        upGirls: "3",
        lpBoys: "1",
        lpGirls: "2",
        hsBoys: "4",
        hsGirls: "5",
        hssBoys: "3",
        hssGirls: "4"
      }
    ],
    "2025-04-03": [
      {
        schoolCode: "781",
        schoolName: "Central Academy",
        upBoys: "4",
        upGirls: "5",
        lpBoys: "3",
        lpGirls: "4",
        hsBoys: "6",
        hsGirls: "7",
        hssBoys: "5",
        hssGirls: "6"
      }
    ],
    "2025-04-04": [
      {
        schoolCode: "326",
        schoolName: "Valley View School",
        upBoys: "6",
        upGirls: "8",
        lpBoys: "4",
        lpGirls: "5",
        hsBoys: "9",
        hsGirls: "11",
        hssBoys: "7",
        hssGirls: "8"
      },
      {
        schoolCode: "529",
        schoolName: "Springfield International School",
        upBoys: "5",
        upGirls: "7",
        lpBoys: "3",
        lpGirls: "4",
        hsBoys: "8",
        hsGirls: "9",
        hssBoys: "6",
        hssGirls: "7"
      },
      {
        schoolCode: "673",
        schoolName: "Riverside Public School",
        upBoys: "7",
        upGirls: "9",
        lpBoys: "5",
        lpGirls: "6",
        hsBoys: "10",
        hsGirls: "12",
        hssBoys: "8",
        hssGirls: "9"
      }
    ]
  };

  const [Alllist, setList] = useState([]);
  const printRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get('date') || "ALL";

  useEffect(() => {
    getAllitemise();
  }, [selectedDate]); // Fixed the dependency array

  const getAllitemise = async () => {
    // Instead of making an API call, we'll use our dummy data
    try {
      // Simulate API call delay
      setTimeout(() => {
        // Get data for selected date
        const dateData = dummyData[selectedDate] || [];
        setList(dateData);
      }, 300);
    } catch (err) {
      console.log(err);
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

  // New PDF generation function using html2pdf
  const generatePDF = () => {
    // Create a clone of the content for PDF generation
    const pdfContent = document.createElement('div');

    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = getPrintTitle();
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(titleElement);

    // Create table clone
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';

    // Create table header
    const thead = document.createElement('thead');

    // First header row with category headers
    const headerRow1 = document.createElement('tr');

    // Add Sl No header with rowspan 2
    const slNoHeader = document.createElement('th');
    slNoHeader.textContent = 'Sl No';
    slNoHeader.style.border = '1px solid #ddd';
    slNoHeader.style.padding = '8px';
    slNoHeader.style.backgroundColor = '#f2f2f2';
    slNoHeader.style.fontWeight = 'bold';
    slNoHeader.rowSpan = 2;
    headerRow1.appendChild(slNoHeader);

    // Add School Code header with rowspan 2
    const schoolCodeHeader = document.createElement('th');
    schoolCodeHeader.textContent = 'School Code';
    schoolCodeHeader.style.border = '1px solid #ddd';
    schoolCodeHeader.style.padding = '8px';
    schoolCodeHeader.style.backgroundColor = '#f2f2f2';
    schoolCodeHeader.style.fontWeight = 'bold';
    schoolCodeHeader.rowSpan = 2;
    headerRow1.appendChild(schoolCodeHeader);

    // Add School Name header with rowspan 2
    const schoolNameHeader = document.createElement('th');
    schoolNameHeader.textContent = 'School Name';
    schoolNameHeader.style.border = '1px solid #ddd';
    schoolNameHeader.style.padding = '8px';
    schoolNameHeader.style.backgroundColor = '#f2f2f2';
    schoolNameHeader.style.fontWeight = 'bold';
    schoolNameHeader.rowSpan = 2;
    headerRow1.appendChild(schoolNameHeader);

    // Add Category headers with colspan 2
    const categories = ['UP', 'LP', 'HS', 'HSS'];
    categories.forEach(category => {
      const th = document.createElement('th');
      th.textContent = category;
      th.style.border = '1px solid #ddd';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f2f2f2';
      th.style.fontWeight = 'bold';
      th.colSpan = 2;
      headerRow1.appendChild(th);
    });

    // Add Total header with rowspan 2
    const totalHeader = document.createElement('th');
    totalHeader.textContent = 'Total';
    totalHeader.style.border = '1px solid #ddd';
    totalHeader.style.padding = '8px';
    totalHeader.style.backgroundColor = '#f2f2f2';
    totalHeader.style.fontWeight = 'bold';
    totalHeader.rowSpan = 2;
    headerRow1.appendChild(totalHeader);

    // Add first header row to thead
    thead.appendChild(headerRow1);

    // Second header row for Boys/Girls
    const headerRow2 = document.createElement('tr');

    // Add Boys/Girls headers for each category
    categories.forEach(() => {
      const boysTh = document.createElement('th');
      boysTh.textContent = 'Boys';
      boysTh.style.border = '1px solid #ddd';
      boysTh.style.padding = '8px';
      boysTh.style.backgroundColor = '#f2f2f2';
      boysTh.style.fontWeight = 'bold';
      headerRow2.appendChild(boysTh);

      const girlsTh = document.createElement('th');
      girlsTh.textContent = 'Girls';
      girlsTh.style.border = '1px solid #ddd';
      girlsTh.style.padding = '8px';
      girlsTh.style.backgroundColor = '#f2f2f2';
      girlsTh.style.fontWeight = 'bold';
      headerRow2.appendChild(girlsTh);
    });

    // Add second header row to thead
    thead.appendChild(headerRow2);

    // Add thead to table
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    // If no data, add a sample row (same as in your code)
    if (!Alllist || Alllist.length === 0) {
      const row = document.createElement('tr');

      // Add cells for the sample row
      const sampleData = [
        '1', '933', 'School 1', '8', '9', '6', '4', '5', '3', '7', '2', '44'
      ];

      sampleData.forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        td.style.textAlign = 'center';
        row.appendChild(td);
      });

      tbody.appendChild(row);
    } else {
      // Add rows from actual data
      Alllist.forEach((item, index) => {
        const row = document.createElement('tr');

        // Calculate total
        const total = (
          parseInt(item.upBoys || 0) +
          parseInt(item.upGirls || 0) +
          parseInt(item.lpBoys || 0) +
          parseInt(item.lpGirls || 0) +
          parseInt(item.hsBoys || 0) +
          parseInt(item.hsGirls || 0) +
          parseInt(item.hssBoys || 0) +
          parseInt(item.hssGirls || 0)
        );

        // Add cells
        const cellData = [
          index + 1,
          item.schoolCode || "-",
          item.schoolName || "-",
          item.upBoys || "0",
          item.upGirls || "0",
          item.lpBoys || "0",
          item.lpGirls || "0",
          item.hsBoys || "0",
          item.hsGirls || "0",
          item.hssBoys || "0",
          item.hssGirls || "0",
          total
        ];

        cellData.forEach((text, cellIndex) => {
          const td = document.createElement('td');
          td.textContent = text;
          td.style.border = '1px solid #ddd';
          td.style.padding = '8px';

          // Make school name left-aligned
          if (cellIndex === 2) {
            td.style.textAlign = 'left';
          } else {
            td.style.textAlign = 'center';
          }

          row.appendChild(td);
        });

        tbody.appendChild(row);
      });
    }

    // Add tbody to table
    table.appendChild(tbody);

    // Add table to content
    pdfContent.appendChild(table);

    // PDF filename
    const fileName = selectedDate === "ALL"
      ? "All_Dates_Participants_List.pdf"
      : `${selectedDate}_Participants_List.pdf`;

    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // Use landscape for wide tables
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
                onClick={generatePDF}
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
                          <td className="p-2 ">{item.schoolName || "-"}</td>
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
                        <td className="p-2 lg:p-3 ">{item.schoolName || "-"}</td>
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
                        <td className="p-3 ">{item.schoolName || "-"}</td>
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
//  District  -  sub - No of Participation Date Wise List
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { getDisAllPartcipteSclListAPI } from '../services/allAPI'; // Import API

const DateWiseParticipation = () => {
  
  const dummyData = {
    "ALL": [
      {
        schoolCode: "933",
        schoolName: "St. Mary's Higher Secondary School",
        subDistrict: "Munnar", // Added subDistrict field
        upBoys: "12", upGirls: "15", lpBoys: "8", lpGirls: "10",
        hsBoys: "20", hsGirls: "18", hssBoys: "14", hssGirls: "16"
      },
      {
        schoolCode: "847",
        schoolName: "Government Model School",
        subDistrict: "Chittur", 
        upBoys: "9", upGirls: "11", lpBoys: "7", lpGirls: "9",
        hsBoys: "14", hsGirls: "16", hssBoys: "10", hssGirls: "12"
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
      },
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
    // More dates...
  };

  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get('date') || "ALL";
  const selectedSubDistrict = searchParams.get('subDistrict') || "All Sub Districts"; // New state
  const searchQuery = searchParams.get('search') || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Available sub-districts
  const subDistricts = [
    'All Sub Districts',
    'Munnar',
    'Adimali',
    'Kattappana',
    'Nedumkandam',
    'Devikulam',
    'Chittur',
    'Pattambi'
  ];

  // Load data from API when component mounts or parameters change
  useEffect(() => {
    getAllData();
  }, [selectedDate, selectedSubDistrict]); // Re-fetch when date or subdistrict changes

  const getAllData = async () => {
    setLoading(true);
    const token = sessionStorage.getItem('token');
    const userDistrict = sessionStorage.getItem('userDistrict');
    
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getDisAllPartcipteSclListAPI(reqHeader, userDistrict);
        if (result?.status === 200) {
          // Process API data
          const apiData = result.data;
          const formattedData = selectedDate === "ALL" ? apiData : apiData.filter(item => {
            // Implement date filtering logic based on your API response
            return true; // Replace with actual condition
          });
          setList(formattedData);
          applyFilters(formattedData, searchQuery, selectedSubDistrict);
        } else {
          // Fall back to dummy data
          const dummyDataForDate = dummyData[selectedDate] || dummyData["ALL"];
          setList(dummyDataForDate);
          applyFilters(dummyDataForDate, searchQuery, selectedSubDistrict);
        }
      } catch (err) {
        console.log(err);
        // Fall back to dummy data
        const dummyDataForDate = dummyData[selectedDate] || dummyData["ALL"];
        setList(dummyDataForDate);
        applyFilters(dummyDataForDate, searchQuery, selectedSubDistrict);
      } finally {
        setLoading(false);
      }
    } else {
      // No token, use dummy data
      const dummyDataForDate = dummyData[selectedDate] || dummyData["ALL"];
      setList(dummyDataForDate);
      applyFilters(dummyDataForDate, searchQuery, selectedSubDistrict);
      setLoading(false);
    }
  };

  // Apply filters for subDistrict and search
  const applyFilters = (data, search, subDistrict) => {
    let filtered = data;
    
    // Filter by subDistrict
    if (subDistrict && subDistrict !== "All Sub Districts") {
      filtered = filtered.filter(item => item.subDistrict === subDistrict);
    }
    
    // Filter by search query
    if (search && search.trim() !== "") {
      const lowercaseQuery = search.toLowerCase();
      filtered = filtered.filter(item =>
        item.schoolName.toLowerCase().includes(lowercaseQuery) ||
        item.schoolCode.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredList(filtered);
  };

  // Update URL parameters
  const updateSearchParams = (date, subDistrict, search) => {
    const params = new URLSearchParams();
    if (date !== "ALL") params.append('date', date);
    if (subDistrict !== "All Sub Districts") params.append('subDistrict', subDistrict);
    if (search && search.trim() !== "") params.append('search', search.trim());
    setSearchParams(params);
  };

  // Handle date change
  const handleDateChange = (e) => {
    updateSearchParams(e.target.value, selectedSubDistrict, searchQuery);
    setCurrentPage(1);
  };

  // Handle subDistrict change
  const handleSubDistrictChange = (e) => {
    updateSearchParams(selectedDate, e.target.value, searchQuery);
    setCurrentPage(1);
  };
  
  // Search handlers
  const handleSearch = (e) => {
    const newSearchQuery = e.target.value;
    updateSearchParams(selectedDate, selectedSubDistrict, newSearchQuery);
    applyFilters(list, newSearchQuery, selectedSubDistrict);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateSearchParams(selectedDate, selectedSubDistrict, e.target.value);
      applyFilters(list, e.target.value, selectedSubDistrict);
    }
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate pagination numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          if (i <= totalPages) pageNumbers.push(i);
        }
        if (totalPages > 3) {
          pageNumbers.push('...');
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          if (i > 0) pageNumbers.push(i);
        }
      } else {
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

  // PDF generation
  const getPrintTitle = () => {
    let title = "";
    if (selectedDate === "ALL") {
      title = "All Dates - Participants List";
    } else {
      const dateObj = new Date(selectedDate);
      title = `Participants List on ${dateObj.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })}`;
    }
    
    // Add sub-district to title
    if (selectedSubDistrict !== "All Sub Districts") {
      title += ` - ${selectedSubDistrict} Sub District`;
    }
    
    return title;
  };

  const generatePDF = () => {
    const pdfContent = document.createElement('div');
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = getPrintTitle();
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(titleElement);
    
    // Create table with proper styling
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow1 = document.createElement('tr');
    const headerRow2 = document.createElement('tr');
    
    // First header row with category labels
    ['Sl No', 'School Code', 'School Name', 'Sub District'].forEach(label => {
      const th = document.createElement('th');
      th.textContent = label;
      th.style.border = '1px solid #ddd';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f2f2f2';
      th.rowSpan = 2;
      headerRow1.appendChild(th);
    });
    
    // Add category headers
    ['UP', 'LP', 'HS', 'HSS'].forEach(category => {
      const th = document.createElement('th');
      th.textContent = category;
      th.style.border = '1px solid #ddd';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f2f2f2';
      th.colSpan = 2;
      headerRow1.appendChild(th);
    });
    
    // Add Total column
    const totalHeader = document.createElement('th');
    totalHeader.textContent = 'Total';
    totalHeader.style.border = '1px solid #ddd';
    totalHeader.style.padding = '8px';
    totalHeader.style.backgroundColor = '#f2f2f2';
    totalHeader.rowSpan = 2;
    headerRow1.appendChild(totalHeader);
    
    // Second header row with Boys/Girls
    ['UP', 'LP', 'HS', 'HSS'].forEach(() => {
      ['Boys', 'Girls'].forEach(gender => {
        const th = document.createElement('th');
        th.textContent = gender;
        th.style.border = '1px solid #ddd';
        th.style.padding = '8px';
        th.style.backgroundColor = '#f2f2f2';
        headerRow2.appendChild(th);
      });
    });
    
    thead.appendChild(headerRow1);
    thead.appendChild(headerRow2);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    filteredList.forEach((item, index) => {
      const row = document.createElement('tr');
      
      // Calculate total
      const total = (
        parseInt(item.upBoys || 0) + parseInt(item.upGirls || 0) +
        parseInt(item.lpBoys || 0) + parseInt(item.lpGirls || 0) +
        parseInt(item.hsBoys || 0) + parseInt(item.hsGirls || 0) +
        parseInt(item.hssBoys || 0) + parseInt(item.hssGirls || 0)
      );
      
      // Add cells
      [
        index + 1,
        item.schoolCode || "-",
        item.schoolName || "-",
        item.subDistrict || "-",
        item.upBoys || "0",
        item.upGirls || "0",
        item.lpBoys || "0", 
        item.lpGirls || "0",
        item.hsBoys || "0",
        item.hsGirls || "0",
        item.hssBoys || "0",
        item.hssGirls || "0",
        total
      ].forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        td.style.textAlign = 'center';
        row.appendChild(td);
      });
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    pdfContent.appendChild(table);
    
    // PDF options
    const fileName = selectedDate === "ALL" ? 
      `All_Dates_${selectedSubDistrict.replace(/ /g, '_')}_Participants_List.pdf` : 
      `${selectedDate}_${selectedSubDistrict.replace(/ /g, '_')}_Participants_List.pdf`;
    
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
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
            Sub District No of Participation Date Wise List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
            
              {/* Sub District selection dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                  id="sub-district-select"
                  value={selectedSubDistrict}
                  onChange={handleSubDistrictChange}
                >
                  {subDistricts.map((option, index) => (
                    <option key={`sub-district-${index}`} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="sub-district-select"
                  className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                >
                  Sub District
                </label>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
                {/* Date selection dropdown */}
                <div className="relative w-full sm:w-auto">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                  id="date-select"
                  onChange={handleDateChange}
                  value={selectedDate}
                >
                  <option value="ALL">All Dates</option>
                  <option value="2025-04-01">April 1, 2025</option>
                  <option value="2025-04-02">April 2, 2025</option>
                  <option value="2025-04-03">April 3, 2025</option>
                  <option value="2025-04-04">April 4, 2025</option>
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
              
              
              <button
                onClick={generatePDF}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
              >
                Print
              </button>
            </div>
          </div>

          {/* Search input */}
          <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
            <input
              type="text"
              placeholder="Search School Name..."
              className="w-full bg-transparent outline-none text-sm"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              onBlur={(e) => applyFilters(list, e.target.value, selectedSubDistrict)}
            />
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
          </div>

          {/* Main data table - responsive design */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div ref={printRef} className="w-full mt-4">
              <div className="print-title hidden">{getPrintTitle()}</div>
              
              {/* Mobile view table with horizontal scrolling */}
              <div className="md:hidden w-full">
                <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <table className="min-w-full text-center border-separate border-spacing-y-2 print-table whitespace-nowrap" style={{ minWidth: "800px" }}>
                    {/* Mobile table header and body content */}
                    <thead className="text-sm">
                      <tr>
                        <th rowSpan="2" className="p-3 align-bottom">Sl No</th>
                        <th rowSpan="2" className="p-3 align-bottom">School code</th>
                        <th rowSpan="2" className="p-3 align-bottom">School Name</th>
                      
                        {['UP', 'LP', 'HS', 'HSS'].map(category => (
                          <th key={category} colSpan="2" className="p-3">
                            <div className="relative font-normal text-sm flex items-center justify-center w-full">
                              <div className="px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                                {category}
                              </div>
                            </div>
                          </th>
                        ))}
                        <th rowSpan="2" className="p-3 align-bottom">Total</th>
                      </tr>
                      <tr className="text-gray-700">
                        {['UP', 'LP', 'HS', 'HSS'].map(category => (
                          <React.Fragment key={`${category}-headers`}>
                            <th className="p-3">Boys</th>
                            <th className="p-3">Girls</th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {currentItems && currentItems.length > 0 ? (
                        currentItems.map((item, index) => {
                          // Calculate total students
                          const total = (
                            parseInt(item.upBoys || 0) + parseInt(item.upGirls || 0) +
                            parseInt(item.lpBoys || 0) + parseInt(item.lpGirls || 0) +
                            parseInt(item.hsBoys || 0) + parseInt(item.hsGirls || 0) +
                            parseInt(item.hssBoys || 0) + parseInt(item.hssGirls || 0)
                          );
                          
                          return (
                            <tr key={index} className="hover:bg-gray-100">
                              <td className="p-3">{indexOfFirstItem + index + 1}</td>
                              <td className="p-3">{item.schoolCode || "-"}</td>
                              <td className="p-3">{item.schoolName || "-"}</td>
                            
                              <td className="p-3">{item.upBoys || "0"}</td>
                              <td className="p-3">{item.upGirls || "0"}</td>
                              <td className="p-3">{item.lpBoys || "0"}</td>
                              <td className="p-3">{item.lpGirls || "0"}</td>
                              <td className="p-3">{item.hsBoys || "0"}</td>
                              <td className="p-3">{item.hsGirls || "0"}</td>
                              <td className="p-3">{item.hssBoys || "0"}</td>
                              <td className="p-3">{item.hssGirls || "0"}</td>
                              <td className="p-3">{total}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="13" className="text-center py-4 text-gray-500">
                            {searchQuery ? "No schools found matching your search." : "No data available"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Desktop view table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                  <thead className="text-sm">
                    <tr>
                      <th rowSpan="2" className="p-3 align-bottom">Sl No</th>
                      <th rowSpan="2" className="p-3 align-bottom">School code</th>
                      <th rowSpan="2" className="p-3 align-bottom">School Name</th>
                     
                      {['UP', 'LP', 'HS', 'HSS'].map(category => (
                        <th key={category} colSpan="2" className="p-3">
                          <div className="relative font-normal text-sm flex items-center justify-center w-full">
                            <div className="px-4 py-1 border border-blue-800 rounded-full bg-white text-gray-500">
                              {category}
                            </div>
                          </div>
                        </th>
                      ))}
                      <th rowSpan="2" className="p-3 align-bottom">Total</th>
                    </tr>
                    <tr className="text-gray-700">
                      {['UP', 'LP', 'HS', 'HSS'].map(category => (
                        <React.Fragment key={`${category}-headers`}>
                          <th className="p-3">Boys</th>
                          <th className="p-3">Girls</th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {currentItems && currentItems.length > 0 ? (
                      currentItems.map((item, index) => {
                        // Calculate total students
                        const total = (
                          parseInt(item.upBoys || 0) + parseInt(item.upGirls || 0) +
                          parseInt(item.lpBoys || 0) + parseInt(item.lpGirls || 0) +
                          parseInt(item.hsBoys || 0) + parseInt(item.hsGirls || 0) +
                          parseInt(item.hssBoys || 0) + parseInt(item.hssGirls || 0)
                        );
                        
                        return (
                          <tr key={index} className="hover:bg-gray-100">
                            <td className="p-3">{indexOfFirstItem + index + 1}</td>
                            <td className="p-3">{item.schoolCode || "-"}</td>
                            <td className="p-3">{item.schoolName || "-"}</td>
                           
                            <td className="p-3">{item.upBoys || "0"}</td>
                            <td className="p-3">{item.upGirls || "0"}</td>
                            <td className="p-3">{item.lpBoys || "0"}</td>
                            <td className="p-3">{item.lpGirls || "0"}</td>
                            <td className="p-3">{item.hsBoys || "0"}</td>
                            <td className="p-3">{item.hsGirls || "0"}</td>
                            <td className="p-3">{item.hssBoys || "0"}</td>
                            <td className="p-3">{item.hssGirls || "0"}</td>
                            <td className="p-3">{total}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="13" className="text-center py-4 text-gray-500">
                          {searchQuery ? "No schools found matching your search." : "No data available"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                  {filteredList.length > 0 ? 
                    `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredList.length)} of ${filteredList.length} rows` : 
                    '0 rows'}
                </div>

                {filteredList.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                    >
                      <i className="fa-solid fa-angle-right transform rotate-180"></i>
                      <span className="hidden sm:inline p-1">Previous</span>
                    </button>

                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                      {renderPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => page !== '...' && handlePageChange(page)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm 
                            ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'}
                            ${page === '...' ? 'pointer-events-none' : ''}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
                    >
                      <span className="hidden sm:inline p-1">Next</span>
                      <i className="fa-solid fa-angle-right"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DateWiseParticipation;
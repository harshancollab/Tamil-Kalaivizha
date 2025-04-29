import React, { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Dash from '../components/Dash'
import html2pdf from 'html2pdf.js';

const SClashReport = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showTooltip, setShowTooltip] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState(searchParams.get('festival') || "ALL");
  const [selectedDate, setSelectedDate] = useState(searchParams.get('date') || "ALL");
  const [clashReports, setClashReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const printRef = useRef();

  // District and sub-district filter states
  const initialDistrict = searchParams.get('district') || 'Select';
  const initialSubDistrict = searchParams.get('subDistrict') || 'Select';
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState(initialSubDistrict);
  const [availableSubDistricts, setAvailableSubDistricts] = useState(['Select']);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // District and Sub-district data
  const allDistricts = [
    'Select',
    'Idukki',
    'Ernakulam',
    'Palakkad',
    'Kozhikode',
    'Wayanad',
    'Thrissur',
  ];

  const districtToSubDistrict = {
    'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
    'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
    'Ernakulam': [],
    'Kozhikode': ['vatakara'],
    'Wayanad': [],
    'Thrissur': []
  };

  // Dummy data for development with district and sub-district added
  const dummyClashReports = [
    {
      _id: "1",
      regNo: 101,
      studentName: "Arun Kumar",
      schoolCode: 501,
      schoolName: "St. Joseph School",
      festival: "UP",
      date: "2025-04-01",
      district: "Idukki",
      subDistrict: "Munnar",
      clashItems: ["Storytelling (9:30 AM)", "Monoact (9:30 AM)", "Essay (8:30 AM)"]
    },
    {
      _id: "2",
      regNo: 102,
      studentName: "Priya Sharma",
      schoolCode: 502,
      schoolName: "Mount Carmel School",
      festival: "LP",
      date: "2025-04-01",
      district: "Idukki",
      subDistrict: "Adimali",
      clashItems: ["Drawing (10:30 AM)", "Painting (10:30 AM)", "Speech (11:00 AM)"]
    },
    {
      _id: "3",
      regNo: 103,
      studentName: "Rahul Singh",
      schoolCode: 503,
      schoolName: "Holy Cross School",
      festival: "HS",
      date: "2025-04-02",
      district: "Palakkad",
      subDistrict: "Chittur",
      clashItems: ["Debate (1:00 PM)", "Quiz (1:00 PM)", "Essay (2:30 PM)"]
    },
    {
      _id: "4",
      regNo: 104,
      studentName: "Deepa Nair",
      schoolCode: 504,
      schoolName: "St. Thomas School",
      festival: "HSS",
      date: "2025-04-02",
      district: "Palakkad",
      subDistrict: "Pattambi",
      clashItems: ["Group Song (11:30 AM)", "Solo Song (11:30 AM)", "Classical Dance (12:30 PM)"]
    },
    {
      _id: "5",
      regNo: 105,
      studentName: "Vikram Patel",
      schoolCode: 505,
      schoolName: "Little Flower School",
      festival: "UP",
      date: "2025-04-03",
      district: "Ernakulam",
      subDistrict: "",
      clashItems: ["Elocution (2:00 PM)", "Story Writing (2:00 PM)"]
    },
    {
      _id: "6",
      regNo: 106,
      studentName: "Meera Krishnan",
      schoolCode: 506,
      schoolName: "Sacred Heart School",
      festival: "LP",
      date: "2025-04-03",
      district: "Kozhikode",
      subDistrict: "vatakara",
      clashItems: ["Clay Modeling (9:00 AM)", "Origami (9:00 AM)"]
    },
    {
      _id: "7",
      regNo: 107,
      studentName: "Arjun Menon",
      schoolCode: 507,
      schoolName: "Don Bosco School",
      festival: "HS",
      date: "2025-04-04",
      district: "Wayanad",
      subDistrict: "",
      clashItems: ["Chess (3:00 PM)", "Carrom (3:00 PM)"]
    },
    {
      _id: "8",
      regNo: 108,
      studentName: "Divya Pillai",
      schoolCode: 508,
      schoolName: "Maria Montessori School",
      festival: "HSS",
      date: "2025-04-04",
      district: "Thrissur",
      subDistrict: "",
      clashItems: ["Instrumental Music (1:30 PM)", "Western Dance (1:30 PM)"]
    },
    {
      _id: "9",
      regNo: 109,
      studentName: "Aditya Menon",
      schoolCode: 509,
      schoolName: "St. Xavier's School",
      festival: "UP",
      date: "2025-04-01",
      district: "Idukki",
      subDistrict: "Kattappana",
      clashItems: ["Drawing (10:00 AM)", "Painting (10:00 AM)"]
    },
    {
      _id: "10",
      regNo: 110,
      studentName: "Neha Gupta",
      schoolCode: 510,
      schoolName: "Carmel School",
      festival: "LP",
      date: "2025-04-01",
      district: "Idukki",
      subDistrict: "Nedumkandam",
      clashItems: ["Recitation (11:00 AM)", "Storytelling (11:00 AM)"]
    },
    {
      _id: "11",
      regNo: 111,
      studentName: "Karthik Iyer",
      schoolCode: 511,
      schoolName: "Good Shepherd School",
      festival: "HS",
      date: "2025-04-02",
      district: "Idukki",
      subDistrict: "Devikulam",
      clashItems: ["Debate (2:30 PM)", "Elocution (2:30 PM)"]
    },
    {
      _id: "12",
      regNo: 112,
      studentName: "Lakshmi Nair",
      schoolCode: 512,
      schoolName: "Vidya Niketan School",
      festival: "HSS",
      date: "2025-04-03",
      district: "Palakkad",
      subDistrict: "Mannarkkad",
      clashItems: ["Classical Dance (3:30 PM)", "Folk Dance (3:30 PM)"]
    },
    {
      _id: "13",
      regNo: 113,
      studentName: "Rohan Joshi",
      schoolCode: 513,
      schoolName: "Modern School",
      festival: "UP",
      date: "2025-04-04",
      district: "Palakkad",
      subDistrict: "Ottapalam",
      clashItems: ["Recitation (9:00 AM)", "Singing (9:00 AM)"]
    }
  ];

  // Helper function to update URL params
  const updateUrlParams = (newParams) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...newParams };

    // Remove params with value 'Select', 'ALL', or empty values
    Object.keys(updatedParams).forEach(key => {
      if (updatedParams[key] === '' || 
          (key !== 'page' && updatedParams[key] === 'Select') ||
          (key !== 'page' && updatedParams[key] === 'ALL')) {
        delete updatedParams[key];
      }
    });

    // If page is 1, remove it from the URL
    if (updatedParams.page === '1') {
      delete updatedParams.page;
    }

    setSearchParams(updatedParams);
  };

  // Parse URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const festivalParam = urlParams.get('festival');
    const dateParam = urlParams.get('date');
    const districtParam = urlParams.get('district');
    const subDistrictParam = urlParams.get('subDistrict');
    const pageParam = urlParams.get('page');
    
    if (festivalParam) {
      setSelectedFestival(festivalParam.toUpperCase());
    }
    
    if (dateParam) {
      setSelectedDate(dateParam);
    }

    if (districtParam) {
      setSelectedDistrict(districtParam);
    }

    if (subDistrictParam) {
      setSelectedSubDistrict(subDistrictParam);
    }

    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
  }, []);

  // Handle district change
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    
    // Update available sub-districts based on selected district
    if (district === 'Select') {
      setAvailableSubDistricts(['Select']);
      setSelectedSubDistrict('Select');
    } else {
      const subDistricts = ['Select', ...(districtToSubDistrict[district] || [])];
      setAvailableSubDistricts(subDistricts);
      setSelectedSubDistrict('Select');
    }
    
    // Update URL params
    updateUrlParams({ district: district, subDistrict: 'Select', page: '1' });
  };

  // Handle sub-district change
  const handleSubDistrictChange = (e) => {
    const subDistrict = e.target.value;
    setSelectedSubDistrict(subDistrict);
    
    // Update URL params
    updateUrlParams({ subDistrict: subDistrict, page: '1' });
  };

  // Handle festival change
  const handleFestivalChange = (e) => {
    const festival = e.target.value;
    setSelectedFestival(festival);
    updateUrlParams({ festival: festival, page: '1' });
  };

  // Handle date change
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    updateUrlParams({ date: date, page: '1' });
  };

  // Apply filters
  const applyFilters = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredData = [...dummyClashReports];
      
      // Apply festival filter
      if (selectedFestival !== "ALL") {
        filteredData = filteredData.filter(report => report.festival === selectedFestival);
      }
      
      // Apply date filter
      if (selectedDate !== "ALL") {
        filteredData = filteredData.filter(report => report.date === selectedDate);
      }

      // Apply district filter
      if (selectedDistrict !== "Select") {
        filteredData = filteredData.filter(report => report.district === selectedDistrict);
      }

      // Apply sub-district filter
      if (selectedSubDistrict !== "Select") {
        filteredData = filteredData.filter(report => report.subDistrict === selectedSubDistrict);
      }
      
      setFilteredReports(filteredData);
      setLoading(false);
      setCurrentPage(1); // Reset to first page when changing filters
    }, 500); // Simulate a half-second loading time
  };

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedFestival, selectedDate, selectedDistrict, selectedSubDistrict]);

  // Setup available sub-districts when district changes
  useEffect(() => {
    if (selectedDistrict !== 'Select') {
      const subDistricts = ['Select', ...(districtToSubDistrict[selectedDistrict] || [])];
      setAvailableSubDistricts(subDistricts);
    } else {
      setAvailableSubDistricts(['Select']);
    }
  }, [selectedDistrict]);

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      updateUrlParams({ page: pageNumber.toString() });
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

  // Generate the appropriate title based on the selected filters
  const getPrintTitle = () => {
    let title = "";
    
    // Festival part of the title
    if (selectedFestival === "ALL") {
      title = "ALL Festival";
    } else {
      title = `${selectedFestival} Tamil Kalaivizha`;
    }
    
    // Date part of the title
    if (selectedDate !== "ALL") {
      const dateObj = new Date(selectedDate);
      const formattedDate = dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      title += ` - ${formattedDate}`;
    }

    // District part of the title
    if (selectedDistrict !== "Select") {
      title += ` - ${selectedDistrict}`;
      
      // Sub-district part of the title
      if (selectedSubDistrict !== "Select") {
        title += ` (${selectedSubDistrict})`;
      }
    }
    
    title += " - Clash List Report";
    return title;
  };

  const handlePrint = () => {
    // Create a clone of the table for PDF generation
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
    const headerRow = document.createElement('tr');
    
    const headers = ['Sl No', 'Reg No', 'Name', 'School Code', 'School Name', 'Clash Items'];
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
    
    filteredReports.forEach((report, index) => {
      const row = document.createElement('tr');
      
      // Add cells
      const cellData = [
        index + 1,
        report.regNo || "-",
        report.studentName || "-",
        report.schoolCode || "-",
        report.schoolName || "-",
        report.clashItems.join(", ") || "-"
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
    
    table.appendChild(tbody);
    pdfContent.appendChild(table);
    
    // PDF filename with all filters
    let fileName = `${selectedFestival}`;
    if (selectedDate !== "ALL") {
      fileName += `_${selectedDate}`;
    }
    if (selectedDistrict !== "Select") {
      fileName += `_${selectedDistrict}`;
      if (selectedSubDistrict !== "Select") {
        fileName += `_${selectedSubDistrict}`;
      }
    }
    fileName += `_Clash_Report.pdf`;
    
    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
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
              Clash List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4 flex-wrap">
                  {/* Sub-District dropdown - Only show when District is selected */}
                  {selectedDistrict !== 'Select' && availableSubDistricts.length > 1 && (
                <div className="relative w-full sm:w-auto">
                  <select
                    className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                    id="sub-district-select"
                    value={selectedSubDistrict}
                    onChange={handleSubDistrictChange}
                  >
                    {availableSubDistricts.map((option, index) => (
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
              )}
                    {/* District Filter */}
                    <div className="relative w-full sm:w-auto">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                  id="district-select"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  {allDistricts.map((option, index) => (
                    <option key={`district-${index}`} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="district-select"
                  className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                >
                  District
                </label>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Date Filter */}
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
              
              {/* Festival Filter */}
              <div className="relative w-full sm:w-auto">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                  id="festival-select"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                >
                  <option value="ALL">ALL Festival</option>
                  <option value="UP">UP</option>
                  <option value="LP">LP</option>
                  <option value="HS">HS</option>
                  <option value="HSS">HSS</option>
                </select>
                <label
                  htmlFor="festival-select"
                  className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                >
                  Festival
                </label>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
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
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="text-blue-600">Loading clash reports...</div>
                  </div>
                ) : filteredReports.length === 0 ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="text-gray-600">
                      No clash reports found
                      {selectedFestival !== "ALL" ? ` for ${selectedFestival}` : ""}
                      {selectedDate !== "ALL" ? ` on ${new Date(selectedDate).toLocaleDateString()}` : ""}
                      {selectedDistrict !== "Select" ? ` in ${selectedDistrict}` : ""}
                      {selectedSubDistrict !== "Select" ? ` (${selectedSubDistrict})` : ""}
                    </div>
                  </div>
                ) : (
                  <>
                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                      <thead className="text-xs sm:text-sm">
                        <tr className="text-gray-700">
                          <th className="p-2 md:p-3">Sl No</th>
                          <th className="p-2 md:p-3">Reg No</th>
                          <th className="p-2 md:p-3">Name</th>
                          <th className="p-2 md:p-3">School code</th>
                          <th className="p-2 md:p-3">School Name</th>
                          <th className="p-2 md:p-3">Clash Items</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs sm:text-sm">
                        {currentItems.map((report, index) => (
                          <tr key={report._id} className="hover:bg-gray-100">
                            <td className="p-2 md:p-3">{indexOfFirstItem + index + 1}</td>
                            <td className="p-2 md:p-3">{report.regNo}</td>
                            <td className="p-2 md:p-3">{report.studentName}</td>
                            <td className="p-2 md:p-3">{report.schoolCode}</td>
                            <td className="p-2 md:p-3">{report.schoolName}</td>
                            <td className="p-2 md:p-3 relative">
                              <span 
                                className="cursor-pointer px-2 py-1 rounded no-print"
                                onMouseEnter={() => setShowTooltip(report._id)}
                                onMouseLeave={() => setShowTooltip(null)}
                              >
                                {report.clashItems[0]?.split('(')[0]}...
                                {showTooltip === report._id && (
                                  <div className="absolute z-10 bg-gray-200 text-black text-xs rounded py-2 px-3 -mt-32 left-1/2 transform -translate-x-1/2 w-48 shadow-lg">
                                    <ul className="text-left space-y-1">
                                      {report.clashItems.map((item, idx) => (
                                        <li key={idx} className="last:border-b-0 pb-1 last:pb-0">
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </span>
                              <span className="hidden print-only">
                                {report.clashItems.join(", ")}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {/* Pagination Section */}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                      {/* Showing X of Y rows */}
                      <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                        {filteredReports.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredReports.length)} of ${filteredReports.length} rows` : '0 rows'}
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
                              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${
                                currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default SClashReport
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { getDisAllPartcipteSclListAPI } from '../services/allAPI'; // Import API

const StateDatewisepaticipat = () => {
  
  const dummyData = {
    "ALL": [
      {
        schoolCode: "933",
        schoolName: "St. Mary's Higher Secondary School",
        subDistrict: "Munnar",
        district: "Idukki", // Added district field
        upBoys: "12", upGirls: "15", lpBoys: "8", lpGirls: "10",
        hsBoys: "20", hsGirls: "18", hssBoys: "14", hssGirls: "16"
      },
      // You can add more sample data here
    ],
    "2025-04-01": [
        {
          schoolCode: "933",
          schoolName: "St. Mary's Higher Secondary School",
          subDistrict: "Munnar",
          district: "Idukki",
          upBoys: "4", upGirls: "5", lpBoys: "3", lpGirls: "4",
          hsBoys: "7", hsGirls: "6", hssBoys: "5", hssGirls: "4"
        },
        {
          schoolCode: "847",
          schoolName: "Government Model School",
          subDistrict: "Chittur",
          district: "Palakkad",
          upBoys: "3", upGirls: "4", lpBoys: "2", lpGirls: "3",
          hsBoys: "5", hsGirls: "6", hssBoys: "4", hssGirls: "3"
        }
      ],
  };

  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get('date') || "ALL";
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || "Select");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState(searchParams.get('subDistrict') || "All Sub Districts");
  const [availableSubDistricts, setAvailableSubDistricts] = useState(['All Sub Districts']);
  const searchQuery = searchParams.get('search') || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Available districts
  const allDistricts = [
    'Select',
    'Idukki',
    'Ernakulam',
    'Palakkad',
    'Kozhikode',
    'Wayanad',
    'Thrissur',
  ];

  // District to SubDistrict mapping
  const districtToSubDistrict = {
    'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
    'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
    'Ernakulam': [],
    'Kozhikode': ['vatakara'],
    'Wayanad': [],
    'Thrissur': []
  };

  // Load data from API when component mounts or parameters change
  useEffect(() => {
    getAllData();
  }, [selectedDate, selectedDistrict, selectedSubDistrict]); // Re-fetch when district changes too

  useEffect(() => {
    // Apply initial search from URL if present
    if (searchParams.get('search')) {
      setSearchTerm(searchParams.get('search'));
    }

    // Load district from URL if present
    const districtParam = searchParams.get('district');
    if (districtParam && districtParam !== 'Select') {
      setSelectedDistrict(districtParam);

      // Setup available sub-districts based on selected district
      const subDistricts = ['All Sub Districts', ...(districtToSubDistrict[districtParam] || [])];
      setAvailableSubDistricts(subDistricts);

      // Load sub-district from URL if present
      const subDistrictParam = searchParams.get('subDistrict');
      if (subDistrictParam && subDistricts.includes(subDistrictParam)) {
        setSelectedSubDistrict(subDistrictParam);
      }
    }
  }, [searchParams]);

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
          applyFilters(formattedData, searchQuery, selectedDistrict, selectedSubDistrict);
        } else {
          // Fall back to dummy data
          const dummyDataForDate = dummyData[selectedDate] || dummyData["ALL"];
          setList(dummyDataForDate);
          applyFilters(dummyDataForDate, searchQuery, selectedDistrict, selectedSubDistrict);
        }
      } catch (err) {
        console.log(err);
        // Fall back to dummy data
        const dummyDataForDate = dummyData[selectedDate] || dummyData["ALL"];
        setList(dummyDataForDate);
        applyFilters(dummyDataForDate, searchQuery, selectedDistrict, selectedSubDistrict);
      } finally {
        setLoading(false);
      }
    } else {
      // No token, use dummy data
      const dummyDataForDate = dummyData[selectedDate] || dummyData["ALL"];
      setList(dummyDataForDate);
      applyFilters(dummyDataForDate, searchQuery, selectedDistrict, selectedSubDistrict);
      setLoading(false);
    }
  };

  // Apply filters for district, subDistrict and search
  const applyFilters = (data, search, district = 'Select', subDistrict = 'All Sub Districts') => {
    let filtered = data;
    
    // Filter by district
    if (district && district !== "Select") {
      filtered = filtered.filter(item => item.district === district);
    }
    
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
  const updateUrlParams = (newParams) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...newParams };

    // Remove empty params or those with value 'Select'
    Object.keys(updatedParams).forEach(key => {
      if (updatedParams[key] === '' ||
          (key !== 'date' && updatedParams[key] === 'Select')) {
        delete updatedParams[key];
      }
    });

    setSearchParams(updatedParams);
  };

  // Handle date change
  const handleDateChange = (e) => {
    updateUrlParams({ date: e.target.value });
    setCurrentPage(1);
  };

  // Handle district change
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);

    // Update available sub-districts based on selected district
    if (district === 'Select') {
      setAvailableSubDistricts(['All Sub Districts']);
      setSelectedSubDistrict('All Sub Districts');
    } else {
      const subDistricts = ['All Sub Districts', ...(districtToSubDistrict[district] || [])];
      setAvailableSubDistricts(subDistricts);
      setSelectedSubDistrict('All Sub Districts');
    }

    // Update URL params
    updateUrlParams({ district: district, subDistrict: 'All Sub Districts' });
  };

  // Handle subDistrict change
  const handleSubDistrictChange = (e) => {
    const subDistrict = e.target.value;
    setSelectedSubDistrict(subDistrict);

    // Update URL params
    updateUrlParams({ subDistrict });
  };
  
  // Search handlers
  const handleSearch = (e) => {
    const newSearchQuery = e.target.value;
    updateUrlParams({ search: newSearchQuery });
    applyFilters(list, newSearchQuery, selectedDistrict, selectedSubDistrict);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateUrlParams({ search: e.target.value });
      applyFilters(list, e.target.value, selectedDistrict, selectedSubDistrict);
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
    
    // Add district to title
    if (selectedDistrict !== "Select") {
      title += ` - ${selectedDistrict} District`;
      
      // Add sub-district to title if applicable
      if (selectedSubDistrict !== "All Sub Districts") {
        title += ` - ${selectedSubDistrict} Sub District`;
      }
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
    let fileName = selectedDate === "ALL" ? "All_Dates" : selectedDate;
    
    if (selectedDistrict !== "Select") {
      fileName += `_${selectedDistrict}`;
    }
    
    if (selectedSubDistrict !== "All Sub Districts") {
      fileName += `_${selectedSubDistrict}`;
    }
    
    fileName += "_Participants_List.pdf";
    fileName = fileName.replace(/ /g, '_');
    
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
    html2pdf().from(pdfContent).set(options).save();
  };

  const clearAllFilters = () => {
    setSelectedDistrict('Select');
    setSelectedSubDistrict('All Sub Districts');
    setAvailableSubDistricts(['All Sub Districts']);
    updateUrlParams({ district: '', subDistrict: '' });
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
              District Date Wise Participants
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
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
              
              {/* District selection dropdown - NEW */}
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
              
              {/* Sub District selection dropdown - Only show when District is selected */}
              {selectedDistrict !== 'Select' && (
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
              
              {/* Print button */}
              <button
                onClick={generatePDF}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
              >
                Print
              </button>
              
              {/* Clear Filters button - show when filters are applied */}
             
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
              onBlur={(e) => applyFilters(list, e.target.value, selectedDistrict, selectedSubDistrict)}
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

export default StateDatewisepaticipat;


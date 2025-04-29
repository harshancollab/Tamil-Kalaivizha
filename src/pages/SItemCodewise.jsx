import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllItemwisepointAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const SItemCodewise = () => {
  const [schoolCodeSearch, setSchoolCodeSearch] = useState('');
  const [selectedFestival, setSelectedFestival] = useState('All Festival');
  const [Allitemwiswpoint, setItemwiswpoint] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [itemNameDisplay, setItemNameDisplay] = useState(''); // New state to store item name
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getAllItemwiswpoint();
  }, []);

  useEffect(() => {
    filterItemsByFestivalAndSchool(selectedFestival, schoolCodeSearch);

    // Update search state based on input value
    setIsSearching(schoolCodeSearch.trim() !== '');
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
    // Find and set the item name based on search input
    findItemName(schoolCodeSearch);
  }, [selectedFestival, Allitemwiswpoint, schoolCodeSearch]);

  // Function to find and display item name based on search input
  const findItemName = (searchCode) => {
    if (!searchCode.trim()) {
      setItemNameDisplay('');
      return;
    }
    
    const itemsToSearch = Allitemwiswpoint.length > 0 ? Allitemwiswpoint : resultData;
    
    // Find items that match the search code
    const matchingItems = itemsToSearch.filter(item => {
      const itemCodeStr = item.itemCode.split(' ')[0];
      return itemCodeStr.includes(searchCode);
    });
    
    // If matching items found, display the item name
    if (matchingItems.length > 0) {
      // Extract item name from "301 - Story Writing" format
      const itemCodeParts = matchingItems[0].itemCode.split(' - ');
      if (itemCodeParts.length > 1) {
        setItemNameDisplay(itemCodeParts[1]);
      } else {
        setItemNameDisplay('');
      }
    } else {
      setItemNameDisplay('');
    }
  };

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
        setItemwiswpoint(resultData);
      }
    } else {
      setItemwiswpoint(resultData);
    }
  }

  const filterItemsByFestivalAndSchool = (festival, schoolCode) => {
    if (!Allitemwiswpoint.length) return;

    // First filter by festival
    let filtered;
    switch (festival) {
      case "UP Kalaivizha":
        filtered = Allitemwiswpoint.filter(item => {
          // Extracting the item code number from "301 - Story Writing" format
          const itemCodeStr = item.itemCode.split(' ')[0];
          const itemCode = parseInt(itemCodeStr);
          return itemCode >= 300 && itemCode < 400;
        });
        break;
      case "LP Kalaivizha":
        filtered = Allitemwiswpoint.filter(item => {
          const itemCodeStr = item.itemCode.split(' ')[0];
          const itemCode = parseInt(itemCodeStr);
          return itemCode >= 400 && itemCode < 500;
        });
        break;
      case "HS Kalaivizha":
        filtered = Allitemwiswpoint.filter(item => {
          const itemCodeStr = item.itemCode.split(' ')[0];
          const itemCode = parseInt(itemCodeStr);
          return itemCode >= 500 && itemCode < 600;
        });
        break;
      case "HSS Kalaivizha":
        filtered = Allitemwiswpoint.filter(item => {
          const itemCodeStr = item.itemCode.split(' ')[0];
          const itemCode = parseInt(itemCodeStr);
          return itemCode >= 600 && itemCode < 700;
        });
        break;
      case "All Festival":
        filtered = [...Allitemwiswpoint];
        break;
      default:
        filtered = [...Allitemwiswpoint];
    }

    // Then filter by school code if provided
    if (schoolCode.trim() !== '') {
      filtered = filtered.filter(item => {
        const itemCodeStr = item.itemCode.split(' ')[0];
        return itemCodeStr.includes(schoolCode);
      });
    }

    // Add sequential numbering to filtered results AFTER both filters have been applied
    filtered = filtered.map((item, index) => ({
      ...item,
      slNo: index + 1
    }));

    setFilteredItems(filtered);
  }
  const festivalOptions = [
    { value: "All Festival", display: "All Festival" },
    { value: "UP Kalaivizha", display: "UP Kalaivizha" },
    { value: "LP Kalaivizha", display: "LP Kalaivizha" },
    { value: "HS Kalaivizha", display: "HS Kalaivizha" },
    { value: "HSS Kalaivizha", display: "HSS Kalaivizha" }
  ];
  

  const resultData = [
    { slNo: 1, itemCode: "301 - Story Writing", school: "GHSS Kozhikode", SchoolCode: 60001, studentName: "Rahul K", grade: "A", point: 9.5, totalPoint: 9.5 },
    { slNo: 2, itemCode: "302 - Essay Writing", school: "St. Joseph HSS", SchoolCode: 4003, studentName: "Anjali S", grade: "A", point: 10.0, totalPoint: 10.0 },
    { slNo: 3, itemCode: "401 - LP Story Writing", school: "MES HSS", SchoolCode: 30001, studentName: "Arun P", grade: "A", point: 9.0, totalPoint: 9.0 },
    { slNo: 4, itemCode: "402 - LP Essay Writing", school: "Govt HSS", SchoolCode: 30001, studentName: "Meera T", grade: "B", point: 8.0, totalPoint: 8.0 },
    { slNo: 5, itemCode: "403 - LP Poem Recitation", school: "Sacred Heart HSS", SchoolCode: 7601, studentName: "Vishnu M", grade: "A", point: 9.5, totalPoint: 9.5 },
    { slNo: 6, itemCode: "504 - HS Elocution", school: "Kendriya Vidyalaya", SchoolCode: 67001, studentName: "Sameera N", grade: "B", point: 8.5, totalPoint: 8.5 },
    { slNo: 7, itemCode: "605 - HSS Group Song", school: "Christ HSS", SchoolCode: 9001, studentName: "Team A", grade: "B", point: 7.5, totalPoint: 7.5 },
    { slNo: 8, itemCode: "606 - HSS Folk Dance", school: "St. Mary's HSS", SchoolCode: 20001, studentName: "Dance Group", grade: "B", point: 8.0, totalPoint: 8.0 },
    { slNo: 9, itemCode: "504 - HS Elocution", school: "Kendriya Vidyalaya", SchoolCode: 67001, studentName: "Sameera N", grade: "B", point: 8.5, totalPoint: 8.5 },
    { slNo: 10, itemCode: "605 - HSS Group Song", school: "Christ HSS", SchoolCode: 9001, studentName: "Team A", grade: "B", point: 7.5, totalPoint: 7.5 },
    { slNo: 11, itemCode: "506 - HSS Folk Dance", school: "St. Mary's HSS", SchoolCode: 20001, studentName: "Dance Group", grade: "B", point: 8.0, totalPoint: 8.0 },
    { slNo: 12, itemCode: "506 - HSS Folk Dance", school: "St. Mary's HSS", SchoolCode: 20001, studentName: "Dance Group", grade: "B", point: 8.0, totalPoint: 8.0 }
  ];

  const handleSchoolSearchChange = (e) => {
    const searchValue = e.target.value;
    setSchoolCodeSearch(searchValue);
    // Set isSearching based on whether there's text in the search field
    setIsSearching(searchValue.trim() !== '');
    // Update URL with search parameters
    updateURLParams(searchValue, selectedFestival);
  };

  const handleFestivalChange = (e) => {
    setSelectedFestival(e.target.value);
    // Update URL with festival parameter
    updateURLParams(schoolCodeSearch, e.target.value);
  };

  // Function to update URL parameters
  const updateURLParams = (schoolCode, festival) => {
    const url = new URL(window.location);

    if (schoolCode.trim() !== '') {
      url.searchParams.set('schoolCode', schoolCode);
    } else {
      url.searchParams.delete('schoolCode');
    }

    if (festival !== 'All Festival') {
      url.searchParams.set('festival', festival);
    } else {
      url.searchParams.delete('festival');
    }

    window.history.replaceState({}, '', url);
  };

  // Function to read URL parameters on component mount
  const readURLParams = () => {
    const url = new URL(window.location);
    const schoolCodeParam = url.searchParams.get('schoolCode');
    const festivalParam = url.searchParams.get('festival');

    if (schoolCodeParam) {
      setSchoolCodeSearch(schoolCodeParam);
      setIsSearching(true); // Set isSearching immediately when loading from URL params
    }

    if (festivalParam) {
      setSelectedFestival(festivalParam);
    }
  };

  const getPrintTitle = () => {
    switch (selectedFestival) {
      case "UP Kalaivizha":
        return "UP Tamil Kalaivizha - Item Code Wise Point Report";
      case "LP Kalaivizha":
        return "LP Tamil Kalaivizha - Item Code Wise Point Report";
      case "HS Kalaivizha":
        return "HS Tamil Kalaivizha - Item Code Wise Point Report";
      case "HSS Kalaivizha":
        return "HSS Tamil Kalaivizha - Item Code Wise Point Report";
      case "All Festival":
        return "All Festival Tamil Kalaivizha - Item Code Wise Point Report";
      default:
        return "Item Code Wise Point Report";
    }
  };

  const handlePrint = () => {
    // Create a clean container for the PDF content
    const pdfContent = document.createElement('div');

    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = getPrintTitle();
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(titleElement);

    // Clone the table for PDF generation
    const tableContainer = document.getElementById('item-wise-point-table');
    const tableClone = tableContainer.querySelector('table').cloneNode(true);
    tableClone.style.width = '100%';
    tableClone.style.borderCollapse = 'collapse';
    tableClone.style.marginTop = '20px';

    // Style the table headers and cells
    const headers = tableClone.querySelectorAll('th');
    headers.forEach(header => {
      header.style.border = '1px solid #ddd';
      header.style.padding = '8px';
      header.style.backgroundColor = '#f2f2f2';
      header.style.fontWeight = 'bold';
    });

    const cells = tableClone.querySelectorAll('td');
    cells.forEach(cell => {
      cell.style.border = '1px solid #ddd';
      cell.style.padding = '8px';
      cell.style.textAlign = 'center';
    });

    pdfContent.appendChild(tableClone);

    // PDF filename based on the selected festival
    const fileName = `${selectedFestival.replace(/ /g, '_')}_Item_Wise_Points.pdf`;

    // PDF options - you can adjust as needed
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // Using landscape for this wide table
    };

    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save();
  };

  const clearSearch = () => {
    // Reset search and filter states
    setSchoolCodeSearch('');
    setIsSearching(false);
    setItemNameDisplay(''); // Clear the item name display

    // Clear URL parameters
    updateURLParams('', selectedFestival);

    // Force a re-filter with empty search text
    filterItemsByFestivalAndSchool(selectedFestival, '');
  };

  // Complete reset function that clears search and resets festival
  const resetAllFilters = () => {
    setSchoolCodeSearch('');
    setSelectedFestival('All Festival');
    setIsSearching(false);
    setItemNameDisplay(''); // Clear the item name display

    // Clear all URL parameters
    const url = new URL(window.location);
    url.searchParams.delete('schoolCode');
    url.searchParams.delete('festival');
    window.history.replaceState({}, '', url);

    // Force a re-filter with empty search and default festival
    filterItemsByFestivalAndSchool('All Festival', '');
    
    // Reset to first page
    setCurrentPage(1);
  };

  // Calculate pagination values
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  
  // Determine if we're actively filtering
  const isFiltering = isSearching || selectedFestival !== 'All Festival';

  // Determine what data to display - filtered or full dataset
  const allDisplayData = isFiltering ? filteredItems :
    (Allitemwiswpoint.length > 0 ? Allitemwiswpoint : resultData);
    
  // Get only the current page items
  const currentItems = allDisplayData.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate total pages
  const totalPages = Math.ceil(allDisplayData.length / rowsPerPage);

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

  useEffect(() => {
    if (Allitemwiswpoint.length === 0 && resultData.length > 0) {
      setItemwiswpoint(resultData);
      filterItemsByFestivalAndSchool(selectedFestival, schoolCodeSearch);
    }

    // Read URL parameters on component mount
    readURLParams();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
          {/* Main header section with improved alignment */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            {/* Heading */}
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%] md:mb-0">
              Item Code Wise Point List
            </h2>
            
            {/* Filter controls row */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
              {/* Item Code Search with name display */}
              <div className="w-full sm:w-auto relative">
                <div className="flex items-center gap-2">
                  <label className="text-blue-700 whitespace-nowrap">Item Code</label>
                  <input
                    type="text"
                    className="rounded-full border border-blue-700 px-3 py-2 w-full sm:w-auto"
                    placeholder="Search by item code..."
                    value={schoolCodeSearch}
                    onChange={handleSchoolSearchChange}
                  />
                </div>
                {/* Item name display */}
                {itemNameDisplay && (
                  <div className="absolute mt-1 ml-20 text-sm font-medium text-blue-700">
                    {itemNameDisplay}
                  </div>
                )}
              </div>
              
              {/* Festival Dropdown */}
              <div className="relative w-full sm:w-40 mb-5">
      <select
        className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
        id="festival-select"
        onChange={handleFestivalChange}
        value={selectedFestival}
      >
        {festivalOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
      <label
        htmlFor="festival-select"
        className="absolute text-xs text-blue-800 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:text-blue-800 left-3"
      >
        Festival
      </label>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </div>
              
              {/* Print Button */}
              <button
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                onClick={handlePrint}
                aria-label="Print report"
              >
                Print
              </button>
            </div>
          </div>

          {/* Table section */}
          <div className="w-full mt-6">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                  <div id="item-wise-point-table" className="overflow-x-scroll md:overflow-hidden">
                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                      <thead className="bg-gray-50">
                        <tr className="text-gray-700">
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Student Name</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Rank</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                          <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                        {(isFiltering && allDisplayData.length === 0) ? (
                          <tr>
                            <td colSpan="7" className="p-4 text-center">
                              <div className="flex flex-col items-center justify-center p-6">
                                <p className="text-red-500 font-medium mb-2">No results found</p>
                                <p>
                                  No items found for {selectedFestival}
                                  {isSearching ? ` with item code containing "${schoolCodeSearch}"` : ''}
                                </p>
                                {isSearching && (
                                  <button
                                    onClick={clearSearch}
                                    className="mt-4 bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium py-2 px-4 rounded-full"
                                  >
                                    Clear Search
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ) : (
                          currentItems.map((result, index) => (
                            <tr key={result.slNo} className="hover:bg-gray-100">
                              <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.studentName}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.SchoolCode}-{result.school}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.totalPoint}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination Controls */}
          {allDisplayData.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
              {/* Showing X of Y rows */}
              <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                {`${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, allDisplayData.length)} of ${allDisplayData.length} rows`}
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
          )}
        </div>
      </div>
    </>
  )
}



export default SItemCodewise
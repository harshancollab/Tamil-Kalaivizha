import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllItemwisepointAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';

const ItemWisePoint = () => {
  const [schoolSearch, setSchoolSearch] = useState('');
  const [selectedFestival, setSelectedFestival] = useState('All Festival');
  const [Allitemwiswpoint, setItemwiswpoint] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getAllItemwiswpoint();
  }, []);

  useEffect(() => {
    filterItemsByFestivalAndSchool(selectedFestival, schoolSearch);
    
    // Update search state based on input value
    setIsSearching(schoolSearch.trim() !== '');
  }, [selectedFestival, Allitemwiswpoint, schoolSearch]);

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

  const filterItemsByFestivalAndSchool = (festival, schoolName) => {
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
    
    // Then filter by school name if provided
    if (schoolName.trim() !== '') {
      filtered = filtered.filter(item => 
        item.school.toLowerCase().includes(schoolName.toLowerCase())
      );
    }
    
    // Add sequential numbering to filtered results AFTER both filters have been applied
    filtered = filtered.map((item, index) => ({
      ...item,
      slNo: index + 1
    }));
    
    setFilteredItems(filtered);
  }

  const resultData = [
    { slNo: 1, itemCode: "301 - Story Writing", school: "GHSS Kozhikode", studentName: "Rahul K", grade: "A", point: 9.5, totalPoint: 9.5 },
    { slNo: 2, itemCode: "302 - Essay Writing", school: "St. Joseph HSS", studentName: "Anjali S", grade: "A", point: 10.0, totalPoint: 10.0 },
    { slNo: 3, itemCode: "401 - LP Story Writing", school: "MES HSS", studentName: "Arun P", grade: "A", point: 9.0, totalPoint: 9.0 },
    { slNo: 4, itemCode: "402 - LP Essay Writing", school: "Govt HSS", studentName: "Meera T", grade: "B", point: 8.0, totalPoint: 8.0 },
    { slNo: 5, itemCode: "403 - LP Poem Recitation", school: "Sacred Heart HSS", studentName: "Vishnu M", grade: "A", point: 9.5, totalPoint: 9.5 },
    { slNo: 6, itemCode: "504 - HS Elocution", school: "Kendriya Vidyalaya", studentName: "Sameera N", grade: "B", point: 8.5, totalPoint: 8.5 },
    { slNo: 7, itemCode: "605 - HSS Group Song", school: "Christ HSS", studentName: "Team A", grade: "B", point: 7.5, totalPoint: 7.5 },
    { slNo: 8, itemCode: "606 - HSS Folk Dance", school: "St. Mary's HSS", studentName: "Dance Group", grade: "B", point: 8.0, totalPoint: 8.0 }
  ];

  const handleSchoolSearchChange = (e) => {
    setSchoolSearch(e.target.value);
    // Set isSearching directly based on current input value
    setIsSearching(e.target.value.trim() !== '');
    // Update URL with search parameters
    updateURLParams(e.target.value, selectedFestival);
  };

  const handleFestivalChange = (e) => {
    setSelectedFestival(e.target.value);
    // Update URL with festival parameter
    updateURLParams(schoolSearch, e.target.value);
  };

  // Function to update URL parameters
  const updateURLParams = (school, festival) => {
    const url = new URL(window.location);
    
    if (school.trim() !== '') {
      url.searchParams.set('school', school);
    } else {
      url.searchParams.delete('school');
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
    const schoolParam = url.searchParams.get('school');
    const festivalParam = url.searchParams.get('festival');
    
    if (schoolParam) {
      setSchoolSearch(schoolParam);
      setIsSearching(true); // Set isSearching immediately when loading from URL params
    }
    
    if (festivalParam) {
      setSelectedFestival(festivalParam);
    }
  };

  const getPrintTitle = () => {
    switch (selectedFestival) {
      case "UP Kalaivizha":
        return "UP Tamil Kalaivizha - Item Wise Point List";
      case "LP Kalaivizha":
        return "LP Tamil Kalaivizha - Item Wise Point List";
      case "HS Kalaivizha":
        return "HS Tamil Kalaivizha - Item Wise Point List";
      case "HSS Kalaivizha":
        return "HSS Tamil Kalaivizha - Item Wise Point List";
      case "All Festival":
        return "All Festival Tamil Kalaivizha - Item Wise Point List";
      default:
        return "Item Wise Point List";
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
    setSchoolSearch('');
    setIsSearching(false); // Explicitly set isSearching to false when clearing
    // Also clear from URL
    updateURLParams('', selectedFestival);
  };
  
  useEffect(() => {
    if (Allitemwiswpoint.length === 0 && resultData.length > 0) {
      setItemwiswpoint(resultData);
      filterItemsByFestivalAndSchool(selectedFestival, schoolSearch);
    }
    
    // Read URL parameters on component mount
    readURLParams();
  }, []);

  // Determine what data to display
  const displayData = filteredItems.length > 0 ? filteredItems : 
                     (Allitemwiswpoint.length > 0 ? Allitemwiswpoint : resultData);

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Item Wise Point List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-blue-700 whitespace-nowrap min-w-max">School Name</label>
                <input
                  type="text"
                  className="rounded-full border border-blue-700 px-2 py-2 flex-grow"
                  placeholder="Search by school name..."
                  value={schoolSearch}
                  onChange={handleSchoolSearchChange}
                />
              </div>

              <button
                className={`border-blue-800 border text-blue-900 py-2 px-4 rounded-full min-w-max whitespace-nowrap ${isSearching ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!isSearching}
                onClick={clearSearch}
              >
                All Schools
              </button>

              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                  aria-label="Select Festival"
                >
                  <option value="All Festival">All Festival</option>
                  <option value="UP Kalaivizha">UP Kalaivizha</option>
                  <option value="LP Kalaivizha">LP Kalaivizha</option>
                  <option value="HS Kalaivizha">HS Kalaivizha</option>
                  <option value="HSS Kalaivizha">HSS Kalaivizha</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <button
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                onClick={handlePrint}
                aria-label="Print report"
              >
                Print
              </button>
            </div>
          </div>

          <div className="w-full mt-6">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                  <div id="item-wise-point-table" className="overflow-x-scroll md:overflow-hidden">
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
                        {displayData.length > 0 ? (
                          displayData.map((result) => (
                            <tr key={result.slNo} className="hover:bg-gray-100">
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.slNo}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCode}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.school}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.studentName}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                              <td className="p-2 md:p-3 whitespace-nowrap">{result.totalPoint}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="p-4 text-center">
                              <div className="flex flex-col items-center justify-center p-6">
                                <p className="text-red-500 font-medium mb-2">No results found</p>
                                <p>
                                  No items found for {selectedFestival}
                                  {isSearching ? ` with school name containing "${schoolSearch}"` : ''}
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
                        )}
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
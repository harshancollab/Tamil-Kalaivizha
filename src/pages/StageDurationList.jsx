import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { getAllStageDurationsAPI } from '../services/allAPI'

const StageDurationList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('code') || '');
  const printRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState("ALL Festival");
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  
  const dummyData = [
    { 
      slno: 1, 
      code: '304', 
      name: 'Story Writing', 
      dataEntered: 'Yes', 
      confirmed: 'No', 
      time: '90 min', 
      participants: 2, 
      completionTime: '1 hour 30 min', 
      stage: 'Stage A', 
      date: '28/03/2025', 
      stageTime: '10:30 AM' 
    },
    { 
      slno: 2, 
      code: '402', 
      name: 'Group Song', 
      dataEntered: 'Yes', 
      confirmed: 'Yes', 
      time: '60 min', 
      participants: 4, 
      completionTime: '55 min', 
      stage: 'Stage B', 
      date: '28/03/2025', 
      stageTime: '11:00 AM' 
    },
    { 
      slno: 3, 
      code: '501', 
      name: 'Drawing', 
      dataEntered: 'Yes', 
      confirmed: 'No', 
      time: '120 min', 
      participants: 3, 
      completionTime: '1 hour 45 min', 
      stage: 'Stage C', 
      date: '29/03/2025', 
      stageTime: '09:00 AM' 
    },
    { 
      slno: 4, 
      code: '601', 
      name: 'Debate', 
      dataEntered: 'Yes', 
      confirmed: 'Yes', 
      time: '45 min', 
      participants: 1, 
      completionTime: '40 min', 
      stage: 'Stage A', 
      date: '29/03/2025', 
      stageTime: '02:15 PM' 
    },
    { 
      slno: 5, 
      code: '602', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    },
    { 
      slno: 5, 
      code: '302', 
      name: 'Essay Writing', 
      dataEntered: 'No', 
      confirmed: 'No', 
      time: '75 min', 
      participants: 5, 
      completionTime: '1 hour 10 min', 
      stage: 'Stage B', 
      date: '30/03/2025', 
      stageTime: '10:00 AM' 
    }
  ];

  useEffect(() => {
    fetchStageDurations();
  }, []);

  const fetchStageDurations = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      
      let apiData = [];
      let useOnlyDummyData = false;
      
      try {
        if (token) {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          };
          
          const result = await getAllStageDurationsAPI(reqHeader);
          
          if (result.status === 200) {
            apiData = result.data.map((item, index) => ({
              slno: index + 1,
              code: item.itemCode,
              name: item.itemName,
              time: item.time,
              participants: item.participants,
              completionTime: item.completionTime,
              stage: item.stage || 'TBD',
              date: item.date || 'Pending',
              stageTime: item.timeSecond || 'TBD'
            }));
          }
        }
      } catch (apiError) {
        console.error("API call failed, using only dummy data:", apiError);
        useOnlyDummyData = true;
      }
      
      if (apiData.length > 0 && !useOnlyDummyData) {
        setSchools([...apiData, ...dummyData]);
      } else {
        setSchools(dummyData);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error in fetchStageDurations:", err);
      setError("Could not load data. Using sample data instead.");
      
      setSchools(dummyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialSearchTerm = searchParams.get('code') || '';
    setSearchTerm(initialSearchTerm);
    
    applyFilters(initialSearchTerm, selectedFestival);
  }, [searchParams, schools, selectedFestival]);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearchParams({ code: newSearchTerm, festival: selectedFestival });
    applyFilters(newSearchTerm, selectedFestival);
  };

  const handleFestivalChange = (e) => {
    const festival = e.target.value;
    setSelectedFestival(festival);
    setSearchParams({ code: searchTerm, festival });
    applyFilters(searchTerm, festival);
  };

 
  const applyFilters = (term, festival) => {
    if (!schools.length) return;

    
    let festivalFiltered = [];
    
    if (festival !== "ALL Festival") {
      switch (festival) {
        case "UP":
          festivalFiltered = schools.filter(item => {
            const itemCode = parseInt(item.code);
            return itemCode >= 300 && itemCode < 400;
          });
          break;
        case "Lp":
          festivalFiltered = schools.filter(item => {
            const itemCode = parseInt(item.code);
            return itemCode >= 400 && itemCode < 500;
          });
          break;
        case "Hs":
          festivalFiltered = schools.filter(item => {
            const itemCode = parseInt(item.code);
            return itemCode >= 500 && itemCode < 600;
          });
          break;
        case "Hss":
          festivalFiltered = schools.filter(item => {
            const itemCode = parseInt(item.code);
            return itemCode >= 600 && itemCode < 700;
          });
          break;
        default:
          festivalFiltered = [...schools];
      }
    } else {
      festivalFiltered = [...schools];
    }

  
    if (term) {
      const lowercasedTerm = term.toLowerCase();
      const results = festivalFiltered.filter(school =>
        school.code.toLowerCase().includes(lowercasedTerm) ||
        school.name.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredSchools(results);
    } else {
      setFilteredSchools(festivalFiltered);
    }

   
    setFilteredSchools(prevFiltered => 
      prevFiltered.map((item, index) => ({
        ...item,
        slno: index + 1
      }))
    );
  };

  
  const getPrintTitle = () => {
    switch(selectedFestival) {
      case "UP":
        return "UP Festival - Stage Duration List";
      case "Lp":
        return "LP Festival - Stage Duration List";
      case "Hs":
        return "HS Festival - Stage Duration List";
      case "Hss":
        return "HSS Festival - Stage Duration List";
      default:
        return "ALL Festival - Stage Duration List";
    }
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
      <head>
        <title>${getPrintTitle()}</title>
        <style type="text/css">
          @page {
            size: landscape;
            margin: 0.5cm;
          }
          body {
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table th, table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
          }
          table th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .print-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="print-title">${getPrintTitle()}</div>
        ${printContents}
      </body>
      </html>
    `);
    
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

 
  const clearSearch = () => {
    setSearchTerm('');
    setSearchParams(new URLSearchParams({ festival: selectedFestival }));
    applyFilters('', selectedFestival);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-hidden">
       
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-wide">
              Stage Duration List
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-40 md:w-48">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                  aria-label="Select Festival"
                >
                  <option value="ALL Festival">ALL Festival</option>
                  <option value="UP">UP Kalaivizha</option>
                  <option value="Lp">LP Kalaivizha</option>
                  <option value="Hs">HS Kalaivizha</option>
                  <option value="Hss">HSS Kalaivizha</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <button 
                onClick={handlePrint}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-6 md:px-8 py-2 rounded-full text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Print Stage Duration List"
              >
                Print
              </button>
            </div>
          </div>
          
          {/* Search bar with clear button */}
          <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
            <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
              <input
                type="text"
                placeholder="Search Item Code or Name..."
                className="w-full bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search by item code or name"
              />
            
              <div className="text-gray-500">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-4">
              <p className="flex items-center">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                {error}
              </p>
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto rounded-lg bg-white">
                <div ref={printRef} className="min-w-full">
                  <table className="min-w-full text-center">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 z-10">Sl No</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item Code</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item Name</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Time</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Participants</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Completion Time</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Stage</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Date</th>
                        <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSchools.length > 0 ? (
                        filteredSchools.map((school) => (
                          <tr key={school.slno} className="hover:bg-gray-50 b text-gray-700">
                            <td className="p-2 md:p-3 text-xs md:text-sm bg-white z-10">{school.slno}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.code}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.name}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm">{school.time}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm">{school.participants}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.completionTime}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm">{school.stage}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{school.date}</td>
                            <td className="p-2 md:p-3 text-xs md:text-sm">{school.stageTime}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="p-6 text-center text-gray-600">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <i className="fa-solid fa-search text-2xl text-gray-400"></i>
                              <p>No items found for {selectedFestival === "ALL Festival" ? "any festival" : selectedFestival}</p>
                              {searchTerm && (
                                <button
                                  onClick={clearSearch}
                                  className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                                >
                                  Clear search
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
          )}
        </div>
      </div>
    </>
  );
};

export default StageDurationList
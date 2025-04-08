import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';

const ParticipantsMorethan = () => {
  const [participants, setParticipants] = useState([])
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get params from URL, with defaults if not present
  const selectedItems = searchParams.get('items') || "ALL";
  const selectedFestival = searchParams.get('festival') || "ALL Festival";

  useEffect(() => {
    getAllParticipants();
  }, []);
  
  const getAllParticipants = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await (reqHeader);
        if (result?.status === 200) {
          setParticipants(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleItemsChange = (e) => {
    // Update URL when items selection changes
    setSearchParams({ 
      items: e.target.value,
      festival: selectedFestival 
    });
  };

  const handleFestivalChange = (e) => {
    // Update URL when festival changes
    setSearchParams({ 
      items: selectedItems,
      festival: e.target.value 
    });
  };

  // Generate appropriate title based on selections
  const getPrintTitle = () => {
    const festivalText = selectedFestival === "ALL Festival" ? 
      "ALL Festival" : `${selectedFestival} Festival`;
    const itemsText = selectedItems === "ALL" ? 
      "" : ` - More Than ${selectedItems} Items`;
    
    return `Participants List ${festivalText}${itemsText} Report`;
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
        }
        .print-table {
          width: 100%;
          border-collapse: collapse;
        }
        .print-table th, .print-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
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
        }
        .print-title {
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

  // Filter the list based on selected criteria
  const filteredParticipants = participants.filter(participant => {
    // Add your filtering logic here based on selectedItems and selectedFestival
    // This is just a placeholder - implement your actual filter logic
    let passesItemFilter = true;
    let passesFestivalFilter = true;
    
    if (selectedItems !== "ALL") {
      // Example logic: filter participants with more than X items
      // Replace with your actual logic
      // passesItemFilter = participant.itemCount > parseInt(selectedItems);
    }
    
    if (selectedFestival !== "ALL Festival") {
      // Example logic: filter by festival
      // passesFestivalFilter = participant.festival === selectedFestival;
    }
    
    return passesItemFilter && passesFestivalFilter;
  });

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header section with title and controls */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participants List more than one item
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleItemsChange}
                  value={selectedItems}
                >
                  <option value="ALL">Select no of item</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                >
                  <option value="ALL Festival">ALL Festival</option>
                  <option value="UP">UP</option>
                  <option value="Lp">Lp</option>
                  <option value="Hs">Hs</option>
                  <option value="Hss">Hss</option>
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
            <div className="overflow-x-auto -mx-4 sm:mx-0 ">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                  <thead className="text-xs sm:text-sm">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      <th className="p-2 md:p-3">Reg No</th>
                      <th className="p-2 md:p-3"> Name</th>
                      <th className="p-2 md:p-3">Gender</th>
                      <th className="p-2 md:p-3">Class</th>
                      <th className="p-2 md:p-3">School code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {filteredParticipants && filteredParticipants.length > 0 ? (
                      filteredParticipants.map((participant, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{index + 1}</td>
                          <td className="p-2 md:p-3">{participant.regNo || "-"}</td>
                          <td className="p-2 md:p-3">{participant.name || "-"}</td>
                          <td className="p-2 md:p-3">{participant.gender || "-"}</td>
                          <td className="p-2 md:p-3">{participant.class || "-"}</td>
                          <td className="p-2 md:p-3">{participant.schoolCode || "-"}</td>
                          <td className="p-2 md:p-3">{participant.schoolName || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-100">
                        <td className="p-2 md:p-3">8</td>
                        <td className="p-2 md:p-3">9</td>
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

export default ParticipantsMorethan
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const ParticipantsMorethan = () => {
  const [participants, setParticipants] = useState([])
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get params from URL, with defaults if not present
  const selectedItems = searchParams.get('items') || "ALL";
  const selectedFestival = searchParams.get('festival') || "ALL Festival";

  // Dummy data with item codes matching festival categories
  const dummyParticipants = [
    {
      regNo: "UP001",
      name: "Amal Kumar",
      gender: "Male",
      class: "5",
      schoolCode: "30075",
      schoolName: "G. M. R. S. Peermedu",
      itemCode: "301",
      itemCount: 3
    },
    {
      regNo: "UP002",
      name: "Meera Nair",
      gender: "Female",
      class: "4",
      schoolCode: "30075",
      schoolName: "G. M. R. S. Peermedu",
      itemCode: "302",
      itemCount: 2
    },
    {
      regNo: "LP001",
      name: "Rohit Menon",
      gender: "Male",
      class: "7",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "401",
      itemCount: 4
    },
    {
      regNo: "LP002",
      name: "Anjali Raj",
      gender: "Female",
      class: "6",
      schoolCode: "30081",
      schoolName: "G. H. S. Vanchivayal",
      itemCode: "405",
      itemCount: 5
    },
    {
      regNo: "HS001",
      name: "Vishnu Prasad",
      gender: "Male",
      class: "9",
      schoolCode: "30043",
      schoolName: "G. H. S. S. Anakara",
      itemCode: "501",
      itemCount: 1
    },
    {
      regNo: "HS002",
      name: "Lakshmi Suresh",
      gender: "Female",
      class: "8",
      schoolCode: "30043",
      schoolName: "G. H. S. S. Anakara",
      itemCode: "502",
      itemCount: 3
    },
    {
      regNo: "HSS001",
      name: "Arun Thomas",
      gender: "Male",
      class: "11",
      schoolCode: "30083",
      schoolName: "G. H. S. Udumbhancola",
      itemCode: "601",
      itemCount: 2
    },
    {
      regNo: "HSS002",
      name: "Divya Mohan",
      gender: "Female",
      class: "12",
      schoolCode: "30083",
      schoolName: "G. H. S. Udumbhancola",
      itemCode: "605",
      itemCount: 4
    }
  ];

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
        } else {
          // Fall back to dummy data if API call fails
          setParticipants(dummyParticipants);
        }
      } catch (err) {
        console.log(err);
        // Fall back to dummy data if API call fails
        setParticipants(dummyParticipants);
      }
    } else {
      // Use dummy data when no token is available
      setParticipants(dummyParticipants);
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
    let festivalText;
    switch(selectedFestival) {
      case "UP":
        festivalText = "UP Kalaivizha";
        break;
      case "Lp":
        festivalText = "LP Kalaivizha";
        break;
      case "Hs":
        festivalText = "HS Kalaivizha";
        break;
      case "Hss":
        festivalText = "HSS Kalaivizha";
        break;
      default:
        festivalText = "ALL Festival";
    }
    
    const itemsText = selectedItems === "ALL" ? 
      "" : ` - More Than ${selectedItems} Items`;
    
    return `Participants List ${festivalText}${itemsText} Report`;
  };

  // New PDF generation function using html2pdf
  const generatePDF = () => {
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
    
    const headers = ['Sl No', 'Reg No', 'Name', 'Gender', 'Class', 'School Code', 'School Name'];
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
    
    filteredParticipants.forEach((participant) => {
      const row = document.createElement('tr');
      
      // Add cells
      const cellData = [
        participant.slNo,
        participant.regNo || "-",
        participant.name || "-",
        participant.gender || "-",
        participant.class || "-",
        participant.schoolCode || "-",
        participant.schoolName || "-"
      ];
      
      cellData.forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        td.style.textAlign = 'left';
        row.appendChild(td);
      });
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    pdfContent.appendChild(table);
    
    // PDF filename
    let festivalName = selectedFestival === "ALL Festival" ? "All_Festivals" : selectedFestival;
    const itemsText = selectedItems === "ALL" ? "All_Items" : `More_Than_${selectedItems}_Items`;
    const fileName = `Participants_${festivalName}_${itemsText}.pdf`;
    
    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // Use landscape for wider tables
    };
    
    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save();
  };

  // Filter the list based on selected criteria
  const filteredParticipants = participants.filter(participant => {
    // Filter by number of items
    let passesItemFilter = true;
    if (selectedItems !== "ALL") {
      const itemCount = participant.itemCount || 0;
      passesItemFilter = itemCount > parseInt(selectedItems);
    }
    
    // Filter by festival using the item code ranges
    let passesFestivalFilter = true;
    if (selectedFestival !== "ALL Festival") {
      const itemCode = parseInt(participant.itemCode || "0");
      
      switch (selectedFestival) {
        case "UP":
          passesFestivalFilter = itemCode >= 300 && itemCode < 400;
          break;
        case "Lp":
          passesFestivalFilter = itemCode >= 400 && itemCode < 500;
          break;
        case "Hs":
          passesFestivalFilter = itemCode >= 500 && itemCode < 600;
          break;
        case "Hss":
          passesFestivalFilter = itemCode >= 600 && itemCode < 700;
          break;
        default:
          passesFestivalFilter = true;
      }
    }
    
    return passesItemFilter && passesFestivalFilter;
  }).map((participant, index) => ({
    ...participant,
    slNo: index + 1
  }));

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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
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
                  <option value="UP">UP Kalaivizha</option>
                  <option value="Lp">LP Kalaivizha</option>
                  <option value="Hs">HS Kalaivizha</option>
                  <option value="Hss">HSS Kalaivizha</option>
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
                      <th className="p-2 md:p-3">Reg No</th>
                      <th className="p-2 md:p-3">Name</th>
                      <th className="p-2 md:p-3">Gender</th>
                      <th className="p-2 md:p-3">Class</th>
                      <th className="p-2 md:p-3">School code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {filteredParticipants.length > 0 ? (
                      filteredParticipants.map((participant) => (
                        <tr key={participant.slNo} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{participant.slNo}</td>
                          <td className="p-2 md:p-3">{participant.regNo || "-"}</td>
                          <td className="p-2 md:p-3">{participant.name || "-"}</td>
                          <td className="p-2 md:p-3">{participant.gender || "-"}</td>
                          <td className="p-2 md:p-3">{participant.class || "-"}</td>
                          <td className="p-2 md:p-3">{participant.schoolCode || "-"}</td>
                          <td className="p-2 md:p-3">{participant.schoolName || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-3 text-center text-gray-500">
                          No records found for {selectedFestival === "ALL Festival" ? "All Festivals" : selectedFestival} 
                          {selectedItems !== "ALL" ? ` with more than ${selectedItems} items` : ""}
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
    </>
  )
}

export default ParticipantsMorethan
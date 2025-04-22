import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

// import { getAllFestivalParticipantsAPI } from '../services/allAPI'; 

const FestivalWisepat = () => {
  // Dummy data for development and fallback
  const dummyData = [
    { regNo: "301", name: "Arun Kumar", gender: "Boy", class: "5", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "301" },
    { regNo: "002", name: "Priya Nair", gender: "girl", class: "4", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "304" },
    { regNo: "401", name: "Rahul Menon", gender: "Boy", class: "3", schoolCode: "002", schoolName: "St. Mary's LP School Kochi", itemCode: "401" },
    { regNo: "50", name: "Dev Prakash", gender: "Boy", class: "7", schoolCode: "003", schoolName: "Model HS Kozhikode", itemCode: "503" },
    { regNo: "0101", name: "Meera Suresh", gender: "girl", class: "11", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "601" },
    { regNo: "601", name: "Nithin Rajan", gender: "Boy", class: "12", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "302" },
    { regNo: "3001", name: "Kavya Mohan", gender: "girl", class: "5", schoolCode: "005", schoolName: "Govt. UP School Kollam", itemCode: "602" },
    { regNo: "401", name: "Sajeev Thomas", gender: "Boy", class: "2", schoolCode: "006", schoolName: "Little Flower LP School Alappuzha", itemCode: "402" },
    { regNo: "601", name: "Lakshmi Pillai", gender: "girl", class: "11", schoolCode: "010", schoolName: "Don Bosco HSS Idukki", itemCode: "602" },
    { regNo: "305", name: "Vijay Menon", gender: "Boy", class: "6", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "305" },
    { regNo: "306", name: "Shreya Nair", gender: "girl", class: "4", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "306" },
    { regNo: "0101", name: "Meera Suresh", gender: "girl", class: "11", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "601" },
    { regNo: "601", name: "Nithin Rajan", gender: "Boy", class: "12", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "302" },
    { regNo: "3001", name: "Kavya Mohan", gender: "girl", class: "5", schoolCode: "005", schoolName: "Govt. UP School Kollam", itemCode: "602" },
    { regNo: "401", name: "Sajeev Thomas", gender: "Boy", class: "2", schoolCode: "006", schoolName: "Little Flower LP School Alappuzha", itemCode: "402" },
    { regNo: "601", name: "Lakshmi Pillai", gender: "girl", class: "11", schoolCode: "010", schoolName: "Don Bosco HSS Idukki", itemCode: "602" },
    { regNo: "305", name: "Vijay Menon", gender: "Boy", class: "6", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "305" },
    { regNo: "306", name: "Shreya Nair", gender: "girl", class: "4", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "302" },
    { regNo: "671", name: "Meera Suresh", gender: "girl", class: "11", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "302" },
    { regNo: "771", name: "Nithin Rajan", gender: "Boy", class: "12", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "302" },
    { regNo: "661", name: "Kavya Mohan", gender: "girl", class: "5", schoolCode: "005", schoolName: "Govt. UP School Kollam", itemCode: "302" },
    { regNo: "678", name: "Sajeev Thomas", gender: "Boy", class: "2", schoolCode: "006", schoolName: "Little Flower LP School Alappuzha", itemCode: "302" },
    { regNo: "444", name: "Lakshmi Pillai", gender: "girl", class: "11", schoolCode: "010", schoolName: "Don Bosco HSS Idukki", itemCode: "302" },
    { regNo: "333", name: "Vijay Menon", gender: "Boy", class: "6", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "302" },
    { regNo: "326", name: "Shreya Nair", gender: "girl", class: "4", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "302" },
    { regNo: "326", name: "Shreya Nair", gender: "girl", class: "4", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "302" }

  ];

  // Dummy items list with proper data structure
  const dummyItemsList = [
    { itemCode: "301", itemName: "Essay Writing" },
    { itemCode: "302", itemName: "Story Writing" },
    { itemCode: "306", itemName: "Mono Act" },
    { itemCode: "401", itemName: "Drawing" },
    { itemCode: "402", itemName: "Essay Writing" },
    { itemCode: "602", itemName: "Essay Writing" },

  ];

  const [Alllist, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const printRef = useRef();
  const [itemsList, setItemsList] = useState([]);

  // Get parameters from URL or use defaults
  const selectedFestival = searchParams.get('festival') || "All Festival";
  const searchTerm = searchParams.get('search') || '';
  const searchField = searchParams.get('field') || 'gender';
  const selectedItemCode = searchParams.get('item') || '';

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log(Alllist);

  useEffect(() => {
    getAllitemise();
    // Set the items list on component mount
    setItemsList(dummyItemsList);
  }, []);

  // Filter the list based on item code ranges and selected filters
  useEffect(() => {
    if (Alllist.length > 0) {
      let filtered = Alllist;

      // First filter by festival type if selected
      if (selectedFestival !== "All Festival") {
        filtered = filtered.filter(item => {
          if (!item.itemCode) return false;

          const itemCode = parseInt(item.itemCode.trim());

          if (isNaN(itemCode)) return false;

          if (selectedFestival === "UP Kalaivizha") {
            return itemCode >= 300 && itemCode < 400;
          } else if (selectedFestival === "LP Kalaivizha") {
            return itemCode >= 400 && itemCode < 500;
          } else if (selectedFestival === "HS Kalaivizha") {
            return itemCode >= 500 && itemCode < 600;
          } else if (selectedFestival === "HSS Kalaivizha") {
            return itemCode >= 600 && itemCode < 700;
          }
          return true;
        });
      }

      // Then filter by selected item code if any
      if (selectedItemCode && selectedItemCode !== 'select Item') {
        filtered = filtered.filter(item =>
          item.itemCode && item.itemCode.trim() === selectedItemCode
        );
      }

      // Finally apply search filter if search term exists
      if (searchTerm.trim() !== '') {
        filtered = filtered.filter(item => {
          const fieldValue = item[searchField]?.toString()?.toLowerCase() || '';
          return fieldValue.includes(searchTerm.toLowerCase());
        });
      }

      setFilteredList(filtered);
      // Reset to first page when changing filters
      setCurrentPage(1);
    }
  }, [Alllist, selectedFestival, searchTerm, searchField, selectedItemCode]);

  const getAllitemise = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        // Replace with your actual API call when available
        // const result = await getAllFestivalParticipantsAPI(reqHeader);
        // if (result?.status === 200) {
        //   setList(result.data);
        // } else {
        //   setList(dummyData);
        // }

        // Using dummy data for now
        setList(dummyData);
      } catch (err) {
        console.log(err);
        // Use dummy data if API throws an error
        setList(dummyData);
      }
    } else {
      // Use dummy data if no token is available
      setList(dummyData);
    }
  };

  const handleFestivalChange = (e) => {
    // Update URL when festival changes
    updateSearchParams('festival', e.target.value);
    // Reset to first page when changing festival
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    // Update URL when search term changes
    updateSearchParams('search', e.target.value);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  const handleItemChange = (e) => {
    const value = e.target.value;
    // Update URL when item changes
    updateSearchParams('item', value === 'select Item' ? null : value);
    // Reset to first page when changing item
    setCurrentPage(1);
  };

  // Helper function to update search params
  const updateSearchParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === '' || value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

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

  // Generate the appropriate title based on the selected festival

  const generatePDF = () => {
    // Create the PDF content container
    const pdfContent = document.createElement('div');
  
    // Determine if a specific item is selected
    const isSpecificItemSelected = selectedItemCode && selectedItemCode !== 'select Item';
  
    // PDF main title
    const mainTitleElement = document.createElement('h1');
    mainTitleElement.textContent = isSpecificItemSelected
      ? `${getItemName(selectedItemCode)} - Participants`
      : `${selectedFestival !== "All Festival" ? selectedFestival : "All Festivals"} - Participants List`;
    mainTitleElement.style.textAlign = 'center';
    mainTitleElement.style.margin = '20px 0';
    mainTitleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(mainTitleElement);
  
    // If a specific item is selected, we'll organize by festival
    if (isSpecificItemSelected) {
      // Get participants for the selected item
      const itemParticipants = filteredList.filter(p => p.itemCode === selectedItemCode);
  
      // Group by festival
      const participantsByFestival = {
        'UP Kalaivizha': [],
        'LP Kalaivizha': [],
        'HS Kalaivizha': [],
        'HSS Kalaivizha': []
      };
  
      // Categorize participants into festival groups
      itemParticipants.forEach(participant => {
        if (!participant.itemCode) return;
  
        const code = parseInt(participant.itemCode.trim());
  
        if (code >= 300 && code < 400) {
          participantsByFestival['UP Kalaivizha'].push(participant);
        } else if (code >= 400 && code < 500) {
          participantsByFestival['LP Kalaivizha'].push(participant);
        } else if (code >= 500 && code < 600) {
          participantsByFestival['HS Kalaivizha'].push(participant);
        } else if (code >= 600 && code < 700) {
          participantsByFestival['HSS Kalaivizha'].push(participant);
        }
      });
  
      // Determine which festivals to show
      const festivalsToShow = selectedFestival !== "All Festival"
        ? [selectedFestival]
        : Object.keys(participantsByFestival);
  
      // Create tables for each festival
      festivalsToShow.forEach(festival => {
        const festivalParticipants = participantsByFestival[festival];
        if (festivalParticipants && festivalParticipants.length > 0) {
          createFestivalSection(pdfContent, festival, festivalParticipants);
        }
      });
    }
    // No specific item selected - organize by item code
    else {
      // Case 1: Specific festival selected
      if (selectedFestival !== "All Festival") {
        // Group by item code
        const groupedByItem = {};
        
        filteredList.forEach(participant => {
          if (!participant.itemCode) return;
          
          const itemCode = participant.itemCode.trim();
          if (!groupedByItem[itemCode]) {
            groupedByItem[itemCode] = [];
          }
          groupedByItem[itemCode].push(participant);
        });
        
        // Sort item codes
        const sortedItemCodes = Object.keys(groupedByItem).sort((a, b) => parseInt(a) - parseInt(b));
        
        // Process each item group
        sortedItemCodes.forEach((itemCode, itemIndex) => {
          const participants = groupedByItem[itemCode];
          
          // Add page break between items (except for the first one)
          if (itemIndex > 0) {
            const pageBreak = document.createElement('div');
            pageBreak.className = 'html2pdf__page-break';
            pdfContent.appendChild(pageBreak);
          }
          
          // Find item name
          let itemName = "Unknown Item";
          const itemObj = itemsList.find(item => item.itemCode === itemCode);
          if (itemObj) {
            itemName = itemObj.itemName;
          }
          
          // Item heading
          const itemHeading = document.createElement('h2');
          itemHeading.textContent = `Item Code: ${itemCode} - ${itemName}`;
          itemHeading.style.textAlign = 'center';
          itemHeading.style.margin = '20px 0';
          itemHeading.style.fontWeight = 'bold';
          pdfContent.appendChild(itemHeading);
          
          // Create participants table
          createParticipantsTable(pdfContent, participants);
        });
      }
      // Case 2: All festivals selected
      else {
        // First, create a festival map to organize participants
        const festivalMap = {
          'UP Kalaivizha': { range: [300, 399], participants: [] },
          'LP Kalaivizha': { range: [400, 499], participants: [] },
          'HS Kalaivizha': { range: [500, 599], participants: [] },
          'HSS Kalaivizha': { range: [600, 699], participants: [] }
        };
        
        // Sort all participants into their respective festivals
        filteredList.forEach(participant => {
          if (!participant.itemCode) return;
          
          const itemCode = parseInt(participant.itemCode.trim());
          if (isNaN(itemCode)) return;
          
          Object.entries(festivalMap).forEach(([festival, data]) => {
            if (itemCode >= data.range[0] && itemCode <= data.range[1]) {
              data.participants.push(participant);
            }
          });
        });
        
        // Now process each festival one by one
        let firstFestival = true;
        Object.entries(festivalMap).forEach(([festival, data]) => {
          if (data.participants.length === 0) return;
          
          // Add page break between festivals (except for the first one)
          if (!firstFestival) {
            const pageBreak = document.createElement('div');
            pageBreak.className = 'html2pdf__page-break';
            pdfContent.appendChild(pageBreak);
          } else {
            firstFestival = false;
          }
          
          // Festival heading
          const festivalHeading = document.createElement('h2');
          festivalHeading.textContent = festival;
          festivalHeading.style.textAlign = 'center';
          festivalHeading.style.margin = '20px 0';
          festivalHeading.style.fontWeight = 'bold';
          pdfContent.appendChild(festivalHeading);
          
          // Group participants by item code
          const groupedByItem = {};
          data.participants.forEach(participant => {
            const itemCode = participant.itemCode.trim();
            if (!groupedByItem[itemCode]) {
              groupedByItem[itemCode] = [];
            }
            groupedByItem[itemCode].push(participant);
          });
          
          // Sort item codes
          const sortedItemCodes = Object.keys(groupedByItem).sort((a, b) => parseInt(a) - parseInt(b));
          
          // Process each item group within this festival
          sortedItemCodes.forEach((itemCode, itemIndex) => {
            const participants = groupedByItem[itemCode];
            
            // Add spacing between items (not page breaks within a festival)
            if (itemIndex > 0) {
              const spacing = document.createElement('div');
              spacing.style.height = '30px';
              pdfContent.appendChild(spacing);
            }
            
            // Find item name
            let itemName = "Unknown Item";
            const itemObj = itemsList.find(item => item.itemCode === itemCode);
            if (itemObj) {
              itemName = itemObj.itemName;
            }
            
            // Item heading (smaller than festival heading)
            const itemHeading = document.createElement('h3');
            itemHeading.textContent = `Item Code: ${itemCode} - ${itemName}`;
            itemHeading.style.textAlign = 'center';
            itemHeading.style.margin = '10px 0';
            itemHeading.style.fontWeight = 'bold';
            pdfContent.appendChild(itemHeading);
            
            // Create participants table
            createParticipantsTable(pdfContent, participants);
          });
        });
      }
    }
  
    // Generate filename
    let fileName = "";
    if (isSpecificItemSelected) {
      const selectedItem = itemsList.find(item => item.itemCode === selectedItemCode);
      if (selectedItem) {
        fileName = `Item_${selectedItemCode}_${selectedItem.itemName.replace(/ /g, '_')}`;
      } else {
        fileName = `Item_${selectedItemCode}`;
      }
    } else if (selectedFestival !== "All Festival") {
      fileName = `${selectedFestival.replace(/ /g, '_')}_All_Items`;
    } else {
      fileName = 'All_Festivals_All_Items';
    }
    fileName += `_Participants_List.pdf`;
  
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

  // Helper function to create a festival section with participants table
  const createFestivalSection = (container, festivalName, participants) => {
    // Add a subheading for the festival
    const festivalHeading = document.createElement('h3');
    festivalHeading.textContent = festivalName;
    festivalHeading.style.margin = '15px 0 10px';
    festivalHeading.style.fontWeight = 'bold';
    container.appendChild(festivalHeading);

    // Create the participants table
    createParticipantsTable(container, participants);

    // Add spacing after table
    const spacer = document.createElement('div');
    spacer.style.height = '20px';
    container.appendChild(spacer);
  };

  // Helper function to create a participants table
  const createParticipantsTable = (container, participants) => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '10px';

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

    // Add rows for participants
    participants.forEach((item, index) => {
      const row = document.createElement('tr');

      // Add cells
      const cellData = [
        index + 1,
        item.regNo || "-",
        item.name || "-",
        item.gender || "-",
        item.class || "-",
        item.schoolCode || "-",
        item.schoolName || "-"
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
    container.appendChild(table);
  };

  // Helper function to get item name from item code
  const getItemName = (itemCode) => {
    const item = itemsList.find(item => item.itemCode === itemCode);
    return item ? `${item.itemName} (${itemCode})` : `Item ${itemCode}`;
  };
  // Helper function to generate the main title based on the selected festival



  // const getPrintTitle = (festival, itemCode, itemName) => {
  //   let festivalTitle = "";

  //   switch(festival) {
  //     case "UP Kalaivizha":
  //       festivalTitle = "UP Tamil Kalaivizha";
  //       break;
  //     case "LP Kalaivizha":
  //       festivalTitle = "LP Tamil Kalaivizha";
  //       break;
  //     case "HS Kalaivizha":
  //       festivalTitle = "HS Tamil Kalaivizha";
  //       break;
  //     case "HSS Kalaivizha":
  //       festivalTitle = "HSS Tamil Kalaivizha";
  //       break;
  //     default:
  //       festivalTitle = "ALL Festivals";
  //   }

  //   return `${festivalTitle} - List of Participants`;
  // };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participants List (Festival Wise)
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleItemChange}
                  value={selectedItemCode || 'select Item'}
                >
                  <option value="select Item">Select Item</option>
                  {itemsList.map((item) => (
                    <option key={item.itemCode} value={item.itemCode}>
                      {item.itemCode} - {item.itemName}
                    </option>
                  ))}
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
                  <option value="All Festival">All Festival</option>
                  <option value="UP Kalaivizha">UP Kalaivizha</option>
                  <option value="LP Kalaivizha">LP Kalaivizha</option>
                  <option value="HS Kalaivizha">HS Kalaivizha</option>
                  <option value="HSS Kalaivizha">HSS Kalaivizha</option>
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

          {/* Search Section with Field Selector */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
              <input
                type="text"
                placeholder={`Search by ${searchField === 'gender' ? 'Gender' : searchField === 'name' ? 'Name' : 'School Name'}...`}
                className="w-full bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="text-gray-500 hover:text-gray-700">
                <i className="fa-solid fa-magnifying-glass"></i>
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
                    {currentItems && currentItems.length > 0 ? (
                      currentItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{indexOfFirstItem + index + 1}</td>
                          <td className="p-2 md:p-3">{item.regNo || "-"}</td>
                          <td className="p-2 md:p-3">{item.name || "-"}</td>
                          <td className="p-2 md:p-3">{item.gender || "-"}</td>
                          <td className="p-2 md:p-3">{item.class || "-"}</td>
                          <td className="p-2 md:p-3">{item.schoolCode || "-"}</td>
                          <td className="p-2 md:p-3">{item.schoolName || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-100">
                        <td colSpan="7" className="p-2 md:p-3">No participants found with the selected criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          {filteredList.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
              {/* Showing X of Y rows */}
              <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                {`${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredList.length)} of ${filteredList.length} rows`}
              </div>

              {/* Pagination Buttons */}
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
    </>
  )
}

export default FestivalWisepat
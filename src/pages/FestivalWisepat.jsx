import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
// import { getAllFestivalParticipantsAPI } from '../services/allAPI'; // Uncomment and update API name when available

const FestivalWisepat = () => {
  // Dummy data for development and fallback
  const dummyData = [
    { regNo: "301", name: "Arun Kumar", gender: "Male", class: "5", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "301" },
    { regNo: "002", name: "Priya Nair", gender: "Female", class: "4", schoolCode: "001", schoolName: "Government UP School Thiruvananthapuram", itemCode: "304" },
    { regNo: "401", name: "Rahul Menon", gender: "Male", class: "3", schoolCode: "002", schoolName: "St. Mary's LP School Kochi", itemCode: "401" },
    { regNo: "501", name: "Anjali Sharma", gender: "Female", class: "8", schoolCode: "003", schoolName: "Model HS Kozhikode", itemCode: "501" },
    { regNo: "50", name: "Dev Prakash", gender: "Male", class: "7", schoolCode: "003", schoolName: "Model HS Kozhikode", itemCode: "503" },
    { regNo: "0101", name: "Meera Suresh", gender: "Female", class: "11", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "601" },
    { regNo: "601", name: "Nithin Rajan", gender: "Male", class: "12", schoolCode: "004", schoolName: "Sacred Heart HSS Thrissur", itemCode: "606" },
    { regNo: "3001", name: "Kavya Mohan", gender: "Female", class: "5", schoolCode: "005", schoolName: "Govt. UP School Kollam", itemCode: "302" },
    { regNo: "401", name: "Sajeev Thomas", gender: "Male", class: "2", schoolCode: "006", schoolName: "Little Flower LP School Alappuzha", itemCode: "402" },
    { regNo: "601", name: "Lakshmi Pillai", gender: "Female", class: "11", schoolCode: "010", schoolName: "Don Bosco HSS Idukki", itemCode: "602" }
  ];

  const [Alllist, setList] = useState([]);
  const printRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get festival from URL query params, default to "All Festival" if not present
  const selectedFestival = searchParams.get('festival') || "All Festival";
  
  console.log(Alllist);

  useEffect(() => {
    getAllitemise();
  }, []);

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
    setSearchParams({ festival: e.target.value });
  };

  // Generate the appropriate title based on the selected festival
  const getPrintTitle = () => {
    switch(selectedFestival) {
      case "UP Kalaivizha":
        return "UP Tamil Kalaivizha - List of Participants";
      case "LP Kalaivizha":
        return "LP Tamil Kalaivizha - List of Participants";
      case "HS Kalaivizha":
        return "HS Tamil Kalaivizha - List of Participants";
      case "HSS Kalaivizha":
        return "HSS Tamil Kalaivizha - List of Participants";
      default:
        return "ALL Festivals - List of Participants";
    }
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
          text-align: center;
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

  // Filter the list based on item code ranges according to selected festival
  const filteredList = selectedFestival === "All Festival" 
    ? Alllist 
    : Alllist.filter(item => {
        // Check if itemCode exists and is a valid value
        if (!item.itemCode) return false;
        
        // Convert to integer if it's a string with possible spaces
        const itemCode = parseInt(item.itemCode.trim());
        
        // Skip items with invalid codes
        if (isNaN(itemCode)) return false;
        
        // Filter based on item code ranges that match the festival type
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
                      <th className="p-2 md:p-3">Name</th>
                      <th className="p-2 md:p-3">Gender</th>
                      <th className="p-2 md:p-3">Class</th>
                      <th className="p-2 md:p-3">School code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {filteredList && filteredList.length > 0 ? (
                      filteredList.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{index + 1}</td>
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
                        <td colSpan="7" className="p-2 md:p-3">No participants found for this festival.</td>
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

export default FestivalWisepat
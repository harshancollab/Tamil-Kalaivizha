import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const ClashReportList = () => {
  const [showTooltip, setShowTooltip] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState("ALL");
  const [clashReports, setClashReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const printRef = useRef();


  // useEffect(() => {
  //   fetchClashReports();
  // }, [selectedFestival]);

  // // API functions
  // const fetchClashReports = async () => {
  //   setLoading(true);
  //   const token = sessionStorage.getItem("token");
    
  //   if (!token) {
  //     setError("Authentication token not found. Please login again.");
  //     setLoading(false);
  //     return;
  //   }
    
  //   const reqHeader = {
  //     "Authorization": `Bearer ${token}`
  //   };
    
  //   try {
  //     let result;
      
  //     if (selectedFestival === "ALL") {
  //       result = await getClashReportsAPI(reqHeader);
  //     } else {
  //       result = await getClashReportByFestivalAPI(selectedFestival, reqHeader);
  //     }
      
  //     if (result.status === 200) {
  //       setClashReports(result.data);
  //       setError(null);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching clash reports:", err);
  //     setError("Failed to load clash reports. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Dummy data for development
  const dummyClashReports = [
    {
      _id: "1",
      regNo: 101,
      studentName: "Arun Kumar",
      schoolCode: 501,
      schoolName: "St. Joseph School",
      festival: "UP",
      clashItems: ["Storytelling (9:30 AM)", "Monoact (9:30 AM)", "Essay (8:30 AM)"]
    },
    {
      _id: "2",
      regNo: 102,
      studentName: "Priya Sharma",
      schoolCode: 502,
      schoolName: "Mount Carmel School",
      festival: "LP",
      clashItems: ["Drawing (10:30 AM)", "Painting (10:30 AM)", "Speech (11:00 AM)"]
    },
    {
      _id: "3",
      regNo: 103,
      studentName: "Rahul Singh",
      schoolCode: 503,
      schoolName: "Holy Cross School",
      festival: "HS",
      clashItems: ["Debate (1:00 PM)", "Quiz (1:00 PM)", "Essay (2:30 PM)"]
    },
    {
      _id: "4",
      regNo: 104,
      studentName: "Deepa Nair",
      schoolCode: 504,
      schoolName: "St. Thomas School",
      festival: "HSS",
      clashItems: ["Group Song (11:30 AM)", "Solo Song (11:30 AM)", "Classical Dance (12:30 PM)"]
    },
    {
      _id: "5",
      regNo: 105,
      studentName: "Vikram Patel",
      schoolCode: 505,
      schoolName: "Little Flower School",
      festival: "UP",
      clashItems: ["Elocution (2:00 PM)", "Story Writing (2:00 PM)"]
    },
    {
      _id: "6",
      regNo: 106,
      studentName: "Meera Krishnan",
      schoolCode: 506,
      schoolName: "Sacred Heart School",
      festival: "LP",
      clashItems: ["Clay Modeling (9:00 AM)", "Origami (9:00 AM)"]
    },
    {
      _id: "7",
      regNo: 107,
      studentName: "Arjun Menon",
      schoolCode: 507,
      schoolName: "Don Bosco School",
      festival: "HS",
      clashItems: ["Chess (3:00 PM)", "Carrom (3:00 PM)"]
    },
    {
      _id: "8",
      regNo: 108,
      studentName: "Divya Pillai",
      schoolCode: 508,
      schoolName: "Maria Montessori School",
      festival: "HSS",
      clashItems: ["Instrumental Music (1:30 PM)", "Western Dance (1:30 PM)"]
    }
  ];

  // Load dummy data when component mounts or when festival selection changes
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (selectedFestival === "ALL") {
        setClashReports(dummyClashReports);
      } else {
        const filteredReports = dummyClashReports.filter(
          report => report.festival === selectedFestival
        );
        setClashReports(filteredReports);
      }
      setLoading(false);
    }, 500); // Simulate a half-second loading time
  }, [selectedFestival]);

  const handleFestivalChange = (e) => {
    setSelectedFestival(e.target.value);
  };

  // Generate the appropriate title based on the selected festival
  const getPrintTitle = () => {
    switch(selectedFestival) {
      case "UP":
        return "UP Tamil Kalaivizha - Clash List";
      case "LP":
        return "LP Tamil Kalaivizha - Clash List";
      case "HS":
        return "HS Tamil Kalaivizha - Clash List";
      case "HSS":
        return "HSS Tamil Kalaivizha - Clash List";
      default:
        return "ALL Festival - Clash List";
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                >
                  <option value="ALL">ALL Festival</option>
                  <option value="UP">UP</option>
                  <option value="LP">LP</option>
                  <option value="HS">HS</option>
                  <option value="HSS">HSS</option>
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
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="text-blue-600">Loading clash reports...</div>
                  </div>
                ) : clashReports.length === 0 ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="text-gray-600">No clash reports found for {selectedFestival === "ALL" ? "any festival" : selectedFestival}</div>
                  </div>
                ) : (
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
                      {clashReports.map((report, index) => (
                        <tr key={report._id} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{index + 1}</td>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClashReportList
import React, { useRef } from "react"
import Header from "../components/Header"

 const Report = () => {
  const printRef = useRef();

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
          padding: 20px; /* Add some padding inside the printable area if needed */
          font-family: sans-serif; /* Ensure a consistent font for printing */
        }
        h1, h2 {
          margin-bottom: 1em;
        }
        .school-details-container {
          margin-bottom: 2em;
          width: 90%;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .school-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.5em;
        }
        .detail-item {
          display: flex;
        }
        .detail-label {
          font-weight: bold;
          color: #333;
          width: 120px; /* Adjust width as needed */
        }
        .participants-list-container {
          overflow-x: auto;
        }
        .participants-table {
          width: 100%;
          border-collapse: collapse;
        }
        .participants-table th, .participants-table td {
          padding: 0.5em;
          font-size: 0.9em;
        }
        .participants-table th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        @media print {
          @page {
            margin: 0;
          }
          body {
            margin: 0;
            padding: 20px;
            -webkit-print-coloradjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide browser headers and footers */
          @page :left {
            @top-left { content: ""; }
            @bottom-left { content: ""; }
          }
          @page :right {
            @top-right { content: ""; }
            @bottom-right { content: ""; }
          }
          @page :first {
            @top-center { content: ""; }
            @bottom-center { content: ""; }
          }
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
      <div className="bg-white p-4 sm:p-6 min-h-screen flex justify-center">
        <div className="w-full bg-white max-w-4xl flex flex-col">
          <div className="flex bg-white flex-col sm:flex-row justify-between items-center mb-4">
            <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">Report</h1>
            <button
              onClick={handlePrint}
              className="border border-black px-4 py-1 rounded-full w-24 hover:bg-gray-200 mt-2 sm:mt-0"
            >
              Print
            </button>
          </div>

          <div ref={printRef} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-lg font-bold ml-4 sm:ml-10 mb-5">School Details</h2>
          <div className="bg-white w-[90%] sm:w-[80%] mx-auto mb-10 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">School Code :</span>
                <span className="w-1/2">30001</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">School Name :</span>
                <span className="w-1/2">G. H. S. S. Vaguvarai</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">School Type :</span>
                <span className="w-1/2">Government</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">School Email :</span>
                <span className="w-1/2 overflow-auto break-all">ghsvaguvarrai@gmail.com</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">Standard From :</span>
                <span className="w-1/2">5</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">Standard To :</span>
                <span className="w-1/2">12</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">School Principal :</span>
                <span className="w-1/2">Shinto Mon</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">Phone No :</span>
                <span className="w-1/2">9497828756</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">School Headmaster :</span>
                <span className="w-1/2 ">Selvin R</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">Phone No :</span>
                <span className="w-1/2">9847868951</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">Team Manager :</span>
                <span className="w-1/2">Baladandapani</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-1/2">Phone No :</span>
                <span className="w-1/2">8281690787</span>
              </div>
            </div>
          </div>
            <h2 className="text-lg font-bold mt-6 mb-5 ml-0">Participants List</h2>
            <div className="overflow-x-auto participants-list-container">
              <table className="w-full participants-table">
                <thead>
                  <tr className="border-b text-xs sm:text-sm text-gray-800">
                    <th className="p-2 sm:p-3 text-left">Sl.no</th>
                    <th className="p-2 sm:p-3 text-left">Picture</th>
                    <th className="p-2 sm:p-3 text-left">Reg No</th>
                    <th className="p-2 sm:p-3 text-left">Ad No</th>
                    <th className="p-2 sm:p-3 text-left">Class</th>
                    <th className="p-2 sm:p-3 text-left">Participants Name</th>
                    <th className="p-2 sm:p-3 text-left">Gender</th>
                    <th className="p-2 sm:p-3 text-left">Event Code</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <tr
                      key={num}
                      className="text-gray-600 odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="p-2 sm:p-3">{num}</td>
                      <td className="p-2 sm:p-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-500">👤</span>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3">{num * 100}</td>
                      <td className="p-2 sm:p-3">{num * 1000}</td>
                      <td className="p-2 sm:p-3">{`Class ${num}`}</td>
                      <td className="p-2 sm:p-3 font-medium">Participant {num}</td>
                      <td className="p-2 sm:p-3">{num % 2 === 0 ? "Male" : "Female"}</td>
                      <td className="p-2 sm:p-3">{num * 100}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
 };

 export default Report
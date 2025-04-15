// import React, { useEffect, useState, useRef } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { getAllElgibleSclListAPI } from '../services/allAPI'

// const EligibleSclList = () => {
//   const [Alllist, setList] = useState([]);
//   const printRef = useRef();
  
//   console.log(Alllist);
  
//   useEffect(() => {
//     getAllitemise();
//   }, []);
  
//   const getAllitemise = async () => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       const reqHeader = {
//         Authorization: `Bearer ${token}`,
//       };
//       try {
//         const result = await getAllElgibleSclListAPI(reqHeader);
//         if (result?.status === 200) {
//           setList(result.data);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
  
//   const handlePrint = () => {
//     const originalContents = document.body.innerHTML;
//     const printContents = printRef.current.innerHTML;

//     document.body.innerHTML = `
//       <style type="text/css">
//         @page {
//           size: auto;
//           margin: 10mm;
//         }
//         body {
//           padding: 10px;
//           font-family: sans-serif;
//         }
//         .print-table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         .print-table th, .print-table td {
//           border: 1px solid #ddd;
//           padding: 8px;
//           text-align: center;
//         }
//         .print-table th {
//           background-color: #f2f2f2;
//           font-weight: bold;
//         }
//         .print-title {
//           text-align: center;
//           margin-bottom: 20px;
//           font-size: 18px;
//           font-weight: bold;
//           display: block !important;
//         }
//         .no-print {
//           display: none !important;
//         }
        
//         /* Mobile-specific styles */
//         @media only screen and (max-width: 600px) {
//           body {
//             padding: 5px;
//           }
//           .print-table th, .print-table td {
//             padding: 4px;
//             font-size: 12px;
//           }
//           .print-title {
//             font-size: 16px;
//           }
//         }
//       </style>
//       <div class="print-title">List Of Eligible Schools</div>
//       ${printContents}
//     `;
    
//     // Short delay to ensure styles are applied
//     setTimeout(() => {
//       window.print();
      
//       // Restore original content
//       document.body.innerHTML = originalContents;
//       window.location.reload();
//     }, 300);
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col md:flex-row min-h-screen">
//         <Dash />
//         <div className="flex-1 p-4 md:p-6 lg:p-8">
//           {/* Header section with title and controls */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//             <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//               Eligible Schools List
//             </h2>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//               <button
//                 onClick={handlePrint}
//                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//               >
//                 Print
//               </button>
//             </div>
//           </div>
//           <div ref={printRef} className="w-full">
//             <div className="overflow-x-auto -mx-4 sm:mx-0 ">
//               <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                 <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
//                   <thead className="text-xs sm:text-sm">
//                     <tr className="text-gray-700">
//                       <th className="p-2 md:p-3">Sl No</th>
//                       <th className="p-2 md:p-3">School Code</th>
//                       <th className="p-2 md:p-3">School Name</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-xs sm:text-sm">
//                     {Alllist && Alllist.length > 0 ? (
//                       Alllist.map((item, index) => (
//                         <tr key={index} className="hover:bg-gray-100">
//                           <td className="p-2 md:p-3">{index + 1}</td>
//                           <td className="p-2 md:p-3">{item.schoolCode || "-"}</td>
//                           <td className="p-2 md:p-3">{item.schoolName || "-"}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr className="hover:bg-gray-100">
//                         <td className="p-2 md:p-3">1</td>
//                         <td className="p-2 md:p-3">9</td>
//                         <td className="p-2 md:p-3"> School Name</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default EligibleSclList


import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllElgibleSclListAPI } from '../services/allAPI'

const EligibleSclList = () => {
  const [Alllist, setList] = useState([]);
  const printRef = useRef();
  
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
        const result = await getAllElgibleSclListAPI(reqHeader);
        if (result?.status === 200) {
          setList(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert("Please allow pop-ups for printing functionality");
      return;
    }
    
    // Write print-optimized content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Eligible Schools List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @media print {
            @page {
              size: auto;
              margin: 10mm;
            }
          }
          
          body {
            font-family: Arial, sans-serif;
            padding: 15px;
            margin: 0;
          }
          
          .print-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
          }
          
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          
          .no-print-message {
            display: none;
          }
          
          @media only screen and (max-width: 600px) {
            body {
              padding: 5px;
            }
            
            table {
              font-size: 12px;
            }
            
            th, td {
              padding: 4px;
            }
            
            .print-title {
              font-size: 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-title">List Of Eligible Schools</div>
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>School Code</th>
              <th>School Name</th>
            </tr>
          </thead>
          <tbody>
            ${Array.isArray(Alllist) && Alllist.length > 0 
              ? Alllist.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.schoolCode || "-"}</td>
                  <td>${item.schoolName || "-"}</td>
                </tr>
              `).join('')
              : `
                <tr>
                  <td>1</td>
                  <td>9</td>
                  <td>School Name</td>
                </tr>
              `
            }
          </tbody>
        </table>
        <script>
          // Auto-close this window if it loses focus without printing
          // This handles the case when user clicks "Cancel" in the print dialog
          let printed = false;
          
          window.addEventListener('beforeprint', function() {
            printed = true;
          });
          
          window.addEventListener('afterprint', function() {
            window.close();
          });
          
          // Set a timer to check if printing happened
          setTimeout(function() {
            if (!printed) {
              window.close();
            }
          }, 1000);
          
          // Close on click anywhere (alternative for mobile devices)
          document.addEventListener('click', function() {
            if (!printed) {
              window.close();
            }
          });
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Add a slight delay to ensure content is loaded before printing
    setTimeout(() => {
      printWindow.print();
    }, 500);
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
              Eligible Schools List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <button
                onClick={handlePrint}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
              >
                Print
              </button>
            </div>
          </div>
          <div ref={printRef} className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                  <thead className="text-xs sm:text-sm">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      <th className="p-2 md:p-3">School Code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {Alllist && Alllist.length > 0 ? (
                      Alllist.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{index + 1}</td>
                          <td className="p-2 md:p-3">{item.schoolCode || "-"}</td>
                          <td className="p-2 md:p-3">{item.schoolName || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:bg-gray-100">
                        <td className="p-2 md:p-3">1</td>
                        <td className="p-2 md:p-3">9</td>
                        <td className="p-2 md:p-3">School Name</td>
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

export default EligibleSclList
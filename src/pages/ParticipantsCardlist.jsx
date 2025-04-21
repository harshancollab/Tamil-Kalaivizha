// import React, { useEffect, useState, useRef } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { useSearchParams } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';

// const ParticipantsCardList = () => {
//   const [participants, setParticipants] = useState([]);
//   const printRef = useRef();
//   const [searchParams, setSearchParams] = useSearchParams();
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   // Modal state
//   const [showOrientationModal, setShowOrientationModal] = useState(false);

//   // Get photoStatus from URL, default to "With Photo" if not present
//   const photoStatus = searchParams.get('photoStatus') || "With Photo";

//   useEffect(() => {
//     getAllParticipants();
//   }, []);

//   const getAllParticipants = async () => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       const reqHeader = {
//         Authorization: `Bearer ${token}`,
//       };
//       try {
//         const result = await (reqHeader);
//         if (result?.status === 200) {
//           setParticipants(result.data);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   // Sample participant data if API fails or for development
//   const sampleParticipants = [
//     { id: 1, regNo: "2", name: "Riyashree S", gender: "Female", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 2, regNo: "23", name: "Kaviya L", gender: "Female", class: "6", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 3, regNo: "11", name: "Mukila M", gender: "Female", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 4, regNo: "2", name: "Sharmila P", gender: "Female", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 5, regNo: "2", name: "Roshini K", gender: "Female", class: "6", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 6, regNo: "2", name: "XYZ", gender: "Male", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 7, regNo: "2", name: "XYZ", gender: "Male", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 8, regNo: "2", name: "XYZ", gender: "Male", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 9, regNo: "2", name: "XYZ", gender: "Male", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 10, regNo: "2", name: "XYZ", gender: "Male", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 11, regNo: "2", name: "XYZ", gender: "Male", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 12, regNo: "3", name: "ABC", gender: "Male", class: "6", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 13, regNo: "4", name: "DEF", gender: "Female", class: "7", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//     { id: 14, regNo: "5", name: "GHI", gender: "Male", class: "8", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
//   ];

//   // Pagination logic
//   const data = participants.length > 0 ? participants : sampleParticipants;
//   const indexOfLastItem = currentPage * rowsPerPage;
//   const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber > 0 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     // Dynamically adjust number of page buttons based on screen size
//     const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

//     if (totalPages <= maxPageNumbersToShow) {
//       // Show all page numbers
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       // Show limited page numbers with dots
//       if (currentPage <= 2) {
//         // Near the start
//         for (let i = 1; i <= 3; i++) {
//           if (i <= totalPages) pageNumbers.push(i);
//         }
//         if (totalPages > 3) {
//           pageNumbers.push('...');
//           pageNumbers.push(totalPages);
//         }
//       } else if (currentPage >= totalPages - 1) {
//         // Near the end
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         for (let i = totalPages - 2; i <= totalPages; i++) {
//           if (i > 0) pageNumbers.push(i);
//         }
//       } else {
//         // Middle
//         pageNumbers.push(1);
//         if (currentPage > 3) pageNumbers.push('...');
//         pageNumbers.push(currentPage - 1);
//         pageNumbers.push(currentPage);
//         pageNumbers.push(currentPage + 1);
//         if (currentPage < totalPages - 2) pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }

//     return pageNumbers;
//   };

//   const handlePhotoStatusChange = (e) => {
//     // Update URL when photoStatus changes
//     setSearchParams({ photoStatus: e.target.value });
//   };

//   // Show the orientation selection modal
//   const handlePrintClick = () => {
//     setShowOrientationModal(true);
//   };

//   // Generate PDF using html2pdf library with selected orientation
//   // const generatePDF = (orientation) => {
//   //   const data = participants.length > 0 ? participants : sampleParticipants;

//   //   // Close modal
//   //   setShowOrientationModal(false);

//   //   // Create a container for PDF content
//   //   const pdfContent = document.createElement('div');

//   //   // Add title
//   //   const titleElement = document.createElement('h2');
//   //   titleElement.textContent = `Participants Card - ${photoStatus}`;
//   //   titleElement.style.textAlign = 'center';
//   //   titleElement.style.margin = '20px 0';
//   //   titleElement.style.fontWeight = 'bold';
//   //   pdfContent.appendChild(titleElement);

//   //   // Create card grid container
//   //   const cardGrid = document.createElement('div');
//   //   cardGrid.style.display = 'grid';

//   //   // Adjust grid and card dimensions based on orientation
//   //   let cardWidth, cardHeight, photoSize, fontSize, marginSize;

//   //   if (orientation === 'landscape') {
//   //     // Landscape layout (A4 landscape: 297mm × 210mm)
//   //     cardGrid.style.gridTemplateColumns = 'repeat(4, 1fr)'; // 4 columns
//   //     cardGrid.style.gridTemplateRows = 'repeat(2, 1fr)';   // 2 rows (for 8 cards total)
//   //     cardWidth = '65mm';
//   //     cardHeight = '85mm';
//   //     photoSize = '60px';
//   //     fontSize = '0.8em';
//   //     marginSize = '8px';
//   //   } else {
//   //     // Portrait layout (A4 portrait: 210mm × 297mm)
//   //     cardGrid.style.gridTemplateColumns = 'repeat(2, 1fr)'; // 2 columns per row
//   //     cardGrid.style.gridTemplateRows = 'repeat(4, 1fr)';   // 4 rows (for 8 cards total)
//   //     cardWidth = '90mm';
//   //     cardHeight = '125mm';  // Adjusted height to fit cards vertically
//   //     photoSize = '80px';
//   //     fontSize = '0.9em';
//   //     marginSize = '10px';
//   //   }

//   //   cardGrid.style.gap = '10px';

//   //   // Generate cards
//   //   for (let i = 0; i < data.length; i++) {
//   //     const participant = data[i];

//   //     // Create card
//   //     const card = document.createElement('div');
//   //     card.style.border = '1px solid #000';
//   //     card.style.padding = '10px';
//   //     card.style.marginBottom = '10px';
//   //     card.style.textAlign = 'center';
//   //     card.style.width = cardWidth;
//   //     card.style.height = cardHeight;
//   //     card.style.boxSizing = 'border-box';

//   //     // Card header
//   //     const cardHeader = document.createElement('div');
//   //     cardHeader.textContent = 'Tamil Kalaivizha 2024 - 2025';
//   //     cardHeader.style.fontWeight = 'bold';
//   //     cardHeader.style.marginBottom = '5px';
//   //     cardHeader.style.fontSize = fontSize;
//   //     card.appendChild(cardHeader);

//   //     // School info
//   //     const cardSchool = document.createElement('div');
//   //     cardSchool.textContent = 'Idukki Revenue District SGHSS, KATTAPPANA';
//   //     cardSchool.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';
//   //     cardSchool.style.marginBottom = marginSize;
//   //     card.appendChild(cardSchool);

//   //     // Photo placeholder if needed
//   //     if (photoStatus === "With Photo") {
//   //       const photoPlaceholder = document.createElement('div');
//   //       photoPlaceholder.style.width = photoSize;
//   //       photoPlaceholder.style.height = photoSize;
//   //       photoPlaceholder.style.backgroundColor = '#eee';
//   //       photoPlaceholder.style.margin = '0 auto ' + marginSize + ' auto';
//   //       photoPlaceholder.style.border = '1px solid #ccc';
//   //       card.appendChild(photoPlaceholder);
//   //     }

//   //     // Participant name
//   //     const nameElement = document.createElement('div');
//   //     nameElement.textContent = participant.name;
//   //     nameElement.style.fontWeight = '500';
//   //     nameElement.style.marginBottom = '5px';
//   //     nameElement.style.fontSize = fontSize;
//   //     card.appendChild(nameElement);

//   //     // Participant details
//   //     const detailsDiv = document.createElement('div');
//   //     detailsDiv.style.display = 'flex';
//   //     detailsDiv.style.justifyContent = 'center';
//   //     detailsDiv.style.gap = '10px';
//   //     detailsDiv.style.marginBottom = '5px';
//   //     detailsDiv.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';

//   //     const regNo = document.createElement('div');
//   //     regNo.textContent = `Reg No : ${participant.regNo}`;
//   //     detailsDiv.appendChild(regNo);

//   //     const classInfo = document.createElement('div');
//   //     classInfo.textContent = `Class : ${participant.class}`;
//   //     classInfo.style.borderLeft = '1px solid #ccc';
//   //     classInfo.style.paddingLeft = '8px';
//   //     detailsDiv.appendChild(classInfo);

//   //     card.appendChild(detailsDiv);

//   //     // School details
//   //     const schoolDetails = document.createElement('div');
//   //     schoolDetails.textContent = `${participant.schoolCode} ${participant.schoolName}`;
//   //     schoolDetails.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';
//   //     schoolDetails.style.marginBottom = '5px';
//   //     card.appendChild(schoolDetails);

//   //     // Event date
//   //     const eventDate = document.createElement('div');
//   //     eventDate.textContent = 'Stage 5 on 7 Dec 2023';
//   //     eventDate.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';
//   //     eventDate.style.marginBottom = '5px';
//   //     card.appendChild(eventDate);

//   //     // Event details
//   //     const eventDetails = document.createElement('div');
//   //     eventDetails.innerHTML = '304 - Mono Act, 300 - Versification,<br />301 - Story Writing' + 
//   //                            (participant.id === 4 ? ', 302 - Drama' : '');
//   //     eventDetails.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';
//   //     card.appendChild(eventDetails);

//   //     // Add card to grid
//   //     cardGrid.appendChild(card);
//   //   }

//   //   // Add card grid to PDF content
//   //   pdfContent.appendChild(cardGrid);

//   //   // PDF filename
//   //   const fileName = `Participant_Cards_${photoStatus.replace(/ /g, '_')}_${orientation}.pdf`;

//   //   // PDF options
//   //   const options = {
//   //     margin: [10, 10, 10, 10], // top, right, bottom, left
//   //     filename: fileName,
//   //     image: { type: 'jpeg', quality: 0.98 },
//   //     html2canvas: { scale: 2, useCORS: true },
//   //     jsPDF: { unit: 'mm', format: 'a4', orientation: orientation }
//   //   };

//   //   // Generate and download PDF
//   //   html2pdf().from(pdfContent).set(options).save();
//   // };


//   // Generate PDF using html2pdf library with selected orientation
// const generatePDF = (orientation) => {
//   const data = participants.length > 0 ? participants : sampleParticipants;

//   // Close modal
//   setShowOrientationModal(false);

//   // Create a container for PDF content
//   const pdfContent = document.createElement('div');

//   // Add title
//   const titleElement = document.createElement('h2');
//   titleElement.textContent = `Participants Card - ${photoStatus}`;
//   titleElement.style.textAlign = 'center';
//   titleElement.style.margin = '20px 0';
//   titleElement.style.fontWeight = 'bold';
//   pdfContent.appendChild(titleElement);

//   // Define card dimensions based on orientation
//   let cardWidth, cardHeight, photoSize, fontSize, marginSize, cardsPerRow;

//   if (orientation === 'landscape') {
//     // Landscape layout (A4 landscape: 297mm × 210mm)
//     cardWidth = '65mm';
//     cardHeight = '85mm';
//     photoSize = '60px';
//     fontSize = '0.8em';
//     marginSize = '8px';
//     cardsPerRow = 4;
//   } else {
//     // Portrait layout (A4 portrait: 210mm × 297mm)
//     cardWidth = '90mm';
//     cardHeight = '125mm';
//     photoSize = '80px';
//     fontSize = '0.9em';
//     marginSize = '10px';
//     cardsPerRow = 2;
//   }

//   // Calculate how many cards can fit on a page (based on A4 size)
//   const cardsPerPage = orientation === 'landscape' ? 8 : 4;

//   // Create rows for the cards
//   for (let i = 0; i < data.length; i += cardsPerRow) {
//     const row = document.createElement('div');
//     row.style.display = 'flex';
//     row.style.flexDirection = 'row';
//     row.style.justifyContent = 'center';
//     row.style.gap = '10px';
//     row.style.marginBottom = '10px';

//     // Add page break before row if needed (except for first row)
//     if (i > 0 && i % cardsPerPage === 0) {
//       row.style.pageBreakBefore = 'always';
//     }

//     // Add cards to the row
//     for (let j = 0; j < cardsPerRow && i + j < data.length; j++) {
//       const participant = data[i + j];

//       // Create card
//       const card = document.createElement('div');
//       card.style.border = '1px solid #000';
//       card.style.padding = '10px';
//       card.style.textAlign = 'center';
//       card.style.width = cardWidth;
//       card.style.height = cardHeight;
//       card.style.boxSizing = 'border-box';
//       // Make sure cards don't break across pages
//       card.style.pageBreakInside = 'avoid';

//       // Card header
//       const cardHeader = document.createElement('div');
//       cardHeader.textContent = 'Tamil Kalaivizha 2024 - 2025';
//       cardHeader.style.fontWeight = 'bold';
//       cardHeader.style.marginBottom = '5px';
//       cardHeader.style.fontSize = fontSize;
//       card.appendChild(cardHeader);

//       // School info
//       const cardSchool = document.createElement('div');
//       cardSchool.textContent = 'Idukki Revenue District SGHSS, KATTAPPANA';
//       cardSchool.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';
//       cardSchool.style.marginBottom = marginSize;
//       card.appendChild(cardSchool);

//       // Photo placeholder if needed
//       if (photoStatus === "With Photo") {
//         const photoPlaceholder = document.createElement('div');
//         photoPlaceholder.style.width = photoSize;
//         photoPlaceholder.style.height = photoSize;
//         photoPlaceholder.style.backgroundColor = '#eee';
//         photoPlaceholder.style.margin = '0 auto ' + marginSize + ' auto';
//         photoPlaceholder.style.border = '1px solid #ccc';
//         card.appendChild(photoPlaceholder);
//       }

//       // Participant name
//       const nameElement = document.createElement('div');
//       nameElement.textContent = participant.name;
//       nameElement.style.fontWeight = '500';
//       nameElement.style.marginBottom = '5px';
//       nameElement.style.fontSize = fontSize;
//       card.appendChild(nameElement);

//       // Participant details
//       const detailsDiv = document.createElement('div');
//       detailsDiv.style.display = 'flex';
//       detailsDiv.style.justifyContent = 'center';
//       detailsDiv.style.gap = '10px';
//       detailsDiv.style.marginBottom = '5px';
//       detailsDiv.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';

//       const regNo = document.createElement('div');
//       regNo.textContent = `Reg No : ${participant.regNo}`;
//       detailsDiv.appendChild(regNo);

//       const classInfo = document.createElement('div');
//       classInfo.textContent = `Class : ${participant.class}`;
//       classInfo.style.borderLeft = '1px solid #ccc';
//       classInfo.style.paddingLeft = '8px';
//       detailsDiv.appendChild(classInfo);

//       card.appendChild(detailsDiv);

//       // School details
//       const schoolDetails = document.createElement('div');
//       schoolDetails.textContent = `${participant.schoolCode} ${participant.schoolName}`;
//       schoolDetails.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';
//       schoolDetails.style.marginBottom = '5px';
//       card.appendChild(schoolDetails);

//       // Event date
//       const eventDate = document.createElement('div');
//       eventDate.textContent = 'Stage 5 on 7 Dec 2023';
//       eventDate.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';
//       eventDate.style.marginBottom = '5px';
//       card.appendChild(eventDate);

//       // Event details
//       const eventDetails = document.createElement('div');
//       eventDetails.innerHTML = '304 - Mono Act, 300 - Versification,<br />301 - Story Writing' + 
//                             (participant.id === 4 ? ', 302 - Drama' : '');
//       eventDetails.style.fontSize = orientation === 'landscape' ? '0.7em' : '0.8em';
//       card.appendChild(eventDetails);

//       // Add card to row
//       row.appendChild(card);
//     }

//     // Add row to PDF content
//     pdfContent.appendChild(row);
//   }

//   // PDF filename
//   const fileName = `Participant_Cards_${photoStatus.replace(/ /g, '_')}_${orientation}.pdf`;

//   // PDF options
//   const options = {
//     margin: [10, 10, 10, 10], // top, right, bottom, left
//     filename: fileName,
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2, useCORS: true },
//     jsPDF: { unit: 'mm', format: 'a4', orientation: orientation }
//   };

//   // Generate and download PDF
//   html2pdf().from(pdfContent).set(options).save();
// };

//   const getGridRows = () => {
//     const data = participants.length > 0 ? participants : sampleParticipants;
//     const rows = [];
//     for (let i = 0; i < data.length; i += 3) {
//       rows.push(data.slice(i, i + 3));
//     }
//     return rows;
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col md:flex-row min-h-screen">
//         <Dash />
//         <div className="flex-1 p-4 md:p-6 lg:p-8">

//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
//             <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
//               Participants Card List
//             </h2>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//               <div className="relative w-full sm:w-40">
//                 <select
//                   className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                   value={photoStatus}
//                   onChange={handlePhotoStatusChange}
//                 >
//                   <option value="With Photo">With Photo</option>
//                   <option value="Without Photo">Without Photo</option>
//                 </select>
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                   <i className="fa-solid fa-chevron-down"></i>
//                 </div>
//               </div>
//               <button
//                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//                 onClick={handlePrintClick}
//               >
//                 Print
//               </button>
//             </div>
//           </div>

//           {/* Table view */}
//           <div className="w-full">
//             <div className="overflow-x-auto -mx-4 sm:mx-0">
//               <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//                 <table className="min-w-full text-center border-separate border-spacing-y-2">
//                   <thead className="text-xs sm:text-sm">
//                     <tr className="text-gray-700">
//                       <th className="p-2 md:p-3">Sl No</th>
//                       {photoStatus === "With Photo" && (
//                         <th className="p-2 md:p-3">Picture</th>
//                       )}
//                       <th className="p-2 md:p-3">Reg No</th>
//                       <th className="p-2 md:p-3">Name</th>
//                       <th className="p-2 md:p-3">Gender</th>
//                       <th className="p-2 md:p-3">Class</th>
//                       <th className="p-2 md:p-3">School code</th>
//                       <th className="p-2 md:p-3">School Name</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-xs sm:text-sm">
//                     {currentItems.map((participant, index) => (
//                       <tr key={participant.id || index} className="hover:bg-gray-100">
//                         <td className="p-2 md:p-3">{indexOfFirstItem + index + 1}</td>
//                         {photoStatus === "With Photo" && (
//                           <td className="p-2 justify-center items-center md:p-3">
//                             <div className="w-12 h-12 bg-gray-200 mx-auto"></div>
//                           </td>
//                         )}
//                         <td className="p-2 md:p-3">{participant.regNo}</td>
//                         <td className="p-2 md:p-3">{participant.name}</td>
//                         <td className="p-2 md:p-3">{participant.gender}</td>
//                         <td className="p-2 md:p-3">{participant.class}</td>
//                         <td className="p-2 md:p-3">{participant.schoolCode}</td>
//                         <td className="p-2 md:p-3">{participant.schoolName}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Pagination Controls */}
//           <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//             {/* Showing X of Y rows */}
//             <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//               {data.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, data.length)} of ${data.length} rows` : '0 rows'}
//             </div>

//             {/* Pagination Controls */}
//             <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//               {/* Previous Button with icon */}
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//               >
//                 <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                 <span className="hidden sm:inline p-1">Previous</span>
//               </button>

//               {/* Page Numbers */}
//               <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                 {renderPageNumbers().map((page, index) => (
//                   <button
//                     key={index}
//                     onClick={() => page !== '...' && handlePageChange(page)}
//                     className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${
//                       currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
//                     } ${page === '...' ? 'pointer-events-none' : ''}`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//               </div>

//               {/* Next Button with icon */}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
//               >
//                 <span className="hidden sm:inline p-1">Next</span>
//                 <i className="fa-solid fa-angle-right"></i>
//               </button>
//             </div>
//           </div>

//           {/* Hidden section for card layout (keeping for reference) */}
//           <div ref={printRef} className="hidden">
//             <div className="participant-cards-grid">
//               {getGridRows().map((row, rowIndex) => (
//                 row.map((participant, colIndex) => (
//                   <div key={`${rowIndex}-${colIndex}`} className="participant-card">
//                     <div className="card-header">
//                       Tamil Kalaivizha 2024 - 2025
//                     </div>
//                     <div className="card-school">
//                       Idukki Revenue District SGHSS, KATTAPPANA
//                     </div>

//                     {photoStatus === "With Photo" && (
//                       <div className="card-photo"></div>
//                     )}

//                     <div className="card-name">
//                       {participant.name}
//                     </div>

//                     <div className="card-details">
//                       <div>Reg No : {participant.regNo}</div>
//                       <div style={{borderLeft: '1px solid #ccc', paddingLeft: '8px'}}>Class : {participant.class}</div>
//                     </div>

//                     <div className="card-school-details">
//                       {participant.schoolCode} {participant.schoolName}
//                     </div>

//                     <div className="card-school-details">
//                       Stage 5 on 7 Dec 2023
//                     </div>

//                     <div className="card-event-details">
//                       304 - Mono Act, 300 - Versification,<br />
//                       301 - Story Writing{participant.id === 4 ? ', 302 - Drama' : ''}
//                     </div>
//                   </div>
//                 ))
//               ))}
//             </div>
//           </div>

//           {/* Orientation Selection Modal */}
//           {showOrientationModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                 <h3 className="text-lg font-bold mb-4 text-center">Select Print Orientation</h3>

//                 <div className="flex justify-around mb-6">
//                   {/* Portrait option with card preview */}
//                   <div 
//                     className="flex flex-col items-center cursor-pointer hover:opacity-80"
//                     onClick={() => generatePDF('portrait')}
//                   >
//                     <div className="w-24 h-32 border-2 border-gray-400 rounded flex items-center justify-center mb-2">
//                       <div className="relative w-16 h-24 bg-white border border-gray-200 rounded flex flex-col items-center justify-center p-1">
//                         <div className="text-[4px] font-bold">Tamil Kalaivizha</div>
//                         {photoStatus === "With Photo" && (
//                           <div className="w-8 h-8 bg-gray-200 my-1 border border-gray-300"></div>
//                         )}
//                         <div className="text-[5px]">Participant Name</div>

//                       </div>
//                     </div>
//                     <span className="font-medium">Portrait</span>

//                   </div>

//                   {/* Landscape option with card preview */}
//                   <div 
//                     className="flex flex-col items-center cursor-pointer hover:opacity-80"
//                     onClick={() => generatePDF('landscape')}
//                   >
//                     <div className="w-32 h-24 border-2 border-gray-400 rounded flex items-center justify-center mb-2">
//                       <div className="grid grid-cols-2 gap-1 p-2">
//                         <div className="relative w-10 h-16 bg-white border border-gray-200 rounded flex flex-col items-center justify-center p-1">
//                           <div className="text-[3px] font-bold">Tamil Kalaivizha</div>
//                           {photoStatus === "With Photo" && (
//                             <div className="w-5 h-5 bg-gray-200 my-0.5 border border-gray-300"></div>
//                           )}
//                           <div className="text-[3px]">Name</div>
//                         </div>
//                         <div className="relative w-10 h-16 bg-white border border-gray-200 rounded flex flex-col items-center justify-center p-1">
//                           <div className="text-[3px] font-bold">Tamil Kalaivizha</div>
//                           {photoStatus === "With Photo" && (
//                             <div className="w-5 h-5 bg-gray-200 my-0.5 border border-gray-300"></div>
//                           )}
//                           <div className="text-[3px]">Name</div>
//                         </div>
//                       </div>
//                     </div>
//                     <span className="font-medium">Landscape</span>

//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <button 
//                     className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                     onClick={() => setShowOrientationModal(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ParticipantsCardList



import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const ParticipantsCardList = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const printRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'code');
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Modal states
  const [showOrientationModal, setShowOrientationModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  // Get orientation from URL, default to "portrait" if not present
  const [selectedOrientation, setSelectedOrientation] = useState(searchParams.get('orientation') || 'portrait');

  // Get photoStatus from URL, default to "With Photo" if not present
  const photoStatus = searchParams.get('photoStatus') || "With Photo";

  useEffect(() => {
    getAllParticipants();
  }, []);

  // Check URL params on mount to potentially show preview modal directly
  useEffect(() => {
    // If both photoStatus and orientation are in URL, and there's a 'showPreview' param
    if (searchParams.get('showPreview') === 'true' &&
      searchParams.get('photoStatus') &&
      searchParams.get('orientation')) {
      // Skip orientation modal and go straight to preview
      setShowPreviewModal(true);
    }
  }, [searchParams]);

  // Sample participant data if API fails or for development
  const sampleParticipants = [
    { id: 1, regNo: "2", name: "Riyashree S", itemname: " Mono Act", itemcode: "301", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 2, regNo: "23", name: "Kaviya L", itemname: " Mono Act", itemcode: "401", class: "6", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 3, regNo: "11", name: "Mukila M", itemname: " Mono Act", itemcode: "501", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 4, regNo: "2", name: "Sharmila P", itemname: " Mono Act", itemcode: "701", class: "9", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 5, regNo: "2", name: "Roshini K", itemname: " Mono Act", itemcode: "351", class: "6", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 6, regNo: "2", name: "XYZ", itemname: " Mono Act", itemcode: "451", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 7, regNo: "2", name: "XYZ", itemname: " Mono Act", itemcode: "671", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 8, regNo: "2", name: "XYZ", itemname: " Mono Act", itemcode: "501", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 9, regNo: "2", name: "XYZ", itemname: " Mono Act", itemcode: "601", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 10, regNo: "2", name: "XYZ", itemname: " Mono Act", itemcode: "450", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 11, regNo: "2", name: "XYZ", itemname: " Mono Act", itemcode: "401", class: "5", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 12, regNo: "3", name: "ABC", itemname: " Mono Act", itemcode: "561", class: "6", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 13, regNo: "4", name: "DEF", itemname: " Mono Act", itemcode: "708", class: "7", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
    { id: 14, regNo: "5", name: "GHI", itemname: " Mono Act", itemcode: "304", class: "8", schoolCode: "30003", schoolName: "-G. H. S. S. Vaguvuurai" },
  ];

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
          setFilteredParticipants(result.data);
        }
      } catch (err) {
        console.log(err);
        // If API fails, use sample data
        setParticipants(sampleParticipants);
        setFilteredParticipants(sampleParticipants);
      }
    } else {
      // No token, use sample data
      setParticipants(sampleParticipants);
      setFilteredParticipants(sampleParticipants);
    }
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Update URL params while preserving existing ones
    const newParams = new URLSearchParams(searchParams);
    if (newSearchTerm) {
      newParams.set('query', newSearchTerm);
    } else {
      newParams.delete('query');
    }
    setSearchParams(newParams);

    filterParticipants(newSearchTerm);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filterParticipants = (term) => {
    if (!term) {
      // If search term is empty, show all participants
      setFilteredParticipants(participants.length > 0 ? participants : sampleParticipants);
      return;
    }

    const lowercasedTerm = term.toLowerCase();
    const data = participants.length > 0 ? participants : sampleParticipants;

    // Search primarily by item code, but also search in other fields
    const results = data.filter(participant =>
      participant.itemcode.toLowerCase().includes(lowercasedTerm) ||
      participant.name.toLowerCase().includes(lowercasedTerm) ||
      participant.regNo.toLowerCase().includes(lowercasedTerm) ||
      participant.schoolCode.toLowerCase().includes(lowercasedTerm)
    );

    setFilteredParticipants(results);
  };

  // Pagination logic
  const data = filteredParticipants;
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / rowsPerPage);

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

  const handlePhotoStatusChange = (e) => {
    const newStatus = e.target.value;

    // Update URL params while preserving existing ones
    const newParams = new URLSearchParams(searchParams);
    newParams.set('photoStatus', newStatus);
    setSearchParams(newParams);
  };

  // Show the orientation selection modal
  const handlePrintClick = () => {
    setShowOrientationModal(true);
  };

  // Handle orientation selection and show preview
  const handleOrientationSelect = (orientation) => {
    setSelectedOrientation(orientation);

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set('orientation', orientation);
    newParams.set('showPreview', 'true');
    setSearchParams(newParams);

    setShowOrientationModal(false);
    setShowPreviewModal(true);
  };

  // Close preview modal and update URL
  const handleClosePreview = () => {
    // Remove showPreview param from URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('showPreview');
    setSearchParams(newParams);

    setShowPreviewModal(false);
  };

  // Generate PDF from preview with proper page formatting
  const generatePDF = () => {
    const data = filteredParticipants;

    // PDF content reference 
    const previewContent = document.getElementById('pdf-preview-content');

    // PDF filename
    const fileName = `Participant_Cards_${photoStatus.replace(/ /g, '_')}_${selectedOrientation}.pdf`;

    // Enhanced PDF options
    const options = {
      margin: selectedOrientation === 'landscape' ? [10, 10, 10, 10] : [15, 15, 15, 15], // Adjusted margins for landscape
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: selectedOrientation,
        compress: true
      },
      pagebreak: { mode: 'avoid-all' } // Try to avoid breaking cards across pages
    };

    // Generate and download PDF
    html2pdf().from(previewContent).set(options).save().then(() => {
      // Close preview modal after download starts
      handleClosePreview();
    });
  };

  // Prepare card styles based on orientation with better print alignment
  const getCardStyles = () => {
    const isLandscape = selectedOrientation === 'landscape';

    return {
      card: {
        border: '1px solid #000',
        padding: isLandscape ? '8px' : '10px',
        textAlign: 'center',
        width: isLandscape ? '270px' : '260px', // Adjusted width for landscape
        height: isLandscape ? '170px' : '320px', // Adjusted height for landscape
        boxSizing: 'border-box',
        position: 'relative',
        pageBreakInside: 'avoid',
        display: 'flex',
        flexDirection: isLandscape ? 'row' : 'column', // Use row layout for landscape
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        margin: '0 auto' // Center cards
      },
      leftSection: {
        flex: isLandscape ? '1' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isLandscape ? 'space-between' : 'flex-start',
        alignItems: 'center',
        width: isLandscape ? '40%' : '100%',
        borderRight: isLandscape ? '1px solid #eee' : 'none',
        paddingRight: isLandscape ? '8px' : '0'
      },
      rightSection: {
        flex: isLandscape ? '1.5' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: isLandscape ? '60%' : '100%',
        textAlign: isLandscape ? 'left' : 'center',
        paddingLeft: isLandscape ? '8px' : '0'
      },
      cardHeader: {
        fontWeight: 'bold',
        marginBottom: '3px',
        fontSize: isLandscape ? '10px' : '14px',
        textAlign: 'center'
      },
      cardSchool: {
        fontSize: isLandscape ? '8px' : '12px',
        marginBottom: isLandscape ? '3px' : '8px',
        textAlign: 'center'
      },
      cardPhoto: {
        width: isLandscape ? '60px' : '80px',
        height: isLandscape ? '60px' : '80px',
        backgroundColor: '#eee',
        margin: '0 auto',
        marginBottom: isLandscape ? '3px' : '8px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      },
      cardName: {
        fontWeight: '500',
        marginBottom: '3px',
        fontSize: isLandscape ? '11px' : '14px',
        textAlign: isLandscape ? 'center' : 'center'
      },
      cardDetails: {
        display: 'flex',
        justifyContent: isLandscape ? 'flex-start' : 'center',
        gap: isLandscape ? '5px' : '10px',
        marginBottom: '3px',
        fontSize: isLandscape ? '9px' : '12px',
        flexWrap: isLandscape ? 'wrap' : 'nowrap'
      },
      cardSchoolDetails: {
        fontSize: isLandscape ? '9px' : '12px',
        marginBottom: '3px',
        textAlign: isLandscape ? 'left' : 'center'
      },
      cardEventDetails: {
        fontSize: isLandscape ? '9px' : '12px',
        textAlign: isLandscape ? 'left' : 'center'
      },
      detailItem: {
        marginRight: isLandscape ? '5px' : '0'
      }
    };
  };

  // Generate cards for preview with improved grid layout
  const renderPreviewCards = () => {
    const styles = getCardStyles();
    const data = filteredParticipants;
    const isLandscape = selectedOrientation === 'landscape';

    // Calculate cards per row based on orientation
    // Portrait: 2 cards per row, Landscape: 2 cards per row (optimized for landscape A4)
    const cardsPerRow = isLandscape ? 2 : 2;

    // Calculate total rows needed
    const totalRows = Math.ceil(data.length / cardsPerRow);
    const rows = [];

    // Create rows with proper number of cards
    for (let i = 0; i < totalRows; i++) {
      const startIndex = i * cardsPerRow;
      const rowCards = data.slice(startIndex, startIndex + cardsPerRow);
      rows.push(rowCards);
    }

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isLandscape ? '12px' : '20px', // Adjusted gap between rows for landscape
        padding: '10px'
      }}>
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{
            display: 'flex',
            justifyContent: 'space-evenly', // Even spacing
            gap: isLandscape ? '20px' : '15px', // Space between cards
            width: '100%'
          }}>
            {row.map(participant => (
              <div key={participant.id} style={styles.card}>
                {/* Left section - for photo, name, reg no in landscape mode */}
                <div style={styles.leftSection}>
                  {/* Show header in portrait mode or in the right section for landscape */}
                  {!isLandscape && (
                    <>
                      <div style={styles.cardHeader}>
                        Tamil Kalaivizha 2024 - 2025
                      </div>
                      <div style={styles.cardSchool}>
                        Idukki Revenue District SGHSS, KATTAPPANA
                      </div>
                    </>
                  )}

                  {photoStatus === "With Photo" && (
                    <div style={styles.cardPhoto}></div>
                  )}

                  <div style={styles.cardName}>
                    {participant.name}
                  </div>

                  {isLandscape && (
                    <div style={{ ...styles.cardDetails, justifyContent: 'center', flexDirection: 'column', textAlign: 'center', marginTop: '2px' }}>
                      <div style={styles.detailItem}>Reg No: {participant.regNo}</div>
                      <div style={styles.detailItem}>Class: {participant.class}</div>
                    </div>
                  )}
                </div>

                {/* Right section - for details in landscape mode */}
                <div style={styles.rightSection}>
                  {isLandscape && (
                    <>
                      <div style={styles.cardHeader}>
                        Tamil Kalaivizha 2024 - 2025
                      </div>
                      <div style={styles.cardSchool}>
                        Idukki Revenue District SGHSS, KATTAPPANA
                      </div>
                    </>
                  )}

                  {!isLandscape && (
                    <div style={styles.cardDetails}>
                      <div>Reg No: {participant.regNo}</div>
                      <div style={{ borderLeft: '1px solid #ccc', paddingLeft: '8px' }}>Class: {participant.class}</div>
                    </div>
                  )}

                  <div style={styles.cardSchoolDetails}>
                    {participant.schoolCode} {participant.schoolName}
                  </div>

                  <div style={styles.cardSchoolDetails}>
                    Stage 5 on 7 Dec 2023
                  </div>

                  <div style={styles.cardEventDetails}>
                    {participant.itemcode} - {participant.itemname}
                    {isLandscape ? ' ' : <br />}
                    {participant.id === 4 ? '302 - Drama' : ''}
                  </div>
                </div>
              </div>
            ))}

            {/* Add empty placeholder cards to maintain grid layout if row is not complete */}
            {row.length < cardsPerRow && Array(cardsPerRow - row.length).fill().map((_, i) => (
              <div key={`empty-${i}`} style={{ ...styles.card, visibility: 'hidden' }}></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Share link with current settings
  const handleShareSettings = () => {
    // Create a shareable URL with current settings
    const currentUrl = window.location.origin + window.location.pathname;
    const urlParams = new URLSearchParams(searchParams);

    // Ensure all relevant params are set
    urlParams.set('photoStatus', photoStatus);
    urlParams.set('orientation', selectedOrientation);
    urlParams.set('showPreview', 'true');

    // Create the full URL to share
    const shareableUrl = `${currentUrl}?${urlParams.toString()}`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareableUrl)
      .then(() => {
        alert('Link copied to clipboard! Share it to open this view directly.');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy link. Please copy the URL manually.');
      });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participants Card List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  value={photoStatus}
                  onChange={handlePhotoStatusChange}
                >
                  <option value="With Photo">With Photo</option>
                  <option value="Without Photo">Without Photo</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
                onClick={handlePrintClick}
              >
                Print
              </button>
            </div>
          </div>
          <div className="relative flex mt-2 items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
            <input
              type="text"
              placeholder="Search item Code..."
              className="w-full bg-transparent outline-none text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          {/* Table view */}
          <div className="w-full">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                {filteredParticipants.length > 0 ? (
                  <table className="min-w-full text-center border-separate border-spacing-y-2">
                    <thead className="text-xs sm:text-sm">
                      <tr className="text-gray-700">
                        <th className="p-2 md:p-3">Sl No</th>
                        {photoStatus === "With Photo" && (
                          <th className="p-2 md:p-3">Picture</th>
                        )}
                        <th className="p-2 md:p-3">Reg No</th>
                        <th className="p-2 md:p-3">Name</th>
                        <th className="p-2 md:p-3">Item Name</th>
                        <th className="p-2 md:p-3">Class</th>
                        <th className="p-2 md:p-3">School code</th>
                        <th className="p-2 md:p-3">School Name</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm">
                      {currentItems.map((participant, index) => (
                        <tr key={participant.id || index} className="hover:bg-gray-100">
                          <td className="p-2 md:p-3">{indexOfFirstItem + index + 1}</td>
                          {photoStatus === "With Photo" && (
                            <td className="p-2 justify-center items-center md:p-3">
                              <div className="w-12 h-12 bg-gray-200 mx-auto"></div>
                            </td>
                          )}
                          <td className="p-2 md:p-3">{participant.regNo}</td>
                          <td className="p-2 md:p-3">{participant.name}</td>
                          <td className="p-2 md:p-3">{participant.itemcode}-{participant.itemname}</td>
                          <td className="p-2 md:p-3">{participant.class}</td>
                          <td className="p-2 md:p-3">{participant.schoolCode}</td>
                          <td className="p-2 md:p-3">{participant.schoolName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <i className="fa-solid fa-search text-gray-400 text-xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                    <p className="text-gray-500">
                      We couldn't find any participants matching "{searchTerm}".
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete('query');
                        setSearchParams(newParams);
                        setFilteredParticipants(participants.length > 0 ? participants : sampleParticipants);
                      }}
                      className="mt-4 px-4 py-2 rounded-full text-sm"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
            {/* Showing X of Y rows */}
            <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
              {data.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, data.length)} of ${data.length} rows` : '0 rows'}
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

          {/* Orientation Selection Modal */}
          {showOrientationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4 text-center">Select Print Orientation</h3>

                <div className="flex justify-around mb-6">
                  {/* Portrait option with card preview */}
                  <div
                    className="flex flex-col items-center cursor-pointer hover:opacity-80"
                    onClick={() => handleOrientationSelect('portrait')}
                  >
                    <div className="w-24 h-32 border-2 border-gray-400 rounded flex items-center justify-center mb-2">
                      <div className="relative w-16 h-24 bg-white border border-gray-200 rounded flex flex-col items-center justify-center p-1">
                        <div className="text-[4px] font-bold">Tamil Kalaivizha</div>
                        {photoStatus === "With Photo" && (
                          <div className="w-8 h-8 bg-gray-200 my-1 border border-gray-300"></div>
                        )}
                        <div className="text-[5px]">Participant Name</div>
                      </div>
                    </div>
                    <span className="font-medium">Portrait</span>
                  </div>

                  {/* Landscape option with card preview */}
                  <div
                    className="flex flex-col items-center cursor-pointer hover:opacity-80"
                    onClick={() => handleOrientationSelect('landscape')}
                  >
                    <div className="w-32 h-24 border-2 border-gray-400 rounded flex items-center justify-center mb-2">
                      <div className="grid grid-cols-2 gap-1 p-2">
                        <div className="relative w-10 h-16 bg-white border border-gray-200 rounded flex flex-col">
                          <div className="w-full p-1 flex">
                            <div className="w-1/3">
                              <div className="w-4 h-4 bg-gray-200 mx-auto border border-gray-300"></div>
                              <div className="text-[2px] mt-1">Name</div>
                            </div>
                            <div className="w-2/3 text-left">
                              <div className="text-[2px] font-bold">Tamil Kalaivizha</div>
                              <div className="text-[2px]">Details</div>
                            </div>
                          </div>
                        </div>
                        <div className="relative w-10 h-16 bg-white border border-gray-200 rounded flex flex-col">
                          <div className="w-full p-1 flex">
                            <div className="w-1/3">
                              <div className="w-4 h-4 bg-gray-200 mx-auto border border-gray-300"></div>
                              <div className="text-[2px] mt-1">Name</div>
                            </div>
                            <div className="w-2/3 text-left">
                              <div className="text-[2px] font-bold">Tamil Kalaivizha</div>
                              <div className="text-[2px]">Details</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">Landscape</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowOrientationModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

{showPreviewModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2">
    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center p-3 sticky top-0 bg-white z-10 border-b">
        <h3 className="text-lg font-bold mb-3 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
          Print Preview - {photoStatus} ({selectedOrientation})
        </h3>
        <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={generatePDF}
          >
            <i className="fa-solid fa-print mr-2"></i>
            Download PDF
          </button>
          <button
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setShowPreviewModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      
      <div className="p-3 overflow-x-auto">
        <div className="border border-gray-300 rounded shadow-sm bg-gray-100 p-2 min-w-fit">
          <div 
            id="pdf-preview-content" 
            className="bg-white mx-auto" 
            style={{
              width: selectedOrientation === 'portrait' ? '595px' : '842px',
              height: 'auto',
              minHeight: selectedOrientation === 'portrait' ? '842px' : '595px',
              padding: '20px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          >
            <h2 className="text-center font-bold text-lg mb-4">
              Participants Card - {photoStatus}
            </h2>
            <div className="flex flex-wrap justify-center">
              {renderPreviewCards()}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </>
  );
};

export default ParticipantsCardList
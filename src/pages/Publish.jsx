// import { useState } from 'react';
// import { Search, Bell, ChevronDown, Printer, BarChart2, Settings, Layers, FileText, MessageSquare, CheckSquare } from 'lucide-react';
// import Dash from '../components/Dash';
// import Header from '../components/Header';

// export default function TamilKalaivizha() {
//   const [activeTab, setActiveTab] = useState('status');
//   const [activeFilter, setActiveFilter] = useState('All Result');
//   const [selectedFestival, setSelectedFestival] = useState(null);
  
//   // Mock data for different views
//   const declaredResults = [
//     { id: 1, itemCode: '301 - Story Writing', regNo: 2, codeNo: 953, name: 'V Vijayalakshmi', class: 7, school: 'G. H. S. S Kumily', grade: 'A', point: 5 },
//     { id: 2, itemCode: '302 - Versification', regNo: 11, codeNo: 954, name: 'Mukila M', class: 7, school: 'G. H. S. S Anakara', grade: 'B', point: 3 },
//     { id: 3, itemCode: '303 - Essay Writing', regNo: 4, codeNo: 955, name: 'Rohan K', class: 7, school: 'G. V. H. S. S Munnar', grade: 'A', point: 5 },
//     { id: 4, itemCode: '304 - Mono Act', regNo: 285, codeNo: 956, name: 'Sharmila P', class: 7, school: 'G. H. S. Sothuparai', grade: 'A', point: 5 },
//     { id: 5, itemCode: '305 - Light Music', regNo: 21, codeNo: 950, name: 'XYZ', class: 7, school: 'G. H. S. S. Vaguvurrai', grade: 'A', point: 5 },
//     { id: 6, itemCode: '306 - Kathaprasangam', regNo: 46, codeNo: 958, name: 'Jaya', class: 7, school: 'G. H. S Anakara', grade: 'B', point: 3 },
//     { id: 7, itemCode: '307 - Villupattu', regNo: 245, codeNo: 959, name: 'Jegan', class: 7, school: 'G. H. S Parathode', grade: 'B', point: 3 },
//     { id: 8, itemCode: '321 - Group Song', regNo: 19, codeNo: 960, name: 'Rohan', class: 7, school: 'G. H. S Parathode', grade: 'A', point: 5 },
//   ];

//   const schoolPoints = [
//     { id: 1, schoolCode: 30038, schoolName: 'G. H. S. Anakara', points: 42 },
//     { id: 2, schoolCode: 30085, schoolName: 'G. H. S. Parathode', points: 21 },
//     { id: 3, schoolCode: 30307, schoolName: 'S. M. U. P. S Marayoor', points: 18 },
//     { id: 4, schoolCode: 30453, schoolName: 'Govt. U. P. S. Vandiyoor', points: 15 },
//     { id: 5, schoolCode: 30069, schoolName: 'F. M. H. S. Chinnakanal', points: 10 },
//     { id: 6, schoolCode: 30075, schoolName: 'G. M. R. S. Peermedu', points: 8 },
//     { id: 7, schoolCode: 30082, schoolName: 'G. H. S Pambanar', points: 5 },
//     { id: 8, schoolCode: 30035, schoolName: 'Fathima H. S. Miamala', points: 5 },
//   ];

//   const festivalStatus = [
//     { id: 1, festival: 'UP TAMILKALAIVIZHA (11)', total: 11, completed: 10, notCompleted: 1 },
//     { id: 2, festival: 'HS TAMILKALAIVIZHA (12)', total: 12, completed: 12, notCompleted: 0 },
//     { id: 3, festival: 'HSS TAMILKALAIVIZHA (14)', total: 14, completed: 14, notCompleted: 0 },
//   ];

//   const allFestivalItems = [
//     { id: 1, item: '301 - Story Writing', stageNo: 'Stage 8', cluster: 1, participants: 5, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//     { id: 2, item: '302 - Versification', stageNo: 'Stage 8', cluster: 1, participants: 4, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//     { id: 3, item: '303 - Essay Writing', stageNo: 'Stage 8', cluster: 1, participants: 4, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//     { id: 4, item: '304 - Mono Act', stageNo: 'Stage 5', cluster: 1, participants: 4, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//     { id: 5, item: '305 - Light Music', stageNo: 'Stage 5', cluster: 1, participants: 4, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//     { id: 6, item: '306 - Kathaprasangam', stageNo: 'Stage 5', cluster: 1, participants: 3, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//     { id: 7, item: '307 - Villupattu', stageNo: 'Stage 8', cluster: 1, participants: 3, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//     { id: 8, item: '321 - Group Song', stageNo: 'Stage 8', cluster: 1, participants: 3, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//   ];

//   const unfinishedFestivalItems = [
//     { id: 1, item: '301 - Story Writing', stageNo: 'Stage 8', cluster: 1, participants: 5, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
//   ];

//   const finishedFestivalItems = [
//     { id: 1, item: '301 - Story Writing' },
//     { id: 2, item: '302 - Versification' },
//     { id: 3, item: '303 - Essay Writing' },
//     { id: 4, item: '304 - Mono Act' },
//     { id: 5, item: '305 - Light Music' },
//     { id: 6, item: '306 - Kathaprasangam' },
//     { id: 7, item: '307 - Villupattu' },
//     { id: 8, item: '321 - Group Song' },
//   ];

//   // Function to handle column header clicks in the Festival Status Overview
//   const handleColumnHeaderClick = (column) => {
//     if (column === 'total') {
//       setActiveTab('allFestival');
//     } else if (column === 'completed') {
//       setActiveTab('finished');
//     } else if (column === 'notCompleted') {
//       setActiveTab('unfinished');
//     }
//   };

//   // Function to handle festival row clicks in the Festival Status Overview
//   const handleFestivalClick = (festival) => {
//     setSelectedFestival(festival);
//   };

//   // Function to render the appropriate table based on active tab
//   const renderTable = () => {
//     if (activeTab === 'status') {
//       return (
//         <div className="p-6 border rounded-lg bg-white">
//           <div className="grid grid-cols-3 gap-4 mb-4">
//             <div 
//               className="text-lg font-medium cursor-pointer hover:text-blue-600"
//               onClick={() => handleColumnHeaderClick('total')}
//             >
//               Festival Item Total
//             </div>
//             <div 
//               className="text-lg font-medium cursor-pointer hover:text-blue-600"
//               onClick={() => handleColumnHeaderClick('completed')}
//             >
//               Items Completed
//             </div>
//             <div 
//               className="text-lg font-medium cursor-pointer hover:text-blue-600"
//               onClick={() => handleColumnHeaderClick('notCompleted')}
//             >
//               Items Not Completed
//             </div>
//           </div>
//           {festivalStatus.map((item) => (
//             <div 
//               key={item.id} 
//               className="grid grid-cols-3 gap-4 py-3 border-t cursor-pointer hover:bg-blue-50"
//               onClick={() => handleFestivalClick(item)}
//             >
//               <div 
//                 className="text-blue-500 cursor-pointer hover:underline"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedFestival(item);
//                   handleColumnHeaderClick('total');
//                 }}
//               >
//                 {item.festival}
//               </div>
//               <div 
//                 className="cursor-pointer hover:text-blue-600"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedFestival(item);
//                   handleColumnHeaderClick('completed');
//                 }}
//               >
//                 {item.completed}
//               </div>
//               <div 
//                 className="cursor-pointer hover:text-blue-600"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedFestival(item);
//                   handleColumnHeaderClick('notCompleted');
//                 }}
//               >
//                 {item.notCompleted}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else if (activeTab === 'declared') {
//       return (
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="text-left">
//               <th className="py-2 pr-4">Sl.no</th>
//               <th className="py-2 pr-4">Item Code & Item Name</th>
//               <th className="py-2 pr-4">Reg No</th>
//               <th className="py-2 pr-4">Code No</th>
//               <th className="py-2 pr-4">Name</th>
//               <th className="py-2 pr-4">Class</th>
//               <th className="py-2 pr-4">School</th>
//               <th className="py-2 pr-4">Grade</th>
//               <th className="py-2 pr-4">Point</th>
//             </tr>
//           </thead>
//           <tbody>
//             {declaredResults.map((item) => (
//               <tr key={item.id} className="border-t hover:bg-gray-50">
//                 <td className="py-3 pr-4">{item.id}</td>
//                 <td className="py-3 pr-4">{item.itemCode}</td>
//                 <td className="py-3 pr-4">{item.regNo}</td>
//                 <td className="py-3 pr-4">{item.codeNo}</td>
//                 <td className="py-3 pr-4">{item.name}</td>
//                 <td className="py-3 pr-4">{item.class}</td>
//                 <td className="py-3 pr-4">{item.school}</td>
//                 <td className="py-3 pr-4">{item.grade}</td>
//                 <td className="py-3 pr-4">{item.point}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       );
//     } else if (activeTab === 'schoolPoints') {
//       return (
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="text-left">
//               <th className="py-2 pr-4">Sl.no</th>
//               <th className="py-2 pr-4">School Code</th>
//               <th className="py-2 pr-4">School Name</th>
//               <th className="py-2 pr-4">Points</th>
//             </tr>
//           </thead>
//           <tbody>
//             {schoolPoints.map((item) => (
//               <tr key={item.id} className="border-t hover:bg-gray-50">
//                 <td className="py-3 pr-4">{item.id}</td>
//                 <td className="py-3 pr-4">{item.schoolCode}</td>
//                 <td className="py-3 pr-4">{item.schoolName}</td>
//                 <td className="py-3 pr-4">{item.points}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       );
//     } else if (activeTab === 'allFestival') {
//       return (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">All Festival List</h2>
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-left">
//                 <th className="py-2 pr-4">Item</th>
//                 <th className="py-2 pr-4">Stage No</th>
//                 <th className="py-2 pr-4">Cluster</th>
//                 <th className="py-2 pr-4">Participants</th>
//                 <th className="py-2 pr-4">Item Type</th>
//                 <th className="py-2 pr-4">Maximum Time</th>
//                 <th className="py-2 pr-4">Date of Item</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allFestivalItems.map((item) => (
//                 <tr key={item.id} className="border-t hover:bg-gray-50">
//                   <td className="py-3 pr-4">{item.item}</td>
//                   <td className="py-3 pr-4">{item.stageNo}</td>
//                   <td className="py-3 pr-4">{item.cluster}</td>
//                   <td className="py-3 pr-4">{item.participants}</td>
//                   <td className="py-3 pr-4">{item.itemType}</td>
//                   <td className="py-3 pr-4">{item.maxTime}</td>
//                   <td className="py-3 pr-4">{item.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     } else if (activeTab === 'unfinished') {
//       return (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Unfinished Festival Item List</h2>
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-left">
//                 <th className="py-2 pr-4">Item</th>
//                 <th className="py-2 pr-4">Stage No</th>
//                 <th className="py-2 pr-4">Cluster</th>
//                 <th className="py-2 pr-4">Participants</th>
//                 <th className="py-2 pr-4">Item Type</th>
//                 <th className="py-2 pr-4">Maximum Time</th>
//                 <th className="py-2 pr-4">Date of Item</th>
//               </tr>
//             </thead>
//             <tbody>
//               {unfinishedFestivalItems.map((item) => (
//                 <tr key={item.id} className="border-t hover:bg-gray-50">
//                   <td className="py-3 pr-4">{item.item}</td>
//                   <td className="py-3 pr-4">{item.stageNo}</td>
//                   <td className="py-3 pr-4">{item.cluster}</td>
//                   <td className="py-3 pr-4">{item.participants}</td>
//                   <td className="py-3 pr-4">{item.itemType}</td>
//                   <td className="py-3 pr-4">{item.maxTime}</td>
//                   <td className="py-3 pr-4">{item.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     } else if (activeTab === 'finished') {
//       return (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Finished Festival Item List</h2>
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="text-left">
//                 <th className="py-2 pr-4">Item</th>
//               </tr>
//             </thead>
//             <tbody>
//               {finishedFestivalItems.map((item) => (
//                 <tr key={item.id} className="border-t hover:bg-gray-50">
//                   <td className="py-3 pr-4">{item.item}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//      <Dash/>
      
//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {/* Top Bar */}
//      <Header/>
        
//         {/* Content */}
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
//                             {/* Only show the All Result & Status of Festival dropdown when Status View is selected */}
//                             {/* {isStatusViewSelected && ( */}
//                                 <div className={`relative w-full sm:w-40 `}>
//                                     <select
//                                         className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                         // onChange={handleResultTypeChange}
//                                         // value={selectedResultType}
//                                     >
//                                         <option value="All Result">All Result</option>
//                                         <option value="Status of Festival">Status of Festival</option>
//                                     </select>
//                                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                         <i className="fa-solid fa-chevron-down"></i>
//                                     </div>
//                                 </div>
//                             {/* )} */}
                            
//                             {/* Only show the Declared Result & School Points dropdown when Status View is NOT selected */}
//                             {/* {!isStatusViewSelected && ( */}
//                                 <div className={`relative w-full sm:w-40 `}>
//                                     <select
//                                         className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                         // onChange={handleResultTypeChange}
//                                         // value={selectedResultType}
//                                     >
//                                         <option  value="Declared Result">Declared Result</option>
//                                         <option value="School Points">School Points</option>
//                                     </select>
//                                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                         <i className="fa-solid fa-chevron-down"></i>
//                                     </div>
//                                 </div>
//                             {/* )} */}

//                             <div className="relative w-full sm:w-40">
//                                 <select
//                                     className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
//                                     // onChange={handleFestivalChange}
//                                     // value={selectedFestival}
//                                 >
//                                     <option value="UP Kalaivizha">UP Kalaivizha</option>
//                                     <option value="Lp Kalaivizha">Lp Kalaivizha</option>
//                                     <option value="Hs Kalaivizha">Hs Kalaivizha</option>
//                                     <option value="Hss Kalaivizha">Hss Kalaivizha</option>
//                                     <option value="All Festival">All Festival</option>
//                                     <option value="Status View">Status View</option>
//                                 </select>
//                                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                                     <i className="fa-solid fa-chevron-down"></i>
//                                 </div>
//                             </div>
                            
//                             <button
//                                 // onClick={generatePDF}
//                                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
//                             >
//                                 Print
//                             </button>
//                         </div>
//             <div className="flex space-x-4">
//               <div className="relative">
//                 <button className="flex items-center justify-between bg-white border rounded-full px-4 py-2 w-36">
//                   {activeTab === 'status' ? 'Status of Festival' : 
//                    activeTab === 'schoolPoints' ? 'School Points' : 
//                    activeTab === 'declared' ? 'Declared Result' :
//                    activeTab === 'allFestival' ? 'All Festival' : 'Status View'}
//                   <ChevronDown size={16} />
//                 </button>
//                 <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10">
//                   <div 
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => setActiveTab('declared')}
//                   >
//                     Declared Result
//                   </div>
//                   <div 
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => setActiveTab('schoolPoints')}
//                   >
//                     School Points
//                   </div>
//                   <div 
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => setActiveTab('status')}
//                   >
//                     Status of Festival
//                   </div>
//                   <div 
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => setActiveTab('allFestival')}
//                   >
//                     All Festival
//                   </div>
//                 </div>
//               </div>
              
//               <div className="relative">
//                 <button className="flex items-center justify-between bg-white border rounded-full px-4 py-2 w-40">
//                   UP Tamil Kalaivizha
//                   <ChevronDown size={16} />
//                 </button>
//                 <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10">
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">UP Tamil Kalaivizha</div>
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">HS Tamil Kalaivizha</div>
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">HSS Tamil Kalaivizha</div>
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">All Festival</div>
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Status View</div>
//                 </div>
//               </div>
              
//               <button className="bg-blue-800 text-white px-6 py-2 rounded-full flex items-center">
//                 <Printer size={16} className="mr-1" />
//                 Print
//               </button>
//             </div>
//           </div>
          
//           <div className="mb-6">
//             <div className="relative w-full max-w-lg">
//               <input
//                 type="text"
//                 placeholder="Search Here..."
//                 className="w-full px-4 py-2 border rounded-full pr-10"
//               />
//               <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
//             </div>
//           </div>
          
//           {/* Table Content */}
//           {renderTable()}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Printer, ChevronDown } from 'lucide-react';
import Dash from '../components/Dash';
import Header from '../components/Header';
import html2pdf from 'html2pdf.js';

export default function TamilKalaivizha() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('resultType') || 'status');
  const [selectedFestival, setSelectedFestival] = useState(searchParams.get('festival') || 'UP Kalaivizha');
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef();
  const [dropdownAnimation, setDropdownAnimation] = useState(false);

  // Mock data
  const declaredResults = [
    { id: 1, itemCode: '301 - Story Writing', regNo: 2, codeNo: 953, name: 'V Vijayalakshmi', class: 7, school: 'G. H. S. S Kumily', grade: 'A', point: 5 },
    { id: 2, itemCode: '302 - Versification', regNo: 11, codeNo: 954, name: 'Mukila M', class: 7, school: 'G. H. S. S Anakara', grade: 'B', point: 3 },
    { id: 3, itemCode: '303 - Essay Writing', regNo: 4, codeNo: 955, name: 'Rohan K', class: 7, school: 'G. V. H. S. S Munnar', grade: 'A', point: 5 },
    { id: 4, itemCode: '304 - Mono Act', regNo: 285, codeNo: 956, name: 'Sharmila P', class: 7, school: 'G. H. S. Sothuparai', grade: 'A', point: 5 },
    { id: 5, itemCode: '305 - Light Music', regNo: 21, codeNo: 950, name: 'XYZ', class: 7, school: 'G. H. S. S. Vaguvurrai', grade: 'A', point: 5 },
    { id: 6, itemCode: '306 - Kathaprasangam', regNo: 46, codeNo: 958, name: 'Jaya', class: 7, school: 'G. H. S Anakara', grade: 'B', point: 3 },
    { id: 7, itemCode: '307 - Villupattu', regNo: 245, codeNo: 959, name: 'Jegan', class: 7, school: 'G. H. S Parathode', grade: 'B', point: 3 },
    { id: 8, itemCode: '321 - Group Song', regNo: 19, codeNo: 960, name: 'Rohan', class: 7, school: 'G. H. S Parathode', grade: 'A', point: 5 },
  ];

  const schoolPoints = [
    { id: 1, schoolCode: 30038, schoolName: 'G. H. S. Anakara', points: 42 },
    { id: 2, schoolCode: 30085, schoolName: 'G. H. S. Parathode', points: 21 },
    { id: 3, schoolCode: 30307, schoolName: 'S. M. U. P. S Marayoor', points: 18 },
    { id: 4, schoolCode: 30453, schoolName: 'Govt. U. P. S. Vandiyoor', points: 15 },
    { id: 5, schoolCode: 30069, schoolName: 'F. M. H. S. Chinnakanal', points: 10 },
    { id: 6, schoolCode: 30075, schoolName: 'G. M. R. S. Peermedu', points: 8 },
    { id: 7, schoolCode: 30082, schoolName: 'G. H. S Pambanar', points: 5 },
    { id: 8, schoolCode: 30035, schoolName: 'Fathima H. S. Miamala', points: 5 },
  ];

  const festivalStatus = [
    { id: 1, festival: 'UP TAMILKALAIVIZHA (11)', total: 11, completed: 10, notCompleted: 1 },
    { id: 2, festival: 'HS TAMILKALAIVIZHA (12)', total: 12, completed: 12, notCompleted: 0 },
    { id: 3, festival: 'HSS TAMILKALAIVIZHA (14)', total: 14, completed: 14, notCompleted: 0 },
  ];

  const allFestivalItems = [
    { id: 1, item: '301 - Story Writing', stageNo: 'Stage 8', cluster: 1, participants: 5, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
    { id: 2, item: '302 - Versification', stageNo: 'Stage 8', cluster: 1, participants: 4, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
    { id: 3, item: '303 - Essay Writing', stageNo: 'Stage 8', cluster: 1, participants: 4, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
    { id: 4, item: '304 - Mono Act', stageNo: 'Stage 5', cluster: 1, participants: 4, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
    { id: 5, item: '305 - Light Music', stageNo: 'Stage 5', cluster: 1, participants: 4, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
    { id: 6, item: '306 - Kathaprasangam', stageNo: 'Stage 5', cluster: 1, participants: 3, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
    { id: 7, item: '307 - Villupattu', stageNo: 'Stage 8', cluster: 1, participants: 3, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
    { id: 8, item: '321 - Group Song', stageNo: 'Stage 8', cluster: 1, participants: 3, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
  ];

  const unfinishedFestivalItems = [
    { id: 1, item: '301 - Story Writing', stageNo: 'Stage 8', cluster: 1, participants: 5, itemType: 'Single', maxTime: '90 M', date: '07 Dec 2023' },
  ];

  const finishedFestivalItems = [
    { id: 1, item: '301 - Story Writing' },
    { id: 2, item: '302 - Versification' },
    { id: 3, item: '303 - Essay Writing' },
    { id: 4, item: '304 - Mono Act' },
    { id: 5, item: '305 - Light Music' },
    { id: 6, item: '306 - Kathaprasangam' },
    { id: 7, item: '307 - Villupattu' },
    { id: 8, item: '321 - Group Song' },
  ];

  // Animation effect
  useEffect(() => {
    setDropdownAnimation(true);
    const timer = setTimeout(() => {
      setDropdownAnimation(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedFestival, activeTab]);

  const handleFestivalChange = (e) => {
    const newFestival = e.target.value;
    setSelectedFestival(newFestival);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('festival', newFestival);
      return newParams;
    });
  };

  const handleResultTypeChange = (e) => {
    const newType = e.target.value;
    setActiveTab(newType);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('resultType', newType);
      return newParams;
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getPageHeading = () => {
    switch (activeTab) {
      case 'schoolPoints': return 'Publish Result School Points List';
      case 'status': return 'Festival Status Overview';
      case 'declared': 
      default: return 'Publish Declared Result List';
    }
  };

  const getPrintTitle = () => {
    let festivalName = "";
    switch (selectedFestival) {
      case "UP Kalaivizha": festivalName = "UP Tamil Kalaivizha"; break;
      case "Lp Kalaivizha": festivalName = "LP Tamil Kalaivizha"; break;
      case "Hs Kalaivizha": festivalName = "HS Tamil Kalaivizha"; break;
      case "Hss Kalaivizha": festivalName = "HSS Tamil Kalaivizha"; break;
      default: festivalName = "Tamil Kalaivizha";
    }

    let resultType = "";
    switch (activeTab) {
      case 'schoolPoints': resultType = "School Points"; break;
      case 'status': resultType = "Status of Festival"; break;
      case 'declared': 
      default: resultType = "Declared Result";
    }

    return `${festivalName} - ${resultType}`;
  };

  const generatePDF = () => {
    const pdfContent = document.createElement('div');
    const titleElement = document.createElement('h2');
    titleElement.textContent = getPrintTitle();
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(titleElement);

    if (printRef.current) {
      const content = printRef.current.cloneNode(true);
      pdfContent.appendChild(content);
    }

    const fileName = `${selectedFestival.replace(/ /g, '_')}_${activeTab.replace(/ /g, '_')}.pdf`;
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().from(pdfContent).set(options).save();
  };

  const renderTable = () => {
    if (activeTab === 'status') {
      return (
        <div className="p-6 border rounded-lg bg-white">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div 
              className="text-lg font-medium cursor-pointer hover:text-blue-600"
              onClick={() => setActiveTab('allFestival')}
            >
              Festival Item Total
            </div>
            <div 
              className="text-lg font-medium cursor-pointer hover:text-blue-600"
              onClick={() => setActiveTab('finished')}
            >
              Items Completed
            </div>
            <div 
              className="text-lg font-medium cursor-pointer hover:text-blue-600"
              onClick={() => setActiveTab('unfinished')}
            >
              Items Not Completed
            </div>
          </div>
          {festivalStatus.map((item) => (
            <div 
              key={item.id} 
              className="grid grid-cols-3 gap-4 py-3 border-t cursor-pointer hover:bg-blue-50"
            >
              <div 
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('allFestival');
                }}
              >
                {item.festival}
              </div>
              <div 
                className="cursor-pointer hover:text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('finished');
                }}
              >
                {item.completed}
              </div>
              <div 
                className="cursor-pointer hover:text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('unfinished');
                }}
              >
                {item.notCompleted}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === 'declared') {
      return (
        <table className="min-w-full text-center  print-table">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl.no</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code No</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Class</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
            {declaredResults.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="p-2 md:p-3 whitespace-nowrap">{item.id}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.itemCode}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.regNo}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.codeNo}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.name}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.class}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.school}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.grade}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === 'schoolPoints') {
      return (
        <table className="min-w-full text-center  print-table">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl.no</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Name</th>
              <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Points</th>
            </tr>
          </thead>
          <tbody className="bg-white text-xs sm:text-sm">
            {schoolPoints.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="p-2 md:p-3 whitespace-nowrap">{item.id}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.schoolCode}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.schoolName}</td>
                <td className="p-2 md:p-3 whitespace-nowrap">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === 'allFestival') {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Festival List</h2>
          <table className="min-w-full text-center print-table">
            <thead className="bg-gray-50">
              <tr className="text-gray-700">
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Stage No</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Cluster</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Participants</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Maximum Time</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Date of Item</th>
              </tr>
            </thead>
            <tbody className="bg-white  text-xs sm:text-sm">
              {allFestivalItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.item}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.stageNo}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.cluster}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.participants}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.itemType}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.maxTime}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'unfinished') {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Unfinished Festival Item List</h2>
          <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
            <thead className="bg-gray-50">
              <tr className="text-gray-700">
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Stage No</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Cluster</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Participants</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Maximum Time</th>
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Date of Item</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
              {unfinishedFestivalItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.item}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.stageNo}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.cluster}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.participants}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.itemType}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.maxTime}</td>
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'finished') {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Finished Festival Item List</h2>
          <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
            <thead className="bg-gray-50">
              <tr className="text-gray-700">
                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
              {finishedFestivalItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3 whitespace-nowrap">{item.item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const isStatusViewSelected = selectedFestival === "Status View";
  const dropdownAnimationClass = dropdownAnimation 
    ? "transition-all transform duration-200 ease-in-out opacity-0" 
    : "transition-all transform duration-200 ease-in-out opacity-100";

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              {getPageHeading()}
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              {isStatusViewSelected ? (
                <div className={`relative w-full sm:w-40 ${dropdownAnimationClass}`}>
                  <select
                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                    onChange={handleResultTypeChange}
                    value={activeTab}
                  >
                    <option value="status">Status of Festival</option>
                    <option value="allFestival">All Festival</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              ) : (
                <div className={`relative w-full sm:w-40 `}>
                  <select
                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                    onChange={handleResultTypeChange}
                    value={activeTab}
                  >
                    <option value="declared">Declared Result</option>
                    <option value="schoolPoints">School Points</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              )}

              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  onChange={handleFestivalChange}
                  value={selectedFestival}
                >
                  <option value="UP Kalaivizha">UP Kalaivizha</option>
                  <option value="Lp Kalaivizha">Lp Kalaivizha</option>
                  <option value="Hs Kalaivizha">Hs Kalaivizha</option>
                  <option value="Hss Kalaivizha">Hss Kalaivizha</option>
                  <option value="All Festival">All Festival</option>
                  <option value="Status View">Status View</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
              
              <button
                onClick={generatePDF}
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
              >
                <Printer size={16} className="inline mr-1" />
                Print
              </button>
            </div>
          </div>

          {(activeTab === 'schoolPoints' || activeTab === 'declared') && (
            <div className={`relative flex mb-5 w-full sm:w-64 md:w-80`}>
              <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                <input 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  type="text"
                  placeholder={
                    activeTab === 'schoolPoints' 
                      ? "Search School Code or Name..." 
                      : "Search Item, Code or Name..."
                  }
                  className="w-full bg-transparent outline-none text-sm"
                />
                <Search size={16} className="text-gray-500" />
              </div>
            </div>
          )}

          <div ref={printRef} className={`w-full`}>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                  {renderTable()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
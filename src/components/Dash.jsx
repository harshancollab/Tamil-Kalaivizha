// import React, { useState, useEffect } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContex'

// const Dash = () => {
//   const location = useLocation();
//   const { user } = useAuth();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Initialize dropdown states based on current path
//   const [openMenus, setOpenMenus] = useState(() => {
//     const path = location.pathname;
//     return {
//       // Settings menu should be open if current path matches any of its links
//       settings: ['/AllKalolsavam', '/schlentry', '/All-schools', '/Spl-entry'].some(route => path === route),
//       // Stage Settings menu should be open if current path matches any of its links
//       stageSettings: ['/stage-duration-list', '/StageList', '/Stage-itemwiselist', '/festivalwiselist'].some(route => path === route),
//       // Stage Report menu should be open if current path matches any of its links
//       stageReport: ['/AddCallsheet', '/AddTimesheet', '/AddScoresheet', '/AddTabulationsheet', '/Addreport'].some(route => path === route),
//       // Pre Fest Report menu should be open if current path matches any of its links
//       preFestReport: ['/eligible-schools', '/Partcipatescllist', '/SclContactList', '/festwiseList', '/DateWiseList', '/ParticipantsCardList', '/ParticipantsMorethan', '/ClusterReport', '/StageReport'].some(route => path === route),
//       // Result menu should be open if current path matches any of its links
//       results: ['/All-resultentry', '/item-result', '/Itemresult-list', '/All-Publishresult'].some(route => path === route),
//       resultsReport: ['/ConfidentialResultlist', '/itemwisepoint', '/itemcodewise', '/SclWisePoint', '/Sclgradewise'].some(route => path === route),
//       certificate: ['/certificate-template', '/certificate-item-wise', '/certificate-school-wise', '/CertificateRegno'].some(route => path === route),
//       Export: ['/Higherlvlcomp','/ExportDatabase'].some(route => path === route),

//       settings: ['/DDefnKalolsavam','/SDefineKalolsavm','/SSClEntry','/SClusterScl','/SsplOrderEntry','/DSclEntry','/DClusterSclList','/DSplOrderEntry'].some(route => path === route),
//       stageSettings: ['/DStageDurationList', '/DDefineStageList', '/DStageAllotmtFest', '/DStageAllotItem','/DClashRep','/SstageDurationList', '/SdefineStagelist', '/SStageAlloteFestwise', '/SstageAllotItemwi', '/SClashReport'].some(route => path === route),
//       stageReport: ['/DCallSheet', '/DTimesheet', '/DScoreSheet', '/DTabulationSheet', '/DAllReport','/SCallSheet', '/STimesheet', '/SScoresheet', '/STablulation', '/SAllReport'].some(route => path === route),
//       preFestReport: ['/DParticipatingScl', '/DFestWiseParti', '/DdateWisepartici', '/DParticipateCardlist', '/DparticipateListMorethan', '/DClusterReport', '/DStageReport','/StateParticipatesclList', '/StateParticipateFesWis', '/StateDatewisepaticipat', '/StateParticipateCardLis', '/SParticipateMorethan', '/SClusterReport', '/SStageReport'].some(route => path === route),
//       results: ['/DAllresultentry', '/DItemresultList', '/DPublishdeclare', '/All-Publishresult','/SResultentryList', '/SitemResultList', '/SPublishDeclarList'].some(route => path === route),
//       resultsReport: ['/DConfidentialResult', '/DItemwisePoint', '/DItemCodewise', '/DSclWisePoint', '/DSclGradeWise','/SConfidenal', '/SItemwisePoint', '/SItemCodewise', '/SsclwisePoint', '/SsclGradewise'].some(route => path === route),
//       certificate: ['/certificate-template',,'/SCertificatetemp', '/DCertificateItmWise', '/DCertificateScl', '/DCertificateRegno','/SCertificateItemwise', '/SCertificatesclwise', '/SCertificateRegNo'].some(route => path === route),
//       Export: ['/DHigherlvlComp','/DExport','/ShigherLevel', '/SExport'].some(route => path === route),




//     };
//   });

//   // Helper function to check if a route is active
//   const isActive = (path) => location.pathname === path;

//   // Update the open states whenever location changes
//   useEffect(() => {
//     const path = location.pathname;

//     // Determine which menu should be open based on current path
//     const newOpenMenus = {
//       settings: openMenus.settings || ['/AllKalolsavam', '/schlentry', '/All-schools', '/Spl-entry'].some(route => path === route),
//       stageSettings: openMenus.stageSettings || ['/stage-duration-list', '/AddStage', '/EditStage', '/stage-duration', '/Addfestivalwise', '/StageList', '/Stage-itemwiselist', '/festivalwiselist', '/ClashReportList'].some(route => path === route),
//       stageReport: openMenus.stageReport || ['/AddCallsheet', '/AddTimesheet', '/AddScoresheet', '/AddTabulationsheet', '/Addreport'].some(route => path === route),
//       preFestReport: openMenus.preFestReport || ['/eligible-schools', '/Partcipatescllist', '/SclContactList', '/festwiseList', '/DateWiseList', '/ParticipantsCardList', '/ClusterReport', '/StageReport'].some(route => path === route),
//       results: openMenus.results || ['/All-resultentry', '/item-result', '/Itemresult-list', '/All-Publishresult', '/'].some(route => path === route),
//       resultsReport: openMenus.resultsReport || ['/ConfidentialResultlist', '/itemwisepoint', '/itemcodewise', '/SclWisePoint', '/Sclgradewise'].some(route => path === route),
//       certificate: openMenus.certificate || ['/DCertificate', '/certificate-item-wise', '/certificate-school-wise', '/CertificateRegno', '/ExportDatabase'].some(route => path === route),
//       Export: openMenus.Export || ['/Higherlvlcomp'].some(route => path === route),

//     };

//     setOpenMenus(newOpenMenus);
//   }, [location.pathname]);

//   // Modified toggle menu function that closes other menus when opening a new one
//   const toggleMenu = (menuName) => {
//     setOpenMenus({
//       settings: menuName === 'settings' ? !openMenus[menuName] : false,
//       stageSettings: menuName === 'stageSettings' ? !openMenus[menuName] : false,
//       stageReport: menuName === 'stageReport' ? !openMenus[menuName] : false,
//       preFestReport: menuName === 'preFestReport' ? !openMenus[menuName] : false,
//       results: menuName === 'results' ? !openMenus[menuName] : false,
//       resultsReport: menuName === 'resultsReport' ? !openMenus[menuName] : false,
//       certificate: menuName === 'certificate' ? !openMenus[menuName] : false,
//       Export: menuName === 'Export' ? !openMenus[menuName] : false,
//       setting: menuName === 'setting' ? !openMenus[menuName] : false,
//     });
//   };

//   return (
//     <>
//       {/* Mobile & Tablet menu toggle button - only shown when sidebar is closed */}
//       {!isSidebarOpen && (
//         <button
//           className="lg:hidden fixed top-3 left-2 z-20 text-white p-2 rounded-md"
//           onClick={() => setIsSidebarOpen(true)}
//           aria-label="Open sidebar"
//         >
//           <i className="fa-solid fa-bars" aria-hidden="true"></i>
//         </button>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:sticky top-0 h-screen z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#003566] text-white flex flex-col`}
//       >
//         {/* Sidebar header - fixed at top */}
//         <div className="p-4  ml-3">
//           <div className={`flex justify-between items-center w-full mb-6 ${isActive('/') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] p-2 rounded' : ''
//             }`}>
//             <Link to="/" className="text-lg font-semibold flex items-center cursor-pointer">
//               <i className="fa-solid fa-table mr-3" aria-hidden="true"></i> Dashboard
//             </Link>
//             <button
//               className="lg:hidden text-white"
//               onClick={() => setIsSidebarOpen(false)}
//               aria-label="Close sidebar"
//             >
//               <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//             </button>
//           </div>
//         </div>

//         {/* Scrollable content area with hidden scrollbar */}
//         <div className="flex-1 overflow-y-auto p-4 pt-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//           <style jsx>{`
//             /* Hide scrollbar for Chrome, Safari and Opera */
//             .scrollbar-hide::-webkit-scrollbar {
//               display: none;
//             }
//             /* Hide scrollbar for IE, Edge and Firefox */
//             .scrollbar-hide {
//               -ms-overflow-style: none;  /* IE and Edge */
//               scrollbar-width: none;  /* Firefox */
//             }
//           `}</style>

//           {/* Only show admin options to sub district admin users */}
//           {user?.role === 'sub district admin' && (
//             <>
//               {/* Settings Menu */}
//               <div className="mb-4">
//                 <div
//                   className={`flex justify-between items-center w-full cursor-pointer ${openMenus.settings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
//                     } p-2 rounded`}
//                   onClick={() => toggleMenu('settings')}
//                 >
//                   <h2 className="text-lg font-semibold flex items-center">
//                     <i className="fa-solid fa-cog mr-4" aria-hidden="true"></i> Settings
//                   </h2>
//                   <i
//                     className={`fa-solid fa-chevron-${openMenus.settings ? 'up' : 'down'} text-sm`}
//                     aria-hidden="true"
//                   ></i>
//                 </div>

//                 {openMenus.settings && (
//                   <div className="mt-2 pl-4">
//                     <Link
//                       to="/AllKalolsavam"
//                       className={`block py-2 text-gray-300 ${isActive('/AllKalolsavam')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       Define Kalolsavam
//                     </Link>
//                     <Link
//                       to="/schlentry"
//                       className={`block py-2 text-gray-300 ${isActive('/schlentry')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       School Entry
//                     </Link>
//                     <Link
//                       to="/All-schools"
//                       className={`block py-2 text-gray-300 ${isActive('/All-schools')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       Cluster School
//                     </Link>
//                     <Link
//                       to="/Spl-entry"
//                       className={`block py-2 text-gray-300 ${isActive('/Spl-entry')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       Special Order Entry
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Stage Settings Menu */}
//               <div className="mb-4">
//                 <div
//                   className={`flex justify-between items-center w-full cursor-pointer ${openMenus.stageSettings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
//                     } p-2 rounded`}
//                   onClick={() => toggleMenu('stageSettings')}
//                 >
//                   <h2 className="text-lg font-semibold flex items-center">
//                     <i class="fa-solid fa-microphone mr-5"></i> Stage Settings
//                   </h2>
//                   <i
//                     className={`fa-solid fa-chevron-${openMenus.stageSettings ? 'up' : 'down'} text-sm`}
//                     aria-hidden="true"
//                   ></i>
//                 </div>

//                 {openMenus.stageSettings && (
//                   <div className="mt-2 pl-4">
//                     <Link
//                       to="/stage-duration-list"
//                       className={`block py-2 text-gray-300 ${isActive('/stage-duration-list')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       Stage Duration
//                     </Link>
//                     <Link
//                       to="/StageList"
//                       className={`block py-2 text-gray-300 ${isActive('/StageList')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       Define Stage
//                     </Link>
//                     <Link
//                       to="/festivalwiselist"
//                       className={`block py-2 text-gray-300 ${isActive('/festivalwiselist')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       Stage Allotment Festival Wise List
//                     </Link>
//                     <Link
//                       to="/Stage-itemwiselist"
//                       className={`block py-2 text-gray-300 ${isActive('/Stage-itemwiselist')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       Stage Allotment Item Wise
//                     </Link>
//                     <Link
//                       to="/ClashReportList"
//                       className={`block py-2 text-gray-300 ${isActive('/ClashReportList')
//                         ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
//                         : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
//                         }`}
//                       onClick={() => setIsSidebarOpen(false)}
//                     >
//                       Clash Report
//                     </Link>

//                   </div>
//                 )}
//               </div>


//             </>
//           )}

//           {user?.role === 'It Admin' && (
//             <>

//               <div className="p-2  ">
//               <div className={`flex justify-between items-center w-full mb-6 ${isActive('/DistrictList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/DistrictList" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i className="fa-solid fa-table mr-3"></i>  Dashboard
//                   </Link>
//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/DistrictList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/DistrictList" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-map mr-3"></i>  District List
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/SubDisRegList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/SubDisRegList" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-vector-square mr-3"></i> Sub District List 
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/SchoolRegList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/SchoolRegList" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-building mr-3"></i> School List 
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/FestivalRegiList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/FestivalRegiList" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-chart-diagram mr-3"></i>  Festival List
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/ItemRegistrationList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/ItemRegistrationList" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-diagram-project mr-3"></i>Item List
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>

//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/CreateKalolsavam') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/CreateKalolsavam" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fas fa-pen-to-square mr-3"></i> Create Kalolsavam
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/admin-panel') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/admin-panel" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-user mr-3"></i> Admin User
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/AdResult') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/AdResult" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-file mr-3"></i>Result List
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/ExportIT') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/ExportIT" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-arrow-up-right-from-square mr-3"></i>
//                   Export
//                   </Link>


//                   <button
//                     className="lg:hidden text-white"
//                     onClick={() => setIsSidebarOpen(false)}
//                     aria-label="Close sidebar"
//                   >
//                     <i className="fa-solid fa-xmark" aria-hidden="true"></i>
//                   </button>
//                 </div>
//                 <div className={`flex justify-between items-center w-full mb-6 ${isActive('/LogOut') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''
//                   }`}>
//                   <Link to="/LogOut" className="text-lg font-semibold flex items-center cursor-pointer">
//                   <i class="fa-solid fa-right-from-bracket mr-3"></i>
//                   Logo Out
//                   </Link>



//                 </div>


//               </div>










//             </>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Dash


import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContex'

const Dash = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize dropdown states based on current path
  const [openMenus, setOpenMenus] = useState(() => {
    const path = location.pathname;
    return {


      settings: ['/DEditKalolsavam/:id', '/AllKalolsavam', '/schlentry', '/All-schools', '/Spl-entry', '/DDefnKalolsavam', '/SDefineKalolsavm', '/SSClEntry', '/SClusterScl', '/SsplOrderEntry', '/DSclEntry', '/DClusterSclList', '/DSplOrderEntry'].some(route => path === route),
      stageSettings: ['/SAddstagduratn', '/SAddStage', '/SeditStage', '/SAddStgAllotFest', '/SEditStgAllotFest/:id', '/SAddStgAlloteItmWis', '/DAddStage', '/DEditStage', '/DAddStageAllotfest', '/DEditStageAllotFest/:id', '/DAddStageallotitmwise', '/DEditstgAllotitmwise/:id', '/DAddStagedurat', '/stage-duration-list', '/StageList', '/Stage-itemwiselist', '/festivalwiselist', '/DStageDurationList', '/DDefineStageList', '/DStageAllotmtFest', '/DStageAllotItem', '/DClashRep', '/SstageDurationList', '/SdefineStagelist', '/SStageAlloteFestwise', '/SstageAllotItemwi', '/SClashReport'].some(route => path === route),
      stageReport: ['/AddCallsheet', '/AddTimesheet', '/AddScoresheet', '/AddTabulationsheet', '/Addreport', '/DCallSheet', '/DTimesheet', '/DScoreSheet', '/DTabulationSheet', '/DAllReport', '/SCallSheet', '/STimesheet', '/SScoresheet', '/STablulation', '/SAllReport'].some(route => path === route),
      preFestReport: ['/eligible-schools', '/Partcipatescllist', '/SclContactList', '/festwiseList', '/DateWiseList', '/ParticipantsCardList', '/ParticipantsMorethan', '/ClusterReport', '/StageReport', '/DParticipatingScl', '/DFestWiseParti', '/DdateWisepartici', '/DParticipateCardlist', '/DparticipateListMorethan', '/DClusterReport', '/DStageReport', '/StateParticipatesclList', '/StateParticipateFesWis', '/StateDatewisepaticipat', '/StateParticipateCardLis', '/SParticipateMorethan', '/SClusterReport', '/SStageReport'].some(route => path === route),
      results: ['/edit-resultentry/:id', '/result-entry', '/SAddResultentry', '/SEditResultentry/:id', '/festival-statu', '/SEditstgeAllotItemwis/:id', '/DAddresultentry', '/DEditResultentry/:id', '/festival-status', '/All-resultentry', '/item-result', '/Itemresult-list', '/All-Publishresult', '/DAllresultentry', '/DItemresultList', '/DPublishdeclare', '/All-Publishresult', '/SResultentryList', '/SitemResultList', '/SPublishDeclarList'].some(route => path === route),
      resultsReport: ['/ConfidentialResultlist', '/itemwisepoint', '/itemcodewise', '/SclWisePoint', '/Sclgradewise', '/DConfidentialResult', '/DItemwisePoint', '/DItemCodewise', '/DSclWisePoint', '/DSclGradeWise', '/SConfidenal', '/SItemwisePoint', '/SItemCodewise', '/SsclwisePoint', '/SsclGradewise'].some(route => path === route),
      certificate: ['/certificate-template', '/certificate-item-wise', '/certificate-school-wise', '/CertificateRegno', '/certificate-template', '/SCertificatetemp', '/DCertificateItmWise', '/DCertificateScl', '/DCertificateRegno', '/SCertificateItemwise', '/SCertificatesclwise', '/SCertificateRegNo'].some(route => path === route),
      Export: ['/Higherlvlcomp', '/ExportDatabase', '/DHigherlvlComp', '/DExport', '/ShigherLevel', '/SExport'].some(route => path === route),







    };
  });

  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path;

  // Update the open states whenever location changes
  useEffect(() => {
    const path = location.pathname;

    // Determine which menu should be open based on current path
    const newOpenMenus = {
      settings: openMenus.settings || ['/AllKalolsavam', '/schlentry', '/All-schools', '/Spl-entry'].some(route => path === route),
      stageSettings: openMenus.stageSettings || ['/stage-duration-list', '/DEditStage', '/AddStage', '/EditStage', '/stage-duration', '/Addfestivalwise', '/StageList', '/Stage-itemwiselist', '/festivalwiselist', '/ClashReportList'].some(route => path === route),
      stageReport: openMenus.stageReport || ['/AddCallsheet', '/AddTimesheet', '/AddScoresheet', '/AddTabulationsheet', '/Addreport'].some(route => path === route),
      preFestReport: openMenus.preFestReport || ['/eligible-schools', '/Partcipatescllist', '/SclContactList', '/festwiseList', '/DateWiseList', '/ParticipantsCardList', '/ClusterReport', '/StageReport'].some(route => path === route),
      results: openMenus.results || ['/All-resultentry', '/item-result', '/Itemresult-list', '/All-Publishresult', '/'].some(route => path === route),
      resultsReport: openMenus.resultsReport || ['/ConfidentialResultlist', '/itemwisepoint', '/itemcodewise', '/SclWisePoint', '/Sclgradewise'].some(route => path === route),
      certificate: openMenus.certificate || ['/DCertificate', '/certificate-item-wise', '/certificate-school-wise', '/CertificateRegno', '/ExportDatabase'].some(route => path === route),
      Export: openMenus.Export || ['/Higherlvlcomp'].some(route => path === route),
    };

    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  // Modified toggle menu function that closes other menus when opening a new one
  const toggleMenu = (menuName) => {
    setOpenMenus({
      settings: menuName === 'settings' ? !openMenus[menuName] : false,
      stageSettings: menuName === 'stageSettings' ? !openMenus[menuName] : false,
      stageReport: menuName === 'stageReport' ? !openMenus[menuName] : false,
      preFestReport: menuName === 'preFestReport' ? !openMenus[menuName] : false,
      results: menuName === 'results' ? !openMenus[menuName] : false,
      resultsReport: menuName === 'resultsReport' ? !openMenus[menuName] : false,
      certificate: menuName === 'certificate' ? !openMenus[menuName] : false,
      Export: menuName === 'Export' ? !openMenus[menuName] : false,
      setting: menuName === 'setting' ? !openMenus[menuName] : false,
    });
  };

  return (
    <>
      {/* Mobile & Tablet menu toggle button - only shown when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          className="lg:hidden fixed top-3 left-2 z-20 text-white p-2 rounded-md"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <i className="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#003566] text-white flex flex-col`}
      >
        {/* Sidebar header - fixed at top */}
        <div className="p-4 ml-2">
          {/* Show dashboard link only for non-IT Admin users */}
          {user?.role !== 'It Admin' && (
            <div className={`flex justify-between items-center w-full mb-2  ${isActive('/') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] p-1 rounded' : ''}`}>
              <Link to="/" className="text-lg font-semibold flex items-center cursor-pointer">
                <i className="fa-solid fa-table mr-3" aria-hidden="true"></i> Dashboard
              </Link>
              <button
                className="lg:hidden text-white"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </div>

        {/* Scrollable content area with hidden scrollbar */}
        <div className="flex-1 overflow-y-auto p-4 pt-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            /* Hide scrollbar for IE, Edge and Firefox */
            .scrollbar-hide {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}</style>

          {/* Only show admin options to sub district admin users */}
          {user?.role === 'sub district admin' && (
            <>
              {/* Settings Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.settings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('settings')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-cog mr-4" aria-hidden="true"></i> Settings
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.settings ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.settings && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/AllKalolsavam"
                      className={`block py-2 text-gray-300 ${isActive('/AllKalolsavam')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Define Kalolsavam
                    </Link>
                    <Link
                      to="/schlentry"
                      className={`block py-2 text-gray-300 ${isActive('/schlentry')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Entry
                    </Link>
                    <Link
                      to="/All-schools"
                      className={`block py-2 text-gray-300 ${isActive('/All-schools')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Cluster School
                    </Link>
                    <Link
                      to="/Spl-entry"
                      className={`block py-2 text-gray-300 ${isActive('/Spl-entry')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Special Order Entry
                    </Link>
                  </div>
                )}
              </div>

              {/* Stage Settings Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.stageSettings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('stageSettings')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-microphone mr-5"></i> Stage Settings
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.stageSettings ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.stageSettings && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/stage-duration-list"
                      className={`block py-2 text-gray-300 ${isActive('/stage-duration-list')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Duration
                    </Link>
                    <Link
                      to="/StageList"
                      className={`block py-2 text-gray-300 ${isActive('/StageList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Define Stage
                    </Link>
                    <Link
                      to="/festivalwiselist"
                      className={`block py-2 text-gray-300 ${isActive('/festivalwiselist')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Allotment Festival Wise List
                    </Link>
                    <Link
                      to="/Stage-itemwiselist"
                      className={`block py-2 text-gray-300 ${isActive('/Stage-itemwiselist')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Allotment Item Wise
                    </Link>
                    <Link
                      to="/ClashReportList"
                      className={`block py-2 text-gray-300 ${isActive('/ClashReportList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Clash Report
                    </Link>
                  </div>
                )}
              </div>
              {/* Stage Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.stageReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('stageReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-laptop mr-3"></i> Stage Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.stageReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.stageReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/AddCallsheet"
                      className={`block py-2 text-gray-300 ${isActive('/AddCallsheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Call Sheet
                    </Link>
                    <Link
                      to="/AddTimesheet"
                      className={`block py-2 text-gray-300 ${isActive('/AddTimesheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Time Sheet
                    </Link>
                    <Link
                      to="/AddScoresheet"
                      className={`block py-2 text-gray-300 ${isActive('/AddScoresheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Score sheet
                    </Link>
                    <Link
                      to="/AddTabulationsheet"
                      className={`block py-2 text-gray-300 ${isActive('/AddTabulationsheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Tabulation Sheet
                    </Link>
                    <Link
                      to="/Addreport"
                      className={`block py-2 text-gray-300 ${isActive('/Addreport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      All Report
                    </Link>
                  </div>
                )}
              </div>

              {/* Pre Fest Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.preFestReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('preFestReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-regular fa-message mr-4"></i> Pre Fest Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.preFestReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.preFestReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/eligible-schools"
                      className={`block py-2 text-gray-300 ${isActive('/eligible-schools')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Eligible Schools
                    </Link>
                    <Link
                      to="/Partcipatescllist"
                      className={`block py-2 text-gray-300 ${isActive('/Partcipatescllist')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Participating Schools
                    </Link>
                    <Link
                      to="/SclContactList"
                      className={`block py-2 text-gray-300 ${isActive('/SclContactList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Contact
                    </Link>
                    <Link
                      to="/festwiseList"
                      className={`block py-2 text-gray-300 ${isActive('/festwiseList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Festival Wise Participants
                    </Link>
                    <Link
                      to="/DateWiseList"
                      className={`block py-2 text-gray-300 ${isActive('/DateWiseList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Date Wise Participants
                    </Link>
                    <Link
                      to="/ParticipantsCardList"
                      className={`block py-2 text-gray-300 ${isActive('/ParticipantsCardList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Participants Card
                    </Link>
                    <Link
                      to="/ParticipantsMorethan"
                      className={`block py-2 text-gray-300 ${isActive('/ParticipantsMorethan')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Participants more than one item
                    </Link>

                    <Link
                      to="/ClusterReport"
                      className={`block py-2 text-gray-300 ${isActive('/ClusterReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Cluster Report
                    </Link>
                    <Link
                      to="/StageReport"
                      className={`block py-2 text-gray-300 ${isActive('/StageReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Report
                    </Link>
                  </div>
                )}
              </div>

              {/* Result Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.results ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('results')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-note-sticky fa-rotate-270 mr-4"></i> Result
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.results ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.results && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/All-resultentry"
                      className={`block py-2 text-gray-300 ${isActive('/All-resultentry')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Result Entry
                    </Link>
                    <Link
                      to="/Itemresult-list"
                      className={`block py-2 text-gray-300 ${isActive('/Itemresult-list')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Result List
                    </Link>
                    <Link
                      to="/All-Publishresult"
                      className={`block py-2 text-gray-300 ${isActive('/All-Publishresult')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Publish Result
                    </Link>

                  </div>
                )}
              </div>

              {/* Result Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.resultsReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('resultsReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fas fa-paper-plane mr-4  "></i> Result Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.resultsReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.resultsReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/ConfidentialResultlist"
                      className={`block py-2 text-gray-300 ${isActive('/ConfidentialResultlist')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Confidential Result
                    </Link>
                    <Link
                      to="/itemwisepoint"
                      className={`block py-2 text-gray-300 ${isActive('/itemwisepoint')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Wise Point
                    </Link>
                    <Link
                      to="/itemcodewise"
                      className={`block py-2 text-gray-300 ${isActive('/itemcodewise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Code Wise Point
                    </Link>
                    <Link
                      to="/SclWisePoint"
                      className={`block py-2 text-gray-300 ${isActive('/SclWisePoint')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Wise Point
                    </Link>
                    <Link
                      to="/Sclgradewise"
                      className={`block py-2 text-gray-300 ${isActive('/Sclgradewise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Grade Wise
                    </Link>


                  </div>
                )}
              </div>
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.certificate ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('certificate')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fa-solid fa-file-circle-plus mr-4"></i>


                    Certificate
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.certificate ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.certificate && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/certificate-template"
                      className={`block py-2 text-gray-300 ${isActive('/certificate-template')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Template
                    </Link>
                    <Link
                      to="/certificate-item-wise"
                      className={`block py-2 text-gray-300 ${isActive('/certificate-item-wise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Item Wise
                    </Link>
                    <Link
                      to="/certificate-school-wise"
                      className={`block py-2 text-gray-300 ${isActive('/certificate-school-wise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate School Wise
                    </Link>
                    <Link
                      to="/CertificateRegno"
                      className={`block py-2 text-gray-300 ${isActive('/CertificateRegno')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Reg No Wise
                    </Link>


                  </div>
                )}
              </div>
              {/*  */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.Export ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('Export')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fas fa-arrow-up-right-from-square mr-4"></i>Export
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.Export ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.Export && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/Higherlvlcomp"
                      className={`block py-2 text-gray-300 ${isActive('/Higherlvlcomp')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Higher Level Competition
                    </Link>
                    <Link
                      to="/ExportDatabase"
                      className={`block py-2 text-gray-300 ${isActive('/ExportDatabase')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Export Database
                    </Link>



                  </div>
                )}
              </div>
            </>
          )}
          {user?.role === 'district admin' && (
            <>
              {/* Settings Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.settings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('settings')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-cog mr-4" aria-hidden="true"></i> Settings
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.settings ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.settings && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/DDefnKalolsavam"
                      className={`block py-2 text-gray-300 ${isActive('/DDefnKalolsavam')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Define Kalolsavam
                    </Link>
                    <Link
                      to="/DSclEntry"
                      className={`block py-2 text-gray-300 ${isActive('/DSclEntry')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Entry
                    </Link>
                    <Link
                      to="/DClusterSclList"
                      className={`block py-2 text-gray-300 ${isActive('/DClusterSclList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Cluster School
                    </Link>
                    <Link
                      to="/DSplOrderEntry"
                      className={`block py-2 text-gray-300 ${isActive('/DSplOrderEntry')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Special Order Entry
                    </Link>
                  </div>
                )}
              </div>

              {/* Stage Settings Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.stageSettings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('stageSettings')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fa-solid fa-microphone mr-5"></i> Stage Settings
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.stageSettings ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.stageSettings && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/DStageDurationList"
                      className={`block py-2 text-gray-300 ${isActive('/DStageDurationList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Duration
                    </Link>
                    <Link
                      to="/DDefineStageList"
                      className={`block py-2 text-gray-300 ${isActive('/DDefineStageList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Define Stage
                    </Link>
                    <Link
                      to="/DStageAllotmtFest"
                      className={`block py-2 text-gray-300 ${isActive('/DStageAllotmtFest')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Allotment Festival Wise List
                    </Link>
                    <Link
                      to="/DStageAllotItem"
                      className={`block py-2 text-gray-300 ${isActive('/DStageAllotItem')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Allotment Item Wise
                    </Link>
                    <Link
                      to="/DClashRep"
                      className={`block py-2 text-gray-300 ${isActive('/DClashRep')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Clash Report
                    </Link>

                  </div>
                )}
              </div>

              {/* Stage Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.stageReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('stageReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-laptop mr-3"></i> Stage Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.stageReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.stageReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/DCallSheet"
                      className={`block py-2 text-gray-300 ${isActive('/DCallSheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Call Sheet
                    </Link>
                    <Link
                      to="/DTimesheet"
                      className={`block py-2 text-gray-300 ${isActive('/DTimesheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Time Sheet
                    </Link>
                    <Link
                      to="/DScoreSheet"
                      className={`block py-2 text-gray-300 ${isActive('/DScoreSheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Score sheet
                    </Link>
                    <Link
                      to="/DTabulationSheet"
                      className={`block py-2 text-gray-300 ${isActive('/DTabulationSheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Tabulation Sheet
                    </Link>
                    <Link
                      to="/DAllReport"
                      className={`block py-2 text-gray-300 ${isActive('/DAllReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      All Report
                    </Link>
                  </div>
                )}
              </div>

              {/* Pre Fest Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.preFestReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('preFestReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-regular fa-message mr-4"></i> Pre Fest Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.preFestReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.preFestReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/DParticipatingScl"
                      className={`block py-2 text-gray-300 ${isActive('/DParticipatingScl')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      S.d Participating Schools
                    </Link>

                    <Link
                      to="/DFestWiseParti"
                      className={`block py-2 text-gray-300 ${isActive('/DFestWiseParti')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      S.D Festival Wise Participants
                    </Link>
                    <Link
                      to="/DdateWisepartici"
                      className={`block py-2 text-gray-300 ${isActive('/DdateWisepartici')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      S.D Date Wise Participants
                    </Link>
                    <Link
                      to="/DParticipateCardlist"
                      className={`block py-2 text-gray-300 ${isActive('/DParticipateCardlist')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      S.D Participants Card List
                    </Link>
                    <Link
                      to="/DparticipateListMorethan"
                      className={`block py-2 text-gray-300 ${isActive('/DparticipateListMorethan')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Participants more than one item
                    </Link>

                    <Link
                      to="/DClusterReport"
                      className={`block py-2 text-gray-300 ${isActive('/DClusterReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Cluster Report
                    </Link>
                    <Link
                      to="/DStageReport"
                      className={`block py-2 text-gray-300 ${isActive('/DStageReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Report
                    </Link>
                  </div>
                )}
              </div>

              {/* Result Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.results ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('results')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-note-sticky fa-rotate-270 mr-4"></i> Result
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.results ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.results && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/DAllresultentry"
                      className={`block py-2 text-gray-300 ${isActive('/DAllresultentry')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Result Entry
                    </Link>
                    <Link
                      to="/DItemresultList"
                      className={`block py-2 text-gray-300 ${isActive('/DItemresultList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Result List
                    </Link>
                    <Link
                      to="/DPublishdeclare"
                      className={`block py-2 text-gray-300 ${isActive('/DPublishdeclare')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Publish Result
                    </Link>

                  </div>
                )}
              </div>

              {/* Result Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.resultsReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('resultsReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fas fa-paper-plane mr-4  "></i> Result Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.resultsReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.resultsReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/DConfidentialResult"
                      className={`block py-2 text-gray-300 ${isActive('/DConfidentialResult')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Confidential Result
                    </Link>
                    <Link
                      to="/DItemwisePoint"
                      className={`block py-2 text-gray-300 ${isActive('/DItemwisePoint')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Wise Point
                    </Link>
                    <Link
                      to="/DItemCodewise"
                      className={`block py-2 text-gray-300 ${isActive('/DItemCodewise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Code Wise Point
                    </Link>
                    <Link
                      to="/DSclWisePoint"
                      className={`block py-2 text-gray-300 ${isActive('/DSclWisePoint')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Wise Point
                    </Link>
                    <Link
                      to="/DSclGradeWise"
                      className={`block py-2 text-gray-300 ${isActive('/DSclGradeWise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Grade Wise
                    </Link>


                  </div>
                )}
              </div>
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.certificate ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('certificate')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fa-solid fa-file-circle-plus mr-4"></i>


                    Certificate
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.certificate ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.certificate && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/DCertificate"
                      className={`block py-2 text-gray-300 ${isActive('/DCertificate')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Template
                    </Link>
                    <Link
                      to="/DCertificateItmWise"
                      className={`block py-2 text-gray-300 ${isActive('/DCertificateItmWise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Item Wise
                    </Link>
                    <Link
                      to="/DCertificateScl"
                      className={`block py-2 text-gray-300 ${isActive('/DCertificateScl')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate School Wise
                    </Link>
                    <Link
                      to="/DCertificateRegno"
                      className={`block py-2 text-gray-300 ${isActive('/DCertificateRegno')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Reg No Wise
                    </Link>


                  </div>
                )}
              </div>
              {/*  */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.Export ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('Export')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fas fa-arrow-up-right-from-square mr-4"></i>Export
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.Export ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.Export && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/DHigherlvlComp"
                      className={`block py-2 text-gray-300 ${isActive('/DHigherlvlComp')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Higher Level Competition
                    </Link>
                    <Link
                      to="/DExport"
                      className={`block py-2 text-gray-300 ${isActive('/DExport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Export Database
                    </Link>



                  </div>
                )}
              </div>
            </>
          )}
          {user?.role === 'state admin' && (
            <>
              {/* Settings Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.settings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('settings')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-cog mr-4" aria-hidden="true"></i> Settings
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.settings ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.settings && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/SDefineKalolsavm"
                      className={`block py-2 text-gray-300 ${isActive('/SDefineKalolsavm')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Define Kalolsavam
                    </Link>
                    <Link
                      to="/SSClEntry"
                      className={`block py-2 text-gray-300 ${isActive('/SSClEntry')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Entry
                    </Link>
                    <Link
                      to="/SClusterScl"
                      className={`block py-2 text-gray-300 ${isActive('/SClusterScl')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Cluster School
                    </Link>
                    <Link
                      to="/SsplOrderEntry"
                      className={`block py-2 text-gray-300 ${isActive('/SsplOrderEntry')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Special Order Entry
                    </Link>
                  </div>
                )}
              </div>

              {/* Stage Settings Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.stageSettings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('stageSettings')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fa-solid fa-microphone mr-5"></i> Stage Settings
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.stageSettings ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.stageSettings && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/SstageDurationList"
                      className={`block py-2 text-gray-300 ${isActive('/SstageDurationList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Duration
                    </Link>
                    <Link
                      to="/SdefineStagelist"
                      className={`block py-2 text-gray-300 ${isActive('/SdefineStagelist')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Define Stage
                    </Link>
                    <Link
                      to="/SStageAlloteFestwise"
                      className={`block py-2 text-gray-300 ${isActive('/SStageAlloteFestwise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Allotment Festival Wise List
                    </Link>
                    <Link
                      to="/SstageAllotItemwi"
                      className={`block py-2 text-gray-300 ${isActive('/SstageAllotItemwi')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Allotment Item Wise
                    </Link>
                    <Link
                      to="/SClashReport"
                      className={`block py-2 text-gray-300 ${isActive('/SClashReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Clash Report
                    </Link>

                  </div>
                )}
              </div>

              {/* Stage Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.stageReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('stageReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-laptop mr-3"></i> Stage Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.stageReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.stageReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/SCallSheet"
                      className={`block py-2 text-gray-300 ${isActive('/SCallSheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Call Sheet
                    </Link>
                    <Link
                      to="/STimesheet"
                      className={`block py-2 text-gray-300 ${isActive('/STimesheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Time Sheet
                    </Link>
                    <Link
                      to="/SScoresheet"
                      className={`block py-2 text-gray-300 ${isActive('/SScoresheet')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Score sheet
                    </Link>
                    <Link
                      to="/STablulation"
                      className={`block py-2 text-gray-300 ${isActive('/STablulation')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Tabulation Sheet
                    </Link>
                    <Link
                      to="/SAllReport"
                      className={`block py-2 text-gray-300 ${isActive('/SAllReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      All Report
                    </Link>
                  </div>
                )}
              </div>

              {/* Pre Fest Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.preFestReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('preFestReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-regular fa-message mr-4"></i> Pre Fest Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.preFestReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.preFestReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/StateParticipatesclList"
                      className={`block py-2 text-gray-300 ${isActive('/StateParticipatesclList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      District Participating Schools List
                    </Link>

                    <Link
                      to="/StateParticipateFesWis"
                      className={`block py-2 text-gray-300 ${isActive('/StateParticipateFesWis')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      District Festival Wise Participants
                    </Link>
                    <Link
                      to="/StateDatewisepaticipat"
                      className={`block py-2 text-gray-300 ${isActive('/StateDatewisepaticipat')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      District Date Wise Participants
                    </Link>
                    <Link
                      to="/StateParticipateCardLis"
                      className={`block py-2 text-gray-300 ${isActive('/StateParticipateCardLis')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      District Participants Card List
                    </Link>
                    <Link
                      to="/SParticipateMorethan"
                      className={`block py-2 text-gray-300 ${isActive('/SParticipateMorethan')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Participants more than one item
                    </Link>

                    <Link
                      to="/SClusterReport"
                      className={`block py-2 text-gray-300 ${isActive('/SClusterReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Cluster Report
                    </Link>
                    <Link
                      to="/SStageReport"
                      className={`block py-2 text-gray-300 ${isActive('/SStageReport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Report
                    </Link>
                  </div>
                )}
              </div>

              {/* Result Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.results ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('results')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i className="fa-solid fa-note-sticky fa-rotate-270 mr-4"></i> Result
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.results ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.results && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/SResultentryList"
                      className={`block py-2 text-gray-300 ${isActive('/SResultentryList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Result Entry
                    </Link>
                    <Link
                      to="/SitemResultList"
                      className={`block py-2 text-gray-300 ${isActive('/SitemResultList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Result List
                    </Link>
                    <Link
                      to="/SPublishDeclarList"
                      className={`block py-2 text-gray-300 ${isActive('/SPublishDeclarList')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Publish Result
                    </Link>

                  </div>
                )}
              </div>

              {/* Result Report Menu */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.resultsReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('resultsReport')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fas fa-paper-plane mr-4  "></i> Result Report
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.resultsReport ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.resultsReport && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/SConfidenal"
                      className={`block py-2 text-gray-300 ${isActive('/SConfidenal')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Confidential Result
                    </Link>
                    <Link
                      to="/SItemwisePoint"
                      className={`block py-2 text-gray-300 ${isActive('/SItemwisePoint')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Wise Point
                    </Link>
                    <Link
                      to="/SItemCodewise"
                      className={`block py-2 text-gray-300 ${isActive('/SItemCodewise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Item Code Wise Point
                    </Link>
                    <Link
                      to="/SsclwisePoint"
                      className={`block py-2 text-gray-300 ${isActive('/SsclwisePoint')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Wise Point
                    </Link>
                    <Link
                      to="/SsclGradewise"
                      className={`block py-2 text-gray-300 ${isActive('/SsclGradewise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      School Grade Wise
                    </Link>


                  </div>
                )}
              </div>
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.certificate ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('certificate')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fa-solid fa-file-circle-plus mr-4"></i>


                    Certificate
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.certificate ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.certificate && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/SCertificatetemp"
                      className={`block py-2 text-gray-300 ${isActive('/SCertificatetemp')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Template
                    </Link>
                    <Link
                      to="/SCertificateItemwise"
                      className={`block py-2 text-gray-300 ${isActive('/SCertificateItemwise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Item Wise
                    </Link>
                    <Link
                      to="/SCertificatesclwise"
                      className={`block py-2 text-gray-300 ${isActive('/SCertificatesclwise')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate School Wise
                    </Link>
                    <Link
                      to="/SCertificateRegNo"
                      className={`block py-2 text-gray-300 ${isActive('/SCertificateRegNo')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Certificate Reg No Wise
                    </Link>


                  </div>
                )}
              </div>
              {/*  */}
              <div className="mb-4">
                <div
                  className={`flex justify-between items-center w-full cursor-pointer ${openMenus.Export ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                    } p-2 rounded`}
                  onClick={() => toggleMenu('Export')}
                >
                  <h2 className="text-lg font-semibold flex items-center">
                    <i class="fas fa-arrow-up-right-from-square mr-4"></i>Export
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.Export ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.Export && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/ShigherLevel"
                      className={`block py-2 text-gray-300 ${isActive('/ShigherLevel')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Higher Level Competition
                    </Link>
                    <Link
                      to="/SExport"
                      className={`block py-2 text-gray-300 ${isActive('/SExport')
                        ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                        : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Export Database
                    </Link>



                  </div>
                )}
              </div>
            </>
          )}

          {/* IT Admin Panel - Completely separate UI */}
          {user?.role === 'It Admin' && (
            <div className="p-2">
              {/* IT Admin Dashboard */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/DistrictList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/DistrictList" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-table mr-3"></i> Dashboard
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* District List */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/DistrictList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/DistrictList" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-map mr-3"></i> District List
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* Sub District List */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/SubDisRegList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/SubDisRegList" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-vector-square mr-3"></i> Sub District List
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* School List */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/SchoolRegList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/SchoolRegList" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-building mr-3"></i> School List
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* Festival List */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/FestivalRegiList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/FestivalRegiList" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-calendar-days mr-3"></i> Festival List
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* Item List */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/ItemRegistrationList') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/ItemRegistrationList" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-diagram-project mr-3"></i> Item List
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* Create Kalolsavam */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/CreateKalolsavam') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/CreateKalolsavam" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fas fa-pen-to-square mr-3"></i> Create Kalolsavam
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* Admin User */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/admin-panel') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/admin-panel" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-user mr-3"></i> Admin User
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* Result List */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/AdResult') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/AdResult" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-file mr-3"></i> Result List
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* Export */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/ExportIT') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/ExportIT" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-arrow-up-right-from-square mr-3"></i> Export
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              {/* Logout */}
              <div className={`flex justify-between items-center w-full mb-6 ${isActive('/LogOut') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] py-2 rounded' : ''}`}>
                <Link to="/LogOut" className="text-lg font-semibold flex items-center cursor-pointer">
                  <i className="fa-solid fa-right-from-bracket mr-3"></i> Log Out
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Dash




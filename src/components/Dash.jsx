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
      // Settings menu should be open if current path matches any of its links
      settings: ['/AllKalolsavam', '/schlentry', '/All-schools', '/Spl-entry'].some(route => path === route),
      // Stage Settings menu should be open if current path matches any of its links
      stageSettings: ['/stage-duration-list', '/StageList', '/Stage-itemwiselist', '/festivalwiselist'].some(route => path === route),
      // Stage Report menu should be open if current path matches any of its links
      stageReport: ['/AddCallsheet', '/AddTimesheet', '/AddScoresheet', '/AddTabulationsheet', '/Addreport'].some(route => path === route),
      // Pre Fest Report menu should be open if current path matches any of its links
      preFestReport: ['/eligible-schools', '/Partcipatescllist', '/SclContactList', '/festwiseList', '/DateWiseList', '/ParticipantsCardList', '/ParticipantsMorethan', '/ClashReportList', '/ClusterReport', '/StageReport'].some(route => path === route),
      // Result menu should be open if current path matches any of its links
      results: ['/result-entry', '/item-result', '/Itemresult-list', '/All-Publishresult'].some(route => path === route),
      resultsReport: ['/ConfidentialResultlist', '/itemwisepoint', '/SclWisePoint', '/Sclgradewise'].some(route => path === route),
      certificate: ['/certificate-template', '/certificate-item-wise', '/certificate-school-wise','/CertificateRegno'].some(route => path === route),
      Export: ['/Higherlvlcomp'].some(route => path === route)
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
      stageSettings: openMenus.stageSettings || ['/stage-duration-list', '/StageList', '/Stage-itemwiselist', '/festivalwiselist'].some(route => path === route),
      stageReport: openMenus.stageReport || ['/AddCallsheet', '/AddTimesheet', '/AddScoresheet', '/AddTabulationsheet', '/Addreport'].some(route => path === route),
      preFestReport: openMenus.preFestReport || ['/eligible-schools', '/Partcipatescllist', '/SclContactList', '/festwiseList', '/DateWiseList', '/ParticipantsCardList', '/ClashReportList', '/ClusterReport', '/StageReport'].some(route => path === route),
      results: openMenus.results || ['/result-entry', '/item-result', '/Itemresult-list', '/All-Publishresult', '/'].some(route => path === route),
      resultsReport: openMenus.resultsReport || ['/ConfidentialResultlist', '/itemwisepoint', '/SclWisePoint', '/Sclgradewise'].some(route => path === route),
      certificate: openMenus.certificate || ['/certificate-template', '/certificate-item-wise', '/certificate-school-wise','/CertificateRegno'].some(route => path === route),
      Export: openMenus.Export || ['/Higherlvlcomp'].some(route => path === route)
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
      Export: menuName === 'Export' ? !openMenus[menuName] : false
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
        <div className="p-4">
          <div className={`flex justify-between items-center w-full mb-6 ${isActive('/') ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] p-2 rounded' : ''
            }`}>
            <Link to="/" className="text-lg font-semibold flex items-center cursor-pointer">
              <i className="fa-solid fa-table mr-2" aria-hidden="true"></i> Dashboard
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
                    <i className="fa-solid fa-cog mr-2" aria-hidden="true"></i> Settings
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
                    <span className='text-white mr-1' role="img" aria-label="Microphone">🎤</span> Stage Settings
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
                      to="/festivalwiselist"
                      className={`block py-2 text-gray-300 ${isActive('/festivalwiselist')
                          ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                          : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Allotment Festival Wise List
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
                    <i className="fa-solid fa-laptop mr-1"></i> Stage Report
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
                    <i className="fa-regular fa-message mr-1"></i> Pre Fest Report
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
                      to="/ClashReportList"
                      className={`block py-2 text-gray-300 ${isActive('/ClashReportList')
                          ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4] font-semibold text-white'
                          : 'hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]'
                        }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Clash Report
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
                    <i className="fa-solid fa-note-sticky fa-rotate-270 mr-1"></i> Result
                  </h2>
                  <i
                    className={`fa-solid fa-chevron-${openMenus.results ? 'up' : 'down'} text-sm`}
                    aria-hidden="true"
                  ></i>
                </div>

                {openMenus.results && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/result-entry"
                      className={`block py-2 text-gray-300 ${isActive('/result-entry')
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
                    <i class="fas fa-paper-plane mr-1  "></i> Result Report
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
                  <i class="fa-solid fa-file-circle-plus mr-1"></i>
       

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
                  <i class="fas fa-arrow-up-right-from-square mr-1"></i>Export 
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
        </div>
      </aside>
    </>
  );
};

export default Dash
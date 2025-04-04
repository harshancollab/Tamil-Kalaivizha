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
      preFestReport: ['/eligible-schools','/Partcipatescllist','/SclContactList','/festwiseList','/DateWiseList','/ParticipantsCardList','/ParticipantsMorethan','/ClashReportList','/ClusterReport','/StageReport'].some(route => path === route)
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
      preFestReport: openMenus.preFestReport || ['/eligible-schools','/Partcipatescllist','/SclContactList','/festwiseList','/DateWiseList','/ParticipantsCardList','/ClashReportList','/ClusterReport','/StageReport'].some(route => path === route)
    };
    
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  // Modified toggle menu function that closes other menus when opening a new one
  const toggleMenu = (menuName) => {
    setOpenMenus({
      settings: menuName === 'settings' ? !openMenus[menuName] : false,
      stageSettings: menuName === 'stageSettings' ? !openMenus[menuName] : false,
      stageReport: menuName === 'stageReport' ? !openMenus[menuName] : false,
      preFestReport: menuName === 'preFestReport' ? !openMenus[menuName] : false
    });
  };

  return (
    <>
      {/* Mobile menu toggle button - only shown when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          className="md:hidden fixed top-3 left-2 z-20 text-white p-2 rounded-md"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <i className="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-full min-h-screen z-20 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-[250px] bg-[#003566] text-white p-4 flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center w-full mb-6">
        <Link to="/" className="text-lg font-semibold flex items-center cursor-pointer ">
      <i className="fa-solid fa-table mr-2" aria-hidden="true"></i> Dashboard
    </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        {/* Only show admin options to sub district admin users */}
        {user?.role === 'sub district admin' && (
          <>
            {/* Settings Menu */}
            <div className="mb-4">
              <div
                className={`flex justify-between items-center w-full cursor-pointer ${
                  openMenus.settings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
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
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4]  ${
                      isActive('/AllKalolsavam') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Define Kalolsavam
                  </Link>
                  <Link
                    to="/schlentry"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/schlentry') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    School Entry
                  </Link>
                  <Link
                    to="/All-schools"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/All-schools') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Cluster School
                  </Link>
                  <Link
                    to="/Spl-entry"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/Spl-entry') ? 'font-semibold' : ''
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
                className={`flex justify-between items-center w-full cursor-pointer ${
                  openMenus.stageSettings ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
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
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/stage-duration-list') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Stage Duration
                  </Link>
                  <Link
                    to="/StageList"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/StageList') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Define Stage
                  </Link>
                  <Link
                    to="/Stage-itemwiselist"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/Stage-itemwiselist') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Stage Allotment Item Wise
                  </Link>
                  <Link
                    to="/festivalwiselist"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/festivalwiselist') ? 'font-semibold' : ''
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
                className={`flex justify-between items-center w-full cursor-pointer ${
                  openMenus.stageReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
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
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/AddCallsheet') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Call Sheet
                  </Link>
                  <Link
                    to="/AddTimesheet"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/AddTimesheet') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Time Sheet
                  </Link>
                  <Link
                    to="/AddScoresheet"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/AddScoresheet') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Score sheet
                  </Link>
                  <Link
                    to="/AddTabulationsheet"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/AddTabulationsheet') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Tabulation Sheet
                  </Link>
                  <Link
                    to="/Addreport"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/Addreport') ? 'font-semibold' : ''
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
                className={`flex justify-between items-center w-full cursor-pointer ${
                  openMenus.preFestReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                } p-2 rounded`}
                onClick={() => toggleMenu('preFestReport')}
              >
                <h2 className="text-lg font-semibold flex items-center">
                <i class="fa-regular fa-message mr-1"></i> Pre Fest Report
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
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/eligible-schools') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                      Eligible Schools
                   
                  </Link>
                  <Link
                    to="/Partcipatescllist"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/Partcipatescllist') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                     Participating Schools
                  </Link>
                  <Link
                    to="/SclContactList"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/SclContactList') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                   School Contact
                  </Link>
                  <Link
                    to="/festwiseList"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/festwiseList') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                   Festival Wise Participants
                  </Link>
                  <Link
                    to="/DateWiseList"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/DateWiseList') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                   Date Wise Participants
                  </Link>
                  <Link
                    to="/ParticipantsCardList"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/ParticipantsCardList') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                   Participants Card
                  </Link>
                  <Link
                    to="/ParticipantsMorethan"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/ParticipantsMorethan') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                  Participants more than one item
                  </Link>
                  <Link
                    to="/ClashReportList"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/ClashReportList') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                 Clash Report
                  </Link>
                  <Link
                    to="/ClusterReport"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/ClusterReport') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                 Cluster Report
                  </Link>
                  <Link
                    to="/StageReport"
                    className={`block py-2 text-gray-300 hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] ${
                      isActive('/StageReport') ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                  Stage Report
                  </Link>
                 
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Dash
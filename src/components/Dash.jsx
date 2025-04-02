import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContex'

const Dash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    settings: false,
    stageSettings: false,
    stageReport: false
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      // Close all menus when closing sidebar
      setOpenMenus({
        settings: false,
        stageSettings: false,
        stageReport: false
      });
    }
  };

  const handleDashboardClick = () => {
    navigate('/');
    setIsSidebarOpen(false);
    setOpenMenus({
      settings: false,
      stageSettings: false,
      stageReport: false
    });
  };

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => {
      // Close all other menus and toggle the clicked one
      const newState = {
        settings: false,
        stageSettings: false,
        stageReport: false
      };
      newState[menuName] = !prev[menuName];
      return newState;
    });
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile menu toggle button - only shown when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          className="md:hidden fixed top-3 left-2 z-20 text-white p-2 rounded-md"
          onClick={toggleSidebar}
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
          <h2
            className="text-lg font-semibold flex items-center cursor-pointer"
            onClick={handleDashboardClick}
          >
            <i className="fa-solid fa-table mr-2" aria-hidden="true"></i> Dashboard
          </h2>
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
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
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/AllKalolsavam') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Define Kalolsavam
                  </Link>
                  <Link
                    to="/schlentry"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/schlentry') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    School Entry
                  </Link>
                  <Link
                    to="/All-schools"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/All-schools') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Cluster School
                  </Link>
                  <Link
                    to="/Spl-entry"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/Spl-entry') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
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
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/stage-duration-list') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Stage Duration
                  </Link>
                  <Link
                    to="/StageList"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/StageList') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Define Stage
                  </Link>
                  <Link
                    to="/Stage-itemwiselist"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/Stage-itemwiselist') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Stage Allotment Item Wise
                  </Link>
                  <Link
                    to="/festivalwiselist"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/festivalwiselist') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                  Stage Allotment Festival Wise List
                  </Link>
                </div>
              )}
            </div>
            
            {/* Stage Report Menu - fixed to use its own state */}
            <div className="mb-4">
              <div
                className={`flex justify-between items-center w-full cursor-pointer ${
                  openMenus.stageReport ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                } p-2 rounded`}
                onClick={() => toggleMenu('stageReport')}
              >
                <h2 className="text-lg font-semibold flex items-center">
                <i class="fa-solid fa-laptop mr-1"></i> Stage Report
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
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/AddCallsheet') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Call Sheet
                  </Link>
                  <Link
                    to="/AddTimesheet"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/AddTimesheet') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Time Sheet
                  </Link>
                  <Link
                    to="/AddScoresheet"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/AddScoresheet') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Score sheet
                  </Link>
                  <Link
                    to="/AddTabulationsheet"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      isActive('/AddTabulationsheet') ? 'font-semibold' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    Tabulation Sheet
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
import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContex'

const Dash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsSubMenuOpen, setIsSettingsSubMenuOpen] = useState(false);
  const [isStageSettingsSubMenuOpen, setIsStageSettingsSubMenuOpen] = useState(false);
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [isStageSettingsClicked, setIsStageSettingsClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      setIsSettingsSubMenuOpen(false);
      setIsStageSettingsSubMenuOpen(false);
      setIsSettingsClicked(false);
      setIsStageSettingsClicked(false);
    }
  };

  const handleDashboardClick = () => {
    navigate('/');
    setIsSidebarOpen(false);
    setIsSettingsSubMenuOpen(false);
    setIsStageSettingsSubMenuOpen(false);
    setIsSettingsClicked(false);
    setIsStageSettingsClicked(false);
  };

  const toggleSettingsSubMenu = () => {
    setIsSettingsSubMenuOpen(!isSettingsSubMenuOpen);
    setIsStageSettingsSubMenuOpen(false);
    setIsSettingsClicked(true);
    setIsStageSettingsClicked(false);
  };

  const toggleStageSettingsSubMenu = () => {
    setIsStageSettingsSubMenuOpen(!isStageSettingsSubMenuOpen);
    setIsSettingsSubMenuOpen(false);
    setIsSettingsClicked(false);
    setIsStageSettingsClicked(true);
  };

  return (
    <>
      {!isSidebarOpen && (
        <button
          className="md:hidden fixed top-3 left-2 z-20 text-white p-2 rounded-md"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      )}
      <aside
        className={`fixed md:sticky top-0 h-full min-h-screen z-20 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-[250px] bg-[#003566] text-white p-4 flex flex-col`}
      >
        <div className="flex justify-between items-center w-full mb-6">
          <h2
            className="text-lg font-semibold flex items-center cursor-pointer"
            onClick={handleDashboardClick}
          >
            <i className="fa-solid fa-table mr-2"></i> Dashboard
          </h2>
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {user?.role === 'sub district admin' && (
          <>
            <div className="mb-4">
              <div
                className={`flex justify-between items-center w-full cursor-pointer ${
                  isSettingsClicked ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                } p-2 rounded`}
                onClick={toggleSettingsSubMenu}
              >
                <h2 className="text-lg font-semibold flex items-center">
                  <i className="fa-solid fa-cog mr-2"></i> Settings
                </h2>
                <i
                  className={`fa-solid fa-chevron-${
                    isSettingsSubMenuOpen ? 'up' : 'down'
                  } text-sm`}
                ></i>
              </div>
              {isSettingsSubMenuOpen && (
                <div className="mt-2 pl-4">
                  <Link
                    to="/AllKalolsavam"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      location.pathname === '/AllKalolsavam' ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Define Kalolsavam
                  </Link>
                  <Link
                    to="/schlentry"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      location.pathname === '/schlentry' ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    School Entry
                  </Link>
                  <Link
                    to="/All-schools"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      location.pathname === '/All-schools' ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Cluster School
                  </Link>
                  <Link
                    to="/Spl-entry"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      location.pathname === '/Spl-entry' ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Special Order Entry
                  </Link>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className={`flex justify-between items-center w-full cursor-pointer ${
                  isStageSettingsClicked ? 'bg-gradient-to-r from-[#003566] to-[#05B9F4]' : ''
                } p-2 rounded`}
                onClick={toggleStageSettingsSubMenu}
              >
                <h2 className="text-lg font-semibold flex items-center">
                <span className='text-white mr-1'>🎤</span> Stage Settings
                </h2>
                <i
                  className={`fa-solid fa-chevron-${
                    isStageSettingsSubMenuOpen ? 'up' : 'down'
                  } text-sm`}
                ></i>
              </div>
              {isStageSettingsSubMenuOpen && (
                <div className="mt-2 pl-4">
                  <Link
                    to="/stage-duration-list"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      location.pathname === '/stage-duration-list' ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Stage Duration
                  </Link>
                  <Link
                    to="/StageList"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      location.pathname === '/StageList' ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                   Define Stage
                  </Link>
                  <Link
                    to="/Stage-itemwise"
                    className={`block py-2 text-gray-300 hover:text-white ${
                      location.pathname === '/Stage-itemwise' ? 'font-semibold' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                 Stage Allotment Item Wise
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
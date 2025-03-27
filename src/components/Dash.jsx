import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';

const Dash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsSubMenuOpen, setIsSettingsSubMenuOpen] = useState(false);
  const [isStageSettingsSubMenuOpen, setIsStageSettingsSubMenuOpen] = useState(false); // New state for Stage Settings
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [isStageSettingsClicked, setIsStageSettingsClicked] = useState(false); // New state for Stage Settings click
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Get user from Auth context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      setIsSettingsSubMenuOpen(false);
      setIsStageSettingsSubMenuOpen(false); // Close Stage Settings on sidebar close
      setIsSettingsClicked(false);
      setIsStageSettingsClicked(false); // Reset Stage Settings clicked state
    }
  };

  const handleDashboardClick = () => {
    navigate('/');
    setIsSidebarOpen(false);
    setIsSettingsSubMenuOpen(false);
    setIsStageSettingsSubMenuOpen(false); // Close Stage Settings on dashboard click
    setIsSettingsClicked(false);
    setIsStageSettingsClicked(false); // Reset Stage Settings clicked state
  };

  const toggleSettingsSubMenu = () => {
    setIsSettingsSubMenuOpen(!isSettingsSubMenuOpen);
    setIsStageSettingsSubMenuOpen(false); // Close Stage Settings when main settings toggles
    setIsSettingsClicked(true);
    setIsStageSettingsClicked(false); // Reset Stage Settings clicked state
  };

  const toggleStageSettingsSubMenu = () => {
    setIsStageSettingsSubMenuOpen(!isStageSettingsSubMenuOpen);
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
          <div className="mb-4">
            <div
              className={`flex justify-between items-center w-full cursor-pointer ${
                isSettingsClicked ? 'bg-[#00284d]' : ''
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
                  to="/edit-kalolsavam/:id"
                  className={`block py-2 text-gray-300 hover:text-white ${
                    location.pathname.startsWith('/edit-kalolsavam') ? 'font-semibold' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Kalolsavam Details
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
                <div
                  className={`flex justify-between items-center w-full cursor-pointer mt-2 ${
                    isStageSettingsClicked ? 'bg-[#00284d]' : ''
                  } p-2 rounded`}
                  onClick={toggleStageSettingsSubMenu}
                >
                  <h3 className="text-base font-semibold text-gray-300 flex items-center">
                    <i className="fa-solid fa-sliders mr-2"></i> Stage Settings
                  </h3>
                  <i
                    className={`fa-solid fa-chevron-${
                      isStageSettingsSubMenuOpen ? 'up' : 'down'
                    } text-sm text-gray-300`}
                  ></i>
                </div>
                {isStageSettingsSubMenuOpen && (
                  <div className="mt-2 pl-4">
                    <Link
                      to="/stage-duration"
                      className={`block py-2 text-gray-400 hover:text-white ${
                        location.pathname === '/stage-duration' ? 'font-semibold' : ''
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Duration
                    </Link>
                    <Link
                      to="/stage-duration-list"
                      className={`block py-2 text-gray-400 hover:text-white ${
                        location.pathname === '/stage-duration-list' ? 'font-semibold' : ''
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Stage Duration List
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export default Dash;
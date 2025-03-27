import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';

const Dash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsSubMenuOpen, setIsSettingsSubMenuOpen] = useState(false);
  const [isSettingsClicked, setIsSettingsClicked] = useState(false); // New state
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Get user from Auth context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      setIsSettingsSubMenuOpen(false);
      setIsSettingsClicked(false); // Reset clicked state when sidebar closes
    }
  };

  const handleDashboardClick = () => {
    navigate('/');
    setIsSidebarOpen(false);
    setIsSettingsSubMenuOpen(false);
    setIsSettingsClicked(false); // Reset clicked state
  };

  const toggleSettingsSubMenu = () => {
    setIsSettingsSubMenuOpen(!isSettingsSubMenuOpen);
    setIsSettingsClicked(true); // Set clicked state when settings is clicked
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

        {/* Show Settings button only for "sub dist admin" */}
        {user?.role === 'sub district admin' && (
          <div className="mb-4">
            <div
              className={`flex justify-between items-center w-full cursor-pointer ${
                isSettingsClicked ? 'bg-[#00284d]' : '' // Highlight background
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
                    location.pathname === '/KalolsavamDetails' ? 'font-semibold' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Kalolsavam Details
                </Link>
                <Link
                  to="/schlentry"
                  className={`block py-2 text-gray-300 hover:text-white ${
                    location.pathname === '/KalolsavamDetails' ? 'font-semibold' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  School Entry
                </Link>
                <Link
                  to="/All-schools"
                  className={`block py-2 text-gray-300 hover:text-white ${
                    location.pathname === '/KalolsavamDetails' ? 'font-semibold' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                 Cluster School
                </Link>
                <Link
                  to="/Spl-entry"
                  className={`block py-2 text-gray-300 hover:text-white ${
                    location.pathname === '/KalolsavamDetails' ? 'font-semibold' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                 Special Order Entry
                </Link>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export default Dash;
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDashboardClick = () => {
    navigate('/'); 
    setIsSidebarOpen(false);
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
        className={`fixed  md:sticky top-0 h-full min-h-screen z-20 transform  ${
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
        <div className="flex justify-between items-center w-full mb-6">
        <h2
            className="text-lg font-semibold flex items-center cursor-pointer"
            onClick={handleDashboardClick} 
          >
            <i className="fa-solid fa-table mr-2"></i> Settings
          </h2>
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          
        </div>
        
      
      </aside>
    </>
  );
};

export default Dash
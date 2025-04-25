import React from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const LogoOut = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Dash />
        <div className="flex-1 p-2 w-full overflow-x-auto">
          <div className="flex items-center justify-center bg-gray-100 h-screen">
            <div className="bg-gray-200 py-8 md:py-16 px-4 md:px-8 lg:py-32 lg:p-14 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-96 flex flex-col items-center">
              <div className="mb-6 md:mb-8 text-center">
                <p className="text-sm sm:text-base font-semibold text-gray-700">Are you sure you want to log out?</p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                <button
                  className="w-full sm:flex-1 py-2 sm:py-3 px-4 border border-blue-500 text-blue-500 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  className="w-full sm:flex-1 py-2 sm:py-3 bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-8 rounded-full text-white font-medium hover:opacity-90 transition-colors text-sm sm:text-base"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogoOut
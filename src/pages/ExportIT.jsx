//It  Admin - export

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const ExportIT = () => {
    const [loading, setLoading] = useState(true);






useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
        return (
            <>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-gray-600">Loading...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

  return (


    <>
    <div>
        <Header />
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
          <Dash />
          <div className="flex-1 p-2 w-full overflow-x-auto">
            {/* Report Selection Form */}
            <div className="bg-gray-200 p-4 rounded-lg min-h-screen">
              <h2 className="text-lg font-semibold mb-4 ">Export </h2>
              <form>
                <div className="flex justify-center mt-8 md:mt-28">
                  <div className="space-y-4 w-full max-w-lg">
                    <div className="flex flex-col md:flex-row mb-6">
                      <div className="w-full  md:ml-20 md:w-80 relative text-center">
                      <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0 md:pt-2">Export Result data for district kalolsavam</label>

                      </div>
                    </div>
                    <div className='text-center'>
                    <button
                        className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-8 md:px-14 py-2 md:py-3 rounded-full mt-10 md:mt-20 mr-10"
                      >
                        Export Data
                      </button>
                    
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    
    </>
  )
}


export default ExportIT
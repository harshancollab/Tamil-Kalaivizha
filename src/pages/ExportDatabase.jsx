import React from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const ExportDatabase = () => {
  return (
    <>
    
    
    <div>
        <Header />
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
          <Dash />
          <div className="flex-1 p-2 w-full overflow-x-auto">
            {/* Report Selection Form */}
            <div className="bg-gray-200 p-4 rounded-lg min-h-screen">
              <h2 className="text-lg font-semibold mb-4 ">Export Database</h2>
              <form>
                <div className="flex justify-center mt-8 md:mt-28">
                  <div className="space-y-4 w-full max-w-lg">
                    <div className="flex flex-col md:flex-row mb-6">
                      <div className="w-full md:ml-4 md:w-80 relative text-center">
                      <label className="font-semibold text-blue-900 w-full md:w-40 mb-2 md:mb-0 md:pt-2">Export Result data for district kalolsavam</label>

                      </div>
                    </div>
                    <div className='text-left'>
                    <button
                        className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-8 md:px-14 py-2 md:py-3 rounded-full mt-10 md:mt-20 mr-10"
                      >
                        Export Data
                      </button>
                      <button
                        className="border border-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] px-8 md:px-14 py-2 md:py-3 rounded-full mt-10 md:mt-20"
                      >
                       Export Photo
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

export default ExportDatabase
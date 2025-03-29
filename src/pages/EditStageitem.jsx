import React from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const EditStageitem = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
        <Dash />
        <div className="w-full p-4 ">
          <form 
            className="bg-white  p-4 rounded-lg shadow-md w-full min-h-screen"
           
          >
            <div className="mb-5 mt-3">
              <h2 className="text-xl md:text-2xl font-semibold"> Update Stage Allotement Itemwise</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6 text-[#003566] p-4">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Item Code</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="itemCode"
                  
                    className='border border-blue-500 px-2 py-1 rounded-full w-full'
                  />
                
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 pl-4">Item Name</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="itemName"
                    className='border border-blue-500 px-2 py-1 rounded-full w-full'
                  />
                  
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Participants</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="participants"
                    
                  className='border border-blue-500 px-2 py-1 rounded-full w-full'
                  />
                
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 pl-4">Appr Time Taken</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="time"
                   
                    className='border border-blue-500 px-2 py-1 rounded-full w-full'
                  />
                  
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Stage</label>
                <div className="w-full">
                  <input
                    type="text"
                    name="completionTime"
                   
               className='border border-blue-500 px-2 py-1 rounded-full w-full'
                  />
                
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 pl-4">Date</label>
                <div className="w-full">
                  <input
                    type="date"
                    name="stage"
                   
                    className='border border-blue-500 px-2 py-1 rounded-full w-full'                  />
                
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Time</label>
                <div className="w-full">
                  <input
                    type="time"
                    name="date"
                 
                   className='border border-blue-500 px-2 py-1 rounded-full w-full'
                  />
                
                </div>
              </div>
              
              
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 pl-4">No of Clusters</label>
                <div className="w-full">
                  <input
                   
                    
                    className='border border-blue-500 px-2 py-1 rounded-full w-full'
                  />
                  
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of judge</label>
                <div className="w-full">
                  <input
                  
                    name="date"
                 
                   className='border border-blue-500 px-2 py-1 rounded-full w-full'
                  />
                
                </div>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-32 text-right mr-8 ">
            <button 
               
                className="border mr-20 border-blue-600 rounded-full px-6 md:px-10 text-blue-700 py-2 hover:shadow-lg transition-shadow duration-300"
              >
              Cancel
              </button>
              <button 
                type="submit"
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-6 md:px-10 text-white py-2 hover:shadow-lg transition-shadow duration-300"
              >
               Update
              </button>
            </div>
          </form>
        </div>
      </div>
    
    
    
    </>
  )
}

export default EditStageitem
import React from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const StageItemwise = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 bg-gray-300 ">
          <form
            className='min-h-screen mx-auto p-6 bg-white rounded-lg shadow-md'
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                Stage Allotement Itemwise
              </h2>
            </div>
            
            <div className='ml-48 mt-16' >
              <div className="mt-10 ml-12 items-center ">
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Name</label>
                  <div className="w-full md:w-80">
                    <input
                      type="text"
                      name="itemName"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Code</label>
                  <div className="w-full md:w-80">
                    <input
                      type="text"
                      name="itemCode"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">No of Participants</label>
                  <div className="w-full md:w-80">
                    <input
                      type="number"
                      name="quantity"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Stage</label>
                  <div className="w-full md:w-80">
                    <input
                      type="number"
                      name="unitPrice"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Time</label>
                  <div className="w-full md:w-80">
                    <input
                      type="number"
                      name="totalAmount"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">No of Judges</label>
                  <div className="w-full md:w-80">
                  <select
                      name="status"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    >
                      <option value="">Select </option>
                      <option value="Pending">1</option>
                      <option value="In Progress">2</option>
                      <option value="Completed">3</option>
                    </select>
                  </div>
                </div>
  
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Appr Time Taken</label>
                  <div className="w-full md:w-80">
                    <input
                     
                      name="endDate"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Date</label>
                  <div className="w-full md:w-80">
                    <input
                      type="date"
                      name="assignedTo"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    />
                  </div>
                </div>
  
                <div className="flex flex-col md:flex-row mb-4">
                  <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">No of Clusters</label>
                  <div className="w-full md:w-80">
                    <select
                      name="status"
                      className="border border-blue-600 px-2 py-1 rounded-full w-full mb-2"
                      required
                    >
                      <option value="">Select </option>
                      <option value="Pending">1</option>
                      <option value="In Progress">2</option>
                      <option value="Completed">3</option>
                    </select>
                  </div>
                </div>
              </div>
  
              <div className='text-center mr-48 mt-12'>
              <button
                
                  className=" text-blue-500 mr-12 border border-blue-600 px-6 py-2 rounded-full"
                >
              Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-6 py-2 rounded-full"
                >
                  Add Stage
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default StageItemwise
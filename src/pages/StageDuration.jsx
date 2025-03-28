import React from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const StageDuration = () => {
  return (
    <>
        <Header />
            <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen overflow-x-hidden">
                <Dash />
                <div className='ml-5 w-full'>
                    <form className="bg-white mt-2 p-4 md:p-5 lg:p-6 min-h-screen rounded-lg shadow-md mt-2">
                        <div className="flex items-center justify-between mb-5 ml-2">
                            <h2 className="text-2xl font-semibold">Stage Duration</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#003566] mt-5 ml-10 ">
                            <div className="flex items-center space-x-4 ml-8 mt-6 mb-4">
                                <label className="font-semibold text-blue-900 w-40">Item Code</label>
                                <input
                                    type="text"
                                    name="schoolCode"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                            <div className="flex items-center space-x-1 ml-8">
                                <label className="font-semibold text-blue-900 w-40">Item Name</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                            <div className="flex items-center space-x-4 ml-8 mb-4">
                                <label className="font-semibold text-blue-900 w-40">No of Participants</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                            <div className="flex items-center space-x-1 ml-8">
                                <label className="font-semibold text-blue-900 w-40">Time</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                            <div className="flex items-center space-x-4 ml-8 mb-4">
                                <label className="font-semibold text-blue-900 w-40">Completion Time</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                            <div className="flex items-center space-x-1 ml-8">
                                <label className="font-semibold text-blue-900 w-40">Stage</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                            <div className="flex items-center space-x-4 ml-8">
                                <label className="font-semibold text-blue-900 w-40">Date</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                            <div className="flex items-center space-x-1 ml-8">
                                <label className="font-semibold text-blue-900 w-40">Time</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    className="border border-blue-900 px-2 py-1 rounded-full w-80"
                                />
                            </div>
                        </div>
                        <div className='mt-64 text-right mr-16'>
                            <button className='bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-10 text-white py-2'>Save</button>
                        </div>
                        </form>

                        </div>
                        </div>
                      
    
    
    
    </>
  )
}

export default StageDuration



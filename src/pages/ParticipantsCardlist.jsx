import React, { useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const ParticipantsCardlist = () => {
  const [photoStatus, setPhotoStatus] = useState("With Photo")
  
  const handlePhotoStatusChange = (e) => {
    setPhotoStatus(e.target.value)
  }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header section with title and controls */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Participants Card List
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  value={photoStatus}
                  onChange={handlePhotoStatusChange}
                >
                  <option value="With Photo">With Photo</option>
                  <option value="Without Photo">Without Photo</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto"
              >
                Print
              </button>
            </div>
          </div>
          <div className="w-full">
            <div className="print-title hidden"></div>
            <div className="overflow-x-auto -mx-4 sm:mx-0 ">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                  <thead className="text-xs sm:text-sm">
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      {photoStatus === "With Photo" && (
                        <th className="p-2 md:p-3">Picture</th>
                      )}
                      <th className="p-2 md:p-3">Reg No</th>
                      <th className="p-2 md:p-3"> Name</th>
                      <th className="p-2 md:p-3">Gender</th>
                      <th className="p-2 md:p-3">Class</th>
                      <th className="p-2 md:p-3">School code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="hover:bg-gray-100">
                      <td className="p-2 md:p-3">8</td>
                      {photoStatus === "With Photo" && (
                        <td className="p-2 justify-center items-center md:p-3"></td>
                      )}
                      <td className="p-2 md:p-3">9</td>
                      <td className="p-2 md:p-3">nazme</td>
                      <td className="p-2 md:p-3">Boy</td>
                      <td className="p-2 md:p-3">9</td>
                      <td className="p-2 md:p-3">933</td>
                      <td className="p-2 md:p-3">school 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParticipantsCardlist
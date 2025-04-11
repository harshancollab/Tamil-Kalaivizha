// import React from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'

// const AddcertfitDetail = () => {
//     return (
//         <>


//             <div>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-2  w-full overflow-x-auto">



//                         {/* Report Selection Form */}
//                         <div className="bg-gray-200 p-4 rounded-lg min-h-screen ">
//                             <h2 className="text-lg font-semibold mb-4">G. H. S. S. Anakara - Certificate Details</h2>
//                             <form >
//                                 <div className="flex justify-center mt-28">
//                                     <div className="space-y-4">
//                                         <div className="flex flex-col md:flex-row mb-8">
//                                             <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Festival Type</label>
//                                             <div className="w-full ml-20 md:w-80 relative">

//                                                 <select
//                                                     name="Item"
//                                                     className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                     required

//                                                 >
//                                                     <option value="">Select Sheet </option>
//                                                     <option value="Call Sheet">Call Sheet</option>
//                                                     <option value="Score Sheet">Score Sheet</option>
//                                                     <option value="Time Sheet">Time Sheet</option>
//                                                 </select>

//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col md:flex-row mb-8">
//                                             <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Name</label>
//                                             <div className="w-full ml-20 md:w-80">
//                                                 <select
//                                                     name="Item"
//                                                     className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                     required

//                                                 >
//                                                     <option value="">Select Sheet </option>
//                                                     <option value="Call Sheet">Call Sheet</option>
//                                                     <option value="Score Sheet">Score Sheet</option>
//                                                     <option value="Time Sheet">Time Sheet</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col md:flex-row mb-8">
//                                             <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Participant / Captain</label>
//                                             <div className="w-full ml-20 md:w-80">
//                                                 <input
//                                                     type="text"



//                                                     className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col md:flex-row mb-8">
//                                             <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Participant (Group / Pinnany)</label>
//                                             <div className="w-full ml-20 md:w-80">
//                                                 <input
//                                                     type="text"



//                                                     className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className='text-center mt-10'>
//                                             <button

//                                                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
//                                             >
//                                                Generate
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>

//                     </div>
//                 </div>
//             </div>



//         </>
//     )
// }

// export default AddcertfitDetail


import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'

const AddcertfitDetail = () => {
    const [searchParams] = useSearchParams();
    const schoolName = searchParams.get('school') || "School Name";

    return (
        <>
            <div>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                    <Dash />
                    <div className="flex-1 p-2 w-full overflow-x-auto">

                        {/* Report Selection Form */}
                        <div className="bg-gray-200 p-4 rounded-lg min-h-screen">
                            <h2 className="text-lg font-semibold mb-4">{schoolName} - Certificate Details</h2>
                            <form>
                                <div className="flex justify-center mt-8 md:mt-28">
                                    <div className="space-y-4 w-full max-w-xl">
                                        <div className="flex flex-col md:flex-row mb-6">
                                            <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">Festival Type</label>
                                            <div className="w-full md:ml-4 lg:ml-12 md:w-80 relative">
                                                <select
                                                    name="Item"
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Festival </option>
                                                    <option value="UP Kalaivizha">UP Kalaivizha</option>
                                                    <option value="LP Kalaivizha">LP Kalaivizha</option>
                                                    <option value="HS Kalaivizha">HS Kalaivizha</option>
                                                    <option value="HSS Kalaivizha">HSS Kalaivizha</option>
                                                    <option value="All Festival">All Festival</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row mb-6">
                                            <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">Item Name</label>
                                            <div className="w-full md:ml-4 lg:ml-12 md:w-80">
                                                <select
                                                    name="Item"
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                    required
                                                >
                                                    <option value="">Select Sheet </option>
                                                    <option value="Call Sheet">Call Sheet</option>
                                                    <option value="Score Sheet">Score Sheet</option>
                                                    <option value="Time Sheet">Time Sheet</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row mb-6">
                                            <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">Participant / Captain</label>
                                            <div className="w-full md:ml-4 lg:ml-12 md:w-80">
                                                <input
                                                    type="text"
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row mb-6">
                                            <label className="font-semibold text-blue-900 w-full md:w-52 mb-2 md:mb-0 md:pt-2">Participant (Group / Pinnany)</label>
                                            <div className="w-full md:ml-4 lg:ml-12 md:w-80">
                                                <input
                                                    type="text"
                                                    className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-6 md:mt-10">
                                            <button
                                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-8 md:px-14 py-2 md:py-3 rounded-full"
                                            >
                                                Generate
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

export default AddcertfitDetail
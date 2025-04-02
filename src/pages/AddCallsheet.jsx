// import React, { useState } from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'
// import { AddCallSheetAPI } from '../services/allAPI'

// const AddCallsheet = () => {
//     const [callsheet, setCallsheet] = useState({
//         Festival: "", Item: ""
//     })
//     console.log(callsheet);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCallsheet({ ...callsheet, [name]: value });
//     }

//     const handleAddcallsheet = async (e) => {
//         e.preventDefault();
//         const { Festival, Item } = callsheet
//         if (Festival && Item) {
//             // alert("proceed to api")
//             const reqBody = new FormData()
//             reqBody.append("Festival", Festival)
//             reqBody.append("Item", Item)
//             const token = sessionStorage.getItem("token")
//             if (token) {
//                 const reqHeaders = {
//                     "Authorization": `Bearer ${token}`
//                 }
//                 try {
//                     const result = await AddCallSheetAPI(reqBody, reqHeaders)
//                     if (result.status === 200) {
//                         alert("Callsheet added successfully")

//                         setCallsheet({ Festival: "", Item: "" })
//                     } else {
//                         alert(result.response.data)
//                     }
//                 } catch (err) {
//                     console.log(err);
//                 }
//             } else {
//                 alert("Authentication token missing. Please log in again.")
//             }
//         } else {
//             alert("Fill the form completely")
//         }
//     }

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen">
//                 <Dash />
//                 <div className="p-6 bg-gray-100 w-full min-h-screen">
//                     <h2 className="text-lg font-semibold mb-4">Stage Report - Call Sheet</h2>

//                     <div className="space-y-6">
//                         {/* Call Sheet (Item) */}
//                         <div className="bg-gray-200 p-6 rounded-lg">
//                             <h3 className="text-md font-semibold mb-4">Call Sheet (Item)</h3>
//                             <div className="flex justify-center">
//                                 <div className="space-y-4 ">
//                                     <div className="flex flex-col md:flex-row mb-8 ">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Festival Type</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Festival"
//                                                 value={callsheet.Festival}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Festival</option>
//                                                 <option value="UP">UP</option>
//                                                 <option value="LP">LP</option>
//                                                 <option value="HS">HS</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col md:flex-row mb-8">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Name</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Item"
//                                                 value={callsheet.Item}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Item </option>
//                                                 <option value="Drama">Drama</option>
//                                                 <option value="Essay">Essay</option>
//                                                 <option value="Story">Story</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className='text-center mt-10'>
//                                         <button
//                                             type="submit"
//                                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
//                                         >
//                                             Report
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Call Sheet (Festival Wise) */}
//                         <div className="bg-gray-200 p-6 rounded-lg">
//                             <h3 className="text-md font-semibold mb-4">Call Sheet (Festival Wise)</h3>
//                             <div className="flex justify-center">
//                                 <div className="space-y-4 ">
//                                     <div className="flex flex-col md:flex-row mb-8 ">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Festival Type</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Festival"
//                                                 value={callsheet.Festival}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Festival</option>
//                                                 <option value="UP">UP</option>
//                                                 <option value="LP">LP</option>
//                                                 <option value="HS">HS</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     <div className='text-center mt-10'>
//                                         <button
//                                             type="submit"
//                                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
//                                         >
//                                             Report
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Call Sheet (Date & Stage Wise) */}
//                         <div className="bg-gray-200 p-6 rounded-lg">
//                             <h3 className="text-md font-semibold mb-4">Call Sheet (Date & Stage Wise)</h3>
//                             <div className="flex justify-center">
//                                 <div className="space-y-4 ">
//                                     <div className="flex flex-col md:flex-row mb-8 ">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Date</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Festival"
//                                                 value={callsheet.Festival}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Date</option>
//                                                 <option value="UP">UP</option>
//                                                 <option value="LP">LP</option>
//                                                 <option value="HS">HS</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col md:flex-row mb-8">
//                                         <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Stage</label>
//                                         <div className="w-full md:w-80">
//                                             <select
//                                                 name="Item"
//                                                 value={callsheet.Item}
//                                                 onChange={handleChange}
//                                                 className="border border-blue-600 px-2 py-1 rounded-full w-full"
//                                                 required
//                                             >
//                                                 <option value="">Select Item </option>
//                                                 <option value="Drama">Drama</option>
//                                                 <option value="Essay">Essay</option>
//                                                 <option value="Story">Story</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className='text-center mt-10'>
//                                         <button
//                                             type="submit"
//                                             className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
//                                         >
//                                             Report
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>











//             </div>
//         </>
//     )
// }

// export default AddCallsheet

import React, { useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { AddCallSheetAPI } from '../services/allAPI'

const AddCallsheet = () => {
    const [callsheet, setCallsheet] = useState({
        Festival: "", Item: ""
    })
    console.log(callsheet);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCallsheet({ ...callsheet, [name]: value });
    }

    const handleAddcallsheet = async (e) => {
        e.preventDefault();
        const { Festival, Item } = callsheet
        if (Festival && Item) {
            // alert("proceed to api")
            const reqBody = new FormData()
            reqBody.append("Festival", Festival)
            reqBody.append("Item", Item)
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeaders = {
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await AddCallSheetAPI(reqBody, reqHeaders)
                    if (result.status === 200) {
                        alert("Callsheet added successfully")

                        setCallsheet({ Festival: "", Item: "" })
                    } else {
                        alert(result.response.data)
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                alert("Authentication token missing. Please log in again.")
            }
        } else {
            alert("Fill the form completely")
        }
    }

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="p-6 bg-gray-100 w-full min-h-screen">
                    <h2 className="text-lg font-semibold mb-4">Stage Report - Call Sheet</h2>

                    <div className="space-y-6">
                        {/* Call Sheet (Item) */}
                        <div className="bg-gray-200 p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Call Sheet (Item)</h3>
                            <div className="flex justify-center">
                                <div className="space-y-4 ">
                                    <div className="flex flex-col md:flex-row mb-8 ">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Festival Type</label>
                                        <div className="w-full md:w-80">
                                            <select
                                                name="Festival"
                                                value={callsheet.Festival}
                                                onChange={handleChange}
                                                className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                required
                                            >
                                                <option value="">Select Festival</option>
                                                <option value="UP">UP</option>
                                                <option value="LP">LP</option>
                                                <option value="HS">HS</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row mb-8">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Name</label>
                                        <div className="w-full md:w-80">
                                            <select
                                                name="Item"
                                                value={callsheet.Item}
                                                onChange={handleChange}
                                                className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                required
                                            >
                                                <option value="">Select Item </option>
                                                <option value="Drama">Drama</option>
                                                <option value="Essay">Essay</option>
                                                <option value="Story">Story</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='text-center mt-10'>
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
                                        >
                                            Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call Sheet (Festival Wise) */}
                        <div className="bg-gray-200 p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Call Sheet (Festival Wise)</h3>
                            <div className="flex justify-center">
                                <div className="space-y-4 ">
                                    <div className="flex flex-col md:flex-row mb-8 ">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Festival Type</label>
                                        <div className="w-full md:w-80">
                                            <select
                                                name="Festival"
                                                value={callsheet.Festival}
                                                onChange={handleChange}
                                                className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                required
                                            >
                                                <option value="">Select Festival</option>
                                                <option value="UP">UP</option>
                                                <option value="LP">LP</option>
                                                <option value="HS">HS</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='text-center mt-10'>
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
                                        >
                                            Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call Sheet (Date & Stage Wise) */}
                        <div className="bg-gray-200 p-6 rounded-lg">
                            <h3 className="text-md font-semibold mb-4">Call Sheet (Date & Stage Wise)</h3>
                            <div className="flex justify-center">
                                <div className="space-y-4 ">
                                    <div className="flex flex-col md:flex-row mb-8 ">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Date</label>
                                        <div className="w-full md:w-80">
                                            <select
                                                name="Festival"
                                                value={callsheet.Festival}
                                                onChange={handleChange}
                                                className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                required
                                            >
                                                <option value="">Select Date</option>
                                                <option value="UP">UP</option>
                                                <option value="LP">LP</option>
                                                <option value="HS">HS</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row mb-8">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Stage</label>
                                        <div className="w-full md:w-80">
                                            <select
                                                name="Item"
                                                value={callsheet.Item}
                                                onChange={handleChange}
                                                className="border border-blue-600 px-2 py-1 rounded-full w-full"
                                                required
                                            >
                                                <option value="">Select Item </option>
                                                <option value="Drama">Drama</option>
                                                <option value="Essay">Essay</option>
                                                <option value="Story">Story</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='text-center mt-10'>
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full mt-4"
                                        >
                                            Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>











            </div>
        </>
    )
}

export default AddCallsheet
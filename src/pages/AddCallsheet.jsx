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
        setCallsheet({...callsheet, [name]: value});
    }

    const handleAddcallsheet = async(e) => {
        e.preventDefault(); 
        const { Festival, Item } = callsheet
        if (Festival && Item) {
            // alert("proceed to api")
            const reqBody = new FormData()
            reqBody.append("Festival", Festival)
            reqBody.append("Item", Item)
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeaders = {
                      "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await AddCallSheetAPI(reqBody, reqHeaders)
                    if(result.status === 200){
                        alert("Callsheet added successfully")
                        
                        setCallsheet({Festival: "", Item: ""})
                    } else {
                        alert(result.response.data)
                    }
                } catch(err) {
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
                <div className="flex-1 p-4 bg-gray-300">
                    <form 
                        className='min-h-screen mx-auto p-6 bg-white rounded-lg shadow-md'
                        onSubmit={handleAddcallsheet}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                                Stage Report - Call Sheet
                            </h2>
                        </div>

                       
                        <div className="flex flex-col items-center justify-center h-full mt-32">
                            <div className="w-full max-w-md px-4">
                                <div className="flex flex-col md:flex-row mb-8">
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
                                        className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full"
                                    >
                                        Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCallsheet
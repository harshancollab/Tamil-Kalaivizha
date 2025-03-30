import React from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const AddCallsheet = () => {
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
                                Stage Report - Call Sheet
                            </h2>
                        </div>

                        <div className="mt-32 ml-64">
                            <div className="flex flex-col md:flex-row  ">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Festival Type</label>
                                <div className="w-full md:w-80">
                                    <select
                                        name="stage"



                                        className="border border-blue-600  px-2 py-1 rounded-full w-full "
                                        required
                                    >
                                        <option value="">Select Festival</option>
                                        <option value="Stage 1">UP</option>
                                        <option value="Stage 2">LP</option>
                                        <option value="Stage 3">Hs</option>

                                    </select>

                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-10">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Item Name</label>
                                <div className="w-full md:w-80">
                                    <select
                                        name="stage"



                                        className="border border-blue-600  px-2 py-1 rounded-full w-full "
                                        required
                                    >
                                        <option value="">Select Item </option>
                                        <option value="Stage 1">Darma</option>
                                        <option value="Stage 2">Essay</option>
                                        <option value="Stage 3">Stroy</option>

                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className='text-center mt-24'>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-3 rounded-full"
                            >
                                Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default AddCallsheet
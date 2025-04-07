import React from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'

const ResultEntry = () => {
    return (
        <>

            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-2 md:p-2 w-full ">
                    <form
                        className="bg-white p-3 md:p-4 rounded-lg shadow-md w-full min-h-screen"

                    >
                        <div className="mb-4 mt-2 md:mb-5 md:mt-3">
                            <h2 className="text-xl md:text-2xl font-semibold">Result Entry</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6 text-[#003566] p-2 md:p-4">
                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Item Code</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="itemCode"
                                        className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required
                                    />

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Item Name</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="itemName"
                                        className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required
                                    />

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Participants</label>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="numberOfParticipants"
                                        className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required
                                    />

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">No of Judges</label>
                                <div className="w-full">
                                    <input
                                        type="text"

                                        className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required

                                    />

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Code</label>
                                <div className="w-full">
                                    <input
                                        type="text"

                                        className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required

                                    />

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Reg No</label>
                                <div className="w-full">
                                    <input
                                        type=""
                                        name="date"

                                        className="border border-blue-500 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required
                                    />

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Mark 1</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="time"
                                        className="border border-blue-500  px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required
                                    />

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Mark 2</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="time"
                                        className="border border-blue-500  px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required
                                    />

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Mark 3</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="time"
                                        className="border border-blue-500  px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
                                        required
                                    />


                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-10 lg:mt-32 text-right px-2 md:px-4 md:mr-8">
                            <button
                                type="button"

                                className="border mr-2 md:mr-20 border-blue-600 rounded-full px-4 md:px-6 lg:px-10 text-blue-700 py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-4 md:px-6 lg:px-10 text-white py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default ResultEntry

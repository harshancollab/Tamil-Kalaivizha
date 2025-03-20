import React, { useState } from "react"
import Header from "../components/Header"
import Dash from "../components/Dash"

const ItemWise = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash/>
                <div className="flex-1 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="font-bold text-lg mb-4">Item Wise Participants </h1>

                        <div className="overflow-x-auto p-4">

                            <table className="min-w-full bg-white  ">
                                <thead>
                                    <tr className="text-sm bg-gray-100">
                                        <th className="py-2 px-4 ">Sl.no</th>
                                        <th className="py-2 px-4 ">Item Code</th>
                                        <th className="py-2 px-4 ">Item Name</th>

                                        <th className="py-2 px-4 ">Number of Participants</th>
                                        <th className="py-2 px-4 ">No of Pinnany</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(10)].map((_, index) => (
                                        <tr key={index} className="text-gray-600 hover:bg-gray-100">
                                            <td className="p-3 text-center text-black">{index + 1}</td>
                                            <td className="p-3 text-center">200</td>
                                            <td className="p-3 text-center">Item Name</td>
                                            <td className="p-3 text-center">2</td>
                                            <td className="p-3 text-center">2</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemWise

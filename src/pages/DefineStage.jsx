import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllStageListAPI } from '../services/allAPI';




const DefineStage = () => {
    const [Allstages, setStages] = useState([]);
    console.log(Allstages);

    useEffect(() => {
        getAllstages
    }, [])
    const getAllstages = async () => {
        const token = sessionStorage.getItem
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllStageListAPI(reqHeader)
                if (result.status == 200) {
                    setStages(result.data)
                }
            } catch (err) {
                console.log(err);

            }
        }
    }


    return (
        <>

            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                            Stages
                        </h2>

                    </div>


                    <div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border-separate border-spacing-y-2 print-table">
                                <thead>
                                    <tr className="text-gray-700 ">
                                        <th className="p-2 md:p-3">Sl No</th>
                                        <th className="p-2 md:p-3">Stage Name</th>
                                        <th className="p-2 md:p-3">Stage description</th>
                                        <th className="p-2 md:p-3">Edit</th>
                                        <th className="p-2 md:p-3">Delete</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    <tr className="hover:bg-gray-200 ">
                                        <td className="p-2 mr-5 md:p-3">3</td>
                                        <td className="p-2 md:p-3">Name</td>
                                        <td className="p-2 md:p-3">description</td>
                                        <td className="p-2  md:p-3"><i class="fa-solid text-blue-500 fa-pen-to-square"></i></td>
                                        <td className="p-2 md:p-3"><i class="fa-solid text-red-600 fa-trash"></i></td>


                                    </tr>




                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DefineStage
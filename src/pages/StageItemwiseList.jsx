import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useNavigate } from 'react-router-dom';
import { getAllItemStageListAPI } from '../services/allAPI';

const StageItemwiseList = () => {
    const [Allitemise, setItemwise] = useState([]);
    console.log(Allitemise);

    useEffect(() => {
        getAllitemise();
    }, []);

    const getAllitemise = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await getAllItemStageListAPI(reqHeader);
                if (result?.status === 200) {
                    setItemwise(result.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/Stage-itemwise');
    };

    const stagesToRender = Allitemise.length > 0 ? Allitemise : [
        { id: 1, itemCode: '3001', itemName: 'Item1', noOfParticipants: 50, date: '2025-04-05', hours: 9, minutes: 0, stageName: 'Stage 1', noOfCluster: 5, noOfJudges: 3 },
        { id: 2, itemCode: '4004', itemName: 'Item 2', noOfParticipants: 25, date: '2025-04-06', hours: 14, minutes: 30, stageName: 'stage 3', noOfCluster: 2, noOfJudges: 5 },
        { id: 3, itemCode: '4003', itemName: 'item 3', noOfParticipants: 15, date: '2025-04-07', hours: 10, minutes: 15, stageName: 'Stage 4', noOfCluster: 1, noOfJudges: 7 },
        { id: 4, itemCode: '3454', itemName: 'Item 4', noOfParticipants: 60, date: '2025-04-05', hours: 11, minutes: 45, stageName: 'stage 4', noOfCluster: 6, noOfJudges: 2 },
        { id: 5, itemCode: '3405', itemName: 'item 5', noOfParticipants: 30, date: '2025-04-06', hours: 16, minutes: 0, stageName: 'Stage 5', noOfCluster: 3, noOfJudges: 4 },
    ];

    const handleEditClick = (itemId) => {
        navigate(`/Edit-itemwiseList/${itemId}`);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                            Stage Allotment Item Wise List
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-separate border-spacing-y-2 print-table">
                            <thead>
                                <tr className="text-gray-700">
                                    <th className="p-2 md:p-3">Sl No</th>
                                    <th className="p-2 md:p-3">Item code</th>
                                    <th className="p-2 md:p-3">Item name</th>
                                    <th className="p-2 md:p-3">No of participate</th>
                                    <th className="p-2 md:p-3">Date</th>
                                    <th className="p-2 md:p-3 hidden sm:table-cell md:table-cell">Hours</th> {/* Visible on small and medium screens */}
                                    <th className="p-2 md:p-3 hidden sm:table-cell md:table-cell">Min</th>   {/* Visible on small and medium screens */}
                                    <th className="p-2 md:p-3">StageName</th>
                                    <th className="p-2 md:p-3 hidden lg:table-cell">No of cluster</th> {/* Hidden on medium and smaller screens */}
                                    <th className="p-2 md:p-3 hidden lg:table-cell">No of judges</th> {/* Hidden on medium and smaller screens */}
                                    <th className="p-2 md:p-3">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stagesToRender.map((stage, index) => (
                                    <tr key={stage.id} className="hover:bg-gray-200">
                                        <td className="p-2 md:p-3">{index + 1}</td>
                                        <td className="p-2 md:p-3">{stage.itemCode}</td>
                                        <td className="p-2 md:p-3">{stage.itemName}</td>
                                        <td className="p-2 md:p-3">{stage.noOfParticipants}</td>
                                        <td className="p-2 md:p-3">{stage.date}</td>
                                        <td className="p-2 md:p-3 hidden sm:table-cell md:table-cell">{stage.hours}</td> {/* Visible on small and medium screens */}
                                        <td className="p-2 md:p-3 hidden sm:table-cell md:table-cell">{stage.minutes}</td> {/* Visible on small and medium screens */}
                                        <td className="p-2 md:p-3">{stage.stageName}</td>
                                        <td className="p-2 md:p-3 hidden lg:table-cell">{stage.noOfCluster}</td> {/* Hidden on medium and smaller screens */}
                                        <td className="p-2 md:p-3 hidden lg:table-cell">{stage.noOfJudges}</td> {/* Hidden on medium and smaller screens */}
                                        <td className="p-2 md:p-3">
                                            <i
                                                className="fa-solid text-blue-500 fa-pen-to-square cursor-pointer"
                                                onClick={() => handleEditClick(stage.id)}
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-right mt-8">
                        <button
                            onClick={handleAddClick}
                            type="button"
                            className="border border-blue-500 text-blue-600 px-6 md:px-10 lg:px-14 py-2 rounded-full mr-2 md:mr-3 lg:mr-5 text-sm md:text-base"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-6 md:px-10 lg:px-14 py-2 rounded-full text-sm md:text-base"
                        >
                            Allotement
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StageItemwiseList;
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AllStageFestivalwise } from '../services/allAPI'

const StageFestivalwise = () => {
    const [Allitemise, setItemwise] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get festival from URL query params, default to 'UP' if not present
    const selectedFestival = searchParams.get('festival') || 'UP';

    useEffect(() => {
        getAllitemise();
    }, []);

    const getAllitemise = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await AllStageFestivalwise(reqHeader);
                if (result.status === 200) {
                    setItemwise(result.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleAddClick = () => {
        navigate('/Addfestivalwise');
    };

    const handleFestivalChange = (e) => {
        // Update URL when festival changes
        setSearchParams({ festival: e.target.value });
    };

    const dummyStages = [
        {
            id: 1,
            itemCode: '3001',
            itemName: 'Item1',
            noOfParticipants: 50,
            date: '2025-04-05',
            hours: 9,
            minutes: 0,
            stageName: 'Stage 1',
            noOfCluster: 5,
            noOfJudges: 3,
        },
        {
            id: 2,
            itemCode: '4004',
            itemName: 'Item 2',
            noOfParticipants: 25,
            date: '2025-04-06',
            hours: 14,
            minutes: 30,
            stageName: 'stage 3',
            noOfCluster: 2,
            noOfJudges: 5,
        },
        {
            id: 3,
            itemCode: '4003',
            itemName: 'item 3',
            noOfParticipants: 15,
            date: '2025-04-07',
            hours: 10,
            minutes: 15,
            stageName: 'Stage 4',
            noOfCluster: 1,
            noOfJudges: 7,
        },
        {
            id: 4,
            itemCode: '3454',
            itemName: 'Item 4',
            noOfParticipants: 60,
            date: '2025-04-05',
            hours: 11,
            minutes: 45,
            stageName: 'stage 4',
            noOfCluster: 6,
            noOfJudges: 2,
        },
        {
            id: 5,
            itemCode: '3405',
            itemName: 'item 5',
            noOfParticipants: 30,
            date: '2025-04-06',
            hours: 16,
            minutes: 0,
            stageName: 'Stage 5',
            noOfCluster: 3,
            noOfJudges: 4,
        },
    ];

    const handleEditClick = (itemId) => {
        // Preserve the festival parameter when navigating
        navigate(`/Edit-festwiseList/${itemId}?festival=${selectedFestival}`);
    };

    // Format time to display hours and minutes properly
    const formatTime = (hours, minutes) => {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                        <h2 className="text-lg md:text-xl font-semibold leading-tight tracking-wide break-words">
                            {selectedFestival} - Stage Allotment Festival Wise List
                        </h2>
                        <div className="w-full sm:w-auto">
                            <div className="relative w-full sm:w-40 md:w-48">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                    aria-label="Select Festival"
                                >
                                    <option value="ALL Festival">ALL Festival</option>
                                    <option value="UP">UP</option>
                                    <option value="Lp">Lp</option>
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table container with horizontal scroll for mobile */}
                    <div className="overflow-x-auto rounded-lg w-full bg-white">
                        <table className="min-w-full text-center">
                            <thead>
                                <tr className="bg-gray-50 ">
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700  bg-gray-50 z-10">Sl No</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item code</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item name</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Participants</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Date</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Hours</th>

                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Min</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Stage</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Clusters</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Judges</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyStages.map((stage, index) => (
                                    <tr key={stage.id} className="hover:bg-gray-50  text-gray-700">
                                        <td className="p-2 md:p-3 text-xs md:text-sm  bg-white z-10">{index + 1}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{stage.itemCode}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{stage.itemName}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">{stage.noOfParticipants}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{stage.date}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{stage.hours}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{stage.minutes}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{stage.stageName}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">{stage.noOfCluster}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">{stage.noOfJudges}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">
                                            <button
                                                className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
                                                onClick={() => handleEditClick(stage.id)}
                                                aria-label={`Edit ${stage.itemName}`}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden text-xs text-gray-500 italic mt-2 text-center">
                        Swipe left/right to view all columns
                    </div>

                    <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-3 mt-6">
                        <button
                            onClick={handleAddClick}
                            type="button"
                            className="border border-blue-500 text-blue-600 px-4 sm:px-6 md:px-10 py-2 rounded-full whitespace-nowrap text-sm md:text-base transition duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-6 md:px-10 py-2 rounded-full whitespace-nowrap text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Allotement
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StageFestivalwise;
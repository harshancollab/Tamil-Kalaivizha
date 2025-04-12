import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AllStageFestivalwise } from '../services/allAPI'

const StageFestivalwise = () => {
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get festival from URL query params, default to 'ALL Festival' if not present
    const selectedFestival = searchParams.get('festival') || 'ALL Festival';

    // Dummy data for testing
    const dummyStages = [
        {
            id: 1,
            itemCode: '301',
            itemName: 'Story Writing',
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
            itemCode: '401',
            itemName: 'Group Song',
            noOfParticipants: 25,
            date: '2025-04-06',
            hours: 14,
            minutes: 30,
            stageName: 'Stage 3',
            noOfCluster: 2,
            noOfJudges: 5,
        },
        {
            id: 3,
            itemCode: '501',
            itemName: 'Recitation',
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
            itemCode: '345',
            itemName: 'Painting',
            noOfParticipants: 60,
            date: '2025-04-05',
            hours: 11,
            minutes: 45,
            stageName: 'Stage 4',
            noOfCluster: 6,
            noOfJudges: 2,
        },
        {
            id: 5,
            itemCode: '405',
            itemName: 'Dance',
            noOfParticipants: 30,
            date: '2025-04-06',
            hours: 16,
            minutes: 0,
            stageName: 'Stage 5',
            noOfCluster: 3,
            noOfJudges: 4,
        },
    ];

    useEffect(() => {
        getAllItems();
    }, []);

    useEffect(() => {
        // Apply filters whenever selected festival changes or data is loaded
        applyFestivalFilter(selectedFestival);
    }, [selectedFestival, allItems]);

    const getAllItems = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await AllStageFestivalwise(reqHeader);
                if (result.status === 200) {
                    setAllItems(result.data);
                } else {
                    setAllItems(dummyStages);
                }
            } catch (err) {
                console.log(err);
                setAllItems(dummyStages);
            }
        } else {
            setAllItems(dummyStages);
        }
    };

    // Filter items based on festival selection
    const applyFestivalFilter = (festival) => {
        if (!allItems.length) return;
        
        let filteredResult = [];
        
        if (festival !== "ALL Festival") {
            switch (festival) {
                case "UP":
                    filteredResult = allItems.filter(item => {
                        const itemCode = parseInt(item.itemCode);
                        return itemCode >= 300 && itemCode < 400;
                    });
                    break;
                case "Lp":
                    filteredResult = allItems.filter(item => {
                        const itemCode = parseInt(item.itemCode);
                        return itemCode >= 400 && itemCode < 500;
                    });
                    break;
                default:
                    filteredResult = [...allItems];
            }
        } else {
            filteredResult = [...allItems];
        }
        
        // Update indices for the filtered items
        filteredResult = filteredResult.map((item, index) => ({
            ...item,
            slNo: index + 1
        }));
        
        setFilteredItems(filteredResult);
    };

    const handleAddClick = () => {
        navigate('/Addfestivalwise');
    };

    const handleFestivalChange = (e) => {
        // Update URL when festival changes
        setSearchParams({ festival: e.target.value });
    };

    const handleEditClick = (itemId) => {
        // Preserve the festival parameter when navigating
        navigate(`/Edit-festwiseList/${itemId}?festival=${selectedFestival}`);
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
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 z-10">Sl No</th>
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
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((stage, index) => (
                                        <tr key={stage.id} className="hover:bg-gray-50 text-gray-700">
                                            <td className="p-2 md:p-3 text-xs md:text-sm bg-white z-10">{index + 1}</td>
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="p-6 text-center text-gray-600">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <i className="fa-solid fa-search text-2xl text-gray-400"></i>
                                                <p>No items found for {selectedFestival === "ALL Festival" ? "any festival" : selectedFestival}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
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

export default StageFestivalwise
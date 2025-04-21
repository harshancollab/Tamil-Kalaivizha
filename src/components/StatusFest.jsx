import React, { useState, useEffect, useRef } from 'react';

const StatusFest = ({ festival }) => {
    // Sample festival status data
    const [festivalStatusData, setFestivalStatusData] = useState([
        {
            FestivalItemTotal: "UP TAMILKALAIVIZHA (11)",
            ItemsCompleted: 12,
            ItemsnotCompleted: 8,
            detailedItems: [
                { Item: "Folk Dance", StageNo: 1, Cluster: "A", Participants: 8, ItemType: "Group", MaximumTime: "10 min", DateOfItem: "2025-04-15" },
                { Item: "Classical Music", StageNo: 2, Cluster: "B", Participants: 1, ItemType: "Solo", MaximumTime: "5 min", DateOfItem: "2025-04-15" },
                { Item: "Speech", StageNo: 1, Cluster: "A", Participants: 1, ItemType: "Solo", MaximumTime: "7 min", DateOfItem: "2025-04-16" }
            ],
            completedItems: [
                { ItemCode: "301", ItemName: "Story Writing" },
                { ItemCode: "302", ItemName: "Essay Writing"},
                { ItemCode: "305", ItemName: "Poetry Writing"},
                { ItemCode: "307", ItemName: "Painting"}
            ],
            notCompletedItems: [
                { Item: "Debate", StageNo: 3, Cluster: "B", Participants: 6, ItemType: "Group", MaximumTime: "15 min", DateOfItem: "2025-04-22" },
                { Item: "Quiz", StageNo: 2, Cluster: "A", Participants: 3, ItemType: "Group", MaximumTime: "30 min", DateOfItem: "2025-04-25" },
                { Item: "Solo Song", StageNo: 1, Cluster: "C", Participants: 1, ItemType: "Solo", MaximumTime: "5 min", DateOfItem: "2025-04-26" }
            ]
        },
        {
            FestivalItemTotal: "HS TAMILKALAIVIZHA (12)",
            ItemsCompleted: 10,
            ItemsnotCompleted: 6,
            detailedItems: [
                { Item: "Drama", StageNo: 3, Cluster: "C", Participants: 12, ItemType: "Group", MaximumTime: "15 min", DateOfItem: "2025-04-17" },
                { Item: "Poetry", StageNo: 1, Cluster: "A", Participants: 1, ItemType: "Solo", MaximumTime: "5 min", DateOfItem: "2025-04-17" },
                { Item: "Debate", StageNo: 2, Cluster: "B", Participants: 2, ItemType: "Duo", MaximumTime: "10 min", DateOfItem: "2025-04-18" }
            ],
            completedItems: [
                { ItemCode: "401", ItemName: "Bharatanatyam", Participants: 1, Winner: "Team F", Score: 97 },
                { ItemCode: "403", ItemName: "Group Song", Participants: 8, Winner: "Team G", Score: 94 },
                { ItemCode: "405", ItemName: "Mono Act", Participants: 1, Winner: "Team H", Score: 89 }
            ],
            notCompletedItems: [
                { Item: "Folk Dance", StageNo: 2, Cluster: "B", Participants: 8, ItemType: "Group", MaximumTime: "12 min", DateOfItem: "2025-04-23" },
                { Item: "Solo Song", StageNo: 1, Cluster: "A", Participants: 1, ItemType: "Solo", MaximumTime: "5 min", DateOfItem: "2025-04-26" },
                { Item: "Drawing", StageNo: 3, Cluster: "C", Participants: 1, ItemType: "Solo", MaximumTime: "45 min", DateOfItem: "2025-04-28" }
            ]
        },
        {
            FestivalItemTotal: "HSS TAMILKALAIVIZHA (14)",
            ItemsCompleted: 15,
            ItemsnotCompleted: 9,
            detailedItems: [
                { Item: "Classical Dance", StageNo: 1, Cluster: "A", Participants: 1, ItemType: "Solo", MaximumTime: "7 min", DateOfItem: "2025-04-19" },
                { Item: "Group Song", StageNo: 3, Cluster: "C", Participants: 10, ItemType: "Group", MaximumTime: "8 min", DateOfItem: "2025-04-19" },
                { Item: "Quiz", StageNo: 2, Cluster: "B", Participants: 3, ItemType: "Group", MaximumTime: "30 min", DateOfItem: "2025-04-20" }
            ],
            completedItems: [
                { ItemCode: "501", ItemName: "Elocution", Participants: 2, Winner: "Team J", Score: 91 },
                { ItemCode: "502", ItemName: "Drama", Participants: 10, Winner: "Team K", Score: 96 },
                { ItemCode: "504", ItemName: "Story Writing", Participants: 3, Winner: "Team L", Score: 93 }
            ],
            notCompletedItems: [
                { Item: "Debate", StageNo: 2, Cluster: "A", Participants: 4, ItemType: "Group", MaximumTime: "20 min", DateOfItem: "2025-04-24" },
                { Item: "Essay Writing", StageNo: 1, Cluster: "B", Participants: 2, ItemType: "Solo", MaximumTime: "45 min", DateOfItem: "2025-04-27" },
                { Item: "Mimicry", StageNo: 3, Cluster: "C", Participants: 1, ItemType: "Solo", MaximumTime: "5 min", DateOfItem: "2025-04-29" }
            ]
        },
    ]);

    const [currentFestivalData, setCurrentFestivalData] = useState(null);
    const [viewMode, setViewMode] = useState('summary');  // 'summary', 'detailed', 'completed', 'notCompleted'
    const [detailedItems, setDetailedItems] = useState([]);
    const printRef = useRef(null);

    useEffect(() => {
        // Set current festival data based on selected festival
        if (festival === "UP Kalaivizha") {
            setCurrentFestivalData(festivalStatusData[0]);
        } else if (festival === "Hs Kalaivizha") {
            setCurrentFestivalData(festivalStatusData[1]);
        } else if (festival === "Hss Kalaivizha") {
            setCurrentFestivalData(festivalStatusData[2]);
        } else {
            // Default to showing all data
            setCurrentFestivalData({ allData: festivalStatusData });
        }
    }, [festival, festivalStatusData]);

    const handleFestivalItemClick = (festivalData) => {
        if (festivalData.detailedItems) {
            setDetailedItems(festivalData.detailedItems);
            setViewMode('detailed');
        } else if (festivalData.allData) {
            // Combine all detailed items from all festivals
            const allItems = festivalData.allData.flatMap(data => data.detailedItems || []);
            setDetailedItems(allItems);
            setViewMode('detailed');
        }
    };

    const handleCompletedItemsClick = (festivalData) => {
        if (festivalData.completedItems) {
            setDetailedItems(festivalData.completedItems);
            setViewMode('completed');
        } else if (festivalData.allData) {
            // Combine all completed items from all festivals
            const allCompletedItems = festivalData.allData.flatMap(data => data.completedItems || []);
            setDetailedItems(allCompletedItems);
            setViewMode('completed');
        }
    };
    
    const handleNotCompletedItemsClick = (festivalData) => {
        if (festivalData.notCompletedItems) {
            setDetailedItems(festivalData.notCompletedItems);
            setViewMode('notCompleted');
        } else if (festivalData.allData) {
            // Combine all not completed items from all festivals
            const allNotCompletedItems = festivalData.allData.flatMap(data => data.notCompletedItems || []);
            setDetailedItems(allNotCompletedItems);
            setViewMode('notCompleted');
        }
    };

    const handleBackToSummary = () => {
        setViewMode('summary');
    };

    if (!currentFestivalData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl text-gray-500">Loading festival status...</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            {viewMode === 'summary' ? (
                <div className="w-full p-4">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full text-center print-table">
                                <thead className="text-xs sm:text-sm">
                                    <tr className="text-gray-700">
                                        <th className="p-2 md:p-3">Festival Item Total</th>
                                        <th className="p-2 md:p-3">Items Completed</th>
                                        <th className="p-2 md:p-3">Items Not Completed</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs sm:text-sm">
                                    {currentFestivalData.allData ? (
                                        // Show all festivals
                                        currentFestivalData.allData.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td 
                                                    className="p-2 md:p-3 text-blue-700 cursor-pointer "
                                                    onClick={() => handleFestivalItemClick(item)}
                                                >
                                                    {item.FestivalItemTotal}
                                                </td>
                                                <td 
                                                    className="p-2 md:p-3 text-blue-700 cursor-pointer "
                                                    onClick={() => handleCompletedItemsClick(item)}
                                                >
                                                    {item.ItemsCompleted}
                                                </td>
                                                <td 
                                                    className="p-2 md:p-3 text-blue-700 cursor-pointer "
                                                    onClick={() => handleNotCompletedItemsClick(item)}
                                                >
                                                    {item.ItemsnotCompleted}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        // Show single selected festival
                                        <tr className="hover:bg-gray-100">
                                            <td 
                                                className="p-2 md:p-3 text-blue-700 cursor-pointer underline"
                                                onClick={() => handleFestivalItemClick(currentFestivalData)}
                                            >
                                                {currentFestivalData.FestivalItemTotal}
                                            </td>
                                            <td 
                                                className="p-2 md:p-3 text-blue-700 cursor-pointer underline"
                                                onClick={() => handleCompletedItemsClick(currentFestivalData)}
                                            >
                                                {currentFestivalData.ItemsCompleted}
                                            </td>
                                            <td 
                                                className="p-2 md:p-3 text-blue-700 cursor-pointer underline"
                                                onClick={() => handleNotCompletedItemsClick(currentFestivalData)}
                                            >
                                                {currentFestivalData.ItemsnotCompleted}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center p-4 ">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {viewMode === 'detailed' ? 'All Festival List' : 
                             viewMode === 'completed' ? 'Finished Festival Item List' : 
                             'Unfinished Festival Item List'}
                        </h3>
                      
                    </div>
                    <div ref={printRef} className="w-full p-4">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                {viewMode === 'completed' ? (
                                    // Completed Items View
                                    <table className="min-w-full print-table">
                                        <thead className="text-xs sm:text-sm">
                                            <tr className="text-gray-700 text-left">
                                                <th className="p-2 md:p-3">Item Code</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs sm:text-sm">
                                            {detailedItems.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-100">
                                                    <td className="p-2 md:p-3 ">{item.ItemCode}-{item.ItemName}</td>
                                                   
                                                   
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    // Detailed Items View and Not Completed Items View (same format)
                                    <table className="min-w-full text-center print-table">
                                        <thead className="text-xs sm:text-sm">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3">Item</th>
                                                <th className="p-2 md:p-3">Stage No</th>
                                                <th className="p-2 md:p-3">Cluster</th>
                                                <th className="p-2 md:p-3">Participants</th>
                                                <th className="p-2 md:p-3">Item Type</th>
                                                <th className="p-2 md:p-3">Maximum Time</th>
                                                <th className="p-2 md:p-3">Date of Item</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs sm:text-sm">
                                            {detailedItems.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-100">
                                                    <td className="p-2 md:p-3 ">{item.Item}</td>
                                                    <td className="p-2 md:p-3 ">{item.StageNo}</td>
                                                    <td className="p-2 md:p-3 ">{item.Cluster}</td>
                                                    <td className="p-2 md:p-3 ">{item.Participants}</td>
                                                    <td className="p-2 md:p-3 ">{item.ItemType}</td>
                                                    <td className="p-2 md:p-3 ">{item.MaximumTime}</td>
                                                    <td className="p-2 md:p-3 ">{item.DateOfItem}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 mb-2">
                        <button 
                            onClick={handleBackToSummary}
                            className="text-xs text-gray-500 hover:text-blue-600"
                        >
                            Back to summary
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusFest;

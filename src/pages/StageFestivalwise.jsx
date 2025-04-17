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

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);

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
        {
            id: 6,
            itemCode: '602',
            itemName: 'Poetry',
            noOfParticipants: 20,
            date: '2025-04-08',
            hours: 13,
            minutes: 30,
            stageName: 'Stage 2',
            noOfCluster: 2,
            noOfJudges: 3,
        },
        {
            id: 7,
            itemCode: '707',
            itemName: 'Debate',
            noOfParticipants: 12,
            date: '2025-04-09',
            hours: 10,
            minutes: 0,
            stageName: 'Stage 1',
            noOfCluster: 3,
            noOfJudges: 5,
        },
        {
            id: 8,
            itemCode: '503',
            itemName: 'Solo Dance',
            noOfParticipants: 25,
            date: '2025-04-10',
            hours: 15,
            minutes: 0,
            stageName: 'Stage 3',
            noOfCluster: 4,
            noOfJudges: 6,
        },
        {
            id: 9,
            itemCode: '306',
            itemName: 'Essay Writing',
            noOfParticipants: 40,
            date: '2025-04-11',
            hours: 9,
            minutes: 30,
            stageName: 'Stage 2',
            noOfCluster: 4,
            noOfJudges: 2,
        },
        {
            id: 10,
            itemCode: '410',
            itemName: 'Quiz',
            noOfParticipants: 30,
            date: '2025-04-12',
            hours: 11,
            minutes: 0,
            stageName: 'Stage 4',
            noOfCluster: 5,
            noOfJudges: 3,
        },
        {
            id: 11,
            itemCode: '511',
            itemName: 'Speech',
            noOfParticipants: 18,
            date: '2025-04-13',
            hours: 13,
            minutes: 15,
            stageName: 'Stage 1',
            noOfCluster: 3,
            noOfJudges: 4,
        },
        {
            id: 12,
            itemCode: '615',
            itemName: 'Collage Making',
            noOfParticipants: 22,
            date: '2025-04-14',
            hours: 14,
            minutes: 45,
            stageName: 'Stage 5',
            noOfCluster: 2,
            noOfJudges: 3,
        },
    ];

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        // Dynamically adjust number of page buttons based on screen size
        const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;
        
        if (totalPages <= maxPageNumbersToShow) {
            // Show all page numbers
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show limited page numbers with dots
            if (currentPage <= 2) {
                // Near the start
                for (let i = 1; i <= 3; i++) {
                    if (i <= totalPages) pageNumbers.push(i);
                }
                if (totalPages > 3) {
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
                }
            } else if (currentPage >= totalPages - 1) {
                // Near the end
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    if (i > 0) pageNumbers.push(i);
                }
            } else {
                // Middle
                pageNumbers.push(1);
                if (currentPage > 3) pageNumbers.push('...');
                pageNumbers.push(currentPage - 1);
                pageNumbers.push(currentPage);
                pageNumbers.push(currentPage + 1);
                if (currentPage < totalPages - 2) pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        
        return pageNumbers;
    };

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
                    case "Hs":
                        filteredResult = allItems.filter(item => {
                            const itemCode = parseInt(item.itemCode);
                            return itemCode >= 500 && itemCode < 600;
                        });
                        break;
                        case "Hss":
                            filteredResult = allItems.filter(item => {
                                const itemCode = parseInt(item.itemCode);
                                return itemCode >= 600 && itemCode < 700;
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
        // Reset to first page when filters change
        setCurrentPage(1);
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
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
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
                                    <option value="Hs">Hs</option>
                                    <option value="Hss">Hss</option>
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleAddClick}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-8 py-2 rounded-full text-sm whitespace-nowrap w-full sm:w-auto transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Add
                            </button>
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
                                {currentItems.length > 0 ? (
                                    currentItems.map((stage, index) => (
                                        <tr key={stage.id} className="hover:bg-gray-50 text-gray-700">
                                            <td className="p-2 md:p-3 text-xs md:text-sm bg-white z-10">{indexOfFirstItem + index + 1}</td>
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

                    <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-3 mt-6">
                        <button
                            type="button"
                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-6 md:px-10 py-2 rounded-full whitespace-nowrap text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Allotement
                        </button>
                    </div>
                    {/* Pagination */}
                    {filteredItems.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                            {/* Showing X of Y rows */}
                            <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                                {`${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredItems.length)} of ${filteredItems.length} rows`}
                            </div>
                            
                            {/* Pagination Controls */}
                            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                                {/* Previous Button with icon */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                                >
                                    <i className="fa-solid fa-angle-right transform rotate-180"></i>
                                    <span className="hidden sm:inline p-1">Previous</span>
                                </button>
                                
                                {/* Page Numbers */}
                                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                                    {renderPageNumbers().map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => page !== '...' && handlePageChange(page)}
                                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${
                                                currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
                                            } ${page === '...' ? 'pointer-events-none' : ''}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Next Button with icon */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
                                >
                                    <span className="hidden sm:inline p-1">Next</span>
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default StageFestivalwise
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllItemStageListAPI } from '../services/allAPI';

const StageItemwiseList = () => {
    const [Allitemise, setItemwise] = useState([]);
    // Track edited fields for each item
    const [editedFields, setEditedFields] = useState({});
    // Add a state to track which item has the "New" stage selected
    const [newStageItemId, setNewStageItemId] = useState(null);
    const [newStageDetails, setNewStageDetails] = useState({
        stageName: '',
        location: '',
        capacity: '',
    });
    // Selected festival/category state
    const [selectedFestival, setSelectedFestival] = useState('ALL Festival');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    // For URL query params
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getAllitemise();
    }, []);

    useEffect(() => {
        // Parse query parameters when component mounts or URL changes
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get('category');
        
        if (category) {
            setSelectedFestival(category.toUpperCase());
        }
    }, [location.search]);

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

    const handleAddClick = () => {
        navigate('/Stage-itemwise');
    };

    // Sample data for dropdown options
    const dateOptions = ['2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09'];
    const hoursOptions = Array.from({ length: 24 }, (_, i) => i);
    const minutesOptions = [0, 15, 30, 45];
    const stageOptions = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5', 'New'];
    const clusterOptions = [1, 2, 3, 4, 5, 6];
    const judgesOptions = [1, 2, 3, 4, 5, 6, 7];

    // Festival/category options with their item code ranges
    const festivalOptions = [
        { value: 'ALL Festival', label: 'ALL Festival', minCode: 0, maxCode: 9999 },
        { value: 'UP', label: 'UP', minCode: 300, maxCode: 399 },
        { value: 'LP', label: 'LP', minCode: 400, maxCode: 499 },
        { value: 'HS', label: 'HS', minCode: 500, maxCode: 599 },
        { value: 'HSS', label: 'HSS', minCode: 600, maxCode: 699 }
    ];

    // Handle field change
    const handleFieldChange = (itemId, field, value) => {
        console.log(`Changing ${field} for item ${itemId} to ${value}`);

        // Special handling for stage selection
        if (field === 'stageName' && value === 'New') {
            // When "New" is selected, set the newStageItemId
            setNewStageItemId(itemId);
            // Don't update the actual stageName in the data yet
            return;
        } else if (field === 'stageName' && newStageItemId === itemId) {
            // If changing away from "New", reset newStageItemId
            setNewStageItemId(null);
            setNewStageDetails({ stageName: '', location: '', capacity: '' });
        }

        // Update the editedFields state
        setEditedFields(prev => ({
            ...prev,
            [itemId]: {
                ...(prev[itemId] || {}),
                [field]: value
            }
        }));

        // Update the item in the main state immediately for UI feedback
        setItemwise(prev =>
            prev.map(item =>
                item.id === itemId ? { ...item, [field]: value } : item
            )
        );
    };

    // Default data to use if API doesn't return anything
    const defaultStages = [
        { id: 1, itemCode: '301', itemName: 'Item1', noOfParticipants: 50, date: '2025-04-05', hours: 9, minutes: 0, stageName: 'Stage 1', noOfCluster: 5, noOfJudges: 3 },
        { id: 2, itemCode: '300', itemName: 'Item 2', noOfParticipants: 25, date: '2025-04-06', hours: 14, minutes: 30, stageName: 'stage 3', noOfCluster: 2, noOfJudges: 5 },
        { id: 3, itemCode: '403', itemName: 'item 3', noOfParticipants: 15, date: '2025-04-07', hours: 10, minutes: 15, stageName: 'Stage 4', noOfCluster: 1, noOfJudges: 7 },
        { id: 4, itemCode: '454', itemName: 'Item 4', noOfParticipants: 60, date: '2025-04-05', hours: 11, minutes: 45, stageName: 'stage 4', noOfCluster: 6, noOfJudges: 2 },
        { id: 5, itemCode: '505', itemName: 'item 5', noOfParticipants: 30, date: '2025-04-06', hours: 16, minutes: 0, stageName: 'Stage 5', noOfCluster: 3, noOfJudges: 4 },
        { id: 6, itemCode: '705', itemName: 'item 5', noOfParticipants: 30, date: '2025-04-06', hours: 16, minutes: 0, stageName: 'Stage 5', noOfCluster: 3, noOfJudges: 4 },
        { id: 7, itemCode: '509', itemName: 'item 5', noOfParticipants: 30, date: '2025-04-06', hours: 16, minutes: 0, stageName: 'Stage 5', noOfCluster: 3, noOfJudges: 4 },
        { id: 8, itemCode: '605', itemName: 'item 5', noOfParticipants: 30, date: '2025-04-06', hours: 16, minutes: 0, stageName: 'Stage 5', noOfCluster: 3, noOfJudges: 4 },
        { id: 9, itemCode: '678', itemName: 'item 5', noOfParticipants: 30, date: '2025-04-06', hours: 16, minutes: 0, stageName: 'Stage 5', noOfCluster: 3, noOfJudges: 4 },
        { id: 10, itemCode: '705', itemName: 'item 5', noOfParticipants: 30, date: '2025-04-06', hours: 16, minutes: 0, stageName: 'Stage 5', noOfCluster: 3, noOfJudges: 4 },
        { id: 11, itemCode: '739', itemName: 'item 5', noOfParticipants: 30, date: '2025-04-06', hours: 16, minutes: 0, stageName: 'Stage 5', noOfCluster: 3, noOfJudges: 4 },
    ];

    // Filter items based on selected festival/category
    const filterItemsByFestival = (items, festival) => {
        const selectedOption = festivalOptions.find(opt => opt.value === festival);
        
        if (!selectedOption || festival === 'ALL Festival') {
            return items; // Return all items if "ALL Festival" is selected or if option not found
        }
        
        return items.filter(item => {
            const itemCode = parseInt(item.itemCode, 10);
            return itemCode >= selectedOption.minCode && itemCode <= selectedOption.maxCode;
        });
    };

    // Apply filtering before pagination
    const stagesToRender = filterItemsByFestival(
        Allitemise.length > 0 ? Allitemise : defaultStages,
        selectedFestival
    );

    // Handle festival selection change
    const handleFestivalChange = (e) => {
        const selected = e.target.value;
        setSelectedFestival(selected);
        setCurrentPage(1); // Reset to first page when changing filters
        
        // Update URL with the selected category
        if (selected === 'ALL Festival') {
            // Remove query parameter if "ALL Festival" is selected
            navigate(location.pathname);
        } else {
            navigate(`${location.pathname}?category=${selected.toLowerCase()}`);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = stagesToRender.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(stagesToRender.length / rowsPerPage);

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

    const handleEditClick = (itemId) => {
        navigate(`/Edit-itemwiseList/${itemId}`);
    };
    
    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
                            Stage Allotment Item Wise List
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                            <div className="relative w-full sm:w-40 md:w-48">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    value={selectedFestival}
                                    onChange={handleFestivalChange}
                                    aria-label="Select Festival"
                                >
                                    {festivalOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
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
                        <table className="min-w-full text-center border-separate border-spacing-y-4 border-spacing-x-4">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 bg-gray-50 z-10">Sl No</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item code</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">Item name</th>
                                    <th className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700">No of Participants</th>
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
                                {currentItems.map((stage, index) => (
                                    <tr key={stage.id} className="hover:bg-gray-50 text-gray-700 border-separate border-spacing-y-4">
                                        <td className="p-2 md:p-3 text-xs md:text-sm bg-white z-10">{indexOfFirstItem + index + 1}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{stage.itemCode}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap">{stage.itemName}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm">{stage.noOfParticipants}</td>

                                        {/* Date - Selectable */}
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap border border-gray-500 rounded">
                                            <select
                                                value={editedFields[stage.id]?.date || stage.date}
                                                onChange={(e) => handleFieldChange(stage.id, 'date', e.target.value)}
                                                className="bg-transparent text-center w-full focus:outline-none appearance-none"
                                            >
                                                {dateOptions.map(date => (
                                                    <option key={date} value={date}>{date}</option>
                                                ))}
                                            </select>
                                        </td>

                                        {/* Hours - Now active and functional */}
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap border border-gray-500 rounded">
                                            6
                                        </td>

                                        {/* Minutes - Now active and functional */}
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap border border-gray-500 rounded">
                                            30
                                        </td>

                                        {/* Stage - Selectable with New option */}
                                        <td className="p-2 md:p-3 text-xs md:text-sm whitespace-nowrap border border-gray-500 rounded">
                                            <select
                                                value={editedFields[stage.id]?.stageName || stage.stageName}
                                                onChange={(e) => handleFieldChange(stage.id, 'stageName', e.target.value)}
                                                className="bg-transparent text-center w-full focus:outline-none appearance-none"
                                            >
                                                {stageOptions.map(stageOpt => (
                                                    <option key={stageOpt} value={stageOpt}>{stageOpt}</option>
                                                ))}
                                            </select>
                                        </td>

                                        {/* Clusters - Selectable */}
                                        <td className="p-2 md:p-3 text-xs md:text-sm border border-gray-500 rounded">
                                            <select
                                                value={editedFields[stage.id]?.noOfCluster || stage.noOfCluster}
                                                onChange={(e) => handleFieldChange(stage.id, 'noOfCluster', parseInt(e.target.value))}
                                                className="bg-transparent text-center w-full focus:outline-none appearance-none"
                                            >
                                                {clusterOptions.map(cluster => (
                                                    <option key={cluster} value={cluster}>{cluster}</option>
                                                ))}
                                            </select>
                                        </td>

                                        {/* Judges - Selectable */}
                                        <td className="p-2 md:p-3 text-xs md:text-sm border border-gray-500 rounded">
                                            <select
                                                value={editedFields[stage.id]?.noOfJudges || stage.noOfJudges}
                                                onChange={(e) => handleFieldChange(stage.id, 'noOfJudges', parseInt(e.target.value))}
                                                className="bg-transparent text-center w-full focus:outline-none appearance-none"
                                            >
                                                {judgesOptions.map(judge => (
                                                    <option key={judge} value={judge}>{judge}</option>
                                                ))}
                                            </select>
                                        </td>

                                        <td className="p-2 md:p-3 text-xs md:text-sm">
                                            <button
                                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
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
                    <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-3 mt-6">
                       
                        <button
                            type="button"
                            className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-4 sm:px-6 md:px-10 py-2 rounded-full whitespace-nowrap text-sm md:text-base transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Allotment
                        </button>
                    </div>

                    {/* Pagination Section */}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                        {/* Showing X of Y rows */}
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {stagesToRender.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, stagesToRender.length)} of ${stagesToRender.length} rows` : '0 rows'}
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
                </div>
            </div>
        </>
    );
};

export default StageItemwiseList;
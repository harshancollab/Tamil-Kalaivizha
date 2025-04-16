import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllKalolsavamAPI } from '../services/allAPI'

const AllKalolsavam = () => {
    const navigate = useNavigate();
    const [kalolsavams, setKalolsavams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dummyKalolsavams = [
        {
            id: 1,
            kalolsavamName: "Kerala School Kalolsavam",
            year: 2024,
            venue: "Kochi",
            startDate: "2024-12-01",
            endDate: "2024-12-05",
        },
        {
            id: 2,
            kalolsavamName: "District Arts Fest",
            year: 2023,
            venue: "Trivandrum",
            startDate: "2023-11-15",
            endDate: "2023-11-18",
        },
        {
            id: 3,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
        {
            id: 4,
            kalolsavamName: "State Level Arts Festival",
            year: 2024,
            venue: "Malappuram",
            startDate: "2024-03-10",
            endDate: "2024-03-14",
        },
        {
            id: 5,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
        {
            id: 6,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
        {
            id: 7,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
        {
            id: 8,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
        {
            id: 9,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
        {
            id: 10,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
        {
            id: 11,
            kalolsavamName: "Sub-District Kalotsavam",
            year: 2025,
            venue: "Calicut",
            startDate: "2025-01-20",
            endDate: "2025-01-22",
        },
    ];

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = kalolsavams.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(kalolsavams.length / rowsPerPage);

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
        setLoading(true);
        setTimeout(() => {
            setKalolsavams(dummyKalolsavams);
            setLoading(false);
        }, 500); 
        
        // getAllKalolsavams();
    }, []);

    const getAllKalolsavams = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };

                const result = await getAllKalolsavamAPI(reqHeader);

                if (result.status === 200) {
                    setKalolsavams(result.data);
                    setLoading(false);
                } else {
                    setError("Failed to fetch Kalolsavam events");
                    setLoading(false);
                }
            } else {
                setError("No authentication token found");
                setLoading(false);
            }
        } catch (err) {
            console.error("Error fetching Kalolsavam events:", err);
            setError("An error occurred while fetching Kalolsavam events");
            setLoading(false);
        }
    };

    const handleEditClick = (kalolsavam) => {
        navigate(`/edit-kalolsavam/${kalolsavam.id}`, {
            state: { kalolsavam }
        });
    };

    if (loading) {
        return (
            <div>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 mt-4 w-full">
                        <div className="text-center">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 mt-4 w-full">
                        <div className="text-center text-red-500">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-4 md:p-6 mt-4 w-full overflow-x-auto">
                    <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%] mb-4">
                        Define Kalolsavam
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="text-left text-sm text-gray-800">
                                    <th className="p-2 md:p-3 whitespace-nowrap">Sl.no</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Kalolsavam Name</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Year</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Venue</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Start Date</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">End Date</th>
                                    <th className="p-2 md:p-3 whitespace-nowrap">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((kalolsavam, index) => (
                                    <tr
                                        key={kalolsavam.id}
                                        className="text-[#616262] hover:bg-gray-200"
                                    >
                                        <td className="text-black p-2 md:p-3">{indexOfFirstItem + index + 1}</td>
                                        <td className="p-2 md:p-3 font-semibold whitespace-nowrap">{kalolsavam.kalolsavamName}</td>
                                        <td className="p-2 md:p-3">{kalolsavam.year}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{kalolsavam.venue}</td>
                                        <td className="p-2 md:p-3">{kalolsavam.startDate}</td>
                                        <td className="p-2 md:p-3">{kalolsavam.endDate}</td>
                                        <td className="p-2 md:p-3">
                                            <button
                                                onClick={() => handleEditClick(kalolsavam)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Enhanced Responsive Pagination with icons */}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                        {/* Showing X of Y rows */}
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {kalolsavams.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, kalolsavams.length)} of ${kalolsavams.length} rows` : '0 rows'}
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
        </div>
    );
};

export default AllKalolsavam
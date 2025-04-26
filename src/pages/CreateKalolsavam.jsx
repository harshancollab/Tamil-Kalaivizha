import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { getAllKalolsavamAPI } from '../services/allAPI'

const CreateKalolsavam = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [kalolsavams, setKalolsavams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Get initial filter values from URL or default to 'Select'
    const initialDistrict = searchParams.get('district') || 'Select';
    const initialSubDistrict = searchParams.get('subDistrict') || 'Select';
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    // Filter states
    const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState(initialSubDistrict);
    const [filteredKalolsavams, setFilteredKalolsavams] = useState([]);

    const allSubDistricts = [
        'Select',
        'Munnar',
        'Adimali',
        'Kattappana',
        'Nedumkandam',
        'Devikulam',
        'Chittur',
        'Pattambi',
        'Kuzhalmannam',
        'Nemmara',
        'Mannarkkad',
        'vatakara',
        'Ottapalam'
    ];

    const allDistricts = [
        'Select',
        'Idukki',
        'Ernakulam',
        'Palakkad',
        'Kozhikode',
        'Wayanad',
        'Thrissur',
    ];
  
    const districtToSubDistrict = {
        'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
        'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
        'Ernakulam': [],
        'Kozhikode': ['vatakara'],
        'Wayanad': [],
        'Thrissur': []
    };

    // Calculate available sub-districts based on selected district
    const availableSubDistricts = selectedDistrict === 'Select' 
        ? ['Select'] 
        : ['Select', ...districtToSubDistrict[selectedDistrict] || []];

    const dummyKalolsavams = [
        {
            id: 1,
            kalolsavamName: " School Kalolsavam",
            year: 2024,
            venue: "Kochi",
            startDate: "2024-12-01",
            endDate: "2024-12-05",
            district: "Ernakulam",
            subDistrict: ""
        },
        // ... other kalolsavams (unchanged)
        {
            id: 12,
            kalolsavamName: " Idukki District Kalolsavam",
            year: 2024,
            venue: "Devikulam",
            startDate: "2024-12-01",
            endDate: "2024-12-05",
            district: "Idukki",
            subDistrict: "Devikulam"
        },
    ];

    // Update URL parameters
    const updateUrlParams = (district, subDistrict, page) => {
        const params = new URLSearchParams();
        
        if (district !== 'Select') {
            params.set('district', district);
        }
        
        if (subDistrict !== 'Select') {
            params.set('subDistrict', subDistrict);
        }
        
        if (page > 1) {
            params.set('page', page.toString());
        }
        
        // Update URL without refreshing the page
        setSearchParams(params);
    };

    // Handle district change
    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        setSelectedSubDistrict('Select'); // Reset sub-district when district changes
        applyFilters(district, 'Select');
        updateUrlParams(district, 'Select', 1);
    };

    // Handle sub-district change
    const handleSubDistrictChange = (e) => {
        const subDistrict = e.target.value;
        setSelectedSubDistrict(subDistrict);
        applyFilters(selectedDistrict, subDistrict);
        updateUrlParams(selectedDistrict, subDistrict, 1);
    };

    // Apply filters function
    const applyFilters = (district, subDistrict) => {
        let filtered = [...kalolsavams];
        
        if (district !== 'Select') {
            filtered = filtered.filter(item => item.district === district);
        }
        
        if (subDistrict !== 'Select') {
            filtered = filtered.filter(item => item.subDistrict === subDistrict);
        }
        
        setFilteredKalolsavams(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredKalolsavams.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredKalolsavams.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            updateUrlParams(selectedDistrict, selectedSubDistrict, pageNumber);
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

    // Effect to load Kalolsavams and apply initial filters
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setKalolsavams(dummyKalolsavams);
            setFilteredKalolsavams(dummyKalolsavams);
            
            // Apply initial filters from URL if they exist
            if (initialDistrict !== 'Select' || initialSubDistrict !== 'Select') {
                applyFilters(initialDistrict, initialSubDistrict);
            }
            
            setLoading(false);
        }, 500);
        
        // getAllKalolsavams();
    }, []);

    // Effect to handle URL parameter changes (e.g., when back button is pressed)
    useEffect(() => {
        const urlDistrict = searchParams.get('district') || 'Select';
        const urlSubDistrict = searchParams.get('subDistrict') || 'Select';
        const urlPage = parseInt(searchParams.get('page') || '1');
        
        // Only update if different from current state
        if (urlDistrict !== selectedDistrict || urlSubDistrict !== selectedSubDistrict) {
            setSelectedDistrict(urlDistrict);
            setSelectedSubDistrict(urlSubDistrict);
            applyFilters(urlDistrict, urlSubDistrict);
        }
        
        if (urlPage !== currentPage) {
            setCurrentPage(urlPage);
        }
    }, [location.search]);

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
                    setFilteredKalolsavams(result.data);
                    
                    // Apply initial filters from URL if they exist
                    if (initialDistrict !== 'Select' || initialSubDistrict !== 'Select') {
                        applyFilters(initialDistrict, initialSubDistrict);
                    }
                    
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

    const handleAddClick = () => {
        navigate('/AddKalosavam');
    };

    const handleEditClick = (kalolsavam) => {
        // Preserve the current filters in the URL when navigating
        const params = new URLSearchParams(searchParams);
        navigate(`/EditKalosmAdm/${kalolsavam.id}?${params.toString()}`, {
            state: { 
                kalolsavam,
                returnPath: `/CreateKalolsavam?${params.toString()}`  // Include return path with filters
            }
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
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    {/* Header section with title and controls */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Create Kalolsavam
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            {/* District Filter */}
                            <div className="relative w-full sm:w-auto">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="district-select"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                >
                                    {allDistricts.map((option, index) => (
                                        <option key={`district-${index}`} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="district-select"
                                    className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                                >
                                    District
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>

                            {/* Sub-District Filter */}
                            <div className="relative w-full sm:w-auto">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="sub-district-select"
                                    value={selectedSubDistrict}
                                    onChange={handleSubDistrictChange}
                                >
                                    {availableSubDistricts.map((option, index) => (
                                        <option key={`sub-district-${index}`} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="sub-district-select"
                                    className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:text-blue-800 left-3"
                                >
                                    Sub District
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>

                            <button onClick={handleAddClick}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full w-full sm:w-auto"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    
                    {/* Table and pagination sections remain unchanged */}
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
                                {currentItems.length > 0 ? (
                                    currentItems.map((kalolsavam, index) => (
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center p-4">No records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                        {/* Showing X of Y rows */}
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {filteredKalolsavams.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredKalolsavams.length)} of ${filteredKalolsavams.length} rows` : '0 rows'}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                            {/* Previous Button with icon */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1 || totalPages === 0}
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

export default CreateKalolsavam
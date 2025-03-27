import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Dash from "../components/Dash"
import { allItemWiseAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const ItemWise = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [itemData, setItemData] = useState([]);
    const [expandedCaptain, setExpandedCaptain] = useState(null);
    const navigate = useNavigate();

    const teamMembersData = {
        "Captain1": [
            { id: 101, name: "Member 1", class: "Class 5" },
            { id: 102, name: "Member 2", class: "Class 5" }
        ],
        "Captain2": [
            { id: 201, name: "Member 3", class: "Class 2" },
            { id: 202, name: "Member 4", class: "Class 2" }
        ],
        "Captain3": [
            { id: 301, name: "Member 5", class: "Class 1" },
            { id: 302, name: "Member 6", class: "Class 1" }
        ],
        "Captain4": [
            { id: 401, name: "Member 7", class: "Class 3" },
            { id: 402, name: "Member 8", class: "Class 3" }
        ]
    };

    useEffect(() => {
        getAllItemWise();
    }, []);

    const getAllItemWise = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await allItemWiseAPI(reqHeader);
                if (result.status === 200) {
                    setItemData(result.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const dummyData = [...Array(100)].map((_, index) => ({
        id: index + 1,
        itemCode: 200,
        itemName: `Item Name ${index + 1}`,
        participants: 2,
        pinnany: 2,
        captain: `Captain${(index % 11) + 1}`
    }));

    // Filter data based on search query
    const filteredData = dummyData.filter(item => 
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.captain.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        let pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, '...', totalPages];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }
        return pages;
    };

    const hasCaptainTeamMembers = (captainId) => {
        return teamMembersData[captainId] && teamMembersData[captainId].length > 0;
    };

    const toggleCaptainTeamMembers = (captainId) => {
        setExpandedCaptain(expandedCaptain === captainId ? null : captainId);
    };

    // Update URL with search query
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchQuery) {
            searchParams.set('search', searchQuery);
        } else {
            searchParams.delete('search');
        }
        
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, [searchQuery]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page when searching
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="font-bold text-lg mb-4 ml-4">Item Wise Participants </h1>
                        <div className="relative flex ml-5 items-center w-full sm:w-64 h-10 border border-blue-800 rounded-full px-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search Item Name or Captain..."
                                className="w-full bg-transparent outline-none text-sm"
                            />
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>

                        <div className="overflow-x-auto p-4">
                            {filteredData.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <p className="text-xl mb-4">No results found</p>
                                    <p>Try a different search term</p>
                                </div>
                            ) : (
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="text-sm bg-gray-100">
                                            <th className="py-2 px-4">Sl.no</th>
                                            <th className="py-2 px-4">Item Code</th>
                                            <th className="py-2 px-4">Item Name</th>
                                            <th className="py-2 px-4">Number of Participants</th>
                                            <th className="py-2 px-4">Captain</th>
                                            <th className="py-2 px-4">No of Pinnany</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={item.id} className="text-gray-600 hover:bg-gray-100">
                                                <td className="p-3 text-center text-black">{item.id}</td>
                                                <td className="p-3 text-center">{item.itemCode}</td>
                                                <td className="p-3 text-center">{item.itemName}</td>
                                                <td className="p-3 text-center">{item.participants}</td>
                                                <td className="p-3 text-center relative">
                                                    <div
                                                        className={`inline-flex items-center justify-center w-full ${hasCaptainTeamMembers(item.captain) ? 'cursor-pointer' : ''}`}
                                                        onClick={() => hasCaptainTeamMembers(item.captain) && toggleCaptainTeamMembers(item.captain)}
                                                    >
                                                        <span className="text-center">{item.captain}</span>
                                                        {hasCaptainTeamMembers(item.captain) && (
                                                            <i
                                                                className={`ml-2 fa-solid ${expandedCaptain === item.captain ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400 text-xs`}
                                                            ></i>
                                                        )}
                                                    </div>
                                                    {hasCaptainTeamMembers(item.captain) && expandedCaptain === item.captain && (
                                                        <div className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white rounded-md shadow-lg border border-blue-100">
                                                            <div className="p-2">
                                                                <div className="space-y-2">
                                                                    {teamMembersData[item.captain].map(member => (
                                                                        <div
                                                                            key={member.id}
                                                                            className="p-2 rounded-md flex items-center justify-between"
                                                                        >
                                                                            <div className="flex-grow">
                                                                                <p className="font-medium text-sm text-left truncate">{member.name}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-3 text-center">{item.pinnany}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {filteredData.length > 0 && (
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                                <div className="text-sm text-gray-600 mb-2 sm:mb-0 text-center sm:text-left">
                                    {indexOfFirstItem + 1} of {filteredData.length} rows selected
                                </div>
                                <div className="flex flex-wrap items-center justify-center w-full sm:w-auto">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 sm:px-6 py-2 mx-1 my-1 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-400"
                                    >
                                        Previous
                                    </button>
                                    <div className="flex flex-wrap justify-center my-1 sm:my-0 w-full sm:w-auto">
                                        {renderPageNumbers().map((page, index) => (
                                            <button
                                                key={index}
                                                onClick={() => page !== '...' && handlePageChange(page)}
                                                className={`px-3 py-1 mx-1 my-1 rounded ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200'
                                                    } ${page === '...' ? 'pointer-events-none' : ''}`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 sm:px-6 py-2 mx-1 my-1 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-400"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemWise;
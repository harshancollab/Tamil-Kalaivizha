import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Dash from "../components/Dash"
import { allItemWiseAPI } from "../services/allAPI";

const ItemWise = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 
    const [itemData, setItemData] = useState([]);


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
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(dummyData.length / itemsPerPage);

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

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="font-bold text-lg mb-4">Item Wise Participants </h1>

                        <div className="overflow-x-auto p-4">
                            <table className="min-w-full bg-white  ">
                                <thead>
                                    <tr className="text-sm bg-gray-100">
                                        <th className="py-2 px-4 ">Sl.no</th>
                                        <th className="py-2 px-4 ">Item Code</th>
                                        <th className="py-2 px-4 ">Item Name</th>
                                        <th className="py-2 px-4 ">Number of Participants</th>
                                        <th className="py-2 px-4 ">No of Pinnany</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={item.id} className="text-gray-600 hover:bg-gray-100">
                                            <td className="p-3 text-center text-black">{item.id}</td>
                                            <td className="p-3 text-center">{item.itemCode}</td>
                                            <td className="p-3 text-center">{item.itemName}</td>
                                            <td className="p-3 text-center">{item.participants}</td>
                                            <td className="p-3 text-center">{item.pinnany}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                            <div className="text-sm text-gray-600 mb-2 sm:mb-0 text-center sm:text-left">
                                {indexOfFirstItem + 1} of {dummyData.length} rows selected
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemWise
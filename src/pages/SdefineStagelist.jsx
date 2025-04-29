import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { deleteStageAPI, getAllStageListAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

const SdefineStagelist = () => {
    const navigate = useNavigate();
     // Pagination states
        const [currentPage, setCurrentPage] = useState(1);
        const [rowsPerPage, setRowsPerPage] = useState(10);
    
    // Dummy data 
    const dummyStages = [
        { id: 1, name: "Discovery", description: "Initial assessment of client needs" },
        { id: 2, name: "Planning", description: "Project scope and resource allocation" },
        { id: 3, name: "Development", description: "Building the core functionality" },
        { id: 4, name: "Testing", description: "Quality assurance and bug fixes" },
        { id: 5, name: "Deployment", description: "Release to production environment" },
        { id: 6, name: "Deployment", description: "Release to production environment" },
        { id: 7, name: "Deployment", description: "Release to production environment" },
        { id: 8, name: "Deployment", description: "Release to production environment" },
        { id: 9, name: "Deployment", description: "Release to production environment" },
        { id: 10, name: "Deployment", description: "Release to production environment" },
        { id: 11, name: "Deployment", description: "Release to production environment" },
        { id: 1, name: "Discovery", description: "Initial assessment of client needs" },
        { id: 2, name: "Planning", description: "Project scope and resource allocation" },
        { id: 3, name: "Development", description: "Building the core functionality" },
        { id: 4, name: "Testing", description: "Quality assurance and bug fixes" },
        { id: 5, name: "Deployment", description: "Release to production environment" },
        { id: 6, name: "Deployment", description: "Release to production environment" },
        { id: 7, name: "Deployment", description: "Release to production environment" },
        { id: 8, name: "Deployment", description: "Release to production environment" },
        { id: 9, name: "Deployment", description: "Release to production environment" },
        { id: 10, name: "Deployment", description: "Release to production environment" },
        { id: 11, name: "Deployment", description: "Release to production environment" },
        { id: 1, name: "Discovery", description: "Initial assessment of client needs" },
        { id: 2, name: "Planning", description: "Project scope and resource allocation" },
        { id: 3, name: "Development", description: "Building the core functionality" },
        { id: 4, name: "Testing", description: "Quality assurance and bug fixes" },
        { id: 5, name: "Deployment", description: "Release to production environment" },
        { id: 6, name: "Deployment", description: "Release to production environment" },
        { id: 7, name: "Deployment", description: "Release to production environment" },
        { id: 8, name: "Deployment", description: "Release to production environment" },
        { id: 9, name: "Deployment", description: "Release to production environment" },
        { id: 10, name: "Deployment", description: "Release to production environment" },
        { id: 11, name: "Deployment", description: "Release to production environment" },
        { id: 1, name: "Discovery", description: "Initial assessment of client needs" },
        { id: 2, name: "Planning", description: "Project scope and resource allocation" },
        { id: 3, name: "Development", description: "Building the core functionality" },
        { id: 4, name: "Testing", description: "Quality assurance and bug fixes" },
        { id: 5, name: "Deployment", description: "Release to production environment" },
        { id: 6, name: "Deployment", description: "Release to production environment" },
        { id: 7, name: "Deployment", description: "Release to production environment" },
        { id: 8, name: "Deployment", description: "Release to production environment" },
        { id: 9, name: "Deployment", description: "Release to production environment" },
        { id: 10, name: "Deployment", description: "Release to production environment" },
        { id: 11, name: "Deployment", description: "Release to production environment" },
        { id: 1, name: "Discovery", description: "Initial assessment of client needs" },
        { id: 2, name: "Planning", description: "Project scope and resource allocation" },
        { id: 3, name: "Development", description: "Building the core functionality" },
        { id: 4, name: "Testing", description: "Quality assurance and bug fixes" },
        { id: 5, name: "Deployment", description: "Release to production environment" },
        { id: 6, name: "Deployment", description: "Release to production environment" },
        { id: 7, name: "Deployment", description: "Release to production environment" },
        { id: 8, name: "Deployment", description: "Release to production environment" },
        { id: 9, name: "Deployment", description: "Release to production environment" },
        { id: 10, name: "Deployment", description: "Release to production environment" },
        { id: 11, name: "Deployment", description: "Release to production environment" },
        { id: 1, name: "Discovery", description: "Initial assessment of client needs" },
        { id: 2, name: "Planning", description: "Project scope and resource allocation" },
        { id: 3, name: "Development", description: "Building the core functionality" },
        { id: 4, name: "Testing", description: "Quality assurance and bug fixes" },
        { id: 5, name: "Deployment", description: "Release to production environment" },
        { id: 6, name: "Deployment", description: "Release to production environment" },
        { id: 7, name: "Deployment", description: "Release to production environment" },
        { id: 8, name: "Deployment", description: "Release to production environment" },
        { id: 9, name: "Deployment", description: "Release to production environment" },
        { id: 10, name: "Deployment", description: "Release to production environment" },
        { id: 11, name: "Deployment", description: "Release to production environment" }
    ];
    
    const [Allstages, setStages] = useState(dummyStages);
    console.log(Allstages);

    useEffect(() => {
        // getAllstages();
    }, []);

    const getAllstages = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllStageListAPI(reqHeader)
                if (result.status === 200) {
                    setStages(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleAddClick = () => {
        navigate('/SAddStage');
    };

    const handleEditClick = (stageId) => {
        navigate(`/SeditStage`);
    };
    
    const handleDeleteClick = async(stageId) => {
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try{
                await deleteStageAPI(stageId, reqHeader); // Changed 'id' to 'stageId'
                getAllstages(); // Changed to call the correct function
            }catch(err){
                console.log(err);
            }
        }
        
        setStages(Allstages.filter(stage => stage.id !== stageId));
    };
    
    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = Allstages.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(Allstages.length / rowsPerPage);

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

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                            Stages
                        </h2>
                        <button onClick={handleAddClick} className="text-blue-500 border border-blue-500 py-2 px-6 rounded-full flex items-center">
                            Add Stage
                        </button>
                    </div>

                    <div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border-separate border-spacing-y-2 print-table">
                                <thead>
                                    <tr className="text-gray-700 ">
                                        <th className="p-2 md:p-3">Sl No</th>
                                        <th className="p-2 md:p-3">Stage Name</th>
                                        <th className="p-2 md:p-3">Stage description</th>
                                        <th className="p-2 md:p-3">Edit</th>
                                        <th className="p-2 md:p-3">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((stage, index) => (
                                            <tr key={stage.id} className="hover:bg-gray-200">
                                                <td className="p-2 mr-5 md:p-3">{indexOfFirstItem + index + 1}</td>
                                                <td className="p-2 md:p-3">{stage.name}</td>
                                                <td className="p-2 md:p-3">{stage.description}</td>
                                                <td className="p-2 md:p-3">
                                                    <i 
                                                        className="fa-solid text-blue-500 fa-pen-to-square cursor-pointer"
                                                        onClick={() => handleEditClick(stage.id)}
                                                    ></i>
                                                </td>
                                                <td className="p-2 md:p-3">
                                                    <i 
                                                        className="fa-solid text-red-600 fa-trash cursor-pointer"
                                                        onClick={() => handleDeleteClick(stage.id)}
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="hover:bg-gray-200">
                                            <td colSpan="5" className="p-3">No stages found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                        {/* Showing X of Y rows */}
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {Allstages.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, Allstages.length)} of ${Allstages.length} rows` : '0 rows'}
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
        </>
    )
}

export default SdefineStagelist
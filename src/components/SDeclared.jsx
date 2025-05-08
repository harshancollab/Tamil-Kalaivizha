import React, { useState, useEffect } from 'react';

const SDeclared = ({ searchTerm, selectedFestival, printRef }) => {
    // Mock data with added district field and proper Kerala districts with their sub-districts
    const [allResults, setAllResults] = useState([
        {
            id: 1,
            itemCode: '301A',
            itemName: 'Elocution',
            regNo: 'UP001',
            codeNo: 'EL01',
            name: 'Arun Kumar',
            className: 'V',
            schoolName: ' Secondary School',
            subDistrict: 'Neyyattinkara',
            district: 'Kollam',
            grade: 'A',
            point: 85,
            festival: 'UP Tamil Kalaivizha'
        },
        {
            id: 2,
            itemCode: '405B',
            itemName: 'Essay Writing',
            regNo: 'LP012',
            codeNo: 'ES05',
            name: 'Priya Sharma',
            className: 'VII',
            schoolName: 'St. Mary',
            subDistrict: 'Punalur',
            district: 'Kollam',
            grade: 'B',
            point: 78,
            festival: 'Lp Tamil Kalaivizha'
        },
        {
            id: 3,
            itemCode: '510C',
            itemName: 'Poem Recitation',
            regNo: 'HS025',
            codeNo: 'PR10',
            name: 'Vijay Rajan',
            className: 'IX',
            schoolName: 'Modern Public School',
            subDistrict: 'Aluva',
            district: 'Ernakulam',
            grade: 'A+',
            point: 92,
            festival: 'Hs Tamil Kalaivizha'
        },
        {
            id: 4,
            itemCode: '620D',
            itemName: 'Debate',
            regNo: 'HSS040',
            codeNo: 'DB20',
            name: 'Sneha Nair',
            className: 'XI',
            schoolName: 'Vidya Mandir',
            subDistrict: 'Vadakara',
            district: 'Kozhikode',
            grade: 'A',
            point: 88,
            festival: 'Hss Tamil Kalaivizha'
        },
        {
            id: 5,
            itemCode: '302B',
            itemName: 'Story Telling',
            regNo: 'UP005',
            codeNo: 'ST02',
            name: 'Karthik Verma',
            className: 'IV',
            schoolName: 'Little Flower School',
            subDistrict: 'Chavakkad',
            district: 'Thrissur',
            grade: 'B+',
            point: 80,
            festival: 'UP Tamil Kalaivizha'
        },
        {
            id: 6,
            itemCode: '410A',
            itemName: 'Drawing',
            regNo: 'LP018',
            codeNo: 'DR01',
            name: 'Meera Menon',
            className: 'VI',
            schoolName: 'Chinmaya Vidyalaya',
            subDistrict: 'Ottapalam',
            district: 'Palakkad',
            grade: 'A',
            point: 86,
            festival: 'Lp Tamil Kalaivizha'
        },
        {
            id: 7,
            itemCode: '515B',
            itemName: 'Group Song',
            regNo: 'HS030',
            codeNo: 'GS05',
            name: 'Team Harmony',
            className: 'X',
            schoolName: 'Bharathi Vidyalaya',
            subDistrict: 'Cherthala',
            district: 'Alappuzha',
            grade: 'A+',
            point: 95,
            festival: 'Hs Tamil Kalaivizha'
        },
        {
            id: 8,
            itemCode: '625C',
            itemName: 'Folk Dance',
            regNo: 'HSS045',
            codeNo: 'FD10',
            name: 'Group Rhythms',
            className: 'XII',
            schoolName: 'Kendriya Vidyalaya',
            subDistrict: 'Thalassery',
            district: 'Kannur',
            grade: 'A',
            point: 90,
            festival: 'Hss Tamil Kalaivizha'
        },
        // Added more mock data with Kerala sub-districts
        {
            id: 9,
            itemCode: '301B',
            itemName: 'Storytelling',
            regNo: 'UP002',
            codeNo: 'ST01',
            name: 'Rohit Singh',
            className: 'V',
            schoolName: 'Delhi Public School',
            subDistrict: 'Perinthalmanna',
            district: 'Malappuram',
            grade: 'A',
            point: 87,
            festival: 'UP Tamil Kalaivizha'
        },
        {
            id: 10,
            itemCode: '405C',
            itemName: 'Poetry Writing',
            regNo: 'LP013',
            codeNo: 'PW06',
            name: 'Kavya Reddy',
            className: 'VII',
            schoolName: 'Angels Academy',
            subDistrict: 'Hosdurg',
            district: 'Kasaragod',
            grade: 'A+',
            point: 93,
            festival: 'Lp Tamil Kalaivizha'
        },
        {
            id: 11,
            itemCode: '510D',
            itemName: 'Instrumental Music',
            regNo: 'HS026',
            codeNo: 'IM12',
            name: 'Abhinav Mehta',
            className: 'IX',
            schoolName: 'Vidya Niketan',
            subDistrict: 'Mananthavady',
            district: 'Wayanad',
            grade: 'A',
            point: 89,
            festival: 'Hs Tamil Kalaivizha'
        },
        {
            id: 12,
            itemCode: '620E',
            itemName: 'Quiz',
            regNo: 'HSS041',
            codeNo: 'QZ21',
            name: 'Arjun Das',
            className: 'XI',
            schoolName: 'St. Thomas',
            subDistrict: 'Ranni',
            district: 'Pathanamthitta',
            grade: 'B+',
            point: 81,
            festival: 'Hss Tamil Kalaivizha'
        },
        {
            id: 13,
            itemCode: '315A',
            itemName: 'Classical Dance',
            regNo: 'UP008',
            codeNo: 'CD03',
            name: 'Lakshmi Nair',
            className: 'V',
            schoolName: 'Mount Carmel School',
            subDistrict: 'Varkala',
            district: 'TVM',
            grade: 'A',
            point: 89,
            festival: 'UP Tamil Kalaivizha'
        },
        {
            id: 14,
            itemCode: '418B',
            itemName: 'Mono Act',
            regNo: 'LP022',
            codeNo: 'MA07',
            name: 'Anand Menon',
            className: 'VII',
            schoolName: 'St. Joseph',
            subDistrict: 'Kottarakkara',
            district: 'Kollam',
            grade: 'A',
            point: 84,
            festival: 'Lp Tamil Kalaivizha'
        }
    ]);
    const [filteredResults, setFilteredResults] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        // Filter results based on selected festival
        let festivalFiltered = allResults;
        if (selectedFestival !== 'ALL Festivel') {
            festivalFiltered = allResults.filter(result => result.festival === selectedFestival);
        }

        // Filter based on search term
        const searchTermFiltered = festivalFiltered.filter(result => {
            const searchLower = searchTerm.toLowerCase();
            return (
                result.name.toLowerCase().includes(searchLower) ||
                result.schoolName.toLowerCase().includes(searchLower) ||
                result.itemCode.toLowerCase().includes(searchLower) ||
                result.itemName.toLowerCase().includes(searchLower) ||
                result.regNo.toLowerCase().includes(searchLower) ||
                result.codeNo.toLowerCase().includes(searchLower) ||
                result.district.toLowerCase().includes(searchLower) ||
                result.subDistrict.toLowerCase().includes(searchLower)
            );
        });
        setFilteredResults(searchTermFiltered);
        setCurrentPage(1); // Reset to first page when filters change

        // Simulate fetching data when festival changes (for real API calls)
        console.log(`Fetching data for festival: ${selectedFestival}`);
    }, [searchTerm, selectedFestival, allResults]);

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

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
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <div className="overflow-hidden border-gray-200 sm:rounded-lg">
                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                        <thead className="bg-gray-50">
                            <tr className="text-gray-700">
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Item Name</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reg No</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Code No</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Name</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Class</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School code & Name</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">District</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Grade</th>
                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Point</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                            {currentItems.length > 0 ? (
                                currentItems.map((result, index) => (
                                    <tr key={result.id} className="hover:bg-gray-100">
                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.itemCode} - {result.itemName}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.codeNo}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.name}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.className}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">3002-{result.schoolName}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.subDistrict}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.district}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.grade}</td>
                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.point}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="p-4 text-center text-gray-500">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Controls */}
                {filteredResults.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                        {/* Showing X of Y rows */}
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {filteredResults.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredResults.length)} of ${filteredResults.length} rows` : '0 rows'}
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
    );
};

export default SDeclared;
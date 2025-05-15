// It Admin  Item req list

import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
// import { deleteItemAPI, getAllItemsListAPI } from '../services/allAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import Alert from '../components/Alert'

const ItemRegistrationList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const printRef = useRef();
      const [loading, setLoading] = useState(true);
        // Alert state
        const [alert, setAlert] = useState({
            show: false,
            message: '',
            type: 'success'
        });

    const [selectedFestival, setSelectedFestival] = useState(searchParams.get('festival') || '');
    const festivalOptions = [
        'UP Tamilkalaivizha',
        'LP Tamilkalaivizha',
        'HS Tamilkalaivizha',
        'HSS Tamilkalaivizha',
        'All Festival'
    ];

    const festivalCodeRanges = {
        'UP Tamilkalaivizha': { min: 300, max: 399 },
        'LP Tamilkalaivizha': { min: 400, max: 499 },
        'HS Tamilkalaivizha': { min: 500, max: 599 },
        'HSS Tamilkalaivizha': { min: 700, max: 999 }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const searchParam = searchParams.get('search');
        const festivalParam = searchParams.get('festival');

        if (searchParam) setSearchTerm(searchParam);
        if (festivalParam) setSelectedFestival(festivalParam);
    }, [searchParams]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedFestival]);

    useEffect(() => {
        getAllItems();
    }, []);

    const getAllItems = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllItemsListAPI(reqHeader)
                if (result.status === 200) {
                    setItems(result.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleEditRedirect = (item) => {
        navigate(`/EditItem/${item.slNo}`, {
            state: { item }
        });
    };

    const handleDeleteClick = async (id) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await deleteItemAPI(id, reqHeader)
                if (result.status === 200) {
                    getAllItems();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const generatePDF = () => {
        const pdfContent = document.createElement('div');
    
        // Create dynamic title that includes the selected festival
        const titleElement = document.createElement('h2');
        
        // Set the title based on selected festival
        if (selectedFestival && selectedFestival !== 'Select' && selectedFestival !== 'All Festival') {
            titleElement.textContent = `${selectedFestival} Item Registration List`;
        } else {
            titleElement.textContent = "Items Registration List";
        }
        
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);
    
        if (searchTerm || selectedFestival !== '') {
            const filterInfo = document.createElement('div');
            filterInfo.style.margin = '10px 0';
            filterInfo.style.textAlign = 'center';
            filterInfo.style.fontStyle = 'italic';
    
            let filterText = '';
            if (searchTerm) filterText += `Search: ${searchTerm} `;
            if (selectedFestival && selectedFestival !== 'Select') {
               
            }
    
            filterInfo.textContent = filterText;
            pdfContent.appendChild(filterInfo);
        }
    
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
    
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
    
        const headers = [
            'Sl No', 'Item Code & Name', 'Item Type', 'Maximum Students', 'Pinnany', 'Duration'
        ];
    
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.style.border = '1px solid #ddd';
            th.style.padding = '8px';
            th.style.backgroundColor = '#f2f2f2';
            th.style.fontWeight = 'bold';
            headerRow.appendChild(th);
        });
    
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        const tbody = document.createElement('tbody');
        
        // Get the filtered items for the PDF
        const itemsForPDF = filteredItems;
        
        itemsForPDF.forEach((item, index) => {
            const row = document.createElement('tr');
    
            const cellData = [
                index + 1,
                `${item.code} - ${item.item}`,
                item.itemType || 'N/A',
                item.noOfStudents || 'N/A',
                item.resultEntered || 'N/A',
                item.resultNotEntered || 'N/A'
            ];
    
            cellData.forEach(text => {
                const td = document.createElement('td');
                td.textContent = text;
                td.style.border = '1px solid #ddd';
                td.style.padding = '8px';
                td.style.textAlign = 'center';
                row.appendChild(td);
            });
    
            tbody.appendChild(row);
        });
    
        table.appendChild(tbody);
        pdfContent.appendChild(table);
    
        const summaryDiv = document.createElement('div');
        summaryDiv.style.marginTop = '15px';
        summaryDiv.style.padding = '10px';
    
        summaryDiv.innerHTML = `
            <p><strong>Total Items:</strong> ${itemsForPDF.length}</p>
            <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString()}</p>
        `;
    
        // Add festival info to summary if selected
        if (selectedFestival && selectedFestival !== 'Select' && selectedFestival !== 'All Festival') {
            summaryDiv.innerHTML += `<p><strong>Festival:</strong> ${selectedFestival}</p>`;
        }
    
        pdfContent.appendChild(summaryDiv);
    
        // Set filename based on selected festival
        let filename = 'Items_Registration_List.pdf';
        if (selectedFestival && selectedFestival !== 'Select' && selectedFestival !== 'All Festival') {
            // Replace spaces with underscores for filename
            const festivalForFilename = selectedFestival.replace(/\s+/g, '_');
            filename = `${festivalForFilename}_Items_Registration_List.pdf`;
        }
    
        const options = {
            margin: 10,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };
    
        html2pdf().from(pdfContent).set(options).save();
    };

    const itemData = items.length > 0 ? items : [
        { slNo: 1, regNo: "1233", code: "301", item: "Story writing", itemType: "Group", noOfStudents: 1, resultEntered: 0, resultNotEntered: " 1 Hour 30 Min", festival: "UP Tamilkalaivizha" },
        { slNo: 2, regNo: "4563", code: "203", item: "Story telling", itemType: "Single", noOfStudents: 1, resultEntered: 0, resultNotEntered: "1 Hour 30 Min", festival: "LP Tamilkalaivizha" },
        { slNo: 3, regNo: "8933", code: "345", item: "Elocution", itemType: "Single", noOfStudents: 1, resultEntered: 0, resultNotEntered: "45 Min", festival: "HS Tamilkalaivizha" },
        { slNo: 4, regNo: "3433", code: "567", item: "Essay writing", itemType: "Single", noOfStudents: 1, resultEntered: 0, resultNotEntered: "2 Hours", festival: "HSS Tamilkalaivizha" },
        { slNo: 5, regNo: "6733", code: "234", item: "Group dance", itemType: "Group", noOfStudents: 5, resultEntered: 0, resultNotEntered: "15 Min", festival: "UP Tamilkalaivizha" },
        { slNo: 6, regNo: "8903", code: "423", item: "Solo dance", itemType: "Single", noOfStudents: 1, resultEntered: 0, resultNotEntered: "10 Min", festival: "LP Tamilkalaivizha" },
        { slNo: 7, regNo: "453", code: "526", item: "Group song", itemType: "Group", noOfStudents: 4, resultEntered: 0, resultNotEntered: "15 Min", festival: "HS Tamilkalaivizha" }
    ];

    const codeInFestivalRange = (code, festival) => {
        if (!festival || festival === 'All Festival' || festival === 'Select') return true;

        const codeNum = parseInt(code);
        const range = festivalCodeRanges[festival];

        if (!range) return true;

        return codeNum >= range.min && codeNum <= range.max;
    };

    const filteredBySearch = () => {
        if (!searchTerm) {
            return itemData;
        }
        const searchTermLower = searchTerm.toLowerCase();
        return itemData.filter(item =>
            item.code.toLowerCase().includes(searchTermLower) ||
            item.item.toLowerCase().includes(searchTermLower)
        );
    };

    const filteredData = () => {
        let filtered = filteredBySearch();

        if (selectedFestival && selectedFestival !== 'Select') {
            filtered = filtered.filter(item => codeInFestivalRange(item.code, selectedFestival));
        }

        return filtered;
    };

    const filteredItems = filteredData();
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const updateURLParams = (params) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (value && value !== 'Select') {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });

        setSearchParams(newParams);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        updateURLParams({ search: value });
    };

    const handleFestivalChange = (e) => {
        const festival = e.target.value;
        setSelectedFestival(festival);

        updateURLParams({ festival: festival });
    };

    const handleAddClick = () => {
        const params = new URLSearchParams();
        if (selectedFestival && selectedFestival !== 'Select') {
            params.append('festival', selectedFestival);
        }
        navigate(`/AddItem?${params.toString()}`);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = window.innerWidth < 640 ? 3 : 5;

        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                for (let i = 1; i <= 3; i++) {
                    if (i <= totalPages) pageNumbers.push(i);
                }
                if (totalPages > 3) {
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
                }
            } else if (currentPage >= totalPages - 1) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    if (i > 0) pageNumbers.push(i);
                }
            } else {
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
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-gray-600">Loading...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const showAlert = (message, type = 'success') => {
        setAlert({
            show: true,
            message,
            type
        });
    };

    const hideAlert = () => {
        setAlert({
            ...alert,
            show: false
        });
    };



    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                {alert.show && (
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={hideAlert}
                            duration={5000}
                        />
                    )}
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Items List
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto">

                            </div>

                            <div className="relative w-full sm:w-48">
                                <select
                                    id="floating_festival"
                                    className="block px-2 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-full border border-blue-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    onChange={handleFestivalChange}
                                    value={selectedFestival}
                                >
                                    <option value="">Select</option>
                                    {festivalOptions.map((festival, index) => (
                                        <option key={index} value={festival}>
                                            {festival}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="floating_festival"
                                    className={`absolute left-5 text-sm text-blue-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 ${selectedFestival ? 'scale-75 -translate-y-4 top-2' : ''}`}
                                >
                                    Select Festival
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>

                            <button onClick={handleAddClick} className="text-transparent bg-clip-text bg-gradient-to-r from-[#003566] to-[#05B9F4] border border-blue-500 py-2 px-6 rounded-full flex items-center w-full sm:w-auto">
                                Add Items
                            </button>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={generatePDF}
                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
                                >
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex mb-5 w-full sm:w-64 md:w-80">
                        <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                            <input
                                type="text"
                                placeholder="Search by Item Code or Name..."
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>




                    <div className="w-full">
                        <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Code & Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Item Type</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Maximum Students</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Pinnany</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Duration</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Edit</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems.length > 0 ? (
                                                currentItems.map((item, index) => (
                                                    <tr key={item.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.code}-{item.item}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.itemType}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.noOfStudents}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.resultEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.resultNotEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                                            <button
                                                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                                onClick={() => handleEditRedirect(item)}
                                                            >
                                                                <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                                                            </button>
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                                            <button
                                                                onClick={() => handleDeleteClick(item.slNo)}
                                                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                                            >
                                                                <i className="fa-solid fa-trash cursor-pointer"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="p-4 text-center text-gray-500">
                                                        No items found {searchTerm ? `for "${searchTerm}"` : ''}
                                                        {selectedFestival && selectedFestival !== 'Select' && selectedFestival !== 'All Festival' ?
                                                            ` in ${selectedFestival}` : ''}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                        {/* Showing X of Y rows */}
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {filteredItems.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredItems.length)} of ${filteredItems.length} rows` : '0 rows'}
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
                                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
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
    )
}

export default ItemRegistrationList
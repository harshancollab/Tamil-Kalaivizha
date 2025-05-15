// It Admin when user click distr reg -distname - subdist - school list
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { getAllResultentryListAPI } from '../services/allAPI';
import html2pdf from 'html2pdf.js';


const SchoolList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const printRef = useRef();
    
    
    const subDistrict = searchParams.get('subDistrict') || '';
    const district = searchParams.get('district') || '';
    const [searchTerm, setSearchTerm] = useState('');
    
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (subDistrict) {
            fetchSchools();
        } else {
            setLoading(false);
        }
        setCurrentPage(1);
    }, [subDistrict, district]);

    const fetchSchools = async () => {
        setLoading(true);
        setError(null);
        
        const token = sessionStorage.getItem("token");
        if (!token) {
            setError("Authentication token not found. Please login again.");
            setLoading(false);
            
            
            setTimeout(() => {
                const mockSchools = [
                    { id: 1, address: `${subDistrict} Higher Secondary School`, name: `4004`, type: "Yes", students: "Yes" },
                    { id: 2, address: `${subDistrict} High School`, name: `6002`, type: "No", students: "No" },
                    { id: 3, address: `St. Joseph's School ${subDistrict}`, name: `4002`, type: "Yes", students: "No" },
                    { id: 4, address: `Government UP School ${subDistrict}`, name: `3444`, type: "No", students: "No" },
                    { id: 5, address: `${subDistrict} Model School`, name: `6003`, type: "Yes", students: "No" },
                    { id: 6, address: `${subDistrict} Central School`, name: `4501`, type: "Yes", students: "Yes" },
                    { id: 7, address: `${subDistrict} Public School`, name: `3982`, type: "Yes", students: "No" },
                    { id: 8, address: `${subDistrict} International School`, name: `7205`, type: "No", students: "No" },
                    { id: 9, address: `${subDistrict} Grammar School`, name: `5123`, type: "Yes", students: "No" },
                    { id: 10, address: `${subDistrict} Primary School`, name: `2890`, type: "No", students: "No" },
                    { id: 11, address: `${subDistrict} Secondary School`, name: `4567`, type: "Yes", students: "Yes" },
                    { id: 12, address: `${subDistrict} Academy`, name: `6789`, type: "No", students: "No" },
                ];
                setSchools(mockSchools);
                setLoading(false);
            }, 500);
            return;
        }
        
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        
        try {
            // Replace with your actual API call
            const result = await getAllResultentryListAPI(reqHeader);
            if (result.status === 200) {
                setSchools(result.data);
            } else {
                setError(`Failed to fetch data: ${result.status}`);
                const mockSchools = [
                    { id: 1, address: `${subDistrict} Higher Secondary School`, name: `4004`, type: "Yes", students: "Yes" },
                    { id: 2, address: `${subDistrict} High School`, name: `6002`, type: "No", students: "No" },
                ];
                setSchools(mockSchools);
            }
        } catch (err) {
            console.error("API Error:", err);
            setError("Failed to fetch school data. Please try again later.");
            // Fallback to mock data for demonstration
            setSchools([
                { id: 1, address: `${subDistrict} Higher Secondary School`, name: `4004`, type: "Yes", students: "Yes" },
                { id: 2, address: `${subDistrict} High School`, name: `6002`, type: "No", students: "No" },
            ]);
        } finally {
            setLoading(false);
        }
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
   

    const handleAddSchool = () => {
        const params = new URLSearchParams();
        
        if (district) {
            params.set('district', district);
        }
        
        if (subDistrict) {
            params.set('subDistrict', subDistrict);
        }
        
        
        navigate({
            pathname: '/AddSclsub',
            search: params.toString()
        });
    };


    const generatePDF = () => {
        const pdfContent = document.createElement('div');
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = subDistrict ? 
            `${subDistrict} - School List Report` : 
            'School List Report';
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);
        
        if (district) {
            const districtElement = document.createElement('p');
            districtElement.textContent = `District: ${district}`;
            districtElement.style.textAlign = 'center';
            districtElement.style.margin = '10px 0';
            pdfContent.appendChild(districtElement);
        }
        
        
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Sl No', 'School Code', 'School Name', 'Data Entered', 'Confirmed', 'Reset'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.style.border = '1px solid #ddd';
            th.style.padding = '8px';
            th.style.backgroundColor = '#f2f2f2';
            th.style.fontWeight = 'bold';
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        
        const tbody = document.createElement('tbody');
        
        filteredData.forEach((school, index) => {
            const row = document.createElement('tr');
            
            
            const cellData = [
                indexOfFirstItem + index + 1,
                school.name || "-",
                school.address || "-",
                school.type || "-",
                school.students || "-",
                "Reset" 
            ];
            
            cellData.forEach((text, cellIndex) => {
                const td = document.createElement('td');
                td.textContent = cellIndex === 5 ? "" : text; // Empty for reset column
                td.style.border = '1px solid #ddd';
                td.style.padding = '8px';
                td.style.textAlign = 'center';
                row.appendChild(td);
            });
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        pdfContent.appendChild(table);
        
       
        const fileName = subDistrict ? 
            `${subDistrict}_School_List_Report.pdf` : 
            `School_List_Report.pdf`;
        
      
        const options = {
            margin: 10,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().from(pdfContent).set(options).save();
    };

   
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    const filteredData = searchTerm
        ? schools.filter(school => 
            school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : schools;

    // Pagination logic
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
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

    


    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            {subDistrict ? `${subDistrict} - School List` : 'School List'}
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                           <div className="flex gap-2 w-full sm:w-auto">
                                <button 
                                    onClick={handleAddSchool}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400 border border-blue-500 font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
                                >
                                    Add School
                                </button>
                            </div>
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
                    <div className="relative flex mb-5 w-full sm:w-32 md:w-60">
                        <div className="relative flex-grow flex items-center h-10 border border-blue-800 rounded-full px-4">
                            <input
                                type="text"
                                placeholder="Search school name or code"
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div id="print-container" className="overflow-x-auto -mx-4 sm:mx-0">
                                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                    <div ref={printRef} className="shadow overflow-hidden sm:rounded-lg">
                                        <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                            <thead className="bg-gray-50">
                                                <tr className="text-gray-700">
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">School Code & Name</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Data Entered</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Confirmed</th>
                                                    <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Reset</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                                {currentItems.length > 0 ? (
                                                    currentItems.map((school, index) => (
                                                        <tr key={school.id} className="hover:bg-gray-100">
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.name}-{school.address}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.type}</td>
                                                            <td className="p-2 md:p-3 whitespace-nowrap">{school.students}</td>
                                                            <td className="p-2 md:p-3 text-blue-500 whitespace-nowrap">
                                                                <i className="fa-solid fa-rotate-right cursor-pointer"></i>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="p-4 text-center text-gray-500">
                                                            {subDistrict ? 
                                                                searchTerm ? 
                                                                    `No schools found for "${searchTerm}" in ${subDistrict}` : 
                                                                    `No schools found in ${subDistrict}` 
                                                                : 'No sub-district selected'
                                                            }
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Pagination Controls */}
                    {filteredData.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                            <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                                {`${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows`}
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                                >
                                    <i className="fa-solid fa-angle-right transform rotate-180"></i>
                                    <span className="hidden sm:inline p-1">Previous</span>
                                </button>
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

export default SchoolList
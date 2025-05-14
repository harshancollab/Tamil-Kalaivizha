// It admin SUb distric reg
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllResultentryListAPI } from '../services/allAPI'; 
import Splashscreen from '../components/Splashscreen'
import html2pdf from 'html2pdf.js'; // Add this import for html2pdf

const SubDisRegList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchCode, setSearchCode] = useState(searchParams.get('code') || '');
    const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'Select');
     const [loading, setLoading] = useState(true);
 
    const [resultentry, setResultentry] = useState([]);
    const navigate = useNavigate();
    const printRef = useRef();
    
   
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

   
    useEffect(() => {
        const codeParam = searchParams.get('code');
        const districtParam = searchParams.get('district');
        if (codeParam) setSearchCode(codeParam);
        if (districtParam) setSelectedDistrict(districtParam);
    }, [searchParams]);

    
    useEffect(() => {
        setCurrentPage(1);
         setLoading(true);
    }, [searchCode, selectedDistrict]);

    

    const districtToSubDistrict = {
        'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
        'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
        'Ernakulam': ['Aluva', 'Paravur', 'Kothamangalam', 'Muvattupuzha', 'Perumbavoor'],
        'Kozhikode': ['Vatakara', 'Koyilandy', 'Balussery', 'Koduvally', 'Thamarassery'],
        'Wayanad': ['Sulthan Bathery', 'Mananthavady', 'Kalpetta', 'Meenangadi', 'Vythiri'],
        'Thrissur': ['Chalakudy', 'Kodungallur', 'Irinjalakuda', 'Kunnamkulam', 'Guruvayur']
    };

    const availableDistricts = [
        'Select',
        'Idukki',
        'Ernakulam',
        'Palakkad',
        'Kozhikode',
        'Wayanad',
        'Thrissur',
    ];

    
    const subDistrictData = [
        { slNo: 1, name: "Munnar", district: "Idukki", totalSchools: 42, dataEntered: 30, dataNotEntered: 12, confirmed: 25, notConfirmed: 17 },
        { slNo: 2, name: "Adimali", district: "Idukki", totalSchools: 38, dataEntered: 28, dataNotEntered: 10, confirmed: 22, notConfirmed: 16 },
        { slNo: 3, name: "Kattappana", district: "Idukki", totalSchools: 45, dataEntered: 35, dataNotEntered: 10, confirmed: 30, notConfirmed: 15 },
        { slNo: 4, name: "Nedumkandam", district: "Idukki", totalSchools: 30, dataEntered: 25, dataNotEntered: 5, confirmed: 20, notConfirmed: 10 },
        { slNo: 5, name: "Devikulam", district: "Idukki", totalSchools: 25, dataEntered: 18, dataNotEntered: 7, confirmed: 15, notConfirmed: 10 },
        { slNo: 6, name: "Chittur", district: "Palakkad", totalSchools: 40, dataEntered: 32, dataNotEntered: 8, confirmed: 28, notConfirmed: 12 },
        { slNo: 7, name: "Pattambi", district: "Palakkad", totalSchools: 35, dataEntered: 25, dataNotEntered: 10, confirmed: 20, notConfirmed: 15 },
        { slNo: 8, name: "Aluva", district: "Ernakulam", totalSchools: 50, dataEntered: 45, dataNotEntered: 5, confirmed: 40, notConfirmed: 10 },
        { slNo: 9, name: "Vatakara", district: "Kozhikode", totalSchools: 38, dataEntered: 30, dataNotEntered: 8, confirmed: 25, notConfirmed: 13 },
        { slNo: 10, name: "Sulthan Bathery", district: "Wayanad", totalSchools: 28, dataEntered: 22, dataNotEntered: 6, confirmed: 20, notConfirmed: 8 },
        { slNo: 11, name: "Chalakudy", district: "Thrissur", totalSchools: 45, dataEntered: 40, dataNotEntered: 5, confirmed: 35, notConfirmed: 10 },
        { slNo: 12, name: "Koyilandy", district: "Kozhikode", totalSchools: 36, dataEntered: 28, dataNotEntered: 8, confirmed: 24, notConfirmed: 12 },
        { slNo: 13, name: "Kalpetta", district: "Wayanad", totalSchools: 32, dataEntered: 26, dataNotEntered: 6, confirmed: 22, notConfirmed: 10 },
    ];

  
    const filteredData = subDistrictData.filter(item => {
        const matchesSearch = !searchCode || item.name.toLowerCase().includes(searchCode.toLowerCase());
        const matchesDistrict = selectedDistrict === 'Select' || item.district === selectedDistrict;
        return matchesSearch && matchesDistrict;
    });
    
  
    useEffect(() => {
        getAllresultentry();
    }, []);

    const getAllresultentry = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await getAllResultentryListAPI(reqHeader);
                if (result.status === 200) {
                    setResultentry(result.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

   
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

   
    const handleSubDistrictClick = (subDistrict, district) => {
        navigate(`/school-list?subDistrict=${encodeURIComponent(subDistrict)}&district=${encodeURIComponent(district)}`);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

        useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splashscreen />;}
    
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
        setSearchCode(value);
        
      
        updateURLParams({ code: value });
    };

   
    const handleDistrictChange = (e) => {
        const value = e.target.value;
        setSelectedDistrict(value);
        
      
        updateURLParams({ district: value });
    };

    const handleAddSubDistrict = () => {
        
        navigate('/AddSubdis', {
            state: { 
                districtName: selectedDistrict !== 'Select' ? selectedDistrict : '' 
            }
        });
    };

   
    const generatePDF = () => {
       
        const pdfContent = document.createElement('div');
        
       
        const titleElement = document.createElement('h2');
        titleElement.textContent = "Sub District List Report";
        if (selectedDistrict !== 'Select') {
            titleElement.textContent += ` - ${selectedDistrict}`;
        }
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);
        
       
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Sl No', 'Sub District Name', 'Total Schools', 'Data Entered', 'Data Not Entered', 'Confirmed', 'Not Confirmed'];
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
        
        filteredData.forEach((item, index) => {
            const row = document.createElement('tr');
            
        
            const cellData = [
                index + 1,
                item.name || "-",
                item.totalSchools || "-",
                item.dataEntered || "-",
                item.dataNotEntered || "-",
                item.confirmed || "-",
                item.notConfirmed || "-"
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
        
        
        const fileName = selectedDistrict !== 'Select' 
            ? `SubDistrict_List_${selectedDistrict}.pdf` 
            : `SubDistrict_List_Report.pdf`;
        
        
        const options = {
            margin: 10,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        
        html2pdf().from(pdfContent).set(options).save();
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
                            Sub District List
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            <div className="relative w-full sm:w-auto">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    id="district-select"
                                >
                                    {availableDistricts.map((option, index) => (
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
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button
                                    onClick={handleAddSubDistrict}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400 border border-blue-500 font-bold py-2 px-8 rounded-full flex-1 sm:w-auto"
                                >
                                    Add Sub District
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
                                placeholder="Search here"
                                className="w-full bg-transparent outline-none text-sm"
                                value={searchCode}
                                onChange={handleSearchChange}
                            />
                            <button className="text-gray-500 hover:text-gray-700">
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
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sub District Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Total Schools</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Data Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Data Not Entered</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Confirmed</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm no-print">Not Confirmed</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {currentItems.length > 0 ? (
                                                currentItems.map((item, index) => (
                                                    <tr key={item.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td className="p-2 md:p-3 text-blue-500 whitespace-nowrap">
                                                            <button 
                                                                className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none"
                                                                onClick={() => handleSubDistrictClick(item.name, item.district)}
                                                            >
                                                                {item.name}
                                                            </button>
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.totalSchools}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.dataEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.dataNotEntered}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.confirmed}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{item.notConfirmed}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="p-4 text-center text-gray-500">
                                                        No sub-districts found {searchCode ? `for "${searchCode}"` : ''}
                                                        {selectedDistrict !== 'Select' ? ` in ${selectedDistrict}` : ''}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                 
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                      
                        <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                            {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
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
                </div>
            </div>
        </>
    );
};

export default SubDisRegList
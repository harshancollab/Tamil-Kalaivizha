import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useSearchParams } from 'react-router-dom'
import { allClusterSchoolsAPI } from '../services/allAPI'
import html2pdf from 'html2pdf.js'

const SClusterScl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const printRef = useRef();

  // Get initial filter values from URL or default to 'Select'
  const initialDistrict = searchParams.get('district') || 'Select';
  const initialSubDistrict = searchParams.get('subDistrict') || 'Select';
  
  // Filter states
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState(initialSubDistrict);
  const [availableSubDistricts, setAvailableSubDistricts] = useState(['Select']);

  // Define district and subdistrict options
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

  // State for schools data
  const [schools, setSchools] = useState([
    { slno: 1, code: '6004', name: 'G. H. S. S Kumily', dataEntered: 'Yes', confirmed: 'No', district: 'Idukki', subDistrict: 'Kattappana' },
    { slno: 2, code: '6059', name: 'G. H. S. S Anakara', dataEntered: 'Yes', confirmed: 'No', district: 'Thrissur', subDistrict: '' },
    { slno: 3, code: '30001', name: 'G. V. H. S. S Munnar', dataEntered: 'Yes', confirmed: 'No', district: 'Idukki', subDistrict: 'Munnar' },
    { slno: 4, code: '30002', name: 'G. H. S. Sothuparai', dataEntered: 'Yes', confirmed: 'No', district: 'Idukki', subDistrict: 'Munnar' },
    { slno: 5, code: '30003', name: 'G. H. S. S Vaguvurrai', dataEntered: 'Yes', confirmed: 'Yes', district: 'Idukki', subDistrict: 'Nedumkandam' },
    { slno: 6, code: '30006', name: 'L. F. G. H. S. Munnar', dataEntered: 'Yes', confirmed: 'Yes', district: 'Idukki', subDistrict: 'Munnar' },
    { slno: 7, code: '30008', name: 'G. H. S. S Devikulam', dataEntered: 'Yes', confirmed: 'Yes', district: 'Idukki', subDistrict: 'Devikulam' },
    { slno: 8, code: '30009', name: 'G. H. S. S Marayoor', dataEntered: 'Yes', confirmed: 'Yes', district: 'Idukki', subDistrict: 'Devikulam' },
    { slno: 9, code: '30010', name: 'S. H. H. S. Kanthaloor', dataEntered: 'Yes', confirmed: 'No', district: 'Idukki', subDistrict: 'Adimali' },
    { slno: 10, code: '3000', name: 'S. H. H. S. Kanthalloor', dataEntered: 'Yes', confirmed: 'No', district: 'Palakkad', subDistrict: 'Chittur' },
    { slno: 11, code: '0010', name: 'S. H. H. S. anthalloor', dataEntered: 'Yes', confirmed: 'No', district: 'Kozhikode', subDistrict: 'vatakara' },
  ]);
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Helper function to update URL params
  const updateUrlParams = (newParams) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...newParams };

    // Remove params with value 'Select' or empty values
    Object.keys(updatedParams).forEach(key => {
      if (updatedParams[key] === '' || 
          (key !== 'page' && updatedParams[key] === 'Select')) {
        delete updatedParams[key];
      }
    });

    // If page is 1, remove it from the URL
    if (updatedParams.page === '1') {
      delete updatedParams.page;
    }

    setSearchParams(updatedParams);
  };

  // Handle district change
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    
    // Update available sub-districts based on selected district
    if (district === 'Select') {
      setAvailableSubDistricts(['Select']);
      setSelectedSubDistrict('Select');
    } else {
      const subDistricts = ['Select', ...(districtToSubDistrict[district] || [])];
      setAvailableSubDistricts(subDistricts);
      setSelectedSubDistrict('Select');
    }
    
    // Update URL params and apply filters
    updateUrlParams({ district: district, subDistrict: 'Select', page: '1' });
    applyFilters(district, 'Select', searchTerm);
  };

  // Handle sub-district change
  const handleSubDistrictChange = (e) => {
    const subDistrict = e.target.value;
    setSelectedSubDistrict(subDistrict);
    
    // Update URL params and apply filters
    updateUrlParams({ subDistrict: subDistrict, page: '1' });
    applyFilters(selectedDistrict, subDistrict, searchTerm);
  };

  useEffect(() => {
    getAllClusterSchools();
  }, []);

  const getAllClusterSchools = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        setLoading(true);
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 10;
          if (progress <= 90) {
            setLoadingProgress(progress);
          } else {
            clearInterval(progressInterval);
          }
        }, 200);
        
        const result = await allClusterSchoolsAPI(reqHeader)
        clearInterval(progressInterval);
        setLoadingProgress(100);
        
        if (result.status === 200) {
          const apiSchools = result.data.map((school, index) => ({
            slno: index + 1,
            code: school.code || '',
            name: school.name || '',
            dataEntered: school.dataEntered ? 'Yes' : 'No',
            confirmed: school.confirmed ? 'Yes' : 'No',
            district: school.district || '',
            subDistrict: school.subDistrict || ''
          }));
          
          setSchools(apiSchools.length > 0 ? apiSchools : schools);
          
          // Apply initial filters from URL
          applyFilters(initialDistrict, initialSubDistrict, searchParams.get('query') || '');
        } else {
          setFilteredSchools(schools);
          
          // Apply initial filters from URL
          applyFilters(initialDistrict, initialSubDistrict, searchParams.get('query') || '');
        }
        
        // Add a small delay to show 100% progress before hiding the loader
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error(err);
        setFilteredSchools(schools);
        
        // Apply initial filters from URL
        applyFilters(initialDistrict, initialSubDistrict, searchParams.get('query') || '');
        
        setError("An error occurred while fetching schools. Using default data.");
        setLoading(false);
      }
    } else {
      setFilteredSchools(schools);
      
      // Apply initial filters from URL
      applyFilters(initialDistrict, initialSubDistrict, searchParams.get('query') || '');
      
      setLoading(false);
    }
  };

  useEffect(() => {
    // Setup available sub-districts based on the initially selected district
    if (initialDistrict !== 'Select') {
      const subDistricts = ['Select', ...(districtToSubDistrict[initialDistrict] || [])];
      setAvailableSubDistricts(subDistricts);
    }
  }, [initialDistrict]);

  // Effect to handle URL parameter changes (e.g., when back button is pressed)
  useEffect(() => {
    const urlDistrict = searchParams.get('district') || 'Select';
    const urlSubDistrict = searchParams.get('subDistrict') || 'Select';
    const urlSearchTerm = searchParams.get('query') || '';
    const urlPage = parseInt(searchParams.get('page') || '1');
    
    // Only update if different from current state
    if (urlDistrict !== selectedDistrict || urlSubDistrict !== selectedSubDistrict || 
        urlSearchTerm !== searchTerm || urlPage !== currentPage) {
      
      setSelectedDistrict(urlDistrict);
      setSearchTerm(urlSearchTerm);
      
      // Update available sub-districts based on selected district
      if (urlDistrict === 'Select') {
        setAvailableSubDistricts(['Select']);
        setSelectedSubDistrict('Select');
      } else {
        const subDistricts = ['Select', ...(districtToSubDistrict[urlDistrict] || [])];
        setAvailableSubDistricts(subDistricts);
        setSelectedSubDistrict(urlSubDistrict);
      }
      
      if (urlPage !== currentPage) {
        setCurrentPage(urlPage);
      }
      
      // Apply filters with the URL parameters
      applyFilters(urlDistrict, urlSubDistrict, urlSearchTerm);
    }
  }, [searchParams]);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    updateUrlParams({ query: newSearchTerm, page: '1' });
    applyFilters(selectedDistrict, selectedSubDistrict, newSearchTerm);
  };

  // Apply filters function - now handles district, subDistrict and search term
  const applyFilters = (district, subDistrict, term) => {
    let filtered = [...schools];
    
    // Apply district filter
    if (district !== 'Select') {
      filtered = filtered.filter(school => school.district === district);
    }
    
    // Apply sub-district filter
    if (subDistrict !== 'Select') {
      filtered = filtered.filter(school => school.subDistrict === subDistrict);
    }
    
    // Apply search term filter
    if (term && term.trim() !== '') {
      const lowercasedTerm = term.toLowerCase();
      filtered = filtered.filter(school =>
        school.code.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    setFilteredSchools(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredSchools.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      updateUrlParams({ page: pageNumber.toString() });
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

  // PDF generation function using html2pdf.js
  const generatePDF = () => {
    // Create a clone of the table for PDF generation
    const pdfContent = document.createElement('div');
    
    // Add title
    const titleElement = document.createElement('h2');
    titleElement.textContent = "Cluster School List";
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '20px 0';
    titleElement.style.fontWeight = 'bold';
    pdfContent.appendChild(titleElement);

    // Add filter information if any
    if (selectedDistrict !== 'Select' || selectedSubDistrict !== 'Select') {
      const filterInfo = document.createElement('p');
      filterInfo.style.textAlign = 'center';
      filterInfo.style.margin = '10px 0';
      
      let filterText = "";
      if (selectedDistrict !== 'Select') {
        filterText += `District: ${selectedDistrict}`;
      }
      if (selectedSubDistrict !== 'Select') {
        filterText += ` | Sub-District: ${selectedSubDistrict}`;
      }
      filterInfo.textContent = filterText;
      pdfContent.appendChild(filterInfo);
    }

    // Create table clone
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Sl No', 'School Code', 'School Name', 'Data Entered', 'Confirmed'];
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
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    filteredSchools.forEach((school) => {
      const row = document.createElement('tr');
      
      // Add cells
      const cellData = [
        school.slno,
        school.code || "-",
        school.name || "-",
       
        school.dataEntered || "-",
        school.confirmed || "-"
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
    
    // PDF filename
    const fileName = `Cluster_Schools_List.pdf`;
    
    // PDF options
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save();
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex flex-col md:flex-row min-h-screen">
          <Dash />
          <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
            <div className="text-center w-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Loading schools data...</p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{loadingProgress}% complete</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
              Cluster School List 
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                {/* Show Sub-District dropdown only when District is not 'Select' */}
            {selectedDistrict !== 'Select' && (
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
            )}
                           
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

          
             <button 
              onClick={generatePDF}
              className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 rounded-full"
            >
              Print
            </button>

         </div>
            
          
          </div>
          
          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          
            {/* Search Box */}
            <div className="relative flex items-center w-full sm:w-64 h-9 border border-blue-800 rounded-full px-4">
              <input
                type="text"
                placeholder="Search School Code..."
                className="w-full bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="text-gray-500 hover:text-gray-700">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          
          <div ref={printRef} className="w-full">
            <div className="overflow-x-auto mt-4 -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-gray-700">
                      <th className="p-2 md:p-3">Sl No</th>
                      <th className="p-2 md:p-3">School Code</th>
                      <th className="p-2 md:p-3">School Name</th>
                    
                      <th className="p-2 md:p-3">Data Entered</th>
                      <th className="p-2 md:p-3">Confirmed</th>
                      <th className="p-2 md:p-3">Reset</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm text-center">
                    {currentItems.length > 0 ? (
                      currentItems.map((school) => (
                        <tr key={school.slno} className="hover:bg-gray-200">
                          <td className="p-2 md:p-3">{school.slno}</td>
                          <td className="p-2 md:p-3">{school.code}</td>
                          <td className="p-2 md:p-3">{school.name}</td>
                          <td className="p-2 md:p-3">{school.dataEntered}</td>
                          <td className="p-2 md:p-3">{school.confirmed}</td>
                          <td className="p-2 md:p-3">
                            <i className="text-blue-500 fa-solid fa-arrow-rotate-right"></i>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="p-4 text-center text-gray-600">
                          No schools found matching your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Enhanced Responsive Pagination with icons */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
                {/* Showing X of Y rows */}
                <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
                  {filteredSchools.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredSchools.length)} of ${filteredSchools.length} rows` : '0 rows'}
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
      </div>
    </>
  );
};

export default SClusterScl
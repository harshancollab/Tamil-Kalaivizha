import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useNavigate, useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const AdminUser = () => {
    const [Allresultentry, setResultentry] = useState([]);
    const navigate = useNavigate();
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    // Add missing state variables
    const [searchCode, setSearchCode] = useState('');
    const [filterParam, setFilterParam] = useState('');

    const [loading, setLoading] = useState(false);

    // Select dropdown state variables
    const [selectedSubDistrict, setSelectedSubDistrict] = useState('Select');
    const [selectedDistrict, setSelectedDistrict] = useState('Select');
    const [selectedUserType, setSelectedUserType] = useState('Select');

    // Available options for each dropdown
    const [availableSubDistricts, setAvailableSubDistricts] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [availableUserTypes, setAvailableUserTypes] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Data for dropdowns - full lists
    const allSubDistricts = [
        'Select',
        'Munnar',
        'Adimali',
        'Kattappana',
        'Nedumkandam',
        'Chittur',
        'Pattambi',
        'Devikulam',
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

    const allUserTypes = [
        'Select',
        'State Admin',
        'District Admin',
        'Sub-district Admin',
        'All Admin'
    ];

    const districtToSubDistrict = {
        'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
        'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
        'Ernakulam': [],
        'Kozhikode': ['vatakara'],
        'Wayanad': [],
        'Thrissur': []
    };

    const userTypeToDistrictAccess = {
        'State Admin': allDistricts.filter(d => d !== 'Select'),
        'District Admin': allDistricts.filter(d => d !== 'Select'),
        'Sub-district Admin': allDistricts.filter(d => d !== 'Select'),
        'All Admin': allDistricts.filter(d => d !== 'Select')
    };

    // Initialize available options
    useEffect(() => {
        setAvailableSubDistricts(allSubDistricts);
        setAvailableDistricts(allDistricts);
        setAvailableUserTypes(allUserTypes);

        // Load admin users when component mounts
        getAllAdminuser();
    }, []);

    // Initialize from URL params
    useEffect(() => {
        const codeParam = searchParams.get('code');
        const pParam = searchParams.get('p');

        if (codeParam) {
            setSearchCode(codeParam);
        }

        if (pParam) {
            setFilterParam(pParam);

            // Set dropdown values based on the p parameter
            if (allSubDistricts.includes(pParam)) {
                setSelectedSubDistrict(pParam);
                // Find matching district for this sub-district
                for (const [district, subDistricts] of Object.entries(districtToSubDistrict)) {
                    if (subDistricts.includes(pParam)) {
                        setSelectedDistrict(district);
                        break;
                    }
                }
            } else if (allDistricts.includes(pParam)) {
                setSelectedDistrict(pParam);
                // Update available sub-districts based on selected district
                updateAvailableSubDistricts(pParam);
            } else if (allUserTypes.includes(pParam)) {
                setSelectedUserType(pParam);
                // Update available districts based on user type
                if (pParam !== 'Select') {
                    const availableDists = ['Select', ...userTypeToDistrictAccess[pParam]];
                    setAvailableDistricts(availableDists);
                }
            }
        }
    }, [searchParams]);

    // Function to update available sub-districts based on selected district
    const updateAvailableSubDistricts = (district) => {
        if (district && district !== 'Select') {
            const subDistricts = districtToSubDistrict[district] || [];
            setAvailableSubDistricts(['Select', ...subDistricts]);
            if (subDistricts.length === 0 || !subDistricts.includes(selectedSubDistrict)) {
                setSelectedSubDistrict('Select');
            }
        } else {
            setAvailableSubDistricts(allSubDistricts);
        }
    };

    // Function to update available districts based on selected user type
    const updateAvailableDistricts = (userType) => {
        if (userType && userType !== 'Select') {
            const districts = userTypeToDistrictAccess[userType] || [];
            setAvailableDistricts(['Select', ...districts]);
            if (!districts.includes(selectedDistrict) && selectedDistrict !== 'Select') {
                setSelectedDistrict('Select');
                updateAvailableSubDistricts('Select');
            }
        } else {
            setAvailableDistricts(allDistricts);
        }
    };

    // Implement the API functions that were commented out
    const getAllAdminuserAPI = async (reqHeader) => {
        try {
            // Replace this with your actual API call when available
            const response = await fetch('/api/adminuser', {
                method: 'GET',
                headers: reqHeader
            });
            return {
                status: 200,
                data: [] // This would normally be response.json()
            };
        } catch (error) {
            console.error("Error fetching admin users:", error);
            throw error;
        }
    };

    const getAllAdminuser = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                setLoading(true);
                const result = await getAllAdminuserAPI(reqHeader);
                if (result.status === 200) {
                    setResultentry(result.data);
                }
            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false);
            }
        }
    }

    // Handle edit user
    const handleEditRedirect = (resultEntry) => {
        navigate(`/EditUser/${resultEntry.slNo}`, {
            state: { resultEntry }
        });
    };

    // Handle delete user
    const handleDeleteClick = async (id) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                setLoading(true);
                // Implement deleteAdminuserAPI when available
                // await deleteAdminuserAPI(id, reqHeader);
                getAllAdminuser();
                console.log("Delete clicked for ID:", id);
            } catch (err) {
                console.log(err);
                // Add appropriate error handling here
            } finally {
                setLoading(false);
            }
        }
    }

    const generatePDF = () => {
        // Create a new div element for PDF content
        const pdfContent = document.createElement('div');

        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = "Admin User List";
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);

        // Add filter information if any filter is applied
        if (selectedDistrict !== 'Select' || selectedSubDistrict !== 'Select' || selectedUserType !== 'Select') {
            const filterInfo = document.createElement('div');
            filterInfo.style.marginBottom = '15px';
            filterInfo.style.fontSize = '12px';
            filterInfo.style.textAlign = 'center';

            const filterDetails = [];
            if (selectedDistrict !== 'Select') filterDetails.push(`District: ${selectedDistrict}`);
            if (selectedSubDistrict !== 'Select') filterDetails.push(`Sub District: ${selectedSubDistrict}`);
            if (selectedUserType !== 'Select') filterDetails.push(`User Type: ${selectedUserType}`);

            filterInfo.textContent = `Filters Applied: ${filterDetails.join(' | ')}`;
            pdfContent.appendChild(filterInfo);
        }

        // Create table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '20px';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Headers for the PDF table
        const headers = ['Sl No', 'User Name', 'User Type'];
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

        // Use filtered data for PDF
        const filteredData = filteredResultData();

        filteredData.forEach((result, index) => {
            const row = document.createElement('tr');

            // Add cells
            const cellData = [
                index + 1, // Adjust serial number
                result.regNo || '-',
                result.code || '-'

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

        // Footer with date and time
        const footer = document.createElement('div');
        footer.style.marginTop = '30px';
        footer.style.fontSize = '10px';
        footer.style.textAlign = 'right';
        footer.style.color = '#666';

        const currentDate = new Date();
        const dateTimeStr = currentDate.toLocaleString();
        footer.textContent = `Generated on: ${dateTimeStr}`;

        pdfContent.appendChild(footer);

        // PDF filename
        const fileName = 'Admin_User_List.pdf';

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

    // Function to print directly to printer
    const handlePrintTable = () => {
        const printWindow = window.open('', '_blank');

        // Create print content
        printWindow.document.write(`
            <html>
                <head>
                    <title>Admin User List</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                        }
                        h2 {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .filter-info {
                            text-align: center;
                            margin-bottom: 15px;
                            font-size: 12px;
                            color: #666;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: center;
                        }
                        th {
                            background-color: #f2f2f2;
                            font-weight: bold;
                        }
                        .footer {
                            margin-top: 30px;
                            font-size: 10px;
                            text-align: right;
                            color: #666;
                        }
                        @media print {
                            .no-print {
                                display: none;
                            }
                        }
                    </style>
                </head>
                <body>
                    <h2>Admin User List</h2>
        `);

        // Add filter information if any filter is applied
        if (selectedDistrict !== 'Select' || selectedSubDistrict !== 'Select' || selectedUserType !== 'Select') {
            const filterDetails = [];
            if (selectedDistrict !== 'Select') filterDetails.push(`District: ${selectedDistrict}`);
            if (selectedSubDistrict !== 'Select') filterDetails.push(`Sub District: ${selectedSubDistrict}`);
            if (selectedUserType !== 'Select') filterDetails.push(`User Type: ${selectedUserType}`);

            printWindow.document.write(`
                <div class="filter-info">
                    Filters Applied: ${filterDetails.join(' | ')}
                </div>
            `);
        }

        // Add table
        printWindow.document.write('<table>');
        printWindow.document.write(`
            <thead>
                <tr>
                    <th>Sl No</th>
                    <th>User Name</th>
                    <th>User Type</th>
                  
                </tr>
            </thead>
        `);

        // Add table body with data
        printWindow.document.write('<tbody>');

        const filteredData = filteredResultData();

        if (filteredData.length === 0) {
            printWindow.document.write(`
                <tr>
                    <td colspan="5" style="text-align: center; padding: 20px;">
                        No data available
                    </td>
                </tr>
            `);
        } else {
            filteredData.forEach((result, index) => {
                printWindow.document.write(`
                    <tr>
                        <td>${index + 1}</td>
                        <td>${result.regNo || '-'}</td>
                        <td>${result.code || '-'}</td>
                      
                    </tr>
                `);
            });
        }

        printWindow.document.write('</tbody>');
        printWindow.document.write('</table>');

        // Add footer
        const currentDate = new Date();
        const dateTimeStr = currentDate.toLocaleString();
        printWindow.document.write(`
            <div class="footer">
                Generated on: ${dateTimeStr}
            </div>
        `);

        // Add print button
        printWindow.document.write(`
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print();" style="padding: 8px 16px; background-color: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Print
                </button>
                <button onclick="window.close();" style="padding: 8px 16px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                    Close
                </button>
            </div>
        `);

        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
    };

    // Dummy data
    const resultData = [
        { slNo: 1, regNo: "Idukii", code: "District Admin", district: "Idukki", subDistrict: "Munnar", mark2: 78, mark3: 92, total: 255, markPercentage: 85, rank: 2, grade: "A", point: 9.5 },
        { slNo: 2, regNo: "Palakkad", code: "District Admin", district: "Palakkad", subDistrict: "Chittur", mark2: 88, mark3: 95, total: 273, markPercentage: 91, rank: 1, grade: "A+", point: 10.0 },
        { slNo: 3, regNo: "Kozhikode", code: "District Admin", mark1: 75, district: "Kozhikode", subDistrict: "vatakara", mark3: 88, total: 245, markPercentage: 82, rank: 3, grade: "A-", point: 9.0 },
        { slNo: 4, regNo: "Munnar", code: "Sub-district Admin", district: "Idukki", subDistrict: "Munnar", mark2: 72, mark3: 76, total: 216, markPercentage: 72, rank: 7, grade: "B+", point: 8.0 },
        { slNo: 5, regNo: "Kattapana", code: "Sub-district Admin", district: "Idukki", subDistrict: "Kattappana", mark2: 80, mark3: 88, total: 260, markPercentage: 87, rank: 4, grade: "A", point: 9.5 },
        { slNo: 6, regNo: "Chittur", code: "Sub-district Admin", mark1: 78, mark2: 75, district: "Palakkad", subDistrict: "Chittur", total: 235, markPercentage: 78, rank: 5, grade: "B+", point: 8.5 },
        { slNo: 7, regNo: "Kochi", code: "District Admin", district: "Ernakulam", subDistrict: "Edapally" },
        { slNo: 8, regNo: "Pattambi", code: "Sub-district Admin", mark1: 78, mark2: 75, district: "Palakkad", subDistrict: "Pattambi", total: 235, markPercentage: 78, rank: 5, grade: "B+", point: 8.5 },
        { slNo: 9, regNo: "Kuzhalmannam", code: "Sub-district Admin", district: "Palakkad", subDistrict: "Kuzhalmannam" },
        { slNo: 10, regNo: "Nemmara", code: "Sub-district Admin", district: "Palakkad", subDistrict: "Nemmara" },
        { slNo: 11, regNo: "Mannarkkad", code: "Sub-district Admin", district: "Palakkad", subDistrict: "Mannarkkad" },
    ];

    // Filter results based on search code and dropdown selections
    const filteredResultData = () => {
        let filtered = [...resultData];

        // First filter by code if present
        if (searchCode) {
            filtered = filtered.filter(result =>
                result.code && result.code.toLowerCase().includes(searchCode.toLowerCase())
            );
        }

        // Filter by selected District
        if (selectedDistrict !== 'Select') {
            filtered = filtered.filter(result =>
                result.district === selectedDistrict
            );
        }

        // Filter by selected Sub District
        if (selectedSubDistrict !== 'Select') {
            filtered = filtered.filter(result =>
                result.subDistrict === selectedSubDistrict
            );
        }

        // Filter by selected User Type
        if (selectedUserType !== 'Select') {
            filtered = filtered.filter(result =>
                result.code === selectedUserType
            );
        }

        return filtered;
    };

    // Reset pagination when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchCode, selectedDistrict, selectedSubDistrict, selectedUserType]);

    // Pagination logic
    const filteredData = filteredResultData();
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

    const handleAddClick = () => {
        navigate('/AddUser');
    };

    // Handle select changes with connected dropdown logic
    const handleSubDistrictChange = (e) => {
        const value = e.target.value;
        setSelectedSubDistrict(value);

        // If a specific sub-district is selected, find and set its district
        if (value !== 'Select') {
            // Find which district this sub-district belongs to
            for (const [district, subDistricts] of Object.entries(districtToSubDistrict)) {
                if (subDistricts.includes(value)) {
                    setSelectedDistrict(district);
                    break;
                }
            }

            // Update URL parameter
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.set('p', value);
            setSearchParams(updatedParams);
        } else {
            // Don't reset district when sub-district is cleared
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.delete('p');
            setSearchParams(updatedParams);
        }
    };

    const handleDistrictChange = (e) => {
        const value = e.target.value;
        setSelectedDistrict(value);

        // Reset sub-district when district changes and update available sub-districts
        updateAvailableSubDistricts(value);
        setSelectedSubDistrict('Select');

        if (value !== 'Select') {
            // Update URL parameter
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.set('p', value);
            setSearchParams(updatedParams);
        } else {
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.delete('p');
            setSearchParams(updatedParams);
        }
    };

    const handleUserTypeChange = (e) => {
        const value = e.target.value;
        setSelectedUserType(value);

        // Reset district and sub-district when user type changes
        setSelectedDistrict('Select');
        setSelectedSubDistrict('Select');

        // Update available districts based on user type
        updateAvailableDistricts(value);

        if (value !== 'Select') {
            // Update URL parameter
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.set('p', value);
            setSearchParams(updatedParams);
        } else {
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.delete('p');
            setSearchParams(updatedParams);
        }
    };

    // Function to determine if District Select should be displayed
    const shouldShowDistrictSelect = () => {
        return selectedUserType === 'District Admin' || selectedUserType === 'Sub-district Admin';
    };

    // Function to determine if Sub District Select should be displayed
    const shouldShowSubDistrictSelect = () => {
        return selectedUserType === 'Sub-district Admin' && selectedDistrict !== 'Select';
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                            Admin User
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                            {/* User Type Select - Always shown */}
                            <div className="relative w-full sm:w-auto">
                                <select
                                    className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                    id="user-type"
                                    value={selectedUserType}
                                    onChange={handleUserTypeChange}
                                >
                                    {availableUserTypes.map((option, index) => (
                                        <option key={`user-type-${index}`} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="user-type"
                                    className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                                >
                                    User Type
                                </label>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>

                            {/* District Select - Shown conditionally */}
                            {shouldShowDistrictSelect() && (
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
                            )}

                            {/* Sub District Select - Shown conditionally */}
                            {shouldShowSubDistrictSelect() && (
                                <div className="relative w-full sm:w-auto">
                                    <select
                                        className="border-blue-800 border text-blue-700 px-3 py-2 pt-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10 peer"
                                        id="sub-district-select"
                                        value={selectedSubDistrict}
                                        onChange={handleSubDistrictChange}
                                        aria-label="Select Sub District"
                                    >
                                        {availableSubDistricts.map((option, index) => (
                                            <option key={`sub-district-${index}`} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="sub-district-select"
                                        className="absolute text-sm text-blue-800 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-4 peer-focus:text-blue-800 left-3"
                                    >
                                        Sub District
                                    </label>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>
                            )}

                            {/* Add User button */}
                            <button
                                onClick={handleAddClick}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400 border border-blue-500 py-2 px-6 rounded-full flex items-center justify-center shrink-0 w-full sm:w-auto hover:shadow-md transition-all duration-300"
                            >
                                Add User
                            </button>

                            {/* Print button */}
                            <button
                                onClick={generatePDF}
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-10 rounded-full w-full sm:w-auto "
                            >
                                Print
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                        <div ref={printRef} className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <div className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full text-center border-separate border-spacing-y-2 print-table">
                                        <thead className="bg-gray-50">
                                            <tr className="text-gray-700">
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Sl No</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">User Name</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">User Type</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Edit</th>
                                                <th className="p-2 md:p-3 whitespace-nowrap text-xs sm:text-sm">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-xs sm:text-sm">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="7" className="p-4 text-center text-gray-500">
                                                        Loading...
                                                    </td>
                                                </tr>
                                            ) : currentItems.length > 0 ? (
                                                currentItems.map((result, index) => (
                                                    <tr key={result.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.regNo}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{result.code}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                                            <button
                                                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                                onClick={() => handleEditRedirect(result)}
                                                            >
                                                                <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                                                            </button>
                                                        </td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">
                                                            <button onClick={() => handleDeleteClick(result.slNo)} className="text-red-600 hover:text-red-800 focus:outline-none">
                                                                <i className="fa-solid fa-trash cursor-pointer"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="p-4 text-center text-gray-500">
                                                        {searchCode || selectedDistrict !== 'Select District' || selectedSubDistrict !== 'Select Sub District' || selectedUserType !== 'Select User Type' ?
                                                            `No results found with the current filters`
                                                            : 'No results available'}
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
                            {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
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

export default AdminUser
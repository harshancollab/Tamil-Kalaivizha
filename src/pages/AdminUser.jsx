// It Admin user
import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { useNavigate, useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import Alert from '../components/Alert'
import { getAllAdminuserAPI, deleteAdminUserAPI } from '../services/allAPI';

const AdminUser = () => {
    const [adminUsers, setAdminUsers] = useState([]);
    const navigate = useNavigate();
    const printRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    // Add missing state variables
    const [searchCode, setSearchCode] = useState('');
    const [filterParam, setFilterParam] = useState('');

    // Alert state
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success'
    });

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
    const [totalCount, setTotalCount] = useState(0);

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;

    // Data for dropdowns - full lists
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

    const allUserTypes = [
        'Select',
        'State Admin',
        'District Admin',
        'Sub-district Admin',
        'All Admin',
        'It Admin'  // Added "It Admin" to match the user data
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
        'It Admin': allDistricts.filter(d => d !== 'Select'),
        'All Admin': allDistricts.filter(d => d !== 'Select')
    };

    // Set loading initially and show splash screen
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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
        // Get all params
        const codeParam = searchParams.get('code');
        const districtParam = searchParams.get('district');
        const subDistrictParam = searchParams.get('subdistrict');
        const userTypeParam = searchParams.get('usertype');
        const pParam = searchParams.get('p');

        // First handle primary filter parameters
        if (codeParam) {
            setSearchCode(codeParam);
        }

        // Initialize user type from usertype parameter or p parameter
        let userType = 'Select';
        if (userTypeParam && allUserTypes.includes(userTypeParam)) {
            userType = userTypeParam;
        } else if (pParam && allUserTypes.includes(pParam)) {
            userType = pParam;
        }
        setSelectedUserType(userType);

        // Initialize district
        let district = 'Select';
        if (districtParam && allDistricts.includes(districtParam)) {
            district = districtParam;
        } else if (pParam && allDistricts.includes(pParam)) {
            district = pParam;
        }
        setSelectedDistrict(district);

        // Update available sub-districts based on selected district
        if (district !== 'Select') {
            const subDistricts = districtToSubDistrict[district] || [];
            setAvailableSubDistricts(['Select', ...subDistricts]);
        }

        // Initialize sub-district
        let subDistrict = 'Select';
        if (subDistrictParam && allSubDistricts.includes(subDistrictParam)) {
            subDistrict = subDistrictParam;
        } else if (pParam && allSubDistricts.includes(pParam)) {
            subDistrict = pParam;
        }

        // Only set sub-district if it belongs to selected district
        if (subDistrict !== 'Select' && district !== 'Select') {
            const validSubDistricts = districtToSubDistrict[district] || [];
            if (validSubDistricts.includes(subDistrict)) {
                setSelectedSubDistrict(subDistrict);
            }
        }

        // Set general filter param
        if (pParam) {
            setFilterParam(pParam);
        }

        // Call the API with the filter params
        getAllAdminuser();
    }, [searchParams]);

    // Function to update available sub-districts based on selected district
    const updateAvailableSubDistricts = (district) => {
        if (district && district !== 'Select') {
            const subDistricts = districtToSubDistrict[district] || [];
            setAvailableSubDistricts(['Select', ...subDistricts]);
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

    const getAllAdminuser = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                setLoading(true);

                // Build query params for filters
                let queryParams = new URLSearchParams();
                queryParams.append('page', currentPage);
                queryParams.append('limit', rowsPerPage);

                if (selectedUserType !== 'Select') {
                    queryParams.append('userType', selectedUserType);
                }

                if (selectedDistrict !== 'Select') {
                    queryParams.append('district', selectedDistrict);
                }

                if (selectedSubDistrict !== 'Select') {
                    queryParams.append('subDistrict', selectedSubDistrict);
                }

                if (searchCode) {
                    queryParams.append('code', searchCode);
                }

                const result = await getAllAdminuserAPI(reqHeader, queryParams.toString());

                if (result.status === 200) {
                    
                    const userData = result.data.users || result.data || [];
                    setAdminUsers(userData);
                    setTotalCount(result.data.totalCount || userData.length || 0);
                } else {
                    showAlert("Failed to fetch admin users", "error");
                }
            } catch (err) {
                console.log(err);
                showAlert("Error fetching admin users", "error");
            } finally {
                setLoading(false);
            }
        } else {
            showAlert("Authentication required", "error");
            navigate('/login');
        }
    }

    // Re-fetch data when filters or pagination changes
    useEffect(() => {
        getAllAdminuser();
    }, [currentPage, rowsPerPage]);

    const handleEditRedirect = (user) => {
        const params = new URLSearchParams();

        if (selectedUserType !== 'Select') {
            params.append('usertype', selectedUserType);
        }

        if (selectedDistrict !== 'Select') {
            params.append('district', selectedDistrict);
        }

        if (selectedSubDistrict !== 'Select') {
            params.append('subdistrict', selectedSubDistrict);
        }

        if (searchCode) {
            params.append('code', searchCode);
        }

        params.append('returnUrl', `/AdminUser?${searchParams.toString()}`);

        // Make sure user has the correct ID property
        const userId = user._id || user.id;

        navigate(`/EditUser/${userId}`, {
            state: {
                resultEntry: user,
                filterParams: params.toString()
            }
        });
    };

    // Handle delete user
    const handleDeleteClick = async (id) => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            showAlert("Authentication token not found", "error");
            return;
        }

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        try {
            setLoading(true);

            const confirmDelete = window.confirm("Are you sure you want to delete this user?");
            if (!confirmDelete) {
                setLoading(false);
                return;
            }

            // Add the API function call for delete
            const result = await deleteAdminUserAPI(id, reqHeader);

            if (result.status === 200) {
                showAlert("User deleted successfully");
                getAllAdminuser();
            } else {
                showAlert("Failed to delete user", "error");
            }

        } catch (err) {
            console.error("Error deleting user:", err);

            if (err.response) {
                if (err.response.status === 401) {
                    showAlert("Session expired. Please login again.", "error");
                    navigate('/login');
                } else if (err.response.status === 403) {
                    showAlert("You don't have permission to delete this user", "error");
                } else if (err.response.status === 404) {
                    showAlert("User not found. It may have been already deleted.");
                    getAllAdminuser();
                } else {
                    showAlert(`Error: ${err.response.data.message || "Failed to delete user"}`, "error");
                }
            } else if (err.request) {
                showAlert("Server is not responding. Please try again later.", "error");
            } else {
                showAlert("An error occurred while trying to delete the user", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    // Get filtered users based on all filters
    const filteredAdminUsers = () => {
        return adminUsers;
    };

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchCode, selectedDistrict, selectedSubDistrict, selectedUserType]);

    const currentItems = filteredAdminUsers();
    const totalPages = Math.ceil(totalCount / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const generatePDF = () => {
        const pdfContent = document.createElement('div');

        const titleElement = document.createElement('h2');
        titleElement.textContent = "Admin User List";
        titleElement.style.textAlign = 'center';
        titleElement.style.margin = '20px 0';
        titleElement.style.fontWeight = 'bold';
        pdfContent.appendChild(titleElement);

        if (selectedDistrict !== 'Select' || selectedSubDistrict !== 'Select' || selectedUserType !== 'Select') {
            const filterInfo = document.createElement('div');
            filterInfo.style.marginBottom = '15px';
            filterInfo.style.fontSize = '12px';
            filterInfo.style.textAlign = 'center';

            const filterDetails = [];
            if (selectedDistrict !== 'Select') filterDetails.push(`District: ${selectedDistrict}`);
            if (selectedSubDistrict !== 'Select') filterDetails.push(`Sub District: ${selectedSubDistrict}`);
            if (selectedUserType !== 'Select') filterDetails.push(`User Type: ${selectedUserType}`);

            filterInfo.textContent = ` ${filterDetails.join(' | ')}`;
            pdfContent.appendChild(filterInfo);
        }

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '20px';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

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

        const tbody = document.createElement('tbody');

        const users = filteredAdminUsers();

        users.forEach((user, index) => {
            const row = document.createElement('tr');

            const cellData = [
                index + 1,
                user.username || user.name || '-',  // Use user.name as fallback
                user.userType || user.user_type || '-'  // Use user.user_type as fallback
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

        const footer = document.createElement('div');
        footer.style.marginTop = '30px';
        footer.style.fontSize = '10px';
        footer.style.textAlign = 'right';
        footer.style.color = '#666';

        const currentDate = new Date();
        const dateTimeStr = currentDate.toLocaleString();
        footer.textContent = `Generated on: ${dateTimeStr}`;

        pdfContent.appendChild(footer);

        const fileName = 'Admin_User_List.pdf';

        const options = {
            margin: 10,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(pdfContent).set(options).save();
    };

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

    const handleAddClick = () => {
        const params = new URLSearchParams();

        params.append('redirect', `/AdminUser?${searchParams.toString()}`);

        if (selectedUserType !== 'Select') {
            params.append('userType', selectedUserType);
        }

        if (selectedDistrict !== 'Select') {
            params.append('district', selectedDistrict);
        }

        if (selectedSubDistrict !== 'Select') {
            params.append('subDistrict', selectedSubDistrict);
        }

        const queryString = params.toString();
        navigate(`/AddUser?${queryString}`);
    };

    const shouldShowDistrictSelect = () => {
        return selectedUserType === 'District Admin' || selectedUserType === 'Sub-district Admin';
    };

    const shouldShowSubDistrictSelect = () => {
        return selectedUserType === 'Sub-district Admin' && selectedDistrict !== 'Select';
    };

    const handleSubDistrictChange = (e) => {
        const value = e.target.value;
        setSelectedSubDistrict(value);

        const updatedParams = new URLSearchParams(searchParams);

        if (value !== 'Select') {
            updatedParams.set('subdistrict', value);
            updatedParams.set('p', value);

            for (const [district, subDistricts] of Object.entries(districtToSubDistrict)) {
                if (subDistricts.includes(value)) {
                    setSelectedDistrict(district);
                    updatedParams.set('district', district);
                    break;
                }
            }
        } else {
            updatedParams.delete('subdistrict');
            if (searchParams.get('p') === searchParams.get('subdistrict')) {
                updatedParams.delete('p');
            }
        }

        setSearchParams(updatedParams);
    };

    const handleDistrictChange = (e) => {
        const value = e.target.value;
        setSelectedDistrict(value);

        setSelectedSubDistrict('Select');
        updateAvailableSubDistricts(value);

        const updatedParams = new URLSearchParams(searchParams);

        if (value !== 'Select') {
            updatedParams.set('district', value);
            updatedParams.set('p', value);
            updatedParams.delete('subdistrict');
        } else {
            updatedParams.delete('district');
            updatedParams.delete('subdistrict');

            if (searchParams.get('p') === searchParams.get('district')) {
                updatedParams.delete('p');
            }
        }

        setSearchParams(updatedParams);
    };

    const handleUserTypeChange = (e) => {
        const value = e.target.value;
        setSelectedUserType(value);

        setSelectedDistrict('Select');
        setSelectedSubDistrict('Select');
        updateAvailableDistricts(value);

        const updatedParams = new URLSearchParams(searchParams);

        if (value !== 'Select') {
            updatedParams.set('usertype', value);
            updatedParams.set('p', value);
            updatedParams.delete('district');
            updatedParams.delete('subdistrict');
        } else {
            updatedParams.delete('usertype');
            updatedParams.delete('district');
            updatedParams.delete('subdistrict');
            updatedParams.delete('p');
        }

        setSearchParams(updatedParams);
    };

    // Show splash screen if loading
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
                    <div className="flex flex-col mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                            <h2 className="text-[20px] font-[700] leading-[100%] tracking-[2%]">
                                Admin User
                            </h2>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-4 mt-4 sm:mt-0">
                                <button
                                    onClick={handleAddClick}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-400 border border-blue-500 py-2 px-6 rounded-full flex items-center justify-center shrink-0 w-full sm:w-auto hover:shadow-md transition-all duration-300"
                                >
                                    Add User
                                </button>
                                <button
                                    onClick={generatePDF}
                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-10 rounded-full w-full sm:w-auto"
                                >
                                    Print
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 sm:justify-end">
                            {shouldShowSubDistrictSelect() && (
                                <div className="relative w-full sm:w-auto animate-fadeIn transition-all duration-300 transform origin-top">
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
                            {shouldShowDistrictSelect() && (
                                <div className="relative w-full sm:w-auto animate-fadeIn transition-all duration-300 transform origin-top">
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
                                                    <td colSpan="5" className="p-4 text-center text-gray-500">
                                                        Loading...
                                                    </td>
                                                </tr>
                                            ) : currentItems.length > 0 ? (
                                                currentItems.map((user, index) => (
                                                    <tr key={user._id || user.slNo} className="hover:bg-gray-100">
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{user.username || user.regNo}</td>
                                                        <td className="p-2 md:p-3 whitespace-nowrap">{user.userType || user.code}</td>
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


                </div>
            </div>
        </>
    )
}

export default AdminUser




//  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
//                                         <div className="text-sm text-gray-600 text-center md:text-left flex items-center justify-center md:justify-start">
//                                             {filteredData.length > 0 ? `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} rows` : '0 rows'}
//                                         </div>
//                                         <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
//                                             <button
//                                                 onClick={() => handlePageChange(currentPage - 1)}
//                                                 disabled={currentPage === 1}
//                                                 className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
//                                             >
//                                                 <i className="fa-solid fa-angle-right transform rotate-180"></i>
//                                                 <span className="hidden sm:inline p-1">Previous</span>
//                                             </button>

//                                             <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
//                                                 {renderPageNumbers().map((page, index) => (
//                                                     <button
//                                                         key={index}
//                                                         onClick={() => page !== '...' && handlePageChange(page)}
//                                                         className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded text-xs sm:text-sm ${currentPage === page ? 'bg-[#305A81] text-white' : 'bg-gray-200 hover:bg-gray-300'
//                                                             } ${page === '...' ? 'pointer-events-none' : ''}`}
//                                                     >
//                                                         {page}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                             <button
//                                                 onClick={() => handlePageChange(currentPage + 1)}
//                                                 disabled={currentPage === totalPages || totalPages === 0}
//                                                 className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 text-xs sm:text-sm flex items-center"
//                                             >
//                                                 <span className="hidden sm:inline p-1">Next</span>
//                                                 <i className="fa-solid fa-angle-right"></i>
//                                             </button>
//                                         </div>
//                                     </div>



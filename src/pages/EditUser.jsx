// It Admin user - edit user

import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
// import { updateUserAPI, getUserByIdAPI } from '../services/allAPI'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

const EditUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useParams(); // Get userId from URL params
    
    const params = new URLSearchParams(location.search);
    const redirectUrl = params.get('redirect') || '/admin-panel';

    const allUserTypes = [
        'Select User Type',
        'State Admin',
        'District Admin',
        'Sub-district Admin'
    ];
    
    const allKalolsavams = [
        'Select Kalolsavam',
        'Idukki District Kalolsavam',
        'Ernakulam District Kalolsavam',
        'Palakkad District Kalolsavam',
        'Kozhikode District Kalolsavam',
        'Wayanad District Kalolsavam',
        'Thrissur District Kalolsavam',
        'Ottapalam District Kalolsavam'
    ];
    
    const kalolsavamToSubKalolsavam = {
        'Idukki District Kalolsavam': ['Munnar  Kalolsavam', 'Adimali  Kalolsavam', 'Kattappana  Kalolsavam', 'Nedumkandam', 'Devikulam'],
        'Palakkad District Kalolsavam': ['Chittur   Kalolsavam', 'Pattambi  Kalolsavam', 'Kuzhalmannam  Kalolsavam' , 'Nemmara', 'Mannarkkad', 'Ottapalam'],
        'Ernakulam District Kalolsavam': [],
        'Kozhikode District Kalolsavam': ['vatakara'],
        'Wayanad District Kalolsavam': [],
        'Thrissur District Kalolsavam': []
    };

    const [formData, setFormData] = useState({
        username: "",
        password: "", // For edit, password might be optional
        userType: "",
        kalolsavam: "", 
        subKalolsavam: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        userType: "",
        kalolsavam: "", 
        subKalolsavam: ""
    });

    const [touched, setTouched] = useState({
        username: false,
        password: false,
        userType: false,
        kalolsavam: false,
        subKalolsavam: false
    });

    const [filteredKalolsavams, setFilteredKalolsavams] = useState(allKalolsavams);
    const [filteredSubKalolsavams, setFilteredSubKalolsavams] = useState([]);
    const [searchText, setSearchText] = useState({
        kalolsavam: "",
        subKalolsavam: ""
    });
    
    const [dropdownOpen, setDropdownOpen] = useState({
        kalolsavam: false,
        subKalolsavam: false
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    
    // References to detect clicks outside dropdowns
    const kalolsavamDropdownRef = useRef(null);
    const subKalolsavamDropdownRef = useRef(null);

    // Fetch user data when component mounts
    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const fetchUserData = async () => {
        if (!userId) {
            setLoadError("User ID is missing");
            setIsLoading(false);
            return;
        }

        const token = sessionStorage.getItem("token");
        if (!token) {
            setLoadError("Authentication token missing. Please log in again.");
            setIsLoading(false);
            return;
        }

        try {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };

            const result = await getUserByIdAPI(userId, reqHeader);
            if (result.status === 200) {
                const userData = result.data;
                
                // Update form with user data
                setFormData({
                    username: userData.username || "",
                    password: "", // Usually don't pre-fill password for security
                    userType: userData.userType || "",
                    kalolsavam: userData.kalolsavam || "",
                    subKalolsavam: userData.subKalolsavam || ""
                });

                // Make sure available sub-kalolsavams are updated based on the kalolsavam
                if (userData.kalolsavam && userData.kalolsavam !== 'Select Kalolsavam') {
                    const subKalolsavams = kalolsavamToSubKalolsavam[userData.kalolsavam] || [];
                    setFilteredSubKalolsavams(['Select Sub Kalolsavam', ...subKalolsavams]);
                }

                // Update URL parameters
                updateUrlParams({
                    userType: userData.userType,
                    kalolsavam: userData.kalolsavam,
                    subKalolsavam: userData.subKalolsavam
                });
                
                setIsLoading(false);
            } else {
                setLoadError("Failed to load user data");
                setIsLoading(false);
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            setLoadError("Error fetching user data. Please try again.");
            setIsLoading(false);
        }
    };

    // Function to update URL parameters when form values change
    const updateUrlParams = (newFormData) => {
        const params = new URLSearchParams();
        
        // Update URL parameters based on form data
        if (newFormData.userType && newFormData.userType !== 'Select User Type') {
            params.set('userType', newFormData.userType);
        }
        
        if (newFormData.kalolsavam && newFormData.kalolsavam !== 'Select Kalolsavam') {
            params.set('kalolsavam', newFormData.kalolsavam);
        }
        
        if (newFormData.subKalolsavam && newFormData.subKalolsavam !== 'Select Sub Kalolsavam') {
            params.set('subKalolsavam', newFormData.subKalolsavam);
        }
        
        // Preserve the redirect parameter if it exists
        if (redirectUrl && redirectUrl !== '/admin-panel') {
            params.set('redirect', redirectUrl);
        }
        
        // Update the URL without reloading the page
        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.pushState({path: newUrl}, '', newUrl);
    };

    // Update available sub-kalolsavams when kalolsavam changes
    useEffect(() => {
        if (formData.kalolsavam && formData.kalolsavam !== 'Select Kalolsavam') {
            const subKalolsavams = kalolsavamToSubKalolsavam[formData.kalolsavam] || [];
            setFilteredSubKalolsavams(['Select Sub Kalolsavam', ...subKalolsavams]);
            
            // If current subKalolsavam isn't valid for the new kalolsavam, reset it
            if (formData.subKalolsavam && 
                formData.subKalolsavam !== 'Select Sub Kalolsavam' && 
                !subKalolsavams.includes(formData.subKalolsavam)) {
                setFormData(prev => ({
                    ...prev,
                    subKalolsavam: ''
                }));
            }
        } else {
            setFilteredSubKalolsavams(['Select Sub Kalolsavam']);
        }
    }, [formData.kalolsavam]);

    // Filter kalolsavams based on search text
    useEffect(() => {
        if (searchText.kalolsavam) {
            const filtered = allKalolsavams.filter(kalolsavam =>
                kalolsavam.toLowerCase().includes(searchText.kalolsavam.toLowerCase())
            );
            setFilteredKalolsavams(filtered.length > 0 ? filtered : ['No results found']);
        } else {
            setFilteredKalolsavams(allKalolsavams);
        }
    }, [searchText.kalolsavam]);

    // Filter sub-kalolsavams based on search text
    useEffect(() => {
        if (searchText.subKalolsavam && formData.kalolsavam && formData.kalolsavam !== 'Select Kalolsavam') {
            const subKalolsavams = kalolsavamToSubKalolsavam[formData.kalolsavam] || [];
            const filtered = ['Select Sub Kalolsavam', ...subKalolsavams].filter(subKalolsavam =>
                subKalolsavam.toLowerCase().includes(searchText.subKalolsavam.toLowerCase())
            );
            setFilteredSubKalolsavams(filtered.length > 0 ? filtered : ['No results found']);
        } else if (formData.kalolsavam && formData.kalolsavam !== 'Select Kalolsavam') {
            const subKalolsavams = kalolsavamToSubKalolsavam[formData.kalolsavam] || [];
            setFilteredSubKalolsavams(['Select Sub Kalolsavam', ...subKalolsavams]);
        }
    }, [searchText.subKalolsavam, formData.kalolsavam]);

    // Handle clicks outside the dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (kalolsavamDropdownRef.current && !kalolsavamDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({...prev, kalolsavam: false}));
            }
            if (subKalolsavamDropdownRef.current && !subKalolsavamDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({...prev, subKalolsavam: false}));
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed: ${name} = ${value}`);
        
        let newFormData;
        
        if (name === "userType" && value !== "District Admin" && value !== "Sub-district Admin") {
            newFormData = {
                ...formData,
                [name]: value,
                kalolsavam: "",
                subKalolsavam: ""
            };
        } else if (name === "userType" && value === "District Admin") {
            newFormData = {
                ...formData,
                [name]: value,
                subKalolsavam: ""
            };
        } else if (name === "kalolsavam") {
            newFormData = {
                ...formData,
                [name]: value,
                subKalolsavam: ""
            };
            // Close kalolsavam dropdown after selection
            setDropdownOpen(prev => ({...prev, kalolsavam: false}));
            setSearchText(prev => ({...prev, kalolsavam: ""}));
        } else if (name === "subKalolsavam") {
            newFormData = {
                ...formData,
                [name]: value,
            };
            // Close sub-kalolsavam dropdown after selection
            setDropdownOpen(prev => ({...prev, subKalolsavam: false}));
            setSearchText(prev => ({...prev, subKalolsavam: ""}));
        } else {
            newFormData = {
                ...formData,
                [name]: value,
            };
        }
        
        setFormData(newFormData);
        
        // Update URL parameters
        if (name === "userType" || name === "kalolsavam" || name === "subKalolsavam") {
            updateUrlParams(newFormData);
        }
        
        validateField(name, value);
    };

    const handleSearchChange = (e, field) => {
        const { value } = e.target;
        setSearchText(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const toggleDropdown = (field) => {
        setDropdownOpen(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleBlur = (field) => {
        setTouched({
            ...touched,
            [field]: true,
        });
        validateField(field, formData[field]);
    };

    const validateField = (field, value) => {
        let errorMessage = "";

        switch (field) {
            case "username":
                if (!value) errorMessage = "Username is required";
                break;
            case "password":
                // For edit, password might be optional (only validate if entered)
                if (value && value.length < 6) errorMessage = "Password should be at least 6 characters";
                break;
            case "userType":
                if (!value || value === "Select User Type") errorMessage = "User type selection is required";
                break;
            case "kalolsavam":
                if ((formData.userType === "District Admin" || formData.userType === "Sub-district Admin") && 
                    (!value || value === "Select Kalolsavam")) {
                    errorMessage = "Kalolsavam selection is required";
                }
                break;
            case "subKalolsavam":
                if (formData.userType === "Sub-district Admin" && 
                    (!value || value === "Select Sub Kalolsavam")) {
                    errorMessage = "Sub Kalolsavam selection is required";
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: errorMessage,
        }));

        return errorMessage === "";
    };

    const validateForm = () => {
        const fieldValidations = {
            username: validateField("username", formData.username),
            userType: validateField("userType", formData.userType)
        };

        // For edit form, password is optional - only validate if entered
        if (formData.password) {
            fieldValidations.password = validateField("password", formData.password);
        } else {
            fieldValidations.password = true; // Skip password validation if empty (no change)
        }

        // Only validate kalolsavam and subKalolsavam if needed based on userType
        if (formData.userType === "District Admin" || formData.userType === "Sub-district Admin") {
            fieldValidations.kalolsavam = validateField("kalolsavam", formData.kalolsavam);
        }
        
        if (formData.userType === "Sub-district Admin") {
            fieldValidations.subKalolsavam = validateField("subKalolsavam", formData.subKalolsavam);
        }

        setTouched({
            username: true,
            password: formData.password ? true : false, // Only mark as touched if entered
            userType: true,
            kalolsavam: formData.userType === "District Admin" || formData.userType === "Sub-district Admin",
            subKalolsavam: formData.userType === "Sub-district Admin"
        });

        return Object.values(fieldValidations).every(Boolean);
    };

    const handleCancel = () => {
        // Preserve filter parameters when redirecting back
        const filterParams = new URLSearchParams();
        
        // Add the filter parameters that were passed to this page
        if (formData.userType && formData.userType !== "Select User Type") {
            filterParams.append('p', formData.userType);
        } else if (formData.kalolsavam && formData.kalolsavam !== "Select Kalolsavam") {
            filterParams.append('p', formData.kalolsavam);
        } else if (formData.subKalolsavam && formData.subKalolsavam !== "Select Sub Kalolsavam") {
            filterParams.append('p', formData.subKalolsavam);
        }
        
        // Build the URL with filters
        const redirectWithFilters = filterParams.toString() 
            ? `${redirectUrl}?${filterParams.toString()}` 
            : redirectUrl;
        
        navigate(redirectWithFilters);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        
        if (validateForm()) {
            console.log("Form is valid, proceeding with submission");
            
            const reqBody = {
                username: formData.username,
                userType: formData.userType,
                kalolsavam: formData.kalolsavam,
                subKalolsavam: formData.subKalolsavam
            };

            // Only include password if it was changed
            if (formData.password) {
                reqBody.password = formData.password;
            }

            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                   "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                };

                try {
                    const result = await updateUserAPI(userId, reqBody, reqHeader);
                    if (result.status === 200) {
                        alert("User updated successfully");
                        
                        // After successful submission, redirect to the admin page
                        // You can pass additional parameters if needed
                        const successParam = new URLSearchParams();
                        successParam.append('success', 'true');
                        successParam.append('username', reqBody.username);
                        successParam.append('action', 'updated');
                        
                        // Navigate to redirect URL with success parameters
                        navigate(`${redirectUrl}?${successParam.toString()}`);
                    } else {
                        alert(result.response.data || "Failed to update user");
                    }
                } catch (err) {
                    console.log(err);
                    alert("Error updating user. Please try again.");
                }
            } else {
                alert("Authentication token missing. Please log in again.");
            }
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 bg-gray-300 ">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <p>Loading user data...</p>
                        </div>
                    ) : loadError ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-red-500">{loadError}</p>
                        </div>
                    ) : (
                        <form 
                            className="min-h-screen mx-auto p-6 bg-white rounded-lg shadow-md overflow-hidden"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                                    Edit User
                                </h2>
                            </div>
                        
                            <div className="mt-10 flex flex-col items-center">
                                <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                    <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">User Name</label>
                                    <div className="w-full md:w-80">
                                        <input 
                                            type="text" 
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            onBlur={() => handleBlur("username")}
                                            placeholder='Enter Name' 
                                            className='border px-2 py-1 rounded-full w-full border-blue-700' 
                                        />
                                    
                                        {touched.username && errors.username && (
                                            <p className="text-sm text-red-500 mt-1">{errors.username}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                    <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Password</label>
                                    <div className="w-full md:w-80">
                                        <input 
                                            type="password"  
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            onBlur={() => handleBlur("password")}
                                            placeholder='Enter new password (leave empty to keep current)' 
                                            className='border px-2 py-1 rounded-full w-full border-blue-700' 
                                        />
                                      
                                        {touched.password && errors.password && (
                                            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                    <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">User Type</label>
                                    <div className="w-full md:w-80">
                                        <select
                                            name="userType"
                                            value={formData.userType}
                                            onChange={handleInputChange}
                                            onBlur={() => handleBlur("userType")}
                                            className="border px-2 py-1 rounded-full w-full border-blue-600 focus:outline-blue-900"
                                        >
                                            {allUserTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                      
                                        {touched.userType && errors.userType && (
                                            <p className="text-sm text-red-500 mt-1">{errors.userType}</p>
                                        )}
                                    </div>
                                </div>
                                
                                {(formData.userType === "District Admin" || formData.userType === "Sub-district Admin") && (
                                    <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Kalolsavam</label>
                                        <div className="w-full md:w-80">
                                            <div className="relative" ref={kalolsavamDropdownRef}>
                                                {/* Custom kalolsavam dropdown button */}
                                                <div
                                                    onClick={() => toggleDropdown('kalolsavam')}
                                                    className="border px-2 py-1 rounded-full w-full border-blue-600 flex justify-between items-center cursor-pointer bg-white"
                                                >
                                                    <span>{formData.kalolsavam || 'Select Kalolsavam'}</span>
                                                    <span className="text-xs">▼</span>
                                                </div>
                                                
                                                {/* Dropdown menu */}
                                                {dropdownOpen.kalolsavam && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                        {/* Search input */}
                                                        <div className="p-2 border-b">
                                                            <input
                                                                type="text"
                                                                placeholder="Search kalolsavam..."
                                                                value={searchText.kalolsavam}
                                                                onChange={(e) => handleSearchChange(e, 'kalolsavam')}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                        
                                                        {/* Options list */}
                                                        <div className="max-h-48 overflow-y-auto">
                                                            {filteredKalolsavams.map((kalolsavam, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam ? 'bg-blue-200' : ''}`}
                                                                    onClick={() => {
                                                                        if (kalolsavam !== 'No results found') {
                                                                            handleInputChange({
                                                                                target: { name: 'kalolsavam', value: kalolsavam }
                                                                            });
                                                                        }
                                                                    }}
                                                                >
                                                                    {kalolsavam}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {touched.kalolsavam && errors.kalolsavam && (
                                                <p className="text-sm text-red-500 mt-1">{errors.kalolsavam}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {formData.userType === "Sub-district Admin" && 
                                 formData.kalolsavam && 
                                 formData.kalolsavam !== "Select Kalolsavam" && (
                                    <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                        <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Sub Kalolsavam</label>
                                        <div className="w-full md:w-80">
                                            <div className="relative" ref={subKalolsavamDropdownRef}> 
                                                <div
                                                    onClick={() => toggleDropdown('subKalolsavam')}
                                                    className="border px-2 py-1 rounded-full w-full border-blue-600 flex justify-between items-center cursor-pointer bg-white"
                                                >
                                                    <span>{formData.subKalolsavam || 'Select Sub Kalolsavam'}</span>
                                                    <span className="text-xs">▼</span>
                                                </div>
                                                
                                                {dropdownOpen.subKalolsavam && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                        <div className="p-2 border-b">
                                                            <input
                                                                type="text"
                                                                placeholder="Search sub-kalolsavam..."
                                                                value={searchText.subKalolsavam}
                                                                onChange={(e) => handleSearchChange(e, 'subKalolsavam')}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                        
                                                        <div className="max-h-48 overflow-y-auto">
                                                            {filteredSubKalolsavams.map((subKalolsavam, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.subKalolsavam === subKalolsavam ? 'bg-blue-200' : ''}`}
                                                                    onClick={() => {
                                                                        if (subKalolsavam !== 'No results found' && subKalolsavam !== 'Select Sub Kalolsavam') {
                                                                            handleInputChange({
                                                                                target: { name: 'subKalolsavam', value: subKalolsavam }
                                                                            });
                                                                        }
                                                                    }}
                                                                >
                                                                    {subKalolsavam}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {touched.subKalolsavam && errors.subKalolsavam && (
                                                <p className="text-sm text-red-500 mt-1">{errors.subKalolsavam}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="text-right mt-40 mr-40">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="mr-6 bg-gradient-to-r from-[#003566] to-[#05B9F4] bg-clip-text text-transparent border border-blue-600 px-14 py-2 rounded-full"
                                >
                                   Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-2 rounded-full"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default EditUser



// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
// import Dash from '../components/Dash';
// import Header from '../components/Header';
// // import { EditUserAPI, GetUserDetailsAPI } from '../services/allAPI'; 

// const EditUser = () => {
//     const navigate = useNavigate();
//     const [searchParams, setSearchParams] = useSearchParams();
//     const { userId } = useParams(); // Get userId from URL params

//     const userTypeDropdownRef = useRef(null);
//     const districtDropdownRef = useRef(null);
//     const subDistrictDropdownRef = useRef(null);
//     const kalolsavamDropdownRef = useRef(null);

//     const allUserTypes = [
//         'Select User Type',
//         'State Admin',
//         'District Admin',
//         'Sub-district Admin'
//     ];

//     const Kalolsavams = [
//         'Select Kalolsavam',
//         'Kerala State Kalolsavam',
//         'District Kalolsavam',
//         'Sub-district Kalolsavam',
//         'School Kalolsavam'
//     ];

//     const districtKalolsavm = {
//         'Idukki ': [
//             'Select Kalolsavam',
//             'Idukki District Kalolsavam'
//         ],
//         'Ernakulam ': [
//             'Select Kalolsavam',
//             'Ernakulam District Kalolsavam'
//         ],
//         'Palakkad ': [
//             'Select Kalolsavam',
//             'Palakkad District Kalolsavam'
//         ],
//         'Kozhikode': [
//             'Select Kalolsavam',
//             'Kozhikode District Kalolsavam'
//         ],
//         'Wayanad ': [
//             'Select Kalolsavam',
//             'Wayanad District Kalolsavam'
//         ],
//         'Thrissur': [
//             'Select Kalolsavam',
//             'Thrissur District Kalolsavam'
//         ],
//         'Ottapalam': [
//             'Select Kalolsavam',
//             'Ottapalam District Kalolsavam'
//         ]
//     };

//     const allDistricts = [
//         'Select District',
//         'Idukki ',
//         'Ernakulam ',
//         'Palakkad ',
//         'Kozhikode',
//         'Wayanad ',
//         'Thrissur',
//         'Ottapalam'
//     ];

//     const districtToSubDistrict = {
//         'Idukki ': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
//         'Palakkad ': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
//         'Ernakulam ': ['Aluva', 'Kochi', 'Perumbavoor', 'Kothamangalam', 'Muvattupuzha'],
//         'Kozhikode': ['Vatakara', 'Koyilandy', 'Thamarassery', 'Koduvally', 'Balussery'],
//         'Wayanad ': ['Sulthan Bathery', 'Mananthavady', 'Kalpetta', 'Vythiri'],
//         'Thrissur': ['Chalakudy', 'Kodungallur', 'Irinjalakuda', 'Guruvayur', 'Chavakkad']
//     };

//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         userType: '',
//         district: '',
//         subDistrict: '',
//         kalolsavam: ''
//     });

//     const [originalData, setOriginalData] = useState(null); // Store original data for comparison
//     const [isLoading, setIsLoading] = useState(true);
//     const [passwordChanged, setPasswordChanged] = useState(false);

//     const [errors, setErrors] = useState({
//         username: '',
//         password: '',
//         userType: '',
//         district: '',
//         subDistrict: '',
//         kalolsavam: ''
//     });

//     const [dropdownOpen, setDropdownOpen] = useState({
//         userType: false,
//         district: false,
//         subDistrict: false,
//         kalolsavam: false
//     });

//     const [searchText, setSearchText] = useState({
//         userType: '',
//         district: '',
//         subDistrict: '',
//         kalolsavam: ''
//     });

//     const [availableSubDistricts, setAvailableSubDistricts] = useState([]);
//     const [availableKalolsavams, setAvailableKalolsavams] = useState([]);

//     // Fetch user data when component mounts
//     useEffect(() => {
//         const fetchUserData = async () => {
//             setIsLoading(true);
//             try {
//                 const token = sessionStorage.getItem("token");
//                 if (!token) {
//                     alert("Authentication token missing. Please log in again.");
//                     navigate('/login');
//                     return;
//                 }

//                 const reqHeader = {
//                     "Authorization": `Bearer ${token}`
//                 };

//                 // Uncomment this when API is ready
//                 // const result = await GetUserDetailsAPI(userId, reqHeader);
//                 // if (result.status === 200) {
//                 //     const userData = result.data;
//                 //     setFormData(userData);
//                 //     setOriginalData(userData);
//                 // } else {
//                 //     alert("Failed to fetch user details");
//                 //     navigate('/admin-panel');
//                 // }

//                 // Mock data for development - Replace with API call when ready
//                 const mockUserData = {
//                     username: 'testuser123',
//                     password: '', // Password field is often empty in edit forms
//                     userType: 'District Admin',
//                     district: 'Ernakulam ',
//                     subDistrict: '',
//                     kalolsavam: 'Ernakulam District Kalolsavam'
//                 };
                
//                 setFormData(mockUserData);
//                 setOriginalData(mockUserData);
                
//             } catch (err) {
//                 console.error("Error fetching user details:", err);
//                 alert("Error fetching user details. Please try again.");
//                 navigate('/admin-panel');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (userId) {
//             fetchUserData();
//         } else {
//             // If no userId provided, redirect to admin panel
//             navigate('/admin-panel');
//         }
//     }, [userId, navigate]);

//     useEffect(() => {
//         // Set sub-districts based on selected district
//         if (formData.district && districtToSubDistrict[formData.district]) {
//             setAvailableSubDistricts(districtToSubDistrict[formData.district]);
//         } else {
//             setAvailableSubDistricts([]);
//         }

//         // Set kalolsavams based on selected district
//         if (formData.district && districtKalolsavm[formData.district]) {
//             setAvailableKalolsavams(districtKalolsavm[formData.district]);
//         } else {
//             setAvailableKalolsavams(Kalolsavams);
//         }

//         // Reset sub-district and kalolsavam when district changes
//         if (originalData && formData.district !== originalData.district) {
//             setFormData(prev => ({
//                 ...prev,
//                 subDistrict: '',
//                 kalolsavam: ''
//             }));
//         }
//     }, [formData.district, originalData]);

//     useEffect(() => {
//         // Handle district from URL params if any
//         const districtParam = searchParams.get('district');

//         if (districtParam && !formData.district) {
//             setFormData(prev => ({
//                 ...prev,
//                 district: districtParam
//             }));
//         }
//     }, [searchParams, formData.district]);

//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const filteredUserTypes = searchText.userType
//         ? allUserTypes.filter(type =>
//             type.toLowerCase().includes(searchText.userType.toLowerCase()))
//         : allUserTypes;

//     const filteredDistricts = searchText.district
//         ? allDistricts.filter(district =>
//             district.toLowerCase().includes(searchText.district.toLowerCase()))
//         : allDistricts;

//     const filteredSubDistricts = searchText.subDistrict
//         ? availableSubDistricts.filter(subDistrict =>
//             subDistrict.toLowerCase().includes(searchText.subDistrict.toLowerCase()))
//         : availableSubDistricts;

//     const filteredKalolsavams = searchText.kalolsavam
//         ? availableKalolsavams.filter(kalolsavam =>
//             kalolsavam.toLowerCase().includes(searchText.kalolsavam.toLowerCase()))
//         : availableKalolsavams;

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (userTypeDropdownRef.current && !userTypeDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, userType: false }));
//             }
//             if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, district: false }));
//             }
//             if (subDistrictDropdownRef.current && !subDistrictDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, subDistrict: false }));
//             }
//             if (kalolsavamDropdownRef.current && !kalolsavamDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const toggleDropdown = (dropdownName) => {
//         setDropdownOpen(prev => ({
//             ...prev,
//             [dropdownName]: !prev[dropdownName]
//         }));
//     };

//     const handleSearchChange = (e, field) => {
//         setSearchText(prev => ({
//             ...prev,
//             [field]: e.target.value
//         }));
//         e.stopPropagation();
//     };

//     const validateField = (name, value) => {
//         switch (name) {
//             case 'username':
//                 if (!value.trim()) return 'Username is required';
//                 if (value.trim().length < 3) return 'Username must be at least 3 characters long';
//                 return '';

//             case 'password':
//                 // For edit form, password can be empty (unchanged)
//                 if (value && value.trim().length < 6) return 'Password must be at least 6 characters long';
//                 return '';

//             case 'userType':
//                 if (!value.trim() || value === 'Select User Type') return 'User type is required';
//                 return '';

//             case 'district':
//                 if (formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin') {
//                     if (!value.trim() || value === 'Select District') return 'District is required';
//                 }
//                 return '';

//             case 'subDistrict':
//                 if (formData.userType === 'Sub-district Admin') {
//                     if (!value.trim()) return 'Sub-district is required';
//                 }
//                 return '';

//             case 'kalolsavam':
//                 if (formData.district && (!value.trim() || value === 'Select Kalolsavam')) return 'Kalolsavam is required';
//                 return '';

//             default:
//                 return '';
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;

//         // Base fields everyone needs (password not required for edit)
//         let fieldsToValidate = ['username', 'userType'];
        
//         // Validate password only if changed
//         if (formData.password) {
//             fieldsToValidate.push('password');
//         }

//         // Add district requirement for district and sub-district admins
//         if (formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin') {
//             fieldsToValidate.push('district');
//         }

//         // Add sub-district requirement only for sub-district admins
//         if (formData.userType === 'Sub-district Admin') {
//             fieldsToValidate.push('subDistrict');
//         }

//         // Add kalolsavam requirement if district is selected
//         if (formData.district && formData.district !== 'Select District') {
//             fieldsToValidate.push('kalolsavam');
//         }

//         fieldsToValidate.forEach(key => {
//             const error = validateField(key, formData[key]);
//             newErrors[key] = error;
//             if (error) isValid = false;
//         });

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === 'password' && value) {
//             setPasswordChanged(true);
//         }

//         setFormData(prev => ({ ...prev, [name]: value }));

//         if (formSubmitted) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name, value)
//             }));
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         handleChange({
//             target: { name, value }
//         });

//         if (name === 'userType') {
//             setDropdownOpen(prev => ({ ...prev, userType: false }));
//             setSearchText(prev => ({ ...prev, userType: '' }));
//         }
//         if (name === 'district') {
//             setSearchParams({ district: value });
//             setDropdownOpen(prev => ({ ...prev, district: false }));
//             setSearchText(prev => ({ ...prev, district: '' }));
//         }
//         if (name === 'subDistrict') {
//             setDropdownOpen(prev => ({ ...prev, subDistrict: false }));
//             setSearchText(prev => ({ ...prev, subDistrict: '' }));
//         }
//         if (name === 'kalolsavam') {
//             setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
//             setSearchText(prev => ({ ...prev, kalolsavam: '' }));
//         }
//     };

//     const handleCancel = () => {
//         navigate('/admin-panel');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormSubmitted(true);

//         const isValid = validateForm();

//         if (isValid) {
//             console.log("Form submitted:", formData);

//             const token = sessionStorage.getItem("token");

//             if (token) {
//                 const reqHeader = {
//                     "Authorization": `Bearer ${token}`
//                 };

//                 try {
//                     // Prepare the data for submission
//                     const dataToSubmit = { ...formData };
                    
//                     // If password wasn't changed, remove it from submission
//                     if (!passwordChanged) {
//                         delete dataToSubmit.password;
//                     }

//                     console.log("Submitting data:", dataToSubmit);

//                     // Uncomment when API is ready
//                     // const result = await EditUserAPI(userId, dataToSubmit, reqHeader);

//                     // Simulated response for development
//                     const result = { status: 200 };

//                     if (result.status === 200) {
//                         alert('User updated successfully!');
//                         navigate('/admin-panel');
//                     } else {
//                         alert("Failed to update user");
//                     }
//                 } catch (err) {
//                     console.error("Error updating user:", err);
//                     alert("Error updating user. Please try again.");
//                 }
//             } else {
//                 alert("Authentication token missing. Please log in again.");
//             }
//         } else {
//             console.log("Form has errors:", errors);
//         }
//     };

//     // Function to conditionally show/hide fields based on user type selection
//     const shouldShowField = (fieldName) => {
//         switch (fieldName) {
//             case 'district':
//                 return formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin';
//             case 'subDistrict':
//                 return formData.userType === 'Sub-district Admin';
//             case 'kalolsavam':
//                 return formData.district && formData.district !== 'Select District';
//             default:
//                 return true;
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="bg-white min-h-screen">
//                 <Header />
//                 <div className="flex flex-col sm:flex-row">
//                     <Dash />
//                     <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto flex justify-center items-center">
//                             <div className="text-center">
//                                 <p className="text-xl font-bold text-gray-800">Loading user data...</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="bg-white min-h-screen">
//                 <Header />
//                 <div className="flex flex-col sm:flex-row">
//                     <Dash />
//                     <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
//                             <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Edit User</h2>

//                             <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Username</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             placeholder="Enter username"
//                                             value={formData.username}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.username && <p className="text-red-500 text-xs mt-1 ml-2">{errors.username}</p>}
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">New Password</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             placeholder="Leave blank to keep current password"
//                                             value={formData.password}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">User Type</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <div className="relative" ref={userTypeDropdownRef}>
//                                             <div
//                                                 onClick={() => toggleDropdown('userType')}
//                                                 className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.userType ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                             >
//                                                 <span className="text-gray-600">{formData.userType || 'Select User Type'}</span>
//                                                 <span className="text-xs">▼</span>
//                                             </div>
//                                             {dropdownOpen.userType && (
//                                                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                     <div className="p-2 border-b">
//                                                         <input
//                                                             type="text"
//                                                             placeholder="Search user type..."
//                                                             value={searchText.userType}
//                                                             onChange={(e) => handleSearchChange(e, 'userType')}
//                                                             className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                             onClick={(e) => e.stopPropagation()}
//                                                         />
//                                                     </div>
//                                                     <div className="max-h-48 overflow-y-auto">
//                                                         {filteredUserTypes.length > 0 ? (
//                                                             filteredUserTypes.map((type, index) => (
//                                                                 <div
//                                                                     key={index}
//                                                                     className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.userType === type ? 'bg-blue-200' : ''}`}
//                                                                     onClick={() => handleInputChange({
//                                                                         target: { name: 'userType', value: type }
//                                                                     })}
//                                                                 >
//                                                                     {type}
//                                                                 </div>
//                                                             ))
//                                                         ) : (
//                                                             <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         {errors.userType && <p className="text-red-500 text-xs mt-1 ml-2">{errors.userType}</p>}
//                                     </div>
//                                 </div>

//                                 {shouldShowField('district') && (
//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <div className="relative" ref={districtDropdownRef}>
//                                                 <div
//                                                     onClick={() => toggleDropdown('district')}
//                                                     className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.district ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                                 >
//                                                     <span className="text-gray-600">{formData.district || 'Select District'}</span>
//                                                     <span className="text-xs">▼</span>
//                                                 </div>
//                                                 {dropdownOpen.district && (
//                                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                         <div className="p-2 border-b">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search district..."
//                                                                 value={searchText.district}
//                                                                 onChange={(e) => handleSearchChange(e, 'district')}
//                                                                 className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                                 onClick={(e) => e.stopPropagation()}
//                                                             />
//                                                         </div>
//                                                         <div className="max-h-48 overflow-y-auto">
//                                                             {filteredDistricts.length > 0 ? (
//                                                                 filteredDistricts.map((district, index) => (
//                                                                     <div
//                                                                         key={index}
//                                                                         className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.district === district ? 'bg-blue-200' : ''}`}
//                                                                         onClick={() => handleInputChange({
//                                                                             target: { name: 'district', value: district }
//                                                                         })}
//                                                                     >
//                                                                         {district}
//                                                                     </div>
//                                                                 ))
//                                                             ) : (
//                                                                 <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {errors.district && <p className="text-red-500 text-xs mt-1 ml-2">{errors.district}</p>}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {shouldShowField('kalolsavam') && (
//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Kalolsavam</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <div className="relative" ref={kalolsavamDropdownRef}>
//                                                 <div
//                                                     onClick={() => toggleDropdown('kalolsavam')}
//                                                     className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.kalolsavam ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                                 >
//                                                     <span className="text-gray-600">{formData.kalolsavam || 'Select Kalolsavam'}</span>
//                                                     <span className="text-xs">▼</span>
//                                                 </div>
//                                                 {dropdownOpen.kalolsavam && (
//                                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                         <div className="p-2 border-b">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search kalolsavam..."
//                                                                 value={searchText.kalolsavam}
//                                                                 onChange={(e) => handleSearchChange(e, 'kalolsavam')}
//                                                                 className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                                 onClick={(e) => e.stopPropagation()}
//                                                             />
//                                                         </div>
//                                                         <div className="max-h-48 overflow-y-auto">
//                                                             {filteredKalolsavams.length > 0 ? (
//                                                                 filteredKalolsavams.map((kalolsavam, index) => (
//                                                                     <div
//                                                                         key={index}
//                                                                         className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam ? 'bg-blue-200' : ''}`}
//                                                                         onClick={() => handleInputChange({
//                                                                             target: { name: 'kalolsavam', value: kalolsavam }
//                                                                         })}
//                                                                     >
//                                                                         {kalolsavam}
//                                                                     </div>
//                                                                 ))
//                                                             ) : (
//                                                                 <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {errors.kalolsavam && <p className="text-red-500 text-xs mt-1 ml-2">{errors.kalolsavam}</p>}
//                                         </div>
//                                     </div>
//                                 )}

//                                   {shouldShowField('subDistrict') && (
//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Sub-district</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <div className="relative" ref={subDistrictDropdownRef}>
//                                                 <div
//                                                     onClick={() => toggleDropdown('subDistrict')}
//                                                     className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.subDistrict ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${availableSubDistricts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                 >
//                                                     <span className="text-gray-600">{formData.subDistrict || 'Select Sub-district'}</span>
//                                                     <span className="text-xs">▼</span>
//                                                 </div>
//                                                 {dropdownOpen.subDistrict && availableSubDistricts.length > 0 && (
//                                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                         <div className="p-2 border-b">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search sub-district..."
//                                                                 value={searchText.subDistrict}
//                                                                 onChange={(e) => handleSearchChange(e, 'subDistrict')}
//                                                                 className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                                 onClick={(e) => e.stopPropagation()}
//                                                             />
//                                                         </div>
//                                                         <div className="max-h-48 overflow-y-auto">
//                                                             {filteredSubDistricts.length > 0 ? (
//                                                                 filteredSubDistricts.map((subDistrict, index) => (
//                                                                     <div
//                                                                         key={index}
//                                                                         className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.subDistrict === subDistrict ? 'bg-blue-200' : ''}`}
//                                                                         onClick={() => handleInputChange({
//                                                                             target: { name: 'subDistrict', value: subDistrict }
//                                                                         })}
//                                                                     >
//                                                                         {subDistrict}
//                                                                     </div>
//                                                                 ))
//                                                             ) : (
//                                                                 <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {errors.subDistrict && <p className="text-red-500 text-xs mt-1 ml-2">{errors.subDistrict}</p>}
//                                             {formData.district && availableSubDistricts.length === 0 && (
//                                                 <p className="text-amber-600 text-xs mt-1 ml-2">No sub-districts available for the selected district</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}
//                             </form>
//                             <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-10 sm:mt-16 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
//                                 <button
//                                     type="button"
//                                     onClick={handleCancel}
//                                     className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSubmit}
//                                     type="submit"
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
//                                 >
//                                     Update
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default EditUser;

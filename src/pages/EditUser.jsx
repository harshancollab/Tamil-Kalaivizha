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
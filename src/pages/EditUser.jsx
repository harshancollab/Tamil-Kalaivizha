// It Admin user - edit user
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Dash from '../components/Dash'
import Header from '../components/Header'
import Alert from '../components/Alert'
import { editAdminAPI, getsingleAPI } from '../services/allAPI'
import crypto from 'crypto-js'

const EditUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    // Add state for password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Secret key for password decryption
    const Secret_key = import.meta.env.VITE_SECRET_KEY

    console.log("User ID from URL params:", userId);

    // Alert state
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const userTypeDropdownRef = useRef(null);
    const kalolsavamDropdownRef = useRef(null);

    const allUserTypes = [
        'Select User Type',
        "State Admin",
        "District Admin",
        "Sub-District Admin",
        "School Admin",
    ];

    const kalolsavamsByType = {
        'Select User Type': [{ id: '', name: 'Select Kalolsavam' }],
        'State Admin': [
            { id: '', name: 'Select Kalolsavam' },
            { id: '1', name: 'Kerala State Kalolsavam' }
        ],
        'District Admin': [
            { id: '', name: 'Select Kalolsavam' },
            { id: '2', name: 'District Kalolsavam' },
            { id: '3', name: 'Palakkad District Kalolsavam' }
        ],
        'Sub-District Admin': [
            { id: '', name: 'Select Kalolsavam' },
            { id: '4', name: 'Sub-district Kalolsavam' },
            { id: '5', name: 'School Kalolsavam' }
        ],
        'School Admin': [
            { id: '', name: 'Select Kalolsavam' },
            { id: '4', name: 'Sub-district Kalolsavam' },
            { id: '5', name: 'School Kalolsavam' }
        ]
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        userType: '',
        kalolsavam: '',
        kalolsavamId: ''
    });

    const [originalData, setOriginalData] = useState({});
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        userType: '',
        kalolsavam: ''
    });

    const [dropdownOpen, setDropdownOpen] = useState({
        userType: false,
        kalolsavam: false
    });

    const [searchText, setSearchText] = useState({
        userType: '',
        kalolsavam: ''
    });

    const [availableKalolsavams, setAvailableKalolsavams] = useState(kalolsavamsByType['Select User Type']);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredUserTypes = searchText.userType
        ? allUserTypes.filter(type =>
            type.toLowerCase().includes(searchText.userType.toLowerCase()))
        : allUserTypes;

    const filteredKalolsavams = searchText.kalolsavam
        ? availableKalolsavams.filter(kalolsavam =>
            kalolsavam.name.toLowerCase().includes(searchText.kalolsavam.toLowerCase()))
        : availableKalolsavams;

    // Function to decrypt password
    const decryptPassword = (encrypted) => {
        try {
            if (typeof encrypted === 'string') {
                return encrypted;
            }

            if (!encrypted || !encrypted.iv || !encrypted.encryptedData) {
                console.error("Invalid encrypted password format", encrypted);
                return '';
            }

            const { iv, encryptedData } = encrypted;
            const key = crypto.enc.Utf8.parse(Secret_key);
            const ivHex = crypto.enc.Hex.parse(iv);
            const encryptedHexStr = crypto.enc.Hex.parse(encryptedData);
            const encryptedBase64Str = crypto.enc.Base64.stringify(encryptedHexStr);
            const decrypted = crypto.AES.decrypt(encryptedBase64Str, key, {
                iv: ivHex,
                mode: crypto.mode.CBC,
                padding: crypto.pad.Pkcs7,
            });

            const decryptedPassword = decrypted.toString(crypto.enc.Utf8);
            console.log("Password decryption successful");
            return decryptedPassword;
        } catch (error) {
            console.error("Error decrypting password:", error);
            return '';
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);

            console.log("Starting to fetch user data for ID:", userId);

            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    console.error("Authentication token missing");
                    showAlert("Authentication token missing. Please log in again.", 'error');
                    setTimeout(() => navigate('/login'), 2000);
                    return;
                }

                console.log("Auth token found, proceeding with API call");

                const reqHeader = {
                    "Authorization": token,
                };

                // Debugging the API request
                console.log("Making API request to get user data with ID:", userId);

                const result = await getsingleAPI(userId, reqHeader);

                console.log("API Response Status:", result.status);
                console.log("Full API Response:", result);

                if (result.status === 200) {
                    const userData = result.data.user;
                    console.log("User data fetched successfully:", userData);

                    // Store original data for comparison later
                    setOriginalData(userData);
                    console.log("Available fields in user data:", Object.keys(userData));

                    // Decrypt password if available
                    let decryptedPassword = '';
                    if (userData.password) {
                        try {
                            decryptedPassword = decryptPassword(userData.password);
                            console.log("Password decryption attempt completed");
                        } catch (err) {
                            console.error("Failed to decrypt password:", err);
                        }
                    }

                    // Set form data with all user fields including decrypted password
                    setFormData({
                        username: userData.username || '',
                        password: decryptedPassword || '',
                        name: userData.name || '',
                        email: userData.email_address || '',
                        userType: userData.user_type || '',
                        kalolsavam: userData.kalolsavam || '',
                        kalolsavamId: userData.kalolsavam_id || ''
                    });

                    console.log("Form data set with password:", {
                        username: userData.username || '',
                        password: decryptedPassword || '',
                        name: userData.name || '',
                        email: userData.email_address || '',
                        userType: userData.user_type || '',
                        kalolsavam: userData.kalolsavam || '',
                        kalolsavamId: userData.kalolsavam_id || ''
                    });
                } else {
                    console.error("Failed to fetch user data:", result);
                    showAlert("Failed to fetch user data", "error");
                    navigate('/admin-panel');
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                console.error("Error details:", err.response?.data || "No detailed error information available");
                showAlert("Error fetching user data", "error");
                navigate('/admin-panel');
            } finally {
                setLoading(false);
                console.log("Finished fetching user data");
            }
        };

        if (userId) {
            fetchUserData();
        } else {
            console.error("No userId provided");
            showAlert("No user ID provided", "error");
            navigate('/admin-panel');
        }
    }, [userId, navigate]);

    useEffect(() => {
        console.log("Current form data:", {
            ...formData,
            password: formData.password
        });
    }, [formData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userTypeDropdownRef.current && !userTypeDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, userType: false }));
            }
            if (kalolsavamDropdownRef.current && !kalolsavamDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const userType = formData.userType || 'Select User Type';
        setAvailableKalolsavams(kalolsavamsByType[userType] || kalolsavamsByType['Select User Type']);

        if (formData.kalolsavam) {
            const kalolsavamExists = kalolsavamsByType[userType]?.some(k => k.name === formData.kalolsavam);
            if (!kalolsavamExists) {
                setFormData(prev => ({
                    ...prev,
                    kalolsavam: '',
                    kalolsavamId: ''
                }));
            }
        }
    }, [formData.userType]);

    const toggleDropdown = (dropdownName) => {
        setDropdownOpen(prev => ({
            ...prev,
            [dropdownName]: !prev[dropdownName]
        }));
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleSearchChange = (e, field) => {
        setSearchText(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        e.stopPropagation();
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                if (!value.trim()) return 'Username is required';
                if (value.trim().length < 3) return 'Username must be at least 3 characters long';
                return '';

            case 'password':
                if (value.trim() && value.trim().length < 6) return 'Password must be at least 6 characters long';
                return '';

            case 'name':
                if (!value.trim()) return 'Name is required';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';

            case 'userType':
                if (!value.trim() || value === 'Select User Type') return 'User type is required';
                return '';

            case 'kalolsavam':
                if (!value.trim() || value === 'Select Kalolsavam') return 'Kalolsavam is required';
                return '';

            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        const fieldsToValidate = ['username', 'name', 'email', 'userType', 'kalolsavam'];
        if (formData.password.trim()) fieldsToValidate.push('password');

        fieldsToValidate.forEach(key => {
            const error = validateField(key, formData[key]);
            newErrors[key] = error;
            if (error) isValid = false;
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (formSubmitted) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'kalolsavam') {
            const selectedKalolsavam = availableKalolsavams.find(k => k.name === value);
            if (selectedKalolsavam) {
                setFormData(prev => ({
                    ...prev,
                    kalolsavam: value,
                    kalolsavamId: selectedKalolsavam.id
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    kalolsavam: value,
                    kalolsavamId: ''
                }));
            }
        } else {
            handleChange({
                target: { name, value }
            });
        }

        if (name === 'userType') {
            setDropdownOpen(prev => ({ ...prev, userType: false }));
            setSearchText(prev => ({ ...prev, userType: '' }));
        }
        if (name === 'kalolsavam') {
            setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
            setSearchText(prev => ({ ...prev, kalolsavam: '' }));
        }
    };

    const handleCancel = () => {
        const returnUrl = searchParams.get('returnUrl') || '/admin-panel';
        navigate(returnUrl);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (isSubmitting) return;

        const isValid = validateForm();
        if (!isValid) {
            // showAlert("Please fix the errors in the form", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                showAlert("Authentication token missing", "error");
                navigate('/login');
                return;
            }

            const reqHeader = {
                "Authorization": token,
                "Content-Type": "application/json"
            }

            const reqBody = {
                username: formData.username,
                name: formData.name,
                email: formData.email,
                decryptPassword: formData.password,
                user_type: formData.userType,
                kalolsavam: formData.kalolsavam,
                kalolsavam_id: formData.kalolsavamId
            };

            // Include password in request body if it has been changed
            const originalPasswordDecrypted = originalData.password ? decryptPassword(originalData.password) : '';
            if (formData.password && formData.password !== originalPasswordDecrypted) {
                reqBody.password = formData.password;
                console.log("Password has changed, including in request");
            } else {
                console.log("Password unchanged, not including in request");
            }

            console.log("Submitting form with data:", {
                ...reqBody,
                password: reqBody.password
            });

            const result = await editAdminAPI(userId, reqBody, reqHeader);

            console.log("Update API response:", result);

            if (result.status === 200) {
                showAlert("User updated successfully", "success");
                setTimeout(() => {
                    const returnUrl = searchParams.get('returnUrl') || '/admin-panel';
                    navigate(returnUrl);
                }, 1500);
            } else {
                showAlert(result.response?.data?.message || "Failed to update user", "error");
            }
        } catch (err) {
            console.error("Error updating user:", err);
            console.error("Error details:", err.response?.data || "No detailed error information available");
            showAlert(err.response?.data?.message || "Error updating user", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Dash />
                    <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-gray-600">Loading user data...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="bg-white min-h-screen">
                <Header />
                <div className="flex flex-col sm:flex-row">
                    <Dash />

                    <div className="fixed top-5 right-5 z-50">
                        {alert.show && (
                            <Alert
                                message={alert.message}
                                type={alert.type}
                                onClose={hideAlert}
                                duration={5000}
                            />
                        )}
                    </div>

                    <div className="flex-1 p-2 sm:p-4 bg-gray-300">
                        <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
                            <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Edit User</h2>

                            <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Full Name</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Email</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Username</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Enter username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.username && <p className="text-red-500 text-xs mt-1 ml-2">{errors.username}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Password</label>
                                    <div className="w-full sm:w-2/3 relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter password"
                                            value={formData.password}  // Fixed: removed decryptPassword call
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white pr-10`}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                // Eye icon when password is visible
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            ) : (
                                                // Eye-slash icon when password is hidden
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            )}
                                        </button>
                                        {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">User Type</label>
                                    <div className="w-full sm:w-2/3">
                                        <div className="relative" ref={userTypeDropdownRef}>
                                            <div
                                                onClick={() => toggleDropdown('userType')}
                                                className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.userType ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <span className="text-gray-600">{formData.userType || 'Select User Type'}</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                            {dropdownOpen.userType && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    <div className="p-2 border-b">
                                                        <input
                                                            type="text"
                                                            placeholder="Search user type..."
                                                            value={searchText.userType}
                                                            onChange={(e) => handleSearchChange(e, 'userType')}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                    <div className="max-h-48 overflow-y-auto">
                                                        {filteredUserTypes.length > 0 ? (
                                                            filteredUserTypes.map((type, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.userType === type ? 'bg-blue-200' : ''}`}
                                                                    onClick={() => handleInputChange({
                                                                        target: { name: 'userType', value: type }
                                                                    })}
                                                                >
                                                                    {type}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-2 text-gray-500">No results found</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {errors.userType && <p className="text-red-500 text-xs mt-1 ml-2">{errors.userType}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Kalolsavam</label>
                                    <div className="w-full sm:w-2/3">
                                        <div className="relative" ref={kalolsavamDropdownRef}>
                                            <div
                                                onClick={() => toggleDropdown('kalolsavam')}
                                                className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.kalolsavam ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <span className="text-gray-600">{formData.kalolsavam || 'Select Kalolsavam'}</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                            {dropdownOpen.kalolsavam && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    <div className="p-2 border-b">
                                                        <input
                                                            type="text"
                                                            placeholder="Search kalolsavam..."
                                                            value={searchText.kalolsavam}
                                                            onChange={(e) => handleSearchChange(e, 'kalolsavam')}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                    <div className="max-h-48 overflow-y-auto">
                                                        {filteredKalolsavams.length > 0 ? (
                                                            filteredKalolsavams.map((kalolsavam, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam.name ? 'bg-blue-200' : ''}`}
                                                                    onClick={() => handleInputChange({
                                                                        target: { name: 'kalolsavam', value: kalolsavam.name }
                                                                    })}
                                                                >
                                                                    {kalolsavam.name}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-2 text-gray-500">No results found</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {errors.kalolsavam && <p className="text-red-500 text-xs mt-1 ml-2">{errors.kalolsavam}</p>}
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-10 sm:mt-16 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUser





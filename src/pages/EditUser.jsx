// It Admin user - edit user

import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Dash from '../components/Dash'
import Header from '../components/Header'
import Alert from '../components/Alert'
import { editAdminAPI, getsingleAPI } from '../services/allAPI'

const EditUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    // Debug log for userId
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
                    "Authorization": token
                };

                // Debugging the API request
                console.log("Making API request to get user data with ID:", userId);

                const result = await getsingleAPI(userId, reqHeader);

                console.log("API Response Status:", result.status);
                console.log("Full API Response:", result);

                if (result.status === 200) {

                    const userData = result.data.user;
                    console.log("User data fetched successfully:", userData);

                    setOriginalData(userData);


                    console.log("Available fields in user data:", Object.keys(userData));

                    setFormData({
                        username: userData.username || '',
                        password: '',
                        name: userData.name || '',
                        email: userData.email_address || '',
                        userType: userData.user_type || '',
                        kalolsavam: userData.kalolsavam || '',
                        kalolsavamId: userData.kalolsavam_id || ''
                    });

                    console.log("Form data set:", {
                        username: userData.username || '',
                        // password omitted for security
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
        console.log("Current form data:", formData);
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
            };

            const reqBody = {
                username: formData.username,
                name: formData.name,
                email: formData.email,
                user_type: formData.userType,
                kalolsavam: formData.kalolsavam,
                kalolsavam_id: formData.kalolsavamId
            };

            if (formData.password.trim()) {
                reqBody.password = formData.password;
            }

            console.log("Submitting form with data:", {
                ...reqBody,
                password: formData.password ? "[PASSWORD ENTERED]" : "[NOT CHANGED]"
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
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter new password (leave blank to keep current)"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
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





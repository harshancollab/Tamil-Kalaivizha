import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
import Alert from '../components/Alert';
import { AddItemAPI, getAllFestivelAPI } from '../services/allAPI';

const AddItem = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    // Alert state
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const festivalDropdownRef = useRef(null);
    const stageDropdownRef = useRef(null);

    const [festivalOptions, setFestivalOptions] = useState([]);
    const stageOptions = [
        "ON Stage",
        "Off Stage",
    ];

    const [formData, setFormData] = useState({
        itemCode: '',
        itemName: '',
        festival: '',
        itemType: '',
        maxStudents: '',
        pinnany: '0',
        duration: '',
        stageType: '',
        festivel_id: '' // Add festivel_id to the form data
    });

    const [errors, setErrors] = useState({
        itemCode: '',
        itemName: '',
        festival: '',
        itemType: '',
        maxStudents: '',
        duration: '',
        stageType: ''
    });

    const [dropdownOpen, setDropdownOpen] = useState({
        festival: false,
        stageType: false
    });

    const [searchText, setSearchText] = useState({
        festival: '',
        stageType: ''
    });

    useEffect(() => {
        const fetchFestivals = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                try {
                    const result = await getAllFestivelAPI(reqHeader);
                    console.log("API Response:", result); // Log the entire response

                    if (result && result.status === 200 && result.data && result.data.festivel && Array.isArray(result.data.festivel)) {
                        // Access the 'festivel' array from the 'data' object
                        setFestivalOptions(result.data.festivel.map(f => ({ name: f.festivel_name, id: f._id }))); // Map to include ID
                    } else {
                        showAlert("Failed to load festivals.", 'error');
                    }
                } catch (error) {
                    console.error("Error fetching festivals:", error);
                    showAlert("Error fetching festivals.", 'error');
                } finally {
                    setLoading(false);
                }
            } else {
                showAlert("Authentication token missing. Please log in again.", 'error');
                setLoading(false);
            }
        };

        fetchFestivals();

        const festivalParam = searchParams.get('festival');
        if (festivalParam) {
            setFormData(prev => ({
                ...prev,
                festival: festivalParam
            }));
        }
    }, [searchParams]);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const filteredFestivals = searchText.festival
        ? festivalOptions.filter(festival =>
            festival.name.toLowerCase().includes(searchText.festival.toLowerCase()))
        : festivalOptions;

    const filteredStages = searchText.stageType
        ? stageOptions.filter(stage =>
            stage.toLowerCase().includes(searchText.stageType.toLowerCase()))
        : stageOptions;

    useEffect(() => {
        function handleClickOutside(event) {
            if (festivalDropdownRef.current && !festivalDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, festival: false }));
            }
            if (stageDropdownRef.current && !stageDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, stageType: false }));
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
            case 'itemCode':
                if (!value.trim()) return 'Item code is required';
                if (value.trim().length < 3) return 'Item code must be at least 3 characters long';
                return '';

            case 'itemName':
                if (!value.trim()) return 'Item name is required';
                return '';

            case 'festival':
                if (!value.trim()) return 'Festival is required';
                return '';

            case 'itemType':
                if (!value.trim()) return 'Item type is required';
                return '';

            case 'maxStudents':
                if (!value.trim()) return 'Maximum students is required';
                if (isNaN(value) || parseInt(value) <= 0) return 'Please enter a valid number';
                return '';

            case 'duration':
                if (!value.trim()) return 'Duration is required';
                return '';

            case 'stageType':
                if (!value.trim()) return 'Stage Type is required';
                return '';

            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        const fieldsToValidate = ['itemCode', 'itemName', 'festival', 'itemType', 'maxStudents', 'duration', 'stageType'];

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

    const handleFestivalSelect = (festival) => {
        setFormData(prev => ({
            ...prev,
            festival: festival.name,
            festivel_id: festival.id // Set the festivel_id
        }));
        setSearchParams({ festival: festival.name });
        setDropdownOpen(prev => ({ ...prev, festival: false }));
        setSearchText(prev => ({ ...prev, festival: '' }));
    };

    const handleStageTypeSelect = (stageType) => {
        setFormData(prev => ({
            ...prev,
            stageType: stageType
        }));
        setDropdownOpen(prev => ({ ...prev, stageType: false }));
        setSearchText(prev => ({ ...prev, stageType: '' }));
    };

    const handleCancel = () => {
        if (formData.festival) {
            navigate(`/ItemRegistrationList?festival=${encodeURIComponent(formData.festival)}`);
        } else {
            navigate('/ItemRegistrationList');
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

        const isValid = validateForm();

        if (isValid) {
            console.log("Form submitted:", formData);

            const token = sessionStorage.getItem("token");

            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };

                try {
                    const dataToSubmit = {
                        item_code: formData.itemCode,
                        item_name: formData.itemName,
                        item_type: formData.itemType,
                        stage_type: formData.stageType,
                        duration: formData.duration,
                        max_no_of_students: parseInt(formData.maxStudents, 10),
                        pinnany_limit: parseInt(formData.pinnany, 10),
                        festivel_id: formData.festivel_id
                    };

                    console.log("Submitting data:", dataToSubmit);

                    const result = await AddItemAPI(dataToSubmit, reqHeader);


                    // Simulated success response for development


                    if (result && result.status === 200) {
                        showAlert('Item added successfully!');
                        setFormData({
                            itemCode: '',
                            itemName: '',
                            festival: '',
                            itemType: '',
                            maxStudents: '',
                            pinnany: '0',
                            duration: '',
                            stageType: '',
                            festivel_id: ''
                        });
                        setFormSubmitted(false);
                        if (formData.festival) {
                            navigate(`/ItemRegistrationList?festival=${encodeURIComponent(formData.festival)}`);
                        } else {
                            navigate('/ItemRegistrationList');
                        }
                    } else {
                        showAlert(`Failed to add item: ${result?.data?.message || 'Unknown error'}`, 'error');
                    }
                } catch (err) {
                    console.error("Error adding item:", err);
                    showAlert("Error adding item. Please try again.", 'error');
                }
            } else {
                showAlert("Authentication token missing. Please log in again.", 'error');
            }
        } else {
            console.log("Form has errors:", errors);
        }
    };

    return (
        <>
            <div className="bg-white min-h-screen">
                <Header />
                <div className="flex flex-col sm:flex-row">
                    <Dash />
                    {alert.show && (
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={hideAlert}
                            duration={5000}
                        />
                    )}
                    <div className="flex-1 p-2 sm:p-4 bg-gray-300">
                        <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
                            <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Add Item</h2>

                            <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Item Code</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="itemCode"
                                            placeholder="Enter Item Code"
                                            value={formData.itemCode}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.itemCode ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.itemCode && <p className="text-red-500 text-xs mt-1 ml-2">{errors.itemCode}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Item Name</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            name="itemName"
                                            placeholder="Enter Item Name"
                                            value={formData.itemName}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.itemName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.itemName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.itemName}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival</label>
                                    <div className="w-full sm:w-2/3">
                                        <div className="relative" ref={festivalDropdownRef}>
                                            <div
                                                onClick={() => toggleDropdown('festival')}
                                                className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.festival ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <span className="text-gray-600">{formData.festival || 'Select Festival'}</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                            {dropdownOpen.festival && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    <div className="p-2 border-b">
                                                        <input
                                                            type="text"
                                                            placeholder="Search festival..."
                                                            value={searchText.festival}
                                                            onChange={(e) => handleSearchChange(e, 'festival')}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                    <div className="max-h-48 overflow-y-auto">
                                                        {filteredFestivals.length > 0 ? (
                                                            filteredFestivals.map((festival, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.festival === festival.name ? 'bg-blue-200' : ''}`}
                                                                    onClick={() => handleFestivalSelect(festival)}
                                                                >
                                                                    {festival.name}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-2 text-gray-500">No results found</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {errors.festival && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festival}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Item Type</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            name="itemType"
                                            placeholder="Enter Item Type"
                                            value={formData.itemType}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.itemType ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.itemType && <p className="text-red-500 text-xs mt-1 ml-2">{errors.itemType}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Maximum Students</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            name="maxStudents"
                                            type="number"
                                            min="1"
                                            placeholder="Enter Maximum Students"
                                            value={formData.maxStudents}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.maxStudents ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.maxStudents && <p className="text-red-500 text-xs mt-1 ml-2">{errors.maxStudents}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Pinnany</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            name="pinnany"
                                            type="number"
                                            min="0"
                                            placeholder="Enter Pinnany (optional)"
                                            value={formData.pinnany}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 border border-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white"
                                        />
                                        <p className="text-gray-500 text-xs mt-1 ml-2">Optional field. Will default to 0 if left blank.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Duration</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            name="duration"
                                            placeholder="Enter Duration (e.g., 5 minutes)"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.duration ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.duration && <p className="text-red-500 text-xs mt-1 ml-2">{errors.duration}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Stage Type</label>
                                    <div className="w-full sm:w-2/3">
                                        <div className="relative" ref={stageDropdownRef}>
                                            <div
                                                onClick={() => toggleDropdown('stageType')}
                                                className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.stageType ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <span className="text-gray-600">{formData.stageType || 'Select Stage Type'}</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                            {dropdownOpen.stageType && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    {/* Search input */}
                                                    <div className="p-2 border-b">
                                                        <input
                                                            type="text"
                                                            placeholder="Search stage type..."
                                                            value={searchText.stageType}
                                                            onChange={(e) => handleSearchChange(e, 'stageType')}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                    <div className="max-h-48 overflow-y-auto">
                                                        {filteredStages.length > 0 ? (
                                                            filteredStages.map((stage, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.stageType === stage ? 'bg-blue-200' : ''}`}
                                                                    onClick={() => handleInputChange({
                                                                        target: { name: 'stageType', value: stage }
                                                                    })}
                                                                >
                                                                    {stage}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-2 text-gray-500">No results found</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {errors.stageType && <p className="text-red-500 text-xs mt-1 ml-2">{errors.stageType}</p>}
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-32 sm:mt-32 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
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
                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddItem
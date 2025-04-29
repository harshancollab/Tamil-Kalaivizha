import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
// import { GetItemByIdAPI, UpdateItemAPI } from '../services/allAPI'; 

const EditItem = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { itemId } = useParams(); // Get item ID from URL params
    const festivalDropdownRef = useRef(null);
    const stageDropdownRef = useRef(null);

    const festivalOptions = [
        "UP Tamilkalaivizha",
        "LP Tamilkalaivizha",
        "Hs Tamilkalaivizha",
        "Hss Tamilkalaivizha"
    ];
    
    const stageOptions = [
        "ON Stage",
        "Off Stage",
    ];

    const [formData, setFormData] = useState({
        festivalName: '',      
        fromClass: '',         
        festival: '',          
        itemType: '',          
        maxStudents: '',    
        pinnany: '0',          
        duration: '',
        stageType: ''         
    });

    const [errors, setErrors] = useState({
        festivalName: '',
        fromClass: '',
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

    const [isLoading, setIsLoading] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Fetch item data when component mounts
    useEffect(() => {
        const fetchItemData = async () => {
            if (!itemId) {
                setIsLoading(false);
                return;
            }

            const token = sessionStorage.getItem("token");
            if (!token) {
                alert("Authentication token missing. Please log in again.");
                navigate('/login');
                return;
            }

            try {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };

                // In a real implementation, uncomment this:
                // const response = await GetItemByIdAPI(itemId, reqHeader);
                // if (response.status === 200) {
                //     setFormData(response.data);
                // }
                
              
                // Simulated API response
                setTimeout(() => {
                    const mockData = {
                        festivalName: 'ITEM001',
                        fromClass: 'Group Song',
                        festival: 'UP Tamilkalaivizha',
                        itemType: 'Group',
                        maxStudents: '10',
                        pinnany: '2',
                        duration: '5 minutes',
                        stageType: 'ON Stage'
                    };
                    setFormData(mockData);
                    setIsLoading(false);
                }, 500);
                
            } catch (err) {
                console.error("Error fetching item:", err);
                alert("Error fetching item data. Please try again.");
                setIsLoading(false);
            }
        };

        fetchItemData();
    }, [itemId, navigate]);

    // Set festival from URL param if available
    useEffect(() => {
        const festivalParam = searchParams.get('festival');
        
        if (festivalParam && !formData.festival) {
            setFormData(prev => ({
                ...prev,
                festival: festivalParam
            }));
        }
    }, [searchParams, formData.festival]);

    const filteredFestivals = searchText.festival
        ? festivalOptions.filter(festival =>
            festival.toLowerCase().includes(searchText.festival.toLowerCase()))
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
            case 'festivalName':
                if (!value.trim()) return 'Item code is required';
                if (value.trim().length < 3) return 'Item code must be at least 3 characters long';
                return '';

            case 'fromClass':
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
        
        const fieldsToValidate = ['festivalName', 'fromClass', 'festival', 'itemType', 'maxStudents', 'duration', 'stageType'];
        
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

        handleChange({
            target: { name, value }
        });

        if (name === 'festival') {
            setDropdownOpen(prev => ({ ...prev, festival: false }));
            setSearchText(prev => ({ ...prev, festival: '' }));
        }
        if (name === 'stageType') {
            setDropdownOpen(prev => ({ ...prev, stageType: false }));
            setSearchText(prev => ({ ...prev, stageType: '' }));
        }
    };

    const handleCancel = () => {
        if (formData.festival) {
            navigate(`/ItemRegistrationList?festival=${encodeURIComponent(formData.festival)}`);
        } else {
            navigate('/ItemRegistrationList');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const isValid = validateForm();

        if (isValid) {
            console.log("Form submitted for update:", formData);

            const token = sessionStorage.getItem("token");

            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                
                try {
                    const dataToSubmit = {
                        ...formData,
                        pinnany: formData.pinnany.trim() === '' ? '0' : formData.pinnany
                    };
                    
                    console.log("Submitting update data:", dataToSubmit);
                    
                   
                    // const result = await UpdateItemAPI(itemId, dataToSubmit, reqHeader);
                    
                  
                    const result = { status: 200 };
                    
                    if (result.status === 200) {
                        alert('Item updated successfully!');

                        if (formData.festival) {
                            navigate(`/ItemRegistrationList?festival=${encodeURIComponent(formData.festival)}`);
                        } else {
                            navigate('/ItemRegistrationList');
                        }
                    } else {
                        alert("Failed to update item");
                    }
                } catch (err) {
                    console.error("Error updating item:", err);
                    alert("Error updating item. Please try again.");
                }
            } else {
                alert("Authentication token missing. Please log in again.");
            }
        } else {
            console.log("Form has errors:", errors);
        }
    };

    if (isLoading) {
        return (
            <>
                <div className="bg-white min-h-screen">
                    <Header />
                    <div className="flex flex-col sm:flex-row">
                        <Dash />
                        <div className="flex-1 p-2 sm:p-4 bg-gray-300">
                            <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto flex justify-center items-center">
                                <p className="text-gray-600">Loading item data...</p>
                            </div>
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
                    <div className="flex-1 p-2 sm:p-4 bg-gray-300">
                        <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
                            <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Edit Item</h2>

                            <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Item Code</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="festivalName"
                                            placeholder="Enter Item Code"
                                            value={formData.festivalName}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.festivalName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.festivalName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festivalName}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Item Name</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            name="fromClass"
                                            placeholder="Enter Item Name"
                                            value={formData.fromClass}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.fromClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.fromClass && <p className="text-red-500 text-xs mt-1 ml-2">{errors.fromClass}</p>}
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
                                                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.festival === festival ? 'bg-blue-200' : ''}`}
                                                                    onClick={() => handleInputChange({
                                                                        target: { name: 'festival', value: festival }
                                                                    })}
                                                                >
                                                                    {festival}
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
                                            placeholder="Enter Duration"
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
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-16 sm:mt-32 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
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
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditItem;
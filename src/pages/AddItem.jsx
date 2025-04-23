import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';

const AddItem = () => {
    const navigate = useNavigate();
    
    // Reference for festival dropdown
    const festivalDropdownRef = useRef(null);

    // Festival options
    const festivalOptions = [
        "UP Tamilkalaivizha", 
        "LP Tamilkalaivizha", 
        "Hs Tamilkalaivizha", 
        "Hss Tamilkalaivizha", 
        "All Festival"
    ];

    // State for form data
    const [formData, setFormData] = useState({
        festivalName: '',
        fromClass: '',
        toClass: '',
        festival: ''
    });

    // State for validation errors
    const [errors, setErrors] = useState({
        festivalName: '',
        fromClass: '',
        toClass: '',
        festival: ''
    });

    // State for dropdown management
    const [dropdownOpen, setDropdownOpen] = useState({
        festival: false
    });

    // State for search functionality
    const [searchText, setSearchText] = useState({
        festival: ''
    });

    // Track if form was submitted to show all errors
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Filter festivals based on search text
    const filteredFestivals = searchText.festival
        ? festivalOptions.filter(festival => 
            festival.toLowerCase().includes(searchText.festival.toLowerCase()))
        : festivalOptions;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (festivalDropdownRef.current && !festivalDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({...prev, festival: false}));
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle dropdown visibility
    const toggleDropdown = (dropdownName) => {
        setDropdownOpen(prev => ({
            ...prev,
            [dropdownName]: !prev[dropdownName]
        }));
    };

    // Handle search input changes
    const handleSearchChange = (e, field) => {
        setSearchText(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        e.stopPropagation();
    };

    // Validate a single field
    const validateField = (name, value) => {
        switch (name) {
            case 'festivalName':
                if (!value.trim()) return 'Festival name is required';
                if (value.trim().length < 3) return 'Festival name must be at least 3 characters long';
                return '';
                
            case 'fromClass':
                if (!value.trim()) return 'From class is required';
                return '';
                
            case 'festival':
                if (!value.trim()) return 'Festival is required';
                return '';
                
            default:
                return '';
        }
    };

    // Validate all fields and return if form is valid
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validate each field
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            newErrors[key] = error;
            if (error) isValid = false;
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Update form data
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate field if form was already submitted
        if (formSubmitted) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
        }
    };

    // Handle input change including dropdowns
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        handleChange({
            target: { name, value }
        });
        
        // Close dropdown after selection
        if (name === 'festival') {
            setDropdownOpen(prev => ({...prev, festival: false}));
            setSearchText(prev => ({...prev, festival: ''}));
        }
    };

    const handleCancel = () => {
        navigate('/ItemRegistrationList');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        
        // Validate all fields
        const isValid = validateForm();
        
        if (isValid) {
            console.log("Form submitted:", formData);
            
            // Get token from session storage
            const token = sessionStorage.getItem("token");
            
            if (token) {
                try {
                    // Simulating successful submission
                    alert('Item added successfully!');
                    
                    // Reset form after successful submission
                    setFormData({
                        festivalName: '',
                        fromClass: '',
                        toClass: '',
                        festival: ''
                    });
                    setFormSubmitted(false);
                    
                    // Navigate back to the list page
                    navigate('/ItemRegistrationList');
                } catch (err) {
                    console.error("Error adding item:", err);
                    alert("Error adding item. Please try again.");
                }
            } else {
                alert("Authentication token missing. Please log in again.");
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
                    <div className="flex-1 p-2 sm:p-4 bg-gray-300">
                        <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
                            <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add Item</h2>

                            <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                {/* Item Code Field */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Item Code</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="festivalName"
                                            placeholder="Enter Item Code "
                                            value={formData.festivalName}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.festivalName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.festivalName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festivalName}</p>}
                                    </div>
                                </div>

                                {/* Item Name Field */}
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

                                {/* Festival Dropdown Field */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival</label>
                                    <div className="w-full sm:w-2/3">
                                        <div className="relative" ref={festivalDropdownRef}>
                                            {/* Custom festival dropdown button */}
                                            <div
                                                onClick={() => toggleDropdown('festival')}
                                                className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.festival ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <span className="text-gray-600">{formData.festival || 'Select Festival'}</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                            
                                            {/* Dropdown menu */}
                                            {dropdownOpen.festival && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    {/* Search input */}
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
                                                    
                                                    {/* Options list */}
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

export default AddItem;
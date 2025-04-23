import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
// import { AddFestivalAPI } from '../services/allAPI';

const AddFestival = () => {
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        festivalName: '',
        fromClass: '',
        toClass: ''
    });

    // State for validation errors
    const [errors, setErrors] = useState({
        festivalName: '',
        fromClass: '',
        toClass: ''
    });

    // Track if form was submitted to show all errors
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Validate a single field
    const validateField = (name, value, allValues = formData) => {
        switch (name) {
            case 'festivalName':
                if (!value.trim()) return 'Festival name is required';
                if (value.trim().length < 3) return 'Festival name must be at least 3 characters long';
                return '';
                
            case 'fromClass':
                if (!value.trim()) return 'From class is required';
                if (isNaN(value)) return 'Class must be a number';
                return '';
                
            case 'toClass':
                if (!value.trim()) return 'To class is required';
                if (isNaN(value)) return 'Class must be a number';
                
                // Check if toClass is greater than fromClass
                const fromClassNum = parseInt(allValues.fromClass);
                const toClassNum = parseInt(value);
                
                if (!isNaN(fromClassNum) && !isNaN(toClassNum) && toClassNum <= fromClassNum) {
                    return 'To Class must be greater than From Class';
                }
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
            const error = validateField(key, formData[key], formData);
            newErrors[key] = error;
            if (error) isValid = false;
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Update form data
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Validate field if form was already submitted
        if (formSubmitted) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value, updatedFormData)
            }));
            
            // If changing fromClass, also revalidate toClass
            if (name === 'fromClass' && updatedFormData.toClass) {
                setErrors(prev => ({
                    ...prev,
                    toClass: validateField('toClass', updatedFormData.toClass, updatedFormData)
                }));
            }
        }
    };

    const handleCancel = () => {
        navigate('/FestivalRegiList');
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
                // Set up request header with token
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                
                try {
                    // Uncomment this when API is ready
                    // const result = await AddFestivalAPI(formData, reqHeader);
                    
                    // For now, simulating successful API call
                    const result = { status: 200 };
                    
                    if (result.status === 200) {
                        alert('Festival added successfully!');
                        
                        // Reset form after successful submission
                        setFormData({
                            festivalName: '',
                            fromClass: '',
                            toClass: ''
                        });
                        setFormSubmitted(false);
                        
                        // Navigate back to the list page
                        navigate('/FestivalList');
                    } else {
                        alert("Failed to add festival");
                    }
                } catch (err) {
                    console.error("Error adding festival:", err);
                    alert("Error adding festival. Please try again.");
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
                            <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add Festival</h2>

                            <form  className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                {/* Festival Name Field */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="festivalName"
                                            placeholder="Enter Festival "
                                            value={formData.festivalName}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.festivalName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.festivalName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festivalName}</p>}
                                    </div>
                                </div>

                                {/* From Class Field */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">From Class</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="number"
                                            name="fromClass"
                                            placeholder="Enter  Class"
                                            value={formData.fromClass}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.fromClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.fromClass && <p className="text-red-500 text-xs mt-1 ml-2">{errors.fromClass}</p>}
                                    </div>
                                </div>

                                {/* To Class Field */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">To Class</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="number"
                                            name="toClass"
                                            placeholder="Enter Class "
                                            value={formData.toClass}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.toClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.toClass && <p className="text-red-500 text-xs mt-1 ml-2">{errors.toClass}</p>}
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
                                    <button onClick={handleSubmit}
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

export default AddFestival;
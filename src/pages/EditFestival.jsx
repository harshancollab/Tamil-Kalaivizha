import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
// import { GetFestivalByIdAPI, UpdateFestivalAPI } from '../services/allAPI';

const EditFestival = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get festival ID from URL parameters
    
    // State for form data with only festivalName
    const [formData, setFormData] = useState({
        festivalName: ''
    });

    // State for validation errors
    const [errors, setErrors] = useState({
        festivalName: ''
    });

    // Track if form was submitted to show all errors
    const [formSubmitted, setFormSubmitted] = useState(false);
    
    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    // Fetch festival details on component mount
    useEffect(() => {
        const fetchFestivalDetails = async () => {
            // Get token from session storage
            const token = sessionStorage.getItem("token");
            
            // if (!token) {
            //     alert("Authentication token missing. Please log in again.");
               
            //     return;
            // }
            
            try {
                setIsLoading(true);
                
                // Uncomment when API is ready
                // const reqHeader = { "Authorization": `Bearer ${token}` };
                // const result = await GetFestivalByIdAPI(id, reqHeader);
                
                // For now, simulate API response with mock data
                const result = { 
                    status: 200, 
                    data: { 
                        festivalName: 'up Festival'
                    } 
                };
                
                if (result.status === 200) {
                    setFormData({
                        festivalName: result.data.festivalName
                    });
                } else {
                    alert("Failed to fetch festival details");
                    navigate('/FestivalList');
                }
            } catch (err) {
                console.error("Error fetching festival details:", err);
                alert("Error fetching festival details. Please try again.");
                navigate('/FestivalList');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchFestivalDetails();
    }, [id, navigate]);

    // Validate a single field
    const validateField = (name, value) => {
        switch (name) {
            case 'festivalName':
                if (!value.trim()) return 'Festival name is required';
                if (value.trim().length < 3) return 'Festival name must be at least 3 characters long';
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
        setFormData({ ...formData, [name]: value });

        // Validate field if form was already submitted
        if (formSubmitted) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
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
            console.log("Form submitted for update:", formData);
            
            // Get token from session storage
            const token = sessionStorage.getItem("token");
            
            if (token) {
                // Set up request header with token
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                
                try {
                    // Uncomment this when API is ready
                    // const result = await UpdateFestivalAPI(id, formData, reqHeader);
                    
                    // For now, simulating successful API call
                    const result = { status: 200 };
                    
                    if (result.status === 200) {
                        alert('Festival updated successfully!');
                        navigate('/FestivalList');
                    } else {
                        alert("Failed to update festival");
                    }
                } catch (err) {
                    console.error("Error updating festival:", err);
                    alert("Error updating festival. Please try again.");
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
            <div className="bg-white min-h-screen">
                <Header />
                <div className="flex flex-col sm:flex-row">
                    <Dash />
                    <div className="flex-1 p-2 sm:p-4 bg-gray-300">
                        <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto flex items-center justify-center">
                            <p className="text-lg font-medium text-gray-700">Loading festival details...</p>
                        </div>
                    </div>
                </div>
            </div>
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
                            <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Edit Festival</h2>

                            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                {/* Festival Name Field */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="festivalName"
                                            placeholder="Enter Festival Name "
                                            value={formData.festivalName}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.festivalName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.festivalName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festivalName}</p>}
                                    </div>
                                </div>
                                
                                {/* Buttons */}
                               
                            </form>
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-32 sm:mt-40 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
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

export default EditFestival;
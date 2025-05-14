// It Admin when user click distr reg -distname - subdist - Scl -  add scl

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
import Splashscreen from '../components/Splashscreen'
import Alert from '../components/Alert'
// import { AddKalolsavamAPI } from '../services/allAPI';

const AddSclsub = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const districtParam = searchParams.get('district');
    const subDistrictParam = searchParams.get('subDistrict');
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [availableSubDistricts, setAvailableSubDistricts] = useState([]);
        const [loading, setLoading] = useState(true);
        // Alert state
        const [alert, setAlert] = useState({
            show: false,
            message: '',
            type: 'success'
        });
    const [dropdownOpen, setDropdownOpen] = useState({
        schoolType: false,
        district: false,
        educationDistrict: false,
        subDistrict: false
    });

    const [formData, setFormData] = useState({
        schoolCode: '',
        schoolName: '',
        schoolType: '',
        district: districtParam || '',
        educationDistrict: '',
        subDistrict: subDistrictParam || ''
    });
    
    // State for validation errors
    const [errors, setErrors] = useState({
        schoolCode: '',
        schoolName: '',
        schoolType: '',
        district: '',
        educationDistrict: '',
        subDistrict: ''
    });
    
    // Initialize available subdistricts based on district from URL
    useEffect(() => {
        if (formData.district && formData.district !== 'Select') {
            setAvailableSubDistricts(districtToSubDistrict[formData.district] || []);
        }
    }, [formData.district]);

    // Update URL when district or subDistrict changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        
        // Update district parameter
        if (formData.district) {
            params.set('district', formData.district);
        } else {
            params.delete('district');
        }
        
        // Update subDistrict parameter
        if (formData.subDistrict) {
            params.set('subDistrict', formData.subDistrict);
        } else {
            params.delete('subDistrict');
        }
        
        // Update URL without causing navigation/page refresh
        setSearchParams(params);
    }, [formData.district, formData.subDistrict, setSearchParams]);

    // Track if form was submitted to show all errors
    const [formSubmitted, setFormSubmitted] = useState(false);

    const schoolTypes = [
        'Government',
        'Aided',
        'Unaided'
    ];

    const allDistricts = [
        'Idukki',
        'Ernakulam',
        'Palakkad',
        'Kozhikode',
        'Wayanad',
        'Thrissur',
        'Thiruvananthapuram',
        'Kollam',
        'Pathanamthitta',
        'Alappuzha',
        'Kottayam',
        'Malappuram',
        'Kannur',
        'Kasaragod'
    ];

    // Define education districts
    const educationDistricts = [
        'Idukki',
        'Ernakulam',
        'Palakkad',
        'Kozhikode',
        'Wayanad',
        'Thrissur',
        'Thiruvananthapuram',
        'Kollam',
        'Pathanamthitta',
        'Alappuzha',
        'Kottayam',
        'Malappuram',
        'Kannur',
        'Kasaragod',
        'Thiruvallla',
        'Muvattupuzha',
        'Kottarakkara',
        'Ottapalam',
        'Thamarassery',
        'Irinjalakuda'
    ];

    const districtToSubDistrict = {
        'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam', 'Thodupuzha', 'Idukki'],
        'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam', 'Palakkad', 'Alathur'],
        'Ernakulam': ['Kochi', 'Aluva', 'Muvattupuzha', 'Kothamangalam', 'North Paravur', 'Angamaly', 'Perumbavoor'],
        'Kozhikode': ['Vatakara', 'Kozhikode', 'Balussery', 'Koyilandy', 'Thamarassery', 'Koduvally', 'Feroke'],
        'Wayanad': ['Kalpetta', 'Mananthavady', 'Sulthan Bathery', 'Vythiri'],
        'Thrissur': ['Thrissur', 'Kodungallur', 'Chalakudy', 'Irinjalakuda', 'Chavakkad', 'Kunnamkulam', 'Guruvayur'],
        'Thiruvananthapuram': ['Thiruvananthapuram', 'Attingal', 'Nedumangad', 'Neyyattinkara', 'Varkala'],
        'Kollam': ['Kollam', 'Karunagappally', 'Kottarakkara', 'Punalur', 'Sasthamcotta'],
        'Pathanamthitta': ['Pathanamthitta', 'Adoor', 'Konni', 'Ranni', 'Thiruvalla'],
        'Alappuzha': ['Alappuzha', 'Cherthala', 'Chengannur', 'Kayamkulam', 'Mavelikara'],
        'Kottayam': ['Kottayam', 'Changanassery', 'Pala', 'Vaikom', 'Ettumanoor'],
        'Malappuram': ['Malappuram', 'Manjeri', 'Tirur', 'Ponnani', 'Perinthalmanna', 'Nilambur'],
        'Kannur': ['Kannur', 'Thalassery', 'Payyanur', 'Iritty', 'Thaliparamba'],
        'Kasaragod': ['Kasaragod', 'Kanhangad', 'Manjeshwar', 'Nileshwaram']
    };

    // Validate a single field
    const validateField = (name, value) => {
        switch (name) {
            case 'schoolCode':
                return value.trim() ? '' : 'School code is required';
            case 'schoolName':
                return value.trim() ? '' : 'School name is required';
            case 'schoolType':
                return value.trim() ? '' : 'School type is required';
            case 'district':
                return value.trim() ? '' : 'District is required';
            case 'educationDistrict':
                return value.trim() ? '' : 'Education district is required';
            case 'subDistrict':
                return value.trim() ? '' : 'Sub district is required';
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
        setFormData(prev => ({ ...prev, [name]: value }));

        // If district changes, reset subDistrict
        if (name === 'district') {
            setFormData(prev => ({ ...prev, subDistrict: '' }));
            setErrors(prev => ({ ...prev, subDistrict: '' })); // Reset sub-district error
            
            // Open the sub-district dropdown after district is selected
            setTimeout(() => {
                setDropdownOpen(prev => ({ ...prev, subDistrict: true }));
            }, 100);
        }

        // Validate field if form was already submitted
        if (formSubmitted) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
        }
    };

    const handleSelectOption = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setDropdownOpen(prev => ({ ...prev, [field]: false }));

        // Validate field if form was already submitted
        if (formSubmitted) {
            setErrors(prev => ({
                ...prev,
                [field]: validateField(field, value)
            }));
        }

        // If district is selected, reset subDistrict
        if (field === 'district') {
            setFormData(prev => ({ ...prev, subDistrict: '' }));
            setErrors(prev => ({ ...prev, subDistrict: '' }));
            
            // Open the sub-district dropdown after district is selected
            setTimeout(() => {
                setDropdownOpen(prev => ({ ...prev, subDistrict: true }));
            }, 100);
        }

        setSearchTerm('');
    };

    const toggleDropdown = (field) => {
        setDropdownOpen(prev => {
            const newState = { ...prev };
            Object.keys(newState).forEach(key => {
                newState[key] = key === field ? !newState[key] : false;
            });
            return newState;
        });
        setSearchTerm('');
    };

    const handleCancel = () => {
        // Create URLSearchParams to pass district and subDistrict to the next page
        const params = new URLSearchParams();
        
        // Add district and subDistrict if they exist in the current form data
        if (formData.district) {
            params.set('district', formData.district);
        }
        
        if (formData.subDistrict) {
            params.set('subDistrict', formData.subDistrict);
        }
        
        // Navigate with the parameters
        navigate({
            pathname: '/School-List',
            search: params.toString()
        });
    };

    // Filter options based on search term
    const filterOptions = (options) => {
        if (!searchTerm) return options;
        return options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click target has data-dropdown attribute
            const dropdownClicked = event.target.closest('[data-dropdown]');

            if (!dropdownClicked) {
                setDropdownOpen({
                    schoolType: false,
                    district: false,
                    educationDistrict: false,
                    subDistrict: false
                });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Splashscreen />;
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
                    // Call your API with form data and headers
                    // Uncomment when API function is available
                    // const result = await AddSchoolAPI(formData, reqHeader);
                    
                    // Placeholder for API result
                    const result = { status: 200 };
                    
                    if (result.status === 200) {
                        showAlert('School added successfully!');
                        
                        // Reset form after successful submission
                        setFormData({
                            schoolCode: '',
                            schoolName: '',
                            schoolType: '',
                            district: '',
                            educationDistrict: '',
                            subDistrict: ''
                        });
                        
                        // Navigate back to the previous page
                        navigate('/CreateKalolsavam');
                    } else {
                        showAlert(result.response.data);
                    }
                } catch (err) {
                    console.error("Error adding school:", err);
                    showAlert("Error adding school. Please try again.");
                }
            } else {
                showAlert("Authentication token missing. Please log in again.");
            }
        } else {
            console.log("Form has errors:", errors);
        }
    };

    // Custom select component with search capability
    const CustomSelect = ({ 
        label, 
        name, 
        value, 
        options, 
        onChange, 
        error, 
        disabled = false,
        placeholder
    }) => {
        // Check if options array exists and has more than 7 items
        const needsSearch = options && options.length > 7;
        
        return (
            <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">{label}</label>
                <div className="w-full sm:w-2/3 relative" data-dropdown={name}>
                    <div
                        className={`w-full px-3 sm:px-4 py-2 border ${error ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer ${disabled ? 'opacity-75' : ''}`}
                        onClick={() => !disabled && toggleDropdown(name)}
                    >
                        <span className={value ? "text-blue-900" : "text-gray-400"}>
                            {value || placeholder}
                        </span>
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}

                    {dropdownOpen[name] && (
                        <div className="absolute z-10 mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {needsSearch && (
                                <div className="sticky top-0 bg-white p-2 border-b">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            )}
                            {filterOptions(options).map((option, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm text-gray-900"
                                    onClick={() => handleSelectOption(name, option)}
                                >
                                    {option}
                                </div>
                            ))}
                            {filterOptions(options).length === 0 && (
                                <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
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
                            <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add School</h2>

                            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                {/* Form fields - with validation */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">School code </label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="schoolCode"
                                            placeholder="Enter School Code"
                                            value={formData.schoolCode}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.schoolCode ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.schoolCode && <p className="text-red-500 text-xs mt-1 ml-2">{errors.schoolCode}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">School Name</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="schoolName"
                                            placeholder="Enter School Name"
                                            value={formData.schoolName}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.schoolName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.schoolName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.schoolName}</p>}
                                    </div>
                                </div>

                                {/* School Type */}
                                <CustomSelect
                                    label="School Type"
                                    name="schoolType"
                                    value={formData.schoolType}
                                    options={schoolTypes}
                                    error={errors.schoolType}
                                    placeholder="Select Type"
                                />

                                {/* District */}
                                <CustomSelect
                                    label="District"
                                    name="district"
                                    value={formData.district}
                                    options={allDistricts}
                                    error={errors.district}
                                    placeholder="Select District"
                                />

                                {/* Education District */}
                                <CustomSelect
                                    label="Education District"
                                    name="educationDistrict"
                                    value={formData.educationDistrict}
                                    options={educationDistricts}
                                    error={errors.educationDistrict}
                                    placeholder="Select Education District"
                                />

                                {/* Sub District */}
                                <CustomSelect
                                    label="Sub District"
                                    name="subDistrict"
                                    value={formData.subDistrict}
                                    options={formData.district ? districtToSubDistrict[formData.district] || [] : []}
                                    error={errors.subDistrict}
                                    disabled={!formData.district}
                                    placeholder={formData.district ? "Select Sub District" : "Please select a district first"}
                                />
                            </form>
                            
                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-16 sm:mt-32 sm:mr-10 md:mr-20 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
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

export default AddSclsub;
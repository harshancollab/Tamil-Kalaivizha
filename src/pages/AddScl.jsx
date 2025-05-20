
// IT admin school Req List - add school 
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
import Alert from '../components/Alert';
import { getAllDistrictAPI, getAllSubDistrictAPI, AddSchoolListAPI } from '../services/allAPI';

const AddScl = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const districtParam = searchParams.get('district');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false); // Add submitting state
    const subDistrictParam = searchParams.get('subDistrict');
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // District and SubDistrict data fetched from API
    const [allDistricts, setAllDistricts] = useState([]);
    const [allSubDistricts, setAllSubDistricts] = useState([]);
    const [districtMap, setDistrictMap] = useState({});

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

    const [errors, setErrors] = useState({
        schoolCode: '',
        schoolName: '',
        schoolType: '',
        district: '',
        educationDistrict: '',
        subDistrict: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const schoolTypes = [
        'Government',
        'Aided',
        'Unaided'
    ];

    const educationDistricts = [
        'Idukki',
        'Ernakulam',
        'Palakkad',
        'Kozhikode',
        'Wayanad',
        'Thrissur',
        'Thiruvananthapuram',
    ];

    // Fetch all districts from API
    const fetchAllDistricts = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": token
            }
            try {
                const result = await getAllDistrictAPI(reqHeader);
                if (result.status === 200) {
                    setAllDistricts(result.data.district);
                }
            } catch (err) {
                console.log("Error fetching districts:", err);
                showAlert("Error fetching districts. Please refresh the page.", 'error');
            }
        }
    };

    // Fetch all sub-districts from API
    const fetchAllSubDistricts = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": token
            }
            try {
                const result = await getAllSubDistrictAPI(reqHeader);
                if (result.status === 200) {
                    setAllSubDistricts(result.data.subDistrict);

                    // Create district to sub-district mapping based on API response
                    const mapping = {};
                    result.data.subDistrict.forEach(subDistrict => {
                        if (subDistrict.district_details && subDistrict.district_details._id) {
                            const districtId = subDistrict.district_details._id;
                            if (!mapping[districtId]) {
                                mapping[districtId] = [];
                            }
                            mapping[districtId].push(subDistrict);
                        }
                    });
                    setDistrictMap(mapping);
                }
            } catch (err) {
                console.log("Error fetching sub-districts:", err);
                showAlert("Error fetching sub-districts. Please refresh the page.", 'error');
            }
        }
    };

    useEffect(() => {
        fetchAllDistricts();
        fetchAllSubDistricts();
    }, []);

    // Update URL params when district or subDistrict changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (formData.district) {
            params.set('district', formData.district);
        } else {
            params.delete('district');
        }

        if (formData.subDistrict) {
            params.set('subDistrict', formData.subDistrict);
        } else {
            params.delete('subDistrict');
        }

        setSearchParams(params);
    }, [formData.district, formData.subDistrict, setSearchParams]);

    const validateField = (name, value) => {
        switch (name) {
            case 'schoolCode':
                if (!value.trim()) return 'School code is required';
                if (!/^\d+$/.test(value.trim())) return 'School code must be a number';
                return '';
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

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

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

        if (name === 'district') {
            setFormData(prev => ({ ...prev, subDistrict: '' }));
            setErrors(prev => ({ ...prev, subDistrict: '' }));
        }

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

        if (formSubmitted) {
            setErrors(prev => ({
                ...prev,
                [field]: validateField(field, value)
            }));
        }

        if (field === 'district') {
            setFormData(prev => ({ ...prev, subDistrict: '' }));
            setErrors(prev => ({ ...prev, subDistrict: '' }));

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
        const params = new URLSearchParams();

        if (formData.district) {
            params.set('district', formData.district);
        }

        if (formData.subDistrict) {
            params.set('subDistrict', formData.subDistrict);
        }

        navigate({
            pathname: '/SchoolRegList',
            search: params.toString()
        });
    };

    const filterOptions = (options) => {
        if (!searchTerm) return options;
        return options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
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
        setSubmitting(true);

        try {
            const isValid = validateForm();

            if (!isValid) {
                setSubmitting(false);
                showAlert('Please fill all required fields correctly.', 'error');
                return;
            }

            const token = sessionStorage.getItem("token");

            if (!token) {
                setSubmitting(false);
                showAlert("Authentication token missing. Please log in again.", 'error');
                return;
            }

            const reqHeader = {
                "Authorization": token
            };

            const selectedDistrict = allDistricts.find(d => d.district_name === formData.district);
            const selectedSubDistrict = allSubDistricts.find(s => s.sub_district_name === formData.subDistrict);

            if (!selectedDistrict) {
                setSubmitting(false);
                showAlert("Selected district not found. Please refresh and try again.", 'error');
                return;
            }

            if (!selectedSubDistrict) {
                setSubmitting(false);
                showAlert("Selected sub-district not found. Please refresh and try again.", 'error');
                return;
            }

            const requestBody = {
                school_details: {
                    school_name: formData.schoolName,
                    school_code: parseInt(formData.schoolCode),
                    school_type: formData.schoolType,
                    district_id: selectedDistrict._id,
                    sub_district_id: selectedSubDistrict._id,
                    education_district: formData.educationDistrict.toLowerCase()
                }
            };

            const result = await AddSchoolListAPI(requestBody, reqHeader);

            if (result.status === 200 || result.status === 201) {
                showAlert('School added successfully!');

                // Reset form
                setFormData({
                    schoolCode: '',
                    schoolName: '',
                    schoolType: '',
                    district: '',
                    educationDistrict: '',
                    subDistrict: ''
                });

                setFormSubmitted(false);
                setErrors({
                    schoolCode: '',
                    schoolName: '',
                    schoolType: '',
                    district: '',
                    educationDistrict: '',
                    subDistrict: ''
                });

                // Navigate after a short delay to let user see the success message
                setTimeout(() => {
                    navigate('/SchoolRegList');
                }, 1500);
            } else {
                const errorMessage = result.response?.data?.message || result.response?.data || 'Error adding school';
                showAlert(errorMessage, 'error');
            }
        } catch (err) {
            console.error("Error adding school:", err);
            let errorMessage = "Error adding school. Please try again.";

            if (err.response) {
                errorMessage = err.response.data?.message || err.response.data || errorMessage;
            } else if (err.message) {
                errorMessage = err.message;
            }

            showAlert(errorMessage, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // Get the district names from API response
    const getDistrictNames = () => {
        return allDistricts.map(district => district.district_name);
    };

    // Get sub-district names based on selected district
    const getSubDistrictNames = () => {
        if (formData.district) {
            const district = allDistricts.find(d => d.district_name === formData.district);
            if (district && district._id && districtMap[district._id]) {
                return districtMap[district._id].map(subDist => subDist.sub_district_name);
            }
        }
        return [];
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
                                {/* School Code */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">School code </label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="schoolCode"
                                            placeholder="Enter School Code"
                                            value={formData.schoolCode}
                                            onChange={handleChange}
                                            disabled={submitting}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.schoolCode ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                        {errors.schoolCode && <p className="text-red-500 text-xs mt-1 ml-2">{errors.schoolCode}</p>}
                                    </div>
                                </div>

                                {/* School Name */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">School Name</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="schoolName"
                                            placeholder="Enter School Name"
                                            value={formData.schoolName}
                                            onChange={handleChange}
                                            disabled={submitting}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.schoolName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                        {errors.schoolName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.schoolName}</p>}
                                    </div>
                                </div>

                                {/* School Type */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">School Type</label>
                                    <div className="w-full sm:w-2/3 relative" data-dropdown="schoolType">
                                        <div
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.schoolType ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => !submitting && toggleDropdown('schoolType')}
                                        >
                                            <span className={formData.schoolType ? "text-blue-900" : "text-gray-400"}>
                                                {formData.schoolType || "Select Type"}
                                            </span>
                                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {errors.schoolType && <p className="text-red-500 text-xs mt-1 ml-2">{errors.schoolType}</p>}

                                        {dropdownOpen.schoolType && !submitting && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                {schoolTypes.map((type, index) => (
                                                    <div
                                                        key={index}
                                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                                        onClick={() => handleSelectOption('schoolType', type)}
                                                    >
                                                        {type}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* District */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District </label>
                                    <div className="w-full sm:w-2/3 relative" data-dropdown="district">
                                        <div
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.district ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => !submitting && toggleDropdown('district')}
                                        >
                                            <span className={formData.district ? "text-blue-900" : "text-gray-400"}>
                                                {formData.district || "Select District"}
                                            </span>
                                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {errors.district && <p className="text-red-500 text-xs mt-1 ml-2">{errors.district}</p>}

                                        {dropdownOpen.district && !submitting && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                {getDistrictNames().length > 7 && (
                                                    <div className="sticky top-0 bg-white p-2 border-b">
                                                        <input
                                                            type="text"
                                                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            placeholder="Search..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                        />
                                                    </div>
                                                )}
                                                {filterOptions(getDistrictNames()).map((district, index) => (
                                                    <div
                                                        key={index}
                                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                                        onClick={() => handleSelectOption('district', district)}
                                                    >
                                                        {district}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Education District */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Education District </label>
                                    <div className="w-full sm:w-2/3 relative" data-dropdown="educationDistrict">
                                        <div
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.educationDistrict ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => !submitting && toggleDropdown('educationDistrict')}
                                        >
                                            <span className={formData.educationDistrict ? "text-blue-900" : "text-gray-400"}>
                                                {formData.educationDistrict || "Select Education District"}
                                            </span>
                                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {errors.educationDistrict && <p className="text-red-500 text-xs mt-1 ml-2">{errors.educationDistrict}</p>}

                                        {dropdownOpen.educationDistrict && !submitting && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                {educationDistricts.length > 7 && (
                                                    <div className="sticky top-0 bg-white p-2 border-b">
                                                        <input
                                                            type="text"
                                                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            placeholder="Search..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                        />
                                                    </div>
                                                )}
                                                {filterOptions(educationDistricts).map((eduDistrict, index) => (
                                                    <div
                                                        key={index}
                                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                                        onClick={() => handleSelectOption('educationDistrict', eduDistrict)}
                                                    >
                                                        {eduDistrict}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Sub District */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Sub District </label>
                                    <div className="w-full sm:w-2/3 relative" data-dropdown="subDistrict">
                                        <div
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.subDistrict ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer ${(!formData.district || submitting) ? 'opacity-75 cursor-not-allowed' : ''}`}
                                            onClick={() => (formData.district && !submitting) ? toggleDropdown('subDistrict') : null}
                                        >
                                            <span className={formData.subDistrict ? "text-blue-900" : "text-gray-400"}>
                                                {formData.subDistrict || (formData.district ? "Select Sub District" : "Please select a district first")}
                                            </span>
                                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {errors.subDistrict && <p className="text-red-500 text-xs mt-1 ml-2">{errors.subDistrict}</p>}

                                        {dropdownOpen.subDistrict && formData.district && !submitting && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                {getSubDistrictNames().length > 7 && (
                                                    <div className="sticky top-0 bg-white p-2 border-b">
                                                        <input
                                                            type="text"
                                                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            placeholder="Search..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                        />
                                                    </div>
                                                )}
                                                {filterOptions(getSubDistrictNames()).map((subDistrict, index) => (
                                                    <div
                                                        key={index}
                                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                                        onClick={() => handleSelectOption('subDistrict', subDistrict)}
                                                    >
                                                        {subDistrict}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-16 sm:mt-32 sm:mr-10 md:mr-20 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={submitting}
                                    className={`bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default AddScl;
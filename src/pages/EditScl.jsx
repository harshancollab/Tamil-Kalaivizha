import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
// These will be uncommented when backend is ready
// import { GetSchoolByIdAPI, UpdateSchoolAPI } from '../services/allAPI';

const EditScl = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const schoolDataFromState = location.state?.resultEntry;
    const { id } = useParams(); // Get school ID from URL
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState({
        schoolType: false,
        district: false,
        subDistrict: false,
        educationDistrict: false // Added education district to dropdown state
    });

    const [formData, setFormData] = useState({
        schoolCode: '',
        schoolName: '',
        schoolType: '',
        district: '',
        educationDistrict: '',
        subDistrict: ''
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

    // Loading state
    const [isLoading, setIsLoading] = useState(true);
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

    // Education districts mapping
    const districtToEducationDistrict = {
        'Idukki': ['Idukki North', 'Idukki South', 'Thodupuzha'],
        'Ernakulam': ['Ernakulam North', 'Ernakulam South', 'Aluva', 'Muvattupuzha'],
        'Palakkad': ['Palakkad North', 'Palakkad South', 'Ottapalam', 'Mannarkkad'],
        'Kozhikode': ['Kozhikode North', 'Kozhikode South', 'Vatakara'],
        'Wayanad': ['Wayanad', 'Kalpetta', 'Sulthan Bathery'],
        'Thrissur': ['Thrissur North', 'Thrissur South', 'Irinjalakuda', 'Chavakkad'],
        'Thiruvananthapuram': ['Thiruvananthapuram North', 'Thiruvananthapuram South', 'Neyyattinkara', 'Attingal'],
        'Kollam': ['Kollam East', 'Kollam West', 'Kottarakkara', 'Punalur'],
        'Pathanamthitta': ['Pathanamthitta', 'Adoor', 'Thiruvalla'],
        'Alappuzha': ['Alappuzha North', 'Alappuzha South', 'Chengannur', 'Kayamkulam'],
        'Kottayam': ['Kottayam North', 'Kottayam South', 'Pala', 'Changanassery'],
        'Malappuram': ['Malappuram North', 'Malappuram South', 'Tirur', 'Manjeri'],
        'Kannur': ['Kannur North', 'Kannur South', 'Thalassery', 'Iritty'],
        'Kasaragod': ['Kasaragod', 'Kanhangad']
    };

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

    // Mock data for development - remove when backend is ready
    const mockSchoolData = {
        "SCH001": {
            schoolCode: "SCH001",
            schoolName: "St. Joseph's Higher Secondary School",
            schoolType: "Aided",
            district: "Ernakulam",
            educationDistrict: "Ernakulam North",
            subDistrict: "Aluva"
        },
        "SCH002": {
            schoolCode: "SCH002",
            schoolName: "Government Model Higher Secondary School",
            schoolType: "Government",
            district: "Thiruvananthapuram",
            educationDistrict: "Thiruvananthapuram South",
            subDistrict: "Thiruvananthapuram"
        },
        "SCH003": {
            schoolCode: "SCH003",
            schoolName: "Mount Carmel School",
            schoolType: "Unaided",
            district: "Kottayam",
            educationDistrict: "Kottayam Central",
            subDistrict: "Kottayam"
        }
    };

    // Fetch school data on component mount (with mock data for now)
    useEffect(() => {
        const fetchSchoolData = async () => {
            try {
                setIsLoading(true);

                // Simulate API delay
                setTimeout(() => {
                    // When backend is ready, replace with actual API call
                    // const token = sessionStorage.getItem("token");
                    // const reqHeader = {
                    //    "Authorization": `Bearer ${token}`
                    // };
                    // const result = await GetSchoolByIdAPI(id, reqHeader);

                    // For now, use mock data
                    if (mockSchoolData[id]) {
                        setFormData(mockSchoolData[id]);
                    } else {
                        // If ID not found in mock data, use the first mock school
                        const firstSchool = Object.values(mockSchoolData)[0];
                        setFormData(firstSchool);
                        console.warn(`School with ID ${id} not found, using default data`);
                    }

                    setIsLoading(false);
                }, 1000); // Simulate network delay

            } catch (err) {
                console.error("Error fetching school data:", err);
                setIsLoading(false);
                // Use default data in case of error
                setFormData({
                    schoolCode: id || "SCH001",
                    schoolName: "Default School Name",
                    schoolType: "Government",
                    district: "Ernakulam",
                    educationDistrict: "Ernakulam North",
                    subDistrict: "Aluva"
                });
            }
        };

        fetchSchoolData();
    }, [id]);

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

        // If district is selected, reset education district and sub-district
        if (field === 'district') {
            setFormData(prev => ({ ...prev, educationDistrict: '', subDistrict: '' }));
            setErrors(prev => ({ ...prev, educationDistrict: '', subDistrict: '' }));

            // Automatically open the education district dropdown
            setTimeout(() => {
                setDropdownOpen(prev => ({ ...prev, educationDistrict: true }));
            }, 100);
        }

        // If education district is selected, automatically open the sub-district dropdown
        if (field === 'educationDistrict') {
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
        navigate('/SchoolRegList');
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

    // Handle form submission for updating school
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        // Validate all fields
        const isValid = validateForm();

        if (isValid) {
            console.log("Form submitted for update:", formData);

            // Simulate API call success
            setTimeout(() => {
                // When backend is ready, replace with actual API call
                // const token = sessionStorage.getItem("token");
                // const reqHeader = {
                //     "Content-Type": "application/json",
                //     "Authorization": `Bearer ${token}`
                // };
                // const result = await UpdateSchoolAPI(id, formData, reqHeader);

                // For development, show success message
                alert('School updated successfully! ');
                console.log("School would be updated with:", formData);

                // Update mock data (optional)
                mockSchoolData[id] = formData;

                // Navigate back (you might want to change this URL)
                navigate('/SchoolRegList');
            }, 1000);
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
                            <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Edit School</h2>

                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
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

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">School Type</label>
                                        <div className="w-full sm:w-2/3 relative" data-dropdown="schoolType">
                                            <div
                                                className={`w-full px-3 sm:px-4 py-2 border ${errors.schoolType ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer`}
                                                onClick={() => toggleDropdown('schoolType')}
                                            >
                                                <span className={formData.schoolType ? "text-blue-900" : "text-gray-400"}>
                                                    {formData.schoolType || "Select Type"}
                                                </span>
                                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {errors.schoolType && <p className="text-red-500 text-xs mt-1 ml-2">{errors.schoolType}</p>}

                                            {dropdownOpen.schoolType && (
                                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {schoolTypes.length > 7 && (
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
                                                    {filterOptions(schoolTypes).map((type, index) => (
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

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District </label>
                                        <div className="w-full sm:w-2/3 relative" data-dropdown="district">
                                            <div
                                                className={`w-full px-3 sm:px-4 py-2 border ${errors.district ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer`}
                                                onClick={() => toggleDropdown('district')}
                                            >
                                                <span className={formData.district ? "text-blue-900" : "text-gray-400"}>
                                                    {formData.district || "Select District"}
                                                </span>
                                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {errors.district && <p className="text-red-500 text-xs mt-1 ml-2">{errors.district}</p>}

                                            {dropdownOpen.district && (
                                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {allDistricts.length > 7 && (
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
                                                    {filterOptions(allDistricts).map((district, index) => (
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

                                    {/* Education District as dropdown instead of text input */}
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Education District </label>
                                        <div className="w-full sm:w-2/3 relative" data-dropdown="educationDistrict">
                                            <div
                                                className={`w-full px-3 sm:px-4 py-2 border ${errors.educationDistrict ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer ${!formData.district ? 'opacity-75' : ''}`}
                                                onClick={() => formData.district ? toggleDropdown('educationDistrict') : null}
                                            >
                                                <span className={formData.educationDistrict ? "text-blue-900" : "text-gray-400"}>
                                                    {formData.educationDistrict || (formData.district ? "Select Education District" : "Please select a district first")}
                                                </span>
                                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {errors.educationDistrict && <p className="text-red-500 text-xs mt-1 ml-2">{errors.educationDistrict}</p>}

                                            {dropdownOpen.educationDistrict && formData.district && (
                                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {districtToEducationDistrict[formData.district] && districtToEducationDistrict[formData.district].length > 7 && (
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
                                                    {formData.district && districtToEducationDistrict[formData.district] &&
                                                        filterOptions(districtToEducationDistrict[formData.district]).map((educationDistrict, index) => (
                                                            <div
                                                                key={index}
                                                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                                                onClick={() => handleSelectOption('educationDistrict', educationDistrict)}
                                                            >
                                                                {educationDistrict}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Sub District </label>
                                        <div className="w-full sm:w-2/3 relative" data-dropdown="subDistrict">
                                            <div
                                                className={`w-full px-3 sm:px-4 py-2 border ${errors.subDistrict ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-blue-900 flex justify-between items-center cursor-pointer ${!formData.district ? 'opacity-75' : ''}`}
                                                onClick={() => formData.district ? toggleDropdown('subDistrict') : null}
                                            >
                                                <span className={formData.subDistrict ? "text-blue-900" : "text-gray-400"}>
                                                    {formData.subDistrict || (formData.district ? "Select Sub District" : "Please select a district first")}
                                                </span>
                                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            {errors.subDistrict && <p className="text-red-500 text-xs mt-1 ml-2">{errors.subDistrict}</p>}

                                            {dropdownOpen.subDistrict && formData.district && (
                                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {districtToSubDistrict[formData.district] && districtToSubDistrict[formData.district].length > 7 && (
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
                                                    {formData.district && districtToSubDistrict[formData.district] &&
                                                        filterOptions(districtToSubDistrict[formData.district]).map((subDistrict, index) => (
                                                            <div
                                                                key={index}
                                                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                                                onClick={() => handleSelectOption('subDistrict', subDistrict)}
                                                            >
                                                                {subDistrict}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-40 sm:mt-48 ml-4 sm:ml-8 md:ml-12 lg:ml-16 px-4 sm:px-0">
                                        <div className="flex flex-col mt-24 sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditScl;
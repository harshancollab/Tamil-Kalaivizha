// It Admin user - add user


import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Dash from '../components/Dash'
import Header from '../components/Header'
import Alert from '../components/Alert'
// import { AddUserAPI } from '../services/allAPI' 

const AddUser = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()

    // Alert state
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const userTypeDropdownRef = useRef(null);
    const districtDropdownRef = useRef(null);
    const subDistrictDropdownRef = useRef(null);
    const kalolsavamDropdownRef = useRef(null);

    const allUserTypes = [
        'Select User Type',
        'State Admin',
        'District Admin',
        'Sub-district Admin'
    ];

    const Kalolsavams = [
        'Select Kalolsavam',
        'Kerala State Kalolsavam',
        'District Kalolsavam',
        'Sub-district Kalolsavam',
        'School Kalolsavam'
    ];

    const districtKalolsavm = {
        'Idukki ': [
            'Select Kalolsavam',
            'Idukki District Kalolsavam'
        ],
        'Ernakulam ': [
            'Select Kalolsavam',
            'Ernakulam District Kalolsavam'
        ],
        'Palakkad ': [
            'Select Kalolsavam',
            'Palakkad District Kalolsavam'
        ],
        'Kozhikode': [
            'Select Kalolsavam',
            'Kozhikode District Kalolsavam'
        ],
        'Wayanad ': [
            'Select Kalolsavam',
            'Wayanad District Kalolsavam'
        ],
        'Thrissur': [
            'Select Kalolsavam',
            'Thrissur District Kalolsavam'
        ],
        'Ottapalam': [
            'Select Kalolsavam',
            'Ottapalam District Kalolsavam'
        ]
    };

    const allDistricts = [
        'Select District',
        'Idukki ',
        'Ernakulam ',
        'Palakkad ',
        'Kozhikode',
        'Wayanad ',
        'Thrissur',
        'Ottapalam'
    ];

    const districtToSubDistrict = {
        'Idukki ': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
        'Palakkad ': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
        'Ernakulam ': ['Aluva', 'Kochi', 'Perumbavoor', 'Kothamangalam', 'Muvattupuzha'],
        'Kozhikode': ['Vatakara', 'Koyilandy', 'Thamarassery', 'Koduvally', 'Balussery'],
        'Wayanad ': ['Sulthan Bathery', 'Mananthavady', 'Kalpetta', 'Vythiri'],
        'Thrissur': ['Chalakudy', 'Kodungallur', 'Irinjalakuda', 'Guruvayur', 'Chavakkad']
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        userType: '',
        district: '',
        subDistrict: '',
        kalolsavam: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        userType: '',
        district: '',
        subDistrict: '',
        kalolsavam: ''
    });

    const [dropdownOpen, setDropdownOpen] = useState({
        userType: false,
        district: false,
        subDistrict: false,
        kalolsavam: false
    });

    const [searchText, setSearchText] = useState({
        userType: '',
        district: '',
        subDistrict: '',
        kalolsavam: ''
    });

    const [availableSubDistricts, setAvailableSubDistricts] = useState([]);
    const [availableKalolsavams, setAvailableKalolsavams] = useState([]);

    useEffect(() => {
        // Set sub-districts based on selected district
        if (formData.district && districtToSubDistrict[formData.district]) {
            setAvailableSubDistricts(districtToSubDistrict[formData.district]);
        } else {
            setAvailableSubDistricts([]);
        }

        // Set kalolsavams based on selected district
        if (formData.district && districtKalolsavm[formData.district]) {
            setAvailableKalolsavams(districtKalolsavm[formData.district]);
        } else {
            setAvailableKalolsavams(Kalolsavams);
        }

        // Reset sub-district and kalolsavam when district changes
        setFormData(prev => ({
            ...prev,
            subDistrict: '',
            kalolsavam: ''
        }));
    }, [formData.district]);

    useEffect(() => {
        // Handle district from URL params if any
        const districtParam = searchParams.get('district');

        if (districtParam) {
            setFormData(prev => ({
                ...prev,
                district: districtParam
            }));
        }
    }, [searchParams]);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const filteredUserTypes = searchText.userType
        ? allUserTypes.filter(type =>
            type.toLowerCase().includes(searchText.userType.toLowerCase()))
        : allUserTypes;

    const filteredDistricts = searchText.district
        ? allDistricts.filter(district =>
            district.toLowerCase().includes(searchText.district.toLowerCase()))
        : allDistricts;

    const filteredSubDistricts = searchText.subDistrict
        ? availableSubDistricts.filter(subDistrict =>
            subDistrict.toLowerCase().includes(searchText.subDistrict.toLowerCase()))
        : availableSubDistricts;

    const filteredKalolsavams = searchText.kalolsavam
        ? availableKalolsavams.filter(kalolsavam =>
            kalolsavam.toLowerCase().includes(searchText.kalolsavam.toLowerCase()))
        : availableKalolsavams;

    useEffect(() => {
        function handleClickOutside(event) {
            if (userTypeDropdownRef.current && !userTypeDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, userType: false }));
            }
            if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, district: false }));
            }
            if (subDistrictDropdownRef.current && !subDistrictDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, subDistrict: false }));
            }
            if (kalolsavamDropdownRef.current && !kalolsavamDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
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
            case 'username':
                if (!value.trim()) return 'Username is required';
                if (value.trim().length < 3) return 'Username must be at least 3 characters long';
                return '';

            case 'password':
                if (!value.trim()) return 'Password is required';
                if (value.trim().length < 6) return 'Password must be at least 6 characters long';
                return '';

            case 'userType':
                if (!value.trim() || value === 'Select User Type') return 'User type is required';
                return '';

            case 'district':
                if (formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin') {
                    if (!value.trim() || value === 'Select District') return 'District is required';
                }
                return '';

            case 'subDistrict':
                if (formData.userType === 'Sub-district Admin') {
                    if (!value.trim()) return 'Sub-district is required';
                }
                return '';

            case 'kalolsavam':
                if (formData.district && (!value.trim() || value === 'Select Kalolsavam')) return 'Kalolsavam is required';
                return '';

            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Base fields everyone needs
        let fieldsToValidate = ['username', 'password', 'userType'];

        // Add district requirement for district and sub-district admins
        if (formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin') {
            fieldsToValidate.push('district');
        }

        // Add sub-district requirement only for sub-district admins
        if (formData.userType === 'Sub-district Admin') {
            fieldsToValidate.push('subDistrict');
        }

        // Add kalolsavam requirement if district is selected
        if (formData.district && formData.district !== 'Select District') {
            fieldsToValidate.push('kalolsavam');
        }

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

        if (name === 'userType') {
            setDropdownOpen(prev => ({ ...prev, userType: false }));
            setSearchText(prev => ({ ...prev, userType: '' }));
        }
        if (name === 'district') {
            setSearchParams({ district: value });
            setDropdownOpen(prev => ({ ...prev, district: false }));
            setSearchText(prev => ({ ...prev, district: '' }));
        }
        if (name === 'subDistrict') {
            setDropdownOpen(prev => ({ ...prev, subDistrict: false }));
            setSearchText(prev => ({ ...prev, subDistrict: '' }));
        }
        if (name === 'kalolsavam') {
            setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
            setSearchText(prev => ({ ...prev, kalolsavam: '' }));
        }
    };

    const handleCancel = () => {
        navigate('/admin-panel');
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

        const isValid = validateForm();

        if (isValid) {
            console.log("Form submitted:", formData);

            const token = sessionStorage.getItem("token");

            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };

                try {
                    const dataToSubmit = { ...formData };

                    console.log("Submitting data:", dataToSubmit);

                    // const result = await AddUserAPI(dataToSubmit, reqHeader);

                    const result = { status: 200 };

                    if (result.status === 200) {
                        showAlert(`User ${formData.username} added successfully!`, 'success');
                        
                        // Reset form
                        setFormData({
                            username: '',
                            password: '',
                            userType: '',
                            district: '',
                            subDistrict: '',
                            kalolsavam: ''
                        });
                        setFormSubmitted(false);
                        
                        setTimeout(() => {
                            navigate('/admin-panel');
                        }, 2000);
                    } else {
                        showAlert("Failed to add user. Please try again.", 'error');
                    }
                } catch (err) {
                    console.error("Error adding user:", err);
                    showAlert(`Error adding user: ${err.message || 'Unknown error'}`, 'error');
                }
            } else {
                showAlert("Authentication token missing. Please log in again.", 'error');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } else {
            console.log("Form has errors:", errors);
            showAlert("Please Fill  the form before submitting.", 'warning');
        }
    };

    const shouldShowField = (fieldName) => {
        switch (fieldName) {
            case 'district':
                return formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin';
            case 'subDistrict':
                return formData.userType === 'Sub-district Admin';
            case 'kalolsavam':
                return formData.district && formData.district !== 'Select District';
            default:
                return true;
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
                            <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Add User</h2>

                            <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
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
                                            placeholder="Enter password"
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

                                {shouldShowField('district') && (
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District</label>
                                        <div className="w-full sm:w-2/3">
                                            <div className="relative" ref={districtDropdownRef}>
                                                <div
                                                    onClick={() => toggleDropdown('district')}
                                                    className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.district ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                >
                                                    <span className="text-gray-600">{formData.district || 'Select District'}</span>
                                                    <span className="text-xs">▼</span>
                                                </div>
                                                {dropdownOpen.district && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                        <div className="p-2 border-b">
                                                            <input
                                                                type="text"
                                                                placeholder="Search district..."
                                                                value={searchText.district}
                                                                onChange={(e) => handleSearchChange(e, 'district')}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                        <div className="max-h-48 overflow-y-auto">
                                                            {filteredDistricts.length > 0 ? (
                                                                filteredDistricts.map((district, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.district === district ? 'bg-blue-200' : ''}`}
                                                                        onClick={() => handleInputChange({
                                                                            target: { name: 'district', value: district }
                                                                        })}
                                                                    >
                                                                        {district}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="px-4 py-2 text-gray-500">No results found</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {errors.district && <p className="text-red-500 text-xs mt-1 ml-2">{errors.district}</p>}
                                        </div>
                                    </div>
                                )}

                                {shouldShowField('kalolsavam') && (
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
                                                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam ? 'bg-blue-200' : ''}`}
                                                                        onClick={() => handleInputChange({
                                                                            target: { name: 'kalolsavam', value: kalolsavam }
                                                                        })}
                                                                    >
                                                                        {kalolsavam}
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
                                )}

                                {shouldShowField('subDistrict') && (
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Sub-district</label>
                                        <div className="w-full sm:w-2/3">
                                            <div className="relative" ref={subDistrictDropdownRef}>
                                                <div
                                                    onClick={() => toggleDropdown('subDistrict')}
                                                    className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.subDistrict ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${availableSubDistricts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    <span className="text-gray-600">{formData.subDistrict || 'Select Sub-district'}</span>
                                                    <span className="text-xs">▼</span>
                                                </div>
                                                {dropdownOpen.subDistrict && availableSubDistricts.length > 0 && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                        <div className="p-2 border-b">
                                                            <input
                                                                type="text"
                                                                placeholder="Search sub-district..."
                                                                value={searchText.subDistrict}
                                                                onChange={(e) => handleSearchChange(e, 'subDistrict')}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                        <div className="max-h-48 overflow-y-auto">
                                                            {filteredSubDistricts.length > 0 ? (
                                                                filteredSubDistricts.map((subDistrict, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.subDistrict === subDistrict ? 'bg-blue-200' : ''}`}
                                                                        onClick={() => handleInputChange({
                                                                            target: { name: 'subDistrict', value: subDistrict }
                                                                        })}
                                                                    >
                                                                        {subDistrict}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="px-4 py-2 text-gray-500">No results found</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {errors.subDistrict && <p className="text-red-500 text-xs mt-1 ml-2">{errors.subDistrict}</p>}
                                            {formData.district && availableSubDistricts.length === 0 && (
                                                <p className="text-amber-600 text-xs mt-1 ml-2">No sub-districts available for the selected district</p>
                                            )}
                                        </div>
                                    </div>
                                )}
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

export default AddUser;
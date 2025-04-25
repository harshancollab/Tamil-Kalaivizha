import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { addStageAPI } from '../services/allAPI'
import { useNavigate, useLocation } from 'react-router-dom'

const AddUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get the redirect URL from query parameters if available
    const params = new URLSearchParams(location.search);
    const redirectUrl = params.get('redirect') || '/admin-panel';

    const allUserTypes = [
        'Select User Type',
        'State Admin',
        'District Admin',
        'Sub-district Admin'
    ];
    
    const allDistricts = [
        'Select District',
        'Idukki',
        'Ernakulam',
        'Palakkad',
        'Kozhikode',
        'Wayanad',
        'Thrissur',
        'Ottapalam'
    ];
    
    const districtToSubDistrict = {
        'Idukki': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
        'Palakkad': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
        'Ernakulam': [],
        'Kozhikode': ['vatakara'],
        'Wayanad': [],
        'Thrissur': []
    };

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        userType: "",
        district: "",
        subDistrict: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        userType: "",
        district: "",
        subDistrict: ""
    });

    const [touched, setTouched] = useState({
        username: false,
        password: false,
        userType: false,
        district: false,
        subDistrict: false
    });

    const [filteredDistricts, setFilteredDistricts] = useState(allDistricts);
    const [filteredSubDistricts, setFilteredSubDistricts] = useState([]);
    const [searchText, setSearchText] = useState({
        district: "",
        subDistrict: ""
    });
    
    // Add state for managing dropdown visibility
    const [dropdownOpen, setDropdownOpen] = useState({
        district: false,
        subDistrict: false
    });
    
    // References to detect clicks outside dropdowns
    const districtDropdownRef = useRef(null);
    const subDistrictDropdownRef = useRef(null);

    // Function to update form data from URL parameters
    const updateFormFromUrl = () => {
        const params = new URLSearchParams(location.search);
        const userType = params.get('userType');
        const district = params.get('district');
        const subDistrict = params.get('subDistrict');
        
        // Create a new form data object to track changes
        const newFormData = { ...formData };
        let changed = false;
        
        if (userType && userType !== newFormData.userType) {
            newFormData.userType = userType;
            changed = true;
        }
        
        if (district && district !== newFormData.district) {
            newFormData.district = district;
            changed = true;
        }
        
        if (subDistrict && subDistrict !== newFormData.subDistrict) {
            newFormData.subDistrict = subDistrict;
            changed = true;
        }
        
        // Only update state if there were actual changes to avoid infinite loops
        if (changed) {
            console.log("Updating form from URL with:", newFormData);
            setFormData(newFormData);
            
            // Make sure available sub-districts are updated based on the district
            if (district && district !== 'Select District' && districtToSubDistrict[district]) {
                const subDistricts = districtToSubDistrict[district] || [];
                setFilteredSubDistricts(['Select Sub District', ...subDistricts]);
            }
        }
    };

    // Function to update URL parameters when form values change
    const updateUrlParams = (newFormData) => {
        const params = new URLSearchParams();
        
        // Update URL parameters based on form data
        if (newFormData.userType && newFormData.userType !== 'Select User Type') {
            params.set('userType', newFormData.userType);
        }
        
        if (newFormData.district && newFormData.district !== 'Select District') {
            params.set('district', newFormData.district);
        }
        
        if (newFormData.subDistrict && newFormData.subDistrict !== 'Select Sub District') {
            params.set('subDistrict', newFormData.subDistrict);
        }
        
        // Preserve the redirect parameter if it exists
        if (redirectUrl && redirectUrl !== '/admin-panel') {
            params.set('redirect', redirectUrl);
        }
        
        // Update the URL without reloading the page
        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.pushState({path: newUrl}, '', newUrl);
    };

    // Initialize form from URL on first load
    useEffect(() => {
        updateFormFromUrl();
    }, []);

    // Add effect for handling changes to location.search
    useEffect(() => {
        updateFormFromUrl();
    }, [location.search]);

    // Add event listener for popstate (back/forward button)
   
    useEffect(() => {
        const handlePopState = (event) => {
            // When back/forward button is clicked, we need to synchronize the form
            console.log("Browser navigation occurred", event.state);
            
            // Don't call updateUrlParams here, as that would create a new history entry
            // Just update the form from the current URL
            updateFormFromUrl();
        };

        window.addEventListener('popstate', handlePopState);
        
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    
    // Update available sub-districts when district changes
    useEffect(() => {
        if (formData.district && formData.district !== 'Select District') {
            const subDistricts = districtToSubDistrict[formData.district] || [];
            setFilteredSubDistricts(['Select Sub District', ...subDistricts]);
            
            // If current subDistrict isn't valid for the new district, reset it
            if (formData.subDistrict && 
                formData.subDistrict !== 'Select Sub District' && 
                !subDistricts.includes(formData.subDistrict)) {
                setFormData(prev => ({
                    ...prev,
                    subDistrict: ''
                }));
            }
        } else {
            setFilteredSubDistricts(['Select Sub District']);
        }
    }, [formData.district]);

    // Filter districts based on search text
    useEffect(() => {
        if (searchText.district) {
            const filtered = allDistricts.filter(district => 
                district.toLowerCase().includes(searchText.district.toLowerCase())
            );
            setFilteredDistricts(filtered.length > 0 ? filtered : ['No results found']);
        } else {
            setFilteredDistricts(allDistricts);
        }
    }, [searchText.district]);

    // Filter sub-districts based on search text
    useEffect(() => {
        if (searchText.subDistrict && formData.district && formData.district !== 'Select District') {
            const subDistricts = districtToSubDistrict[formData.district] || [];
            const filtered = ['Select Sub District', ...subDistricts].filter(subDistrict => 
                subDistrict.toLowerCase().includes(searchText.subDistrict.toLowerCase())
            );
            setFilteredSubDistricts(filtered.length > 0 ? filtered : ['No results found']);
        } else if (formData.district && formData.district !== 'Select District') {
            const subDistricts = districtToSubDistrict[formData.district] || [];
            setFilteredSubDistricts(['Select Sub District', ...subDistricts]);
        }
    }, [searchText.subDistrict, formData.district]);

    // Handle clicks outside the dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({...prev, district: false}));
            }
            if (subDistrictDropdownRef.current && !subDistrictDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({...prev, subDistrict: false}));
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed: ${name} = ${value}`);
        
        let newFormData;
        
        if (name === "userType" && value !== "District Admin" && value !== "Sub-district Admin") {
            newFormData = {
                ...formData,
                [name]: value,
                district: "",
                subDistrict: ""
            };
        } else if (name === "userType" && value === "District Admin") {
            newFormData = {
                ...formData,
                [name]: value,
                subDistrict: ""
            };
        } else if (name === "district") {
            newFormData = {
                ...formData,
                [name]: value,
                subDistrict: ""  // Reset sub-district when district changes
            };
            // Close district dropdown after selection
            setDropdownOpen(prev => ({...prev, district: false}));
            setSearchText(prev => ({...prev, district: ""}));
        } else if (name === "subDistrict") {
            newFormData = {
                ...formData,
                [name]: value,
            };
            // Close sub-district dropdown after selection
            setDropdownOpen(prev => ({...prev, subDistrict: false}));
            setSearchText(prev => ({...prev, subDistrict: ""}));
        } else {
            newFormData = {
                ...formData,
                [name]: value,
            };
        }
        
        setFormData(newFormData);
        
        // Update URL parameters
        if (name === "userType" || name === "district" || name === "subDistrict") {
            updateUrlParams(newFormData);
        }
        
        validateField(name, value);
    };

    const handleSearchChange = (e, field) => {
        const { value } = e.target;
        setSearchText(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const toggleDropdown = (field) => {
        setDropdownOpen(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleBlur = (field) => {
        setTouched({
            ...touched,
            [field]: true,
        });
        validateField(field, formData[field]);
    };

    const validateField = (field, value) => {
        let errorMessage = "";

        switch (field) {
            case "username":
                if (!value) errorMessage = "Username is required";
                break;
            case "password":
                if (!value) errorMessage = "Password is required";
                else if (value.length < 6) errorMessage = "Password should be at least 6 characters";
                break;
            case "userType":
                if (!value || value === "Select User Type") errorMessage = "User type selection is required";
                break;
            case "district":
                if ((formData.userType === "District Admin" || formData.userType === "Sub-district Admin") && 
                    (!value || value === "Select District")) {
                    errorMessage = "District selection is required";
                }
                break;
            case "subDistrict":
                if (formData.userType === "Sub-district Admin" && 
                    (!value || value === "Select Sub District")) {
                    errorMessage = "Sub-district selection is required";
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: errorMessage,
        }));

        return errorMessage === "";
    };

    const validateForm = () => {
        const fieldValidations = {
            username: validateField("username", formData.username),
            password: validateField("password", formData.password),
            userType: validateField("userType", formData.userType)
        };

        // Only validate district and subDistrict if needed based on userType
        if (formData.userType === "District Admin" || formData.userType === "Sub-district Admin") {
            fieldValidations.district = validateField("district", formData.district);
        }
        
        if (formData.userType === "Sub-district Admin") {
            fieldValidations.subDistrict = validateField("subDistrict", formData.subDistrict);
        }

        setTouched({
            username: true,
            password: true,
            userType: true,
            district: formData.userType === "District Admin" || formData.userType === "Sub-district Admin",
            subDistrict: formData.userType === "Sub-district Admin"
        });

        return Object.values(fieldValidations).every(Boolean);
    };

    // Added handleCancel function that was missing in the original code
    const handleCancel = () => {
        // Preserve filter parameters when redirecting back
        const filterParams = new URLSearchParams();
        
        // Add the filter parameters that were passed to this page
        if (formData.userType && formData.userType !== "Select User Type") {
            filterParams.append('p', formData.userType);
        } else if (formData.district && formData.district !== "Select District") {
            filterParams.append('p', formData.district);
        } else if (formData.subDistrict && formData.subDistrict !== "Select Sub District") {
            filterParams.append('p', formData.subDistrict);
        }
        
        // Build the URL with filters
        const redirectWithFilters = filterParams.toString() 
            ? `${redirectUrl}?${filterParams.toString()}` 
            : redirectUrl;
        
        navigate(redirectWithFilters);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        
        if (validateForm()) {
            console.log("Form is valid, proceeding with submission");
            
            const reqBody = {
                username: formData.username,
                password: formData.password,
                userType: formData.userType,
                district: formData.district,
                subDistrict: formData.subDistrict
            };

            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                   "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                };

                try {
                    const result = await addStageAPI(reqBody, reqHeader);
                    if (result.status === 200) {
                        alert("User added successfully");
                        
                        // Reset form
                        setFormData({
                            username: "",
                            password: "",
                            userType: "",
                            district: "",
                            subDistrict: ""
                        });
                        setTouched({
                            username: false,
                            password: false,
                            userType: false,
                            district: false,
                            subDistrict: false
                        });
                        
                        // Clear URL parameters as well
                        window.history.pushState({}, '', window.location.pathname);
                        
                        // After successful submission, redirect to the admin page
                        // You can pass additional parameters if needed
                        const successParam = new URLSearchParams();
                        successParam.append('success', 'true');
                        successParam.append('username', reqBody.username);
                        
                        // Navigate to redirect URL with success parameters
                        navigate(`${redirectUrl}?${successParam.toString()}`);
                    } else {
                        alert(result.response.data);
                    }
                } catch (err) {
                    console.log(err);
                    alert("Error adding user. Please try again.");
                }
            } else {
                alert("Authentication token missing. Please log in again.");
            }
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 bg-gray-300 ">
                    <form 
                        className="min-h-screen mx-auto p-6 bg-white rounded-lg shadow-md overflow-hidden"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                                Add User
                            </h2>
                        </div>
                    
                        <div className="mt-10 flex flex-col items-center">
                            <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">User Name</label>
                                <div className="w-full md:w-80">
                                    <input 
                                        type="text" 
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur("username")}
                                        placeholder='Enter Name' 
                                        className='border px-2 py-1 rounded-full w-full border-blue-700' 
                                    />
                                
                                    {touched.username && errors.username && (
                                        <p className="text-sm text-red-500 mt-1">{errors.username}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Password</label>
                                <div className="w-full md:w-80">
                                    <input 
                                        type="password"  
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur("password")}
                                        placeholder='Enter Password' 
                                        className='border px-2 py-1 rounded-full w-full border-blue-700' 
                                    />
                                  
                                    {touched.password && errors.password && (
                                        <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">User Type</label>
                                <div className="w-full md:w-80">
                                    <select
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur("userType")}
                                        className="border px-2 py-1 rounded-full w-full border-blue-600 focus:outline-blue-900"
                                    >
                                        {allUserTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                  
                                    {touched.userType && errors.userType && (
                                        <p className="text-sm text-red-500 mt-1">{errors.userType}</p>
                                    )}
                                </div>
                            </div>
                            
                            {(formData.userType === "District Admin" || formData.userType === "Sub-district Admin") && (
                                <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                    <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">District</label>
                                    <div className="w-full md:w-80">
                                        <div className="relative" ref={districtDropdownRef}>
                                            {/* Custom district dropdown button */}
                                            <div
                                                onClick={() => toggleDropdown('district')}
                                                className="border px-2 py-1 rounded-full w-full border-blue-600 flex justify-between items-center cursor-pointer bg-white"
                                            >
                                                <span>{formData.district || 'Select District'}</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                            
                                            {/* Dropdown menu */}
                                            {dropdownOpen.district && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    {/* Search input */}
                                                    <div className="p-2 border-b">
                                                        <input
                                                            type="text"
                                                            placeholder="Search district..."
                                                            value={searchText.district}
                                                            onChange={(e) => handleSearchChange(e, 'district')}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                    
                                                    {/* Options list */}
                                                    <div className="max-h-48 overflow-y-auto">
                                                        {filteredDistricts.map((district, index) => (
                                                            <div
                                                                key={index}
                                                                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.district === district ? 'bg-blue-200' : ''}`}
                                                                onClick={() => {
                                                                    if (district !== 'No results found') {
                                                                        handleInputChange({
                                                                            target: { name: 'district', value: district }
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                {district}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {touched.district && errors.district && (
                                            <p className="text-sm text-red-500 mt-1">{errors.district}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {/* Only show Sub-district dropdown for Sub-district Admin AND when a valid district is selected */}
                            {formData.userType === "Sub-district Admin" && 
                             formData.district && 
                             formData.district !== "Select District" && (
                                <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                    <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Sub District</label>
                                    <div className="w-full md:w-80">
                                        <div className="relative" ref={subDistrictDropdownRef}>
                                            {/* Custom sub-district dropdown button */}
                                            <div
                                                onClick={() => toggleDropdown('subDistrict')}
                                                className="border px-2 py-1 rounded-full w-full border-blue-600 flex justify-between items-center cursor-pointer bg-white"
                                            >
                                                <span>{formData.subDistrict || 'Select Sub District'}</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                            
                                            {/* Dropdown menu */}
                                            {dropdownOpen.subDistrict && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    {/* Search input */}
                                                    <div className="p-2 border-b">
                                                        <input
                                                            type="text"
                                                            placeholder="Search sub-district..."
                                                            value={searchText.subDistrict}
                                                            onChange={(e) => handleSearchChange(e, 'subDistrict')}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                    
                                                    {/* Options list */}
                                                    <div className="max-h-48 overflow-y-auto">
                                                        {filteredSubDistricts.map((subDistrict, index) => (
                                                            <div
                                                                key={index}
                                                                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.subDistrict === subDistrict ? 'bg-blue-200' : ''}`}
                                                                onClick={() => {
                                                                    if (subDistrict !== 'No results found' && subDistrict !== 'Select Sub District') {
                                                                        handleInputChange({
                                                                            target: { name: 'subDistrict', value: subDistrict }
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                {subDistrict}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {touched.subDistrict && errors.subDistrict && (
                                            <p className="text-sm text-red-500 mt-1">{errors.subDistrict}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="text-right mt-40 mr-40">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="mr-6 bg-gradient-to-r from-[#003566] to-[#05B9F4] bg-clip-text text-transparent border border-blue-600 px-14 py-2 rounded-full"
                            >
                               Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-14 py-2 rounded-full"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddUser 
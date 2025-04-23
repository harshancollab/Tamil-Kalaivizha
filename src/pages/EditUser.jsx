import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Dash from '../components/Dash';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const EditUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useParams();
    
    // Parse redirect URL from query parameters if available
    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get('redirect') || '/admin-panel';

    const allUserTypes = [
        'Select User Type',
        'State Admin',
        'District Admin',
        'Sub-district Admin',
        'All Admin'
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

    // Mock user data for testing
    const mockUserData = {
        username: "testuser",
        userType: "District Admin",
        district: "Palakkad",
        subDistrict: ""
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
    
    // State for loading indicator
    const [isLoading, setIsLoading] = useState(true);
    
    // References to detect clicks outside dropdowns
    const districtDropdownRef = useRef(null);
    const subDistrictDropdownRef = useRef(null);

    // Simulate fetching user data
    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            // Set form data with mock user data
            setFormData({
                username: mockUserData.username,
                password: "", // Leave password empty for security
                userType: mockUserData.userType,
                district: mockUserData.district,
                subDistrict: mockUserData.subDistrict
            });
            setIsLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    // Update available sub-districts when district changes
    useEffect(() => {
        if (formData.district && formData.district !== 'Select District') {
            const subDistricts = districtToSubDistrict[formData.district] || [];
            setFilteredSubDistricts(['Select Sub District', ...subDistricts]);
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
        
        if (name === "userType" && value !== "District Admin" && value !== "Sub-district Admin") {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                district: "",
                subDistrict: ""
            }));
        } else if (name === "userType" && value === "District Admin") {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                subDistrict: ""
            }));
        } else if (name === "district") {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                subDistrict: ""  // Reset sub-district when district changes
            }));
            // Close district dropdown after selection
            setDropdownOpen(prev => ({...prev, district: false}));
            setSearchText(prev => ({...prev, district: ""}));
        } else if (name === "subDistrict") {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
            // Close sub-district dropdown after selection
            setDropdownOpen(prev => ({...prev, subDistrict: false}));
            setSearchText(prev => ({...prev, subDistrict: ""}));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
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
                // Only validate password if it's being changed (not empty)
                if (value && value.length < 6) errorMessage = "Password should be at least 6 characters";
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
            // Skip password validation if it's empty (not being updated)
            password: formData.password ? validateField("password", formData.password) : true,
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
            password: !!formData.password, // Only mark as touched if a new password is being set
            userType: true,
            district: formData.userType === "District Admin" || formData.userType === "Sub-district Admin",
            subDistrict: formData.userType === "Sub-district Admin"
        });

        return Object.values(fieldValidations).every(Boolean);
    };

    const handleCancel = () => {
        // Redirect to admin page or specified redirect URL on cancel
      
        // Uncomment when ready to use with react-router:
        navigate(redirectUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        
        if (!validateForm()) {
            return;
        }
        
        // Create request body, omitting password if it wasn't changed
        const reqBody = new FormData();
        reqBody.append('username', formData.username);
        reqBody.append('userType', formData.userType);
        
        if (formData.userType === "District Admin" || formData.userType === "Sub-district Admin") {
            reqBody.append('district', formData.district);
        }
        
        if (formData.userType === "Sub-district Admin") {
            reqBody.append('subDistrict', formData.subDistrict);
        }
        
        // Only include password if it was changed
        if (formData.password) {
            reqBody.append('password', formData.password);
        }
    
        // Get token from session storage
        const token = sessionStorage.getItem("token");
        
        if (token) {
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            };
            
            try {
                // Replace with your actual API call function
                const result = await updateUserAPI(userId, reqBody, reqHeader);
                
                if (result.status === 200) {
                    alert("User updated successfully!");
                    navigate(redirectUrl);
                }
            } catch (err) {
                console.log(err);
                alert("Failed to update user. Please try again.");
            }
        } else {
            alert("You're not authorized. Please login again.");
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 bg-gray-300">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <div className="text-blue-600 font-semibold">Loading user data...</div>
                        </div>
                    ) : (
                        <form 
                            className="min-h-screen mx-auto p-6 bg-white rounded-lg shadow-md overflow-hidden"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                                    Edit User
                                </h2>
                               
                            </div>
                        
                            <div className="mt-10 flex flex-col items-center">
                                <div className="flex flex-col md:flex-row w-full max-w-md mb-6">
                                    <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">User Name</label>
                                    <div className="w-full md:w-80">
                                        <input 
                                            type="text" 
                                            name="username"
                                           
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
                            <div className="text-center mt-16">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="mr-6 bg-gradient-to-r from-[#003566] to-[#05B9F4] bg-clip-text text-transparent border border-blue-600 px-6 py-2 rounded-full"
                                >
                                   Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-10 py-2 rounded-full"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default EditUser
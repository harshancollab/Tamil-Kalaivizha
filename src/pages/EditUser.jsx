// It Admin user - edit user

// import React, { useState, useRef, useEffect } from 'react'
// import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
// import Dash from '../components/Dash'
// import Header from '../components/Header'
// import Alert from '../components/Alert'
// import Splashscreen from '../components/Splashscreen'
// // import { GetUserByIdAPI, UpdateUserAPI } from '../services/allAPI' 

// const EditUser = () => {
//     const navigate = useNavigate();
//     const { userId } = useParams(); // Get userId from URL params
//     const [searchParams, setSearchParams] = useSearchParams()
//     const [loading, setLoading] = useState(true);
//     const [fetchingUser, setFetchingUser] = useState(true);
    

//     // Alert state
//     const [alert, setAlert] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     const userTypeDropdownRef = useRef(null);
//     const kalolsavamDropdownRef = useRef(null);

//     const allUserTypes = [
//         'Select User Type',
//         'State Admin',
//         'District Admin',
//         'Sub-district Admin'
//     ];

  
//     // Define all Kalolsavams based on user type
//     const kalolsavamsByType = {
//         'Select User Type': ['Select Kalolsavam'],
//         'State Admin': ['Select Kalolsavam', 'Kerala State Kalolsavam'],
//         'District Admin': ['Select Kalolsavam', 'District Kalolsavam','Palakkad District Kalolsavam '],
//         'Sub-district Admin': ['Select Kalolsavam', 'Sub-district Kalolsavam', 'School Kalolsavam']
//     };

//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         userType: '',
//         kalolsavam: ''
//     });

//     const [errors, setErrors] = useState({
//         username: '',
//         password: '',
//         userType: '',
//         kalolsavam: ''
//     });

//     const [dropdownOpen, setDropdownOpen] = useState({
//         userType: false,
//         kalolsavam: false
//     });

//     const [searchText, setSearchText] = useState({
//         userType: '',
//         kalolsavam: ''
//     });

//     // Initialize available Kalolsavams based on current user type
//     const [availableKalolsavams, setAvailableKalolsavams] = useState(kalolsavamsByType['Select User Type']);

//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const filteredUserTypes = searchText.userType
//         ? allUserTypes.filter(type =>
//             type.toLowerCase().includes(searchText.userType.toLowerCase()))
//         : allUserTypes;

//     const filteredKalolsavams = searchText.kalolsavam
//         ? availableKalolsavams.filter(kalolsavam =>
//             kalolsavam.toLowerCase().includes(searchText.kalolsavam.toLowerCase()))
//         : availableKalolsavams;

//     // Fetch user data when component mounts
//     useEffect(() => {
//         const fetchUserData = async () => {
//             setFetchingUser(true);
//             const token = sessionStorage.getItem("token");
            
//             if (token && userId) {
//                 const reqHeader = {
//                     "Authorization": `Bearer ${token}`
//                 };
                
//                 try {
//                     // In a real application, you would uncomment this:
//                     // const result = await GetUserByIdAPI(userId, reqHeader);
//                     // if (result.status === 200) {
//                     //     const userData = result.data;
//                     //     setFormData({
//                     //         username: userData.username,
//                     //         password: '', // Usually you don't pre-fill the password field
//                     //         userType: userData.userType,
//                     //         kalolsavam: userData.kalolsavam
//                     //     });
//                     // }
                    
//                     // For demo purposes, we'll mock the user data
//                     setTimeout(() => {
//                         setFormData({
//                             username: 'existinguser',
//                             password: '', // Password field left empty for security
//                             userType: 'District Admin',
//                             kalolsavam: 'District Kalolsavam'
//                         });
//                         setFetchingUser(false);
//                     }, 1000);
                    
//                 } catch (err) {
//                     console.error("Error fetching user data:", err);
//                     showAlert(`Error fetching user data: ${err.message || 'Unknown error'}`, 'error');
//                     setFetchingUser(false);
//                 }
//             } else {
//                 showAlert("Authentication token missing or user ID not provided.", 'error');
//                 setFetchingUser(false);
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 2000);
//             }
//         };
        
//         fetchUserData();
//     }, [userId, navigate]);

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (userTypeDropdownRef.current && !userTypeDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, userType: false }));
//             }
//             if (kalolsavamDropdownRef.current && !kalolsavamDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Update available Kalolsavams when user type changes
//     useEffect(() => {
//         const userType = formData.userType || 'Select User Type';
//         setAvailableKalolsavams(kalolsavamsByType[userType] || kalolsavamsByType['Select User Type']);
        
//         // Reset kalolsavam selection when user type changes
//         if (formData.kalolsavam && !kalolsavamsByType[userType]?.includes(formData.kalolsavam)) {
//             setFormData(prev => ({
//                 ...prev,
//                 kalolsavam: ''
//             }));
//         }
//     }, [formData.userType]);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, []);

//     const toggleDropdown = (dropdownName) => {
//         setDropdownOpen(prev => ({
//             ...prev,
//             [dropdownName]: !prev[dropdownName]
//         }));
//     };

//     const handleSearchChange = (e, field) => {
//         setSearchText(prev => ({
//             ...prev,
//             [field]: e.target.value
//         }));
//         e.stopPropagation();
//     };

//     const validateField = (name, value) => {
//         switch (name) {
//             case 'username':
//                 if (!value.trim()) return 'Username is required';
//                 if (value.trim().length < 3) return 'Username must be at least 3 characters long';
//                 return '';

//             case 'password':
//                 // Password can be empty in edit form (means no change)
//                 if (value.trim() && value.trim().length < 6) return 'Password must be at least 6 characters long';
//                 return '';

//             case 'userType':
//                 if (!value.trim() || value === 'Select User Type') return 'User type is required';
//                 return '';

//             case 'kalolsavam':
//                 if (!value.trim() || value === 'Select Kalolsavam') return 'Kalolsavam is required';
//                 return '';

//             default:
//                 return '';
//         }
//     };

//     if (loading) {
//         return <Splashscreen />;
//     }

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;

//         // Base fields everyone needs
//         let fieldsToValidate = ['username', 'userType', 'kalolsavam'];
        
//         // Only validate password if it's been changed
//         if (formData.password) {
//             fieldsToValidate.push('password');
//         }

//         fieldsToValidate.forEach(key => {
//             const error = validateField(key, formData[key]);
//             newErrors[key] = error;
//             if (error) isValid = false;
//         });

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData(prev => ({ ...prev, [name]: value }));

//         if (formSubmitted) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name, value)
//             }));
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         handleChange({
//             target: { name, value }
//         });

//         if (name === 'userType') {
//             setDropdownOpen(prev => ({ ...prev, userType: false }));
//             setSearchText(prev => ({ ...prev, userType: '' }));
//         }
//         if (name === 'kalolsavam') {
//             setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
//             setSearchText(prev => ({ ...prev, kalolsavam: '' }));
//         }
//     };

//     const handleCancel = () => {
//         navigate('/admin-panel');
//     };

    
//     const showAlert = (message, type = 'success') => {
//         setAlert({
//             show: true,
//             message,
//             type
//         });
//     };

//     const hideAlert = () => {
//         setAlert({
//             ...alert,
//             show: false
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormSubmitted(true);

//         const isValid = validateForm();

//         if (isValid) {
//             console.log("Form submitted:", formData);

//             const token = sessionStorage.getItem("token");

//             if (token) {
//                 const reqHeader = {
//                     "Authorization": `Bearer ${token}`
//                 };

//                 try {
//                     // Only include password if it was changed
//                     const dataToSubmit = { ...formData };
//                     if (!dataToSubmit.password) {
//                         delete dataToSubmit.password;
//                     }

//                     console.log("Submitting data for update:", dataToSubmit);

//                     // In a real application, you would uncomment this:
//                     // const result = await UpdateUserAPI(userId, dataToSubmit, reqHeader);
                    
//                     // Mock successful response
//                     const result = { status: 200 };

//                     if (result.status === 200) {
//                         showAlert(`User ${formData.username} updated successfully!`, 'success');
                        
//                         setTimeout(() => {
//                             navigate('/admin-panel');
//                         }, 2000);
//                     } else {
//                         showAlert("Failed to update user. Please try again.", 'error');
//                     }
//                 } catch (err) {
//                     console.error("Error updating user:", err);
//                     showAlert(`Error updating user: ${err.message || 'Unknown error'}`, 'error');
//                 }
//             } else {
//                 showAlert("Authentication token missing. Please log in again.", 'error');
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 2000);
//             }
//         } else {
//             console.log("Form has errors:", errors);
//         }
//     };

//     return (
//         <>
//             <div className="bg-white min-h-screen">
//                 <Header />
//                 <div className="flex flex-col sm:flex-row">
//                     <Dash />
//                      {alert.show && (
//                         <Alert 
//                             message={alert.message} 
//                             type={alert.type} 
//                             onClose={hideAlert}
//                             duration={5000} 
//                         />
//                     )}
//                     <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
//                             <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Edit User</h2>

//                             {fetchingUser ? (
//                                 <div className="flex justify-center items-center h-64">
//                                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                                 </div>
//                             ) : (
//                                 <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Username</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <input
//                                                 type="text"
//                                                 name="username"
//                                                 placeholder="Enter username"
//                                                 value={formData.username}
//                                                 onChange={handleChange}
//                                                 className={`w-full px-3 sm:px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                             />
//                                             {errors.username && <p className="text-red-500 text-xs mt-1 ml-2">{errors.username}</p>}
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Password</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <input
//                                                 type="password"
//                                                 name="password"
//                                                 placeholder="Leave empty to keep current password"
//                                                 value={formData.password}
//                                                 onChange={handleChange}
//                                                 className={`w-full px-3 sm:px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                             />
//                                             {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">User Type</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <div className="relative" ref={userTypeDropdownRef}>
//                                                 <div
//                                                     onClick={() => toggleDropdown('userType')}
//                                                     className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.userType ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                                 >
//                                                     <span className="text-gray-600">{formData.userType || 'Select User Type'}</span>
//                                                     <span className="text-xs">▼</span>
//                                                 </div>
//                                                 {dropdownOpen.userType && (
//                                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                         <div className="p-2 border-b">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search user type..."
//                                                                 value={searchText.userType}
//                                                                 onChange={(e) => handleSearchChange(e, 'userType')}
//                                                                 className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                                 onClick={(e) => e.stopPropagation()}
//                                                             />
//                                                         </div>
//                                                         <div className="max-h-48 overflow-y-auto">
//                                                             {filteredUserTypes.length > 0 ? (
//                                                                 filteredUserTypes.map((type, index) => (
//                                                                     <div
//                                                                         key={index}
//                                                                         className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.userType === type ? 'bg-blue-200' : ''}`}
//                                                                         onClick={() => handleInputChange({
//                                                                             target: { name: 'userType', value: type }
//                                                                         })}
//                                                                     >
//                                                                         {type}
//                                                                     </div>
//                                                                 ))
//                                                             ) : (
//                                                                 <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {errors.userType && <p className="text-red-500 text-xs mt-1 ml-2">{errors.userType}</p>}
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Kalolsavam</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <div className="relative" ref={kalolsavamDropdownRef}>
//                                                 <div
//                                                     onClick={() => toggleDropdown('kalolsavam')}
//                                                     className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.kalolsavam ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                                 >
//                                                     <span className="text-gray-600">{formData.kalolsavam || 'Select Kalolsavam'}</span>
//                                                     <span className="text-xs">▼</span>
//                                                 </div>
//                                                 {dropdownOpen.kalolsavam && (
//                                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                         <div className="p-2 border-b">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search kalolsavam..."
//                                                                 value={searchText.kalolsavam}
//                                                                 onChange={(e) => handleSearchChange(e, 'kalolsavam')}
//                                                                 className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                                 onClick={(e) => e.stopPropagation()}
//                                                             />
//                                                         </div>
//                                                         <div className="max-h-48 overflow-y-auto">
//                                                             {filteredKalolsavams.length > 0 ? (
//                                                                 filteredKalolsavams.map((kalolsavam, index) => (
//                                                                     <div
//                                                                         key={index}
//                                                                         className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam ? 'bg-blue-200' : ''}`}
//                                                                         onClick={() => handleInputChange({
//                                                                             target: { name: 'kalolsavam', value: kalolsavam }
//                                                                         })}
//                                                                     >
//                                                                         {kalolsavam}
//                                                                     </div>
//                                                                 ))
//                                                             ) : (
//                                                                 <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {errors.kalolsavam && <p className="text-red-500 text-xs mt-1 ml-2">{errors.kalolsavam}</p>}
//                                         </div>
//                                     </div>
//                                 </form>
//                             )}
                            
//                             <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-10 sm:mt-16 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
//                                 <button
//                                     type="button"
//                                     onClick={handleCancel}
//                                     className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSubmit}
//                                     type="submit"
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
//                                     disabled={fetchingUser}
//                                 >
//                                     Update
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default EditUser;







import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import Dash from '../components/Dash'
import Header from '../components/Header'
import Alert from '../components/Alert'
import Splashscreen from '../components/Splashscreen'
// import { GetUserByIdAPI, UpdateUserAPI } from '../services/allAPI' 


const EditUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL params
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(true);
    const [fetchingUser, setFetchingUser] = useState(true);
    

    // Alert state
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const userTypeDropdownRef = useRef(null);
    const kalolsavamDropdownRef = useRef(null);

    const allUserTypes = [
        'Select User Type',
        'State Admin',
        'District Admin',
        'Sub-district Admin'
    ];

  
    // Define all Kalolsavams based on user type
    const kalolsavamsByType = {
        'Select User Type': ['Select Kalolsavam'],
        'State Admin': ['Select Kalolsavam', 'Kerala State Kalolsavam'],
        'District Admin': ['Select Kalolsavam', 'District Kalolsavam','Palakkad District Kalolsavam '],
        'Sub-district Admin': ['Select Kalolsavam', 'Sub-district Kalolsavam', 'School Kalolsavam']
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        userType: '',
        kalolsavam: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        userType: '',
        kalolsavam: ''
    });

    const [dropdownOpen, setDropdownOpen] = useState({
        userType: false,
        kalolsavam: false
    });

    const [searchText, setSearchText] = useState({
        userType: '',
        kalolsavam: ''
    });

    const [availableKalolsavams, setAvailableKalolsavams] = useState(kalolsavamsByType['Select User Type']);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const filteredUserTypes = searchText.userType
        ? allUserTypes.filter(type =>
            type.toLowerCase().includes(searchText.userType.toLowerCase()))
        : allUserTypes;

    const filteredKalolsavams = searchText.kalolsavam
        ? availableKalolsavams.filter(kalolsavam =>
            kalolsavam.toLowerCase().includes(searchText.kalolsavam.toLowerCase()))
        : availableKalolsavams;

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            setFetchingUser(true);
            
            try {
                // MOCK DATA: This simulates fetching user data from an API
                // Replace this with actual API call when backend is ready:
                // const token = sessionStorage.getItem("token");
                // const reqHeader = { "Authorization": `Bearer ${token}` };
                // const result = await GetUserByIdAPI(userId, reqHeader);
                // const userData = result.data;
                
                // Mock network delay
                setTimeout(() => {
                    // Mock response data - this would come from your API in production
                    const mockUserData = {
                        id: userId || '123', // Use the URL param or fallback
                        username: 'existinguser',
                        userType: 'District Admin',
                        kalolsavam: 'District Kalolsavam'
                    };
                    
                    setFormData({
                        username: mockUserData.username,
                        password: '', 
                        userType: mockUserData.userType,
                        kalolsavam: mockUserData.kalolsavam
                    });
                    
                    setFetchingUser(false);
                }, 1000);
                
            } catch (err) {
                console.error("Error fetching user data:", err);
                showAlert(`Error fetching user data: ${err.message || 'Unknown error'}`, 'error');
                setFetchingUser(false);
            }
        };
        
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userTypeDropdownRef.current && !userTypeDropdownRef.current.contains(event.target)) {
                setDropdownOpen(prev => ({ ...prev, userType: false }));
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

    // Update available Kalolsavams when user type changes
    useEffect(() => {
        const userType = formData.userType || 'Select User Type';
        setAvailableKalolsavams(kalolsavamsByType[userType] || kalolsavamsByType['Select User Type']);
        
        // Reset kalolsavam selection when user type changes
        if (formData.kalolsavam && !kalolsavamsByType[userType]?.includes(formData.kalolsavam)) {
            setFormData(prev => ({
                ...prev,
                kalolsavam: ''
            }));
        }
    }, [formData.userType]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
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
                // Password can be empty in edit form (means no change)
                if (value.trim() && value.trim().length < 6) return 'Password must be at least 6 characters long';
                return '';

            case 'userType':
                if (!value.trim() || value === 'Select User Type') return 'User type is required';
                return '';

            case 'kalolsavam':
                if (!value.trim() || value === 'Select Kalolsavam') return 'Kalolsavam is required';
                return '';

            default:
                return '';
        }
    };

    if (loading) {
        return <Splashscreen />;
    }

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Base fields everyone needs
        let fieldsToValidate = ['username', 'userType', 'kalolsavam'];
        
        // Only validate password if it's been changed
        if (formData.password) {
            fieldsToValidate.push('password');
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
            console.log("Form submitted for update:", formData);

            try {
                // Only include password if it was changed
                const dataToSubmit = { ...formData };
                if (!dataToSubmit.password) {
                    delete dataToSubmit.password;
                }

                // MOCK API CALL: In production, this would be a real API call
                // const token = sessionStorage.getItem("token");
                // const reqHeader = { "Authorization": `Bearer ${token}` };
                // const result = await UpdateUserAPI(userId, dataToSubmit, reqHeader);
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Simulate successful update
                    showAlert(`User ${formData.username} updated successfully!`, 'success');
                    
                    // In production, this would navigate after a successful API response
                    setTimeout(() => {
                        navigate('/admin-panel');
                    }, 2000);
                }, 1000);
                
            } catch (err) {
                console.error("Error updating user:", err);
                showAlert(`Error updating user: ${err.message || 'Unknown error'}`, 'error');
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
                            <div className="flex justify-between items-center mb-5 sm:mb-10">
                                <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
                               
                            </div>

                            {fetchingUser ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
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
                                                placeholder=" password"
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
                                </form>
                            )}
                            
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
                                    disabled={fetchingUser}
                                >
                                    {fetchingUser ? 'Loading...' : 'Update '}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUser



// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
// import Dash from '../components/Dash';
// import Header from '../components/Header';
// // import { EditUserAPI, GetUserDetailsAPI } from '../services/allAPI'; 

// const EditUser = () => {
//     const navigate = useNavigate();
//     const [searchParams, setSearchParams] = useSearchParams();
//     const { userId } = useParams(); // Get userId from URL params

//     const userTypeDropdownRef = useRef(null);
//     const districtDropdownRef = useRef(null);
//     const subDistrictDropdownRef = useRef(null);
//     const kalolsavamDropdownRef = useRef(null);

//     const allUserTypes = [
//         'Select User Type',
//         'State Admin',
//         'District Admin',
//         'Sub-district Admin'
//     ];

//     const Kalolsavams = [
//         'Select Kalolsavam',
//         'Kerala State Kalolsavam',
//         'District Kalolsavam',
//         'Sub-district Kalolsavam',
//         'School Kalolsavam'
//     ];

//     const districtKalolsavm = {
//         'Idukki ': [
//             'Select Kalolsavam',
//             'Idukki District Kalolsavam'
//         ],
//         'Ernakulam ': [
//             'Select Kalolsavam',
//             'Ernakulam District Kalolsavam'
//         ],
//         'Palakkad ': [
//             'Select Kalolsavam',
//             'Palakkad District Kalolsavam'
//         ],
//         'Kozhikode': [
//             'Select Kalolsavam',
//             'Kozhikode District Kalolsavam'
//         ],
//         'Wayanad ': [
//             'Select Kalolsavam',
//             'Wayanad District Kalolsavam'
//         ],
//         'Thrissur': [
//             'Select Kalolsavam',
//             'Thrissur District Kalolsavam'
//         ],
//         'Ottapalam': [
//             'Select Kalolsavam',
//             'Ottapalam District Kalolsavam'
//         ]
//     };

//     const allDistricts = [
//         'Select District',
//         'Idukki ',
//         'Ernakulam ',
//         'Palakkad ',
//         'Kozhikode',
//         'Wayanad ',
//         'Thrissur',
//         'Ottapalam'
//     ];

//     const districtToSubDistrict = {
//         'Idukki ': ['Munnar', 'Adimali', 'Kattappana', 'Nedumkandam', 'Devikulam'],
//         'Palakkad ': ['Chittur', 'Pattambi', 'Kuzhalmannam', 'Nemmara', 'Mannarkkad', 'Ottapalam'],
//         'Ernakulam ': ['Aluva', 'Kochi', 'Perumbavoor', 'Kothamangalam', 'Muvattupuzha'],
//         'Kozhikode': ['Vatakara', 'Koyilandy', 'Thamarassery', 'Koduvally', 'Balussery'],
//         'Wayanad ': ['Sulthan Bathery', 'Mananthavady', 'Kalpetta', 'Vythiri'],
//         'Thrissur': ['Chalakudy', 'Kodungallur', 'Irinjalakuda', 'Guruvayur', 'Chavakkad']
//     };

//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         userType: '',
//         district: '',
//         subDistrict: '',
//         kalolsavam: ''
//     });

//     const [originalData, setOriginalData] = useState(null); // Store original data for comparison
//     const [isLoading, setIsLoading] = useState(true);
//     const [passwordChanged, setPasswordChanged] = useState(false);

//     const [errors, setErrors] = useState({
//         username: '',
//         password: '',
//         userType: '',
//         district: '',
//         subDistrict: '',
//         kalolsavam: ''
//     });

//     const [dropdownOpen, setDropdownOpen] = useState({
//         userType: false,
//         district: false,
//         subDistrict: false,
//         kalolsavam: false
//     });

//     const [searchText, setSearchText] = useState({
//         userType: '',
//         district: '',
//         subDistrict: '',
//         kalolsavam: ''
//     });

//     const [availableSubDistricts, setAvailableSubDistricts] = useState([]);
//     const [availableKalolsavams, setAvailableKalolsavams] = useState([]);

//     // Fetch user data when component mounts
//     useEffect(() => {
//         const fetchUserData = async () => {
//             setIsLoading(true);
//             try {
//                 const token = sessionStorage.getItem("token");
//                 if (!token) {
//                     alert("Authentication token missing. Please log in again.");
//                     navigate('/login');
//                     return;
//                 }

//                 const reqHeader = {
//                     "Authorization": `Bearer ${token}`
//                 };

//                 // Uncomment this when API is ready
//                 // const result = await GetUserDetailsAPI(userId, reqHeader);
//                 // if (result.status === 200) {
//                 //     const userData = result.data;
//                 //     setFormData(userData);
//                 //     setOriginalData(userData);
//                 // } else {
//                 //     alert("Failed to fetch user details");
//                 //     navigate('/admin-panel');
//                 // }

//                 // Mock data for development - Replace with API call when ready
//                 const mockUserData = {
//                     username: 'testuser123',
//                     password: '', // Password field is often empty in edit forms
//                     userType: 'District Admin',
//                     district: 'Ernakulam ',
//                     subDistrict: '',
//                     kalolsavam: 'Ernakulam District Kalolsavam'
//                 };
                
//                 setFormData(mockUserData);
//                 setOriginalData(mockUserData);
                
//             } catch (err) {
//                 console.error("Error fetching user details:", err);
//                 alert("Error fetching user details. Please try again.");
//                 navigate('/admin-panel');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (userId) {
//             fetchUserData();
//         } else {
//             // If no userId provided, redirect to admin panel
//             navigate('/admin-panel');
//         }
//     }, [userId, navigate]);

//     useEffect(() => {
//         // Set sub-districts based on selected district
//         if (formData.district && districtToSubDistrict[formData.district]) {
//             setAvailableSubDistricts(districtToSubDistrict[formData.district]);
//         } else {
//             setAvailableSubDistricts([]);
//         }

//         // Set kalolsavams based on selected district
//         if (formData.district && districtKalolsavm[formData.district]) {
//             setAvailableKalolsavams(districtKalolsavm[formData.district]);
//         } else {
//             setAvailableKalolsavams(Kalolsavams);
//         }

//         // Reset sub-district and kalolsavam when district changes
//         if (originalData && formData.district !== originalData.district) {
//             setFormData(prev => ({
//                 ...prev,
//                 subDistrict: '',
//                 kalolsavam: ''
//             }));
//         }
//     }, [formData.district, originalData]);

//     useEffect(() => {
//         // Handle district from URL params if any
//         const districtParam = searchParams.get('district');

//         if (districtParam && !formData.district) {
//             setFormData(prev => ({
//                 ...prev,
//                 district: districtParam
//             }));
//         }
//     }, [searchParams, formData.district]);

//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const filteredUserTypes = searchText.userType
//         ? allUserTypes.filter(type =>
//             type.toLowerCase().includes(searchText.userType.toLowerCase()))
//         : allUserTypes;

//     const filteredDistricts = searchText.district
//         ? allDistricts.filter(district =>
//             district.toLowerCase().includes(searchText.district.toLowerCase()))
//         : allDistricts;

//     const filteredSubDistricts = searchText.subDistrict
//         ? availableSubDistricts.filter(subDistrict =>
//             subDistrict.toLowerCase().includes(searchText.subDistrict.toLowerCase()))
//         : availableSubDistricts;

//     const filteredKalolsavams = searchText.kalolsavam
//         ? availableKalolsavams.filter(kalolsavam =>
//             kalolsavam.toLowerCase().includes(searchText.kalolsavam.toLowerCase()))
//         : availableKalolsavams;

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (userTypeDropdownRef.current && !userTypeDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, userType: false }));
//             }
//             if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, district: false }));
//             }
//             if (subDistrictDropdownRef.current && !subDistrictDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, subDistrict: false }));
//             }
//             if (kalolsavamDropdownRef.current && !kalolsavamDropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const toggleDropdown = (dropdownName) => {
//         setDropdownOpen(prev => ({
//             ...prev,
//             [dropdownName]: !prev[dropdownName]
//         }));
//     };

//     const handleSearchChange = (e, field) => {
//         setSearchText(prev => ({
//             ...prev,
//             [field]: e.target.value
//         }));
//         e.stopPropagation();
//     };

//     const validateField = (name, value) => {
//         switch (name) {
//             case 'username':
//                 if (!value.trim()) return 'Username is required';
//                 if (value.trim().length < 3) return 'Username must be at least 3 characters long';
//                 return '';

//             case 'password':
//                 // For edit form, password can be empty (unchanged)
//                 if (value && value.trim().length < 6) return 'Password must be at least 6 characters long';
//                 return '';

//             case 'userType':
//                 if (!value.trim() || value === 'Select User Type') return 'User type is required';
//                 return '';

//             case 'district':
//                 if (formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin') {
//                     if (!value.trim() || value === 'Select District') return 'District is required';
//                 }
//                 return '';

//             case 'subDistrict':
//                 if (formData.userType === 'Sub-district Admin') {
//                     if (!value.trim()) return 'Sub-district is required';
//                 }
//                 return '';

//             case 'kalolsavam':
//                 if (formData.district && (!value.trim() || value === 'Select Kalolsavam')) return 'Kalolsavam is required';
//                 return '';

//             default:
//                 return '';
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;

//         // Base fields everyone needs (password not required for edit)
//         let fieldsToValidate = ['username', 'userType'];
        
//         // Validate password only if changed
//         if (formData.password) {
//             fieldsToValidate.push('password');
//         }

//         // Add district requirement for district and sub-district admins
//         if (formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin') {
//             fieldsToValidate.push('district');
//         }

//         // Add sub-district requirement only for sub-district admins
//         if (formData.userType === 'Sub-district Admin') {
//             fieldsToValidate.push('subDistrict');
//         }

//         // Add kalolsavam requirement if district is selected
//         if (formData.district && formData.district !== 'Select District') {
//             fieldsToValidate.push('kalolsavam');
//         }

//         fieldsToValidate.forEach(key => {
//             const error = validateField(key, formData[key]);
//             newErrors[key] = error;
//             if (error) isValid = false;
//         });

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === 'password' && value) {
//             setPasswordChanged(true);
//         }

//         setFormData(prev => ({ ...prev, [name]: value }));

//         if (formSubmitted) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name, value)
//             }));
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         handleChange({
//             target: { name, value }
//         });

//         if (name === 'userType') {
//             setDropdownOpen(prev => ({ ...prev, userType: false }));
//             setSearchText(prev => ({ ...prev, userType: '' }));
//         }
//         if (name === 'district') {
//             setSearchParams({ district: value });
//             setDropdownOpen(prev => ({ ...prev, district: false }));
//             setSearchText(prev => ({ ...prev, district: '' }));
//         }
//         if (name === 'subDistrict') {
//             setDropdownOpen(prev => ({ ...prev, subDistrict: false }));
//             setSearchText(prev => ({ ...prev, subDistrict: '' }));
//         }
//         if (name === 'kalolsavam') {
//             setDropdownOpen(prev => ({ ...prev, kalolsavam: false }));
//             setSearchText(prev => ({ ...prev, kalolsavam: '' }));
//         }
//     };

//     const handleCancel = () => {
//         navigate('/admin-panel');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormSubmitted(true);

//         const isValid = validateForm();

//         if (isValid) {
//             console.log("Form submitted:", formData);

//             const token = sessionStorage.getItem("token");

//             if (token) {
//                 const reqHeader = {
//                     "Authorization": `Bearer ${token}`
//                 };

//                 try {
//                     // Prepare the data for submission
//                     const dataToSubmit = { ...formData };
                    
//                     // If password wasn't changed, remove it from submission
//                     if (!passwordChanged) {
//                         delete dataToSubmit.password;
//                     }

//                     console.log("Submitting data:", dataToSubmit);

//                     // Uncomment when API is ready
//                     // const result = await EditUserAPI(userId, dataToSubmit, reqHeader);

//                     // Simulated response for development
//                     const result = { status: 200 };

//                     if (result.status === 200) {
//                         alert('User updated successfully!');
//                         navigate('/admin-panel');
//                     } else {
//                         alert("Failed to update user");
//                     }
//                 } catch (err) {
//                     console.error("Error updating user:", err);
//                     alert("Error updating user. Please try again.");
//                 }
//             } else {
//                 alert("Authentication token missing. Please log in again.");
//             }
//         } else {
//             console.log("Form has errors:", errors);
//         }
//     };

//     // Function to conditionally show/hide fields based on user type selection
//     const shouldShowField = (fieldName) => {
//         switch (fieldName) {
//             case 'district':
//                 return formData.userType === 'District Admin' || formData.userType === 'Sub-district Admin';
//             case 'subDistrict':
//                 return formData.userType === 'Sub-district Admin';
//             case 'kalolsavam':
//                 return formData.district && formData.district !== 'Select District';
//             default:
//                 return true;
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="bg-white min-h-screen">
//                 <Header />
//                 <div className="flex flex-col sm:flex-row">
//                     <Dash />
//                     <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto flex justify-center items-center">
//                             <div className="text-center">
//                                 <p className="text-xl font-bold text-gray-800">Loading user data...</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="bg-white min-h-screen">
//                 <Header />
//                 <div className="flex flex-col sm:flex-row">
//                     <Dash />
//                     <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
//                             <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Edit User</h2>

//                             <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Username</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             placeholder="Enter username"
//                                             value={formData.username}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.username && <p className="text-red-500 text-xs mt-1 ml-2">{errors.username}</p>}
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">New Password</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             placeholder="Leave blank to keep current password"
//                                             value={formData.password}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">User Type</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <div className="relative" ref={userTypeDropdownRef}>
//                                             <div
//                                                 onClick={() => toggleDropdown('userType')}
//                                                 className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.userType ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                             >
//                                                 <span className="text-gray-600">{formData.userType || 'Select User Type'}</span>
//                                                 <span className="text-xs">▼</span>
//                                             </div>
//                                             {dropdownOpen.userType && (
//                                                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                     <div className="p-2 border-b">
//                                                         <input
//                                                             type="text"
//                                                             placeholder="Search user type..."
//                                                             value={searchText.userType}
//                                                             onChange={(e) => handleSearchChange(e, 'userType')}
//                                                             className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                             onClick={(e) => e.stopPropagation()}
//                                                         />
//                                                     </div>
//                                                     <div className="max-h-48 overflow-y-auto">
//                                                         {filteredUserTypes.length > 0 ? (
//                                                             filteredUserTypes.map((type, index) => (
//                                                                 <div
//                                                                     key={index}
//                                                                     className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.userType === type ? 'bg-blue-200' : ''}`}
//                                                                     onClick={() => handleInputChange({
//                                                                         target: { name: 'userType', value: type }
//                                                                     })}
//                                                                 >
//                                                                     {type}
//                                                                 </div>
//                                                             ))
//                                                         ) : (
//                                                             <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         {errors.userType && <p className="text-red-500 text-xs mt-1 ml-2">{errors.userType}</p>}
//                                     </div>
//                                 </div>

//                                 {shouldShowField('district') && (
//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">District</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <div className="relative" ref={districtDropdownRef}>
//                                                 <div
//                                                     onClick={() => toggleDropdown('district')}
//                                                     className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.district ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                                 >
//                                                     <span className="text-gray-600">{formData.district || 'Select District'}</span>
//                                                     <span className="text-xs">▼</span>
//                                                 </div>
//                                                 {dropdownOpen.district && (
//                                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                         <div className="p-2 border-b">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search district..."
//                                                                 value={searchText.district}
//                                                                 onChange={(e) => handleSearchChange(e, 'district')}
//                                                                 className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                                 onClick={(e) => e.stopPropagation()}
//                                                             />
//                                                         </div>
//                                                         <div className="max-h-48 overflow-y-auto">
//                                                             {filteredDistricts.length > 0 ? (
//                                                                 filteredDistricts.map((district, index) => (
//                                                                     <div
//                                                                         key={index}
//                                                                         className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.district === district ? 'bg-blue-200' : ''}`}
//                                                                         onClick={() => handleInputChange({
//                                                                             target: { name: 'district', value: district }
//                                                                         })}
//                                                                     >
//                                                                         {district}
//                                                                     </div>
//                                                                 ))
//                                                             ) : (
//                                                                 <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {errors.district && <p className="text-red-500 text-xs mt-1 ml-2">{errors.district}</p>}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {shouldShowField('kalolsavam') && (
//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Kalolsavam</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <div className="relative" ref={kalolsavamDropdownRef}>
//                                                 <div
//                                                     onClick={() => toggleDropdown('kalolsavam')}
//                                                     className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.kalolsavam ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                                 >
//                                                     <span className="text-gray-600">{formData.kalolsavam || 'Select Kalolsavam'}</span>
//                                                     <span className="text-xs">▼</span>
//                                                 </div>
//                                                 {dropdownOpen.kalolsavam && (
//                                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                         <div className="p-2 border-b">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search kalolsavam..."
//                                                                 value={searchText.kalolsavam}
//                                                                 onChange={(e) => handleSearchChange(e, 'kalolsavam')}
//                                                                 className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                                 onClick={(e) => e.stopPropagation()}
//                                                             />
//                                                         </div>
//                                                         <div className="max-h-48 overflow-y-auto">
//                                                             {filteredKalolsavams.length > 0 ? (
//                                                                 filteredKalolsavams.map((kalolsavam, index) => (
//                                                                     <div
//                                                                         key={index}
//                                                                         className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam ? 'bg-blue-200' : ''}`}
//                                                                         onClick={() => handleInputChange({
//                                                                             target: { name: 'kalolsavam', value: kalolsavam }
//                                                                         })}
//                                                                     >
//                                                                         {kalolsavam}
//                                                                     </div>
//                                                                 ))
//                                                             ) : (
//                                                                 <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {errors.kalolsavam && <p className="text-red-500 text-xs mt-1 ml-2">{errors.kalolsavam}</p>}
//                                         </div>
//                                     </div>
//                                 )}

//                                   {shouldShowField('subDistrict') && (
//                                     <div className="flex flex-col sm:flex-row sm:items-center">
//                                         <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Sub-district</label>
//                                         <div className="w-full sm:w-2/3">
//                                             <div className="relative" ref={subDistrictDropdownRef}>
//                                                 <div
//                                                     onClick={() => toggleDropdown('subDistrict')}
//                                                     className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.subDistrict ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${availableSubDistricts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                                 >
//                                                     <span className="text-gray-600">{formData.subDistrict || 'Select Sub-district'}</span>
//                                                     <span className="text-xs">▼</span>
//                                                 </div>
//                                                 {dropdownOpen.subDistrict && availableSubDistricts.length > 0 && (
//                                                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                         <div className="p-2 border-b">
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Search sub-district..."
//                                                                 value={searchText.subDistrict}
//                                                                 onChange={(e) => handleSearchChange(e, 'subDistrict')}
//                                                                 className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                                 onClick={(e) => e.stopPropagation()}
//                                                             />
//                                                         </div>
//                                                         <div className="max-h-48 overflow-y-auto">
//                                                             {filteredSubDistricts.length > 0 ? (
//                                                                 filteredSubDistricts.map((subDistrict, index) => (
//                                                                     <div
//                                                                         key={index}
//                                                                         className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.subDistrict === subDistrict ? 'bg-blue-200' : ''}`}
//                                                                         onClick={() => handleInputChange({
//                                                                             target: { name: 'subDistrict', value: subDistrict }
//                                                                         })}
//                                                                     >
//                                                                         {subDistrict}
//                                                                     </div>
//                                                                 ))
//                                                             ) : (
//                                                                 <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {errors.subDistrict && <p className="text-red-500 text-xs mt-1 ml-2">{errors.subDistrict}</p>}
//                                             {formData.district && availableSubDistricts.length === 0 && (
//                                                 <p className="text-amber-600 text-xs mt-1 ml-2">No sub-districts available for the selected district</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}
//                             </form>
//                             <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-10 sm:mt-16 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
//                                 <button
//                                     type="button"
//                                     onClick={handleCancel}
//                                     className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSubmit}
//                                     type="submit"
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
//                                 >
//                                     Update
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default EditUser;

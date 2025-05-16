// It Admin user - add user


// import React, { useState, useRef, useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import Dash from '../components/Dash'
// import Header from '../components/Header'
// import Alert from '../components/Alert'
// // import { AddUserAPI } from '../services/allAPI' 

// const AddUser = () => {
//     const navigate = useNavigate();
//     const [searchParams, setSearchParams] = useSearchParams()
//     const [loading, setLoading] = useState(true);


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
//                 if (!value.trim()) return 'Password is required';
//                 if (value.trim().length < 6) return 'Password must be at least 6 characters long';
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

//     useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//    if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;

//         // Base fields everyone needs
//         let fieldsToValidate = ['username', 'password', 'userType', 'kalolsavam'];

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
//                     const dataToSubmit = { ...formData };

//                     console.log("Submitting data:", dataToSubmit);

//                     // const result = await AddUserAPI(dataToSubmit, reqHeader);

//                     const result = { status: 200 };

//                     if (result.status === 200) {
//                         showAlert(`User ${formData.username} added successfully!`, 'success');

//                         // Reset form
//                         setFormData({
//                             username: '',
//                             password: '',
//                             userType: '',
//                             kalolsavam: ''
//                         });
//                         setFormSubmitted(false);

//                         setTimeout(() => {
//                             navigate('/admin-panel');
//                         }, 2000);
//                     } else {
//                         showAlert("Failed to add user. Please try again.", 'error');
//                     }
//                 } catch (err) {
//                     console.error("Error adding user:", err);
//                     showAlert(`Error adding user: ${err.message || 'Unknown error'}`, 'error');
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
//                             <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Add User</h2>

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
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Password</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             placeholder="Enter password"
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

//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Kalolsavam</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <div className="relative" ref={kalolsavamDropdownRef}>
//                                             <div
//                                                 onClick={() => toggleDropdown('kalolsavam')}
//                                                 className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.kalolsavam ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                             >
//                                                 <span className="text-gray-600">{formData.kalolsavam || 'Select Kalolsavam'}</span>
//                                                 <span className="text-xs">▼</span>
//                                             </div>
//                                             {dropdownOpen.kalolsavam && (
//                                                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                     <div className="p-2 border-b">
//                                                         <input
//                                                             type="text"
//                                                             placeholder="Search kalolsavam..."
//                                                             value={searchText.kalolsavam}
//                                                             onChange={(e) => handleSearchChange(e, 'kalolsavam')}
//                                                             className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                             onClick={(e) => e.stopPropagation()}
//                                                         />
//                                                     </div>
//                                                     <div className="max-h-48 overflow-y-auto">
//                                                         {filteredKalolsavams.length > 0 ? (
//                                                             filteredKalolsavams.map((kalolsavam, index) => (
//                                                                 <div
//                                                                     key={index}
//                                                                     className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam ? 'bg-blue-200' : ''}`}
//                                                                     onClick={() => handleInputChange({
//                                                                         target: { name: 'kalolsavam', value: kalolsavam }
//                                                                     })}
//                                                                 >
//                                                                     {kalolsavam}
//                                                                 </div>
//                                                             ))
//                                                         ) : (
//                                                             <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         {errors.kalolsavam && <p className="text-red-500 text-xs mt-1 ml-2">{errors.kalolsavam}</p>}
//                                     </div>
//                                 </div>
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
//                                     Add
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AddUser;


// It Admin user - add user

// import React, { useState, useRef, useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import Dash from '../components/Dash'
// import Header from '../components/Header'
// import Alert from '../components/Alert'
// import { addAdminAPI } from '../services/allAPI'

// const AddUser = () => {
//     const navigate = useNavigate();
//     const [searchParams, setSearchParams] = useSearchParams()
//     const [loading, setLoading] = useState(true);

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
//         "State Admin",
//         "District Admin",
//         "Sub-District Admin",
//         "School Admin",
//     ];




//     // Define all Kalolsavams based on user type
//     const kalolsavamsByType = {
//         'Select User Type': ['Select Kalolsavam'],
//         'State Admin': ['Select Kalolsavam', 'Kerala State Kalolsavam'],
//         'District Admin': ['Select Kalolsavam', 'District Kalolsavam', 'Palakkad District Kalolsavam'],
//         'Sub-District Admin': ['Select Kalolsavam', 'Sub-district Kalolsavam', 'School Kalolsavam'],
//         'School Admin': ['Select Kalolsavam', 'Sub-district Kalolsavam', 'School Kalolsavam']

//     };

//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         name: '',
//         email: '',
//         userType: '',
//         kalolsavam: ''
//     });

//     const [errors, setErrors] = useState({
//         username: '',
//         password: '',
//         name: '',
//         email: '',
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
//     // Add a flag to track submission status
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const filteredUserTypes = searchText.userType
//         ? allUserTypes.filter(type =>
//             type.toLowerCase().includes(searchText.userType.toLowerCase()))
//         : allUserTypes;

//     const filteredKalolsavams = searchText.kalolsavam
//         ? availableKalolsavams.filter(kalolsavam =>
//             kalolsavam.toLowerCase().includes(searchText.kalolsavam.toLowerCase()))
//         : availableKalolsavams;

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
//                 if (!value.trim()) return 'Password is required';
//                 if (value.trim().length < 6) return 'Password must be at least 6 characters long';
//                 return '';

//             case 'name':
//                 if (!value.trim()) return 'Name is required';
//                 return '';

//             case 'email':
//                 if (!value.trim()) return 'Email is required';
//                 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 if (!emailRegex.test(value)) return 'Please enter a valid email address';
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

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, []);

//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;

//         // Base fields everyone needs
//         let fieldsToValidate = ['username', 'password', 'name', 'email', 'userType', 'kalolsavam'];

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

//         // Prevent multiple submissions
//         if (isSubmitting) return;

//         const isValid = validateForm();

//         if (isValid) {
//             setIsSubmitting(true);
//             console.log("Form submitted:", formData);

//             const token = sessionStorage.getItem("token");

//             if (token) {
//                 const reqHeader = {
//                     "Authorization": `Bearer ${token}`
//                 };

//                 try {
//                     // Fixed: Proper formatting of user_type for API
//                     // Especially important for "Sub district Admin" value
//                     const dataToSubmit = {
//                         name: formData.name,
//                         email_address: formData.email,
//                         username: formData.username,
//                         password: formData.password,
//                         user_type: formData.userType, 
//                         kalolsavam: formData.kalolsavam
//                     };

//                     console.log("Submitting data:", dataToSubmit);

//                     const result = await addAdminAPI(dataToSubmit, reqHeader);

//                     console.log("API Response:", result);

//                     // Improved response handling
//                     if (result && result.status >= 200 && result.status < 300) {
//                         showAlert(`User ${formData.username} added successfully!`, 'success');

//                         // Reset form
//                         setFormData({
//                             username: '',
//                             password: '',
//                             name: '',
//                             email: '',
//                             userType: '',
//                             kalolsavam: ''
//                         });
//                         setFormSubmitted(false);

//                         // Allow user to see success message before redirecting
//                         setTimeout(() => {
//                             navigate('/admin-panel');
//                         }, 2000);
//                     } else {
//                         // Handle API error response
//                         const errorMsg = result?.response?.data?.message ||
//                             result?.response?.message ||
//                             result?.message ||
//                             'Server error. Please try again.';
//                         showAlert(`Failed to add user: ${errorMsg}`, 'error');
//                     }
//                 } catch (err) {
//                     console.error("Error adding user:", err);

//                     // More descriptive error handling
//                     let errorMessage = "Unknown error occurred";

//                     if (err.response) {
//                         // Server responded with error
//                         errorMessage = err.response.data?.message || `Error: ${err.response.status}`;
//                         console.log("Error response data:", err.response.data);
//                     } else if (err.request) {
//                         // No response received
//                         errorMessage = "No response from server. Please check your connection.";
//                     } else {
//                         // Error in request setup
//                         errorMessage = err.message || "Failed to process request";
//                     }

//                     showAlert(`Error adding user: ${errorMessage}`, 'error');
//                 } finally {
//                     // Reset submission state
//                     setIsSubmitting(false);
//                 }
//             } else {
//                 showAlert("Authentication token missing. Please log in again.", 'error');
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 2000);
//                 setIsSubmitting(false);
//             }
//         } else {
//             console.log("Form has errors:", errors);
//             showAlert("Please fix the errors in the form before submitting.", 'error');
//         }
//     };

//     return (
//         <>
//             <div className="bg-white min-h-screen">
//                 <Header />
//                 <div className="flex flex-col sm:flex-row">
//                     <Dash />

//                     {/* Fixed position for alert so it's always visible */}
//                     <div className="fixed top-5 right-5 z-50">
//                         {alert.show && (
//                             <Alert
//                                 message={alert.message}
//                                 type={alert.type}
//                                 onClose={hideAlert}
//                                 duration={5000}
//                             />
//                         )}
//                     </div>

//                     <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
//                             <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Add User</h2>

//                             <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
//                                 {/* Name field */}
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Full Name</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             placeholder="Enter full name"
//                                             value={formData.name}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name}</p>}
//                                     </div>
//                                 </div>

//                                 {/* Email field */}
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Email</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             placeholder="Enter email address"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
//                                     </div>
//                                 </div>

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
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Password</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             placeholder="Enter password"
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

//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Kalolsavam</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <div className="relative" ref={kalolsavamDropdownRef}>
//                                             <div
//                                                 onClick={() => toggleDropdown('kalolsavam')}
//                                                 className={`border px-3 sm:px-4 py-2 rounded-full w-full ${errors.kalolsavam ? 'border-red-500' : 'border-blue-600'} flex justify-between items-center cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                             >
//                                                 <span className="text-gray-600">{formData.kalolsavam || 'Select Kalolsavam'}</span>
//                                                 <span className="text-xs">▼</span>
//                                             </div>
//                                             {dropdownOpen.kalolsavam && (
//                                                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                                                     <div className="p-2 border-b">
//                                                         <input
//                                                             type="text"
//                                                             placeholder="Search kalolsavam..."
//                                                             value={searchText.kalolsavam}
//                                                             onChange={(e) => handleSearchChange(e, 'kalolsavam')}
//                                                             className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                                             onClick={(e) => e.stopPropagation()}
//                                                         />
//                                                     </div>
//                                                     <div className="max-h-48 overflow-y-auto">
//                                                         {filteredKalolsavams.length > 0 ? (
//                                                             filteredKalolsavams.map((kalolsavam, index) => (
//                                                                 <div
//                                                                     key={index}
//                                                                     className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam ? 'bg-blue-200' : ''}`}
//                                                                     onClick={() => handleInputChange({
//                                                                         target: { name: 'kalolsavam', value: kalolsavam }
//                                                                     })}
//                                                                 >
//                                                                     {kalolsavam}
//                                                                 </div>
//                                                             ))
//                                                         ) : (
//                                                             <div className="px-4 py-2 text-gray-500">No results found</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         {errors.kalolsavam && <p className="text-red-500 text-xs mt-1 ml-2">{errors.kalolsavam}</p>}
//                                     </div>
//                                 </div>
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
//                                     disabled={isSubmitting}
//                                     className={`bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//                                 >
//                                     {isSubmitting ? 'Adding...' : 'Add'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AddUser;


import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Dash from '../components/Dash'
import Header from '../components/Header'
import Alert from '../components/Alert'
import { addAdminAPI } from '../services/allAPI'

const AddUser = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(true);

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
        "State Admin",
        "District Admin",
        "Sub-District Admin",
        "School Admin",
    ];

    // Define all Kalolsavams based on user type with ID mappings
    const kalolsavamsByType = {
        'Select User Type': [{ id: '', name: 'Select Kalolsavam' }],
        'State Admin': [
            { id: '', name: 'Select Kalolsavam' },
            { id: '1', name: 'Kerala State Kalolsavam' }
        ],
        'District Admin': [
            { id: '', name: 'Select Kalolsavam' },
            { id: '2', name: 'District Kalolsavam' },
            { id: '3', name: 'Palakkad District Kalolsavam' }
        ],
        'Sub-District Admin': [
            { id: '', name: 'Select Kalolsavam' },
            { id: '4', name: 'Sub-district Kalolsavam' },
            { id: '5', name: 'School Kalolsavam' }
        ],
        'School Admin': [
            { id: '', name: 'Select Kalolsavam' },
            { id: '4', name: 'Sub-district Kalolsavam' },
            { id: '5', name: 'School Kalolsavam' }
        ]
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        userType: '',
        kalolsavam: '',
        kalolsavamId: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
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

    // Initialize available Kalolsavams based on current user type
    const [availableKalolsavams, setAvailableKalolsavams] = useState(kalolsavamsByType['Select User Type']);

    const [formSubmitted, setFormSubmitted] = useState(false);
    // Add a flag to track submission status
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredUserTypes = searchText.userType
        ? allUserTypes.filter(type =>
            type.toLowerCase().includes(searchText.userType.toLowerCase()))
        : allUserTypes;

    const filteredKalolsavams = searchText.kalolsavam
        ? availableKalolsavams.filter(kalolsavam =>
            kalolsavam.name.toLowerCase().includes(searchText.kalolsavam.toLowerCase()))
        : availableKalolsavams;

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
        if (formData.kalolsavam) {
            const kalolsavamExists = kalolsavamsByType[userType]?.some(k => k.name === formData.kalolsavam);
            if (!kalolsavamExists) {
                setFormData(prev => ({
                    ...prev,
                    kalolsavam: '',
                    kalolsavamId: ''
                }));
            }
        }
    }, [formData.userType]);

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

            case 'name':
                if (!value.trim()) return 'Name is required';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
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

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Base fields everyone needs
        let fieldsToValidate = ['username', 'password', 'name', 'email', 'userType', 'kalolsavam'];

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

        
        if (name === 'kalolsavam') {
            const selectedKalolsavam = availableKalolsavams.find(k => k.name === value);
            if (selectedKalolsavam) {
                setFormData(prev => ({
                    ...prev,
                    kalolsavam: value,
                    kalolsavamId: selectedKalolsavam.id
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    kalolsavam: value,
                    kalolsavamId: ''
                }));
            }
        } else {
            handleChange({
                target: { name, value }
            });
        }

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

        // Prevent multiple submissions
        if (isSubmitting) return;

        const isValid = validateForm();

        if (isValid) {
            setIsSubmitting(true);
            console.log("Form submitted:", formData);

            const token = sessionStorage.getItem("token");

            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };

                try {
                    // Include kalolsavamId in the API request
                    const dataToSubmit = {
                        name: formData.name,
                        email_address: formData.email,
                        username: formData.username,
                        password: formData.password,
                        user_type: formData.userType,
                        kalolsavam: formData.kalolsavam,
                        kalolsavam_id: formData.kalolsavamId  // Add the ID to be passed to backend
                    };

                    console.log("Submitting data:", dataToSubmit);

                    const result = await addAdminAPI(dataToSubmit, reqHeader);

                    console.log("API Response:", result);

                    // Improved response handling
                    if (result && result.status >= 200 && result.status < 300) {
                        showAlert(`User ${formData.username} added successfully!`, 'success');

                        // Reset form
                        setFormData({
                            username: '',
                            password: '',
                            name: '',
                            email: '',
                            userType: '',
                            kalolsavam: '',
                            kalolsavamId: ''
                        });
                        setFormSubmitted(false);

                        // Allow user to see success message before redirecting
                        setTimeout(() => {
                            navigate('/admin-panel');
                        }, 2000);
                    } else {
                        // Handle API error response
                        const errorMsg = result?.response?.data?.message ||
                            result?.response?.message ||
                            result?.message ||
                            'Server error. Please try again.';
                        showAlert(`Failed to add user: ${errorMsg}`, 'error');
                    }
                } catch (err) {
                    console.error("Error adding user:", err);

                    // More descriptive error handling
                    let errorMessage = "Unknown error occurred";

                    if (err.response) {
                        // Server responded with error
                        errorMessage = err.response.data?.message || `Error: ${err.response.status}`;
                        console.log("Error response data:", err.response.data);
                    } else if (err.request) {
                        // No response received
                        errorMessage = "No response from server. Please check your connection.";
                    } else {
                        // Error in request setup
                        errorMessage = err.message || "Failed to process request";
                    }

                    showAlert(`Error adding user: ${errorMessage}`, 'error');
                } finally {
                    // Reset submission state
                    setIsSubmitting(false);
                }
            } else {
                showAlert("Authentication token missing. Please log in again.", 'error');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                setIsSubmitting(false);
            }
        } else {
            console.log("Form has errors:", errors);
            showAlert("Please fix the errors in the form before submitting.", 'error');
        }
    };

    return (
        <>
            <div className="bg-white min-h-screen">
                <Header />
                <div className="flex flex-col sm:flex-row">
                    <Dash />

                    {/* Fixed position for alert so it's always visible */}
                    <div className="fixed top-5 right-5 z-50">
                        {alert.show && (
                            <Alert
                                message={alert.message}
                                type={alert.type}
                                onClose={hideAlert}
                                duration={5000}
                            />
                        )}
                    </div>

                    <div className="flex-1 p-2 sm:p-4 bg-gray-300">
                        <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
                            <h2 className="text-xl font-bold mb-5 sm:mb-10 text-gray-800">Add User</h2>

                            <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                {/* Name field */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Full Name</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name}</p>}
                                    </div>
                                </div>

                                {/* Email field */}
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Email</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
                                    </div>
                                </div>

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
                                                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${formData.kalolsavam === kalolsavam.name ? 'bg-blue-200' : ''}`}
                                                                    onClick={() => handleInputChange({
                                                                        target: { name: 'kalolsavam', value: kalolsavam.name }
                                                                    })}
                                                                >
                                                                    {kalolsavam.name}
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
                                    disabled={isSubmitting}
                                    className={`bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add'}
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
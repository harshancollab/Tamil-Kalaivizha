// IT Admin  Festival REG List - Add Festivel

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Dash from '../components/Dash';
// import Header from '../components/Header';
// import Alert from '../components/Alert';
// import { AddFestivalAPI } from '../services/allAPI';

// const item = () => {
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [alert, setAlert] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     const [formData, setFormData] = useState({
//         festivalName: '',
//         fromClass: '',
//         toClass: ''
//     });

//     const [errors, setErrors] = useState({
//         festivalName: '',
//         fromClass: '',
//         toClass: ''
//     });

//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const validateField = (name, value, allValues = formData) => {
//         switch (name) {
//             case 'festivalName':
//                 if (!value.trim()) return 'Festival name is required';
//                 if (value.trim().length < 3) return 'Festival name must be at least 3 characters long';
//                 return '';
//             case 'fromClass':
//                 if (!value.trim()) return 'From class is required';
//                 if (isNaN(value)) return 'Class must be a number';
//                 return '';
//             case 'toClass':
//                 if (!value.trim()) return 'To class is required';
//                 if (isNaN(value)) return 'Class must be a number';
//                 const fromClassNum = parseInt(allValues.fromClass);
//                 const toClassNum = parseInt(value);
//                 if (!isNaN(fromClassNum) && !isNaN(toClassNum) && toClassNum <= fromClassNum) {
//                     return 'To Class must be greater than From Class';
//                 }
//                 return '';
//             default:
//                 return '';
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;
//         Object.keys(formData).forEach(key => {
//             const error = validateField(key, formData[key], formData);
//             newErrors[key] = error;
//             if (error) isValid = false;
//         });
//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const updatedFormData = { ...formData, [name]: value };
//         setFormData(updatedFormData);

//         if (formSubmitted) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name, value, updatedFormData)
//             }));

//             if (name === 'fromClass' && updatedFormData.toClass) {
//                 setErrors(prev => ({
//                     ...prev,
//                     toClass: validateField('toClass', updatedFormData.toClass, updatedFormData)
//                 }));
//             }
//         }
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => setLoading(false), 1000);
//         return () => clearTimeout(timer);
//     }, []);

//     const showAlert = (message, type = 'success') => {
//         setAlert({ show: true, message, type });
//     };

//     const hideAlert = () => {
//         setAlert({ ...alert, show: false });
//     };

//     const handleCancel = () => {
//         navigate('/FestivalRegiList');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormSubmitted(true);

//         if (validateForm()) {
//             const token = sessionStorage.getItem("token");
//             const reqHeader = {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             };

//             const processedData = {
//                 festivel_name: formData.festivalName,
//                 from_class: Number(formData.fromClass),
//                 to_class: Number(formData.toClass)
//             };

//             try {
//                 const result = await AddFestivalAPI(processedData, reqHeader);
//                 console.log('API Response:', result);

//                 if (result.status === 200 || result.status === 201) {
//                     showAlert('Festival added successfully!');
//                     setFormData({ festivalName: '', fromClass: '', toClass: '' });
//                     setFormSubmitted(false);
//                     setTimeout(() => navigate('/FestivalList'), 2000);
//                 } else {
//                     showAlert(result.data?.message || 'Failed to add festival', 'error');
//                 }
//             } catch (err) {
//                 console.error('Full API Error:', err);
//                 if (err.response) {
//                     showAlert(err.response.data?.message || 'Server error. Please try again.', 'error');
//                 } else if (err.request) {
//                     showAlert('No response from server. Check your connection.', 'error');
//                 } else {
//                     showAlert('Error sending request. Please try again.', 'error');
//                 }
//             }
//         } else {
//             showAlert('Please fix the errors before submitting', 'error');
//         }
//     };

//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col md:flex-row min-h-screen">
//                     <Dash />
//                     <div className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
//                         <div className="text-center">
//                             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
//                             <p className="mt-2 text-gray-600">Loading...</p>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     return (
//         <>
//             <div className="bg-white min-h-screen">
//                 <Header />
//                 <div className="flex flex-col sm:flex-row">
//                     <Dash />
//                     {alert.show && (
//                         <Alert
//                             message={alert.message}
//                             type={alert.type}
//                             onClose={hideAlert}
//                             duration={5000}
//                         />
//                     )}
//                     <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
//                             <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add Festival</h2>
//                             <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
//                                 {/* Festival Name */}
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
// <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="text"
//                                             name="festivalName"
//                                             placeholder="Enter Festival"
//                                             value={formData.festivalName}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.festivalName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.festivalName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festivalName}</p>}
//                                     </div>
//                                 </div>

//                                 {/* From Class */}
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">From Class</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="number"
//                                             name="fromClass"
//                                             placeholder="Enter Class"
//                                             value={formData.fromClass}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.fromClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.fromClass && <p className="text-red-500 text-xs mt-1 ml-2">{errors.fromClass}</p>}
//                                     </div>
//                                 </div>

//                                 {/* To Class */}
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
// <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">To Class</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="number"
//                                             name="toClass"
//                                             placeholder="Enter Class"
//                                             value={formData.toClass}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.toClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.toClass && <p className="text-red-500 text-xs mt-1 ml-2">{errors.toClass}</p>}
//                                     </div>
//                                 </div>
//                             </form>

//                             {/* Buttons */}
// <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-16 sm:mt-32 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
//     <button
//         type="button"
//         onClick={handleCancel}
//         className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full hover:bg-blue-50 transition-colors duration-300"
//     >
//         Cancel
//     </button>
//     <button
//         onClick={handleSubmit}
//         type="submit"
//         className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full hover:from-[#002244] hover:to-[#049ccf] transition-colors duration-300"
//     >
//         Submit
//     </button>
// </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default item;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Dash from '../components/Dash';
// import Header from '../components/Header';
// import Alert from '../components/Alert';
// import { AddFestivalAPI } from '../services/allAPI';

// function AddFestival() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         festivalName: '',
//         fromClass: '',
//         toClass: ''
//     });
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
//     const [errors, setErrors] = useState({
//         festivalName: '',
//         fromClass: '',
//         toClass: ''
//     });

//     const validateField = (name, value, allValues = formData) => {
//         switch (name) {
//             case 'festivalName':
//                 if (!value.trim()) return 'Festival name is required';
//                 if (value.trim().length < 3) return 'Festival name must be at least 3 characters long';
//                 return '';
//             case 'fromClass':
//                 if (!value.trim()) return 'From class is required';
//                 if (isNaN(value)) return 'Class must be a number';
//                 return '';
//             case 'toClass':
//                 if (!value.trim()) return 'To class is required';
//                 if (isNaN(value)) return 'Class must be a number';
//                 const fromClassNum = parseInt(allValues.fromClass);
//                 const toClassNum = parseInt(value);
//                 if (!isNaN(fromClassNum) && !isNaN(toClassNum) && toClassNum <= fromClassNum) {
//                     return 'To Class must be greater than From Class';
//                 }
//                 return '';
//             default:
//                 return '';
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;
//         Object.keys(formData).forEach(key => {
//             const error = validateField(key, formData[key], formData);
//             newErrors[key] = error;
//             if (error) isValid = false;
//         });
//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const updatedFormData = { ...formData, [name]: value };
//         setFormData(updatedFormData);

//         if (formSubmitted) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name, value, updatedFormData)
//             }));

//             if (name === 'fromClass' && updatedFormData.toClass) {
//                 setErrors(prev => ({
//                     ...prev,
//                     toClass: validateField('toClass', updatedFormData.toClass, updatedFormData)
//                 }));
//             }
//         }
//     };

//     const showAlert = (message, type = 'success') => {
//         setAlert({ show: true, message, type });
//         setTimeout(() => setAlert({ ...alert, show: false }), 3000);
//     };

//     const handleCancel = () => {
//         navigate('/FestivalRegiList');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormSubmitted(true);

//         if (validateForm()) {
//             const token = sessionStorage.getItem("token");
//             const reqHeader = {

//                 Authorization: token
//             };

//             const processedData = {
//                 festivel_name: formData.festivalName,
//                 from_class: Number(formData.fromClass),
//                 to_class: Number(formData.toClass)
//             };

//             try {
//                 const result = await AddFestivalAPI(processedData, reqHeader);
//                 console.log('API Response:', result);

//                 if (result.status === 200 || result.status === 201) {
//                     showAlert('Festival added successfully!');
//                     setFormData({ festivalName: '', fromClass: '', toClass: '' });
//                     setFormSubmitted(false);
//                     setTimeout(() => navigate('/FestivalList'), 2000);
//                 } else {
//                     showAlert(result.data?.message || 'Failed to add festival', 'error');
//                 }
//             } catch (err) {
//                 console.error('Full API Error:', err);
//                 if (err.response) {
//                     console.error('Response error data:', err.response.data);
//                     showAlert(err.response.data?.message || 'Server error. Please try again.', 'error');
//                 } else if (err.request) {
//                     showAlert('No response from server. Check your connection.', 'error');
//                 } else {
//                     showAlert('Error sending request. Please try again.', 'error');
//                 }
//             }
//         } else {
//             showAlert('Please fix the errors before submitting', 'error');
//         }
//     };

//     return (
//         <div className="bg-white  min-h-screen">
//             <Header />
//             <div className="flex flex-col sm:flex-row">
//                 <Dash />
//                 {alert.show && (
//                     <Alert
//                         message={alert.message}
//                         type={alert.type}
//                         onClose={() => setAlert({ ...alert, show: false })}
//                         duration={3000}
//                     />
//                 )}
//                 <div className="flex-1 p-4 sm:p-6 bg-gray-100">
//                     <div className="bg-white shadow-md rounded-lg p-6  min-h-screen mx-auto">
//                         <h2 className="text-xl font-semibold mb-6 text-gray-800">Add Festival</h2>

//                         <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
//                             <div className='flex flex-col sm:flex-row sm:items-cente'>
//                                 {/* <label htmlFor="festivalName" className="block text-gray-700 text-sm font-bold mb-2">
//                                     Festival Name
//                                 </label> */}
//                                 <label htmlFor="festivalName" className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival</label>
//                                 <div className="w-full sm:w-2/3">

//                                     <input
//                                         type="text"
//                                         id="festivalName"
//                                         name="festivalName"
//                                         value={formData.festivalName}
//                                         onChange={handleChange}
//                                         className={`w-full px-3 sm:px-4 py-2 border ${errors.festivalName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         placeholder="Enter Festival Name"
//                                     />
//                                     {errors.festivalName && <p className="text-red-500 text-xs italic">{errors.festivalName}</p>}
//                                 </div>
//                             </div>
//                             <div className='className="flex flex-col sm:flex-row sm:items-center'>
//                                 {/* <label htmlFor="fromClass" className="block text-gray-700 text-sm font-bold mb-2">
//                                     From Class
//                                 </label> */}
//                                 <label htmlFor="fromClass" className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">From Class</label>
//                                 <div className="w-full sm:w-2/3">
//                                     <input
//                                         type="number"
//                                         id="fromClass"
//                                         name="fromClass"
//                                         value={formData.fromClass}
//                                         onChange={handleChange}
//                                         className={`w-full px-3 sm:px-4 py-2 border ${errors.fromClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         placeholder="Enter From Class"
//                                     />
//                                     {errors.fromClass && <p className="text-red-500 text-xs italic">{errors.fromClass}</p>}
//                                 </div>
//                             </div>
//                             <div className="flex flex-col sm:flex-row sm:items-center">
//                                 {/* <label htmlFor="toClass" className="block text-gray-700 text-sm font-bold mb-2">
//                                     To Class
//                                 </label> */}
//                                 <label htmlFor="toClass" className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">To Class</label>
//                                 <div className="w-full sm:w-2/3">
//                                     <input
//                                         type="number"
//                                         id="toClass"
//                                         name="toClass"
//                                         value={formData.toClass}
//                                         onChange={handleChange}
//                                         className={`w-full px-3 sm:px-4 py-2 border ${errors.toClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         placeholder="Enter To Class"
//                                     />
//                                     {errors.toClass && <p className="text-red-500 text-xs italic">{errors.toClass}</p>}
//                                 </div>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <button
//                                     type="button"
//                                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                     onClick={handleCancel}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                 >
//                                     Add Festival
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddFestival;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
import Alert from '../components/Alert';
import { AddFestivalAPI } from '../services/allAPI';

function AddFestival() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        festivalName: '',
        fromClass: '',
        toClass: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({
        festivalName: '',
        fromClass: '',
        toClass: ''
    });

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

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
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
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        if (formSubmitted) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value, updatedFormData)
            }));

            if (name === 'fromClass' && updatedFormData.toClass) {
                setErrors(prev => ({
                    ...prev,
                    toClass: validateField('toClass', updatedFormData.toClass, updatedFormData)
                }));
            }
        }
    };

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    };

    const handleCancel = () => {
        navigate('/FestivalRegiList');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (validateForm()) {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: token
            };

            const processedData = {
                festivel_name: formData.festivalName,
                from_class: Number(formData.fromClass),
                to_class: Number(formData.toClass)
            };

            try {
                const result = await AddFestivalAPI(processedData, reqHeader);
                console.log('API Response:', result);

                if (result.status === 200 || result.status === 201) {
                    showAlert('Festival added successfully!');
                    setFormData({ festivalName: '', fromClass: '', toClass: '' });
                    setFormSubmitted(false);
                    setTimeout(() => navigate('/FestivalRegiList'), 2000);
                } else {
                    showAlert(result.data?.message || 'Failed to add festival', 'error');
                }
            } catch (err) {
                console.error('Full API Error:', err);
                if (err.response) {
                    console.error('Response error data:', err.response.data);
                    showAlert(err.response.data?.message || 'Server error. Please try again.', 'error');
                } else if (err.request) {
                    showAlert('No response from server. Check your connection.', 'error');
                } else {
                    showAlert('Error sending request. Please try again.', 'error');
                }
            }
        } else {
            showAlert('Please fix the errors before submitting', 'error');
        }
    };

    return (
        <div className="bg-white  min-h-screen">
            <Header />
            <div className="flex flex-col sm:flex-row">
                <Dash />
                {alert.show && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ ...alert, show: false })}
                        duration={3000}
                    />
                )}
                <div className="flex-1 p-4 sm:p-6 bg-gray-100">
                    <div className="bg-white shadow-md rounded-lg p-6  min-h-screen mx-auto">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Add Festival</h2>

                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                            <div className='flex flex-col sm:flex-row sm:items-center'>
                                <label htmlFor="festivalName" className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival</label>
                                <div className="w-full sm:w-2/3">
                                    <input
                                        type="text"
                                        id="festivalName"
                                        name="festivalName"
                                        value={formData.festivalName}
                                        onChange={handleChange}
                                        className={`w-full px-3 sm:px-4 py-2 border ${errors.festivalName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        placeholder="Enter Festival Name"
                                    />
                                    {errors.festivalName && <p className="text-red-500 text-xs italic">{errors.festivalName}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <label htmlFor="fromClass" className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">From Class</label>
                                <div className="w-full sm:w-2/3">
                                    <input
                                        type="number"
                                        id="fromClass"
                                        name="fromClass"
                                        value={formData.fromClass}
                                        onChange={handleChange}
                                        className={`w-full px-3 sm:px-4 py-2 border ${errors.fromClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        placeholder="Enter From Class"
                                    />
                                    {errors.fromClass && <p className="text-red-500 text-xs italic">{errors.fromClass}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <label htmlFor="toClass" className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">To Class</label>
                                <div className="w-full sm:w-2/3">
                                    <input
                                        type="number"
                                        id="toClass"
                                        name="toClass"
                                        value={formData.toClass}
                                        onChange={handleChange}
                                        className={`w-full px-3 sm:px-4 py-2 border ${errors.toClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        placeholder="Enter To Class"
                                    />
                                    {errors.toClass && <p className="text-red-500 text-xs italic">{errors.toClass}</p>}
                                </div>
                            </div>

                            <div className="mt-16 sm:mt-24 md:mt-32">
                                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="w-full sm:w-auto bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-8 md:px-12 rounded-full hover:bg-blue-50 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="w-full sm:w-auto bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-8 md:px-12 rounded-full hover:from-[#002244] hover:to-[#049ccf] transition-colors duration-300"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFestival;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AddFestivalAPI } from '../services/allAPI';


// function AddFestival() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         festivalName: '',
//         fromClass: '',
//         toClass: ''
//     });
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [alert, setAlert] = useState(null);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const showAlert = (message, type = 'success') => {
//         setAlert({ message, type });
//         setTimeout(() => setAlert(null), 3000);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormSubmitted(true);

//         if (formData.festivalName && formData.fromClass && formData.toClass) {
//             const token = sessionStorage.getItem("token");
//             const reqHeader = {

//                 Authorization: token
//             };

//             // Correctly matching API fields
//             const processedData = {
//                 festivel_name: formData.festivalName,
//                 from_class: Number(formData.fromClass),
//                 to_class: Number(formData.toClass)
//             };

//             try {
//                 const result = await AddFestivalAPI(processedData, reqHeader);
//                 console.log('API Response:', result);

//                 if (result.status === 200 || result.status === 201) {
//                     showAlert('Festival added successfully!');
//                     setFormData({ festivalName: '', fromClass: '', toClass: '' });
//                     setFormSubmitted(false);
//                     setTimeout(() => navigate('/FestivalList'), 2000);
//                 } else {
//                     showAlert(result.data?.message || 'Failed to add festival', 'error');
//                 }
//             } catch (err) {
//                 console.error('Full API Error:', err);
//                 if (err.response) {
//                     console.error('Response error data:', err.response.data);
//                     showAlert(err.response.data?.message || 'Server error. Please try again.', 'error');
//                 } else if (err.request) {
//                     showAlert('No response from server. Check your connection.', 'error');
//                 } else {
//                     showAlert('Error sending request. Please try again.', 'error');
//                 }
//             }
//         } else {
//             showAlert('Please fill all the fields', 'error');
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Add Festival</h2>
//             {alert && (
//                 <div className={`alert alert-${alert.type === 'error' ? 'danger' : 'success'}`} role="alert">
//                     {alert.message}
//                 </div>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="festivalName" className="form-label">Festival Name</label>
//                     <input
//                         type="text"
//                         className={`form-control ${formSubmitted && !formData.festivalName ? 'is-invalid' : ''}`}
//                         id="festivalName"
//                         name="festivalName"
//                         value={formData.festivalName}
//                         onChange={handleChange}
//                     />
//                     {formSubmitted && !formData.festivalName && <div className="invalid-feedback">Please enter festival name.</div>}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="fromClass" className="form-label">From Class</label>
//                     <input
//                         type="number"
//                         className={`form-control ${formSubmitted && !formData.fromClass ? 'is-invalid' : ''}`}
//                         id="fromClass"
//                         name="fromClass"
//                         value={formData.fromClass}
//                         onChange={handleChange}
//                     />
//                     {formSubmitted && !formData.fromClass && <div className="invalid-feedback">Please enter from class.</div>}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="toClass" className="form-label">To Class</label>
//                     <input
//                         type="number"
//                         className={`form-control ${formSubmitted && !formData.toClass ? 'is-invalid' : ''}`}
//                         id="toClass"
//                         name="toClass"
//                         value={formData.toClass}
//                         onChange={handleChange}
//                     />
//                     {formSubmitted && !formData.toClass && <div className="invalid-feedback">Please enter to class.</div>}
//                 </div>
//                 <button type="submit" className="btn btn-primary">Add Festival</button>
//             </form>
//         </div>
//     );
// }

// export default AddFestival;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Dash from '../components/Dash';
// import Header from '../components/Header';
// import Alert from '../components/Alert';
// import { AddFestivalAPI } from '../services/allAPI';

// const AddFestival = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         festivalName: '',
//         fromClass: '',
//         toClass: ''
//     });
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
//     const [errors, setErrors] = useState({
//         festivalName: '',
//         fromClass: '',
//         toClass: ''
//     });

//     const validateField = (name, value, allValues = formData) => {
//         switch (name) {
//             case 'festivalName':
//                 if (!value.trim()) return 'Festival name is required';
//                 if (value.trim().length < 3) return 'Festival name must be at least 3 characters long';
//                 return '';
//             case 'fromClass':
//                 if (!value.trim()) return 'From class is required';
//                 if (isNaN(value)) return 'Class must be a number';
//                 return '';
//             case 'toClass':
//                 if (!value.trim()) return 'To class is required';
//                 if (isNaN(value)) return 'Class must be a number';
//                 const fromClassNum = parseInt(allValues.fromClass);
//                 const toClassNum = parseInt(value);
//                 if (!isNaN(fromClassNum) && !isNaN(toClassNum) && toClassNum <= fromClassNum) {
//                     return 'To Class must be greater than From Class';
//                 }
//                 return '';
//             default:
//                 return '';
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         let isValid = true;
//         Object.keys(formData).forEach(key => {
//             const error = validateField(key, formData[key], formData);
//             newErrors[key] = error;
//             if (error) isValid = false;
//         });
//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const updatedFormData = { ...formData, [name]: value };
//         setFormData(updatedFormData);

//         if (formSubmitted) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name, value, updatedFormData)
//             }));

//             if (name === 'fromClass' && updatedFormData.toClass) {
//                 setErrors(prev => ({
//                     ...prev,
//                     toClass: validateField('toClass', updatedFormData.toClass, updatedFormData)
//                 }));
//             }
//         }
//     };

//     const showAlert = (message, type = 'success') => {
//         setAlert({ show: true, message, type });
//         setTimeout(() => setAlert({ ...alert, show: false }), 5000);
//     };

//     const handleCancel = () => {
//         navigate('/FestivalRegiList');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormSubmitted(true);

//         if (validateForm()) {
//             const token = sessionStorage.getItem("token");
//             const reqHeader = {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             };

//             const processedData = {
//                 festivel_name: formData.festivalName,
//                 from_class: Number(formData.fromClass),
//                 to_class: Number(formData.toClass)
//             };

//             try {
//                 const result = await AddFestivalAPI(processedData, reqHeader);
//                 console.log('API Response:', result);

//                 if (result.status === 200 || result.status === 201) {
//                     showAlert('Festival added successfully!');
//                     setFormData({ festivalName: '', fromClass: '', toClass: '' });
//                     setFormSubmitted(false);
//                     setTimeout(() => navigate('/FestivalList'), 2000);
//                 } else {
//                     showAlert(result.data?.message || 'Failed to add festival', 'error');
//                 }
//             } catch (err) {
//                 console.error('Full API Error:', err);
//                 if (err.response) {
//                     showAlert(err.response.data?.message || 'Server error. Please try again.', 'error');
//                 } else if (err.request) {
//                     showAlert('No response from server. Check your connection.', 'error');
//                 } else {
//                     showAlert('Error sending request. Please try again.', 'error');
//                 }
//             }
//         } else {
//             showAlert('Please fix the errors before submitting', 'error');
//         }
//     };

//     return (
//         <div className="bg-white min-h-screen">
//             <Header />
//             <div className="flex flex-col sm:flex-row">
//                 <Dash />
//                 <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                     <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
//                         <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Add Festival</h2>
//                         <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto" onSubmit={handleSubmit}>
//                             {/* Festival Name */}
//                             <div className="flex flex-col sm:flex-row sm:items-center">
//                                 <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival</label>
//                                 <div className="w-full sm:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="festivalName"
//                                         placeholder="Enter Festival"
//                                         value={formData.festivalName}
//                                         onChange={handleChange}
//                                         className={`w-full px-3 sm:px-4 py-2 border ${errors.festivalName ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                     />
//                                     {errors.festivalName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festivalName}</p>}
//                                 </div>
//                             </div>

//                             {/* From Class */}
//                             <div className="flex flex-col sm:flex-row sm:items-center">
//                                 <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">From Class</label>
//                                 <div className="w-full sm:w-2/3">
//                                     <input
//                                         type="number"
//                                         name="fromClass"
//                                         placeholder="Enter Class"
//                                         value={formData.fromClass}
//                                         onChange={handleChange}
//                                         className={`w-full px-3 sm:px-4 py-2 border ${errors.fromClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                     />
//                                     {errors.fromClass && <p className="text-red-500 text-xs mt-1 ml-2">{errors.fromClass}</p>}
//                                 </div>
//                             </div>

//                             {/* To Class */}
//                             <div className="flex flex-col sm:flex-row sm:items-center">
//                                 <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">To Class</label>
//                                 <div className="w-full sm:w-2/3">
//                                     <input
//                                         type="number"
//                                         name="toClass"
//                                         placeholder="Enter Class"
//                                         value={formData.toClass}
//                                         onChange={handleChange}
//                                         className={`w-full px-3 sm:px-4 py-2 border ${errors.toClass ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                     />
//                                     {errors.toClass && <p className="text-red-500 text-xs mt-1 ml-2">{errors.toClass}</p>}
//                                 </div>
//                             </div>

//                             {/* Buttons */}
//                             <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-16 sm:mt-32 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
//                                 <button
//                                     type="button"
//                                     onClick={handleCancel}
//                                     className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full hover:bg-blue-50 transition-colors duration-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full hover:from-[#002244] hover:to-[#049ccf] transition-colors duration-300"
//                                 >
//                                     Submit
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             {alert.show && (
//                 <Alert
//                     message={alert.message}
//                     type={alert.type}
//                     onClose={() => setAlert({ ...alert, show: false })}
//                     duration={5000}
//                 />
//             )}
//         </div>
//     );
// };

// export default AddFestival;
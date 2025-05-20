// IT Admin  Festival REG List - Edit Festivel
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Dash from '../components/Dash';
// import Header from '../components/Header';
// import { getSingleFestAPI, updateFestivalAPI } from '../services/allAPI';
// import Alert from '../components/Alert';

// const EditFestival = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();

//     const [formData, setFormData] = useState({
//         festivel_name: '',
//         from_class: '',
//         to_class: ''
//     });

//     const [errors, setErrors] = useState({
//         festivel_name: '',
//         from_class: '',
//         to_class: ''
//     });

//     const [alert, setAlert] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchFestivalData = async () => {
//             if (!id) {
//                 showAlert("Festival ID not found", "error");
//                 navigate('/FestivalRegiList');
//                 return;
//             }

//             const token = sessionStorage.getItem("token");
//             if (!token) {
//                 showAlert("Authentication token not found. Please log in again.", "error");
//                 navigate('/login');
//                 return;
//             }

//             try {
//                 const reqHeader = {
//                     "Authorization": token
//                 };
//                 const result = await getSingleFestAPI(id, reqHeader);
                
//                 if (result.status === 200 && result.data.festivel) {
//                     setFormData({
//                         festivel_name: result.data.festivel.festivel_name || '',
//                         from_class: result.data.festivel.from_class !== undefined ? String(result.data.festivel.from_class) : '',
//                         to_class: result.data.festivel.to_class !== undefined ? String(result.data.festivel.to_class) : ''
//                     });
//                 } else {
//                     showAlert("Festival not found", "error");
//                     navigate('/FestivalRegiList');
//                 }
//             } catch (err) {
//                 console.error("Error fetching festival:", err);
//                 showAlert("Error loading festival data. Please try again.", "error");
//                 navigate('/FestivalRegiList');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchFestivalData();
//     }, [id, navigate]);

//     const validateField = (name, value, allValues = formData) => {
//         switch (name) {
//             case 'festivel_name':
//                 if (!value.trim()) return 'Festival name is required';
//                 if (value.trim().length < 3) return 'Festival name must be at least 3 characters long';
//                 return '';

//             case 'from_class':
//                 if (!value.trim()) return 'From class is required';
//                 if (isNaN(value)) return 'Class must be a number';
//                 return '';

//             case 'to_class':
//                 if (!value.trim()) return 'To class is required';
//                 if (isNaN(value)) return 'Class must be a number';

//                 const fromClassNum = parseInt(allValues.from_class);
//                 const toClassNum = parseInt(value);

//                 if (!isNaN(fromClassNum) && !isNaN(toClassNum) && toClassNum <= fromClassNum) {
//                     return 'To Class must be greater than From Class';
//                 }
//                 return '';

//             default:
//                 return '';
//         }
//     };

//     const showAlert = (message, type = 'success') => {
//         // First hide any existing alert to prevent stacking
//         setAlert({
//             show: false,
//             message: '',
//             type: 'success'
//         });

//         // Use timeout to ensure state updates properly before showing new alert
//         setTimeout(() => {
//             setAlert({
//                 show: true,
//                 message,
//                 type
//             });

//             // Auto hide after 3 seconds
//             setTimeout(() => {
//                 hideAlert();
//             }, 3000);
//         }, 100);
//     };

//     const hideAlert = () => {
//         setAlert(prev => ({
//             ...prev,
//             show: false
//         }));
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

//             if (name === 'from_class' && updatedFormData.to_class) {
//                 setErrors(prev => ({
//                     ...prev,
//                     to_class: validateField('to_class', updatedFormData.to_class, updatedFormData)
//                 }));
//             }
//         }
//     };

//     const handleCancel = () => {
//         navigate('/FestivalRegiList');
//     };

//     const handleSubmit = async () => {
//         setFormSubmitted(true);
        
//         // Validate the form before submission
//         if (!validateForm()) {
//             showAlert("Please fix the errors in the form", "error");
//             return;
//         }
        
//         const { festivel_name, from_class, to_class } = formData;

//         if (festivel_name && from_class && to_class) {
//             const reqBody = new FormData();
//             reqBody.append("festivel_name", festivel_name);
//             reqBody.append("from_class", from_class);
//             reqBody.append("to_class", to_class);
            
//             const token = sessionStorage.getItem("token");
//             if (token) {
//                 const reqHeader = {
//                     "Authorization": token
//                 };
                
//                 try {
//                     const result = await updateFestivalAPI(id, reqBody, reqHeader);
//                     if (result.status === 200) {
//                         showAlert('Festival updated successfully!', 'success');
//                         setTimeout(() => {
//                             navigate('/FestivalRegiList');
//                         }, 2000);
//                     } else {
//                         showAlert(`Update failed: ${result.data?.message || 'Unknown error'}`, 'error');
//                     }
//                 } catch (err) {
//                     console.error("Error updating festival:", err);
//                     showAlert(`Error: ${err.response?.data?.message || 'Failed to update festival'}`, 'error');
//                 }
//             } else {
//                 showAlert("Authentication token not found. Please log in again.", "error");
//                 navigate('/login');
//             }
//         } else {
//             showAlert("Please fill the form completely!", "error");
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="bg-white min-h-screen">
//                 <Header />
//                 <div className="flex flex-col sm:flex-row">
//                     <Dash />
//                     <div className="flex-1 p-2 sm:p-4 bg-gray-300">
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto flex items-center justify-center">
//                             <p className="text-lg text-gray-600">Loading festival data...</p>
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
//                         {alert.show && (
//                             <Alert
//                                 message={alert.message}
//                                 type={alert.type}
//                                 onClose={hideAlert}
//                             />
//                         )}
//                         <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
//                             <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Edit Festival</h2>

//                             <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival Name</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="text"
//                                             name="festivel_name"
//                                             placeholder="Enter Festival Name"
//                                             value={formData.festivel_name}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.festivel_name ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.festivel_name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festivel_name}</p>}
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">From Class</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="number"
//                                             name="from_class"
//                                             placeholder="Enter From Class"
//                                             value={formData.from_class}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.from_class ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.from_class && <p className="text-red-500 text-xs mt-1 ml-2">{errors.from_class}</p>}
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col sm:flex-row sm:items-center">
//                                     <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">To Class</label>
//                                     <div className="w-full sm:w-2/3">
//                                         <input
//                                             type="number"
//                                             name="to_class"
//                                             placeholder="Enter To Class"
//                                             value={formData.to_class}
//                                             onChange={handleChange}
//                                             className={`w-full px-3 sm:px-4 py-2 border ${errors.to_class ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
//                                         />
//                                         {errors.to_class && <p className="text-red-500 text-xs mt-1 ml-2">{errors.to_class}</p>}
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-16 sm:mt-32 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
//                                     <button
//                                         type="button"
//                                         onClick={handleCancel}
//                                         className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:bg-blue-50 transition-colors duration-300"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white font-bold py-2 px-6 sm:py-3 sm:px-10 md:px-14 rounded-full focus:outline-none focus:shadow-outline w-full sm:w-auto hover:opacity-90 transition-opacity duration-300"
//                                     >
//                                         Update
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default EditFestival;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dash from '../components/Dash';
import Header from '../components/Header';
import { getSingleFestAPI, updateFestivalAPI } from '../services/allAPI';
import Alert from '../components/Alert';

const EditFestival = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        festivel_name: '',
        from_class: '',
        to_class: ''
    });

    const [errors, setErrors] = useState({
        festivel_name: '',
        from_class: '',
        to_class: ''
    });

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success'
    });



    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFestivalData = async () => {
            if (!id) {
                alert("Festival ID not found");
                navigate('/FestivalRegiList');
                return;
            }

            const token = sessionStorage.getItem("token");
            if (!token) {
                // Handle unauthenticated user, redirect to login or show an error
                alert("Authentication token not found. Please log in again.");
                navigate('/login'); // Replace '/login' with your actual login route
                return;
            }

            try {
                const reqHeader = {
                    "Authorization": token
                };
                const result = await getSingleFestAPI(id, reqHeader);
                if (result.status === 200 && result.data.festivel) {
                    setFormData({
                        festivel_name: result.data.festivel.festivel_name || '',
                        from_class: result.data.festivel.from_class !== undefined ? String(result.data.festivel.from_class) : '',
                        to_class: result.data.festivel.to_class !== undefined ? String(result.data.festivel.to_class) : ''
                    });
                } else {
                    alert("Festival not found");
                    navigate('/FestivalRegiList');
                }
            } catch (err) {
                console.error("Error fetching festival:", err);
                alert("Error loading festival data. Please try again.");
                navigate('/FestivalRegiList');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFestivalData();
    }, [id, navigate]);

    const validateField = (name, value, allValues = formData) => {
        switch (name) {
            case 'festivel_name':
                if (!value.trim()) return 'Festival name is required';
                if (value.trim().length < 3) return 'Festival name must be at least 3 characters long';
                return '';

            case 'from_class':
                if (!value.trim()) return 'From class is required';
                if (isNaN(value)) return 'Class must be a number';
                return '';

            case 'to_class':
                if (!value.trim()) return 'To class is required';
                if (isNaN(value)) return 'Class must be a number';

                const fromClassNum = parseInt(allValues.from_class);
                const toClassNum = parseInt(value);

                if (!isNaN(fromClassNum) && !isNaN(toClassNum) && toClassNum <= fromClassNum) {
                    return 'To Class must be greater than From Class';
                }
                return '';

            default:
                return '';
        }
    };

    const showAlert = (message, type = 'success') => {
        // First hide any existing alert to prevent stacking
        setAlert({
            show: false,
            message: '',
            type: 'success'
        });

        // Use timeout to ensure state updates properly before showing new alert
        setTimeout(() => {
            setAlert({
                show: true,
                message,
                type
            });

            // Auto hide after 3 seconds
            setTimeout(() => {
                hideAlert();
            }, 3000);
        }, 100);
    };

    const hideAlert = () => {
        setAlert(prev => ({
            ...prev,
            show: false
        }));
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

            if (name === 'from_class' && updatedFormData.to_class) {
                setErrors(prev => ({
                    ...prev,
                    to_class: validateField('to_class', updatedFormData.to_class, updatedFormData)
                }));
            }
        }
    };

    const handleCancel = () => {
        navigate('/FestivalRegiList');
    };


    // const handleSubmit = async () => {
    //     const { festivel_name, from_class, to_class } = formData;

    //     if (festivel_name && from_class && to_class) {
    //         const reqBody = new FormData()
    //         reqBody.append("festivel_name", festivel_name)
    //         reqBody.append("from_class", from_class)
    //         reqBody.append("to_class", to_class)
    //         const token = sessionStorage.getItem("token");
    //         if (token) {
    //             const reqHeader = {
    //                 "Authorization": token

    //             }
    //             try {
    //                 const result = await updateFestivalAPI(id, reqBody, reqHeader)
    //                 if (result.status == 200) {
    //                     showAlert('Festival updated successfully!')
    //                     navigate('/FestivalRegiList')
    //                 }

    //             } catch (err) {
    //                 console.log(err);

    //             }

    //         }

    //     } else {
    //         showAlert("Please fill the form completely!")

    //     }
    // }

const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isValid = validateForm();

    if (!isValid) {
        console.log("Form has errors:", errors);
        return;
    }

    const { festivel_name, from_class, to_class } = formData;

    if (festivel_name && from_class && to_class) {
        const token = sessionStorage.getItem("token");
        if (!token) {
            showAlert("Authentication token not found. Please log in again.");
            navigate('/login');
            return;
        }

        try {
            const reqBody = {
                festivel_name: festivel_name,
                from_class: parseInt(from_class),
                to_class: parseInt(to_class)
            };
            const reqHeader = {
                "Authorization": token
            };

            const result = await updateFestivalAPI(id, reqBody, reqHeader);
            if (result.status === 200) {
                showAlert('Festival updated successfully!');
                navigate('/FestivalRegiList');
            } else {
                throw new Error("Failed to update festival");
            }
        } catch (err) {
            console.error("Error updating festival:", err);
            showAlert("Error updating festival. Please try again.");
        }
    } else {
        showAlert("Please fill the form completely!");
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
                            <p className="text-lg text-gray-600">Loading festival data...</p>
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
                    {alert.show && (
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={hideAlert}
                        />
                    )}
                    <div className="flex-1 p-2 sm:p-4 bg-gray-300">
                        <div className="bg-gray-50 p-3 sm:p-6 pt-4 min-h-screen mx-auto">
                            <h2 className="text-lg font-bold mb-5 sm:mb-10 text-gray-800">Edit Festival</h2>

                            <form className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">Festival Name</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="text"
                                            name="festivel_name"
                                            placeholder="Enter Festival Name"
                                            value={formData.festivel_name}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.festivel_name ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.festivel_name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.festivel_name}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">From Class</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="number"
                                            name="from_class"
                                            placeholder="Enter From Class"
                                            value={formData.from_class}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.from_class ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.from_class && <p className="text-red-500 text-xs mt-1 ml-2">{errors.from_class}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">To Class</label>
                                    <div className="w-full sm:w-2/3">
                                        <input
                                            type="number"
                                            name="to_class"
                                            placeholder="Enter To Class"
                                            value={formData.to_class}
                                            onChange={handleChange}
                                            className={`w-full px-3 sm:px-4 py-2 border ${errors.to_class ? 'border-red-500' : 'border-blue-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 bg-white`}
                                        />
                                        {errors.to_class && <p className="text-red-500 text-xs mt-1 ml-2">{errors.to_class}</p>}
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-16 sm:mt-32 sm:mr-10 md:mr-18 lg:mr-40 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
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





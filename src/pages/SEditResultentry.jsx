import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
// import { updateResultentryAPI, getResultentryByIdAPI } from '../services/allAPI'
import { useNavigate, useParams } from 'react-router-dom'

const SEditResultentry = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the result entry ID from URL parameters

    // Mock database of item codes (similar to DAddStagedurat)
    const itemDatabase = {
        '101': { name: 'Essay Writing', participants: '3', judges: '4' },
        '202': { name: 'Research Paper', participants: '1', judges: '3' },
        '304': { name: 'Story Writing', participants: '2', judges: '5' },
        '405': { name: 'Technical Report', participants: '4', judges: '3' },
        '506': { name: 'Presentation', participants: '5', judges: '4' }
    };

    const [formData, setFormData] = useState({
        itemCode: '',
        itemName: '',
        participants: '',
        judges: '',
        regNo: '',
        code: '',
        mark1: '',
        mark2: '',
        mark3: '',
        total: '',
        markPercentage: '',
        rank: '',
        grade: '',
        point: ''
    });

    const [errors, setErrors] = useState({
        itemCode: '',
        regNo: '',
        code: '',
        mark1: '',
        mark2: '',
        mark3: '',
        markPercentage: '',
        rank: '',
        grade: '',
        point: ''
    });

    const [touched, setTouched] = useState({
        itemCode: false,
        regNo: false,
        code: false,
        mark1: false,
        mark2: false,
        mark3: false,
        markPercentage: false,
        rank: false,
        grade: false,
        point: false
    });

    // // Fetch existing result entry data when component mounts
    // useEffect(() => {
    //     const fetchResultEntry = async () => {
    //         const token = sessionStorage.getItem("token");
    //         if (token && id) {
    //             const reqHeader = {
    //                 "Authorization": `Bearer ${token}`
    //             };
    //             try {
    //                 const result = await getResultentryByIdAPI(id, reqHeader);
    //                 if (result.status === 200) {
    //                     const resultData = result.data;
                        
    //                     // Get additional item info from database based on itemCode
    //                     const itemData = itemDatabase[resultData.itemCode] || { name: '', participants: '', judges: '' };
                        
    //                     setFormData({
    //                         ...resultData,
    //                         itemName: itemData.name,
    //                         participants: itemData.participants,
    //                         judges: itemData.judges
    //                     });
    //                 }
    //             } catch (err) {
    //                 console.log(err);
    //                 alert("Failed to fetch result entry data. Please try again.");
    //             }
    //         } else {
    //             alert("Authentication token not found or ID missing.");
    //             navigate('/all-resultentry');
    //         }
    //     };

    //     fetchResultEntry();
    // }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Special handling for itemCode
        if (name === 'itemCode') {
            const itemData = itemDatabase[value] || { name: '', participants: '', judges: '' };
            
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                itemName: itemData.name,
                participants: itemData.participants,
                judges: itemData.judges
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
        
        validateField(name, value);
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
            case "itemCode":
                if (!value) errorMessage = "Item code is required";
                else if (!/^[A-Za-z0-9]+$/.test(value)) errorMessage = "Item code should be alphanumeric";
                break;
            case "regNo":
                if (!value) errorMessage = "Registration number is required";
                else if (!/^[A-Za-z0-9]+$/.test(value)) errorMessage = "Registration number should be alphanumeric";
                break;
            case "code":
                if (!value) errorMessage = "Code is required";
                else if (!/^[A-Za-z0-9]+$/.test(value)) errorMessage = "Code should be alphanumeric";
                break;
            case "mark1":
            case "mark2":
            case "mark3":
                if (!value) errorMessage = "Mark is required";
                else if (isNaN(value) || parseFloat(value) < 0) errorMessage = "Please enter a valid positive number";
                break;
            case "markPercentage":
                if (!value) errorMessage = "Mark percentage is required";
                else if (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100)
                    errorMessage = "Please enter a valid percentage (0-100)";
                break;
            case "rank":
                if (!value) errorMessage = "Rank is required";
                break;
            case "grade":
                if (!value) errorMessage = "Grade is required";
                break;
            case "point":
                if (!value) errorMessage = "Point is required";
                else if (isNaN(value)) errorMessage = "Please enter a valid number";
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
            itemCode: validateField("itemCode", formData.itemCode),
            regNo: validateField("regNo", formData.regNo),
            code: validateField("code", formData.code),
            mark1: validateField("mark1", formData.mark1),
            mark2: validateField("mark2", formData.mark2),
            mark3: validateField("mark3", formData.mark3),
            markPercentage: validateField("markPercentage", formData.markPercentage),
            rank: validateField("rank", formData.rank),
            grade: validateField("grade", formData.grade),
            point: validateField("point", formData.point)
        };

        // Mark all fields as touched
        setTouched({
            itemCode: true,
            regNo: true,
            code: true,
            mark1: true,
            mark2: true,
            mark3: true,
            markPercentage: true,
            rank: true,
            grade: true,
            point: true
        });

        return Object.values(fieldValidations).every(Boolean);
    };

    // Calculate total automatically when marks are entered
    useEffect(() => {
        if (formData.mark1 && formData.mark2 && formData.mark3) {
            const total = Number(formData.mark1) + Number(formData.mark2) + Number(formData.mark3);
            setFormData(prev => ({
                ...prev,
                total: total.toString()
            }));
        }
    }, [formData.mark1, formData.mark2, formData.mark3]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const {
            regNo,
            code,
            mark1,
            mark2,
            mark3,
            total,
            markPercentage,
            rank,
            grade,
            point
        } = formData;

        if (
            regNo &&
            code &&
            mark1 &&
            mark2 &&
            mark3 &&
            total &&
            markPercentage &&
            rank &&
            grade &&
            point
        ) {
            // api call 
            const reqBody = new FormData();
            reqBody.append("regNo", regNo);
            reqBody.append("code", code);
            reqBody.append("mark1", mark1);
            reqBody.append("mark2", mark2);
            reqBody.append("mark3", mark3);
            reqBody.append("total", total);
            reqBody.append("markPercentage", markPercentage);
            reqBody.append("rank", rank);
            reqBody.append("grade", grade);
            reqBody.append("point", point);

            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                try {
                    // Update existing entry
                    const result = await updateResultentryAPI(id, reqBody, reqHeader);
                    if (result.status === 200) { // Assuming 200 OK status for successful update
                        alert("Result entry updated successfully");
                        navigate('/all-resultentry');
                    }
                } catch (err) {
                    console.log(err);
                    alert("Failed to update result entry. Please try again.");
                }
            } else {
                alert("Authentication token not found.");
            }
        } else {
            alert("Please fill the form completely!");
        }
    };

    const handleCancel = () => {
        navigate('/all-resultentry');
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-2 md:p-2 w-full">
                    <form
                        className="bg-white p-3 md:p-4 rounded-lg shadow-md w-full min-h-screen"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4 mt-2 md:mb-5 md:mt-3">
                            <h2 className="text-xl md:text-2xl font-semibold">Edit Result Entry</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6 text-[#003566] p-2 md:p-4">
                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Item Code</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="itemCode"
                                        value={formData.itemCode}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("itemCode")}
                                        className={`border ${touched.itemCode && errors.itemCode ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.itemCode && errors.itemCode && (
                                        <p className="text-sm text-red-500 mt-1">{errors.itemCode}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Item Name</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="itemName"
                                        value={formData.itemName}
                                        readOnly
                                        className="px-2 py-1 rounded-full w-full bg-gray-200 mb-1 md:mb-2 text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Participants</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="participants"
                                        value={formData.participants}
                                        readOnly
                                        className="px-2 py-1 rounded-full w-full bg-gray-200 mb-1 md:mb-2 text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">No of Judges</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="judges"
                                        value={formData.judges}
                                        readOnly
                                        className="px-2 py-1 rounded-full w-full bg-gray-200 mb-1 md:mb-2 text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Reg No</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="regNo"
                                        value={formData.regNo}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("regNo")}
                                        className={`border ${touched.regNo && errors.regNo ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.regNo && errors.regNo && (
                                        <p className="text-sm text-red-500 mt-1">{errors.regNo}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Code No</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("code")}
                                        className={`border ${touched.code && errors.code ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.code && errors.code && (
                                        <p className="text-sm text-red-500 mt-1">{errors.code}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Mark 1</label>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="mark1"
                                        value={formData.mark1}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("mark1")}
                                        className={`border ${touched.mark1 && errors.mark1 ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.mark1 && errors.mark1 && (
                                        <p className="text-sm text-red-500 mt-1">{errors.mark1}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Mark 2</label>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="mark2"
                                        value={formData.mark2}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("mark2")}
                                        className={`border ${touched.mark2 && errors.mark2 ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.mark2 && errors.mark2 && (
                                        <p className="text-sm text-red-500 mt-1">{errors.mark2}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Mark 3</label>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="mark3"
                                        value={formData.mark3}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("mark3")}
                                        className={`border ${touched.mark3 && errors.mark3 ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.mark3 && errors.mark3 && (
                                        <p className="text-sm text-red-500 mt-1">{errors.mark3}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Total</label>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="total"
                                        value={formData.total}
                                        readOnly
                                        className="border border-blue-500 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base bg-gray-50"
                                        required
                                    />
                                </div>
                            </div>
                      
                        </div>

                        <div className="mt-6 md:mt-10 lg:mt-10 text-right px-2 md:px-4 md:mr-8 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className=" border border-blue-600 rounded-full px-4 md:px-6 lg:px-10  py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-4 md:px-6 lg:px-10 text-white py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};


export default SEditResultentry
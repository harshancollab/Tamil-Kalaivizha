//  const handleSubmit = async () => {
//         const { regNo,
//             code,
//             mark1,
//             mark2,
//             mark3,
//             total,
//             markPercentage,
//             rank,
//             grade,
//             point } = formData

//         if (regNo &&
//             code &&
//             mark1 &&
//             mark2 &&
//             mark3 &&
//             total &&
//             markPercentage &&
//             rank &&
//             grade &&
//             point) {
//                 // api call 
//                 const reqBody = new FormData()
//                 reqBody.append("regNo", regNo);
//                 reqBody.append("code", code);
//                 reqBody.append("mark1", mark1);
//                 reqBody.append("mark2", mark2);
//                 reqBody.append("markPercentage", markPercentage);
//                 reqBody.append("rank", rank);
//                 reqBody.append("grade", grade);
//                 reqBody.append("point", point);

//                 const token = sessionStorage.getItem("token");
//                 if(token){
//                      const reqHeader = {
//                           "Authorization": `Bearer ${token}`
//                      }
//                      try{
//                const result = await updateResultentryAPI(id,reqBody,reqHeader)
//                if(result.status==200){
//                 alert("result entry update sucessfully")
//                 navigate('/all-resultentry')
//                }
//                      }catch(err){
//                         console.log(err);

//                      }
//                 }


//         } else {
//             alert("please fill the form completely!!")
//         }


//     }


import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { updateResultentryAPI } from '../services/allAPI'
import { useNavigate, useParams } from 'react-router-dom'

const EditResultentry = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
                    const result = await updateResultentryAPI(id, reqBody, reqHeader);
                    if (result.status === 200) {
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

    // Fetch existing data when component mounts
    useEffect(() => {
        const fetchResultEntry = async () => {
            if (!id) {
                alert("Result entry ID not found");
                navigate('/all-resultentry');
                return;
            }

            const token = sessionStorage.getItem("token");
            if (!token) {
                // alert("Authentication token not found. Please login again.");
                // navigate('/login');
                return;
            }

            try {
                // Assuming you have a function like getResultEntryByIdAPI
                // You'll need to implement this in your API services
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };

                // Replace with your actual API call
                // const result = await getResultEntryByIdAPI(id, reqHeader);
                // if (result.status === 200) {
                //     setFormData(result.data);
                // }

               
                console.log("Would fetch result entry with ID:", id);
            } catch (err) {
                console.log(err);
                alert("Failed to fetch result entry details");
            }
        };

        fetchResultEntry();
    }, [id, navigate]);

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
                            <h2 className="text-xl md:text-2xl font-semibold">Update Result Entry</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6 text-[#003566] p-2 md:p-4">
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

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Mark %</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="markPercentage"
                                        value={formData.markPercentage}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("markPercentage")}
                                        className={`border ${touched.markPercentage && errors.markPercentage ? "border-red-500" : "border-blue-500"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.markPercentage && errors.markPercentage && (
                                        <p className="text-sm text-red-500 mt-1">{errors.markPercentage}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Rank</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="rank"
                                        value={formData.rank}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("rank")}
                                        className={`border ${touched.rank && errors.rank ? "border-red-500" : "border-blue-500"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.rank && errors.rank && (
                                        <p className="text-sm text-red-500 mt-1">{errors.rank}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Grade</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("grade")}
                                        className={`border ${touched.grade && errors.grade ? "border-red-500" : "border-blue-500"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.grade && errors.grade && (
                                        <p className="text-sm text-red-500 mt-1">{errors.grade}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Point</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="point"
                                        value={formData.point}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("point")}
                                        className={`border ${touched.point && errors.point ? "border-red-500" : "border-blue-500"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.point && errors.point && (
                                        <p className="text-sm text-red-500 mt-1">{errors.point}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-10 lg:mt-32 text-right px-2 md:px-4 md:mr-8">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="border mr-2 md:mr-20 border-blue-600 rounded-full px-4 md:px-6 lg:px-10 text-blue-700 py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
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

export default EditResultentry
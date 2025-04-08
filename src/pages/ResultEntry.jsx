// import React from 'react'
// import Header from '../components/Header'
// import Dash from '../components/Dash'

// const ResultEntry = () => {
//     return (
//         <>

//             <Header />
//             <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//                 <Dash />
//                 <div className="flex-1 p-2 md:p-2 w-full ">
//                     <form
//                         className="bg-white p-3 md:p-4 rounded-lg shadow-md w-full min-h-screen"

//                     >
//                         <div className="mb-4 mt-2 md:mb-5 md:mt-3">
//                             <h2 className="text-xl md:text-2xl font-semibold">Result Entry</h2>
//                         </div>

//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6 text-[#003566] p-2 md:p-4">
//                             <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Item Code</label>
//                                 <div className="w-full">
//                                     <input
//                                         type="text"
//                                         name="itemCode"
//                                         className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required
//                                     />

//                                 </div>
//                             </div>

//                             <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Item Name</label>
//                                 <div className="w-full">
//                                     <input
//                                         type="text"
//                                         name="itemName"
//                                         className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required
//                                     />

//                                 </div>
//                             </div>

//                             <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Participants</label>
//                                 <div className="w-full">
//                                     <input
//                                         type="number"
//                                         name="numberOfParticipants"
//                                         className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required
//                                     />

//                                 </div>
//                             </div>

//                             <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">No of Judges</label>
//                                 <div className="w-full">
//                                     <input
//                                         type="text"

//                                         className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required

//                                     />

//                                 </div>
//                             </div>

//                             {/* <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Code</label>
//                                 <div className="w-full">
//                                     <input
//                                         type="text"

//                                         className="border border-blue-600 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required

//                                     />

//                                 </div>
//                             </div>

//                             <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Reg No</label>
//                                 <div className="w-full">
//                                     <input
//                                         type=""
//                                         name="date"

//                                         className="border border-blue-500 px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required
//                                     />

//                                 </div>
//                             </div>

//                             <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Mark 1</label>
//                                 <div className="w-full">
//                                     <input
//                                         type="text"
//                                         name="time"
//                                         className="border border-blue-500  px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required
//                                     />

//                                 </div>
//                             </div>

//                             <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">Mark 2</label>
//                                 <div className="w-full">
//                                     <input
//                                         type="text"
//                                         name="time"
//                                         className="border border-blue-500  px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required
//                                     />

//                                 </div>
//                             </div>

//                             <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
//                                 <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Mark 3</label>
//                                 <div className="w-full">
//                                     <input
//                                         type="text"
//                                         name="time"
//                                         className="border border-blue-500  px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base "
//                                         required
//                                     />


//                                 </div>
//                             </div> */}
//                         </div>

//                         <div className="mt-6 md:mt-10 lg:mt-32 text-right px-2 md:px-4 md:mr-8">
//                             {/* <button
//                                 type="button"

//                                 className="border mr-2 md:mr-20 border-blue-600 rounded-full px-4 md:px-6 lg:px-10 text-blue-700 py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
//                             >
//                                 Cancel
//                             </button> */}
//                             <button
//                                 type="submit"
//                                 className="bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-4 md:px-6 lg:px-10 text-white py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
//                             >
//                                Next
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>


//         </>
//     )
// }

// export default ResultEntry


import React, { useState } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { addResultentryAPI } from '../services/allAPI';

const ResultEntry = () => {
    const [formData, setFormData] = useState({
        itemCode: "",
        itemName: "",
        numberOfParticipants: "",
        numberOfJudges: ""
    });
    console.log(formData);


    const [errors, setErrors] = useState({
        itemCode: "",
        itemName: "",
        numberOfParticipants: "",
        numberOfJudges: ""
    });

    const [touched, setTouched] = useState({
        itemCode: false,
        itemName: false,
        numberOfParticipants: false,
        numberOfJudges: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
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
            case "itemName":
                if (!value) errorMessage = "Item name is required";
                else if (value.length < 3) errorMessage = "Item name should be at least 3 characters";
                break;
            case "numberOfParticipants":
                if (!value) errorMessage = "Number of participants is required";
                else if (isNaN(value) || parseInt(value) <= 0) errorMessage = "Please enter a valid number";
                break;
            case "numberOfJudges":
                if (!value) errorMessage = "Number of judges is required";
                else if (isNaN(value) || parseInt(value) <= 0) errorMessage = "Please enter a valid number";
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
            itemName: validateField("itemName", formData.itemName),
            numberOfParticipants: validateField("numberOfParticipants", formData.numberOfParticipants),
            numberOfJudges: validateField("numberOfJudges", formData.numberOfJudges)
        };

        setTouched({
            itemCode: true,
            itemName: true,
            numberOfParticipants: true,
            numberOfJudges: true
        });

        return Object.values(fieldValidations).every(Boolean);
    };


    // const handleSubmit = async () => {
    //     const { itemCode,
    //         itemName,
    //         numberOfParticipants,
    //         numberOfJudges } = formData
    //     if (itemCode &&
    //         itemName &&
    //         numberOfParticipants &&
    //         numberOfJudges) {
    //         // alert("proceed to api")
    //         const reqBody = new FormData()
    //         reqBody.append("itemCode", itemCode)
    //         reqBody.append("itemName", itemName)
    //         reqBody.append("numberOfParticipants", numberOfParticipants)
    //         reqBody.append("numberOfJudges", numberOfJudges)
    //         const token = sessionStorage.getItem("token")
    //         if (token) {
    //             const reqHeader = {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //             try {
    //                 const result = await addResultentryAPI(reqBody, reqHeader)
    //                 if (result.status == 200) {
    //                     alert("result add sucessful")
    //                 } else {
    //                     alert(result.response.data)
    //                 }
    //             } catch (err) {
    //                 console.log(err);

    //             }
    //         }
    //     } else {
    //         alert("please fill the form completely!!")
    //     }

    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const { itemCode, itemName, numberOfParticipants, numberOfJudges } = formData;
            
            const reqBody = new FormData();
            reqBody.append("itemCode", itemCode);
            reqBody.append("itemName", itemName);
            reqBody.append("numberOfParticipants", numberOfParticipants);
            reqBody.append("numberOfJudges", numberOfJudges);
            
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                
                try {
                    const result = await addResultentryAPI(reqBody, reqHeader);
                    if (result.status === 200) {
                        alert("Result added successfully");
                    } else {
                        alert(result.response.data);
                    }
                } catch (err) {
                   console.log(err);
                   
                  
                }
            } else {
                alert("Authentication token not found. Please login again.");
            }
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <Dash />
                <div className="flex-1 p-2 md:p-2 w-full ">
                    <form
                        className="bg-white p-3 md:p-4 rounded-lg shadow-md w-full min-h-screen"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4 mt-2 md:mb-5 md:mt-3">
                            <h2 className="text-xl md:text-2xl font-semibold">Result Entry</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6 text-[#003566] p-2 md:p-4">
                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">Item Code</label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="itemCode"
                                        value={formData.itemCode}
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur("itemName")}
                                        className={`border ${touched.itemName && errors.itemName ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.itemName && errors.itemName && (
                                        <p className="text-sm text-red-500 mt-1">{errors.itemName}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0">No of Participants</label>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="numberOfParticipants"
                                        value={formData.numberOfParticipants}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur("numberOfParticipants")}
                                        className={`border ${touched.numberOfParticipants && errors.numberOfParticipants ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.numberOfParticipants && errors.numberOfParticipants && (
                                        <p className="text-sm text-red-500 mt-1">{errors.numberOfParticipants}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                                <label className="font-semibold text-blue-900 w-full md:w-40 flex-shrink-0 md:pl-4">No of Judges</label>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        name="numberOfJudges"
                                        value={formData.numberOfJudges}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur("numberOfJudges")}
                                        className={`border ${touched.numberOfJudges && errors.numberOfJudges ? "border-red-500" : "border-blue-600"} px-2 py-1 rounded-full w-full mb-1 md:mb-2 text-sm md:text-base`}
                                        required
                                    />
                                    {touched.numberOfJudges && errors.numberOfJudges && (
                                        <p className="text-sm text-red-500 mt-1">{errors.numberOfJudges}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-10 lg:mt-32 text-right px-2 md:px-4 md:mr-8">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full px-4 md:px-6 lg:px-10 text-white py-1 md:py-2 text-sm md:text-base hover:shadow-lg transition-shadow duration-300"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResultEntry

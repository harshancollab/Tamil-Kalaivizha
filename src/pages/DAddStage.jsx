import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Dash from '../components/Dash'
import { addStageAPI } from '../services/allAPI'

const DAddStage = () => {
    const [formData, setFormData] = useState({
        stage: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        stage: "",
        description: ""
    });

    const [touched, setTouched] = useState({
        stage: false,
        description: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed: ${name} = ${value}`);
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
            case "stage":
                if (!value) errorMessage = "Stage selection is required";
                break;
            case "description":
                if (!value) errorMessage = "Description is required";
                else if (value.length < 10) errorMessage = "Description should be at least 10 characters";
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
            stage: validateField("stage", formData.stage),
            description: validateField("description", formData.description)
        };

        setTouched({
            stage: true,
            description: true
        });

        return Object.values(fieldValidations).every(Boolean);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        
        if (validateForm()) {
            console.log("Form is valid, proceeding with submission");
            
            const reqBody = {
                stage: formData.stage,
                description: formData.description
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
                        alert("Stage added successfully");
                        
                        setFormData({
                            stage: "",
                            description: ""
                        });
                        setTouched({
                            stage: false,
                            description: false
                        });
                    } else {
                        alert(result.response.data);
                    }
                } catch (err) {
                    console.log(err);
                    alert("Error adding stage. Please try again.");
                }
            } else {
                alert("Authentication token missing. Please log in again.");
            }
        } else {
            console.log("Form has errors");
        }
    };

    useEffect(() => {
        console.log("Current form data:", formData);
    }, [formData]);

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Dash />
                <div className="flex-1 p-4 bg-gray-300 ">
                    <form 
                        className='min-h-screen mx-auto p-6 bg-white rounded-lg shadow-md'
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[20px] font-[600] leading-[100%] tracking-[2%]">
                                Define Stages
                            </h2>
                        </div>
                    
                        <div className="mt-10 ml-12">
                            <div className="flex flex-col md:flex-row ">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Select Stage</label>
                                <div className="w-full md:w-80">
                                    <select
                                        name="stage"
                                        value={formData.stage}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur("stage")}
                                        className={`border px-2 py-1 rounded-full w-full ${
                                            touched.stage && errors.stage 
                                            ? "border-red-500 focus:outline-red-500" 
                                            : "border-blue-600 focus:outline-blue-900"
                                        }`}
                                        required
                                    >
                                        <option value="">Select Stage</option>
                                        <option value="Stage 1">Stage 1</option>
                                        <option value="Stage 2">Stage 2</option>
                                        <option value="Stage 3">Stage 3</option>
                                        <option value="Stage 4">Stage 4</option>
                                    </select>
                                    {touched.stage && errors.stage && (
                                        <p className="text-sm text-red-500 mt-1">{errors.stage}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-10">
                                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Description</label>
                                <div className="w-full md:w-80">
                                    <textarea 
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur("description")}
                                        placeholder="Enter Description" 
                                        className={`border px-2 py-1 rounded-3xl w-full h-24 ${
                                            touched.description && errors.description 
                                            ? "border-red-500 focus:outline-red-500" 
                                            : "border-blue-600 focus:outline-blue-900"
                                        }`}
                                    />
                                    {touched.description && errors.description && (
                                        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='text-center mr-5 mt-24'>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-6 py-2 rounded-full"
                            >
                                Add Stage
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default DAddStage
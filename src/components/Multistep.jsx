import React, { useEffect, useState, useRef } from "react";
import { addSchooldetailsAPI } from "../services/allAPI";

const MultiStep = ({ onClose }) => {
  const [schoolDetails, setSchoolDetails] = useState({
    SchoolCode: "",
    SchoolName: "",
    SchoolType: "",
    SchoolEmail: "",
    StandardFrom: "",
    StandardTo: "",
    Class: "",
    SchoolPrincipal: "",
    PrincipalPhoneNumber: "",
    SchoolHeadmaster: "",
    HeadmasterPhoneNumber: "",
    TeamManager: "",
    TeamManagerPhoneNumber: "",
    EscortingTeacher: "",
    EscortingTeacherPhoneNumber: "",
    UpperPrimary: "",
    HigherSecondarySchool: "",
    VocationalHigherSecondaryEducation: "",
    TotalStudents: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [escortingTeachers, setEscortingTeachers] = useState([
    { name: "", phone: "", errors: { name: "", phone: "" } },
  ]);
  const [show, setShow] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validateNumber = (value) => {
    return /^[0-9]+$/.test(value);
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!schoolDetails.SchoolCode.trim()) {
      newErrors.SchoolCode = "School Code is required";
    }
    
    if (!schoolDetails.SchoolName.trim()) {
      newErrors.SchoolName = "School Name is required";
    }
    
    if (!schoolDetails.SchoolType.trim()) {
      newErrors.SchoolType = "School Type is required";
    }
    
    if (!schoolDetails.SchoolEmail.trim()) {
      newErrors.SchoolEmail = "School Email is required";
    } else if (!validateEmail(schoolDetails.SchoolEmail)) {
      newErrors.SchoolEmail = "Please enter a valid email address";
    }
    
    if (!schoolDetails.StandardFrom.trim()) {
      newErrors.StandardFrom = "Standard From is required";
    } else if (!validateNumber(schoolDetails.StandardFrom)) {
      newErrors.StandardFrom = "Please enter a valid number";
    }
    
    if (!schoolDetails.StandardTo.trim()) {
      newErrors.StandardTo = "Standard To is required";
    } else if (!validateNumber(schoolDetails.StandardTo)) {
      newErrors.StandardTo = "Please enter a valid number";
    } else if (Number(schoolDetails.StandardTo) < Number(schoolDetails.StandardFrom)) {
      newErrors.StandardTo = "Standard To must be greater than or equal to Standard From";
    }
    
    if (!schoolDetails.Class.trim()) {
      newErrors.Class = "Class is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!schoolDetails.SchoolPrincipal.trim()) {
      newErrors.SchoolPrincipal = "School Principal is required";
    }
    
    if (!schoolDetails.PrincipalPhoneNumber.trim()) {
      newErrors.PrincipalPhoneNumber = "Principal Phone Number is required";
    } else if (!validatePhoneNumber(schoolDetails.PrincipalPhoneNumber)) {
      newErrors.PrincipalPhoneNumber = "Please enter a valid 10-digit phone number";
    }
    
    if (!schoolDetails.SchoolHeadmaster.trim()) {
      newErrors.SchoolHeadmaster = "School Headmaster is required";
    }
    
    if (!schoolDetails.HeadmasterPhoneNumber.trim()) {
      newErrors.HeadmasterPhoneNumber = "Headmaster Phone Number is required";
    } else if (!validatePhoneNumber(schoolDetails.HeadmasterPhoneNumber)) {
      newErrors.HeadmasterPhoneNumber = "Please enter a valid 10-digit phone number";
    }
    
    if (!schoolDetails.TeamManager.trim()) {
      newErrors.TeamManager = "Team Manager is required";
    }
    
    if (!schoolDetails.TeamManagerPhoneNumber.trim()) {
      newErrors.TeamManagerPhoneNumber = "Team Manager Phone Number is required";
    } else if (!validatePhoneNumber(schoolDetails.TeamManagerPhoneNumber)) {
      newErrors.TeamManagerPhoneNumber = "Please enter a valid 10-digit phone number";
    }
    
    const updatedTeachers = escortingTeachers.map(teacher => {
      const teacherErrors = { name: "", phone: "" };
      
      if (!teacher.name.trim()) {
        teacherErrors.name = "Escorting Teacher name is required";
      }
      
      if (!teacher.phone.trim()) {
        teacherErrors.phone = "Phone Number is required";
      } else if (!validatePhoneNumber(teacher.phone)) {
        teacherErrors.phone = "Please enter a valid 10-digit phone number";
      }
      
      return { ...teacher, errors: teacherErrors };
    });
    
    setEscortingTeachers(updatedTeachers);
    
    const hasTeacherErrors = updatedTeachers.some(
      teacher => teacher.errors.name || teacher.errors.phone
    );
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !hasTeacherErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!schoolDetails.UpperPrimary.trim()) {
      newErrors.UpperPrimary = "Upper Primary is required";
    } else if (!validateNumber(schoolDetails.UpperPrimary)) {
      newErrors.UpperPrimary = "Please enter a valid number";
    }
    
    if (!schoolDetails.HigherSecondarySchool.trim()) {
      newErrors.HigherSecondarySchool = "Higher Secondary School is required";
    } else if (!validateNumber(schoolDetails.HigherSecondarySchool)) {
      newErrors.HigherSecondarySchool = "Please enter a valid number";
    }
    
    if (!schoolDetails.VocationalHigherSecondaryEducation.trim()) {
      newErrors.VocationalHigherSecondaryEducation = "Vocational Higher Secondary Education is required";
    } else if (!validateNumber(schoolDetails.VocationalHigherSecondaryEducation)) {
      newErrors.VocationalHigherSecondaryEducation = "Please enter a valid number";
    }
    
    if (!schoolDetails.TotalStudents.trim()) {
      newErrors.TotalStudents = "Total Students is required";
    } else if (!validateNumber(schoolDetails.TotalStudents)) {
      newErrors.TotalStudents = "Please enter a valid number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleClose = () => {
    setShow(false);
    setSchoolDetails({
      SchoolCode: "",
      SchoolName: "",
      SchoolType: "",
      SchoolEmail: "",
      StandardFrom: "",
      StandardTo: "",
      Class: "",
      SchoolPrincipal: "",
      PrincipalPhoneNumber: "",
      SchoolHeadmaster: "",
      HeadmasterPhoneNumber: "",
      TeamManager: "",
      TeamManagerPhoneNumber: "",
      EscortingTeacher: "",
      EscortingTeacherPhoneNumber: "",
      UpperPrimary: "",
      HigherSecondarySchool: "",
      VocationalHigherSecondaryEducation: "",
      TotalStudents: "",
    });
    setStep(1);
    setEscortingTeachers([{ name: "", phone: "", errors: { name: "", phone: "" } }]);
    setErrors({});
    onClose();
  };

  const handleShow = () => setShow(true);

  const handleAddEscortingTeacher = () => {
    setEscortingTeachers([...escortingTeachers, { name: "", phone: "", errors: { name: "", phone: "" } }]);
  };

  const handleEscortingTeacherChange = (index, field, value) => {
    const updatedTeachers = [...escortingTeachers];
    updatedTeachers[index][field] = value;
    
    // Clear validation error when user starts typing
    if (updatedTeachers[index].errors && updatedTeachers[index].errors[field]) {
      updatedTeachers[index].errors[field] = "";
    }
    
    setEscortingTeachers(updatedTeachers);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSchoolDetails({ ...schoolDetails, [name]: value });
    
    // Clear validation error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    const isValid = validateStep3();
    
    if (!isValid) {
      return;
    }
    
    try {
      const reqBody = new FormData();
      
      // Append all school details to FormData
      Object.entries(schoolDetails).forEach(([key, value]) => {
        reqBody.append(key, value);
      });
      
      // Append escorting teachers data
      escortingTeachers.forEach((teacher, index) => {
        reqBody.append(`EscortingTeacherName[${index}]`, teacher.name);
        reqBody.append(`EscortingTeacherPhoneNumber[${index}]`, teacher.phone);
      });
      
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
        
        const result = await addSchooldetailsAPI(reqBody, reqHeader);
        if (result.status === 200) {
          alert("School added successfully!");
          handleClose();
        } else {
          alert(result.response.data);
        }
      } else {
        alert("Authentication token not found. Please login again.");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while adding school details.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-2 sm:p-4">
      <div className="bg-white p-3 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
        <button
          className="absolute top-2 right-3 text-red-500 text-xl sm:text-2xl font-bold"
          onClick={handleClose}
        >
          &times;
        </button>
        
        {/* Progress Indicators - Improved for mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 w-full gap-2">
          {[
            { stepNum: 1, label: "School Details" },
            { stepNum: 2, label: "Organization" },
            { stepNum: 3, label: "No. of Students" },
          ].map(({ stepNum, label }, index, array) => (
            <div key={stepNum} className="flex items-center w-full">
              <div className="flex flex-col items-center">
                <i
                  className={`fa-solid fa-circle-check text-base sm:text-lg ${
                    step >= stepNum ? "text-green-500" : "text-gray-300"
                  }`}
                ></i>
                <span
                  className={`text-xs sm:text-sm ${
                    step === stepNum
                      ? "text-blue-500 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Step {stepNum}
                </span>
                <span
                  className={`text-xs sm:text-sm md:text-base ${
                    step === stepNum ? "font-semibold text-black" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index !== array.length - 1 && (
                <div className="hidden sm:block flex-grow border-t border-gray-400 mx-1 md:mx-3"></div>
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="grid mt-4 sm:mt-8 md:mt-12 grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-1 sm:px-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-left-right mr-1 md:mr-2"></i>School Code
              </label>
              <input
                type="text"
                name="SchoolCode"
                value={schoolDetails.SchoolCode}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.SchoolCode ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.SchoolCode && (
                <p className="text-red-500 text-xs mt-1">{errors.SchoolCode}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-t mr-1 md:mr-2"></i>School Type
              </label>
              <input
                type="text"
                name="SchoolType"
                value={schoolDetails.SchoolType}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.SchoolType ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.SchoolType && (
                <p className="text-red-500 text-xs mt-1">{errors.SchoolType}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-graduation-cap mr-1 md:mr-2"></i>School Name
              </label>
              <input
                type="text"
                name="SchoolName"
                value={schoolDetails.SchoolName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.SchoolName ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.SchoolName && (
                <p className="text-red-500 text-xs mt-1">{errors.SchoolName}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-envelope mr-1 md:mr-2"></i>School Email
              </label>
              <input
                type="email"
                name="SchoolEmail"
                value={schoolDetails.SchoolEmail}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.SchoolEmail ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.SchoolEmail && (
                <p className="text-red-500 text-xs mt-1">{errors.SchoolEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-circle-check mr-1 md:mr-2"></i>Standard From
              </label>
              <input
                type="text"
                name="StandardFrom"
                value={schoolDetails.StandardFrom}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.StandardFrom ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.StandardFrom && (
                <p className="text-red-500 text-xs mt-1">{errors.StandardFrom}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-circle-check mr-1 md:mr-2"></i>Standard To
              </label>
              <input
                type="text"
                name="StandardTo"
                value={schoolDetails.StandardTo}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.StandardTo ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.StandardTo && (
                <p className="text-red-500 text-xs mt-1">{errors.StandardTo}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-bookmark mr-1 md:mr-2"></i>Class
              </label>
              <input
                type="text"
                name="Class"
                value={schoolDetails.Class}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.Class ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.Class && (
                <p className="text-red-500 text-xs mt-1">{errors.Class}</p>
              )}
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8 flex justify-end col-span-1 md:col-span-2">
              <button
                onClick={nextStep}
                className="bg-blue-800 text-white px-4 py-2 rounded-full w-full sm:w-32 md:w-40 text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid mt-4 sm:mt-8 md:mt-12 grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-1 sm:px-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-user mr-1 md:mr-2"></i>School Principal
              </label>
              <input
                type="text"
                name="SchoolPrincipal"
                value={schoolDetails.SchoolPrincipal}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.SchoolPrincipal ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.SchoolPrincipal && (
                <p className="text-red-500 text-xs mt-1">{errors.SchoolPrincipal}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-phone mr-1 md:mr-2"></i>Phone Number
              </label>
              <input
                type="text"
                name="PrincipalPhoneNumber"
                value={schoolDetails.PrincipalPhoneNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.PrincipalPhoneNumber ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.PrincipalPhoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.PrincipalPhoneNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-user mr-1 md:mr-2"></i>School Headmaster
              </label>
              <input
                type="text"
                name="SchoolHeadmaster"
                value={schoolDetails.SchoolHeadmaster}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.SchoolHeadmaster ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.SchoolHeadmaster && (
                <p className="text-red-500 text-xs mt-1">{errors.SchoolHeadmaster}</p>
              )}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-phone mr-1 md:mr-2"></i>Phone Number
              </label>
              <input
                type="text"
                name="HeadmasterPhoneNumber"
                value={schoolDetails.HeadmasterPhoneNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.HeadmasterPhoneNumber ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.HeadmasterPhoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.HeadmasterPhoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-users mr-1 md:mr-2"></i>Team Manager
              </label>
              <input
                type="text"
                name="TeamManager"
                value={schoolDetails.TeamManager}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.TeamManager ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.TeamManager && (
                <p className="text-red-500 text-xs mt-1">{errors.TeamManager}</p>
              )}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-phone mr-1 md:mr-2"></i>Phone Number
              </label>
              <input
                type="text"
                name="TeamManagerPhoneNumber"
                value={schoolDetails.TeamManagerPhoneNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.TeamManagerPhoneNumber ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.TeamManagerPhoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.TeamManagerPhoneNumber}</p>
              )}
            </div>
            
            {/* Escorting Teachers Section */}
            <div className="col-span-1 md:col-span-2 mt-2">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Escorting Teachers</h3>
              {escortingTeachers.map((teacher, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                      <i className="fa-solid fa-address-card mr-1 md:mr-2"></i>
                      Escorting Teacher {escortingTeachers.length > 1 ? index + 1 : ""}
                    </label>
                    <input
                      value={teacher.name}
                      onChange={(e) =>
                        handleEscortingTeacherChange(index, "name", e.target.value)
                      }
                      type="text"
                      className={`w-full px-3 py-2 border rounded-full text-sm ${
                        teacher.errors?.name ? "border-red-500" : "border-blue-900"
                      }`}
                    />
                    {teacher.errors?.name && (
                      <p className="text-red-500 text-xs mt-1">{teacher.errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                      <i className="fa-solid fa-phone mr-1 md:mr-2"></i>Phone Number
                    </label>
                    <input
                      value={teacher.phone}
                      onChange={(e) =>
                        handleEscortingTeacherChange(
                          index,
                          "phone",
                          e.target.value
                        )
                      }
                      type="text"
                      className={`w-full px-3 py-2 border rounded-full text-sm ${
                        teacher.errors?.phone ? "border-red-500" : "border-blue-900"
                      }`}
                    />
                    {teacher.errors?.phone && (
                      <p className="text-red-500 text-xs mt-1">{teacher.errors.phone}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-start col-span-1 md:col-span-2">
              <button
                className="border border-blue-900 text-blue-800 px-3 py-1 rounded-full w-full sm:w-auto text-sm"
                onClick={handleAddEscortingTeacher}
              >
                + Add Teacher
              </button>
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-end items-center mt-4 sm:mt-6 col-span-1 md:col-span-2 gap-2">
              <button
                onClick={prevStep}
                className="border border-blue-900 w-full sm:w-24 md:w-32 text-blue-800 px-3 py-2 rounded-full text-sm mb-2 sm:mb-0"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-900 text-white px-3 py-2 rounded-full w-full sm:w-24 md:w-32 text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid mt-4 sm:mt-8 md:mt-12 grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-1 sm:px-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-bookmark mr-1 md:mr-2"></i>Upper Primary
              </label>
              <input
                type="text"
                name="UpperPrimary"
                value={schoolDetails.UpperPrimary}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.UpperPrimary ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.UpperPrimary && (
                <p className="text-red-500 text-xs mt-1">{errors.UpperPrimary}</p>
              )}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-book mr-1 md:mr-2"></i>Higher Secondary School
              </label>
              <input
                type="text"
                name="HigherSecondarySchool"
                value={schoolDetails.HigherSecondarySchool}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.HigherSecondarySchool ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.HigherSecondarySchool && (
                <p className="text-red-500 text-xs mt-1">{errors.HigherSecondarySchool}</p>
              )}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-book-open mr-1 md:mr-2"></i>Vocational Higher
                Secondary Education
              </label>
              <input
                type="text"
                name="VocationalHigherSecondaryEducation"
                value={schoolDetails.VocationalHigherSecondaryEducation}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-full text-sm ${
                  errors.VocationalHigherSecondaryEducation ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.VocationalHigherSecondaryEducation && (
                <p className="text-red-500 text-xs mt-1 ">{errors.VocationalHigherSecondaryEducation}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-user mr-2"></i>Total Number of
                students
              </label>
              <input
                type="text"
                name="TotalStudents"
                value={schoolDetails.TotalStudents}
                onChange={handleInputChange}
                className={`w-4/5 px-4 py-2 border rounded-full ${
                  errors.TotalStudents ? "border-red-500" : "border-blue-900"
                }`}
              />
              {errors.TotalStudents && (
                <p className="text-red-500 text-xs mt-1">{errors.TotalStudents}</p>
              )}
              <div className="w-full flex justify-end mt-32">
                <button
                  onClick={prevStep}
                  className="border border-blue-900 w-32 text-blue-800 px-4 py-2 rounded-full"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-900 text-white px-4 py-2 rounded-full w-32 ml-4"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStep;
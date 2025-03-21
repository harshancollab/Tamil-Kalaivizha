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
    
    if (updatedTeachers[index].errors && updatedTeachers[index].errors[field]) {
      updatedTeachers[index].errors[field] = "";
    }
    
    setEscortingTeachers(updatedTeachers);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSchoolDetails({ ...schoolDetails, [name]: value });
    
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
      
      Object.entries(schoolDetails).forEach(([key, value]) => {
        reqBody.append(key, value);
      });
      
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
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
  <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full md:w-2/3 relative">
    <button
      className="absolute top-2 right-2 md:right-5 text-red-500 text-2xl font-bold hover:text-red-700 transition-colors"
      onClick={handleClose}
      aria-label="Close form"
    >
      &times;
    </button>
    
    {/* Progress indicator with visual cues */}
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 w-full">
      {[
        { stepNum: 1, label: "School Details" },
        { stepNum: 2, label: "Organization" },
        { stepNum: 3, label: "No. of Students" },
      ].map(({ stepNum, label }, index, array) => (
        <div key={stepNum} className="flex items-center w-full mb-2 sm:mb-0 cursor-pointer" onClick={() => step > stepNum && setStep(stepNum)}>
          <div className="flex flex-col items-center">
            <i
              className={`fa-solid ${step > stepNum ? "fa-circle-check" : step === stepNum ? "fa-circle-dot" : "fa-circle"} text-lg ${step >= stepNum ? "text-green-500" : "text-gray-300"}`}
            ></i>
            <span
              className={`text-sm ${step === stepNum
                  ? "text-blue-500 font-semibold"
                  : "text-gray-500"
                }`}
            >
              Step {stepNum}
            </span>
            <span
              className={`${stepNum === 1 || stepNum === 2 ? "text-lg" : "text-xs"
                } ${step === stepNum ? "font-semibold text-black" : "text-gray-600"
                } text-center`}
            >
              {label}
            </span>
          </div>
          {index !== array.length - 1 && (
            <div className="hidden sm:block flex-grow border-t border-gray-400 mx-3"></div>
          )}
        </div>
      ))}
    </div>

    {/* Form heading for each step */}
    <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">
      {step === 1 ? "School Information" : step === 2 ? "Staff Information" : "Student Statistics"}
    </h2>

    {step === 1 && (
      <div className="grid mt-6 sm:mt-10 mx-2 sm:ml-5 grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="SchoolCode">
            <i className="fa-solid fa-left-right mr-2"></i>School Code
          </label>
          <input
            id="SchoolCode"
            type="text"
            name="SchoolCode"
            value={schoolDetails.SchoolCode}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.SchoolCode ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter school code"
          />
          {errors.SchoolCode && (
            <p className="text-red-500 text-xs mt-1">{errors.SchoolCode}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="SchoolType">
            <i className="fa-solid fa-t mr-2"></i>School Type
          </label>
          <select
            id="SchoolType"
            name="SchoolType"
            value={schoolDetails.SchoolType}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.SchoolType ? "border-red-500" : "border-blue-900"
            }`}
          >
            <option value="">Select school type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="International">International</option>
            <option value="Charter">Charter</option>
          </select>
          {errors.SchoolType && (
            <p className="text-red-500 text-xs mt-1">{errors.SchoolType}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="SchoolName">
            <i className="fa-solid fa-graduation-cap mr-2"></i>School Name
          </label>
          <input
            id="SchoolName"
            type="text"
            name="SchoolName"
            value={schoolDetails.SchoolName}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.SchoolName ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter school name"
          />
          {errors.SchoolName && (
            <p className="text-red-500 text-xs mt-1">{errors.SchoolName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="SchoolEmail">
            <i className="fa-regular fa-envelope mr-2"></i>School Email
          </label>
          <input
            id="SchoolEmail"
            type="email"
            name="SchoolEmail"
            value={schoolDetails.SchoolEmail}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.SchoolEmail ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="example@school.edu"
          />
          {errors.SchoolEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.SchoolEmail}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="StandardFrom">
            <i className="fa-regular fa-circle-check mr-2"></i>Standard From
          </label>
          <select
            id="StandardFrom"
            name="StandardFrom"
            value={schoolDetails.StandardFrom}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.StandardFrom ? "border-red-500" : "border-blue-900"
            }`}
          >
            <option value="">Select grade</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i+1}>Grade {i+1}</option>
            ))}
          </select>
          {errors.StandardFrom && (
            <p className="text-red-500 text-xs mt-1">{errors.StandardFrom}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="StandardTo">
            <i className="fa-regular fa-circle-check mr-2"></i>Standard To
          </label>
          <select
            id="StandardTo"
            name="StandardTo"
            value={schoolDetails.StandardTo}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.StandardTo ? "border-red-500" : "border-blue-900"
            }`}
          >
            <option value="">Select grade</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i+1}>Grade {i+1}</option>
            ))}
          </select>
          {errors.StandardTo && (
            <p className="text-red-500 text-xs mt-1">{errors.StandardTo}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="Class">
            <i className="fa-regular fa-bookmark mr-2"></i>Class
          </label>
          <input
            id="Class"
            type="text"
            name="Class"
            value={schoolDetails.Class}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.Class ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter class"
          />
          {errors.Class && (
            <p className="text-red-500 text-xs mt-1">{errors.Class}</p>
          )}
        </div>
        <div className="mt-10 sm:mt-20 flex justify-end col-span-1 md:col-span-2">
          <span className="text-sm text-gray-500 mr-4 self-center">Complete all fields to continue</span>
          <button
            onClick={nextStep}
            className="bg-blue-800 text-white px-6 py-2 rounded-full w-40 hover:bg-blue-700 transition-colors flex items-center justify-center"
            disabled={Object.keys(errors).length > 0}
          >
            Next <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    )}

    {step === 2 && (
      <div className="grid mt-6 sm:mt-10 mx-2 sm:ml-5 grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="SchoolPrincipal">
            <i className="fa-regular fa-user mr-2"></i>School Principal
          </label>
          <input
            id="SchoolPrincipal"
            type="text"
            name="SchoolPrincipal"
            value={schoolDetails.SchoolPrincipal}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.SchoolPrincipal ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter principal's name"
          />
          {errors.SchoolPrincipal && (
            <p className="text-red-500 text-xs mt-1">{errors.SchoolPrincipal}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="PrincipalPhoneNumber">
            <i className="fa-solid fa-phone mr-2"></i>Phone Number
          </label>
          <input
            id="PrincipalPhoneNumber"
            type="tel"
            name="PrincipalPhoneNumber"
            value={schoolDetails.PrincipalPhoneNumber}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.PrincipalPhoneNumber ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter phone number"
          />
          {errors.PrincipalPhoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.PrincipalPhoneNumber}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="SchoolHeadmaster">
            <i className="fa-regular fa-user mr-2"></i>School Headmaster
          </label>
          <input
            id="SchoolHeadmaster"
            type="text"
            name="SchoolHeadmaster"
            value={schoolDetails.SchoolHeadmaster}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.SchoolHeadmaster ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter headmaster's name"
          />
          {errors.SchoolHeadmaster && (
            <p className="text-red-500 text-xs mt-1">{errors.SchoolHeadmaster}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="HeadmasterPhoneNumber">
            <i className="fa-solid fa-phone mr-2"></i>Phone Number
          </label>
          <input
            id="HeadmasterPhoneNumber"
            type="tel"
            name="HeadmasterPhoneNumber"
            value={schoolDetails.HeadmasterPhoneNumber}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.HeadmasterPhoneNumber ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter phone number"
          />
          {errors.HeadmasterPhoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.HeadmasterPhoneNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="TeamManager">
            <i className="fa-solid fa-users mr-2"></i>Team Manager
          </label>
          <input
            id="TeamManager"
            type="text"
            name="TeamManager"
            value={schoolDetails.TeamManager}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.TeamManager ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter team manager's name"
          />
          {errors.TeamManager && (
            <p className="text-red-500 text-xs mt-1">{errors.TeamManager}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="TeamManagerPhoneNumber">
            <i className="fa-solid fa-phone mr-2"></i>Phone Number
          </label>
          <input
            id="TeamManagerPhoneNumber"
            type="tel"
            name="TeamManagerPhoneNumber"
            value={schoolDetails.TeamManagerPhoneNumber}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.TeamManagerPhoneNumber ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter phone number"
          />
          {errors.TeamManagerPhoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.TeamManagerPhoneNumber}</p>
          )}
        </div>
        
        <div className="col-span-1 md:col-span-2 mt-4">
          <h3 className="font-medium text-blue-900 mb-3">Escorting Teachers</h3>
        </div>
        
        {escortingTeachers.map((teacher, index) => (
          <React.Fragment key={index}>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor={`teacherName${index}`}>
                <i className="fa-solid fa-address-card mr-2"></i>Escorting
                Teacher {escortingTeachers.length > 1 ? index + 1 : ""}
              </label>
              <div className="flex">
                <input
                  id={`teacherName${index}`}
                  value={teacher.name}
                  onChange={(e) =>
                    handleEscortingTeacherChange(index, "name", e.target.value)
                  }
                  type="text"
                  placeholder="Enter teacher's name"
                  className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    teacher.errors?.name ? "border-red-500" : "border-blue-900"
                  }`}
                />
                {index > 0 && (
                  <button 
                    onClick={() => removeEscortingTeacher(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove teacher"
                  >
                    <i className="fa-solid fa-times-circle"></i>
                  </button>
                )}
              </div>
              {teacher.errors?.name && (
                <p className="text-red-500 text-xs mt-1">{teacher.errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor={`teacherPhone${index}`}>
                <i className="fa-solid fa-phone mr-2"></i>Phone Number
              </label>
              <input
                id={`teacherPhone${index}`}
                value={teacher.phone}
                onChange={(e) =>
                  handleEscortingTeacherChange(
                    index,
                    "phone",
                    e.target.value
                  )
                }
                type="tel"
                placeholder="Enter phone number"
                className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  teacher.errors?.phone ? "border-red-500" : "border-blue-900"
                }`}
              />
              {teacher.errors?.phone && (
                <p className="text-red-500 text-xs mt-1">{teacher.errors.phone}</p>
              )}
            </div>
          </React.Fragment>
        ))}
        
        <div className="col-span-1 md:col-span-2">
          <button
            className="border border-blue-900 text-blue-800 px-3 py-1 rounded-full flex items-center hover:bg-blue-50 transition-colors"
            onClick={handleAddEscortingTeacher}
          >
            <i className="fa-solid fa-plus mr-1"></i> Add Teacher
          </button>
        </div>

        <div className="w-full flex justify-between mt-8 col-span-1 md:col-span-2">
          <button
            onClick={prevStep}
            className="border border-blue-900 w-32 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-900 text-white px-4 py-2 rounded-full w-32 hover:bg-blue-800 transition-colors flex items-center justify-center"
            disabled={Object.keys(errors).length > 0}
          >
            Next <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    )}

    {step === 3 && (
      <div className="grid mt-6 sm:mt-10 mx-2 sm:ml-5 grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="UpperPrimary">
            <i className="fa-solid fa-bookmark mr-2"></i>Upper Primary
          </label>
          <input
            id="UpperPrimary"
            type="number"
            min="0"
            name="UpperPrimary"
            value={schoolDetails.UpperPrimary}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.UpperPrimary ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter number of students"
          />
          {errors.UpperPrimary && (
            <p className="text-red-500 text-xs mt-1">{errors.UpperPrimary}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="HigherSecondarySchool">
            <i className="fa-solid fa-book mr-2"></i>Higher Secondary School
          </label>
          <input
            id="HigherSecondarySchool"
            type="number"
            min="0"
            name="HigherSecondarySchool"
            value={schoolDetails.HigherSecondarySchool}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.HigherSecondarySchool ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter number of students"
          />
          {errors.HigherSecondarySchool && (
            <p className="text-red-500 text-xs mt-1">{errors.HigherSecondarySchool}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="VocationalHigherSecondaryEducation">
            <i className="fa-solid fa-book-open mr-2"></i>Vocational Higher
            Secondary Education
          </label>
          <input
            id="VocationalHigherSecondaryEducation"
            type="number"
            min="0"
            name="VocationalHigherSecondaryEducation"
            value={schoolDetails.VocationalHigherSecondaryEducation}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.VocationalHigherSecondaryEducation ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter number of students"
          />
          {errors.VocationalHigherSecondaryEducation && (
            <p className="text-red-500 text-xs mt-1">{errors.VocationalHigherSecondaryEducation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1" htmlFor="TotalStudents">
            <i className="fa-regular fa-user mr-2"></i>Total Number of
            students
          </label>
          <input
            id="TotalStudents"
            type="number"
            min="0"
            name="TotalStudents"
            value={schoolDetails.TotalStudents}
            onChange={handleInputChange}
            className={`w-full sm:w-4/5 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.TotalStudents ? "border-red-500" : "border-blue-900"
            }`}
            placeholder="Enter total students"
          />
          {errors.TotalStudents && (
            <p className="text-red-500 text-xs mt-1">{errors.TotalStudents}</p>
          )}
        </div>
        
        <div className="w-full flex justify-between mt-20 col-span-1 md:col-span-2">
          <button
            onClick={prevStep}
            className="border border-blue-900 w-32 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-full w-32 hover:bg-green-700 transition-colors flex items-center justify-center"
            disabled={Object.keys(errors).length > 0}
          >
            <i className="fa-solid fa-check mr-2"></i> Save
          </button>
        </div>
        
        {/* Form summary */}
        <div className="col-span-1 md:col-span-2 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-900 mb-2">Registration Summary</h3>
          <p className="text-sm text-gray-600">
            Please review all information before submitting. You've completed all required sections.
          </p>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default MultiStep
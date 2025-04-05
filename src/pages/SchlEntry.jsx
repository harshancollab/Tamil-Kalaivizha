import React, { useState } from "react"
import Header from "../components/Header"
import Dash from "../components/Dash"
import { addSchoolEntryAPI } from "../services/allAPI"

const  SchlEntry = () => {
  const [escortingTeachers, setEscortingTeachers] = useState([{ name: "", phone: "" }]);
  const [schoolDetails, setSchoolDetails] = useState({
    schoolCode: "",
    schoolName: "",
    schoolType: "",
    email: "",
    standardFrom: "",
    standardTo: "",
    principalName: "",
    principalPhone: "",
    headmasterName: "",
    headmasterPhone: "",
    teamManagerName: "",
    teamManagerPhone: "",
    upperPrimaryStudents: "",
    hsStudents: "",
    hssStudents: "",
    vhseStudents: "",
    totalStudents: "",
  });
  const [errors, setErrors] = useState({});

  const handleAddEscortingTeacher = () => {
    setEscortingTeachers([...escortingTeachers, { name: "", phone: "" }]);
  };

  const handleEscortingTeacherChange = (index, field, value) => {
    const updatedTeachers = [...escortingTeachers];
    updatedTeachers[index][field] = value;
    setEscortingTeachers(updatedTeachers);
  };

  const handleInputChange = (e) => {
    setSchoolDetails({ ...schoolDetails, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!schoolDetails.schoolCode) {
      newErrors.schoolCode = "School Code is required";
      isValid = false;
    } else if (schoolDetails.schoolCode.length <= 3) {
      newErrors.schoolCode = "School Code must be more than 3 characters";
      isValid = false;
    }

    if (!schoolDetails.schoolName) {
      newErrors.schoolName = "School Name is required";
      isValid = false;
    } else if (schoolDetails.schoolName.length <= 3) {
      newErrors.schoolName = "School Name must be more than 3 characters";
      isValid = false;
    }

    if (schoolDetails.schoolType && schoolDetails.schoolType.length <= 3) {
      newErrors.schoolType = "School Type must be more than 3 characters";
      isValid = false;
    }

    if (!schoolDetails.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(schoolDetails.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!schoolDetails.principalName) {
      newErrors.principalName = "Principal Name is required";
      isValid = false;
    } else if (schoolDetails.principalName.length <= 3) {
      newErrors.principalName = "Principal Name must be more than 3 characters";
      isValid = false;
    }

    if (!schoolDetails.principalPhone) {
      newErrors.principalPhone = "Principal Phone is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(schoolDetails.principalPhone)) {
      newErrors.principalPhone = "Principal Phone must be a 10-digit number";
      isValid = false;
    }

    if (schoolDetails.headmasterName && schoolDetails.headmasterName.length <= 3) {
      newErrors.headmasterName = "Headmaster Name must be more than 3 characters";
      isValid = false;
    }

    if (schoolDetails.headmasterPhone && !/^\d{10}$/.test(schoolDetails.headmasterPhone)) {
      newErrors.headmasterPhone = "Headmaster Phone must be a 10-digit number";
      isValid = false;
    }

    if (schoolDetails.teamManagerName && schoolDetails.teamManagerName.length <= 3) {
      newErrors.teamManagerName = "Team Manager Name must be more than 3 characters";
      isValid = false;
    }

    if (schoolDetails.teamManagerPhone && !/^\d{10}$/.test(schoolDetails.teamManagerPhone)) {
      newErrors.teamManagerPhone = "Team Manager Phone must be a 10-digit number";
      isValid = false;
    }

    escortingTeachers.forEach((teacher, index) => {
      if (teacher.name && teacher.name.length <= 3) {
        newErrors[`escortingTeacherName_${index}`] = `Escorting Teacher ${index + 1} Name must be more than 3 characters`;
        isValid = false;
      }

      if (!teacher.phone) {
        newErrors[`escortingTeacherPhone_${index}`] = `Escorting Teacher ${index + 1} Phone is required`;
        isValid = false;
      } else if (!/^\d{10}$/.test(teacher.phone)) {
        newErrors[`escortingTeacherPhone_${index}`] = `Escorting Teacher ${index + 1} Phone must be a 10-digit number`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const reqBody = {
        schoolCode: schoolDetails.schoolCode,
        schoolName: schoolDetails.schoolName,
        schoolType: schoolDetails.schoolType,
        email: schoolDetails.email,
        standardFrom: schoolDetails.standardFrom,
        standardTo: schoolDetails.standardTo,
        principalName: schoolDetails.principalName,
        principalPhone: schoolDetails.principalPhone,
        headmasterName: schoolDetails.headmasterName,
        headmasterPhone: schoolDetails.headmasterPhone,
        teamManagerName: schoolDetails.teamManagerName,
        teamManagerPhone: schoolDetails.teamManagerPhone,
        escortingTeachers: escortingTeachers,
        upperPrimaryStudents: schoolDetails.upperPrimaryStudents,
        hsStudents: schoolDetails.hsStudents,
        hssStudents: schoolDetails.hssStudents,
        vhseStudents: schoolDetails.vhseStudents,
        totalStudents: schoolDetails.totalStudents
      };
  
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
  
      try {
        const result = await addSchoolEntryAPI(reqBody, reqHeader);
        
        if (result.status === 200) {
          alert("School details added successfully");
         
          setSchoolDetails({
            schoolCode: "",
            schoolName: "",
            schoolType: "",
            email: "",
            standardFrom: "",
            standardTo: "",
            principalName: "",
            principalPhone: "",
            headmasterName: "",
            headmasterPhone: "",
            teamManagerName: "",
            teamManagerPhone: "",
            upperPrimaryStudents: "",
            hsStudents: "",
            hssStudents: "",
            vhseStudents: "",
            totalStudents: "",
          });
          setEscortingTeachers([{ name: "", phone: "" }]);
        } else {
          alert("Failed to add school details");
        }
      } catch (error) {
        console.error("Error adding school details", error);
        alert("Error adding school details");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-200 min-h-screen">
        <Dash />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="bg-white p-4 md:p-5 lg:p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">School Entry</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#003566]">
              <div className="flex flex-col md:flex-row items-start md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">School Code</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="schoolCode"
                    value={schoolDetails.schoolCode}
                    onChange={handleInputChange}
                    className={`border ${errors.schoolCode ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full`}
                  />
                  {errors.schoolCode && <p className="text-red-500 text-sm mt-1">{errors.schoolCode}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:space-x-4 md:pl-4 lg:pl-10">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">School Name</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="schoolName"
                    value={schoolDetails.schoolName}
                    onChange={handleInputChange}
                    className={`border ${errors.schoolName ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full md:w-full`}
                  />
                  {errors.schoolName && <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">School Type</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="schoolType"
                    value={schoolDetails.schoolType}
                    onChange={handleInputChange}
                    className={`border ${errors.schoolType ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full`}
                  />
                  {errors.schoolType && <p className="text-red-500 text-sm mt-1">{errors.schoolType}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:space-x-4 md:pl-4 lg:pl-10">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Email</label>
                <div className="flex flex-col w-full">
                  <input
                    type="email"
                    name="email"
                    value={schoolDetails.email}
                    onChange={handleInputChange}
                    className={`border ${errors.email ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full md:w-full`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Standard From</label>
                <input
                  type="text"
                  name="standardFrom"
                  value={schoolDetails.standardFrom}
                  onChange={handleInputChange}
                  className="w-full md:w-full border border-blue-900 px-2 py-1 md:py-2 rounded-full"
                />
              </div>
              <div className="flex flex-col md:flex-row items-start md:space-x-4 md:pl-4 lg:pl-10">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Standard To</label>
                <input
                  type="text"
                  name="standardTo"
                  value={schoolDetails.standardTo}
                  onChange={handleInputChange}
                  className="w-full  md:w-full border border-blue-900 px-2 py-1 md:py-2 rounded-full"

                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <h3 className="text-xl font-semibold">Organization Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-[#003566]">
              <div className="flex flex-col md:flex-row items-start md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Principal</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="principalName"
                    value={schoolDetails.principalName}
                    onChange={handleInputChange}
                    className={`border ${errors.principalName ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full`}
                  />
                  {errors.principalName && <p className="text-red-500 text-sm mt-1">{errors.principalName}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:space-x-4 md:pl-4 lg:pl-10">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Phone No</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="principalPhone"
                    value={schoolDetails.principalPhone}
                    onChange={handleInputChange}
                    className={`border ${errors.principalPhone ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full md:w-full`}
                  />
                  {errors.principalPhone && <p className="text-red-500 text-sm mt-1">{errors.principalPhone}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Headmaster</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="headmasterName"
                    value={schoolDetails.headmasterName}
                    onChange={handleInputChange}
                    className={`border ${errors.headmasterName ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full`}
                  />
                  {errors.headmasterName && <p className="text-red-500 text-sm mt-1">{errors.headmasterName}</p>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:space-x-4 md:pl-4 lg:pl-10">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Phone No</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="headmasterPhone"
                    value={schoolDetails.headmasterPhone}
                    onChange={handleInputChange}
                    className={`border ${errors.headmasterPhone ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full md:w-full`}
                  />
                  {errors.headmasterPhone && <p className="text-red-500 text-sm mt-1">{errors.headmasterPhone}</p>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:space-x-4">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Team Manager</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="teamManagerName"
                    value={schoolDetails.teamManagerName}
                    onChange={handleInputChange}
                    className={`border ${errors.teamManagerName ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full`}
                  />
                  {errors.teamManagerName && <p className="text-red-500 text-sm mt-1">{errors.teamManagerName}</p>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:space-x-4 md:pl-4 lg:pl-10">
                <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Phone No</label>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="teamManagerPhone"
                    value={schoolDetails.teamManagerPhone}
                    onChange={handleInputChange}
                    className={`border ${errors.teamManagerPhone ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full md:w-full`}
                  />
                  {errors.teamManagerPhone && <p className="text-red-500 text-sm mt-1">{errors.teamManagerPhone}</p>}
                </div>
              </div>

              {escortingTeachers.map((teacher, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col md:flex-row items-start md:space-x-4">
                    <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Escorting Teacher</label>
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        value={teacher.name}
                        onChange={(e) => handleEscortingTeacherChange(index, "name", e.target.value)}
                        className={`border ${errors[`escortingTeacherName_${index}`] ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full`}
                      />
                      {errors[`escortingTeacherName_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`escortingTeacherName_${index}`]}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:space-x-4 md:pl-4 lg:pl-10">
                    <label className="font-semibold text-blue-900 w-full md:w-40 mb-1 md:mb-0">Phone No</label>
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        value={teacher.phone}
                        onChange={(e) => handleEscortingTeacherChange(index, "phone", e.target.value)}
                        className={`border ${errors[`escortingTeacherPhone_${index}`] ? "border-red-500" : "border-blue-900"} px-2 py-1 md:py-2 rounded-full w-full md:w-full`}
                      />
                      {errors[`escortingTeacherPhone_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`escortingTeacherPhone_${index}`]}</p>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
              <div className="flex justify-center mr-16 md:col-span-2 md:pr-6 lg:pr-10">
                <button
                  type="button"
                  className="border border-blue-900 text-[#003566] px-4 py-1 rounded-full"
                  onClick={handleAddEscortingTeacher}
                >
                  + Add
                </button>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">Number of Students</h3>

            <div className="flex flex-wrap gap-4 mt-8 text-blue-900 justify-center md:justify-start">
              <div className="badge text-[#003566] flex items-center mb-2 md:mb-0 md:ml-0 lg:ml-10 md:mr-10 lg:mr-20">
                Upper Primary
                <input
                  type="text"
                  name="upperPrimaryStudents"
                  value={schoolDetails.upperPrimaryStudents}
                  onChange={handleInputChange}
                  className="border-blue-700 border rounded-full w-16 md:w-20 ml-2 px-2 py-1"
                />
              </div>

              <div className="badge mb-2 md:mb-0 md:mr-10 lg:mr-20">
                HS
                <input
                  type="text"
                  name="hsStudents"
                  value={schoolDetails.hsStudents}
                  onChange={handleInputChange}
                  className="border-blue-700 border rounded-full w-16 md:w-20 ml-2 px-2 py-1"
                />
              </div>

              <div className="badge mb-2 md:mb-0 md:mr-10 lg:mr-20">
                HSS
                <input
                  type="text"
                  name="hssStudents"
                  value={schoolDetails.hssStudents}
                  onChange={handleInputChange}
                  className="border-blue-700 border rounded-full w-16 md:w-20 ml-2 px-2 py-1"
                />
              </div>

              <div className="badge mb-2 md:mb-0">
                VHSE
                <input
                  type="text"
                  name="vhseStudents"
                  value={schoolDetails.vhseStudents}
                  onChange={handleInputChange}
                  className="border-blue-700 border rounded-full w-16 md:w-20 ml-2 px-2 py-1"
                />
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center w-full px-4">
              <div className="flex-1 mb-10 text-center mb-4 md:mb-0 ">
                <h3 className="text-lg text-blue-900 font-semibold inline-block">
                  Total no of students
                  <input
                    type="text"
                    name="totalStudents"
                    value={schoolDetails.totalStudents}
                    onChange={handleInputChange}
                    className="border-blue-700 border rounded-full w-16 md:w-20 ml-2 px-2 py-1"
                  />
                </h3>
              </div>
              <div className="flex justify-center md:col-span-2 mt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white px-6 py-2 rounded-full"
                >
                  Save Details
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SchlEntry

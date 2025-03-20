import React, { useEffect, useState, useRef } from "react"

const MultiStep = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [escortingTeachers, setEscortingTeachers] = useState([
    { name: "", phone: "" },
  ]);

  const handleAddEscortingTeacher = () => {
    setEscortingTeachers([...escortingTeachers, { name: "", phone: "" }]);
  };

  const handleEscortingTeacherChange = (index, field, value) => {
    const updatedTeachers = [...escortingTeachers];
    updatedTeachers[index][field] = value;
    setEscortingTeachers(updatedTeachers);
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

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 relative">
        <button
          className="absolute top-0 right-5 text-red-500 text-2xl font-bold"
          onClick={() => alert("Closing Form")}
        >
          &times;
        </button>
        <div className="flex items-center justify-between mb-6 w-full">
          {[
            { stepNum: 1, label: "School Details" },
            { stepNum: 2, label: "Organization" },
            { stepNum: 3, label: "No. of Students" },
          ].map(({ stepNum, label }, index, array) => (
            <div key={stepNum} className="flex items-center w-full">
              <div className="flex flex-col items-center">
                <i
                  className={`fa-solid fa-circle-check text-lg ${step >= stepNum ? "text-green-500" : "text-gray-300"
                    }`}
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
                    }`}
                >
                  {label}
                </span>
              </div>
              {index !== array.length - 1 && (
                <div className="flex-grow border-t border-gray-400 mx-3"></div>
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="grid mt-28 ml-5 grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... Step 1 content ... */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-left-right mr-2"></i>School Code
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-graduation-cap mr-2"></i>School Name
                <i className="fa-solid fa-t mr-2"></i>School Type
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-graduation-cap mr-2"></i>School Name
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-envelope mr-2"></i>School Email
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-circle-check mr-2"></i>Standard From
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-circle-check mr-2"></i>Standard To
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-bookmark mr-2"></i>Class
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            <div className="mt-32 flex justify-end">
              <button
                onClick={nextStep}
                className="bg-blue-800 text-white px-4 py-2 rounded-full w-40"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid mt-28 ml-5 grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... Step 2 content ... */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-user mr-2"></i>School Principal
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-phone mr-2"></i>Phone Number
              </label>
              <input
                type="text"
                className="border-blue-900 w-4/5 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-user mr-2"></i>School Headmaster
              </label>
              <input
                type="text"
                className="border-blue-900 w-4/5 px-4 py-2 border rounded-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-phone mr-2"></i>Phone Number
              </label>
              <input
                type="text"
                className="border-blue-900 w-4/5 px-4 py-2 border rounded-full"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-users mr-2"></i>Team Manager
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-phone mr-2"></i>Phone Number
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>
            {escortingTeachers.map((teacher, index) => (
              <React.Fragment key={index}>
                <div>
                  <label className="block text-sm font-medium text-blue-900 ">
                    <i className="fa-solid fa-address-card mr-2"></i>Escorting Teacher
                  </label>
                  <input
                    value={teacher.name}
                    onChange={(e) => handleEscortingTeacherChange(index, "name", e.target.value)}
                    type="text"
                    className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
                  />

                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    <i className="fa-solid fa-phone mr-2"></i>Phone Number
                  </label>
                  <input
                    value={teacher.phone}
                    onChange={(e) => handleEscortingTeacherChange(index, "phone", e.target.value)}
                    type="text"
                    className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
                  />
                </div>
              </React.Fragment>
            ))}
            <button
              className="border border-blue-900 text-blue-800 px-2 py-1 rounded-full w-20  ml-64"
              onClick={handleAddEscortingTeacher}
            >
             + Add
            </button>

            <div className="w-full flex justify-end mt-10 col-span-1 md:col-span-2">
              <button
                onClick={prevStep}
                className="border border-blue-900 w-32 text-blue-800 px-4 py-2 rounded-full"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-900 text-white px-4 py-2 rounded-full w-32 ml-4"
              >
                Next
              </button>
            </div>
          </div>
        )}




        {step === 3 && (
          <div className="grid mt-28 ml-5 grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-bookmark mr-2"></i>Upper Primary
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-book mr-2"></i>Higher Secondary School
              </label>
              <input
                type="text"
                className="border-blue-900 w-4/5 px-4 py-2 border rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-solid fa-book-open mr-2"></i>Vocational Higher Secondary Education
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                <i className="fa-regular fa-user mr-2"></i>Total Number of students
              </label>
              <input
                type="text"
                className="w-4/5 border-blue-900 px-4 py-2 border rounded-full"
              />
              <div className="w-full flex justify-end mt-32">
                <button
                  onClick={prevStep}
                  className="bg-blue-900 w-32 text-white px-4 py-2 rounded-full"
                >
                  Back
                </button>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-full w-32 ml-4">
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

export default MultiStep



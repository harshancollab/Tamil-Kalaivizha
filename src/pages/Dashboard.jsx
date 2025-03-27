import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { PieChart, Pie, Cell } from "recharts";
import Addparticipat from "../components/Addparticipat";
import Editparticipate from "../components/Editparticipate";
import { Link, useNavigate } from "react-router-dom";
import Dash from "../components/Dash";
import { userSchooldetailsAPI } from "../services/allAPI";
import SchoolDetails from "./SchoolDetails";
import MultiStep from "../components/Multistep";

const Dashboard = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReportCreated, setIsReportCreated] = useState(
    localStorage.getItem("reportCreated") === "true"
  ); // Initialize from localStorage
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(
    localStorage.getItem("reportConfirmed") === "true"
  ); // Initialize disable state
  const [SchDetails, setSchDetails] = useState([]);
  const [showMultiStepModal, setShowMultiStepModal] = useState(false);

  useEffect(() => {
    const isFirstLogin = !localStorage.getItem("hasLoggedInBefore");

    if (isFirstLogin) {
      setShowMultiStepModal(true);
      localStorage.setItem("hasLoggedInBefore", "true");
    }
    getSchooldetails();
  }, []);
  console.log(SchDetails);

  const getSchooldetails = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await userSchooldetailsAPI(reqHeader);
        console.log(result);

        if (result.status == 200) {
          setSchDetails(result.data);

          if (result.data.length === 0) {
            setShowMultiStepModal(true);
          }
        }
      } catch (err) {
        console.log(err);
        setShowMultiStepModal(true);
      }
    }
  };

  const closeMultiStepModal = () => {
    setShowMultiStepModal(false);
    getSchooldetails();
  };

  const handleEditSchool = () => {
    sessionStorage.setItem("editSchoolData", JSON.stringify(SchoolDetails));
    navigate("/Schooldetails");
  };

  const handleCreateReport = () => {
    setIsReportCreated(true);
    localStorage.setItem("reportCreated", "true"); // Store the state
    navigate("/report");
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setIsConfirmButtonDisabled(true);
    localStorage.setItem("reportConfirmed", "true"); // Store the disabled state

    setTimeout(() => {
      setIsConfirmed(false);
    }, 4000);
  };

  const navigate = useNavigate();
  const [currentPage, setCurrentpage] = useState(1);

  const data = [
    { name: "Category A", value: 20, color: "#007bff" },
    { name: "Category B", value: 40, color: "#ffeb3b" },
    { name: "Category C", value: 50, color: "#00c853" },
  ];
  return (
    <>
      <Header insideHome={true} />

      <div className="flex flex-col  md:flex-row h-full min-h-screen bg-gray-100 relative">
        <Dash />

        <div className="flex-1 p-6 sm:p-4  md:p-1 mt-2 md:px-3 md:py-2 ">
          {isConfirmed && (
            <div
              className="fixed top-4 right-4 z-50 bg-green-50 border-l-4 border-green-500 text-green-700 px-5 py-4 rounded-lg shadow-lg max-w-md
   transform transition-transform duration-500 ease-in-out translate-x-0 hover:scale-105 flex items-center justify-between"
              role="alert"
            >
              <div className="flex items-center">
                <div>
                  <p className="font-semibold">Entry Confirmed Successfully!</p>
                  <p className="text-sm">The details cannot be modified now.</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-200 shadow-md p-3 sm:p-4 md:p-1 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-4 relative">
            <div className="absolute top-3 right-3 md:top-3 md:right-3 z-10 flex items-center ">
              <button
                onClick={handleEditSchool}
                className=" mr-4 px-3 py-2 w-20 border z-1 text-white bg-gradient-to-r from-[#003566] to-[#05B9F4] border-blue-500 rounded-full hover:border-black text-sm font-medium flex items-center"
              >
                <i className="fa-solid fa-pen mr-1"></i> Edit
              </button>
            </div>
            <div className="w-full md:w-auto mt-1">
              <h2 className="text-lg px-5 py-3  font-bold text-gray-800 mb-2 md:mb-6 lg:mb-10">
                School Details
              </h2>

              <div className="ml-5">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold flex items-center flex-wrap">
                  <i className="fa-solid fa-graduation-cap mr-2"></i>
                  G. H. S. S. Vaguvuvarai -{" "}
                  <span className="text-blue-500">30003</span>
                </h3>
                <p className="text-gray-500">Government</p>
                <p className="text-blue-500 mt-2 break-words mb-2">
                  ghsvaguvuvarai@gmail.com
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 w-full md:w-auto">
              <div className="text-gray-700">
                <p className="font-semibold flex items-center">
                  <i className="fa-solid fa-user mr-2"></i> SHINTO MON
                  <a href="#" className="ml-2 text-blue-500">
                    <i className="fa-solid fa-phone"></i>
                  </a>
                </p>
                <p className="text-sm ml-5">Chairman</p>
              </div>
              <div className="text-gray-700">
                <p className="font-semibold flex items-center">
                  <i className="fa-solid fa-user mr-2"></i> SELVIN R
                  <a href="#" className="ml-2 text-blue-500">
                    <i className="fa-solid fa-phone"></i>
                  </a>
                </p>
                <p className="text-sm ml-5">Headmaster</p>
              </div>
            </div>

            <div className="w-full md:w-auto">
              {/* New section for Boys and Girls count */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center">
                  <p className="mr-2 font-semibold text-gray-600">
                    No of Boys: <span className=" ">40</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2 font-semibold text-gray-600">
                    No of Girls: <span className="">45</span>
                  </p>
                </div>
              </div>

              <p className="text-gray-700  ">
                <span className="text-green-500 ">●</span> Higher Secondary
              </p>
              <p className="text-gray-700 mt-2">
                <span className="text-yellow-500 ">●</span> Upper Primary
              </p>
              <p className="text-gray-700 mt-2">
                <span className="text-blue-500">●</span> High School
              </p>
            </div>

            <div className="relative w-full md:w-40 h-40 flex items-center justify-center sm:text-left">
              <div className="mt-12">
                <PieChart width={140} height={140}>
                  <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={3}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              <div className="absolute flex flex-col mt-14 items-center">
                <p className="text-sm text-gray-600 font-medium">Total no</p>
                <p className="text-sm text-gray-600 font-medium">of students</p>
                <p className="text-lg font-bold text-black">184</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md p-3 sm:p-4 md:p-6 rounded-lg mb-6">
            <div className="p-2 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <Link to="/participatelist" className="block h-full">
                  <div className="bg-white text-blue-900 h-32 sm:h-36 md:h-48 p-3 sm:p-4 md:p-6 rounded-xl shadow-md flex flex-col items-center justify-center border hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] hover:text-white transition cursor-pointer">
                    <span className="text-lg sm:text-xl font-semibold">📄</span>
                    <span className="mt-2 text-sm sm:text-base md:text-lg text-center">
                      Participants List
                    </span>
                  </div>
                </Link>

                <Link to="/item" className="block h-full">
                  <div className="bg-white text-blue-900 h-32 sm:h-36 md:h-48 p-3 sm:p-4 md:p-6 rounded-xl shadow-md flex flex-col items-center justify-center border hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] hover:text-white transition cursor-pointer">
                    <span className="text-lg sm:text-xl text-blue-500">
                      <i className="fa-solid fa-file-arrow-down"></i>
                    </span>
                    <span className="mt-2 text-sm sm:text-base md:text-lg text-center">
                      Item Wise Participants
                    </span>
                  </div>
                </Link>

                <Link to="/result" className="block h-full">
                  <div className="bg-white text-blue-900 h-32 sm:h-36 md:h-48 p-3 sm:p-4 md:p-6 rounded-xl shadow-md flex flex-col items-center justify-center border hover:bg-gradient-to-r from-[#003566] to-[#05B9F4] hover:text-white transition cursor-pointer">
                    <span className="text-lg sm:text-xl text-blue-500">
                      <i className="fa-solid fa-border-all"></i>
                    </span>
                    <span className="mt-2 text-sm sm:text-base md:text-lg text-center">
                      Result View
                    </span>
                  </div>
                </Link>
              </div>

              <div className="bg-gray-100 p-3 sm:p-4 md:p-6 mt-8 sm:mt-12 md:mt-16 rounded-lg shadow-md">
                <h3 className="text-md sm:text-lg font-semibold mb-3">Report</h3>
                <div className="border border-blue-300 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <p className="text-red-600 text-xs sm:text-sm font-medium">
                    <span className="font-bold">Warning:</span> Once confirmed,
                    entry details cannot be modified. Ensure the report has been
                    certified by the Headmaster/Principal before confirming.
                  </p>
                  <div className="flex flex-col xs:flex-row sm:flex-row gap-2 mt-3 sm:mt-0 w-full sm:w-auto">
                    <button
                      onClick={handleCreateReport}
                      className={`w-full xs:w-auto sm:w-28 py-2 sm:py-3 bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white border border-transparent hover:opacity-90 shadow-lg rounded-lg transition`}
                    >
                      Create Report
                    </button>
                    {isReportCreated && (
                      <button
                        onClick={handleConfirm}
                        disabled={isConfirmButtonDisabled}
                        className={`w-full xs:w-auto sm:w-28 py-2 sm:py-3 border border-blue-400 rounded-lg ${
                          isConfirmButtonDisabled
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-200 cursor-pointer"
                        } transition`}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddModalOpen && <Addparticipat onClose={() => setIsAddModalOpen(false)} />}
      {isEditModalOpen && <Editparticipate onClose={() => setIsEditModalOpen(false)} />}
    </>
  );
};

export default Dashboard;
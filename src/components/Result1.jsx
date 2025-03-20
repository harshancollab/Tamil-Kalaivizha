import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Result1 = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleClick = (grade, path) => {
    setSelectedGrade(grade);
    navigate(path);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 md:grid-cols-4 items-end">
        {/* A Grade Box */}
        <div
          className={`p-4 sm:p-6 rounded-lg text-center cursor-pointer border-2 transition-all duration-300 h-auto sm:h-[180px] flex flex-col justify-between ${
            selectedGrade === "A"
              ? "border-black bg-[#D8CFCF] text-black shadow-lg"
              : "bg-[#D8CFCF] text-black"
          }`}
          onClick={() => handleClick("A", "/result")}
        >
          <h2 className="text-lg sm:text-xl font-semibold">A Grade</h2>
          <p className="text-sm sm:text-base">Total No of Points</p>
          <h3 className="text-2xl sm:text-3xl bg-gradient-to-r from-[#003566] to-[#05B9F4] bg-clip-text text-transparent font-bold">80</h3>
        </div>

        {/* B Grade Box */}
        <div
          className={`p-4 sm:p-6 rounded-lg text-center cursor-pointer border-2 transition-all duration-300 h-auto sm:h-[160px] flex flex-col justify-between ${
            selectedGrade === "B"
              ? "border-black bg-[#BBCAC7] text-black shadow-lg"
              : "bg-[#BBCAC7] text-black"
          }`}
          onClick={() => handleClick("B", "/b-grade-list")}
        >
          <h2 className="text-lg sm:text-xl font-semibold">B Grade</h2>
          <p className="text-sm sm:text-base">Total No of Points</p>
          <h3 className="text-2xl sm:text-3xl text-[#0271A7] font-bold">60</h3>
        </div>

        {/* C Grade Box */}
        <div
          className={`p-4 sm:p-6 md:p-1 rounded-lg text-center cursor-pointer border-2 transition-all duration-300 h-auto sm:h-[120px] flex flex-col justify-between ${
            selectedGrade === "C"
              ? "border-black text-black bg-[#D0CFD8] shadow-lg"
              : "bg-[#D0CFD8] text-black"
          }`}
          onClick={() => handleClick("C", "/c-grade-list")}
        >
          <h2 className="text-lg sm:text-xl font-semibold">C Grade</h2>
          <p className="text-sm sm:text-base">Total No of Points</p>
          <h3 className="text-2xl sm:text-3xl text-[#0271A7] font-bold">40</h3>
        </div>

        {/* Grade Box */}
        <div
          className={`p-4 sm:p-6 md:p-1 rounded-lg text-center cursor-pointer border-2 transition-all duration-300 h-auto sm:h-[100px] flex flex-col justify-between ${
            selectedGrade === "D"
              ? "border-black text-black bg-[#B0C0D0] shadow-lg"
              : "bg-[#B0C0D0] text-black"
          }`}
          onClick={() => handleClick("D", "")}
        >
          <p className="text-sm sm:text-base mt-2">Total No of Points</p>
          <h3 className="text-2xl mb-2 sm:text-3xl text-[#0271A7] font-bold">200</h3>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Link
          to="/top"
          className="text-blue-500 hover:underline flex items-center space-x-1"
        >
          <span>Leading Schools</span>
          <span>&#8250;</span>
        </Link>
      </div>
    </div>
  );
};

export default Result1
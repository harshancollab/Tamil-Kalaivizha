import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Dash from "../components/Dash"

const TopSchool = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search") || "";
  const typeParam = queryParams.get("type") || "";
  const studentTypeParam = queryParams.get("studentType") || "";
  const viewTypeParam = queryParams.get("viewType") || "normal";
  const itemParam = queryParams.get("item") || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(itemParam);
  const [selectedType, setSelectedType] = useState(viewTypeParam);
  const [searchKey, setSearchKey] = useState(searchParam);
  const [schoolType, setSchoolType] = useState(typeParam);
  const [studentType, setStudentType] = useState(studentTypeParam);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsModalOpen(false);

    updateUrl("item", item);
  };

  const updateUrl = (param, value) => {
    const params = new URLSearchParams(location.search);

    if (value && value !== "") {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  };


  useEffect(() => {
    const params = new URLSearchParams();

    if (searchKey) params.set("search", searchKey);
    if (schoolType) params.set("type", schoolType);
    if (studentType) params.set("studentType", studentType);
    if (selectedType !== "normal") params.set("viewType", selectedType);
    if (selectedItem) params.set("item", selectedItem);

    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  }, [searchKey, schoolType, studentType, selectedType, selectedItem, navigate, location.pathname]);

  const defaultData = [
    { rank: 1, code: "100", name: "School A", type: "Govt", a: 40, b: 50, c: 30, total: 120 },
    { rank: 2, code: "101", name: "School B", type: "Private", a: 30, b: 40, c: 20, total: 90 },
    { rank: 3, code: "100", name: "School A", type: "Govt", a: 40, b: 50, c: 30, total: 120 },
    { rank: 4, code: "101", name: "School B", type: "Private", a: 30, b: 40, c: 20, total: 90 },
    { rank: 5, code: "100", name: "School A", type: "Govt", a: 40, b: 50, c: 30, total: 120 },
    { rank: 6, code: "101", name: "School B", type: "Private", a: 30, b: 40, c: 20, total: 90 },
    { rank: 7, code: "100", name: "School A", type: "Govt", a: 40, b: 50, c: 30, total: 120 },
    { rank: 8, code: "101", name: "School B", type: "Private", a: 30, b: 40, c: 20, total: 90 },
  ];

  const itemWiseData = [
    { rank: 1, code: "200", name: "ItemWise School A", type: "Govt", a: 50, b: 60, c: 40, total: 150 },
    { rank: 2, code: "201", name: "ItemWise School B", type: "Private", a: 35, b: 45, c: 25, total: 105 },
  ];


  const filteredData = (selectedType === "itemwise" ? itemWiseData : defaultData).filter(school => {
    const nameMatch = school.name.toLowerCase().includes(searchKey.toLowerCase());
    const typeMatch = schoolType === "" || school.type.toLowerCase() === schoolType.toLowerCase();
    return nameMatch && typeMatch;
  });

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSchoolTypeChange = (e) => {
    setSchoolType(e.target.value);
  };

  const handleStudentTypeChange = (e) => {
    setStudentType(e.target.value);
  };

  const handleViewTypeChange = (e) => {
    const value = e.target.value;
    if (value === "books") {
      setIsModalOpen(true);
      setSelectedType("itemwise");
      updateUrl("viewType", "itemwise");
    } else if (value === "uniform") {
      setSelectedType("normal");
      updateUrl("viewType", "normal");

      setSelectedItem("");
      updateUrl("item", "");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Dash />
        <div className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h1 className="text-xl md:text-2xl font-semibold mb-3 md:mb-0">
              {selectedType === "itemwise"
                ? `Item Wise - ${selectedItem || "Select"}`
                : "Leading Schools"}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-40">
                <select
                  className="border-blue-800 border px-3 py-2 text-gray-500 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  value={selectedType === "itemwise" ? "books" : "uniform"}
                  onChange={handleViewTypeChange}
                >
                  <option value="">Select wise</option>
                  <option value="books">Itemwise</option>
                  <option value="uniform">Pointwise</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <div className="relative w-full sm:w-40 mt-2 sm:mt-0">
                <select
                  className="border-blue-800 border text-gray-500 px-3 py-2 text-sm rounded-full w-full bg-white cursor-pointer appearance-none pr-10"
                  value={studentType}
                  onChange={handleStudentTypeChange}
                >
                  <option value="">Student Type</option>
                  <option value="upper_primary">Upper Primary</option>
                  <option value="hss">HSS</option>
                  <option value="vhsc">VHSC</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <button className="border bg-gradient-to-r from-[#003566] to-[#05B9F4] px-5 py-2 text-white rounded-full text-sm mt-2 sm:mt-0 w-full sm:w-auto">
                Aggregate
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center mb-4">
            <div className="relative mb-2 sm:mb-0 sm:mr-4 w-full sm:w-80">
              <input
                type="text"
                placeholder="Search School Name..."
                className="border-blue-800 border px-3 py-2 rounded-full w-full"
                value={searchKey}
                onChange={handleSearchChange}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="relative flex items-center w-full sm:w-48 h-10 border border-blue-800 rounded-full px-4 bg-white mt-2 sm:mt-0">
              <select
                className="w-full bg-transparent outline-none text-sm appearance-none cursor-pointer"
                value={schoolType}
                onChange={handleSchoolTypeChange}
              >
                <option value="">School Type</option>
                <option value="govt">Government</option>
                <option value="aided">Aided</option>
                <option value="private">Unaided</option>
              </select>
              <div className="text-gray-500">
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-gray-700 border border-gradient">
                    <th className="p-2 md:p-3">Rank</th>
                    <th className="p-2 md:p-3">School Code</th>
                    <th className="p-2 md:p-3">School Name</th>
                    <th className="p-2 md:p-3">School Type</th>
                    <th className="p-2 md:p-3">A Grade</th>
                    <th className="p-2 md:p-3">B Grade</th>
                    <th className="p-2 md:p-3">C Grade</th>
                    <th className="p-2 md:p-3">Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={`${item.rank}-${index}`} className="border border-gradient odd:bg-white even:bg-gray-50 hover:bg-[#C6DEF5]">
                      <td className="p-2 md:p-3">{item.rank}</td>
                      <td className="p-2 md:p-3">{item.code}</td>
                      <td className="p-2 md:p-3">{item.name}</td>
                      <td className="p-2 md:p-3">{item.type}</td>
                      <td className="p-2 md:p-3">{item.a}</td>
                      <td className="p-2 md:p-3">{item.b}</td>
                      <td className="p-2 md:p-3">{item.c}</td>
                      <td className="p-2 md:p-3 font-bold text-blue-500">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-sm md:w-96">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-red-600">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <h2 className="text-xl text-[#003566] ml-5 font-semibold mb-4">Item List</h2>
            <div className="overflow-y-auto h-52 ml-8 sm:ml-16">
              {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"].map((item) => (
                <button
                  key={item}
                  className="text-gray-600 mb-2 block hover:text-blue-800"
                  onClick={() => handleItemSelect(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopSchool
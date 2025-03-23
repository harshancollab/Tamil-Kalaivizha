import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/Kalaivizha.png"

const Header = ({ insideHome }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("Username");
  const [tempName, setTempName] = useState("Username");
  const nameInputRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const fileInputRef = useRef(null);



  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {

      console.log("File selected:", file);


    }
  };
  const navigate = useNavigate()
  
  const logout = () => {
    sessionStorage.clear()
    navigate("/login")
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
    setIsEditingName(false);
    setTempName(name);
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (event) => {
    setTempName(event.target.value);
  };

  const handleSaveName = () => {
    setName(tempName);
    setIsEditingName(false);
  };

  const handleCancelEditName = () => {
    setTempName(name);
    setIsEditingName(false);
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  return (
    <>
      <div className="relative w-full">
        <nav className="bg-[#46A2FF] text-white px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 ml-2 sm:ml-10 ml-8">
            <img
              src={logo}
              alt="logo"
              className="h-8 w-auto sm:h-10"
            />
            <Link to={'/'} className="text-lg sm:text-xl font-bold truncate max-w-[150px] sm:max-w-full">
              Tamil Kalaivizha
            </Link>

            {insideHome && (
              <div className="hidden md:flex items-center flex-grow max-w-md relative">
                <input
                  type="text"
                  placeholder="Search anything"
                  className="w-full px-4 py-2 rounded-lg bg-white text-black shadow-md focus:outline-none"
                />
                <i className="fas fa-search absolute right-3 top-3 text-gray-500"></i>
              </div>
            )}
          </div>

          <div className="sm:hidden relative" ref={mobileDropdownRef}>
            <img
              src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
              alt="Profile"
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={toggleMobileDropdown}
            />

            {mobileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg overflow-hidden z-50">
                <button
                  onClick={toggleProfileModal}
                  className="block px-4 py-2 hover:bg-gray-200 flex items-center w-full text-left"
                >
                  <i className="fas fa-user mr-2"></i> Profile
                </button>
                <Link href="/conformpwd" className="block px-4 py-2 hover:bg-gray-200 flex items-center">
                  <i className="fas fa-key mr-2"></i> Change Password
                </Link>
                <div className="block px-4 py-2 hover:bg-gray-200 flex items-center">
                  <i className="fas fa-bell mr-2"></i> Notifications
                </div>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200 flex items-center">
                  <i className="fas fa-sign-out-alt mr-2"></i> Log out
                </a>
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-xl cursor-pointer">
              <i className="fas fa-bell"></i>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border"
                />
                <span className="hidden sm:block text-sm md:text-base truncate max-w-[120px] md:max-w-[200px]">
                  {name}
                </span>
                <i
                  className={`fas ${dropdownOpen ? "fa-chevron-up" : "fa-chevron-down"} text-lg`}
                ></i>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg overflow-hidden z-50">
                  <button
                    onClick={toggleProfileModal}
                    className="block px-4 py-2 hover:bg-gray-200 flex items-center w-full text-left"
                  >
                    <i className="fas fa-user mr-2"></i> Profile
                  </button>
                  <a href="/conformpwd" className="block px-4 py-2 hover:bg-gray-200 flex items-center">
                    <i className="fas fa-key mr-2"></i> Change Password
                  </a>
                  <button onClick={logout} className="block px-4 py-2 hover:bg-gray-200 flex items-center">
                    <i className="fas fa-sign-out-alt mr-2"></i> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {insideHome && (
          <div className="md:hidden px-4 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything"
                className="w-full px-4 py-2 rounded-lg bg-white text-black shadow-md focus:outline-none"
              />
              <i className="fas fa-search absolute right-3 top-3 text-gray-500"></i>
            </div>
          </div>
        )}
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 ">
            <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-6 my-8 sm:mx-auto sm:my-auto flex flex-col justify-between h-[400px]">
              <div>
                <button
                  onClick={toggleProfileModal}
                  className="absolute top-2 right-2 text-red-600 hover:text-gray-800 focus:outline-none"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>

                <h2 className="text-xl font-semibold ml-5 mb-4">Profile</h2>

                <div className="flex flex-col sm:flex-row items-center mb-6 gap-4 ml-5 ">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center">
                  
                  <img className="w-10" src="https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg" alt="" />
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-900 text-white rounded-full shadow-md text-sm focus:outline-none"
                    onClick={handleUploadClick}
                  >
                    Upload Image
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-3 ml-6">
                  <div className="mt-10">
                    <label className="block text-sm font-medium text-blue-900 mb-1">Name</label>
                    <div className="relative mb-5">
                      {isEditingName ? (
                        <input
                          type="text"
                          className="w-full sm:w-80 border-blue-900 px-4 py-2 border rounded-full"
                          value={tempName}
                          onChange={handleNameChange}
                          ref={nameInputRef}
                        />
                      ) : (
                        <>
                          <input
                            type="text"
                            className="w-full sm:w-80 border-blue-900 px-4 py-2 border rounded-full"
                            value={name}
                            readOnly
                          />
                          <button
                            className="absolute right-3 top-2 text-gray-500 cursor-pointer focus:outline-none"
                            onClick={handleEditName}
                          >
                            <i className="fas fa-pencil-alt absolute right-16 top-1 text-blue-500 cursor-pointer"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-6 ml-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-1">User name</label>
                    <input disabled type="text" className="w-full sm:w-80 border-blue-900 px-4 py-2 border rounded-full" />
                  </div>
                </div>
              </div>

              {isEditingName && (
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={handleCancelEditName}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveName}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header


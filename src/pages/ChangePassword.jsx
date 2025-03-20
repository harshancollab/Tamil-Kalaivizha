import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  return (
   
   <>
    <Header/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-[500px] relative overflow-hidden">
          <div className="absolute inset-0 from-transparent to-blue-100 blur-xl opacity-50"></div>
          <h2 className="text-xl font-semibold mb-2 relative">Change Password</h2>
          <p className="text-gray-500 mb-4 relative">Change your account password</p>
            <div className="relative mb-4">
            <div className="flex items-center justify-between">
              <label className="text-blue-900 font-medium">Current Password</label>
              <div className="flex items-center border rounded-full px-4 py-2 mt-1 w-64">
                <input
                  type={showPassword.current ? "text" : "password"}
                  placeholder="Enter Current Password"
                  className="flex-1  outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end mt-1">
              <Link to="/resetpwd" className="text-yellow-500 text-sm">
                Forgot Password?
              </Link>
            </div>
          </div>
            <div className="relative mb-4 flex items-center justify-between">
            <label className="text-blue-900 font-medium">New Password</label>
            <div className="flex items-center border rounded-full px-4 py-2 mt-1 w-64">
              <input
                type={showPassword.new ? "text" : "password"}
                placeholder="Enter New Password"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>
            <div className="relative mb-6 flex items-center justify-between">
            <label className="text-blue-900 font-medium">Verify Password</label>
            <div className="flex items-center border rounded-full px-4 py-2 mt-1 w-64">
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Enter Confirm Password"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </div>
            <div className="flex justify-end">
            <button className="py-2 px-8 rounded-full text-white font-semibold bg-blue-800">
              Save
            </button>
          </div>
        </div>
      </div>
   </>
  
  );
};

export default ChangePassword

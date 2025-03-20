import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
    } else {
      setError("");
      alert('verification code sent ')
      navigate("/otp-verification");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[850px]">
        {/*Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
            alt="Forgot Password"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Forgot Password
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Enter your email address to receive a verification code.
            </p>
            <form onSubmit={handleSend}>
              <div className="mt-6">
                <label htmlFor="email" className="block text-blue-900 font-medium mb-1 ml-4">
                  <i class="fa-regular fa-user"></i> Enter Email
                </label>
                <input 
                  id="email"
                  type="email"
                  placeholder="Example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border border-black rounded-full  shadow-sm focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-dark-500"
                    }`}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-3 text-white font-semibold bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full hover:opacity-90 transition"
              >
                Send
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword

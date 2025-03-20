import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Newpass = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        setError("");
        alert("Password successfully reset! Please Login");
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[850px]">
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
                        alt="Reset Password"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Create New Password</h2>
                    <p className="text-gray-600 text-center mb-4">Fill in the details below to reset your password.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="new-password" className="block text-blue-900 font-medium mb-1 ml-3">
                                <i class="fa-solid fa-lock"></i> New Password
                            </label>
                            <input
                                id="new-password"
                                type="password"
                                placeholder="Enter New Password"
                                className={`w-full p-3 border border-black  rounded-full focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-800"
                                    }`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="block text-blue-900 font-medium mb-1 ml-3">
                                <i class="fa-solid fa-lock"></i> Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                placeholder="Re-enter Password"
                                className={`w-full p-3 border border-black rounded-full focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#003566] to-[#05B9F4] text-white py-2 rounded-full hover:bg-blue-600 transition"
                        >
                            Save Password
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Newpass

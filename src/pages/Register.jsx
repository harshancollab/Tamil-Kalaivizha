import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        schoolName: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.schoolName) {
            newErrors.schoolName = "School name is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert(" Welcome! Please log in to explore");
            navigate("/login");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[850px]">
                {/* Image */}
                <div className="w-1/2 hidden md:block">
                    <img
                        src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
                        alt="Register"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8">


                    <div className="flex items-center bg-gray-100 rounded-full p-1 w-64 mb-5">
                        <button onClick={() => navigate("/login")} className="flex-1 py-2 text-lg font-semibold text-gray-600 rounded-full">
                            Login
                        </button>
                        <button
                            className="flex-1 py-2 text-lg font-semibold text-black bg-yellow-500 rounded-full shadow-md"

                        >
                            Register
                        </button>
                    </div>


                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome to <span className="text-blue-500">Kalaivizha</span>
                    </h2>
                    <p className="text-gray-600 mb-4">Please Register to your account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-blue-700 font-medium mb-1 ml-4">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="schoolName" className="block text-blue-700 ml-4 font-medium mb-1">
                                School Name
                            </label>
                            <input
                                id="schoolName"
                                name="schoolName"
                                type="text"
                                placeholder="Enter School Name"
                                value={formData.schoolName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.schoolName && <p className="text-red-500 text-sm">{errors.schoolName}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="block text-blue-700 font-medium ml-4 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                        >
                            Register to your account
                        </button>
                    </form>


                    <p className="text-gray-600 text-sm mt-3 text-center">
                        Already have an account?{" "}
                        <button className="text-blue-500" onClick={() => navigate("/login")}>
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register

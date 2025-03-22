import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { verifyOtpAPI, resendOtpAPI } from "../services/allAPI" // You'll need to create these API functions

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60); 
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

 
  const email = sessionStorage.getItem("resetEmail");

  useEffect(() => {
  
    if (!email) {
      // navigate("/reset-password");
      return;
    }

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false); 
    }
  }, [timer, email, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      const result = await verifyOtpAPI({ 
        email: email, 
        otp: otpCode 
      });
      
      if (result.status === 200) {
        sessionStorage.setItem("otpVerified", "true");
        navigate("/reset-password");
      } else {
        setError(result.data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    
    try {
      const result = await resendOtpAPI({ email: email });
      
      if (result.status === 200) {
        setTimer(60);
        setIsResendDisabled(true);
        setError("");
        alert("A new OTP has been sent to your email.");
      } else {
        setError(result.data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="w-1/2 hidden md:block">
          <img
            src="https://www.evangelismcoach.org/wp-content/uploads/Church-Hospitality-AuditS_no_text-1024x1024.jpg"
            alt="OTP Verification"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Enter OTP 
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Enter the 4-digit verification code sent to <span className="font-medium">{email}</span>
            </p>
            <div className="flex justify-center gap-3 mt-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center border border-blue-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                />
              ))}
            </div>
            
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <p className="text-center text-gray-600 mt-3">
              Didn't receive a code?{" "}
              <button
                onClick={handleResendOTP}
                disabled={isResendDisabled || isResending}
                className={`text-yellow-500 font-semibold ${
                  isResendDisabled || isResending ? "opacity-50 cursor-not-allowed" : "hover:underline cursor-pointer"
                }`}
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
            </p>
            {isResendDisabled && (
              <p className="text-center text-sm text-gray-500 mt-1">
                Resend available in {timer}s
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-6 py-3 text-white font-semibold bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full hover:opacity-90 transition"
            >
              {isLoading ? "Verifying..." : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification
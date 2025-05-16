// login Page otp 
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtpAPI, resendOtpAPI } from "../services/allAPI";
import Alert from "../components/Alert";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Initialize refs properly
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => hideAlert(), 5000);
  };

  const hideAlert = () => setAlert(prev => ({ ...prev, show: false }));

  const email = sessionStorage.getItem("resetEmail");

  useEffect(() => {
    if (!email) {
      navigate("/reset-password");
      return;
    }
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer, email, navigate]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-advance to next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, move to previous input
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        // If current input has value, just clear it (handled in onChange)
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move left with arrow key
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      // Move right with arrow key
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content contains 6 digits
    const digits = pastedData.match(/\d/g);
    if (digits && digits.length >= 6) {
      // Fill the OTP fields with the first 6 digits
      const newOtp = digits.slice(0, 6);
      setOtp(newOtp);
      
      // Focus the last input after paste
      setTimeout(() => {
        inputRefs.current[5]?.focus();
      }, 0);
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      showAlert("Please enter a valid 6-digit OTP.", "error");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const result = await verifyOtpAPI({ email_address: email, otp: otpCode });
      if (result.status === 200) {
        showAlert("OTP verified successfully!", "success");
        sessionStorage.setItem("otpVerified", "true");
        setTimeout(() => navigate("/new-password"), 1500);
      } else {
        showAlert(result?.response?.data?.message || "Invalid OTP. Please try again.", "error");
      }
    } catch (err) {
      showAlert(err?.response?.data?.message || "Invalid OTP or verification failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const result = await resendOtpAPI({ email_address: email });
      if (result.status === 200) {
        setTimer(60);
        setIsResendDisabled(true);
        setOtp(["", "", "", "", "", ""]);
        showAlert("A new OTP has been sent to your email.", "success");
      } else {
        showAlert(result?.response?.data?.message || "Failed to resend OTP. Please try again.", "error");
      }
    } catch (err) {
      showAlert("Something went wrong. Please try again.", "error");
    } finally {
      setIsResending(false);
    }
  };

  // Use this function to set refs properly
  const setInputRef = (el, index) => {
    inputRefs.current[index] = el;
  };

  // Check if OTP is complete to enable submit button
  const isOtpComplete = otp.every(digit => digit !== "");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 relative">
      {alert.show && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-auto">
          <Alert message={alert.message} type={alert.type} onClose={hideAlert} />
        </div>
      )}
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
              Enter the 6-digit verification code sent to <span className="font-medium">{email}</span>
            </p>
            <div className="flex justify-center gap-3 mt-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => setInputRef(el, index)}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                  inputMode="numeric"
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
              disabled={isLoading || !isOtpComplete}
              className={`w-full mt-6 py-3 text-white font-semibold bg-gradient-to-r from-[#003566] to-[#05B9F4] rounded-full transition ${
                isLoading || !isOtpComplete ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
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


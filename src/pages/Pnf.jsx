import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Pnf = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userRole = localStorage.getItem('role') || 'user';
    
    let redirectPath = '/login'; 
    
    switch (userRole) {
      case 'admin':
        redirectPath = '/admin-panel'
        break
      case 'Schooladmin':
        redirectPath = '/school/dashboard'
        break
      case 'subadmin':
        redirectPath = '/'
        break;
        case 'districtAdmin':
        redirectPath = '/'
        break;
      case 'stateAdmin':
        redirectPath = '/'
        break;
      default:
        redirectPath = '/login'
    }
    
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate(redirectPath);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  const handleRedirect = () => {
    const userRole = localStorage.getItem('role') || 'user';
    
   
    switch (userRole) {
      case 'admin':
        redirectPath = '/admin-panel'
        break
      case 'Schooladmin':
        redirectPath = '/school/dashboard'
        break
      case 'subadmin':
        redirectPath = '/'
        break;
        case 'districtAdmin':
        redirectPath = '/'
        break;
      case 'stateAdmin':
        redirectPath = '/'
        break;
      default:
        redirectPath = '/login'
    }
    
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Page Not Found</p>
        <p className="text-md text-gray-500 mt-2">
          Redirecting to your dashboard in {countdown} seconds...
        </p>
        <button
          onClick={handleRedirect}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go to Dashboard Now
        </button>
      </div>
    </>
  );
};

export default Pnf
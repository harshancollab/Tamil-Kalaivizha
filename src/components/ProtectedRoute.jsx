// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContex';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/not-authorized" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';

const ProtectedRoute = ({ userType }) => {
  const { user } = useAuth();
  
  // If the user is not authenticated, redirect to login
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If userType is provided, check if the user's type is allowed
  if (userType && userType.length > 0) {
    // Check if the current user type is in the allowed userTypes array
    const isAuthorized = userType.includes(user.user_type);
    
    if (!isAuthorized) {
      // If not authorized, redirect to not-authorized page
      return <Navigate to="/not-authorized" replace />;
    }
  }
  
  // If user is authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
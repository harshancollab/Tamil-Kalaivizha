
// import { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Simulating a logged-in school admin user
//   const [user, setUser] = useState({ role: 'admin', isAuthenticated: true });

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Decode JWT token function
const decodeToken = (token) => {
  try {
    // JWT tokens are split into three parts separated by dots
    const payload = token.split('.')[1];
    // The payload is base64 encoded - decode it and parse as JSON
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  // Initialize user state, checking sessionStorage first
  const [user, setUser] = useState(() => {
    try {
      const token = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("users");
      
      if (storedUser && token) {
        const userData = JSON.parse(storedUser);
        return { 
          ...userData, 
          isAuthenticated: true 
        };
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      // Clear potentially corrupted data
      sessionStorage.removeItem("users");
      sessionStorage.removeItem("token");
    }
    
    return { 
      username: '',
      user_type: '',
      isAuthenticated: false 
    };
  });

  // Function to handle logout
  const logout = () => {
    // Clear session storage
    sessionStorage.removeItem("users");
    sessionStorage.removeItem("token");
    
    // Reset user state
    setUser({ 
      username: '',
      user_type: '',
      isAuthenticated: false 
    });
  };

  // Check token validity on initial load
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = sessionStorage.getItem("token");
      
      if (token) {
        try {
          // Optional: You could add a token validation API call here
          // For now, let's validate by checking the expiration in the token
          const decodedToken = decodeToken(token);
          
          if (decodedToken && decodedToken.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
              console.log("Token expired");
              logout();
            }
          }
        } catch (error) {
          console.error("Token validation error:", error);
          logout();
        }
      }
    };
    
    checkTokenValidity();
  }, []);

  // Value object to be provided to consumers
  const authContextValue = {
    user,
    setUser,
    logout,
    isAuthenticated: user.isAuthenticated,
    userType: user.user_type
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
// import React, { createContext, useState, useContext, useEffect } from 'react';

// // Create the context
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Initialize user state, checking sessionStorage first
//   const [user, setUser] = useState(() => {
//     const storedUser = sessionStorage.getItem("admin");
//     const token = sessionStorage.getItem("token");
    
//     if (storedUser && token) {
//       return { ...JSON.parse(storedUser), isAuthenticated: true };
//     }
    
//     return { role: '', isAuthenticated: false };
//   });

//   // Function to handle logout
//   const logout = () => {
//     // Clear session storage
//     sessionStorage.removeItem("admin");
//     sessionStorage.removeItem("token");
    
//     // Reset user state
//     setUser({ role: '', isAuthenticated: false });
//   };

//   // Value object to be provided to consumers
//   const authContextValue = {
//     user,
//     setUser,
//     logout,
//     isAuthenticated: user.isAuthenticated,
//     role: user.role
//   };

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for using the auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




// sub district admin
// It Admin   
// state admin   
//  district admin  






// import { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState({ role: null, isAuthenticated: false });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedRole = localStorage.getItem("isAdmin");
//     if (storedRole) {
//       setUser({ role: storedRole, isAuthenticated: true });
//     }
//     setLoading(false);
//   }, []);

//   const login = (role) => {
//     localStorage.setItem("isAdmin", role);
//     setUser({ role, isAuthenticated: true });
//   };

//   const logout = () => {
//     localStorage.removeItem("isAdmin");
//     setUser({ role: null, isAuthenticated: false });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



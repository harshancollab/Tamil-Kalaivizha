// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Create Auth Context
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Simulate user login (Replace with API call)
//   const login = (userData) => {
//     setUser(userData); 
//     localStorage.setItem('user', JSON.stringify(userData)); // Store user
//   };

//   // Logout Function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   // Load User from Local Storage on Refresh
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to Use Auth Context
// export const useAuth = () => useContext(AuthContext);


// import { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Simulating a logged-in school admin user
//   const [user, setUser] = useState({ role: 'school admin', isAuthenticated: true });

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// sub district admin
// It Admin
// state admin
// district admin
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Simulating a logged-in sub district admin user (for testing)
  const [user, setUser] = useState({ role: 'state admin', isAuthenticated: true });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
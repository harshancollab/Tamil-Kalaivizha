import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Result from './pages/Result';
import Report from './pages/Report';
import AllKalolsavam from './pages/AllKalolsavam';
import EditKalsvmDetails from './pages/EditKalsvmDetails';
import SchoolDetails from './pages/SchoolDetails';
import ParticipateList from './pages/ParticipateList';
import Bgrade from './pages/Bgrade';
import Cgrade from './pages/Cgrade';
import ItemWise from './pages/ItemWise';
import TopSchool from './pages/TopSchool';
import Resetpwd from './pages/Resetpwd';
import Otp from './pages/Otp';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import OTPVerification from './pages/OTPVerification';
import Newpass from './pages/Newpass';
import { AuthProvider } from './contexts/AuthContex';
import ProtectedRoute from './components/ProtectedRoute';
import MultiStep from './components/Multistep';


function App() {
  return (
    <AuthProvider>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Auth />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/reset-password" element={<Newpass />} />
      <Route path="/not-authorized" element={<h1>Not Authorized</h1>} />

      {/* Protected Routes for All Authenticated Users */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'school admin', 'sub district admin']} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />
        <Route path="/form" element={<MultiStep />} />
        <Route path="/resetpwd" element={<Resetpwd />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/conformpwd" element={<ChangePassword />} />
        <Route path="/b-grade-list" element={<Bgrade />} />
        <Route path="/c-grade-list" element={<Cgrade />} />
        <Route path="/report" element={<Report />} />
        <Route path="/item" element={<ItemWise />} />
        <Route path="/top" element={<TopSchool />} />
      </Route>

      {/* Routes ONLY for "school admin" */}
      <Route element={<ProtectedRoute allowedRoles={['school admin']} />}>
        <Route path="/Schooldetails" element={<SchoolDetails />} />
        <Route path="/participatelist" element={<ParticipateList />} />
      </Route>

      {/* Routes ONLY for "sub district admin" */}
      <Route element={<ProtectedRoute allowedRoles={['sub district admin']} />}>
      <Route path="/AllKalolsavam" element={<AllKalolsavam />} />
      <Route path="/edit-kalolsavam/:id" element={<EditKalsvmDetails />} />
      </Route>

      {/* Routes ONLY for "admin" */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin-panel" element={<h1>Admin Panel</h1>} />
      </Route>

     
    </Routes>
  </AuthProvider>
  );
}

export default App;

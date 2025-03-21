
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import OTPVerification from './pages/OTPVerification'
import Newpass from './pages/Newpass'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Result from './pages/Result'
import MultiStep from './components/Multistep'
import Resetpwd from './pages/Resetpwd'
import Otp from './pages/Otp'
import ChangePassword from './pages/ChangePassword'
import Report from './pages/Report'
import Bgrade from './pages/Bgrade'
import Cgrade from './pages/Cgrade'
import ParticipateList from './pages/ParticipateList'
import SchoolDetails from './pages/SchoolDetails'
import ItemWise from './pages/ItemWise'
import TopSchool from './pages/TopSchool'

function App() {

  return (
    <>
    
    <Routes>
    
    <Route path="/login" element={<Auth />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/reset-password" element={<Newpass />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />
        <Route path="/form" element={<MultiStep/>} />
        <Route path="/resetpwd" element={<Resetpwd/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/conformpwd" element={<ChangePassword/>} />
        <Route path="/b-grade-list" element={<Bgrade/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/c-grade-list" element={<Cgrade/>} />
        <Route path="/participatelist" element={<ParticipateList/>} />
        <Route path="/Schooldetails" element={<SchoolDetails/>} />
        <Route path="/item" element={<ItemWise/>} />
        <Route path="/top" element={<TopSchool/>} />







    </Routes>
    </>
  )
}

export default App

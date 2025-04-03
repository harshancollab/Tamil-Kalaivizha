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
import SchlEntry from './pages/SchlEntry';
import ClusterSchls from './pages/ClusterSchls';
import StageDuration from './pages/StageDuration';
import SplEntry from './pages/SplEntry';
import StageDurationList from './pages/StageDurationList';
import DefineStage from './pages/DefineStage';
import AddStage from './pages/AddStage';
import StageItemwise from './pages/StageItemwise';
import StageItemwiseList from './pages/StageItemwiseList';
import EditStageitem from './pages/EditStageitem';
import AddCallsheet from './pages/AddCallsheet';
import Timesheet from './pages/Timesheet';
import AddTimesheet from './pages/AddTimesheet';
import Scoresheet from './pages/Scoresheet';
import AddScoresheet from './pages/AddScoresheet';
import AddTabulationSheet from './pages/AddTabulationSheet';
import Addstgfestival from './pages/Addstgfestival';
import StageFestivalwise from './pages/StageFestivalwise';
import EditFestivalwise from './pages/EditFestivalwise';
import AddStgReport from './pages/AddStgReport';
import EligibleSclList from './pages/EligibleSclList';
import ParticipatingSclList from './pages/ParticipatingSclList';
import SclContactList from './pages/SclContactList';
import FestivalWisepat from './pages/FestivalWisepat';




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
        <Route element={<ProtectedRoute allowedRoles={['school admin', 'sub district admin']} />}>
          <Route path="/Schooldetails" element={<SchoolDetails />} />
          <Route path="/participatelist" element={<ParticipateList />} />
        </Route>

        {/* Routes ONLY for "sub district admin" */}
        <Route element={<ProtectedRoute allowedRoles={['sub district admin']} />}>
          <Route path="/AllKalolsavam" element={<AllKalolsavam />} />
          <Route path="/edit-kalolsavam/:id" element={<EditKalsvmDetails />} />
          <Route path="/schlentry" element={<SchlEntry />} />
          <Route path="/All-schools" element={<ClusterSchls />} />
          <Route path="/Spl-entry" element={<SplEntry />} />
          <Route path="/stage-duration" element={<StageDuration />} />
          <Route path="/stage-duration-list" element={<StageDurationList />} />
          <Route path="/StageList" element={<DefineStage />} />
          <Route path="/AddStage" element={<AddStage />} />
          <Route path="/Stage-itemwise" element={<StageItemwise />} />
          <Route path="/Stage-itemwiseList" element={<StageItemwiseList />} />
          <Route path="/Edit-itemwiseList/:id" element={<EditStageitem />} />
          <Route path="/AddCallsheet" element={<AddCallsheet />} />
          <Route path="/AddTimesheet" element={<AddTimesheet />} />
          <Route path="/AddScoresheet" element={<AddScoresheet />} />
          <Route path="/AddTabulationsheet" element={<AddTabulationSheet />} />
          <Route path="/Addfestivalwise" element={<Addstgfestival />} />
          <Route path="/festivalwiselist" element={<StageFestivalwise />} />
          <Route path="/Edit-festwiseList/:id" element={<EditFestivalwise />} />
          <Route path="/Addreport" element={<AddStgReport />} />
          <Route path="/eligible-schools" element={<EligibleSclList />} />
          <Route path="/Partcipatescllist" element={<ParticipatingSclList />} />
          <Route path="/SclContactList" element={<SclContactList />} />
          <Route path="/festwiseList" element={<FestivalWisepat />} />
         
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

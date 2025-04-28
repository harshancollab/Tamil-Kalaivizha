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
import DateWisePatcipatList from './pages/DateWisePatcipatList';
import ParticipantsCardlist from './pages/ParticipantsCardlist';
import ParticipantsMorethan from './pages/ParticipantsMorethan';
import ClashReportList from './pages/ClashReportList';
import ClusterReport from './pages/ClusterReport';
import StageReport from './pages/StageReport';
import EditStage from './pages/EditStage';
import ResultEntry from './pages/ResultEntry';
import AllResultEtry from './pages/AllResultEtry';
import EditResultentry from './pages/EditResultentry';
import ItemResultList from './pages/ItemResultList';
import PubshRsutlist from './pages/PubshRsutlist';
import ConfidentialResult from './pages/ConfidentialResult';
import ItemWisePoint from './pages/ItemWisePoint';
import SclWisePoint from './pages/SclWisePoint';
import SclGradewise from './pages/SclGradewise';
import Certificateitmwise from './pages/Certificateitmwise';
import CertificateSclwise from './pages/CertificateSclwise';
import CertificateTempt from './pages/CertificateTempt';
import AddcertfitDetail from './pages/AddcertfitDetail';
import CertificateRegno from './pages/CertificateRegno';
import CertificatePartcipate from './pages/CertificatePartcipate';
import Higherlvlcomp from './pages/Higherlvlcomp';
import ExportDatabase from './pages/ExportDatabase';
import Publish from './pages/Publish';
import ItemCodewise from './pages/ItemCodewise';
import AdminUser from './pages/AdminUser';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import CreateKalolsavam from './pages/CreateKalolsavam';
import AddKalolsavam from './pages/AddKalolsavam';
import EditKalosmAdm from './pages/EditKalosmAdm';
import SchoolRegList from './pages/SchoolRegList';
import AddScl from './pages/AddScl';
import EditScl from './pages/EditScl';
import FestivalRegiList from './pages/FestivalRegiList';
import AddFestival from './pages/AddFestival';
import EditFestival from './pages/EditFestival';
import DistrictList from './pages/DistrictList';
import SubDistrictlist from './pages/SubDistrictlist';
import AddDistrict from './pages/AddDistrict';
import AddSubDistrict from './pages/AddSubDistrict';
import ItemRegistrationList from './pages/ItemRegistrationList';
import AddItem from './pages/AddItem';
import SclDisSub from './pages/SclDisSub';
import AddSclsub from './pages/AddSclsub';
import AdResult from './pages/AdResult';
import SubDistrictList from './pages/SubDistrictlist';
import SubDisRegList from './pages/SubDisRegList';
import SchoolList from './pages/SchoolList';
import AddSubdis from './pages/AddSubdis';
import ExportIT from './pages/ExportIT';
import { LogOut } from 'lucide-react';
import LogoOut from './pages/LogoOut';
import EditItem from './pages/EditItem';
import DParticipatingScl from './pages/DParticipatingScl';
import DFestWiseParti from './pages/DFestWiseParti';
import DdateWisepartici from './pages/DdateWisepartici';
import DParticipateCardlist from './pages/DParticipateCardlist';
import StateParticipatesclList from './pages/StateParticipatesclList';
import StateParticipateFesWis from './pages/StateParticipateFesWis';
import StateDatewisepaticipat from './pages/StateDatewisepaticipat';
import StateParticipateCardLis from './pages/StateParticipateCardLis';
import DDefnKalolsavam from './pages/DDefnKalolsavam';
import DEditKalolsavam from './pages/DEditKalolsavam';
import DSclEntry from './pages/DSclEntry';
import DClusterSclList from './pages/DClusterSclList';
import DSplOrderEntry from './pages/DSplOrderEntry';
import DAddStagedurat from './pages/DAddStagedurat';
import DStageDurationList from './pages/DStageDurationList';
import DAddStage from './pages/DAddStage';
import DDefineStageList from './pages/DDefineStageList';
import DEditStage from './pages/DEditStage';
import DStageAllotmtFest from './pages/DStageAllotmtFest';
import DAddStageAllotfest from './pages/DAddStageAllotfest';
import DEditStageAllotFest from './pages/DEditStageAllotFest';
import DStageAllotItem from './pages/DStageAllotItem';
import DClashRep from './pages/DClashRep';
import DparticipateListMorethan from './pages/DparticipateListMorethan';
import DStageReport from './pages/DStageReport';
import DConfidentialResult from './pages/DConfidentialResult';
import DItemwisePoint from './pages/DItemwisePoint';
import DItemCodewise from './pages/DItemCodewise';
import DSclWisePoint from './pages/DSclWisePoint';
import DSclGradeWise from './pages/DSclGradeWise';
import DCertificateItmWise from './pages/DCertificateItmWise';
import DCertificateParti from './pages/DCertificateParti';
import DCertificateScl from './pages/DCertificateScl';
import DCertificateRegno from './pages/DCertificateRegno';
import DCertificatedetails from './pages/DCertificatedetails';
import DHigherlvlComp from './pages/DHigherlvlComp';
import DExport from './pages/DExport';
import DAddresultentry from './pages/DAddresultentry';
import DAllresultentry from './pages/DAllresultentry';





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
          <Route path="/EditStage" element={<EditStage />} />
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
          <Route path="/DateWiseList" element={<DateWisePatcipatList />} />
          <Route path="/ParticipantsCardList" element={<ParticipantsCardlist />} />
          <Route path="/ParticipantsMorethan" element={<ParticipantsMorethan />} />
          <Route path="/ClashReportList" element={<ClashReportList />} />
          <Route path="/ClusterReport" element={<ClusterReport />} />
          <Route path="/StageReport" element={<StageReport />} />
          <Route path="/result-entry" element={<ResultEntry />} />
          <Route path="/All-resultentry" element={<AllResultEtry />} />
          <Route path="/Edit-resultentry/:id" element={<EditResultentry />} />
          <Route path="/Itemresult-list" element={<ItemResultList />} />
          <Route path="/All-Publishresult" element={<PubshRsutlist />} />
          <Route path="/ConfidentialResultlist" element={<ConfidentialResult />} />
          <Route path="/itemwisepoint" element={<ItemWisePoint />} />
          <Route path="/SclWisePoint" element={<SclWisePoint />} />
          <Route path="/Sclgradewise" element={<SclGradewise />} />
          <Route path="/certificate-template" element={<CertificateTempt />} />
          <Route path="/certificate-item-wise" element={<Certificateitmwise />} />
          <Route path="/certificate-school-wise" element={<CertificateSclwise />} />
          <Route path="/Add-certificate" element={<AddcertfitDetail />} />
          <Route path="/CertificateRegno" element={<CertificateRegno />} />
          <Route path="/CertificateParticipate" element={<CertificatePartcipate />} />
          <Route path="/Higherlvlcomp" element={<Higherlvlcomp />} />
          <Route path="/ExportDatabase" element={<ExportDatabase />} />
          <Route path="/itemcodewise" element={<ItemCodewise />} />
          <Route path="/ai" element={<Publish />} />


        </Route> 

        {/* Routes ONLY for "admin" */}
        <Route element={<ProtectedRoute allowedRoles={['It Admin']} />}>
          <Route path="/DistrictList" element={<DistrictList />} />
          <Route path="/AddDistrict" element={<AddDistrict />} />
          <Route path="/SubDistrictlist" element={<SubDistrictlist />} />
          <Route path="/AddSubDistrict" element={<AddSubDistrict />} />
          <Route path="/school-list" element={<SchoolList />} />
          <Route path="/AddSclsub" element={<AddSclsub />} />


          <Route path="/SubDisRegList" element={<SubDisRegList />} />
          <Route path="/AddSubdis" element={<AddSubdis />} />

          <Route path="/SchoolRegList" element={<SchoolRegList />} />
          <Route path="/AddScl" element={<AddScl />} />

          <Route path="/FestivalRegiList" element={<FestivalRegiList />} />
          <Route path="/AddFestival" element={<AddFestival />} />
          <Route path="/EditFestival/:id" element={<EditFestival />} />

          <Route path="/ItemRegistrationList" element={<ItemRegistrationList />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="/EditItem/:id" element={<EditItem />} />

          <Route path="/admin-panel" element={<AdminUser />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/EditUser/:id" element={<EditUser />} />



          <Route path="/CreateKalolsavam" element={<CreateKalolsavam />} />
          <Route path="/AddKalosavam" element={<AddKalolsavam />} />
          <Route path="/EditKalosmAdm/:id" element={<EditKalosmAdm />} />

          {/* dis */}

          <Route path="/EditScl/:id" element={<EditScl />} />

          <Route path="/AddFestival" element={<AddFestival />} />
          <Route path="/EditFestival/:id" element={<EditFestival />} />

          {/* sub reg */}

         
          
          <Route path="/AdResult" element={<AdResult />} />

          <Route path="/SchoolList/:subDistrictId" element={<SclDisSub />} />

          <Route path="/ExportIT" element={<ExportIT />} />
          <Route path="/LogOut" element={<LogoOut />} />
        </Route>

        {/* Routes ONLY for " district admin" */}
        <Route element={<ProtectedRoute allowedRoles={['district admin']} />}>
        <Route path="/DDefnKalolsavam" element={<DDefnKalolsavam />} />
        <Route path="/DEditKalolsavam/:id" element={<DEditKalolsavam />} />
        <Route path="/DSclEntry" element={<DSclEntry />} />
        <Route path="/DClusterSclList" element={<DClusterSclList />} />
        <Route path="/DSplOrderEntry" element={<DSplOrderEntry />} />
        <Route path="/DAddStagedurat" element={<DAddStagedurat />} />
        <Route path="/DStageDurationList" element={<DStageDurationList />} />
        <Route path="/DAddStage" element={<DAddStage />} />
        <Route path="/DDefineStageList" element={<DDefineStageList />} />
        <Route path="/DEditStage" element={<DEditStage />} />
        <Route path="/DStageAllotmtFest" element={<DStageAllotmtFest />} />
        <Route path="/DAddStageAllotfest" element={<DAddStageAllotfest />} />
        <Route path="/DEditStageAllotFest/:id" element={<DEditStageAllotFest />} />
        <Route path="/DStageAllotItem" element={<DStageAllotItem />} />
        <Route path="/DClashRep" element={<DClashRep />} />
        <Route path="/DparticipateListMorethan" element={<DparticipateListMorethan />} />
        <Route path="/DStageReport" element={<DStageReport />} />
        <Route path="/DConfidentialResult" element={<DConfidentialResult />} />
        <Route path="/DItemwisePoint" element={<DItemwisePoint />} />
        <Route path="/DItemCodewise" element={<DItemCodewise />} />
        <Route path="/DSclWisePoint" element={<DSclWisePoint />} />
        <Route path="/DSclGradeWise" element={<DSclGradeWise />} />
        <Route path="/DCertificateItmWise" element={<DCertificateItmWise />} />
        <Route path="/DCertificateParti" element={<DCertificateParti />} />
        <Route path="/DCertificateScl" element={<DCertificateScl />} />
        <Route path="/DCertificateRegno" element={<DCertificateRegno />} />
        <Route path="/DCertificatedetails" element={<DCertificatedetails />} />
        <Route path="/DHigherlvlComp" element={<DHigherlvlComp />} />
        <Route path="/DExport" element={<DExport />} />
        <Route path="/DAllresultentry" element={<DAllresultentry />} />

        <Route path="/DAddresultentry" element={<DAddresultentry />} />


        
        <Route path="/DParticipatingScl" element={<DParticipatingScl />} />
        <Route path="/DFestWiseParti" element={<DFestWiseParti />} />
        <Route path="/DdateWisepartici" element={<DdateWisepartici />} />
        <Route path="/DParticipateCardlist" element={<DParticipateCardlist />} />

        </Route> 
        <Route element={<ProtectedRoute allowedRoles={['state admin']} />}>
        
        
        <Route path="/StateParticipatesclList" element={<StateParticipatesclList />} />
        <Route path="/StateParticipateFesWis" element={<StateParticipateFesWis />} />
        <Route path="/StateDatewisepaticipat" element={<StateDatewisepaticipat />} />
        <Route path="/StateParticipateCardLis" element={<StateParticipateCardLis />} />
        

        </Route> 



      </Routes>
    </AuthProvider>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Signup from './signup/Signup';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrorMessage, resetSuccessMessage } from '../action';
import { Privaterouting } from '../routes/Privaterouting';
import Dashboard from './dashboard/Dashboard';
import { getprofile } from './profile/action';
import ProfileForm from './profile/ProfileForm';
import ProfilePage from './profile/ProfilePage';
import MedicalForm from './profile/MedicalForm';
import Consultaion from './consultation/Consultaion';
import AdminConsultation from './admin_part/consultation/AdminConsultation';
import AdminVaccination from './admin_part/vaccination/AdminVaccination';
// import Patiens from './admin_part/patients/Patiens';
import Vaccination from './vaccination/Vaccination';
import ChangePassword from './changepassword/ChangePassword';
import Enquiry from './admin_part/enquiry/Enquiry';
import Transaction from './admin_part/transactions/Transaction';
import Patients from './admin_part/patients/Patients';
import Certificates from './profile/Certificates';

const toastConfig = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const App = () => {
  const dispatch = useDispatch();

  const { successMessage, errorMessage } = useSelector(
    (state) => state.commonReducer
  );

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getprofile());
    }
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, toastConfig);
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="App">
      <ToastContainer transition={Slide} />
      <Header />
      <Routes>
        <Route path="/login" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <Privaterouting>
              <Dashboard />
            </Privaterouting>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Privaterouting>
              <ProfileForm />
            </Privaterouting>
          }
        />
        <Route
          path="/medicaldetails/"
          element={
            <Privaterouting>
              <MedicalForm />
            </Privaterouting>
          }
        />
        <Route
          path="/medicaldetails/:id"
          element={
            <Privaterouting>
              <MedicalForm />
            </Privaterouting>
          }
        />
        <Route
          path="/consultation"
          element={
            <Privaterouting>
              <Consultaion />
            </Privaterouting>
          }
        />
        <Route
          path="/enquiry"
          element={
            <Privaterouting>
              <Enquiry />
            </Privaterouting>
          }
        />
        <Route
          path="/patient"
          element={
            <Privaterouting>
              <Patients />
            </Privaterouting>
          }
        />
        <Route
          path="/certificate"
          element={
            <Privaterouting>
              <Certificates />
            </Privaterouting>
          }
        />
        <Route
          path="/vaccination"
          element={
            <Privaterouting>
              <Vaccination />
            </Privaterouting>
          }
        />
        <Route
          path="/admin-consultation"
          element={
            <Privaterouting>
              <AdminConsultation />
            </Privaterouting>
          }
        />
        <Route
          path="/transaction"
          element={
            <Privaterouting>
              <Transaction />
            </Privaterouting>
          }
        />
        <Route
          path="/admin-vaccination"
          element={
            <Privaterouting>
              <AdminVaccination />
            </Privaterouting>
          }
        />
        <Route
          path="/change-password"
          element={
            <Privaterouting>
              <ChangePassword />
            </Privaterouting>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

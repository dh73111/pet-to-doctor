import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Box from "@mui/material/Box";
import HospitalReservation from "./components/hospital/HospitalReservation";
import HospitalSearchReservation from "./components/hospital/HospitalSearchReservation";
import HospitalSearch from "./components/hospital/HospitalSearch";
import DoctorReservation from "./components/doctor/DoctorReservation";
import DoctorDianosis from "./components/doctor/DoctorDiagnosis";
import DoctorPrescription from "./components/doctor/DoctorPrescription";
import DoctorPrescriptionForm from "components/doctor/DoctorPrescriptionForm";
import DoctorConsuliting from "components/doctor/DoctorConsuliting";
import DoctorPasswordChange from "./components/doctor/DoctorPasswordChange";
import DoctorMypage from "components/doctor/DoctorMypage";
import Notice from "components/Notice";
import Review from "components/Review";
import Index from "components/Index";
import UserLoginModal from "components/user/UserLoginModal";
import UserJoin from "components/user/UserJoin";
import UserSignupConfirm from "components/user/UserSignupConfirm";
import UserReservationPayment from "components/user/UserReservationPayment";
import UserReservationPaymenting from "components/user/UserReservationPaymenting";
import UserReservationComplete from "components/user/UserReservationComplete";
import UserMypageChange from "components/user/UserMypageChange";
import UserMypage from "components/user/UserMypage";
import UserReservation from "components/user/UserReservation";
import UserConsulting from "components/user/UserConsulting";
import UserMedicinePayment from "components/user/UserMedicinePayment";
import UserRating from "components/user/UserRating";
import Qna from "components/user/Qna";
import ReservationDetail from "components/commons/ReservationDetail";
import PrescriptionDetail from "components/commons/PrescriptionDetail";
function App() {
    const fontTheme = createTheme({
        typography: {
            fontFamily: "noto-sans",
        },
    });
    return (
        <ThemeProvider theme={fontTheme}>
            <Box>
                <div className='App'>
                    <Routes>
                        <Route path='/petodoctor/*' element={<NavBar />}></Route>
                    </Routes>
                    <Routes>
                        <Route path='/petodoctor/' element={<Home />}></Route>
                        <Route path='/' element={<Index />}></Route>
                        <Route path='/petodoctor/kakaooauth*' element={<Home />}></Route>
                    </Routes>
                    <Routes>
                        {/* doctor */}
                        <Route path='/petodoctor/doctorreservation' element={<DoctorReservation />}></Route>
                        <Route path='/petodoctor/doctordiagnosis' element={<DoctorDianosis />}></Route>
                        <Route path='/petodoctor/doctorprescription' element={<DoctorPrescription />}></Route>
                        <Route path='/petodoctor/doctormypage' element={<DoctorMypage />}></Route>
                        <Route path='/doctorprescriptonform' element={<DoctorPrescriptionForm />}></Route>
                        <Route path='/petodoctor/doctorconsulting' element={<DoctorConsuliting />}></Route>

                        {/* user */}
                        <Route path='/petodoctor/notice' element={<Notice />}></Route>
                        <Route path='/petodoctor/login' element={<UserLoginModal />}></Route>
                        <Route path='/petodoctor/hospitalsearch' element={<HospitalSearch />}></Route>
                        <Route path='/petodoctor/hospitalreservation' element={<HospitalReservation />}></Route>
                        <Route
                            path='/petodoctor/hospitalsearchreservation/:hospitalId/:doctorId'
                            element={<HospitalSearchReservation />}></Route>
                        <Route path='/petodoctor/userjoin' element={<UserJoin />}></Route>
                        <Route path='/petodoctor/usersignupconfirm' element={<UserSignupConfirm />}></Route>
                        <Route path='/petodoctor/usermypage' element={<UserMypage />}></Route>
                        <Route path='/petodoctor/usermypage/:userId' element={<UserMypageChange />}></Route>
                        <Route path='/petodoctor/userrating' element={<UserRating />}></Route>
                        <Route path='/petodoctor/userreservation' element={<UserReservation />}></Route>
                        <Route path='/petodoctor/userreservationpayment' element={<UserReservationPayment />}></Route>
                        <Route
                            path='/petodoctor/userreservationpaymenting'
                            element={<UserReservationPaymenting />}></Route>
                        <Route path='/petodoctor/userreservationcomplete' element={<UserReservationComplete />}></Route>
                        <Route path='/petodoctor/presciption/:prescId' element={<PrescriptionDetail />}></Route>
                        <Route path='/petodoctor/reservation/:resId' element={<ReservationDetail />}></Route>
                        <Route path='/petodoctor/usermedipayment' element={<UserMedicinePayment />}></Route>
                        <Route path='/petodoctor/userconsulting/:id' element={<UserConsulting />}></Route>
                        <Route path='/petodoctor/usersignupconfirm/:userid' element={<UserSignupConfirm />}></Route>
                        <Route path='/petodoctor/qna' element={<Qna />}></Route>
                        <Route path='/petodoctor/review' element={<Review />}></Route>
                    </Routes>
                    <Routes>
                        <Route path='/petodoctor/*' element={<Footer />}></Route>
                    </Routes>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default App;

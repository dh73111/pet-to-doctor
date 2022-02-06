import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HospitalReservation from "./components/hospital/HospitalReservation";
import HospitalSearchReservation from "./components/hospital/HospitalSearchReservation";
import HospitalSearch from "./components/hospital/HospitalSearch";
import DoctorReservation from "./components/doctor/DoctorReservation";
import DoctorDianosis from "./components/doctor/DoctorDiagnosis";
import DoctorPerscription from "./components/doctor/DoctorPerscription";
import DoctorPerscriptionForm from "./components/doctor/DoctorPerscriptionForm";
import DoctorPasswordChange from "./components/doctor/DoctorPasswordChange";
import DoctorMypage from "./components/doctor/DoctorMypage";
import Notice from "./components/Notice";

import UserJoin from "./components/user/UserJoin";
// import UserLoginModal from "./components/UserLoginModal";
import UserReservationPayment from "./components/user/UserReservationPayment";
import UserReservationPaymenting from "./components/user/UserReservationPaymenting";
import UserReservationComplete from "./components/user/UserReservationComplete";
import UserMypageChange from "./components/user/UserMypageChange";
import UserMypage from "./components/user/UserMypage";
import UserReservation from "./components/user/UserReservation";
import UserMedicinePayment from "./components/user/UserMedicinePayment";
// import UserReservationPayment from "./components/user/UserReservationPayment";

import Box from "@mui/material/Box";

import { userInfo } from "./api/user.js";

function App() {
    console.log(
        userInfo(1, (data) => {
            console.log(data);
        })
    );
    return (
        <Box sx={{ fontFamily: "noto sans" }}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/*" element={<NavBar />}></Route>
                    </Routes>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/kakaooauth*" element={<Home />}></Route>
                    </Routes>
                    <Routes>
                        {/* doctor */}
                        <Route path="/doctorreservation" element={<DoctorReservation />}></Route>
                        <Route path="/doctordiagnosis" element={<DoctorDianosis />}></Route>
                        <Route path="/doctorperscripton" element={<DoctorPerscription />}></Route>
                        <Route
                            path="/doctorperscriptonform"
                            element={<DoctorPerscriptionForm />}
                        ></Route>
                        <Route path="/DoctorMypage" element={<DoctorMypage></DoctorMypage>}></Route>
                        {/* user */}
                        <Route path="/hospitalsearch" element={<HospitalSearch />}></Route>
                        <Route
                            path="/hospitalreservation"
                            element={<HospitalReservation />}
                        ></Route>
                        <Route
                            path="/hospitalsearchreservation"
                            element={<HospitalSearchReservation />}
                        ></Route>
                        <Route path="/notice" element={<Notice />}></Route>
                        <Route path="/UserJoin" element={<UserJoin />}></Route>
                        <Route path="/UserMypageChange" element={<UserMypageChange />}></Route>
                        <Route path="/usermypage" element={<UserMypage />}></Route>
                        <Route path="/userreservation" element={<UserReservation />}></Route>
                        <Route path="/usermedipayment" element={<UserMedicinePayment />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </Box>
    );
}

export default App;

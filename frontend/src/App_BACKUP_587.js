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
import Notice from "./components/Notice";
<<<<<<< .merge_file_a06012
import UserJoin from "./components/user/UserJoin";
// import UserLoginModal from "./components/UserLoginModal";
import UserReservationPayment from './components/user/UserReservationPayment';
import UserReservationPaymenting from './components/user/UserReservationPaymenting';
import UserReservationComplete from './components/user/UserReservationComplete';
import UserMedicinePayment from "./components/user/UserMedicinePayment";
import UserMypageChange from "./components/user/UserMypageChange";
=======
// import UserReservationPayment from "./components/user/UserReservationPayment";
>>>>>>> .merge_file_a19152

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<NavBar></NavBar>}></Route>
                </Routes>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/kakaooauth*" element={<Home></Home>}></Route>
                </Routes>
                <Routes>
                    {/* doctor */}
                    <Route path="/doctorreservation" element={<DoctorReservation></DoctorReservation>}></Route>
                    <Route path="/doctordiagnosis" element={<DoctorDianosis></DoctorDianosis>}></Route>
                    <Route path="/doctorperscripton" element={<DoctorPerscription></DoctorPerscription>}></Route>
                    {/* user */}
                    <Route path="/hospitalsearch" element={<HospitalSearch></HospitalSearch>}></Route>
                    <Route path="/hospitalreservation" element={<HospitalReservation></HospitalReservation>}></Route>
                    <Route
                        path="/hospitalsearchreservation"
                        element={<HospitalSearchReservation></HospitalSearchReservation>}
                    ></Route>
                    <Route path="/notice" element={<Notice></Notice>}></Route>
                    <Route path="/UserJoin" element={<UserJoin></UserJoin>}></Route>
                    <Route path="/UserMypageChange" element={<UserMypageChange></UserMypageChange>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

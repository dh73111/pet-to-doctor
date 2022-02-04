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
import UserMedicinePayment from "./components/user/UserMedicinePayment";
import UserMypage from "./components/user/UserMypage";
import UserRating from "./components/user/UserRating";
// import UserReservationPayment from "./components/user/UserReservationPayment";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<NavBar />}></Route>
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

                    {/* test */}
                    <Route path="/drugpayment" element={<UserMedicinePayment />}></Route>
                    <Route path="/userating" element={<UserRating />}></Route>
                    <Route path="/mypage" element={<UserMypage />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

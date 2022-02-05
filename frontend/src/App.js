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
import Notice from "./components/Notice";
import UserMypage from "./components/user/UserMypage";
import UserReservation from "./components/user/UserReservation";
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
                    <Route
                        path="/doctorperscriptonform"
                        element={<DoctorPerscriptionForm></DoctorPerscriptionForm>}
                    ></Route>
                    {/* user */}
                    <Route path="/hospitalsearch" element={<HospitalSearch></HospitalSearch>}></Route>
                    <Route path="/hospitalreservation" element={<HospitalReservation></HospitalReservation>}></Route>
                    <Route
                        path="/hospitalsearchreservation"
                        element={<HospitalSearchReservation></HospitalSearchReservation>}
                    ></Route>
                    <Route path="/notice" element={<Notice></Notice>}></Route>
                    <Route path="/usermypage" element={<UserMypage></UserMypage>}></Route>
                    <Route path="/userreservation" element={<UserReservation></UserReservation>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

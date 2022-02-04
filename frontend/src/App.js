import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HospitalReservation from "./components/hospital/HospitalReservation";
import HospitalSearchReservation from "./components/hospital/HospitalSearchReservation";
import HospitalSearch from "./components/hospital/HospitalSearch";
import Notice from "./components/Notice";
import UserJoin from "./components/user/UserJoin";
// import UserLoginModal from "./components/UserLoginModal";
import UserReservationPayment from './components/user/UserReservationPayment';
import UserReservationPaymenting from './components/user/UserReservationPaymenting';
import UserReservationComplete from './components/user/UserReservationComplete';
import UserMedicinePayment from "./components/user/UserMedicinePayment";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                {/* <UserLoginModal /> */}
                <Routes>
                    <Route path="/*" element={<NavBar></NavBar>}></Route>
                </Routes>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                </Routes>
                <Routes>
                    <Route path="/hospitalsearch" element={<HospitalSearch></HospitalSearch>}></Route>
                    <Route path="/hospitalreservation" element={<HospitalReservation></HospitalReservation>}></Route>
                    <Route
                        path="/hospitalsearchreservation"
                        element={<HospitalSearchReservation></HospitalSearchReservation>}
                        ></Route>
                    <Route path="/notice" element={<Notice></Notice>}></Route>
                    <Route path="/UserJoin" element={<UserJoin></UserJoin>}></Route>
                </Routes>
                <Routes>
                    <Route path="/reservpayment" element={<UserReservationPayment />} />
                    <Route path="/reserpaymenting" element={<UserReservationPaymenting />} />
                    <Route path="/reserpaymentcomplete" element={<UserReservationComplete />} />
                </Routes>
                <Routes>
                    <Route path="/medipayment" element={<UserMedicinePayment />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HospitalReservation from "./components/hospital/HospitalReservation";
import HospitalSearchReservation from "./components/hospital/HospitalSearchReservation";
import HospitalSearch from "./components/hospital/HospitalSearch";
import Notice from "./components/Notice";
// import UserLoginModal from "./components/UserLoginModal";
import UserReservationPayment from "./components/user/UserReservationPayment";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <UserReservationPayment />
                {/* <UserLoginModal /> */}
                {/* <Routes>
                    <Route path="/*" element={<NavBar></NavBar>}></Route>
                </Routes>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/kakaooauth*" element={<Home></Home>}></Route>
                </Routes>
                <Routes>
                    <Route path="/hospitalsearch" element={<HospitalSearch></HospitalSearch>}></Route>
                    <Route path="/hospitalreservation" element={<HospitalReservation></HospitalReservation>}></Route>
                    <Route
                        path="/hospitalsearchreservation"
                        element={<HospitalSearchReservation></HospitalSearchReservation>}
                    ></Route>
                    <Route path="/notice" element={<Notice></Notice>}></Route>
                </Routes> */}
            </div>
        </BrowserRouter>
    );
}

export default App;

import "./App.css";
import Container from "@mui/material/Container";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HospitalReservation from "./components/hospital/HospitalReservation";
import HospitalSearch from "./components/hospital/HospitalSearch";
import Notice from "./components/Notice";
// import UserLoginModal from "./components/UserLoginModal";

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
                    <Route path="/notice" element={<Notice></Notice>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

import "./App.css";
import Container from "@mui/material/Container";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HospitalReservation from "./pages/hospital/HospitalReservation";
import HospitalSearch from "./pages/hospital/HospitalSearch";
import Notice from "./pages/Notice";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<NavBar></NavBar>}></Route>
                </Routes>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                </Routes>
                <Container>
                    <Routes>
                        <Route path="/hospitalsearch" element={<HospitalSearch></HospitalSearch>}></Route>
                        <Route
                            path="/hospitalreservation"
                            element={<HospitalReservation></HospitalReservation>}
                        ></Route>
                        <Route path="/notice" element={<Notice></Notice>}></Route>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;

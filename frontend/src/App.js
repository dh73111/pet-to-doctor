import "./App.css";
import NavBar from "./components/NavBar";
import Grid from "@mui/material/Grid";
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
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={12}></Grid>
                    </Grid>
                </div>
                <Routes>
                    <Route path="/" element={<HospitalSearch></HospitalSearch>}></Route>
                    <Route path="/hospitalsearch" element={<HospitalSearch></HospitalSearch>}></Route>
                    <Route path="/hospitalreservation" element={<HospitalReservation></HospitalReservation>}></Route>
                    <Route path="/notice" element={<Notice></Notice>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getHosiptal } from "api/hospital";
import { getDoctorInfo } from "api/doctor";

function HospitalSearchReservation(props) {
    const { kakao } = window;

    const [values, setValues] = useState({
        name: "",
        weight: "",
        specific: "",
        diagonose: "",
        time: "",
        symptom: "",
    });
    const [doctor, setDoctor] = useState({
        id: 0,
        email: "string",
        name: "string",
        role: "string",
        tel: "string",
        joinDate: "2022-02-12T17:11:12.346Z",
        pysicianLicenseNumber: "string",
        specialty: "string",
        price: 0,
        hospitalId: 0,
        profileImgUrl: "string",
    });
    const [hospital, setHospital] = useState({
        id: 0,
        address: {
            city: "string",
            street: "string",
            zipcode: "string",
        },
        tel: "string",
        url: "string",
        operatingTime: "string",
        fullTime: true,
        treatmentSubject: "string",
        description: "string",
        latitude: "string",
        longitude: "string",
        businessNumber: "string",
        dongCode: "string",
    });
    const [leadDoctor, setLeadDoctor] = useState("");
    const [doctorCount, setDoctorCount] = useState("");
    const [date, setDate] = useState(new Date());

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function kakaoMap() {
        const lat = hospital.latitude;
        const lng = hospital.longitude;
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
        };

        let markerPosition = new kakao.maps.LatLng(lat, lng);
        let marker = new kakao.maps.Marker({
            position: markerPosition,
        });
        let map = new kakao.maps.Map(container, options);
        marker.setMap(map);
    }

    function MyButton(props) {
        return (
            <Button
                variant='outlined'
                sx={{ width: "98%", mt: 1, mx: 1 }}
                onClick={() => {
                    console.log(props.time);
                }}>
                {props.time}
            </Button>
        );
    }

    useEffect(() => {
        kakaoMap();
    });
    const params = useParams();
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        const init = async () => {
            const hospital = await getHosiptal(params.hospitalId);
            const doctor = await getDoctorInfo(params.doctorId);

            setHospital(hospital);
            setDoctor(doctor);
            setLeadDoctor(location.leadDoctor.name);
            setDoctorCount(location.doctorList.length);
        };
        init();
    }, []);
    return (
        <Container>
            <Grid container>
                {/* <Grid item xs={2.5}></Grid> */}
                <Grid item xs={12} sx={{ mt: 5 }}>
                    <Paper>
                        <Grid container>
                            <Grid item xs={4}>
                                <img src='./img/resHospital.png' width='300px' height='300px' alt='동물병원사진'></img>
                            </Grid>
                            <Grid item xs={8}>
                                <Box>
                                    <img src='./img/24hours.png' alt='동물병원사진' width='50px'></img>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "25px", fontWeight: "bold", mx: 1 }}>
                                        {hospital.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: "bold", mx: 1, mt: 2 }}>
                                        {hospital.description}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px", mx: 1, mt: 2 }}>
                                        {`${hospital.address.city} ${hospital.address.street} ${hospital.name}`}
                                    </Typography>
                                    <Typography sx={{ fontSize: "16px", mx: 1, mt: 2 }}>
                                        <Box sx={{ fontWeight: "bold" }} component='span'>
                                            TEL
                                        </Box>
                                        <Box sx={{ mx: 3 }} component='span'>
                                            {hospital.tel}
                                        </Box>
                                    </Typography>
                                    <Grid container sx={{ mt: 2.5 }}>
                                        <Grid item xs={2}>
                                            <Box>
                                                <Box sx={{ fontWeight: "bold" }}>진료과목</Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ fontWeight: "bold", mt: 3 }}>영업시간</Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box sx={{ height: "45px" }}>{hospital.treatmentSubject} </Box>
                                            <Box>{hospital.operatingTime}</Box>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Box>
                                                <Box sx={{ fontWeight: "bold" }}>대표 수의사</Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ fontWeight: "bold", mt: 3 }}>수의사 수 </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box sx={{ height: "45px" }}>{leadDoctor}</Box>
                                            <Box>{doctorCount}</Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box>
                            <FormControl>
                                <FormLabel id='demo-row-radio-buttons-group-label'>진료 종료</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                    name='row-radio-buttons-group'
                                    value={values.diagonose}
                                    onChange={handleChange("diagonose")}>
                                    <FormControlLabel value='visit' control={<Radio />} label='방문' />
                                    <FormControlLabel value='video' control={<Radio />} label='화상' />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <div id='map' style={{ width: "100%", height: "300px" }}></div>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item xs={4}>
                                <Box sx={{ fontWeight: "bold", fontSize: 22 }}>선택한 의사 선생님</Box>
                                <Box sx={{ mt: 2 }}>
                                    <img
                                        src='./img/loginDog.jpg'
                                        alt='의사 사진'
                                        style={{ width: "100%", height: "250px" }}></img>
                                </Box>
                            </Grid>
                            <Grid item xs={0.3} />

                            <Grid item xs={7.7} sx={{ mt: 8 }}>
                                <Box sx={{ fontSize: 20, fontWeight: "bold" }}>이름 : 강박사</Box>
                                <Box sx={{ fontSize: 20, fontWeight: "bold" }}>전문 분야 : ~~~~~~</Box>
                                <Box sx={{ fontSize: 20, fontWeight: "bold", mt: 2 }}>
                                    한마디 : 최선을 다하겠습니다.
                                </Box>
                            </Grid>
                        </Grid>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Box sx={{ fontWeight: "bold", mt: 3, fontSize: 22 }}> 기본정보</Box>
                                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                            <InputLabel htmlFor='filled-adornment-name'>이름</InputLabel>
                                            <FilledInput
                                                id='filled-adornment-name'
                                                value={values.name}
                                                onChange={handleChange("name")}
                                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                            <InputLabel htmlFor='filled-adornment-specific'>종</InputLabel>
                                            <FilledInput
                                                id='filled-adornment-specific'
                                                value={values.specific}
                                                onChange={handleChange("specific")}
                                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                            <InputLabel htmlFor='filled-adornment-weight'>몸무게</InputLabel>
                                            <FilledInput
                                                id='filled-adornment-weight'
                                                value={values.weight}
                                                onChange={handleChange("weight")}
                                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4} md={2}>
                                        <Box sx={{ fontWeight: "bold", mt: 3, fontSize: 22, mx: 2 }}> 예약 날짜</Box>
                                        <CalendarPicker
                                            date={date}
                                            onChange={(newDate) => {
                                                setDate(newDate);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ fontWeight: "bold", mt: 3, fontSize: 22 }}>
                            <AccessTimeIcon /> 시간 선택
                        </Box>
                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs={1.5}>
                                <MyButton time='10:00' />
                                <MyButton time='12:55' />
                                <MyButton time='15:50' />
                                <MyButton time='18:45' />
                            </Grid>
                            <Grid item xs={1.5}>
                                <MyButton time='10:25' />
                                <MyButton time='13:20' />
                                <MyButton time='16:15' />
                            </Grid>
                            <Grid item xs={1.5}>
                                <MyButton time='10:50' />
                                <MyButton time='13:45' />
                                <MyButton time='16:40' />
                            </Grid>
                            <Grid item xs={1.5}>
                                <MyButton time='11:15' />
                                <MyButton time='14:10' />
                                <MyButton time='17:05' />
                            </Grid>
                            <Grid item xs={1.5}>
                                <MyButton time='11:40' />
                                <MyButton time='14:35' />
                                <MyButton time='17:30' />
                            </Grid>
                            <Grid item xs={1.5}>
                                <MyButton time='12:05' />
                                <MyButton time='15:00' />
                                <MyButton time='17:55' />
                            </Grid>
                            <Grid item xs={1.5}>
                                <MyButton time='12:30' />
                                <MyButton time='15:25' />
                                <MyButton time='18:20' />
                            </Grid>
                        </Grid>
                        <Box sx={{ fontWeight: "bold", mt: 5, fontSize: 22 }}>
                            특이사항(이전 병력, 증상, 상담을 원하는 이유 작성 부탁드립니다.)
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                id='filled-multiline-static'
                                label='특이사항'
                                multiline
                                rows={4}
                                variant='filled'
                                sx={{ width: "100%" }}
                                value={values.symptom}
                                onChange={handleChange("symptom")}
                            />
                        </Box>
                        <Box sx={{ mx: 130, width: "100px", mt: 3 }}>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    console.log(values, date);
                                }}>
                                예약하기
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                {/* <Grid item xs={2.5}></Grid> */}
            </Grid>
        </Container>
    );
}

export default HospitalSearchReservation;

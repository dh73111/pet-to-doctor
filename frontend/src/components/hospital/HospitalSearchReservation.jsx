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
import { getSchedule, updateSchedule } from "api/schedule";
import { addTreatment } from "api/treatment";
import { useSelector } from "react-redux";
import DatePicker from "@mui/lab/DatePicker";
import { RestaurantRounded } from "@mui/icons-material";
import { petList } from "api/pet";
function HospitalSearchReservation(props) {
    const { kakao } = window;
    const store = useSelector((store) => store);
    const [values, setValues] = useState({
        userId: store.user.id,
        doctorId: 0,
        hospitalId: 0,
        scheduleDate: "",
        type: "RES_REQUEST",
        reVisit: "first",
        petName: "",
        symptom: "",
        birthDate: null,
        petSpecies: "",
        petWeight: "",
        price: "",
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
        leadDoctor: "",
        doctorCount: "",
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
    const [date, setDate] = useState(new Date());
    const [schedule, setSchedule] = useState({ bitmask: "0000000000000000", diff: 0 });
    const handleChange = (prop) => (event) => {
        if (prop === "mode") {
            setMode(event.target.value);
            return;
        }
        if (prop === "selectPet") {
            setPet(event.target.value);
        }
        setValues({ ...values, [prop]: event.target.value });
    };
    const [userPetList, setPetList] = useState([]);
    const [selectPet, setPet] = useState(-1);
    const [selectTime, setSelectTime] = useState(-1);
    const [mode, setMode] = useState("write");
    const reserveTime = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "1:00",
        "1:30",
        "2:00",
        "2:30",
        "3:00",
        "3:30",
        "4:00",
        "4:30",
        "5:00",
        "5:30",
    ];
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
                disabled={props.item === "1"}
                variant='contained'
                color={props.index === selectTime ? "success" : "primary"}
                sx={{ width: "98%", mt: 1, mx: 1 }}
                onClick={() => {
                    setSelectTime(props.index);
                }}>
                {props.time}
            </Button>
        );
    }
    const submitReservation = async () => {
        if (
            (mode === "write" &&
                (values.birthDate == null ||
                    values.petName.trim() === "" ||
                    values.petWeight.trim() === "" ||
                    values.petSpecies.trim() === "" ||
                    values.symptom.trim() === "")) ||
            selectTime === -1 ||
            (mode === "myPet" && selectPet === -1)
        ) {
            alert("입력 항목을 확인해주세요");
            return;
        }
        let time;

        if (selectTime >= 6) {
            time =
                (Number(reserveTime[selectTime].substring(0, 1)) + 12).toString() +
                reserveTime[selectTime].substring(1);
        } else {
            time = reserveTime[selectTime];
        }
        time = date.toISOString().substring(0, 11) + time + date.toISOString().substring(16);
        let sendData;
        if (mode === "write") {
            sendData = { ...values };
            let birthDate = values.birthDate.toISOString().substring(0, 10);
            sendData = {
                ...sendData,
                birthDate: birthDate,
                scheduleDate: time,
                reVisit: values.reVisit === "reVisit" ? true : false,
            };
        } else {
            sendData = { ...values };
            console.log(sendData);
            console.log(userPetList[selectPet]);
            let pet = userPetList[selectPet];
            sendData = {
                ...sendData,
                petName: pet.name,
                petWeight: pet.weight,
                petSpecies: pet.species,
                scheduleDate: time,
                reVisit: values.reVisit === "reVisit" ? true : false,
            };
        }
        // console.log(sendData, "등록"); // 진료 등록용 데이터
        let sendSchedule = schedule.bitmask; //
        console.log(sendData);
        sendSchedule =
            sendSchedule.substring(0, selectTime) + "1" + sendSchedule.substring(selectTime + 1, sendSchedule.length);
        console.log(sendSchedule);
        let sendScheduleData = { doctorId: doctor.id, plusDay: schedule.diff, bitmask: sendSchedule };
        // const data = await updateSchedule(sendScheduleData);
        // console.log(data);
        // const result = await addTreatment(sendData)
        // console.log(result);
    };
    const diffDay = (date) => {
        let now = new Date();
        let start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        let end = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    };

    const refreshSchedule = async (diff) => {
        const schedule = (await getSchedule(params.doctorId, diff)).bitmask;
        setSchedule({ ...schedule, bitmask: schedule, diff: diff });
    };

    useEffect(() => {
        kakaoMap();
    });
    const params = useParams();
    const location = useLocation();
    useEffect(() => {
        const init = async () => {
            const doctor = await getDoctorInfo(params.doctorId);
            const scheduleData = (await getSchedule(params.doctorId, 0)).bitmask;
            setPetList(await petList());
            setValues({ ...values, hospitalId: doctor.hospitalId, doctorId: doctor.id, price: doctor.price });
            setSchedule({ ...schedule, bitmask: scheduleData });
            setHospital(await getHosiptal(params.hospitalId));
            setDoctor({
                ...doctor,
                leadDoctor: location.state.leadDoctor.name,
                doctorCount: location.state.doctorList.length,
            });
        };
        init();
    }, []);
    return (
        <Container>
            <Grid container>
                {/* <Grid item xs={2.5}></Grid> */}
                <Grid item xs={12} sx={{ mt: 5 }}>
                    <Paper elevation={0}>
                        <Grid container>
                            <Grid item xs={4}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/resHospital.png`}
                                    width='300px'
                                    height='300px'
                                    alt='동물병원사진'></img>
                            </Grid>
                            <Grid item xs={8}>
                                <Box>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/24hours.png`}
                                        alt='24시여부'
                                        width='50px'></img>
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
                                            <Box sx={{ height: "45px" }}>{doctor.leadDoctor}</Box>
                                            <Box>{doctor.doctorCount}</Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box>
                            <FormControl>
                                <FormLabel id='demo-row-radio-buttons-group-label'>진료 종류</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                    name='row-radio-buttons-group'
                                    value={values.type}
                                    onChange={handleChange("type")}>
                                    <FormControlLabel value='RES_REQUEST' control={<Radio />} label='방문' />
                                    <FormControlLabel value='VST_REQUEST' control={<Radio />} label='화상' />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel id='demo-row-radio-buttons-group-label'>재진 여부</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                    name='row-radio-buttons-group'
                                    value={values.reVisit}
                                    onChange={handleChange("reVisit")}>
                                    <FormControlLabel value='first' control={<Radio />} label='초진' />
                                    <FormControlLabel value='reVisit' control={<Radio />} label='재진' />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <div id='map' style={{ width: "100%", height: "300px" }}></div>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item xs={4}>
                                <Box sx={{ fontWeight: "bold", fontSize: 22 }}>선택한 의사 선생님</Box>
                                <Box sx={{ mt: 2 }}>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/loginDog.jpg`}
                                        alt='의사 사진'
                                        style={{ width: "100%", height: "250px" }}></img>
                                </Box>
                            </Grid>
                            <Grid item xs={0.3} />

                            <Grid item xs={7.7} sx={{ mt: 8 }}>
                                <Box sx={{ fontSize: 20, fontWeight: "bold" }}>이름 : {doctor.name}</Box>
                                <Box sx={{ fontSize: 20, fontWeight: "bold" }}>전문 분야 : {doctor.specialty}</Box>
                                <Box sx={{ fontSize: 20, fontWeight: "bold", mt: 2 }}>
                                    한마디 : 최선을 다하겠습니다.
                                </Box>
                            </Grid>
                        </Grid>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Box sx={{ fontWeight: "bold", mt: 3, fontSize: 22 }}>
                                            기본정보
                                            <FormControl sx={{ mx: 2 }}>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                                    name='row-radio-buttons-group'
                                                    value={mode}
                                                    onChange={handleChange("mode")}>
                                                    <FormControlLabel
                                                        value='write'
                                                        control={<Radio />}
                                                        label='직접 입력'
                                                    />
                                                    <FormControlLabel
                                                        value='myPet'
                                                        control={<Radio />}
                                                        label='나의 반려동물'
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                        {mode === "write" ? (
                                            <Grid container>
                                                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                                    <TextField
                                                        id='outlined-basic'
                                                        label='이름'
                                                        variant='outlined'
                                                        value={values.petName}
                                                        onChange={handleChange("petName")}
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                                    <TextField
                                                        id='outlined-basic'
                                                        label='종'
                                                        variant='outlined'
                                                        value={values.petSpecies}
                                                        onChange={handleChange("petSpecies")}
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                                    <TextField
                                                        id='outlined-basic'
                                                        label='체중'
                                                        variant='outlined'
                                                        value={values.petWeight}
                                                        onChange={handleChange("petWeight")}
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth sx={{ m: 1 }}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            label='생년월일'
                                                            value={values.birthDate}
                                                            onChange={(newValue) => {
                                                                setValues({ ...values, birthDate: newValue });
                                                            }}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>{" "}
                                            </Grid>
                                        ) : (
                                            <Box sx={{ mt: 2 }}>
                                                <FormControl sx={{ mx: 2 }}>
                                                    <RadioGroup
                                                        aria-labelledby='demo-row-radio-buttons-group-label'
                                                        name='row-radio-buttons-group'
                                                        value={selectPet}
                                                        onChange={handleChange("selectPet")}>
                                                        {userPetList.length === 0
                                                            ? ""
                                                            : userPetList.map((item, index) => (
                                                                  <FormControlLabel
                                                                      key={index}
                                                                      value={index}
                                                                      control={<Radio />}
                                                                      label={item.name}
                                                                  />
                                                              ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                        )}
                                        {/* <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                            <TextField
                                                id='outlined-basic'
                                                label='이름'
                                                variant='outlined'
                                                value={values.petName}
                                                onChange={handleChange("petName")}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                            <TextField
                                                id='outlined-basic'
                                                label='종'
                                                variant='outlined'
                                                value={values.petSpecies}
                                                onChange={handleChange("petSpecies")}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                            <TextField
                                                id='outlined-basic'
                                                label='체중'
                                                variant='outlined'
                                                value={values.petWeight}
                                                onChange={handleChange("petWeight")}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label='생년월일'
                                                    value={values.birthDate}
                                                    onChange={(newValue) => {
                                                        setValues({ ...values, birthDate: newValue });
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </FormControl> */}
                                    </Grid>

                                    <Grid item xs={4} md={2}>
                                        <Box sx={{ fontWeight: "bold", mt: 3, fontSize: 22, mx: 2 }}> 예약 날짜</Box>
                                        <CalendarPicker
                                            date={date}
                                            onChange={(newDate) => {
                                                const dayDiff = diffDay(newDate);
                                                setSelectTime(-1);
                                                setDate(newDate);
                                                refreshSchedule(dayDiff);
                                            }}
                                            shouldDisableDate={(date) => {
                                                const dayDiff = diffDay(date);
                                                return dayDiff < 0 || dayDiff > 15;
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
                            {[...schedule.bitmask].map((item, index) => (
                                <Grid item xs={3} key={index}>
                                    <MyButton time={reserveTime[index]} item={item} index={index} />
                                </Grid>
                            ))}
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
                                type='submit'
                                onClick={() => {
                                    submitReservation();
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

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
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
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

function HospitalSearchReservation(props) {
    const { kakao } = window;

    const [values, setValues] = React.useState({
        name: "",
        weight: "",
        specific: "",
        old: "",
    });
    const [date, setDate] = React.useState(new Date());

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function kakaoMap(lat, lng) {
        lat = 33.450701;
        lng = 126.570667;
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
        };

        new kakao.maps.Map(container, options);
    }

    function MyButton(props) {
        return (
            <Button
                variant="outlined"
                sx={{ width: "98%", mt: 1, mx: 1 }}
                onClick={() => {
                    console.log(props.time);
                }}
            >
                {props.time}
            </Button>
        );
    }

    useEffect(() => {
        kakaoMap();
    });
    return (
        <Grid container>
            <Grid item xs={2.5}></Grid>
            <Grid item xs={7} sx={{ mt: 5 }}>
                <Paper>
                    <Grid container>
                        <Grid item xs={4}>
                            <img src="./img/resHospital.png" width="300px" height="300px" alt="동물병원사진"></img>
                        </Grid>
                        <Grid item xs={8}>
                            <Box>
                                <img src="./img/24hours.png" alt="동물병원사진" width="50px"></img>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: "25px", fontWeight: "bold", mx: 1 }}>
                                    24시 소래동물병원
                                </Typography>
                                <Typography sx={{ fontSize: "12px", fontWeight: "bold", mx: 1, mt: 2 }}>
                                    조금 더 특별한 24시 ~~~~~~~~~~~~~~~~~~~~~~~~~~
                                </Typography>
                                <Typography sx={{ fontSize: "14px", mx: 1, mt: 2 }}>
                                    인천광역시 남동구 논현동 751-1 에코메트로3차 더타워상가 C동 1층 24시 소래동물병원
                                </Typography>
                                <Typography sx={{ fontSize: "16px", mx: 1, mt: 2 }}>
                                    <Box sx={{ fontWeight: "bold" }} component="span">
                                        TEL
                                    </Box>
                                    <Box sx={{ mx: 3 }} component="span">
                                        010-0000-000
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
                                        <Box sx={{ height: "45px" }}>드래거, 마취기 ,고난이도 수술, </Box>
                                        <Box>00:00 ~ 24:00</Box>
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
                                        <Box sx={{ height: "45px" }}>ㅁㅁㅁ, ㅁㅁㅁ ,ㅁㅁㅁ</Box>
                                        <Box>17</Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <div id="map" style={{ width: "100%", height: "300px" }}></div>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item xs={4}>
                            <Box sx={{ fontWeight: "bold", fontSize: 22 }}>선택한 의사 선생님</Box>
                            <Box sx={{ mt: 2 }}>
                                <img
                                    src="./img/loginDog.jpg"
                                    alt="의사 사진"
                                    style={{ width: "100%", height: "250px" }}
                                ></img>
                            </Box>
                        </Grid>
                        <Grid item xs={0.3} />

                        <Grid item xs={7.7} sx={{ mt: 8 }}>
                            <Box sx={{ fontSize: 20, fontWeight: "bold" }}>이름 : 강박사</Box>
                            <Box sx={{ fontSize: 20, fontWeight: "bold" }}>전문 분야 : ~~~~~~</Box>
                            <Box sx={{ fontSize: 20, fontWeight: "bold", mt: 2 }}>한마디 : 최선을 다하겠습니다.</Box>
                        </Grid>
                    </Grid>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Box sx={{ fontWeight: "bold", mt: 3, fontSize: 22 }}> 기본정보</Box>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-name">이름</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-name"
                                            value={values.amount}
                                            onChange={handleChange("name")}
                                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-specific">종</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-specific"
                                            value={values.specific}
                                            onChange={handleChange("specific")}
                                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-weight">몸무게</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-weight"
                                            value={values.weight}
                                            onChange={handleChange("weight")}
                                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4} md={2}>
                                    <Box sx={{ fontWeight: "bold", mt: 3, fontSize: 22, mx: 2 }}> 예약 날짜</Box>
                                    <CalendarPicker
                                        date={date}
                                        onChange={(newDate) => {
                                            setDate(newDate);
                                            console.log(newDate);
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
                            <MyButton time="10:00" />
                            <MyButton time="12:55" />
                            <MyButton time="15:50" />
                            <MyButton time="18:45" />
                        </Grid>
                        <Grid item xs={1.5}>
                            <MyButton time="10:25" />
                            <MyButton time="13:20" />
                            <MyButton time="16:15" />
                        </Grid>
                        <Grid item xs={1.5}>
                            <MyButton time="10:50" />
                            <MyButton time="13:45" />
                            <MyButton time="16:40" />
                        </Grid>
                        <Grid item xs={1.5}>
                            <MyButton time="11:15" />
                            <MyButton time="14:10" />
                            <MyButton time="17:05" />
                        </Grid>
                        <Grid item xs={1.5}>
                            <MyButton time="11:40" />
                            <MyButton time="14:35" />
                            <MyButton time="17:30" />
                        </Grid>
                        <Grid item xs={1.5}>
                            <MyButton time="12:05" />
                            <MyButton time="15:00" />
                            <MyButton time="17:55" />
                        </Grid>
                        <Grid item xs={1.5}>
                            <MyButton time="12:30" />
                            <MyButton time="15:25" />
                            <MyButton time="18:20" />
                        </Grid>
                    </Grid>
                    <Box sx={{ fontWeight: "bold", mt: 5, fontSize: 22 }}>
                        특이사항(이전 병력, 증상, 상담을 원하는 이유 작성 부탁드립니다.)
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            id="filled-multiline-static"
                            label="특이사항"
                            multiline
                            rows={4}
                            variant="filled"
                            sx={{ width: "100%" }}
                        />
                    </Box>
                    <Box sx={{ mx: 130, width: "100px", mt: 3 }}>
                        <Button variant="contained" onClick={() => {}}>
                            예약하기
                        </Button>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={2.5}></Grid>
        </Grid>
    );
}

export default HospitalSearchReservation;

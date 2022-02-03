import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";
import PhoneIcon from "@mui/icons-material/Phone";
/* global kakao */
function HospitalSearch(props) {
    const { kakao } = window;
    const [mode, setMode] = useState("list");
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(event, newValue);
        setValue(newValue);
    };
    function kakaoMap(lat, lng, mode) {
        lat = 33.450701;
        lng = 126.570667;
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
        };

        new kakao.maps.Map(container, options);
    }

    function detailHospital(id) {
        setMode("search");
        console.log(mode);
    }
    function LinkTab(props) {
        return (
            <Tab
                component="a"
                onClick={(event) => {
                    event.preventDefault();
                }}
                {...props}
            />
        );
    }

    function TabItems() {
        if (value === 0) {
            return (
                <Box>
                    <Box sx={{ fontSize: 14, fontWeight: "bold" }}>
                        <Grid container sx={{ margin: 2, mt: 4, maxWidth: "360px" }}>
                            <Grid item xs={0.3}></Grid>
                            <Grid item xs={1}>
                                <PlaceIcon sx={{ height: "25px" }}></PlaceIcon>
                            </Grid>
                            <Grid item xs={10.4}>
                                인천광역시 남동구 논현동 751-1 에코매트로 3차 더타워상가 c동 1층 24시 소래동물병원
                            </Grid>
                            <Grid item xs={0.3}></Grid>

                            <Grid item xs={0.3} sx={{ mt: 2 }}></Grid>
                            <Grid item xs={1} sx={{ mt: 2 }}>
                                <AccessTimeIcon sx={{ height: "20px" }}></AccessTimeIcon>
                            </Grid>
                            <Grid item xs={10.4} sx={{ mt: 2 }}>
                                매일 00:00 ~ 24:00
                            </Grid>

                            <Grid item xs={0.3} sx={{ mt: 1 }}></Grid>
                            <Grid item xs={0.3} sx={{ mt: 2 }}></Grid>
                            <Grid item xs={1} sx={{ mt: 2 }}>
                                <HomeIcon sx={{ height: "20px" }}></HomeIcon>
                            </Grid>
                            <Grid item xs={10.4} sx={{ mt: 2 }}>
                                <Link
                                    herf="#"
                                    onClick={() => {
                                        console.log("클릭");
                                    }}
                                >
                                    http://petToDoctor.com
                                </Link>
                            </Grid>

                            <Grid item xs={0.3} sx={{ mt: 2 }}></Grid>
                            <Grid item xs={0.3} sx={{ mt: 2 }}></Grid>
                            <Grid item xs={1} sx={{ mt: 2 }}>
                                <PhoneIcon sx={{ height: "20px" }}></PhoneIcon>
                            </Grid>
                            <Grid item xs={10.4} sx={{ mt: 2 }}>
                                02-1234-5678
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 5, mx: 3 }}>
                        <Grid container sx={{ color: "#309FB3", fontWeight: "bold", fontSize: "14px" }}>
                            <Grid item xs={4}>
                                진료과목
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black" }}>
                                드래거 마취기 고난이도 수술 및 CT, MRI 검사, 분과진료
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1 }}>
                                대표 수의사
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black", mt: 1 }}>
                                김싸피, 박삼성, 이전자, 나에스원, 에스파, 오마걸, 어쩌고, 저꼬고 , 김김김, 이이이,
                                박박박, 나나나, 제갈공명, 광개토대왕, 조건, 태연
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1 }}>
                                수의사 수
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black", mt: 1 }}>
                                17
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mt: 6, mx: 2, fontWeight: "bold", fontSize: "15px" }}>
                        <Grid container>
                            <Grid item sx={{ color: "black", fontWeight: "bold", fontSize: "16px" }} xs={2.5}>
                                수의사 수
                            </Grid>
                            <Grid xs={0.3}></Grid>
                            <Grid item sx={{ color: "#309FB3", fontWeight: "bold", fontSize: "12px" }} xs={9.2}>
                                17
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            );
        } else {
            return (
                <Box>
                    <Grid container>
                        <Grid item xs={3}>
                            <img src="./img/loginDog.jpg" alt="의사사진" width="150px" height="150"></img>
                        </Grid>
                        <Grid item xs={9}></Grid>
                    </Grid>
                </Box>
            );
        }
    }

    useEffect(() => {
        kakaoMap();
    });
    return (
        <Grid container>
            <Grid item xs={2.5}>
                <Box
                    sx={{
                        my: 2,
                        mx: 3,
                    }}
                >
                    <TextField
                        sx={{ width: "100%", color: "#29A1B1" }}
                        id="hospitalSearch"
                        name="hospitalSearch"
                        placeholder="병원, 지역 검색"
                        focused
                    />
                </Box>
                <Paper style={{ maxHeight: 800, overflow: "auto" }}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                component="div"
                                onClick={() => {
                                    detailHospital(1);
                                }}
                            >
                                로이병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 1.5 }} color="text.secondary">
                                영업시간 00:00 ~ 24:00
                            </Typography>
                            <Typography variant="body2">
                                인천광역시 남동구 논현동 751-1 에코메트로3차 더타워상가 C동 1층 24시 소래동물병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 0, fontSize: 14 }}>별점 : 리뷰</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                로이병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 1.5 }} color="text.secondary">
                                영업시간 00:00 ~ 24:00
                            </Typography>
                            <Typography variant="body2">
                                인천광역시 남동구 논현동 751-1 에코메트로3차 더타워상가 C동 1층 24시 소래동물병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 0, fontSize: 14 }}>별점 : 리뷰</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                로이병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 1.5 }} color="text.secondary">
                                영업시간 00:00 ~ 24:00
                            </Typography>
                            <Typography variant="body2">
                                인천광역시 남동구 논현동 751-1 에코메트로3차 더타워상가 C동 1층 24시 소래동물병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 0, fontSize: 14 }}>별점 : 리뷰</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                로이병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 1.5 }} color="text.secondary">
                                영업시간 00:00 ~ 24:00
                            </Typography>
                            <Typography variant="body2">
                                인천광역시 남동구 논현동 751-1 에코메트로3차 더타워상가 C동 1층 24시 소래동물병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 0, fontSize: 14 }}>별점 : 리뷰</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                로이병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 1.5 }} color="text.secondary">
                                영업시간 00:00 ~ 24:00
                            </Typography>
                            <Typography variant="body2">
                                인천광역시 남동구 논현동 751-1 에코메트로3차 더타워상가 C동 1층 24시 소래동물병원
                            </Typography>
                            <Typography sx={{ mt: 0.8, mb: 0, fontSize: 14 }}>별점 : 리뷰</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            <Grid item xs={9.5}>
                {mode === "list" ? (
                    // 리스트 페이지
                    <div id="map" style={{ width: "100%", height: "890px" }}></div>
                ) : (
                    // 상세 보기 페이지
                    <Grid container>
                        <Grid item xs={3.3}>
                            <Paper style={{ maxHeight: 890, overflow: "auto" }}>
                                <img
                                    src="./img/hospital.png"
                                    style={{ height: "200px", width: "100%" }}
                                    alt="병원 이미지"
                                ></img>
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                                    <img src="./img/24시병원.png" alt="24시여부"></img>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ mt: 2, fontSize: 25, fontWeight: "bold" }}
                                >
                                    로이병원
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ mt: 1, fontSize: 15, fontWeight: "bold" }}
                                >
                                    ★ 4.79 리뷰 259
                                </Box>
                                <Box sx={{ mt: 2, fontSize: 15, fontWeight: "bold" }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                                        <LinkTab label="정보" href="/drafts" sx={{ mx: 1, width: "120px" }} />
                                        <LinkTab label="예약하기" href="/trash" sx={{ mx: 1, width: "120px" }} />
                                        <LinkTab label="리뷰" href="/spam" sx={{ mx: 1, width: "120px" }} />
                                    </Tabs>
                                </Box>
                                <TabItems></TabItems>
                            </Paper>
                        </Grid>
                        <Grid item xs={8.7}>
                            <div id="map" style={{ width: "100%", height: "890px" }}></div>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default HospitalSearch;

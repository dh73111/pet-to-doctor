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
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { listHospital, listDong } from "../../api/hospital.js";
/* global kakao */

function HospitalSearch(props) {
    const { kakao } = window;
    const [mode, setMode] = useState("list");
    const [isSearch, setSearch] = useState(false);
    const [doneSearch, setDoneSearch] = useState(true);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(event, newValue);
        setValue(newValue);
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

    function detailHospital(id) {
        setMode("search");
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
            // 정보
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
                                    onClick={() => {
                                        console.log("클릭");
                                        window.location.href = "https://www.naver.com/";
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
                            <Grid item xs={0.3}></Grid>
                            <Grid item sx={{ color: "#309FB3", fontWeight: "bold", fontSize: "12px" }} xs={9.2}>
                                17
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            );
        } else if (value === 1) {
            // 예약하기
            return (
                <Box>
                    <Grid container>
                        <Grid item xs={4.3}>
                            <img src="img/loginDog.jpg" alt="의사사진" width="150px" height="150"></img>
                        </Grid>
                        <Grid item xs={7.7} sx={{ mt: 2 }}>
                            <Box>
                                <Box component="span" sx={{ mx: 2, fontWeight: "bold" }}>
                                    김덕배
                                </Box>
                                <Box component="span" sx={{ mx: 0.1, fontSize: 12, fontWeight: "bold", color: "gray" }}>
                                    수의사
                                </Box>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Grid container>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3} sx={{ fontWeight: "bold", fontSize: 10 }}>
                                        전문
                                    </Grid>
                                    <Grid item xs={8} sx={{ fontSize: 12, fontWeight: "bold" }}>
                                        행동교정, 피부 , 산소특화진료, 중증질병, 심장특화진료
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid container>
                                    <Grid item xs={7.5}></Grid>
                                    <Grid item xs={4.5}>
                                        <Button variant="contained" sx={{ mt: 3 }}>
                                            <NavLink
                                                to={"/hospitalsearchreservation"}
                                                style={{ textDecoration: "none" }}
                                            >
                                                예약하기
                                            </NavLink>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            );
        } else {
            // 리뷰
            return (
                <Box>
                    <Box>
                        <Grid container sx={{ mt: 0.7 }}>
                            <Grid item xs={1.2} sx={{ mx: 0.4, fontWeight: "bold" }}>
                                전체
                            </Grid>
                            <Grid item xs={1.8} sx={{ fontSize: 13, mt: 0.15, fontWeight: "bold" }}>
                                142
                            </Grid>
                            <Grid item xs={4.5} sx={{ color: "#FC4C4E", fontSize: 25 }}></Grid>
                            <Grid item xs={0.8} sx={{ color: "#FC4C4E", fontSize: 25 }}>
                                ★
                            </Grid>
                            <Grid item xs={1.5} sx={{ color: "#FC4C4E", fontSize: 25 }}>
                                4.79
                            </Grid>
                            <Grid item xs={0.5} sx={{ color: "gray", fontSize: 25 }}>
                                /
                            </Grid>
                            <Grid item xs={0.5} sx={{ color: "gray", fontSize: 25 }}>
                                5.0
                            </Grid>
                        </Grid>
                    </Box>
                    <UserReview></UserReview>
                </Box>
            );
        }
    }
    function UserReview() {
        return (
            <Box>
                <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={2} sx={{ fontWeight: "bold" }}>
                        <img src="/img/user.png" alt="user"></img>
                    </Grid>
                    <Grid item xs={1.7} sx={{ fontSize: 14, mt: 0.15, fontWeight: "bold" }}>
                        닉네임닉네임
                    </Grid>
                    <Grid item xs={3} sx={{ color: "gray", fontSize: 10 }}>
                        22.01.28 진료
                    </Grid>
                    <Grid item xs={1.3}></Grid>
                    <Grid item xs={3} sx={{ color: "#29A1B1", fontSize: 25 }}>
                        ★★★★☆
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2, fontSize: 13 }}>
                    리뷰 작성 리뷰 작성 리뷰 작성 리뷰 작성 리뷰 작성 리뷰 작성리뷰 작성리뷰 작성리뷰 작성
                </Box>
            </Box>
        );
    }

    function Hosiptal(props) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={() => {
                            detailHospital(1);
                        }}
                    >
                        {props.name}
                    </Typography>
                    <Typography sx={{ mt: 0.8, mb: 1.5 }} color="text.secondary">
                        영업시간 {props.time}
                    </Typography>
                    <Typography variant="body2">{props.location}</Typography>
                    <Grid container>
                        <Grid Item xs={0.7}>
                            <StarIcon sx={{ fontSize: 18, mt: 0.35, color: "#29A1B1" }} />
                        </Grid>
                        <Grid Item xs={1.5} sx={{ fontSize: 14, mt: 0.2, color: "#29A1B1" }}>
                            {props.rating}
                        </Grid>
                        <Grid Item xs={2.3} sx={{ fontSize: 12, mt: 0.4, color: "gray" }}>
                            리뷰 : {props.review}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    function HospitalDetail(props) {
        return (
            <Grid container>
                <Grid item xs={3.3}>
                    <Box
                        sx={{ position: "absolute", left: "780px", top: "50%" }}
                        onClick={() => {
                            setMode("list");
                        }}
                    >
                        <ChevronLeftIcon sx={{ fontSize: 40 }}></ChevronLeftIcon>
                    </Box>

                    <Paper style={{ maxHeight: 890, overflow: "auto" }} elevation={0}>
                        <img
                            src="./img/hospital.png"
                            style={{ height: "200px", width: "100%" }}
                            alt="병원 이미지"
                        ></img>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                            <img src="./img/24hospital.png" alt="24시여부"></img>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 2, fontSize: 25, fontWeight: "bold" }}
                        >
                            {props.name}
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 1, fontSize: 15, fontWeight: "bold" }}
                        >
                            <Grid container>
                                <Grid item xs={4} />
                                <Grid item xs={2} sx={{ color: "#29A1B1" }}>
                                    ★ {props.rating}
                                </Grid>
                                <Grid item xs={3} sx={{ fontSize: 12, mt: 0.3, color: "gray" }}>
                                    리뷰 : {props.review}
                                </Grid>
                            </Grid>
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
        );
    }

    const [name, setName] = useState("");
    const onHandleChange = (e) => {
        setName(e.target.value);
        console.log(name);
    };
    const [hospitalList, setHospitalList] = useState([]);

    const searchHospitalList = async (name) => {
        await listHospital(name, ({ data }) => {
            console.log(data);
            let list = data.data;
            listDong(name, ({ data }) => {
                setHospitalList(list.concat(data.data));
            });
        });
    };

    useEffect(() => {
        kakaoMap();
    });
    return (
        <Grid container>
            <Grid item xs={12} md={2.5}>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="동,병원 이름검색"
                        variant="outlined"
                        value={name}
                        onChange={onHandleChange}
                        sx={{ width: 250, mx: 0.3 }}
                    />
                    <Button
                        variant="contained"
                        sx={{ mx: 2.5, width: 100, height: 55 }}
                        onClick={() => {
                            searchHospitalList(name);
                        }}
                    >
                        검색
                    </Button>
                </Box>
                {isSearch === true ? <></> : ""}
                {doneSearch === true ? (
                    <Paper style={{ maxHeight: 800, overflow: "auto" }}>
                        {hospitalList.map((hospital) => {
                            <Hosiptal hospital={hospital}></Hosiptal>;
                        })}
                    </Paper>
                ) : (
                    ""
                )}
            </Grid>
            <Grid item xs={12} md={9.5}>
                {mode === "list" ? (
                    // 리스트 페이지
                    <Box id="map" style={{ width: "100%", height: "890px" }}></Box>
                ) : (
                    // 상세 보기 페이지

                    <HospitalDetail
                        name="로이병원"
                        time="00:00 ~ 24:00"
                        location="인천광역시 남동구 논현동 751-1 에코메트로3차 더타워상가 C동 1층 24시 소래동물병원"
                        rating="4.79"
                        review="253"
                        url="http://petToDoctor.com"
                        phone_num="02-1234-5678"
                        subject="드래거 마취기 고난이도 수술 및 CT, MRI 검사, 분과진료"
                        doctors="김싸피, 박삼성, 이전자, 나에스원, 에스파, 오마걸, 어쩌고, 저꼬고 , 김김김, 이이이,
                        박박박, 나나나, 제갈공명, 광개토대왕, 조건, 태연"
                        doctors_num="17"
                    ></HospitalDetail>
                )}
            </Grid>
        </Grid>
    );
}

export default HospitalSearch;

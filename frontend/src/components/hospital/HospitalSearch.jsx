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
import { listNameHospital, listDongCodeHospital, listDongHospital } from "api/hospital.js";
import { hospitalReviews } from "../../api/review.js";
import { apiInstance } from "api/index.js";
import { CoPresent } from "@mui/icons-material";
function HospitalSearch(props) {
    const api = apiInstance();
    const { kakao } = window;
    const [mode, setMode] = useState("list");
    const [doneSearch, setDoneSearch] = useState(false);
    const [value, setValue] = useState(0);
    const [hosipitalNo, setHosipitalNo] = useState(0);
    const handleChange = (event, newValue) => {
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
        setHosipitalNo(id);
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

    function TabItems(props) {
        const hospital = props.hospital;
        console.log(hospital);
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
                                {`${hospital.address.city}  ${hospital.address.street}`}
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
                                        window.location.href = "https://www.naver.com/";
                                    }}
                                >
                                    {hospital.url ? hospital.url : "홈페이지 없음"}
                                </Link>
                            </Grid>

                            <Grid item xs={0.3} sx={{ mt: 2 }}></Grid>
                            <Grid item xs={0.3} sx={{ mt: 2 }}></Grid>
                            <Grid item xs={1} sx={{ mt: 2 }}>
                                <PhoneIcon sx={{ height: "20px" }}></PhoneIcon>
                            </Grid>
                            <Grid item xs={10.4} sx={{ mt: 2 }}>
                                {hospital.tel}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 5, mx: 3 }}>
                        <Grid container sx={{ color: "#309FB3", fontWeight: "bold", fontSize: "14px" }}>
                            <Grid item xs={4}>
                                진료과목
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black" }}>
                                {hospital.treatmentSubject}
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1 }}>
                                대표 수의사
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black", mt: 1 }}>
                                의사 테이블에서 가져와야함
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1 }}>
                                수의사 수
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black", mt: 1 }}>
                                의사 테이블에서 가져와야함 length 처리
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
                                의사 테이블에서 가져와야함 length 처리
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

    function Hospital(props) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={() => {
                            detailHospital(props.index);
                        }}
                    >
                        {props.hospital.name}
                    </Typography>
                    <Typography sx={{ mt: 0.8, mb: 1.5 }} color="text.secondary">
                        영업시간 {props.hospital.operatingTime}
                    </Typography>
                    <Typography variant="body2">{props.hospital.address.street}</Typography>
                    <Grid container>
                        <Grid item xs={0.7}>
                            <StarIcon sx={{ fontSize: 18, mt: 0.35, color: "#29A1B1" }} />
                        </Grid>
                        <Grid item xs={1.5} sx={{ fontSize: 14, mt: 0.2, color: "#29A1B1" }}>
                            X
                        </Grid>
                        <Grid item xs={2.3} sx={{ fontSize: 12, mt: 0.4, color: "gray" }}>
                            리뷰 : {props.review.length}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    function HospitalDetail(props) {
        const hospital = props.hospital;
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
                        <img src="/img/hospital.png" style={{ height: "200px", width: "100%" }} alt="병원 이미지"></img>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                            <img src="/img/24hospital.png" alt="24시여부"></img>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 2, fontSize: 25, fontWeight: "bold" }}
                        >
                            {hospital.name}
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
                                    ★ {hospital.rating}
                                </Grid>
                                <Grid item xs={3} sx={{ fontSize: 12, mt: 0.3, color: "gray" }}>
                                    리뷰 : {hospital.review}
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
                        <TabItems hospital={hospital}></TabItems>
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
    };
    // const searchHospitalList = (name) => {
    //     console.log(name);
    //     let promise = new Promise((resolve) => {
    //         let list;
    //         listHospital(name, ({ data }) => {
    //             list = data.data;
    //             listDongNameHospital(name, ({ data }) => {
    //                 list = list.concat(data.data);
    //                 list = list.filter((hosiptal, index, arr) => {
    //                     return arr.findIndex((item) => item.id === hosiptal.id) === index;
    //                 });
    //                 console.log(list, "second api");
    //                 resolve(list); // 처음 api 갔다와서 resolve 로 list를 넘김
    //             });
    //         });
    //     });

    //     listHospital(name);
    //     promise.then((list) => {
    //         let cnt = 1;
    //         list.forEach((hospital, index) => {
    //             let tempList = [];
    //             hospitalReviews(hospital.id, ({ data }) => {
    //                 tempList.push(data.data);
    //                 console.log(data.data);
    //                 if (cnt++ === list.length) {
    //                     console.log(data.data);
    //                     setReviewList(tempList);
    //                     setHospitalList(list);
    //                     setDoneSearch(true);
    //                     console.log(list);
    //                     console.log(tempList);
    //                 }
    //             });
    //         });
    //     });
    // };
    const [hospitalList, setHospitalList] = useState([]);

    const searchHospitalList = async (name) => {
        const tempHospitalList = await listNameHospital(name);
        const hospitalDongList = await listDongHospital(name);
        let list = [...tempHospitalList, ...hospitalDongList];
        console.log(hospitalDongList, "Dong API");
        console.log(tempHospitalList, "Name API");
        list = list.filter((hosiptal, index, arr) => {
            return arr.findIndex((item) => item.id === hosiptal.id) === index;
        });
        let tempList = [];
        console.log(list, "hospital list");
        for (let i = 0; i < list.length; i++) {
            const { id } = list[i];
            const data = await hospitalReviews(id);
            tempList.push({ reviewList: data, hospital: list[i] });
        }
        setHospitalList(tempList);
        console.log(tempList, "review List");
    };
    console.log(hospitalList, " state hospitalList");
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

                <Paper style={{ maxHeight: 800, overflow: "auto" }}>
                    {hospitalList.map((item, index) => (
                        <Hospital
                            key={index}
                            hospital={item.hospital}
                            index={index}
                            review={item.reviewList}
                        ></Hospital>
                    ))}
                </Paper>
            </Grid>
            <Grid item xs={12} md={9.5}>
                {mode === "list" ? (
                    // 리스트 페이지
                    <Box id="map" style={{ width: "100%", height: "890px" }}></Box>
                ) : (
                    // 상세 보기 페이지

                    <HospitalDetail key={hosipitalNo} hospital={hospitalList[hosipitalNo]}></HospitalDetail>
                )}
            </Grid>
        </Grid>
    );
}

export default HospitalSearch;

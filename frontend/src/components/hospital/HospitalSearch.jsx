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
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { listNameHospital, listDongHospital } from "api/hospital.js";
import { getDoctorInfoFromHospital } from "api/doctor.js";
import { hospitalReviews } from "../../api/review.js";
function HospitalSearch(props) {
    const { kakao } = window;
    const [mode, setMode] = useState("list");
    const [doneSearch, setDoneSearch] = useState(false);
    const [value, setValue] = useState(0);
    const [hospitalNo, setHospitalNo] = useState(0);
    const [lat, setLat] = useState(33.450701);
    const [lng, setLng] = useState(126.570667);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function kakaoMap() {
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

    function markerPosition(lat, lng) {
        setLat(lat);
        setLng(lng);
    }

    function detailHospital(id) {
        setMode("search");
        setHospitalNo(id);
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
        const hospital = { ...props.hospital };
        const review = [...props.review];
        let rating = 0;
        for (let itme of review) {
            rating += itme.rate;
        }
        rating /= review.length;
        const [doctor, setDoctor] = useState({
            leadDoctor: {},
            doctorList: [],
        });
        useEffect(() => {
            const init = async () => {
                const data = await getDoctorInfoFromHospital(hospital.id);
                setDoctor({ leadDoctor: { ...data[0] }, doctorList: data });
            };
            init();
        }, []);
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
                                운영 시간 : {hospital.operatingTime}
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
                                대표 수의사 :
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black", mt: 1 }}>
                                {doctor.leadDoctor.name}
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1 }}>
                                수의사 수
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black", mt: 1 }}>
                                {doctor.doctorList.length}
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
                                {doctor.doctorList.length}
                            </Grid>
                            <Grid container sx={{ mt: 1 }}>
                                {doctor.doctorList.map((item, index) => (
                                    <Grid item md={6} key={index}>
                                        <Grid item md={1.5}></Grid>
                                        <Grid item md={10}>
                                            <Box>
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/img/loginDog.jpg`}
                                                    alt="의사사진"
                                                    width="100%"
                                                    height="150"
                                                ></img>
                                            </Box>
                                            <Box>{item.name}</Box>
                                        </Grid>
                                        <Grid item md={0.5}></Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            );
        } else if (value === 1) {
            // 예약하기
            return (
                <Box>
                    {doctor.doctorList.map((item, index) => (
                        <Grid container>
                            <Grid item xs={4.3}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/loginDog.jpg`}
                                    alt="의사사진"
                                    width="150px"
                                    height="150"
                                ></img>
                            </Grid>
                            <Grid item xs={7.7} sx={{ mt: 2 }}>
                                <Box>
                                    <Box component="span" sx={{ mx: 2, fontWeight: "bold" }}>
                                        {item.name}
                                    </Box>
                                    <Box
                                        component="span"
                                        sx={{ mx: 0.1, fontSize: 12, fontWeight: "bold", color: "gray" }}
                                    >
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
                                            {item.specialty}
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box>
                                    <Grid container>
                                        <Grid item xs={7.5}></Grid>
                                        <Grid item xs={4.5}>
                                            <Button variant="contained" sx={{ mt: 3 }}>
                                                <NavLink
                                                    to={`${process.env.PUBLIC_URL}/hospitalsearchreservation/${hospital.id}/${item.id}`}
                                                    style={{ textDecoration: "none", color: "white" }}
                                                >
                                                    예약하기
                                                </NavLink>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    ))}
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
                                {review.length}
                            </Grid>
                            <Grid item xs={4.5} sx={{ color: "#FC4C4E", fontSize: 25 }}></Grid>
                            <Grid item xs={0.8} sx={{ color: "#FC4C4E", fontSize: 25 }}>
                                ★
                            </Grid>
                            <Grid item xs={1.5} sx={{ color: "#FC4C4E", fontSize: 25 }}>
                                {isNaN(rating) ? `0.00` : rating.toFixed(2)}
                            </Grid>
                            <Grid item xs={0.5} sx={{ color: "gray", fontSize: 25 }}>
                                /
                            </Grid>
                            <Grid item xs={0.5} sx={{ color: "gray", fontSize: 25 }}>
                                5.0
                            </Grid>
                        </Grid>
                    </Box>
                    <UserReview review={review} />
                </Box>
            );
        }
    }
    function UserReview(props) {
        let reviews = [...props.review];
        console.log(reviews);
        return (
            <Box>
                {reviews.map((item, index) => (
                    <Grid container sx={{ mt: 2.5 }}>
                        <Grid container>
                            <Grid item xs={2} sx={{ fontWeight: "bold" }}>
                                <img src={`${process.env.PUBLIC_URL}/img/user.png`} alt="user"></img>
                            </Grid>
                            <Grid item xs={1.7} sx={{ fontSize: 14, mt: 0.15, fontWeight: "bold" }}>
                                {item.username}
                            </Grid>
                            <Grid item xs={3} sx={{ color: "gray", fontSize: 10 }}>
                                {item.createTime.substr(0, 10)} 진료
                            </Grid>
                            <Grid item xs={1.3}></Grid>
                            <Grid item xs={3} sx={{ color: "#29A1B1", fontSize: 25 }}>
                                {"★".repeat(item.rate)}
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2, fontSize: 15 }}>{item.content}</Box>
                    </Grid>
                ))}
            </Box>
        );
    }

    function Hospital(props) {
        console.log(props.markerPosition);
        const hospital = { ...props.hospital };
        const address = { ...props.hospital.address };
        let rating = 0;
        // console.log(hospital);
        for (let review of props.reviewList) {
            rating += review.rate;
        }
        rating /= props.reviewList.length;
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={() => {
                            detailHospital(props.index);
                            props.markerPosition(hospital.latitude, hospital.longitude);
                        }}
                    >
                        {hospital.name}
                    </Typography>
                    <Typography sx={{ mt: 0.8, mb: 1.5 }} color="text.secondary">
                        영업시간 {hospital.operatingTime}
                    </Typography>
                    <Typography variant="body2">{address.street}</Typography>
                    <Grid container>
                        <Grid item xs={0.7}>
                            <StarIcon sx={{ fontSize: 18, mt: 0.35, color: "#29A1B1" }} />
                        </Grid>
                        <Grid item xs={1.5} sx={{ fontSize: 14, mt: 0.2, color: "#29A1B1" }}>
                            {isNaN(rating) ? "0" : rating.toFixed(2)}
                        </Grid>
                        <Grid item xs={2.3} sx={{ fontSize: 12, mt: 0.4, color: "gray" }}>
                            리뷰 : {props.reviewList.length}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    function HospitalDetail(props) {
        const hospital = { ...props.hospital };
        const reviewList = [...props.reviewList];
        let rating = 0;
        for (let review of props.reviewList) {
            rating += review.rate;
        }
        rating /= reviewList.length;
        return (
            <Grid container>
                <Grid item xs={3.3}>
                    <Box
                        sx={{ position: "absolute", left: "780px", top: "50%" }}
                        onClick={() => {
                            setMode("list");
                        }}
                    >
                        <ArrowCircleLeftIcon sx={{ fontSize: 40 }} />
                    </Box>

                    <Paper style={{ maxHeight: 890, overflow: "auto" }} elevation={0}>
                        <img
                            src={`${process.env.PUBLIC_URL}/img/hospital.png`}
                            style={{ height: "200px", width: "100%" }}
                            alt="병원 이미지"
                        ></img>

                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                            {hospital.fullTime ? (
                                <img src={`${process.env.PUBLIC_URL}/img/24hospital.png`} alt="24시여부"></img>
                            ) : (
                                <Box>24 안열어</Box>
                            )}
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
                                    ★ {isNaN(rating) ? "0" : rating.toFixed(2)}
                                </Grid>
                                <Grid item xs={3} sx={{ fontSize: 12, mt: 0.3, color: "gray" }}>
                                    리뷰 : {reviewList.length}
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
                        <TabItems key={hospital.id} hospital={hospital} review={reviewList}></TabItems>
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
    const [hospitalList, setHospitalList] = useState([]);

    const searchHospitalList = async (name) => {
        const tempHospitalList = await listNameHospital(name);
        const hospitalDongList = await listDongHospital(name);
        let list = [...tempHospitalList, ...hospitalDongList];
        list = list.filter((hosiptal, index, arr) => {
            return arr.findIndex((item) => item.id === hosiptal.id) === index;
        });
        let tempList = [];
        if (list.length === 0) {
            setMode("list");
            setHospitalList([]);
            return;
        }
        for (let i = 0; i < list.length; i++) {
            const { id } = list[i];
            const data = await hospitalReviews(id);
            tempList.push({ reviewList: data, hospital: list[i] });
        }
        setHospitalList(tempList);
    };
    useEffect(() => {
        kakaoMap(lat, lng);
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
                <Paper style={{ maxHeight: 820, overflow: "auto", WebkitScrollSnapType: "none" }}>
                    {hospitalList.map((item, index) => (
                        <Hospital
                            key={index}
                            hospital={item.hospital}
                            index={index}
                            reviewList={item.reviewList}
                            markerPosition={markerPosition}
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

                    <HospitalDetail
                        key={hospitalNo}
                        hospital={hospitalList[hospitalNo].hospital}
                        reviewList={hospitalList[hospitalNo].reviewList}
                    ></HospitalDetail>
                )}
            </Grid>
        </Grid>
    );
}

export default HospitalSearch;

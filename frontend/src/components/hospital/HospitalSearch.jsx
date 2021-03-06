import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { listNameHospital, listDongHospital } from "api/hospital.js";
import { getDoctorInfoFromHospital } from "api/doctor.js";
import { hospitalReviews } from "../../api/review.js";
import { CircularProgress, createTheme, ThemeProvider, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch } from "react-redux";
import { userFavMark, addFavMark, deleteHospitalFavMark } from "api/mark";

const buttons = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#309FB3",
        },
        secondary: {
            main: "#1dc6f6",
        },
    },
});

function HospitalSearch(props) {
    const { kakao } = window;
    const isLogin = useSelector((store) => store.isLogin);
    const [mode, setMode] = useState("list");
    const [value, setValue] = useState(0);
    const [hospitalNo, setHospitalNo] = useState(0);
    const [lat, setLat] = useState(33.450701);
    const [lng, setLng] = useState(126.570667);
    const [alertOpen, setAlertOpen] = useState(false);

    const { search } = useSelector((store) => store);
    const dispatch = useDispatch();
    const handleClick = () => {
        setAlertOpen(false);
    };
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
        console.log(lat, lng);
    }

    function detailHospital(id) {
        setMode("search");
        setHospitalNo(id);
    }
    function LinkTab(props) {
        return (
            <Tab
                component='a'
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
            // ??????
            return (
                <Box>
                    <Box xs={12} sx={{ fontSize: 16 }}>
                        <Grid container sx={{ py: 5, px: 3, maxWidth: "360px" }}>
                            <Grid item xs={1}>
                                <PlaceIcon sx={{ height: "25px", color: "#44576C" }}></PlaceIcon>
                            </Grid>
                            <Grid item xs={10.4} sx={{ color: "#44576C", lineHeight: "25px" }}>
                                {`${hospital.address.city}  ${hospital.address.street}`}
                            </Grid>
                            <Grid item xs={1} sx={{ mt: 2 }}>
                                <AccessTimeIcon sx={{ height: "20px", color: "#44576C" }}></AccessTimeIcon>
                            </Grid>
                            <Grid item xs={10.4} sx={{ mt: 2, color: "#44576C", lineHeight: "25px" }}>
                                ?????? ?????? : {hospital.operatingTime}
                            </Grid>
                            <Grid item xs={1} sx={{ mt: 2 }}>
                                <HomeIcon sx={{ height: "20px", color: "#44576C" }}></HomeIcon>
                            </Grid>
                            <Grid item xs={10.4} sx={{ mt: 2, color: "#44576C", lineHeight: "25px" }}>
                                <Link
                                    onClick={() => {
                                        window.location.href = hospital.url;
                                    }}>
                                    {hospital.url ? hospital.url : "???????????? ??????"}
                                </Link>
                            </Grid>
                            <Grid item xs={1} sx={{ mt: 2 }}>
                                <PhoneIcon sx={{ height: "20px", color: "#44576C" }}></PhoneIcon>
                            </Grid>
                            <Grid item xs={10.4} sx={{ mt: 2, color: "#44576C", lineHeight: "25px" }}>
                                {hospital.tel}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ py: 5, px: 3, borderTop: "1px solid #D7E2EB", borderBottom: "1px solid #D7E2EB" }}>
                        <Grid container sx={{ color: "#309FB3", fontSize: "16px" }}>
                            <Grid item xs={4}>
                                ????????????
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black" }}>
                                {hospital.treatmentSubject}
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1 }}>
                                ?????? ?????????
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black", mt: 1 }}>
                                {doctor.leadDoctor.name}
                            </Grid>
                            <Grid item xs={4} sx={{ mt: 1 }}>
                                ????????? ???
                            </Grid>
                            <Grid item xs={8} sx={{ color: "black", mt: 1 }}>
                                {doctor.doctorList.length}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box
                        sx={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            px: 3,
                            pt: 2,
                            // borderTop: "1px solid #D7E2EB",
                            borderBottom: "1px solid #D7E2EB",
                        }}>
                        <Grid container>
                            <Grid item sx={{ color: "black", fontWeight: "bold", fontSize: "18px", pb: 1 }} xs={2.5}>
                                ????????? ???
                            </Grid>
                            <Grid
                                item
                                sx={{ color: "#309FB3", fontWeight: "bold", fontSize: "16px", lineHeight: "18px" }}
                                xs={9.2}>
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
                                                    alt='????????????'
                                                    width='100%'
                                                    height='150'></img>
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
            // ????????????
            return (
                <Box sx={{ mt: 1 }}>
                    {doctor.doctorList.map((item, index) => (
                        <Grid key={index} container sx={{ p: 2 }}>
                            <Grid item xs={5}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/loginDog.jpg`}
                                    alt='????????????'
                                    width='150px'
                                    height='150'></img>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <Typography sx={{ fontSize: "16px", fontWeight: "bold", pl: 1 }}>
                                    {item.name === null ? "?????????" : item.name}
                                </Typography>
                                <Typography sx={{ pl: 1 }}>
                                    {item.specialty === null ? "??????" : item.specialty + " ??????"}
                                </Typography>
                                <Box sx={{ float: "right", mr: 2 }}>
                                    <Button
                                        variant='contained'
                                        sx={{ mt: 3, color: "white", fontWeight: 0, backgroundColor: "#309FB3" }}>
                                        <NavLink
                                            to={`${process.env.PUBLIC_URL}/hospitalsearchreservation/${hospital.id}/${item.id}`}
                                            state={doctor}
                                            style={{
                                                textDecoration: "none",
                                                color: "white",
                                            }}
                                            onClick={(e) => {
                                                if (!isLogin) {
                                                    e.preventDefault();
                                                    setAlertOpen(true);
                                                }
                                            }}>
                                            ????????????
                                        </NavLink>
                                    </Button>
                                </Box>
                            </Grid>
                            <Snackbar
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                open={alertOpen}
                                onClose={handleClick}
                                autoHideDuration={2000}
                                // key={vertical + horizontal}
                            >
                                <Alert onClose={handleClick} severity='warning' sx={{ width: "100%" }}>
                                    ????????? ??? ??????????????????
                                </Alert>
                            </Snackbar>
                            <div className='devider' style={{ marginTop: "20px" }}></div>
                        </Grid>
                    ))}
                </Box>
            );
        } else {
            // ??????
            return (
                <Box sx={{ backgroundColor: "white" }}>
                    <Box>
                        <Grid
                            container
                            sx={{
                                pt: 1,
                                px: 3,
                                mt: 0.7,
                                pb: 1.4,
                                borderBottom: "1px solid #D7E2EB",
                                position: "sticky",
                                top: "0",
                            }}>
                            <Grid item xs={6} sx={{ fontWeight: "bold" }}>
                                ?????? {review.length}
                            </Grid>
                            <Grid item xs={6} sx={{ color: "#FC4C4E", fontSize: 18, textAlign: "right" }}>
                                ??? {isNaN(rating) ? `0.00` : rating.toFixed(2)}{" "}
                                <span style={{ color: "gray", fontSize: 16 }}>/ 5.0</span>
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
        return (
            <Box>
                {reviews.length !== 0 ? (
                    <>
                        {reviews.map((item, index) => (
                            <Grid container sx={{ p: 3, pr: 1, borderBottom: "1px solid #D7E2EB" }}>
                                <Grid container>
                                    <Grid item xs={2} sx={{ fontWeight: "bold" }}>
                                        <img src={`${process.env.PUBLIC_URL}/img/user.png`} alt='user'></img>
                                    </Grid>
                                    <Grid item xs={6} sx={{ fontSize: 16, mt: 0.15, fontWeight: "bold" }}>
                                        {item.username}
                                        <Typography sx={{ fontSize: 12 }}>
                                            {item.createTime.substr(0, 10)} ??????
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ color: "#29A1B1", fontSize: 18, pl: 2 }}>
                                        {"???".repeat(item.rate)}
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 1, mb: 2, fontSize: 15 }}>{item.content}</Box>
                            </Grid>
                        ))}
                    </>
                ) : (
                    <Box sx={{ mt: 4, fontSize: "14px", textAlign: "center", color: "#98A8B9" }}>
                        ????????? ????????? ????????????.
                    </Box>
                )}
            </Box>
        );
    }

    function Hospital(props) {
        const hospital = { ...props.hospital };
        const address = { ...props.hospital.address };
        let rating = 0;
        // console.log(hospital);
        for (let review of props.reviewList) {
            rating += review.rate;
        }
        rating /= props.reviewList.length;
        return (
            <Box sx={{ minWidth: "275px", backgroundColor: "white", borderBottom: "1px solid #D7E2EB" }}>
                <Box sx={{ p: 2 }}>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ fontSize: "18px", fontWeight: "700", cursor: "pointer" }}
                        onClick={() => {
                            console.log("??????");
                            console.log("??????");
                            detailHospital(props.index);
                            props.markerPosition(hospital.latitude, hospital.longitude);
                        }}>
                        {hospital.name}
                    </Typography>
                    <Typography sx={{ fontSize: "15px", mb: 0.3 }} color='text.secondary'>
                        ???????????? {hospital.operatingTime}
                    </Typography>
                    <Typography variant='body2'>{address.street}</Typography>
                    <Grid container>
                        <Grid item xs={0.7}>
                            <StarIcon sx={{ fontSize: 18, mt: 0.35, color: "#29A1B1" }} />
                        </Grid>
                        <Grid item xs={1.5} sx={{ fontSize: 14, mt: 0.2, color: "#29A1B1" }}>
                            {isNaN(rating) ? "0" : rating.toFixed(2)}
                        </Grid>
                        <Grid item xs={2.3} sx={{ fontSize: 14, mt: 0.4, color: "gray" }}>
                            ?????? : {props.reviewList.length}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    }

    function HospitalDetail(props) {
        const hospital = { ...props.hospital };
        const reviewList = [...props.reviewList];
        const [isMark, setMark] = useState(false);
        const { id } = useSelector((store) => store.user);
        const [markId, setMarkId] = useState(hospital.id);
        let rating = 0;
        for (let review of props.reviewList) {
            rating += review.rate;
        }
        rating /= reviewList.length;
        useEffect(() => {
            const init = async () => {
                const res = await userFavMark(id);
                console.log(res, " ??????");
                for (let item of res) {
                    if (item.hospital_id === hospital.id) {
                        setMarkId(hospital.id);
                        setMark(true);
                        return;
                    }
                }
                setMark(false);
            };
            init();
        }, []);
        return (
            <Grid container>
                <Grid item xs={3.3} sx={{ position: "relative" }}>
                    <Box
                        sx={{
                            position: "absolute",
                            right: "-20px",
                            top: "50%",
                            backgroundColor: "white",
                            zIndex: 999,
                            width: "40px",
                            height: "50px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setMode("list");
                        }}>
                        <ArrowBackIosIcon sx={{ mt: 1.5, ml: 2, color: "#D7E2EB" }} />
                    </Box>

                    <Box style={{ maxHeight: 890, overflow: "auto" }} elevation={0}>
                        <img
                            src={`${process.env.PUBLIC_URL}/img/hospital.png`}
                            style={{ height: "200px", width: "100%" }}
                            alt='?????? ?????????'></img>

                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            sx={{ mt: 1, position: "relative" }}>
                            {hospital.fullTime ? (
                                // <img src={`${process.env.PUBLIC_URL}/img/24hospital.png`} alt='24?????????'></img>
                                <Box
                                    sx={{
                                        width: "73px",
                                        height: "24px",
                                        borderRadius: "24px",
                                        backgroundColor: "#309fb3",
                                        color: "white",
                                        fontSize: "12px",
                                        textAlign: "center",
                                        fontWeight: 0,
                                        lineHeight: "24px",
                                    }}>
                                    24??? ??????
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        width: "73px",
                                        height: "24px",
                                        borderRadius: "24px",
                                        backgroundColor: "#D7E2EB",
                                        color: "white",
                                        fontSize: "12px",
                                        textAlign: "center",
                                        fontWeight: 0,
                                        lineHeight: "24px",
                                    }}>
                                    24??? ??????
                                </Box>
                            )}
                            <Tooltip title='????????????' arrow>
                                {isMark ? (
                                    <BookmarkIcon
                                        sx={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            top: "-200px",
                                            right: "10px",
                                            color: "#1dc6f6",
                                            fontSize: "30px",
                                            zIndex: 1,
                                        }}
                                        onClick={async () => {
                                            await deleteHospitalFavMark(markId);
                                            setMark(false);
                                        }}
                                    />
                                ) : (
                                    <BookmarkIcon
                                        sx={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            top: "-200px",
                                            right: "10px",
                                            color: "#D7E2EB",
                                            fontSize: "30px",
                                            zIndex: 1,
                                        }}
                                        onClick={async () => {
                                            await addFavMark(markId);
                                            setMark(true);
                                        }}
                                    />
                                )}
                            </Tooltip>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            sx={{ mt: 2, fontSize: 25, fontWeight: "bold" }}>
                            {hospital.name}
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center' sx={{ mt: 1 }}>
                            <Typography
                                sx={{ color: "#29A1B1", fontSize: 15, mr: 1.5, lineHeight: "16px", fontWeight: "700" }}>
                                ??? {isNaN(rating) ? "0" : rating.toFixed(2)}
                            </Typography>
                            <Typography sx={{ fontSize: 15, mt: 0.3, color: "gray", lineHeight: "16px" }}>
                                ?????? {reviewList.length}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                mt: 3,
                                fontSize: 15,
                                // borderBottom: "1px solid #D7E2EB",
                                borderTop: "1px solid #D7E2EB",
                            }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label='nav tabs example'
                                sx={{ width: "100%" }}>
                                <LinkTab
                                    label='??????'
                                    href='/drafts'
                                    sx={{ width: "33.33%", borderBottom: "1px solid #D7E2EB" }}
                                />
                                <LinkTab
                                    label='????????????'
                                    href='/trash'
                                    sx={{ width: "33.33%", borderBottom: "1px solid #D7E2EB" }}
                                />
                                <LinkTab
                                    label='??????'
                                    href='/spam'
                                    sx={{ width: "33.33%", borderBottom: "1px solid #D7E2EB" }}
                                />
                            </Tabs>
                        </Box>
                        <TabItems key={hospital.id} hospital={hospital} review={reviewList}></TabItems>
                    </Box>
                </Grid>
                <Grid item xs={8.7}>
                    <div id='map' style={{ width: "100%", height: "890px" }}></div>
                </Grid>
            </Grid>
        );
    }

    const [name, setName] = useState("");
    const [onLoad, setOnLoad] = useState(false);
    const onHandleChange = (e) => {
        setMode("list");
        setName(e.target.value);
    };
    const [hospitalList, setHospitalList] = useState([]);

    const searchHospitalList = async (name) => {
        name = name.trim();
        if (name === "") {
            alert("?????? ????????? ??????????????????");
            return;
        }
        const tempHospitalList = await listNameHospital(name.trim());
        const hospitalDongList = await listDongHospital(name);
        let list = [...tempHospitalList, ...hospitalDongList];
        list = list.filter((hosiptal, index, arr) => {
            return arr.findIndex((item) => item.id === hosiptal.id) === index;
        });
        let tempList = [];
        if (list.length === 0) {
            setMode("list");
            setHospitalList([]);
            setOnLoad(false);
            return;
        }
        for (let i = 0; i < list.length; i++) {
            const { id } = list[i];
            const data = await hospitalReviews(id);
            tempList.push({ reviewList: data, hospital: list[i] });
        }
        setHospitalList(tempList);
        setOnLoad(false);
    };

    useEffect(() => {
        kakaoMap(lat, lng);
    });

    useEffect(() => {
        if (search !== "") {
            setName(search);
            searchHospitalList(search);
            dispatch({ type: "search", value: "" });
        }
    }, []);

    return (
        <ThemeProvider theme={buttons}>
            <Grid container sx={{ overflow: "hidden" }}>
                <Grid item xs={12} md={2.5} sx={{ zIndex: 1 }}>
                    <Box sx={{ backgroundColor: "#309FB3", fontSize: 15, color: "white", textAlign: "center" }}>
                        ?????? ????????? ????????? ????????? ????????????.
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <TextField
                            id='outlined-basic'
                            label='???,?????? ????????????'
                            variant='outlined'
                            value={name}
                            onChange={onHandleChange}
                            sx={{ ml: 3 }}
                            size='small'
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    if (name.trim() !== "") setOnLoad(true);
                                    searchHospitalList(name);
                                }
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{ mx: 1, backgroundColor: "#309FB3" }}
                            onClick={() => {
                                if (name.trim() !== "") setOnLoad(true);
                                searchHospitalList(name);
                            }}>
                            ??????
                        </Button>
                    </Box>
                    {onLoad ? (
                        <CircularProgress sx={{ position: "absolute", top: "540px", left: "180px" }} />
                    ) : (
                        <Box
                            style={{
                                maxHeight: 833,
                                height: "100%",
                                overflow: "auto",
                                WebkitScrollSnapType: "none",
                                backgroundColor: "white",
                                border: "1px solid #D7E2EB",
                            }}>
                            {hospitalList.map((item, index) => (
                                <Hospital
                                    key={index}
                                    hospital={item.hospital}
                                    index={index}
                                    reviewList={item.reviewList}
                                    markerPosition={markerPosition}></Hospital>
                            ))}
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} md={9.5}>
                    {mode === "list" ? (
                        // ????????? ?????????
                        <Box id='map' style={{ width: "100%", height: "890px" }}></Box>
                    ) : (
                        // ?????? ?????? ?????????

                        <HospitalDetail
                            key={hospitalNo}
                            hospital={hospitalList[hospitalNo].hospital}
                            reviewList={hospitalList[hospitalNo].reviewList}></HospitalDetail>
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default HospitalSearch;

import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
/* global kakao */
function HospitalSearch(props) {
    const { kakao } = window;

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

    useEffect(() => {
        kakaoMap();
    });
    return (
        <Grid container>
            <Grid item xs={3}>
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
                <Paper style={{ maxHeight: 830, overflow: "auto" }}>
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
            <Grid item xs={9}>
                <div id="map" style={{ width: "100%", height: "890px" }}></div>
            </Grid>
        </Grid>
    );
}

export default HospitalSearch;

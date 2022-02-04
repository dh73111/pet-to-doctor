import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const MyImage = styled("div")({
    position: "relative",
});
const MyDiv = styled("div")({
    position: "absolute",
    top: "580px",
    width: "100%",
});

function Home(props) {
    return (
        <div>
            <MyImage>
                <img src="./img/main.png" width="100%" height="550px" alt=""></img>
            </MyImage>
            <MyDiv>
                <Grid container>
                    <Grid item xs={2.4}></Grid>
                    <Grid item xs={2.4}>
                        <Card sx={{ maxHeight: 216 }}>
                            <CardContent>
                                <Box sx={{ my: 5, color: "#29A1B1", fontSize: 18, fontWeight: "medium" }}>병원찾기</Box>
                                <Box sx={{ my: 5, fontSize: 12 }}>
                                    주변에 위치한 병원 정보를 <br /> 알려드립니다
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Card sx={{ maxHeight: 216 }}>
                            <CardContent>
                                <Box sx={{ my: 5, color: "#29A1B1", fontSize: 18, fontWeight: "medium" }}>예약하기</Box>
                                <Box sx={{ my: 5, fontSize: 12 }}>
                                    온라인 진료 서비스를 위한 예약을 <br /> 도와드립니다.
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2.4}>
                        <Card sx={{ maxHeight: 216 }}>
                            <CardContent>
                                <Box sx={{ my: 5, color: "#29A1B1", fontSize: 18, fontWeight: "medium" }}>공지사항</Box>
                                <Box sx={{ my: 5, fontSize: 12 }}>
                                    새로운 병원이 추가되었습니다. 22.01.29 <br />
                                    새로운 병원이 추가되었습니다. 22.01.29
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </MyDiv>
            <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={22} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}>
                        <img src="./img/mainDesc.png" width="100%" height="450px" alt=""></img>
                    </Grid>
                    <Grid item xs={2.4}></Grid>
                    <Grid item xs={7.2}>
                        <img src="./img/mainDesc2.png" width="100%" height="300px" alt=""></img>
                    </Grid>
                    <Grid item xs={2.4}></Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Home;

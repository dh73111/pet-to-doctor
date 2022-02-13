import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";

//FFF5F6
function Footer(props) {
    const MyFooter = styled("div")({
        width: "100%",
        // height: "300px",
        backgroundColor: "rgb(249, 249, 249)",
        // backgroundColor: "#FFF5F6",
        // position: "relative",
        // bottom: 0,
        paddingBottom: "100px",
        // marginTop: "100px",
    });
    return (
        <MyFooter>
            <Container>
                <Grid container sx={{ pt: 8 }} spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ color: "#687274", fontWeight: "bold", fontSize: "20px" }}>
                            Pet to Doctor(펫투닥터)
                        </Typography>
                        <Typography sx={{ mt: 2, fontSize: "15px", color: "#8C999B" }}>
                            곽명필, 김두회, 김정빈, 박다원, 이준형, 정지욱
                        </Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: "15px", color: "#8C999B" }}>
                            서울특별시 강남구 언주로 508 14층(역삼동, 서울상록빌딩) 멀티캠퍼스
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 2, fontSize: "15px", color: "#8C999B", textAlign: "right" }}>
                            Tel : 02.6949.3016 월-금 (10:00 - 19:00)
                            <br />
                            Email : hello@petdoc.co.kr
                            <br />
                            광고문의 : 010.1234.5678 월-금 (10:00 - 19:00)
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </MyFooter>
    );
}

export default Footer;

// const MyDiv = styled("div")({
//   position: "absolute",
//   top: "580px",
//   width: "100%",
// });

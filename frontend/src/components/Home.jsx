import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import Footer from "./Footer";
import { NavLink, useNavigate } from "react-router-dom";
import HomeSwiper from "./commons/HomeSwiper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MyImage = styled("div")({
    position: "relative",
    minHeight: "500px",
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/image132.png)`,
    backgroundSize: "cover",
    backgroundColor: "#eaeaea",
});
const MyDiv = styled("div")({
    position: "absolute",
    top: "580px",
    width: "100%",
});
const cardStyle = {
    backgroundColor: "#fff",
    // position: "relative",
    // top: "36rem",
    // left: "50%",
    borderRadius: "4px",
};
const gridItemStyle = {
    height: "200px",
    p: 5,
    borderRight: { md: "1px solid #eaeaea" },
    borderBottom: { xs: "1px solid #eaeaea", md: "0" },
};
const mainicon = {
    height: "18rem",
    textAlign: "center",
    padding: 2,
    borderRadius: "0.55rem",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: "18px",
    fontFamily: "NanumSquare",
    pt: 5,
    color: "#fff",
};

function Home(props) {
    const navigate = useNavigate();
    return (
        <Box style={{ border: 1, backgroundColor: "#fafafa" }}>
            {/* <MyImage>
                <img src={`${process.env.PUBLIC_URL}/img/image132.png`} width="100%" alt="mainVisual" />
                <Typography
                    className='mainTitle'
                    sx={{ fontSize: "42px", fontWeight: "600", pt: 26, fontFamily: "NanumSquare" }}
                    textAlign='center'>
                    <Typography sx={{ fontSize: "24px" }}>원격 반료동물 진료 플랫폼</Typography>" 펫투닥터로 우리아이
                    건강을 지켜주세요 "
                </Typography>
            </MyImage> */}
            <HomeSwiper />
            <Box sx={{ mt: 8, backgroundColor: "#fafafa" }}>
                <Container sx={{ p: 3 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box
                                className='mainicon'
                                onClick={() => {
                                    navigate("/petodoctor/hospitalsearch");
                                }}
                                sx={{
                                    ...mainicon,
                                    backgroundImage: `url(${process.env.PUBLIC_URL}/img/hospital.jpg)`,
                                    backgroundSize: "110%",
                                    backgroundPosition: "50% 0%",
                                    height: { xs: "180px", md: "300px" },
                                }}>
                                병원찾기
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box
                                className='mainicon'
                                onClick={() => {
                                    navigate("/petodoctor/review");
                                }}
                                sx={{
                                    ...mainicon,
                                    backgroundImage: `url(${process.env.PUBLIC_URL}/img/review.png)`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 10%",
                                    height: { xs: "180px", md: "300px" },
                                }}>
                                펫투닥터 후기
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box
                                className='mainicon'
                                onClick={() => {
                                    navigate("/petodoctor/qna");
                                }}
                                sx={{
                                    ...mainicon,
                                    backgroundImage: `url(${process.env.PUBLIC_URL}/img/faq.png)`,
                                    backgroundSize: "60%",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "50% 70%",
                                    backgroundColor: "#FAC8BF",
                                    height: { xs: "180px", md: "300px" },
                                }}>
                                자주묻는 질문
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            {/* <Container sx={{ my: 4 }}>
                <Grid container style={cardStyle} className='card'>
                    <Grid item sx={gridItemStyle} xs={12} md={4}>
                        <Box sx={{ color: "#29A1B1", fontSize: 25, fontWeight: "700" }}>
                            <NavLink
                                to='/petodoctor/hospitalsearch'
                                style={{ color: "#29A1B1", textDecoration: "none" }}>
                                병원찾기
                            </NavLink>
                        </Box>
                        <Box sx={{ fontSize: 18, mt: 2 }}>
                            주변에 위치한 병원 정보를 <br /> 알려드립니다
                        </Box>
                    </Grid>
                </Grid>
                <Grid container style={cardStyle} className='card'>
                    <Grid item sx={gridItemStyle} xs={12} md={4}>
                        <Box sx={{ color: "#29A1B1", fontSize: 25, fontWeight: "700" }}>예약하기</Box>
                        <Box sx={{ fontSize: 18, mt: 2 }}>
                            온라인 진료 서비스를 위한 예약을 <br /> 도와드립니다.
                        </Box>
                    </Grid>
                </Grid>
                <Grid container style={cardStyle} className='card'>
                    <Grid item sx={{ height: "200px", p: 5 }} xs={12} md={4}>
                        <Box sx={{ color: "#29A1B1", fontSize: 25, fontWeight: "700" }}>공지사항</Box>
                        <Box sx={{ fontSize: 16, mt: 2 }}>
                            새로운 병원이 추가되었습니다. 22.01.29 <br />
                            새로운 병원이 추가되었습니다. 22.01.29
                        </Box>
                    </Grid>
                </Grid>
            </Container> */}
            <Box sx={{ backgroundColor: "#fafafa", p: "200px 26px 160px 26px" }}>
                <Grid container maxWidth='lg' sx={{ mx: "auto" }}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                // backgroundImage: `url(${process.env.PUBLIC_URL}/img/main2.png)`,
                                // backgroundSize: "cover",
                            }}>
                            <img src={`${process.env.PUBLIC_URL}/img/main2.png`} alt='진료상담' width='100%' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 12 } }}>
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "800",
                                color: "#309FB3",
                                mt: 12,
                                fontFamily: "NanumSquare",
                            }}>
                            진료/상담
                        </Typography>
                        <Typography
                            component='h2'
                            sx={{ fontSize: "2.3rem", fontWeight: 800, fontFamily: "NanumSquare" }}>
                            상담 받고 병원을 결정하세요
                        </Typography>
                        <Typography sx={{ fontSize: "25px", mt: 3, lineHeight: "40px", fontFamily: "NanumSquare" }}>
                            수의사와의 방문 전 간단한 상담으로
                            <br />
                            병원이 나에게 맞을 지 확인해보세요.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ backgroundColor: "#ffffff", p: "200px 26px 160px 26px" }}>
                <Grid container maxWidth='lg' sx={{ mx: "auto" }}>
                    <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 6 } }}>
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: 800,
                                color: "#309FB3",
                                mt: 12,
                                fontFamily: "NanumSquare",
                            }}>
                            정기검진
                        </Typography>
                        <Typography
                            component='h2'
                            sx={{ fontSize: "2.3rem", fontWeight: 800, fontFamily: "NanumSquare" }}>
                            반려동물 건강상태를
                            <br /> 체크해보세요
                        </Typography>
                        <Typography sx={{ fontSize: "25px", mt: 3, lineHeight: "40px", fontFamily: "NanumSquare" }}>
                            간편한 화상진료로 고민을 해결하거나
                            <br />
                            반려동물의 건강상태를 체크할 수 있어요.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                mt: 4,
                            }}>
                            <img src={`${process.env.PUBLIC_URL}/img/main3.png`} alt='진료상담' width='100%' />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Home;

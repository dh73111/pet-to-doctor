import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper";
import { Box, Container, Grid, Typography } from "@mui/material";

function HomeSwiper(props) {
    return (
        <>
            <Swiper
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                speed={1500}
                loop={true}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Pagination, Autoplay]}
                className='mySwiper'>
                <SwiperSlide>
                    <div style={{ width: "1920px", height: "600px", backgroundColor: "#F4DED3" }}>
                        <Container>
                            <Grid container>
                                <Grid item xs={12} md={5.5} sx={{ p: { xs: 3 }, pt: { xs: 10, md: 28 } }}>
                                    <Typography
                                        sx={{
                                            color: "#34281C",
                                            fontFamily: "NanumSquare",
                                            fontWeight: "600",
                                            fontSize: "18px",
                                        }}>
                                        비대면 온라인 상담으로
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#34281C",
                                            fontFamily: "NanumSquare",
                                            fontWeight: "600",
                                            fontSize: "32px",
                                        }}>
                                        반려동물의 건강을 지켜주세요
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#5E4730",
                                            fontFamily: "NanumSquare",
                                            fontSize: "16px",
                                            mt: 3,
                                        }}>
                                        건강상담, 행동교정, 진료, 약처방까지
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6.5} sx={{ mt: 8 }}>
                                    <img src={`${process.env.PUBLIC_URL}/img/main_dog_walk1.gif`} width='600px' />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ width: "1920px", height: "600px", backgroundColor: "#00AFEF" }}>
                        <Container>
                            <Grid container>
                                <Grid item xs={12} md={5.5} sx={{ p: { xs: 3 }, pt: { xs: 10, md: 28 } }}>
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontFamily: "NanumSquare",
                                            fontWeight: "600",
                                            fontSize: "18px",
                                        }}>
                                        비대면 온라인 상담으로
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontFamily: "NanumSquare",
                                            fontWeight: "600",
                                            fontSize: "32px",
                                        }}>
                                        반려동물의 건강을 지켜주세요
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#EDEDED",
                                            fontFamily: "NanumSquare",
                                            fontSize: "16px",
                                            mt: 3,
                                        }}>
                                        건강상담, 행동교정, 진료, 약처방까지
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6.5} sx={{ mt: 8 }}>
                                    <img src={`${process.env.PUBLIC_URL}/img/main_dog_walk2.gif`} />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ width: "1920px", height: "600px", backgroundColor: "#00BFFC" }}>
                        <Container>
                            <Grid container>
                                <Grid item xs={12} md={5.5} sx={{ p: { xs: 3 }, pt: { xs: 10, md: 28 } }}>
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontFamily: "NanumSquare",
                                            fontWeight: "600",
                                            fontSize: "18px",
                                        }}>
                                        비대면 온라인 상담으로
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "white",
                                            fontFamily: "NanumSquare",
                                            fontWeight: "600",
                                            fontSize: "32px",
                                        }}>
                                        반려동물의 건강을 지켜주세요
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#EDEDED",
                                            fontFamily: "NanumSquare",
                                            fontSize: "16px",
                                            mt: 3,
                                        }}>
                                        건강상담, 행동교정, 진료, 약처방까지
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6.5} sx={{ mt: { xs: 0, md: 8 } }}>
                                    <img src={`${process.env.PUBLIC_URL}/img/ulys_dog.gif`} width='600px' />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ width: "1920px", height: "600px", backgroundColor: "#FFE55F" }}>
                        <Container>
                            <Grid container>
                                <Grid item xs={12} md={5.5} sx={{ p: { xs: 3 }, pt: { xs: 10, md: 28 } }}>
                                    <Typography
                                        sx={{
                                            color: "#423A3A",
                                            fontFamily: "NanumSquare",
                                            fontWeight: "600",
                                            fontSize: "18px",
                                        }}>
                                        비대면 온라인 상담으로
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#423A3A",
                                            fontFamily: "NanumSquare",
                                            fontWeight: "600",
                                            fontSize: "32px",
                                        }}>
                                        반려동물의 건강을 지켜주세요
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#423A3A",
                                            fontFamily: "NanumSquare",
                                            fontSize: "16px",
                                            mt: 3,
                                        }}>
                                        건강상담, 행동교정, 진료, 약처방까지
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6.5} sx={{ mt: { xs: 2, md: 8 } }}>
                                    <img src={`${process.env.PUBLIC_URL}/img/main_dog_walk3.gif`} width='600px' />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default HomeSwiper;

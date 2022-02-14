import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper";
import { Box, Container, Grid, Typography } from "@mui/material";

function ReviewSwiper(props) {
    return (
        <>
            <Swiper
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                speed={1500}
                loop={true}
                // autoplay={{
                //     delay: 7000,
                //     disableOnInteraction: false,
                // }}
                spaceBetween={0}
                slidesPerView={1}
                modules={[Navigation, Pagination, Autoplay]}>
                <SwiperSlide style={{ backgroundColor: "#D0E1F5" }}>
                    <Grid container sx={{ height: "280px" }}>
                        <Grid
                            item
                            xs={0}
                            md={4}
                            sx={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/img/review1.jpg)`,
                                backgroundSize: "cover",
                            }}></Grid>
                        <Grid item xs={12} md={8} sx={{ px: 6 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: "600", fontFamily: "NanumSquare", pt: 4 }}>
                                #첫번째 #처방 #친절 #저렴
                            </Typography>
                            <Typography sx={{ float: "right" }}>★★★★★</Typography>
                            <Typography>정*린 회원님</Typography>
                            <Typography
                                sx={{ pt: 1.5, fontFamily: "NanumSquare", height: "156px", textOverflow: "ellipsis" }}>
                                이번이 두번째 펫투닥터 이용인데 두번 다 너무 만족스러워서 후기 남겨요!!! 처음 유기견
                                센터에서 데려와 어떻게 해야하나 고민하던 중 펫투닥터를 이용하게 되었어요. 아직 아기라
                                배변교육이 안되어 있고 집안 이리저리 물건을 씹고다녀서 행동교정 훈련상담도 같이 했는데
                                수의사님이 엄청 친절하시고 설명도 너무너무 잘 해주셨어요. 처음이라 예방접종부터 맞추는게
                                좋을것 같다고 하셔서 2번째는 방문예약으로 접종왔습니다! 펫투닥터는 정말 합리적인
                                서비스에요 ㅇㅇㅇ병원 강추입니다!!!
                            </Typography>
                        </Grid>
                    </Grid>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "#FEE893" }}>
                    <Grid container sx={{ height: "280px" }}>
                        <Grid
                            item
                            xs={0}
                            md={4}
                            sx={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/img/review2.jpg)`,
                                backgroundSize: "cover",
                            }}>
                            {/* <img src={`${process.env.PUBLIC_URL}/img/review2.jpg`} style={{ height: "100%" }} /> */}
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ px: 6 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: "600", fontFamily: "NanumSquare", pt: 4 }}>
                                #강아지 #행동교정 #정기상담 #편리
                            </Typography>
                            <Typography sx={{ float: "right" }}>★★★★★</Typography>
                            <Typography>한*은 회원님</Typography>
                            <Typography
                                sx={{ pt: 1.5, fontFamily: "NanumSquare", height: "156px", textOverflow: "ellipsis" }}>
                                이번에 이사를 가는데 이 병원만큼 마음에 들고 우리 토리를 잘 봐주시는 병원이 없어서 많이
                                아쉬웠는데 수의사선생님이 펫투닥터로 진료를 계속 볼 수 있다고 추천해주셨어요! 큰 일이
                                없어도 병원을 정기적으로 가는 스타일인데 앞으로 정기진료는 펫투닥터를 이용하려구요! 완전
                                짱입니다!
                            </Typography>
                        </Grid>
                    </Grid>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "#C0E4DA" }}>
                    <Grid container sx={{ height: "280px" }}>
                        <Grid
                            item
                            xs={0}
                            md={4}
                            sx={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/img/review3.jpg)`,
                                backgroundSize: "cover",
                            }}>
                            {/* <img src={`${process.env.PUBLIC_URL}/img/review1.jpg`} style={{ height: "100%" }} /> */}
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ px: 6 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: "600", fontFamily: "NanumSquare", pt: 4 }}>
                                #페럿 #처방 #펫탑동물병원
                            </Typography>
                            <Typography sx={{ float: "right" }}>★★★★★</Typography>
                            <Typography>나*정 회원님</Typography>
                            <Typography
                                sx={{ pt: 1.5, fontFamily: "NanumSquare", height: "156px", textOverflow: "ellipsis" }}>
                                햄햄이가 온몸을 긁는데 피부염인가 싶더라구요 ㅠ 상담 한번 먼저 받으려고 펫투닥터를 통해
                                원래 다니던 곳에서 원격진료를 받았습니다! 선생님이 햄햄이를 잘 알고계셔서 금방 진단 해
                                주셨는데 역시나 선천적으로 가지고 있었던 피부염이 다시 도진 것 같다고 하시더라구요ㅠㅠ
                                증상이 명확하고 내원할 필요는 없다고 해주셔서 쓰고 있던 약용샴푸랑 비상시에 발라줄 연고
                                택배로 다시 처방받았어요! 바빠서 약용샴푸 처방을 미루고 있었는데...펫투닥터 너무
                                편리하네요ㅠㅠㅠㅠ
                            </Typography>
                        </Grid>
                    </Grid>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "#FAC8BF" }}>
                    <Grid container sx={{ height: "280px" }}>
                        <Grid
                            item
                            xs={0}
                            md={4}
                            sx={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/img/review5.jpg)`,
                                backgroundSize: "cover",
                            }}>
                            {/* <img src={`${process.env.PUBLIC_URL}/img/review1.jpg`} style={{ height: "100%" }} /> */}
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ px: 6 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: "600", fontFamily: "NanumSquare", pt: 4 }}>
                                #햄스터 #진료 #병원찾기 #편리
                            </Typography>
                            <Typography sx={{ float: "right" }}>★★★★★</Typography>
                            <Typography>김*나 회원님</Typography>
                            <Typography
                                sx={{ pt: 1.5, fontFamily: "NanumSquare", height: "156px", textOverflow: "ellipsis" }}>
                                일반 동물병원에서 햄스터를 진료 안해주는 경우가 많아서 맹구가 갈수있는 병원이 얼마
                                없었는데 주변 병원찾기로 햄스터 진료해주는 병원 찾아서 예약해서 다녀왔어요! 다음에는
                                저도 온라인 진료 한번 해보려구요! 너무 너무 편리한것 같아요!
                            </Typography>
                        </Grid>
                    </Grid>
                </SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "#FEDCC1" }}>
                    <Grid container sx={{ height: "280px" }}>
                        <Grid
                            item
                            xs={0}
                            md={4}
                            sx={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/img/review4.jpg)`,
                                backgroundSize: "cover",
                            }}>
                            {/* <img src={`${process.env.PUBLIC_URL}/img/review1.jpg`} style={{ height: "100%" }} /> */}
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ px: 6 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: "600", fontFamily: "NanumSquare", pt: 4 }}>
                                #약처방 #검진 #진료 #저렴
                            </Typography>
                            <Typography sx={{ float: "right" }}>★★★★★</Typography>
                            <Typography>김*숙 회원님</Typography>
                            <Typography
                                sx={{ pt: 1.5, fontFamily: "NanumSquare", height: "156px", textOverflow: "ellipsis" }}>
                                우리 둘째가 지병으로 평소 먹던 있는데 매번 약만 처방 받으러 병원으로 왔다갔다 하는게
                                너무 불편했어요. 그런데 펫투닥터는 수의사 선생님과 이야기 나누고 약도 처방받는데
                                진료비도 정해져 있고 합리적인 가격이라 너무 좋네요. 앞으로도 자주 이용할 것 같아요 ^^
                            </Typography>
                        </Grid>
                    </Grid>
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default ReviewSwiper;

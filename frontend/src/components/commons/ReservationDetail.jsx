import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

function ReservationDetail(props) {
    return (
        <Container>
            <Typography sx={{ fontSize: 30, mx: 5, mt: 5, mb: 1, fontWeight: "bold", textAlign: "center" }}>상세예약내역</Typography>
            <Typography sx={{ mb: 2, textAlign: "center" }}>예약상태코드써주세용 props 받아서</Typography>
            <div className="devider"></div>
            <Grid container>
                <Grid container xs={12} sx={{ p: 3, textAlign: "left" }}>
                    <Grid item xs={6}>
                        <Box sx={{ mt: 2 }}>예약 번호</Box>
                        <Box sx={{ mt: 2 }}>예약일</Box>
                        <Box sx={{ mt: 2 }}>예약 시간</Box>
                        <Box sx={{ mt: 2 }}>병원</Box>
                        <Box sx={{ mt: 2 }}>담당의</Box>
                    </Grid>
                    <Grid item xs={6} sx={{ fontWeight: "bold", textAlign: "right" }}>
                        <Box sx={{ mt: 2 }}>예약 번호</Box>
                        <Box sx={{ mt: 2 }}>예약일</Box>
                        <Box sx={{ mt: 2 }}>예약 시간</Box>
                        <Box sx={{ mt: 2 }}>병원</Box>
                        <Box sx={{ mt: 2 }}>담당의</Box>
                    </Grid>
                </Grid>
                <div className="devider"></div>
                <Grid container xs={12} sx={{ p: 3, textAlign: "left", mb: 4 }}>
                    <Grid item xs={6}>
                        <Box sx={{ mt: 2 }}>반려동물 이름</Box>
                        <Box sx={{ mt: 2 }}>생년월일</Box>
                        <Box sx={{ mt: 2 }}>몸무게(kg)</Box>
                        <Box sx={{ mt: 2 }}>종</Box>
                        <Box sx={{ mt: 2 }}>특이사항</Box>
                    </Grid>
                    <Grid item xs={6} sx={{ fontWeight: "bold", textAlign: "right" }}>
                        <Box sx={{ mt: 2 }}>동물 이름</Box>
                        <Box sx={{ mt: 2 }}>생년 월일</Box>
                        <Box sx={{ mt: 2 }}>몸무게</Box>
                        <Box sx={{ mt: 2 }}>카멜레온</Box>
                        <Box sx={{ mt: 2 }}>식사를 잘못해요</Box>
                    </Grid>
                </Grid>
            </Grid>
            <div className="devider"></div>
            <Button variant="contained" sx={{ mt: 3, mb: 3, float: "right" }}>
                확인
            </Button>
        </Container>
    );
}

export default ReservationDetail;

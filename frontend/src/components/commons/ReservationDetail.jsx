import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function ReservationDetail(props) {
    return (
        <Box>
            <Box sx={{ fontSize: 30, mx: 5, mt: 5, fontWeight: "bold" }}>예약 내용</Box>;
            <Grid container sx={{ mt: 10 }}>
                <Grid item xs={1} />
                <Grid item xs={2} sx={{ textAlign: "right", fontWeight: "bold", fontSize: 25 }}>
                    <Box sx={{ mt: 4 }}>예약 번호</Box>
                    <Box sx={{ mt: 6 }}>예약일</Box>
                    <Box sx={{ mt: 6 }}>예약 시간</Box>
                    <Box sx={{ mt: 6 }}>병원</Box>
                    <Box sx={{ mt: 6 }}>담당의</Box>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "center", fontSize: 25 }}>
                    <Box sx={{ mt: 4 }}>예약 번호</Box>
                    <Box sx={{ mt: 6 }}>예약일</Box>
                    <Box sx={{ mt: 6 }}>예약 시간</Box>
                    <Box sx={{ mt: 6 }}>병원</Box>
                    <Box sx={{ mt: 6 }}>담당의</Box>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right", fontWeight: "bold", fontSize: 25 }}>
                    <Box sx={{ mt: 4 }}>반려동물 이름</Box>
                    <Box sx={{ mt: 6 }}>생년월일</Box>
                    <Box sx={{ mt: 6 }}>몸무게</Box>
                    <Box sx={{ mt: 6 }}>종</Box>
                    <Box sx={{ mt: 6 }}>특이사항</Box>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "center", fontSize: 25 }}>
                    <Box sx={{ mt: 4 }}>동물 이름</Box>
                    <Box sx={{ mt: 6 }}>생년 월일</Box>
                    <Box sx={{ mt: 6 }}>몸무게</Box>
                    <Box sx={{ mt: 6 }}>카멜레온</Box>
                    <Box sx={{ mt: 6 }}>식사를 잘못해요</Box>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Box>
    );
}

export default ReservationDetail;

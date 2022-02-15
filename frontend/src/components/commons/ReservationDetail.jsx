import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { treatmentInfo } from "api/treatment";
import { getHosiptal } from "api/hospital";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

function ReservationDetail() {
    const location = useLocation();
    const [res, setRes] = useState({});
    useEffect(() => {
        const getdata = async () => {
            const resId = location.state;
            const data = await treatmentInfo(resId);
            setRes(data);
        };
        getdata();
    }, []);
    const resdate = res.scheduleDate ? res.scheduleDate.substring(0, 10) : "";
    const restime = res.scheduleDate ? res.scheduleDate.substring(11, 16) : "";
    return (
        <Container>
            <Typography sx={{ fontSize: 30, mx: 5, mt: 5, mb: 1, fontWeight: "bold", textAlign: "center" }}>
                상세예약내역
            </Typography>
            <Typography sx={{ mb: 2, textAlign: "center" }}>예약상태코드써주세용 props 받아서</Typography>
            <div className='devider'></div>
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
                        <Box sx={{ mt: 2 }}>{res.id}</Box>
                        <Box sx={{ mt: 2 }}>{resdate}</Box>
                        <Box sx={{ mt: 2 }}>{restime}</Box>
                        <Box sx={{ mt: 2 }}>{res.hospitalName}</Box>
                        <Box sx={{ mt: 2 }}>{res.doctorName}</Box>
                    </Grid>
                </Grid>
                <div className='devider'></div>
                <Grid container xs={12} sx={{ p: 3, textAlign: "left", mb: 4 }}>
                    <Grid item xs={6}>
                        <Box sx={{ mt: 2 }}>반려동물 이름</Box>
                        <Box sx={{ mt: 2 }}>생년월일</Box>
                        <Box sx={{ mt: 2 }}>몸무게(kg)</Box>
                        <Box sx={{ mt: 2 }}>종</Box>
                        <Box sx={{ mt: 2 }}>특이사항</Box>
                    </Grid>
                    <Grid item xs={6} sx={{ fontWeight: "bold", textAlign: "right" }}>
                        <Box sx={{ mt: 2 }}>{res.petName}</Box>
                        <Box sx={{ mt: 2 }}>{res.birthDate}</Box>
                        <Box sx={{ mt: 2 }}>{res.petWeight}</Box>
                        <Box sx={{ mt: 2 }}>{res.petSpecies}</Box>
                        <Box sx={{ mt: 2 }}>{res.symptom}</Box>
                    </Grid>
                </Grid>
            </Grid>
            <div className='devider'></div>
            <Button variant='contained' sx={{ mt: 3, mb: 3, float: "right" }}>
                확인
            </Button>
        </Container>
    );
}

export default ReservationDetail;

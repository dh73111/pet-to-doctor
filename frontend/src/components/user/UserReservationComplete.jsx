import { Button, Container, Grid, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from "react";
import NavBar from "../NavBar";

function UserReservationComplete(props) {
  return (
    <>
      <NavBar />
      <Container align="center" maxWidth="sm" sx={{ mt: 24 }}>
        <CheckCircleIcon sx={{ fontSize: 60 }} color="success"/>
        <Typography variant='h4' sx={{ fontWeight: 600, mt: 3, mb: 1 }}>상담예약 결제가 완료되었습니다!</Typography>
        <Typography sx={{ mb: 4 }}>더 자세한 상담예약 내역은 메뉴 탭의 내 예약에서 보실 수 있습니다.</Typography>
        <Button variant="contained" sx={{ backgroundColor: '#309FB3', width: '360px' }}>내 예약</Button>
        <Button variant="contained" sx={{ backgroundColor: '#E7E7E7', width: '360px', mt: 1 }}>확인</Button>
      </Container>
    </>
  );
}

export default UserReservationComplete;

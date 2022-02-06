import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import NavBar from "../NavBar";

function DoctorMypage(props) {
  return (
    <div>
      <Container>
        <Typography variant="h4" component="h1" sx={{ mt: 10 }}>
          마이페이지
        </Typography>
        <DoctorInfo />
      </Container>
    </div>
  );
}
function DoctorInfo() {
  const user = {
    name: "김수의사",
    email: "doctortopet@example.com",
    call: "010-1234-5678",
    specialty: "내과",
    hospitalName: "서울동물병원",
  };
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 25 }}>
          내 정보
        </Typography>
        <Paper elevation={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Avatar sx={{ width: 180, height: 180, mx: 3 }}>H</Avatar>
          </Grid>
          <Grid item xs={12} md={7} sx={{ mt: 4, mx: 4 }}>
            <Box sx={{ typography: "h6" }}>{user.name}</Box>
            <Box sx={{ typography: "body1" }}>{user.email}</Box>
            <Box sx={{ typography: "body1" }}>연락처 : {user.call}</Box>
            <Box sx={{ typography: "body1" }}>
              소속병원 : {user.hospitalName}
            </Box>
            <Box sx={{ typography: "body1" }}> 분야 : {user.specialty}</Box>
          </Grid>
          <Box sx={{ mt: 2, mx: 2 }}>
            <Button varient="contained">회원정보 수정</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default DoctorMypage;

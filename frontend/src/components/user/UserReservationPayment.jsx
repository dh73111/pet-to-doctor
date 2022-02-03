import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, Container, createTheme, Divider, FormControlLabel, FormGroup, Grid, ThemeProvider } from '@mui/material';
import NavBar from '../NavBar';
import StepBar from './resources/StepBar';


function UserReservationPayment(props) {
    const contentBg = '#F5F6F7'
    const newTheme = createTheme({
        palette: {
            primary: {
                main: "#309FB3",
            },
        },
      });
      return (
        <ThemeProvider theme={newTheme}>
          <NavBar />
          <Container maxWidth="xl">
          <Box container>
            <Box item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>상담 및 진료비를 결제해주세요</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <StepBar />
              </Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ backgroundColor: '#F5F6F7', p: 4}}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>진료정보</Typography>
                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Grid item xs={12} md={12}><Typography sx={{ fontWeight: 600 }}>병원</Typography></Grid>
                                    <Grid item xs={12} md={12}><Typography>한마음동물병원</Typography></Grid>
                                </Grid>
                                <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Grid item xs={12} md={12}><Typography sx={{ fontWeight: 600}}>예약 날짜</Typography></Grid>
                                    <Grid item xs={12} md={12}><Typography>2020년 1월 1일</Typography></Grid>
                                </Grid>
                                <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Grid item xs={12} md={12}><Typography sx={{ fontWeight: 600}}>예약 시간</Typography></Grid>
                                    <Grid item xs={12} md={12}><Typography>10:00</Typography></Grid>
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Grid container>
                                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'row' }} >
                                        <Typography xs={12} md={4} sx={{ fontWeight: 600, mr: 1 }} minWidth="80px">반려동물</Typography>
                                        <Typography xs={12} md={8}>김진돌</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography xs={12} md={12} sx={{ fontWeight: 600}} minWidth="80px">생년월일</Typography>
                                        <Typography xs={12} md={12}>2020/01/01</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography xs={12} md={12} sx={{ fontWeight: 600}} minWidth="80px">몸무게</Typography>
                                        <Typography xs={12} md={12}>12kg</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12} sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                                        <Typography xs={12} md={12} sx={{ fontWeight: 600 }} minWidth="80px">이전병력</Typography>
                                        <Typography xs={12} md={12}>당뇨, 뇌졸중, 슬개골탈구, 당뇨, 뇌졸중, 슬개골탈구</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container xs={12} md={12} sx={{ mt:2, display: 'flex', flexDirection: 'column'}}>
                                    <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography xs={12} md={6} sx={{ fontWeight: 600 }} minWidth="80px">증상</Typography>
                                        <Typography xs={12} md={6}>
                                            밥을 잘 안먹어요 밥을 잘 안먹어요밥을 잘 안먹어요밥을 잘 안먹어요밥을 잘 안먹어요밥을 잘 안먹어요
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                        <Typography sx={{ fontWeight: 600, mr: 2 }} minWidth="140px">추가상담 희망내용</Typography>
                                        <Typography xs={12} md={6} sx={{ mt: 1 }}>
                                            체중 조절 방법 노하우를 알고싶어요체중 조절 방법 노하우를 알고싶어요체중 조절 방법 노하우를 알고싶어요
                                            체중 조절 방법 노하우를 알고싶어요체중 조절 방법 노하우를 알고싶어요체중 조절 방법 노하우를 알고싶어요
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}></Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ backgroundColor: '#F5F6F7', p: 4, mt: 2}}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>결제방법</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ backgroundColor: '#F5F6F7', p: 4}}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>최종결제금액</Typography>
                        <Grid container sx={{ justifyContent: 'flex-end', mb: 4 }}>
                            <Grid align="right" item xs={4}><Typography sx={{ fontWeight: 600 }}>진료비</Typography></Grid>
                            <Grid align="right" item xs={7}><Typography xs={6} sx={{ ml: 3, pr: 1 }}>3,000원</Typography></Grid>
                        </Grid>
                        <Divider />
                        <Grid continer sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                            <Grid item xs={4}>
                                <Typography>총 결제예정 금액</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h4" sx={{ textAlign: 'right' }}>200,000원</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ p: 4 }}>
                        <Button variant='contained' sx={{ width: "100%", height: "40px", mx: "auto" }}>결제</Button>
                    </Box>
                </Grid>
            </Grid>
          </Box>
          </Container>
        </ThemeProvider>
      );
}

export default UserReservationPayment;
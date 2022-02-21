import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { treatmentPay, treatmentInfo } from "api/treatment";
import { Container, createTheme, Divider, Grid, ThemeProvider } from "@mui/material";
import StepBar from "./resources/StepBar";

function UserReservationPayment(props) {
    const { state } = useLocation();

    const newTheme = createTheme({
        palette: {
            primary: {
                main: "#309FB3",
            },
        },
    });

    const { IMP } = window;
    IMP.init("imp36272840");
    const navigate = useNavigate();
    console.log(String(state.treatmentId));
    const pay = async () => {
        IMP.request_pay(
            {
                pg: "kakaopay",
                pay_method: "kakaopay",
                merchant_uid: String(state.treatmentId),
                name: `${state.data.petName} 진료 예약`,
                amount: state.data.price,
            },
            async (response) => {
                console.log(response);
                await treatmentPay(state.treatmentId, { paymentCode: state.treatmentId, price: state.data.price });
                navigate("/petodoctor/userreservationcomplete");
            }
        );
    };

    return (
        <ThemeProvider theme={newTheme}>
            <Container maxWidth='lg' sx={{ mb: 20 }}>
                <Box container>
                    <Box item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
                            상담 및 진료비를 결제해주세요
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                            <StepBar />
                        </Box>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} sx={{ display: "flex", flexDirection: "column" }}>
                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    p: 4,
                                    border: "1px solid #D7E2EB",
                                    borderRadius: "0.55rem",
                                }}>
                                <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                                    진료정보
                                </Typography>
                                <Grid container sx={{ mt: 2 }}>
                                    <Grid item xs={12} md={12} sx={{ display: "flex", flexDirection: "column" }}>
                                        <Grid item sx={{ display: "flex", flexDirection: "row", mt: 0.5 }}>
                                            <Grid item xs={12} md={4}>
                                                <Typography sx={{ fontWeight: 600 }}>병원 이름 </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography>{state.hospital.name}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ display: "flex", flexDirection: "row", mt: 0.5 }}>
                                            <Grid item xs={12} md={4}>
                                                <Typography sx={{ fontWeight: 600 }}>예약 날짜 </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography>{`${state.data.scheduleDate.substring(
                                                    0,
                                                    4
                                                )}년 ${state.data.scheduleDate.substring(5, 7)}월
                                                ${state.data.scheduleDate.substring(8, 10)}일 `}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
                                            <Grid item xs={12} md={4}>
                                                <Typography sx={{ fontWeight: 600 }}>예약 시간 </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography>{state.data.scheduleDate.substring(11, 16)}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
                                            <Grid item xs={12} md={4}>
                                                <Typography sx={{ fontWeight: 600 }}>병원 소개 </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography>{state.hospital.description}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <div className='devider' style={{ marginTop: "20px", marginBottom: "20px" }}></div>
                                    <Grid item xs={12} md={12} sx={{ display: "flex", flexDirection: "column" }}>
                                        <Grid container>
                                            <Grid item xs={12} md={12} sx={{ display: "flex", flexDirection: "row" }}>
                                                <Typography
                                                    xs={12}
                                                    md={4}
                                                    sx={{ fontWeight: 600, mr: 1 }}
                                                    minWidth='80px'>
                                                    반려동물
                                                </Typography>
                                                <Typography xs={12} md={8}>
                                                    {state.data.petName}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12} sx={{ display: "flex", flexDirection: "row" }}>
                                                <Typography xs={12} md={12} sx={{ fontWeight: 600 }} minWidth='80px'>
                                                    생년월일
                                                </Typography>
                                                <Typography xs={12} md={12}>
                                                    {state.data.birthDate}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12} sx={{ display: "flex", flexDirection: "row" }}>
                                                <Typography xs={12} md={12} sx={{ fontWeight: 600 }} minWidth='80px'>
                                                    몸무게
                                                </Typography>
                                                <Typography xs={12} md={12}>
                                                    {state.data.petWeight}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            xs={12}
                                            md={12}
                                            sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
                                            <Grid item sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
                                                <Typography sx={{ fontWeight: 600, mr: 2 }} minWidth='140px'>
                                                    추가상담 희망내용
                                                </Typography>
                                                <Typography xs={12} md={6} sx={{ mt: 1 }}>
                                                    {state.data.symptom}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6}></Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    p: 4,
                                    border: "1px solid #D7E2EB",
                                    borderRadius: "0.55rem",
                                }}>
                                <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                                    최종결제금액
                                </Typography>
                                <Grid container sx={{ justifyContent: "flex-end", mb: 4 }}>
                                    <Grid align='right' item xs={4}>
                                        <Typography sx={{ fontWeight: 600 }}>진료비</Typography>
                                    </Grid>
                                    <Grid align='right' item xs={7}>
                                        <Typography xs={6} sx={{ ml: 3, pr: 1 }}>
                                            {`${state.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid
                                    continer
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mt: 2,
                                    }}>
                                    <Grid item xs={4}>
                                        <Typography>총 결제예정 금액</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='h4' sx={{ textAlign: "right" }}>
                                            {`${state.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ p: 4 }}>
                                <Button
                                    variant='contained'
                                    sx={{ width: "100%", height: "40px", mx: "auto" }}
                                    onClick={() => {
                                        pay();
                                    }}>
                                    결제
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default UserReservationPayment;

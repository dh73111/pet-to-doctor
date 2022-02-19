import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";

const newTheme = createTheme({
    palette: {
        primary: {
            main: "#309FB3",
        },
    },
    typography: {
        h5: {
            fontWeight: 800,
        },
        subtitle1: {
            fontSize: "1.3rem",
        },
    },
});
function UserSignupConfirm(props) {
    const navigate = useNavigate();
    return (
        <div>
            <ThemeProvider theme={newTheme}>
                <Container align='center' sx={{ pt: 8, height: "90vh" }}>
                    <Grid sx={{ mt: 4, p: 4, border: "1px solid #D7E2EB", borderRadius: "0.25rem" }} xs={12} md={8}>
                        <DraftsOutlinedIcon sx={{ fontSize: 80, color: "#309FB3", mt: 4 }} />
                        <Typography variant='h5' component='h1' sx={{ mb: 2 }}>
                            이메일 인증
                        </Typography>
                        <Typography variant='subtitle1' component='subtitle1'>
                            인증 메일이 <b>가입 신청한 이메일</b>(으)로 전송되었습니다.
                            <br />
                            받으신 이메일을 열어 버튼을 클릭하면 가입이 완료됩니다.
                        </Typography>
                        <Typography sx={{ my: 2 }} style={{ fontSize: "14px" }}>
                            이메일 주소를 잘못 입력하신 경우
                            <br />
                            <NavLink to='/petodoctor/qna' variant='body1' sx={{ color: "#309FB3" }} underline='hover'>
                                ‘고객센터’
                            </NavLink>
                            &nbsp;로 이메일 주소 수정을 요청해 주시기 바랍니다.
                        </Typography>
                        <Button
                            variant='contained'
                            style={{ width: "176px" }}
                            onClick={() => {
                                navigate("/petodoctor");
                            }}>
                            메인으로 가기
                        </Button>
                        <Typography sx={{ my: 4 }} style={{ fontSize: "12px" }}>
                            이메일이 오지 않았을 때는?
                            <br />
                            스팸편지함 확인 또는&nbsp;
                            <NavLink to='#' variant='body1' sx={{ color: "#309FB3" }} style={{ fontSize: "12px" }}>
                                인증 메일 다시 보내기
                            </NavLink>
                        </Typography>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default UserSignupConfirm;

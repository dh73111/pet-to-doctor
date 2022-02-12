import React, { useState } from "react";
import { TextField, Grid, Checkbox, Button, FormControlLabel, Typography, Box, Link, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginUser, changePassword, userInfo } from "api/user.js";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

const newTheme = createTheme({
    palette: {
        primary: {
            main: "#309FB3",
        },
    },
});

function UserLoginModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const REST_API_KEY = "c9d9cd706215602e662da44e2c2150a2";
    const REDIRECT_URI = "http://localhost:3000/kakaooauth";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const userLogin = async (user) => {
        const loginRes = await loginUser({ email: user.email, password: user.password });
        sessionStorage.setItem("accessToken", loginRes);
        let decode_token = jwtDecode(loginRes);
        const info = await userInfo(decode_token.sub);
        await dispatch({ type: "login", userData: info });
        props.onClose();
        navigate("/petodoctor");
    };
    // async function userLogin(user) {
    //   await loginUser(
    //     { email: user.email, password: user.password },
    //     (res) => {
    //       sessionStorage.setItem("accessToken", res.data.data);
    //       let decode_token = jwtDecode(res.data.data);
    //       userInfo(
    //         decode_token.sub,
    //         (res) => {
    //           dispatch({ type: "login", userData: res.data.data });
    //           props.onClose();
    //           navigate("/petodoctor");
    //         },
    //         () => {
    //           console.log("회원 정보가져오기 실패");
    //         }
    //       );
    //     },
    //     () => {
    //       alert("아이디나 비밀번호가 틀렸습니다.");
    //     }
    //   );
    // }
    async function userChangePwd() {
        await changePassword(
            { password: "123", passwordConf: "123", newPassword: "1234" },
            (res) => {
                console.log(res);
            },
            () => {}
        );
    }
    return (
        <ThemeProvider theme={newTheme}>
            <div>
                <Grid container maxHeight='800px' sx={{ height: "100vh" }}>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: `url('${process.env.PUBLIC_URL}/img/loginDog.jpg')`,
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                            <Typography component='h1' variant='h4'>
                                <img src={`${process.env.PUBLIC_URL}/img/web_logo.png`} alt='펫투닥터로고' />
                            </Typography>
                            <Box component='form' noValidate /*onSubmit={handleSubmit}*/ sx={{ mt: 1 }}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    value={values.email}
                                    onChange={handleChange("email")}
                                    /*autoFocus*/
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                    value={values.password}
                                    onChange={handleChange("password")}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") userLogin(values);
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        userLogin(values);
                                    }}
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 1, py: 1 }}>
                                    로그인
                                </Button>
                                <Grid container justifyContent='flex-end'>
                                    <Grid item>
                                        <Link
                                            href='#'
                                            variant='body2'
                                            sx={{ mr: 1, color: "#BABABA" }}
                                            underline='hover'
                                            onClick={() => {
                                                userChangePwd();
                                            }}>
                                            이메일찾기
                                        </Link>
                                        <Box sx={{ color: "#CACACA", display: "inline" }}>|</Box>
                                        <Link
                                            href='#'
                                            variant='body2'
                                            sx={{ ml: 1, color: "#BABABA" }}
                                            underline='hover'>
                                            비밀번호찾기
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 1 }}
                                    style={{ backgroundColor: "#03C75A" }}>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/naver.png`}
                                        width='24px'
                                        alt='네이버로고'
                                    />
                                    네이버로 로그인
                                </Button>
                                {/* 네이버그린 #03C75A */}
                                <a href={KAKAO_AUTH_URL} style={{ textDecoration: "none" }}>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        sx={{ mb: 2 }}
                                        style={{ backgroundColor: "#FEE500", color: "#000000" }}
                                        to={KAKAO_AUTH_URL}>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/img/kakaolink_btn_small.png`}
                                            width='24px'
                                            alt='카카오로고'
                                        />
                                        카카오로 로그인
                                    </Button>
                                </a>
                                {/* 카카오옐로 #FEE500 */}
                                <Typography variant='body2' align='center' sx={{ color: "#aeaeae" }}>
                                    펫투닥터가 처음이신가요?
                                </Typography>
                                <Link href='UserJoin' variant='body2'>
                                    <Typography variant='body2' align='center' sx={{ color: "#309FB3" }}>
                                        회원가입
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default UserLoginModal;

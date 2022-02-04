import React from 'react';
import { Box, Button, Container, Grid, Link, Paper, Typography } from '@mui/material';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const newTheme = createTheme({
  palette: {
    primary: {
      main: '#309FB3',
    },
  },
  typography: {
    h5: {
      fontWeight: 800,
    },
    subtitle1: {
      fontSize: '1.3rem',
    }
  }
});
const userEmail = 'petToDoctor@test.com';
function UserSignupConfirm(props) {
  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <Container maxWidth="1200px" align="center" sx={{ pt: 8, height: '100vh' }} style={{backgroundColor: "#F5F6F7"}}>
          <img src="img/web_logo_mid.png" alt="펫투닥터로고" height="74px" />
          <Grid component={Paper} elevation={0} sx={{ mt: 4, p: 4}} xs={12} md={8}>
            <DraftsOutlinedIcon sx={{ fontSize: 110, color: '#309FB3', mt:4, }}/>
            <Typography variant="h5" component="h1" sx={{ mb: 2}}>
              이메일 인증
            </Typography>
            <Typography variant="subtitle1" component="subtitle1">
              인증 메일이 <b>{userEmail}</b>(으)로 전송되었습니다.<br/>
              받으신 이메일을 열어 버튼을 클릭하면 가입이 완료됩니다.
            </Typography>
            <Typography sx={{ my:2 }} style={{ fontSize: '14px' }}>
              이메일 주소를 잘못 입력하신 경우<br/>
              <Link href="#" variant="body1" sx={{color:"#309FB3"}} underline="hover">
                ‘고객문의’
              </Link>
              &nbsp;로 이메일 주소 수정을 요청해 주시기 바랍니다.
            </Typography>
            <Button
              variant="contained"
              style={{width: "176px"}}
            >메인으로 가기</Button>
            <Typography sx={{ my:4 }} style={{ fontSize: '12px' }}>
              이메일이 오지 않았을 때는?<br/>
              스팸편지함 확인 또는&nbsp;
              <Link href="#" variant="body1" sx={{color:"#309FB3"}} style={{ fontSize: '12px' }}>
                인증 메일 다시 보내기
              </Link>
            </Typography>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default UserSignupConfirm;
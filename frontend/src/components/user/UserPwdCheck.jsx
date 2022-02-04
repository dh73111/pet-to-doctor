import React from "react";
import { Typography, Box, Container, TextField, Button } from "@mui/material";

function UserPwdCheck(props) {
  return (
    <div>
      <Container align="center" sx={{ pt: 10, pb: 10, height: "10vh" }}>
        <Typography
          component="h1"
          variant="h4"
          align="left"
          color="text.primary"
          gutterBottom
        >
          비밀번호 확인
        </Typography>
      </Container>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom component="div">
          비밀번호 확인
        </Typography>
        <Typography>
          회원님의 소중한 정보 보호를 위해 닥터투펫 현재 비밀번호를
          확인해주세요.
        </Typography>
        <TextField
          size="small"
          placeholder="비밀번호"
          required //값 반드시 입력
          type="password"
          name="password"
          margin="normal"
          style={{
            maxWidth: "350px",
            minWidth: "350px",
          }}
        ></TextField>
        <br />
        <Button
          variant="outlined"
          style={{
            maxWidth: "350px",
            minWidth: "350px",
          }}
        >
          확인
        </Button>
      </Box>
    </div>
  );
}

export default UserPwdCheck;

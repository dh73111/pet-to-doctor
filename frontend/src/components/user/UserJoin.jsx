import React, { useState, useRef } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  InputAdornment,
  Modal,
} from "@mui/material";
import logo from "../../components/logo.png";
import DaumPostCode from "react-daum-postcode";
import UserFindAddress from "./UserFindAddress";

function UserJoin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // handler 함수들
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: 7,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} />
        <Typography mt={5} align="left" component="h1" variant="h6">
          이메일
        </Typography>
        <TextField
          style={{ width: 400 }}
          margin="dense"
          placeholder="example@example.com"
          required //값 반드시 입력
          type={email}
          id="email"
          name="email"
          autoComplete="email" // 모바일에서 이메일 자동으로 입력할 수 있도록 해줌
          autoFocus // 화면에서 바로 커서가 이 곳으로 이동
        />
        <Typography component="h1" variant="h6">
          비밀번호
        </Typography>
        <TextField
          style={{ width: 400 }}
          margin="dense"
          placeholder="비밀번호 입력"
          required //값 반드시 입력
          type="password"
          id="password"
          name="password"
        />
        <Typography component="h1" variant="h6">
          비밀번호 재확인
        </Typography>
        <TextField
          style={{ width: 400 }}
          margin="dense"
          placeholder="비밀번호 재확인"
          required //값 반드시 입력
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        <Typography component="h6" variant="h6">
          이름
        </Typography>
        <TextField
          style={{ width: 400 }}
          margin="dense"
          placeholder="이름"
          required //값 반드시 입력
          type={name}
          id="name"
          name="name"
        />
        <Typography component="h1" variant="h6">
          휴대전화
        </Typography>
        <TextField
          style={{ width: 400 }}
          margin="dense"
          placeholder="01012345678"
          required //값 반드시 입력
          type={number}
          id="number"
          name="number"
        />
        <Typography component="h1" variant="h6">
          주소
        </Typography>
        <UserFindAddress />
        <TextField style={{ width: 400 }} margin="dense" label={""} />
        <Typography mt={5} align="right" component="h1" variant="h6">
          반려동물 정보(선택)
        </Typography>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid>
            <Typography mt={3} align="right" component="h1" variant="h6">
              이름
            </Typography>
          </Grid>
          <Grid>
            <TextField style={{ width: 400 }} margin="dense" label={""} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid>
            <Typography mt={3} align="right" component="h1" variant="h6">
              생년월일
            </Typography>
          </Grid>
          <Grid>
            <TextField style={{ width: 400 }} margin="dense" label={""} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid>
            <Typography mt={3} align="right" component="h1" variant="h6">
              종
            </Typography>
          </Grid>
          <Grid>
            <TextField style={{ width: 400 }} margin="dense" label={""} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid>
            <Typography mt={3} align="right" component="h1" variant="h6">
              몸무게
            </Typography>
          </Grid>
          <Grid>
            <TextField
              style={{ width: 400 }}
              margin="dense"
              label={""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="success" sx={{ mt: 5 }}>
          반려동물 추가하기
        </Button>
        <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
          가입하기
        </Button>
      </Box>
    </div>
  );
}

export default UserJoin;

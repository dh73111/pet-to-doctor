import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Tabs,
  Tab,
  Paper,
  createTheme,
  ThemeProvider,
  TextField,
  Button,
  Link,
  Modal,
} from "@mui/material";

import PropTypes from "prop-types";
import logo from "../../components/logo.png";
import DaumPostCode from "react-daum-postcode";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const newTheme = createTheme();

function UserMypageChange(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");

  // 주소 찾기
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 1,
    p: 2,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zonecode = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      zonecode += data.zonecode;
    }
    setAddress(fullAddress);
    setZipcode(data.zonecode);
    setCity(data.sido);
    console.log(fullAddress);
    //fullAddress -> 전체 주소반환
  };
  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <Container align="center" sx={{ pt: 10, pb: 10, height: "10vh" }}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom
          >
            마이페이지(회원정보)
          </Typography>
        </Container>
        <Container
          sx={{
            width: "70%",
            align: "center",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="회원정보 수정" {...a11yProps(0)} />
              <Tab label="비밀번호 변경" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Paper sx={{ p: 2, margin: "auto", maxWidth: 900, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <img src={logo} />
                  <br />
                  <Button variant="outlined">이미지 수정</Button>
                </Grid>
                <Grid item>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    pb={1}
                  >
                    닉네임
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    pb={1}
                  >
                    이메일
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    pb={1}
                  >
                    연락처
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    pb={1}
                  >
                    주소
                  </Typography>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <TextField
                        size="small"
                        placeholder="닉네임"
                        required //값 반드시 입력
                        name="nickname"
                      />
                      <br />
                      <TextField
                        size="small"
                        placeholder="example@example.com"
                        required //값 반드시 입력
                        name="email"
                      />

                      <br />
                      <TextField
                        size="small"
                        placeholder="number"
                        required //값 반드시 입력
                        name="number"
                      />
                      <br />
                      <TextField
                        size="small"
                        required //값 반드시 입력
                        name="address"
                        disabled
                        value={address}
                      ></TextField>
                      <TextField
                        size="small"
                        placeholder="상세주소"
                        required //값 반드시 입력
                        name="addressdetail"
                      />
                      <Button onClick={handleOpen}>주소 검색</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <DaumPostCode
                            onComplete={handleComplete}
                            className="post-code"
                          />
                        </Box>
                      </Modal>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper sx={{ p: 2, margin: "auto", maxWidth: "30%", flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column">
                    <Grid item xs={5}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        pb={1}
                        align="center"
                      >
                        새로 사용할 비밀번호를 입력해주세요
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        align="left"
                      >
                        현재 비밀번호{""}
                        <Link href="#">{"비밀번호 변경 안내"}</Link>
                      </Typography>
                      <Box
                        textAlign="center"
                        sx={{
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          size="small"
                          placeholder="비밀번호"
                          required //값 반드시 입력
                          type="password"
                          name="password"
                        />{" "}
                      </Box>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        align="left"
                      >
                        새 비밀번호
                      </Typography>
                      <Box
                        textAlign="center"
                        sx={{
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          size="small"
                          placeholder="비밀번호"
                          required //값 반드시 입력
                          name="password"
                          type="password"
                        />{" "}
                      </Box>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        align="left"
                      >
                        새 비밀번호 확인
                      </Typography>
                      <Box
                        textAlign="center"
                        sx={{
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          size="small"
                          placeholder="비밀번호"
                          required //값 반드시 입력
                          type="password"
                          name="password"
                        />{" "}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
          <Box textAlign="center">
            <Button variant="outlined"> 수정 완료</Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default UserMypageChange;

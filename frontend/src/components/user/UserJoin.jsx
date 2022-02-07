import React, { useState, useRef, useEffect } from "react";
import { Typography, Grid, Button, Box, TextField, InputAdornment, Modal } from "@mui/material";
import logo from "../../components/logo.png";
import DaumPostCode from "react-daum-postcode";
import { border } from "@mui/system";
import { registerUser, userInfo } from "../../api/user.js";
import { PestControl } from "@mui/icons-material";
function UserJoin(props) {
    const [values, setValues] = useState({
        email: "",
        password: "",
        name: "",
        tel: "",
        address: {
            zipcode: "",
            city: "",
            street: "",
        },
        pets: [],
    });

    const [user, setUser] = useState({});

    const [addressDetail, setAddress] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [pet, setPet] = useState({ name: "test", birthDate: "2022-02-07", species: "test", weight: "11" });
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
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        console.log(fullAddress, data.zonecode, data.sido);
        setValues({ ...values, ["address"]: { street: fullAddress, zipcode: data.zonecode, city: data.sido } });
        console.log(values);
        handleClose();
        //fullAddress -> 전체 주소반환
    };

    // useEffect(() => {
    //     userInfo(221, (data) => {
    //         setUser(data.data);
    //     });
    // }, []);
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
                <img src={logo} alt="로고" />
                <Typography mt={5} align="left" component="h1" variant="h6">
                    이메일
                </Typography>
                <TextField
                    style={{ width: 350 }}
                    margin="dense"
                    placeholder="example@example.com"
                    required //값 반드시 입력
                    type={values.email}
                    id="email"
                    name="email"
                    autoComplete="email" // 모바일에서 이메일 자동으로 입력할 수 있도록 해줌
                    autoFocus // 화면에서 바로 커서가 이 곳으로 이동
                    value={values.email}
                    onChange={handleChange("email")}
                />
                <Typography component="h1" variant="h6">
                    비밀번호
                </Typography>
                <TextField
                    style={{ width: 350 }}
                    margin="dense"
                    placeholder="비밀번호 입력"
                    required //값 반드시 입력
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange("password")}
                />
                <Typography component="h1" variant="h6">
                    비밀번호 재확인
                </Typography>
                <TextField
                    style={{ width: 350 }}
                    margin="dense"
                    placeholder="비밀번호 재확인"
                    required //값 반드시 입력
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    // onChange={handleChange("confirmPassword")}
                />
                <Typography component="h6" variant="h6">
                    이름
                </Typography>
                <TextField
                    style={{ width: 350 }}
                    margin="dense"
                    placeholder="이름"
                    required //값 반드시 입력
                    type={values.name}
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                />
                <Typography component="h1" variant="h6">
                    휴대전화
                </Typography>
                <TextField
                    style={{ width: 350 }}
                    margin="dense"
                    placeholder="01012345678"
                    required //값 반드시 입력
                    type={values.tel}
                    id="tel"
                    name="tel"
                    value={values.tel}
                    onChange={handleChange("tel")}
                />
                <Box>
                    <Box>
                        <Typography align="center" component="h1" variant="h6">
                            주소
                        </Typography>
                        <Button onClick={handleOpen}>주소 검색</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <DaumPostCode onComplete={handleComplete} className="post-code" />
                            </Box>
                        </Modal>
                    </Box>
                    <TextField style={{ width: 350 }} value={values.address.street} margin="dense" disabled></TextField>
                </Box>
                <TextField
                    style={{ width: 350 }}
                    margin="dense"
                    placeholder="상세 주소"
                    required //값 반드시 입력
                    id="addressdetail"
                    name="addressdetail"
                    value={addressDetail}
                    onChange={handleAddressChange}
                />
                <Typography mt={5} align="right" component="h1" variant="h6">
                    반려동물 정보(선택입력사항)
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
                        <TextField style={{ width: 350 }} margin="dense" />
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
                        <TextField style={{ width: 350 }} margin="dense" />
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
                        <TextField style={{ width: 350 }} margin="dense" />
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
                            style={{ width: 350 }}
                            margin="dense"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ mt: 3 }}
                    onClick={() => {
                        let pets = { ...values }.pets;
                        pets.push(pet);
                        setValues({ ...values, ["pets"]: pets });
                        console.log(values);
                        registerUser(
                            values,
                            () => {
                                console.log("success");
                            },
                            () => {
                                console.log("fail");
                            }
                        );
                    }}
                >
                    가입하기
                </Button>
            </Box>
        </div>
    );
}

export default UserJoin;

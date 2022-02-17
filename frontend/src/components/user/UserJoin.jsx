import React, { useState } from "react";
import { Typography, Grid, Button, Box, TextField, InputAdornment, Modal, Stack, Divider } from "@mui/material";
import logo from "../../components/logo.png";
import DaumPostCode from "react-daum-postcode";
import { border } from "@mui/system";
import { registerUser } from "../../api/user.js";
import { ElevenMpTwoTone, PestControl } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

function UserJoin(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        tel: "",
        address: {
            zipcode: "",
            city: "",
            street: "",
        },
        pets: [],
    });
    const [telError, setTelError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [user, setUser] = useState({});
    const handleStreetChange = (prop) => (event) => {
        setValues({
            ...values,
            address: {
                city: values.address.city,
                zipcode: values.address.zipcode,
                street: event.target.value,
            },
        });
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(prop);
        if (prop === "email") {
            let emailVal = event.target.value;
            let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
            if (emailVal.match(regExp) != null) {
                setEmailError("");
            } else {
                setEmailError("이메일을 정확히 입력해주세요");
            }
        }
        if (prop === "tel") {
            let telVal = event.target.value;
            let regExp = /(\d{11})/;
            if (telVal.match(regExp) != null) {
                setTelError("");
            } else {
                setTelError("전화번호를 정확히 입력해주세요");
            }
        }
        console.log(event.target.value);
        if (prop === "confirmPassword") {
            if (values.password !== event.target.value) {
                setPasswordError("비밀번호 불일치");
            } else {
                setPasswordError("");
            }
        }
    };
    async function userRegister(user) {
        await registerUser({
            email: user.email,
            password: user.password,
            name: user.name,
            tel: user.tel,
            address: {
                zipcode: user.address.zipcode,
                city: user.address.city,
                street: user.address.street,
            },
            pets: [
                {
                    name: user.pets[0].name,
                    birthDate: user.pets[0].birthDate,
                    species: user.pets[0].species,
                    weight: user.pets[0].weight,
                },
            ],
        });
        dispatch({ type: "register" });
        alert("가입 성공");
        navigate(`/petodoctor`);
    }

    const [pet, setPet] = useState({
        name: "",
        birthDate: "2022-02-07",
        species: "",
        weight: "",
    });

    const handlePetChange = (prop) => (event) => {
        setPet({ ...pet, [prop]: event.target.value });
        console.log(pet);
    };
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
    // const handleAddressChange = (event) => {
    //     setAddress(event.target.value);
    // };
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
        setValues({
            ...values,
            address: { city: fullAddress, zipcode: data.zonecode },
        });
        // console.log(values);
        handleClose();
        //fullAddress -> 전체 주소반환
    };

    const textFieldStyle = {
        backgroundColor: "#FBFBFD",
        width: "280px",
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    paddingTop: 7,
                    flexDirection: "column",
                    alignItems: "center",
                    width: "600px",
                    mx: "auto",
                    mb: 20,
                }}>
                <img src={logo} alt='로고' style={{ marginBottom: "40px" }} />
                {/* <Typography mt={5} align='left' component='h1' variant='h6'>
                    이메일
                </Typography> */}
                <Typography align='center' component='h2' sx={{ fontSize: "18px", fontWeight: "700", mb: 2 }}>
                    회원 정보
                </Typography>
                <Box>
                    <label
                        for='email'
                        className='input_required'
                        style={{
                            display: "block",
                            float: "left",
                            width: "90px",
                            textAlign: "left",
                            lineHeight: "55px",
                            marginRight: "20px",
                        }}>
                        이메일
                    </label>
                    <TextField
                        style={{ width: 280 }}
                        margin='dense'
                        placeholder='example@example.com'
                        required //값 반드시 입력
                        type={values.email}
                        id='email'
                        name='email'
                        autoComplete='email' // 모바일에서 이메일 자동으로 입력할 수 있도록 해줌
                        autoFocus // 화면에서 바로 커서가 이 곳으로 이동
                        value={values.email}
                        onChange={handleChange("email")}
                        error={emailError !== ""}
                        size='small'
                        sx={textFieldStyle}
                    />
                    <Typography style={{ color: "red", fontSize: "14px" }}>{emailError}</Typography>
                </Box>

                {/* <Typography component='h1' variant='h6'>
                    비밀번호
                </Typography> */}
                <Box>
                    <label
                        for='password'
                        className='input_required'
                        style={{
                            display: "block",
                            float: "left",
                            width: "90px",
                            textAlign: "left",
                            lineHeight: "55px",
                            marginRight: "20px",
                        }}>
                        비밀번호
                    </label>
                    <TextField
                        style={{ width: 280 }}
                        margin='dense'
                        placeholder='비밀번호 입력'
                        required //값 반드시 입력
                        type='password'
                        id='password'
                        name='password'
                        value={values.password}
                        onChange={handleChange("password")}
                        size='small'
                        sx={textFieldStyle}
                    />
                </Box>
                {/* <Typography component='h1' variant='h6'>
                    비밀번호 재확인
                </Typography> */}
                <Box>
                    <label
                        for='confirmPassword'
                        className='input_required'
                        style={{
                            display: "block",
                            float: "left",
                            width: "100px",
                            textAlign: "left",
                            lineHeight: "55px",
                            marginRight: "10px",
                        }}>
                        비밀번호 확인
                    </label>
                    <TextField
                        style={{ width: 280 }}
                        margin='dense'
                        placeholder='비밀번호 재확인'
                        required //값 반드시 입력
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={values.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        error={passwordError !== ""}
                        size='small'
                        sx={textFieldStyle}
                    />
                    <Typography style={{ color: "red", fontSize: "14px" }}>{passwordError}</Typography>
                </Box>
                {/* <Typography component='h6' variant='h6'>
                    이름
                </Typography> */}
                <Box>
                    <label
                        for='name'
                        className='input_required'
                        style={{
                            display: "block",
                            float: "left",
                            width: "100px",
                            textAlign: "left",
                            lineHeight: "55px",
                            marginRight: "10px",
                        }}>
                        이름
                    </label>
                    <TextField
                        style={{ width: 280 }}
                        margin='dense'
                        placeholder='이름'
                        required //값 반드시 입력
                        type={values.name}
                        id='name'
                        name='name'
                        value={values.name}
                        onChange={handleChange("name")}
                        size='small'
                        sx={textFieldStyle}
                    />
                </Box>
                {/* <Typography component='h1' variant='h6'>
                    휴대전화
                </Typography> */}
                <Box>
                    <label
                        for='tel'
                        className='input_required'
                        style={{
                            display: "block",
                            float: "left",
                            width: "100px",
                            textAlign: "left",
                            lineHeight: "55px",
                            marginRight: "10px",
                        }}>
                        휴대전화
                    </label>
                    <TextField
                        style={{ width: 280 }}
                        margin='dense'
                        placeholder='01012345678'
                        required //값 반드시 입력
                        type={values.tel}
                        id='tel'
                        name='tel'
                        value={values.tel}
                        onChange={handleChange("tel")}
                        error={telError !== ""}
                        size='small'
                        sx={textFieldStyle}
                    />
                    <Typography style={{ color: "red", fontSize: "14px" }}>{telError}</Typography>
                </Box>
                <Box>
                    <Box>
                        {/* <Typography align='center' component='h1' variant='h6'>
                            주소
                        </Typography> */}
                        <label
                            for='street'
                            className='input_required'
                            style={{
                                display: "block",
                                float: "left",
                                width: "100px",
                                textAlign: "left",
                                lineHeight: "55px",
                                marginRight: "10px",
                            }}>
                            주소
                        </label>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby='modal-modal-title'
                            aria-describedby='modal-modal-description'>
                            <Box sx={style}>
                                <DaumPostCode onComplete={handleComplete} className='post-code' />
                            </Box>
                        </Modal>
                        <TextField
                            // style={{ width: 280 }}
                            value={values.address.city}
                            placeholder='주소를 검색해주세요'
                            margin='dense'
                            disabled
                            sx={{ backgroundColor: "#FBFBFD" }}
                            size='small'></TextField>
                        <Button onClick={handleOpen} sx={{ mt: 1 }}>
                            주소 검색
                        </Button>
                    </Box>
                    <TextField
                        sx={textFieldStyle}
                        margin='dense'
                        placeholder='상세 주소'
                        required //값 반드시 입력
                        id='street'
                        name='street'
                        value={values.address.street}
                        onChange={handleStreetChange("street")}
                        size='small'
                    />
                </Box>
                <Typography mt={5} align='center' component='h2' sx={{ fontSize: "18px", fontWeight: "600", mb: 2 }}>
                    반려동물 정보(선택입력사항)
                </Typography>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    {/* <Grid>
                        <Typography mt={3} align='right' component='h1' variant='h6'>
                            이름
                        </Typography>
                    </Grid> */}
                    <Grid>
                        <label
                            for='name'
                            style={{
                                display: "block",
                                float: "left",
                                width: "100px",
                                textAlign: "left",
                                lineHeight: "55px",
                                marginRight: "10px",
                            }}>
                            이름
                        </label>
                        <TextField
                            style={{ width: 280 }}
                            placeholder='반려동물 이름'
                            margin='dense'
                            id='name'
                            name='name'
                            value={pet.name}
                            onChange={handlePetChange("name")}
                            size='small'
                            sx={textFieldStyle}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 1,
                    }}>
                    <Grid>
                        {/* <Typography mt={3} align='right' component='h1' variant='h6'>
                            생년월일
                        </Typography> */}
                        <label
                            for='date'
                            style={{
                                display: "block",
                                float: "left",
                                width: "100px",
                                textAlign: "left",
                                lineHeight: "55px",
                                marginRight: "10px",
                            }}>
                            생년월일
                        </label>
                        {/* <Stack component='form' noValidate spacing={3}> */}
                        <TextField
                            id='date'
                            type='date'
                            defaultValue='2022-02-01'
                            sx={textFieldStyle}
                            value={pet.birthDate}
                            onChange={handlePetChange("birthDate")}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size='small'
                        />
                        {/* </Stack> */}
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    {/* <Grid>
                        <Typography mt={3} align='right' component='h1' variant='h6'>
                            종
                        </Typography>
                    </Grid> */}
                    <Grid>
                        <label
                            for='species'
                            style={{
                                display: "block",
                                float: "left",
                                width: "100px",
                                textAlign: "left",
                                lineHeight: "55px",
                                marginRight: "10px",
                            }}>
                            종
                        </label>
                        <TextField
                            placeholder='종'
                            sx={textFieldStyle}
                            margin='dense'
                            id='species'
                            name='species'
                            value={pet.species}
                            onChange={handlePetChange("species")}
                            size='small'
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    {/* <Grid>
                        <Typography mt={3} align='right' component='h1' variant='h6'>
                            몸무게
                        </Typography>
                    </Grid> */}
                    <Grid>
                        <label
                            for='weight'
                            style={{
                                display: "block",
                                float: "left",
                                width: "100px",
                                textAlign: "left",
                                lineHeight: "55px",
                                marginRight: "10px",
                            }}>
                            몸무게
                        </label>
                        <TextField
                            placeholder='몸무게'
                            sx={textFieldStyle}
                            margin='dense'
                            id='weight'
                            name='weight'
                            value={pet.weight}
                            onChange={handlePetChange("weight")}
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
                            }}
                            size='small'
                        />
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    sx={{ mt: 3 }}
                    onClick={() => {
                        if (emailError !== "") {
                            alert("이메일을 확인해주세요");
                        } else if (passwordError !== "") {
                            alert("비밀번호를 확인해주세요");
                        } else if (telError !== "") {
                            alert("전화번호를 확인해주세요");
                        } else {
                            let newValues = { ...values };
                            newValues.pets.push(pet);
                            setValues(newValues);
                            console.log(values);
                            userRegister(values);
                        }
                    }}>
                    가입하기
                </Button>
            </Box>
        </Box>
    );
}

export default UserJoin;

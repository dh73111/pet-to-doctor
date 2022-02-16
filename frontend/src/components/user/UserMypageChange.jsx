import React, { useEffect, useState } from "react";
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
    Modal,
    Input,
    InputAdornment,
    IconButton,
    OutlinedInput,
} from "@mui/material";
import { useLocation, useParams, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../components/logo.png";
import DaumPostCode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { modifyUser, modifyUserPic, checkPassword, changePassword } from "../../api/user.js";
import { modifyPetPic } from "api/pet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
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
    const location = useLocation(); // 넘겨주는 user값 location으로 주소
    const [newUserInfo, setNewUserInfo] = useState({
        name: location.state.name,
        tel: location.state.tel,
        joinDate: location.state.joinDate,
        address: {
            city: location.state.address.city,
            street: location.state.address.street,
            zipcode: location.state.address.zipcode,
        },
        isCertificated: true,
    });
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [onLoad, setOnLoad] = useState(false);
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const store = useSelector((store) => store.user);
    const [passwords, setPasswords] = useState({
        password: "",
        newPassword: "",
        newPasswordConf: "",
    });
    const [passwordError, setPasswordError] = useState("");
    const [modImg, setModImg] = useState(`${process.env.PUBLIC_URL}/img/main.png`);
    const [profileSend, setProfileSend] = useState();

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

    useEffect(() => {
        setAddress(location.state.address.city);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleComplete = (data) => {
        console.log(data, "from handle complete");
        let fullAddress = data.address;
        let extraAddress = "";
        let zonecode = "";
        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
            zonecode += data.zonecode;
        }
        setAddress(fullAddress);
        setZipcode(data.zonecode);
        setCity(data.sido);
        console.log(fullAddress);
        setNewUserInfo({ ...newUserInfo, address: { city: fullAddress, zipcode: data.zonecode } });
        console.log(newUserInfo);
        //fullAddress -> 전체 주소반환
    };

    const handleChangeUserInfo = (dataTitle) => (e) => {
        const data = e.target.value;
        setChanged(true);
        if (dataTitle == "city" || dataTitle == "street") {
            setNewUserInfo({ ...newUserInfo, address: { ...newUserInfo.address, [dataTitle]: data } });
        } else {
            setNewUserInfo({ ...newUserInfo, [dataTitle]: data });
        }
    };

    const handlePasswords = (pwTitle) => (e) => {
        setChanged(true);
        console.log(pwTitle, e.target.value);
        if (pwTitle === "newPasswordConf") {
            if (passwords.newPassword !== e.target.value) {
                setPasswordError("비밀번호 불일치");
            } else {
                setPasswordError("비밀번호 일치");
            }
        }
        setPasswords({ ...passwords, [pwTitle]: e.target.value });
    };

    const requestChangeInfo = async () => {
        setChanged(true);
        const response = await modifyUser(newUserInfo);
        window.location.href = "https://i6b209.p.ssafy.io/petodoctor/usermypage";
        console.log(response);
    };

    const requestPwChange = async () => {
        setChanged(true);
        const prev = passwords.password;
        console.log(prev, "비번체크할것");
        const currentPwConf = await checkPassword(prev);
        console.log(currentPwConf.data.result, "checkpassword result");
        if (currentPwConf.data.result === true) {
            if (passwordError === "비밀번호 일치") {
                const changePw = await changePassword(passwords);
                console.log(changePw, "비번변경완료");
                alert("비밀번호가 성공적으로 변경되었습니다.");
                window.location.href = "https://i6b209.p.ssafy.io/petodoctor/usermypage";
            } else {
                alert("새로운 비밀번호와 확인이 일치하지 않습니다.");
            }
        } else {
            alert("현재 비밀번호를 확인 해 주세요.");
        }
    };
    const encodeFileToBase64 = (fileBloab) => {
        setChanged(true);
        const reader = new FileReader();
        reader.readAsDataURL(fileBloab);
        return new Promise((resolv) => {
            reader.onload = () => {
                setModImg(reader.result);
                resolv();
            };
        });
    };

    const changeProfilePic = () => {
        console.log(profileSend);
        setChanged(true);
        const fd = new FormData();
        Object.profileSend.forEach((file) => fd.append("profileImgUrl", file));
        console.log(fd, "");
        alert("프로필변경이완료되었습니다");
    };

    const [changed, setChanged] = useState(false);
    const [showPassword, setShowPassword] = useState({
        password: false,
        newPassword: false,
        newPasswordConf: false,
    });
    const handleClickShowPassword = (category, value) => {
        setShowPassword({ ...showPassword, [category]: !value });
    };
    console.log(store.id);

    return (
        <ThemeProvider theme={newTheme}>
            <Container sx={{ mb: 20 }}>
                <form
                    action={`https://i6b209.p.ssafy.io:8443/api/user/profile/${store.id}`}
                    method='post'
                    enctype='multipart/form-data'
                    target='param'>
                    <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600, color: "#263747" }}>
                        회원정보 변경
                    </Typography>
                    <Box sx={{ border: "1px solid #D7E2EB", p: 3, borderRadius: "0.55rem" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                                <Tab label='회원정보 수정' {...a11yProps(0)} />
                                <Tab label='비밀번호 변경' {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Grid container spacing={2} sx={{ p: 3 }}>
                                <Grid item xs={12} md={5} sx={{}}>
                                    <div
                                        className='preview'
                                        style={{
                                            borderRadius: "250px",
                                            width: "250px",
                                            height: "250px",
                                            backgroundImage: `url(${modImg})`,
                                            backgroundSize: "cover",
                                            position: "relative",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            textAlign: "center",
                                        }}>
                                        {/* {modImg && <img src={modImg} alt="preview-img" />} */}
                                        <label for='input_profile'>
                                            <AddCircleIcon
                                                sx={{
                                                    fontSize: "40px",
                                                    position: "absolute",
                                                    right: "20px",
                                                    bottom: "10px",
                                                    cursor: "pointer",
                                                    color: "#309fb3",
                                                    backgroundColor: "white",
                                                    borderRadius: "40px",
                                                }}
                                            />
                                        </label>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            id='input_profile'
                                            name='profileImgUrl'
                                            onChange={(e) => {
                                                console.log(e.target);
                                                encodeFileToBase64(e.target.files[0]);
                                                console.log(e.target.files, "온체인지");
                                                setProfileSend(e.target.files[0]);
                                            }}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    {/* <button
                                    // variant="outlined"
                                    onClick={() => {
                                        // testProfile(e);
                                        changeProfilePic();
                                    }}
                                    // disabled={modImg === ""}
                                >
                                    프로필사진 변경
                                </button> */}
                                    {/* <Input type="file" /> */}
                                </Grid>
                                <Grid item xs={12} md={7} container>
                                    <Box sx={{ marginTop: { xs: "50px", md: 0 } }}>
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
                                            size='small'
                                            placeholder='이름'
                                            required //값 반드시 입력
                                            name='nickname'
                                            defaultValue={newUserInfo.name}
                                            onChange={handleChangeUserInfo("name")}
                                            sx={{ backgroundColor: "#FBFBFD" }}
                                        />
                                    </Box>
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
                                            size='small'
                                            placeholder={store.email}
                                            enabled
                                            name='email'
                                            defaultValue={newUserInfo.email}
                                            onChange={handleChangeUserInfo("email")}
                                            sx={{ backgroundColor: "#FBFBFD" }}
                                        />
                                    </Box>
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
                                            size='small'
                                            placeholder='휴대전화'
                                            required //값 반드시 입력
                                            name='tel'
                                            defaultValue={newUserInfo.tel}
                                            onChange={handleChangeUserInfo("tel")}
                                        />
                                    </Box>
                                    <Box>
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
                                        <TextField
                                            size='small'
                                            required //값 반드시 입력
                                            name='address'
                                            disabled
                                            placeholder='주소'
                                            value={newUserInfo.address.city}
                                            onChange={handleChangeUserInfo("city")}
                                            sx={{ mr: 1, backgroundColor: "#FBFBFD" }}
                                        />
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
                                            size='small'
                                            placeholder='상세주소'
                                            required //값 반드시 입력
                                            name='addressdetail'
                                            defaultValue={newUserInfo.address.street}
                                            onChange={handleChangeUserInfo("street")}
                                            sx={{ backgroundColor: "#FBFBFD" }}
                                        />
                                        <Button onClick={handleOpen}>주소 검색</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box textAlign='center' sx={{ mt: 5 }}>
                                <Button
                                    variant='contained'
                                    disabled={!changed}
                                    type='submit'
                                    onClick={() => {
                                        requestChangeInfo(newUserInfo);
                                    }}>
                                    수정 완료
                                </Button>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Container>
                                <Typography gutterBottom variant='subtitle1' component='div' pt={1.5} align='center'>
                                    새로 사용할 비밀번호를 입력해주세요
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        paddingTop: 3,
                                        flexDirection: "column",
                                        alignItems: "center",
                                        maxWidth: "600px",
                                        mx: "auto",
                                    }}>
                                    <Box sx={{ mt: 2 }}>
                                        <label
                                            for='password'
                                            className='input_required'
                                            style={{
                                                display: "block",
                                                float: "left",
                                                width: "140px",
                                                textAlign: "left",
                                                lineHeight: "40px",
                                                marginRight: "20px",
                                            }}>
                                            비밀번호
                                        </label>
                                        <OutlinedInput
                                            size='small'
                                            required
                                            sx={{ backgroundColor: "#FBFBFD", width: "224px" }}
                                            placeholder='비밀번호'
                                            type={showPassword.password ? "text" : "password"}
                                            value={passwords.password}
                                            onChange={handlePasswords("password")}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={(e) => {
                                                            handleClickShowPassword("password", showPassword.password);
                                                        }}
                                                        edge='end'>
                                                        {showPassword.password ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <label
                                            for='NewPassword'
                                            className='input_required'
                                            style={{
                                                display: "block",
                                                float: "left",
                                                width: "150px",
                                                textAlign: "left",
                                                lineHeight: "40px",
                                                marginRight: "10px",
                                            }}>
                                            새 비밀번호
                                        </label>
                                        <OutlinedInput
                                            size='small'
                                            required
                                            name='NewPassword'
                                            sx={{ backgroundColor: "#FBFBFD", width: "224px" }}
                                            placeholder='비밀번호'
                                            type={showPassword.newPassword ? "text" : "password"}
                                            value={passwords.newPassword}
                                            onChange={handlePasswords("newPassword")}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={() => {
                                                            handleClickShowPassword(
                                                                "newPassword",
                                                                showPassword.newPassword
                                                            );
                                                        }}
                                                        edge='end'>
                                                        {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <label
                                            for='confirmNewPassword'
                                            className='input_required'
                                            style={{
                                                display: "block",
                                                float: "left",
                                                width: "150px",
                                                textAlign: "left",
                                                lineHeight: "40px",
                                                marginRight: "10px",
                                            }}>
                                            새 비밀번호 확인
                                        </label>
                                        <OutlinedInput
                                            size='small'
                                            required
                                            name='newPasswordConf'
                                            sx={{ backgroundColor: "#FBFBFD", width: "224px" }}
                                            placeholder='비밀번호'
                                            type={showPassword.newPasswordConf ? "text" : "password"}
                                            value={passwords.newPasswordConf}
                                            onChange={handlePasswords("newPasswordConf")}
                                            error={passwordError === "비밀번호 불일치"}
                                            color={passwordError === "비밀번호 일치" ? "success" : "primary"}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={() => {
                                                            handleClickShowPassword(
                                                                "newPasswordConf",
                                                                showPassword.newPasswordConf
                                                            );
                                                        }}
                                                        edge='end'>
                                                        {showPassword.newPasswordConf ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <Typography
                                            style={{
                                                color: "red",
                                                fontSize: "14px",
                                                marginTop: "6px",
                                                marginLeft: "50px",
                                                textAlign: "center",
                                            }}>
                                            {passwordError === "비밀번호 불일치" ? "비밀번호 불일치" : ""}
                                        </Typography>
                                        <Typography
                                            style={{
                                                color: "green",
                                                fontSize: "14px",
                                                marginTop: "6px",
                                                marginLeft: "36px",
                                                textAlign: "center",
                                            }}>
                                            {passwordError === "비밀번호 일치" ? "비밀번호 일치" : ""}
                                        </Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                        <Button
                                            sx={{ mt: 13 }}
                                            variant='contained'
                                            onClick={requestPwChange}
                                            disabled={passwordError === "비밀번호 불일치" || passwordError === ""}>
                                            비밀번호 변경
                                        </Button>
                                    </Box>
                                </Box>
                            </Container>
                        </TabPanel>
                    </Box>
                </form>
            </Container>
        </ThemeProvider>
    );
}

export default UserMypageChange;

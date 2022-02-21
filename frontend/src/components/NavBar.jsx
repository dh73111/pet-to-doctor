import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Modal,
    Link,
    Alert,
    Snackbar,
    Dialog,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { NavLink, useNavigate } from "react-router-dom";
import UserLoginModal from "./user/UserLoginModal";
import Banner from "./user/resources/Banner";
import MainSearchBar from "./user/resources/MainSearchBar";
import { PersonOutlineOutlined } from "@mui/icons-material";
import LiveHelpOutlined from "@mui/icons-material/LiveHelpOutlined";
import Alarm from "./Alarm";
import jwtDecode from "jwt-decode";

const pages = [
    { id: 1, path: "/petodoctor/userreservation", name: "내 예약" },
    { id: 2, path: "/petodoctor/hospitalsearch", name: "주변 병원찾기" },
    { id: 3, path: "/petodoctor/review", name: "진료/상담후기" },
    { id: 4, path: "/petodoctor/qna", name: "FAQ" },
];
const doctorpages = [
    { id: 1, path: "/petodoctor/doctorreservation", name: "받은예약" },
    { id: 2, path: "/petodoctor/doctordiagnosis", name: "진료현황" },
    { id: 3, path: "/petodoctor/doctorprescription", name: "처방현황" },
];

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
};

// ------------- 상단 NAVBAR -------------
const NavTop = (props) => {
    const { socket } = props.store;
    const { id } = props.store.user;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const [loginAlert, setLoginAlert] = useState(false);
    const handleLoginAlert = () => {
        console.log("로그인변화스낵");
        setLoginAlert(!loginAlert);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        sessionStorage.clear();
        dispatch({ type: "logout" });
        handleLoginAlert();
        navigate("/petodocor");
    };

    let MyButton = (page, selectedColor) => (
        <Box
            key={page}
            // onClick={() => {
            //     props.clickNav(page.id);
            // }}
            sx={{ color: selectedColor, display: "block" }}>
            <Typography sx={{ fontSize: 17 }}>{page.name}</Typography>
        </Box>
    );

    const NavItem = () => {
        // 네비 모드 바꾸기
        if (mode === "ROLE_USER") {
            return (
                <Box sx={{ width: "100%", display: { xs: "none", md: "flex" }, justifyContent: "space-between" }}>
                    {pages.map((page) => (
                        <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
                            {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
                        </NavLink>
                    ))}
                </Box>
            );
        } else {
            return (
                <Box sx={{ width: "100%", display: { xs: "none", md: "flex" }, justifyContent: "space-between" }}>
                    {doctorpages.map((page) => (
                        <NavLink to={page.path} key={page.path} style={{ textDecoration: "none", textWeight: "bold" }}>
                            {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
                        </NavLink>
                    ))}
                </Box>
            );
        }
    };

    const LoginMenu = (props) => {
        const style = [
            {
                padding: "0 10px",
                textDecoration: "none",
                color: "#5a5a5a",
                fontSize: "14px",
                lineHeight: "42px",
                borderRight: "1px solid",
                borderColor: "#5a5a5a",
                cursor: "pointer",
            },
            {
                textDecoration: "none",
                color: "#5a5a5a",
                fontSize: "14px",
                lineHeight: "42px",
                cursor: "pointer",
            },
        ];
        const isLogin = useSelector((store) => store.isLogin);
        const loginControls = [
            { title: "회원가입", link: "/petodoctor/userjoin" },
            { title: "로그인", link: "/petodoctor", func: handleOpen },
        ];
        const logoutControls = [
            { title: "마이페이지", link: "/petodoctor/usermypage" },
            { title: "로그아웃", link: "/petodoctor" },
        ];
        return (
            <Box sx={{ width: "100%", mb: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", height: "36px" }}>
                    {!isLogin ? (
                        <>
                            <Typography>
                                <NavLink style={style[0]} to='/petodoctor/userjoin'>
                                    회원가입
                                </NavLink>
                            </Typography>
                            <Typography>
                                <Link style={style[0]} onClick={handleOpen}>
                                    로그인
                                </Link>
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography>
                                <NavLink
                                    style={style[0]}
                                    to='/petodoctor/usermypage'
                                    onClick={() => {
                                        if (socket !== undefined) socket.emit("disconnectA", id);
                                    }}>
                                    마이페이지
                                </NavLink>
                            </Typography>
                            <Typography>
                                <NavLink
                                    style={style[0]}
                                    to='/petodoctor'
                                    onClick={() => {
                                        if (socket !== undefined) socket.emit("disconnectA", id);
                                        handleLoginAlert();
                                        logOut();
                                    }}>
                                    로그아웃
                                </NavLink>
                            </Typography>
                        </>
                    )}
                    <Typography sx={{ pl: 1 }}>
                        <NavLink
                            style={style[1]}
                            key={2}
                            to='/petodoctor/qna'
                            onClick={() => {
                                if (socket !== undefined) socket.emit("disconnectA", id);
                            }}>
                            고객센터
                        </NavLink>
                    </Typography>
                </Box>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={loginAlert}
                    onClose={handleLoginAlert}
                    autoHideDuration={1500}
                    // key={vertical + horizontal}
                >
                    <Alert onClose={handleLoginAlert} severity='success' sx={{ width: "100%" }}>
                        로그아웃이 완료되었습니다
                    </Alert>
                </Snackbar>
            </Box>
        );
    };

    const [alarmVisible, setAlarmVisible] = useState();
    const isLogin = useSelector((store) => store.isLogin);
    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlert = () => {
        setAlertOpen(true);
    };
    const handleClick = () => {
        setAlertOpen(false);
    };

    return (
        <Box sx={{ position: "relative", mb: 2 }}>
            <Banner></Banner>
            <Box color='inherit'>
                <Container maxWidth='lg'>
                    <LoginMenu />
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            position: "relative",
                            height: "46px",
                            justifyContent: "space-between",
                        }}>
                        <NavLink
                            to='/petodoctor'
                            onClick={() => {
                                props.clickNav(0);
                            }}>
                            <img src={`${process.env.PUBLIC_URL}/img/web_logo.png`} width='150px' alt='logo' />
                        </NavLink>
                        <MainSearchBar />
                        <Box sx={{ pt: 1, position: "relative" }}>
                            {/* <NavLink to="/petodoctor" className="test"> */}
                            <Tooltip title='알람' arrow>
                                <Box style={{ display: "inline-block" }} className='test'>
                                    {/* <div onClick={() => setAlarmVisible(!alarmVisible)}> */}
                                    {/* </div> */}
                                    <NotificationsNoneIcon
                                        onClick={() => {
                                            if (isLogin === true) {
                                                setAlarmVisible(!alarmVisible);
                                            } else {
                                                handleAlert();
                                            }
                                        }}
                                        sx={{ fontSize: "30px", color: "#1dc6f6" }}
                                    />
                                    {alarmVisible && <Alarm />}
                                </Box>
                            </Tooltip>
                            {/* </NavLink> */}
                            <Tooltip title='마이페이지' arrow>
                                <Box style={{ display: "inline-block" }} className='test'>
                                    <PersonOutlineOutlined
                                        sx={{ fontSize: "30px", color: "#1dc6f6" }}
                                        onClick={() => {
                                            if (isLogin === true) {
                                                navigate("/petodoctor/usermypage");
                                            } else {
                                                handleAlert();
                                            }
                                        }}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title='자주하는 질문' arrow>
                                <NavLink to='/petodoctor/qna' className='test2'>
                                    <LiveHelpOutlined sx={{ fontSize: "30px", color: "#1dc6f6" }} />
                                </NavLink>
                            </Tooltip>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={alertOpen}
                onClose={handleClick}
                autoHideDuration={2000}
                // key={vertical + horizontal}
            >
                <Alert onClose={handleClick} severity='warning' sx={{ width: "100%" }}>
                    로그인 후 이용해주세요
                </Alert>
            </Snackbar>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <UserLoginModal onClose={handleClose}></UserLoginModal>
                </Box>
            </Modal>
        </Box>
    );
};
// ------------- 스크롤 STICKY 하단 NAVBAR -------------
function NavBottom(props) {
    const { socket } = props.store;
    const { id } = props.store.user;
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("");
    const handleClose = () => setOpen(false);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const isLogin = useSelector((store) => store.isLogin);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleCloseNavMenu = (id) => {
        if (id === props.selectNav) props.clickNav(id);
    };

    let MyButton = (page, selectedColor, fontWeight) => (
        <Box
            key={page}
            onClick={() => {
                props.clickNav(page.id);
            }}
            sx={{ color: selectedColor, display: "block" }}>
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>{page.name}</Typography>
        </Box>
    );

    const NavItem = () => {
        // 네비 모드 바꾸기
        const handleClick = () => {
            setAlertOpen(false);
        };
        if (isLogin) {
            const loginres = sessionStorage.getItem("accessToken");
            let decode_token = jwtDecode(loginres);
            setMode(decode_token.role);
        }
        if (mode === "ROLE_DOCTOR") {
            return (
                <Box sx={{ width: "100%", display: { xs: "none", md: "flex" }, justifyContent: "space-between" }}>
                    {doctorpages.map((page) => (
                        <NavLink
                            to={page.path}
                            key={page.path}
                            style={{ textDecoration: "none" }}
                            onClick={() => {
                                if (socket !== undefined) socket.emit("disconnectA", id);
                            }}
                            className='gnb'>
                            {props.selectedNav === page.id ? MyButton(page, "#1dc6f6", "800") : MyButton(page, "black")}
                        </NavLink>
                    ))}
                </Box>
            );
        } else {
            return (
                <Box
                    sx={{
                        width: "100%",
                        display: { xs: "none", md: "flex" },
                        justifyContent: "space-between",
                    }}>
                    {pages.map((page) => (
                        <NavLink
                            to={page.path}
                            key={page.path}
                            style={{ textDecoration: "none" }}
                            className='gnb'
                            onClick={(e) => {
                                if (socket !== undefined) {
                                    socket.emit("disconnectA", id);
                                }
                                if (isLogin === false && page.id === 1) {
                                    setAlertOpen(true);
                                    props.clickNav(page.id);
                                } else {
                                    navigate(page.path);
                                }
                                e.preventDefault();
                            }}>
                            {props.selectedNav === page.id
                                ? MyButton(page, "#1dc6f6", "800")
                                : MyButton(page, "#263747")}
                        </NavLink>
                    ))}
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        open={alertOpen}
                        onClose={handleClick}
                        autoHideDuration={2000}
                        // key={vertical + horizontal}
                    >
                        <Alert onClose={handleClick} severity='warning' sx={{ width: "100%" }}>
                            로그인 후 이용해주세요
                        </Alert>
                    </Snackbar>
                </Box>
            );
        }
    };

    return (
        <Box
            sx={{
                position: "sticky",
                top: 0,
                zIndex: "2",
                borderTop: "1px solid #e7e7e7",
                borderBottom: "1px solid #e7e7e7",
            }}>
            <Box sx={{ backgroundColor: "#fff" }}>
                <Container>
                    <Toolbar>
                        <Typography
                            // 모바일 로고
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
                            <img src={`${process.env.PUBLIC_URL}/img/web_logo.png`} width='150px' alt='logo'></img>
                        </Typography>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                //  모바일화면 햄버거아이콘
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleOpenNavMenu}
                                color='inherit'>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}>
                                {pages.map((page) => (
                                    <NavLink to={page.path} key={page.path} style={{ textDecoration: "none", p: 1 }}>
                                        {props.selectedNav === page.id
                                            ? MyButton(page, "#29A1B1")
                                            : MyButton(page, "black")}
                                    </NavLink>
                                ))}
                            </Menu>
                        </Box>
                        <NavItem />
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby='modal-modal-title'
                            aria-describedby='modal-modal-description'>
                            <Box sx={style}>
                                <UserLoginModal></UserLoginModal>
                            </Box>
                        </Modal>
                    </Toolbar>
                </Container>
            </Box>
        </Box>
    );
}

function NavBar() {
    const [open, setOpen] = useState(false);
    const store = useSelector((store) => store);
    let [selectedNav, setSelectedNav] = useState(0);
    function clickNav(selected) {
        setSelectedNav(selected);
    }
    return (
        <>
            <NavTop selectedNav={selectedNav} store={store} clickNav={clickNav}></NavTop>
            <NavBottom selectedNav={selectedNav} store={store} clickNav={clickNav}></NavBottom>
        </>
    );
}

export default NavBar;

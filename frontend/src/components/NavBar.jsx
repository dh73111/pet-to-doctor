import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import UserLoginModal from "./user/UserLoginModal";
import Banner from "./user/resources/Banner";
const pages = [
    { id: 1, path: "/hospitalsearch", name: "병원찾기" },
    { id: 2, path: "/hospitalreservation", name: "즐겨찾기" },
    { id: 3, path: "/notice", name: "내 예약" },
];
const doctorpages = [
    { id: 1, path: "/doctorreservation", name: "받은예약" },
    { id: 2, path: "/doctordiagnosis", name: "진료현황" },
    { id: 3, path: "/doctorperscripton", name: "처방현황" },
    { id: 4, path: "/doctorperscriptonform", name: "처방작성 테스트용" },
];
const settings = [
    { title: "내 예약", link: "/userreservation" },
    { title: "마이페이지", link: "/usermypage" },
    { title: "Logout", link: "/" },
];

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: 800,
    bgcolor: "background.paper",
    // boxShadow: 24,
};

const NavBarEl = (props) => {
    //test
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("user");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (id) => {
        console.log(id);
        if (id === props.selectNav) props.clickNav(id);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    let MyButton = (page, selectedColor) => (
        <Box
            key={page}
            onClick={() => {
                props.clickNav(page.id);
            }}
            sx={{ mx: 8, my: 2, color: selectedColor, display: "block", fontWeight: "bold" }}
        >
            <Typography sx={{ fontSize: 17 }}>{page.name}</Typography>
        </Box>
    );
    
    

    const NavItem = () => {
        if (mode === "user") {
            return (
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {pages.map((page) => (
                        <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
                            {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
                        </NavLink>
                    ))}
                </Box>
            );
        } else {
            return (
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {doctorpages.map((page) => (
                        <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
                            {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
                        </NavLink>
                    ))}
                </Box>
            );
        }
    };

    const LoginMenu = () => {
        const style = [
            {   
                padding: '0 10px',
                textDecoration: 'none',
                color: '#5a5a5a',
                fontSize: '14px',
                lineHeight: '42px',
                borderRight: '1px solid',
                borderColor: '#5a5a5a',
                cursor: 'pointer',
            },
            {
                textDecoration: 'none',
                color: '#5a5a5a',
                fontSize: '14px',
                lineHeight: '42px',
                cursor: 'pointer',
            }
        ];
        const isLogin = props.isLogin;
        const loginControls = [
            { title: "회원가입", link: "/UserJoin"},
            { title: "로그인", link: "/"},
        ];
        const logoutControls = [
            { title: "마이페이지", link: "/usermypage"},
            { title: "로그아웃", link: "/"},
        ];
        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '36px' }}>
                    {!isLogin ? loginControls.map(cont => {
                        return <Typography><NavLink style={style[0]} to={cont.link} key={cont}>{cont.title}</NavLink></Typography>
                    }) : logoutControls.map(cont => {
                        return <Typography><NavLink style={style[0]} to={cont.link} key={cont}>{cont.title}</NavLink></Typography>
                    })}
                    <Typography sx={{ pl: 1 }}><NavLink style={style[1]} key={2} to="/">고객센터</NavLink></Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box>
            <Banner></Banner>
            <AppBar color="inherit" position="sticky">
                <Container maxWidth="lg">
                    <LoginMenu />
                    <Toolbar disableGutters>
                        <NavLink to="/">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                            >
                                <img src="img/logo.png" height="50px" alt=""></img>
                            </Typography>
                        </NavLink>

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
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
                                }}
                            >
                                {/* 모바일 화면일 때 메뉴 */}

                                {pages.map((page) => (
                                    <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
                                        {props.selectedNav === page.id
                                            ? MyButton(page, "#29A1B1")
                                            : MyButton(page, "black")}
                                    </NavLink>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                        >
                            <img src="img/logo.png" height="50px" alt="logo"></img>
                        </Typography>
                        <NavItem />
                        {/* {props.isLogin ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">
                                                <NavLink to={setting.link}>{setting.title}</NavLink>
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Button sx={{ mx: 8, my: 2, color: "black", display: "block" }} onClick={handleOpen}>
                                    <Typography variant="h6">Login</Typography>
                                </Button>
                            </Box>
                        )} */}

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <UserLoginModal></UserLoginModal>
                            </Box>
                        </Modal>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};



function NavBar(props) {
    let [selectedNav, setSelectedNav] = useState(0);
    let [isLogin, setIsLogin] = useState(true);
    function clickNav(selected) {
        setSelectedNav(selected);
    }
    return <NavBarEl selectedNav={selectedNav} isLogin={isLogin} clickNav={clickNav}></NavBarEl>;
}
export default NavBar;

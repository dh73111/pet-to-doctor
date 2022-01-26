import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
const pages = [
    { id: 1, path: "/hospitalsearch", name: "병원찾기" },
    { id: 2, path: "/hospitalreservation", name: "예약하기" },
    { id: 3, path: "/notice", name: "공지사항" },
];
const settings = ["내 예약", "마이페이지", "Logout"];

const MyDiv = styled("div")({
    color: "#29A1B1",
});
const selectNav = "black";

const activeStyle = {
    color: "#29A1B1",
};

const NavBarEl = (props) => {
    console.log(props);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
        <Button
            key={page}
            onClick={() => {
                props.clickNav(page.id);
            }}
            sx={{ mx: 8, my: 2, color: selectedColor, display: "block" }}
        >
            <Typography variant="h6">{page.name}</Typography>
        </Button>
    );

    return (
        <AppBar color="transparent" position="sticky">
            <Container maxWidth="xl">
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
                        <img src="img/logo.png" height="50px" alt=""></img>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
                                {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
                            </NavLink>
                        ))}
                    </Box>
                    {props.isLogin ? (
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
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ flexGrow: 0 }}>
                            <Button sx={{ mx: 8, my: 2, color: "black", display: "block" }}>
                                <Typography variant="h6">Login</Typography>
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

function NavBar(props) {
    let [selectedNav, setSelectedNav] = useState(0);
    let [isLogin, setIsLogin] = useState(true);
    function clickNav(selected) {
        console.log(selected);
        setSelectedNav(selected);
    }
    return <NavBarEl selectedNav={selectedNav} isLogin={isLogin} clickNav={clickNav}></NavBarEl>;
}
export default NavBar;

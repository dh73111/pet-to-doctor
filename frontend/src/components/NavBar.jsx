import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Modal, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { NavLink, useNavigate } from "react-router-dom";
import UserLoginModal from "./user/UserLoginModal";
import Banner from "./user/resources/Banner";
import MainSearchBar from "./user/resources/MainSearchBar";
import { CallOutlined, PersonOutlineOutlined, SupportAgent } from "@mui/icons-material";

const pages = [
  { id: 1, path: "/petodoctor/userreservation", name: "내 예약" },
  { id: 2, path: "/petodoctor/hospitalsearch", name: "주변 병원찾기" },
  { id: 3, path: "/petodoctor/review", name: "진료/상담후기" },
  { id: 4, path: "/petodoctor/qna", name: "QnA" },
];
const doctorpages = [
  { id: 1, path: "/petodoctor/doctorreservation", name: "받은예약" },
  { id: 2, path: "/petodoctor/doctordiagnosis", name: "진료현황" },
  { id: 3, path: "/petodoctor/doctorperscripton", name: "처방현황" },
  { id: 4, path: "/petodoctor/doctorperscriptonform", name: "처방작성 테스트용" },
];
const settings = [
  { title: "내 예약", link: "/petodoctor/userreservation" },
  { title: "마이페이지", link: "/petodoctor/usermypage" },
  { title: "Logout", link: "/petodoctor" },
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  // const [mode, setMode] = useState("user");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const handleClose = () => setOpen(false);
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = (id) => {
  //   console.log(id);
  //   if (id === props.selectNav) props.clickNav(id);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    sessionStorage.clear();
    dispatch({ type: "logout" });
    navigate("/petodocor");
  };

  let MyButton = (page, selectedColor) => (
    <Box
      key={page}
      onClick={() => {
        props.clickNav(page.id);
      }}
      sx={{ color: selectedColor, display: "block" }}
    >
      <Typography sx={{ fontSize: 17 }}>{page.name}</Typography>
    </Box>
  );

  // const NavItem = () => {
  //   // 네비 모드 바꾸기
  //   if (mode === "doctor") {
  //     return (
  //       <Box sx={{ width: "100%", display: { xs: "none", md: "flex" }, justifyContent: "space-between" }}>
  //         {pages.map((page) => (
  //           <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
  //             {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
  //           </NavLink>
  //         ))}
  //       </Box>
  //     );
  //   } else {
  //     return (
  //       <Box sx={{ width: "100%", display: { xs: "none", md: "flex" }, justifyContent: "space-between" }}>
  //         {doctorpages.map((page) => (
  //           <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
  //             {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
  //           </NavLink>
  //         ))}
  //       </Box>
  //     );
  //   }
  // };

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
      <Box sx={{ width: "100%", mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", height: "36px" }}>
          {!isLogin ? (
            <>
              <Typography>
                <NavLink style={style[0]} to="/petodoctor/userjoin">
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
                <NavLink style={style[0]} to="/petodoctor/usermypage">
                  마이페이지
                </NavLink>
              </Typography>
              <Typography>
                <NavLink
                  style={style[0]}
                  to="/petodoctor"
                  onClick={() => {
                    logOut();
                  }}
                >
                  로그아웃
                </NavLink>
              </Typography>
            </>
          )}
          <Typography sx={{ pl: 1 }}>
            <NavLink style={style[1]} key={2} to="/petodoctor/qna">
              고객센터
            </NavLink>
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Box sx={{ position: "relative", mb: 3 }}>
      <Banner></Banner>
      <Box color="inherit">
        <Container maxWidth="lg">
          <LoginMenu />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              position: "relative",
              height: "46px",
              justifyContent: "space-between",
            }}
          >
            <NavLink
              to="/petodoctor"
              onClick={() => {
                props.clickNav(0);
              }}
            >
              <img src="/img/web_logo.png" width="150px" alt="logo" />
            </NavLink>
            <MainSearchBar />
            <Box>
              <NavLink to="/petodoctor">
                <NotificationsNoneIcon sx={{ fontSize: "36px", marginRight: "10px", color: "#cacaca" }} />
              </NavLink>
              <NavLink to="/petodoctor/usermypage">
                <PersonOutlineOutlined sx={{ fontSize: "36px", marginRight: "10px" }} />
              </NavLink>
              <NavLink to="/petodoctor/qna">
                <SupportAgent sx={{ fontSize: "36px" }} />
              </NavLink>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* <Box sx={{ mt: 2, backgroundColor: "#fff", backgroundColor: "gray", position: "sticky", top: 0 }}>
        <Container>
          <Toolbar sx={{ backgroundColor: "lightyellow" }}>
            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <IconButton
                //  모바일화면 햄버거아이콘
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
                {pages.map((page) => (
                  <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
                    {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
                  </NavLink>
                ))}
              </Menu>
            </Box>
            <Typography
              // 모바일 로고
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <img src="img/logo.png" height="50px" alt="logo"></img>
            </Typography>
            <NavItem />
           
          </Toolbar>
        </Container>
      </Box> */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <UserLoginModal onClose={handleClose}></UserLoginModal>
        </Box>
      </Modal>
    </Box>
  );
};
// ------------- 스크롤 STICKY 하단 NAVBAR -------------
function NavBottom(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("user");
  const handleClose = () => setOpen(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (id) => {
    console.log(id);
    if (id === props.selectNav) props.clickNav(id);
  };

  let MyButton = (page, selectedColor) => (
    <Box
      key={page}
      onClick={() => {
        props.clickNav(page.id);
      }}
      sx={{ color: selectedColor, display: "block" }}
    >
      <Typography sx={{ fontSize: 17 }}>{page.name}</Typography>
    </Box>
  );

  const NavItem = () => {
    // 네비 모드 바꾸기
    if (mode === "user") {
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
            <NavLink to={page.path} key={page.path} style={{ textDecoration: "none" }}>
              {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
            </NavLink>
          ))}
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
      }}
    >
      <Box sx={{ backgroundColor: "#fff" }}>
        <Container>
          <Toolbar>
            <Typography
              // 모바일 로고
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}
            >
              <img src="img/web_logo.png" width="150px" alt="logo"></img>
            </Typography>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                //  모바일화면 햄버거아이콘
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
                {pages.map((page) => (
                  <NavLink to={page.path} key={page.path} style={{ textDecoration: "none", p: 1 }}>
                    {props.selectedNav === page.id ? MyButton(page, "#29A1B1") : MyButton(page, "black")}
                  </NavLink>
                ))}
              </Menu>
            </Box>
            <NavItem />
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
  let [selectedNav, setSelectedNav] = useState(0);
  function clickNav(selected) {
    setSelectedNav(selected);
  }
  return (
    <>
      <NavTop selectedNav={selectedNav} clickNav={clickNav}></NavTop>
      <NavBottom selectedNav={selectedNav} clickNav={clickNav}></NavBottom>
    </>
  );
}

export default NavBar;

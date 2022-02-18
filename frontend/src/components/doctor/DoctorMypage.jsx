import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardMedia,
    Checkbox,
    Container,
    Grid,
    Input,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { userFavMark, addFavMark } from "../../api/mark.js";
import { userInfo } from "../../api/user.js";
import { deleteFavMark } from "../../api/mark.js";
import { modifyPet, deletePet, registerPet, modifyPetPic, petList, petInfo } from "../../api/pet.js";

// 마이페이지 메인 최상단 컴포넌트
function DoctorMypage(props) {
    const userId = useSelector((store) => store.user.id);
    const [user, setUser] = useState({
        id: "",
        email: "",
        name: "",
        role: null,
        tel: "",
        joinDate: "",
        address: {
            city: "",
            street: "",
            zipcode: "",
        },
        isOauth: true,
        isCertificated: false,
    });
    // const [currentUserPet, setCurrentUserPets] = useState([]);

    useEffect(() => {
        const init = async () => {
            const user = await userInfo(userId);
            setUser(user);
            // const userPets = await petList();
            // setCurrentUserPets(userPets);
        };
        init();
        // userInfo(userId, (data) => {
        //   console.log(data.data, "userInfo API");
        //   setUser(data.data);
        // });
        // petList((res) => {
        //   setCurrentUserPets(res.data.data, "pet API");
        // });
        // userFavMark((data) => [console.log("(요청)즐겨찾는병원", data)]);
    }, []);

    return (
        <Container>
            <Typography
                variant='h4'
                component='h1'
                sx={{ mt: 10, mb: 2, fontWeight: 600, color: "rgba(48, 159, 179)" }}>
                마이페이지
            </Typography>
            <UserInfo user={user} />
        </Container>
    );
}

// 유저 정보 컴포넌트
function UserInfo(props) {
    const informationUser = props.user;

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                {/* <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 25 }}>내 정보</Typography> */}
                <Grid container sx={{ mt: 1, p: 3, border: "2px solid rgba(48, 159, 179, .5)" }}>
                    <Grid item xs={12} md={4}>
                        <Box
                            item
                            xs={12}
                            sx={{
                                width: "100%",
                                height: "100%",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundImage: `url(${process.env.PUBLIC_URL}/img/main.png)`,
                                // 유저의 프로필
                            }}></Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ border: 1 }}>
                        <Box sx={{ typography: "h5" }}>{informationUser.name}</Box>
                        <Box sx={{ typography: "body1" }}>{informationUser.email}</Box>
                        <Box sx={{ typography: "body1" }}>{informationUser.tel}</Box>
                        <Box sx={{ typography: "body1" }}>{informationUser.address.city}</Box>
                        <Box sx={{ typography: "body1" }}>{informationUser.address.street}</Box>
                    </Grid>
                    <Box sx={{ mt: 2, mx: 2 }}>
                        <Link to={`/petodoctor/usermypage/${informationUser.id}`} state={informationUser}>
                            <Button varient='contained'>회원정보 수정</Button>
                        </Link>
                        <Outlet />
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DoctorMypage;

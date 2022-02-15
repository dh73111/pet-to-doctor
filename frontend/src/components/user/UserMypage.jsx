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
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import UserPets from "./resources/UserPets.jsx";

// 마이페이지 메인 최상단 컴포넌트
function UserMypage(props) {
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
    const [favHospitals, setfavHospitals] = useState([]);

    useEffect(() => {
        const init = async () => {
            const user = await userInfo(userId);
            console.log(user, "유저데이터");
            setUser(user);
        };
        init();
    }, []);

    return (
        <Container>
            <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600, color: "#263747" }}>
                마이페이지
            </Typography>
            <Box sx={{ border: "1px solid #D7E2EB", p: 4, borderRadius: "0.55rem", mb: 15 }}>
                <UserInfo user={user} />
                {user.role !== "ROLE_USER" ? (
                    ""
                ) : (
                    <>
                        <UserPetInfo user={user} /*pets={currentUserPet}*/ />
                        <FavoriteHospital hospitals={favHospitals} />
                    </>
                )}
            </Box>
        </Container>
    );
}

// 유저 정보 컴포넌트
function UserInfo(props) {
    const informationUser = props.user;

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <Grid container sx={{ mt: 1, p: 3 }}>
                    <Grid item xs={12} md={12}>
                        <Box sx={{ float: "right" }}>
                            <Link to={`/petodoctor/usermypage/${informationUser.id}`} state={informationUser}>
                                <Button varient='contained' startIcon={<EditIcon />}>
                                    회원정보수정
                                </Button>
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                width: "200px",
                                height: "200px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundImage: `url(${process.env.PUBLIC_URL}/img/main.png)`,
                                borderRadius: "200px",
                                mx: "auto",
                                // 유저의 프로필
                            }}></Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ mt: 3, textAlign: "center" }}>
                            <Box sx={{ typography: "h4", fontFamily: "NanumSquare", fontWeight: 800 }}>
                                {informationUser.name}
                            </Box>
                            <Box sx={{ typography: "body1", color: "#263747" }}>
                                {informationUser.email} · {informationUser.tel}
                            </Box>
                            <Box sx={{ typography: "body1", color: "#263747" }}></Box>
                            <Box sx={{ typography: "body1", color: "#263747", mt: 2 }}>
                                {/* {informationUser.address.city}
                                <br />
                                {informationUser.address.street} */}
                                {informationUser.address !== null ? (
                                    <>
                                        {informationUser.address.city}
                                        <br />
                                        {informationUser.address.street}
                                    </>
                                ) : (
                                    "없음"
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

// 유저 펫 정보 컴포넌트
function UserPetInfo(props) {
    const [userPet, setUserPet] = useState([]);
    const [isAddNew, setIsAddNew] = useState(false);
    const [isPetMod, setIsPetMod] = useState(false);
    useEffect(() => {
        const init = async () => {
            const userPets = await petList();
            setUserPet(userPets);
        };
        init();
    }, []);

    // 펫 추가 컴포넌트
    function AddPet() {
        const [newPetInfo, setNewPetInfo] = useState({
            name: "멍맹",
            birthDate: "2022-02-08",
            species: "말티즈",
            weight: "88",
        });
        const [petImgPreview, setpetImgPreview] = useState();
        const [petImg, setpetImg] = useState();
        let today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const handlePetInfo = (dataTitle) => (e) => {
            const dataTitle = e.target.name;
            const data = e.target.value;
            setNewPetInfo({ ...newPetInfo, [dataTitle]: data });
        };
        const changePetProfile = () => {
            const fd = new FormData();
            Object.petImg.forEach((file) => fd.append("profileImgUrl", file));
            alert("프로필변경이완료되었습니다");
        };
        const requestNewPet = async () => {
            const response = await registerPet(newPetInfo);
            const profileUp = await modifyPetPic();
            if (response.data.message === "성공") {
                const reloaded = await petList();
                setIsAddNew(false);
                setUserPet(reloaded);
            }
        };
        const encodeFileToBase64 = (fileBloab) => {
            const reader = new FileReader();
            reader.readAsDataURL(fileBloab);
            return new Promise((resolv) => {
                reader.onload = () => {
                    setpetImgPreview(reader.result);
                    resolv();
                };
            });
        };
        return (
            <>
                <Box
                    container
                    sx={{ height: "100%", border: "0.0625rem solid #D7E2EB", borderRadius: "0.25rem", p: 1 }}
                    className='pet_card'>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "244px",
                                border: 1,
                                backgroundImage: `url(${petImgPreview})`,
                                backgroundSize: "cover",
                            }}></Box>
                        <label for='petProfileNew'>이미지업로드</label>
                        <input
                            type='file'
                            accept='image/*'
                            id='petProfileNew'
                            style={{ display: "none" }}
                            onChange={(e) => {
                                encodeFileToBase64(e.target.files[0]);
                                setpetImg(e.target.files[0]);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            placeholder='이름'
                            name='name'
                            type='text'
                            size='small'
                            onChange={handlePetInfo("name")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            placeholder='생년월일'
                            name='birthDate'
                            type='date'
                            onChange={handlePetInfo("data")}
                            defaultValue={
                                year +
                                "-" +
                                ("00" + month.toString()).slice(-2) +
                                "-" +
                                ("00" + day.toString()).slice(-2)
                            }
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            placeholder='종'
                            name='species'
                            type='text'
                            size='small'
                            onChange={handlePetInfo("species")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            placeholder='몸무게'
                            name='weight'
                            type='number'
                            size='small'
                            onChange={handlePetInfo("weight")}
                            endAdornment={<InputAdornment position='end'>kg</InputAdornment>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            size='small'
                            onClick={() => {
                                requestNewPet();
                            }}>
                            추가
                        </Button>
                        <Button
                            variant='contained'
                            size='small'
                            onClick={() => {
                                setIsAddNew(false);
                            }}>
                            취소
                        </Button>
                    </Grid>
                </Box>
            </>
        );
    } // 펫 추가 컴포넌트 끝

    const [modPetInfo, setModPetInfo] = useState({
        name: "string",
        birthDate: "2022-02-10",
        species: "string",
        weight: "string",
    });
    const handleChangePetInfo = () => {
        setIsPetMod(!isPetMod);
    };
    const changeModPetInfo = (title) => (e) => {
        setModPetInfo({ ...modPetInfo, [title]: e.target.value });
    };
    const handleModPetInfo = async (petId) => {
        const modPetRes = await modifyPet(petId, modPetInfo);
        console.log(modPetRes, "펫정보변경결과");
        const rePets = await petList();
        setUserPet(rePets);
    };
    const handleDeletePetInfo = async (petId) => {
        const conf = window.confirm("반려동물 정보를 삭제합니다");
        if (conf === true) {
            await deletePet(petId).then(async () => {
                const rePets = await petList();
                setUserPet(rePets);
                alert("반려동물 정보 삭제를 성공했습니다.");
            });
        } else {
            alert("반려동물 정보 삭제를 취소했습니다.");
        }
    };

    const changeAddNew = () => {
        setIsAddNew(!isAddNew);
    };
    const doneAddNew = () => {
        setIsAddNew(false);
    };
    const limitMod = (petId) => {
        console.log(petId);
        return petId;
    };
    return (
        <Grid container>
            <Grid item xs={12} sx={{ mt: 4 }}>
                <Typography
                    sx={{
                        mb: 2,
                        fontWeight: "bold",
                        fontSize: 25,
                        p: 1,
                        color: "#263747",
                    }}>
                    함께하는 반려동물
                    <Button
                        variant='outlined'
                        size='small'
                        onClick={changeAddNew}
                        sx={{ float: "right", mt: 1 }}
                        startIcon={<AddIcon />}>
                        더 추가하기
                    </Button>
                </Typography>
                <Grid container spacing={1.5}>
                    {userPet.map((pet, idx) => (
                        <UserPets
                            key={idx}
                            pet={pet}
                            handleDeletePetInfo={handleDeletePetInfo}
                            handleChangePetInfo={handleChangePetInfo}
                            changeModPetInfo={changeModPetInfo}
                            handleModPetInfo={handleModPetInfo}
                            changeModPetInfo={changeModPetInfo}
                        />
                    ))}
                    <Grid item xs={6} md={3}>
                        {isAddNew ? <AddPet /> : ""}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
} // 유저 펫 정보 컴포넌트 끝

// 유저 즐겨찾는 병원 컴포넌트
function FavoriteHospital() {
    const [favHospitals, setfavHospitals] = useState([]);

    useEffect(() => {
        const init = async () => {
            const userFav = await userFavMark();
            setfavHospitals(userFav);
        };
        init();
    }, []);

    const markTest = () => {
        userFavMark((res) => {
            console.log("(요청)즐겨찾는병원", res);
            setfavHospitals(res.data.data);
        });
    };

    const handleFavMark = async (favId) => {
        const tmp = window.confirm("즐겨찾기를 삭제하시겠습니까?");
        if (tmp === true) {
            await deleteFavMark(favId).then(async () => {
                const reFav = await userFavMark();
                setfavHospitals(reFav);
            });
        }
    };

    const addMark = async () => {
        console.log("11");
        await addFavMark(
            160,
            (res) => {
                console.log(res, "즐겨찾기추가성공");
            },
            (res) => {
                console.log(res, "즐겨찾기추가실패");
            }
        );
    };
    return (
        <Grid item xs={12} md={12} sx={{ mt: 4 }}>
            <Typography
                sx={{
                    mt: 8,
                    mb: 2,
                    fontWeight: "bold",
                    fontSize: 25,
                    p: 1,
                    color: "#263747",
                }}>
                즐겨찾는 병원
            </Typography>
            {/* <button onClick={markTest}>즐겨찾기병원 조회 테스트</button>
            <Button onClick={addMark} variant='contained'>
                즐겨찾는병원 넣기 테스트
            </Button> */}
            <table className='favhospital'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>병원이름</th>
                        <th>주소</th>
                        <th>연락처</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {favHospitals.map((fav, idx) => {
                        const favId = fav.id;
                        return (
                            <tr key={idx} style={{ textAlign: "center" }}>
                                <td>{idx + 1}</td>
                                <td>{fav.hospital_name}</td>
                                <td>
                                    {fav.hospital_address.city} {fav.hospital_address.street}
                                </td>
                                <td>{fav.hospital_tel}</td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            handleFavMark(favId);
                                        }}>
                                        즐겨찾기 삭제
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr></tr>
                </tfoot>
            </table>
        </Grid>
    );
} // 유저 즐겨찾는 병원 컴포넌트 끝

export default UserMypage;

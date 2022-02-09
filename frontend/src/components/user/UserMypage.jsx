import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    cardContentClasses,
    CardMedia,
    Checkbox,
    Container,
    Grid,
    Input,
    Paper,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userFavMark, addFavMark } from "../../api/mark.js";
import { userInfo } from "../../api/user.js";
import { modifyPet, deletePet, registerPet, modifyPetPic, petList } from "../../api/pet.js";

// 마이페이지 메인 컴포넌트
function UserMypage(props) {
    const userId = useSelector((store) => store.user.id);
    const [user, setUser] = useState({
        message: "회원정보 조회 테스트",
        data: {
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
        },
    });
    // const currentUserInfo = useSelector((state) => state);
    // console.log(currentUserInfo, "state 유저인포");
    const [currentUserPet, setCurrentUserPets] = useState([]);
    const [favHospitals, setfavHospitals] = useState([]);

    useEffect(() => {
        userInfo(userId, (data) => {
            console.log(data.data , "userInfo API");
            setUser(data.data);
        });
        petList((res) => {
            setCurrentUserPets(res.data.data, "pet API");
        });
        // userFavMark((data) => [console.log("(요청)즐겨찾는병원", data)]);
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
                마이페이지
            </Typography>
            <UserInfo user={user} />
            <UserPetInfo pets={currentUserPet} />
            <FavoriteHospital hospitals={favHospitals} />
        </Container>
    );
}

// 유저 정보 컴포넌트
function UserInfo(props) {
    const user = props.user.data;

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                {/* <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 25 }}>내 정보</Typography> */}
                <Grid container sx={{ mt: 1, p: 3, border: "2px solid #29A1B1" }}>
                    <Grid item xs={12} md={4}>
                        <Box item xs={12} sx={{ width: "100%", height: "100%", backgroundColor: "#eaeaea" }}></Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ border: 1 }}>
                        <Box sx={{ typography: "h5" }}>{user.name}</Box>
                        <Box sx={{ typography: "body1" }}>{user.email}</Box>
                        <Box sx={{ typography: "body1" }}>{user.tel}</Box>
                        <Box sx={{ typography: "body1" }}>{user.address.street}</Box>
                    </Grid>
                    <Box sx={{ mt: 2, mx: 2 }}>
                        <NavLink to="/petodoctor/usernmypagechange">
                            <Button varient="contained">회원정보 수정</Button>
                        </NavLink>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

// 유저 펫 정보 컴포넌트
function UserPetInfo(props) {
    console.log(props, " UserPetInfo");
    const [isAddNew, setIsAddNew] = useState(false);
    const userPet = props.pets;

    // 펫 추가 컴포넌트
    function AddPet() {
        const [newPetInfo, setNewPetInfo] = useState({
            name: "멍맹",
            birthDate: "2022-02-08",
            species: "말티즈",
            weight: "88",
        });
        let today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const handlePetInfo = (dataTitle) => (e) => {
            const dataTitle = e.target.name;
            const data = e.target.value;
            console.log(dataTitle, " ", data);
            setNewPetInfo({ ...newPetInfo, [dataTitle]: data });
        };
        const requestNewPet = () => {
            console.log(newPetInfo);
            registerPet(
                newPetInfo,
                (res) => {
                    console.log(res, "새로운 펫 등록성공");
                },
                (res) => {
                    console.log(res, "새로운 펫 등록실패");
                }
            );
        };
        return (
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField label="이름" name="name" type="text" size="small" onChange={handlePetInfo("name")} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="생년월일"
                            name="birthDate"
                            type="date"
                            onChange={handlePetInfo("data")}
                            defaultValue={
                                year +
                                "-" +
                                ("00" + month.toString()).slice(-2) +
                                "-" +
                                ("00" + day.toString()).slice(-2)
                            }
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="종"
                            name="species"
                            type="text"
                            size="small"
                            onChange={handlePetInfo("species")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="몸무게"
                            name="weight"
                            type="number"
                            size="small"
                            onChange={handlePetInfo("weight")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={doneAddNew}>
                            추가
                        </Button>
                        <button onClick={requestNewPet}>유저펫추가테스트</button>
                    </Grid>
                </Grid>
            </>
        );
    }
    const handleChangePetInfo = () => {};

    const changeAddNew = () => {
        if (!isAddNew) {
            setIsAddNew(true);
        }
    };
    const doneAddNew = () => {
        setIsAddNew(false);
    };
    return (
        <Grid container>
            <Grid item xs={12} sx={{ mt: 4 }}>
                <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: 25, borderBottom: 2, pb: 1 }}>
                    함께하는 반려동물
                </Typography>
                <Button variant="contained" onClick={changeAddNew}>
                    더 추가하기
                </Button>
                <Grid container>
                    {userPet.map((pet) => (
                        <Grid key={pet.idx} item sx={{ border: 1 }}>
                            <Card>
                                <CardMedia component="img" height="140" image="img/resHospital.png" alt="petPhoto" />
                                <Grid container>
                                    <Grid item xs={12}>
                                        {pet.name}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {pet.birthDate}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {pet.species}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {pet.weight}
                                    </Grid>
                                    <Button onClick={handleChangePetInfo} variant="contained">
                                        펫정보수정
                                    </Button>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item>
                        <Paper sx={{ height: 280, width: 280 }}>{isAddNew ? <AddPet /> : null}</Paper>
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
        userFavMark(
            (res) => {
                console.log("(요청)즐겨찾는병원", res);
                setfavHospitals(res);
            },
            () => {
                console.log("즐겨찾기 못가져옴");
            }
        );
    }, []);

    const markTest = () => {
        userFavMark((res) => {
            console.log("(요청)즐겨찾는병원", res);
            setfavHospitals(res);
        });
    };

    const handleFavMark = () => {
        console.log("즐겨찾기삭제");
    };

    const addMark = () => {
        addFavMark(
            ("162",
            (res) => {
                console.log(res, "즐겨찾기추가성공");
            },
            (res) => {
                console.log(res, "즐겨찾기추가실패");
            })
        );
    };
    return (
        <Grid item xs={12} md={12} sx={{ mt: 4 }}>
            <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: 25 }}>즐겨찾는 병원</Typography>
            <button onClick={markTest}>즐겨찾기병원 조회 테스트</button>
            <Button onClick={addMark} variant="contained">
                즐겨찾는병원 넣기 테스트
            </Button>
            <table className="favhospital">
                <thead>
                    <tr>
                        <Checkbox />
                        <th>이미지</th>
                        <th>병원이름</th>
                        <th>주소</th>
                        <th>연락처</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Checkbox />
                        </td>
                        <td>이미지</td>
                        <td>로이병원</td>
                        <td>인천광역시 남동구 논현동 751-1 에코메트로3차 더타워상가 C동 1층 24시 소래동물병원</td>
                        <td>02-1234-5678</td>
                        <td>
                            <Button onClick={handleFavMark}>즐겨찾기 삭제</Button>
                        </td>
                    </tr>
                    {/* {favHospitals.map((fav, idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <Checkbox />
                                </td>
                                <td>이미지</td>
                                <td>{fav.hospital.name}</td>
                                <td>{fav.hospital.address.street}</td>
                                <td>{fav.hospital.tel}</td>
                                <td>
                                    <Button onClick={handleFavMark}>즐겨찾기 삭제</Button>
                                </td>
                            </tr>
                        );
                    })} */}
                </tbody>
                <tfoot>
                    <tr></tr>
                </tfoot>
            </table>
        </Grid>
    );
} // 유저 즐겨찾는 병원 컴포넌트 끝

export default UserMypage;

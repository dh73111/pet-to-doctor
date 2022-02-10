import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardMedia, Checkbox, Container, Grid, Input, Paper, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { userFavMark, addFavMark } from "../../api/mark.js";
import { userInfo } from "../../api/user.js";
import { deleteFavMark } from "../../api/mark.js";
import { modifyPet, deletePet, registerPet, modifyPetPic, petList, petInfo } from "../../api/pet.js";
import { CompareSharp } from "@mui/icons-material";

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
  // const [currentUserPet, setCurrentUserPets] = useState([]);
  const [favHospitals, setfavHospitals] = useState([]);

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
      <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
        마이페이지
      </Typography>
      <UserInfo user={user} />
      <UserPetInfo user={user} /*pets={currentUserPet}*/ />
      <FavoriteHospital hospitals={favHospitals} />
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
        <Grid container sx={{ mt: 1, p: 3, border: "2px solid #29A1B1" }}>
          <Grid item xs={12} md={4}>
            <Box item xs={12} sx={{ width: "100%", height: "100%", backgroundColor: "#eaeaea" }}></Box>
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
              <Button varient="contained">회원정보 수정</Button>
            </Link>
            <Outlet />
          </Box>
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
  // const userPet = props.pets;
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
    let today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const handlePetInfo = (dataTitle) => (e) => {
      const dataTitle = e.target.name;
      const data = e.target.value;
      // console.log(dataTitle, " ", data);
      setNewPetInfo({ ...newPetInfo, [dataTitle]: data });
    };
    const requestNewPet = async () => {
      await registerPet(newPetInfo).then(async (res) => {
        if (res.message === "성공") {
          const reloaded = await petList();
          console.log("펫추가성공", reloaded);
          setUserPet(reloaded);
        }
      });
      setIsAddNew(false);
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
              defaultValue={year + "-" + ("00" + month.toString()).slice(-2) + "-" + ("00" + day.toString()).slice(-2)}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="종" name="species" type="text" size="small" onChange={handlePetInfo("species")} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="몸무게" name="weight" type="number" size="small" onChange={handlePetInfo("weight")} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={doneAddNew}>
              추가
            </Button>
            <button
              onClick={() => {
                requestNewPet();
              }}
            >
              유저펫추가테스트
            </button>
          </Grid>
        </Grid>
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
    setIsPetMod(!isPetMod);
  };
  // const handleFavMark = async (favId) => {
  //   await deleteFavMark(favId).then(async () => {
  //     const reFav = await userFavMark();
  //     setfavHospitals(reFav);
  //   });
  // };
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
  // const handleFavMark = async (favId) => {
  //   await deleteFavMark(favId).then(async () => {
  //     const reFav = await userFavMark();
  //     setfavHospitals(reFav);
  //   });
  // };
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
        <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: 25, borderBottom: 2, pb: 1 }}>함께하는 반려동물</Typography>
        <Button variant="contained" onClick={changeAddNew}>
          더 추가하기
        </Button>
        <Grid container>
          {userPet.map((pet, idx) => (
            <Grid key={idx} item sx={{ border: 1 }}>
              <Card>
                <CardMedia component="img" height="140" src={`${process.env.PUBLIC_URL}/img/dogDefaultProfile.jpg`} alt="petPhoto" />
                {!isPetMod ? (
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
                    <Button
                      onClick={() => {
                        handleDeletePetInfo(pet.id);
                      }}
                    >
                      펫정보삭제
                    </Button>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item xs={12}>
                      <Input defaultValue={pet.name} onChange={changeModPetInfo("name")} />
                    </Grid>
                    <Grid item xs={12}>
                      <Input defaultValue={pet.birthDate} onChange={changeModPetInfo("birthDate")} />
                    </Grid>
                    <Grid item xs={12}>
                      <Input defaultValue={pet.species} onChange={changeModPetInfo("species")} />
                    </Grid>
                    <Grid item xs={12}>
                      <Input defaultValue={pet.weight} onChange={changeModPetInfo("weight")} />
                    </Grid>
                    <Button
                      onClick={() => {
                        handleModPetInfo(pet.id);
                      }}
                      variant="contained"
                    >
                      펫정보수정완료
                    </Button>
                    <Button
                      onClick={() => {
                        setIsPetMod(false);
                      }}
                      variant="contained"
                    >
                      펫정보수정취소
                    </Button>
                    <Button
                      onClick={() => {
                        handleDeletePetInfo(pet.id);
                      }}
                    >
                      펫정보삭제
                    </Button>
                  </Grid>
                )}
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
  console.log(favHospitals, "즐겨찾는병원저장");

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
              <Button>즐겨찾기 삭제 깡통</Button>
            </td>
          </tr>
          {favHospitals.map((fav, idx) => {
            const favId = fav.id;
            return (
              <tr key={idx}>
                <td>
                  <Checkbox />
                </td>
                <td>이미지</td>
                <td>{fav.user_id} User ID"</td>
                <td>{fav.hospital_id} Hospital ID"</td>
                <td>{fav.id} Mark res ID"</td>
                <td>
                  <Button
                    onClick={() => {
                      handleFavMark(favId);
                    }}
                  >
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

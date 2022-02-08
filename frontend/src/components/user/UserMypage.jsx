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
import { userInfo, petInfo, userFavHospital } from "../../api/user.js";

function UserMypage(props) {
  const [user, setUser] = useState({
    message: "회원정보 조회 성공",
    data: {
      id: 1,
      email: "strrr",
      name: "string",
      role: null,
      tel: "string",
      joinDate: "2022-01-28T17:04:44.985888",
      address: {
        city: "string",
        street: "string",
        zipcode: "string",
      },
      isOauth: true,
      isCertificated: false,
    },
  });
  const [pets, setPets] = useState([]);
  const [favHospitals, setfavHospitals] = useState({});
  useEffect(() => {
    userInfo(256, (data) => {
      setUser(data.data);
    });
    petInfo((data) => {
      console.log("(요청)유저강아지정보", data);
    });
    userFavHospital((data) => [console.log("(요청)즐겨찾는병원", data)]);
  }, []);
  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
        마이페이지
      </Typography>
      <UserInfo user={user} />
      <UserPetInfo pets={pets} />
      <FavoriteHospital hospitals={favHospitals} />
    </Container>
  );
}

// 유저 정보 컴포넌트
function UserInfo(props) {
  const user = props.user.data;
  // console.log('userinfo', user)
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        {/* <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 25 }}>내 정보</Typography> */}
        <Grid container sx={{ mt: 1, p: 3, border: "2px solid #29A1B1" }}>
          <Grid item xs={12} md={4}>
            <Box item xs={12} sx={{ backgroundColor: "#eaeaea" }}>
              heyhye
            </Box>
          </Grid>
          <Grid item xs={12} md={8} sx={{ border: 1 }}>
            <Box sx={{ typography: "h5" }}>{user.name}</Box>
            <Box sx={{ typography: "body1" }}>{user.email}</Box>
            <Box sx={{ typography: "body1" }}>{user.tel}</Box>
            <Box sx={{ typography: "body1" }}>{user.address.street}</Box>
          </Grid>
          <Box sx={{ mt: 2, mx: 2 }}>
            <Button varient="contained">회원정보 수정</Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

// 유저 펫 정보 컴포넌트
function UserPetInfo() {
  const [isAddNew, setIsAddNew] = useState(false);
  const userPet = [
    {
      idx: 0,
      pet_name: "쫑이",
      birth: "2013.02.01",
      breed: "푸들",
      weight: "7.5",
    },
    {
      idx: 1,
      pet_name: "쌀이",
      birth: "2017.07.15",
      breed: "말티즈",
      weight: "4.511",
    },
  ];

  // 펫 추가 컴포넌트
  function AddPet() {
    let today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <TextField label="이름" type="text" size="small" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="생년월일"
              type="date"
              // defaultValue="2017-05-24"
              defaultValue={year + "-" + ("00" + month.toString()).slice(-2) + "-" + ("00" + day.toString()).slice(-2)}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="종" type="text" size="small" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="몸무게" type="number" size="small" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={doneAddNew}>
              추가
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
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
      {/* <Grid item xs={12}>
      <Grid container spacing={2} sx={{backgroundColor: '#121212'}}>
        {userPet.map((info) => {
          <Grid key={info.idx} item>
            <Paper sx={{ width: 100, height: 140 }}>ㅅㅂ</Paper>
          </Grid>
        })}
      </Grid>
    </Grid> */}
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: 25, borderBottom: 2, pb: 1 }}>함께하는 반려동물</Typography>
        <Button variant="contained" onClick={changeAddNew}>
          더 추가하기
        </Button>
        <Grid container>
          {userPet.map((pet) => (
            <Grid key={pet.idx} item sx={{ border: 1 }}>
              <Card>
                <CardMedia component="img" height="140" image="img/resHospital.png" alt="green iguana" />
                <Grid container>
                  <Grid item xs={12}>
                    {pet.pet_name}
                  </Grid>
                  <Grid item xs={12}>
                    {pet.birth}
                  </Grid>
                  <Grid item xs={12}>
                    {pet.breed}
                  </Grid>
                  <Grid item xs={12}>
                    {pet.weight}
                  </Grid>
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
}

// 유저 즐겨찾는 병원 컴포넌트
function FavoriteHospital(props) {
  const hospitals = props.hospitals;

  return (
    <Grid item xs={12} md={12} sx={{ mt: 4 }}>
      <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: 25 }}>즐겨찾는 병원</Typography>
      <table className="favhospital">
        <thead>
          <tr>
            <Checkbox />
            <th>이미지</th>
            <th>병원이름</th>
            <th>주소</th>
            <th>연락처</th>
            <th>선택</th>
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
              <Checkbox />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr></tr>
        </tfoot>
      </table>
    </Grid>
  );
}

export default UserMypage;

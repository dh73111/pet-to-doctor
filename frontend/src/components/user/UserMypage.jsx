import React, { useState } from 'react';
import { Avatar, Box, Button, Checkbox, Container, Grid, Input, Paper, TableCell, TableHead, TableRow, TableSortLabel, TextField, Typography } from '@mui/material';
import NavBar from '../NavBar';

function UserMypage(props) {
  return (
    <div>
      <Container>
        <Typography variant="h4" component="h1" sx={{mt:10}}>
          마이페이지
        </Typography>
        <UserInfo />
        <UserPetInfo />
        <FavoriteHospital />
      </Container>
    </div>
  );
}

function UserInfo() {
  const user = {
    name: '김싸피',
    email: 'doctortopet@example.com',
    call: '010-1234-5678',
    address: '서울특별시 동작구 상도로 19 응슷응아파트 119동 911호'
  }
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 5 }}>내정보</Typography>
        <Paper elevation={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Avatar sx={{width: 180, height:180}}>H</Avatar>
          </Grid>
          <Grid item xs={12} md={7} sx={{ backgroundColor: 'primary.dark' }}>
            <Box sx={{ typography: 'h6' }}>{user.name}</Box>
            <Box sx={{ typography: 'body1' }}>{user.email}</Box>
            <Box sx={{ typography: 'body1' }}>{user.call}</Box>
            <Box sx={{ typography: 'body1' }}>{user.address}</Box>
          </Grid>
          <Button varient="contained">회원정보 수정</Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

function UserPetInfo() {
  const [isAddNew, setIsAddNew] = useState(false);
  const userPet = [
    {
      idx: 0,
      pet_name: '쫑이',
      birth: '2013.02.01',
      breed: '푸들',
      weight: '7.5',
    },
    {
      idx: 1,
      pet_name: '쌀이',
      birth: '2017.07.15',
      breed: '말티즈',
      weight: '4.5',
    }
  ]
  function Pet() {
    return <></>
  }
  function AddPet() {
    let today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    return (
      <>
      <Avatar>Dog</Avatar>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            label="이름"
            type="text"
            >
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="생년월일"
            type="date"
            // defaultValue="2017-05-24"
            defaultValue={year+"-"+(("00"+month.toString()).slice(-2))+"-"+(("00"+day.toString()).slice(-2))}
            >
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="종"
            type="text"
            >
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="몸무게"
            type="number"
            >
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={doneAddNew}>추가</Button>
        </Grid>
      </Grid>
      </>
    );
  }
  const changeAddNew = () => {
    if (!isAddNew) {
      setIsAddNew(true)
    }
  }
  const doneAddNew = () => {
    setIsAddNew(false)
  }
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
        <Typography sx={{ mb: 1 }}>함께하는 반려동물</Typography>
        <Grid container spacing={2}>
          {userPet.map((pet) => (
            <Grid key={pet.idx} item>
              <Paper sx={{ height: 320, width: 280 }}>
                <Avatar>Dog</Avatar>
                <Grid container>
                  <Grid item xs={12}>{pet.pet_name}</Grid>
                  <Grid item xs={12}>{pet.birth}</Grid>
                  <Grid item xs={12}>{pet.breed}</Grid>
                  <Grid item xs={12}>{pet.weight}</Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
          <Grid item>
              <Paper sx={{ height: 320, width: 280 }} onClick={changeAddNew}>
                {isAddNew ? <AddPet /> : '더 추가하기'}
              </Paper>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function FavoriteHospital() {
  function createData(name, address, call) {
    return {
      name,
      address,
      call,
    };
  }
  const rows = [
    createData('로이병원', '대전', '010-2222-1111'),
    createData('한마음병원', '대전', '010-2222-1111'),
    createData('아름다운펫','대전', '010-2222-1111'),
  ];
  const headCells = [
    {
      id: '병원',
      numeric: false,
      disablePadding: true,
      label: '병원',
    },
    {
      id: '주소',
      numeric: true,
      disablePadding: false,
      label: '주소',
    },
    {
      id: '연락처',
      numeric: true,
      disablePadding: false,
      label: '연락처',
    },
  ];
  return (
    <Grid item xs={12} md={12}>
      <Typography sx={{ mt: 5 }}>즐겨찾는 병원</Typography>
      <Paper elevation={3} sx={{ mt: 1 }}>
        
      </Paper>
    </Grid>
  );
}

export default UserMypage;
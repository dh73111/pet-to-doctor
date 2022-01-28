import React from 'react';
import { Container, Typography } from '@mui/material';
import NavBar from '../../components/NavBar';
import MyProfile from '../../components/Mypage/MyProfile';
import PetProfile from '../../components/Mypage/PetProfile';
import FavoriteHospital from '../../components/Mypage/FavoriteHospital';

function UserMypage(props) {
  return (
    <div>
      <NavBar/>
      <Container>
        <Typography variant="h4" component="h1" sx={{mt:10}}>
          마이페이지
        </Typography>
        <MyProfile />
        <PetProfile />
        <FavoriteHospital />
      </Container>
    </div>
  );
}

export default UserMypage;
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, Container, createTheme, FormControlLabel, FormGroup, Grid, ThemeProvider } from '@mui/material';
import NavBar from '../NavBar';
import StepBar from './resources/StepBar';

function UserReservationNotice() {
  const newTheme = createTheme({
    palette: {
        primary: {
            main: "#309FB3",
        },
    },
  });


  return (
    <ThemeProvider theme={newTheme}>
      <NavBar />
      <Container maxWidth="xl">
      <Box container>
        <Box item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>상담 및 진료에 앞서 알려드립니다</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <StepBar />
          </Box>
        </Box>
      </Box>
      <Grid container align="center" sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={10} sx={{backgroundColor: "#eaeaea", height: "400px", overflow: 'auto', mb: 1 }} maxWidth="1000px">
          안내문
        </Grid>
        <Grid item xs={12} md={10}>
          <FormGroup align="center" sx={{ width: "100%" }}>
            <FormControlLabel control={<Checkbox />} label="동의합니다"/>
          </FormGroup>
        </Grid>
        <Button variant="contained" style={{width: "360px", height: "40px" }}>확인</Button>
      </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default UserReservationNotice;
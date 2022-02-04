import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, Container, createTheme, FormControlLabel, FormGroup, Grid, ThemeProvider } from '@mui/material';
import NavBar from '../NavBar';
import StepBar from './resources/StepBar';


function UserReservationPaymenting(props) {
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
              <Typography variant="h4" component="h1" sx={{ mt: 6, mb: 2, fontWeight: 600 }}>상담 및 진료비를 결제중입니다</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <StepBar />
              </Box>
            </Box>
            <Grid container spacing={2}>
            </Grid>
          </Box>
          </Container>
        </ThemeProvider>
      );
}

export default UserReservationPaymenting;
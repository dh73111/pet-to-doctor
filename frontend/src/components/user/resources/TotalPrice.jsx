import React from 'react';
import { Box } from '@mui/system';
import { Button, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';

function TotalPrice(props) {
  const priceTotal = props.prescription.data.price;

  return (
    <>
    <Box sx={{ backgroundColor: '#F5F6F7', p: 4}}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>최종결제금액</Typography>
      <Grid container sx={{ justifyContent: 'flex-end', mb: 4 }}>
          <Grid align="right" item xs={4}><Typography sx={{ fontWeight: 600 }}>배송비</Typography></Grid>
          <Grid align="right" item xs={7}><Typography xs={6} sx={{ ml: 3, pr: 1 }}>3,000원</Typography></Grid>
      </Grid>
      <Divider />
      <Grid continer sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Grid item xs={4}>
              <Typography>총 결제예정 금액</Typography>
          </Grid>
          <Grid item xs={8}>
              <Typography variant="h4" sx={{ textAlign: 'right' }}>{priceTotal}원</Typography>
          </Grid>
      </Grid>
    </Box>
    <Box sx={{ p: 4 }}>
        <Button variant='contained' sx={{ width: "100%", height: "40px", mx: "auto" }}>결제</Button>
    </Box>
    </>
  );
}

export default TotalPrice;
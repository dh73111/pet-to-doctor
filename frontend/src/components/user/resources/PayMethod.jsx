
import React, { useEffect, useState } from 'react';
import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';

function PayMethod(props) {
  const [payMethod, setPayMethod] = useState();
  const changePayMethod = (e) => {
    const payBy = e.target.value;
    setPayMethod(payBy);
  };
  useEffect(() => {
    console.log(payMethod);
  }, [payMethod]);


    return (
        <Box sx={{ backgroundColor: '#F5F6F7', p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>결제수단</Typography>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel value="kakaopay" control={<Radio onClick={changePayMethod}/>} label={<Box>
                                        <Grid container>
                                            <Grid item sx={{ lineHeight: '42px' }}>
                                                카카오페이
                                            </Grid>
                                            <Grid item sx={{ pt: 1, ml: 0.6 }}>
                                                <img src="/img/kakaopayLogo.png" alt="카카오페이로고" height="25px" />
                                            </Grid>
                                        </Grid>
                                    </Box>} />
                <FormControlLabel value="naverpay" control={<Radio onClick={changePayMethod}/>} label="네이버페이" />
                <FormControlLabel value="visit" control={<Radio onClick={changePayMethod}/>} label="방문결제" />
            </RadioGroup>
        </Box>
    );
}

export default PayMethod;

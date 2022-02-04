import { Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function PayMethod(props) {
    return (
        <Box sx={{ backgroundColor: '#F5F6F7', p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>결제방법</Typography>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel value="kakaopay" control={<Radio />} label="카카오페이" />
                <FormControlLabel value="naverpay" control={<Radio />} label="네이버페이" />
                <FormControlLabel value="visit" control={<Radio />} label="방문결제" />
            </RadioGroup>
        </Box>
    );
}

export default PayMethod;
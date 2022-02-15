import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

function PaymentUserInfo(props) {
    const userInfo = props.user;

    const gridContainer = { display: "flex", mb: 1 };
    const shipmentLabel = { width: "260px", fontWeight: "600", lineHeight: "40px" };

    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" /* backgroundColor: '#CDEEF4' */ }}>
                <Grid container sx={gridContainer}>
                    <Typography item xs={12} sx={shipmentLabel}>
                        이름
                    </Typography>
                    <TextField
                        sx={{ flex: 1, maxWidth: "260px" }}
                        id='outlined-basic'
                        variant='outlined'
                        size='small'
                        value={userInfo.name}
                    />
                </Grid>
                <Grid container sx={gridContainer}>
                    <Typography item xs={12} sx={shipmentLabel}>
                        전화번호
                    </Typography>
                    <TextField
                        sx={{ flex: 1, maxWidth: "260px" }}
                        id='outlined-basic'
                        variant='outlined'
                        size='small'
                        value={userInfo.tel}
                    />
                </Grid>
                <Grid container sx={gridContainer}>
                    {/* <Typography item xs={12} sx={shipmentLabel}>주소</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Box>
                        <TextField sx={{ mb: 1 }} variant="outlined" size="small" value={userInfo.zipcode}/>
                    </Box>
                    <TextField sx={{ mb: 1, width: '100%' }} variant="outlined" size="small" value={userInfo.city + ' ' + userInfo.street}/>
                    <TextField variant="outlined" size="small" />
                    </Box> */}
                </Grid>
            </Box>
        </Box>
    );
}

export default PaymentUserInfo;

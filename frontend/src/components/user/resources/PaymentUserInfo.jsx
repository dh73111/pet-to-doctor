import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";

function PaymentUserInfo(props) {
    const userInfo = props.user;

    const gridContainer = { display: "flex", mb: 1 };
    const shipmentLabel = { width: "260px", fontWeight: "600", lineHeight: "40px" };

    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Grid container sx={gridContainer}>
                    <Typography item xs={12} sx={shipmentLabel}>
                        이름
                    </Typography>
                    <TextField
                        sx={{ flex: 1, maxWidth: "260px", backgroundColor: "#FBFBFD" }}
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
                        sx={{ flex: 1, maxWidth: "260px", backgroundColor: "#FBFBFD" }}
                        id='outlined-basic'
                        variant='outlined'
                        size='small'
                        value={userInfo.tel}
                    />
                </Grid>
                <Grid container sx={gridContainer}>
                </Grid>
            </Box>
        </Box>
    );
}

export default PaymentUserInfo;

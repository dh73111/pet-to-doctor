import { Box, Typography } from "@mui/material";
import React from "react";

function PaymentHeading(props) {
    const title = props.title;
    return (
        <Box item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
                {title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row-reverse", mb: 3 }}></Box>
        </Box>
    );
}

export default PaymentHeading;

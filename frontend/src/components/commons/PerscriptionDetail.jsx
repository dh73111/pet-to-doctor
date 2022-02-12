import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

function PerscriptionDetail(props) {
    return (
        <Container>
            {/* <Box sx={{ fontSize: 40, mt: 7, textAlign: "center", fontWeight: "bold" }}>처방전</Box>; */}
            <Typography sx={{ fontSize: 30, mx: 5, mt: 5, mb: 1, fontWeight: "bold", textAlign: "center" }}>처방전</Typography>
            <div className="devider"></div>
            <Grid container sx={{ p: 3 }}>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                    <Box sx={{ mt: 2 }}>증상</Box>
                    <Box sx={{ mt: 2 }}>처방약</Box>
                    <Box sx={{ mt: 2 }}>가격</Box>
                    <Box sx={{ mt: 2 }}>배송여부</Box>
                    <Box sx={{ mt: 2 }}>특이사항</Box>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right", fontWeight: "bold", mb: 3 }}>
                    <Box sx={{ mt: 2 }}>diagnosis </Box>
                    <Box sx={{ mt: 2 }}>names</Box>
                    <Box sx={{ mt: 2 }}>medicineCost</Box>
                    <Box sx={{ mt: 2 }}>isShipping</Box>
                    <Box sx={{ mt: 2 }}>의사이름</Box>
                </Grid>
            </Grid>
            <div className="devider"></div>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 3, float: "right" }}
                onClick={() => {
                    props.handleClose();
                }}
            >
                확인
            </Button>
        </Container>
    );
}

export default PerscriptionDetail;

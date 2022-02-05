import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function PerscriptionDetail(props) {
    return (
        <Box>
            <Box sx={{ fontSize: 40, mt: 7, textAlign: "center", fontWeight: "bold" }}>처방전</Box>;
            <Grid container sx={{ mt: 10 }}>
                <Grid item xs={3} sx={{ textAlign: "right", fontWeight: "bold", fontSize: 25 }}>
                    <Box sx={{ mt: 4 }}>증상 :</Box>
                    <Box sx={{ mt: 6 }}>처방약 :</Box>
                    <Box sx={{ mt: 6 }}>가격 :</Box>
                    <Box sx={{ mt: 6 }}>배송여부 :</Box>
                    <Box sx={{ mt: 6 }}>특이사항 :</Box>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "center", fontSize: 25 }}>
                    <Box sx={{ mt: 4 }}>diagnosis </Box>
                    <Box sx={{ mt: 6 }}>names</Box>
                    <Box sx={{ mt: 6 }}>medicineCost</Box>
                    <Box sx={{ mt: 6 }}>isShipping</Box>
                    <Box sx={{ mt: 6 }}>의사이름</Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PerscriptionDetail;

import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { medicineInfo, checkPrescription } from "api/perscription";

function PerscriptionDetail(props) {
    const location = useLocation(); // 넘겨주는 user값 location으로 주소
    const [persc, setPersc] = useState({});
    const [drugs, setDrugs] = useState([]);
    useEffect(() => {
        const init = async () => {
            const percId = location.state;
            const data = await checkPrescription(percId);
            setPersc(data);
            console.log(persc);
            const drugs = await medicineInfo(percId);
            setDrugs(drugs);
            console.log(drugs, "약");
        };
        init();
    }, []);
    return (
        <Container>
            {/* <Box sx={{ fontSize: 40, mt: 7, textAlign: "center", fontWeight: "bold" }}>처방전</Box>; */}
            <Typography sx={{ fontSize: 30, mx: 5, mt: 5, mb: 1, fontWeight: "bold", textAlign: "center" }}>
                처방전
            </Typography>
            <div className='devider'></div>
            <Grid container sx={{ p: 3 }}>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                    <Box sx={{ mt: 2 }}>진단</Box>
                    <Box sx={{ mt: 2 }}>소견</Box>
                    <Box sx={{ mt: 2 }}>처방약</Box>
                    <Box sx={{ mt: 2 }}>복용방법</Box>
                    <Box sx={{ mt: 2 }}>가격</Box>
                    <Box sx={{ mt: 2 }}>배송여부</Box>
                    <Box sx={{ mt: 2 }}>특이사항</Box>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right", fontWeight: "bold", mb: 3 }}>
                    <Box sx={{ mt: 2 }}>{persc.diagnosis} </Box>
                    <Box sx={{ mt: 2 }}>{persc.opinion}</Box>
                    <Box sx={{ mt: 2 }}>
                        {drugs.map((drug, idx) => {
                            return (
                                <Typography key={idx}>
                                    {drug.name} (₩{drug.price})
                                </Typography>
                            );
                        })}
                    </Box>
                    <Box sx={{ mt: 2 }}>{persc.administration}</Box>
                    <Box sx={{ mt: 2 }}>{persc.medicineCost}</Box>
                    <Box sx={{ mt: 2 }}>{persc.isShipping}</Box>
                    <Box sx={{ mt: 2 }}>{persc.additionalCost}</Box>
                </Grid>
            </Grid>
            <div className='devider'></div>
            <Button
                variant='contained'
                sx={{ mt: 3, mb: 3, float: "right" }}
                onClick={() => {
                    props.handleClose();
                }}>
                확인
            </Button>
        </Container>
    );
}

export default PerscriptionDetail;

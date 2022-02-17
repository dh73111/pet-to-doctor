import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { medicineInfo, checkPrescription } from "api/prescription";

function PrescriptionDetail(props) {
    const { prescId } = useParams(); // 넘겨주는 user값 location으로 주소
    const [presc, setPresc] = useState({});
    const [drugs, setDrugs] = useState([]);
    console.log(prescId);
    const navigate = useNavigate();
    const { user } = useSelector((store) => store);
    const sum = () => {
        let sum = 0;
        for (let item of drugs) {
            sum += item.price;
        }
        return sum;
    };
    useEffect(() => {
        const init = async () => {
            const data = await checkPrescription(prescId);
            setPresc(data);
            const drugs = await medicineInfo(prescId);
            setDrugs(drugs);
        };
        init();
    }, []);
    return (
        <Container maxWidth='md' sx={{ border: "1px solid #D7E2EB", p: 4, borderRadius: "0.55rem", mb: 15, mt: 8 }}>
            {/* <Box sx={{ fontSize: 40, mt: 7, textAlign: "center", fontWeight: "bold" }}>처방전</Box>; */}
            <Typography sx={{ fontSize: 30, mx: 5, mt: 3, mb: 3, fontWeight: "bold", textAlign: "center" }}>
                처방전
            </Typography>
            <div className='devider'></div>
            <Grid container>
                <Grid container xs={12} sx={{ p: 3, textAlign: "left" }}>
                    <Grid item xs={6}>
                        <Box sx={{ mt: 2 }}>진단</Box>
                        <Box sx={{ mt: 2 }}>소견</Box>
                        <Box sx={{ mt: 2 }}>배송여부</Box>
                        <Box sx={{ mt: 2 }}>특이사항</Box>
                        <Box sx={{ mt: 2 }}>처방약</Box>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                        <Box sx={{ mt: 2 }}>{presc.diagnosis}</Box>
                        <Box sx={{ mt: 2 }}>{presc.opinion}</Box>
                        <Box sx={{ mt: 2 }}>{presc.isShipping ? "배송" : "-"}</Box>
                        <Box sx={{ mt: 2 }}>{presc.administration}</Box>
                        <Box sx={{ mt: 2 }}>
                            {drugs.map((drug, idx) => {
                                return (
                                    <Box key={idx}>
                                        {idx === 0 ? (
                                            `${drug.name} (₩${drug.price})`
                                        ) : (
                                            <Box>
                                                {drug.name} (₩{drug.price})
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container xs={12} sx={{ p: 3, pt: 0, textAlign: "left" }}>
                    <Grid item xs={6}>
                        <Box>가격</Box>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                        <Box>{sum()}</Box>
                    </Grid>
                </Grid>
            </Grid>
            {/* <Box>
                <Box sx={{ mt: 2 }}>진단 : {presc.diagnosis}</Box>
                <Box sx={{ mt: 2 }}>소견 : {presc.opinion}</Box>
                <Box sx={{ mt: 2 }}>배송여부 : {presc.isShipping ? "배송" : "-"}</Box>
                <Box sx={{ mt: 2 }}></Box>
                <Box sx={{ mt: 2 }}>특이사항 :{presc.administration}</Box>
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ mt: 2 }}>
                        {drugs.map((drug, idx) => {
                            return (
                                <Box key={idx}>
                                    {idx === 0 ? (
                                        `처방약 : ${drug.name} (₩${drug.price})`
                                    ) : (
                                        <Box sx={{ mx: 7 }}>
                                            {drug.name} (₩{drug.price})
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                    <Box sx={{ mt: 2 }}>가격 : {sum()} 원</Box>
                </Box>
            </Box> */}
            <div className='devider'></div>
            {presc.type !== "COMPLETE" && user.role !== "ROLE_DOCTOR" ? (
                <Button
                    variant='contained'
                    sx={{ mx: 1, mt: 3, mb: 3 }}
                    style={{ marginLeft: "80%" }}
                    onClick={() => {
                        navigate("/petodoctor/usermedipayment", {
                            state: { drug: drugs, shippingCost: presc.shippingCost, id: presc.id },
                        });
                    }}>
                    결제
                </Button>
            ) : (
                <Button variant='contained' disabled style={{ marginLeft: "80%" }} sx={{ mx: 1, mt: 3, mb: 3 }}>
                    결제
                </Button>
            )}
            <Button
                variant='contained'
                sx={{ mt: 3, mb: 3 }}
                onClick={() => {
                    navigate(-1);
                }}>
                확인
            </Button>
        </Container>
    );
}

export default PrescriptionDetail;

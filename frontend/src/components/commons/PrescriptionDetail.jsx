import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { medicineInfo, checkPrescription } from "api/prescription";

function PrescriptionDetail(props) {
    const location = useLocation(); // 넘겨주는 user값 location으로 주소
    const [presc, setPresc] = useState({});
    const [drugs, setDrugs] = useState([]);
    const navigate = useNavigate();

    const sum = () => {
        let sum = 0;
        for (let item of drugs) {
            console.log(typeof item.price);
            sum += item.price;
        }
        return sum;
    };
    useEffect(() => {
        const init = async () => {
            const precId = location.state;
            const data = await checkPrescription(precId);
            setPresc(data);
            const drugs = await medicineInfo(precId);
            setDrugs(drugs);
        };
        init();
    }, []);
    console.log(presc);
    return (
        <Container>
            {/* <Box sx={{ fontSize: 40, mt: 7, textAlign: "center", fontWeight: "bold" }}>처방전</Box>; */}
            <Typography sx={{ fontSize: 30, mx: 5, mt: 5, mb: 1, fontWeight: "bold", textAlign: "center" }}>
                처방전
            </Typography>
            <div className='devider'></div>
            <Box>
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
            </Box>
            <div className='devider'></div>
            <Button
                variant='contained'
                sx={{ mt: 3, mb: 3, float: "right" }}
                onClick={() => {
                    props.handleClose();
                }}>
                확인
            </Button>
            {presc.type !== "COMPLETE" ? (
                <Button
                    variant='contained'
                    sx={{ mx: 1, mt: 3, mb: 3, float: "right" }}
                    onClick={() => {
                        navigate("/petodoctor/usermedipayment", {
                            state: { drug: drugs, shippingCost: presc.shippingCost },
                        });
                    }}>
                    결제
                </Button>
            ) : (
                ""
            )}
        </Container>
    );
}

export default PrescriptionDetail;

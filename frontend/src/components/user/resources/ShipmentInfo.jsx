import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";

function ShipmentInfo(props) {
    const id = "daum-postcode";
    const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    // 처방배송 필요한 데이터
    // 우편번호(zipcode), 도시(city), 거리(상세주소 street), 수신자이름(shippingName), 수신자연락처(shippingTel),
    //
    const openPopup = () => {
        // 우편번호 검색을 위한 popup
        window.daum.postcode.load(() => {
            const postcode = new window.daum.Postcode({
                // oncomplete는 daum-postcode에서 제공된 함수
                oncomplete: function (data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
                    console.log(data);
                    props.setZipcode(data.zonecode);
                    props.setCity(data.roadAddress);
                },
            });
            postcode.open();
        });
    };
    useEffect(() => {
        // 초기실행시 html에 script를 import해줌
        const isAlready = document.getElementById(id);

        if (!isAlready) {
            const script = document.createElement("script");
            script.src = src;
            script.id = id;
            document.body.append(script);
        }
    }, []);

    const gridContainer = { display: "flex", mb: 1 };
    const shipmentLabel = { width: "260px", fontWeight: "600", lineHeight: "40px" };
    return (
        <Box sx={{ mb: 2, p: 3, backgroundColor: "#F5F6F7" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                    배송정보
                </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" /* backgroundColor: '#CDEEF4' */ }}>
                    <Grid container sx={gridContainer}>
                        <Typography item xs={12} sx={shipmentLabel}>
                            수령자
                        </Typography>
                        <TextField
                            sx={{ flex: 1, maxWidth: "260px" }}
                            id='outlined-basic'
                            variant='outlined'
                            size='small'
                            onChange={(e) => {
                                props.setShippingName(e.target.value);
                            }}
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
                            onChange={(e) => {
                                props.setTel(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid container sx={gridContainer}>
                        <Typography item xs={12} sx={shipmentLabel}>
                            주소
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <Box>
                                <TextField
                                    sx={{ mb: 1 }}
                                    variant='outlined'
                                    size='small'
                                    disabled
                                    value={props.zipcode}
                                />
                                <Button sx={{ ml: 1 }} onClick={openPopup} variant='contained'>
                                    우편번호 검색
                                </Button>
                            </Box>
                            <TextField sx={{ mb: 1 }} variant='outlined' size='small' disabled value={props.city} />
                            <TextField
                                variant='outlined'
                                size='small'
                                onChange={(e) => {
                                    props.setStreet(e.target.value);
                                }}
                            />
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default ShipmentInfo;

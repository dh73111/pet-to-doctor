import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    createTheme,
    Divider,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import PayMethod from "./resources/PayMethod";
import ShipmentInfo from "./resources/ShipmentInfo";
import TotalPrice from "./resources/TotalPrice";
import PaymentHeading from "./resources/PaymentHeading";
import PaymentUserInfo from "./resources/PaymentUserInfo";
import Banner from "./resources/Banner";
import { useSelector } from "react-redux";
import { Store } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

function UserMedicinePayment(props) {
    const gridContainer = { display: "flex", mb: 1 };
    const shipmentLabel = { width: "260px", fontWeight: "600", lineHeight: "40px" };

    const newTheme = createTheme({
        palette: {
            primary: {
                main: "#309FB3",
            },
        },
    });
    const [tel, setTel] = useState("");
    const [shippingName, setShippingName] = useState("");
    const [street, setStreet] = useState("");
    const [zipCode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const user = useSelector((store) => store.user);
    console.log(user, " ddd");
    const userInfo = {
        name: user.name,
        tel: user.tel,
    };
    const { drug } = useLocation().state;

    console.log(drug, "location");

    const prescription = {
        message: "string",
        data: {
            id: 0,
            administration: "string",
            medicine: "소독약, 소염제, 해열제",
            diagnosis: "알러지",
            opinion: "아이가 피부가 약해서 염증이 난 것 같습니다. 심각한건 아니니 소독만 해주시면 됩니다 :)",
            price: 3000,
            type: "UNCOMPLETE",
            isShipping: true,
            invoiceCode: "string",
            paymentCode: "string",
            shippingAddress: {
                city: "대전광역시",
                street: "문정로 11",
                zipcode: "12345",
            },
            shippingName: "string",
            shippingTel: "string",
        },
    };
    const treatment = {
        message: "string",
        data: {
            id: 0,
            userId: 0,
            doctorId: 0,
            prescriptionId: 0,
            hospitalId: 0,
            paymentCode: "string",
            scheduleDate: "2022-02-04T02:57:19.525Z",
            type: "RES_REQUEST",
            reVisit: true,
            petName: "string",
            symptom: "string",
            birthDate: "2022-02-04",
            petSpecies: "string",
            petWeight: "string",
            price: 0,
            url: "string",
        },
    };

    // const total = prescription.data.price;
    return (
        <ThemeProvider theme={newTheme}>
            <Container maxWidth='lg'>
                <Box container>
                    <PaymentHeading title={"처방받은 약을 결제해주세요"} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} sx={{ display: "flex", flexDirection: "column" }}>
                            <Box sx={{ mb: 2, p: 3, backgroundColor: "#F5F6F7" }}>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    약정보
                                </Typography>
                                <ul sx={{ mt: 2 }}>
                                    {drug.map((item, index) => (
                                        <li>{item.name}</li>
                                    ))}
                                </ul>
                            </Box>
                            <Box sx={{ mb: 2, p: 3, backgroundColor: "#F5F6F7" }}>
                                <Grid
                                    container
                                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                    <Typography item xs={12} variant='h6' sx={{ fontWeight: 600 }}>
                                        주문자정보
                                    </Typography>
                                </Grid>
                                <Box container sx={{ mt: 2, display: "flex" }}>
                                    <PaymentUserInfo user={userInfo} />
                                    {/* <Box sx={{ border: 1 }}>목록</Box>
                  <Box>인풋들</Box> */}
                                </Box>
                            </Box>
                            <ShipmentInfo
                                setCity={setCity}
                                setZipcode={setZipcode}
                                setStreet={setStreet}
                                setShippingName={setShippingName}
                                setTel={setTel}
                            />
                            {/* <PayMethod /> */}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ backgroundColor: "#F5F6F7", p: 4 }}>
                                <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                                    최종결제금액
                                </Typography>
                                <Grid container sx={{ justifyContent: "flex-end", mb: 4 }}>
                                    <Grid align='right' item xs={4}>
                                        <Typography sx={{ fontWeight: 600 }}>배송비</Typography>
                                    </Grid>
                                    <Grid align='right' item xs={7}>
                                        <Typography xs={6} sx={{ ml: 3, pr: 1 }}>
                                            3,000원
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid
                                    continer
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mt: 2,
                                    }}>
                                    <Grid item xs={4}>
                                        <Typography>총 결제예정 금액</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='h4' sx={{ textAlign: "right" }}>
                                            {}원
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ p: 4 }}>
                                <Button variant='contained' sx={{ width: "100%", height: "40px", mx: "auto" }}>
                                    결제
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default UserMedicinePayment;

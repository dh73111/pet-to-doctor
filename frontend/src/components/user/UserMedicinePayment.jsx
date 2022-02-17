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
import { useLocation, useNavigate } from "react-router-dom";
import { changePerscription } from "api/prescription";
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
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const user = useSelector((store) => store.user);
    const userInfo = {
        name: user.name,
        tel: user.tel,
    };
    const { drug } = useLocation().state;
    const { shippingCost } = useLocation().state;
    const { id } = useLocation().state;
    const sum = () => {
        let sum = 0;
        for (let item of drug) {
            sum += item.price;
        }
        return sum;
    };
    const { IMP } = window;
    IMP.init("imp36272840");
    // console.log(city);
    // console.log(street);
    // console.log(zipcode);
    // console.log(shippingName);
    // console.log(tel);
    // console.log(shippingCost);
    const navigate = useNavigate();
    const pay = async () => {
        IMP.request_pay(
            {
                pg: "kakaopay",
                pay_method: "kakaopay",
                merchant_uid: String(id + 123456789),
                name: `${userInfo.name} 처방 약 결제`,
                amount: sum() + shippingCost,
            },
            async (response) => {
                console.log(response);
                await changePerscription(id, {
                    paymentCode: id + 123456789,
                    shippingCost: sum() + 3000,
                    shippingTel: tel,
                    shippingName: shippingName,
                    address: { city: city, street: street, zipcode: zipcode },
                });
                navigate("/petodoctor/userreservationcomplete");
            }
        );
    };
    return (
        <ThemeProvider theme={newTheme}>
            <Container maxWidth='lg' sx={{ mb: 15 }}>
                <Box container>
                    <PaymentHeading title={"처방받은 약을 결제해주세요"} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} sx={{ display: "flex", flexDirection: "column" }}>
                            <Box sx={{ mb: 2, p: 3, border: "1px solid #D7E2EB", borderRadius: "0.55rem" }}>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    약정보
                                </Typography>
                                <ul sx={{ mt: 2 }}>
                                    {drug.map((item, index) => (
                                        <li>{item.name}</li>
                                    ))}
                                </ul>
                            </Box>
                            <Box sx={{ mb: 2, p: 3, border: "1px solid #D7E2EB", borderRadius: "0.55rem" }}>
                                <Grid
                                    container
                                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                    <Typography item xs={12} variant='h6' sx={{ fontWeight: 600 }}>
                                        주문자정보
                                    </Typography>
                                </Grid>
                                <Box container sx={{ mt: 2, display: "flex" }}>
                                    <PaymentUserInfo user={userInfo} />
                                </Box>
                            </Box>
                            <ShipmentInfo
                                setCity={setCity}
                                setZipcode={setZipcode}
                                setStreet={setStreet}
                                setShippingName={setShippingName}
                                setTel={setTel}
                                zipcode={zipcode}
                                city={city}
                            />
                            {/* <PayMethod /> */}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ border: "1px solid #D7E2EB", borderRadius: "0.55rem", p: 4 }}>
                                <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                                    최종결제금액
                                </Typography>
                                <Grid container sx={{ justifyContent: "flex-end", mb: 4 }}>
                                    <Grid align='right' item xs={4}>
                                        <Typography sx={{ fontWeight: 600 }}>배송비</Typography>
                                    </Grid>
                                    <Grid align='right' item xs={7}>
                                        <Typography xs={6} sx={{ ml: 3, pr: 1 }}>
                                            3000 원
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
                                            {sum() + 3000}원
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ p: 4 }}>
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        pay();
                                    }}
                                    sx={{ width: "100%", height: "40px", mx: "auto" }}>
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

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Typography } from "@mui/material";

function DoctorPrescriptionForm(props) {
    const [values, setValues] = useState({
        symptom: "",
        weight: "",
        specific: "",
        diagonose: "",
        time: "",
    });
    const [medicineList, setMedicineList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const idx = 0;
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const clickBtn = () => {
        let item = { medicine: "테스트1", price: "테스트" };
        let tempmedicineList = [...medicineList];
        tempmedicineList.push(item);
        setMedicineList(tempmedicineList);
    };

    const Medicine = (props) => {
        console.log(props, "이곳");
        return (
            <Box>
                {props.medicineList.map((item, i) => (
                    <Grid container key={i} spacing={2}>
                        <Grid item xs={5}>
                            <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                <InputLabel htmlFor='filled-adornment-name'>약 이름</InputLabel>
                                <FilledInput
                                    id='filled-adornment-name'
                                    value={item.medicine}
                                    onChange={handleChange("medicine")}
                                    startAdornment={<InputAdornment position='start'></InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                <InputLabel htmlFor='filled-adornment-name'>가격</InputLabel>
                                <FilledInput
                                    id='filled-adornment-name'
                                    value={item.price}
                                    onChange={handleChange("price")}
                                    startAdornment={<InputAdornment position='start'></InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    console.log("DELETE");
                                }}>
                                DELETE
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        );
    };

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Container maxWidth='md'>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ fontSize: 40, mt: 7, fontWeight: "bold" }}>처방전</Box>
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: "bold", fontSize: 25 }}>
                    <Box sx={{ mt: 4 }}>증상</Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                            <InputLabel htmlFor='filled-adornment-name'>증상</InputLabel>
                            <FilledInput
                                id='filled-adornment-name'
                                value={values.name}
                                onChange={handleChange("name")}
                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ mt: 6 }}>
                        처방약 <Button onClick={clickBtn}> 추가 </Button>
                        <Medicine medicineList={medicineList}></Medicine>
                    </Box>
                    <Box sx={{ mt: 6 }}>진단 결과</Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                            <InputLabel htmlFor='filled-adornment-name'>증상</InputLabel>
                            <FilledInput
                                id='filled-adornment-name'
                                value={values.name}
                                onChange={handleChange("name")}
                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ mt: 6 }}>가격</Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                            <InputLabel htmlFor='filled-adornment-name'>증상</InputLabel>
                            <FilledInput
                                id='filled-adornment-name'
                                value={values.name}
                                onChange={handleChange("name")}
                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ mt: 6 }}>
                        배송여부
                        <Typography sx={{ mt: 1 }}>
                            <input type='checkbox' onChange={() => handleCheck()} />{" "}
                            {isChecked ? "처방 약을 배송합니다." : "처방 약을 배송하지 않습니다."}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DoctorPrescriptionForm;

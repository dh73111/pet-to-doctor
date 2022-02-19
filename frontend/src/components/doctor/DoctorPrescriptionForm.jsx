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
import { addPrescription } from "api/prescription";
import { treatmentState } from "api/treatment";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
function DoctorPrescriptionForm(props) {
    const { id } = useParams();
    const [values, setValues] = useState({
        symptom: "",
        diagnosis: "",
        admin: "",
        opinion: "",
    });
    const [medicineList, setMedicineList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const idx = 0;
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleMedicine = (prop, index) => (event) => {
        let list = [...medicineList];
        console.log(prop, "prop ", index);
        list[index] = { ...medicineList[index], [prop]: event.target.value };
        setMedicineList(list);
        console.log(list);
    };
    const clickBtn = () => {
        let item = { name: "", price: "" };
        let tempmedicineList = [...medicineList];
        tempmedicineList.push(item);
        setMedicineList(tempmedicineList);
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
                                value={values.diagnosis}
                                onChange={handleChange("diagnosis")}
                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ mt: 6 }}>
                        처방약 <Button onClick={clickBtn}> 추가 </Button>
                        <Box>
                            {medicineList.map((item, i) => (
                                <Grid container key={i} spacing={2}>
                                    <Grid item xs={5}>
                                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                                            <InputLabel htmlFor='filled-adornment-name'>약 이름</InputLabel>
                                            <FilledInput
                                                id='filled-adornment-name'
                                                value={item.name}
                                                onChange={handleMedicine("name", i)}
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
                                                onChange={handleMedicine("price", i)}
                                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            variant='contained'
                                            onClick={() => {
                                                let tempList = [...medicineList];
                                                tempList.splice(i, 1);
                                                setMedicineList(tempList);
                                            }}>
                                            DELETE
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mt: 6 }}>진단 결과</Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                            <InputLabel htmlFor='filled-adornment-name'>진단</InputLabel>
                            <FilledInput
                                id='filled-adornment-name'
                                value={values.opinion}
                                onChange={handleChange("opinion")}
                                startAdornment={<InputAdornment position='start'></InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ mt: 6 }}>복용 방법</Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                            <InputLabel htmlFor='filled-adornment-name'>복용법</InputLabel>
                            <FilledInput
                                id='filled-adornment-name'
                                value={values.admin}
                                onChange={handleChange("admin")}
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

                    <Box sx={{ mt: 6, textAlign: "center" }}>
                        <Button
                            sx={{ mt: 1 }}
                            variant='contained'
                            onClick={async () => {
                                console.log({
                                    diagnosis: values.diagnosis,
                                    medicines: medicineList,
                                    isShipping: isChecked,
                                    administration: values.admin,
                                    opinion: values.opinion,
                                });
                                const res = await addPrescription(id, {
                                    diagnosis: values.diagnosis,
                                    medicines: medicineList,
                                    isShipping: isChecked,
                                    administration: values.admin,
                                    opinion: values.opinion,
                                });

                                // const res2 = await treatmentState(id, "RES_COMPLETED");
                                console.log(res);
                                // console.log(res2);

                                window.close();
                            }}>
                            작성 완료
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DoctorPrescriptionForm;

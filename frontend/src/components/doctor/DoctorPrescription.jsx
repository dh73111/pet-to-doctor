import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import PerscriptionDetail from "../commons/PrescriptionDetail";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { prescriptionAll } from "../../api/prescription";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function createData(no, state, deliveryNo) {
    return { no, state, deliveryNo };
}

const rows = [createData(1, "완료", "3456789"), createData(1, "완료", "")].sort((a, b) => (a.no < b.no ? -1 : 1));

const Root = styled("div")`
    table {
        font-family: noto sans, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td,
    th {
        text-align: left;
        padding: 8px;
    }
`;

function DoctorPrescription(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [value, setValue] = React.useState(new Date());
    const [state, setState] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = (event) => {
        console.log(event.target.value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setState(event.target.value);
    };

    const [onLoad, setOnLoad] = useState(true);

    const doctorId = useSelector((store) => store.user.id);
    const [prescriptions, setPrescription] = useState([]);

    useEffect(() => {
        const getdata = async () => {
            const data = await prescriptionAll(doctorId);
            console.log(data, "data");
            setPrescription(data);
        };
        getdata();

        setOnLoad(false);
        console.log(doctorId, "doctorId");

        console.log(prescriptions, "prescriptions");
    }, []);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 680,
        bgcolor: "background.paper",
        boxShadow: 24,
    };

    return (
        <Container>
            <Grid container>
                <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
                    처방현황
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={2} sx={{ px: 4 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disableFuture
                            label='날짜'
                            openTo='year'
                            views={["year", "month", "day"]}
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ width: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>ALL</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={state}
                                label='state'
                                onChange={handleChange}>
                                <MenuItem value={10}>결제 대기</MenuItem>
                                <MenuItem value={20}>결제 완료</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Root sx={{ mt: 3 }}>
                        <table className='favhospital'>
                            <thead>
                                <tr>
                                    <th>처방번호</th>
                                    <th>처방정보</th>
                                    <th>결제상태</th>
                                    <th>운송장번호/택배사</th>
                                </tr>
                            </thead>
                            {onLoad === 0 ? (
                                <tr>
                                    <td>
                                        <Skeleton />
                                    </td>
                                    <td>
                                        <Skeleton />
                                    </td>
                                    <td>
                                        <Skeleton />
                                    </td>
                                    <td>
                                        <Skeleton />
                                    </td>
                                    <td>
                                        <Skeleton />
                                    </td>
                                    <td>
                                        <Skeleton />
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    <tbody>
                                        {prescriptions.map((res, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{res.id}</td>
                                                    <td>
                                                        {res.perscriptionId ? (
                                                            "X"
                                                        ) : (
                                                            <Link
                                                                to={`/petodoctor/presciption/${res.id}`}
                                                                state={res.id}>
                                                                처방 내용
                                                            </Link>
                                                        )}
                                                    </td>
                                                    <td>{res.type}</td>
                                                    <td>{res.type === "COMPLETE" ? res.innvoiceCode : "x"}</td>
                                                    <td>
                                                        <button>운송장 번호 등록</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </>
                            )}
                        </table>
                    </Root>
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}></Box>
            </Modal>
        </Container>
    );
}

export default DoctorPrescription;

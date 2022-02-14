import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { Typography, Modal, Skeleton } from "@mui/material";
import ReservationDetail from "../commons/ReservationDetail";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { treatments } from "../../api/treatment.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Root = styled("div")`
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td,
    th {
        text-align: left;
        padding: 8px;
    }
`;

function DoctorReservation(props) {
    const doctorId = useSelector((store) => store.user.id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [value, setValue] = useState(new Date());
    const [state, setState] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = (event) => {
        console.log(event.target.value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setState(event.target.value);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 780,
        // height: 800,
        bgcolor: "background.paper",
        boxShadow: 24,
        boxSizing: "border-box",
    };
    const [reservations, setReservations] = useState([]);
    const [onLoad, setOnLoad] = useState(true);
    const [type, setType] = useState("");

    useEffect(() => {
        const getdata = async () => {
            const data = await treatments(doctorId);
            console.log(data, "data");
            setReservations(data);
        };
        getdata();
        setOnLoad(false);

        console.log(reservations, "reservations");
    }, []);

    const handleChangeCompleted = (event) => {
        setType("예약");
    };
    const handleChangeCanceled = (event) => {
        setType("취소");
    };
    return (
        <Container>
            <Grid container>
                <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
                    받은예약
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
                                size='small'
                                onChange={handleChange}>
                                <MenuItem value={10}>예약 요청</MenuItem>
                                <MenuItem value={20}>예약 취소</MenuItem>
                                <MenuItem value={30}>예약 확인</MenuItem>
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
                                    <th>예약번호</th>
                                    <th>예약일</th>
                                    <th>예약시간</th>
                                    <th>예약상태</th>
                                    <th>자세히보기</th>
                                    <th>예약승인</th>
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
                                        {reservations.map((res, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{res.scheduleDate.substring(0, 10)}</td>
                                                    <td>{res.scheduleDate.substring(11, 16)}</td>
                                                    <td>{res.type}</td>
                                                    {/* <td>{convertor[treat.type]}</td> */}
                                                    <td>
                                                        {res.perscriptionId ? (
                                                            "X"
                                                        ) : (
                                                            <Link
                                                                to={`/petodoctor/reservation/${res.id}`}
                                                                state={res.id}>
                                                                예약 내용
                                                            </Link>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button onClick={handleChangeCompleted}>승인</Button>
                                                        <Button onClick={handleChangeCanceled}>취소</Button>
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
                <Box sx={style}>
                    <ReservationDetail></ReservationDetail>
                </Box>
            </Modal>
        </Container>
    );
}

export default DoctorReservation;

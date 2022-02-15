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
import { doctorAllTreatmentList, treatmentState } from "../../api/treatment.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SliderValueLabelUnstyled } from "@mui/base";

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

    const convertor = {
        RES_REQUEST: "신청(온라인)",
        RES_PAID: "결제완료(온라인)",
        RES_CANCEL: "취소(온라인)",
        RES_CONFIRMED: "승인(온라인)",
        RES_COMPLETED: "상담완료(온라인)",
        VST_REQUEST: "신청(방문)",
        VST_PAID: "결제완료(방문)",
        VST_CANCEL: "취소(방문)",
        VST_CONFIRMED: "승인(방문)",
        VST_COMPLETED: "상담완료(방문)",
    };

    const conditions = [
        "RES_REQUEST",
        "RES_PAID",
        "RES_CANCEL",
        "RES_CONFIRMED",
        "RES_COMPLETED",
        "VST_REQUEST",
        "VST_PAID",
        "VST_CANCEL",
        "VST_CONFIRMED",
        "VST_COMPLETED",
    ];
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
    const [onLoad, setOnLoad] = useState(true);
    const [treatmentInfo, setTreatmentInfo] = useState([]);
    const [treatAllList, setTreatAllList] = useState([]);
    const [treatRequest, setTreatRequest] = useState([]);
    const [treatPaid, setTreatPaid] = useState([]);
    const [treatCancel, setTreatCancel] = useState([]);
    const [treatConfirm, setTreatConfirm] = useState([]);
    const [treatComplete, setTreatComplete] = useState([]);
    useEffect(() => {
        const getdata = async () => {
            const data = await doctorAllTreatmentList(doctorId);
            let tempRequestList = [];
            let tempCancelList = [];
            let tempConfirmList = [];
            let tempPaidList = [];
            let tempCompleteList = [];
            for (let item of data) {
                const status = item.type.substring(4);
                if (status === "REQUEST") {
                    tempRequestList.push(item);
                } else if (status === "CANCEL") {
                    tempCancelList.push(item);
                } else if (status === "CONFIRMED ") {
                    tempConfirmList.push(item);
                } else if (status === "PAID") {
                    tempPaidList.push(item);
                } else if (status === "COMPLETED") {
                    tempCompleteList.push(item);
                }
            }
            setTreatmentInfo(data);
            setTreatAllList(data);
            setTreatRequest(tempRequestList);
            setTreatPaid(tempPaidList);
            setTreatCancel(tempCancelList);
            setTreatConfirm(tempConfirmList);
            setTreatComplete(tempCompleteList);
            setOnLoad(false);
        };
        getdata();
    }, []);
    const handleChange = (event) => {
        setState(event.target.value);
        // setList(event.target.value, value);
        setList(event.target.value, value);
    };
    const [statechange, SetStatechange] = useState({
        treatmentId: "",
        treatmentType: "",
    });
    const handleChangeCompleted = async (idx) => {
        console.log(treatmentInfo, "treatmentInfo");
        const id = treatmentInfo[idx].id;
        const type = treatmentInfo[idx].type;
        console.log(id, "idd");
        console.log(type, "typeee");
        if (type === "RES_PAID") {
            const data = {
                treatmentId: id,
                treatmentType: "RES_CONFIRMED",
            };
            SetStatechange(data);
            console.log(data, "data");
            await treatmentState(data.treatmentId, data.treatmentType);
        } else if (type === "VST_REQUEST") {
            const data = {
                treatmentId: id,
                treatmentType: "VST_CONFIRMED",
            };
            SetStatechange(data);
            await treatmentState(data.treatmentId, data.treatmentType);
        }
    };

    const setList = (value) => {
        switch (value) {
            case 0:
                setTreatmentInfo(treatAllList);
                break;
            case 1:
                setTreatmentInfo(treatRequest);
                break;
            case 2:
                setTreatmentInfo(treatCancel);
                break;
            case 3:
                setTreatmentInfo(treatPaid);
                break;
            case 4:
                setTreatmentInfo(treatConfirm);
                break;
            case 5:
                setTreatmentInfo(treatComplete);
                break;
            default:
                setTreatmentInfo(treatAllList);
                break;
        }
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
                            <InputLabel id='demo-simple-select-label'>선택</InputLabel>
                            <Select
                                sx={{ height: 55 }}
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={state}
                                label='state'
                                size='small'
                                onChange={handleChange}>
                                <MenuItem value={0}>모두 보기</MenuItem>
                                <MenuItem value={1}>예약 신청</MenuItem>
                                <MenuItem value={2}>예약 취소</MenuItem>
                                <MenuItem value={3}>예약 승인</MenuItem>
                                <MenuItem value={4}>결제 완료</MenuItem>
                                <MenuItem value={5}>진료 완료</MenuItem>
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
                                        {treatmentInfo.map((res, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{res.scheduleDate.substring(0, 10)}</td>
                                                    <td>{res.scheduleDate.substring(11, 16)}</td>
                                                    <td>{convertor[res.type]}</td>
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
                                                        {res.type === "RES_PAID" ? (
                                                            <Button onClick={() => handleChangeCompleted(idx)}>
                                                                승인
                                                            </Button>
                                                        ) : (
                                                            ""
                                                        )}
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

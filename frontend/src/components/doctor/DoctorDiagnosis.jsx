import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Pagination, Stack } from "@mui/material";
import { doctorTreatmentAllInfo } from "api/treatment";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Skeleton } from "@mui/material";

function createData(no, date, time, name, state) {
    return { no, date, time, name, state };
}

const rows = [createData(1, "2022-01-19", "15:30", "김싸피", "RES_ACCEPTED")].sort((a, b) => (a.no < b.no ? -1 : 1));

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

function DoctorDiagnosis(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const doctorId = useSelector((store) => store.user.id);
    const [diagonosisInfo, setDiagonosisInfo] = useState({});
    const [diagonosisAllList, setDiagonosisAllList] = useState([]);
    const [diagonosisRequest, setDiagonosisRequest] = useState([]);
    const [diagonosisPaid, setDiagonosisPaid] = useState([]);
    const [diagonosisCancel, setDiagonosisCancel] = useState([]);
    const [diagonosisConfirm, setDiagonosisConfirm] = useState([]);
    const [diagonosisComplete, setDiagonosisComplete] = useState([]);
    const [value, setValue] = React.useState(new Date());
    const [state, setState] = React.useState("");
    const [onLoad, setOnLoad] = useState(true);

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

    useEffect(() => {
        const init = async () => {
            const list = await doctorTreatmentAllInfo(doctorId);
            let tempRequestList = [];
            let tempCancelList = [];
            let tempConfirmList = [];
            let tempPaidList = [];
            let tempCompleteList = [];
            for (let item of list) {
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
            setDiagonosisInfo(list);
            setDiagonosisAllList(list);
            setDiagonosisRequest(tempRequestList);
            setDiagonosisPaid(tempPaidList);
            setDiagonosisCancel(tempCancelList);
            setDiagonosisConfirm(tempConfirmList);
            setDiagonosisComplete(tempCompleteList);
            setOnLoad(false);
        };
        init();
    }, []);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const offset = new Date().getTimezoneOffset() * 60000; // 1000밀리초 * 60  -> 1분
    const enterConsulting = (time, id) => {
        // 입장가능 로직 -> 확인해야함
        let currentTime = new Date(Date.now() - offset).toISOString();
        let start = Number(time.substring(14, 16));
        let end = start + 30;
        let currentMin = currentTime.substring(14, 16);
        if (
            currentTime.substring(0, 10) === time.substring(0, 10) &&
            currentTime.substring(11, 13) === time.substring(11, 13) &&
            start <= currentMin &&
            currentMin <= end
        ) {
            navigate(`/petodoctor/userconsulting/${id}`);
        } else
            alert(
                `입장이 불가능합니다. 현재시간 ${currentTime.substring(11, 16)} , 입장시간 ${time.substring(
                    11,
                    16
                )} 그러나 발표를 위해서 입장!`
            );
        navigate(`/petodoctor/userconsulting/${id}`);
    };
    const handleChange = (event) => {
        setState(event.target.value);
        // setList(event.target.value, value);
        setList(event.target.value, value);
    };

    const setList = (value) => {
        switch (value) {
            case 0:
                setDiagonosisInfo(diagonosisAllList);
                break;
            case 1:
                setDiagonosisInfo(diagonosisRequest);
                break;
            case 2:
                setDiagonosisInfo(diagonosisCancel);
                break;
            case 3:
                setDiagonosisInfo(diagonosisPaid);
                break;
            case 4:
                setDiagonosisInfo(diagonosisConfirm);
                break;
            case 5:
                setDiagonosisInfo(diagonosisComplete);
                break;
            default:
                setDiagonosisInfo(diagonosisAllList);
                break;
        }
    };
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1200,
        height: 800,
        bgcolor: "background.paper",
        boxShadow: 24,
    };
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Container>
            <Grid container>
                <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
                    진료현황
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={2} sx={{ px: 4 }}>
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                    </LocalizationProvider> */}
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
                                    <th>고객</th>
                                    <th>상담실</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            {onLoad ? (
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
                                        {diagonosisInfo.map((treat, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{treat.scheduleDate.substring(0, 10)}</td>
                                                    <td>{treat.scheduleDate.substring(11, 16)}</td>
                                                    <td>{treat.petName}</td>
                                                    <td>
                                                        {treat.type !== "RES_CONFIRMED" ? (
                                                            <Box sx={{ mx: 2 }}>-</Box>
                                                        ) : (
                                                            <Button
                                                                variant='contained'
                                                                onClick={() => {
                                                                    enterConsulting(treat.scheduleDate);
                                                                }}>
                                                                입장하기
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant='contained'
                                                            onClick={() => {
                                                                enterConsulting(treat.scheduleDate, treat.id);
                                                            }}>
                                                            입장하기 테스트
                                                        </Button>
                                                    </td>
                                                    <td>{convertor[treat.type]}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </>
                            )}
                        </table>
                    </Root>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Pagination count={10} sx={{ border: 1, mx: "auto", maxWidth: "414px" }} size='large' />
        </Container>
    );
}

export default DoctorDiagnosis;

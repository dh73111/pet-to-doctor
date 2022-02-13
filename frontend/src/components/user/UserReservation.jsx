import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { Modal, Skeleton } from "@mui/material";
import ReservationDetail from "../commons/ReservationDetail";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Link, NavLink } from "react-router-dom";
import { userTreatmentInfo } from "api/treatment";
import { useSelector } from "react-redux";

function createData(no, date, time, hospital, doctor, state, perscription, shipNo) {
    return { no, date, time, hospital, doctor, state, perscription, shipNo };
}

const rows = [
    createData(1, "2022-01-19", "15:30", "hospital", "doctor", "RES_REQUEST", "", "1234"),
    createData(2, "2022-01-19", "15:30", "hospital", "doctor", "RES_REQUEST", "처방", "1234"),
].sort((a, b) => (a.no < b.no ? -1 : 1));

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

    th {
        background-color: white;
    }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
    & .MuiTablePaginationUnstyled-toolbar {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;

        @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
        }
    }

    & .MuiTablePaginationUnstyled-selectLabel {
        margin: 0;
    }

    & .MuiTablePaginationUnstyled-displayedRows {
        margin: 0;

        @media (min-width: 768px) {
            margin-left: auto;
        }
    }

    & .MuiTablePaginationUnstyled-spacer {
        display: none;
    }

    & .MuiTablePaginationUnstyled-actions {
        display: flex;
        gap: 0.25rem;
    }
`;
function UserReservation(props) {
    const userId = useSelector((store) => store.user.id);
    const [onLoad, setOnLoad] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [value, setValue] = useState(new Date());
    const [state, setState] = useState("");
    const [treatmentInfo, setTreatmentInfo] = useState([]);

    let treatAllList = [];
    let treatRequest = [];
    let treatPaid = [];
    let treatCancel = [];
    let treatReject = [];
    let treatAccep = [];
    let treatAccepCancel = [];
    let treatComplete = [];

    const convertor = {
        RES_REQUEST: "신청(온라인)",
        RES_PAID: "결제완료(온라인)",
        RES_CANCEL: "취소(온라인)",
        RES_REJECT: "거절(온라인)",
        RES_ACCEPTED: "승인(온라인)",
        RES_ACCEPTED_CANCEL: "승인취소(온라인)",
        RES_COMPLETE: "상담완료(온라인)",
        VST_REQUEST: "신청(방문)",
        VST_PAID: "결제완료(방문)",
        VST_REJECT: "거절(방문)",
        VST_CANCEL: "취소(방문)",
        VST_ACCEPTED: "승인(방문)",
        VST_ACCEPTED_CANCEL: "승인취소(방문)",
        VST_COMPLETE: "상담완료(방문)",
    };

    useEffect(() => {
        const init = async () => {
            const conditions = [
                "RES_REQUEST",
                "RES_PAID",
                "RES_CANCEL",
                "RES_REJECT",
                "RES_ACCEPTED",
                "RES_ACCEPTED_CANCEL",
                "RES_COMPLETE",
                "VST_REQUEST",
                "VST_PAID",
                "VST_REJECT",
                "VST_CANCEL",
                "VST_ACCEPTED",
                "VST_ACCEPTED_CANCEL",
                "VST_COMPLETE",
            ];
            for (let condition of conditions) {
                const data = await userTreatmentInfo(userId, condition);
                treatAllList = [...treatAllList, ...data];
                // setTreatAllList([...treatAllList, ...data]);
                if (data.length !== 0) {
                    const status = data[0].type.substring(4);
                    if (status === "REQUEST") {
                        treatRequest.push(data);
                    } else if (status === "CANCEL") {
                        treatCancel.push(data);
                    } else if (status === "REJECT ") {
                        treatReject.push(data);
                    } else if (status === "PAID") {
                        treatPaid.push(data);
                    } else if (status === "ACCEPTED") {
                        treatAccep.push(data);
                    } else if (status === "ACCEPTED_CANCEL") {
                        treatAccepCancel.push(data);
                    } else if (status === "COMPLETE") {
                        treatComplete.push(data);
                    }
                }
            }
            setTreatmentInfo(treatAllList);
            setOnLoad(false);
        };
        init();
    }, []);

    const [open, setOpen] = React.useState(false);
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
        width: 1200,
        height: 800,
        bgcolor: "background.paper",
        boxShadow: 24,
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <button
                onClick={() => {
                    console.log(treatmentInfo);
                }}>
                모든예약현황
            </button>
            <Grid container>
                <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
                    내 예약 예약현황
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
                            size='small'
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
                                    <th>병원</th>
                                    <th>담당의</th>
                                    <th>예약상태</th>
                                    <th>상담실</th>
                                    <th>처방전</th>
                                    <th>배송번호</th>
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
                                        {treatmentInfo.map((treat, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{treat.scheduleDate}</td>
                                                    <td>{treat.scheduleDate.substring(11, 16)}</td>
                                                    <td>{treat.hospitalId}</td>
                                                    <td>{treat.doctorId}</td>
                                                    <td>{convertor[treat.type]}</td>
                                                    <td>{treat.url ? treat.url : "X"}</td>
                                                    <td>
                                                        {treat.perscriptionId ? (
                                                            "X"
                                                        ) : (
                                                            <Link
                                                                to={`/petodoctor/persciption/${treat.prescriptionId}`}
                                                                state={treat.prescriptionId}>
                                                                처방전
                                                            </Link>
                                                        )}
                                                    </td>
                                                    <td>배송번호</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </>
                            )}
                            {/* {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row) => (
                                    <tr key={row.no}>
                                        <td style={{ width: 140 }}> {row.no}</td>
                                        <td style={{ width: 140 }} align='right'>
                                            {row.date}
                                        </td>
                                        <td style={{ width: 140 }} align='right'>
                                            {row.time}
                                        </td>
                                        <td style={{ width: 140 }} align='right'>
                                            {row.hospital}
                                        </td>
                                        <td style={{ width: 140 }} align='right'>
                                            {row.doctor}
                                        </td>
                                        <td style={{ width: 140 }} align='right'>
                                            {row.state}
                                        </td>
                                        <td style={{ width: 140 }} align='right'>
                                            <NavLink to={`/petodoctor/userconsulting/${row.no}`}>
                                                <Button variant='contained'>들어가기</Button>
                                            </NavLink>
                                        </td>
                                        <td style={{ width: 140 }} align='right'>
                                            <Button variant='contained'>{row.perscription}</Button>
                                        </td>
                                        <td style={{ width: 140 }} align='right'>
                                            {row.shipNo}
                                        </td>
                                    </tr>
                                ))}

                                {emptyRows > 0 && (
                                    <tr style={{ height: 41 * emptyRows }}>
                                        <td colSpan={3} />
                                    </tr>
                                )} */}
                            <tfoot>
                                <tr sx={{ width: 1200 }}>
                                    <CustomTablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                        colSpan={9}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        componentsProps={{
                                            select: {
                                                "aria-label": "rows per page",
                                            },
                                            actions: {
                                                showFirstButton: true,
                                                showLastButton: true,
                                            },
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </tr>
                            </tfoot>
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

export default UserReservation;

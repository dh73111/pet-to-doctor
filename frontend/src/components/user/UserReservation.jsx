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
import { Modal, Skeleton } from "@mui/material";
import ReservationDetail from "../commons/ReservationDetail";
import { Link, useNavigate } from "react-router-dom";
import { userAllTreatmentList } from "api/treatment";
import { useSelector } from "react-redux";

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

function UserReservation(props) {
    const userId = useSelector((store) => store.user.id);
    const [onLoad, setOnLoad] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [value, setValue] = useState(new Date());
    const [state, setState] = useState(0);
    const [treatmentInfo, setTreatmentInfo] = useState([]);
    const [treatAllList, setTreatAllList] = useState([]);
    const [treatRequest, setTreatRequest] = useState([]);
    const [treatPaid, setTreatPaid] = useState([]);
    const [treatCancel, setTreatCancel] = useState([]);
    const [treatConfirm, setTreatConfirm] = useState([]);
    const [treatComplete, setTreatComplete] = useState([]);

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
    // const dateCheck = (list, date) => {
    //     let checkList = [];
    //     let selectDay = date.toISOString().substring(0, 10);
    //     for (let item of list) {
    //         if (item.scheduleDate.substring(0, 10) === selectDay) checkList.push(item);
    //     }
    //     return checkList;
    // };
    useEffect(() => {
        const init = async () => {
            const list = await userAllTreatmentList(userId);
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
            setTreatmentInfo(list);
            setTreatAllList(list);
            setTreatRequest(tempRequestList);
            setTreatPaid(tempPaidList);
            setTreatCancel(tempCancelList);
            setTreatConfirm(tempConfirmList);
            setTreatComplete(tempCompleteList);
            setOnLoad(false);
        };
        init();
    }, []);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const offset = new Date().getTimezoneOffset() * 60000; // 1000밀리초 * 60  -> 1분
    const enterConsulting = (time, id, hospitalId) => {
        // 입장가능 로직 -> 확인해야함
        console.log(id, " ", hospitalId);
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
            navigate(`/petodoctor/userconsulting/${id}/${hospitalId}`);
        } else
            alert(
                `입장이 불가능합니다. 현재시간 ${currentTime.substring(11, 16)} , 입장시간 ${time.substring(
                    11,
                    16
                )} 그러나 발표를 위해서 입장!`
            );
        navigate(`/petodoctor/userconsulting/${id}/${hospitalId}`);
    };
    const handleChange = (event) => {
        setState(event.target.value);
        // setList(event.target.value, value);
        setList(event.target.value, value);
    };
    // 날짜용 setList
    // const setList = (value, date) => {
    //     console.log(value);
    //     switch (value) {
    //         case 0:
    //             setTreatmentInfo(dateCheck(treatAllList, date));
    //             break;
    //         case 1:
    //             setTreatmentInfo(dateCheck(treatRequest, date));
    //             break;
    //         case 2:
    //             setTreatmentInfo(dateCheck(treatCancel, date));
    //             break;
    //         case 3:
    //             setTreatmentInfo(dateCheck(treatPaid, date));
    //             break;
    //         case 4:
    //             setTreatmentInfo(dateCheck(treatConfirm, date));
    //             break;
    //         case 5:
    //             setTreatmentInfo(dateCheck(treatComplete, date));
    //             break;
    //         default:
    //             setTreatmentInfo(dateCheck(treatAllList, date));
    //             break;
    //     }
    // };
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

    return (
        <Container>
            <Grid container>
                <Typography variant='h4' component='h1' sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
                    내 예약
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={2} sx={{ px: 4 }}></Grid>
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
                                    <th>병원</th>
                                    <th>담당의</th>
                                    <th>예약상태</th>
                                    <th>상담실</th>
                                    <th>처방전</th>
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
                                                    <td>{treat.scheduleDate.substring(0, 10)}</td>
                                                    <td>{treat.scheduleDate.substring(11, 16)}</td>
                                                    <td>{treat.hospitalName}</td>
                                                    <td>{treat.doctorName}</td>
                                                    <td>{convertor[treat.type]}</td>
                                                    <td>
                                                        {treat.type !== "RES_CONFIRMED" ? (
                                                            <Box sx={{ mx: 2 }}>-</Box>
                                                        ) : (
                                                            <Button
                                                                variant='contained'
                                                                onClick={() => {
                                                                    console.log(treat);
                                                                    enterConsulting(
                                                                        treat.scheduleDate,
                                                                        treat.id,
                                                                        treat.hospitalId
                                                                    );
                                                                }}>
                                                                입장하기
                                                            </Button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {treat.prescriptionId === null ? (
                                                            <Box sx={{ mx: 2 }}>-</Box>
                                                        ) : (
                                                            <Link
                                                                to={`/petodoctor/presciption/${treat.prescriptionId}`}
                                                                state={treat.prescriptionId}
                                                                className="form-link">
                                                                처방전
                                                            </Link>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </>
                            )}                  
                            <tfoot>
                                {/* 페이지네이션 */}
                                {/* <tr sx={{ width: 1200 }}>
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
                                </tr> */}
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

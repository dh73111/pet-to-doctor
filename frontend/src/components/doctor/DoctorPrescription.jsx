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

    const [onLoad, setOnLoad] = useState(true);
    const doctorId = useSelector((store) => store.user.id);
    const [prescriptionsInfo, setPrescriptionInfo] = useState([]);
    const [prescriptions, setPrescription] = useState([]);
    const [prescComplete, setPrescComplete] = useState([]);
    const [prescUncomplete, setPrescUncomplete] = useState([]);
    const convertor = {
        COMPLETE: "결제완료",
        UNCOMPELETE: "결제대기",
    };

    const conditions = ["COMPLELTE", "UNCOMPLELTE"];

    useEffect(() => {
        const getdata = async () => {
            const data = await prescriptionAll(doctorId);
            console.log(data, "data");
            let tempCompleteList = [];
            let tempUncompleteList = [];
            for (let item of data) {
                const status = item.type;
                if (status === "COMPLETE") {
                    tempCompleteList.push(item);
                } else if (status === "UNCOMPLETE") {
                    tempUncompleteList.push(item);
                }
            }
            setPrescription(data); // 전체 처방전
            setPrescriptionInfo(data);
            setPrescComplete(tempCompleteList);
            setPrescUncomplete(tempUncompleteList);
        };
        getdata();

        setOnLoad(false);
        console.log(doctorId, "doctorId");

        console.log(prescriptions, "prescriptions");
    }, []);

    const handleChange = (event) => {
        setState(event.target.value);
        switch (event.target.value) {
            case 0:
                setPrescription(prescriptionsInfo);
                break;
            case 1:
                setPrescription(prescComplete);
                break;
            case 2:
                setPrescription(prescUncomplete);
                break;
        }
    };
    const [invoice, setInvoice] = useState();
    const handleChangeInvoice = (prop) => (event) => {
        setInvoice(event.target.value);
        console.log(prop);
        console.log(invoice, "invoice");
        console.log(event.target.value);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 680,
        bgcolor: "background.paper",
        boxShadow: 24,
    };
    // 모달 설정
    const modalstyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 200,
        bgcolor: "background.paper",
        border: "2px solid #000",
        // boxShadow: 100,
        p: 4,
    };
    const [openmodal, setOpenmodal] = React.useState(false);
    const handleOpenmodal = () => setOpenmodal(true);
    const handleClosemodal = () => setOpenmodal(false);
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
                            <Select id='demo-simple-select' value={state} label='state' onChange={handleChange}>
                                <MenuItem value={0}>모두 보기</MenuItem>
                                <MenuItem value={1}>결제 완료</MenuItem>
                                <MenuItem value={2}>결제 대기</MenuItem>
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
                                    <th>고객명</th>
                                    <th>처방정보</th>
                                    <th>결제상태</th>
                                    <th>배송여부</th>
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
                                                    <td>{res.shippingName}</td>
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
                                                    <td>{convertor[res.type]}</td>
                                                    <td>{res.isShipping === false ? "X" : "O"}</td>
                                                    <td>{res.type === "COMPLETE" ? res.invoiceCode : ""}</td>
                                                    <td>
                                                        {res.type === "COMPLETE" ? (
                                                            <Button onClick={handleOpen}>운송장 번호 입력</Button>
                                                        ) : (
                                                            ""
                                                        )}
                                                        <Modal
                                                            open={open}
                                                            onClose={handleClose}
                                                            aria-labelledby='modal-modal-title'
                                                            aria-describedby='modal-modal-description'>
                                                            <Box sx={modalstyle}>
                                                                <TextField
                                                                    label='운송장번호'
                                                                    id='invoiceCode'
                                                                    name='invoiceCode'
                                                                    value={res.invoiceCode}
                                                                    onChange={handleChangeInvoice(
                                                                        "invoiceCode"
                                                                    )}></TextField>
                                                                <button type='submit'>확인</button>
                                                            </Box>
                                                        </Modal>
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
        </Container>
    );
}

export default DoctorPrescription;

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import PerscriptionDetail from "../commons/PerscriptionDetail";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function createData(no, state, deliveryNo) {
    return { no, state, deliveryNo };
}

const rows = [createData(1, "완료", "3456789"), createData(1, "완료", "")].sort((a, b) => (a.no < b.no ? -1 : 1));

const Root = styled("div")`
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td,
    th {
        border: 1px solid #ddd;
        text-align: left;
        padding: 8px;
    }

    th {
        background-color: #ddd;
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
function DoctorPerscription(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [value, setValue] = React.useState(new Date());
    const [state, setState] = React.useState("");

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            background: "#CDEEF4",
                            mt: 10,
                            width: "100%",
                            height: "80px",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: 30,
                            pt: 5,
                        }}
                    >
                        처방 현황
                    </Box>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={2} sx={{ px: 4 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disableFuture
                            label="날짜"
                            openTo="year"
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
                            <InputLabel id="demo-simple-select-label">ALL</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={state}
                                label="state"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>결제 대기</MenuItem>
                                <MenuItem value={20}>결제 완료</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Root sx={{ width: 1400, mt: 3 }}>
                        <table aria-label="custom pagination table">
                            <thead>
                                <tr>
                                    <th>처방번호</th>
                                    <th>결제상태</th>
                                    <th>운송장번호</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row) => (
                                    <tr key={row.no}>
                                        <td style={{ width: 160 }}>
                                            {" "}
                                            <Button
                                                sx={{ fontWeight: "bold", display: "block" }}
                                                value={row.no}
                                                onClick={handleOpen}
                                            >
                                                {row.no}
                                            </Button>
                                        </td>
                                        <td style={{ width: 160 }} align="right">
                                            {row.state}
                                        </td>
                                        <td style={{ width: 160 }} align="right">
                                            {row.deliveryNo === "" ? (
                                                <Button color="inherit" variant="contained">
                                                    등록
                                                </Button>
                                            ) : (
                                                row.deliveryNo
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {emptyRows > 0 && (
                                    <tr style={{ height: 41 * emptyRows }}>
                                        <td colSpan={3} />
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr sx={{ width: 1200 }}>
                                    <CustomTablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                        colSpan={6}
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
                <Grid item xs={2}></Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <PerscriptionDetail></PerscriptionDetail>
                </Box>
            </Modal>
        </Box>
    );
}

export default DoctorPerscription;

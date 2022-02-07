import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
function DoctorDiagnosis(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [value, setValue] = React.useState(new Date());
    const [state, setState] = React.useState("");
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChange = (event) => {
        setState(event.target.value);
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
                        진료 현황
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
                                <MenuItem value={10}>진료 대기</MenuItem>
                                <MenuItem value={20}>진료 완료</MenuItem>
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
                                    <th>예약번호</th>
                                    <th>예약일</th>
                                    <th>예약시간</th>
                                    <th>고객</th>
                                    <th>상담실</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row) => (
                                    <tr key={row.no}>
                                        <td style={{ width: 160 }}> {row.no}</td>
                                        <td style={{ width: 160 }} align="right">
                                            {row.date}
                                        </td>
                                        <td style={{ width: 160 }} align="right">
                                            {row.time}
                                        </td>
                                        <td style={{ width: 160 }} align="right">
                                            {row.name}
                                        </td>
                                        <td style={{ width: 160 }} align="right">
                                            <Box>
                                                <Button variant="contained" sx={{ width: "50px", height: "20px" }}>
                                                    open
                                                </Button>
                                            </Box>
                                            <Box sx={{ mt: 0.3 }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{ width: "50px", height: "20px" }}
                                                    color="error"
                                                >
                                                    close
                                                </Button>
                                            </Box>
                                        </td>
                                        <td style={{ width: 160 }} align="right">
                                            {row.state}
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
                                <thead sx={{ width: 1200 }}>
                                    {/* <CustomTablePagination
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
                                        labelRowsPerPage={"글 개수"}
                                    /> */}
                                </thead>
                            </tfoot>
                        </table>
                    </Root>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Pagination count={10} sx={{ border: 1, mx: "auto", maxWidth: "414px" }} size="large" />
        </Box>
    );
}

export default DoctorDiagnosis;

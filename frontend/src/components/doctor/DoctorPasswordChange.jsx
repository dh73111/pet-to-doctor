import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Tabs,
  Tab,
  Paper,
  createTheme,
  ThemeProvider,
  TextField,
  Button,
  Link,
  Modal,
} from "@mui/material";

function DoctorPasswordChange(props) {
  return (
    <div>
      <Paper
        sx={{
            p: 5,
          margin: "auto",
          maxWidth: "30%",
          flexGrow: 3,
        }}
      >
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  pb={1}
                  align="center"
                >
                  새로 사용할 비밀번호를 입력해주세요
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  align="left"
                >
                  현재 비밀번호{""}
                  <Link href="#">{"비밀번호 변경 안내"}</Link>
                </Typography>
                <Box
                  textAlign="center"
                  sx={{
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="비밀번호"
                    required //값 반드시 입력
                    type="password"
                    name="password"
                  />{" "}
                </Box>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  align="left"
                >
                  새 비밀번호
                </Typography>
                <Box
                  textAlign="center"
                  sx={{
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="비밀번호"
                    required //값 반드시 입력
                    name="password"
                    type="password"
                  />{" "}
                </Box>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  align="left"
                >
                  새 비밀번호 확인
                </Typography>
                <Box
                  textAlign="center"
                  sx={{
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="비밀번호"
                    required //값 반드시 입력
                    type="password"
                    name="password"
                  />{" "}
                </Box>
              </Grid>
      </Paper>
    </div>
  );
}

export default DoctorPasswordChange;

import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getNotice, checkNotice } from "api/notice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Alarm(props) {
    const [list, setList] = useState([]);
    const { id } = useSelector((store) => store.user);
    const navigate = useNavigate();
    useEffect(() => {
        const init = async () => {
            let list = await getNotice(id);
            list = list.filter((item) => !item.isChecked);
            list = list.filter((item) => -item.id);
            list = list.reverse();
            setList(list);
        };
        init();
    }, []);

    return (
        <Box
            sx={{
                width: "280px",
                height: "300px",
                // border: "1px solid #D7E2EB",
                borderRadius: "0.25rem",
                position: "absolute",
                zIndex: 9999,
                backgroundColor: "#fff",
                top: "50px",
                right: "2rem",
                padding: "10px",
                overflow: "scroll",
                cursor: "default",
                // zIndex: -1,
            }}
            style={{
                boxShadow:
                    "0 0.25rem 0.5rem rgb(20 20 84 / 4%), 0 0.5rem 1.125rem rgb(20 20 84 / 8%), 0 1rem 2rem -0.125rem rgb(20 20 84 / 8%), 0 0 0 0.0625rem rgb(20 20 84 / 12%)",
            }}>
            {list.length > 0 ? (
                list.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                border: "1px solid #D7E2EB",
                                backgroundColor: "#FBFBFD",
                                width: "100%",
                                marginBottom: "10px",
                                borderRadius: "0.25rem",
                                p: 1,
                                boxSizing: "border-box",
                            }}>
                            <Typography
                                onClick={() => {
                                    console.log(item.type);
                                    if (item.type === "RESERVATION" || item.type === "PAYMENT") {
                                        console.log("예약, 결제");
                                        navigate("/petodoctor/userreservation");
                                    } else {
                                        navigate(`/petodoctor/presciption/${item.url}`);
                                    }
                                }}
                                className='alarm-content'
                                sx={{ fontSize: "14px", color: "#98A8B9" }}>
                                {item.content}
                            </Typography>
                            <Button
                                sx={{ ml: "50%" }}
                                onClick={async () => {
                                    const res = await checkNotice(item.id);
                                    console.log(res);
                                    let tempList = [...list];
                                    tempList.splice(index, 1);
                                    setList(tempList);
                                }}>
                                읽음
                            </Button>
                            <Button
                                onClick={() => {
                                    console.log(item.type);
                                    if (item.type === "RESERVATION" || item.type === "PAYMENT") {
                                        console.log("예약, 결제");
                                        navigate("/petodoctor/userreservation");
                                    } else {
                                        navigate(`/petodoctor/presciption/${item.url}`);
                                    }
                                }}>
                                이동
                            </Button>
                        </Box>
                    );
                })
            ) : (
                <Typography sx={{ pt: 10, fontSize: "14px", textAlign: "center", color: "#98A8B9" }}>
                    아직 알림이 없습니다.
                </Typography>
            )}
        </Box>
    );
}

export default Alarm;

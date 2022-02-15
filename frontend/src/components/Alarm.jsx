import { Box } from "@mui/material";
import React from "react";

function Alarm(props) {
    const alarmLists = [
        {
            title: "의사가 어쩌고했습니다.",
        },
        {
            title: "원격진료상담 예약이 완료되었습니다.",
        },
        {
            title: "원격진료상담 취소가 완료되었습니다.",
        },
        {
            title: "원격진료상담 취소가 완료되었습니다.",
        },
        {
            title: "원격진료상담 취소가 완료되었습니다.",
        },
    ];
    return (
        <Box
            sx={{
                width: "280px",
                height: "300px",
                border: 1,
                position: "absolute",
                zIndex: 9999,
                backgroundColor: "#fff",
                top: "50px",
                right: "2rem",
                padding: "10px",
                overflow: "scroll",
                // zIndex: -1,
            }}>
            {alarmLists.map((a) => {
                return (
                    <Box sx={{ backgroundColor: "#eaeaea", width: "100%", height: "60px", marginBottom: "10px" }}>
                        {a.title}
                    </Box>
                );
            })}
        </Box>
    );
}

export default Alarm;

import { Box, Button } from "@mui/material";
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
            setList(list);
            console.log(list);
        };
        init();
    }, []);

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
            {list.map((item, index) => {
                return (
                    <Box
                        key={index}
                        sx={{ backgroundColor: "#eaeaea", width: "100%", height: "80px", marginBottom: "10px" }}>
                        {item.content}
                        <Button
                            onClick={async () => {
                                const res = await checkNotice(item.id);
                                console.log(res);
                                let tempList = [...list];
                                tempList.splice(index, 1);
                                setList(tempList);
                            }}>
                            확인
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
            })}
        </Box>
    );
}

export default Alarm;

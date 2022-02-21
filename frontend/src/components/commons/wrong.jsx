import { Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function wrong(props) {
    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "#00AADC",
                textAlign: "center",
            }}>
            <img src={`${process.env.PUBLIC_URL}/img/slowwalk.gif`} />
            <Typography sx={{ fontSize: "60px", color: "white", fontWeight: "800", fontFamily: "NanumSquare", mb: 6 }}>
                잘못된 접근입니다.
            </Typography>
            <NavLink to='/petodoctor' className='error_to_main' style={{ color: "white" }}>
                메인페이지로 가기
            </NavLink>
        </div>
    );
}

export default wrong;

import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { kakaoLogin, userInfo } from "api/user";
import { useLocation, useNavigate } from "react-router-dom";

function KakaoAuth(props) {
    const locations = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(locations);
        const init = async () => {
            if (locations.search === "") {
                return;
            }
            const res = await kakaoLogin(locations.search.substring(6)).catch(() => {
                alert("카카오로그인 에러");
            });
            sessionStorage.setItem("accessToken", res.data.data);
            let decode_token = jwtDecode(res.data.data);
            let info = await userInfo(decode_token.sub);
            info = { ...info, role: decode_token.role };
            dispatch({ type: "login", userData: info });
            navigate("/petodoctor");
        };
        init();
    }, []);
    console.log("카카오로그인");
    return <div></div>;
}

export default KakaoAuth;

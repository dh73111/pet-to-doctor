import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function MainSearchBar(props) {
    const [value, setValue] = useState("");
    const style = {
        position: "absolute",
        fontSize: "32px",
        color: "#63CFC8",
        top: "7px",
        right: "10px",
        zIndex: 99,
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <span className='searchbar'>
            <input
                type='text'
                value={value}
                onChange={(e) => {
                    console.log(e.target.value);
                    setValue(e.target.value);
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        console.log(value, "input value");
                        if (value.trim() === "") {
                            alert("검색어를 입력해주세요");
                            return;
                        }
                        dispatch({ type: "search", value: value });
                        navigate("/petodoctor/hospitalsearch");
                    }
                }}
                placeholder='찾으시는 병원을 입력하세요.'
                className='mainSearchBar'
            />
            <SearchIcon
                sx={style}
                onClick={() => {
                    dispatch({ type: "search", value: value });
                    navigate("/petodoctor/hospitalsearch");
                }}
            />
        </span>
    );
}

export default MainSearchBar;

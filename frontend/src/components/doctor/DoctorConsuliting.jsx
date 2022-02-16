import React from "react";

function DoctorConsuliting(props) {
    // 진단서 작성 새창열기 테스트
    const openDiagForm = () => {
        window.open("https://i6b209.p.ssafy.io/petodoctor/doctorprescriptonform", "", "_blank");
    };

    return (
        <div>
            <button onClick={openDiagForm}>진단서작성</button>
        </div>
    );
}

export default DoctorConsuliting;

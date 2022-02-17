import { apiInstance } from "./index.js";

const api = apiInstance();

// 의사 비밀번호 수정
async function changePassword(doctor, success, fail) {
    return await api.put(`/doctor/password`, JSON.stringify(doctor));
}

// 의사 비밀번호 확인
async function checkPassword(doctor, success, fail) {
    return await api.post(`/doctor/password`, JSON.stringify(doctor));
}

// 의사 정보 조회
async function doctorInfo(doctor_id) {
    console.log(doctor_id);
    return (await api.get(`/doctor/${doctor_id}`)).data.data;
}

// 의사 등록
async function registerDoctor(doctor, success, fail) {
    return (await api.post(`/doctor`, JSON.stringify(doctor))).data.data;
}

// 의사 프로필 업데이트
async function modifyDoctorPic(doctorId, success, fail) {
    return (await api.post(`/doctor/profile/${doctorId}`)).data.data;
}

// 의사 정보 반환
async function getDoctorInfo(doctorId) {
    return (await api.get(`/doctor/${doctorId}`)).data.data;
}

// 병원 키에 해당하는 의사 정보 반환
async function getDoctorInfoFromHospital(hospitalId, success, fail) {
    return (await api.get(`/doctor/hospital/${hospitalId}`)).data.data;
}

export {
    changePassword,
    checkPassword,
    doctorInfo,
    registerDoctor,
    modifyDoctorPic,
    getDoctorInfo,
    getDoctorInfoFromHospital,
};

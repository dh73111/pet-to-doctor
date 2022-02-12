import { apiInstance } from "./index.js";

const api = apiInstance();

async function changePassword(doctor, success, fail) {
    return await api.put(`/doctor/password`, JSON.stringify(doctor));
}

async function checkPassword(doctor, success, fail) {
    return await api.post(`/doctor/password`, JSON.stringify(doctor));
}

async function doctorInfo(doctor_id, success, fail) {
    return (await api.get(`/doctor/${doctor_id}`)).data.data;
}

async function registerDoctor(doctor, success, fail) {
    return (await api.post(`/doctor`, JSON.stringify(doctor))).data.data;
}

async function modifyDoctorPic(doctorId, success, fail) {
    return (await api.post(`/doctor/profile/${doctorId}`)).data.data;
}

async function getDoctorInfo(doctorId) {
    return (await api.get(`/doctor/${doctorId}`)).data.data;
}
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

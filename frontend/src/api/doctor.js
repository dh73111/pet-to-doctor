import { apiInstance } from "./index.js";

const api = apiInstance();

function changePassword(doctor, success, fail) {
  api.put(`/doctor/password`, JSON.stringify(doctor)).then(success).catch(fail);
}

function checkPassword(doctor, success, fail) {
  api.post(`/doctor/password`, JSON.stringify(doctor)).then(success).catch(fail);
}

function doctorInfo(doctor_id, success, fail) {
  api.get(`/doctor/${doctor_id}`).then(success).catch(fail);
}

function registerDoctor(doctor, success, fail) {
  api.post(`/doctor`, JSON.stringify(doctor)).then(success).catch(fail);
}

function modifyDoctorPic(doctorId, success, fail) {
  api.post(`/doctor/profile/${doctorId}`).then(success).catch(fail);
}

function getDoctorInfo(doctorId, success, fail) {
  api.get(`/doctor/${doctorId}`).then(success).catch(fail);
}
function getDoctorInfoFromHospital(hospitalId, success, fail) {
  api.get(`/doctor/hospital/${hospitalId}`).then(success).catch(fail);
}

export { changePassword, checkPassword, doctorInfo, registerDoctor, modifyDoctorPic, getDoctorInfo, getDoctorInfoFromHospital };

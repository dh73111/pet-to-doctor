import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();

// 특정 진료 정보 반환
function treatmentInfo(treatmentId, success, fail) {
    api.get(`/treatment/${treatmentId}`).then(success).catch(fail);
}

// 사용자 진료 정보 반환
function userTreatmentInfo(userId, success, fail) {
    api.get(`/treatment/user/${userId}`).then(success).catch(fail);
}

// 의사 진료 정보 반환
function doctorTreatmentInfo(doctorId, success, fail) {
    api.get(`/treatment/doctor/${doctorId}`).then(success).catch(fail);
}

// 진료 정보 등록
function addTreatment(treatmentInfo, success, fail) {
    api.post(`/treatment`, JSON.stringify(treatmentInfo)).then(success).catch(fail);
}

// 진료 상태 수정
function treatmentState(treatmentId, success, fail) {
    api.post(`/treatment/${treatmentId}`).then(success).catch(fail);
}

// 결제 정보 수정
function treatmentPay(treatmentId, success, fail) {
    api.post(`/treatment/payment/${treatmentId}`).then(success).catch(fail);
}

export { treatmentInfo, userTreatmentInfo, doctorTreatmentInfo, addTreatment, treatmentState, treatmentPay };

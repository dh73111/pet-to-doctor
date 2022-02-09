import { apiInstance } from "./index.js";

const api = apiInstance();

// 운송장 등록
function addInvoice(prescriptionId, success, fail) {
    api.put(`/prescription/shipping`).then(success).catch(fail);
}

// 진단서 작성
function addPerscription(treatmentId, success, fail) {
    api.post(`/prescription/${treatmentId}`).then(success).catch(fail);
}

// 약 리스트 정보
function medicineInfo(treatmentId, success, fail) {
    api.post(`/prescription/medicine/${treatmentId}`).then(success).catch(fail);
}

// 진단서 확인
function checkPrescription(treatmentId, success, fail) {
    api.get(`/prescription`).then(success).catch(fail);
}

// 진단서 리스트 조회
function checkPrescriptionList(id, status, success, fail) {
    api.get(`/prescription/list?doctor_id=${id}&type=${status}'`).then(success).catch(fail);
}

export { addInvoice, addPerscription, medicineInfo, checkPrescription, checkPrescriptionList };

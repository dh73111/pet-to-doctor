import { apiInstance } from "./index.js";

const api = apiInstance();

// 운송장 등록
async function addInvoice(prescriptionId) {
  return (await api.put(`/prescription/shipping`, JSON.stringify(prescriptionId))).data.data;
}

// 진단서 작성
async function addPrescription(treatmentId) {
  return (await api.post(`/prescription/${treatmentId}`)).data.data;
}

// 약 리스트 정보
async function medicineInfo(treatmentId) {
  return (await api.post(`/prescription/medicine/${treatmentId}`)).data.data;
}

// 진단서 확인
async function checkPrescription(treatmentId) {
  return (await api.get(`/prescription?prescription_id=${treatmentId}`)).data.data;
}

// 진단서 리스트 조회
async function checkPrescriptionList(id, status) {
  return (await api.get(`/prescription/list?doctor_id=${id}&type=${status}'`)).data.data;
}

// 의사의 전체 진단서 리스트 조회
async function prescriptionAll(id) {
  return (await api.get(`/prescription/list/doctor?doctor_id=${id}`)).data.data;
}
export { addInvoice, addPrescription, medicineInfo, checkPrescription, checkPrescriptionList, prescriptionAll };

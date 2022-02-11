import { apiInstance } from "./index.js";

const api = apiInstance();

// 병원 정보 반환
async function getHosiptal(id, success, fail) {
  return (await api.get(`/hospital/${id}`)).data.data;
}

async function listNameHospital(name) {
  return (await api.get(`/hospital/name?name=${encodeURI(name)}`)).data.data;
}

async function listDongCodeHospital(dongCode) {
  return (await api.get(`/hospital/dong/${dongCode}`)).data.data;
}
async function listDongHospital(name) {
  return (await api.get(`/hospital/dong/name?dongName=${encodeURI(name)}`)).data.data;
}

export { listNameHospital, listDongCodeHospital, getHosiptal, listDongHospital };

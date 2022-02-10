import { apiInstance } from "./index.js";

const api = apiInstance();

// 병원 정보 반환
function getHosiptal(id, success, fail) {
    api.get(`/hospital/${id}`).then(success).catch(fail);
}

// 이름에 해당하는 병원 리스트
// function listHospital(name, success, fail) {
//     api.get(`/hospital/name?name=${encodeURI(name)}`)
//         .then(success)
//         .catch(fail);
// }

async function listNameHospital(name) {
    const response = await api.get(`/hospital/name?name=${encodeURI(name)}`);
    return response.data.data;
}

// 동에 해당하는 병원리스트
// function listDongHospital(dongCode, success, fail) {
//     api.get(`/hospital/dong/${dongCode}`).then(success).catch(fail);
// }
async function listDongCodeHospital(dongCode) {
    const response = await api.get(`/hospital/dong/${dongCode}`);
    return response.data.data;
}
// 동 이름에 대한 병원 리스트
// function listDongNameHospital(name, success, fail) {
//     api.get(`/hospital/dong/name?dongName=${encodeURI(name)}`)
//         .then(success)
//         .catch(fail);
// }
async function listDongHospital(name) {
    const response = await api.get(`/hospital/dong/name?dongName=${encodeURI(name)}`);
    return response.data.data;
}

export { listNameHospital, listDongCodeHospital, getHosiptal, listDongHospital };

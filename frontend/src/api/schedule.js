import { apiInstance } from "./index.js";

const api = apiInstance();

//의사 스케줄 정보 반환
function getSchedule(id, success, fail) {
    api.get(`/schedule/${id}`).then(success).catch(fail);
}

//의사 스케줄 정보 업데이트
function updateSchedule(doctor, success, fail) {
    api.post(`/schedule/${doctor.id}`, JSON.stringify(doctor)).then(success).catch(fail);
}

export { getSchedule, updateSchedule };

import { apiInstance } from "./index.js";

const api = apiInstance();

//의사 스케줄 정보 반환
async function getSchedule(id, day) {
    return (await api.get(`/schedule/${id}?plusDay=${day}`, JSON.stringify(day))).data.data;
}

//의사 스케줄 정보 업데이트
async function updateSchedule(data) {
    return await api.post(`/schedule/${data.doctorId}?plusDay=${data.plusDay}&bitmask=${data.bitmask}`);
}

export { getSchedule, updateSchedule };

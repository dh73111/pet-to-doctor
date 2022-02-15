import { apiInstance } from "./index.js";

const api = apiInstance();

// 알림 리스트 가져오기
async function getNotice(id) {
    return (await api.get(`/notice/list/${id}`)).data.data;
}

async function checkNotice(id) {
    return (await api.put(`/notice/check/${id}`)).data.data;
}
export { getNotice, checkNotice };

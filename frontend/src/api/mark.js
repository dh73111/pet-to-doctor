import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();
const loginApi = loginApiInstance();

function userFavMark(success, fail) {
    console.log("api mark 조회");
    loginApi.get(`/mark`).then(success).catch(fail);
}
// 병원 즐겨찾기 등록
function addFavMark(hospitalId, success, fail) {
    loginApi.post(`/mark/${hospitalId}`).then(success).catch(fail);
}
// 병원 즐겨찾기 삭제
function deleteFavMark(markId, success, fail) {
    loginApi.delete(`/mark/${markId}`).then(success).catch(fail);
}

export { userFavMark, addFavMark, deleteFavMark };

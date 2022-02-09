import { loginApiInstance } from "./index.js";

function userFavMark(success, fail) {
    const loginApi = loginApiInstance();

    console.log("api mark 조회");
    loginApi.get(`/mark`).then(success).catch(fail);
}
// 병원 즐겨찾기 등록
function addFavMark(hospitalId, success, fail) {
    const loginApi = loginApiInstance();

    loginApi.post(`/mark/${hospitalId}`).then(success).catch(fail);
}
// 병원 즐겨찾기 삭제
function deleteFavMark(markId, success, fail) {
    const loginApi = loginApiInstance();

    loginApi.delete(`/mark/${markId}`).then(success).catch(fail);
}

export { userFavMark, addFavMark, deleteFavMark };

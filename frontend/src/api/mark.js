import { loginApiInstance } from "./index.js";

// 유저의 병원즐겨찾기 조회
async function userFavMark() {
    const loginApi = loginApiInstance();
    return (await loginApi.get(`/mark`)).data.data;
}

// 병원 즐겨찾기 등록
async function addFavMark(hospitalId) {
    const loginApi = loginApiInstance();
    return await loginApi.post(`/mark/${hospitalId}`);
}

// 병원 즐겨찾기 삭제
async function deleteFavMark(markId) {
    const loginApi = loginApiInstance();
    return await loginApi.delete(`/mark/${markId}`);
}

async function deleteHospitalFavMark(hospitalId) {
    const loginApi = loginApiInstance();
    return await loginApi.delete(`/mark/delHospital/${hospitalId}`);
}

export { userFavMark, addFavMark, deleteFavMark ,deleteHospitalFavMark};

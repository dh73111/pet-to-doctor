import { loginApiInstance } from "./index.js";

// 유저의 병원즐겨찾기 조회
// function userFavMark(success, fail) {
//     const loginApi = loginApiInstance();
//     loginApi.get(`/mark`).then(success).catch(fail);
// }
async function userFavMark() {
  const loginApi = loginApiInstance();
  const response = await loginApi.get(`/mark`);
  console.log(response);
  return response.data.data;
}

// 병원 즐겨찾기 등록
// function addFavMark(hospitalId, success, fail) {
//     const loginApi = loginApiInstance();

//     loginApi.post(`/mark/${hospitalId}`).then(success).catch(fail);
// }
async function addFavMark(hospitalId) {
  const loginApi = loginApiInstance();
  const response = await loginApi.post(`/mark/${hospitalId}`);
  return response.data.data;
}

// 병원 즐겨찾기 삭제
// function deleteFavMark(markId, success, fail) {
//   const loginApi = loginApiInstance();

//   loginApi.delete(`/mark/${markId}`).then(success).catch(fail);
// }
async function deleteFavMark(markId) {
  const loginApi = loginApiInstance();
  const response = await loginApi.delete(`/mark/${markId}`);
  return response;
}

export { userFavMark, addFavMark, deleteFavMark };

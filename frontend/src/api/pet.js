import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();

// 반려동물 정보 조회
// function petInfo(petId, success, fail) {
//   api.get(`/pet/${petId}`).then(success).catch(fail);
// }
async function petInfo(petId) {
  const response = await api.get(`/pet/${petId}`);
  return response.data.data;
}

// 반려동물 정보 수정
function modifyPet(petId, pet, success, fail) {
  api.put(`/pet/${petId}`, JSON.stringify(pet)).then(success).catch(fail);
}

// 반려동물 정보 삭제
function deletePet(petId, success, fail) {
  const loginApi = loginApiInstance();
  loginApi.delete(`/pet/${petId}`).then(success).catch(fail);
}

// 반려동물 정보 등록
// function registerPet(pet, success, fail) {
//   const loginApi = loginApiInstance();
//   loginApi.post(`/pet`, JSON.stringify(pet)).then(success).catch(fail);
// }
async function registerPet(pet) {
  const loginApi = loginApiInstance();
  const response = await loginApi.post(`/pet`, JSON.stringify(pet));
  return response.data;
}

//사진은 어떻게...
function modifyPetPic(petId, success, fail) {
  api.post(`/pet/profile/${petId}`).then(success).catch(fail);
}

// 유저 모든 반려동물 조회
// function petList(success, fail) {
//   const loginApi = loginApiInstance();
//   loginApi.get(`/pet/list`).then(success).catch(fail);
// }
async function petList() {
  const loginApi = loginApiInstance();
  const response = await loginApi.get(`/pet/list`);
  console.log(response, "petAPI");
  return response.data.data;
}

export { petInfo, modifyPet, deletePet, registerPet, modifyPetPic, petList };

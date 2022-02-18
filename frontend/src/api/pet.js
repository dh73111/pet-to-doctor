import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();

// 반려동물 정보 조회
async function petInfo(petId) {
  return (await api.get(`/pet/${petId}`)).data.data;
}

// 반려동물 정보 수정
async function modifyPet(petId, pet) {
  return await api.put(`/pet/${petId}`, JSON.stringify(pet));
}

// 반려동물 정보 삭제
async function deletePet(petId) {
  const loginApi = loginApiInstance();
  return await loginApi.delete(`/pet/${petId}`);
}

// 반려동물 정보 등록
async function registerPet(pet) {
  const loginApi = loginApiInstance();
  return await loginApi.post(`/pet`, JSON.stringify(pet));
}

//사진은 어떻게...
async function modifyPetPic(petId) {
  return await api.post(`/pet/profile/${petId}`);
}

// 유저 모든 반려동물 조회
async function petList() {
  const loginApi = loginApiInstance();
  return (await loginApi.get(`/pet/list`)).data.data;
}

export { petInfo, modifyPet, deletePet, registerPet, modifyPetPic, petList };

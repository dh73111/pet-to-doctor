import { apiInstance } from "./index.js";

const api = apiInstance();

function petInfo(petId, success, fail) {
    api.get(`/pet/${petId}`).then(success).catch(fail);
}

function modifyPet(pet, success, fail) {
    api.put(`/pet`, JSON.stringify(pet)).then(success).catch(fail);
}

function deletePet(petId, success, fail) {
    api.delete(`/pet/${petId}`).then(success).catch(fail);
}

function registerPet(pet, success, fail) {
    api.post(`/pet`, JSON.stringify(pet)).then(success).catch(fail);
}

//사진은 어떻게...
function modifyPetPic(petId, success, fail) {
    api.post(`/pet/profile/${petId}`).then(success).catch(fail);
}

function petList(success, fail) {
    api.get(`/pet/list`).then(success).catch(fail);
}

export { petInfo, modifyPet, deletePet, registerPet, modifyPetPic, petList };

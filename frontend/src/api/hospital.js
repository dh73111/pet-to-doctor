import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();
const loginApi = loginApiInstance();
// function modifyUser(user, success, fail) {
//     api.put(`/user`, JSON.stringify(user)).then(success).catch(fail);
// }

// function registerUser(user, success, fail) {
//     console.log(JSON.stringify(user));
//     api.post(`/user`, JSON.stringify(user)).then(success).catch(fail);
// }

// function deleteUser(userId, success, fail) {
//     api.delete(`/user/${userId}`).then(success).catch(fail);
// }

// function modifyUserPic(userId, success, fail) {
//     api.post(`/user/profile/${userId}`).then(success).catch(fail);
// }

function listHospital(name, success, fail) {
    api.get(`/hospital/name?name=${encodeURI(name)}`)
        .then(success)
        .catch(fail);
}
function listDong(name, success, fail) {
    console.log(name);
    api.get(`/address-info/name?name=${encodeURI(name)}`)
        .then(success)
        .catch(fail);
}

export { listDong, listHospital };

import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();
const loginApi = loginApiInstance();

// 회원 정보 수정
function modifyUser(user, success, fail) {
    api.put(`/user`, JSON.stringify(user)).then(success).catch(fail);
}

// 회원 가입
function registerUser(user, success, fail) {
    console.log(JSON.stringify(user));
    api.post(`/user`, JSON.stringify(user)).then(success).catch(fail);
}

// 회원 탈퇴
function deleteUser(userId, success, fail) {
    api.delete(`/user/${userId}`).then(success).catch(fail);
}

//회원 사진 수정
function modifyUserPic(userId, success, fail) {
    api.post(`/user/profile/${userId}`).then(success).catch(fail);
}
// 비밀번호 확인
function checkPassword(user, success, fail) {
    api.post(`/user/password/check`).then(success).catch(fail);
}
// 비밀번호 변경
function changePassword(user, success, fail) {
    console.log(user);

    loginApi.post(`/user/password/change`, JSON.stringify(user)).then(success).catch(fail);
}
// 로그인
function loginUser(user, success, fail) {
    api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}
// 회원 정보
function userInfo(userId, success, fail) {
    api.get(`/user/${userId}`).then(success).catch(fail);
}
// 비밀번호 찾기
function findUserPassword(userEmail, success, fail) {
    api.get(`/user/password/sendToEmail/${userEmail}`).then(success).catch(fail);
}
//이메일 중복 조회
function checkDuplication(userEmail, success, fail) {
    api.get(`/user/duplication/?email=${userEmail}`).then(success).catch(fail);
}

// 즐겨찾는 병원 조회

export {
    userInfo,
    registerUser,
    modifyUser,
    deleteUser,
    modifyUserPic,
    checkPassword,
    changePassword,
    loginUser,
    findUserPassword,
    checkDuplication,
};

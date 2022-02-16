import { ConstructionOutlined } from "@mui/icons-material";
import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();
// // 회원 정보 수정
async function modifyUser(user) {
    const loginApi = loginApiInstance();
    return await loginApi.put(`/user`, JSON.stringify(user));
}

// 회원 가입
async function registerUser(user) {
    return await api.post(`/user`, JSON.stringify(user));
}

// 회원 탈퇴
async function deleteUser(userId) {
    return await api.delete(`/user/${userId}`);
}
// 카카오 로그인
async function kakaoLogin(code) {
    return await api.post(`user/oauth-login/kakao?code=${code}`);
}

// 비밀번호 확인
async function checkPassword(password) {
    console.log(typeof password, "from user api");
    const loginApi = loginApiInstance();
    return await loginApi.post(`/user/password/check`, { password: password });
}

async function changePassword(password) {
    const loginApi = loginApiInstance();
    return await loginApi.post(`/user/password/change`, JSON.stringify(password));
}

async function loginUser(user) {
    console.log(JSON.stringify(user));
    return (await api.post(`/account/login`, JSON.stringify(user))).data.data;
}

// 회원 정보
async function userInfo(userId) {
    return (await api.get(`/user/${userId}`)).data.data;
}

// 비밀번호 찾기
async function findUserPassword(userEmail) {
    return await api.get(`/user/password/sendToEmail/${userEmail}`);
}

//이메일 중복 조회
async function checkDuplication(userEmail) {
    return (await api.get(`/user/duplication?email=${userEmail}`)).data.data;
}

// 즐겨찾는 병원 조회

export {
    userInfo,
    registerUser,
    modifyUser,
    deleteUser,
    checkPassword,
    changePassword,
    loginUser,
    findUserPassword,
    checkDuplication,
    kakaoLogin,
};

import { apiInstance } from "./index.js";

const api = apiInstance();

function userInfo(userId, success, fail) {
    api.get(`/user/${userId}`).then(success).catch(fail);
}

export { userInfo };

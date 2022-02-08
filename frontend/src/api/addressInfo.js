import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();


function addressInfo(name, success, fail) {
    api.get(`/address-info/name?name=${encodeURI(name)}`)
        .then(success)
        .catch(fail);
}

export {addressInfo}
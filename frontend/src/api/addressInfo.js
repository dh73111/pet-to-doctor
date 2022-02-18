import { apiInstance } from "./index.js";

const api = apiInstance();

async function addressInfo(name) {
  return (await api.get(`/address-info/name?name=${encodeURI(name)}`)).data.data;
}

export { addressInfo };

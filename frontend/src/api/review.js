import { apiInstance, loginApiInstance } from "./index.js";

const api = apiInstance();

// 모든 리뷰 조회
// function allReview(success, fail) {
//   api.get(`/review`).then(success).catch(fail);
// }
async function allReview() {
  const response = await api.get(`/review`);
  return response.data.data;
}

// 리뷰 작성
// function addReview(review, success, fail) {
//   api.post(`/review`, JSON.stringify(review)).then(success).catch(fail);
// }
async function addReview(review) {
  const response = await api.post(`/review`, JSON.stringify(review));
  return response;
}

// 병원 리뷰 조회
// function hospitalReviews (hospitalId, success, fail) {
//     api.get(`/review/${hospitalId}`).then(success).catch(fail);
// }
async function hospitalReviews(hospitalId) {
  const response = await api.get(`/review/${hospitalId}`);
  return response.data.data;
}

// 최근 리뷰 10개 반환
function recentReview(success, fail) {
  api.post(`/review/recent`).then(success).catch(fail);
}

export { allReview, addReview, hospitalReviews, recentReview };

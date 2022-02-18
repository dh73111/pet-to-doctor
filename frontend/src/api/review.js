import { apiInstance } from "./index.js";

const api = apiInstance();

// 모든 리뷰 조회

async function allReview() {
    return (await api.get(`/review`)).data.data;
}

// 리뷰 작성
async function addReview(review) {
    return await api.post(`/review`, JSON.stringify(review));
}

// 병원 리뷰 조회

async function hospitalReviews(hospitalId) {
    return (await api.get(`/review/${hospitalId}`)).data.data;
}

// 최근 리뷰 10개 반환
async function recentReview(success, fail) {
    return (await api.post(`/review/recent`)).data.data;
}

export { allReview, addReview, hospitalReviews, recentReview };

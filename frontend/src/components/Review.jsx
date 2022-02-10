import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { allReview } from "../api/review";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [sortTime, setSortTime] = useState(false);
  let sortByOld = [...reviews];
  const allReviews = {
    message: "성공",
    data: [
      {
        id: 0,
        userId: 0,
        hospitalId: 0,
        content: "너무좋네요.너무좋네요.너무좋네요.너무좋네요.",
        rate: 4,
        createTime: "2022-02-07T14:02:14.289Z",
      },
    ],
  };
  useEffect(() => {
    const init = async () => {
      const res = await allReview();
      await setReviews(res);
      sortByOld = res;
    };
    init();
  }, []);

  const tempReview = [...sortByOld];
  const sortByTime = (title) => {
    if (title === "최신순") {
      const sorted = tempReview.sort((a, b) => b.id - a.id);
      setReviews(sorted);
      setSortTime(true);
    } else if (title === "작성순") {
      const sorted2 = tempReview.sort((a, b) => a.id - b.id);
      setReviews(sorted2);
      setSortTime(false);
    }
  };
  const sortByRate = () => {
    const sorted = tempReview.sort((a, b) => b.rate - a.rate);
    setReviews(sorted);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>
        리뷰
      </Typography>
      <Box sx={{ border: "1px solid blue", mb: 4 }}>
        병원리뷰순위 뿌려줄것임 아니면.. 음.. 머 대충그런거
        <br /> 리뷰는 페이징으로하고 안되면 무한스크롤링ㄱ
        <Box>병원2위</Box>
        <Box>병원1위</Box>
        <Box>병원3위</Box>
      </Box>
      <Box sx={{ border: "1px solid #309FB3", borderRadius: "4px", mb: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>모든 리뷰({reviews.length})</Typography>
        <Box sx={{ border: 1 }}>
          <Button
            onClick={() => {
              sortByTime("최신순");
            }}
          >
            최신순
          </Button>
          <Button
            onClick={() => {
              sortByTime("작성순");
            }}
          >
            작성순
          </Button>
          <Button
            onClick={() => {
              sortByRate();
            }}
          >
            평점순
          </Button>
        </Box>
      </Box>
      <Box>
        {reviews.map((review, idx) => {
          return (
            <Box key={idx} sx={{ border: 1, p: 3, mb: 1 }}>
              <p>리뷰 ID : {review.id}</p>
              <p>평점 : {review.rate}</p>
              <p>유저네임 : {review.username}</p>
              <p>병원 ID : {review.hospitalId}</p>
              <p>내용 : {review.content}</p>
              <p>작성시간 : {review.createTime}</p>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}

export default Review;

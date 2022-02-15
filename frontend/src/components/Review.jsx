import React, { useEffect, useState } from "react";
import { Box, Button, Container, Rating, Typography } from "@mui/material";
import { allReview } from "../api/review";
import ReviewSwiper from "./commons/ReviewSwiper";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";

function Review() {
    const [reviews, setReviews] = useState([]);
    const [sortTime, setSortTime] = useState(false);
    const [onLoad, setonLoad] = useState(true);
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
            setonLoad(false);
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
        <>
            <Box sx={{ backgroundColor: "#F7F7FB", pb: 2 }}>
                <Container>
                    <Typography variant='h5' component='h1' sx={{ pt: 10, pb: 2, fontWeight: 600 }}>
                        펫투닥터 BEST 후기👑
                    </Typography>
                    <Box
                        sx={{
                            border: "1px solid #D7E2EB",
                            borderRadius: "0.25rem",
                            backgroundColor: "white",
                            mb: 4,
                            // p: 3,
                        }}>
                        <ReviewSwiper />
                    </Box>
                </Container>
            </Box>
            <Container>
                <Box sx={{ mt: 6, mb: 2 }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 22, float: "left" }}>
                        모든 후기({reviews.length})
                    </Typography>
                    <Box sx={{ float: "right" }}>
                        <Button
                            sx={{ mr: 1, color: "#000" }}
                            onClick={() => {
                                sortByTime("최신순");
                            }}>
                            최신순
                        </Button>
                        <Button
                            sx={{ mr: 1, color: "#000" }}
                            onClick={() => {
                                sortByTime("작성순");
                            }}>
                            작성순
                        </Button>
                        <Button
                            sx={{ color: "#000" }}
                            onClick={() => {
                                sortByRate();
                            }}>
                            평점순
                        </Button>
                    </Box>
                </Box>
                {onLoad ? (
                    <CircularProgress sx={{ my: 20, ml: "38%" }} />
                ) : (
                    <Box sx={{ pt: 12 }}>
                        {reviews.map((review, idx) => {
                            return (
                                <Box
                                    key={idx}
                                    sx={{
                                        backgroundColor: "#F7F7FB",
                                        border: "1px solid #D7E2EB",
                                        borderRadius: "0.25rem",
                                        p: 3,
                                        mb: 3,
                                    }}>
                                    <Typography sx={{ float: "right", color: "#263747", opacity: "0.4" }}>
                                        {review.createTime.slice(0, 10)}
                                    </Typography>
                                    <Typography sx={{ fontWeight: "700", mb: 1, pl: 0.5 }}>
                                        {review.username}
                                    </Typography>
                                    <Rating
                                        value={review.rate}
                                        readOnly
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                                    />
                                    <Typography sx={{ mt: 2 }}>{review.content}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </Container>
        </>
    );
}

export default Review;

import React, { useState } from "react";
import { Box, Button, Container, Rating, TextField, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addReview } from "api/review";
import { treatmentState } from "api/treatment";
function UserRating(props) {
    const [value, setValue] = useState(3);
    const [hover, setHover] = useState(-1);
    const { hospitalId } = useParams();
    const { prescriptionId } = useParams();
    console.log(prescriptionId);
    const { id: userId } = useSelector((store) => store.user);
    const labels = {
        1: "별로에요",
        2: "그냥 그래요",
        3: "좋아요",
        4: "정말 좋아요",
        5: "최고에요",
    };
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    return (
        <Container sx={{ backgroundColor: "white", height: "100vh", textAlign: "center", p: 10 }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
                오늘 상담/진료는 어떠셨나요?
            </Typography>
            <Rating
                sx={{ mt: 2 }}
                name='hover-feedback'
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                size='large'
            />
            {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
            <Box sx={{ width: "400px", mx: "auto" }}>
                <TextField
                    multiline
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    rows={4}
                    sx={{ width: "400px", mt: 3 }}
                />
                <Button
                    variant='contained'
                    sx={{ width: "200px", mt: 2 }}
                    onClick={async () => {
                        console.log(content, " ", value, " ", userId, " ", hospitalId);
                        const res = await addReview({
                            userId: userId,
                            hospitalId: hospitalId,
                            content: content,
                            rate: value,
                        });

                        const res2 = await treatmentState(prescriptionId, "RES_COMPLETED");
                        console.log(res2);
                        console.log(res);
                        navigate("/petodoctor");
                    }}>
                    리뷰 남기기
                </Button>
            </Box>
        </Container>
    );
}

export default UserRating;

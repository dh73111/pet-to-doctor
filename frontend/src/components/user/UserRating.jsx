import React from 'react';
import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function UserRating(props) {
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);

    const labels = {
        1: '별로에요',
        2: '그냥 그래요',
        3: '좋아요',
        4: '정말 좋아요',
        5: '최고에요',
    };

    return (
        <Box sx={{ backgroundColor: '#89D5E5', height: '100vh', textAlign: 'center', p: 10 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>오늘 상담/진료는 어떠셨나요?</Typography>
            <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                size="large"
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
            <TextField multiline rows={4} sx={{ width: '360px' }} />
            <Button variant="contained">리뷰 남기기</Button>
        </Box>
    );
}

export default UserRating;
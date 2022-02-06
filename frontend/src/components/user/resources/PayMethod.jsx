import React, { useEffect, useState } from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

function PayMethod(props) {
  const [payMethod, setPayMethod] = useState();
  const changePayMethod = (e) => {
    const payBy = e.target.value;
    setPayMethod(payBy);
  };
  useEffect(() => {
    console.log(payMethod);
  }, [payMethod]);

  return (
    <Box sx={{ backgroundColor: "#F5F6F7", p: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        결제수단
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="kakaopay"
          control={<Radio onClick={changePayMethod} />}
          label={
            <Box display = "flex" alignItems="center"
            justifyContent="center">
              카카오페이
              <img
                src="/img/kakaopayLogo.png"
                alt="카카오페이로고"
                width="60px"
              />
            </Box>
          }
        />
        {/* "카카오페이" + 이미지태그 로 글씨와 이미지를 같이 띄우고 싶은데 안됨 섬바디헬프ㅠ */}
        <FormControlLabel
          value="naverpay"
          control={<Radio onClick={changePayMethod} />}
          label="네이버페이"
        />
        <FormControlLabel
          value="visit"
          control={<Radio onClick={changePayMethod} />}
          label="방문결제"
        />
      </RadioGroup>
    </Box>
  );
}

export default PayMethod;

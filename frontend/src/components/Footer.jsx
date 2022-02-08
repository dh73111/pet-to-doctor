import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";

//FFF5F6
function Footer(props) {
  const MyFooter = styled("div")({
    width: "100%",
    height: "300px",
    backgroundColor: "#FFF5F6",
    position: "relative",
    bottom: 0,
  });
  return (
    <MyFooter>
      <Container>
        <Grid container sx={{ pt: 8 }} spacing={2}>
          <Grid item xs={6} sx={{ border: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>Pet to Doctor(펫투닥터)</Typography>
            <Typography>대표자 : 곽명필, 김두회, 김정빈, 박다원, 이준형, 정지욱</Typography>
            <Typography>서울특별시 강남구 언주로 508 14층(역삼동, 서울상록빌딩) 멀티캠퍼스</Typography>
            <Typography>서비스 내에 게시한 게시물의 저작권은 (주)펫투닥터에 귀속됩니다.</Typography>
          </Grid>
          <Grid item xs={6} sx={{ border: "1px solid blueviolet" }}>
            <Typography>
              Tel : 02.6949.3016 월-금 (10:00 - 19:00)
              <br />
              Email : hello@petdoc.co.kr
              <br />
              광고문의 : 070.5117.4573 월-금 (10:00 - 19:00)
              <br />
              Email : kc.chul@petdoc-korea.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </MyFooter>
  );
}

export default Footer;

// const MyDiv = styled("div")({
//   position: "absolute",
//   top: "580px",
//   width: "100%",
// });

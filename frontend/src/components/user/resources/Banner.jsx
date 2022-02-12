import { Box, Typography } from "@mui/material";
import React from "react";

function Banner(props) {
  return (
    <Box sx={{ display: "container", backgroundColor: "#309FB3", width: "100%", height: "50px", marginBottom: '6px' }}>
      <Typography
        sx={{
          width: "100%",
          fontWeight: "bold",
          color: "#fff",
          // fontSize: '20px',
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        펫투닥터로 반려동물의 건강을 지켜주세요!
      </Typography>
    </Box>
  );
}

export default Banner;

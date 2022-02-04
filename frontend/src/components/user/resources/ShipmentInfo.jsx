import React from 'react';
import { Box } from '@mui/system';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

function ShipmentInfo(props) {
  return (
    <Box sx={{ mb: 2, p: 3, backgroundColor: '#F5F6F7' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>배송정보</Typography>
        <FormControlLabel
          label="주문자정보와 동일"
          control={<Checkbox />}
        />
      </Box>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontWeight: '600', width: "100px" }}>수령자</Typography>
          <TextField id="outlined-basic" variant="outlined" size="small"/>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontWeight: '600', width: "100px" }}>휴대전화</Typography>
          <TextField id="outlined-basic" variant="outlined" size="small"/>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontWeight: '600', width: "100px" }}>주소</Typography>
          <TextField id="outlined-basic" variant="outlined" size="small" defaultValue="우편번호"/>
          <Button>우편번호 검색</Button>
          <TextField id="outlined-basic" variant="outlined" size="small"/>
          <TextField id="outlined-basic" variant="outlined" size="small"/>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontWeight: '600', width: "100px" }}>배송메세지</Typography>
          <TextField id="outlined-basic" variant="outlined" size="small"/>
        </Box>
      </Box>
    </Box>
  );
}

export default ShipmentInfo;
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';

function ShipmentInfo(props) {
  const [zonecode, setZonecode] = useState();
  const [address, setAddress] = useState();

  const id = "daum-postcode";
  const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  // 처방배송 필요한 데이터
  // 우편번호(zipcode), 도시(city), 거리(상세주소 street), 수신자이름(shippingName), 수신자연락처(shippingTel), 
  // 
  const openPopup = () => {
    // 우편번호 검색을 위한 popup
    window.daum.postcode.load(() => {
      const postcode = new window.daum.Postcode({
        // oncomplete는 daum-postcode에서 제공된 함수
        oncomplete: function (data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
          // console.log(data);
          setZonecode(data.zonecode);
          setAddress(data.roadAddress);
        }
      });
      postcode.open();
    });
  }
  useEffect(() => {
    // 초기실행시 html에 script를 import해줌
    const isAlready = document.getElementById(id);

    if (!isAlready) {
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      document.body.append(script);
    }
  }, []);

  return (
    <Box sx={{ mb: 2, p: 3, backgroundColor: '#F5F6F7' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>배송정보</Typography>
        <FormControlLabel
          label="주문자정보와 동일"
          control={<Checkbox />}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', /* backgroundColor: '#CDEEF4' */ }}>
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography sx={{ width: '260px', fontWeight: '600', lineHeight: '40px' }}>수령자</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small"/>
          </Box>
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography sx={{ width: '260px', fontWeight: '600', lineHeight: '40px' }}>전화번호</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small"/>
          </Box>
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography sx={{ width: '260px', fontWeight: '600', lineHeight: '40px' }}>주소</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <TextField sx={{ mb: 1 }} variant="outlined" size="small" value={zonecode} disabled/>
                <Button onClick={openPopup} variant="contained">우편번호 검색</Button>
              </Box>
              <TextField  variant="outlined" size="small" value={address} disabled/>
              <TextField variant="outlined" size="small" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Typography sx={{ width: '260px', fontWeight: '600', lineHeight: '40px' }}>배송메세지</Typography>
            <TextField id="outlined-basic" variant="outlined" size="small"/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ShipmentInfo;
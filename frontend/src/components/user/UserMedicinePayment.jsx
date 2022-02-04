import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Checkbox, Container, createTheme, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import PayMethod from './resources/PayMethod';
import ShipmentInfo from './resources/ShipmentInfo';
import TotalPrice from './resources/TotalPrice';
import PaymentHeading from './resources/PaymentHeading';

function UserMedicinePayment(props) {
  const newTheme = createTheme({
    palette: {
        primary: {
            main: "#309FB3",
        },
    },
  });

  const prescription = {
    "message": "string",
    "data": {
      "id": 0,
      "administration": "string",
      "medicine": "소독약, 소염제, 해열제",
      "diagnosis": "알러지",
      "opinion": "아이가 피부가 약해서 염증이 난 것 같습니다. 심각한건 아니니 소독만 해주시면 됩니다 :)",
      "price": 3000,
      "type": "UNCOMPLETE",
      "isShipping": true,
      "invoiceCode": "string",
      "paymentCode": "string",
      "shippingAddress": {
        "city": "대전광역시",
        "street": "문정로 11",
        "zipcode": "12345"
      },
      "shippingName": "string",
      "shippingTel": "string"
    }
  }
  const treatment = {
    "message": "string",
    "data": {
      "id": 0,
      "userId": 0,
      "doctorId": 0,
      "prescriptionId": 0,
      "hospitalId": 0,
      "paymentCode": "string",
      "scheduleDate": "2022-02-04T02:57:19.525Z",
      "type": "RES_REQUEST",
      "reVisit": true,
      "petName": "string",
      "symptom": "string",
      "birthDate": "2022-02-04",
      "petSpecies": "string",
      "petWeight": "string",
      "price": 0,
      "url": "string"
    }
  }
  
  // const total = prescription.data.price;

  return (
    <ThemeProvider theme={newTheme}>
      <Container maxWidth="xl">
      <Box container>
        <PaymentHeading title={'처방받은 약을 결제해주세요'}/>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, p: 3, backgroundColor: '#F5F6F7' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>약정보</Typography>
              <ul sx={{ mt: 2 }}>
                <li>{prescription.data.medicine}</li>
              </ul>
            </Box>
            <Box sx={{ mb: 2, p: 3, backgroundColor: '#F5F6F7' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>주문자정보</Typography>
                <Typography>고객님의 화원정보에 등록되어 있는 주소입니다.</Typography>
              </Box>
              <Box container sx={{ mt: 2, display: 'flex' }}>
                <Box sx={{ border: 1 }}>목록</Box>
                <Box>인풋들</Box>
              </Box>
            </Box>
            <ShipmentInfo />
            <PayMethod />
          </Grid>
          <Grid item xs={12} md={4}>
            <TotalPrice prescription={prescription} />
          </Grid>
        </Grid>
      </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UserMedicinePayment;
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Container, createTheme, Divider, Grid, Typography } from '@mui/material';
import PayMethod from './resources/PayMethod';

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
      "medicine": "소독약",
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
  
  const total = prescription.data.price;

  return (
    <ThemeProvider theme={newTheme}>
      <Container maxWidth="xl">
      <Box container>
        <Box item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" sx={{ mt: 10, mb: 2, fontWeight: 600 }}>처방받은 약을 결제해주세요</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mb: 3, border: 1 }}>
            아마도 stepbar
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, p: 3, border: 1, backgroundColor: '#F5F6F7' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>약정보</Typography>
              <ul>
                <li>{prescription.data.medicine}</li>
              </ul>
            </Box>
            <Box sx={{ mb: 2, p: 3, border: 1, backgroundColor: '#F5F6F7' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>주문자정보</Typography>
            </Box>
            <Box sx={{ mb: 2, p: 3, border: 1, backgroundColor: '#F5F6F7' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>배송정보</Typography>
            </Box>
            <PayMethod />
            {/* <Box sx={{ mb: 2, p: 3, border: 1, backgroundColor: '#F5F6F7' }}>
              <Typography sx={{ fontWeight: 600 }}>결제방법</Typography>
            </Box> */}
          </Grid>
          <Grid item xs={12} md={4}>
                <Box sx={{ backgroundColor: '#F5F6F7', p: 4}}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>최종결제금액</Typography>
                    <Grid container sx={{ justifyContent: 'flex-end', mb: 4 }}>
                        <Grid align="right" item xs={4}><Typography sx={{ fontWeight: 600 }}>배송비</Typography></Grid>
                        <Grid align="right" item xs={7}><Typography xs={6} sx={{ ml: 3, pr: 1 }}>3,000원</Typography></Grid>
                    </Grid>
                    <Divider />
                    <Grid continer sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                        <Grid item xs={4}>
                            <Typography>총 결제예정 금액</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h4" sx={{ textAlign: 'right' }}>{total}원</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ p: 4 }}>
                    <Button variant='contained' sx={{ width: "100%", height: "40px", mx: "auto" }}>결제</Button>
                </Box>
            </Grid>
        </Grid>
      </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UserMedicinePayment;
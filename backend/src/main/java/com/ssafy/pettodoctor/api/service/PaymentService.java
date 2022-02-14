package com.ssafy.pettodoctor.api.service;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ssafy.pettodoctor.api.domain.Treatment;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import com.ssafy.pettodoctor.api.repository.TreatmentRepositry;
import com.ssafy.pettodoctor.common.util.CancleRequestUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {
    private final TreatmentRepositry treatmentRepositry;

    public Treatment findById(Long id){
        return treatmentRepositry.findByTreatmentId(id);
    }

    public void cancleTreatment(Long treatmentId, String reason){
        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        if(treatment.getType().equals(TreatmentType.RES_PAID)) {
            // access-token 발급
            String accessToken = CancleRequestUtil.getAccessToken2();
            // 결제 취소 요청 보내기
            String mId = treatment.getPaymentCode();
            Integer amount = treatment.getPrice();
            CancleRequestUtil.passCancleRequest(accessToken, mId, reason, amount);
            System.out.println("send cancel request to imaport");
        }
        treatment.setType(TreatmentType.RES_CANCEL);
    }

//    private String passCancleRequest(String token, String mId, String reason, Integer amount){
//        // 아임포트 REST API로 결제 환불 요청
//
//        String _token = "";
//        try{
//            String requestString = "";
//            URL url = new URL("https://api.iamport.kr/payments/cancel");
//            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//            connection.setDoOutput(true);
//            connection.setInstanceFollowRedirects(false);
//            connection.setRequestMethod("POST");
//            connection.setRequestProperty("Content-Type", "application/json");
//            connection.setRequestProperty("Authorization", token);
//
//            JsonObject json = new JsonObject();
//            json.addProperty("reason", reason);
//            json.addProperty("merchant_uid", mId);
//            json.addProperty("amount",amount);
//
//            OutputStream os= connection.getOutputStream();
//            os.write(json.toString().getBytes());
//            connection.connect();
//            StringBuilder sb = new StringBuilder();
//
//            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
//                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
//                String line = null;
//                while ((line = br.readLine()) != null) {
//                    sb.append(line + "\n");
//                }
//                br.close();
//                requestString = sb.toString();
//            }
//
//            os.flush();
//            connection.disconnect();
//            JsonParser jsonParser = new JsonParser();
//            JsonObject jsonObj = (JsonObject) jsonParser.parse(requestString);
//
//            System.out.println(StringEscapeUtils.unescapeJava(requestString));
//
////            if(jsonObj.get("code").getAsLong()  == 0){
////                JsonObject getToken = (JsonObject) jsonObj.get("response");
////                System.out.println("getToken==>>"+getToken.get("access_token") );
////                _token = getToken.get("access_token").getAsString();
////            }
//        }catch(Exception e){
//            e.printStackTrace();
//            _token = "";
//        }
//
//        return _token;
//
//    }
//
//    private String getAccessToken2(){
//        String _token = "";
//        try{
//            String requestString = "";
//            URL url = new URL("https://api.iamport.kr/users/getToken");
//            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//            connection.setDoOutput(true);
//            connection.setInstanceFollowRedirects(false);
//            connection.setRequestMethod("POST");
//            connection.setRequestProperty("Content-Type", "application/json");
//
//            String REST_API = "7357321776217283";
//            String REST_API_SECRET = "fc43b9ba873f35b6bfc434142b445a072528f4669777cf3817388d6ab90cec8ea06f96f65b0fd0e2";
//            JsonObject json = new JsonObject();
//            json.addProperty("imp_key", REST_API);
//            json.addProperty("imp_secret", REST_API_SECRET);
//
//            OutputStream os= connection.getOutputStream();
//            os.write(json.toString().getBytes());
//            connection.connect();
//            StringBuilder sb = new StringBuilder();
//
//            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
//                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
//                String line = null;
//                while ((line = br.readLine()) != null) {
//                    sb.append(line + "\n");
//                }
//                br.close();
//                requestString = sb.toString();
//            }
//
//            os.flush();
//            connection.disconnect();
//            JsonParser jsonParser = new JsonParser();
//            JsonObject jsonObj = (JsonObject) jsonParser.parse(requestString);
//
//            if(jsonObj.get("code").getAsLong()  == 0){
//                JsonObject getToken = (JsonObject) jsonObj.get("response");
//                System.out.println("getToken==>>"+getToken.get("access_token") );
//                _token = getToken.get("access_token").getAsString();
//            }
//        }catch(Exception e){
//            e.printStackTrace();
//            _token = "";
//        }
//
//        return _token;
//    }
//
//    private ResponseEntity<String> getAccessToken(){
//        // 아임포트 REST API로 결제 환불 요청
//        ResponseEntity<String> tokens = null;
//        // 카카오 토큰 요청
//        RestTemplate rt = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-type", "application/json");
//
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        String REST_API = "7357321776217283";
//        String REST_API_SECRET = "fc43b9ba873f35b6bfc434142b445a072528f4669777cf3817388d6ab90cec8ea06f96f65b0fd0e2";
//        params.add("imp_key", REST_API);
//        params.add("imp_secret", REST_API_SECRET);
//
//        HttpEntity<MultiValueMap<String, String>> iamportTokenRequest =
//                new HttpEntity<>(params, headers);
//        try {
//            tokens = rt.exchange(
//                    "https://api.iamport.kr/users/getToken",
//                    HttpMethod.POST,
//                    iamportTokenRequest,
//                    String.class
//            );
//            System.out.println(tokens);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return tokens;
//    }
}

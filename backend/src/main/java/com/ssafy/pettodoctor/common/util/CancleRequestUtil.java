package com.ssafy.pettodoctor.common.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class CancleRequestUtil {
    public static String passCancleRequest(String token, String mId, String reason, Integer amount){
        // 아임포트 REST API로 결제 환불 요청

        String _token = "";
        try{
            String requestString = "";
            URL url = new URL("https://api.iamport.kr/payments/cancel");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setInstanceFollowRedirects(false);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", token);

            JsonObject json = new JsonObject();
            json.addProperty("reason", reason);
            json.addProperty("merchant_uid", mId);
            json.addProperty("amount",amount);

            OutputStream os= connection.getOutputStream();
            os.write(json.toString().getBytes());
            connection.connect();
            StringBuilder sb = new StringBuilder();

            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
                String line = null;
                while ((line = br.readLine()) != null) {
                    sb.append(line + "\n");
                }
                br.close();
                requestString = sb.toString();
            }

            os.flush();
            connection.disconnect();
            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObj = (JsonObject) jsonParser.parse(requestString);

            System.out.println(StringEscapeUtils.unescapeJava(requestString));

//            if(jsonObj.get("code").getAsLong()  == 0){
//                JsonObject getToken = (JsonObject) jsonObj.get("response");
//                System.out.println("getToken==>>"+getToken.get("access_token") );
//                _token = getToken.get("access_token").getAsString();
//            }
        }catch(Exception e){
            e.printStackTrace();
            _token = "";
        }

        return _token;

    }

    public static String getAccessToken2(){
        String _token = "";
        try{
            String requestString = "";
            URL url = new URL("https://api.iamport.kr/users/getToken");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setInstanceFollowRedirects(false);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");

            String REST_API = "7357321776217283";
            String REST_API_SECRET = "fc43b9ba873f35b6bfc434142b445a072528f4669777cf3817388d6ab90cec8ea06f96f65b0fd0e2";
            JsonObject json = new JsonObject();
            json.addProperty("imp_key", REST_API);
            json.addProperty("imp_secret", REST_API_SECRET);

            OutputStream os= connection.getOutputStream();
            os.write(json.toString().getBytes());
            connection.connect();
            StringBuilder sb = new StringBuilder();

            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
                String line = null;
                while ((line = br.readLine()) != null) {
                    sb.append(line + "\n");
                }
                br.close();
                requestString = sb.toString();
            }

            os.flush();
            connection.disconnect();
            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObj = (JsonObject) jsonParser.parse(requestString);

            if(jsonObj.get("code").getAsLong()  == 0){
                JsonObject getToken = (JsonObject) jsonObj.get("response");
                System.out.println("getToken==>>"+getToken.get("access_token") );
                _token = getToken.get("access_token").getAsString();
            }
        }catch(Exception e){
            e.printStackTrace();
            _token = "";
        }

        return _token;
    }

    public static ResponseEntity<String> getAccessToken(){
        // 아임포트 REST API로 결제 환불 요청
        ResponseEntity<String> tokens = null;
        // 카카오 토큰 요청
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/json");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        String REST_API = "7357321776217283";
        String REST_API_SECRET = "fc43b9ba873f35b6bfc434142b445a072528f4669777cf3817388d6ab90cec8ea06f96f65b0fd0e2";
        params.add("imp_key", REST_API);
        params.add("imp_secret", REST_API_SECRET);

        HttpEntity<MultiValueMap<String, String>> iamportTokenRequest =
                new HttpEntity<>(params, headers);
        try {
            tokens = rt.exchange(
                    "https://api.iamport.kr/users/getToken",
                    HttpMethod.POST,
                    iamportTokenRequest,
                    String.class
            );
            System.out.println(tokens);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return tokens;
    }
}

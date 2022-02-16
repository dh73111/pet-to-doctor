package com.ssafy.pettodoctor.common.util;

import com.ssafy.pettodoctor.api.response.OauthToken;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class KakaoOauthUtil {
    public static ResponseEntity<String> getKakaoToken(String code) {
        ResponseEntity<String> tokens = null;
        // 카카오 토큰 요청
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "17e88fdcd4825e84145e1f5676bf6007");
//        params.add("redirect_uri","https://i6b209.p.ssafy.io/petodoctor/kakaooauth");
        params.add("redirect_uri","http://localhost:3000/petodoctor/kakaooauth");
//        params.add("redirect_uri","http://localhost:3000/kakaooauth");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);
        try {
            tokens = rt.exchange(
                    "https://kauth.kakao.com/oauth/token",
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );
//            System.out.println(tokens);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return tokens;
    }

    public static ResponseEntity<String> getKakaoProfile(OauthToken oauthToken) {
        ResponseEntity<String> response = null;
        // 카카오 토큰 요청
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + oauthToken.getAccess_token());
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("property_keys", "[\"properties.nickname\", \"kakao_acount.email\"]");

        HttpEntity<MultiValueMap<String, String>> kakaoInfoRequest =
                new HttpEntity<>(headers);
        try {
            response = rt.exchange(
                    "https://kapi.kakao.com/v2/user/me",
                    HttpMethod.POST,
                    kakaoInfoRequest,
                    String.class
            );
//            System.out.println(response);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;
    }
}

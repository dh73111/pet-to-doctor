package com.ssafy.pettodoctor.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.pettodoctor.api.auth.AccountUserDetails;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.*;
import com.ssafy.pettodoctor.api.response.*;
import com.ssafy.pettodoctor.api.service.SendMailService;
import com.ssafy.pettodoctor.api.request.LoginPostReq;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.service.UserService;
//import io.swagger.annotations.*;
import com.ssafy.pettodoctor.common.util.JwtTokenUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Tag(name = "user controller", description = "사용자 관련 컨트롤러")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    private final SendMailService sendMailService;

    @GetMapping("/duplication")
    @Operation(summary = "이메일 중복 확인", description = "이메일 중복을 확인해준다. 중복이라면 true 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<Boolean>> isDuplicated(
            @RequestParam @Parameter(description = "사용자 이메일") String email) {
        ResVO<Boolean> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Boolean isDuplicated = userService.isDuplicated(email);
            result.setData(isDuplicated);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<Boolean>>(result, status);
    }

    @PostMapping
    @Operation(summary = "회원 가입", description = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<Long>> signup (
            @RequestBody @Parameter(description = "사용자 가입 정보") UserCommonSignupPostReq signupInfo
    ) {
        ResVO<Long> result = new ResVO<>();
        HttpStatus status = null;

        try{
            userService.signup(signupInfo);
            sendMailService.sendCertification(signupInfo.getEmail());
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<Long>>(result, status);
    }

    @PostMapping("/oauth-login/kakao")
    @Operation(summary = "카카오 로그인", description = "카카오 인증 코드로 카카오 토큰을 얻고 정보로 로그인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<String>> kakaoLogin (@RequestParam String code) {
        ResVO<String> result = new ResVO<>();
        HttpStatus status = null;

        //------------ 통신 ---------------//
        // 토큰 관련 정보 얻기
        ResponseEntity<String> responseToken = getKakaoToken(code);
        if(responseToken == null){
            result.setMessage("유효하지 않은 카카오 인증 코드 입니다.");
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<ResVO<String>>(result, status);
        }

        // 토큰 정보 추출
        ObjectMapper objectMapper = new ObjectMapper();
        OauthToken oauthToken = null;
        try {
            oauthToken = objectMapper.readValue(responseToken.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) { // 파싱 에러
            e.printStackTrace();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
            return new ResponseEntity<ResVO<String>>(result, status);
        }


        //------------ 통신 ---------------//
        // 토큰으로 프로필 정보 가져오기
        ResponseEntity<String> responseProfile = getKakaoProfile(oauthToken);
        if(responseProfile == null){
            result.setMessage("유효하지 않은 토큰 입니다.");
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<ResVO<String>>(result, status);
        }

        // 프로필 정보 추출
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(getKakaoProfile(oauthToken).getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) { // 파싱 에러
            e.printStackTrace();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
            return new ResponseEntity<ResVO<String>>(result, status);
        }



        // 이메일 중복 확인 및 토큰 반환
        String email = kakaoProfile.getKakao_account().getEmail();
        String nickname = kakaoProfile.getProperties().getNickname();
        Boolean duplicated = userService.isDuplicated(email);
        User user = null;
        if(!duplicated) {
            user = userService.oauthSignup(email, nickname);
//            System.out.println("소셜 회원가입");
        }
        else{
            user = userService.getUserByEmail(email);
//            System.out.println("소셜 로그인");
        }

        status = HttpStatus.OK;
        String accessToken = JwtTokenUtil.getToken(user.getId().toString(), user.getRole());
        result.setData(accessToken);
        result.setMessage("카카오 로그인 성공");

        return new ResponseEntity<ResVO<String>>(result, status);
    }

    private ResponseEntity<String> getKakaoToken(String code) {
        ResponseEntity<String> tokens = null;
        // 카카오 토큰 요청
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "17e88fdcd4825e84145e1f5676bf6007");
        params.add("redirect_uri","http://localhost:3000/petodoctor/kakaooauth");
//        params.add("redirect_uri", "http://localhost:3000/kakaooauth");
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

    private ResponseEntity<String> getKakaoProfile(OauthToken oauthToken) {
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

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "<strong>아이디와 패스워드</strong>를 통해 로그인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<String>> login (@RequestBody LoginPostReq loginPostReq){
        ResVO<String> result = new ResVO<>();
        HttpStatus status = null;

        try{
            User user = userService.getUserByEmail(loginPostReq.getEmail());
            if(user == null) {
                status = HttpStatus.NOT_ACCEPTABLE;
                result.setMessage("존재하지 않는 이메일입니다.");
            } else if (!loginPostReq.getPassword().equals(user.getPassword())) {
                status = HttpStatus.UNAUTHORIZED;
                result.setMessage("비밀번호가 일치하지 않습니다.");
            } else if (!user.getIsCertificated()){
                status = HttpStatus.UNAUTHORIZED;
                result.setMessage("이메일 인증이 되지 않은 회원입니다.");
            } else {
                status = HttpStatus.OK;
                String accessToken = JwtTokenUtil.getToken(user.getId().toString(), user.getRole());
                result.setData(accessToken);
                result.setMessage("성공");
            }

        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<String>>(result, status);
    }

    // 사용자 프로필 업데이트
    @PostMapping("/profile/{userId}")
    @Operation(summary = "프로필 업데이트", description = "프로필 사진을 업데이트한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<String>> updateProfile(
            @PathVariable @Parameter(description = "사용자 아이디") Long userId,
            @RequestParam("profileImgUrl") @Parameter(description = "프로필 사진") MultipartFile multipartFile,
            HttpServletRequest req) {
        ResVO<String> result = new ResVO<>();
        HttpStatus status = null;

        try{
            status = HttpStatus.OK;
            userService.updateProfile(userId, multipartFile);
            result.setMessage("성공");
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
            e.printStackTrace();
        }

        return new ResponseEntity<ResVO<String>>(result, status);
    }


    @GetMapping("/{userId}")
    @Operation(summary = "회원정보 조회", description = "id를 통해 회원정보 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "해당 petId 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<UserRes>> getUserData(
            @PathVariable @Parameter(description = "유저 ID") Long userId) {
        ResVO<UserRes> result = new ResVO<>();
        HttpStatus status = null;

        try {
            User user = userService.getUserById(userId).get();

            result.setData(UserRes.convertToUserRes(user));
            result.setMessage("회원정보 조회 성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<UserRes>>(result, status);
    }

    @DeleteMapping("")
    @Operation(summary = "회원 탈퇴", description = "현재 로그인된 회원 탈퇴(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> quitUser() {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            userService.deleteNowUser(nowUser);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    @PutMapping
    @Operation(summary = "회원 정보 수정", description = "회원 정보 수정(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저 id 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<UserRes>> changeUserData(
            @RequestBody @Parameter(description = "유저 수정 폼") UserChangeReq usrChgReq) {
        ResVO<UserRes> result = new ResVO<>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            Long nowUserId = userService.getUserById(userDetails.getUserId()).get().getId();

            User user = userService.changeUser(nowUserId, usrChgReq).get();
            result.setData(UserRes.convertToUserRes(user));
            result.setMessage("회원 정보 수정 성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<UserRes>>(result, status);
    }

    @PostMapping("/password/check")
    @Operation(summary = "회원 비밀번호 확인", description = "현재 로그인된 회원 비밀번호 확인(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> checkPassword(
            @RequestBody @Parameter(description = "비밀번호") PwChangeReq inputPass) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            boolean checkResult = userService.checkPassword(inputPass.getPassword(), nowUser);

            if (checkResult) {
                resultMap.put("message", "비밀번호 확인 완료");
            } else {
                resultMap.put("message", "비밀번호가 일치하지 않음");
            }
            resultMap.put("result", checkResult);
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PostMapping("/password/change")
    @Operation(summary = "회원 비밀번호 변경", description = "현재 로그인된 회원 비밀번호 변경(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> changePassword(
            @RequestBody @Parameter(description = "비밀번호") UserPasswordChangeReq upcr) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            Long nowUserId = userDetails.getUserId();
            boolean changeResult = userService.changePassword(nowUserId, upcr);

            if (changeResult) {
                resultMap.put("message", "비밀번호 변경 완료");
            } else {
                resultMap.put("message", "비밀번호가 일치하지 않음");
            }
            resultMap.put("success", changeResult);
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/password/sendToEmail/{userEmail}")
    @Operation(summary = "비밀번호 찾기", description = "메일로 비밀번호 보내주기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> sendPassword(
            @PathVariable("userEmail") @Parameter(description = "회원 이메일") String userEmail) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            sendMailService.sendPassword(userEmail);
            status = HttpStatus.OK;

        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    @GetMapping("/certification/{certificationKey}")
    public String mailCertification(
            @PathVariable("certificationKey")  String certKey) {
        try {
            userService.mailCertification(certKey);
            return "<body>\n" +
                    "    <h1>펫투닥터 서비스 메일 인증에 성공했습니다!</h1>\n" +
                    "    <h3>\n" +
                    "        <a href=\"https://i6b209.p.ssafy.io:3333/petodoctor\">펫투닥터 서비스</a>\n" +
                    "        로 이동해 로그인 해주세요.\n" +
                    "    </h3>\n" +
                    "</body>\n";

        } catch (Exception e) {
            e.printStackTrace();

            return
                    "<body>\n" +
                    "    <h1>펫투닥터 서비스 메일 인증에 실패했습니다...</h1>\n" +
                    "    <h3>\n" +
                    "        <a href=\"https://i6b209.p.ssafy.io:3333/petodoctor\">펫투닥터 서비스</a>\n" +
                    "        로 이동\n" +
                    "    </h3>\n" +
                    "</body>\n";
        }

    }
}

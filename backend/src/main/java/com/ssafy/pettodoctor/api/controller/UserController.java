package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.auth.AccountUserDetails;
import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.*;
import com.ssafy.pettodoctor.api.response.PetRes;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.response.UserRes;
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
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
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


    @PostMapping("/login")
    @Operation(summary = "로그인", description = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
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


    @PutMapping("")
    @Operation(summary = "회원 정보 수정", description = "회원 정보 수정(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "해당 유저 id 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<UserRes>> changeUserData(
            @RequestParam @Parameter(description = "유저 수정 폼") UserChangeReq usrChgReq) {
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
            @RequestBody @Parameter(description = "비밀번호") String inputPass) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            boolean checkResult = userService.checkPassword(inputPass, nowUser);

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
    @Operation(summary = "서버 이메일 인증", description = "이메일로 날아온 인증 url클릭하면 인증해준다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> mailCertification(
            @PathVariable("certificationKey") @Parameter(description = "이메일 인증 키") String certKey) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            userService.mailCertification(certKey);
            status = HttpStatus.OK;

        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}

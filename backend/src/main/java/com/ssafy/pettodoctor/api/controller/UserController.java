package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.auth.AccountUserDetails;
import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.LoginPostReq;
import com.ssafy.pettodoctor.api.request.PetPostReq;
import com.ssafy.pettodoctor.api.request.UserChangeReq;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import com.ssafy.pettodoctor.api.response.PetRes;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.response.UserRes;
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
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Tag(name = "user controller", description = "사용자 관련 컨트롤러")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    @GetMapping("/duplication")
    @Operation(summary = "이메일 중복 확인", description = "이메일 중복을 확인해준다. 중복이라면 true 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> isDuplicated(
            @RequestParam @Parameter(description = "사용자 이메일") String email) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            Boolean isDuplicated = userService.isDuplicated(email);
            resultMap.put("isDuplicated", isDuplicated);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    @PostMapping
    @Operation(summary = "회원 가입", description = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> signup (
            @RequestBody @Parameter(description = "사용자 가입 정보") UserCommonSignupPostReq signupInfo
    ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            userService.signup(signupInfo);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity(resultMap, status);
    }


    @PostMapping("/login")
    @Operation(summary = "로그인", description = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> login (@RequestBody LoginPostReq loginPostReq){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try{
            User user = userService.getUserByEmail(loginPostReq.getEmail());
            if(user == null) {
                status = HttpStatus.NOT_ACCEPTABLE;
                resultMap.put("message", "존재하지 않는 이메일입니다.");
            } else if (!loginPostReq.getPassword().equals(user.getPassword())) {
                status = HttpStatus.UNAUTHORIZED;
                resultMap.put("message", "비밀번호가 일치하지 않습니다.");
            } else {
                status = HttpStatus.OK;
                String accessToken = JwtTokenUtil.getToken(user.getId().toString(), user.getRole());
                resultMap.put("access-token", accessToken);
            }

        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity(resultMap, status);
    }


    @GetMapping("/{userId}")
    @Operation(summary = "본인 회원정보 조회", description = "본인 회원정보 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "해당 petId 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<UserRes>> getUserData(
            @RequestParam @Parameter(description = "유저 ID") Long userId) {
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
    @Operation(summary = "회원 탈퇴", description = "현재 로그인된 회원 탈퇴")
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
    @Operation(summary = "회원 정보 수정", description = "회원 정보 수정")
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
}

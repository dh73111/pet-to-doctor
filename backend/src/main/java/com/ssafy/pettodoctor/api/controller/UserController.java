package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import com.ssafy.pettodoctor.api.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/duplication")
    @ApiOperation(value = "이메일 중복 확인", notes = "이메일 중복을 확인해준다. 중복이라면 true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> isDuplicated(
            @RequestParam @ApiParam(value="이메일 정보", required = true) String email) {
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
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> signup (
            @RequestBody @ApiParam(value="회원가입 정보", required = true) UserCommonSignupPostReq signupInfo
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

}

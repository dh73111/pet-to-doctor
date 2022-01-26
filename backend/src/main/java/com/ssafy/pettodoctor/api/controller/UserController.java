package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.UserCommonSignupPostReq;
import com.ssafy.pettodoctor.api.service.UserService;
//import io.swagger.annotations.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

}

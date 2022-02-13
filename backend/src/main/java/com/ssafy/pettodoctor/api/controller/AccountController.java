package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Account;
import com.ssafy.pettodoctor.api.request.LoginPostReq;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.service.AccountService;
import com.ssafy.pettodoctor.api.service.UserService;
import com.ssafy.pettodoctor.common.util.JwtTokenUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/account/")
@Tag(name = "account controller", description = "회원 관련 컨트롤러")
@CrossOrigin("*")
public class AccountController {
    private final AccountService accountService;
    private final UserService userService;


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
            Account account = accountService.findByEmail(loginPostReq.getEmail());
            if(account == null) {
                status = HttpStatus.NOT_ACCEPTABLE;
                result.setMessage("잘못된 이메일입니다.");
            } else if (!loginPostReq.getPassword().equals(account.getPassword())) {
                status = HttpStatus.UNAUTHORIZED;
                result.setMessage("비밀번호가 일치하지 않습니다.");
            } else if (account.getRole().equals("ROLE_USER")                                // 어카운트가 유저일 경우
                    && userService.getUserById(account.getId()).get().getIsCertificated()   // 어카운트의 id로 유저를 찾아온 뒤 isCertificated 확인
            ){
                status = HttpStatus.UNAUTHORIZED;
                result.setMessage("이메일 인증이 되지 않은 회원입니다.");
            } else {
                status = HttpStatus.OK;
                String accessToken = JwtTokenUtil.getToken(account.getId().toString(), account.getRole());
                result.setData(accessToken);
                result.setMessage("성공");
            }

        }catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<String>>(result, status);
    }

}

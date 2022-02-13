package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Admin;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.response.AdminRes;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.response.UserRes;
import com.ssafy.pettodoctor.api.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@Tag(name = "Admin controller", description = "Admin 관련 컨트롤러")
@CrossOrigin("*")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/{adminId}")
    @Operation(summary = "관리자 조회", description = "id를 통해 관리자 정보 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "해당 petId 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<AdminRes>> getAdminData(
            @PathVariable @Parameter(description = "관리자 id") Long adminId) {
        ResVO<AdminRes> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Admin admin = adminService.selectById(adminId);
            result.setData(AdminRes.convertTo(admin));
            result.setMessage("관리자 조회 성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
            e.printStackTrace();
        }

        return new ResponseEntity<ResVO<AdminRes>>(result, status);
    }
}

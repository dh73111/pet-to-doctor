package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.request.DoctorPostReq;
import com.ssafy.pettodoctor.api.service.DoctorService;
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
@RequestMapping("/api/doctor")
@Tag(name = "doctor controller", description = "의사 관련 컨트롤러")
@CrossOrigin("*")
public class DoctorController {
    private final DoctorService doctorService;

    @PostMapping
    @Operation(summary = "의사 등록", description = "의사를 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> writeCertificate(
            @RequestBody @Parameter(description = "의사 정보") DoctorPostReq doctorInfo
    ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            doctorService.registerDoctor(doctorInfo);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity(resultMap, status);
    }

    @GetMapping
    @Operation(summary = "의사 정보 조회", description = "의사 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> getDoctor(
            @RequestParam @Parameter(description = "의사 아이디") Long doctor_id
    ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            resultMap.put("doctor_info", doctorService.findById(doctor_id));
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PostMapping("/password")
    @Operation(summary = "비밀번호 확인", description = "비밀번호가 일치하는지 확인한다. 일치하다면 ture, 다르다면 false 반환 ")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> checkPassword(
            @RequestBody @Parameter(description = "비밀번호") String password
    ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            Boolean isCheck = doctorService.isCheck(password);
            resultMap.put("isCheck", isCheck);
            if(isCheck.equals(true))
                resultMap.put("message", "비밀번호가 확인되었습니다.");
            else
                resultMap.put("message", "비밀번호가 다릅니다.");

            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity(resultMap, status);
    }

    @PutMapping("/password")
    @Operation(summary = "비밀번호 수정", description = "비밀번호를 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> updatePassword(
            @RequestParam @Parameter(description = "의사 아이디") Long doctor_id,
            @RequestBody @Parameter(description = "비밀번호") String password
    ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            doctorService.updatePassword(doctor_id, password);
            resultMap.put("doctor_info", doctorService.findById(doctor_id));
            resultMap.put("message", "비밀번호 변경 성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}

package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.response.DoctorRes;
import com.ssafy.pettodoctor.api.response.ResVO;

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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctor")
@Tag(name = "doctor controller", description = "의사 관련 컨트롤러")
@CrossOrigin("*")
public class DoctorController {
    private final DoctorService doctorService;
    @GetMapping("/hospital/{hospitalId}")
    @Operation(summary = "병원키에 해당하는 의사 정보 반환", description = "병원키에 해당하는 의사 정보 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<DoctorRes>>> findDoctorsByHospitalId(
            @PathVariable @Parameter(description = "병원키") Long hospitalId ) {
        ResVO<List<DoctorRes>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<Doctor> doctors = doctorService.findByHospitalId(hospitalId);
            result.setMessage("성공");
            result.setData(DoctorRes.convertToResList(doctors));
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<DoctorRes>>>(result, status);
    }


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


    @GetMapping("/{doctorId}")
    @Operation(summary = "키에 해당하는 의사 정보 반환", description = "키에 해당하는 의사 정보를 반환한다.")
    public ResponseEntity<ResVO<DoctorRes>> findDoctorsById(
            @PathVariable @Parameter(description = "의사키") Long doctorId ) {
        ResVO<DoctorRes> result = new ResVO<>();
        HttpStatus status = null;

        try {
            Doctor doctor = doctorService.findById(doctorId);
            result.setData(DoctorRes.converToRes(doctor));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<DoctorRes>>(result, status);
    }

    @GetMapping
    @Operation(summary = "의사 정보 조회", description = "의사 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<DoctorRes>> getDoctor(
            @RequestParam @Parameter(description = "의사 아이디") Long doctor_id
    ) {
        ResVO<DoctorRes> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Doctor doctor = doctorService.findById(doctor_id);
            result.setData(DoctorRes.converToRes(doctor));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }
        return new ResponseEntity<ResVO<DoctorRes>>(result, status);
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
    public ResponseEntity<ResVO<DoctorRes>> updatePassword(
            @RequestParam @Parameter(description = "의사 아이디") Long doctor_id,
            @RequestBody @Parameter(description = "비밀번호") String password
    ) {
        ResVO<DoctorRes> result = new ResVO<>();
        HttpStatus status = null;
        try {
            doctorService.updatePassword(doctor_id, password);
//            resultMap.put("doctor_info", doctorService.findById(doctor_id));
            result.setData(DoctorRes.converToRes(doctorService.findById(doctor_id)));
            result.setMessage("비밀번호 변경 성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }
        return new ResponseEntity<ResVO<DoctorRes>>(result, status);
    }

    // 의사 프로필 업데이트
    @PostMapping("/profile/{doctorId}")
    @Operation(summary = "프로필 업데이트", description = "프로필 사진을 업데이트한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<String>> updateProfile(
            @PathVariable @Parameter(description = "의사 아이디") Long doctorId,
            @RequestParam("profileImgUrl") @Parameter(description = "프로필 사진") MultipartFile multipartFile,
            HttpServletRequest req) {
        ResVO<String> result = new ResVO<>();
        HttpStatus status = null;
        try{
            status = HttpStatus.OK;
            doctorService.updateProfile(doctorId, multipartFile);
            result.setMessage("성공");
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<String>>(result, status);
    }
}

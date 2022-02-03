package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.response.DoctorRes;
import com.ssafy.pettodoctor.api.response.ResVO;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    @GetMapping("/{doctorId}")
    @Operation(summary = "키에 해당하는 의사 정보 반환", description = "키에 해당하는 의사 정보를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<DoctorRes>> findDoctorsById(
            @PathVariable @Parameter(description = "의사키") Long doctorId ) {
        ResVO<DoctorRes> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Doctor doctor = doctorService.findById(doctorId);
            result.setData(DoctorRes.converToRes(doctor));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<DoctorRes>>(result, status);
    }
}

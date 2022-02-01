package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.response.DoctorRes;
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

    @GetMapping("/{hospitalId}")
    @Operation(summary = "병원키에 해당하는 의사 정보 반환", description = "병원키에 해당하는 의사 정보 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> findDoctorsByHospitalId(
            @PathVariable @Parameter(description = "병원키") Long hospitalId ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            List<Doctor> doctors = doctorService.findByHospitalId(hospitalId);
            resultMap.put("doctors", convertToRes(doctors));
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    // Doctor 엔티티 리스트를 반환형 타입 리스트로 변환하는 함수
    private List<DoctorRes> convertToRes(List<Doctor> doctors){
        List<DoctorRes> result = new ArrayList<>();
        for(Doctor d : doctors){
            DoctorRes dr = new DoctorRes(d.getId(), d.getEmail(), d.getName()
                    , d.getRole(), d.getTel(),d.getJoinDate(),
                    d.getPysicianLicenseNumber(), d.getSpecialty()
                    , d.getPrice(), d.getHospital().getId());
            result.add(dr);
        }

        return result;
    }
}

package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Schedule;
import com.ssafy.pettodoctor.api.domain.Treatment;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import com.ssafy.pettodoctor.api.request.TreatmentPostReq;
import com.ssafy.pettodoctor.api.response.TreatmentRes;
import com.ssafy.pettodoctor.api.service.TreatmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/treatment")
@Tag(name = "treatment controller", description = "진료 관련 컨트롤러")
@CrossOrigin("*")
public class TreatmentController {
    private final TreatmentService treatmentService;

    @GetMapping("/doctor/{doctorId}")
    @Operation(summary = "의사의 진료 정보 반환", description = "의사의 진료 정보 리스트 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> findTreatmentsByDoctorId(
            @PathVariable @Parameter(description = "의사키") Long doctorId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            List<Treatment> treatments = treatmentService.findByDoctorId(doctorId);
            resultMap.put("treatments", converToResList(treatments));
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "사용자의 진료 정보 반환", description = "사용자의 진료 정보 리스트 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> findTreatmentsByUserId(
            @PathVariable @Parameter(description = "사용자키") Long userId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            List<Treatment> treatments = treatmentService.findByUserId(userId);
            resultMap.put("treatments", converToResList(treatments));
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/{treatmentId}")
    @Operation(summary = "키에 해당하는 진료 정보 반환", description = "키에 해당하는 진료 정보 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> findTreatmentById(
            @PathVariable @Parameter(description = "진료키") Long treatmentId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            Treatment treatment = treatmentService.findById(treatmentId);
            resultMap.put("treatment", convertToRes(treatment));
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PostMapping
    @Operation(summary = "진료 정보 등록", description = "진료 정보 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> registerTreatment(
            @RequestBody @Parameter(description = "진료 정보") TreatmentPostReq treatmentPostReq) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            Long treatmentId = treatmentService.registerTreatment(treatmentPostReq);
            resultMap.put("treatmentId", treatmentId);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PutMapping("/{treatmentId}")
    @Operation(summary = "진료 상태 수정", description = "진료 정보 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> updateTreatmentState(
            @PathVariable @Parameter(description = "진료키") Long treatmentId,
            @RequestBody @Parameter(description = "진료 정보 상태")TreatmentType treatmentType) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            Treatment treatment = treatmentService.updateTreatment(treatmentId, treatmentType);
            resultMap.put("treatment", convertToRes(treatment));
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    private TreatmentRes convertToRes(Treatment t){
        TreatmentRes tr = new TreatmentRes(t.getId(), t.getUser().getId(), t.getDoctor().getId()
                ,t.getPrescription() != null ? t.getPrescription().getId() : null, t.getHospital().getId()
                ,t.getPaymentCode(), t.getScheduleDate(), t.getType()
        ,t.getReVisit(), t.getPetName(), t.getSymptom(), t.getBirthDate()
        ,t.getPetSpecies(), t.getPetWeight(), t.getPrice(), t.getUrl());
        return tr;
    }

    private List<TreatmentRes> converToResList(List<Treatment> treatments){
        List<TreatmentRes> result = new ArrayList<>();
        for(Treatment t : treatments){
            result.add(convertToRes(t));
        }
        return result;
    }
}

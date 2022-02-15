package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.request.PrescriptionPostReq;
import com.ssafy.pettodoctor.api.request.ShippingReq;
import com.ssafy.pettodoctor.api.response.MedicineRes;
import com.ssafy.pettodoctor.api.response.PrescriptionRes;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.service.MedicineService;
import com.ssafy.pettodoctor.api.service.PrescriptionService;
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
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/prescription")
@Tag(name = "prescription controller", description = "진단서 관련 컨트롤러")
@CrossOrigin("*")
public class PrescriptionController {
    private final PrescriptionService prescriptionService;
    private final MedicineService medicineService;

    @PostMapping("/{treatmentId}")
    @Operation(summary = "진단서 작성", description = "진단서를 작성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> writeCertificate(
            @RequestBody @Parameter(description = "진단서 작성 정보") PrescriptionPostReq certificateInfo,
            @PathVariable @Parameter(description = "진료 아이디") Long treatmentId
    ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            prescriptionService.writeCertificate(certificateInfo, treatmentId);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity(resultMap, status);
    }

    @GetMapping
    @Operation(summary = "id 진단서 확인", description = "id 진단서 확인을 확인해준다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<PrescriptionRes>> getPrescription(
            @RequestParam @Parameter(description = "진단서 id") Long prescription_id
    ) {
        ResVO<PrescriptionRes> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Prescription prescription = prescriptionService.findById(prescription_id);
            result.setData(PrescriptionRes.convertToRes(prescription));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }
        return new ResponseEntity<ResVO<PrescriptionRes>>(result, status);
    }

    @GetMapping("/list/doctor/type")
    @Operation(summary = "의사 진단서 타입별 리스트 조회", description = "해당 의사의 특정타입 진단서 리스트를 조회해준다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<PrescriptionRes>>> getPrescriptionListByDoctorAndType(
            @RequestParam @Parameter(description = "의사 아이디") Long doctor_id ,
            @RequestParam @Parameter(description = "상태(전,후,전취,후취,완)") TreatmentType type
    ) {
        ResVO<List<PrescriptionRes>> result = new ResVO<>();
        HttpStatus status = null;
        try {

            List<Prescription> prescriptions = prescriptionService.findByDoctorIdAndType(doctor_id, type);
            result.setData(PrescriptionRes.convertToResList(prescriptions));
            result.setMessage("성공");

            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }
        return new ResponseEntity<ResVO<List<PrescriptionRes>>>(result, status);
    }

    @GetMapping("/list/doctor")
    @Operation(summary = "의사 진단서 전체 리스트 조회", description = "해당 의사의 진단서 전체 리스트를 조회해준다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<PrescriptionRes>>> getPrescriptionListByDoctor(
            @RequestParam @Parameter(description = "의사 아이디") Long doctor_id
     ) {
        ResVO<List<PrescriptionRes>> result = new ResVO<>();
        HttpStatus status = null;
        try {

            List<Prescription> prescriptions = prescriptionService.findByDoctorId(doctor_id);
            result.setData(PrescriptionRes.convertToResList(prescriptions));
            result.setMessage("성공");

            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }
        return new ResponseEntity<ResVO<List<PrescriptionRes>>>(result, status);
    }

    @PutMapping("/shipping")
    @Operation(summary = "운송장 등록", description = "운송장을 등록한다. 등록 시 isShipping를 true로 변환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<PrescriptionRes>> setShipping(
            @RequestParam @Parameter(description = "리스트 아이디") Long prescriptionId,
            @RequestBody  @Parameter(description = "운송장 번호") String invoiceCode) {
        ResVO<PrescriptionRes> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Prescription prescription = prescriptionService.updateShippingInfo(prescriptionId, invoiceCode);
            result.setData(PrescriptionRes.convertToRes(prescription));
            status = HttpStatus.OK;
            result.setMessage("성공");
        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }
        return new ResponseEntity<ResVO<PrescriptionRes>>(result, status);
    }

    @PostMapping("/medicine/{prescriptionId}")
    @Operation(summary = "약 리스트 정보", description = "약 리스트를 가져온다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<MedicineRes>>> writeCertificate(
            @PathVariable @Parameter(description = "진단서 아이디") Long prescriptionId){
        ResVO<List<MedicineRes>> result = new ResVO<>();
        HttpStatus status = null;
        try{
            List<Medicine> medicines = medicineService.findByPrescriptionId(prescriptionId);
            result.setData(MedicineRes.convertToResList(medicines));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }
        return new ResponseEntity<ResVO<List<MedicineRes>>>(result, status);
    }

    @PutMapping("/payment/{prescriptionId}")
    @Operation(summary = "결제 정보 수정", description = "처방 정보 수정한다. PayemntType이 COMPLETE로 변경된다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<PrescriptionRes>> updatePaymentInfo(
            @PathVariable @Parameter(description = "처방키") Long prescriptionId,
            @RequestBody @Parameter(description = "결제 코드 및 배송 정보") ShippingReq shippingReq) {
        ResVO<PrescriptionRes> result = new ResVO<>();
        HttpStatus status = null;
        try{
            Prescription prescription = prescriptionService.updatePaymentInfo(prescriptionId, shippingReq);
            result.setData(PrescriptionRes.convertToRes(prescription));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<PrescriptionRes>>(result, status);
    }


}

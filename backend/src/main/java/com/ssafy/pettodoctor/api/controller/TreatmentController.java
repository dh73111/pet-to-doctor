package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Treatment;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import com.ssafy.pettodoctor.api.request.PaymentReq;
import com.ssafy.pettodoctor.api.request.TreatmentPostReq;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.response.TreatmentRes;
import com.ssafy.pettodoctor.api.service.PrescriptionService;
import com.ssafy.pettodoctor.api.service.TreatmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/treatment")
@Tag(name = "treatment controller", description = "진료 관련 컨트롤러")
@CrossOrigin("*")
public class TreatmentController {
    private final TreatmentService treatmentService;
    private final PrescriptionService prescriptionService;

    @GetMapping("/doctor/{doctorId}")
    @Operation(summary = "의사의 특정 타입 진료 정보 반환", description = "의사의 특정 타입 진료 정보 리스트 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<TreatmentRes>>> findTreatmentsByDoctorIdAndType(
            @PathVariable @Parameter(description = "의사키") Long doctorId,
            @RequestParam @Parameter(description = "상태") TreatmentType treatmentType) {
        ResVO<List<TreatmentRes>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<Treatment> treatments = treatmentService.findByDoctorIdAndType(doctorId, treatmentType);
            result.setData(TreatmentRes.convertToResList(treatments));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<List<TreatmentRes>>>(result, status);
    }

    @GetMapping("/doctor/all/{doctorId}")
    @Operation(summary = "의사의 전체 진료 정보 반환", description = "의사의 전체 진료 정보 리스트 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<TreatmentRes>>> findAllTreatmentsByDoctorId(
            @PathVariable @Parameter(description = "의사키") Long doctorId) {
        ResVO<List<TreatmentRes>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<Treatment> treatments = treatmentService.findByDoctorId(doctorId);
            result.setData(TreatmentRes.convertToResList(treatments));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<List<TreatmentRes>>>(result, status);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "사용자의 특정 타입 진료 정보 반환", description = "사용자의 특정 타입 진료 정보 리스트 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<TreatmentRes>>> findTreatmentsByUserIdAndType(
            @PathVariable @Parameter(description = "사용자키") Long userId,
            @RequestParam @Parameter(description = "상태") TreatmentType treatmentType) {
        ResVO<List<TreatmentRes>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<Treatment> treatments = treatmentService.findByUserIdAndType(userId, treatmentType);
            result.setData(TreatmentRes.convertToResList(treatments));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<List<TreatmentRes>>>(result, status);
    }

    @GetMapping("/user/all/{userId}")
    @Operation(summary = "사용자의 전체 진료 정보 반환", description = "사용자의 전체 진료 정보 리스트 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<TreatmentRes>>> findTreatmentsByUserId(
            @PathVariable @Parameter(description = "사용자키") Long userId) {
        ResVO<List<TreatmentRes>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<Treatment> treatments = treatmentService.findByUserId(userId);
            result.setData(TreatmentRes.convertToResList(treatments));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<List<TreatmentRes>>>(result, status);
    }

    @GetMapping("/{treatmentId}")
    @Operation(summary = "키에 해당하는 진료 정보 반환", description = "키에 해당하는 진료 정보 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<TreatmentRes>> findTreatmentById(
            @PathVariable @Parameter(description = "진료키") Long treatmentId) {
        ResVO<TreatmentRes> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Treatment treatment = treatmentService.findById(treatmentId);
            result.setData(TreatmentRes.convertToRes(treatment));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<TreatmentRes>>(result, status);
    }

    @PostMapping
    @Operation(summary = "진료 정보 등록", description = "진료 정보 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<Long>> registerTreatment(
            @RequestBody @Parameter(description = "진료 정보") TreatmentPostReq treatmentPostReq) {
        ResVO<Long> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Long treatmentId = treatmentService.registerTreatment(treatmentPostReq);
            result.setData(treatmentId);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<Long>>(result, status);
    }

    @PutMapping("/cancel/{treatmentId}")
    @Operation(summary = "진료 취소",
            description = " RES_REQUEST, RES_PAID, RES_CONFIRMED -> RES_CANCLE" +
                    "시 사용한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<TreatmentRes>> cancleTreatment(
            @PathVariable @Parameter(description = "진료키") Long treatmentId,
            @RequestParam @Parameter(description = "취소 사유")String reason) {
        ResVO<TreatmentRes> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Treatment treatment = treatmentService.cancleTreatment(treatmentId, reason);

            result.setData(TreatmentRes.convertToRes(treatment));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<TreatmentRes>>(result, status);
    }

    @PutMapping("/{treatmentId}")
    @Operation(summary = "진료 상태 수정",
            description = "RES_PAID -> RES_CONFIRMED" +
                    ", RES_CONFIRMED -> RES_COMPLETE " +
                    "시 사용한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<TreatmentRes>> updateTreatmentState(
            @PathVariable @Parameter(description = "진료키") Long treatmentId,
            @RequestParam @Parameter(description = "진료 정보 상태")TreatmentType treatmentType) {
        ResVO<TreatmentRes> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Treatment treatment = null;
            //Treatment treatment = treatmentService.updateTreatment(treatmentId, treatmentType);

            switch(treatmentType){
                case RES_CONFIRMED:
                    treatment = treatmentService.updateConfirm(treatmentId);
                    break;
                case RES_COMPLETE:
                    treatment = treatmentService.updateComplete(treatmentId);
                    break;
            }

            result.setData(TreatmentRes.convertToRes(treatment));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<TreatmentRes>>(result, status);
    }

    @PutMapping("/payment/{treatmentId}")
    @Operation(summary = "결제 정보 수정"
            , description = "진료 정보 수정한다. TreatmentType이 RES_PAID로 변경된다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<TreatmentRes>> updatePaymentInfo(
            @PathVariable @Parameter(description = "진료키") Long treatmentId,
            @RequestBody @Parameter(description = "결제 정보")PaymentReq paymentReq) {
        ResVO<TreatmentRes> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Treatment treatment = treatmentService.updatePaymentInfo(treatmentId, paymentReq);
            result.setData(TreatmentRes.convertToRes(treatment));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<TreatmentRes>>(result, status);
    }
}

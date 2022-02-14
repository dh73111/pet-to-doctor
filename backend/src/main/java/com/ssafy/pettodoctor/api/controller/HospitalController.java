package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.service.DoctorService;
import com.ssafy.pettodoctor.api.service.HospitalService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hospital")
@Tag(name = "hospital controller", description = "병원 관련 컨트롤러")
@CrossOrigin("*")
public class HospitalController {
    private final HospitalService hospitalService;

    @GetMapping("/{hospitalId}")
    @Operation(summary = "병원키에 해당하는 병원 정보 반환", description = "병원키에 해당하는 병원 정보를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<Hospital>> findById(
            @PathVariable @Parameter(description = "병원키") Long hospitalId ) {
        ResVO<Hospital> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Hospital hospital = hospitalService.findById(hospitalId);
            result.setData(hospital);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<Hospital>>(result, status);
    }

    @GetMapping("/dong/{dongCode}")
    @Operation(summary = "동코드에 해당하는 병원 정보 반환", description = "동코드에 해당하는 병원 정보 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<Hospital>>> findByDongCode(
            @PathVariable @Parameter(description = "동코드") String dongCode ) {
        ResVO<List<Hospital>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<Hospital> hospitals = hospitalService.findByDongCode(dongCode);
            result.setData(hospitals);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<Hospital>>>(result, status);
    }

    @GetMapping("/name")
    @Operation(summary = "이름에 해당하는 병원 정보 반환", description = "입력과 유사한 이름의 병원 정보 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<Hospital>>> findByName(
            @RequestParam @Parameter(description = "이름") String name ) {
        ResVO<List<Hospital>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<Hospital> hospitals = hospitalService.findByName(name);
            result.setData(hospitals);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<Hospital>>>(result, status);
    }

    @GetMapping("/dong/name")
    @Operation(summary = "이름에 해당하는 병원 정보 반환", description = "입력과 유사한 이름의 병원 정보 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<Hospital>>> findByDongName(
            @RequestParam @Parameter(description = "동 이름") String dongName ) {
        ResVO<List<Hospital>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<Hospital> hospitals = hospitalService.findByDongName(dongName);
            result.setData(hospitals);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<Hospital>>>(result, status);
    }

    @PostMapping("/profile/{hospitalId}")
    @Operation(summary = "프로필 업데이트", description = "프로필 사진을 업데이트한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<String>> updateProfile(
            @PathVariable @Parameter(description = "병원 아이디") Long hospitalId,
            @RequestParam("profileImgUrl") @Parameter(description = "프로필 사진") MultipartFile multipartFile,
            HttpServletRequest req) {
        ResVO<String> result = new ResVO<>();
        HttpStatus status = null;
        try{
            status = HttpStatus.OK;
            hospitalService.updateProfile(hospitalId, multipartFile) ;
            result.setMessage("성공");
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<String>>(result, status);
    }

}

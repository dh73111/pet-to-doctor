package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Doctor;
import com.ssafy.pettodoctor.api.domain.Schedule;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.response.ScheduleRes;
import com.ssafy.pettodoctor.api.service.ScheduleService;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
@Tag(name = "schedule controller", description = "스케쥴 관련 컨트롤러")
@CrossOrigin("*")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping("/{doctorId}")
    @Operation(summary = "의사의 몇일 후 스케줄 정보 반환", description = "의사의 몇일 후 스케줄 정보 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<ScheduleRes>> findSchedule(
            @PathVariable @Parameter(description = "의사키") Long doctorId,
            @RequestParam @Parameter(description = "몇일 후") Integer plusDay) {
        ResVO<ScheduleRes> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Schedule schedule = scheduleService.findOneByDoctorId(doctorId, plusDay);
            result.setData(ScheduleRes.convertToRes(schedule));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<ScheduleRes>>(result, status);
    }

    @PostMapping("/{doctorId}")
    @Operation(summary = "의사의 몇일 후 스케줄 정보 갱신", description = "의사의 몇일 후 스케줄 정보 갱신한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<ScheduleRes>> updateSchdule(
            @PathVariable @Parameter(description = "의사키") Long doctorId,
            @RequestParam @Parameter(description = "몇일 후") Integer plusDay,
            @RequestParam @Parameter(description = "갱신할 스케쥴 정보") String bitmask) {
        ResVO<ScheduleRes> result = new ResVO<>();
        HttpStatus status = null;

        try{
            Schedule schedule = scheduleService.updateOneByDoctorId(doctorId, plusDay, bitmask);
            result.setData(ScheduleRes.convertToRes(schedule));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<ScheduleRes>>(result, status);
    }
}

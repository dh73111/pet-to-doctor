package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.service.MarkService;
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
@RequestMapping("/api/mark")
@Tag(name = "mark controller", description = "사용자-병원 즐겨찾기 관련 컨트롤러")
@CrossOrigin("*")
public class MarkController {

    private final MarkService markService;

    @PostMapping("/mark")
    @Operation(summary = "즐겨찾기 추가(미구현)", description = "즐겨찾기를 추가한다. 반환 내용 없음")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 병원 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> postMark(
            @RequestParam @Parameter(description = "병원 ID") Long hospitalId) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            resultMap.put("message", "성공");
            status = HttpStatus.OK;

            resultMap.put("message", "사용자 또는 병원의 ID가 존재하지 않음");
            status = HttpStatus.NOT_FOUND;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}

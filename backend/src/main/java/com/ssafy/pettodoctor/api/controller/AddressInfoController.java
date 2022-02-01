package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.AddressInfo;
import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.service.AddressInfoService;
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
@RequestMapping("/api/address-info")
@Tag(name = "addressInfo controller", description = "주소정보 관련 컨트롤러")
@CrossOrigin("*")
public class AddressInfoController {
    private final AddressInfoService addressInfoService;

    @GetMapping("/name")
    @Operation(summary = "이름에 해당하는 동정보 반환", description = "입력과 유사한 이름의 동정보 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> findByName(
            @RequestParam @Parameter(description = "이름") String name ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            List<AddressInfo> addressInfos = addressInfoService.findByAddress(name);
            resultMap.put("addressInfos", addressInfos);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}

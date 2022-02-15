package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.AddressInfo;
import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.response.ResVO;
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
@CrossOrigin("https://i6b209.p.ssafy.io/")
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
    public ResponseEntity<ResVO<List<AddressInfo>>> findByName(
            @RequestParam @Parameter(description = "이름") String name ) {
        ResVO<List<AddressInfo>> result = new ResVO<>();
        HttpStatus status = null;

        try{
            List<AddressInfo> addressInfos = addressInfoService.findByAddress(name);
            result.setData(addressInfos);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<List<AddressInfo>>>(result, status);
    }
}

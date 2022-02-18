package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.auth.AccountUserDetails;
import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Mark;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.response.MarkRes;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.service.MarkService;
import com.ssafy.pettodoctor.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mark")
@Tag(name = "mark controller", description = "사용자-병원 즐겨찾기 관련 컨트롤러")
@CrossOrigin("*")
public class MarkController {

    private final MarkService markService;
    private final UserService userService;

    @PostMapping("/{hospitalId}")
    @Operation(summary = "즐겨찾기 추가", description = "즐겨찾기를 추가한다. (로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 병원 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> postMark(
            @PathVariable @Parameter(description = "병원 ID") Long hospitalId) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;


        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            if (markService.addMark(nowUser, hospitalId).isPresent()) {
                resultMap.put("message", "성공");
            } else {
                resultMap.put("message", "이미 즐겨찾기된 병원입니다.");
            }
            status = HttpStatus.OK;

        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    @GetMapping("")
    @Operation(summary = "사용자의 즐겨찾기 목록을 가져온다.", description = "로그인된 사용자의 즐겨찾기 리스트를 반환한다.(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 병원 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<MarkRes>>> getMarkList() {
        ResVO<List<MarkRes>> result = new ResVO<>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            List<Mark> marksOfUser = markService.getMarksOfUser(nowUser);

            result.setMessage("사용자의 마크 리스트를 불러오는데 성공했습니다.");
            result.setData(MarkRes.convertToMarkResList(marksOfUser));
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<MarkRes>>>(result, status);
    }


    @DeleteMapping("/{markId}")
    @Operation(summary = "즐겨찾기 삭제", description = "사용자의 즐겨찾기 하나를 삭제한다.(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 병원 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> deleteMark(
            @PathVariable @Parameter(description = "마크 ID") Long markId) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            markService.delete(nowUser, markId);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @DeleteMapping("delHospital/{hospitalId}")
    @Operation(summary = "병원 ID로 즐겨찾기 삭제", description = "사용자의 즐겨찾기 하나를 병원 Id를 통해 삭제한다.(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 병원 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> deleteMarkbyHospitalId(
            @PathVariable @Parameter(description = "병원 ID") Long hospitalId) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            markService.deleteByHospitalId(nowUser, hospitalId);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}

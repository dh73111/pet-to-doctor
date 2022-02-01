package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Review;
import com.ssafy.pettodoctor.api.request.ReviewPostReq;
import com.ssafy.pettodoctor.api.response.ReviewRes;
import com.ssafy.pettodoctor.api.service.ReviewService;
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
@RequestMapping("/api/review")
@Tag(name = "review controller", description = "리뷰 관련 컨트롤러")
@CrossOrigin("*")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{hospitalId}")
    @Operation(summary = "리뷰 정보 반환", description = "키에 해당하는 병원 리뷰 정보 리스트를 반환한다.")
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
            List<Review> reviews = reviewService.findByHospitalId(hospitalId);
            resultMap.put("reviews", convertToResList(reviews));
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PostMapping
    @Operation(summary = "리뷰 등록", description = "리뷰를 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> registerReview(
            @RequestBody @Parameter(description = "리뷰 내용") ReviewPostReq reviewPostReq ) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try{
            Long reviewId = reviewService.registerReview(reviewPostReq);
            resultMap.put("reviewId", reviewId);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    private List<ReviewRes> convertToResList(List<Review> reviews){
        List<ReviewRes> result = new ArrayList<>();
        for(Review r : reviews){
            ReviewRes rr = new ReviewRes(r.getId(), r.getUser().getId()
                    , r.getHospital().getId(), r.getContent(), r.getRate());
            result.add(rr);
        }

        return result;
    }
}

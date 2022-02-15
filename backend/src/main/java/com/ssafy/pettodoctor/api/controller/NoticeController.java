package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Notice;
import com.ssafy.pettodoctor.api.domain.NoticeType;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import com.ssafy.pettodoctor.api.request.NoticePostReq;
import com.ssafy.pettodoctor.api.response.NoticeRes;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.response.TreatmentRes;
import com.ssafy.pettodoctor.api.service.NoticeService;
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
@RequestMapping("/api/notice")
@Tag(name = "notice controller", description = "알림 관련 컨트롤러")
@CrossOrigin("https://i6b209.p.ssafy.io/")
public class NoticeController {
    private final NoticeService noticeService;

    @PostMapping
    @Operation(summary = "알림 등록", description = "알림을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<Long>> registerNotice(
            @RequestBody @Parameter(description = "알림 정보") NoticePostReq noticePostReq
    ) {
        ResVO<Long> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Long noticeId = noticeService.registerNotice(noticePostReq);
            result.setData(noticeId);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }
        return new ResponseEntity<ResVO<Long>>(result, status);
    }

    @PutMapping("/check/{noticeId}")
    @Operation(summary = "확인여부 정보 수정", description = "확인여부 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<NoticeRes>> updateNoticeCheck(
            @PathVariable @Parameter(description = "알림키") Long noticeId) {
        ResVO<NoticeRes> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Notice notice = noticeService.updateCheckInfo(noticeId);
            result.setData(NoticeRes.convertToRes(notice));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<NoticeRes>>(result, status);
    }

    @GetMapping("/list/{accountId}")
    @Operation(summary = "알림 정보 반환", description = "해당 ID의 알림 정보 리스트 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<NoticeRes>>> findNoticesByNoticeId(
            @PathVariable @Parameter(description = "계정키") Long accountId) {
        ResVO<List<NoticeRes>> result = new ResVO<>();
        HttpStatus status = null;
        try {
            List<Notice> notices = noticeService.findByAccountId(accountId);
            result.setData(NoticeRes.convertToResList(notices));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버오류");
        }

        return new ResponseEntity<ResVO<List<NoticeRes>>>(result, status);

    }
}

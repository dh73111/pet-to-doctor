package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.domain.Qna;
import com.ssafy.pettodoctor.api.request.QnaModReq;
import com.ssafy.pettodoctor.api.request.QnaRegReq;
import com.ssafy.pettodoctor.api.request.QnaReplyReq;
import com.ssafy.pettodoctor.api.response.QnaRes;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.service.QnaService;
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
@RequestMapping("/api/qna")
@Tag(name = "Qna controller", description = "QnA 관련 컨트롤러")
@CrossOrigin("https://i6b209.p.ssafy.io/")
public class QnaController {
    private final QnaService qnaService;

    // == 등록 == //
    @PostMapping
    @Operation(summary = "QnA 등록", description = "QnA를 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<Void>> registerQnA(
            @RequestBody @Parameter(description = "등록할 QnA 정보")QnaRegReq qnaRegReq){
        ResVO<Void> result = new ResVO<>();
        HttpStatus status = null;
        try {
            qnaService.registerQna(qnaRegReq);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<Void>>(result, status);
    }

    // == 조회 == //
    // 전체 조회
    @GetMapping
    @Operation(summary = "모든 QnA 조회", description = "모든 QnA를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<QnaRes>>> selectAll(){
        ResVO<List<QnaRes>> result = new ResVO<>();
        HttpStatus status = null;
        try {
            List<Qna> qnas = qnaService.selectAll();
            result.setData(QnaRes.convertToList(qnas));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<QnaRes>>>(result, status);
    }
    // 질문자 조회
    @GetMapping("/account/{accountId}")
    @Operation(summary = "질문자 QnA 조회", description = "질문자 QnA를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<QnaRes>>> selectByAccount(
            @PathVariable @Parameter(description = "질문자 id") Long accountId
    ){
        ResVO<List<QnaRes>> result = new ResVO<>();
        HttpStatus status = null;
        try {
            List<Qna> qnas = qnaService.selectByAccount(accountId);
            result.setData(QnaRes.convertToList(qnas));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<QnaRes>>>(result, status);
    }
    // 관리자 조회
    @GetMapping("/admin/{adminId}")
    @Operation(summary = "관리자 QnA 조회", description = "관리자 QnA를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<QnaRes>>> selectByAdmin(
            @PathVariable @Parameter(description = "관리자 id") Long adminId
    ){
        ResVO<List<QnaRes>> result = new ResVO<>();
        HttpStatus status = null;
        try {
            List<Qna> qnas = qnaService.selectByAdmin(adminId);
            result.setData(QnaRes.convertToList(qnas));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<QnaRes>>>(result, status);
    }
    // 제목 조회
    @GetMapping("/title")
    @Operation(summary = "입력 제목과 유사한 QnA 조회", description = "입력 제목과 유사한 QnA를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<QnaRes>>> selectByTitle(
            @RequestParam @Parameter(description = "조회할 제목") String title
    ){
        ResVO<List<QnaRes>> result = new ResVO<>();
        HttpStatus status = null;
        try {
            List<Qna> qnas = qnaService.selectByTitle(title);
            result.setData(QnaRes.convertToList(qnas));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<QnaRes>>>(result, status);
    }
    // == 수정 == //
    // 내용 수정
    @PutMapping("/content/{qnaId}")
    @Operation(summary = "QnA 제목 및 내용 수정", description = "QnA 제목 및 내용을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<QnaRes>> modifyQnA(
            @PathVariable @Parameter(description = "수정할 QnA id") Long qnaId,
            @RequestBody @Parameter(description = "수정할 QnA 정보") QnaModReq qnaModReq){
        ResVO<QnaRes> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Qna qna = qnaService.modifyQna(qnaId, qnaModReq);
            result.setData(QnaRes.convertTo(qna));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<QnaRes>>(result, status);
    }
    // 답변 등록 or 수정
    @PutMapping("/reply/{qnaId}")
    @Operation(summary = "QnA 답변 등록 및 수정", description = "QnA 답변 등록 및 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<QnaRes>> replyQnA(
            @PathVariable @Parameter(description = "답변 등록할 QnA id") Long qnaId,
            @RequestBody @Parameter(description = "답변 등록할 QnA 정보")QnaReplyReq qnaReplyReq){
        ResVO<QnaRes> result = new ResVO<>();
        HttpStatus status = null;
        try {
            Qna qna = qnaService.updateReply(qnaId, qnaReplyReq);
            result.setData(QnaRes.convertTo(qna));
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<QnaRes>>(result, status);
    }
    // == 삭제 == //
    @DeleteMapping("/{qnaId}")
    @Operation(summary = "QnA 삭제", description = "QnA를 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<Void>> deleteQnA(
            @PathVariable @Parameter(description = "삭제할 QnA id")Long qnaId){
        ResVO<Void> result = new ResVO<>();
        HttpStatus status = null;
        try {
            qnaService.deleteQna(qnaId);
            result.setMessage("성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<Void>>(result, status);
    }
}

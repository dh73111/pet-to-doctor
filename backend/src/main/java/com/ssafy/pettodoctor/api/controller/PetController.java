package com.ssafy.pettodoctor.api.controller;

import com.ssafy.pettodoctor.api.auth.AccountUserDetails;
import com.ssafy.pettodoctor.api.domain.Mark;
import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.request.PetPostReq;
import com.ssafy.pettodoctor.api.response.PetRes;
import com.ssafy.pettodoctor.api.response.ResVO;
import com.ssafy.pettodoctor.api.service.PetService;
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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pet")
@Tag(name = "pet controller", description = "반려동물 관련 컨트롤러")
@CrossOrigin("*")
public class PetController {

    private final PetService petService;
    private final UserService userService;

    @PostMapping("/")
    @Operation(summary = "반려동물 등록", description = "반려동물을 추가로 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> postPet(
            @RequestParam @Parameter(description = "애완동물 입력 폼")PetPostReq petReq) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            resultMap.put("message", "사용자 정보가 없습니다.");
            status = HttpStatus.NOT_FOUND;
            return new ResponseEntity<Map<String, Object>>(resultMap, status);
        }

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            petService.addPet(nowUser, petReq);

            resultMap.put("message", "성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/")
    @Operation(summary = "사용자의 반려동물 목록을 가져온다.", description = "요청에 있는 jwt토큰 주인 사용자의 반려동물 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 병원 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<List<PetRes>>> getPetList() {
        ResVO<List<PetRes>> result = new ResVO<>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            List<Pet> petsOfUser = petService.getPetsOfUser(nowUser);

            result.setMessage("펫 리스트 조회 성공");
            result.setData(PetRes.convertToPetResList(petsOfUser));
            status = HttpStatus.OK;
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<List<PetRes>>>(result, status);
    }

    @DeleteMapping("")
    @Operation(summary = "반려동물 데이터 삭제", description = "로그인한 사용자의 반려동물 데이터 하나를 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 병원 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> deletePet(
            @RequestParam @Parameter(description = "마크 ID") Long petId) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpStatus status = null;

        try {
            AccountUserDetails userDetails = (AccountUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
            User nowUser = userService.getUserById(userDetails.getUserId()).get();
            petService.delete(nowUser, petId);
            resultMap.put("message", "성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            resultMap.put("message", "서버 오류");
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


    // 펫 프로필 업데이트
    @PostMapping("/profile/{petId}")
    @Operation(summary = "프로필 업데이트", description = "프로필 사진을 업데이트한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<String>> updateProfile(
            @PathVariable @Parameter(description = "펫 아이디") Long petId,
            @RequestParam("profileImgUrl") @Parameter(description = "프로필 사진") MultipartFile multipartFile,
            HttpServletRequest req) {
        ResVO<String> result = new ResVO<>();
        HttpStatus status = null;
        try{
            status = HttpStatus.OK;
            petService.updateProfile(petId, multipartFile) ;
            result.setMessage("성공");
        } catch (Exception e){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<String>>(result, status);
    }
}

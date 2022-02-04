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

    @PostMapping("")
    @Operation(summary = "반려동물 등록", description = "반려동물을 추가로 등록한다.(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> postPet(
            @RequestParam @Parameter(description = "애완동물 입력 폼")PetPostReq petReq) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

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

    @GetMapping("/{petId}")
    @Operation(summary = "반려동물 조회", description = "반려동물 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "해당 petId 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<PetRes>> getPet(
            @PathVariable("petId") @Parameter(description = "펫 ID") Long petId) {
        ResVO<PetRes> result = new ResVO<>();
        HttpStatus status = null;

        try {
            Pet findPet = petService.getPetById(petId);
            result.setData(PetRes.convertToPetRes(findPet));
            result.setMessage("반려동물 조회 성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<PetRes>>(result, status);
    }

    @GetMapping("/list")
    @Operation(summary = "사용자의 반려동물 목록", description = "로그인 되어있는 사용자의 반려동물 리스트를 반환한다.(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
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

    @DeleteMapping("/{petId}")
    @Operation(summary = "반려동물 데이터 삭제", description = "로그인한 사용자의 반려동물 데이터 하나를 삭제한다.(로그인필요)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "해당 petId 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<Map<String, Object>> deletePet(
            @PathVariable("petId") @Parameter(description = "펫 ID") Long petId) {
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

    @PutMapping("/{petId}")
    @Operation(summary = "반려동물 정보 수정", description = "반려동물 정보 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "해당 펫 id 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    public ResponseEntity<ResVO<PetRes>> changePet(
            @PathVariable("petId") @Parameter(description = "펫 ID") Long petId,
            @RequestBody @Parameter(description = "애완동물 입력 폼")PetPostReq petReq) {
        ResVO<PetRes> result = new ResVO<>();
        HttpStatus status = null;

        try {
            Pet newPet = petService.change(petId, petReq);
            result.setData(PetRes.convertToPetRes(newPet));
            result.setMessage("반려동물 정보 수정 성공");
            status = HttpStatus.OK;

        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            result.setMessage("서버 오류");
        }

        return new ResponseEntity<ResVO<PetRes>>(result, status);
    }

}

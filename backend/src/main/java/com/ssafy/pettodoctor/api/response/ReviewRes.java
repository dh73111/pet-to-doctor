package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Address;
import com.ssafy.pettodoctor.api.domain.Review;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class ReviewRes {
    private Long id;
    private Long userId;
    private Long hospitalId;
    private String content;
    private Integer rate;
    private LocalDateTime createTime;
    private String userName;
    private String hospitalName;
    private Address hospitalAddress;

    public ReviewRes() {
    }

    public ReviewRes(Long id, Long userId, Long hospitalId, String content,
                     Integer rate, LocalDateTime createTime, String username,
                     String hospitalName, Address hospitalAddress) {
        this.id = id;
        this.userId = userId;
        this.hospitalId = hospitalId;
        this.content = content;
        this.rate = rate;
        this.createTime = createTime;
        this.userName = username;
        this.hospitalName = hospitalName;
        this.hospitalAddress = hospitalAddress;
    }

    public static List<ReviewRes> convertToResList(List<Review> reviews){
        List<ReviewRes> result = new ArrayList<>();
        for(Review r : reviews){
            ReviewRes rr = new ReviewRes(r.getId(), r.getUser().getId(),
                    r.getHospital().getId(), r.getContent(), r.getRate(), r.getCreateTime(),
                    r.getUser().getName(), r.getHospital().getName(), r.getHospital().getAddress());
            result.add(rr);
        }
        return result;
    }
}

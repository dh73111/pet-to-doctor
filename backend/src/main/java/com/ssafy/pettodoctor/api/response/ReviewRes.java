package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Review;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class ReviewRes {
    private Long id;
    private Long userId;
    private Long hospitalId;
    private String content;
    private Integer rate;

    public ReviewRes() {
    }

    public ReviewRes(Long id, Long userId, Long hospitalId, String content, Integer rate) {
        this.id = id;
        this.userId = userId;
        this.hospitalId = hospitalId;
        this.content = content;
        this.rate = rate;
    }

    public static List<ReviewRes> convertToResList(List<Review> reviews){
        List<ReviewRes> result = new ArrayList<>();
        for(Review r : reviews){
            ReviewRes rr = new ReviewRes(r.getId(), r.getUser().getId()
                    , r.getHospital().getId(), r.getContent(), r.getRate());
            result.add(rr);
        }

        return result;
    }
}

package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.domain.Review;
import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.HospitalRepository;
import com.ssafy.pettodoctor.api.repository.ReviewRepository;
import com.ssafy.pettodoctor.api.repository.UserRepository;
import com.ssafy.pettodoctor.api.request.ReviewPostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;

    public List<Review> findByHospitalId(Long id){
        return reviewRepository.findByHospitalId(id);
    }

    @Transactional
    public Long registerReview(ReviewPostReq reviewPostReq){
        User user = userRepository.findById(reviewPostReq.getUserId()).get();
        Hospital hospital = hospitalRepository.findById(reviewPostReq.getHospitalId());
        return reviewRepository.registerReview(user, hospital
                , reviewPostReq.getContent(), reviewPostReq.getRate());
    }

    public List<Review> findAll(){
        return reviewRepository.findAll();
    }

    public List<Review> findRecentReview(int start){
        return reviewRepository.findRecentReview(start);
    }

    public List<Review> findOldReview(int start){ return reviewRepository.findOldReview(start); }

    public List<Review> findLowRateReview(int start){
        return reviewRepository.findLowRateReview(start);
    }

    public List<Review> findHighRateReview(int start){
        return reviewRepository.findHighRateReview(start);
    }

    public Long getCount(){
        return reviewRepository.getCount();
    }
}

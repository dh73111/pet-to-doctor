package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Review;
import com.ssafy.pettodoctor.api.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public List<Review> findByHospitalId(Long id){
        return reviewRepository.findByHospitalId(id);
    }
}

package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Hospital;
import com.ssafy.pettodoctor.api.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HospitalService {
    private final HospitalRepository hospitalRepository;

    public Hospital findById(Long id){
        return hospitalRepository.findById(id);
    }

    public List<Hospital> findByDongCode(String dongCode){
        return hospitalRepository.findByDongCode(dongCode);
    }

    public List<Hospital> findByName(String name){
        return hospitalRepository.findByName(name);
    }
}

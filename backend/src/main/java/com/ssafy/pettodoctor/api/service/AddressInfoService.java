package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.AddressInfo;
import com.ssafy.pettodoctor.api.repository.AddressInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AddressInfoService {
    private final AddressInfoRepository addressInfoRepository;

    public List<AddressInfo> findByAddress(String address){
        return addressInfoRepository.findByAddress(address);
    }
}

package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Admin;
import com.ssafy.pettodoctor.api.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {
    private final AdminRepository adminRepository;

    public Admin selectById(Long id){
        System.out.println("adminService");
        return adminRepository.findById(id);
    }
}

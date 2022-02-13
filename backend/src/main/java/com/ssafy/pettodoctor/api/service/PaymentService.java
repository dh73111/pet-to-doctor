package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Treatment;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import com.ssafy.pettodoctor.api.repository.TreatmentRepositry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {
    private final TreatmentRepositry treatmentRepositry;

    public Treatment findById(Long id){
        return treatmentRepositry.findByTreatmentId(id);
    }

    public void cancleTreatment(Long treatmentId){
        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        if(treatment.getType().equals(TreatmentType.RES_PAID)) {
            // 결제 취소 요청 보내기
            System.out.println("send cancel request to kakao");
        }
        treatment.setType(TreatmentType.RES_CANCEL);
    }
}

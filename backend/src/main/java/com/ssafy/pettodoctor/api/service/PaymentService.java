package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.Notice;
import com.ssafy.pettodoctor.api.domain.NoticeType;
import com.ssafy.pettodoctor.api.domain.Treatment;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import com.ssafy.pettodoctor.api.repository.NoticeRepository;
import com.ssafy.pettodoctor.api.repository.TreatmentRepositry;
import com.ssafy.pettodoctor.common.util.CancleRequestUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {
    private final TreatmentRepositry treatmentRepositry;
    private final NoticeRepository noticeRepository;

    public Treatment findById(Long id){
        return treatmentRepositry.findByTreatmentId(id);
    }

    public void cancleTreatment(Long treatmentId, String reason){
        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);

        // 결제를 취소해야하는 경우
        if(treatment.getType().equals(TreatmentType.RES_PAID)) {
            // access-token 발급
            String accessToken = CancleRequestUtil.getAccessToken2();
            // 결제 취소 요청 보내기
            String mId = treatment.getPaymentCode();
            Integer amount = treatment.getPrice();
            CancleRequestUtil.passCancleRequest(accessToken, mId, reason, amount);

            // 유저 알람 생성
            Notice notice = Notice.createNotice2(treatment.getUser(), treatment, NoticeType.PAYMENT
                    , treatment.getId() + "번 - 결제가 취소 되었습니다.");
            noticeRepository.save(notice);
        }

        // 유저 알람 생성
        Notice notice1 = Notice.createNotice2(treatment.getUser(), treatment, NoticeType.RESERVATION
                , treatment.getId() + "번 - 예약이 취소 되었습니다.");
        noticeRepository.save(notice1);
        // 의사에게 알림 필요
        Notice notice2 = Notice.createNotice2(treatment.getDoctor(), treatment, NoticeType.RESERVATION
                , treatment.getId() + "번 - 예약이 취소 되었습니다.");
        noticeRepository.save(notice2);

        treatment.setType(TreatmentType.RES_CANCEL);
    }
}
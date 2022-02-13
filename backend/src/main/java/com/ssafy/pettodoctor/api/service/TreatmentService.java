package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.repository.*;
import com.ssafy.pettodoctor.api.repository.DoctorRepository;
import com.ssafy.pettodoctor.api.repository.HospitalRepository;
import com.ssafy.pettodoctor.api.repository.TreatmentRepositry;
import com.ssafy.pettodoctor.api.repository.UserRepository;
import com.ssafy.pettodoctor.api.request.NoticePostReq;
import com.ssafy.pettodoctor.api.request.PaymentReq;
import com.ssafy.pettodoctor.api.request.TreatmentPostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TreatmentService {
    private final TreatmentRepositry treatmentRepositry;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final NoticeRepository noticeRepository;

    public Treatment findById(Long id){
        return treatmentRepositry.findByTreatmentId(id);
    }

    public Treatment findByPrescriptionId(Long id) { return treatmentRepositry.findByPrescriptionId(id); }

    public List<Treatment> findByDoctorIdAndType(Long id, TreatmentType treatmentType){
        return treatmentRepositry.findByDoctorIdAndType(id, treatmentType);
    }

    public List<Treatment> findByUserIdAndType(Long id, TreatmentType treatmentType){
        return treatmentRepositry.findByUserIdAndType(id, treatmentType);
    }

    public List<Treatment> findByDoctorId(Long id){
        return treatmentRepositry.findByDoctorId(id);
    }

    public List<Treatment> findByUserId(Long id){
        return treatmentRepositry.findByUserId(id);
    }


    @Transactional
    public Long registerTreatment(TreatmentPostReq treatmentPostReq) {
        Doctor doctor = doctorRepository.findById(treatmentPostReq.getDoctorId());
        User user = userRepository.findById(treatmentPostReq.getUserId()).get();
        Hospital hospital = hospitalRepository.findById(treatmentPostReq.getHospitalId());
        Long treatmentId = treatmentRepositry.registerTreatment(treatmentPostReq, doctor, user, hospital);
        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        String content = treatmentId + "번 [" + hospital.getName() + "-" + doctor.getName() + "] ";

        // 유저 알람 생성
        Long user_id = treatmentPostReq.getUserId();
        NoticePostReq noticeUserInfo = new NoticePostReq();
        noticeUserInfo.setAccountId(user_id);
        noticeUserInfo.setContent(content + "예약 접수중입니다. 결제를 진행해 주세요.");
        noticeUserInfo.setUrl("https://"); // 결제 페이지
        noticeUserInfo.setType(NoticeType.PAYMENT);
        noticeUserInfo.setIsChecked(false);
        noticeUserInfo.setTreatmentId(treatmentId);
        noticeUserInfo.setNoticeDate(LocalDateTime.now());
        noticeRepository.registerNotice(noticeUserInfo, user, treatment);

        return treatmentId;
    }

    @Transactional
    public Treatment updateTreatment(Long id, TreatmentType type){
        Long user_id = treatmentRepositry.findByTreatmentId(id).getUser().getId();

        NoticePostReq noticeUserInfo = new NoticePostReq();
        noticeUserInfo.setIsChecked(false);
        noticeUserInfo.setNoticeDate(LocalDateTime.now());
        noticeUserInfo.setAccountId(user_id);

        String hospitalName = treatmentRepositry.findByTreatmentId(id).getHospital().getName();
        String doctorName = treatmentRepositry.findByTreatmentId(id).getDoctor().getName();
        String content = id + "번 [" + hospitalName + "-" + doctorName + "] ";

        if(type.equals(TreatmentType.RES_PAID) || type.equals(TreatmentType.VST_PAID)){ // 결제
            noticeUserInfo.setContent(content + "결제가 완료되었습니다.");
            noticeUserInfo.setUrl("https://");
            noticeRepository.registerNotice(noticeUserInfo, treatmentRepositry.findByTreatmentId(id).getUser(), null);

            // 의사에게 알림
            NoticePostReq noticeDoctorInfo = new NoticePostReq();
            noticeDoctorInfo.setIsChecked(false);
            noticeDoctorInfo.setNoticeDate(LocalDateTime.now());
            noticeDoctorInfo.setAccountId(user_id);
            noticeDoctorInfo.setContent(id + "번 - 승인이 필요한 예약이 있습니다.");
            noticeDoctorInfo.setUrl("https://");
            noticeRepository.registerNotice(noticeDoctorInfo, treatmentRepositry.findByTreatmentId(id).getDoctor(),null);
        }
        else if(type.equals(TreatmentType.RES_CANCEL) || type.equals(TreatmentType.VST_CANCEL)){ // 예약 취소
            noticeUserInfo.setContent(content + "예약이 취소되었습니다.");
            noticeUserInfo.setUrl("https://");
            noticeRepository.registerNotice(noticeUserInfo, treatmentRepositry.findByTreatmentId(id).getUser(), null);
        }
        else if(type.equals(TreatmentType.RES_REJECT) || type.equals(TreatmentType.VST_REJECT)){ // 예약 거절
            noticeUserInfo.setContent(content + "예약이 거절되었습니다.");
            noticeUserInfo.setUrl("https://");
            noticeRepository.registerNotice(noticeUserInfo, treatmentRepositry.findByTreatmentId(id).getUser(), null);
        }
        else if(type.equals(TreatmentType.RES_ACCEPTED)){ // 예약 승인
            noticeRepository.updateNotice(noticeRepository.findBytreatmentId(id).getId(), NoticeType.RESERVATION );
        }
        else if(type.equals(TreatmentType.RES_ACCEPTED_CANCEL) || type.equals(TreatmentType.VST_ACCEPTED_CANCEL)){ // 예약승인 취소
            noticeUserInfo.setContent(content + "예약승인이 취소되었습니다.");
            noticeUserInfo.setUrl("https://");
            noticeRepository.registerNotice(noticeUserInfo, treatmentRepositry.findByTreatmentId(id).getUser(), null);
        }

        return treatmentRepositry.updateTreatment(id, type);
    }

    @Transactional
    public Treatment updatePaymentInfo(Long treatmentId, PaymentReq paymentReq) {
        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        treatment.updatePaymentInfo(paymentReq.getPaymentCode(), paymentReq.getPrice());
        return treatment;
    }
}

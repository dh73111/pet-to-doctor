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

    public List<Treatment> findByDoctorId(Long id, TreatmentType treatmentType){
        return treatmentRepositry.findByDoctorId(id, treatmentType);
    }

    public List<Treatment> findByUserId(Long id, TreatmentType treatmentType){
        return treatmentRepositry.findByUserId(id, treatmentType);
    }

    @Transactional
    public Long registerTreatment(TreatmentPostReq treatmentPostReq) {
        Doctor doctor = doctorRepository.findById(treatmentPostReq.getDoctorId());
        User user = userRepository.findById(treatmentPostReq.getUserId()).get();
        Hospital hospital = hospitalRepository.findById(treatmentPostReq.getHospitalId());

        // 유저 알람 생성
        Long user_id = treatmentPostReq.getUserId();
        NoticePostReq noticeUserInfo = new NoticePostReq();
        noticeUserInfo.setAccountId(user_id);
        noticeUserInfo.setContent("예약 접수중입니다. 결제를 진행해 주세요.");
        noticeUserInfo.setUrl("https://"); // 결제 페이지..?
        noticeUserInfo.setType(NoticeType.PAYMENT);
        noticeUserInfo.setIsChecked(false);
        noticeRepository.registerNotice(noticeUserInfo, doctor);

        // 의사 알람 생성 - 결제가 되었을때 생성돼야 하나??
        Long doctor_id = treatmentPostReq.getDoctorId();
        NoticePostReq noticeDoctorInfo = new NoticePostReq();
        noticeDoctorInfo.setAccountId(doctor_id);
        noticeDoctorInfo.setContent("예약 접수중... 곧 예약이 들어올지도?");
        noticeDoctorInfo.setUrl("https://"); // 예약 확인페이지..?
        noticeDoctorInfo.setType(NoticeType.PAYMENT);
        noticeDoctorInfo.setIsChecked(false);
        noticeRepository.registerNotice(noticeDoctorInfo, doctor);

        return treatmentRepositry.registerTreatment(treatmentPostReq, doctor, user, hospital);
    }

    @Transactional
    public Treatment updateTreatment(Long id, TreatmentType type){
        return treatmentRepositry.updateTreatment(id, type);
    }

    @Transactional
    public Treatment updatePaymentInfo(Long treatmentId, PaymentReq paymentReq) {
        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        treatment.updatePaymentInfo(paymentReq.getPaymentCode(), paymentReq.getPrice());
        return treatment;
    }
}

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
import com.ssafy.pettodoctor.common.util.CancleRequestUtil;
import com.ssafy.pettodoctor.common.util.CheckTaskUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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
//    private final ExecutorServiceUtil executorServiceUtil;
    private final CheckTaskUtil checkTaskUtil;
    ExecutorService executorService = Executors.newCachedThreadPool();

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
//        Long user_id = treatmentPostReq.getUserId();
//        NoticePostReq noticeUserInfo = new NoticePostReq();
//        noticeUserInfo.setAccountId(user_id);
//        noticeUserInfo.setContent(content + "예약 접수중입니다. 결제를 진행해 주세요.");
//        noticeUserInfo.setUrl("https://"); // 결제 페이지
//        noticeUserInfo.setType(NoticeType.PAYMENT);
//        noticeUserInfo.setIsChecked(false);
//        noticeUserInfo.setTreatmentId(treatmentId);
//        noticeUserInfo.setNoticeDate(LocalDateTime.now());
//        noticeRepository.registerNotice(noticeUserInfo, user, treatment);

        // 유저 알람 생성
        Notice notice = Notice.createNotice2(user, treatment, NoticeType.PAYMENT
                , content + "예약 접수중입니다. 결제를 진행해 주세요.");
        noticeRepository.save(notice);


        // 자동 취소 등록
        executorService.submit(checkTaskUtil.new CheckTask(treatmentId, TreatmentType.RES_REQUEST));

        return treatmentId;
    }

    // 수정 필요
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

//        if(type.equals(TreatmentType.RES_PAID) || type.equals(TreatmentType.VST_PAID)){ // 결제
//            noticeUserInfo.setContent(content + "결제가 완료되었습니다.");
//            noticeUserInfo.setUrl("https://");
//            noticeRepository.registerNotice(noticeUserInfo, treatmentRepositry.findByTreatmentId(id).getUser(), null);
//
//            // 의사에게 알림
//            NoticePostReq noticeDoctorInfo = new NoticePostReq();
//            noticeDoctorInfo.setIsChecked(false);
//            noticeDoctorInfo.setNoticeDate(LocalDateTime.now());
//            noticeDoctorInfo.setAccountId(user_id);
//            noticeDoctorInfo.setContent(id + "번 - 승인이 필요한 예약이 있습니다.");
//            noticeDoctorInfo.setUrl("https://");
//            noticeRepository.registerNotice(noticeDoctorInfo, treatmentRepositry.findByTreatmentId(id).getDoctor(),null);
//        }
//        else if(type.equals(TreatmentType.RES_CANCEL) || type.equals(TreatmentType.VST_CANCEL)){ // 예약 취소
//            noticeUserInfo.setContent(content + "예약이 취소되었습니다.");
//            noticeUserInfo.setUrl("https://");
//            noticeRepository.registerNotice(noticeUserInfo, treatmentRepositry.findByTreatmentId(id).getUser(), null);
//        }
//        else if(type.equals(TreatmentType.RES_REJECT) || type.equals(TreatmentType.VST_REJECT)){ // 예약 거절
//            noticeUserInfo.setContent(content + "예약이 거절되었습니다.");
//            noticeUserInfo.setUrl("https://");
//            noticeRepository.registerNotice(noticeUserInfo, treatmentRepositry.findByTreatmentId(id).getUser(), null);
//        }
//        else if(type.equals(TreatmentType.RES_ACCEPTED)){ // 예약 승인
//            noticeRepository.updateNotice(noticeRepository.findBytreatmentId(id).getId(), NoticeType.RESERVATION );
//        }
//        else if(type.equals(TreatmentType.RES_ACCEPTED_CANCEL) || type.equals(TreatmentType.VST_ACCEPTED_CANCEL)){ // 예약승인 취소
//            noticeUserInfo.setContent(content + "예약승인이 취소되었습니다.");
//            noticeUserInfo.setUrl("https://");
//            noticeRepository.registerNotice(noticeUserInfo, treatmentRepositry.findByTreatmentId(id).getUser(), null);
//        }

        return treatmentRepositry.updateTreatment(id, type);
    }

    // 결제 등록
    // 수정 필요
    @Transactional
    public Treatment updatePaymentInfo(Long treatmentId, PaymentReq paymentReq) throws Exception {

        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);

        if(!treatment.getType().equals(TreatmentType.RES_REQUEST)
        && !treatment.getType().equals(TreatmentType.VST_REQUEST))
            throw new Exception("잘못된 접근 입니다.");

        treatment.updatePaymentInfo(paymentReq.getPaymentCode(), paymentReq.getPrice());

        // 자동 취소 등록
        if(treatment.getType().equals(TreatmentType.RES_PAID))
            executorService.submit(checkTaskUtil.new CheckTask(treatmentId, TreatmentType.RES_PAID));
        else if(treatment.getType().equals(TreatmentType.VST_PAID))
            executorService.submit(checkTaskUtil.new CheckTask(treatmentId, TreatmentType.VST_PAID));
        // 의사에게 알림 필요
        Notice notice = Notice.createNotice2(treatment.getDoctor(), treatment, NoticeType.PAYMENT
                , treatment.getId() + "번 - 승인이 필요한 예약이 있습니다.");
        noticeRepository.save(notice);
        return treatment;
    }

    // 취소
    @Transactional
    public Treatment cancleTreatment(Long treatmentId, String reason) throws Exception{
        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        if(treatment.getType().equals(TreatmentType.RES_PAID)
                || treatment.equals(TreatmentType.RES_CONFIRMED)
                || treatment.getType().equals(TreatmentType.VST_PAID)
                || treatment.equals(TreatmentType.VST_CONFIRMED)) {
            // access-token 발급
            String accessToken = CancleRequestUtil.getAccessToken2();
            // 결제 취소 요청 보내기
            String mId = treatment.getPaymentCode();
            Integer amount = treatment.getPrice();
            CancleRequestUtil.passCancleRequest(accessToken, mId, reason, amount);
            System.out.println("send cancel request to imaport");
        }

        // 상태 Cancel 로 변경
        if(treatment.equals(TreatmentType.RES_REQUEST)
            || treatment.equals(TreatmentType.RES_PAID)
            || treatment.equals(TreatmentType.RES_CONFIRMED))
            treatment.setType(TreatmentType.RES_CANCEL);
        else if(!treatment.equals(TreatmentType.RES_COMPLETE)
                && !treatment.equals(TreatmentType.VST_COMPLETE))
            treatment.setType(TreatmentType.VST_CANCEL);
        else
            throw new Exception("잘못된 접근입니다.");

        // 유저 알람 생성
        Notice notice1 = Notice.createNotice2(treatment.getUser(), treatment, NoticeType.PAYMENT
                , treatment.getId() + "번 - 예약이 취소 돼었습니다.");
        noticeRepository.save(notice1);
        // 의사에게 알림 필요
        Notice notice2 = Notice.createNotice2(treatment.getDoctor(), treatment, NoticeType.PAYMENT
                , treatment.getId() + "번 - 예약이 취소 돼었습니다.");
        noticeRepository.save(notice2);

        return treatment;
    }

    // confirm
    @Transactional
    public Treatment updateConfirm(Long treatmentId) throws Exception{

        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        if(treatment.getType().equals(TreatmentType.RES_PAID))
        {
            treatment.setType(TreatmentType.RES_CONFIRMED);
        } else if(treatment.getType().equals(TreatmentType.VST_PAID)){
            treatment.setType(TreatmentType.VST_CONFIRMED);
        }
        else
            throw new Exception("잘못된 접근입니다.");

        // 유저 알람 생성
        Notice notice1 = Notice.createNotice2(treatment.getUser(), treatment, NoticeType.PAYMENT
                , treatment.getId() + "번 - 예약이 수락 돼었습니다.");
        noticeRepository.save(notice1);

        return treatment;
    }

    // complete
    @Transactional
    public Treatment updateComplete(Long treatmentId) throws Exception{

        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        if(treatment.getType().equals(TreatmentType.RES_CONFIRMED))
        {
            treatment.setType(TreatmentType.RES_COMPLETE);
        } else if(treatment.getType().equals(TreatmentType.VST_CONFIRMED)){
            treatment.setType(TreatmentType.VST_COMPLETE);
        }
        else
            throw new Exception("잘못된 접근입니다.");

        // 유저 알람 생성
        Notice notice1 = Notice.createNotice2(treatment.getUser(), treatment, NoticeType.PAYMENT
                , treatment.getId() + "번 - 예약이 완료 돼었습니다.");
        noticeRepository.save(notice1);
        // 의사에게 알림 필요
        Notice notice2 = Notice.createNotice2(treatment.getDoctor(), treatment, NoticeType.PAYMENT
                , treatment.getId() + "번 - 예약이 완료 돼었습니다.");
        noticeRepository.save(notice2);

        return treatment;
    }
}

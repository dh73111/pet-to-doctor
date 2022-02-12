package com.ssafy.pettodoctor.api.service;

import com.ssafy.pettodoctor.api.domain.*;
import com.ssafy.pettodoctor.api.repository.*;
import com.ssafy.pettodoctor.api.request.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PrescriptionService {
    private final PrescriptionRepository prescriptionRepository;
    private final TreatmentRepositry treatmentRepositry;
    private final MedicineRepository medicineRepository;
    private final NoticeRepository noticeRepository;

    public List<Prescription> findByIdList(Long doctor_id, TreatmentType type) {
        return prescriptionRepository.findByIdList(doctor_id, type);
    }

    @Transactional
    public void writeCertificate(PrescriptionPostReq prescriptionPostReq, Long treatmentId){
        Prescription prescription = Prescription.createPrescription(
                prescriptionPostReq.getAdministration(),
                prescriptionPostReq.getDiagnosis(),
                prescriptionPostReq.getOpinion(),
                prescriptionPostReq.getType(),
                prescriptionPostReq.getMedicineCost(),
                prescriptionPostReq.getAdditionalCost(),
                prescriptionPostReq.getIsShipping()
        );

        medicineRepository.saveMedicines(prescription, prescriptionPostReq.getMedicines());

        prescriptionRepository.save(prescription);

        Treatment treatment = treatmentRepositry.findByTreatmentId(treatmentId);
        treatment.setPrescription(prescription);

        // 처방전 등록하면 해당 알림 type 변경
        noticeRepository.updateNotice(noticeRepository.findBytreatmentId(treatmentId).getId(), NoticeType.DELIVERY);
    }

    @Transactional
    public Optional<Prescription> updateCertificate(Long prescription_id, PrescriptionPostReq certificateInfo){
        Optional<Prescription> updatePrescription= Optional.ofNullable(prescriptionRepository.findById(prescription_id));

        updatePrescription.ifPresent(selectPrescription -> {
            selectPrescription.setIsShipping(certificateInfo.getIsShipping());
            selectPrescription.setInvoiceCode(certificateInfo.getInvoiceCode());
            selectPrescription.setPaymentCode(certificateInfo.getPaymentCode());
            selectPrescription.setShippingAddress(certificateInfo.getAddress());
            selectPrescription.setShippingName(certificateInfo.getShippingName());
            selectPrescription.setShippingTel(certificateInfo.getShippingTel());

            prescriptionRepository.save(selectPrescription);
        });
        return updatePrescription;
    }

    public Prescription findById(Long id) {return prescriptionRepository.findById(id); }

    @Transactional
    public Prescription updateShippingInfo(Long prescriptionId, ShippingReq shippingReq){
        Prescription prescription = prescriptionRepository.findById(prescriptionId);
        prescription.updateShippingInfo(shippingReq.getInvoiceCode(), shippingReq.getAddress(), shippingReq.getShippingName(),
                shippingReq.getShippingTel(), shippingReq.getShippingCost());

        // 운송장을 등록하면 해당 알림 type 변경
        noticeRepository.updateNotice(noticeRepository.findBytreatmentId(treatmentRepositry.findByPrescriptionId(prescriptionId).getId()).getId(), NoticeType.NOTIFICATION);
        return prescription;
    }

    @Transactional
    public Prescription updatePaymentInfo(Long prescriptionId, PaymentType paymentType) {

        if(paymentType.equals(PaymentType.COMPLETE)){ // 처방전 결제가 됐다면
            // 의사에게 알림
            NoticePostReq noticeInfo = new NoticePostReq();
            noticeInfo.setAccountId(treatmentRepositry.findByPrescriptionId(prescriptionId).getDoctor().getId());
            noticeInfo.setContent("배송이 필요한 처방이 있습니다. 운송장 번호를 등록해주세요.");
            noticeInfo.setUrl("https://"); // 운송장 등록하는 사이트
            noticeInfo.setIsChecked(false);
            noticeInfo.setNoticeDate(LocalDateTime.now());
            noticeRepository.registerNotice(noticeInfo, treatmentRepositry.findByPrescriptionId(prescriptionId).getDoctor(), null);
        }

        return prescriptionRepository.updatePaymentInfo(prescriptionId, paymentType);
    }
}

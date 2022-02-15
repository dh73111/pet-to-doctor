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

    public List<Prescription> findByDoctorIdAndType(Long doctor_id, TreatmentType type) {
        return prescriptionRepository.findByDoctorIdAndType(doctor_id, type);
    }

    public List<Prescription> findByDoctorId(Long doctor_id) {
        return prescriptionRepository.findByDoctorId(doctor_id);
    }

    @Transactional
    public void writeCertificate(PrescriptionPostReq prescriptionPostReq, Long treatmentId){
        Prescription prescription = Prescription.createPrescription(
                prescriptionPostReq.getAdministration(),
                prescriptionPostReq.getDiagnosis(),
                prescriptionPostReq.getOpinion(),
                prescriptionPostReq.getMedicineCost(),
                prescriptionPostReq.getAdditionalCost()
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
            selectPrescription.setShippingAddress(certificateInfo.getAddress());
            selectPrescription.setShippingName(certificateInfo.getShippingName());
            selectPrescription.setShippingTel(certificateInfo.getShippingTel());

            prescriptionRepository.save(selectPrescription);
        });
        return updatePrescription;
    }

    public Prescription findById(Long id) {return prescriptionRepository.findById(id); }

    @Transactional
    public Prescription updateShippingInfo(Long prescriptionId, String invoiceCode){

        Prescription prescription = prescriptionRepository.findById(prescriptionId);
        prescription.updateShippingInfo(invoiceCode);

        // 운송장을 등록하면 해당 알림 type 변경
        noticeRepository.updateNotice(noticeRepository.findBytreatmentId(treatmentRepositry.findByPrescriptionId(prescriptionId).getId()).getId(), NoticeType.DELIVERY);
        return prescription;
    }

    @Transactional
    public Prescription updatePaymentInfo(Long prescriptionId, ShippingReq shippingReq) throws Exception {

        Long treatmentId = treatmentRepositry.findByPrescriptionId(prescriptionId).getId();
        Long doctorId = treatmentRepositry.findByPrescriptionId(prescriptionId).getDoctor().getId();
        Prescription prescription = prescriptionRepository.findById(prescriptionId);

        if(!prescription.getType().equals(PaymentType.UNCOMPLETE)) throw new Exception("잘못된 접근입니다.");

        prescription.updatePaymentInfo(shippingReq);

        if(prescription.getType().equals(PaymentType.COMPLETE)){ // 처방전 결제가 됐다면
            // 의사에게 알림
            NoticePostReq noticeInfo = new NoticePostReq();
            noticeInfo.setAccountId(doctorId);
            noticeInfo.setContent(treatmentId + "번 - 배송이 필요한 처방이 있습니다. 운송장 번호를 등록해주세요.");
            noticeInfo.setUrl("https://"); // 운송장 등록하는 사이트
            noticeInfo.setIsChecked(false);
            noticeInfo.setNoticeDate(LocalDateTime.now());
            noticeRepository.registerNotice(noticeInfo, treatmentRepositry.findByPrescriptionId(prescriptionId).getDoctor(), null);
        }

        return prescription;
    }
}


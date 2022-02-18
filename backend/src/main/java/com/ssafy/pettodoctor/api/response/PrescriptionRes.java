package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Address;
import com.ssafy.pettodoctor.api.domain.PaymentType;
import com.ssafy.pettodoctor.api.domain.Prescription;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class PrescriptionRes {
    private Long id;

    private String administration;
    private String diagnosis;
    private String opinion;
    private Integer medicineCost;
    private Integer additionalCost;
    private PaymentType type;
    private Boolean isShipping;
    private String invoiceCode;
    private String paymentCode;
    private Address shippingAddress;
    private String shippingName;
    private String shippingTel;
    private Integer shippingCost;

    // 배송 정보 없는 경우
    public PrescriptionRes(Long id, String administration, String diagnosis, String opinion,
                           PaymentType type, Boolean isShipping, String invoiceCode, String paymentCode,
                           Address shippingAddress, String shippingName, String shippingTel,
                           Integer additionalCost, Integer medicineCost, Integer shippingCost) {
        this.id = id;
        this.administration = administration;
        this.diagnosis = diagnosis;
        this.opinion = opinion;
        this.type = type;
        this.isShipping = isShipping;
        this.invoiceCode = invoiceCode;
        this.paymentCode = paymentCode;
        this.shippingAddress = shippingAddress;
        this.shippingName = shippingName;
        this.shippingTel = shippingTel;
        this.additionalCost = additionalCost;
        this.medicineCost = medicineCost;
        this.shippingCost = shippingCost;
    }

    public static PrescriptionRes convertToRes(Prescription p) {
        PrescriptionRes pr = new PrescriptionRes(p.getId(), p.getAdministration()
        , p.getDiagnosis(), p.getOpinion(), p.getType(), p.getIsShipping(), p.getInvoiceCode()
        , p.getPaymentCode(), p.getShippingAddress(), p.getShippingName(), p.getShippingTel()
        , p.getAdditionalCost(), p.getMedicineCost(), p.getShippingCost());

        return pr;
    }

    public static List<PrescriptionRes> convertToResList(List<Prescription> prescriptions) {
        List<PrescriptionRes> result = new ArrayList<>();
        for(Prescription p : prescriptions){
            result.add(convertToRes(p));
        }
        return result;
    }
}

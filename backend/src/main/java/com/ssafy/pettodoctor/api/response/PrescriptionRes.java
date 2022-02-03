package com.ssafy.pettodoctor.api.response;

import com.ssafy.pettodoctor.api.domain.Address;
import com.ssafy.pettodoctor.api.domain.PaymentType;
import com.ssafy.pettodoctor.api.domain.Prescription;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PrescriptionRes {
    private Long id;

    private String administration;
    private String medicine;
    private String diagnosis;
    private String opinion;
    private Integer price;
    private PaymentType type;
    private Boolean isShipping;
    private String invoiceCode;
    private String paymentCode;
    private Address shippingAddress;
    private String shippingName;
    private String shippingTel;

    public PrescriptionRes(Long id, String administration, String medicine, String diagnosis, String opinion, Integer price, PaymentType type, Boolean isShipping, String invoiceCode, String paymentCode, Address shippingAddress, String shippingName, String shippingTel) {
        this.id = id;
        this.administration = administration;
        this.medicine = medicine;
        this.diagnosis = diagnosis;
        this.opinion = opinion;
        this.price = price;
        this.type = type;
        this.isShipping = isShipping;
        this.invoiceCode = invoiceCode;
        this.paymentCode = paymentCode;
        this.shippingAddress = shippingAddress;
        this.shippingName = shippingName;
        this.shippingTel = shippingTel;
    }

    public static PrescriptionRes converToRes(Prescription p){
        PrescriptionRes pr = new PrescriptionRes(p.getId(), p.getAdministration(), p.getMedicine()
        , p.getDiagnosis(), p.getOpinion(), p.getPrice(), p.getType(), p.getIsShipping(), p.getInvoiceCode()
        , p.getPaymentCode(), p.getShippingAddress(), p.getShippingName(), p.getShippingTel());

        return pr;
    }
}

package com.ssafy.pettodoctor.common.util;

import com.ssafy.pettodoctor.api.domain.Treatment;
import com.ssafy.pettodoctor.api.domain.TreatmentType;
import com.ssafy.pettodoctor.api.service.PaymentService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

@Getter
@Setter
@Component
@RequiredArgsConstructor
public class CheckTaskUtil {
    private final PaymentService paymentService;

    public class CheckTask implements Callable<String>{
        private Long treatmentId;
        private TreatmentType treatmentType;
        public CheckTask(){};

        public CheckTask(Long treatmentId, TreatmentType treatmentType) {
            this.treatmentId = treatmentId;
            this.treatmentType = treatmentType;
        }

        @Override
        public String call() throws Exception {
            System.out.println("체크 테스크 시작");
             TimeUnit.MINUTES.sleep(3);
//            TimeUnit.MILLISECONDS.sleep(5000);

            Treatment treatment = paymentService.findById(this.treatmentId);
            // 여전히 결제 or 컨펌이 안된 경우
        if(treatment.getType().equals(this.treatmentType)) {
            paymentService.cancleTreatment(this.treatmentId, "컨펌 지연 시간 초과");
        }
            System.out.println("체크 테스크 종료");

            return "성공";
        }
    }

}

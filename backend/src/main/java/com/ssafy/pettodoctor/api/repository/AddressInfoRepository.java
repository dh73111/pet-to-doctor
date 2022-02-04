package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.AddressInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AddressInfoRepository {
    private final EntityManager em;

    public List<AddressInfo> findByAddress(String address){
        return em.createQuery("select ai from AddressInfo ai where ai.address like concat('%',:address,'%')"
                        , AddressInfo.class)
                .setParameter("address", address)
                .getResultList();
    }

}

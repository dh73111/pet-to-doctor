package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.domain.UserCertification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserCertificationRepository {
    private final EntityManager em;

    public void save(UserCertification uc) {
        em.persist(uc);
    }

    public Optional<User> certificate(String CertificationKey) {
        UserCertification certKey = em.createQuery("select uc from UserCertification uc where uc.certificationKey = :certKey", UserCertification.class)
                .setParameter("certKey", CertificationKey)
                .getSingleResult();
        User user = certKey.getUser();
        return Optional.ofNullable(user);
    }
}

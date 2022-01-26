package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final EntityManager em;

    // 회원 저장
    public void save(User user) {
        em.persist(user);
    }

    // 회원 중복 확인
    public Boolean isDuplicated(User user) {
        try {
            em.createQuery("select u from User u where u.email = :email")
                    .setParameter("email", user.getEmail())
                    .getSingleResult();
        } catch (NoResultException e) {
            return false;
        }

        return true;
    }

}

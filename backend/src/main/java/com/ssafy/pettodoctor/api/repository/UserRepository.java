package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.domain.UserCertification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.sql.Array;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final EntityManager em;

    // 회원 저장
    public void save(User user) {
        em.persist(user);
    }

    // 이메일로 유저 찾기
    public User findByEmail(String email) {
        try {
            return em.createQuery("select u from User u where u.email = :email", User.class)
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    // Id로 유저 찾기
    public Optional<User> findById(Long id) {
        User findUser =  em.find(User.class, id);
        return Optional.ofNullable(findUser);
    }

    public void delete(User user) {
        em.createQuery("delete from UserCertification uc where uc.user.id =:userId")
                        .setParameter("userId", user.getId()).executeUpdate();
        em.remove(user);
    }

    public List<Long> findUserIdOfExpiredUsers(int expireDays) {
        LocalDate today = LocalDate.now();
        LocalDate minus30 = today.minusDays(expireDays);

        List<Long> expiredUserIds = em.createQuery("select u.id from User u where u.isCertificated=FALSE and u.joinDate < :minus")
                .setParameter("minus", minus30)
                .getResultList();
        return expiredUserIds;
    }
}

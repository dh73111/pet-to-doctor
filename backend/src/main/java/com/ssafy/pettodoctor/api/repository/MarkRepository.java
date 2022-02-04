package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Mark;
import com.ssafy.pettodoctor.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MarkRepository {

    private final EntityManager em;

    public Mark save(Mark mark) {   // 똑같은 회원, 의사로 중복 저장 안 되게 하는 로직 필요
        em.persist(mark);
        return mark;
    }

    public Optional<Mark> findById(Long markId) {
        Mark findMark = em.createQuery("select m from Mark m join fetch m.user, m.hospital where m.id = :markId", Mark.class)
                .setParameter("markId", markId)
                .getSingleResult();
        return Optional.ofNullable(findMark);
    }

    public List<Mark> findByUserId(Long userId) {

        return em.createQuery("select m from Mark m join fetch m.user u join fetch m.hospital where u.id = :userId", Mark.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    public void deleteById(User user, Long markId) {
        Mark findMark = em.createQuery("select m from Mark m join fetch m.user where m.id = :markId", Mark.class)
                .setParameter("markId", markId)
                .getSingleResult();
        if (findMark.getUser() == user)
            em.remove(findMark);
    }



}

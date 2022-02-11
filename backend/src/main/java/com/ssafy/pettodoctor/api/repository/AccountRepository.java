package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

@Repository
@RequiredArgsConstructor
public class AccountRepository {
    private final EntityManager em;

    public Account findByEmail(String email){
        try {
            return em.createQuery("select a from Account a where a.email = :email", Account.class)
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public Account findById(Long id){
        return em.find(Account.class, id);
    }

    public void deleteById(Long id){
        em.createQuery("delete from Account a where a.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

}

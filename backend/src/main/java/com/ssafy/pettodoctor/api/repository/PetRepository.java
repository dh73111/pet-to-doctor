package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PetRepository {
    private final EntityManager em;

    public void save(Pet pet){
        if(pet.getId() == null)
            em.persist(pet);
        else {
            em.merge(pet);
        }
    }

    public List<Pet> findByUser(Long userId) {
        return em.createQuery("select p from Pet p join fetch User u where u.id = :userId")
                .setParameter("userId", userId)
                .getResultList();
    }

    public Pet findOne(Long id) {
        return em.find(Pet.class, id);
    }
}

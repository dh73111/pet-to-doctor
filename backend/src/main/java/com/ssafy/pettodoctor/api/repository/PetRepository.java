package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Pet;
import com.ssafy.pettodoctor.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PetRepository {
    private final EntityManager em;

    public Pet save(Pet pet){
        em.persist(pet);
        return pet;
    }

    public List<Pet> findByUserId(Long userId) {
        return em.createQuery("select p from Pet p join fetch p.user u where u.id = :userId", Pet.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    public Optional<Pet> findOne(Long id) {
        Pet findPet = em.find(Pet.class, id);
        return Optional.ofNullable(findPet);
    }

    public void delete(User user, Long id) {
        Pet findPet = em.find(Pet.class, id);
        if (findPet.getUser() == user)
            em.remove(findPet);
    }

    public void deleteAllPetsOfUser(Long userId) {
        em.createQuery("delete from Pet p where p.user.id = :userId")
                .setParameter("userId", userId)
                .executeUpdate();
    }
}

package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.Mark;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class MarkRepository {

    private final EntityManager em;

    public void save(Mark mark) {
        if(mark.getId() == null)
            em.persist(mark);
        else {
            em.merge(mark);
        }
    }


}

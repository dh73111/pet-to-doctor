package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.TestTable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TestTableRepository {

    private final EntityManager em;

    public Long save(TestTable t){
        em.persist(t);
        return t.getId();
    }

    public TestTable findOne(Long id){
        return em.find(TestTable.class, id);
    }

    public List<TestTable> findAll() {
        return em.createQuery("select t from TestTable t", TestTable.class)
                .getResultList();
    }
}

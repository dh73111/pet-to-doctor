package com.ssafy.pettodoctor.api.repository;

import com.ssafy.pettodoctor.api.domain.TestTable;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TestTableRepositoryTest {
    @Autowired TestTableRepository testTableRepository;

    @Test
    @Transactional
    @Rollback(value = false)
    public void testTable() throws Exception {
        // given
        TestTable t1 = new TestTable();
        TestTable t2 = new TestTable();
        t1.setName("AA");
        t2.setName("BB");
        // when
        Long id1 = testTableRepository.save(t1);
        Long id2 = testTableRepository.save(t2);

        TestTable ft1 = testTableRepository.findOne(id1);
        TestTable ft2 = testTableRepository.findOne(id2);

        // then
        Assertions.assertThat(ft1.getId()).isEqualTo(t1.getId());
        Assertions.assertThat(ft2.getId()).isEqualTo(t2.getId());

    }
}
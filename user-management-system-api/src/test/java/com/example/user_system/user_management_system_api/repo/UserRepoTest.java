package com.example.user_system.user_management_system_api.repo;

import com.example.user_system.user_management_system_api.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.UUID;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class UserRepoTest {

    @Autowired
    private UserRepo userRepo;

    @Test
    void searchAllUsers() {
        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .name("Hasitha")
                .email("hasitha@gmail.com")
                .mobile("0762545632")
                .password("1234")
                .createdAt(LocalDateTime.now())
                .build();

        userRepo.save(user);
        userRepo.flush();

        Page<User> users = userRepo.searchAllUsers("Hasitha", PageRequest.of(0, 10));

        Assertions.assertEquals(1, users.getTotalElements());

    }

    @Test
    void countAllUsers() {
        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .name("Hasitha")
                .email("hasitha@gmail.com")
                .mobile("0762545632")
                .password("1234")
                .createdAt(LocalDateTime.now())
                .build();

        userRepo.save(user);
        userRepo.flush();

        long count = userRepo.countAllUsers("Hasitha");
        Assertions.assertEquals(1, count);
    }

}

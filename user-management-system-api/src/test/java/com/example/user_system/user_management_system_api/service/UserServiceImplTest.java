package com.example.user_system.user_management_system_api.service;

import com.example.user_system.user_management_system_api.dto.request.UserRequestDto;
import com.example.user_system.user_management_system_api.dto.response.UserResponseDto;
import com.example.user_system.user_management_system_api.entity.User;
import com.example.user_system.user_management_system_api.repo.UserRepo;
import com.example.user_system.user_management_system_api.util.PasswordManager;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.web.servlet.support.WebContentGenerator;


import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
public class UserServiceImplTest {

    @MockitoBean
    private UserRepo userRepo;

    @Autowired
    private UserService userService;
    @Autowired
    private WebContentGenerator webContentGenerator;

    @Test
    void createUser(){
        UserRequestDto dto = UserRequestDto.builder()
                .name("Hasitha")
                .email("hasitha@gmail.com")
                .mobile("0762545632")
                .password("1234")
                .build();

        userService.create(dto);

        Mockito.verify(userRepo,Mockito.times(1)).save(any(User.class));

    }

    @Test
    void findUserById() throws Exception{
        User user = User.builder()
                .id("1")
                .name("Hasitha")
                .email("hasitha@gmail.com")
                .mobile("0762545632")
                .password("1234")
                .createdAt(LocalDateTime.now())
                .build();

        Mockito.when(userRepo.findById("1")).thenReturn(Optional.of(user));

        UserResponseDto responseDto = userService.findById("1");

        Assertions.assertEquals("Hasitha",responseDto.getName());
        Assertions.assertEquals("hasitha@gmail.com",responseDto.getEmail());

    }

    @Test
    void deleteUserById() throws Exception{
        User user = User.builder().id("1").build();

        Mockito.when(userRepo.findById("1")).thenReturn(Optional.of(user));
        userService.delete("1");

        Mockito.verify(userRepo).deleteById("1");

    }


}

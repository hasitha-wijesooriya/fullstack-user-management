package com.example.user_system.user_management_system_api.controller;

import com.example.user_system.user_management_system_api.dto.request.UserRequestDto;
import com.example.user_system.user_management_system_api.dto.response.UserResponseDto;
import com.example.user_system.user_management_system_api.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @Test
    void createUser_Api() throws Exception {

        UserRequestDto dto = UserRequestDto.builder()
                .name("Hasitha")
                .email("hasitha@gmail.com")
                .mobile("0762545632")
                .password("1234")
                .build();

        UserResponseDto responseDto = UserResponseDto.builder()
                .name("Hasitha")
                .email("hasitha@gmail.com")
                .mobile("0762545632")
                .build();

        Mockito.when(userService.create(any(UserRequestDto.class)))
                .thenReturn(responseDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/user-management/api/v1/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(201))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("User Saved!"))
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    void updateUser_Api() throws Exception {

        String userId = UUID.randomUUID().toString();

        UserRequestDto dto = UserRequestDto.builder()
                .name("Hasitha")
                .email("hasitha@gmail.com")
                .mobile("0762545632")
                .password("1234")
                .build();

        Mockito.doNothing().when(userService).update(any(UserRequestDto.class),eq(userId));

        mockMvc.perform(MockMvcRequestBuilders.put("/user-management/api/v1/user/update/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(201))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("User Updated!"))
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    void deleteUser_Api() throws Exception {

        String userId = UUID.randomUUID().toString();

        Mockito.doNothing().when(userService).delete(eq(userId));

        mockMvc.perform(MockMvcRequestBuilders.delete("/user-management/api/v1/user/delete/{id}", userId))
                .andExpect(status().isNoContent())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(204))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("User Deleted!"))
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    void findByUserId_Api() throws Exception {

        String userId = UUID.randomUUID().toString();

        UserResponseDto dto = UserResponseDto.builder()
                .userId(userId)
                .name("Hasitha")
                .email("hasitha@gmail.com")
                .mobile("0762545632")
                .build();

        Mockito.when(userService.findById(eq(userId))).thenReturn(dto);

        mockMvc.perform(MockMvcRequestBuilders.get("/user-management/api/v1/user/find-by-id/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("User found!"))
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    void findAllUsers_Api() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/user-management/api/v1/user/find-all")
                .param("searchText", "Hasitha")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("User list!"))
                .andDo(MockMvcResultHandlers.print());
    }

}

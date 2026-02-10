package com.example.user_system.user_management_system_api.service.impl;

import com.example.user_system.user_management_system_api.dto.request.UserRequestDto;
import com.example.user_system.user_management_system_api.dto.response.UserResponseDto;
import com.example.user_system.user_management_system_api.dto.response.paginate.UserPaginateResponseDto;
import com.example.user_system.user_management_system_api.entity.User;
import com.example.user_system.user_management_system_api.exceptions.EntryNotFoundException;
import com.example.user_system.user_management_system_api.repo.UserRepo;
import com.example.user_system.user_management_system_api.service.UserService;
import com.example.user_system.user_management_system_api.util.PasswordManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;


    @Override
    public UserResponseDto create(UserRequestDto dto) {
        try{
          User savedUser = userRepo.save(toUser(dto));
          return toUserResponseDto(savedUser);
        }catch (SQLException e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public void update(UserRequestDto dto, String userId) throws SQLException {
        User selectedUser = userRepo.findById(userId).orElseThrow(() -> new EntryNotFoundException("User not found!"));
        selectedUser.setName(dto.getName());
        selectedUser.setEmail(dto.getEmail());
        selectedUser.setMobile(dto.getMobile());
        selectedUser.setPassword(PasswordManager.hash(dto.getPassword()));
        userRepo.save(selectedUser);
    }

    @Override
    public void delete(String userId) {
        userRepo.findById(userId).orElseThrow(() -> new EntryNotFoundException("User not found!"));
        userRepo.deleteById(userId);
    }

    @Override
    public UserResponseDto findById(String userId) throws SQLException {
        User selectedUser = userRepo.findById(userId).orElseThrow(() -> new EntryNotFoundException("User not found!"));
        return toUserResponseDto(selectedUser);
    }

    @Override
    public UserPaginateResponseDto findAll(int page, int size, String searchText) {
        return UserPaginateResponseDto.builder()
                .dataCount(userRepo.countAllUsers(searchText))
                .usersList(
                        userRepo.searchAllUsers(searchText, PageRequest.of(page, size))
                                .stream().map(e -> {
                                    try {
                                        return toUserResponseDto(e);
                                    }catch (SQLException ex) {
                                        throw new RuntimeException(ex);
                                    }
                                }).collect(Collectors.toList())
                ).build();
    }

    private User toUser(UserRequestDto dto) throws SQLException {
        return dto == null ? null :
                User.builder()
                        .name(dto.getName())
                        .id(UUID.randomUUID().toString())
                        .email(dto.getEmail())
                        .mobile(dto.getMobile())
                        .password(PasswordManager.hash(dto.getPassword()))
                        .createdAt(LocalDateTime.now())
                        .build();
    }

    private UserResponseDto toUserResponseDto(User user) throws SQLException {
        return user == null ? null :
                UserResponseDto.builder()
                        .userId(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .mobile(user.getMobile())
                        .createdAt(user.getCreatedAt())
                        .build();
    }

}

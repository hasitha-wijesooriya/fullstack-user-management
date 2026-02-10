package com.example.user_system.user_management_system_api.service;

import com.example.user_system.user_management_system_api.dto.request.UserRequestDto;
import com.example.user_system.user_management_system_api.dto.response.UserResponseDto;
import com.example.user_system.user_management_system_api.dto.response.paginate.UserPaginateResponseDto;

import java.sql.SQLException;

public interface UserService {
    public UserResponseDto create(UserRequestDto dto);
    public void update(UserRequestDto dto,String userId) throws SQLException;
    public void delete(String userId);
    public UserResponseDto findById(String userId) throws SQLException;
    public UserPaginateResponseDto findAll(int page, int size, String searchText);
}

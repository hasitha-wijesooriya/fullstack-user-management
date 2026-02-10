package com.example.user_system.user_management_system_api.dto.response.paginate;

import com.example.user_system.user_management_system_api.dto.response.UserResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserPaginateResponseDto {
    private List<UserResponseDto> usersList;
    private long dataCount;
}

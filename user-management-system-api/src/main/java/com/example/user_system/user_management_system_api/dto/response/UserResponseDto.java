package com.example.user_system.user_management_system_api.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
    private String userId;
    private String name;
    private String email;
    private String mobile;
    private LocalDateTime createdAt;
}

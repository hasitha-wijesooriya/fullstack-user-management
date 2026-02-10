package com.example.user_system.user_management_system_api.util;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StandardResponseDto {
    private int code;
    private String message;
    private Object data;
}

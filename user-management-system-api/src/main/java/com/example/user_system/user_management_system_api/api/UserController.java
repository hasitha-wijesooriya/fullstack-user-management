package com.example.user_system.user_management_system_api.api;

import com.example.user_system.user_management_system_api.dto.request.UserRequestDto;
import com.example.user_system.user_management_system_api.dto.response.UserResponseDto;
import com.example.user_system.user_management_system_api.service.UserService;
import com.example.user_system.user_management_system_api.util.StandardResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-management/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/user/create")
    public ResponseEntity<StandardResponseDto> create(@RequestBody UserRequestDto dto){
        UserResponseDto savedUser = userService.create(dto);
        return new ResponseEntity<>(
                new StandardResponseDto(
                        201, "User Saved!", savedUser
                ), HttpStatus.CREATED
        );
    }

    @PutMapping("/user/update/{id}")
    public ResponseEntity<StandardResponseDto> update(
            @PathVariable("id") String userId,
            @RequestBody UserRequestDto dto) throws SQLException {
        userService.update(dto, userId);
        return new ResponseEntity<>(
                new StandardResponseDto(
                        201, "User Updated!", null
                ), HttpStatus.CREATED
        );
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<StandardResponseDto> delete(
            @PathVariable("id") String userId) throws SQLException {
        userService.delete(userId);
        return new ResponseEntity<>(
                new StandardResponseDto(
                        204, "User Deleted!", null
                ), HttpStatus.NO_CONTENT
        );
    }

    @GetMapping("/user/find-by-id/{id}")
    public ResponseEntity<StandardResponseDto> findById(
            @PathVariable("id") String hotelId) throws SQLException {
        return new ResponseEntity<>(
                new StandardResponseDto(
                        200, "User found!",userService.findById(hotelId)
                ),
                HttpStatus.OK
        );
    }

    @GetMapping("/user/find-all")
    public ResponseEntity<StandardResponseDto> findAll(
            @RequestParam String searchText,
            @RequestParam int page,
            @RequestParam int size
    ) throws SQLException {
        return new ResponseEntity<>(
                new StandardResponseDto(
                        200, "User list!",userService.findAll(page,size,searchText)
                ),
                HttpStatus.OK
        );
    }

}

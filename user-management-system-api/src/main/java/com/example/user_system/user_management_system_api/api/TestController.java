package com.example.user_system.user_management_system_api.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-management/api/v1/test")
public class TestController {

    @GetMapping("/check")
    public String Test(){
        return "Connected Hello Hasitha user";
    }

}

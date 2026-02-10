package com.example.user_system.user_management_system_api.repo;

import com.example.user_system.user_management_system_api.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepo extends JpaRepository<User, String> {

    @Query(value = "SELECT * FROM users WHERE name LIKE %?1%",
    countQuery = "SELECT COUNT(*) FROM users WHERE name LIKE %?1%",nativeQuery = true)
    public Page<User> searchAllUsers(String searchText, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM users WHERE name LIKE %?1%",nativeQuery = true)
    public long countAllUsers(String searchText);

}

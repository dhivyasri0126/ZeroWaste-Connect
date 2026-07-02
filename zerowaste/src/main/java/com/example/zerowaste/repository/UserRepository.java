package com.example.zerowaste.repository;

//importing user.java from the entity package
import com.example.zerowaste.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
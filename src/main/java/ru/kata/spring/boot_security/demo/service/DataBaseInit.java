package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;

import javax.annotation.PostConstruct;
import javax.persistence.Transient;
import java.util.Collections;

@Service
public class DataBaseInit {
    RoleRepository roleRepository;
    UserService userService;

    public DataBaseInit(RoleRepository roleRepository, UserService userService) {
        this.roleRepository = roleRepository;
        this.userService = userService;
    }

    @PostConstruct
    @Transient

    void InitDB() {

        Role role1 = new Role(1L, "ROLE_ADMIN");
        Role role2 = new Role(2L, "ROLE_USER");
        roleRepository.save(role1);
        roleRepository.save(role2);

        User user1 = new User(1L, "admin", "admin", "admin", 32, "admin@admin.ru");
        User user2 = new User(2L, "user", "user", "user", 68, "user@user.ru");
        user1.setRoles(Collections.singleton(role1));
        user2.setRoles(Collections.singleton(role2));
        userService.add(user1);
        userService.add(user2);
    }
}

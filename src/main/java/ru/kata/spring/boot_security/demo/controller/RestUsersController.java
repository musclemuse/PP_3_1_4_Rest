package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
public class RestUsersController {
    private final UserService userService;
    @Autowired
    public RestUsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/users")

    public List<User> allUsers() {
        List<User> allUserList = userService.listOfAllUsers();
        return allUserList;
    }
}

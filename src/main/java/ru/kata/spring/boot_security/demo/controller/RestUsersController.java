package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class RestUsersController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RestUsersController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> apiAllUsers() {
        List<User> users = userService.listOfAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> apiGetUser(@PathVariable long id) {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> apiAddNewUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.add(user), HttpStatus.OK);
    }

    @PutMapping("/users")
    public ResponseEntity<User> apiUpdateUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.add(user), HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> apiDeleteUser(@PathVariable("id") long id) {
        userService.removeUserById(id);
        return new ResponseEntity<>(HttpStatus.OK);
        //!!!ПРОВЕРИТЬ РАБОТУ
    }

//    @GetMapping("/user")
//    public String userInfo(Principal principal, Model model) {
//        User user = userService.findByUsername(principal.getName());
//        model.addAttribute("user", user);
//        return "user";
//    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/user")
    public User getAuthUser(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.findByUsername(userDetails.getUsername());
    }

}

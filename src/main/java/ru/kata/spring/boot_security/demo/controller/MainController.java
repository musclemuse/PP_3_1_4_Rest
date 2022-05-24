package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;


@Controller
public class MainController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public MainController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/user")
    public String userInfo(Principal principal, Model model) {
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("user", user);
        return "user";
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "redirect:/index";
    }

    @GetMapping(value = "/index")
    public String allUsers(@AuthenticationPrincipal org.springframework.security.core.userdetails.User user, Model model) {
        model.addAttribute("users", userService.listOfAllUsers());
        model.addAttribute("user", userService.findByUsername(user.getUsername()));
        model.addAttribute("roles", roleService.getAllRoles());
        return "index";

    }

    @RequestMapping(value = "/saveUser")
    public String saveUser(@ModelAttribute("user") User user) {
        userService.add(user);
        return "redirect:/index";
    }

    @RequestMapping(value = "updateUser")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.add(user);
        return "redirect:/index";
    }

    @RequestMapping(value = "deleteUser")
    public String deleteUser(@RequestParam("id") int id) {
        userService.removeUserById(id);
        return "redirect:/index";
    }

}

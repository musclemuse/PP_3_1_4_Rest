package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    User add(User user);
    void removeUserById (long id);
    User update (User user);
    User getUserById (long id);
    List<User> listOfAllUsers();
}

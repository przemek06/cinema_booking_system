package pwr.web.cinema_booking_api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pwr.web.cinema_booking_api.dto.UserDTO;
import pwr.web.cinema_booking_api.service.UserService;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/anon/users")
    public List<UserDTO> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/anon/role")
    public String getRole() {
        return userService.getRole();
    }

    @PostMapping("/anon/users")
    public UserDTO addMovie(@RequestBody UserDTO user) {
        return userService.addUser(user);
    }

}

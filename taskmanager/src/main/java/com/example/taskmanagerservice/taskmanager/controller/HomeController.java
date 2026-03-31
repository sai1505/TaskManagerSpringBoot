package com.example.taskmanagerservice.taskmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String mainEndPoint() {
        return "Welcome to Task Manager API";
    }

}

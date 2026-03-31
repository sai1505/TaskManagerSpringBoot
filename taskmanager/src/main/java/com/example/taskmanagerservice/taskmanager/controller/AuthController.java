package com.example.taskmanagerservice.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanagerservice.taskmanager.models.APIResponse;
import com.example.taskmanagerservice.taskmanager.models.AuthResponse;
import com.example.taskmanagerservice.taskmanager.models.SignupRequest;
import com.example.taskmanagerservice.taskmanager.models.User;
import com.example.taskmanagerservice.taskmanager.repository.UserRepository;
import com.example.taskmanagerservice.taskmanager.utils.JWTUtil;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<APIResponse<AuthResponse>> signup(@RequestBody SignupRequest signupRequest) {

        AuthResponse authResponse = null;

        // user exists
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            APIResponse<AuthResponse> response = new APIResponse<>(
                    HttpStatus.BAD_REQUEST.value(),
                    "User already registered",
                    null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        System.out.println("User exists? " + userRepository.findByEmail(signupRequest.getEmail()).isPresent());

        // create user
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        userRepository.save(user);
        System.out.println("After save");

        // generate JWT
        String token = jwtUtil.generateToken(user.getEmail());

        authResponse = new AuthResponse(token);

        APIResponse<AuthResponse> response = new APIResponse<AuthResponse>(HttpStatus.CREATED.value(),
                "User Registered Successfully", authResponse);

        // return
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

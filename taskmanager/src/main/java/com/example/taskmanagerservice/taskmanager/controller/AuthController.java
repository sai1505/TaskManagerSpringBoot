package com.example.taskmanagerservice.taskmanager.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanagerservice.taskmanager.models.APIResponse;
import com.example.taskmanagerservice.taskmanager.models.AuthResponse;
import com.example.taskmanagerservice.taskmanager.models.LoginRequest;
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

        APIResponse<AuthResponse> response = new APIResponse<AuthResponse>(HttpStatus.CREATED.value(),
                "User Registered Successfully");

        // return
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<APIResponse<AuthResponse>> login(@RequestBody LoginRequest loginRequest) {

        // user exists
        if (userRepository.findByEmail(loginRequest.getEmail()).isPresent()) {
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
            User user = userOptional.get();

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                APIResponse<AuthResponse> response = new APIResponse<>(
                        HttpStatus.UNAUTHORIZED.value(),
                        "Invalid Credentials",
                        null);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Generate JWT
            String token = jwtUtil.generateToken(user.getEmail());
            AuthResponse authResponse = new AuthResponse(token);

            APIResponse<AuthResponse> response = new APIResponse<>(
                    HttpStatus.OK.value(),
                    "User " + user.getEmail() + " Login Successfull",
                    authResponse);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            APIResponse<AuthResponse> response = new APIResponse<>(
                    HttpStatus.BAD_REQUEST.value(),
                    "User Not Found",
                    null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}

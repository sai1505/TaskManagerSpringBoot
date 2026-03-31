package com.example.taskmanagerservice.taskmanager.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class dbtestController {

    private final JdbcTemplate jdbcTemplate;

    dbtestController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/testdb")
    public String testDb() {
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "DB Connected : " + result;
        } catch (Exception e) {
            return "DB Failed" + e.toString();
        }
    }
}

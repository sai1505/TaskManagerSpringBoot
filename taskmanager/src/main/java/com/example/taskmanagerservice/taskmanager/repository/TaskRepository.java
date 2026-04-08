package com.example.taskmanagerservice.taskmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.taskmanagerservice.taskmanager.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByEmail(String email);
}

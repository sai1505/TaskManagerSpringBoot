package com.example.taskmanagerservice.taskmanager.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanagerservice.taskmanager.models.APIResponse;
import com.example.taskmanagerservice.taskmanager.models.Task;
import com.example.taskmanagerservice.taskmanager.repository.TaskRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Get tasks
    @GetMapping("/task")
    public ResponseEntity<APIResponse<List<Task>>> getTasks() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Task> tasks = taskRepository.findByEmail(email);

        APIResponse<List<Task>> apiResponse = new APIResponse<>(HttpStatus.OK.value(), "Tasks Returned Successfully",
                tasks);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    // Add Tasks
    @PostMapping("/task")
    public ResponseEntity<APIResponse<Task>> createTask(@RequestBody Task task) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        task.setEmail(email);

        taskRepository.save(task);

        APIResponse<Task> apiResponse = new APIResponse<>(HttpStatus.OK.value(), "Task Created Successfully", null);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    // Update Tasks
    @PutMapping("/task/{id}")
    public ResponseEntity<APIResponse<Task>> updateTask(@PathVariable long id, @RequestBody Task updatedTask) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        updatedTask.setEmail(email);
        Optional<Task> getTask = taskRepository.findById(id);
        if (getTask.isPresent()) {
            Task task = getTask.get();
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            taskRepository.save(task);
            APIResponse<Task> apiResponse = new APIResponse<>(HttpStatus.OK.value(), "Task Updated Successfully", null);
            return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
        }

        APIResponse<Task> apiResponse = new APIResponse<>(HttpStatus.NOT_FOUND.value(), "Task Not found", null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);

    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<APIResponse<Task>> deleteTask(@PathVariable long id) {
        Optional<Task> getTask = taskRepository.findById(id);
        if (getTask.isPresent()) {
            Task task = getTask.get();

            taskRepository.delete(task);
            APIResponse<Task> apiResponse = new APIResponse<>(HttpStatus.OK.value(), "Task Deleted Successfully", null);
            return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
        }

        APIResponse<Task> apiResponse = new APIResponse<>(HttpStatus.NOT_FOUND.value(), "Task Not found", null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
    }

}

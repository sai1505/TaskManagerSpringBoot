package com.example.taskmanagerservice.taskmanager.models;

import java.util.Optional;

public class APIResponse<T> {

    private int status;
    private String message;
    private T data;

    public APIResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public APIResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.data = null;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Optional<T> getData() {
        return Optional.ofNullable(data);
    }

    public void setData(T data) {
        this.data = data;
    }
}

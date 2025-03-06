package com.assignment.todo.service;

import com.assignment.todo.dto.TaskDto;

import java.util.List;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);
    List<TaskDto> getAllTasks();
    TaskDto getTaskById(Long id);
    TaskDto updateTask(Long id, TaskDto taskDto);
    List<TaskDto> getRecentTasks();
    void deleteTask(Long id);
}

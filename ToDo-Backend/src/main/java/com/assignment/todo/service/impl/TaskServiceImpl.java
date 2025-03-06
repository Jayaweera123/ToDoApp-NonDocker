package com.assignment.todo.service.impl;

import com.assignment.todo.dto.TaskDto;
import com.assignment.todo.entity.Task;
import com.assignment.todo.mapper.TaskMapper;
import com.assignment.todo.repository.TaskRepository;
import com.assignment.todo.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = TaskMapper.mapToTask(taskDto);
        task.setCreatedAt(LocalDateTime.now()); // Auto-set creation date
        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(savedTask);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(TaskMapper::mapToTaskDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        // Fetch existing task or throw an exception if not found
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Only update completedAt and completed status
        if (taskDto.isCompleted() && !task.isCompleted()) {
            task.setCompletedAt(LocalDateTime.now()); // Set completed time only when task is marked completed
        }
        task.setCompleted(taskDto.isCompleted()); // Update completed status

        // Save the updated task
        Task updatedTask = taskRepository.save(task);

        // Convert entity to DTO and return
        return TaskMapper.mapToTaskDto(updatedTask);
    }

    @Override
    public List<TaskDto> getRecentTasks() {
        return taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDesc()
                .stream()
                .map(TaskMapper::mapToTaskDto)
                .collect(Collectors.toList());
    }



    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

}

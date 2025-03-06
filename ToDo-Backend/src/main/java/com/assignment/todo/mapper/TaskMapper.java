package com.assignment.todo.mapper;

import com.assignment.todo.dto.TaskDto;
import com.assignment.todo.entity.Task;

public class TaskMapper {

    public static TaskDto mapToTaskDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getCreatedAt(),
                task.getCompletedAt(),
                task.isCompleted()
        );
    }

    public static Task mapToTask(TaskDto taskDto) {
        return new Task(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getCreatedAt(),
                taskDto.getCompletedAt(),
                taskDto.isCompleted()
        );
    }
}

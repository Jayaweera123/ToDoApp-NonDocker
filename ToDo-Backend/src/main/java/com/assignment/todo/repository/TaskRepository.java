package com.assignment.todo.repository;

import com.assignment.todo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.completed = false ORDER BY t.createdAt DESC LIMIT 5")
    List<Task> findTop5ByCompletedFalseOrderByCreatedAtDesc();
}

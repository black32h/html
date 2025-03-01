package com.example.html.controller;

import com.example.html.model.Student;
import com.example.html.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:63342") // Дозволяє запити з фронтенду
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Додати нового студента
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // Отримати список студентів
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}


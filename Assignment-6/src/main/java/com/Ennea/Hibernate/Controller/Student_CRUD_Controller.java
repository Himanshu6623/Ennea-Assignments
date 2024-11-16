package com.Ennea.Hibernate.Controller;

import com.Ennea.Hibernate.DTO.StudentsDTO;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Services.StudentServices.StudentService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Student")
public class Student_CRUD_Controller {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private StudentService studentService;

    private BCryptPasswordEncoder encoder =new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<String> register(@RequestBody Students std) {
        std.setCreationDate(new Date(System.currentTimeMillis()));
        std.setPassword(encoder.encode(std.getPassword()));
        try {
            entityManager.persist(std);
            return ResponseEntity.status(HttpStatus.CREATED).body("Successfully added");
        } catch (Exception e) {
            System.out.println("Error during registration: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/login")
    public String Login(@RequestBody Students students)
    {
        return studentService.verify(students);
    }

    @DeleteMapping("/RemoveStudent/{rollno}")
    @Transactional
    public boolean DeleteStudentById(@PathVariable String rollno)
    {
        Students std=entityManager.getReference(Students.class,rollno);
        try{
            entityManager.remove(std);
        }
        catch(Exception e)
        {
            System.out.println("Invalid Student_Id");
        }
        return true;
    }

    @GetMapping
    @Transactional
    public List<StudentsDTO> getTeacher(){
        return studentService.getallusers();
    }

    @GetMapping("/RollNo/{roll}")
    @Transactional
    public ResponseEntity<Students> GetStudentById(@PathVariable String roll)
    {
        try {
            Students student = entityManager.find(Students.class, roll);
            if (student == null) {
                System.out.println("USER NOT FOUND");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            System.out.println("Exception occurred: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/UpdateStudent")
    @Transactional
    public void UpdateStudentById(@RequestBody Students std)
    {
        try{
            Students student=entityManager.getReference(Students.class,std.getRollno());
            if(std.getName()!=null)
            {
                student.setName(std.getName());
            }
            if(std.getPassword()!=null)
            {
                student.setPassword(std.getPassword());
            }
            if(std.getCreationDate()!=null)
            {
                student.setCreationDate(std.getCreationDate());
            }
            entityManager.merge(student);
        }
        catch (Exception e)
        {
            System.out.println("INVALID ID");
        }
    }
}

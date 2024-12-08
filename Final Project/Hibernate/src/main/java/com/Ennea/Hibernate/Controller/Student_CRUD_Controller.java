package com.Ennea.Hibernate.Controller;

import com.Ennea.Hibernate.DTO.AdminChangeStudentPasswordDTO;
import com.Ennea.Hibernate.DTO.CourseDTO;
import com.Ennea.Hibernate.DTO.StudentsDTO;
import com.Ennea.Hibernate.DTO.UpdateStudentPasswordDTO;
import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Entity.CoursesSubscribed;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Services.StudentServices.StudentService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

        List<StudentsDTO> studentsList = studentService.getAllStudentsDTO();

        StudentsDTO student = studentsList.stream()
                .filter(s -> std.getRollno().equals(s.getRollno()))
                .findFirst()
                .orElse(null);

        if (student != null) {
            return new ResponseEntity<>(HttpStatus.FOUND);
        }
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
    public ResponseEntity<String> Login(@RequestBody Students student)
    {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        List<Students> students = studentService.getAllStudents();

        Students studentRollNo = students.stream()
                .filter(s -> student.getRollno().equals(s.getRollno()))
                .findFirst()
                .orElse(null);

        if (studentRollNo != null) {
            if(!passwordEncoder.matches(student.getPassword(),studentRollNo.getPassword()))
            {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        else if(studentRollNo==null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
        return studentService.verify(student);
    }

    @DeleteMapping("/RemoveStudent/{rollno}")
    @Transactional
    public boolean DeleteStudentById(@PathVariable String rollno) {
        try {
            Students student = entityManager.find(Students.class, rollno);

            if (student != null) {
                List<CoursesSubscribed> subscriptions = student.getRelatedEntities();
                if (subscriptions != null) {
                    for (CoursesSubscribed subscription : subscriptions) {
                        Courses course = subscription.getCourse();
                        if (course != null) {
                            int currentCount = course.getSubscribed();
                            course.setSubscribed(currentCount - 1);
                            entityManager.merge(course);
                        }
                    }
                }

                student.clearRelationships();
                entityManager.merge(student);
                entityManager.remove(student);

                return true;
            } else {
                System.out.println("Invalid Student Roll Number");
                return false;
            }
        } catch (Exception e) {
            System.out.println("Error deleting student: " + e.getMessage());
            return false;
        }
    }


    @GetMapping
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Students> getStudentDetails(){
        return studentService.getAllStudents();
    }

    @GetMapping("/RollNo/{roll}")
    @Transactional
    public ResponseEntity<StudentsDTO> GetStudentById(@PathVariable String roll)
    {
        List<StudentsDTO> studentsList = studentService.getAllStudentsDTO();

        StudentsDTO student = studentsList.stream()
                .filter(s -> roll.equals(s.getRollno()))
                .findFirst()
                .orElse(null);

        if (student == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @PutMapping("/UpdateStudent")
    @Transactional
    @PreAuthorize("hasAuthority('STUDENT')")
    public void UpdateStudentById(@RequestBody Students std)
    {
        try{
            Students student=entityManager.getReference(Students.class,std.getRollno());
            student.setName(std.getName());

            student.setEmail(std.getEmail());

            student.setImageUrl(std.getImageUrl());

            entityManager.merge(student);
        }
        catch (Exception e)
        {
            System.out.println("INVALID ID");
        }
    }

    @PutMapping("/UpdateStudentPassword")
    @Transactional
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<String> updateStudentPasswordById(@RequestBody UpdateStudentPasswordDTO request) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        try {
            Students student = entityManager.getReference(Students.class, request.getRollno());

            if (passwordEncoder.matches(request.getPassword(), student.getPassword())) {
                String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
                student.setPassword(encodedNewPassword);
                entityManager.merge(student);
                return ResponseEntity.ok("Password updated successfully.");
            } else {
                throw new IllegalArgumentException("Incorrect password.");
            }
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student with RollNo not found.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @GetMapping("/SubscribedCourses/{rollNo}")
    @Transactional
    public ResponseEntity<List<CourseDTO>> subscribedCourses(@PathVariable String rollNo) {
        Students student = entityManager.find(Students.class, rollNo);

        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<CoursesSubscribed> subscriptions = entityManager
                .createQuery("SELECT cs FROM CoursesSubscribed cs WHERE cs.student.rollno = :rollNo", CoursesSubscribed.class)
                .setParameter("rollNo", rollNo)
                .getResultList();

        if (subscriptions.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<CourseDTO> courseDTOs = subscriptions.stream()
                .map(cs -> new CourseDTO(cs.getCourse().getCourseId(), cs.getCourse().getTitle(), cs.getCourse().getDescription(), cs.getCourse().getCategory(), cs.getCourse().getImageUrl()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(courseDTOs);
    }

}

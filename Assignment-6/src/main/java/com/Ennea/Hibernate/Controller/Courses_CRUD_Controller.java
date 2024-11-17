<<<<<<< HEAD
package com.Ennea.Hibernate.Controller;

import com.Ennea.Hibernate.DTO.CourseDTO;
import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Services.CourseServices.CourseService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/Courses")
public class Courses_CRUD_Controller {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CourseService service;

    @PostMapping("/Add")
    @Transactional
    public String AddCourse(@RequestBody Courses course)
    {
        course.setCourseCreation(new Date(System.currentTimeMillis()));
        try{
            entityManager.persist(course);
        }
        catch(Exception e)
        {
            System.out.println("Invalid Parameters");
        }
        return "Successfully added";
    }

    @DeleteMapping("/removeCourse/{id}")
    public boolean DeleteCourseById(@PathVariable int id)
    {
        Courses course=entityManager.getReference(Courses.class,id);
        try{
            entityManager.remove(course);
        }
        catch(Exception e)
        {
            System.out.println("Invalid Course_Id");
        }
        return true;
    }


    @GetMapping("/DTO")
    @Transactional
    public ResponseEntity<List<CourseDTO>> getAllCoursesDTO()
    {
        return ResponseEntity.ok(service.getAllCoursesDTO());
    }

    @GetMapping
    @Transactional
    public ResponseEntity<List<Courses>> getAllCourses()
    {
        return ResponseEntity.ok(service.getAllCourses());
    }

    @GetMapping("/CourseId/{id}")
    @Transactional
    public ResponseEntity<Courses> GetCourseById(@PathVariable int id)
    {
        try {
            Courses courses = entityManager.find(Courses.class, id);
            if (courses == null) {
                System.out.println("USER NOT FOUND");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            System.out.println("Exception occurred: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
=======
package com.Ennea.Hibernate.Controller;

import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Entity.CoursesSubscribed;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Services.CourseServices.ExtractUsername;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;


@RestController
@RequestMapping("/Courses")
public class Courses_CRUD_Controller {

    @PersistenceContext
    private EntityManager entityManager;

    @PostMapping("/Add")
    @Transactional
    public String AddCourse(@RequestBody Courses course)
    {
        course.setCourseCreation(new Date(System.currentTimeMillis()));
        try{
            entityManager.persist(course);
        }
        catch(Exception e)
        {
            System.out.println("Invalid Parameters");
        }
        return "Successfully added";
    }

    @DeleteMapping("/removeCourse/{id}")
    public boolean DeleteCourseById(@PathVariable int id)
    {
        Courses course=entityManager.getReference(Courses.class,id);
        try{
            entityManager.remove(course);
        }
        catch(Exception e)
        {
            System.out.println("Invalid Course_Id");
        }
        return true;
    }

    @PutMapping("/subscribe")
    @Transactional
    public ResponseEntity<String> subscribeCourse(@RequestBody CoursesSubscribed coursesSubscribed) {
        Courses course = entityManager.find(Courses.class, coursesSubscribed.getCourse().getCourseId());

        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found.");
        }

        Students student = entityManager.find(Students.class, coursesSubscribed.getStudent().getRollno());

        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
        }

        course.setSubscribed(course.getSubscribed() + 1);
        entityManager.merge(course);

        coursesSubscribed.setStudent(student);
        coursesSubscribed.setCourse(course);
        entityManager.persist(coursesSubscribed);

        return ResponseEntity.ok("Student successfully subscribed to the course.");
    }





    @PutMapping("/unsubscribe/{id}")
    @Transactional
    public void UnsubscribeCourse(@PathVariable int id)
    {
        Courses course=entityManager.getReference(Courses.class,id);
        course.setSubscribed(course.getSubscribed()-1);
        entityManager.merge(course);
    }

    @GetMapping("/CourseId/{id}")
    @Transactional
    public ResponseEntity<Courses> GetCourseById(@PathVariable int id)
    {
        try {
            Courses courses = entityManager.find(Courses.class, id);
            if (courses == null) {
                System.out.println("USER NOT FOUND");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            System.out.println("Exception occurred: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
>>>>>>> 2204a1e9195f87fabd0d8f466e69ae3d031c1e55

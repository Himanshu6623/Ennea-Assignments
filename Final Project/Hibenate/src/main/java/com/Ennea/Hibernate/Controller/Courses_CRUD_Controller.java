package com.Ennea.Hibernate.Controller;

import com.Ennea.Hibernate.DTO.CourseDTO;
import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Services.CourseServices.CourseService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Transactional
    @DeleteMapping("/removeCourse/{id}")
    public boolean DeleteCourseById(@PathVariable int id) {
        try {
            Courses course = entityManager.find(Courses.class, id);

            if (course != null) {
                course.clearRelationships();
                entityManager.merge(course);
                entityManager.remove(course);
                return true;
            } else {
                System.out.println("Invalid Course_Id");
                return false;
            }
        } catch (Exception e) {
            System.out.println("Error deleting course: " + e.getMessage());
            return false;
        }
    }

    @GetMapping("/DTO")
    @Transactional
    public ResponseEntity<List<CourseDTO>> getAllCoursesDTO()
    {
        return ResponseEntity.ok(service.getAllCoursesDTO());
    }

    @GetMapping
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Courses>> getAllCourses()
    {
        return ResponseEntity.ok(service.getAllCourses());
    }

    @GetMapping("/CourseId/{id}")
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
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

    @PutMapping("/UpdateCourse")
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public void UpdateCourseById(@RequestBody Courses course)
    {
        try{
            Courses courses=entityManager.getReference(Courses.class,course.getCourseId());

            courses.setTitle(course.getTitle());

            courses.setDescription(course.getDescription());

            courses.setImageUrl(course.getImageUrl());

            courses.setCategory(course.getCategory());

            entityManager.merge(courses);
        }
        catch (Exception e)
        {
            System.out.println("INVALID ID");
        }
    }


}
